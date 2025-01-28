import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Level } from "@/types/game";
import { Badge } from "@/components/ui/badge";

export default function ConfigurePage() {
  const navigate = useNavigate();
  const [level, setLevel] = useState<Partial<Level>>({
    name: "",
    words: [],
    timeLimit: 60,
    starScoreRequirements: {
      1: 500,
      2: 1000,
      3: 1500
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/game?config=${JSON.stringify(level)}`);
  };

  const handleWordsInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentWords = level.words || [];
      const newWord = e.currentTarget.value.trim().toLowerCase();

      if (newWord && !currentWords.includes(newWord)) {
        setLevel({
          ...level,
          words: [...currentWords, newWord]
        });
        e.currentTarget.value = '';
      }
    }
  };

  const removeWord = (wordToRemove: string) => {
    setLevel({
      ...level,
      words: (level.words || []).filter(word => word !== wordToRemove)
    });
  };

  const isValid = !!(
    level.name &&
    level.words?.length &&
    level.timeLimit &&
    level.starScoreRequirements
  );

  return (
    <div className="container mx-auto p-4 w-screen justify-center items-center flex flex-col">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create Word Building Level</CardTitle>
          <CardDescription>
            Configure your word building challenge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Level Name</Label>
              <Input
                id="name"
                value={level.name}
                onChange={(e) =>
                  setLevel({ ...level, name: e.target.value })
                }
                placeholder="Enter level name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="words">Words</Label>
              <Textarea
                id="words"
                placeholder="Type a word and press Enter"
                onKeyDown={handleWordsInput}
                rows={3}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {level.words?.map((word) => (
                  <Badge
                    key={word}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive"
                    onClick={() => removeWord(word)}
                  >
                    {word} ×
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Time Limit ({level.timeLimit}s)</Label>
              <Input
                type="number"
                min={30}
                max={300}
                value={level.timeLimit}
                onChange={(e) =>
                  setLevel({ ...level, timeLimit: Number(e.target.value) })
                }
              />
            </div>

            <div className="space-y-4">
              <Label>Star Requirements (Score)</Label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>⭐</Label>
                  <Input
                    type="number"
                    value={level.starScoreRequirements?.[1]}
                    onChange={(e) =>
                      setLevel({
                        ...level,
                        starScoreRequirements: {
                          ...level.starScoreRequirements,
                          1: Number(e.target.value)
                        }
                      })
                    }
                  />
                </div>
                <div>
                  <Label>⭐⭐</Label>
                  <Input
                    type="number"
                    value={level.starScoreRequirements?.[2]}
                    onChange={(e) =>
                      setLevel({
                        ...level,
                        starScoreRequirements: {
                          ...level.starScoreRequirements,
                          2: Number(e.target.value)
                        }
                      })
                    }
                  />
                </div>
                <div>
                  <Label>⭐⭐⭐</Label>
                  <Input
                    type="number"
                    value={level.starScoreRequirements?.[3]}
                    onChange={(e) =>
                      setLevel({
                        ...level,
                        starScoreRequirements: {
                          ...level.starScoreRequirements,
                          3: Number(e.target.value)
                        }
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/levels")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid} className="flex-1">
                Start Game
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
