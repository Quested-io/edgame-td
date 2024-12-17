import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Pause, Play } from 'lucide-react';
import { Level, GameState } from '@/types/game';
import { useGameLogic } from '@/hooks/useGameLogic';

interface GamePreviewProps {
  level: Partial<Level>;
  onClose: () => void;
}

export default function GamePreview({ level, onClose }: GamePreviewProps) {
  const {
    gameState,
    input,
    handleInput,
    togglePause,
  } = useGameLogic({
    level: level as Level,
    onGameOver: () => {},
  });

  if (!level.words?.length) {
    return (
      <div className="text-center p-4">
        Please add some words to preview the level
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="text-red-500" />
          <span>{gameState.lives}</span>
        </div>
        <div>Wave {gameState.currentWave}/{level.totalWaves}</div>
        <div>Score: {gameState.score}</div>
        <Button onClick={togglePause} variant="ghost" size="icon">
          {gameState.status === 'playing' ? <Pause /> : <Play />}
        </Button>
      </div>

      <div className="relative h-[40vh] border rounded-lg overflow-hidden bg-background">
        {gameState.activeWords.map((word) => (
          <div
            key={word.id}
            className="absolute px-2 py-1 bg-primary text-primary-foreground rounded"
            style={{
              left: `${word.position}%`,
              top: `${(word.lane * 33) + 15}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {word.word}
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        <Input
          value={input}
          onChange={handleInput}
          placeholder="Type the words..."
          className="w-full"
          disabled={gameState.status !== 'playing'}
        />
        <Button onClick={onClose} variant="outline" className="w-full">
          Close Preview
        </Button>
      </div>
    </div>
  );
}