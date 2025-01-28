import { dictionary } from '@/data/words.ts';

export function isValidWord(word: string): boolean {
  return dictionary.includes(word);
}

export function getWordScore(word: string): number {
  return word.length * 10;
}
