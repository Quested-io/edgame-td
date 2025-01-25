import { useState, useCallback, useEffect } from "react";
import { ActiveTower } from "@/types/game.ts";
import { allTowers } from "@/data/allTowers.ts";

interface WaveState {
  currentWave: number;
  isPreWave: boolean;
  activationWords: Map<string, string>;
  preWaveTimer: number;
  isFirstWave: boolean;
}

interface UseWaveSystemProps {
  totalWaves: number;
  equippedTowers: ActiveTower[];
  onWaveComplete: () => void;
  onGameComplete: () => void;
}

const WAVE_PREVIEW_TIME = 5000; // 5 seconds

export function useWaveSystem({
  totalWaves,
  equippedTowers,
  onWaveComplete,
  onGameComplete,
}: UseWaveSystemProps) {
  const [waveState, setWaveState] = useState<WaveState>({
    currentWave: 1,
    isPreWave: true,
    activationWords: new Map(),
    preWaveTimer: WAVE_PREVIEW_TIME,
    isFirstWave: true,
  });

  const generateActivationWords = useCallback(() => {
    console.log(
      `Generating activation words for ${equippedTowers.length} towers`
    );
    const newActivationWords = new Map<string, string>();
    equippedTowers.forEach((tower) => {
      const towerConfig = allTowers.find((t) => t.id === tower.towerId);
      if (!towerConfig) return;
      const randomWord =
        towerConfig.activationWords[
          Math.floor(Math.random() * towerConfig.activationWords.length)
        ];
      newActivationWords.set(tower.towerId, randomWord);
    });
    setWaveState((prev) => ({
      ...prev,
      activationWords: newActivationWords,
      isPreWave: true,
    }));
    return newActivationWords;
  }, [equippedTowers]);

  const startWave = useCallback(() => {
    setWaveState((prev) => ({
      ...prev,
      isPreWave: false,
      preWaveTimer: WAVE_PREVIEW_TIME,
      isFirstWave: false,
    }));
  }, []);

  const completeWave = useCallback(
    (wave: number) => {
      console.log(`Wave ${waveState.currentWave} completed`);
      if (wave >= totalWaves) {
        onGameComplete();
      } else {
        setWaveState((prev) => ({
          ...prev,
          currentWave: wave + 1,
          isPreWave: true,
          activationWords: generateActivationWords(),
          preWaveTimer: WAVE_PREVIEW_TIME,
        }));
        onWaveComplete();
      }
    },
    [
      waveState.currentWave,
      totalWaves,
      onGameComplete,
      onWaveComplete,
      generateActivationWords,
    ]
  );

  // Initialize first wave activation words
  useEffect(() => {
    if (waveState.currentWave === 1 && waveState.activationWords.size === 0) {
      setWaveState((prev) => ({
        ...prev,
        isPreWave: true,
        activationWords: generateActivationWords(),
      }));
    }
  }, [waveState.currentWave, generateActivationWords]);

  // Handle pre-wave timer
  useEffect(() => {
    if (!waveState.isPreWave || waveState.isFirstWave) return;

    const timer = setInterval(() => {
      setWaveState((prev) => {
        const newTimer = prev.preWaveTimer - 1000;
        if (newTimer <= 0) {
          clearInterval(timer);
          return {
            ...prev,
            preWaveTimer: 0,
            isPreWave: false,
          };
        }
        return {
          ...prev,
          preWaveTimer: newTimer,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [waveState.isPreWave, waveState.isFirstWave]);

  return {
    waveState,
    startWave,
    completeWave,
  };
}
