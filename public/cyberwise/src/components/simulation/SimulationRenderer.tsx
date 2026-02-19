import type { SimulationContent } from '../../data/scenarios/types.ts';
import { EmailClient } from './EmailClient.tsx';
import { ChatWindow } from './ChatWindow.tsx';
import { PhoneCall } from './PhoneCall.tsx';
import { DesktopView } from './DesktopView.tsx';

interface SimulationRendererProps {
  content: SimulationContent;
}

export const SimulationRenderer = ({ content }: SimulationRendererProps) => {
  switch (content.type) {
    case 'email':
      return <EmailClient emails={content.emails} />;
    case 'chat':
      return <ChatWindow messages={content.messages} />;
    case 'phone':
      return <PhoneCall call={content.call} />;
    case 'desktop':
      return <DesktopView notifications={content.notifications} />;
    case 'mixed':
      return (
        <div className="space-y-4">
          {content.elements.map((el, i) => (
            <SimulationRenderer key={i} content={el} />
          ))}
        </div>
      );
    default:
      return null;
  }
};
