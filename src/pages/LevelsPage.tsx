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
import { Timer, Plus, Infinity } from "lucide-react";
import { predefinedLevels } from "@/data/levels";
import { Badge } from "@/components/ui/badge";

export default function LevelsPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Word Building Game</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/infinite")} variant="outline">
            <Infinity className="w-4 h-4 mr-2" />
            Infinite Mode
          </Button>
          <Button onClick={() => navigate("/configure")}>
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Level
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {predefinedLevels.map((level) => (
          <Card key={level.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{level.name}</CardTitle>
              <CardDescription>{level.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  <span>{level.timeLimit} seconds</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Example words:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {level.words.slice(0, 3).map((word) => (
                      <Badge key={word} variant="secondary">
                        {word}
                      </Badge>
                    ))}
                    {level.words.length > 3 && (
                      <Badge variant="secondary">
                        +{level.words.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Star Requirements:
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>⭐ {level.starScoreRequirements[1]}</div>
                    <div>⭐⭐ {level.starScoreRequirements[2]}</div>
                    <div>⭐⭐⭐ {level.starScoreRequirements[3]}</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => navigate(`/game?config=${JSON.stringify(level)}`)}
              >
                Play Level
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
