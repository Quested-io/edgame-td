import { ActiveTower, RoundState } from "@/types/game.ts";
import { allTowers } from "@/data/allTowers.ts";
import { getLevelBasedOnUsage } from "@/lib/gameUtils.ts";

export type AbilityEffect = {
  activeWords: RoundState["activeWords"];
  lives: number;
  hasShield: boolean;
};

export const ABILITY_DURATION = 5000; // 5 seconds

export function applyTowerAbility(
  tower: ActiveTower,
  gameState: RoundState,
  totalLanes: number
): AbilityEffect {
  const towerConfig = allTowers.find((t) => t.id === tower.towerId);
  if (!towerConfig)
    return {
      activeWords: gameState.activeWords,
      lives: gameState.lives,
      hasShield: false,
    };

  const level = getLevelBasedOnUsage(towerConfig, tower);

  switch (tower.towerId) {
    case "diplomat":
      return applyDiplomatAbility(gameState, level);
    case "alien-technology":
      return applyAlienTechnologyAbility(gameState, level);
    case "party-up":
      return applyPartyUpAbility(gameState, level, totalLanes);
    default:
      return {
        activeWords: gameState.activeWords,
        lives: gameState.lives,
        hasShield: false,
      };
  }
}

function applyDiplomatAbility(
  gameState: RoundState,
  level: number
): AbilityEffect {
  // Slow down words based on level (10% per level, up to 50% at level 5)
  const slowdownFactor = 0.5 + level * 0.1;

  const modifiedWords = gameState.activeWords.map((word) => ({
    ...word,
    speed: word.originalSpeed * slowdownFactor,
  }));

  return {
    activeWords: modifiedWords,
    lives: gameState.lives,
    hasShield: false,
  };
}

function applyAlienTechnologyAbility(
  gameState: RoundState,
  level: number
): AbilityEffect {
  // Shield duration increases with level
  return {
    activeWords: gameState.activeWords,
    lives: gameState.lives,
    hasShield: true,
  };
}

function applyPartyUpAbility(
  gameState: RoundState,
  level: number,
  totalLanes: number
): AbilityEffect {
  // Shuffle words and optionally modify their speeds based on level
  const shuffledWords = [...gameState.activeWords].map((word) => {
    const lanes = Array.from({ length: totalLanes }, (_, i) => i);
    const newLane = lanes[Math.floor(Math.random() * lanes.length)];

    // Higher levels provide a speed reduction bonus after shuffle
    const speedMultiplier = level >= 3 ? 0.9 : 1;

    return {
      ...word,
      lane: newLane,
      speed: word.speed * speedMultiplier,
    };
  });

  return {
    activeWords: shuffledWords,
    lives: gameState.lives,
    hasShield: false,
  };
}
