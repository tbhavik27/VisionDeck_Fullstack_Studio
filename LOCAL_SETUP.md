# VisionDeck Fixed Local Setup

## What was fixed

- Service card "Learn more" links now open real service detail pages.
- Blog routes are connected: `/blog` and `/blog/:slug`.
- Pricing "Get Started" buttons now open the checkout/payment flow.
- Portfolio and blog images use local files from `frontend/public/images`.
- The technology stack tabs stay stable whether the backend is running or not.
- Vite dev/build cache files now write outside `node_modules`, so local VS Code builds work.

## Run the frontend

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL Vite prints, usually:

```text
http://localhost:5173
```

The frontend works even if the backend is not running because it has fallback demo content.

## Run the backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run seed
npm run dev
```

Before running `npm run seed`, set your MongoDB connection in `backend/.env`.

## Useful routes to check

```text
/services/web-development
/checkout?plan=Professional
/blog
/blog/launch-checklist-production-web-apps
/portfolio
```
