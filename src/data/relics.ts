import { Relic } from '@/types/infinite';
import { Coins, Plus, Sparkles, Crown } from 'lucide-react';

export const relics: Relic[] = [
  {
    id: 'coin_boost_1',
    name: 'Lucky Coin',
    description: 'Increases coin gains by 25%',
    type: 'coinMultiplier',
    value: 0.25,
    rarity: 'common',
    icon: Coins.name
  },
  {
    id: 'extra_letter_1',
    name: 'Letter Magnet',
    description: 'Adds 1 extra letter to each chest',
    type: 'extraLetters',
    value: 1,
    rarity: 'rare',
    icon: Plus.name
  },
  {
    id: 'relic_chance_1',
    name: 'Fortune Charm',
    description: 'Increases relic find chance by 20%',
    type: 'relicChance',
    value: 0.2,
    rarity: 'epic',
    icon: Sparkles.name
  },
  {
    id: 'word_bonus_1',
    name: 'Word Master',
    description: 'Adds 10 bonus points to each word',
    type: 'wordBonus',
    value: 10,
    rarity: 'legendary',
    icon: Crown.name
  }
];

export function getRandomRelic(): Relic {
  return relics[Math.floor(Math.random() * relics.length)];
}
