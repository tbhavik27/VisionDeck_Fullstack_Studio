# VisionDeck API

Express + MongoDB backend for the VisionDeck frontend.

## Setup

```bash
cd server
npm install
cp .env.example .env   # then fill in MONGO_URI, JWT_SECRET, and optionally Cloudinary/SMTP
npm run seed            # populates demo services/projects/testimonials/awards/faqs + one admin user
npm run dev              # starts on http://localhost:5000 with nodemon
```

You need a real MongoDB connection string in `.env` — either a local `mongod` instance
(`mongodb://localhost:27017/visiondeck`) or a free MongoDB Atlas cluster. Cloudinary and
SMTP are optional: without them, image uploads will fail (until you add credentials) and
contact-form emails just log to the console instead of sending.

## Auth

JWT-based. `POST /api/auth/login` returns a token; send it as
`Authorization: Bearer <token>` on protected routes. Two roles: `admin` (full access,
including delete) and `editor` (create/update, no delete). The seed script creates one
admin user from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` in `.env`.

## Endpoints

| Resource | Public | Editor/Admin | Admin only |
|---|---|---|---|
| `/api/auth` | register*, login | — | — |
| `/api/projects` | GET list, GET one | POST, PUT | DELETE |
| `/api/services` `/api/technologies` `/api/testimonials` `/api/awards` `/api/faqs` `/api/careers` `/api/categories` | GET | POST, PUT | DELETE |
| `/api/blogs` | GET published | POST, PUT | DELETE |
| `/api/applications` | POST (candidate submits resume) | GET list | — |
| `/api/messages` | POST (contact form) | GET, PATCH status | — |
| `/api/admin/analytics` | — | GET | — |

\* `register` is open in this scaffold for convenience while you set things up — lock it
behind an invite flow or remove it before deploying to production, since anyone hitting
it right now can create an `editor` account.

## File uploads

`POST /api/projects` and `PUT /api/projects/:id` accept `multipart/form-data` with an
optional `image` field. `POST /api/blogs` accepts `coverImage`. `POST /api/applications`
requires a `resume` file (PDF). All are streamed to Cloudinary — set the three
`CLOUDINARY_*` variables in `.env` first.

## What's genuinely production-ready vs. what still needs work

Ready: JWT auth with bcrypt hashing, role-based access control, input validation on
required fields, consistent error handling, Cloudinary streaming uploads, a working
seed script.

Still needs work before a real deploy: rate limiting on public POST routes (`/messages`,
`/applications`, `/auth/login`), request validation with `express-validator` (the
package is installed but not yet wired into routes), refresh tokens (current tokens are
long-lived access tokens only), and locking down `/auth/register`.
