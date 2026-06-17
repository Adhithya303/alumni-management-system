# Alumni Database Management System

A mini full-stack project for managing alumni data using:
- **Frontend:** React 18 + Vite + React Router + Axios + Bootstrap (CDN)
- **Backend:** Node.js + Express.js + JWT auth
- **Database:** MySQL

## Project Structure

- `/backend` - Express API, JWT auth, MySQL pool, route/controller modules
- `/frontend` - React app with pages/components/context/api client
- `/database/schema.sql` - Database, tables, triggers, procedure, function, views
- `/database/seed.sql` - Sample seed data
- `/docs/normalization.md` - UNF → 1NF → 2NF → 3NF explanation

## How to Run

### 1) Database Setup

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 2) Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Set `.env` values:
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME=alumni_db`
- `JWT_SECRET`
- `PORT=5000`

Run backend (recommended entrypoint):

```bash
node index.js
```

Legacy entrypoint:

```bash
node server.js
```

### 3) Frontend Setup

```bash
cd frontend
npm install
```

Optional `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and backend allows CORS for this origin.

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Alumni
- `GET /api/alumni`
- `GET /api/alumni/:id`
- `POST /api/alumni`
- `PUT /api/alumni/:id`
- `DELETE /api/alumni/:id`

### Education
- `GET /api/education/:alumni_id`
- `POST /api/education`
- `DELETE /api/education/:edu_id`

### Companies
- `GET /api/companies`
- `POST /api/companies`

### Jobs
- `GET /api/jobs/:alumni_id`
- `POST /api/jobs`
- `DELETE /api/jobs/:job_id`

### Skills
- `GET /api/skills`
- `GET /api/alumni/:id/skills`
- `POST /api/alumni/:id/skills`
- `DELETE /api/alumni/:id/skills/:sid`

### Events
- `GET /api/events`
- `POST /api/events`
- `GET /api/events/:id/participants`
- `POST /api/events/:id/participate`

### User Utility
- `GET /api/users/:alumni_id/skill-count`

> All routes except `/api/auth/*` are JWT-protected.

## Response Format
All API responses follow:

```json
{
  "success": true,
  "data": {},
  "message": "..."
}
```

## Normalization Summary Table

| Normal Form | Status | Notes |
|---|---|---|
| UNF | Violated in flat design | Repeating skills/events groups |
| 1NF | Satisfied | Atomic values and split relation tables |
| 2NF | Satisfied | No partial dependencies in composite-key tables |
| 3NF | Satisfied | COMPANY extracted to remove transitive dependency from JOB |
