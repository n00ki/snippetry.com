import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  schema: './src/lib/db/models/*',
  out: './src/lib/db/migrations',
  driver: 'pg',
  breakpoints: true,
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? ''
  }
} satisfies Config;
