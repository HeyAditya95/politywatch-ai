> **Political Accountability Intelligence** — A chart-first lens on the Indian Parliament.
Search any Indian MP and see their asset growth, election promises, and MPLADS spend in clear, comparable charts — with AI-generated summaries on top.
**Origin:** Initially built for the **Next Gen Hackathon (October 2025)**, then selected as my **college main project**.
Search any Indian Member of Parliament and see their declared asset growth, election promises, MPLADS spending, attendance, and criminal record — all in clean, comparable charts with AI-generated plain-language summaries on top.
**Origin:** Initially built for the **Next Gen Hackathon (October 2025)**, then selected as my **college main project** for final-year submission.
![PolityWatch Preview](https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a6a38161-2c4c-4812-a43c-a9fa424f10d0/id-preview-319e5226--5f1c9897-43bf-404e-b33a-7ce9198d16f6.lovable.app-1777532468749.png)
---
## Table of Contents
1. [Live Demo](#live-demo)
2. [Problem Statement](#problem-statement)
3. [Solution Overview](#solution-overview)
4. [Features](#features)
5. [Tech Stack](#tech-stack)
6. [Architecture](#architecture)
7. [Project Structure](#project-structure)
8. [Getting Started](#getting-started)
9. [Environment Variables](#environment-variables)
10. [Data Source & Methodology](#data-source--methodology)
11. [Design System](#design-system)
12. [Key Routes](#key-routes)
13. [Risk Score Algorithm](#risk-score-algorithm)
14. [Deployment](#deployment)
15. [Testing the App](#testing-the-app)
16. [Future Roadmap](#future-roadmap)
17. [Known Limitations](#known-limitations)
18. [Acknowledgements](#acknowledgements)
19. [License](#license)
---
## Live Demo
- **Preview**: [https://public-figure-stats.lovable.app](https://public-figure-stats.lovable.app)
---
## Problem Statement
Indian citizens have access to a huge amount of public data about their elected representatives — asset affidavits filed with the Election Commission, MPLADS expenditure reports, parliamentary attendance, debate counts, and criminal case records. But this data is:
- **Fragmented** across multiple government portals (ECI, MyNeta, MPLADS, Sansad)
- **Hard to read** — PDFs, scanned affidavits, raw spreadsheets
- **Disconnected** — you can't easily compare two MPs side-by-side
- **Static** — no trend lines, no charts, no summaries
- **Inaccessible** to a voter who just wants a 30-second answer
The result: most voters never look. Accountability suffers.
## Solution Overview
PolityWatch is a **single-page voter-friendly dashboard** that:
1. Aggregates declared MP data into one searchable interface
2. Visualises asset growth, promise fulfilment, and fund utilisation as charts
3. Uses **Lovable AI** to generate a plain-language summary for each MP
4. Lets you **compare two MPs side-by-side** across every metric
5. Computes a transparent **Risk Score** so a voter gets a one-glance signal
It's designed mobile-first for the largest audience — a voter on a phone — but scales beautifully to desktop.
---
## Features
| Feature | Description |
|---------|-------------|
| **MP Search** | Search & filter MPs by name, party, state, or constituency |
| **Asset Tracking** | Year-by-year declared asset growth with visual charts |
| **Asset Tracking** | Year-by-year declared asset growth with line/area charts |
| **Promise Tracker** | Monitor which manifesto promises are fulfilled, in-progress, or broken |
| **MPLADS Spend** | Local Area Development fund utilization by year and category |
| **MPLADS Spend** | Local Area Development fund utilisation by year and category |
| **AI Summaries** | Plain-language AI-generated insights for every MP profile |
| **Side-by-Side Compare** | Compare two MPs across all metrics simultaneously |
| **Risk Scoring** | Algorithmic risk score based on wealth growth, criminal cases, attendance & broken promises |
| **Risk Scoring** | Algorithmic risk score based on wealth growth, criminal cases, attendance, and broken promises |
| **Case File Carousel** | Featured MPs surfaced on the homepage in a magazine-style carousel |
| **Stats Ticker** | Live-looking parliamentary stats on the landing hero |
| **Dark / Light Mode** | Theme toggle with persisted preference |
| **Responsive Design** | Fully responsive from mobile to desktop with dark-mode-first aesthetic |
| **SEO Optimised** | Per-route `<head>` metadata, OG tags, semantic HTML |
---
## Tech Stack
|-------|------------|
| **Frontend** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Framework** | [TanStack Start v1](https://tanstack.com/start) (full-stack React with SSR/SSG) |
| **Router** | [TanStack Router](https://tanstack.com/router) (file-based, type-safe) |
| **Data Fetching** | [TanStack Query](https://tanstack.com/query) |
| **Bundler** | [Vite 7](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with custom CSS design tokens |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) primitives + shadcn/ui |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) primitives + [shadcn/ui](https://ui.shadcn.com/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Backend Runtime** | [Cloudflare Workers](https://workers.cloudflare.com/) (edge serverless) |
| **Database / Auth / Storage** | [Lovable Cloud](https://lovable.dev/) (managed Supabase backend) |
| **ORM / Client** | [Supabase JavaScript Client](https://github.com/supabase/supabase-js) |
| **AI** | Lovable AI Gateway (Google Gemini / OpenAI GPT models — no API key required) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Validation** | [Zod](https://zod.dev/) |
| **Package Manager** | [Bun](https://bun.sh/) |
| **Deployment** | [Wrangler](https://developers.cloudflare.com/workers/wrangler/) → Cloudflare Workers |
---
## Architecture
```
┌──────────────────────────────────────────────────────────────┐
│                         Browser (React 19)                    │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────────┐  │
│  │ TanStack   │  │ TanStack     │  │ shadcn/ui +         │  │
│  │ Router     │  │ Query        │  │ Tailwind v4         │  │
│  └─────┬──────┘  └──────┬───────┘  └─────────────────────┘  │
└────────┼────────────────┼────────────────────────────────────┘
         │                │
         │  SSR + Server Functions (createServerFn)
         ▼                ▼
┌──────────────────────────────────────────────────────────────┐
│            Cloudflare Workers (workerd runtime)               │
│  ┌──────────────────────┐   ┌────────────────────────────┐  │
│  │  TanStack Start SSR  │   │  Server Functions / Routes │  │
│  └──────────┬───────────┘   └─────────────┬──────────────┘  │
└─────────────┼─────────────────────────────┼─────────────────┘
              │                             │
              ▼                             ▼
       ┌────────────┐               ┌──────────────────┐
       │ Static     │               │ Lovable Cloud    │
       │ MP Dataset │               │ (Supabase: DB,   │
       │ (src/data) │               │  Auth, Storage)  │
       └────────────┘               └──────────────────┘
                                              │
                                              ▼
                                     ┌──────────────────┐
                                     │ Lovable AI       │
                                     │ Gateway (Gemini, │
                                     │ GPT models)      │
                                     └──────────────────┘
```
**Why this stack?**
- **TanStack Start** gives us SSR, file-based routing, and typed server functions in one framework — no separate backend repo.
- **Cloudflare Workers** runs the app at the edge globally, with near-zero cold starts.
- **Lovable Cloud** removes all backend boilerplate (auth, database, RLS, storage) so the focus stays on the user experience.
- **Tailwind v4 + shadcn/ui** lets us ship a polished, accessible UI without designing every primitive from scratch.
---
## Project Structure
```
├── src/
│   ├── components/           # Reusable React components
│   │   ├── ui/              # shadcn/ui primitives (buttons, dialogs, tabs, etc.)
│   │   ├── mp-card.tsx      # MP card component (used in search & compare)
│   │   ├── site-chrome.tsx  # Header, footer, demo data banner
│   │   └── theme-provider.tsx # Dark/light mode toggle
│   ├── components/              # Reusable React components
│   │   ├── ui/                  # shadcn/ui primitives (buttons, dialogs, tabs, etc.)
│   │   ├── mp-card.tsx          # MP card component (used in search & compare)
│   │   ├── site-chrome.tsx      # Header, footer, demo data banner
│   │   └── theme-provider.tsx   # Dark/light mode toggle
│   ├── data/
│   │   ├── mps.ts           # Demo MP dataset (15 MPs with assets, promises, LAD data)
│   │   └── mps_appendix.ts  # Additional MP data
│   │   ├── mps.ts               # Demo MP dataset (15 MPs with assets, promises, LAD data)
│   │   └── mps_appendix.ts      # Additional MP data
│   ├── integrations/
│   │   └── supabase/        # Supabase clients (browser + server-side admin)
│   │   └── supabase/            # Supabase clients (browser + server-side admin + auth middleware)
│   ├── lib/
│   │   └── utils.ts         # Utility helpers (cn, etc.)
│   ├── routes/              # TanStack file-based routes
│   │   ├── __root.tsx       # Root layout (HTML shell, meta tags, fonts)
│   │   ├── index.tsx        # Homepage (hero, stats, case files carousel)
│   │   ├── mp.$mpId.tsx     # Individual MP profile page
│   │   ├── compare.tsx      # Side-by-side MP comparison
│   │   └── about.tsx        # About page
│   ├── router.tsx           # TanStack Router configuration
│   ├── styles.css           # Global styles, CSS variables, design tokens
│   └── routeTree.gen.ts     # Auto-generated route tree
│   │   └── utils.ts             # Utility helpers (cn, formatters, etc.)
│   ├── routes/                  # TanStack file-based routes
│   │   ├── __root.tsx           # Root layout (HTML shell, meta tags, fonts)
│   │   ├── index.tsx            # Homepage (hero, stats, case files carousel)
│   │   ├── mp.$mpId.tsx         # Individual MP profile page
│   │   ├── compare.tsx          # Side-by-side MP comparison
│   │   └── about.tsx            # About page
│   ├── router.tsx               # TanStack Router configuration
│   ├── start.ts                 # TanStack Start instance (middleware registration)
│   ├── styles.css               # Global styles, CSS variables, design tokens
│   └── routeTree.gen.ts         # Auto-generated route tree (do not edit)
├── supabase/
│   └── config.toml          # Supabase configuration
├── wrangler.jsonc           # Cloudflare Workers deployment config
├── vite.config.ts           # Vite configuration (via @lovable.dev/vite-tanstack-config)
├── tsconfig.json            # TypeScript config
├── tailwindcss v4           # Configured via CSS @import in styles.css
└── package.json
```
│   └── config.toml              # Supabase configuration
├── wrangler.jsonc               # Cloudflare Workers deployment config
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript config (strict mode)
├── package.json
└── README.md
```
---
## Getting Started
### Prerequisites
- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/) (recommended)
- A [Lovable Cloud](https://lovable.dev/) account (for database/auth — auto-configured)
### Install & Run
```bash
# Install dependencies
# 1. Install dependencies
bun install
# Start development server
# 2. Start development server
bun run dev
# Build for production
# 3. Build for production
bun run build
# Preview production build locally
# 4. Preview the production build locally
bun run preview
```
The dev server will start at `http://localhost:3000` (or the port Vite assigns).
### Environment Variables
The following are auto-populated by Lovable Cloud:
```
The dev server starts at **`http://localhost:3000`** (or the next free port).
---
## Environment Variables
These are auto-populated by Lovable Cloud — no manual setup required.
```env
# Browser-safe (exposed to client bundle)
VITE_SUPABASE_URL=             # Supabase project URL
VITE_SUPABASE_PUBLISHABLE_KEY= # Supabase anon/public key
VITE_SUPABASE_PROJECT_ID=      # Supabase project ref
# Server-only (never bundled to client)
SUPABASE_URL=                  # Server-side Supabase URL
SUPABASE_PUBLISHABLE_KEY=      # Server-side anon key
SUPABASE_SERVICE_ROLE_KEY=     # Server-side admin key (keep secret)
```
> **Never commit `.env` to version control.** It is already in `.gitignore`.
## Data Source
This demo ships with **seeded, illustrative data** for 15 prominent Indian MPs so the charts render immediately. The data is stored as a static TypeScript array in `src/data/mps.ts` and is **not live or authoritative**.
> ⚠️ **Disclaimer**: Numbers are inspired by public sources (election affidavits, MPLADS portal, parliamentary records) but are not real-time and should not be cited as authoritative. A production version would ingest official datasets on a scheduled refresh.
SUPABASE_SERVICE_ROLE_KEY=     # Server-side admin key (bypasses RLS)
LOVABLE_API_KEY=               # Lovable AI Gateway key (for AI features)
```
> ⚠️ **Never commit `.env` to version control.** It is already in `.gitignore`.
---
## Data Source & Methodology
This demo ships with **seeded, illustrative data** for 15 prominent Indian MPs so the charts render immediately on first load — no database seeding step required.
- **Where the data lives**: a static, typed TypeScript array in `src/data/mps.ts` (with extra records in `src/data/mps_appendix.ts`)
- **What each MP record contains**: name, party, state, constituency, photo, asset history (year → declared value), promises (with status), MPLADS spend (year → category → amount), attendance %, debates participated, criminal cases, and an AI summary
- **How it's loaded**: imported directly at build time — no API call, no DB fetch, instant render
- **How it's surfaced**: TanStack Router loaders read from this dataset; the UI never knows it's static
> ⚠️ **Disclaimer**: Numbers are *inspired by* public sources (election affidavits, MPLADS portal, parliamentary records) but are **not real-time and not authoritative**. A production version would ingest official datasets on a scheduled refresh via cron jobs into Lovable Cloud (Supabase), and the frontend would read from the database instead of the static file. The visible **"Demo data" banner** in the app makes this clear to every user.
---
## Design System
PolityWatch uses a custom dark-first design system:
- **Primary Accent**: Saffron (`#ff7a1a`) — inspired by the Indian tricolor
- **Display Font**: [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) — bold, editorial headlines
- **UI / Mono Font**: [DM Mono](https://fonts.google.com/specimen/DM+Mono) — technical labels, stats, metadata
- **Body Font**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) — readable body copy
- **Surfaces**: Dark charcoal backgrounds with subtle grain texture
- **Borders**: Thin 1px rules for a clean, editorial aesthetic
All design tokens are defined as CSS variables in `src/styles.css`.
PolityWatch uses a custom **dark-first editorial** design system inspired by long-form journalism and dossier-style intelligence reports.
| Token | Value | Usage |
|-------|-------|-------|
| **Primary Accent** | Saffron `#ff7a1a` | Inspired by the Indian tricolor — used for CTAs, highlights, risk indicators |
| **Display Font** | [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) | Bold, editorial headlines |
| **UI / Mono Font** | [DM Mono](https://fonts.google.com/specimen/DM+Mono) | Technical labels, stats, metadata |
| **Body Font** | [DM Sans](https://fonts.google.com/specimen/DM+Sans) | Readable body copy |
| **Background** | Dark charcoal with subtle grain texture | Reduces eye fatigue, premium feel |
| **Borders** | Thin 1px rules | Clean editorial aesthetic |
| **Border Radius** | Minimal (2–6px) | Sharp, document-like |
All design tokens are defined as CSS variables in `src/styles.css` using `oklch()` for perceptually uniform colors. Components use semantic tokens (`--background`, `--foreground`, `--primary`) — never hard-coded colors.
---
## Key Routes
| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, stats ticker, case file carousel, and search |
| `/mp/:mpId` | Individual MP profile with charts, AI summary, and detailed stats |
| `/compare` | Side-by-side comparison of two MPs |
| `/about` | About the project and data methodology |
| Route | Description | SSR | Auth |
|-------|-------------|-----|------|
| `/` | Homepage with hero, stats ticker, case file carousel, and search | ✅ | Public |
| `/mp/:mpId` | Individual MP profile with charts, AI summary, and detailed stats | ✅ | Public |
| `/compare` | Side-by-side comparison of two MPs (query params `?a=&b=`) | ✅ | Public |
| `/about` | About the project and data methodology | ✅ | Public |
---
## Risk Score Algorithm
Each MP is assigned a transparent **0–100 risk score** that helps voters spot red flags at a glance. The score is a weighted blend of:
| Factor | Weight | Rationale |
|--------|--------|-----------|
| **Asset growth rate** | 35% | Disproportionate wealth growth vs declared income is the single strongest red flag |
| **Criminal cases** | 30% | Pending serious cases (IPC, PMLA) weighted higher than minor cases |
| **Attendance %** | 15% | Low attendance signals disengagement from parliamentary duty |
| **Broken promises ratio** | 20% | Promises marked "broken" / total promises made |
A **lower score is better.** The score is computed on-the-fly in `src/lib/utils.ts` and visualised as a colored badge (green < 30, amber 30–60, red > 60).
> The exact formula and weights are deliberately exposed in the codebase — accountability tools shouldn't have black-box scoring.
---
## Deployment
This project is configured to deploy to **Cloudflare Workers** via Wrangler:
This project is configured to deploy to **Cloudflare Workers** via Wrangler.
```bash
# Deploy to Cloudflare Workers (requires Wrangler CLI + auth)
npx wrangler deploy
```
The `wrangler.jsonc` file specifies the worker name (`politywatch`) and entry point.
The `wrangler.jsonc` file specifies the worker name (`politywatch`) and entry point. Lovable Cloud handles all backend infrastructure automatically — no separate DB provisioning required.
**Stable URLs** (won't change if the project is renamed):
- Production: `https://public-figure-stats.lovable.app`
- Preview: `https://id-preview--5f1c9897-43bf-404e-b33a-7ce9198d16f6.lovable.app`
---
## Testing the App
Manual smoke test (≈2 minutes):
1. Open `/` → confirm hero loads, stats ticker animates, case file carousel scrolls
2. Type a name into the search bar → confirm filtered results appear
3. Click any MP card → land on `/mp/:mpId` → confirm asset chart, promise tracker, MPLADS chart, AI summary, and risk badge render
4. Click **Compare** in the header → select two MPs → confirm side-by-side charts render
5. Toggle dark/light mode → confirm theme persists on reload
6. Resize to mobile width → confirm layout reflows cleanly
---
## Future Roadmap
- [ ] Integrate live Election Commission of India (ECI) affidavit API
- [ ] Ingest real MPLADS data from the official portal
- [ ] Add user authentication & bookmarking
- [ ] Export MP reports as PDF
- [ ] Add state-wise and party-wise aggregate dashboards
- [ ] Cron jobs for automated data refresh
- [ ] Integrate live **Election Commission of India (ECI)** affidavit API
- [ ] Ingest real **MPLADS** data from the official portal via scheduled cron
- [ ] Add **user authentication & bookmarking** (save MPs to a personal watchlist)
- [ ] Export MP reports as **PDF**
- [ ] Add **state-wise and party-wise aggregate dashboards**
- [ ] **Cron jobs** for automated daily data refresh
- [ ] **Multi-language support** (Hindi, Tamil, Bengali, Marathi, Telugu)
- [ ] **Push notifications** when a watched MP files a new affidavit
- [ ] **Constituency-level** dashboards (vote share, turnout, demographics)
- [ ] Open the dataset as a **public REST API** under `/api/public/*`
---
## Known Limitations
- Data is **static and illustrative** — not real-time. The "Demo data" banner makes this explicit.
- Only **15 MPs** are seeded; expanding to all 543 Lok Sabha + 245 Rajya Sabha MPs requires real ingestion.
- **AI summaries** in the static dataset are pre-written; live generation via Lovable AI is wired but not enabled per-request to keep the demo fast.
- No **authentication** yet — all routes are public.
- **MPLADS** category breakdowns are simplified compared to the real 12+ scheme categories.
---
## Acknowledgements
- **MyNeta.info** by ADR — the gold standard for parliamentary data transparency in India, and inspiration for this project
- **Election Commission of India** — source of all affidavit data
- **MPLADS Portal (mplads.gov.in)** — Local Area Development scheme data
- **Sansad.in** — official parliamentary attendance and debate records
- **shadcn/ui** — for the beautiful, accessible component primitives
- **Lovable** — for the platform that made shipping this fast
---
## License
This project is built for educational and demonstration purposes.
---
Built with the Lovable platform.
This project is built for **educational and demonstration purposes** as part of an academic submission. The codebase is provided as-is; the data is illustrative and must not be cited as authoritative. Real affidavit data remains the property of the Election Commission of India and other source bodies.
---
