import { Tower } from '@/types/game.ts';

export const allTowers: Tower[] = [
  {
    id: 'translator',
    name: 'Universal Translator',
    description: 'Translate alien language to human language',
    activationWords: ['translate', 'interpret', 'understand', 'comprehend', 'decode'],
    cooldown: 10000,
    maxLevel: 5,
    levelUsageRequirements: {
      1: 0,
      2: 10,
      3: 20,
      4: 30,
      5: 40
    },
    icon: 'BookType'
  },
  {
    id: 'diplomat',
    name: 'Diplomatic Envoy',
    description: 'Send a diplomat to establish diplomatic relations',
    activationWords: ['diplomat', 'envoy', 'ambassador', 'representative', 'delegate'],
    cooldown: 15000,
    maxLevel: 5,
    levelUsageRequirements: {
      1: 0,
      2: 10,
      3: 20,
      4: 30,
      5: 40
    },
    icon: 'Snail'
  },
  {
    id: 'alien-technology',
    name: 'Alien Technology',
    description: 'Use alien technology to defend the planet',
    activationWords: ['technology', 'weapon', 'defense', 'laser', 'ray'],
    cooldown: 20000,
    maxLevel: 5,
    levelUsageRequirements: {
      1: 0,
      2: 10,
      3: 20,
      4: 30,
      5: 40
    },
    icon: 'Shield'
  },
  {
    id: 'party-up',
    name: 'Party Up',
    description: 'Organize a planet wide party to celebrate the arrival of aliens',
    activationWords: ['party', 'celebrate', 'dance', 'music', 'fun'],
    cooldown: 30000,
    maxLevel: 5,
    levelUsageRequirements: {
      1: 0,
      2: 10,
      3: 20,
      4: 30,
      5: 40
    },
    icon: 'PartyPopper'
  }
];