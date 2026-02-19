export interface Project {
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  tech: string[];
  demoUrl: string;
  linkLabel?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "The Conversation",
    subtitle: "Difficult Conversations Simulation",
    description:
      "An Articulate Storyline branching scenario where learners practice navigating a tough performance conversation. Four decision points test empathy, pushback handling, root-cause exploration, and action planning, with a dynamic results page that reviews every choice against best practice using the SBI+I framework.",
    skills: [
      "Branching scenario design",
      "Simulation-based assessment",
      "Feedback frameworks (SBI+I)",
      "Storyline development",
    ],
    tech: ["Articulate Storyline", "HTML", "CSS", "JavaScript"],
    demoUrl: "/the-conversation/TheConversation/story.html",
    linkLabel: "Play Scenario",
    featured: true,
  },
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
