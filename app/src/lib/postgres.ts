import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

const pool =
  globalThis._pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 2_000,
  });

if (process.env.NODE_ENV !== "production") globalThis._pgPool = pool;

export default pool;

export async function query<T = unknown>(
  text: string,
  values?: unknown[]
): Promise<T[]> {
  const { rows } = await pool.query(text, values);
  return rows as T[];
}
