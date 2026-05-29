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

Seed realistic sample data for stations, operators, buses, routes, seats, and trips in the next 7 days:

```bash
npm run seed
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

Sample accounts created by `npm run seed`:

- `admin@example.com / 123456`
- `futa.staff@example.com / 123456`
- `hoanglong.staff@example.com / 123456`
- `mailinh.staff@example.com / 123456`

Trip search examples:

- `GET /api/bus-trips?departure_keyword=Quy%20Nhon&arrival_keyword=Sai%20Gon`
- `GET /api/bus-trips?departure_keyword=Quy%20Nhon&arrival_keyword=TP.%20Ho%20Chi%20Minh`
- `GET /api/bus-trips?operator_keyword=Mai%20Linh`
- `GET /api/bus-trips?trip_type=round_trip&departure_keyword=Quy%20Nhon&arrival_keyword=Sai%20Gon&departure_date=2026-05-26&return_date=2026-05-27`

The backend uses `mysql2` directly. Knex/Bookshelf migration CLI setup was removed; schema changes should be managed as SQL files or by your DB migration tool of choice.

## Scripts

```bash
npm run dev
npm start
npm run build
npm run build:prod
npm run lint
```
