import type { Ending } from './scenarios/types.ts';

export const endings: Ending[] = [
  {
    id: 'champion',
    title: 'Security Champion',
    minScore: 80,
    maxScore: 100,
    narrative: `Congratulations! Your first week at NovaTech has been nothing short of exemplary. Your sharp instincts and careful decision-making caught multiple threats that could have compromised the entire organization.

During the Friday all-hands meeting, the CISO personally recognized your contributions. "In my fifteen years of cybersecurity," she said, "I've rarely seen a new employee demonstrate this level of security awareness from day one."

You've been invited to join NovaTech's Security Ambassador program, where you'll help train other employees and contribute to the company's security culture.`,
    outcome: 'Recognized at all-hands meeting. Invited to join the Security Ambassador program.',
    trustPenaltyNarrative: `Despite your strong technical decisions, your colleagues' trust in your judgment never fully recovered. The CISO noted your security knowledge but flagged concerns from team leads about your reliability. You've been enrolled in additional training with a focus on professional judgment and team collaboration.`,
  },
  {
    id: 'getting_there',
    title: 'Getting There',
    minScore: 50,
    maxScore: 79,
    narrative: `You made it through your first week at NovaTech with a few stumbles along the way. While you handled some situations well, there were moments where better judgment could have prevented potential security issues.

Your manager scheduled a brief follow-up meeting. "You've got good instincts," they said, "but there are some areas where additional training would be beneficial. I'm signing you up for our advanced security awareness course next month."

It's clear you care about doing the right thing — with a bit more practice, you'll be a security-conscious team member.`,
    outcome: 'Survived the week with some stumbles. Enrolled in additional security training.',
    trustPenaltyNarrative: `While your security decisions were middling, the real concern was the erosion of trust among your colleagues. Multiple team members flagged concerns about your judgment to management. You've been placed on a performance improvement plan that addresses both security awareness and professional conduct.`,
  },
  {
    id: 'compromised',
    title: 'Compromised',
    minScore: 0,
    maxScore: 49,
    narrative: `Your first week at NovaTech has been... challenging. Several of your decisions led to security incidents that required the IT security team to intervene. A phishing email you interacted with resulted in a credential compromise, and sensitive data may have been exposed.

You've been placed on a performance improvement plan focused on cybersecurity fundamentals. Your manager was direct but supportive: "Everyone makes mistakes, especially when they're new. But in cybersecurity, the stakes are high. Let's make sure you have the knowledge you need to protect yourself and the company."

The good news? You now understand firsthand why security awareness matters.`,
    outcome: 'Serious security incidents occurred. Placed on a performance improvement plan.',
  },
];

export const getEnding = (score: number): Ending =>
  endings.find((e) => score >= e.minScore && score <= e.maxScore) ?? endings[endings.length - 1];
