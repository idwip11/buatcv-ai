import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';

const summaryStarters = [
  {
    role: 'Software Engineer',
    text: 'Results-driven Software Engineer with 5+ years of hands-on experience designing, developing, and deploying resilient web applications. Proven expertise in modern JavaScript/TypeScript frameworks, cloud microservices, and database optimization.',
  },
  {
    role: 'Product Manager',
    text: 'Customer-obsessed Product Manager with a track record of driving product-led growth and high-impact digital transformations. Adept at agile roadmapping, data-informed experimentation, and leading cross-functional teams to exceed business KPIs.',
  },
  {
    role: 'Data & AI Specialist',
    text: 'Analytical Data Specialist skilled in statistical modeling, machine learning pipelines, and translating complex dataset patterns into actionable executive business intelligence.',
  },
  {
    role: 'Recent Graduate / Entry Level',
    text: 'Motivated and detail-oriented Computer Science graduate with strong foundational knowledge in data structures, algorithms, and full-stack software development. Eager to contribute fresh perspectives and learn within a high-velocity team.',
  },
];

export const SummaryForm: React.FC = () => {
  const { resume, updateSummary } = useResumeStore();

  const handleUseStarter = (text: string) => {
    updateSummary(text);
  };

  const wordCount = resume.summary.trim() ? resume.summary.trim().split(/\s+/).length : 0;

  return (
    <div className="animate-fade-in">
      <div className="form-section-card">
        <div className="section-title-wrap">
          <div>
            <h2 className="section-title">Professional Summary</h2>
            <p className="section-desc">
              Ringkasan singkat 2–4 kalimat mengenai latar belakang, keahlian utama, dan pencapaian Anda
            </p>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            {wordCount} words
          </span>
        </div>

        <div className="form-group">
          <textarea
            value={resume.summary}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="Write your career summary or choose one of the pre-crafted templates below..."
            className="form-textarea"
            rows={5}
          />
        </div>

        {/* Pre-crafted Suggestions */}
        <div style={{ marginTop: '22px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
          <span className="suggestion-label">Contoh Ringkasan Profil — Klik untuk Gunakan</span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {summaryStarters.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleUseStarter(item.text)}
                className="suggestion-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>{item.role}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    Gunakan →
                  </span>
                </div>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
