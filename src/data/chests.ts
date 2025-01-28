import { Chest } from '@/types/infinite';
import { LucideIcon, Package, Heart, Box, Star } from 'lucide-react';

export const chests: (Chest & { IconComponent: LucideIcon })[] = [
  {
    id: 'basic',
    name: 'Basic Chest',
    description: 'Contains 3 random letters',
    cost: 30,
    type: 'basic',
    letterCount: 3,
    IconComponent: Package
  },
  {
    id: 'vowel',
    name: 'Vowel Chest',
    description: 'Contains 3 vowels',
    cost: 50,
    type: 'vowel',
    letterCount: 3,
    IconComponent: Heart
  },
  {
    id: 'consonant',
    name: 'Consonant Chest',
    description: 'Contains 3 consonants',
    cost: 40,
    type: 'consonant',
    letterCount: 3,
    IconComponent: Box
  },
  {
    id: 'special',
    name: 'Special S Chest',
    description: 'Contains the letter S and 2 random letters',
    cost: 60,
    type: 'special',
    letterCount: 3,
    IconComponent: Star
  }
];

export const VOWELS = ['a', 'e', 'i', 'o', 'u'];
export const CONSONANTS = [
  'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
  'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'
];
