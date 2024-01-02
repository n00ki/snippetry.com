import { fail, type NumericRange, type RequestEvent } from '@sveltejs/kit';
import { setError } from 'sveltekit-superforms/server';
import { setFlash } from 'sveltekit-flash-message/server';

export const setFail = (
  form: any,
  opts?: { status?: NumericRange<400, 599>; remove_sensitive_data?: string[]; event?: RequestEvent }
) => {
  if (!form) return;
  if (opts?.remove_sensitive_data) {
    for (const field of opts.remove_sensitive_data) {
      if (form.data[field]) {
        form.data[field] = '';
      }
    }
  }

  if (opts?.event)
    setFlash(
      { type: 'error', message: 'Something went wrong. Please try again later.' },
      opts.event
    );

  return fail(opts?.status ?? 400, { form });
};

export const setFormError = (
  form: any,
  text: string,
  opts?: { status?: NumericRange<400, 599>; field?: string; remove_sensitive_data?: string[] },
  event?: RequestEvent
) => {
  if (!form) return;

  if (opts?.remove_sensitive_data) {
    for (const field of opts.remove_sensitive_data) {
      if (form.data[field]) {
        form.data[field] = '';
      }
    }
  }

  if (event) setFlash({ type: 'error', message: text }, event);
  if (opts?.field) return setError(form, opts?.field, text, { status: opts?.status ?? 400 });
};
