# Product List — Technical Interview Baseline

A small full-stack application: a **Next.js (App Router + TypeScript)** frontend talking to a
**Spring Boot (Java 21)** API backed by **PostgreSQL**. It lists products and lets you add one.

This repo is the **starting point for your technical pairing session** — you only need to get it
running before the interview. We'll extend it together, live. Please **feel free to use AI coding
agents/harnesses (GitHub Copilot, Cursor, Claude Code, etc.)** during the session — it's encouraged.

## Architecture

```
Browser ──▶ Next.js frontend (:3000)
                │  BFF route: /api/products  (src/app/api/products)
                ▼
           Spring Boot API (:8080)  ──▶  PostgreSQL (:5432)
```

The browser never calls the backend directly — the Next.js **backend-for-frontend (BFF)** route
brokers the call server-side.

## Tech stack

- **Frontend:** Next.js (App Router), React, TypeScript, TanStack React Query (data fetching),
  Formik + Yup (form + validation), Sass (CSS Modules)
- **Backend:** Java 21, Spring Boot, Spring Data JPA, Flyway (migrations)
- **Database:** PostgreSQL

## Prerequisites

- **Docker** (for Postgres) — or a local Postgres if you prefer
- **Java 21+** and Maven (the included `./mvnw` wrapper works)
- **Node.js 18.18+** and npm

## Getting started

### 1. Start PostgreSQL

```bash
docker compose up -d
```

This starts Postgres on `localhost:5432` with database `productdb` (user `postgres` / password
`password`). Schema and seed data are created automatically by Flyway when the backend starts.

> **Already have Postgres running?**
> - **You can just reuse it.** Skip `docker compose up` and point the backend at your existing instance
>   via the `DB_*` env vars (see the backend step below). Flyway is safe to run against it — it creates
>   the `products` table and seed data if they aren't there and is a no-op on re-runs. Create a
>   `productdb` database first (or set `DB_NAME` to an existing one).
> - **Or run the bundled Postgres on a different port** if 5432 is taken. Without this, `docker compose up`
>   fails with "port is already allocated". Pick a free port and pass `DB_PORT` to **both** the database and
>   the backend so they match:
>   ```bash
>   DB_PORT=5433 docker compose up -d          # publishes Postgres on 5433
>   cd products-api && DB_PORT=5433 ./mvnw spring-boot:run   # backend connects to 5433
>   ```

### 2. Start the backend (Spring Boot)

```bash
cd products-api
./mvnw spring-boot:run
```

Runs on **http://localhost:8080**. DB connection settings can be overridden via env vars
(`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`) — defaults match the Docker Compose file.

Verify:

```bash
curl http://localhost:8080/api/products
```

### 3. Start the frontend (Next.js)

```bash
cd product-list-ui
cp .env.local.example .env.local   # optional; only if backend isn't on localhost:8080
npm install
npm run dev
```

Open **http://localhost:3000**.

## API

| Method | Path            | Description         |
| ------ | --------------- | ------------------- |
| GET    | `/api/products` | List all products   |
| POST   | `/api/products` | Create a product (`{ "name", "brand", "price" }`) |

## Project structure

```
.
├── docker-compose.yml          # PostgreSQL for local dev
├── products-api/               # Spring Boot backend
│   └── src/main/
│       ├── java/.../products_api/
│       │   ├── controller/     # ProductController (REST)
│       │   ├── service/        # ProductService(+Impl)
│       │   ├── repository/     # Spring Data JPA repo
│       │   └── model/          # Product entity + ProductDTO (record)
│       └── resources/
│           ├── application.yml
│           └── db/migration/   # Flyway migrations (schema + seed)
└── product-list-ui/            # Next.js frontend
    └── src/
        ├── app/
        │   ├── page.tsx            # Products page (React Query)
        │   ├── layout.tsx
        │   ├── providers.tsx       # React Query provider
        │   └── api/products/       # BFF route → Spring API
        ├── components/             # ProductList, ProductCard, AddProduct (Formik/Yup)
        └── lib/                    # types + client fetchers
```

## Troubleshooting

- **Backend can't connect to DB:** ensure `docker compose up -d` is running (`docker ps`), or point
  the `DB_*` env vars at your own Postgres.
- **Frontend can't reach the API:** confirm the backend is up on :8080, or set `SPRING_API_URL` in
  `product-list-ui/.env.local`.
