export interface Criterion {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  criteria: Criterion[];
}

export type RatingValue = 0 | 1 | 2 | 3 | 4;

export interface RatingLevel {
  value: RatingValue;
  label: string;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
}

export const ratingLevels: RatingLevel[] = [
  {
    value: 1,
    label: "Does Not Meet",
    color: "#f87171",
    bgClass: "bg-red-400/20",
    borderClass: "border-red-400",
    textClass: "text-red-400",
  },
  {
    value: 2,
    label: "Partially Meets",
    color: "#fbbf24",
    bgClass: "bg-amber-400/20",
    borderClass: "border-amber-400",
    textClass: "text-amber-400",
  },
  {
    value: 3,
    label: "Meets",
    color: "#60a5fa",
    bgClass: "bg-blue-400/20",
    borderClass: "border-blue-400",
    textClass: "text-blue-400",
  },
  {
    value: 4,
    label: "Exceeds",
    color: "#4ade80",
    bgClass: "bg-green-400/20",
    borderClass: "border-green-400",
    textClass: "text-green-400",
  },
];

export const categories: Category[] = [
  {
    id: "content-alignment",
    name: "Content Alignment and Structure",
    criteria: [
      {
        id: "categorization",
        name: "Categorization",
        description:
          "Is the content placed in the correct section or module? Does the organizational structure make logical sense for the learner?",
        categoryId: "content-alignment",
      },
      {
        id: "objective-alignment",
        name: "Objective Alignment",
        description:
          "Does the content directly support the stated learning objectives? Are activities and assessments aligned to what learners should know or be able to do?",
        categoryId: "content-alignment",
      },
      {
        id: "content-accuracy",
        name: "Content Accuracy",
        description:
          "Is the information factually correct, current, and free of errors? Are sources credible and up to date?",
        categoryId: "content-alignment",
      },
    ],
  },
  {
    id: "instructional-design",
    name: "Instructional Design Quality",
    criteria: [
      {
        id: "scaffolding",
        name: "Scaffolding and Sequencing",
        description:
          "Does the course build knowledge progressively? Are complex concepts introduced after foundational ones, with appropriate support along the way?",
        categoryId: "instructional-design",
      },
      {
        id: "engagement",
        name: "Learner Engagement",
        description:
          "Does the course use varied instructional strategies (multimedia, discussions, case studies, simulations) to maintain learner interest and motivation?",
        categoryId: "instructional-design",
      },
      {
        id: "assessment-design",
        name: "Assessment Design",
        description:
          "Are assessments meaningful, varied, and aligned to objectives? Do they measure understanding rather than just recall?",
        categoryId: "instructional-design",
      },
    ],
  },
  {
    id: "learner-experience",
    name: "Learner Experience",
    criteria: [
      {
        id: "navigation",
        name: "Navigation and Usability",
        description:
          "Can learners easily find content, understand where they are in the course, and move between sections without confusion?",
        categoryId: "learner-experience",
      },
      {
        id: "accessibility",
        name: "Accessibility",
        description:
          "Does the course meet accessibility standards (alt text, captions, keyboard navigation, color contrast, screen reader compatibility)?",
        categoryId: "learner-experience",
      },
      {
        id: "visual-design",
        name: "Visual Design and Consistency",
        description:
          "Is the visual presentation clean, professional, and consistent? Do fonts, colors, and layouts follow a cohesive design system?",
        categoryId: "learner-experience",
      },
    ],
  },
  {
    id: "technical-quality",
    name: "Technical Quality",
    criteria: [
      {
        id: "media-quality",
        name: "Media Quality",
        description:
          "Are videos, images, and audio clear, professional, and appropriately sized? Do media elements load correctly across devices?",
        categoryId: "technical-quality",
      },
      {
        id: "functionality",
        name: "Functionality and Interactivity",
        description:
          "Do all interactive elements (quizzes, simulations, links, embedded tools) work correctly? Are there any broken or non-functional components?",
        categoryId: "technical-quality",
      },
    ],
  },
  {
    id: "standards-compliance",
    name: "Standards and Compliance",
    criteria: [
      {
        id: "regulatory",
        name: "Regulatory Compliance",
        description:
          "Does the course meet applicable regulatory, institutional, or industry standards? Are required disclaimers, citations, and legal notices present?",
        categoryId: "standards-compliance",
      },
      {
        id: "style-guide",
        name: "Style Guide Adherence",
        description:
          "Does the course follow the organization's style guide for tone, voice, formatting, branding, and terminology?",
        categoryId: "standards-compliance",
      },
    ],
  },
];

export function getRatingLevel(value: RatingValue): RatingLevel | undefined {
  return ratingLevels.find((r) => r.value === value);
}

export function getTierLabel(score: number): {
  label: string;
  color: string;
} {
  if (score >= 3.5) return { label: "Exemplary", color: "text-green-400" };
  if (score >= 2.5) return { label: "Proficient", color: "text-sky-400" };
  if (score >= 1.5) return { label: "Developing", color: "text-amber-400" };
  return { label: "Needs Significant Revision", color: "text-red-400" };
}
