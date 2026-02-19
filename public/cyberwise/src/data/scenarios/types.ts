export type DayId = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export type ChoiceQuality = 'optimal' | 'acceptable' | 'poor' | 'dangerous';

export type SimulationType = 'email' | 'phone' | 'desktop' | 'chat' | 'mixed';

export interface ChoiceFeedback {
  title: string;
  explanation: string;
  realWorldContext: string;
}

export interface Choice {
  id: string;
  text: string;
  quality: ChoiceQuality;
  securityScoreChange: number;
  trustChange: number;
  feedback: ChoiceFeedback;
  nextBranch?: string;
  requiresTrustLevel?: number;
  achievementTrigger?: string;
}

export interface ScenarioStep {
  id: string;
  narrative: string;
  choices: Choice[];
  simulationContent?: SimulationContent;
}

export interface EmailContent {
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: string;
  attachments?: string[];
  isPhishing?: boolean;
}

export interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
  avatar?: string;
}

export interface PhoneCallContent {
  caller: string;
  callerTitle?: string;
  transcript: string[];
}

export interface DesktopNotification {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'usb';
}

export type SimulationContent =
  | { type: 'email'; emails: EmailContent[] }
  | { type: 'chat'; messages: ChatMessage[] }
  | { type: 'phone'; call: PhoneCallContent }
  | { type: 'desktop'; notifications: DesktopNotification[] }
  | { type: 'mixed'; elements: SimulationContent[] };

export interface Branch {
  steps: ScenarioStep[];
  nextBranch?: string;
}

export interface Scenario {
  id: DayId;
  title: string;
  dayLabel: string;
  bloomsLevel: string;
  learningObjective: string;
  simulationType: SimulationType;
  intro: string;
  steps: ScenarioStep[];
  branches: Record<string, Branch>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
}

export interface Ending {
  id: string;
  title: string;
  minScore: number;
  maxScore: number;
  narrative: string;
  outcome: string;
  trustPenaltyNarrative?: string;
}

export interface GameState {
  currentDay: DayId;
  currentStepIndex: number;
  currentBranch: string | null;
  securityScore: number;
  trustLevel: number;
  unlockedAchievements: string[];
  choiceHistory: ChoiceRecord[];
  completedDays: DayId[];
  gameStarted: boolean;
  gameCompleted: boolean;
}

export interface ChoiceRecord {
  dayId: DayId;
  stepId: string;
  choiceId: string;
  quality: ChoiceQuality;
  scoreChange: number;
  trustChange: number;
}
