import { Level, Tower } from "@/types/game.ts";
import { IPlayerTower } from "@/store/gameStore.ts";

export const getLevelBasedOnUsage = (
  tower: Tower,
  playerTower: IPlayerTower
) => {
  for (const [level, usage] of Object.entries(tower.levelUsageRequirements)) {
    // Stop when usage is not enough
    if (playerTower.usages < usage) {
      return parseInt(level) - 1;
    }
  }
  return tower.maxLevel;
};

export const getStarBasedOnScore = (score: number, level: Level) => {
  for (const [star, requirement] of Object.entries(
    level.starScoreRequirements
  )) {
    // Stop when usage is not enough
    if (score < requirement) {
      return parseInt(star) - 1;
    }
  }
  return Object.entries(level.starScoreRequirements).length;
};
