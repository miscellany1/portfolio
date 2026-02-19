import { motion, AnimatePresence } from 'framer-motion';
import type { ChoiceQuality } from '../../data/scenarios/types.ts';

interface ConsequenceSceneProps {
  quality: ChoiceQuality;
  visible: boolean;
}

export const ConsequenceScene = ({ quality, visible }: ConsequenceSceneProps) => (
  <AnimatePresence>
    {visible && quality === 'dangerous' && (
      <motion.div
        className="pointer-events-none fixed inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-full w-full bg-red-600/40" />
      </motion.div>
    )}
  </AnimatePresence>
);
