import { useMemo, useCallback } from 'react';
import { useGameStore } from '../stores/gameStore.ts';
import { mondayScenario } from '../data/scenarios/monday.ts';
import { tuesdayScenario } from '../data/scenarios/tuesday.ts';
import { wednesdayScenario } from '../data/scenarios/wednesday.ts';
import { thursdayScenario } from '../data/scenarios/thursday.ts';
import { fridayScenario } from '../data/scenarios/friday.ts';
import type { Scenario, ScenarioStep, Choice, DayId } from '../data/scenarios/types.ts';
import { getCurrentStep, getTotalSteps, getNextDay, isLastDay } from '../game/progression.ts';
import { evaluateAchievements } from '../game/achievements.ts';

const scenarioMap: Record<DayId, Scenario> = {
  monday: mondayScenario,
  tuesday: tuesdayScenario,
  wednesday: wednesdayScenario,
  thursday: thursdayScenario,
  friday: fridayScenario,
};

export const getScenario = (dayId: DayId): Scenario => scenarioMap[dayId];

export const useScenarioEngine = () => {
  const store = useGameStore();

  const scenario = useMemo(() => scenarioMap[store.currentDay], [store.currentDay]);

  const currentStep: ScenarioStep | null = useMemo(
    () => getCurrentStep(scenario, store.currentStepIndex, store.currentBranch),
    [scenario, store.currentStepIndex, store.currentBranch]
  );

  const totalSteps = useMemo(
    () => getTotalSteps(scenario, store.currentBranch),
    [scenario, store.currentBranch]
  );

  const availableChoices = useMemo(() => {
    if (!currentStep) return [];
    // Show all choices (don't filter out trust-locked ones)
    // Deterministic shuffle seeded by step id so order is stable per step
    // but different across steps, preventing "optimal is always A" pattern
    const seed = currentStep.id;
    const shuffled = [...currentStep.choices];
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
    }
    for (let i = shuffled.length - 1; i > 0; i--) {
      hash = ((hash << 5) - hash + i) | 0;
      const j = ((hash >>> 0) % (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [currentStep]);

  const lockedChoiceIds = useMemo(() => {
    if (!currentStep) return new Set<string>();
    return new Set(
      currentStep.choices
        .filter((c) => c.requiresTrustLevel && store.trustLevel < c.requiresTrustLevel)
        .map((c) => c.id)
    );
  }, [currentStep, store.trustLevel]);

  const selectedChoice: Choice | null = useMemo(() => {
    if (!store.lastChoiceId || !currentStep) return null;
    return currentStep.choices.find((c) => c.id === store.lastChoiceId) ?? null;
  }, [store.lastChoiceId, currentStep]);

  // The step is truly "last" only if we're at the end of the current
  // path AND the selected choice doesn't branch to a new path.
  const isOnLastStepOfPath = store.currentStepIndex >= totalSteps - 1;
  const willBranch = store.pendingBranch !== null;
  const isLastStep = isOnLastStepOfPath && !willBranch;

  const canGoBack = store.currentStepIndex > 0 || store.showingFeedback;

  const handleGoBack = useCallback(() => {
    store.goBackStep();
  }, [store]);

  const handleChoice = useCallback(
    (choice: Choice) => {
      if (!currentStep) return;
      store.makeChoice(
        store.currentDay,
        currentStep.id,
        choice.id,
        choice.quality,
        choice.securityScoreChange,
        choice.trustChange,
        choice.nextBranch,
        choice.achievementTrigger
      );
    },
    [store, currentStep]
  );

  const handleContinue = useCallback(() => {
    if (isLastStep) {
      // Check for computed achievements before completing day
      const isGameEnd = isLastDay(store.currentDay);
      const newAchievements = evaluateAchievements(
        store.choiceHistory,
        store.securityScore,
        store.trustLevel,
        store.unlockedAchievements,
        isGameEnd
      );
      for (const id of newAchievements) {
        store.unlockAchievement(id);
      }
      store.completeDay();
    } else {
      // advanceStep handles both normal progression and branch entry
      store.advanceStep();
    }
  }, [isLastStep, store]);

  const handleNextDay = useCallback(() => {
    if (isLastDay(store.currentDay)) {
      store.completeGame();
    } else {
      const next = getNextDay(store.currentDay);
      if (next) store.advanceToNextDay(next);
    }
  }, [store]);

  return {
    scenario,
    currentStep,
    totalSteps,
    availableChoices,
    lockedChoiceIds,
    selectedChoice,
    isLastStep,
    canGoBack,
    isDayComplete: store.completedDays.includes(store.currentDay),
    isGameComplete: store.gameCompleted,
    handleChoice,
    handleContinue,
    handleNextDay,
    handleGoBack,
  };
};
