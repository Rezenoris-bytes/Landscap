# ☁️ How to Deploy to Cloudflare (100% Free Fullstack + SQL)

Your project is built with **Next.js 14 App Router** and configured for **Cloudflare Pages** with **Cloudflare D1 (SQL)**.

Follow these simple steps to go live:

---

## 📦 Step 1: Push Your Code to GitHub

Open PowerShell in `O:\Landscap`:

```powershell
cd O:\Landscap

# 1. Initialize git and commit
git init
git add .
git commit -m "Next.js Fullstack with Cloudflare D1 SQL"

# 2. Create a repository on github.com (e.g. 'landscap') and push:
git remote add origin https://github.com/YOUR_USERNAME/landscap.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Step 2: Create Your Free Cloudflare D1 Database

1. Log in to the **[Cloudflare Dashboard](https://dash.cloudflare.com/)**.
2. In the left sidebar, click **Storage & Databases** → **D1 SQL Database**.
3. Click **Create Database**.
   - Name: `blue-heaven-db`
   - Click **Create**.
4. Once created, click on `blue-heaven-db` → click the **Console** tab.
5. Paste the contents of `schema.sql` into the console and click **Execute**:

```sql
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
```

---

## 🚀 Step 3: Connect to Cloudflare Pages

1. In the Cloudflare Dashboard, go to **Workers & Pages** → **Overview**.
2. Click **Create application** → select the **Pages** tab.
3. Click **Connect to Git** and select your GitHub repository.
4. Set the build configuration:
   - **Framework preset:** `Next.js`
   - **Build command:** `npx @cloudflare/next-on-pages`
   - **Build output directory:** `.vercel/output/static`
   - **Root directory:** `/`
5. Click **Save and Deploy**.

---

## 🔗 Step 4: Link D1 Database & Environment Settings

In your Cloudflare Pages project:

### 1. Link the D1 Database:
- Go to **Settings** → **Functions**.
- Under **D1 database bindings**, click **Add binding**:
  - **Variable name:** `DB` *(Must be capital DB)*
  - **D1 database:** Select `blue-heaven-db`
- Click **Save**.

### 2. Add Compatibility Flag:
- In **Settings** → **Functions** → **Compatibility flags**:
- For **Production**, add: `nodejs_compat`
- Click **Save**.

### 3. Add Environment Variables:
- In **Settings** → **Environment variables** → **Production**, add:
  - `JWT_SECRET`: `d9830fc353a5b1b49c4f10c77e4e9d20acf7ff86ec06caf390926ba2d4588c2e`
  - `ADMIN_EMAIL`: `admin@blueheavenlandscape.com`
  - `ADMIN_PASSWORD`: `BHLadmin@2026`

---

## 🎉 Step 5: Redeploy & Live!

Go to the **Deployments** tab in Cloudflare Pages and click **Retry deployment** on the latest build.

Your fullstack website is now live worldwide with 0 ms cold starts and 100% free hosting! 🚀

