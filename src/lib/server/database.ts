import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const migration_client = postgres(DATABASE_URL, {
  max: 1
});

export const query_client = postgres(DATABASE_URL);

const db = drizzle(query_client);
export default db;
