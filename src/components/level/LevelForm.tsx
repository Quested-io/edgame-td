import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Level } from '@/types/game';
import { useLevelForm } from '@/hooks/useLevelForm';

interface LevelFormProps {
  onSubmit: (level: Level) => void;
  onPreview: (level: Partial<Level>) => void;
}

export default function LevelForm({ onSubmit, onPreview }: LevelFormProps) {
  const { level, setLevel, isValid } = useLevelForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(level as Level);
    }
  };

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

      <div className="space-y-2">
        <Label htmlFor="words">Words (comma-separated)</Label>
        <Textarea
          id="words"
          value={level.words?.join(', ')}
          onChange={(e) => setLevel({ ...level, words: e.target.value.split(',').map(w => w.trim()) })}
          placeholder="Enter words separated by commas"
        />
      </div>

      <div className="space-y-2">
        <Label>Speed ({level.speed}x)</Label>
        <Slider
          value={[level.speed || 1]}
          min={0.5}
          max={3}
          step={0.1}
          onValueChange={([value]) => setLevel({ ...level, speed: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Lives</Label>
        <Slider
          value={[level.lives || 3]}
          min={1}
          max={10}
          step={1}
          onValueChange={([value]) => setLevel({ ...level, lives: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Words Per Wave</Label>
        <Slider
          value={[level.wordsPerWave || 3]}
          min={1}
          max={10}
          step={1}
          onValueChange={([value]) => setLevel({ ...level, wordsPerWave: value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Total Waves</Label>
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
          onClick={() => onPreview(level)}
        >
          Preview Level
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={!isValid}
        >
          Create Level
        </Button>
      </div>
    </form>
  );
}