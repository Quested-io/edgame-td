import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import ConfigurePage from '@/pages/ConfigurePage';
import LevelsPage from '@/pages/LevelsPage';
import GamePage from '@/pages/GamePage';
import ResultPage from '@/pages/ResultPage';
import { create, init } from '@quested/sdk';
// import { create as createScrimmage } from '@scrimmage/js-sdk';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    init({
      activityId: 'tower-defence',
      onReady: () => console.log('Quested SDK is ready')
    })
  }, []);

  return (
    <TooltipProvider>
      <Router>
        <Routes>
          <Route path="/configure" element={<ConfigurePage />} />
          <Route path="/levels" element={<LevelsPage />} />
          <Route path="/game/:levelId" element={<GamePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<Navigate to="/levels" replace />} />
        </Routes>
      </Router>
    </TooltipProvider>
  );
}

export default App;