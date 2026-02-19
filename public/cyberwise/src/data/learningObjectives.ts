export interface LearningObjective {
  day: string;
  bloomsLevel: string;
  bloomsVerb: string;
  objective: string;
  description: string;
}

export const learningObjectives: LearningObjective[] = [
  {
    day: 'Monday',
    bloomsLevel: 'Knowledge',
    bloomsVerb: 'Identify',
    objective: 'Identify common indicators of phishing emails.',
    description:
      'Learners will recognize red flags in emails including suspicious sender addresses, urgency tactics, misspelled domains, and malicious attachments.',
  },
  {
    day: 'Tuesday',
    bloomsLevel: 'Comprehension',
    bloomsVerb: 'Explain',
    objective: 'Explain how social engineering attacks exploit human psychology.',
    description:
      'Learners will understand the tactics used in social engineering — authority, urgency, reciprocity, and trust — and explain why these techniques are effective.',
  },
  {
    day: 'Wednesday',
    bloomsLevel: 'Application',
    bloomsVerb: 'Apply',
    objective: 'Apply physical security best practices in workplace scenarios.',
    description:
      'Learners will demonstrate proper responses to physical security threats including tailgating, suspicious USB devices, unsecured workstations, and sensitive document handling.',
  },
  {
    day: 'Thursday',
    bloomsLevel: 'Analysis',
    bloomsVerb: 'Analyze',
    objective: 'Analyze data handling requests to determine appropriate actions.',
    description:
      'Learners will classify data by sensitivity level and evaluate whether sharing, storage, and transfer requests comply with organizational data policies.',
  },
  {
    day: 'Friday',
    bloomsLevel: 'Evaluation',
    bloomsVerb: 'Evaluate',
    objective: 'Evaluate incident response options and select the best course of action.',
    description:
      'Learners will assess security incidents, prioritize response actions, and make judgment calls about containment, communication, and escalation procedures.',
  },
];
