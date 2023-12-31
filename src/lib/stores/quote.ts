import { writable } from 'svelte/store';

export const quote = writable({
  author: '',
  content: ''
});
