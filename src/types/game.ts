import { IPlayerTower } from "@/store/gameStore.ts";

export interface Level {
  id: string;
  name: string;
  description?: string;
  words: string[];
  speed: number;
  lives: number;
  wordsPerWave: number;
  totalWaves: number;
  lanes: number; // Number of lanes (1-10)
  unlocks?: string;
  starScoreRequirements: {
    1: number;
    2: number;
    3: number;
  };
}

export interface LevelState {
  highestScore: number;
  isUnlocked: boolean;
  stars: 0 | 1 | 2 | 3;
}

export interface Tower {
  id: string;
  name: string;
  description: string;
  activationWords: string[]; // Array of possible activation words
  cooldown: number;
  maxLevel: number;
  levelUsageRequirements: Record<number, number>;
  icon: string;
}

export interface ActiveTower extends IPlayerTower {
  cooldownEnds: number | null;
  isActive: boolean;
}

export interface RoundState {
  lives: number;
  score: number;
  activeWords: Array<{
    id: string;
    word: string;
    position: number;
    lane: number;
    speed: number;
    originalSpeed: number;
  }>;
  status: "preWave" | "playing" | "paused" | "gameOver" | "victory";
  activeTowers: ActiveTower[];
  hasShield: boolean;
}

export interface GameResult {
  levelId: string;
  score: number;
  accuracy: number;
  totalWords: number;
  correctWords: number;
  timeTaken: number;
  status: "victory" | "defeat";
}
