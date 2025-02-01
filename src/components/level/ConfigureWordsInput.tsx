import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Level } from "@/types/game.ts";

interface WordsInputProps {
  level: Partial<Level>;
  setLevel: React.Dispatch<React.SetStateAction<Partial<Level>>>;
}

export function ConfigureWordsInput({ level, setLevel }: WordsInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="words">Words (comma-separated)</Label>
      <Textarea
        id="words"
        value={level.words?.join(", ")}
        onChange={(e) => setLevel({ ...level, words: [e.target.value] })}
        onBlur={(e) =>
          setLevel({
            ...level,
            words: e.target.value.replace(/\n/g, ',').split(',').map((w) => w.trim()).filter(Boolean),
          })
        }
        placeholder="Enter words separated by commas"
      />
    </div>
  );
}