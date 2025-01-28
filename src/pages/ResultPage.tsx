import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Star, StarOff, Timer, Trophy, Book } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  const stars = useMemo(() => {
    if (!result?.score || !result?.config?.starScoreRequirements) return 0;
    const reqs = result.config.starScoreRequirements;
    if (result.score >= reqs[3]) return 3;
    if (result.score >= reqs[2]) return 2;
    if (result.score >= reqs[1]) return 1;
    return 0;
  }, [result]);

  if (!result) {
    navigate("/configure");
    return null;
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-4 space-y-4 w-screen justify-center items-center flex flex-col">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">Level Complete!</CardTitle>
          <div className="flex justify-center gap-1">
            {[1, 2, 3].map((starIndex) => (
              <div
                key={starIndex}
                className={`transition-all duration-300 ${
                  starIndex <= stars ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                {starIndex <= stars ? (
                  <Star className="w-8 h-8 fill-current" />
                ) : (
                  <StarOff className="w-8 h-8" />
                )}
              </div>
            ))}
          </div>
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
              <Book className="w-5 h-5" />
              <span>Words Found</span>
            </div>
            <span className="font-bold">{result.foundWords.length} / {result.totalWords}</span>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Found Words</h3>
            <div className="flex flex-wrap gap-2">
              {result.foundWords.map((word: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {word}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/configure")}
          >
            New Level
          </Button>
          <Button
            className="flex-1"
            onClick={() =>
              navigate(
                `/game?config=${JSON.stringify(result.config)}`
              )
            }
          >
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
