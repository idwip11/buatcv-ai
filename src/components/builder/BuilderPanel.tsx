import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { StepWizard } from './StepWizard';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { SummaryForm } from './forms/SummaryForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ProjectsAndCertsForm } from './forms/ProjectsAndCertsForm';
import { ChevronLeft, ChevronRight, Download, RotateCcw } from 'lucide-react';
import { downloadResumePdf } from '@/utils/pdfExport';

interface BuilderPanelProps {
  onOpenLinkedInModal: () => void;
}

export const BuilderPanel: React.FC<BuilderPanelProps> = ({ onOpenLinkedInModal }) => {
  const { activeStep, setActiveStep, resetToSample, clearAllData } = useResumeStore();

  const handleNext = () => {
    if (activeStep < 6) {
      setActiveStep(activeStep + 1);
    } else {
      downloadResumePdf();
    }
  };

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (activeStep) {
      case 1:
        return <PersonalInfoForm onOpenLinkedInModal={onOpenLinkedInModal} />;
      case 2:
        return <SummaryForm />;
      case 3:
        return <ExperienceForm />;
      case 4:
        return <EducationForm />;
      case 5:
        return <SkillsForm />;
      case 6:
        return <ProjectsAndCertsForm />;
      default:
        return <PersonalInfoForm onOpenLinkedInModal={onOpenLinkedInModal} />;
    }
  };

  return (
    <div className="builder-panel">
      {/* Top Stepper Navigation */}
      <StepWizard />

      {/* Main Step Content Area */}
      <div className="builder-content">{renderCurrentStep()}</div>

      {/* Bottom Controls */}
      <div className="builder-footer">
        <div style={{ display: 'flex', gap: '8px' }}>
          {activeStep > 1 && (
            <button onClick={handlePrev} className="btn btn-secondary btn-sm">
              <ChevronLeft size={15} />
              <span>Previous</span>
            </button>
          )}

          <button
            onClick={() => {
              if (confirm('Load pre-filled sample data? This will overwrite your current draft.')) {
                resetToSample();
              }
            }}
            className="btn btn-ghost btn-sm"
            title="Reset to initial sample"
          >
            <RotateCcw size={13} />
            <span>Sample Data</span>
          </button>
        </div>

        <button onClick={handleNext} className="btn btn-primary">
          <span>{activeStep === 6 ? 'Export PDF' : 'Next Step'}</span>
          {activeStep === 6 ? <Download size={15} /> : <ChevronRight size={15} />}
        </button>
      </div>
    </div>
  );
};
