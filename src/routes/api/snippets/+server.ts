import { json, type RequestHandler } from '@sveltejs/kit';
import db from '$lib/server/database';
import { snippets, type SnippetType } from '$lib/db/models/snippets';
import { desc, eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
  let snippets_list: SnippetType[] = [];
  const skip = parseInt(url.searchParams.get('skip') as string);
  try {
    snippets_list = await db
      .select()
      .from(snippets)
      .where(eq(snippets.status, 'approved'))
      .orderBy(desc(snippets.created_at))
      .offset(skip ?? 0)
      .limit(10);
  } catch (error) {
    snippets_list = [];
  }

  return json(snippets_list);
};
