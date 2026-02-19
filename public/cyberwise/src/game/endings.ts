import type { Ending } from '../data/scenarios/types.ts';
import { endings } from '../data/endings.ts';

const findEnding = (score: number): Ending => {
  for (const ending of endings) {
    if (score >= ending.minScore && score <= ending.maxScore) {
      return ending;
    }
  }
  return endings[endings.length - 1];
};

const TRUST_PENALTY_THRESHOLD = 20;

// Downgrade order: champion -> getting_there -> compromised
const downgradeMap: Record<string, string> = {
  champion: 'getting_there',
  getting_there: 'compromised',
};

export const determineEnding = (finalScore: number, finalTrust?: number): { ending: Ending; trustPenalized: boolean; trustPenaltyNarrative?: string } => {
  const originalEnding = findEnding(finalScore);
  let ending = originalEnding;
  const trustPenalized = finalTrust !== undefined && finalTrust < TRUST_PENALTY_THRESHOLD && ending.id in downgradeMap;

  if (trustPenalized) {
    const downgraded = endings.find((e) => e.id === downgradeMap[ending.id]);
    if (downgraded) ending = downgraded;
  }

  return { ending, trustPenalized, trustPenaltyNarrative: trustPenalized ? originalEnding.trustPenaltyNarrative : undefined };
};

export const getEndingTier = (endingId: string): 'champion' | 'getting_there' | 'compromised' => {
  if (endingId === 'champion') return 'champion';
  if (endingId === 'getting_there') return 'getting_there';
  return 'compromised';
};
