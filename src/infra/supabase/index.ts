import { Pool } from 'pg';

let pool: Pool | null = null;

export const initDb = () => {
  if (pool) return; // prevent reinitialization

  const connectionString = process.env.DATABASE_CONN_STRING;
  if (!connectionString) {
    throw new Error("Missing DATABASE_CONN_STRING env var");
  }

  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }, // required for Supabase
  });
};

export const getDb = (): Pool => {
  if (!pool) {
    throw new Error("Database not initialized. Call initDb() first.");
  }
  return pool;
};