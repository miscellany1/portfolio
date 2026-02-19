import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/common/Button.tsx';
import { Card } from '../components/common/Card.tsx';

const sections = [
  {
    title: 'Design Rationale',
    content: `Cyberwise uses a branching scenario simulation model — an evidence-based approach where learners make decisions in realistic contexts and receive immediate, specific feedback. This design pattern is well-supported by research in situated cognition and experiential learning.`,
  },
  {
    title: 'Bloom\'s Taxonomy Integration',
    content: `Each day's scenario targets a progressively higher cognitive level: from Knowledge (identifying phishing indicators) through Comprehension, Application, and Analysis, culminating in Evaluation (incident response decision-making). This scaffolded progression ensures learners build foundational understanding before tackling complex judgment calls.`,
  },
  {
    title: 'Gamification Framework',
    content: `The game mechanics — Security Score, Trust Level, Achievements, and multiple endings — leverage intrinsic motivation through competence feedback, autonomy in decision-making, and narrative engagement. The scoring system provides both formative assessment (per-choice feedback) and summative assessment (final report card).`,
  },
  {
    title: 'Feedback Design',
    content: `Every choice triggers a three-part feedback panel: quality rating with score impact, instructional explanation of why the choice matters, and real-world context connecting the scenario to actual cybersecurity practice. This approach follows Merrill's First Principles of Instruction by integrating new knowledge with real-world application.`,
  },
  {
    title: 'Technical Implementation',
    content: `Built with React, TypeScript, Tailwind CSS, Framer Motion, and Zustand. The architecture separates pure game data and logic from UI components, making content easy to update without touching code. State persists to localStorage for session continuity. Fully static — no backend required.`,
  },
];

export const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-slate-100">About Cyberwise</h1>
        <p className="text-sm text-slate-400">
          Design decisions, instructional strategy, and technical details.
        </p>
      </motion.div>

      <div className="space-y-4">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card variant="default" padding="md">
              <h2 className="mb-2 text-base font-semibold text-slate-200">{section.title}</h2>
              <p className="text-sm leading-relaxed text-slate-400">{section.content}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card variant="outlined" padding="md">
        <h2 className="mb-2 text-base font-semibold text-slate-200">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'React Router'].map(
            (tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </Card>

      <div className="flex justify-center gap-3 pt-4">
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    </div>
  );
};
