import { RoundState } from "@/types/game.ts";
import * as Icons from "lucide-react";
import { Progress } from "@/components/ui/progress.tsx";
import { allTowers } from "@/data/allTowers.ts";
import { Shield } from "lucide-react";

interface GameBoardProps {
  gameState: RoundState;
  lanes: number;
}

export default function GameBoard({ gameState, lanes }: GameBoardProps) {
  return (
    <div className="space-y-4">
      {/* Tower status bar */}
      <div className="grid grid-cols-5 gap-4">
        {gameState.activeTowers.map((tower) => {
          const towerConfig = allTowers?.find((t) => t.id === tower.towerId);
          if (!towerConfig) return null;
          const Icon = Icons[towerConfig.icon as keyof typeof Icons];
          const isOnCooldown =
            tower.cooldownEnds && tower.cooldownEnds > Date.now();
          const cooldownProgress = isOnCooldown
            ? ((tower.cooldownEnds! - Date.now()) / towerConfig.cooldown) * 100
            : 0;

          return (
            <div
              key={tower.towerId}
              className="relative p-4 bg-muted rounded-lg"
            >
              <div className="flex flex-col items-center gap-2">
                {/*@ts-expect-error ts is not recognizing dynamic icons*/}
                <Icon
                  className={`w-8 h-8 ${tower.isActive ? "text-primary animate-pulse" : ""}`}
                />
                <Progress
                  value={100 - cooldownProgress}
                  className="h-1 w-full"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Game area */}
      <div className="relative h-[50vh] border rounded-lg overflow-hidden bg-background">
        {/* Shield indicator */}
        {gameState.hasShield && (
          <div className="absolute top-2 right-2 text-primary">
            <Shield className="w-6 h-6" />
          </div>
        )}

        {/* Lane dividers */}
        {Array.from({ length: lanes - 1 }, (_, i) => (
          <div
            key={i}
            className="absolute w-full border-t border-dashed border-muted-foreground/20"
            style={{
              top: `${((i + 1) * 100) / lanes}%`,
            }}
          />
        ))}

        {gameState.activeWords.map((word) => (
          <div
            key={word.id}
            className="absolute px-2 py-1 bg-primary text-primary-foreground rounded transition-all"
            style={{
              left: `${word.position}%`,
              top: `${(word.lane * 100) / lanes + 50 / lanes}%`,
              transform: "translate(-50%, -50%)",
              transition: "left 0.1s linear",
            }}
          >
            {word.word}
          </div>
        ))}
      </div>
    </div>
  );
}
