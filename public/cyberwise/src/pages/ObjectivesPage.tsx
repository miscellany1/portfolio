import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { learningObjectives } from '../data/learningObjectives.ts';
import { Button } from '../components/common/Button.tsx';
import { Card } from '../components/common/Card.tsx';

const bloomsColors: Record<string, string> = {
  Knowledge: 'border-blue-500/30 text-blue-400',
  Comprehension: 'border-cyan-500/30 text-cyan-400',
  Application: 'border-green-500/30 text-green-400',
  Analysis: 'border-yellow-500/30 text-yellow-400',
  Evaluation: 'border-purple-500/30 text-purple-400',
};

export const ObjectivesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-text-primary">Learning Objectives</h1>
        <p className="text-sm text-text-secondary">
          Each day targets a different level of Bloom's Taxonomy, progressively building
          from knowledge recall to critical evaluation.
        </p>
      </motion.div>

      {/* Bloom's Taxonomy visual */}
      <Card variant="outlined" padding="md">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Bloom's Taxonomy Progression
        </div>
        <div className="flex items-end gap-1">
          {learningObjectives.map((obj, i) => (
            <motion.div
              key={obj.day}
              className="flex flex-1 flex-col items-center gap-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-accent/20 to-accent/5"
                style={{ height: `${(i + 1) * 20 + 20}px` }}
              />
              <span className="text-xs font-medium text-text-primary">{obj.day.slice(0, 3)}</span>
              <span className="text-xs text-text-secondary">{obj.bloomsLevel}</span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Objectives list */}
      <div className="space-y-4">
        {learningObjectives.map((obj, i) => (
          <motion.div
            key={obj.day}
            className="rounded-xl border border-border-subtle bg-surface-raised p-5 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-text-primary">{obj.day}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${bloomsColors[obj.bloomsLevel] ?? ''}`}>
                    {obj.bloomsLevel}
                  </span>
                </div>
                <p className="text-sm font-medium text-text-primary">
                  <span className="text-accent">{obj.bloomsVerb}:</span> {obj.objective}
                </p>
                <p className="text-xs text-text-secondary">{obj.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center gap-3 pt-4">
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    </div>
  );
};
