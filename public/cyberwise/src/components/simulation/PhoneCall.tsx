import { motion } from 'framer-motion';
import type { PhoneCallContent } from '../../data/scenarios/types.ts';

interface PhoneCallProps {
  call: PhoneCallContent;
}

export const PhoneCall = ({ call }: PhoneCallProps) => (
  <div className="overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900">
    {/* Phone header */}
    <div className="flex items-center justify-between border-b border-slate-700/50 bg-slate-800 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600/20 text-lg">
          📞
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-200">{call.caller}</p>
          {call.callerTitle && (
            <p className="text-xs text-slate-400">{call.callerTitle}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <motion.div
          className="h-2 w-2 rounded-full bg-green-500"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs font-mono text-green-400">ACTIVE CALL</span>
      </div>
    </div>

    {/* Transcript */}
    <div className="max-h-72 space-y-3 overflow-y-auto p-4">
      {call.transcript.map((line, i) => (
        <motion.div
          key={i}
          className="flex gap-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
        >
          <span className="mt-0.5 text-xs text-slate-400">›</span>
          <p className="text-sm italic text-slate-300">{line}</p>
        </motion.div>
      ))}
    </div>
  </div>
);
