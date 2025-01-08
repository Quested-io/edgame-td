import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card.tsx";
import { Level } from "@/types/game.ts";
import LevelForm from "@/components/level/LevelForm.tsx";
import { instance } from "@quested/sdk";

export default function ConfigurePage() {
  const navigate = useNavigate();

  const handleToLevels = () => {
    navigate("/levels");
  };

  const handleChange = (level: Level) => {
    console.log(level);
    instance?.api?.player?.trackEvent("quest:configChanged", level);
  };

  const handlePreview = (level: Partial<Level>) => {
    navigate(`/game?config=${JSON.stringify(level)}`);
  };

  return (
    <div className="container mx-auto p-4 w-screen justify-center items-center flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Create New Level</CardTitle>
          <CardDescription>
            Configure your custom typing challenge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LevelForm
            onChange={handleChange}
            onSubmit={handleToLevels}
            onPreview={handlePreview}
          />
        </CardContent>
      </Card>
    </div>
  );
}
