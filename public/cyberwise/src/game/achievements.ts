import type { ChoiceRecord, DayId } from '../data/scenarios/types.ts';

/**
 * Evaluate computed achievements based on game state.
 * Called at end of each day and end of game.
 * @param isGameEnd - true when called after the final day (Friday)
 */
export const evaluateAchievements = (
  choiceHistory: ChoiceRecord[],
  securityScore: number,
  trustLevel: number,
  currentUnlocked: string[],
  isGameEnd = false
): string[] => {
  const newAchievements: string[] = [];

  const shouldUnlock = (id: string) =>
    !currentUnlocked.includes(id) && !newAchievements.includes(id);

  // Trust Builder: trust level >= 80 (can trigger any time)
  if (trustLevel >= 80 && shouldUnlock('trust_builder')) {
    newAchievements.push('trust_builder');
  }

  // Quick Learner: optimal choice immediately after a poor/dangerous one
  if (shouldUnlock('quick_learner') && choiceHistory.length >= 2) {
    for (let i = 1; i < choiceHistory.length; i++) {
      const prev = choiceHistory[i - 1];
      const curr = choiceHistory[i];
      if (
        (prev.quality === 'poor' || prev.quality === 'dangerous') &&
        curr.quality === 'optimal'
      ) {
        newAchievements.push('quick_learner');
        break;
      }
    }
  }

  // Perfect Day: ALL choices in a completed day were optimal
  // Group by day — only consider days with 4+ choices (a full day)
  if (shouldUnlock('perfect_day')) {
    const dayChoices = new Map<DayId, ChoiceRecord[]>();
    for (const choice of choiceHistory) {
      const existing = dayChoices.get(choice.dayId) ?? [];
      existing.push(choice);
      dayChoices.set(choice.dayId, existing);
    }
    for (const [, choices] of dayChoices) {
      // A full day has at least 4 main-path choices; require all to be optimal
      if (choices.length >= 4 && choices.every((c) => c.quality === 'optimal')) {
        newAchievements.push('perfect_day');
        break;
      }
    }
  }

  // ── Game-end only achievements ──
  if (isGameEnd) {
    // Security Champion: final score >= 80
    if (securityScore >= 80 && shouldUnlock('security_champion')) {
      newAchievements.push('security_champion');
    }

    // Zero Incidents: completed the entire game without any dangerous choices
    if (
      shouldUnlock('zero_incidents') &&
      choiceHistory.length > 0 &&
      !choiceHistory.some((c) => c.quality === 'dangerous')
    ) {
      newAchievements.push('zero_incidents');
    }
  }

  return newAchievements;
};

export const checkTriggerAchievement = (
  triggerId: string | undefined,
  currentUnlocked: string[]
): string | null => {
  if (!triggerId) return null;
  if (currentUnlocked.includes(triggerId)) return null;
  return triggerId;
};
