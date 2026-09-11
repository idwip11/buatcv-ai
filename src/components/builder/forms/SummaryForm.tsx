import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { FileText, Lightbulb } from 'lucide-react';

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
            <h2 className="section-title">
              <FileText size={18} color="var(--primary)" />
              Professional Summary
            </h2>
            <p className="section-desc">
              A compelling 2–4 sentence overview of your background, core strengths, and achievements
            </p>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{wordCount} words</span>
        </div>

        <div className="form-group">
          <textarea
            value={resume.summary}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="Write your career summary or choose one of the pre-crafted suggestions below..."
            className="form-textarea"
            rows={5}
          />
        </div>

        {/* AI & Pre-crafted Suggestions (Zety Style) */}
        <div style={{ marginTop: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#38bdf8',
              marginBottom: '10px',
            }}
          >
            <Lightbulb size={14} />
            <span>Pilihan Contoh Ringkasan Profil (Klik untuk gunakan):</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {summaryStarters.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleUseStarter(item.text)}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#334155')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f1f5f9' }}>{item.role}</span>
                  <span style={{ fontSize: '0.7rem', color: '#60a5fa', fontWeight: 600 }}>Use this</span>
                </div>
                <p style={{ fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.4 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
