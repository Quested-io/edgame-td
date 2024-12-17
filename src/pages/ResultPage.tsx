import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Trophy, Timer, Target, ArrowLeft, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';
import { ActivityEndedEventData, instance } from '@quested/sdk';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!instance.isInitialized || !result) return

    instance.api.player.trackEvent<ActivityEndedEventData>('event:activityEnded', {
      durationInSeconds: result.timeTaken / 1000,
      answers: result.score,
    })

  }, [result]);

  if (!result) {
    navigate('/levels');
    return null;
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Level Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-2 bg-muted rounded">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>Score</span>
            </div>
            <span className="font-bold">{result.score}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-muted rounded">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5" />
              <span>Time</span>
            </div>
            <span className="font-bold">{formatTime(result.timeTaken)}</span>
          </div>

          <div className="flex items-center justify-between p-2 bg-muted rounded">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span>Status</span>
            </div>
            <span className="font-bold capitalize">{result.status}</span>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/levels')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Levels
          </Button>
          <Button
            className="flex-1"
            onClick={() => navigate(`/game/${result.levelId}`)}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}