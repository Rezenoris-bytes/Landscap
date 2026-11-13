const JWT_SECRET = process.env.JWT_SECRET || "d9830fc353a5b1b49c4f10c77e4e9d20acf7ff86ec06caf390926ba2d4588c2e";
export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@blueheavenlandscape.com").toLowerCase();
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "BHLadmin@2026";

// ---------- Cloudflare D1 Helper ----------
async function getD1Database() {
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    const ctx = getRequestContext();
    if (ctx && ctx.env && ctx.env.DB) {
      return ctx.env.DB;
    }
  } catch {}
  return null;
}

// ---------- In-Memory Fallback Store (Local Dev & Edge) ----------
const memStore = {
  users: [
    {
      id: "admin-1",
      email: ADMIN_EMAIL,
      password_hash: "admin",
      name: "Admin",
      role: "admin",
      created_at: new Date().toISOString(),
    },
  ],
  bookings: [
    {
      id: "demo-booking-1",
      space: "resort",
      services: JSON.stringify(["complete-landscape", "smart-irrigation"]),
      city: "Coimbatore",
      timeline: "Within 1 month",
      name: "Sample Enquiry",
      phone: "+91 98765 43210",
      email: "enquiry@example.com",
      note: "Demo booking for luxury resort landscape layout.",
      date: new Date().toISOString().split("T")[0],
      time: "11:30 AM",
      status: "new",
      created_at: new Date().toISOString(),
    },
  ],
  projects: [],
};

// ---------- Edge-Native Web Crypto Helpers ----------
function base64UrlEncode(bytesOrStr) {
  const bytes = typeof bytesOrStr === "string" ? new TextEncoder().encode(bytesOrStr) : new Uint8Array(bytesOrStr);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(base64) {
  let str = base64.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

async function getHmacKey(secret) {
  return await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

// ---------- Password Hashing (Edge-Native) ----------
export async function hashPassword(password) {
  const enc = new TextEncoder().encode(password + ":" + JWT_SECRET);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(password, storedHash) {
  if (password === ADMIN_PASSWORD) return true;
  const hash = await hashPassword(password);
  return hash === storedHash;
}

// ---------- Auth Tokens (Edge-Native JWT) ----------
export async function createToken(userId, email) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: userId,
    email,
    role: "admin",
    type: "access",
    iat: now,
    exp: now + 8 * 3600, // 8 hours
  };
  const encHeader = base64UrlEncode(JSON.stringify(header));
  const encPayload = base64UrlEncode(JSON.stringify(payload));
  const data = new TextEncoder().encode(`${encHeader}.${encPayload}`);
  const key = await getHmacKey(JWT_SECRET);
  const sig = await crypto.subtle.sign("HMAC", key, data);
  const encSig = base64UrlEncode(sig);
  return `${encHeader}.${encPayload}.${encSig}`;
}

export async function verifyToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const [encHeader, encPayload, encSig] = parts;
    const data = new TextEncoder().encode(`${encHeader}.${encPayload}`);
    const key = await getHmacKey(JWT_SECRET);

    let sigStr = encSig.replace(/-/g, "+").replace(/_/g, "/");
    while (sigStr.length % 4) sigStr += "=";
    const binary = atob(sigStr);
    const sigBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      sigBytes[i] = binary.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify("HMAC", key, sigBytes, data);
    if (!isValid) return null;

    const payload = JSON.parse(base64UrlDecode(encPayload));
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

// ---------- User Operations ----------
export async function getAdminUser() {
  const d1 = await getD1Database();
  if (d1) {
    let row = await d1.prepare("SELECT * FROM users WHERE email = ?").bind(ADMIN_EMAIL).first();
    if (!row) {
      const hash = await hashPassword(ADMIN_PASSWORD);
      const id = "admin-1";
      const now = new Date().toISOString();
      await d1.prepare(
        "INSERT INTO users (id, email, password_hash, name, role, created_at) VALUES (?, ?, ?, ?, ?, ?)"
      ).bind(id, ADMIN_EMAIL, hash, "Admin", "admin", now).run();
      return { id, email: ADMIN_EMAIL, name: "Admin", role: "admin" };
    }
    return row;
  }

  let user = memStore.users.find((u) => u.email.toLowerCase() === ADMIN_EMAIL);
  if (!user) {
    user = {
      id: "admin-1",
      email: ADMIN_EMAIL,
      password_hash: await hashPassword(ADMIN_PASSWORD),
      name: "Admin",
      role: "admin",
      created_at: new Date().toISOString(),
    };
    memStore.users.push(user);
  }
  return user;
}

export async function verifyAdminLogin(email, password) {
  const normalizedEmail = (email || "").toLowerCase().trim();
  const d1 = await getD1Database();
  if (d1) {
    const user = await d1.prepare("SELECT * FROM users WHERE email = ?").bind(normalizedEmail).first();
    if (user && (await verifyPassword(password, user.password_hash))) {
      return { id: user.id, email: user.email, name: user.name, role: user.role };
    }
    return null;
  }

  const user = memStore.users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (user && (await verifyPassword(password, user.password_hash))) {
    return { id: user.id, email: user.email, name: user.name || "Admin", role: "admin" };
  }
  return null;
}

// ---------- Bookings Operations ----------
export async function getBookings() {
  const d1 = await getD1Database();
  if (d1) {
    const { results } = await d1.prepare("SELECT * FROM bookings ORDER BY created_at DESC").all();
    return (results || []).map((b) => ({
      ...b,
      services: typeof b.services === "string" ? JSON.parse(b.services || "[]") : b.services,
    }));
  }

  return (memStore.bookings || []).map((b) => ({
    ...b,
    services: typeof b.services === "string" ? JSON.parse(b.services || "[]") : b.services,
  }));
}

export async function createBooking(bookingData) {
  const id = "b_" + Date.now();
  const now = new Date().toISOString();
  const servicesJson = JSON.stringify(bookingData.services || []);

  const d1 = await getD1Database();
  if (d1) {
    await d1.prepare(`
      INSERT INTO bookings (id, space, services, city, timeline, name, phone, email, note, date, time, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)
    `).bind(
      id,
      bookingData.space || "",
      servicesJson,
      bookingData.city || "",
      bookingData.timeline || "",
      bookingData.name || "",
      bookingData.phone || "",
      bookingData.email || "",
      bookingData.note || "",
      bookingData.date || "",
      bookingData.time || "",
      now
    ).run();

    return { ...bookingData, id, status: "new", created_at: now };
  }

  const newBooking = {
    ...bookingData,
    id,
    services: bookingData.services || [],
    status: "new",
    created_at: now,
  };
  memStore.bookings = memStore.bookings || [];
  memStore.bookings.unshift(newBooking);
  return newBooking;
}

export async function updateBookingStatus(id, status) {
  const d1 = await getD1Database();
  if (d1) {
    await d1.prepare("UPDATE bookings SET status = ? WHERE id = ?").bind(status, id).run();
    const updated = await d1.prepare("SELECT * FROM bookings WHERE id = ?").bind(id).first();
    if (updated) {
      updated.services = typeof updated.services === "string" ? JSON.parse(updated.services || "[]") : updated.services;
    }
    return updated;
  }

  const b = (memStore.bookings || []).find((item) => item.id === id);
  if (b) {
    b.status = status;
    return b;
  }
  return null;
}

export async function deleteBooking(id) {
  const d1 = await getD1Database();
  if (d1) {
    await d1.prepare("DELETE FROM bookings WHERE id = ?").bind(id).run();
    return true;
  }

  memStore.bookings = (memStore.bookings || []).filter((item) => item.id !== id);
  return true;
}

// ---------- Projects Operations ----------
export async function getProjects() {
  const d1 = await getD1Database();
  if (d1) {
    const { results } = await d1.prepare("SELECT * FROM projects WHERE is_deleted = 0 ORDER BY created_at DESC").all();
    return results || [];
  }

  return (memStore.projects || []).filter((p) => !p.is_deleted);
}

export async function createProject(projectData) {
  const id = "p_" + Date.now();
  const now = new Date().toISOString();

  const d1 = await getD1Database();
  if (d1) {
    await d1.prepare(`
      INSERT INTO projects (id, title, place, type, service, summary, before_path, after_path, is_deleted, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
    `).bind(
      id,
      projectData.title || "",
      projectData.place || "",
      projectData.type || "",
      projectData.service || "",
      projectData.summary || "",
      projectData.before_path || "",
      projectData.after_path || "",
      now
    ).run();

    return { ...projectData, id, is_deleted: false, created_at: now };
  }

  const newProject = {
    ...projectData,
    id,
    is_deleted: false,
    created_at: now,
  };
  memStore.projects = memStore.projects || [];
  memStore.projects.unshift(newProject);
  return newProject;
}

export async function deleteProject(id) {
  const d1 = await getD1Database();
  if (d1) {
    await d1.prepare("UPDATE projects SET is_deleted = 1 WHERE id = ?").bind(id).run();
    return true;
  }

  const p = (memStore.projects || []).find((item) => item.id === id);
  if (p) {
    p.is_deleted = true;
  }
  return true;
}
