import { create } from 'zustand';
import { InfiniteGameState, Relic, Event } from '@/types/infinite';

interface InfiniteGameStore extends InfiniteGameState {
  addLetters: (letters: string[]) => void;
  removeLetters: (letters: string[]) => void;
  addCoins: (amount: number) => void;
  removeCoins: (amount: number) => void;
  addRelic: (relic: Relic) => void;
  setEvent: (event: Event | null) => void;
  claimFreeCoins: () => void;
  wordCompleted: (word: string) => void;
  resetGame: () => void;
}

const COIN_CLAIM_COOLDOWN = 5000; // 5 seconds
const FREE_COINS_AMOUNT = 10;
export const WORDS_PER_EVENT = 3;

const initialState: InfiniteGameState = {
  letters: new Map(),
  coins: 0,
  relics: [],
  stats: {
    wordsFound: 0,
    coinsEarned: 0,
    longestWord: '',
    totalScore: 0,
  },
  lastCoinClaim: 0,
  wordsForNextEvent: WORDS_PER_EVENT,
  currentEvent: null,
};

const useInfiniteGameStore = create<InfiniteGameStore>()((set, get) => ({
  ...initialState,

  resetGame: () => set(initialState),

  addLetters: (letters) => set((state) => {
    const newLetters = new Map(state.letters);
    letters.forEach((letter) => {
      newLetters.set(letter, (newLetters.get(letter) || 0) + 1);
    });
    return { letters: newLetters };
  }),

  removeLetters: (letters) => set((state) => {
    const newLetters = new Map(state.letters);
    letters.forEach((letter) => {
      const count = newLetters.get(letter) || 0;
      if (count > 1) {
        newLetters.set(letter, count - 1);
      } else {
        newLetters.delete(letter);
      }
    });
    return { letters: newLetters };
  }),

  addCoins: (amount) => set((state) => {
    const multiplier = state.relics
      .filter((r) => r.type === 'coinMultiplier')
      .reduce((acc, r) => acc + r.value, 1);

    const finalAmount = Math.floor(amount * multiplier);
    return {
      coins: state.coins + finalAmount,
      stats: {
        ...state.stats,
        coinsEarned: state.stats.coinsEarned + finalAmount,
      },
    };
  }),

  removeCoins: (amount) => set((state) => ({
    coins: Math.max(0, state.coins - amount)
  })),

  addRelic: (relic) => set((state) => ({
    relics: [...state.relics, relic]
  })),

  setEvent: (event) => set({ currentEvent: event }),

  claimFreeCoins: () => {
    const state = get();
    const now = Date.now();
    if (now - state.lastCoinClaim >= COIN_CLAIM_COOLDOWN) {
      set({
        coins: state.coins + FREE_COINS_AMOUNT,
        lastCoinClaim: now,
        stats: {
          ...state.stats,
          coinsEarned: state.stats.coinsEarned + FREE_COINS_AMOUNT,
        },
      });
    }
  },

  wordCompleted: (word) => set((state) => {
    const wordBonus = state.relics
      .filter((r) => r.type === 'wordBonus')
      .reduce((acc, r) => acc + r.value, 0);

    const baseScore = word.length * 10;
    const finalScore = baseScore + wordBonus;

    const newWordsForNextEvent = state.wordsForNextEvent - 1;

    return {
      stats: {
        ...state.stats,
        wordsFound: state.stats.wordsFound + 1,
        longestWord: word.length > state.stats.longestWord.length ? word : state.stats.longestWord,
        totalScore: state.stats.totalScore + finalScore,
      },
      wordsForNextEvent: newWordsForNextEvent <= 0 ? WORDS_PER_EVENT : newWordsForNextEvent,
    };
  }),
}));

export default useInfiniteGameStore;
