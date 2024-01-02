import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const migrationClient = postgres(DATABASE_URL, {
  max: 1
});

export const client = postgres(DATABASE_URL);

const db = drizzle(client);
export default db;
