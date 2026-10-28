import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  onOpenLinkedInModal: () => void;
}

export const PersonalInfoForm: React.FC<Props> = ({ onOpenLinkedInModal }) => {
  const { resume, updatePersonalInfo, isLinkedInConnected, linkedInAccount } = useResumeStore();
  const { personalInfo } = resume;

  return (
    <div className="animate-fade-in">
      {/* Minimal Editorial Notice: ATS Standard & LinkedIn Import */}
      <div className="editorial-notice">
        <div className="editorial-notice-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="editorial-tag">Standar ATS</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
              Format satu kolom, ramah mesin pencari HRD
            </span>
          </div>
          <button onClick={onOpenLinkedInModal} className="btn btn-secondary btn-sm">
            <span>{isLinkedInConnected ? 'Perbarui PDF LinkedIn' : 'Impor PDF LinkedIn'}</span>
            <ArrowUpRight size={13} color="var(--text-muted)" />
          </button>
        </div>

        <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
          Dirancang mengikuti struktur standar Applicant Tracking System (tanpa foto, hierarki teks bersih). Anda juga
          dapat mengunggah file <strong>Save to PDF</strong> dari profil LinkedIn untuk mengisi seluruh kolom secara
          otomatis.
          {isLinkedInConnected && linkedInAccount?.name && (
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 500, marginLeft: '6px' }}>
              · Terhubung: {linkedInAccount.name}
            </span>
          )}
        </p>
      </div>

      <div className="form-section-card">
        <div className="section-title-wrap">
          <div>
            <h2 className="section-title">Personal Details</h2>
            <p className="section-desc">Informasi identitas dan kontak profesional yang tampil di bagian atas CV</p>
          </div>
        </div>

        <div className="form-grid">
          {/* First Name */}
          <div className="form-group">
            <label className="form-label">First Name *</label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
              placeholder="e.g. Alexander"
              className="form-input"
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
              placeholder="e.g. Pratama"
              className="form-input"
            />
          </div>

          {/* Job Title / Headline */}
          <div className="form-group form-grid-full">
            <label className="form-label">Professional Headline / Target Role</label>
            <input
              type="text"
              value={personalInfo.headline}
              onChange={(e) => updatePersonalInfo({ headline: e.target.value })}
              placeholder="e.g. Senior Full Stack Engineer & Cloud Architect"
              className="form-input"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="name@company.com"
              className="form-input"
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              placeholder="+62 812 3456 7890"
              className="form-input"
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label">Location / City</label>
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              placeholder="Jakarta, Indonesia"
              className="form-input"
            />
          </div>

          {/* Portfolio / Website */}
          <div className="form-group">
            <label className="form-label">Portfolio Website</label>
            <input
              type="url"
              value={personalInfo.website}
              onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              placeholder="https://myportfolio.dev"
              className="form-input"
            />
          </div>

          {/* LinkedIn Profile */}
          <div className="form-group">
            <label className="form-label">LinkedIn URL</label>
            <input
              type="url"
              value={personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              className="form-input"
            />
          </div>

          {/* GitHub / Tech Profile */}
          <div className="form-group">
            <label className="form-label">GitHub Profile</label>
            <input
              type="url"
              value={personalInfo.github}
              onChange={(e) => updatePersonalInfo({ github: e.target.value })}
              placeholder="https://github.com/username"
              className="form-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
