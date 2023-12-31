import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async (event) => {
  const theme = event.locals.theme;
  return {
    theme: theme ?? null
  };
});
