import { z } from 'zod';

export const snippetsSchema = z.object({
  text: z
    .string({ required_error: 'Snippet content is required' })
    .trim()
    .min(10, { message: 'Snippet content must be at least 10 characters' })
    .max(1000, { message: 'Snippet content must be less than 1000 characters' }),
  html: z
    .string({ required_error: 'Snippet content is required' })
    .trim()
    .min(15, { message: 'Snippet content is required' })
    .max(1000, { message: 'Snippet content must be less than 1000 characters' }),
  language: z
    .string({ required_error: 'Snippet language is required' })
    .trim()
    .min(1, { message: 'Snippet language is required' }),
  quote_author: z
    .string({ required_error: 'Quote author is required' })
    .trim()
    .min(1, { message: 'Quote author is required' }),
  quote_content: z
    .string({ required_error: 'Quote content is required' })
    .trim()
    .min(1, { message: 'Quote content is required' })
});
