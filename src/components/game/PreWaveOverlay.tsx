import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PlayerTower } from '@/types/game';
import * as Icons from 'lucide-react';

interface PreWaveOverlayProps {
  wave: number;
  totalWaves: number;
  towers: PlayerTower[];
  activationWords: Map<string, string>;
  timeRemaining: number;
}

export default function PreWaveOverlay({
  wave,
  totalWaves,
  towers,
  activationWords,
  timeRemaining
}: PreWaveOverlayProps) {
  const progressValue = (timeRemaining / 5000) * 100;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-[500px]">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Wave {wave} of {totalWaves}
          </CardTitle>
          <CardDescription>
            Memorize the activation words for your towers!
          </CardDescription>
          <div className="space-y-1">
            <Progress value={progressValue} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {Math.ceil(timeRemaining / 1000)}s remaining
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {towers.map(tower => {
              const Icon = Icons[tower.icon as keyof typeof Icons];
              const activationWord = activationWords.get(tower.id);

              console.log(activationWord, activationWords)

              if (!activationWord) return null;

              return (
                <div
                  key={tower.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg transition-colors hover:bg-muted/80"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-background rounded-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{tower.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Cooldown: {tower.cooldown / 1000}s
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
        </CardContent>
      </Card>
    </div>
  );
}