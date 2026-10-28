import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Plus, X } from 'lucide-react';
import { SkillItem } from '@/types/resume';

const suggestedSkills = [
  'React.js',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Docker',
  'AWS Cloud',
  'GraphQL',
  'REST APIs',
  'Git & GitHub',
  'Tailwind CSS',
  'Agile / Scrum',
  'System Architecture',
  'Team Leadership',
];

export const SkillsForm: React.FC = () => {
  const { resume, addSkill, deleteSkill } = useResumeStore();
  const { skills } = resume;
  const [skillInput, setSkillInput] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<SkillItem['level']>('Advanced');

  const handleAddSkill = (nameToAdd?: string) => {
    const name = (nameToAdd || skillInput).trim();
    if (!name) return;

    // Check if skill already exists
    if (!skills.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      addSkill({
        name,
        level: selectedLevel,
        category: 'Skill',
      });
    }
    setSkillInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="form-section-card">
        <div className="section-title-wrap">
          <div>
            <h2 className="section-title">Skills & Expertise</h2>
            <p className="section-desc">Kompetensi teknis, perangkat lunak, dan keahlian profesional</p>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            {skills.length} items
          </span>
        </div>

        {/* Add Skill Input Row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik keahlian lalu tekan Enter (e.g. Next.js, Financial Modeling)..."
            className="form-input"
            style={{ flex: 1 }}
          />
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value as SkillItem['level'])}
            className="form-select"
            style={{ width: '130px' }}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
          <button onClick={() => handleAddSkill()} className="btn btn-primary">
            <Plus size={14} />
            <span>Add</span>
          </button>
        </div>

        {/* Existing Skills Chips */}
        <div className="skills-container" style={{ minHeight: '48px' }}>
          {skills.map((skill) => (
            <div key={skill.id} className="skill-chip">
              <span>{skill.name}</span>
              <button
                onClick={() => deleteSkill(skill.id)}
                className="skill-chip-delete"
                title="Remove skill"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Pills */}
        <div style={{ marginTop: '22px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <span className="suggestion-label">Rekomendasi Keahlian — Klik untuk Menambahkan</span>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {suggestedSkills
              .filter((s) => !skills.some((existing) => existing.name.toLowerCase() === s.toLowerCase()))
              .map((suggested, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddSkill(suggested)}
                  className="suggestion-pill"
                >
                  + {suggested}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
