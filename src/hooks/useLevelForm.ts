import { useState } from 'react';
import { Level } from '@/types/game.ts';

export function useLevelForm() {
  const [level, setLevel] = useState<Partial<Level>>({
    name: '',
    words: [],
    speed: 1,
    lives: 3,
    lanes: 3,
    wordsPerWave: 3,
    totalWaves: 5
  });

  const isValid = !!(
    level.name &&
    level.words?.length &&
    level.words?.length >= 1 &&
    level.speed &&
    level.lives &&
    level.lanes &&
    level.wordsPerWave &&
    level.totalWaves
  );

  return {
    level,
    setLevel,
    isValid
  };
}