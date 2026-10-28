import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';

const steps = [
  { id: 1, title: 'Personal' },
  { id: 2, title: 'Summary' },
  { id: 3, title: 'Experience' },
  { id: 4, title: 'Education' },
  { id: 5, title: 'Skills' },
  { id: 6, title: 'Projects & More' },
];

export const StepWizard: React.FC = () => {
  const { activeStep, setActiveStep } = useResumeStore();

  return (
    <div className="builder-header">
      <div className="stepper-nav">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          const isCompleted = activeStep > step.id;
          const formattedNum = `0${step.id}`;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <span className="step-number">{isCompleted ? '✓' : formattedNum}</span>
              <span>{step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
