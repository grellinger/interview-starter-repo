# AGENTS.md

Full-stack monorepo: Next.js frontend + Spring Boot API + PostgreSQL.

## Layout

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

## Conventions & constraints

- API JSON uses **snake_case** (Jackson `SNAKE_CASE`).
- DB schema/seed changes go through **Flyway** migrations in
  `products-api/src/main/resources/db/migration` (`V#__Name.sql`, never edit an applied migration).
- DB connection is configurable via `DB_HOST`/`DB_PORT`/`DB_NAME`/`DB_USER`/`DB_PASSWORD`.
