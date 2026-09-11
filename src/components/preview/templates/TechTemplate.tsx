import React from 'react';
import { ResumeData, getFontFamilyCSS } from '@/types/resume';
import { useResumeStore } from '@/store/useResumeStore';
import { EditableText } from '@/components/common/EditableText';

interface TemplateProps {
  data: ResumeData;
}

/**
 * ATS Tech Template (Inline-Editable)
 * Optimized for technical roles: left-aligned header, separated "Technical Skills"
 * section near the top, GitHub & portfolio prominence, monospaced accents.
 * Still 100% plain-text ATS parseable with no images or fancy formatting.
 */
export const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experiences, education, skills, projects, certifications, languages } = data;
  const {
    updatePersonalInfo,
    updateSummary,
    updateExperience,
    updateEducation,
    updateSkill,
    updateProject,
  } = useResumeStore();

  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();

  // Build multi-line contact
  const contactLine1: { key: string; val: string; onSave: (v: string) => void }[] = [];
  if (personalInfo.email) contactLine1.push({ key: 'email', val: personalInfo.email, onSave: (v) => updatePersonalInfo({ email: v }) });
  if (personalInfo.phone) contactLine1.push({ key: 'phone', val: personalInfo.phone, onSave: (v) => updatePersonalInfo({ phone: v }) });
  if (personalInfo.location) contactLine1.push({ key: 'location', val: personalInfo.location, onSave: (v) => updatePersonalInfo({ location: v }) });

  const contactLine2: { key: string; val: string; onSave: (v: string) => void }[] = [];
  if (personalInfo.linkedin) {
    contactLine2.push({
      key: 'linkedin',
      val: personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      onSave: (v) => updatePersonalInfo({ linkedin: v.startsWith('http') ? v : `https://${v}` }),
    });
  }
  if (personalInfo.github) {
    contactLine2.push({
      key: 'github',
      val: personalInfo.github.replace(/^https?:\/\/(www\.)?/, ''),
      onSave: (v) => updatePersonalInfo({ github: v.startsWith('http') ? v : `https://${v}` }),
    });
  }
  if (personalInfo.website) {
    contactLine2.push({
      key: 'website',
      val: personalInfo.website.replace(/^https?:\/\/(www\.)?/, ''),
      onSave: (v) => updatePersonalInfo({ website: v.startsWith('http') ? v : `https://${v}` }),
    });
  }

  const sectionStyle: React.CSSProperties = {
    fontSize: '10.5pt',
    fontWeight: 700,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: 0,
    paddingBottom: '3px',
    borderBottom: '1.5px solid #333333',
    marginBottom: '8px',
  };

  // Group skills by category
  const skillsByCategory: Record<string, typeof skills> = {};
  skills.forEach((s) => {
    const cat = s.category || 'General';
    if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
    skillsByCategory[cat].push(s);
  });

  return (
    <div
      style={{
        padding: '32px 38px 28px',
        fontFamily: getFontFamilyCSS(data.settings?.fontFamily),
        color: '#1a1a1a',
        backgroundColor: '#ffffff',
        fontSize: '9.5pt',
        lineHeight: 1.45,
        minHeight: '1123px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '4px' }}>
        <h1
          style={{
            fontSize: '18pt',
            fontWeight: 800,
            color: '#000000',
            margin: '0 0 2px',
            letterSpacing: '-0.01em',
          }}
        >
          <EditableText
            value={fullName || 'NAMA ANDA'}
            onSave={(val) => {
              const parts = val.trim().split(/\s+/);
              updatePersonalInfo({
                firstName: parts[0] || '',
                lastName: parts.slice(1).join(' ') || '',
              });
            }}
          />
        </h1>

        {personalInfo.headline && (
          <div style={{ fontSize: '10pt', color: '#333', marginBottom: '4px', fontWeight: 500 }}>
            <EditableText
              value={personalInfo.headline}
              onSave={(val) => updatePersonalInfo({ headline: val })}
            />
          </div>
        )}

        {contactLine1.length > 0 && (
          <div style={{ fontSize: '9pt', color: '#444' }}>
            {contactLine1.map((item, idx) => (
              <React.Fragment key={item.key}>
                <EditableText value={item.val} onSave={item.onSave} />
                {idx < contactLine1.length - 1 ? ' | ' : ''}
              </React.Fragment>
            ))}
          </div>
        )}

        {contactLine2.length > 0 && (
          <div style={{ fontSize: '9pt', color: '#444', marginTop: '1px' }}>
            {contactLine2.map((item, idx) => (
              <React.Fragment key={item.key}>
                <EditableText value={item.val} onSave={item.onSave} />
                {idx < contactLine2.length - 1 ? ' | ' : ''}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <hr style={{ border: 'none', borderTop: '2px solid #000000', margin: '8px 0 10px' }} />

      {/* Summary */}
      {summary && (
        <div style={{ marginBottom: '12px' }}>
          <p style={{ fontSize: '9.5pt', lineHeight: 1.55, color: '#222' }}>
            <EditableText
              value={summary}
              multiline
              onSave={(val) => updateSummary(val)}
            />
          </p>
        </div>
      )}

      {/* Technical Skills — positioned early for tech roles */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={sectionStyle}>Technical Skills</h2>
          {Object.keys(skillsByCategory).length > 1 ? (
            <div style={{ fontSize: '9.5pt', color: '#222', lineHeight: 1.6 }}>
              {Object.entries(skillsByCategory).map(([category, items], idx) => (
                <div key={idx} style={{ marginBottom: '2px' }}>
                  <strong>{category}:</strong>{' '}
                  {items.map((s, sIdx) => (
                    <React.Fragment key={s.id}>
                      <EditableText
                        value={s.name}
                        onSave={(val) => updateSkill(s.id, { name: val })}
                      />
                      {sIdx < items.length - 1 ? ', ' : ''}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '9.5pt', color: '#222', lineHeight: 1.55, margin: 0 }}>
              {skills.map((s, idx) => (
                <React.Fragment key={s.id}>
                  <EditableText
                    value={s.name}
                    onSave={(val) => updateSkill(s.id, { name: val })}
                  />
                  {idx < skills.length - 1 ? ', ' : ''}
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={sectionStyle}>Engineering Experience</h2>

          {experiences.map((exp, idx) => (
            <div key={exp.id} style={{ marginBottom: idx < experiences.length - 1 ? '12px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '10pt', color: '#000' }}>
                  <EditableText
                    value={exp.company}
                    onSave={(val) => updateExperience(exp.id, { company: val })}
                  />
                </span>
                <span style={{ fontSize: '9pt', color: '#555' }}>
                  <EditableText
                    value={exp.location}
                    onSave={(val) => updateExperience(exp.id, { location: val })}
                  />
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontStyle: 'italic', fontSize: '10pt', color: '#222' }}>
                  <EditableText
                    value={exp.title}
                    onSave={(val) => updateExperience(exp.id, { title: val })}
                  />
                </span>
                <span style={{ fontStyle: 'italic', fontSize: '9pt', color: '#555' }}>
                  <EditableText
                    value={`${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}`}
                    onSave={(val) => {
                      const parts = val.split('–').map((s) => s.trim());
                      if (parts.length === 2) {
                        updateExperience(exp.id, {
                          startDate: parts[0],
                          endDate: parts[1],
                          current: parts[1].toLowerCase() === 'present',
                        });
                      } else {
                        updateExperience(exp.id, { startDate: val });
                      }
                    }}
                  />
                </span>
              </div>
              {exp.description && (
                <p style={{ fontSize: '9.5pt', color: '#222', margin: '3px 0 2px', lineHeight: 1.45 }}>
                  <EditableText
                    value={exp.description}
                    multiline
                    onSave={(val) => updateExperience(exp.id, { description: val })}
                  />
                </p>
              )}
              {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                <ul style={{ paddingLeft: '18px', margin: '3px 0 0', fontSize: '9.5pt', color: '#222', lineHeight: 1.5 }}>
                  {exp.bulletPoints.map((bp, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>
                      <EditableText
                        value={bp}
                        multiline
                        onSave={(val) => {
                          const updated = [...exp.bulletPoints];
                          if (!val) {
                            updated.splice(i, 1);
                          } else {
                            updated[i] = val;
                          }
                          updateExperience(exp.id, { bulletPoints: updated });
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={sectionStyle}>Key Technical Projects</h2>

          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '10pt', color: '#000' }}>
                  <EditableText
                    value={proj.title}
                    onSave={(val) => updateProject(proj.id, { title: val })}
                  />
                  {proj.role ? (
                    <span style={{ fontWeight: 400, fontStyle: 'italic', color: '#444' }}>
                      {' — '}
                      <EditableText
                        value={proj.role}
                        onSave={(val) => updateProject(proj.id, { role: val })}
                      />
                    </span>
                  ) : null}
                </span>
                {proj.link && (
                  <span style={{ fontSize: '8.5pt', color: '#444' }}>
                    <EditableText
                      value={proj.link.replace(/^https?:\/\//, '')}
                      onSave={(val) => updateProject(proj.id, { link: val })}
                    />
                  </span>
                )}
              </div>
              {proj.technologies && proj.technologies.length > 0 && (
                <div style={{ fontSize: '9pt', color: '#444', marginTop: '1px' }}>
                  Tech:{' '}
                  <EditableText
                    value={proj.technologies.join(', ')}
                    onSave={(val) => {
                      const techArr = val.split(',').map((t) => t.trim()).filter(Boolean);
                      updateProject(proj.id, { technologies: techArr });
                    }}
                  />
                </div>
              )}
              <p style={{ fontSize: '9.5pt', color: '#222', marginTop: '2px', lineHeight: 1.45 }}>
                <EditableText
                  value={proj.description}
                  multiline
                  onSave={(val) => updateProject(proj.id, { description: val })}
                />
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <h2 style={sectionStyle}>Education</h2>

          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '10pt', color: '#000' }}>
                  <EditableText
                    value={edu.school}
                    onSave={(val) => updateEducation(edu.id, { school: val })}
                  />
                </span>
                <span style={{ fontSize: '9pt', color: '#555' }}>
                  <EditableText
                    value={`${edu.startDate} – ${edu.current ? 'Present' : edu.endDate}`}
                    onSave={(val) => {
                      const parts = val.split('–').map((s) => s.trim());
                      if (parts.length === 2) {
                        updateEducation(edu.id, {
                          startDate: parts[0],
                          endDate: parts[1],
                          current: parts[1].toLowerCase() === 'present',
                        });
                      } else {
                        updateEducation(edu.id, { startDate: val });
                      }
                    }}
                  />
                </span>
              </div>
              <div style={{ fontSize: '9.5pt', color: '#333' }}>
                <EditableText
                  value={`${edu.degree}${edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}`}
                  onSave={(val) => {
                    const parts = val.split(',').map((s) => s.trim());
                    updateEducation(edu.id, {
                      degree: parts[0] || val,
                      fieldOfStudy: parts[1] || '',
                    });
                  }}
                />
                {edu.gpa && (
                  <span style={{ color: '#555' }}>
                    {' · GPA: '}
                    <EditableText
                      value={edu.gpa}
                      onSave={(val) => updateEducation(edu.id, { gpa: val })}
                    />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
