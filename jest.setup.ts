import dotenv from 'dotenv';
dotenv.config({ path: './.env.test' });

import pool from './src/database/database';

afterAll(async () => {
  await pool.end();
});