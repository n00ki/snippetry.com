import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  index,
  serial,
  pgEnum,
  uniqueIndex
} from 'drizzle-orm/pg-core';
import { generate_public_id } from '../../utils/helpers/nanoid';

export const status_enum = pgEnum('status', ['pending', 'approved', 'rejected']);

export const snippets = pgTable(
  'snippets',
  {
    id: serial('id').primaryKey(),
    public_id: varchar('public_id', { length: 10 })
      .notNull()
      .unique()
      .$default(() => generate_public_id()),
    text: text('text').notNull(),
    html: text('html').notNull(),
    language: text('language').notNull(),
    quote_author: text('quote_author').notNull(),
    quote_content: text('quote_content').notNull(),
    status: status_enum('status').notNull().default('pending'),
    likes: integer('likes').notNull().default(0),
    created_at: timestamp('created_at').notNull().defaultNow()
  },
  (snippets) => ({
    public_id_idx: uniqueIndex('public_id_idx').on(snippets.public_id),
    status_idx: index('status_idx').on(snippets.status),
    created_at_idx: index('created_at_idx').on(snippets.created_at)
  })
);

export type SnippetType = typeof snippets.$inferSelect;
