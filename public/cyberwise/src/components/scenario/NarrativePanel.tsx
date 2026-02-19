import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

interface NarrativePanelProps {
  text: string;
}

export const NarrativePanel = ({ text }: NarrativePanelProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;

    intervalRef.current = setInterval(() => {
      indexRef.current++;
      if (indexRef.current >= text.length) {
        setDisplayedText(text);
        setIsComplete(true);
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        setDisplayedText(text.slice(0, indexRef.current));
      }
    }, 18);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text]);

  const skipToEnd = useCallback(() => {
    if (!isComplete) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayedText(text);
      setIsComplete(true);
    }
  }, [isComplete, text]);

  return (
    <motion.div
      className={`relative rounded-lg border border-slate-700/50 bg-slate-800/60 p-5 ${
        isComplete ? 'cursor-default' : 'cursor-pointer'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onClick={isComplete ? undefined : skipToEnd}
      role={isComplete ? undefined : 'button'}
      tabIndex={isComplete ? undefined : 0}
      onKeyDown={isComplete ? undefined : (e) => {
        if (e.key === 'Enter' || e.key === ' ') skipToEnd();
      }}
    >
      <p className="whitespace-pre-line text-sm leading-relaxed text-slate-200 md:text-base">
        {displayedText}
        {!isComplete && (
          <motion.span
            className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </p>
      {!isComplete && (
        <span className="absolute bottom-2 right-3 text-xs text-slate-400">
          click to skip
        </span>
      )}
    </motion.div>
  );
};
