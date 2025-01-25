import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card.tsx";
import {
  Trophy,
  Timer,
  Target,
  ArrowLeft,
  RotateCcw,
  Lock,
  Star,
  StarOff,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { instance } from "@quested/sdk";
import useGameStore from "@/store/gameStore.ts";
import { allTowers } from "@/data/allTowers.ts";
import * as Icons from "lucide-react";
import { ACTIVITY_ID } from "@/data/constants.ts";
import {getStarBasedOnScore} from "@/lib/gameUtils.ts";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = useMemo(() => {
    return location.state;
  }, [location.state]);
  const { unlockTower, saveLevelResult } = useGameStore();
  // TODO: Handle abilities of towers
  // TODO: Finish infinite mode
  // TODO: Finish Custom mode and preview

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!instance.isInitialized || !result) return;
    instance.api.player.trackEvent("event:activityEnded", result);
  }, [result]);

  useEffect(() => {
    if (result[`${ACTIVITY_ID}:config`].unlocks && result.status === "won") {
      unlockTower(result[`${ACTIVITY_ID}:config`].unlocks);
    }
  }, [result, unlockTower]);

  useEffect(() => {
    console.log("Result: ", result);
    if (result.status === "won" && result[`${ACTIVITY_ID}:config`].id) {
      saveLevelResult(result[`${ACTIVITY_ID}:config`].id, result.score);
    }
  }, [result, saveLevelResult]);

  const unlockedTower = useMemo(() => {
    if (result[`${ACTIVITY_ID}:config`].unlocks) {
      return allTowers.find(
        (t) => t.id === result[`${ACTIVITY_ID}:config`].unlocks
      );
    }
    return null;
  }, [result]);

  const UnlockedTowerIcon = useMemo(() => {
    if (!unlockedTower) return null;
    return Icons[unlockedTower?.icon as keyof typeof Icons];
  }, [unlockedTower]);

  const stars = getStarBasedOnScore(result.score, result[`${ACTIVITY_ID}:config`]);

  if (!result) {
    navigate("/levels");
    return null;
  }

  return (
    <div className="container mx-auto p-4 space-y-4 w-screen justify-center items-center flex flex-col">
      <Card className="w-fit">
        <CardHeader>
          <CardTitle className="text-center">Level {result.status}</CardTitle>
          {result.status === "won" && (
            <div className="flex justify-center gap-1">
              {[1, 2, 3].map((starIndex) => (
                <div
                  key={starIndex}
                  className={`transition-all duration-300 ${
                    starIndex <= stars ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  {starIndex <= stars ? (
                    <Star className="w-6 h-6 fill-current" />
                  ) : (
                    <StarOff className="w-6 h-6" />
                  )}
                </div>
              ))}
            </div>
          )}
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
            onClick={() => navigate("/levels")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Levels
          </Button>
          <Button
            className="flex-1"
            onClick={() =>
              navigate(
                `/game?config=${JSON.stringify(result[`${ACTIVITY_ID}:config`])}`
              )
            }
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </CardFooter>
      </Card>

      {result[`${ACTIVITY_ID}:config`].unlocks && unlockedTower && result.status === "won" && (
        <Card className="w-fit">
          <CardHeader>
            <CardTitle className="text-center flex items-center gap-2 justify-center">
              <Lock className="w-5 h-5" />
              New Tower Unlocked!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted rounded flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded flex items-center justify-center">
                {/*@ts-expect-error ts is not recognizing dynamic icons*/}
                <UnlockedTowerIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold capitalize">{unlockedTower?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {unlockedTower?.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
