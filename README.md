# 🌿 Blue Heaven Landscape — Next.js Full-Stack Web Application

Modern full-stack web application for **Blue Heaven Landscape (BHL)** built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **MongoDB**.

---

## ⚡ Quick Start

```powershell
# 1. Install dependencies (if not already installed)
npm install

# 2. Run the Next.js development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser!

---

## 🏗️ Architecture

The previous multi-repo setup (CRA React 19 + Python FastAPI) has been completely unified into a single, high-performance Next.js application:

- **Frontend & Pages:** Next.js App Router (`src/app/*`)
- **Backend APIs:** Next.js Route Handlers (`src/app/api/*`)
- **Styling & Design System:** Tailwind CSS with DM Sans typography, forest green & lime color palette
- **Interactive UI:** Radix UI primitives, Lucide React icons, Framer Motion animations
- **Database:** MongoDB driver with automatic local zero-config JSON fallback (`.data/store.json`) so the entire app works out of the box even without MongoDB running!

---

## 🗺️ Routes & Pages

| Path | Purpose |
|------|---------|
| `/` | Homepage with hero video, spaces marquee, and service showcase |
| `/resorts` | Resort landscaping segment |
| `/commercial` | Commercial landscaping segment |
| `/homes` | Residential landscaping segment |
| `/services` | All 7 landscaping services and comparison |
| `/services/[id]` | Individual service detail pages |
| `/how-we-work` | 6-step landscape design & build process |
| `/projects` | Portfolio gallery with before/after comparison sliders |
| `/about` | Company history, founder story, and pillars |
| `/insights` | Blog & knowledge guides |
| `/insights/[id]` | Individual guide article pages |
| `/faq` | Frequently asked questions |
| `/contact` | Contact details, phone & WhatsApp links |
| `/book` | 3-step consultation booking flow with calendar scheduling |
| `/thank-you` | Booking confirmation page |
| `/privacy-policy` | Privacy policy page |
| `/admin/login` | Admin portal login |
| `/admin` | Admin dashboard for managing bookings and portfolio projects |

---

## 🔌 API Endpoints (Next.js Route Handlers)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api` | API health & welcome message |
| `POST` | `/api/auth/login` | Admin authentication with JWT cookie |
| `POST` | `/api/auth/logout` | Clear session cookie |
| `GET` | `/api/auth/me` | Current admin session profile |
| `GET` | `/api/bookings` | Retrieve consultation bookings (Admin) |
| `POST` | `/api/bookings` | Submit new consultation booking |
| `PATCH` | `/api/bookings/[id]` | Update booking status (`new`, `contacted`, `site-visit`, `closed`) |
| `DELETE` | `/api/bookings/[id]` | Delete booking |
| `GET` | `/api/projects` | List portfolio projects |
| `POST` | `/api/projects` | Upload & publish new project |
| `DELETE` | `/api/projects/[id]` | Remove project |

---

## 🔑 Admin Credentials

- **URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email:** `admin@blueheavenlandscape.com`
- **Password:** `BHLadmin@2026`

---

## 🚀 1-Click Deployment (Vercel / Cloudflare / Netlify)

Because this is now a unified standard Next.js application, you can deploy it in 1 click without needing separate Python server hosting:

### Vercel (Recommended):
1. Push repository to GitHub.
2. Import project on [Vercel](https://vercel.com).
3. Set environment variables (`MONGO_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).
4. Click **Deploy**!
