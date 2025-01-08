import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Infinity,
  Earth,
  Settings,
  Package,
  ShieldCheck,
  ChevronLeft,
  Lock,
} from "lucide-react";
import TowerInventory from "@/components/inventory/TowerInventory.tsx";
import { LevelCard } from "@/pages/ModsPage/components/LevelCard.tsx";
import useGameStore from "@/store/gameStore.ts";
import { allLevels } from "@/data/allLevels.ts";

export default function ModsPage() {
  const [searchParams] = useSearchParams();
  const config = searchParams.get("config");
  const navigate = useNavigate();
  const [showInventory, setShowInventory] = useState(false);
  const [isStoryMode, setIsStoryMode] = useState(false);
  const { player, inventory } = useGameStore();

  const switchStoryMode = () => {
    setIsStoryMode(!isStoryMode);
  };

  useEffect(() => {
    console.log("CONFIG", config);
    if (config) {
      navigate("/game?config=" + config);
    }
  }, [config, navigate]);

  return (
    <div className="container mx-auto p-4 w-screen justify-center items-center flex">
      <div className="flex flex-col gap-6">
        {/* Player Info Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 flex flex-row gap-4">
            <div className="flex items-center gap-2 flex-col">
              <div className="flex items-center gap-2">
                <img
                  src={player?.avatarUrl || "/default-avatar.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col gap-1">
                  {player?.publicName || "Unknown Player"}
                  {player && (
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-xs text-gray-500">
                        Authorized with Quested
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setShowInventory(true)}
              >
                <Package className="w-4 h-4 mr-2" />
                View Inventory
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {!isStoryMode && (
          <div className="lg:col-span-3">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Earth className="w-5 h-5" />
                    Story Mode
                  </CardTitle>
                  <CardDescription>
                    Embark on a life of first alien language translator.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Play through a series of levels with increasing difficulty.
                    Learn new words, improve your typing speed, and save the
                    planet from alien invasion.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={switchStoryMode}
                  >
                    Start Story Mode
                  </Button>
                </CardFooter>
              </Card>

              <Card className="relative group transition-all duration-300 transform hover:-translate-y-1 opacity-75 cursor-not-allowed">
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm rounded-lg">
                  <Lock className="w-12 h-12 text-gray-500" />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Infinity className="w-5 h-5" />
                    Infinite Mode
                  </CardTitle>
                  <CardDescription>
                    Challenge yourself with endless waves
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Test your typing skills with an infinite mode. The
                    difficulty increases with each wave. Compete with Friends
                    for the highest score. Win Rewards!
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/configure")}
                  >
                    Play Infinite Mode
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Create Custom Level
                  </CardTitle>
                  <CardDescription>Design your own challenge</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Create a custom level with your own words, speed, and
                    difficulty settings.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/configure")}
                  >
                    Configure New Level
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {/* Level List */}
        {isStoryMode && (
          <div className="lg:col-span-3">
            <Button
              className="mb-5"
              variant="outline"
              onClick={switchStoryMode}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Main Menu
            </Button>
            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
              {allLevels.map((level) => {
                const prevPlayerLevel = inventory?.levels?.find(
                  (l) => parseInt(l.levelId) === parseInt(level.id) - 1
                );
                return (
                  <LevelCard
                    key={level.id}
                    level={level}
                    playerLevel={inventory?.levels?.find(
                      (l) => l.levelId === level.id
                    )}
                    isLocked={
                      level.id !== "1" &&
                      (!prevPlayerLevel || prevPlayerLevel?.maxScore <= 0)
                    }
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      <TowerInventory
        isOpen={showInventory}
        onClose={() => setShowInventory(false)}
      />
    </div>
  );
}
