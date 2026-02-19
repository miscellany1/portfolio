import { motion } from 'framer-motion';
import type { ChatMessage } from '../../data/scenarios/types.ts';

interface ChatWindowProps {
  messages: ChatMessage[];
}

const avatarColors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600', 'bg-cyan-600'];

export const ChatWindow = ({ messages }: ChatWindowProps) => {
  const senderColorMap = new Map<string, string>();
  let colorIndex = 0;
  const getColor = (sender: string) => {
    if (!senderColorMap.has(sender)) {
      senderColorMap.set(sender, avatarColors[colorIndex % avatarColors.length]);
      colorIndex++;
    }
    return senderColorMap.get(sender)!;
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900">
      {/* Chat header */}
      <div className="flex items-center gap-2 border-b border-slate-700/50 bg-slate-800 px-4 py-2.5">
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <span className="text-xs font-semibold text-slate-300"># general</span>
        <span className="ml-auto text-xs text-slate-400">NovaTech Chat</span>
      </div>

      {/* Messages */}
      <div className="max-h-80 space-y-3 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${getColor(msg.sender)}`}
            >
              {msg.sender.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-slate-200">{msg.sender}</span>
                <span className="text-xs text-slate-400">{msg.timestamp}</span>
              </div>
              <p className="mt-0.5 text-sm text-slate-300">{msg.message}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
