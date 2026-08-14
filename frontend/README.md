# VisionDeck — Frontend

React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion.

## Setup

```bash
npm install
cp .env.example .env    # set VITE_API_URL to your running backend, e.g. http://localhost:5000/api
npm run dev              # http://localhost:5173
npm run build             # production build to dist/
```

## What's built

- Sticky navbar with a hover mega menu (desktop) and slide-down drawer (mobile)
- Animated hero: count-up stats, floating glass cards, gradient/grid background
- Auto-scrolling "Trusted By" logo marquee
- About, Services, Industries, tabbed Technologies, filterable Portfolio, Awards, Team,
  a Testimonials carousel, Pricing, an FAQ accordion, and a Contact form
- The Contact form is wired to `POST /api/messages` via `src/lib/api.ts` — start the
  backend (see `/server`) for it to actually submit
- Routed pages: `/`, `/about`, `/services`, `/industries`, `/portfolio`, `/pricing`,
  `/contact`, `/privacy`, `/terms`, plus a 404 catch-all
- Scroll-reveal animations throughout via a shared `<Reveal>` wrapper (Framer Motion)

## What's demo data vs. live data

Everything currently renders from `src/data/content.ts` (services, projects,
testimonials, awards, team, pricing, FAQ) — this matches what the seed script puts in
MongoDB, but the components don't fetch it yet. Only the Contact form talks to the API.
To go fully dynamic, replace the imports from `content.ts` in each section component
with a `useEffect` + the relevant `fetchX()` call in `src/lib/api.ts` (a few are already
stubbed there — extend the pattern for `services`, `testimonials`, etc.).

## What's not built yet

Blog listing/detail pages, Career listing + application form, Case Studies page, the
full admin dashboard UI (the backend API for it exists), image lazy-loading/optimization
pass, and a sitemap/robots.txt for SEO.
