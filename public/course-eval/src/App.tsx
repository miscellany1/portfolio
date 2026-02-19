import { HashRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { LandingPage } from "./pages/LandingPage";
import { EvaluatePage } from "./pages/EvaluatePage";
import { ResultsPage } from "./pages/ResultsPage";

function App() {
  return (
    <HashRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/evaluate" element={<EvaluatePage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </AppShell>
    </HashRouter>
  );
}

export default App;
