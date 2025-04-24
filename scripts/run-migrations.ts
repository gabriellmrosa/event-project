import migrate from 'node-pg-migrate';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' }); // ou .env para prod/local

migrate({
  migrationsTable: 'pgmigrations',
  dir: 'infra/migrations',
  direction: 'up',
  databaseUrl: process.env.DATABASE_URL as string,
  logger: console,
});