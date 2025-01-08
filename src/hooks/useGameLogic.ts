import { useState, useCallback, useEffect } from "react";
import { RoundState, Level } from "@/types/game.ts";
import { useWaveSystem } from "./useWaveSystem.ts";
import { spawnWord } from "@/lib/wordUtils.ts";
import { IPlayerTower } from "@/store/gameStore.ts";
import { allTowers } from "@/data/allTowers.ts";
import { applyTowerAbility, ABILITY_DURATION } from "@/lib/towerAbilities.ts";

interface UseGameLogicProps {
  level: Level;
  equippedTowers?: IPlayerTower[];
  onGameOver?: (result: {
    score: number;
    timeTaken: number;
    status: string;
  }) => void;
}

const initialGameState = (
  level: Level,
  equippedTowers: IPlayerTower[] = []
): RoundState => ({
  lives: level.lives,
  score: 0,
  activeWords: [],
  status: "preWave",
  activeTowers: equippedTowers.map((tower) => ({
    ...tower,
    isActive: false,
    cooldownEnds: null,
  })),
  hasShield: false,
});

export function useGameLogic({
  level,
  equippedTowers = [],
  onGameOver,
}: UseGameLogicProps) {
  const [gameState, setGameState] = useState<RoundState>(
    initialGameState(level, equippedTowers)
  );
  const [input, setInput] = useState("");
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
          timeTaken: Date.now() - startTime,
          status: "won",
        });
      }
    },
  });

  const togglePause = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      status: prev.status === "playing" ? "paused" : "playing",
    }));
  }, []);

  // Handle pre-wave to wave transition
  useEffect(() => {
    if (!waveState.isPreWave) {
      setGameState((prev) => ({ ...prev, status: "playing" }));
      startWave();
    }
  }, [
    waveState.preWaveTimer,
    gameState.status,
    startWave,
    waveState.isPreWave,
  ]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (gameState.status !== "playing") return;

      const value = e.target.value.toLowerCase();
      setInput(value);

      // Check for tower activation
      const activeTower = gameState.activeTowers.find((tower) => {
        const activationWord = waveState.activationWords.get(tower.towerId);
        return (
          activationWord === value &&
          (!tower.cooldownEnds || Date.now() > tower.cooldownEnds)
        );
      });

      if (activeTower) {
        const tower = allTowers.find((t) => t.id === activeTower.towerId);
        if (!tower) return;

        setInput("");

        // Apply tower ability
        const abilityEffect = applyTowerAbility(
          activeTower,
          gameState,
          level.lanes
        );

        setGameState((prev) => ({
          ...prev,
          activeTowers: prev.activeTowers.map((t) =>
            t.towerId === activeTower.towerId
              ? {
                  ...t,
                  isActive: true,
                  cooldownEnds: Date.now() + tower.cooldown,
                }
              : t
          ),
          activeWords: abilityEffect.activeWords,
          lives: abilityEffect.lives,
          hasShield: abilityEffect.hasShield,
        }));

        // Reset effects after duration
        setTimeout(() => {
          setGameState((prev) => ({
            ...prev,
            activeTowers: prev.activeTowers.map((t) =>
              t.towerId === activeTower.towerId ? { ...t, isActive: false } : t
            ),
            activeWords: prev.activeWords.map((word) => ({
              ...word,
              speed: word.originalSpeed,
            })),
          }));
        }, ABILITY_DURATION);
        return;
      }

      // Check for word matches
      const matchedWord = gameState.activeWords.find((w) => w.word === value);
      if (matchedWord) {
        setInput("");
        setGameState((prev) => ({
          ...prev,
          score:
            prev.score + Math.floor((100 - matchedWord.position) * level.speed),
          activeWords: prev.activeWords.filter((w) => w.id !== matchedWord.id),
        }));
      }
    },
    [
      gameState.activeTowers,
      gameState.activeWords,
      waveState.activationWords,
      gameState.status,
      level.speed,
      level.lanes,
    ]
  );

  // Spawn words during wave
  useEffect(() => {
    if (gameState.status !== "playing") return;
    if (wordsSpawned >= level.wordsPerWave) return;
    if (waveState.isPreWave) return;

    const spawnInterval = setInterval(() => {
      setGameState((prev) => ({
        ...prev,
        activeWords: [
          ...prev.activeWords,
          spawnWord(level.words, level.speed, level.lanes),
        ],
      }));
      setWordsSpawned((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, [gameState.status, wordsSpawned, waveState.isPreWave]);

  // Game loop effect
  useEffect(() => {
    if (gameState.status !== "playing") return;

    const gameLoop = setInterval(() => {
      setGameState((prev) => {
        const newWords = prev.activeWords.map((word) => ({
          ...word,
          position: word.position + word.speed / 100,
        }));

        const reachedEnd = newWords.some((word) => word.position >= 100);

        if (reachedEnd) {
          // If we have a shield, use it instead of losing a life
          if (prev.hasShield) {
            return {
              ...prev,
              hasShield: false,
              activeWords: newWords.filter((word) => word.position < 100),
            };
          }

          const newLives = prev.lives - 1;
          if (newLives <= 0 && onGameOver) {
            onGameOver({
              score: prev.score,
              timeTaken: Date.now() - startTime,
              status: "lost",
            });
          }
          return {
            ...prev,
            lives: newLives,
            activeWords: newWords.filter((word) => word.position < 100),
            status: newLives <= 0 ? "gameOver" : prev.status,
          };
        }

        // Check if wave is complete
        if (newWords.length === 0 && wordsSpawned >= level.wordsPerWave) {
          completeWave(waveState.currentWave);
          return {
            ...prev,
            activeWords: [],
          };
        }

        return {
          ...prev,
          activeWords: newWords,
        };
      });
    }, 5);

    return () => clearInterval(gameLoop);
  }, [
    gameState.status,
    onGameOver,
    startTime,
    wordsSpawned,
    level.wordsPerWave,
    completeWave,
    waveState.currentWave,
  ]);

  return {
    gameState,
    waveState,
    input,
    handleInput,
    startWave,
    togglePause,
  };
}
