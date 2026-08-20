# AGENTS.md

Full-stack monorepo: Next.js frontend + Spring Boot API + PostgreSQL.

## Layout

- `product-list-ui/` — Next.js (App Router, TypeScript)
- `products-api/` — Spring Boot (Java 21, Maven)
- `docker-compose.yml` — PostgreSQL only

## Commands

Database:
```bash
docker compose up -d          # Postgres on :5432 (productdb / postgres / password)
```

Backend (`products-api/`, runs on :8080):
```bash
./mvnw spring-boot:run        # Flyway migrations run on startup
./mvnw test
./mvnw package
```

Frontend (`product-list-ui/`, runs on :3000):
```bash
npm install
npm run dev
npm run build
npm run lint
```

## Conventions & constraints

- **The browser never calls the API directly.** It hits the Next.js BFF route
  `product-list-ui/src/app/api/products/route.ts`, which brokers the call to `:8080` server-side.
- API JSON uses **snake_case** (Jackson `SNAKE_CASE`).
- DB schema/seed changes go through **Flyway** migrations in
  `products-api/src/main/resources/db/migration` (`V#__Name.sql`, never edit an applied migration).
- Frontend: TanStack React Query for fetching, Formik + Yup for forms, Sass CSS Modules for styles.
- DB connection is configurable via `DB_HOST`/`DB_PORT`/`DB_NAME`/`DB_USER`/`DB_PASSWORD`.
