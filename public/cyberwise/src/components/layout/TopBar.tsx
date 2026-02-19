import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../stores/gameStore.ts';
import { DAY_LABELS } from '../../game/progression.ts';

export const TopBar = () => {
  const navigate = useNavigate();
  const gameStarted = useGameStore((s) => s.gameStarted);
  const currentDay = useGameStore((s) => s.currentDay);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="font-mono text-sm font-bold tracking-wider text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            CYBERWISE
          </button>
          {gameStarted && (
            <span className="rounded-full bg-slate-800 px-3 py-0.5 text-xs font-medium text-slate-200">
              {DAY_LABELS[currentDay]} at NovaTech
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300">Security Awareness Training</span>
        </div>
      </div>
    </header>
  );
};
