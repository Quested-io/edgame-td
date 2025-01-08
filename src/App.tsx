import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import ConfigurePage from "@/pages/ConfigurePage.tsx";
import ModsPage from "@/pages/ModsPage/ModsPage.tsx";
import GamePage from "@/pages/GamePage.tsx";
import ResultPage from "@/pages/ResultPage.tsx";
import { init } from "@quested/sdk";
import { useEffect } from "react";
import useGameStore from "./store/gameStore.ts";
import { ACTIVITY_ID } from "@/data/constants.ts";

function App() {
  const { initPlayer } = useGameStore();

  useEffect(() => {
    init({
      activityId: ACTIVITY_ID,
      onReady: () => {
        initPlayer();
      },
    });
  }, [initPlayer]);

  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route path="/configure" element={<ConfigurePage />} />
          <Route path="/levels" element={<ModsPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<Navigate to="/levels" />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
}

export default App;
