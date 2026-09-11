import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { User, FileText, Briefcase, GraduationCap, Award, FolderGit2, CheckCircle2 } from 'lucide-react';

const steps = [
  { id: 1, title: 'Personal', icon: User },
  { id: 2, title: 'Summary', icon: FileText },
  { id: 3, title: 'Experience', icon: Briefcase },
  { id: 4, title: 'Education', icon: GraduationCap },
  { id: 5, title: 'Skills', icon: Award },
  { id: 6, title: 'Projects & More', icon: FolderGit2 },
];

export const StepWizard: React.FC = () => {
  const { activeStep, setActiveStep } = useResumeStore();

  return (
    <div className="builder-header">
      <div className="stepper-nav">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          const isCompleted = activeStep > step.id;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="step-number">{isCompleted ? <CheckCircle2 size={13} /> : step.id}</div>
              <Icon size={14} />
              <span>{step.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
