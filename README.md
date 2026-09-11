# ⚡ BuatCV AI - Modern CV Builder with LinkedIn Auto-Fill (Database-less)

A modern, high-converting CV & Resume Builder web application inspired by [Zety](https://zety.com/t3a). It operates **100% database-less** with browser `localStorage` persistence, exports to crisp PDF, and can be deployed for free on **Vercel** or **Netlify**.

---

## ✨ Features

- **💼 LinkedIn Integration**:
  - **OAuth 2.0 OpenID Connect**: Instant auto-fill of Full Name, Email, Profile Picture, and headline.
  - **LinkedIn PDF Import**: Extracts complete Work Experience, Education history, and Skills from LinkedIn's official "Save to PDF" profile export.
  - **1-Click Demo Profiles**: Test instantly with realistic Senior Engineer or Product Manager profiles without needing API credentials.
- **🎨 4 Professional ATS-Friendly Templates**:
  - **Modern Pro**: Two-column layout with sidebar and contact timeline (Zety's most popular format).
  - **Minimalist Clean**: High-whitespace single column with excellent ATS parsing scores.
  - **Executive Serif**: Prestigious corporate design with classic serif headings.
  - **Tech Specialist**: Modern code-accented badges, GitHub links, and metric-focused roles.
- **🛠️ Real-time Customization**:
  - Instant theme accent color selector (Royal Blue, Emerald, Violet, Crimson, Amber, Slate, Cyan).
  - Modern font switcher (Inter, Plus Jakarta Sans, Merriweather, Outfit, JetBrains Mono).
  - Live A4 zoom controls (40% to 150%) with zero lag.
- **📦 Zero Database Overhead (100% Free Hosting)**:
  - All resumes persist locally in your browser (`localStorage`).
  - **Export JSON & Import JSON** for offline backups and cross-device sharing.
- **📄 High-Fidelity PDF & Print**:
  - Vector-accurate `@media print` formatted for exact A4 paper dimensions.
  - One-click client-side "Download PDF" button.

---

## 🚀 Quick Start (Local Development)

1. Clone or navigate to the directory:
   ```bash
   cd "resume AI"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure LinkedIn OAuth credentials:
   Create a `.env.local` file:
   ```env
   LINKEDIN_CLIENT_ID=your_client_id
   LINKEDIN_CLIENT_SECRET=your_client_secret
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
   > *Note:* If credentials are not provided, the app will smoothly fallback to the built-in **Demo LinkedIn Auto-Fill** and **LinkedIn PDF Upload**, allowing complete functionality immediately!

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Free Deployment (Vercel & Netlify)

### Deploy to Vercel
1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New" -> "Project"**.
3. Import your repository. Vercel will automatically detect Next.js.
4. Under Environment Variables, add:
   - `LINKEDIN_CLIENT_ID` (optional)
   - `LINKEDIN_CLIENT_SECRET` (optional)
   - `NEXT_PUBLIC_BASE_URL` = `https://your-project.vercel.app`
5. Click **Deploy**.

### Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and click **"Add new site" -> "Import an existing project"**.
2. Select your repository. Build settings are auto-configured by `netlify.toml`.
3. Add your environment variables in Site settings.
4. Click **Deploy site**.

---

## 🔑 How LinkedIn Auto-Fill Works Without a Database

1. When a user clicks **Connect LinkedIn**, the request is routed to `/api/auth/linkedin`.
2. Upon approval, LinkedIn redirects back to `/api/auth/linkedin/callback` with a temporary code.
3. The serverless route securely exchanges this code for an access token using your server-side secret (never exposed to the browser).
4. The user's profile info is retrieved from `https://api.linkedin.com/v2/userinfo` and sent to the client.
5. The frontend Zustand store consumes this payload, immediately populating the CV builder form fields and saving them to the user's browser `localStorage`.
6. **No database is ever touched, keeping your hosting 100% free and private!**
