import { json, type RequestHandler } from '@sveltejs/kit';
import db from '$lib/server/database';
import { Snippet, type SnippetType } from '$models/snippet';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
  let snippetsList: SnippetType[] = [];
  const skip = parseInt(url.searchParams.get('skip') as string);

  try {
    snippetsList = await db.query.Snippet.findMany({
      where: eq(Snippet.status, 'approved'),
      orderBy: (snippets, { desc }) => desc(snippets.createdAt),
      offset: skip ?? 0,
      limit: 10
    });
  } catch (error) {
    console.log(error);
    snippetsList = [];
  }

  return json(snippetsList);
};
