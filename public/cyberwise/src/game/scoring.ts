import type { Choice, ChoiceQuality } from '../data/scenarios/types.ts';

const INITIAL_SECURITY_SCORE = 75;
const INITIAL_TRUST_LEVEL = 50;
const MIN_SCORE = 0;
const MAX_SCORE = 100;

export const clampScore = (score: number): number =>
  Math.max(MIN_SCORE, Math.min(MAX_SCORE, score));

export const applyChoice = (
  currentScore: number,
  currentTrust: number,
  choice: Choice
): { newScore: number; newTrust: number } => ({
  newScore: clampScore(currentScore + choice.securityScoreChange),
  newTrust: clampScore(currentTrust + choice.trustChange),
});

export const getScoreCategory = (score: number): string => {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  return 'critical';
};

export const getScoreColor = (score: number): string => {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#3b82f6';
  if (score >= 40) return '#eab308';
  return '#ef4444';
};

export const getTrustLabel = (trust: number): string => {
  if (trust >= 80) return 'Highly Trusted';
  if (trust >= 60) return 'Trusted';
  if (trust >= 40) return 'Neutral';
  if (trust >= 20) return 'Cautious';
  return 'Distrusted';
};

export const getQualityScore = (quality: ChoiceQuality): number => {
  const scores: Record<ChoiceQuality, number> = {
    optimal: 3,
    acceptable: 2,
    poor: 1,
    dangerous: 0,
  };
  return scores[quality];
};

export const calculateDayScore = (qualities: ChoiceQuality[]): number => {
  if (qualities.length === 0) return 0;
  const total = qualities.reduce((sum, q) => sum + getQualityScore(q), 0);
  return Math.round((total / (qualities.length * 3)) * 100);
};

export { INITIAL_SECURITY_SCORE, INITIAL_TRUST_LEVEL };
