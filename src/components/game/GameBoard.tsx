import { GameState } from '@/types/game';
import * as Icons from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface GameBoardProps {
  gameState: GameState;
}

export default function GameBoard({ gameState }: GameBoardProps) {
  return (
    <div className="space-y-4">
      {/* Tower status bar */}
      <div className="grid grid-cols-5 gap-4">
        {gameState.activeTowers.map((tower) => {
          const Icon = Icons[tower.icon as keyof typeof Icons];
          const isOnCooldown = tower.cooldownEnds && tower.cooldownEnds > Date.now();
          const cooldownProgress = isOnCooldown
            ? ((tower.cooldownEnds - Date.now()) / tower.cooldown) * 100
            : 0;

          return (
            <div
              key={tower.id}
              className="relative p-4 bg-muted rounded-lg"
            >
              <div className="flex flex-col items-center gap-2">
                <Icon className={`w-8 h-8 ${tower.isActive ? 'text-primary animate-pulse' : ''}`} />
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
        {gameState.activeWords.map((word) => (
          <div
            key={word.id}
            className="absolute px-2 py-1 bg-primary text-primary-foreground rounded transition-all"
            style={{
              left: `${word.position}%`,
              top: `${(word.lane * 33) + 15}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.1s linear'
            }}
          >
            {word.word}
          </div>
        ))}
      </div>
    </div>
  );
}