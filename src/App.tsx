import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ConfigurePage from "@/pages/ConfigurePage";
import GamePage from "@/pages/GamePage";
import ResultPage from "@/pages/ResultPage";
import LevelsPage from "@/pages/LevelsPage";
import InfiniteModePage from "@/pages/InfiniteModePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/configure" element={<ConfigurePage />} />
        <Route path="/levels" element={<LevelsPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/infinite" element={<InfiniteModePage />} />
        <Route path="*" element={<Navigate to="/levels" />} />
      </Routes>
    </Router>
  );
}

export default App;
