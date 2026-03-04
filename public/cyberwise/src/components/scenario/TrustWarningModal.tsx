import { Modal } from '../common/Modal.tsx';
import { Button } from '../common/Button.tsx';

interface TrustWarningModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export const TrustWarningModal = ({ isOpen, onDismiss }: TrustWarningModalProps) => (
  <Modal isOpen={isOpen} onClose={onDismiss} title="A word from your manager">
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-text-primary">
        Your manager, David, stops by your desk with a concerned look.
      </p>
      <blockquote className="border-l-2 border-amber-500/50 pl-4 text-sm leading-relaxed text-text-secondary italic">
        "I've been hearing some feedback about a few of your recent decisions. I know you're
        new here, but the team needs to be able to trust your judgment — especially when it
        comes to security. I'm not writing you up, but I need to see improvement going forward.
        People are watching."
      </blockquote>
      <p className="text-xs leading-relaxed text-amber-600">
        Your trust level has dropped critically low. Some response options may no longer be
        available to you.
      </p>
      <div className="pt-2">
        <Button onClick={onDismiss} className="w-full">
          I understand
        </Button>
      </div>
    </div>
  </Modal>
);
