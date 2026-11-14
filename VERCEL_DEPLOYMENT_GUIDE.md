# Deploying Blue Heaven Landscape on Vercel

Vercel is the creator and native platform for Next.js. Deploying this project to Vercel is 100% zero-config and free.

---

## 1. Quick Deploy Steps (2 Minutes)

1. **Log in to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in with your **GitHub** account.

2. **Import Your Repository**:
   - Click **"Add New..."** ➔ **"Project"**.
   - Select **`Rezenoris-bytes/Landscap`** from your repository list and click **"Import"**.

3. **Configure Project Settings**:
   - **Framework Preset**: `Next.js` (detected automatically)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `next build` (leave default)
   - **Output Directory**: `.next` (leave default)
   - **Install Command**: `npm install` (leave default)

4. **Environment Variables (Optional)**:
   You can add these under the **Environment Variables** section if you want custom admin credentials:
   - `ADMIN_EMAIL`: `admin@blueheavenlandscape.com` (default)
   - `ADMIN_PASSWORD`: `BHLadmin@2026` (default)
   - `JWT_SECRET`: Any random 32+ character string

5. **Deploy**:
   - Click the blue **"Deploy"** button.
   - Vercel will build all 47 pages and serverless API endpoints in under 45 seconds.
   - You'll get your live URL (e.g. `https://landscap-xxx.vercel.app`).

---

## 2. Features Included on Vercel Free Tier

- **Global Edge CDN**: Instant page loads worldwide.
- **Static Site Generation (SSG)**: All 47 pages (services, blog guides, residential/resort/commercial) are pre-rendered into static HTML.
- **Serverless API Routes**: `/api/bookings`, `/api/projects`, and `/api/auth` run automatically on demand.
- **Automatic HTTPS/SSL**: Free SSL certificates renewed automatically.
- **Automatic CI/CD**: Every `git push origin main` triggers a fresh deployment automatically.
- **Custom Domain**: Connect your domain (e.g. `blueheavenlandscape.com`) with one click in Project Settings > Domains.

