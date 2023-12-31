import { writable } from 'svelte/store';

export const content = writable({
  text: '',
  html: ' '
});
export const language = writable('');
