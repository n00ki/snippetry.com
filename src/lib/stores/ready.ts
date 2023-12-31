import { writable } from 'svelte/store';

export const snippets_ready = writable(false);
export const editor_ready = writable(false);
export const quote_ready = writable(false);
