import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DayId, ChoiceRecord, ChoiceQuality } from '../data/scenarios/types.ts';
import { INITIAL_SECURITY_SCORE, INITIAL_TRUST_LEVEL, clampScore } from '../game/scoring.ts';

interface GameStore {
  // State
  currentDay: DayId;
  currentStepIndex: number;
  currentBranch: string | null;
  pendingBranch: string | null;
  securityScore: number;
  trustLevel: number;
  unlockedAchievements: string[];
  choiceHistory: ChoiceRecord[];
  completedDays: DayId[];
  gameStarted: boolean;
  gameCompleted: boolean;
  showingFeedback: boolean;
  lastChoiceId: string | null;
  pendingAchievement: string | null;
  trustWarningShown: boolean;
  pendingTrustWarning: boolean;

  // Actions
  startGame: () => void;
  makeChoice: (
    dayId: DayId,
    stepId: string,
    choiceId: string,
    quality: ChoiceQuality,
    scoreChange: number,
    trustChange: number,
    nextBranch?: string,
    achievementTrigger?: string
  ) => void;
  advanceStep: () => void;
  goBackStep: () => void;
  completeDay: () => void;
  advanceToNextDay: (nextDay: DayId) => void;
  completeGame: () => void;
  jumpToDay: (day: DayId) => void;
  resetGame: () => void;
  setShowingFeedback: (showing: boolean) => void;
  unlockAchievement: (id: string) => void;
  dismissAchievement: () => void;
  dismissTrustWarning: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      currentDay: 'monday',
      currentStepIndex: 0,
      currentBranch: null,
      pendingBranch: null,
      securityScore: INITIAL_SECURITY_SCORE,
      trustLevel: INITIAL_TRUST_LEVEL,
      unlockedAchievements: [],
      choiceHistory: [],
      completedDays: [],
      gameStarted: false,
      gameCompleted: false,
      showingFeedback: false,
      lastChoiceId: null,
      pendingAchievement: null,
      trustWarningShown: false,
      pendingTrustWarning: false,

      startGame: () =>
        set({
          gameStarted: true,
          currentDay: 'monday',
          currentStepIndex: 0,
          currentBranch: null,
          pendingBranch: null,
          securityScore: INITIAL_SECURITY_SCORE,
          trustLevel: INITIAL_TRUST_LEVEL,
          unlockedAchievements: [],
          choiceHistory: [],
          completedDays: [],
          gameCompleted: false,
          showingFeedback: false,
          lastChoiceId: null,
          pendingAchievement: null,
          trustWarningShown: false,
          pendingTrustWarning: false,
        }),

      makeChoice: (dayId, stepId, choiceId, quality, scoreChange, trustChange, nextBranch, achievementTrigger) =>
        set((state) => {
          const record: ChoiceRecord = {
            dayId,
            stepId,
            choiceId,
            quality,
            scoreChange,
            trustChange,
          };
          const newAchievements = [...state.unlockedAchievements];
          let pending: string | null = null;
          if (achievementTrigger && !newAchievements.includes(achievementTrigger)) {
            newAchievements.push(achievementTrigger);
            pending = achievementTrigger;
          }
          const newTrust = clampScore(state.trustLevel + trustChange);
          const triggerWarning = newTrust < 20 && !state.trustWarningShown;
          return {
            securityScore: clampScore(state.securityScore + scoreChange),
            trustLevel: newTrust,
            choiceHistory: [...state.choiceHistory, record],
            // Don't apply branch yet — store it as pending so feedback
            // can still reference the current step. Applied in advanceStep.
            pendingBranch: nextBranch ?? null,
            showingFeedback: true,
            lastChoiceId: choiceId,
            unlockedAchievements: newAchievements,
            pendingAchievement: pending,
            ...(triggerWarning ? { trustWarningShown: true, pendingTrustWarning: true } : {}),
          };
        }),

      advanceStep: () =>
        set((state) => {
          // If a branch is pending, enter it at step 0
          if (state.pendingBranch) {
            return {
              currentBranch: state.pendingBranch,
              currentStepIndex: 0,
              pendingBranch: null,
              showingFeedback: false,
              lastChoiceId: null,
            };
          }
          // Otherwise just advance to next step
          return {
            currentStepIndex: state.currentStepIndex + 1,
            showingFeedback: false,
            lastChoiceId: null,
          };
        }),

      goBackStep: () =>
        set((state) => {
          if (state.currentStepIndex <= 0 && !state.showingFeedback) return state;

          // If showing feedback, undo the last choice
          if (state.showingFeedback && state.choiceHistory.length > 0) {
            const lastRecord = state.choiceHistory[state.choiceHistory.length - 1];
            let newAchievements = state.unlockedAchievements;
            if (state.pendingAchievement) {
              newAchievements = state.unlockedAchievements.filter(
                (a) => a !== state.pendingAchievement
              );
            }
            return {
              securityScore: clampScore(state.securityScore - lastRecord.scoreChange),
              trustLevel: clampScore(state.trustLevel - lastRecord.trustChange),
              choiceHistory: state.choiceHistory.slice(0, -1),
              pendingBranch: null,
              showingFeedback: false,
              lastChoiceId: null,
              unlockedAchievements: newAchievements,
              pendingAchievement: null,
            };
          }

          // Go back to previous step and undo its choice
          if (state.currentStepIndex > 0 && state.choiceHistory.length > 0) {
            const lastRecord = state.choiceHistory[state.choiceHistory.length - 1];
            return {
              currentStepIndex: state.currentStepIndex - 1,
              securityScore: clampScore(state.securityScore - lastRecord.scoreChange),
              trustLevel: clampScore(state.trustLevel - lastRecord.trustChange),
              choiceHistory: state.choiceHistory.slice(0, -1),
              showingFeedback: false,
              lastChoiceId: null,
              pendingAchievement: null,
              pendingBranch: null,
            };
          }

          if (state.currentStepIndex > 0) {
            return {
              currentStepIndex: state.currentStepIndex - 1,
              showingFeedback: false,
              lastChoiceId: null,
              pendingBranch: null,
            };
          }

          return state;
        }),

      completeDay: () =>
        set((state) => ({
          completedDays: [...state.completedDays, state.currentDay],
          showingFeedback: false,
          pendingBranch: null,
        })),

      advanceToNextDay: (nextDay) =>
        set({
          currentDay: nextDay,
          currentStepIndex: 0,
          currentBranch: null,
          pendingBranch: null,
          showingFeedback: false,
          lastChoiceId: null,
        }),

      completeGame: () => set({ gameCompleted: true }),

      jumpToDay: (day) =>
        set((state) => {
          // Reverse score/trust changes from any previous choices on this day
          const dayChoices = state.choiceHistory.filter((c) => c.dayId === day);
          let scoreAdjust = 0;
          let trustAdjust = 0;
          for (const c of dayChoices) {
            scoreAdjust -= c.scoreChange;
            trustAdjust -= c.trustChange;
          }
          const newTrust = clampScore(state.trustLevel + trustAdjust);
          return {
            gameStarted: true,
            currentDay: day,
            currentStepIndex: 0,
            currentBranch: null,
            pendingBranch: null,
            showingFeedback: false,
            lastChoiceId: null,
            securityScore: clampScore(state.securityScore + scoreAdjust),
            trustLevel: newTrust,
            choiceHistory: state.choiceHistory.filter((c) => c.dayId !== day),
            completedDays: state.completedDays.filter((d) => d !== day),
            // Re-evaluate whether warning should have been shown based on new trust
            trustWarningShown: newTrust < 20 ? state.trustWarningShown : false,
            pendingTrustWarning: false,
          };
        }),

      resetGame: () =>
        set({
          currentDay: 'monday',
          currentStepIndex: 0,
          currentBranch: null,
          pendingBranch: null,
          securityScore: INITIAL_SECURITY_SCORE,
          trustLevel: INITIAL_TRUST_LEVEL,
          unlockedAchievements: [],
          choiceHistory: [],
          completedDays: [],
          gameStarted: false,
          gameCompleted: false,
          showingFeedback: false,
          lastChoiceId: null,
          pendingAchievement: null,
          trustWarningShown: false,
          pendingTrustWarning: false,
        }),

      setShowingFeedback: (showing) => set({ showingFeedback: showing }),

      unlockAchievement: (id) =>
        set((state) => {
          if (state.unlockedAchievements.includes(id)) return state;
          return {
            unlockedAchievements: [...state.unlockedAchievements, id],
            pendingAchievement: id,
          };
        }),

      dismissAchievement: () => set({ pendingAchievement: null }),

      dismissTrustWarning: () => set({ pendingTrustWarning: false }),
    }),
    {
      name: 'cyberwise-game-state',
    }
  )
);
