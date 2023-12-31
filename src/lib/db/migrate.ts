import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { migration_client } from '$lib/server/database';

// this will automatically run needed migrations on the database
migrate(drizzle(migration_client), { migrationsFolder: './src/lib/db/migrations' })
  .then(() => {
    console.log('Migrations complete!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Migrations failed!', err);
    process.exit(1);
  });
