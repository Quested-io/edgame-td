export interface Level {
  id: string;
  name: string;
  words: string[];
  speed: number;
  lives: number;
  wordsPerWave: number;
  totalWaves: number;
  description?: string;
}

export interface Tower {
  id: string;
  name: string;
  description: string;
  activationWords: string[]; // Array of possible activation words
  cooldown: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
}

export interface PlayerTower extends Tower {
  isUnlocked: boolean;
  isEquipped: boolean;
  lastUsed: number | null;
}

export interface ActiveTower extends PlayerTower {
  position: { x: number; y: number };
  isActive: boolean;
  cooldownEnds: number | null;
}

export interface GameState {
  currentWave: number;
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
  status: 'preWave' | 'playing' | 'paused' | 'gameOver' | 'victory';
  activeTowers: ActiveTower[];
}

export interface GameResult {
  levelId: string;
  score: number;
  accuracy: number;
  totalWords: number;
  correctWords: number;
  timeTaken: number;
  status: 'victory' | 'defeat';
}