import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../../stores/gameStore.ts';
import { DAY_LABELS } from '../../game/progression.ts';

export const TopBar = () => {
  const navigate = useNavigate();
  const gameStarted = useGameStore((s) => s.gameStarted);
  const currentDay = useGameStore((s) => s.currentDay);

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="font-mono text-sm font-bold tracking-wider text-accent hover:text-accent-hover transition-colors cursor-pointer"
          >
            CYBERWISE
          </button>
          {gameStarted && (
            <span className="rounded-full bg-surface-overlay px-3 py-0.5 text-xs font-medium text-text-primary">
              {DAY_LABELS[currentDay]} at NovaTech
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary">Security Awareness Training</span>
        </div>
      </div>
    </header>
  );
};
