import { Tower } from '@/types/game';

export const towers: Tower[] = [
  {
    id: 'shield',
    name: 'Shield Tower',
    description: 'Basic defensive tower that slows enemies',
    activationWords: ['protect', 'shield', 'defend', 'guard', 'cover'],
    cooldown: 5000,
    rarity: 'common',
    icon: 'Shield'
  },
  {
    id: 'lightning',
    name: 'Lightning Tower',
    description: 'Electrifying tower with quick cooldown',
    activationWords: ['zap', 'shock', 'bolt', 'spark', 'flash'],
    cooldown: 8000,
    rarity: 'common',
    icon: 'Zap'
  },
  {
    id: 'royal',
    name: 'Royal Tower',
    description: 'Majestic tower with powerful effects',
    activationWords: ['crown', 'royal', 'reign', 'rule', 'throne'],
    cooldown: 15000,
    rarity: 'rare',
    icon: 'Crown'
  },
  {
    id: 'star',
    name: 'Star Tower',
    description: 'Celestial tower with cosmic powers',
    activationWords: ['star', 'shine', 'glow', 'beam', 'light'],
    cooldown: 12000,
    rarity: 'rare',
    icon: 'Star'
  },
  {
    id: 'sword',
    name: 'Sword Tower',
    description: 'Sharp and precise tower',
    activationWords: ['slash', 'cut', 'blade', 'strike', 'pierce'],
    cooldown: 10000,
    rarity: 'common',
    icon: 'Sword'
  },
  {
    id: 'heart',
    name: 'Heart Tower',
    description: 'Healing tower with restorative powers',
    activationWords: ['heal', 'life', 'pulse', 'beat', 'care'],
    cooldown: 20000,
    rarity: 'epic',
    icon: 'Heart'
  },
  {
    id: 'sun',
    name: 'Sun Tower',
    description: 'Radiant tower with burning power',
    activationWords: ['sun', 'burn', 'blaze', 'flame', 'heat'],
    cooldown: 18000,
    rarity: 'epic',
    icon: 'Sun'
  },
  {
    id: 'moon',
    name: 'Moon Tower',
    description: 'Mysterious tower with lunar energy',
    activationWords: ['moon', 'night', 'dark', 'lunar', 'shadow'],
    cooldown: 15000,
    rarity: 'epic',
    icon: 'Moon'
  },
  {
    id: 'wind',
    name: 'Wind Tower',
    description: 'Swift tower that controls the air',
    activationWords: ['wind', 'gust', 'blow', 'storm', 'breeze'],
    cooldown: 8000,
    rarity: 'rare',
    icon: 'Wind'
  },
  {
    id: 'cloud',
    name: 'Cloud Tower',
    description: 'Mystical tower that brings rain',
    activationWords: ['rain', 'cloud', 'storm', 'mist', 'fog'],
    cooldown: 10000,
    rarity: 'rare',
    icon: 'Cloud'
  }
];