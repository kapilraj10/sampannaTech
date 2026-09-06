# Sampanna Tech — Corporate Website

A complete, production-ready corporate website and API for **Sampanna Tech**, a software development and digital technology company in Kathmandu, Nepal.

> **Tagline:** Technology That Helps Your Business Grow.

The project is split into two cleanly separated applications:

- `/frontend` — Next.js (App Router) + TypeScript + Tailwind CSS
- `/backend` — Node.js + Express + TypeScript + MongoDB (Mongoose)

The frontend talks to the backend through REST APIs.

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
│   │   ├── about/
│   │   ├── blog/[slug]/     # Blog detail (dynamic route)
│   │   ├── blog/
│   │   ├── careers/
│   │   ├── contact/
│   │   ├── faq/
│   │   ├── privacy-policy/
│   │   ├── products/
│   │   ├── projects/
│   │   ├── refund-policy/
│   │   ├── services/
│   │   ├── terms/
│   │   ├── layout.tsx
│   │   ├── page.tsx         # Home
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── manifest.ts
│   ├── components/
│   │   ├── layout/          # Header, Footer, Logo, NewsletterForm
│   │   ├── sections/        # Home page sections + views
│   │   ├── blog/            # Blog cards, markdown renderer
│   │   ├── careers/         # Job cards
│   │   ├── contact/         # Contact form
│   │   └── ui/              # Button, Container, Form, Modal, states, etc.
│   ├── config/site.ts       # Centralized site configuration
│   ├── lib/                 # API client, data helpers, utils
│   ├── hooks/               # useApiData hook
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
| `PORT` | API port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/sampannatech` |
| `JWT_SECRET` | Secret for signing JWTs | `change_this_to_a_long_random_secret` |
| `JWT_EXPIRES_IN` | Token lifetime | `7d` |
| `CLIENT_URL` | Allowed frontend origin (CORS) | `http://localhost:3000` |
| `NODE_ENV` | `development` or `production` | `development` |

### Frontend (`frontend/.env.local`)
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (SEO) | `http://localhost:3000` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email shown in footer/contact | `hello@sampannatech.com` |
| `NEXT_PUBLIC_CONTACT_PHONE` | Contact phone | `+977-XXXXXXXXXX` |
| `NEXT_PUBLIC_SOCIAL_FACEBOOK` / `INSTAGRAM` / `LINKEDIN` / `GITHUB` | Social links | URLs |

> **Note:** `.env` / `.env.local` files are never committed. Only `.env.example` files are included in the repo.

---

## MongoDB Setup

Make sure MongoDB is running, then seed the database:

```bash
cd backend
npm run seed
```

The seed script creates default **site settings**, **services**, **products** (Sampanna POS), **demo projects**, a few **blog posts**, and an **admin user** (`admin@sampannatech.com`).

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

Health check: `GET http://localhost:5000/api/health`

---

## Running the Frontend

```bash
cd frontend
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve production build
```

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

Base URL: `http://localhost:5000/api`

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
| GET | `/jobs` | List active jobs |
| GET | `/site-settings` | Site settings (contact info, stats) |
| POST | `/contact` | Submit a contact enquiry |
| POST | `/newsletter` | Subscribe to newsletter |
| GET | `/health` | Health check |

### Admin / protected routes
Require `Authorization: Bearer <token>` header. Roles: `admin`, `editor`.

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/auth/login` | public | Returns JWT token |
| GET | `/auth/me` | protected | Current user |
| POST | `/auth/users` | admin | Create a user |
| POST/PUT/DELETE | `/services` | editor/admin | Manage services |
| POST/PUT/DELETE | `/products` | editor/admin | Manage products |
| POST/PUT/DELETE | `/projects` | editor/admin | Manage projects |
| POST/PUT/DELETE | `/blogs` | editor/admin | Manage blogs |
| POST/PUT/DELETE | `/testimonials` | editor/admin | Manage testimonials |
| POST/PUT/DELETE | `/jobs` | editor/admin | Manage jobs |
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
- **Job** — open positions
- **Contact** — contact form enquiries (status: new/contacted/closed)
- **NewsletterSubscriber** — newsletter emails
- **SiteSettings** — company info, contact details, stats, social links

All models use Mongoose timestamps and relevant indexes.

---

## Admin Setup

1. Create an admin user (see [MongoDB Setup](#mongodb-setup)).
2. Call `POST /api/auth/login` with the admin credentials to get a JWT.
3. Use the JWT in the `Authorization: Bearer <token>` header for admin routes.

The API architecture is ready for a full admin/CMS UI without changing frontend code — all content is managed through the backend.

---

## Security

- **Helmet** for secure HTTP headers
- **CORS** restricted to the configured `CLIENT_URL`
- **Rate limiting** on all API requests
- **express-mongo-sanitize** to prevent NoSQL injection
- **Request validation** on contact, newsletter, login, and user creation
- **JWT** authentication with role-based authorization
- **bcrypt** password hashing (never store plain text)
- **Graceful error handling** — internal errors are never exposed to clients

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
