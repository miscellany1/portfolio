import { useEffect } from 'react';
import { useGameStore } from '../stores/gameStore.ts';

export const useAutoSave = () => {
  const gameStarted = useGameStore((s) => s.gameStarted);
  const currentDay = useGameStore((s) => s.currentDay);
  const currentStepIndex = useGameStore((s) => s.currentStepIndex);
  const securityScore = useGameStore((s) => s.securityScore);

  useEffect(() => {
    // Zustand persist middleware handles auto-save automatically.
    // This hook exists as a logical place for any additional
    // save-related side effects (e.g., analytics, save indicators).
    if (gameStarted) {
      // State is persisted to localStorage by Zustand's persist middleware
    }
  }, [gameStarted, currentDay, currentStepIndex, securityScore]);
};
