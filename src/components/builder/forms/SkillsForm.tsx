import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Award, Plus, X } from 'lucide-react';
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
  const { resume, addSkill, deleteSkill, updateSkill } = useResumeStore();
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
            <h2 className="section-title">
              <Award size={18} color="var(--primary)" />
              Skills & Expertise
            </h2>
            <p className="section-desc">Key technical proficiencies, tools, and professional competencies</p>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{skills.length} skills</span>
        </div>

        {/* Add Skill Input Row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter (e.g. Next.js, Product Strategy)..."
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
            <Plus size={15} />
            <span>Add</span>
          </button>
        </div>

        {/* Existing Skills Chips */}
        <div className="skills-container" style={{ minHeight: '60px' }}>
          {skills.map((skill) => (
            <div key={skill.id} className="skill-chip">
              <span>{skill.name}</span>
              <button
                onClick={() => deleteSkill(skill.id)}
                className="skill-chip-delete"
                title="Remove skill"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Pills */}
        <div style={{ marginTop: '24px', borderTop: '1px solid #334155', paddingTop: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#38bdf8',
              marginBottom: '10px',
            }}
          >
            <Award size={14} />
            <span>Rekomendasi Keahlian (Klik untuk menambahkan):</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {suggestedSkills
              .filter((s) => !skills.some((existing) => existing.name.toLowerCase() === s.toLowerCase()))
              .map((suggested, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddSkill(suggested)}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid #334155',
                    color: '#94a3b8',
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#38bdf8';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#334155';
                    e.currentTarget.style.color = '#94a3b8';
                  }}
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
