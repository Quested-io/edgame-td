import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import * as Icons from "lucide-react";
import { ActiveTower } from "@/types/game.ts";
import { allTowers } from "@/data/allTowers.ts";
import { Button } from "@/components/ui/button.tsx";

interface PreWaveOverlayProps {
  wave: number;
  totalWaves: number;
  towers: ActiveTower[];
  activationWords: Map<string, string>;
  timeRemaining: number;
  isFirstWave: boolean;
  onStart: () => void;
}

export default function PreWaveOverlay({
  wave,
  totalWaves,
  towers,
  activationWords,
  timeRemaining,
  isFirstWave,
  onStart,
}: PreWaveOverlayProps) {
  const progressValue = isFirstWave ? 100 : (timeRemaining / 5000) * 100;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-[500px]">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Wave {wave} of {totalWaves}
          </CardTitle>
          <CardDescription>
            {towers.length > 0
              ? "Memorize the activation words for your towers!"
              : "You have no towers equipped for this level!"}
          </CardDescription>
          {!isFirstWave && (
            <div className="space-y-1">
              <Progress value={progressValue} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {Math.ceil(timeRemaining / 1000)}s remaining
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {towers.length > 0 ? (
            <div className="space-y-3">
              {towers.map((tower) => {
                const towerConfig = allTowers.find((t) => t.id === tower.towerId);

                if (!towerConfig) return null;

                const Icon = Icons[towerConfig.icon as keyof typeof Icons];
                const activationWord = activationWords.get(towerConfig.id);

                if (!activationWord) return null;

                return (
                  <div
                    key={towerConfig.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg transition-colors hover:bg-muted/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-background rounded-md">
                        {/*@ts-expect-error ts is not recognizing dynamic icons*/}
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium">{towerConfig.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Cooldown: {towerConfig.cooldown / 1000}s
                        </p>
                      </div>
                    </div>
                    <code className="px-3 py-1.5 bg-background rounded-md font-mono text-sm">
                      {activationWord}
                    </code>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              The level will be more challenging without towers!
            </p>
          )}
          {isFirstWave && (
            <div className="mt-6 flex justify-center">
              <Button onClick={onStart} size="lg">
                Start Wave
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
