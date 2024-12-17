import { Level } from '@/types/game';

export const defaultLevels: Level[] = [
  {
    id: 'beginner',
    name: 'Beginner\'s Challenge',
    words: ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have'],
    speed: 1,
    lives: 5,
    wordsPerWave: 3,
    totalWaves: 1,
    description: 'Perfect for starting your typing journey. Common three-letter words.'
  },
  {
    id: 'intermediate',
    name: 'Word Warrior',
    words: ['because', 'through', 'people', 'around', 'thought', 'where', 'would', 'there', 'their', 'about'],
    speed: 1.5,
    lives: 3,
    wordsPerWave: 4,
    totalWaves: 6,
    description: 'Challenge yourself with longer words and faster speeds.'
  }
];