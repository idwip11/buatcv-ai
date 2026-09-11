import React from 'react';
import { ResumeData, getFontFamilyCSS } from '@/types/resume';
import { useResumeStore } from '@/store/useResumeStore';
import { EditableText } from '@/components/common/EditableText';

interface TemplateProps {
  data: ResumeData;
}

/**
 * ATS Classic Template (Interactive Inline-Editable)
 * Matches the user's personal CV format: centered header, pipe-separated contact,
 * horizontal rules for sections, company+location / title+dates layout.
 * No photo, no sidebar, no colors — pure text for maximum ATS parseability.
 * All text elements support direct inline typing and deletion with automatic store sync.
 */
export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, experiences, education, skills, projects, certifications, languages } = data;
  const {
    updatePersonalInfo,
    updateSummary,
    updateExperience,
    updateEducation,
    updateSkill,
    updateProject,
    updateCertification,
  } = useResumeStore();

  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim();

  // Build contact line with pipe separators
  const contactParts: { key: string; val: string; onSave: (v: string) => void }[] = [];
  if (personalInfo.phone) {
    contactParts.push({ key: 'phone', val: personalInfo.phone, onSave: (v) => updatePersonalInfo({ phone: v }) });
  }
  if (personalInfo.email) {
    contactParts.push({ key: 'email', val: personalInfo.email, onSave: (v) => updatePersonalInfo({ email: v }) });
  }
  if (personalInfo.linkedin) {
    contactParts.push({
      key: 'linkedin',
      val: personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      onSave: (v) => updatePersonalInfo({ linkedin: v.startsWith('http') ? v : `https://${v}` }),
    });
  }
  if (personalInfo.github) {
    contactParts.push({
      key: 'github',
      val: personalInfo.github.replace(/^https?:\/\/(www\.)?/, ''),
      onSave: (v) => updatePersonalInfo({ github: v.startsWith('http') ? v : `https://${v}` }),
    });
  }
  if (personalInfo.website) {
    contactParts.push({
      key: 'website',
      val: personalInfo.website.replace(/^https?:\/\/(www\.)?/, ''),
      onSave: (v) => updatePersonalInfo({ website: v.startsWith('http') ? v : `https://${v}` }),
    });
  }
  if (personalInfo.location) {
    contactParts.push({ key: 'location', val: personalInfo.location, onSave: (v) => updatePersonalInfo({ location: v }) });
  }

  return (
    <div
      style={{
        padding: '36px 40px 30px',
        fontFamily: getFontFamilyCSS(data.settings?.fontFamily),
        color: '#1a1a1a',
        backgroundColor: '#ffffff',
        fontSize: '10pt',
        lineHeight: 1.45,
        minHeight: '1123px',
        boxSizing: 'border-box',
      }}
    >
      {/* ---- HEADER (CENTERED) ---- */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <h1
          style={{
            fontSize: '18pt',
            fontWeight: 700,
            color: '#000000',
            letterSpacing: '0.02em',
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
          <div
            style={{
              fontSize: '10pt',
              color: '#333333',
              marginBottom: '4px',
            }}
          >
            <EditableText
              value={personalInfo.headline}
              onSave={(val) => updatePersonalInfo({ headline: val })}
            />
          </div>
        )}

        {contactParts.length > 0 && (
          <div
            style={{
              fontSize: '9pt',
              color: '#333333',
              wordBreak: 'break-word',
            }}
          >
            {contactParts.map((item, idx) => (
              <React.Fragment key={item.key}>
                <EditableText value={item.val} onSave={item.onSave} />
                {idx < contactParts.length - 1 ? ' | ' : ''}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* ---- SUMMARY ---- */}
      {summary && (
        <div style={{ textAlign: 'center', marginBottom: '10px', paddingTop: '4px' }}>
          <p
            style={{
              fontSize: '9.5pt',
              lineHeight: 1.5,
              color: '#222222',
              maxWidth: '95%',
              margin: '0 auto',
            }}
          >
            <EditableText
              value={summary}
              multiline
              onSave={(val) => updateSummary(val)}
            />
          </p>
        </div>
      )}

      {/* ---- WORK EXPERIENCE ---- */}
      {experiences.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <div
            style={{
              borderBottom: '1.5px solid #000000',
              paddingBottom: '2px',
              marginBottom: '8px',
            }}
          >
            <h2
              style={{
                fontSize: '11pt',
                fontWeight: 700,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                margin: 0,
              }}
            >
              Work Experience
            </h2>
          </div>

          {experiences.map((exp, idx) => (
            <div key={exp.id} style={{ marginBottom: idx < experiences.length - 1 ? '12px' : '0' }}>
              {/* Company + Location */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '10pt', color: '#000000' }}>
                  <EditableText
                    value={exp.company}
                    onSave={(val) => updateExperience(exp.id, { company: val })}
                  />
                </span>
                <span style={{ fontSize: '9.5pt', color: '#333333' }}>
                  <EditableText
                    value={exp.location}
                    onSave={(val) => updateExperience(exp.id, { location: val })}
                  />
                </span>
              </div>
              {/* Title + Dates */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <span style={{ fontStyle: 'italic', fontSize: '10pt', color: '#222222' }}>
                  <EditableText
                    value={exp.title}
                    onSave={(val) => updateExperience(exp.id, { title: val })}
                  />
                </span>
                <span style={{ fontStyle: 'italic', fontSize: '9pt', color: '#444444' }}>
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

              {/* Description */}
              {exp.description && (
                <p style={{ fontSize: '9.5pt', color: '#222222', margin: '3px 0 2px', lineHeight: 1.45 }}>
                  <EditableText
                    value={exp.description}
                    multiline
                    onSave={(val) => updateExperience(exp.id, { description: val })}
                  />
                </p>
              )}

              {/* Bullet Points */}
              {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                <ul
                  style={{
                    paddingLeft: '18px',
                    margin: '3px 0 0',
                    fontSize: '9.5pt',
                    color: '#222222',
                    lineHeight: 1.5,
                  }}
                >
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

      {/* ---- EDUCATION ---- */}
      {education.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <div
            style={{
              borderBottom: '1.5px solid #000000',
              paddingBottom: '2px',
              marginBottom: '8px',
            }}
          >
            <h2
              style={{
                fontSize: '11pt',
                fontWeight: 700,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                margin: 0,
              }}
            >
              Education
            </h2>
          </div>

          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '10pt', color: '#000000' }}>
                  <EditableText
                    value={edu.school}
                    onSave={(val) => updateEducation(edu.id, { school: val })}
                  />
                </span>
                <span style={{ fontSize: '9pt', color: '#444444' }}>
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
              <div style={{ fontSize: '9.5pt', color: '#222222', fontStyle: 'italic' }}>
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
              </div>
              {edu.gpa && (
                <div style={{ fontSize: '9pt', color: '#333333', marginTop: '1px' }}>
                  <EditableText
                    value={`GPA: ${edu.gpa}`}
                    onSave={(val) => {
                      const cleaned = val.replace(/^GPA:\s*/i, '');
                      updateEducation(edu.id, { gpa: cleaned });
                    }}
                  />
                </div>
              )}
              {edu.description && (
                <p style={{ fontSize: '9pt', color: '#333333', marginTop: '2px', lineHeight: 1.4 }}>
                  <EditableText
                    value={edu.description}
                    multiline
                    onSave={(val) => updateEducation(edu.id, { description: val })}
                  />
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ---- SKILLS ---- */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <div
            style={{
              borderBottom: '1.5px solid #000000',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            <h2
              style={{
                fontSize: '11pt',
                fontWeight: 700,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                margin: 0,
              }}
            >
              Skills
            </h2>
          </div>
          <p style={{ fontSize: '9.5pt', color: '#222222', lineHeight: 1.5, margin: 0 }}>
            {skills.map((s, idx) => (
              <React.Fragment key={s.id}>
                <EditableText
                  value={s.name}
                  onSave={(val) => updateSkill(s.id, { name: val })}
                />
                {idx < skills.length - 1 ? ' • ' : ''}
              </React.Fragment>
            ))}
          </p>
        </div>
      )}

      {/* ---- PROJECTS ---- */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <div
            style={{
              borderBottom: '1.5px solid #000000',
              paddingBottom: '2px',
              marginBottom: '8px',
            }}
          >
            <h2
              style={{
                fontSize: '11pt',
                fontWeight: 700,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                margin: 0,
              }}
            >
              Projects
            </h2>
          </div>

          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '10pt', color: '#000000' }}>
                  <EditableText
                    value={proj.title}
                    onSave={(val) => updateProject(proj.id, { title: val })}
                  />
                  {proj.role ? (
                    <span style={{ fontWeight: 400, fontStyle: 'italic', color: '#444444' }}>
                      {' — '}
                      <EditableText
                        value={proj.role}
                        onSave={(val) => updateProject(proj.id, { role: val })}
                      />
                    </span>
                  ) : null}
                </span>
                {proj.link && (
                  <span style={{ fontSize: '8.5pt', color: '#444444' }}>
                    <EditableText
                      value={proj.link.replace(/^https?:\/\//, '')}
                      onSave={(val) => updateProject(proj.id, { link: val })}
                    />
                  </span>
                )}
              </div>
              {proj.technologies && proj.technologies.length > 0 && (
                <div style={{ fontSize: '9pt', color: '#444444', marginTop: '1px' }}>
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
              {proj.description && (
                <p style={{ fontSize: '9.5pt', color: '#222222', marginTop: '2px', lineHeight: 1.45 }}>
                  <EditableText
                    value={proj.description}
                    multiline
                    onSave={(val) => updateProject(proj.id, { description: val })}
                  />
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ---- CERTIFICATIONS ---- */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <div
            style={{
              borderBottom: '1.5px solid #000000',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            <h2
              style={{
                fontSize: '11pt',
                fontWeight: 700,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                margin: 0,
              }}
            >
              Certifications
            </h2>
          </div>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ fontSize: '9.5pt', color: '#222222', marginBottom: '3px' }}>
              <strong>
                <EditableText
                  value={cert.name}
                  onSave={(val) => updateCertification(cert.id, { name: val })}
                />
              </strong>
              {' — '}
              <EditableText
                value={cert.issuer}
                onSave={(val) => updateCertification(cert.id, { issuer: val })}
              />{' '}
              ({cert.date})
            </div>
          ))}
        </div>
      )}

      {/* ---- LANGUAGES ---- */}
      {languages.length > 0 && (
        <div style={{ marginBottom: '4px' }}>
          <div
            style={{
              borderBottom: '1.5px solid #000000',
              paddingBottom: '2px',
              marginBottom: '6px',
            }}
          >
            <h2
              style={{
                fontSize: '11pt',
                fontWeight: 700,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                margin: 0,
              }}
            >
              Languages
            </h2>
          </div>
          <p style={{ fontSize: '9.5pt', color: '#222222', margin: 0 }}>
            {languages.map((l) => `${l.name} (${l.proficiency})`).join(' • ')}
          </p>
        </div>
      )}
    </div>
  );
};
