-- Cloudflare D1 SQL Schema for Blue Heaven Landscape

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT 'Admin',
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  space TEXT NOT NULL,
  services TEXT NOT NULL,
  city TEXT NOT NULL,
  timeline TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  note TEXT DEFAULT '',
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  place TEXT DEFAULT '',
  type TEXT NOT NULL,
  service TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  before_path TEXT DEFAULT '',
  after_path TEXT NOT NULL,
  is_deleted INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);

