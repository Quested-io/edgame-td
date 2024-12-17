import { useState, useCallback, useEffect } from 'react';
import { GameState, Level, PlayerTower } from '@/types/game';
import { useWaveSystem } from './useWaveSystem';
import { spawnWord } from '@/lib/wordUtils';

interface UseGameLogicProps {
  level: Level;
  equippedTowers?: PlayerTower[];
  onGameOver?: (result: { score: number; timeTaken: number }) => void;
}

const initialGameState = (level: Level): GameState => ({
  currentWave: 1,
  lives: level.lives,
  score: 0,
  activeWords: [],
  status: 'preWave',
  activeTowers: []
});

export function useGameLogic({ level, equippedTowers = [], onGameOver }: UseGameLogicProps) {
  const [gameState, setGameState] = useState<GameState>(initialGameState(level));
  const [input, setInput] = useState('');
  const [startTime] = useState(Date.now());
  const [wordsSpawned, setWordsSpawned] = useState(0);

  const { waveState, startWave, completeWave } = useWaveSystem({
    totalWaves: level.totalWaves,
    equippedTowers: gameState.activeTowers,
    onWaveComplete: () => {
      setWordsSpawned(0);
    },
    onGameComplete: () => {
      if (onGameOver) {
        onGameOver({
          score: gameState.score,
          timeTaken: Date.now() - startTime
        });
      }
    }
  });

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: 'preWave',
      activeTowers: equippedTowers.map(tower => ({
        ...tower,
        position: { x: 0, y: 0 },
        isActive: false,
        cooldownEnds: null
      }))
    }));
  }, [equippedTowers]);

  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: prev.status === 'playing' ? 'paused' : 'playing'
    }));
  }, []);

  // Handle pre-wave to wave transition
  useEffect(() => {
    if (waveState.preWaveTimer <= 0 && gameState.status === 'preWave') {
      setGameState(prev => ({ ...prev, status: 'playing' }));
      startWave();
    }
  }, [waveState.preWaveTimer, gameState.status, startWave]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState.status !== 'playing') return;
    
    const value = e.target.value.toLowerCase();
    setInput(value);

    // Check for tower activation
    const activeTower = gameState.activeTowers.find(tower => {
      const activationWord = waveState.activationWords.get(tower.id);
      return activationWord === value && (!tower.cooldownEnds || Date.now() > tower.cooldownEnds);
    });

    if (activeTower) {
      setInput('');
      setGameState(prev => ({
        ...prev,
        activeTowers: prev.activeTowers.map(t =>
          t.id === activeTower.id
            ? { ...t, isActive: true, cooldownEnds: Date.now() + t.cooldown }
            : t
        ),
        activeWords: prev.activeWords.map(word => ({
          ...word,
          speed: word.speed * 0.1 // Slow by 90%
        }))
      }));

      // Reset speed after 5 seconds
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          activeTowers: prev.activeTowers.map(t =>
            t.id === activeTower.id ? { ...t, isActive: false } : t
          ),
          activeWords: prev.activeWords.map(word => ({
            ...word,
            speed: word.originalSpeed
          }))
        }));
      }, 5000);
      return;
    }

    // Check for word matches
    const matchedWord = gameState.activeWords.find(w => w.word === value);
    if (matchedWord) {
      setInput('');
      setGameState(prev => ({
        ...prev,
        score: prev.score + Math.floor((100 - matchedWord.position) * level.speed),
        activeWords: prev.activeWords.filter(w => w.id !== matchedWord.id)
      }));
    }
  }, [gameState.activeTowers, gameState.activeWords, waveState.activationWords, gameState.status, level.speed]);

  // Spawn words during wave
  useEffect(() => {
    if (gameState.status !== 'playing') return;
    if (wordsSpawned >= level.wordsPerWave) return;

    const spawnInterval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        activeWords: [...prev.activeWords, spawnWord(level.words, level.speed)]
      }));
      setWordsSpawned(prev => prev + 1);
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, [gameState.status, wordsSpawned, level]);

  // Game loop effect
  useEffect(() => {
    if (gameState.status !== 'playing') return;

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        const newWords = prev.activeWords.map(word => ({
          ...word,
          position: word.position + word.speed
        }));

        const reachedEnd = newWords.some(word => word.position >= 100);
        
        if (reachedEnd) {
          const newLives = prev.lives - 1;
          if (newLives <= 0 && onGameOver) {
            onGameOver({
              score: prev.score,
              timeTaken: Date.now() - startTime
            });
          }
          return {
            ...prev,
            lives: newLives,
            activeWords: newWords.filter(word => word.position < 100),
            status: newLives <= 0 ? 'gameOver' : prev.status
          };
        }

        // Check if wave is complete
        if (newWords.length === 0 && wordsSpawned >= level.wordsPerWave) {
          completeWave(waveState.currentWave);
          return {
            ...prev,
            activeWords: []
          };
        }

        return {
          ...prev,
          activeWords: newWords
        };
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, [gameState.status, onGameOver, startTime, wordsSpawned, level.wordsPerWave]);

  return {
    gameState,
    waveState,
    input,
    handleInput,
    startGame,
    togglePause
  };
}