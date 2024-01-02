import { customAlphabet } from 'nanoid';

const PUBLIC_ID_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';
const PUBLIC_ID_LENGTH = 10;

export function generatePublicId(): string {
  const nanoid = customAlphabet(PUBLIC_ID_ALPHABET, PUBLIC_ID_LENGTH);
  return nanoid();
}
