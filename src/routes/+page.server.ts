// Types
import { type Actions } from '@sveltejs/kit';

// Utils
import db from '$lib/server/database';
import { snippets } from '$lib/db/models/snippets';
import { snippetsSchema } from '$lib/validations/snippets';
import { desc, eq } from 'drizzle-orm';
import { superValidate as validate } from 'sveltekit-superforms/server';
import { redirect } from 'sveltekit-flash-message/server';
import { setFail, setFormError } from '$lib/utils/helpers/forms';
import { logsnag } from '$lib/server/logsnag';

export async function load() {
  const form = await validate(snippetsSchema);

  return {
    snippets: await getSnippets(),
    form
  };
}

export const actions: Actions = {
  add: async (event) => {
    const form = await validate(event.request, snippetsSchema);

    if (!form.valid) {
      return setFormError(form, Object.values(form.errors)[0].toString(), { status: 400 }, event);
    }

    const { text, html, language, quote_author, quote_content } = form.data;

    try {
      await db.insert(snippets).values({
        text: text,
        html: html,
        language: language.toLowerCase(),
        quote_author: quote_author,
        quote_content: quote_content
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
    return await db
      .select()
      .from(snippets)
      .where(eq(snippets.status, 'approved'))
      .orderBy(desc(snippets.created_at))
      .offset(skip)
      .limit(limit);
  } catch (error) {
    console.log(error);
    return [];
  }
}
