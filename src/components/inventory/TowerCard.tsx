import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Tower } from "@/types/game.ts";
import * as Icons from "lucide-react";
import { IPlayerTower } from "@/store/gameStore.ts";
import { Lock } from "lucide-react";

interface TowerCardProps {
  tower: Tower;
  playerTower: IPlayerTower | undefined;
}

const defaultPlayerTower: IPlayerTower = {
  towerId: "",
  usages: 0,
  isUnlocked: false,
};

export default function TowerCard({
  tower,
  playerTower = defaultPlayerTower,
}: TowerCardProps) {
  const Icon = Icons[tower.icon as keyof typeof Icons];
  // const level = getLevelBasedOnUsage(tower, playerTower);
  return (
    <Card
      className={`relative group transition-all duration-300 transform hover:-translate-y-1 
      ${playerTower.isUnlocked ? "cursor-pointer hover:shadow-lg" : "opacity-75 cursor-not-allowed"}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {/*@ts-expect-error ts is not recognizing dynamic icons*/}
            <Icon className="w-6 h-6" />
            {tower.name}
          </CardTitle>
          {/*<Badge>*/}
          {/*  Level {level} / {tower.maxLevel}*/}
          {/*</Badge>*/}
        </div>
        <CardDescription>{tower.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!playerTower.isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm rounded-lg">
            <Lock className="w-12 h-12 text-gray-500" />
          </div>
        )}
        <div className="space-y-2 text-sm">
          <p>Cooldown: {tower.cooldown / 1000}s</p>
          <div className="flex flex-col ">
            <p>Activation Words</p>
            <div className="">
              {tower.activationWords.map((word) => (
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
        </div>
      </CardContent>
    </Card>
  );
}
