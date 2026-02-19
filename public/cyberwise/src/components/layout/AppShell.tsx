import type { ReactNode } from 'react';
import { TopBar } from './TopBar.tsx';
import { ProgressBar } from './ProgressBar.tsx';
import { AchievementPopup } from '../hud/AchievementPopup.tsx';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => (
  <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
    <TopBar />
    <ProgressBar />
    <main className="flex-1">
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </main>
    <AchievementPopup />
  </div>
);
