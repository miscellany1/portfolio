import type { Achievement } from './scenarios/types.ts';

export const achievements: Achievement[] = [
  {
    id: 'eagle_eye',
    name: 'Eagle Eye',
    description: 'Correctly identified the first phishing email without hesitation.',
    icon: '🦅',
    condition: 'Optimal choice on Monday Step 1',
  },
  {
    id: 'social_shield',
    name: 'Social Shield',
    description: 'Successfully deflected a social engineering phone call.',
    icon: '🛡️',
    condition: 'Optimal choice on Tuesday Step 1',
  },
  {
    id: 'clean_desk',
    name: 'Clean Desk Champion',
    description: 'Demonstrated excellent physical security awareness.',
    icon: '🧹',
    condition: 'Optimal choice on Wednesday Step 3',
  },
  {
    id: 'data_guardian',
    name: 'Data Guardian',
    description: 'Properly handled sensitive data classification.',
    icon: '🔒',
    condition: 'Optimal choice on Thursday Step 1',
  },
  {
    id: 'first_responder',
    name: 'First Responder',
    description: 'Took immediate and correct action during a security incident.',
    icon: '🚨',
    condition: 'Optimal choice on Friday Step 1',
  },
  {
    id: 'security_champion',
    name: 'Security Champion',
    description: 'Completed the entire week with an outstanding security score.',
    icon: '🏆',
    condition: 'Finish with security score >= 80',
  },
  {
    id: 'perfect_day',
    name: 'Perfect Day',
    description: 'Made all optimal choices in a single day.',
    icon: '⭐',
    condition: 'All optimal choices in any single day',
  },
  {
    id: 'trust_builder',
    name: 'Trust Builder',
    description: 'Earned the trust of your colleagues through consistently good decisions.',
    icon: '🤝',
    condition: 'Trust level reaches 80+',
  },
  {
    id: 'quick_learner',
    name: 'Quick Learner',
    description: 'Improved your score after making a poor choice earlier.',
    icon: '📈',
    condition: 'Make an optimal choice after a poor/dangerous one',
  },
  {
    id: 'zero_incidents',
    name: 'Zero Incidents',
    description: 'Completed the week without any dangerous choices.',
    icon: '✅',
    condition: 'No dangerous choices across all days',
  },
];

export const getAchievement = (id: string): Achievement | undefined =>
  achievements.find((a) => a.id === id);
