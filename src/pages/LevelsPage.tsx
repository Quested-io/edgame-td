import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { defaultLevels } from "@/data/defaultLevels";
import { towers } from "@/data/towers";
import { Settings, Sword, Package } from "lucide-react";
import TowerInventory from "@/components/inventory/TowerInventory";
import { PlayerTower } from "@/types/game";
import { instance } from "@quested/sdk";

export default function LevelsPage() {
  const navigate = useNavigate();
  const [showInventory, setShowInventory] = useState(false);
  const [playerTowers] = useState<PlayerTower[]>(
    towers.map((t) => ({
      ...t,
      isUnlocked: true, // For testing, in production this would come from player progress
      isEquipped: false,
      lastUsed: null,
    }))
  );
  const [activeProfile, setActiveProfile] = useState<any>(null);

  useEffect(() => {
    instance.api.player.me().then((profile) => {
      setActiveProfile(profile);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Choose Your Challenge</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowInventory(true)}
        >
          <Package className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {defaultLevels.map((level) => (
          <Card key={level.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sword className="w-5 h-5" />
                {level.name}
              </CardTitle>
              <CardDescription>{level.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>Speed: {level.speed}x</p>
                <p>Lives: {level.lives}</p>
                <p>Waves: {level.totalWaves}</p>
                <p>Words per wave: {level.wordsPerWave}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => navigate(`/game/${level.id}`)}
              >
                Play Level
              </Button>
            </CardFooter>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Create Custom Level
            </CardTitle>
            <CardDescription>Design your own typing challenge</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Create a custom level with your own words, speed, and difficulty
              settings.
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

      <TowerInventory
        isOpen={showInventory}
        onClose={() => setShowInventory(false)}
        towers={playerTowers}
        onEquipTower={() => {}}
      />
    </div>
  );
}
