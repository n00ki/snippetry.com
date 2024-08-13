import { text, integer, index, uniqueIndex, sqliteTable } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { generateNanoId } from '../../utils/helpers/nanoid';

export const Snippet = sqliteTable(
  'snippets',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    publicId: text('public_id')
      .notNull()
      .unique()
      .$default(() => generateNanoId()),
    text: text('text').notNull(),
    html: text('html').notNull(),
    language: text('language').notNull(),
    quoteAuthor: text('quote_author').notNull(),
    quoteContent: text('quote_content').notNull(),
    status: text('status', { enum: ['pending', 'approved', 'rejected'] })
      .notNull()
      .default('pending'),
    likes: integer('likes').notNull().default(0),
    createdAt: integer('created_at', { mode: 'timestamp_ms' })
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`)
  },
  (Snippet) => ({
    publicIdIdx: uniqueIndex('snippets_public_id').on(Snippet.publicId),
    statusIdx: index('snippets_status').on(Snippet.status),
    createdAtIdx: index('snippets_created_at').on(Snippet.createdAt)
  })
);

export type SnippetType = typeof Snippet.$inferSelect;
