PolityWatch AI
Political Accountability Intelligence — A chart-first lens on the Indian Parliament.
Search any Indian MP and see their asset growth, election promises, and MPLADS spend in clear, comparable charts — with AI-generated summaries on top.
Origin: Initially built for the Next Gen Hackathon (October 2025), then selected as my college main project for final-year submission.

Table of Contents

Live Demo
Problem Statement
Solution Overview
Features
Tech Stack
Architecture
Project Structure
Getting Started
Environment Variables
Data Source & Methodology
Design System
Key Routes
Risk Score Algorithm
Deployment
Testing the App
Future Roadmap
Known Limitations
Acknowledgements
License


Live Demo
Preview: https://public-figure-stats.lovable.app

Problem Statement
Indian citizens have access to a huge amount of public data about their elected representatives — asset affidavits filed with the Election Commission, MPLADS expenditure reports, parliamentary attendance, debate counts, and criminal case records. But this data is:

Fragmented across multiple government portals (ECI, MyNeta, MPLADS, Sansad)
Hard to read — PDFs, scanned affidavits, raw spreadsheets
Disconnected — you can't easily compare two MPs side-by-side
Static — no trend lines, no charts, no summaries
Inaccessible to a voter who just wants a 30-second answer

The result: most voters never look. Accountability suffers.

Solution Overview
PolityWatch is a single-page voter-friendly dashboard that:

Aggregates declared MP data into one searchable interface
Visualises asset growth, promise fulfilment, and fund utilisation as charts
Uses AI to generate a plain-language summary for each MP
Lets you compare two MPs side-by-side across every metric
Computes a transparent Risk Score so a voter gets a one-glance signal

Designed mobile-first for the largest audience — a voter on a phone — but scales beautifully to desktop.

Features
FeatureDescriptionMP SearchSearch & filter MPs by name, party, state, or constituencyAsset TrackingYear-by-year declared asset growth with line/area chartsPromise TrackerMonitor which manifesto promises are fulfilled, in-progress, or brokenMPLADS SpendLocal Area Development fund utilisation by year and categoryAI SummariesPlain-language AI-generated insights for every MP profileSide-by-Side CompareCompare two MPs across all metrics simultaneouslyRisk ScoringAlgorithmic risk score based on wealth growth, criminal cases, attendance, and broken promisesCase File CarouselFeatured MPs surfaced on the homepage in a magazine-style carouselStats TickerLive-looking parliamentary stats on the landing heroDark / Light ModeTheme toggle with persisted preferenceResponsive DesignFully responsive from mobile to desktopSEO OptimisedPer-route <head> metadata, OG tags, semantic HTML

Tech Stack
LayerTechnologyFrontendReact 19 + TypeScriptFrameworkTanStack Start v1 (full-stack React with SSR/SSG)RouterTanStack Router (file-based, type-safe)Data FetchingTanStack QueryBundlerVite 7StylingTailwind CSS v4 with custom CSS design tokensUI ComponentsRadix UI primitives + shadcn/uiChartsRechartsBackend RuntimeCloudflare Workers (edge serverless)Database / AuthSupabase (managed PostgreSQL + Auth + Storage)ORM / ClientSupabase JavaScript ClientAIGoogle Gemini / OpenAI GPT modelsIconsLucide ReactValidationZodPackage ManagerBunDeploymentWrangler → Cloudflare Workers

Architecture
┌──────────────────────────────────────────────────────────────┐
│                      Browser (React 19)                       │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────────┐  │
│  │ TanStack   │  │ TanStack     │  │ shadcn/ui +         │  │
│  │ Router     │  │ Query        │  │ Tailwind v4         │  │
│  └─────┬──────┘  └──────┬───────┘  └─────────────────────┘  │
└────────┼────────────────┼────────────────────────────────────┘
         │                │
         │   SSR + Server Functions (createServerFn)
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
       │ Static     │               │ Supabase         │
       │ MP Dataset │               │ (DB, Auth,       │
       │ (src/data) │               │  Storage)        │
       └────────────┘               └──────────────────┘
                                              │
                                              ▼
                                     ┌──────────────────┐
                                     │ AI Gateway       │
                                     │ (Gemini / GPT)   │
                                     └──────────────────┘
Why this stack?

TanStack Start gives SSR, file-based routing, and typed server functions in one framework — no separate backend repo.
Cloudflare Workers runs the app at the edge globally, with near-zero cold starts.
Supabase handles auth, database, RLS, and storage so the focus stays on the user experience.
Tailwind v4 + shadcn/ui enables a polished, accessible UI without designing every primitive from scratch.


Project Structure
├── src/
│   ├── components/
│   │   ├── ui/                  # shadcn/ui primitives
│   │   ├── mp-card.tsx          # MP card component
│   │   ├── site-chrome.tsx      # Header, footer
│   │   └── theme-provider.tsx   # Dark/light mode toggle
│   ├── data/
│   │   ├── mps.ts               # Demo MP dataset (15 MPs)
│   │   └── mps_appendix.ts      # Additional MP data
│   ├── integrations/
│   │   └── supabase/            # Supabase clients (browser + server-side)
│   ├── lib/
│   │   └── utils.ts             # Utility helpers (cn, formatters, etc.)
│   ├── routes/
│   │   ├── __root.tsx           # Root layout
│   │   ├── index.tsx            # Homepage
│   │   ├── mp.$mpId.tsx         # Individual MP profile page
│   │   ├── compare.tsx          # Side-by-side MP comparison
│   │   └── about.tsx            # About page
│   ├── router.tsx               # TanStack Router configuration
│   ├── start.ts                 # TanStack Start instance
│   ├── styles.css               # Global styles, CSS variables, design tokens
│   └── routeTree.gen.ts         # Auto-generated route tree (do not edit)
├── supabase/
│   └── config.toml              # Supabase configuration
├── wrangler.jsonc               # Cloudflare Workers deployment config
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript config (strict mode)
├── package.json
└── README.md

Getting Started
Prerequisites

Node.js 18+ or Bun (recommended)
A Supabase account (for database/auth)

Install & Run
bash# 1. Install dependencies
bun install

# 2. Start development server
bun run dev

# 3. Build for production
bun run build

# 4. Preview the production build locally
bun run preview
The dev server starts at http://localhost:3000 (or the next free port).

Environment Variables
env# Browser-safe (exposed to client bundle)
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=

# Server-only (never bundled to client)
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
AI_API_KEY=

⚠️ Never commit .env to version control. It is already in .gitignore.


Data Source & Methodology
This demo ships with seeded, illustrative data for 15 prominent Indian MPs so the charts render immediately on first load.

Where the data lives: static typed TypeScript array in src/data/mps.ts
What each MP record contains: name, party, state, constituency, photo, asset history, promises, MPLADS spend, attendance %, debates, criminal cases, and an AI summary
How it's loaded: imported directly at build time — no API call, instant render
How it's surfaced: TanStack Router loaders read from this dataset


⚠️ Disclaimer: Numbers are inspired by public sources (election affidavits, MPLADS portal, parliamentary records) but are not real-time and not authoritative. A production version would ingest official datasets on a scheduled refresh via cron jobs into Supabase.


Design System
TokenValueUsagePrimary AccentSaffron #ff7a1aCTAs, highlights, risk indicatorsDisplay FontBebas NeueBold, editorial headlinesUI / Mono FontDM MonoTechnical labels, stats, metadataBody FontDM SansReadable body copyBackgroundDark charcoal with subtle grainReduces eye fatigue, premium feelBordersThin 1px rulesClean editorial aestheticBorder RadiusMinimal (2–6px)Sharp, document-like
All design tokens are defined as CSS variables in src/styles.css.

Key Routes
RouteDescriptionSSRAuth/Homepage with hero, stats ticker, case file carousel, and search✅Public/mp/:mpIdIndividual MP profile with charts, AI summary, and detailed stats✅Public/compareSide-by-side comparison of two MPs (?a=&b=)✅Public/aboutAbout the project and data methodology✅Public

Risk Score Algorithm
Each MP is assigned a transparent 0–100 risk score. The score is a weighted blend of:
FactorWeightRationaleAsset growth rate35%Disproportionate wealth growth is the strongest red flagCriminal cases30%Pending serious cases weighted higher than minor casesAttendance %15%Low attendance signals disengagementBroken promises ratio20%Promises marked broken / total promises made
A lower score is better. Computed on-the-fly in src/lib/utils.ts and visualised as a colored badge — green < 30, amber 30–60, red > 60.

The exact formula and weights are deliberately exposed in the codebase — accountability tools shouldn't have black-box scoring.


Deployment
bash# Deploy to Cloudflare Workers (requires Wrangler CLI)
npx wrangler deploy
The wrangler.jsonc file specifies the worker name (politywatch) and entry point.

Testing the App
Manual smoke test (≈2 minutes):

Open / → confirm hero loads, stats ticker animates, case file carousel scrolls
Type a name into the search bar → confirm filtered results appear
Click any MP card → confirm asset chart, promise tracker, MPLADS chart, AI summary, and risk badge render
Click Compare → select two MPs → confirm side-by-side charts render
Toggle dark/light mode → confirm theme persists on reload
Resize to mobile width → confirm layout reflows cleanly


Future Roadmap

 Integrate live Election Commission of India (ECI) affidavit API
 Ingest real MPLADS data from the official portal via scheduled cron
 Add user authentication & bookmarking (personal watchlist)
 Export MP reports as PDF
 Add state-wise and party-wise aggregate dashboards
 Multi-language support (Hindi, Tamil, Bengali, Marathi, Telugu)
 Push notifications when a watched MP files a new affidavit
 Constituency-level dashboards (vote share, turnout, demographics)
 Open the dataset as a public REST API under /api/public/*


Known Limitations

Data is static and illustrative — not real-time
Only 15 MPs are seeded; expanding to all 543 Lok Sabha + 245 Rajya Sabha MPs requires real ingestion
AI summaries in the static dataset are pre-written; live generation is wired but not enabled per-request to keep the demo fast
No authentication yet — all routes are public
MPLADS category breakdowns are simplified compared to the real 12+ scheme categories


Acknowledgements

MyNeta.info by ADR — gold standard for parliamentary data transparency in India
Election Commission of India — source of all affidavit data
MPLADS Portal (mplads.gov.in) — Local Area Development scheme data
Sansad.in — official parliamentary attendance and debate records
shadcn/ui — accessible component primitives


License
Built for educational and demonstration purposes as part of an academic submission. The codebase is provided as-is; the data is illustrative and must not be cited as authoritative. Real affidavit data remains the property of the Election Commission of India and other source bodies.
