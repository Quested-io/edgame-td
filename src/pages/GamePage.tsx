import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import GameBoard from "@/components/game/GameBoard.tsx";
import PreWaveOverlay from "@/components/game/PreWaveOverlay.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Heart } from "lucide-react";
import { useGameLogic } from "@/hooks/useGameLogic.ts";
import useGameStore from "@/store/gameStore.ts";
import { ACTIVITY_ID } from "@/data/constants.ts";

export default function GamePage() {
  const [searchParams] = useSearchParams();
  const config = searchParams.get("config");
  const level = config ? JSON.parse(config) : null;
  const navigate = useNavigate();
  const { inventory } = useGameStore();

  const equippedTowers = useMemo(
    () => inventory?.towers?.filter((t) => t.isUnlocked),
    [inventory]
  );

  const { gameState, waveState, input, handleInput, startWave } = useGameLogic({
    level,
    equippedTowers,
    onGameOver: (result) => {
      navigate("/result", {
        state: {
          [`${ACTIVITY_ID}:config`]: level,
          ...result,
        },
      });
    },
  });

  if (!level) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        No config found
        <div className="flex flex-row">
          <Button> Back to levels </Button>
          <Button variant="secondary"> Create new level </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-4 space-y-4 w-screen">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="text-red-500" />
          <span>{gameState.lives}</span>
        </div>
        <div>
          Wave {waveState.currentWave}/{level.totalWaves}
        </div>
        <div>Score: {gameState.score}</div>
      </div>

      <div className="space-y-4">
        <GameBoard gameState={gameState} lanes={level.lanes} />

        <div className="space-y-4">
          <Input
            value={input}
            onChange={handleInput}
            placeholder="Type the words..."
            className="w-full"
            disabled={gameState.status !== "playing"}
          />
        </div>
      </div>

      {waveState.isPreWave && (
        <PreWaveOverlay
          wave={waveState.currentWave}
          totalWaves={level.totalWaves}
          towers={gameState.activeTowers}
          activationWords={waveState.activationWords}
          timeRemaining={waveState.preWaveTimer}
          isFirstWave={waveState.isFirstWave}
          onStart={startWave}
        />
      )}
    </div>
  );
}
