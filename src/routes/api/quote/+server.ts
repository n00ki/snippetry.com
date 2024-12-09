import { json, type RequestHandler } from '@sveltejs/kit';
import quotes from '$lib/data/quotes.json';

export const GET: RequestHandler = async () => {
  try {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    return json(randomQuote);
  } catch (error) {
    console.log(error);
    return json({ error: 'Failed to fetch quote' });
  }
};
