import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import { query } from '../config/database';

async function runMigrations() {
  const migrationsPath = path.join(__dirname, '..', 'migrations');
  const files = readdirSync(migrationsPath).filter((file) =>
    file.endsWith('.sql')
  );

  for (const file of files) {
    const filePath = path.join(migrationsPath, file);
    const sql = readFileSync(filePath, 'utf-8');
    console.log(`Running migration: ${file}`);
    await query(sql);
  }

  console.log('✅ All migrations ran successfully!');
}

runMigrations().catch((err) => {
  console.error('❌ Error running migrations', err);
  process.exit(1);
});
