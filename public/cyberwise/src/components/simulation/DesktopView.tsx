import { motion } from 'framer-motion';
import type { DesktopNotification } from '../../data/scenarios/types.ts';

interface DesktopViewProps {
  notifications: DesktopNotification[];
}

const typeStyles: Record<string, { icon: string; border: string; bg: string; text: string }> = {
  info: { icon: 'ℹ️', border: 'border-blue-500/30', bg: 'bg-blue-500/5', text: 'text-blue-400' },
  warning: { icon: '⚠️', border: 'border-yellow-500/30', bg: 'bg-yellow-500/5', text: 'text-yellow-400' },
  error: { icon: '🚨', border: 'border-red-500/30', bg: 'bg-red-500/5', text: 'text-red-400' },
  usb: { icon: '💾', border: 'border-purple-500/30', bg: 'bg-purple-500/5', text: 'text-purple-400' },
};

export const DesktopView = ({ notifications }: DesktopViewProps) => (
  <div className="overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900">
    {/* Desktop bar */}
    <div className="flex items-center justify-between border-b border-slate-700/50 bg-slate-800 px-4 py-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono text-slate-400">🖥️ NovaTech Workstation</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span>Wi-Fi: NovaTech-Secure</span>
        <span>9:42 AM</span>
      </div>
    </div>

    {/* Desktop with notifications */}
    <div className="relative min-h-[200px] bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="space-y-3">
        {notifications.map((notif, i) => {
          const style = typeStyles[notif.type] ?? typeStyles.info;
          return (
            <motion.div
              key={i}
              className={`rounded-lg border ${style.border} ${style.bg} p-4`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">{style.icon}</span>
                <div>
                  <p className={`text-sm font-semibold ${style.text}`}>{notif.title}</p>
                  <p className="mt-1 text-xs text-slate-300">{notif.message}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
);
