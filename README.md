# FindThem NG — Phase 1 MVP

A missing-persons reporting platform for Nigeria. Searchable case listings, public report
submission, and an admin review dashboard — built mobile-first and light enough for slow
networks.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS

> ⚠️ The sample cases in `data/cases.json` are **fictional** — replace or clear them before launch.

## Quick start

```bash
npm install
cp .env.local.example .env.local   # then set a strong ADMIN_PASSWORD
npm run dev
```

Open http://localhost:3000

- **Public site:** home, `/cases` (search + filters by state, status, gender), `/cases/[id]`, `/report`
- **Admin:** `/admin` — approve/reject pending reports, mark cases as found, reopen cases.
  Password comes from `ADMIN_PASSWORD` in `.env.local` (falls back to `findthem-admin` in dev —
  **never rely on the fallback in production**).

## How data is stored (Phase 1)

- Cases live in `data/cases.json`; photos are saved to `public/uploads/`.
- All reads/writes go through `lib/db.ts`, so swapping to Supabase/Postgres in Phase 2
  means changing that one file.
- Because storage is on disk, deploy Phase 1 to a host with a **persistent filesystem**
  (Render, Railway, a VPS, or cPanel Node hosting). Vercel's serverless filesystem is
  read-only/ephemeral — move to a real database first if you want Vercel.

## Report flow

1. Anyone submits a case at `/report` (photo optional, max 5 MB, JPG/PNG/WebP).
2. It enters the queue as **pending** — not publicly visible.
3. An admin approves it (goes live as **missing**), rejects it, or later marks it **found**.
4. Every public case page has one-tap **WhatsApp share** and **call** buttons.
5. The reporter's private phone number is only visible in the admin dashboard; the public
   page shows the separate "public contact phone" the reporter chose to display.

## Project structure

```
app/                 Pages + API routes (App Router)
  api/cases          Public: GET listings, POST new report
  api/admin          Login/logout, full case list, status updates (cookie-protected)
  admin              Review dashboard + login
components/          CaseCard, StatusBadge
lib/                 db.ts (storage), auth.ts, types.ts, states.ts, format.ts
data/cases.json      Case store (Phase 1)
middleware.ts        Protects /admin and /api/admin
```

## Phase 2 roadmap

- WhatsApp/Twilio integration: sighting reports via WhatsApp, automatic alerts to
  subscribers in the affected state, and status updates to reporters.
- Move storage from JSON to Supabase/Postgres (edit `lib/db.ts` only).
- Cloud photo storage (Cloudinary/Supabase Storage).
- SMS fallback for non-smartphone users.
