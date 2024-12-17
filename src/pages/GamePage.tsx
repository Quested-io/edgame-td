import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { defaultLevels } from "@/data/defaultLevels";
import { towers } from "@/data/towers";
import { PlayerTower } from "@/types/game";
import GameBoard from "@/components/game/GameBoard";
import TowerInventory from "@/components/inventory/TowerInventory";
import PreWaveOverlay from "@/components/game/PreWaveOverlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Pause, Play } from "lucide-react";
import { useGameLogic } from "@/hooks/useGameLogic";

export default function GamePage() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const level = defaultLevels.find((l) => l.id === levelId);
  const [showPreGameInventory, setShowPreGameInventory] = useState(true);
  const [playerTowers, setPlayerTowers] = useState<PlayerTower[]>(
    towers.map((t) => ({
      ...t,
      isUnlocked: true,
      isEquipped: false,
      lastUsed: null,
    }))
  );

  if (!level) {
    navigate("/levels");
    return null;
  }

  const equippedTowers = useMemo(
    () => playerTowers.filter((t) => t.isEquipped),
    [playerTowers]
  );

  const { gameState, waveState, input, handleInput, togglePause, startGame } =
    useGameLogic({
      level,
      equippedTowers,
      onGameOver: (result) => {
        navigate("/result", {
          state: {
            levelId: level.id,
            score: result.score,
            timeTaken: result.timeTaken,
            status: "defeat",
          },
        });
      },
    });

  const handleEquipTower = (towerId: string) => {
    console.log("Equipping tower", towerId);
    setPlayerTowers((prev) => [
      ...prev.map((t) => ({
        ...t,
        isEquipped: t.id === towerId ? !t.isEquipped : t.isEquipped,
      })),
    ]);
  };

  if (showPreGameInventory) {
    return (
      <TowerInventory
        isOpen={true}
        onClose={() => {
          if (equippedTowers.length > 0) {
            setShowPreGameInventory(false);
            startGame();
          }
        }}
        towers={playerTowers}
        onEquipTower={handleEquipTower}
        isPreGame={true}
      />
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="text-red-500" />
          <span>{gameState.lives}</span>
        </div>
        <div>
          Wave {gameState.currentWave}/{level.totalWaves}
        </div>
        <div>Score: {gameState.score}</div>
        <Button onClick={togglePause} variant="ghost" size="icon">
          {gameState.status === "playing" ? <Pause /> : <Play />}
        </Button>
      </div>

      <GameBoard gameState={gameState} />

      <div className="space-y-4">
        <Input
          value={input}
          onChange={handleInput}
          placeholder="Type the words..."
          className="w-full"
          disabled={gameState.status !== "playing"}
        />
      </div>

      {waveState.isPreWave && (
        <PreWaveOverlay
          wave={waveState.currentWave}
          totalWaves={level.totalWaves}
          towers={gameState.activeTowers}
          activationWords={waveState.activationWords}
          timeRemaining={waveState.preWaveTimer}
        />
      )}
    </div>
  );
}
