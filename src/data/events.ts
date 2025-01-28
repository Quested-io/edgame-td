import { Event } from '@/types/infinite';

export function generateMerchantEvent(
  addCoins: (amount: number) => void,
  removeCoins: (amount: number) => void,
  addLetters: (letters: string[]) => void
): Event {
  return {
    id: 'merchant',
    type: 'merchant',
    title: 'Wandering Merchant',
    description: 'A mysterious merchant offers you a deal...',
    options: [
      {
        text: 'Buy 3 random letters for 20 coins',
        effect: () => {
          removeCoins(20);
          addLetters(['a', 'e', 'i']); // Example letters
        }
      },
      {
        text: 'Trade 50 coins for a special letter',
        effect: () => {
          removeCoins(50);
          addLetters(['s']);
        }
      },
      {
        text: 'Decline offers',
        effect: () => {}
      }
    ]
  };
}

export function generateFortuneEvent(
  addCoins: (amount: number) => void,
  addLetters: (letters: string[]) => void
): Event {
  return {
    id: 'fortune',
    type: 'fortune',
    title: 'Fortune Favors',
    description: 'A stroke of luck comes your way!',
    options: [
      {
        text: 'Receive 30 free coins',
        effect: () => addCoins(30)
      },
      {
        text: 'Receive 2 random letters',
        effect: () => addLetters(['e', 'a'])
      }
    ]
  };
}

export function generateTradeEvent(
  addLetters: (letters: string[]) => void,
  removeLetters: (letters: string[]) => void
): Event {
  return {
    id: 'trade',
    type: 'trade',
    title: 'Letter Trade',
    description: 'Trade your letters for different ones!',
    options: [
      {
        text: 'Trade 2 consonants for 2 vowels',
        effect: () => {
          removeLetters(['b', 'c']);
          addLetters(['a', 'e']);
        }
      },
      {
        text: 'Keep your letters',
        effect: () => {}
      }
    ]
  };
}
