# Sampanna Tech — Corporate Website & Admin CMS

A complete, production-ready corporate website, API, and admin content management system for **Sampanna Tech**, a software development and digital technology company in Kathmandu, Nepal.

> **Tagline:** Technology That Helps Your Business Grow.

The project is split into two cleanly separated applications:

- `/frontend` — Next.js (App Router) + TypeScript + Tailwind CSS
- `/backend` — Node.js + Express + TypeScript + MongoDB (Mongoose)

The frontend talks to the backend through REST APIs, and the **admin CMS** at `/admin` lets you manage all content — services, products, projects, blog posts, testimonials, team members, media, jobs, contact enquiries, newsletter subscribers, users, and site settings. Public pages reflect admin changes immediately (content is database-driven).

**Default ports:** frontend `3015`, backend `5015`.
**Production:** `https://sampannatech.online` (site) and `https://api.sampannatech.online` (API), both behind Nginx.

---

## Tech Stack

### Frontend
- Next.js 15 (App Router, Server Components)
- TypeScript
- Tailwind CSS
- Lucide React icons
- SEO (metadata, Open Graph, Twitter cards, sitemap, robots.txt, JSON-LD)

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT authentication (bcrypt password hashing, role-based authorization)
- Security (Helmet, CORS, rate limiting, mongo-sanitize, validation)

---

## Folder Structure

```
/
├── frontend/
│   ├── app/                 # Next.js App Router pages
│   │   ├── admin/           # Admin CMS (login, dashboard, content pages)
│   │   ├── about/
│   │   ├── blog/[slug]/     # Blog detail (dynamic route)
│   │   ├── blog/
│   │   ├── careers/
│   │   ├── contact/
│   │   ├── faq/
│   │   ├── privacy-policy/
│   │   ├── products/
│   │   ├── projects/
│   │   ├── projects/[slug]/ # Project case-study detail (dynamic route)
│   │   ├── refund-policy/
│   │   ├── services/
│   │   ├── team/            # Team members page
│   │   ├── terms/
│   │   ├── layout.tsx
│   │   ├── page.tsx         # Home
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── manifest.ts
│   ├── components/
│   │   ├── admin/           # Admin UI (shell, forms, guards, toasts)
│   │   ├── layout/          # Header, Footer, Logo, NewsletterForm
│   │   ├── sections/        # Home page sections + views
│   │   ├── blog/            # Blog cards, markdown renderer
│   │   ├── careers/         # Job cards
│   │   ├── contact/         # Contact form
│   │   └── ui/              # Button, Container, Form, Modal, states, etc.
│   ├── config/site.ts       # Centralized site configuration
│   ├── lib/                 # API client, data helpers, utils
│   ├── hooks/               # useApiData, useAdminCrud hooks
│   ├── types/               # Shared TypeScript types
│   └── public/
│
└── backend/
    └── src/
        ├── config/          # env, database
        ├── controllers/     # Route handlers
        ├── middleware/      # auth, error, validation
        ├── models/          # Mongoose models
        ├── routes/          # Express routers
        ├── scripts/         # seed + createAdmin
        ├── utils/           # helpers
        ├── types/           # TypeScript types
        └── server.ts
```

---

## Requirements

- Node.js 18+ (tested on Node 24)
- MongoDB (local `mongod` or MongoDB Atlas)

---

## Installation

### 1. Clone / open the project
```bash
cd "Sampanna Tech"
```

### 2. Install backend dependencies
```bash
cd backend
npm install
cp .env.example .env
```

### 3. Install frontend dependencies
```bash
cd ../frontend
npm install
cp .env.example .env.local
```

---

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | API port | `5015` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/sampannatech` |
| `JWT_SECRET` | Secret for signing JWTs | `change_this_to_a_long_random_secret` |
| `JWT_EXPIRES_IN` | Token lifetime | `7d` |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | `http://localhost:3015,https://sampannatech.online` |
| `ADMIN_INITIAL_PASSWORD` | Initial password for the seeded admin user | `YourStrongPassword123` |
| `NODE_ENV` | `development` or `production` | `development` |

### Frontend (`frontend/.env.local`)
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5015/api` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (SEO) | `http://localhost:3015` |

> All contact info, social links, stats, footer text, and SEO fields are now managed through the admin CMS → **Settings** (stored in `SiteSettings`), not environment variables.
>
> **Note:** `.env` / `.env.local` files are never committed. Only `.env.example` files are included in the repo.

---

## MongoDB Setup

Make sure MongoDB is running, then seed the database:

```bash
cd backend
npm run seed
```

The seed script **upserts** (never deletes) existing records by `slug`/name, so it is safe to re-run against production data. It creates default **site settings** (stats intentionally left empty — no fake numbers), **services**, **products** (Sampanna POS), **demo projects**, a few **blog posts**, and an **admin user** (`admin@sampannatech.com`).

To set the initial admin password, set `ADMIN_INITIAL_PASSWORD` before running `seed`, or create an admin separately:

```bash
ADMIN_PASSWORD=YourStrongPassword123 npm run seed:admin
```

---

## Running the Backend

```bash
cd backend
npm run dev        # development (tsx watch, hot reload)
npm run build      # compile TypeScript
npm start          # run compiled build
```

Health check: `GET http://localhost:5015/api/health`

---

## Running the Frontend

```bash
cd frontend
npm run dev        # http://localhost:3015
npm run build      # production build
npm start          # serve production build
```

> Next.js by default runs on port 3000. Use `next dev -p 3015` / add `PORT=3015` to run on the production port.

---

## Production Build

```bash
# Backend
cd backend
npm run build
NODE_ENV=production npm start

# Frontend
cd frontend
npm run build
npm start
```

---

## API Documentation

Base URL: `http://localhost:5015/api`

### Public routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/services` | List active services |
| GET | `/services/:slug` | Single service |
| GET | `/products` | List products |
| GET | `/products/:slug` | Single product |
| GET | `/projects` | List projects |
| GET | `/projects/:slug` | Single project |
| GET | `/blogs` | List published blogs (`?category=`) |
| GET | `/blogs/:slug` | Single blog + related posts |
| GET | `/testimonials` | List published testimonials |
| GET | `/team` | List published team members |
| GET | `/team/:slug` | Single team member |
| GET | `/jobs` | List active jobs |
| GET | `/media` | List published media |
| GET | `/site-settings` | Site settings (contact info, stats, social) |
| POST | `/contact` | Submit a contact enquiry |
| POST | `/newsletter` | Subscribe to newsletter |
| GET | `/health` | Health check |

### Admin / protected routes
Require `Authorization: Bearer <token>` header. Roles: `admin`, `editor`.

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | public | Returns JWT token |
| POST | `/auth/logout` | protected | Logs out (stateless) |
| GET | `/auth/me` | protected | Current user |
| POST | `/auth/users` | admin | Create a user |
| GET | `/admin/stats` | editor/admin | Dashboard counts + recent enquiries |
| GET/PUT/DELETE | `/admin/users` | admin | Manage users |
| GET | `/admin/content/:resource` | editor/admin | All records (incl. unpublished) |
| POST/PUT/DELETE | `/services` | editor/admin | Manage services |
| POST/PUT/DELETE | `/products` | editor/admin | Manage products |
| POST/PUT/DELETE | `/projects` | editor/admin | Manage projects |
| POST/PUT/DELETE | `/blogs` | editor/admin | Manage blogs |
| POST/PUT/DELETE | `/testimonials` | editor/admin | Manage testimonials |
| POST/PUT/DELETE | `/team` | editor/admin | Manage team members |
| POST/PUT/DELETE | `/jobs` | editor/admin | Manage jobs |
| POST/PUT/DELETE | `/media` | editor/admin | Manage media |
| GET/PUT/DELETE | `/contact` | editor/admin | Manage enquiries |
| GET/DELETE | `/newsletter` | editor/admin | Manage subscribers |
| PUT | `/site-settings` | admin | Update site settings |

---

## Database Models

- **User** — admin/editor accounts (bcrypt-hashed passwords, never plain text)
- **Service** — services shown on the site
- **Product** — products like Sampanna POS
- **Project** — portfolio items (with `isDemo` flag)
- **Blog** — blog posts (slug, content, category, tags, publish state)
- **Testimonial** — client feedback (published flag)
- **TeamMember** — team bios, roles, skills, social links
- **Job** — open positions (with deadline)
- **Contact** — contact form enquiries (status: new/contacted/closed)
- **NewsletterSubscriber** — newsletter emails
- **Media** — media/images library for the site
- **SiteSettings** — company info, contact details, stats, social links, footer/SEO

All models use Mongoose timestamps and relevant indexes.

---

## Admin CMS

The admin interface lives at `/admin` on the frontend and requires login (`POST /api/auth/login`).

**Navigation:**
- **Dashboard** — content counts + recent enquiries
- **Services / Products / Projects / Blog / Testimonials / Team / Media / Jobs** — full CRUD (create, edit, delete) with publish/active toggles
- **Contacts** — enquiry inbox with status management (`new` / `contacted` / `closed`) and search
- **Newsletter** — subscriber list
- **Settings** — edit company info, contact details, stats, social links, SEO, footer text
- **Users** — create/edit/delete admin & editor accounts (admin role only)

**Roles:** `admin` (full access) and `editor` (content only — no user management, no site settings).

Public pages fetch data through the API, so saving a record in the CMS updates the live site immediately.

---

## Admin Setup

1. Create an admin user (see [MongoDB Setup](#mongodb-setup)).
2. Open the admin CMS at `https://sampannatech.online/admin` (or `/admin` locally).
3. Log in with the admin credentials. The dashboard gives you a content overview and sidebar navigation to manage every section of the site.

## Security

- **Helmet** for secure HTTP headers
- **CORS** restricted to the configured `ALLOWED_ORIGINS`
- **Rate limiting** on all API requests
- **express-mongo-sanitize** to prevent NoSQL injection
- **Request validation** on contact, newsletter, login, and user creation
- **JWT** authentication with role-based authorization
- **bcrypt** password hashing (never store plain text)
- **Graceful error handling** — internal errors are never exposed to clients
- Admin pages are `noindex` (not indexed by search engines)

Environment variables keep secrets (MongoDB URI, JWT secret, API keys) out of the codebase.

---

## SEO

- Per-page metadata with templates
- Open Graph and Twitter card tags
- JSON-LD structured data (Organization + BlogPosting)
- `sitemap.xml` generated automatically
- `robots.txt`
- Canonical URLs on all pages
- Automatic Open Graph image (`/opengraph-image`)

---

## Performance

- Next.js Server Components where appropriate (minimal client JS)
- Lazy-loaded client-only sections (services, projects, blog, testimonials)
- Optimized fonts via `next/font`
- Subtle, reduced-motion-aware animations
- Responsive images supported through `next/image`

---

## License

This project is for internal use by Sampanna Tech. Do not commit `.env` files or secrets.
