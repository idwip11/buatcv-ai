import React from 'react';
import { ResumeData, getFontFamilyCSS } from '@/types/resume';
import { useResumeStore } from '@/store/useResumeStore';
import { EditableText } from '@/components/common/EditableText';

interface TemplateProps {
  data: ResumeData;
}

/**
 * ATS Professional Template (Inline-Editable)
 * Serif-based formal ATS layout with uppercase bold section headers,
 * double-line header separator, and structured two-tier experience lines.
 */
export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experiences, education, skills, projects, certifications, languages } = data;
  const {
    updatePersonalInfo,
    updateSummary,
    updateExperience,
    updateEducation,
    updateSkill,
  } = useResumeStore();

  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();

  const contactParts: { key: string; val: string; onSave: (v: string) => void }[] = [];
  if (personalInfo.phone) {
    contactParts.push({ key: 'phone', val: personalInfo.phone, onSave: (v) => updatePersonalInfo({ phone: v }) });
  }
  if (personalInfo.email) {
    contactParts.push({ key: 'email', val: personalInfo.email, onSave: (v) => updatePersonalInfo({ email: v }) });
  }
  if (personalInfo.location) {
    contactParts.push({ key: 'location', val: personalInfo.location, onSave: (v) => updatePersonalInfo({ location: v }) });
  }
  if (personalInfo.linkedin) {
    contactParts.push({
      key: 'linkedin',
      val: personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      onSave: (v) => updatePersonalInfo({ linkedin: v.startsWith('http') ? v : `https://${v}` }),
    });
  }
  if (personalInfo.website) {
    contactParts.push({
      key: 'website',
      val: personalInfo.website.replace(/^https?:\/\/(www\.)?/, ''),
      onSave: (v) => updatePersonalInfo({ website: v.startsWith('http') ? v : `https://${v}` }),
    });
  }

  const sectionStyle: React.CSSProperties = {
    fontSize: '11pt',
    fontWeight: 700,
    color: '#000000',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    margin: '0 0 6px',
    paddingBottom: '4px',
    borderBottom: '1.5px solid #000000',
  };

  const fontCSS = getFontFamilyCSS(data.settings?.fontFamily || 'Merriweather');

  return (
    <div
      style={{
        padding: '36px 44px 30px',
        fontFamily: fontCSS,
        color: '#1a1a1a',
        backgroundColor: '#ffffff',
        fontSize: '9.5pt',
        lineHeight: 1.5,
        minHeight: '1123px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '6px' }}>
        <h1
          style={{
            fontSize: '20pt',
            fontWeight: 700,
            color: '#000000',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            margin: '0 0 4px',
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
          <div style={{ fontSize: '10pt', fontStyle: 'italic', color: '#333', marginBottom: '6px' }}>
            <EditableText
              value={personalInfo.headline}
              onSave={(val) => updatePersonalInfo({ headline: val })}
            />
          </div>
        )}

        {contactParts.length > 0 && (
          <div style={{ fontSize: '9pt', color: '#444' }}>
            {contactParts.map((item, idx) => (
              <React.Fragment key={item.key}>
                <EditableText value={item.val} onSave={item.onSave} />
                {idx < contactParts.length - 1 ? '  |  ' : ''}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Double line divider */}
      <div
        style={{
          borderTop: '2.5px double #000000',
          margin: '10px 0 12px',
        }}
      />

      {/* Executive Summary */}
      {summary && (
        <div style={{ marginBottom: '14px' }}>
          <h2 style={sectionStyle}>Executive Profile</h2>
          <p style={{ fontSize: '9.5pt', lineHeight: 1.6, color: '#222' }}>
            <EditableText
              value={summary}
              multiline
              onSave={(val) => updateSummary(val)}
            />
          </p>
        </div>
      )}

      {/* Career History */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={sectionStyle}>Career History</h2>

          {experiences.map((exp, idx) => (
            <div key={exp.id} style={{ marginBottom: idx < experiences.length - 1 ? '14px' : '0' }}>
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
                <p style={{ fontSize: '9.5pt', color: '#222', margin: '4px 0 2px', lineHeight: 1.5 }}>
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

      {/* Academic Credentials */}
      {education.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2 style={sectionStyle}>Academic Credentials</h2>
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
              <div style={{ fontSize: '9.5pt', color: '#333', fontStyle: 'italic' }}>
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
                  <span>
                    {' — Honors: '}
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

      {/* Core Competencies (Skills) */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <h2 style={sectionStyle}>Core Competencies</h2>
          <p style={{ fontSize: '9.5pt', color: '#222', lineHeight: 1.6, margin: 0 }}>
            {skills.map((s, idx) => (
              <React.Fragment key={s.id}>
                <EditableText
                  value={s.name}
                  onSave={(val) => updateSkill(s.id, { name: val })}
                />
                {idx < skills.length - 1 ? '  |  ' : ''}
              </React.Fragment>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};
