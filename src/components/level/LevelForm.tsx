import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Level } from "@/types/game.ts";
import { useLevelForm } from "@/hooks/useLevelForm.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConfigureWordsInput } from '@/components/level/ConfigureWordsInput.tsx';

interface LevelFormProps {
  onSubmit: (level: Level) => void;
  onPreview: (level: Partial<Level>) => void;
  onChange?: (level: Level) => void;
}

export default function LevelForm({
  onSubmit,
  onPreview,
  onChange,
}: LevelFormProps) {
  const { level, setLevel, isValid } = useLevelForm();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(level as Level);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(level as Level);
    }
  }, [level, onChange]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Level Name</Label>
        <Input
          id="name"
          value={level.name}
          onChange={(e) => setLevel({ ...level, name: e.target.value })}
          placeholder="Enter level name"
        />
      </div>

      <ConfigureWordsInput level={level} setLevel={setLevel} />

      <div className="space-y-2">
        <Label>Speed ({level.speed}x)</Label>
        <Slider
          value={[level.speed || 1]}
          min={1}
          max={100}
          step={0.5}
          onValueChange={([value]) => setLevel({ ...level, speed: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Lives ({level.lives})</Label>
        <Slider
          value={[level.lives || 3]}
          min={1}
          max={10}
          step={1}
          onValueChange={([value]) => setLevel({ ...level, lives: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Board Size ({level.lanes})</Label>
        <Slider
          value={[level.lanes || 3]}
          min={1}
          max={10}
          step={1}
          onValueChange={([value]) => setLevel({ ...level, lanes: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Words Per Wave ({level.wordsPerWave})</Label>
        <Slider
          value={[level.wordsPerWave || 3]}
          min={1}
          max={10}
          step={1}
          onValueChange={([value]) =>
            setLevel({ ...level, wordsPerWave: value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Total Waves ({level.totalWaves})</Label>
        <Slider
          value={[level.totalWaves || 5]}
          min={1}
          max={20}
          step={1}
          onValueChange={([value]) => setLevel({ ...level, totalWaves: value })}
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => navigate("/levels")}
        >
          To All Levels
        </Button>
        <Button
          type="button"
          className="flex-1"
          disabled={!isValid}
          onClick={() => onPreview(level)}
        >
          Play Level
        </Button>
      </div>
      <div className="text-center">
        {isValid ? (
          <p className="text-green-500">Level is valid</p>
        ) : (
          <p className="text-red-500">Level is invalid</p>
        )}
      </div>
    </form>
  );
}
