import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell.tsx';
import { LandingPage } from './pages/LandingPage.tsx';
import { ObjectivesPage } from './pages/ObjectivesPage.tsx';
import { ScenarioPage } from './pages/ScenarioPage.tsx';
import { DayTransitionPage } from './pages/DayTransitionPage.tsx';
import { ResultsPage } from './pages/ResultsPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { DaySelectPage } from './pages/DaySelectPage.tsx';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/objectives" element={<ObjectivesPage />} />
        <Route path="/scenario/:dayId" element={<ScenarioPage />} />
        <Route path="/transition/:dayId" element={<DayTransitionPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/days" element={<DaySelectPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </AppShell>
  );
}

export default App;
