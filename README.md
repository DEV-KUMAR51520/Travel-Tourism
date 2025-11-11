# Travel-Tourism (Swadeshi Travel) - Fullstack Scaffold

This repo contains a minimal scaffold for the *Student Innovation: Swadeshi for Atmanirbhar Bharat - Travel & Tourism* project.

Components:
- `apps/frontend` — React + Vite + TypeScript + Tailwind (dev proxy to backend)
- `apps/backend` — Node.js + Express + TypeScript + Prisma (Postgres)
- `apps/ml-service` — FastAPI (toy recommender)
- `docker-compose.yml` — Runs Postgres, backend, frontend, ml-service
- `.github/workflows/ci.yml` — CI skeleton

To run locally (requires Docker & docker-compose):
```bash
# build & start
docker-compose up --build
# frontend: http://localhost:5173
# backend:  http://localhost:4000
# ml:       http://localhost:5000
```

Seed example:
```bash
curl -X POST http://localhost:4000/api/_seed -H "Content-Type: application/json" -d '{"items":[{"name":"Taj Mahal","slug":"taj-mahal","description":"Agra, India"},{"name":"Hampi","slug":"hampi","description":"Historic ruins"}]}'
```

