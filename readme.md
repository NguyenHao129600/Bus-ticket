# Bus Ticket

Express + MySQL2 backend with a React client.

## Backend Setup

Create local environment config:

```bash
cp .env.example .env
```

Create the MySQL database and import the baseline schema manually:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS bus_booking CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p bus_booking < server/database/schema.sql
```

Install dependencies and start the API:

```bash
npm install
npm run dev
```

For production-style start:

```bash
npm start
```

## API

- Health check: `GET /health`
- Swagger JSON: `GET /swagger.json`
- API prefix: `/api`
- Auth:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/me`

The backend uses `mysql2` directly. Knex/Bookshelf migration CLI setup was removed; schema changes should be managed as SQL files or by your DB migration tool of choice.

## Scripts

```bash
npm run dev
npm start
npm run build
npm run build:prod
npm run lint
```
