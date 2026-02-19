import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScenarioEngine } from '../hooks/useScenarioEngine.ts';
import { useGameStore } from '../stores/gameStore.ts';
import { SecurityScoreGauge } from '../components/hud/SecurityScoreGauge.tsx';
import { TrustLevel } from '../components/hud/TrustLevel.tsx';
import { NarrativePanel } from '../components/scenario/NarrativePanel.tsx';
import { ChoiceCard } from '../components/scenario/ChoiceCard.tsx';
import { FeedbackPanel } from '../components/scenario/FeedbackPanel.tsx';
import { ConsequenceScene } from '../components/scenario/ConsequenceScene.tsx';
import { SimulationRenderer } from '../components/simulation/SimulationRenderer.tsx';
import { Button } from '../components/common/Button.tsx';
import { TrustWarningModal } from '../components/scenario/TrustWarningModal.tsx';

export const ScenarioPage = () => {
  const { dayId } = useParams<{ dayId: string }>();
  const navigate = useNavigate();
  const gameStarted = useGameStore((s) => s.gameStarted);
  const securityScore = useGameStore((s) => s.securityScore);
  const trustLevel = useGameStore((s) => s.trustLevel);
  const showingFeedback = useGameStore((s) => s.showingFeedback);
  const pendingTrustWarning = useGameStore((s) => s.pendingTrustWarning);
  const dismissTrustWarning = useGameStore((s) => s.dismissTrustWarning);

  const {
    scenario,
    currentStep,
    totalSteps,
    availableChoices,
    lockedChoiceIds,
    selectedChoice,
    isLastStep,
    canGoBack,
    isDayComplete,
    handleChoice,
    handleContinue,
    handleGoBack,
  } = useScenarioEngine();

  // Redirect if game not started
  useEffect(() => {
    if (!gameStarted) navigate('/');
  }, [gameStarted, navigate]);

  // Navigate to transition when day is complete
  useEffect(() => {
    if (isDayComplete) {
      navigate(`/transition/${dayId}`);
    }
  }, [isDayComplete, dayId, navigate]);

  if (!currentStep || !dayId) return null;

  const stepNumber = useGameStore.getState().currentStepIndex + 1;

  return (
    <div className="space-y-6">
      {/* Day header + HUD */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <motion.h1
            className="text-xl font-bold text-slate-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {scenario.title}
          </motion.h1>
          <p className="text-sm text-slate-400">
            {scenario.dayLabel} — Step {stepNumber} of {totalSteps} — {scenario.bloomsLevel}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <SecurityScoreGauge score={securityScore} size="sm" />
          <div className="w-32">
            <TrustLevel trust={trustLevel} />
          </div>
        </div>
      </div>

      {/* Simulation content */}
      {currentStep.simulationContent && (
        <SimulationRenderer content={currentStep.simulationContent} />
      )}

      {/* Narrative */}
      <NarrativePanel text={currentStep.narrative} />

      {/* Choices or Feedback */}
      {showingFeedback && selectedChoice ? (
        <>
          <ConsequenceScene quality={selectedChoice.quality} visible={true} />
          <FeedbackPanel
            choice={selectedChoice}
            optimalChoice={currentStep.choices.find((c) => c.quality === 'optimal') ?? null}
            onContinue={handleContinue}
            onGoBack={handleGoBack}
            continueLabel={isLastStep ? 'Complete Day' : 'Next Situation'}
          />
        </>
      ) : (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            What do you do?
          </p>
          {availableChoices.map((choice, i) => (
            <ChoiceCard
              key={choice.id}
              choice={choice}
              index={i}
              onSelect={handleChoice}
              disabled={showingFeedback}
              selected={choice.id === selectedChoice?.id}
              locked={lockedChoiceIds.has(choice.id)}
            />
          ))}
          {canGoBack && (
            <div className="pt-2">
              <Button variant="ghost" size="sm" onClick={handleGoBack}>
                ← Go Back
              </Button>
            </div>
          )}
        </motion.div>
      )}

      <TrustWarningModal isOpen={pendingTrustWarning} onDismiss={dismissTrustWarning} />
    </div>
  );
};
