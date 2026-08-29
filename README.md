# FlyAustria Study Abroad Website (`https://flyaustria.in/`)

Production-ready, ultra-fast website for **FlyAustria Study Abroad**—a niche consultancy based in Kochi, Kerala, India, focusing exclusively on Austrian public university admissions, student residence permit visas, MEA apostille, and student housing.

---

## 🌟 Tech Stack Highlights

- **Framework**: Astro 5 (TypeScript, static generation + serverless API endpoints).
- **Styling**: Tailwind CSS + Custom CSS Design System (Zero UI component bloat).
- **Database Layer**: Drizzle ORM with **dual engine support** for:
  - **Neon Serverless Postgres** (`postgresql://...`)
  - **Turso LibSQL / Local SQLite** (`libsql://...` or `file:local.db`)
- **Forms**: Progressive enhancement (Works with & without JavaScript).
- **SEO & Schema**: Full JSON-LD structured data for `LocalBusiness`, `EducationalOrganization`, `FAQPage`, and `Service`.
- **Lead Magnet**: Integrated downloadable PDF checklist in `public/flyaustria-eligibility-checklist.pdf`.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Clone or navigate to directory
cd /home/faiz/Desktop/demo-outreach

# 2. Install dependencies
npm install

# 3. Seed initial database (Universities, Testimonials, FAQs)
npm run db:seed

# 4. Start local development server
npm run dev
```

Visit `http://localhost:4321` in your browser.

---

## 🗄️ Database Switching Guide (Neon vs. Turso)

FlyAustria uses a dynamic database factory (`src/db/index.ts`) and unified schema (`src/db/schema.ts`). You can switch between Neon (PostgreSQL) and Turso (LibSQL/SQLite) simply by editing your environment variables in `.env`:

### Option A: Local SQLite / Turso (Default)

```env
DATABASE_URL="file:local.db"
# Or Turso Cloud:
# DATABASE_URL="libsql://your-database.turso.io"
# TURSO_AUTH_TOKEN="your-turso-token"
```

### Option B: Neon Serverless Postgres

```env
DATABASE_URL="postgresql://user:password@ep-cool-name.us-east-2.aws.neon.tech/flyaustria?sslmode=require"
```

Running `npm run db:seed` automatically detects the provider, creates tables if needed, and seeds the data!

---

## 📦 Production Build & Deployment

```bash
# Production Build
npm run build

# Preview Production Build locally
npm run preview
```

### Deploying to Cloudflare Pages or Vercel
- Simply connect your repository to Vercel or Cloudflare Pages.
- Add `DATABASE_URL` (and optional `TURSO_AUTH_TOKEN`) in the environment settings.
- Build command: `npm run build`
- Output directory: `dist`

---

## 📁 Key Pages Included

1. `/` - **Homepage**: Hero section, Trust bar (98% visa rate, 150+ students placed), Services grid, Why Austria vs Germany/Canada, 6-step Process timeline, Testimonials, FAQ Accordion, Lead magnet download banner.
2. `/about` - **About Us**: Mission, ethical consultancy principles, Kochi office details.
3. `/services` - **Services**: Detailed breakdown of 6 core admissions & visa offerings.
4. `/universities` - **Austrian Public Universities**: Directory with public tuition rates (€726/sem), English programs, rankings.
5. `/process` - **Process & Visa Checklist**: Document requirements for Austrian Embassy VFS New Delhi.
6. `/testimonials` - **Success Stories**: Student reviews & video experience placeholder.
7. `/blog` & `/blog/[slug]` - **Resource Hub**: SEO MDX articles (Cost of Living, Visa Checklist, English Master's).
8. `/contact` - **Contact**: WhatsApp-first conversion + Progressive HTML Form (`/api/contact`).
9. `/privacy` & `/terms` - Legal compliance.

---

© 2026 FlyAustria Study Abroad. Express Towers, MG Road, Kochi, Kerala 682016.
# fly-austria
