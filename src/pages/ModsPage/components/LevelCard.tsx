import { Level } from "@/types/game.ts";
import { useNavigate } from "react-router-dom";
import { Star, StarOff, Lock, Gift } from "lucide-react";
import { IPlayerLevel } from "@/store/gameStore.ts";
import { getStarBasedOnScore } from "@/lib/gameUtils.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { allTowers } from "@/data/allTowers.ts";

export interface LevelCardProps {
  level: Level;
  playerLevel: IPlayerLevel | undefined;
  isLocked?: boolean;
}

const defaultPlayerLevel: IPlayerLevel = {
  levelId: "",
  maxScore: 0,
};

export const LevelCard = ({
  level,
  isLocked = false,
  playerLevel = defaultPlayerLevel,
}: LevelCardProps) => {
  const navigate = useNavigate();
  const stars = getStarBasedOnScore(playerLevel.maxScore, level);
  const unlockableTower = level.unlocks
    ? allTowers.find((t) => t.id === level.unlocks)
    : null;

  const handleClick = () => {
    if (!isLocked) {
      navigate(`/game?config=${JSON.stringify(level)}`);
    }
  };

  return (
    <Card
      className={`relative group transition-all duration-300 transform hover:-translate-y-1 
        ${isLocked ? "opacity-75 cursor-not-allowed" : "cursor-pointer hover:shadow-lg"}`}
      onClick={handleClick}
    >
      <CardContent className="p-6 h-full">
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm rounded-lg">
            <Lock className="w-12 h-12 text-gray-500" />
          </div>
        )}

        <div className="flex flex-col justify-between gap-4 h-full">
          <div className="space-y-2 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {level.id}: {level.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {level.description}
            </p>
            <div className="">
              {level.words.map((word) => (
                <Badge
                  variant={"secondary"}
                  key={word}
                  className="px-2 py-1 m-1 ml-0 rounded-md"
                >
                  {word}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-2">
            {unlockableTower && (
              <div className="flex items-center gap-2 text-sm">
                <Gift className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium capitalize">
                  {unlockableTower.name}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelCard;
