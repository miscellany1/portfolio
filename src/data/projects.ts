export interface Project {
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  tech: string[];
  demoUrl: string;
  linkLabel?: string;
}

export const projects: Project[] = [
  {
    title: "CyberWise",
    subtitle: "Cybersecurity Awareness Training",
    description:
      "A scenario-based cybersecurity training experience that teaches employees to recognize phishing, social engineering, and data handling risks through realistic, branching decision scenarios with immediate corrective feedback.",
    skills: [
      "Scenario-based learning",
      "Branching narratives",
      "Corrective feedback design",
      "Risk awareness training",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
  },
  {
    title: "CourseEval",
    subtitle: "Course Evaluation Framework",
    description:
      "An interactive evaluation tool that guides reviewers through a structured rubric for assessing online courses across content alignment, instructional design, learner experience, technical quality, and standards compliance.",
    skills: [
      "Evaluation frameworks",
      "Rubric design",
      "Quality assurance",
      "Standards alignment",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#",
  },
  {
    title: "MindMaze",
    subtitle: "Cognitive Bias Learning Game",
    description:
      "An interactive fiction game set in a fantasy world where players encounter cognitive biases through narrative choices. Built in Twine, it turns abstract psychological concepts into tangible decision points that reveal how biases shape thinking.",
    skills: [
      "Gamification",
      "Interactive narrative",
      "Cognitive psychology application",
      "Engagement design",
    ],
    tech: ["Twine", "HTML", "CSS"],
    demoUrl: "#",
    linkLabel: "Play Game",
  },
  {
    title: "TeachReady",
    subtitle: "Online Teaching Best Practices",
    description:
      "An Articulate Rise course designed for university faculty transitioning to online instruction. Covers course structure, asynchronous engagement strategies, accessible content design, and meaningful assessment in digital environments.",
    skills: [
      "Faculty development",
      "Online pedagogy",
      "Higher ed training",
      "Rapid authoring",
    ],
    tech: ["Articulate Rise"],
    demoUrl: "#",
  },
];
