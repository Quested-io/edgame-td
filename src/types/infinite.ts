
export interface Chest {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'basic' | 'vowel' | 'consonant' | 'special';
  letterCount: number;
}

export interface Relic {
  id: string;
  name: string;
  description: string;
  type: 'coinMultiplier' | 'extraLetters' | 'relicChance' | 'wordBonus';
  value: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
}

export interface Event {
  id: string;
  type: 'merchant' | 'trade' | 'fortune';
  title: string;
  description: string;
  options: EventOption[];
}

export interface EventOption {
  text: string;
  effect: () => void;
}

export interface GameStats {
  wordsFound: number;
  coinsEarned: number;
  longestWord: string;
  totalScore: number;
}

export interface InfiniteGameState {
  letters: Map<string, number>;
  coins: number;
  relics: Relic[];
  stats: GameStats;
  lastCoinClaim: number;
  wordsForNextEvent: number;
  currentEvent: Event | null;
}
