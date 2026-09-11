import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Linkedin, User, Mail, Phone, MapPin, Globe, Github, ShieldCheck, Upload, FileText } from 'lucide-react';

interface Props {
  onOpenLinkedInModal: () => void;
}

export const PersonalInfoForm: React.FC<Props> = ({ onOpenLinkedInModal }) => {
  const { resume, updatePersonalInfo, isLinkedInConnected, linkedInAccount } = useResumeStore();
  const { personalInfo } = resume;

  return (
    <div className="animate-fade-in">
      {/* ATS Format Statistics Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <ShieldCheck size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', marginBottom: '4px' }}>
            Format ATS-Friendly — Disukai 75% HRD di Seluruh Dunia
          </div>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.45, margin: 0 }}>
            Menurut riset Capterra HR Technology Survey, <strong style={{ color: '#e2e8f0' }}>75% recruiter dan HRD global</strong> menggunakan
            Applicant Tracking System (ATS) untuk menyaring CV kandidat. Template CV ini dirancang 100% ATS-friendly:
            tanpa foto, single-column, teks polos, dan heading yang terstruktur — memastikan CV Anda <strong style={{ color: '#e2e8f0' }}>lolos
            screening otomatis</strong> dan dibaca oleh manusia.
          </p>
        </div>
      </div>

      {/* LinkedIn Auto-fill PDF Callout Banner with Instructions */}
      <div className="linkedin-banner">
        <div className="linkedin-banner-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="linkedin-banner-badge">
              <Linkedin size={14} />
              <span>Auto-Fill dari LinkedIn PDF</span>
            </div>
            {isLinkedInConnected && (
              <span style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 600 }}>
                ✓ Terisi dari profil {linkedInAccount?.name}
              </span>
            )}
          </div>
          <button onClick={onOpenLinkedInModal} className="btn btn-linkedin btn-sm">
            <Upload size={14} />
            <span>{isLinkedInConnected ? 'Upload Ulang PDF' : 'Upload File PDF'}</span>
          </button>
        </div>

        {/* Petunjuk Cara Menggunakannya */}
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            borderRadius: '10px',
            padding: '12px 14px',
            border: '1px solid rgba(10, 102, 194, 0.3)',
          }}
        >
          <div
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#38bdf8',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FileText size={14} />
            <span>Cara Menggunakannya:</span>
          </div>
          <ol
            style={{
              margin: 0,
              paddingLeft: '18px',
              fontSize: '0.78rem',
              color: '#cbd5e1',
              lineHeight: 1.6,
            }}
          >
            <li>Buka profil <strong>LinkedIn</strong> Anda di browser.</li>
            <li>
              Klik tombol <strong style={{ color: '#fff' }}>More (Lainnya)</strong> di bawah foto profil Anda → pilih{' '}
              <strong style={{ color: '#38bdf8' }}>Save to PDF (Simpan ke PDF)</strong>.
            </li>
            <li>
              Unggah (<em>upload</em>) file PDF tersebut ke BuatCV AI.
            </li>
            <li>
              Seluruh <strong style={{ color: '#fff' }}>Pengalaman Kerja, Riwayat Pendidikan, Skills, dan Kontak</strong> Anda akan langsung terisi otomatis ke form dan template CV!
            </li>
          </ol>
        </div>
      </div>

      <div className="form-section-card">
        <div className="section-title-wrap">
          <div>
            <h2 className="section-title">
              <User size={18} color="var(--primary)" />
              Personal Details
            </h2>
            <p className="section-desc">Add your contact and professional identification info</p>
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
            <label className="form-label">
              <Mail size={13} /> Email Address *
            </label>
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
            <label className="form-label">
              <Phone size={13} /> Phone Number
            </label>
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
            <label className="form-label">
              <MapPin size={13} /> Location / City
            </label>
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
            <label className="form-label">
              <Globe size={13} /> Portfolio Website
            </label>
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
            <label className="form-label">
              <Linkedin size={13} /> LinkedIn URL
            </label>
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
            <label className="form-label">
              <Github size={13} /> GitHub Profile
            </label>
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
