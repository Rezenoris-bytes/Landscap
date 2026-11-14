import { timingSafeEqual } from "./security";

const isProd = process.env.NODE_ENV === "production";
if (isProd) {
  if (!process.env.JWT_SECRET) {
    console.warn("⚠️ [SECURITY WARNING] process.env.JWT_SECRET is not configured in production! Using fallback secret.");
  }
  if (!process.env.ADMIN_PASSWORD) {
    console.warn("⚠️ [SECURITY WARNING] process.env.ADMIN_PASSWORD is using the default value in production. Set a custom password in Vercel.");
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "d9830fc353a5b1b49c4f10c77e4e9d20acf7ff86ec06caf390926ba2d4588c2e";
export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@blueheavenlandscape.com").toLowerCase();
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "BHLadmin@2026";

// ---------- In-Memory Store (Zero-Config for Vercel & Local Dev) ----------
const store = {
  users: [
    {
      id: "admin-1",
      email: ADMIN_EMAIL,
      password_hash: "",
      name: "Admin",
      role: "admin",
      created_at: new Date().toISOString(),
    },
  ],
  bookings: [
    {
      id: "demo-booking-1",
      space: "resort",
      services: ["lawn", "irrigation"],
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

// ---------- Standard Web Crypto Helpers ----------
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

// ---------- Password Hashing ----------
export async function hashPassword(password) {
  const enc = new TextEncoder().encode(password + ":" + JWT_SECRET);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(password, storedHash) {
  if (!password || !storedHash) return false;
  const hash = await hashPassword(password);
  return await timingSafeEqual(hash, storedHash);
}

// ---------- Auth Tokens (Edge & Node Compatible JWT) ----------
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
  const currentHash = await hashPassword(ADMIN_PASSWORD);
  let user = store.users.find((u) => u.email.toLowerCase() === ADMIN_EMAIL);
  if (!user) {
    user = {
      id: "admin-1",
      email: ADMIN_EMAIL,
      password_hash: currentHash,
      name: "Admin",
      role: "admin",
      created_at: new Date().toISOString(),
    };
    store.users.push(user);
  } else {
    // Keep credentials synchronized with environment variables
    user.password_hash = currentHash;
    user.email = ADMIN_EMAIL;
  }
  return user;
}

export async function verifyAdminLogin(email, password) {
  const normalizedEmail = (email || "").toLowerCase().trim();
  const admin = await getAdminUser();
  
  // Timing-safe comparison for email address
  const isEmailValid = await timingSafeEqual(normalizedEmail, admin.email.toLowerCase());
  // Always compute password hash to prevent timing attacks that reveal valid email addresses
  const inputHash = await hashPassword(password || "");
  const isPasswordValid = await timingSafeEqual(inputHash, admin.password_hash);

  if (isEmailValid && isPasswordValid) {
    return { id: admin.id, email: admin.email, name: admin.name || "Admin", role: "admin" };
  }
  return null;
}

// ---------- Bookings Operations ----------
export async function getBookings() {
  return (store.bookings || []).map((b) => ({
    ...b,
    services: typeof b.services === "string" ? JSON.parse(b.services || "[]") : b.services,
  }));
}

export async function createBooking(bookingData) {
  const id = "b_" + Date.now();
  const now = new Date().toISOString();
  const newBooking = {
    ...bookingData,
    id,
    services: bookingData.services || [],
    status: "new",
    created_at: now,
  };
  store.bookings = store.bookings || [];
  store.bookings.unshift(newBooking);
  return newBooking;
}

export async function updateBookingStatus(id, status) {
  const b = (store.bookings || []).find((item) => item.id === id);
  if (b) {
    b.status = status;
    return b;
  }
  return null;
}

export async function deleteBooking(id) {
  store.bookings = (store.bookings || []).filter((item) => item.id !== id);
  return true;
}

// ---------- Projects Operations ----------
export async function getProjects() {
  return (store.projects || []).filter((p) => !p.is_deleted);
}

export async function createProject(projectData) {
  const id = "p_" + Date.now();
  const now = new Date().toISOString();
  const newProject = {
    ...projectData,
    id,
    is_deleted: false,
    created_at: now,
  };
  store.projects = store.projects || [];
  store.projects.unshift(newProject);
  return newProject;
}

export async function deleteProject(id) {
  const p = (store.projects || []).find((item) => item.id === id);
  if (p) {
    p.is_deleted = true;
  }
  return true;
}
