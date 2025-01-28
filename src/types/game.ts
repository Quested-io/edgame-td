export interface Level {
  id?: string;
  name: string;
  description?: string;
  words: string[];
  timeLimit: number; // in seconds
  starScoreRequirements: {
    1: number;
    2: number;
    3: number;
  };
}

export interface InfiniteGameState {
  letterCounts: Map<string, number>;
  foundWords: string[];
  coins: number;
  availableWords: string[];
  status: 'playing' | 'paused' | 'gameOver';
  score: number;
}

export interface GameState {
  letterCounts: Map<string, number>;
  foundWords: string[];
  timeRemaining: number;
  status: 'playing' | 'paused' | 'gameOver';
  score: number;
}
