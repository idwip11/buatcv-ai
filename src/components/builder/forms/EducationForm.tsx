import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const { resume, addEducation, updateEducation, deleteEducation } = useResumeStore();
  const { education } = resume;
  const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="animate-fade-in">
      <div className="form-section-card">
        <div className="section-title-wrap">
          <div>
            <h2 className="section-title">Education History</h2>
            <p className="section-desc">Riwayat pendidikan formal, gelar akademik, IPK, dan aktivitas kampus</p>
          </div>
          <button onClick={() => addEducation()} className="btn btn-primary btn-sm">
            <Plus size={13} />
            <span>Add Degree</span>
          </button>
        </div>

        {education.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '28px', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '0.84rem', marginBottom: '12px' }}>Belum ada riwayat pendidikan yang ditambahkan.</p>
            <button onClick={() => addEducation()} className="btn btn-secondary btn-sm">
              <Plus size={13} />
              <span>Add Your College or School</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {education.map((edu) => {
              const isExpanded = expandedId === edu.id;

              return (
                <div key={edu.id} className="item-card">
                  <div className="item-card-header" onClick={() => toggleExpand(edu.id)} style={{ cursor: 'pointer' }}>
                    <div>
                      <div className="item-card-title">{edu.degree || 'Degree'}</div>
                      <div className="item-card-subtitle">
                        {edu.school || 'School'} · {edu.startDate || ''} – {edu.endDate || ''}
                      </div>
                    </div>

                    <div className="item-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => deleteEducation(edu.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--text-muted)' }}
                        title="Delete Degree"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button onClick={() => toggleExpand(edu.id)} className="btn btn-ghost btn-sm">
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div
                      style={{
                        marginTop: '14px',
                        borderTop: '1px solid var(--border-subtle)',
                        paddingTop: '14px',
                      }}
                    >
                      <div className="form-grid">
                        <div className="form-group form-grid-full">
                          <label className="form-label">School / University *</label>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                            placeholder="e.g. Institut Teknologi Bandung (ITB)"
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Degree *</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                            placeholder="e.g. Bachelor of Science"
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Field of Study / Major</label>
                          <input
                            type="text"
                            value={edu.fieldOfStudy}
                            onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                            placeholder="e.g. Computer Science"
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Start Date</label>
                          <input
                            type="text"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                            placeholder="e.g. Sep 2018"
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Graduation Date</label>
                          <input
                            type="text"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                            placeholder="e.g. Jul 2022"
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">GPA / Grade / Honors</label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                            placeholder="e.g. 3.85 / 4.00"
                            className="form-input"
                          />
                        </div>

                        <div className="form-group form-grid-full">
                          <label className="form-label">Academic Description / Achievements</label>
                          <textarea
                            value={edu.description}
                            onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                            placeholder="Relevant coursework, honors, leadership roles, thesis..."
                            className="form-textarea"
                            rows={2}
                          />
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
