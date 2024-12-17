import { useState } from 'react';
import { Level } from '@/types/game';

export function useLevelForm() {
  const [level, setLevel] = useState<Partial<Level>>({
    name: '',
    words: [],
    speed: 1,
    lives: 3,
    wordsPerWave: 3,
    totalWaves: 5
  });

  const isValid = !!(
    level.name &&
    level.words?.length &&
    level.speed &&
    level.lives &&
    level.wordsPerWave &&
    level.totalWaves
  );

  return {
    level,
    setLevel,
    isValid
  };
}