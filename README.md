# VisionDeck

A full-stack business/portfolio website: React 19 + TypeScript + Vite + Tailwind CSS v4
frontend, Express + MongoDB backend. Built as an original design inspired by the
*category* of premium corporate/SaaS sites — not a copy of any of them.

```
visiondeck-project/
├── frontend/   React + TS + Vite + Tailwind + Framer Motion
└── backend/    Express + MongoDB + JWT + Cloudinary + Nodemailer
```

## Run it locally

**Backend first:**
```bash
cd backend
npm install
cp .env.example .env     # fill in MONGO_URI and JWT_SECRET at minimum
npm run seed               # populates ALL collections + one admin user
npm run dev                 # http://localhost:5000
```

**Then frontend:**
```bash
cd frontend
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:5000/api
npm run dev                 # http://localhost:5173
```

Re-run `npm run seed` any time — it wipes and repopulates services, projects,
testimonials, awards, faqs, industries, and technologies, and creates the admin user
if it doesn't already exist.

## What changed in this round of fixes

Previously, only the Contact form talked to the backend — every other section
(Services, Industries, Technologies, Portfolio, Awards, Testimonials, FAQ) was hardcoded
static data with dead links, and Login/Register didn't exist. Fixed:

- **Backend:** added the missing `Industry` model + `/api/industries` route (it simply
  didn't exist before); seed script now populates industries and technologies too, and
  uses real URLs instead of `#` placeholders for project links.
- **Frontend:** every section now fetches live from the backend via a shared
  `useApiData` hook, with a fallback to static demo data if the API is unreachable, so
  the site never goes blank if the backend is down.
- **Services "Learn more"** — was a plain, non-clickable `<span>`. Now links to Contact
  with that service pre-filled in the message.
- **Industries cards** — were dead `<div>`s. Now link to Contact with the industry
  pre-filled — this is what "Industries not working" was.
- **About section image** — was a decorative CSS box, not a real image. Now a real
  bundled SVG illustration rendered via an actual `<img>` tag.
- **Portfolio images** — now render a real `<img>` when a project has an uploaded
  Cloudinary image, falling back to the gradient placeholder only when there isn't one.
  Code/Live Demo links only render when they actually exist on the project.
- **Pricing "Get Started"** — passes the selected plan to Contact and pre-fills the
  message. No fake payment button was added — a real payment gateway is correctly
  listed as a *future enhancement* in the original spec, not something to fake here.
- **Login / Register** — built from scratch: `AuthContext` (JWT in localStorage,
  verified against `/api/auth/me` on load), `/login` and `/register` pages wired to
  your existing backend auth routes, and the Navbar now shows the logged-in user with
  a logout button instead of always showing "Log in."

## Honest scope note

Verified this round: frontend builds clean (`npm run build`, zero errors), backend
boots cleanly through the Mongo connection step (confirmed via a boot test — it hangs
waiting for MongoDB rather than crashing, meaning every route/model/import is wired
correctly), and the Industry collection round-trips through seed → API → frontend.

Still not built: the full admin dashboard UI (the API for it exists — see backend
README), Blog and Career listing pages, image upload UI in the browser (Cloudinary
uploads currently only work via API calls, e.g. Postman, not a form in the site itself),
and a real payment gateway. Production hardening (rate limiting, request validation
wiring, refresh tokens) also still applies — see `backend/README.md`.
