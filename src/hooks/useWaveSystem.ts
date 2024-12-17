import { useState, useCallback, useEffect } from "react";
import { PlayerTower } from "@/types/game";

interface WaveState {
  currentWave: number;
  isPreWave: boolean;
  activationWords: Map<string, string>;
  preWaveTimer: number;
}

interface UseWaveSystemProps {
  totalWaves: number;
  equippedTowers: PlayerTower[];
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
    isPreWave: false,
    activationWords: new Map(),
    preWaveTimer: WAVE_PREVIEW_TIME,
  });

  const generateActivationWords = useCallback(() => {
    console.log(
      `Generating activation words for ${equippedTowers.length} towers`
    );
    const newActivationWords = new Map<string, string>();
    equippedTowers.forEach((tower) => {
      const randomWord =
        tower.activationWords[
          Math.floor(Math.random() * tower.activationWords.length)
        ];
      newActivationWords.set(tower.id, randomWord);
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
        activationWords: generateActivationWords(),
      }));
    }
  }, [waveState.currentWave, generateActivationWords]);

  // Handle pre-wave timer
  useEffect(() => {
    if (!waveState.isPreWave) return;

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
  }, [waveState.isPreWave]);

  return {
    waveState,
    startWave,
    completeWave,
  };
}
