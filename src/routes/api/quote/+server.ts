import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
  try {
    const res = await fetch('https://api.quotable.io/quotes/random').then((res) => res.json());
    return json(res);
  } catch (error) {
    console.log(error);
    return json({ error: 'Failed to fetch quote' });
  }
};
