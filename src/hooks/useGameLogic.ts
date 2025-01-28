import { useState, useEffect, useCallback } from 'react';
import { Level, GameState } from '@/types/game';

interface UseGameLogicProps {
  level: Level;
  onGameOver?: (result: {
    score: number;
    timeTaken: number;
    foundWords: string[];
    totalWords: number;
  }) => void;
}

function getLetterCounts(words: string[]): Map<string, number> {
  const letterCounts = new Map<string, number>();
  const allLetters = words.join('').toLowerCase().split('');

  allLetters.forEach(letter => {
    letterCounts.set(letter, (letterCounts.get(letter) || 0) + 1);
  });

  return letterCounts;
}

export function useGameLogic({ level, onGameOver }: UseGameLogicProps) {
  const [input, setInput] = useState('');
  const [gameState, setGameState] = useState<GameState>(() => ({
    letterCounts: getLetterCounts(level.words),
    foundWords: [],
    timeRemaining: level.timeLimit,
    status: 'playing',
    score: 0
  }));

  // Check if word can be formed from available letters
  const canFormWord = useCallback((word: string): boolean => {
    const availableLetters = new Map(gameState.letterCounts);

    for (const letter of word.toLowerCase()) {
      const count = availableLetters.get(letter) || 0;
      if (count === 0) return false;
      availableLetters.set(letter, count - 1);
    }

    return true;
  }, [gameState.letterCounts]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState.status !== 'playing') return;

    const value = e.target.value.toLowerCase();
    setInput(value);

    // Check if the word is valid and can be formed
    if (level.words.includes(value) &&
      !gameState.foundWords.includes(value) &&
      canFormWord(value)) {
      // Remove used letters
      const newLetterCounts = new Map(gameState.letterCounts);
      value.split('').forEach(letter => {
        const currentCount = newLetterCounts.get(letter) || 0;
        if (currentCount > 1) {
          newLetterCounts.set(letter, currentCount - 1);
        } else {
          newLetterCounts.delete(letter);
        }
      });

      setGameState(prev => ({
        ...prev,
        foundWords: [...prev.foundWords, value],
        score: prev.score + (value.length * 100),
        letterCounts: newLetterCounts
      }));
      setInput('');
    }
  }, [gameState.status, gameState.foundWords, gameState.letterCounts, level.words, canFormWord]);

  // Timer effect
  useEffect(() => {
    if (gameState.status !== 'playing') return;

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTime = prev.timeRemaining - 1;

        if (newTime <= 0 || prev.foundWords.length === level.words.length) {
          clearInterval(timer);
          if (onGameOver) {
            onGameOver({
              score: prev.score,
              timeTaken: level.timeLimit - newTime,
              foundWords: prev.foundWords,
              totalWords: level.words.length
            });
          }
          return { ...prev, timeRemaining: Math.max(0, newTime), status: 'gameOver' };
        }

        return { ...prev, timeRemaining: newTime };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.status, level.timeLimit, level.words.length, onGameOver]);

  return {
    gameState,
    input,
    handleInput,
    remainingWords: level.words.filter(word => !gameState.foundWords.includes(word))
  };
}
