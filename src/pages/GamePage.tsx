import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGameLogic } from "@/hooks/useGameLogic";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

export default function GamePage() {
  const [searchParams] = useSearchParams();
  const config = searchParams.get("config");
  const level = config ? JSON.parse(config) : null;
  const navigate = useNavigate();

  const { gameState, input, handleInput, remainingWords } = useGameLogic({
    level,
    onGameOver: (result) => {
      navigate("/result", {
        state: {
          ...result,
          config: level
        }
      });
    },
  });

  if (!level) {
    return (
      <div className="container mx-auto p-4 space-y-4">
        <p>No config found</p>
        <Button onClick={() => navigate("/levels")}>Back to Levels</Button>
      </div>
    );
  }

  return (
    <div className="container p-4 space-y-4 max-w-2xl mx-auto">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">{level.name}</div>
          <Button variant="outline" onClick={() => navigate("/levels")}>
            Exit Level
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div>Score: {gameState.score}</div>
          <div>Time: {gameState.timeRemaining}s</div>
          <div>Words Left: {remainingWords.length}</div>
        </div>

        <Progress
          value={(gameState.timeRemaining / level.timeLimit) * 100}
          className="h-2 mt-2"
        />
      </Card>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg justify-center">
          {Array.from(gameState.letterCounts.entries()).map(([letter, count], index) => (
            <div key={index} className="relative">
              <Badge
                variant="secondary"
                className="text-lg px-4 py-2"
              >
                {letter.toUpperCase()}
                <span className="absolute -bottom-1 -right-1 text-xs bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              </Badge>
            </div>
          ))}
        </div>

        <Input
          value={input}
          onChange={handleInput}
          placeholder="Type your word..."
          className="text-center text-xl py-6"
          disabled={gameState.status !== "playing"}
          autoFocus
        />

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2">
              Found Words ({gameState.foundWords.length} / {level.words.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {gameState.foundWords.map((word, index) => (
                <Badge key={index} variant="default">
                  {word}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">
              Words to Find
            </h3>
            <div className="flex flex-wrap gap-2">
              {remainingWords.map((word, index) => (
                <div key={index} className="flex gap-1">
                  {word.split('').map((_, letterIndex) => (
                    <Badge
                      key={letterIndex}
                      variant="outline"
                      className="w-6 h-6 flex items-center justify-center"
                    >
                      ?
                    </Badge>
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
