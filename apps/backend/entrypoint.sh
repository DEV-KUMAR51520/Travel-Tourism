#!/bin/sh

echo "🕒 Waiting for Postgres to be ready..."
until nc -z postgres 5432; do
  echo "⏳ Waiting for database connection..."
  sleep 2
done

echo "✅ Postgres is up, continuing..."

echo "🟢 Running Prisma migrations..."
npx prisma migrate deploy

echo "🟢 Seeding database (if empty)..."
node dist/seed.js || echo "⚠️ Seed skipped or already done"

echo "🟢 Starting backend..."
npm run start
