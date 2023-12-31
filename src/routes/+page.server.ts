// Types
import { type Actions } from '@sveltejs/kit';

// Utils
import db from '$lib/server/database';
import { snippets } from '$lib/db/models/snippets';
import { snippets_schema } from '$lib/validations/snippets';
import { desc, eq } from 'drizzle-orm';
import { superValidate as validate } from 'sveltekit-superforms/server';
import { redirect } from 'sveltekit-flash-message/server';
import { form_fail, set_form_error } from '$lib/utils/helpers/forms';

export async function load() {
  const form = await validate(snippets_schema);

  return {
    snippets: await get_snippets(),
    form
  };
}

export const actions: Actions = {
  add: async (event) => {
    const form = await validate(event.request, snippets_schema);

    if (!form.valid) {
      return set_form_error(form, Object.values(form.errors)[0].toString(), { status: 400 }, event);
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
      form_fail(form, { event });
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

async function get_snippets(limit = 10, skip = 0) {
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
