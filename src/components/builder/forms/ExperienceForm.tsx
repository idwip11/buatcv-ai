import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Briefcase, Plus, Trash2, ChevronDown, ChevronUp, Lightbulb, MoveUp, MoveDown } from 'lucide-react';

const bulletInspirations = [
  'Architected and deployed microservices that scaled to handle 10M+ requests per day with 99.99% uptime.',
  'Reduced deployment cycle times by 40% through automated CI/CD workflows and containerization.',
  'Spearheaded performance optimizations resulting in 35% faster page load speeds.',
  'Collaborated with cross-functional design and product stakeholders to ship 6 major product milestones on schedule.',
  'Mentored and coached junior and mid-level team members in software development best practices.',
];

export const ExperienceForm: React.FC = () => {
  const { resume, addExperience, updateExperience, deleteExperience, reorderExperiences } = useResumeStore();
  const { experiences } = resume;
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddBullet = (expId: string, currentBullets: string[], text = '') => {
    updateExperience(expId, { bulletPoints: [...currentBullets, text || 'Delivered key functional deliverables.'] });
  };

  const handleUpdateBullet = (expId: string, currentBullets: string[], index: number, text: string) => {
    const updated = [...currentBullets];
    updated[index] = text;
    updateExperience(expId, { bulletPoints: updated });
  };

  const handleDeleteBullet = (expId: string, currentBullets: string[], index: number) => {
    const updated = currentBullets.filter((_, i) => i !== index);
    updateExperience(expId, { bulletPoints: updated });
  };

  return (
    <div className="animate-fade-in">
      <div className="form-section-card">
        <div className="section-title-wrap">
          <div>
            <h2 className="section-title">
              <Briefcase size={18} color="var(--primary)" />
              Work Experience
            </h2>
            <p className="section-desc">Highlight your professional track record, impact, and roles</p>
          </div>
          <button onClick={() => addExperience()} className="btn btn-primary btn-sm">
            <Plus size={14} />
            <span>Add Position</span>
          </button>
        </div>

        {experiences.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
            <p style={{ fontSize: '0.85rem', marginBottom: '12px' }}>No work experiences added yet.</p>
            <button onClick={() => addExperience()} className="btn btn-secondary btn-sm">
              <Plus size={14} />
              Add Your First Role
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {experiences.map((exp, index) => {
              const isExpanded = expandedId === exp.id;

              return (
                <div key={exp.id} className="item-card">
                  <div className="item-card-header" onClick={() => toggleExpand(exp.id)} style={{ cursor: 'pointer' }}>
                    <div>
                      <div className="item-card-title">{exp.title || 'Untitled Position'}</div>
                      <div className="item-card-subtitle">
                        {exp.company || 'Company'} • {exp.startDate || 'Date'} – {exp.current ? 'Present' : exp.endDate || ''}
                      </div>
                    </div>

                    <div className="item-actions" onClick={(e) => e.stopPropagation()}>
                      {index > 0 && (
                        <button
                          onClick={() => reorderExperiences(index, index - 1)}
                          className="btn btn-ghost btn-sm"
                          title="Move Up"
                        >
                          <MoveUp size={13} />
                        </button>
                      )}
                      {index < experiences.length - 1 && (
                        <button
                          onClick={() => reorderExperiences(index, index + 1)}
                          className="btn btn-ghost btn-sm"
                          title="Move Down"
                        >
                          <MoveDown size={13} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteExperience(exp.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: '#f87171' }}
                        title="Delete Role"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button onClick={() => toggleExpand(exp.id)} className="btn btn-ghost btn-sm">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ marginTop: '16px', borderTop: '1px solid #334155', paddingTop: '16px' }}>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Job Title *</label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                            placeholder="e.g. Senior Software Engineer"
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Company Name *</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                            placeholder="e.g. Google or Tech Startup"
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                            placeholder="e.g. Jakarta, ID or Remote"
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label className="form-label">Start Date</label>
                            <label
                              style={{
                                fontSize: '0.74rem',
                                color: '#94a3b8',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                cursor: 'pointer',
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                              />
                              Current Job
                            </label>
                          </div>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                            placeholder="e.g. 2022-01 or Jan 2022"
                            className="form-input"
                          />
                        </div>

                        {!exp.current && (
                          <div className="form-group">
                            <label className="form-label">End Date</label>
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                              placeholder="e.g. 2024-03 or Present"
                              className="form-input"
                            />
                          </div>
                        )}

                        <div className="form-group form-grid-full">
                          <label className="form-label">Role Overview / Summary</label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                            placeholder="Brief description of your role scope..."
                            className="form-textarea"
                            rows={2}
                          />
                        </div>

                        {/* Bullet Points */}
                        <div className="form-group form-grid-full">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <label className="form-label">Key Achievements & Impact (Bullet Points)</label>
                            <button
                              type="button"
                              onClick={() => handleAddBullet(exp.id, exp.bulletPoints || [])}
                              className="btn btn-secondary btn-sm"
                            >
                              <Plus size={12} /> Add Bullet
                            </button>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {(exp.bulletPoints || []).map((bullet, bIdx) => (
                              <div key={bIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={{ color: '#60a5fa', fontWeight: 800 }}>•</span>
                                <input
                                  type="text"
                                  value={bullet}
                                  onChange={(e) =>
                                    handleUpdateBullet(exp.id, exp.bulletPoints || [], bIdx, e.target.value)
                                  }
                                  placeholder="e.g. Increased system performance by 30%..."
                                  className="form-input"
                                />
                                <button
                                  onClick={() => handleDeleteBullet(exp.id, exp.bulletPoints || [], bIdx)}
                                  className="btn btn-ghost btn-sm"
                                  style={{ color: '#94a3b8' }}
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Quick Bullet Inspirations */}
                          <div
                            style={{
                              marginTop: '12px',
                              padding: '10px',
                              background: 'rgba(15, 23, 42, 0.4)',
                              borderRadius: '8px',
                              border: '1px solid #334155',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '0.74rem',
                                color: '#38bdf8',
                                fontWeight: 700,
                                marginBottom: '6px',
                              }}
                            >
                              <Lightbulb size={12} />
                              <span>Saran poin pencapaian profesional:</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {bulletInspirations.slice(0, 3).map((insp, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => handleAddBullet(exp.id, exp.bulletPoints || [], insp)}
                                  style={{
                                    textAlign: 'left',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#94a3b8',
                                    fontSize: '0.72rem',
                                    padding: '4px 6px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.color = '#e2e8f0')}
                                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                                >
                                  + {insp}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
