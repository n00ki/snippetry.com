import { json, type RequestHandler } from '@sveltejs/kit';
import db from '$lib/server/database';
import { snippets, type SnippetType } from '$lib/db/models/snippets';
import { desc, eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
  let snippetsList: SnippetType[] = [];
  const skip = parseInt(url.searchParams.get('skip') as string);
  try {
    snippetsList = await db
      .select()
      .from(snippets)
      .where(eq(snippets.status, 'approved'))
      .orderBy(desc(snippets.created_at))
      .offset(skip ?? 0)
      .limit(10);
  } catch (error) {
    snippetsList = [];
  }

  return json(snippetsList);
};
