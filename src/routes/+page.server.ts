// Types
import { type Actions } from '@sveltejs/kit';

// Utils
import db from '$lib/server/database';
import { Snippet, type SnippetType } from '$models/snippet';
import { createSnippetSchema } from '$lib/validations/snippet';
import { zod } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';
import { superValidate as validate } from 'sveltekit-superforms/server';
import { redirect } from 'sveltekit-flash-message/server';
import { setFail, setFormError } from '$lib/utils/helpers/forms';
import { logsnag } from '$lib/server/logsnag';

export async function load() {
  const form = await validate(zod(createSnippetSchema));

  return {
    snippets: await getSnippets(),
    form
  };
}

export const actions: Actions = {
  add: async (event) => {
    const form = await validate(event.request, zod(createSnippetSchema));

    if (!form.valid) {
      return setFormError(form, Object.values(form.errors)[0].toString(), { status: 400 }, event);
    }

    const { text, html, language, quoteAuthor, quoteContent } = form.data;

    try {
      await db.insert(Snippet).values({
        text: text,
        html: html,
        language: language.toLowerCase(),
        quoteAuthor: quoteAuthor,
        quoteContent: quoteContent
      });
    } catch (error) {
      console.log(error);
      setFail(form, { event });
    }

    try {
      await logsnag.track({
        channel: 'submissions',
        event: 'New Submission',
        icon: '🚀',
        description: `A new snippet has been submitted for review!`,
        notify: true
      });
    } catch (error) {
      console.log(error);
    }

    redirect(
      '/',
      {
        type: 'success',
        message: 'Your snippet has been successfully submitted for review!'
      },
      event
    );
  }
};

async function getSnippets(limit = 10, skip = 0) {
  try {
    const snippets: SnippetType[] = await db.query.Snippet.findMany({
      where: eq(Snippet.status, 'approved'),
      orderBy: (snippets, { desc }) => desc(snippets.createdAt),
      offset: skip,
      limit: limit
    });

    return snippets;
  } catch (error) {
    console.log(error);
    return [];
  }
}
