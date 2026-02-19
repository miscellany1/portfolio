import { motion } from 'framer-motion';
import type { EmailContent } from '../../data/scenarios/types.ts';

interface EmailClientProps {
  emails: EmailContent[];
}

export const EmailClient = ({ emails }: EmailClientProps) => (
  <div className="overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900">
    {/* Email client header */}
    <div className="flex items-center gap-2 border-b border-slate-700/50 bg-slate-800 px-4 py-2">
      <div className="flex gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
      </div>
      <span className="ml-2 text-xs font-mono text-slate-400">NovaTech Mail</span>
    </div>

    {/* Email list */}
    <div className="divide-y divide-slate-800">
      {emails.map((email, i) => (
        <motion.div
          key={i}
          className="p-4 hover:bg-slate-800/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15 }}
        >
          <div className="mb-2 flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-200">{email.from}</span>
                {email.isPhishing && (
                  <span className="rounded bg-red-500/10 px-1.5 py-0.5 text-xs font-bold text-red-400">
                    SUSPICIOUS
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">To: {email.to}</p>
            </div>
            <span className="shrink-0 text-xs text-slate-400">{email.timestamp}</span>
          </div>
          <p className="mb-2 text-sm font-medium text-slate-300">{email.subject}</p>
          <p className="whitespace-pre-line text-xs leading-relaxed text-slate-400">{email.body}</p>
          {email.attachments && email.attachments.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {email.attachments.map((att, j) => (
                <span
                  key={j}
                  className="inline-flex items-center gap-1 rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-300"
                >
                  <span>📎</span> {att}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  </div>
);
