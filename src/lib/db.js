import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

// ---------- Local Fallback Store (Local Dev) ----------
const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "sqlite_store.json");

function ensureLocalStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_FILE)) {
    const initial = {
      users: [
        {
          id: "admin-1",
          email: ADMIN_EMAIL,
          password_hash: bcrypt.hashSync(ADMIN_PASSWORD, 10),
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
    fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), "utf8");
  }
}

function readLocalStore() {
  ensureLocalStore();
  try {
    return JSON.parse(fs.readFileSync(STORE_FILE, "utf8"));
  } catch {
    return { users: [], bookings: [], projects: [] };
  }
}

function writeLocalStore(data) {
  ensureLocalStore();
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf8");
}

// ---------- Auth Tokens ----------
export function createToken(userId, email) {
  return jwt.sign(
    { sub: userId, email, role: "admin", type: "access" },
    JWT_SECRET,
    { expiresIn: "8h" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
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
      const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);
      const id = "admin-1";
      const now = new Date().toISOString();
      await d1.prepare(
        "INSERT INTO users (id, email, password_hash, name, role, created_at) VALUES (?, ?, ?, ?, ?, ?)"
      ).bind(id, ADMIN_EMAIL, hash, "Admin", "admin", now).run();
      return { id, email: ADMIN_EMAIL, name: "Admin", role: "admin" };
    }
    return row;
  }

  const store = readLocalStore();
  let user = store.users.find((u) => u.email.toLowerCase() === ADMIN_EMAIL);
  if (!user) {
    user = {
      id: "admin-1",
      email: ADMIN_EMAIL,
      password_hash: bcrypt.hashSync(ADMIN_PASSWORD, 10),
      name: "Admin",
      role: "admin",
      created_at: new Date().toISOString(),
    };
    store.users.push(user);
    writeLocalStore(store);
  }
  return user;
}

export async function verifyAdminLogin(email, password) {
  const normalizedEmail = (email || "").toLowerCase().trim();
  const d1 = await getD1Database();
  if (d1) {
    const user = await d1.prepare("SELECT * FROM users WHERE email = ?").bind(normalizedEmail).first();
    if (user && bcrypt.compareSync(password, user.password_hash)) {
      return { id: user.id, email: user.email, name: user.name, role: user.role };
    }
    return null;
  }

  const store = readLocalStore();
  const user = store.users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (user && bcrypt.compareSync(password, user.password_hash)) {
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

  const store = readLocalStore();
  return (store.bookings || [])
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map((b) => ({
      ...b,
      services: typeof b.services === "string" ? JSON.parse(b.services || "[]") : b.services,
    }));
}

export async function createBooking(data) {
  const id = "b_" + Date.now();
  const now = new Date().toISOString();
  const servicesJson = JSON.stringify(data.services || []);

  const d1 = await getD1Database();
  if (d1) {
    await d1.prepare(`
      INSERT INTO bookings (id, space, services, city, timeline, name, phone, email, note, date, time, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)
    `).bind(
      id,
      data.space || "",
      servicesJson,
      data.city || "",
      data.timeline || "",
      data.name || "",
      data.phone || "",
      data.email || "",
      data.note || "",
      data.date || "",
      data.time || "",
      now
    ).run();

    return { ...data, id, status: "new", created_at: now };
  }

  const store = readLocalStore();
  const newBooking = {
    ...data,
    id,
    services: servicesJson,
    status: "new",
    created_at: now,
  };
  store.bookings = store.bookings || [];
  store.bookings.unshift(newBooking);
  writeLocalStore(store);

  return { ...data, id, status: "new", created_at: now };
}

export async function updateBookingStatus(id, status) {
  const d1 = await getD1Database();
  if (d1) {
    await d1.prepare("UPDATE bookings SET status = ? WHERE id = ?").bind(status, id).run();
    const updated = await d1.prepare("SELECT * FROM bookings WHERE id = ?").bind(id).first();
    if (updated) {
      return {
        ...updated,
        services: typeof updated.services === "string" ? JSON.parse(updated.services || "[]") : updated.services,
      };
    }
  }

  const store = readLocalStore();
  const item = (store.bookings || []).find((b) => b.id === id);
  if (item) {
    item.status = status;
    writeLocalStore(store);
    return {
      ...item,
      services: typeof item.services === "string" ? JSON.parse(item.services || "[]") : item.services,
    };
  }
  return null;
}

export async function deleteBooking(id) {
  const d1 = await getD1Database();
  if (d1) {
    await d1.prepare("DELETE FROM bookings WHERE id = ?").bind(id).run();
    return true;
  }

  const store = readLocalStore();
  store.bookings = (store.bookings || []).filter((b) => b.id !== id);
  writeLocalStore(store);
  return true;
}

// ---------- Projects Operations ----------
export async function getProjects() {
  const d1 = await getD1Database();
  if (d1) {
    const { results } = await d1.prepare("SELECT * FROM projects WHERE is_deleted = 0 ORDER BY created_at DESC").all();
    return results || [];
  }

  const store = readLocalStore();
  return (store.projects || []).filter((p) => !p.is_deleted);
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

  const store = readLocalStore();
  const newProject = {
    ...projectData,
    id,
    is_deleted: false,
    created_at: now,
  };
  store.projects = store.projects || [];
  store.projects.unshift(newProject);
  writeLocalStore(store);

  return newProject;
}

export async function deleteProject(id) {
  const d1 = await getD1Database();
  if (d1) {
    await d1.prepare("UPDATE projects SET is_deleted = 1 WHERE id = ?").bind(id).run();
    return true;
  }

  const store = readLocalStore();
  const p = (store.projects || []).find((item) => item.id === id);
  if (p) {
    p.is_deleted = true;
    writeLocalStore(store);
  }
  return true;
}
