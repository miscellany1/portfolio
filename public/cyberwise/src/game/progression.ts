import type { DayId, Scenario, ScenarioStep } from '../data/scenarios/types.ts';

export const DAY_ORDER: DayId[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export const DAY_LABELS: Record<DayId, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
};

export const getNextDay = (currentDay: DayId): DayId | null => {
  const idx = DAY_ORDER.indexOf(currentDay);
  if (idx === -1 || idx >= DAY_ORDER.length - 1) return null;
  return DAY_ORDER[idx + 1];
};

export const getDayIndex = (day: DayId): number => DAY_ORDER.indexOf(day);

export const isLastDay = (day: DayId): boolean => day === 'friday';

export const getCurrentStep = (
  scenario: Scenario,
  stepIndex: number,
  branchId: string | null
): ScenarioStep | null => {
  if (branchId) {
    const branch = scenario.branches[branchId];
    if (branch) {
      return branch.steps[stepIndex] ?? null;
    }
    // Branch doesn't exist in this scenario — fall back to main steps
  }
  return scenario.steps[stepIndex] ?? null;
};

export const getTotalSteps = (
  scenario: Scenario,
  branchId: string | null
): number => {
  if (branchId) {
    const branch = scenario.branches[branchId];
    if (branch) {
      return branch.steps.length;
    }
  }
  return scenario.steps.length;
};

export const getProgressPercentage = (completedDays: DayId[]): number =>
  Math.round((completedDays.length / DAY_ORDER.length) * 100);
