import fs from "fs";
import path from "path";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "landscap_db";
const JWT_SECRET = process.env.JWT_SECRET || "d9830fc353a5b1b49c4f10c77e4e9d20acf7ff86ec06caf390926ba2d4588c2e";
export const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@blueheavenlandscape.com").toLowerCase();
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "BHLadmin@2026";

// Fallback JSON store file path
const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_FILE)) {
    const initial = {
      users: [
        {
          _id: "admin-1",
          email: ADMIN_EMAIL,
          password_hash: bcrypt.hashSync(ADMIN_PASSWORD, 10),
          name: "Admin",
          role: "admin",
          created_at: new Date().toISOString(),
        },
      ],
      bookings: [
        {
          _id: "demo-booking-1",
          space: "resort",
          services: ["complete-landscape", "smart-irrigation"],
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

function readStore() {
  ensureStore();
  try {
    return JSON.parse(fs.readFileSync(STORE_FILE, "utf8"));
  } catch {
    return { users: [], bookings: [], projects: [] };
  }
}

function writeStore(data) {
  ensureStore();
  fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf8");
}

let cachedClient = null;
let useFallback = false;

async function getMongoDb() {
  if (useFallback) return null;
  if (cachedClient) {
    return cachedClient.db(DB_NAME);
  }
  try {
    const client = new MongoClient(MONGO_URL, { serverSelectionTimeoutMS: 1500 });
    await client.connect();
    cachedClient = client;
    return client.db(DB_NAME);
  } catch (err) {
    console.warn("MongoDB connection failed, using local persistent fallback store:", err.message);
    useFallback = true;
    return null;
  }
}

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

// User operations
export async function getAdminUser() {
  const db = await getMongoDb();
  if (db) {
    let user = await db.collection("users").findOne({ email: ADMIN_EMAIL });
    if (!user) {
      const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);
      const res = await db.collection("users").insertOne({
        email: ADMIN_EMAIL,
        password_hash: hash,
        name: "Admin",
        role: "admin",
        created_at: new Date().toISOString(),
      });
      return { _id: res.insertedId.toString(), email: ADMIN_EMAIL, name: "Admin", role: "admin" };
    }
    return { ...user, _id: user._id.toString() };
  }

  const store = readStore();
  let user = store.users.find((u) => u.email.toLowerCase() === ADMIN_EMAIL);
  if (!user) {
    user = {
      _id: "admin-1",
      email: ADMIN_EMAIL,
      password_hash: bcrypt.hashSync(ADMIN_PASSWORD, 10),
      name: "Admin",
      role: "admin",
      created_at: new Date().toISOString(),
    };
    store.users.push(user);
    writeStore(store);
  }
  return user;
}

export async function verifyAdminLogin(email, password) {
  const normalizedEmail = (email || "").toLowerCase().trim();
  const db = await getMongoDb();
  if (db) {
    const user = await db.collection("users").findOne({ email: normalizedEmail });
    if (user && bcrypt.compareSync(password, user.password_hash)) {
      return { id: user._id.toString(), email: user.email, name: user.name || "Admin", role: "admin" };
    }
    return null;
  }

  const store = readStore();
  const user = store.users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (user && bcrypt.compareSync(password, user.password_hash)) {
    return { id: user._id, email: user.email, name: user.name || "Admin", role: "admin" };
  }
  return null;
}

// Bookings
export async function getBookings() {
  const db = await getMongoDb();
  if (db) {
    const list = await db.collection("bookings").find({}).sort({ created_at: -1 }).toArray();
    return list.map((b) => ({ ...b, id: b._id.toString() }));
  }
  const store = readStore();
  return (store.bookings || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((b) => ({ ...b, id: b._id }));
}

export async function createBooking(data) {
  const doc = {
    ...data,
    status: "new",
    created_at: new Date().toISOString(),
  };
  const db = await getMongoDb();
  if (db) {
    const res = await db.collection("bookings").insertOne(doc);
    return { ...doc, id: res.insertedId.toString() };
  }
  const store = readStore();
  const id = "b_" + Date.now();
  const newBooking = { ...doc, _id: id, id };
  store.bookings = store.bookings || [];
  store.bookings.unshift(newBooking);
  writeStore(store);
  return newBooking;
}

export async function updateBookingStatus(id, status) {
  const db = await getMongoDb();
  if (db) {
    try {
      const res = await db.collection("bookings").findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { status } },
        { returnDocument: "after" }
      );
      if (res?.value) return { ...res.value, id: res.value._id.toString() };
    } catch {}
  }
  const store = readStore();
  const item = (store.bookings || []).find((b) => b._id === id || b.id === id);
  if (item) {
    item.status = status;
    writeStore(store);
    return item;
  }
  return null;
}

export async function deleteBooking(id) {
  const db = await getMongoDb();
  if (db) {
    try {
      await db.collection("bookings").deleteOne({ _id: new ObjectId(id) });
      return true;
    } catch {}
  }
  const store = readStore();
  store.bookings = (store.bookings || []).filter((b) => b._id !== id && b.id !== id);
  writeStore(store);
  return true;
}

// Projects
export async function getProjects() {
  const db = await getMongoDb();
  if (db) {
    const list = await db.collection("projects").find({ is_deleted: { $ne: true } }).sort({ created_at: -1 }).toArray();
    return list.map((p) => ({ ...p, id: p._id.toString() }));
  }
  const store = readStore();
  return (store.projects || []).filter((p) => !p.is_deleted).map((p) => ({ ...p, id: p._id }));
}

export async function createProject(projectData) {
  const doc = {
    ...projectData,
    created_at: new Date().toISOString(),
    is_deleted: false,
  };
  const db = await getMongoDb();
  if (db) {
    const res = await db.collection("projects").insertOne(doc);
    return { ...doc, id: res.insertedId.toString() };
  }
  const store = readStore();
  const id = "p_" + Date.now();
  const newProj = { ...doc, _id: id, id };
  store.projects = store.projects || [];
  store.projects.unshift(newProj);
  writeStore(store);
  return newProj;
}

export async function deleteProject(id) {
  const db = await getMongoDb();
  if (db) {
    try {
      await db.collection("projects").updateOne({ _id: new ObjectId(id) }, { $set: { is_deleted: true } });
      return true;
    } catch {}
  }
  const store = readStore();
  const p = (store.projects || []).find((item) => item._id === id || item.id === id);
  if (p) {
    p.is_deleted = true;
    writeStore(store);
  }
  return true;
}

