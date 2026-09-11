import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { FolderGit2, Plus, Trash2, Globe, Github, Award, Languages } from 'lucide-react';
import { LanguageItem } from '@/types/resume';

export const ProjectsAndCertsForm: React.FC = () => {
  const {
    resume,
    addProject,
    updateProject,
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification,
    addLanguage,
    updateLanguage,
    deleteLanguage,
  } = useResumeStore();

  const { projects, certifications, languages } = resume;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Projects Section */}
      <div className="form-section-card">
        <div className="section-title-wrap">
          <div>
            <h2 className="section-title">
              <FolderGit2 size={18} color="var(--primary)" />
              Featured Projects
            </h2>
            <p className="section-desc">Showcase applications, systems, open-source work, or portfolio items</p>
          </div>
          <button onClick={() => addProject()} className="btn btn-primary btn-sm">
            <Plus size={14} />
            <span>Add Project</span>
          </button>
        </div>

        {projects.length === 0 ? (
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>No projects added yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {projects.map((proj) => (
              <div key={proj.id} className="item-card">
                <div className="item-card-header">
                  <div className="item-card-title">{proj.title || 'Project Name'}</div>
                  <button
                    onClick={() => deleteProject(proj.id)}
                    className="btn btn-ghost btn-sm"
                    style={{ color: '#f87171' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Project Title</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                      placeholder="e.g. AI Invoice Extractor"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <input
                      type="text"
                      value={proj.role}
                      onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                      placeholder="e.g. Creator / Full Stack Engineer"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Globe size={12} /> Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={proj.link}
                      onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                      placeholder="https://myproject.com"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Github size={12} /> GitHub Repo URL
                    </label>
                    <input
                      type="url"
                      value={proj.github}
                      onChange={(e) => updateProject(proj.id, { github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="form-input"
                    />
                  </div>

                  <div className="form-group form-grid-full">
                    <label className="form-label">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={proj.technologies?.join(', ') || ''}
                      onChange={(e) =>
                        updateProject(proj.id, {
                          technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      placeholder="React, Next.js, Node.js, AWS"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group form-grid-full">
                    <label className="form-label">Project Description</label>
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                      placeholder="What does it do and what value did it generate?"
                      className="form-textarea"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certifications Section */}
      <div className="form-section-card">
        <div className="section-title-wrap">
          <div>
            <h2 className="section-title">
              <Award size={18} color="var(--primary)" />
              Certifications & Licenses
            </h2>
            <p className="section-desc">Credentials from AWS, Google Cloud, Meta, or industry bodies</p>
          </div>
          <button onClick={() => addCertification()} className="btn btn-primary btn-sm">
            <Plus size={14} />
            <span>Add Cert</span>
          </button>
        </div>

        {certifications.length === 0 ? (
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>No certifications added yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {certifications.map((cert) => (
              <div key={cert.id} className="item-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="form-grid" style={{ flex: 1, marginRight: '10px' }}>
                    <div className="form-group">
                      <label className="form-label">Certification Name</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                        placeholder="AWS Solutions Architect"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Issuing Body</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                        placeholder="Amazon Web Services"
                        className="form-input"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCertification(cert.id)}
                    className="btn btn-ghost btn-sm"
                    style={{ color: '#f87171' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Languages Section */}
      <div className="form-section-card">
        <div className="section-title-wrap">
          <div>
            <h2 className="section-title">
              <Languages size={18} color="var(--primary)" />
              Languages
            </h2>
            <p className="section-desc">Languages you speak and your proficiency level</p>
          </div>
          <button onClick={() => addLanguage()} className="btn btn-primary btn-sm">
            <Plus size={14} />
            <span>Add Language</span>
          </button>
        </div>

        {languages.length === 0 ? (
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>No languages added yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {languages.map((lang) => (
              <div key={lang.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                  placeholder="e.g. English, Indonesian"
                  className="form-input"
                  style={{ flex: 1 }}
                />
                <select
                  value={lang.proficiency}
                  onChange={(e) =>
                    updateLanguage(lang.id, { proficiency: e.target.value as LanguageItem['proficiency'] })
                  }
                  className="form-select"
                  style={{ width: '140px' }}
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
                <button
                  onClick={() => deleteLanguage(lang.id)}
                  className="btn btn-ghost btn-sm"
                  style={{ color: '#f87171' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
