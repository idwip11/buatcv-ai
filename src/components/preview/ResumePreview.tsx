import React, { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { TechTemplate } from './templates/TechTemplate';
import { getFontFamilyCSS } from '@/types/resume';
import { Minus, Plus, RotateCcw } from 'lucide-react';

export const ResumePreview: React.FC = () => {
  const { resume, zoomLevel, setZoomLevel } = useResumeStore();
  const [pageCount, setPageCount] = useState(1);

  const handleZoomIn = () => setZoomLevel(Math.min(zoomLevel + 10, 150));
  const handleZoomOut = () => setZoomLevel(Math.max(zoomLevel - 10, 40));
  const handleResetZoom = () => setZoomLevel(100);

  useEffect(() => {
    const el = document.getElementById('resume-sheet-container');
    if (!el) return;

    const updatePageCount = () => {
      const height = el.scrollHeight || el.offsetHeight || 1123;
      const count = Math.max(1, Math.ceil((height - 20) / 1123));
      setPageCount(count);
    };

    updatePageCount();
    const observer = new ResizeObserver(updatePageCount);
    observer.observe(el);
    return () => observer.disconnect();
  }, [resume]);

  const renderTemplate = () => {
    switch (resume.settings.template) {
      case 'modern':
        return <ModernTemplate data={resume} />;
      case 'minimalist':
        return <MinimalistTemplate data={resume} />;
      case 'executive':
        return <ExecutiveTemplate data={resume} />;
      case 'tech':
        return <TechTemplate data={resume} />;
      default:
        return <ModernTemplate data={resume} />;
    }
  };

  const templateLabel =
    resume.settings.template === 'modern'
      ? 'ATS Classic'
      : resume.settings.template === 'minimalist'
      ? 'ATS Clean'
      : resume.settings.template === 'executive'
      ? 'ATS Professional'
      : 'ATS Tech';

  return (
    <div className="preview-panel">
      {/* Preview Top Toolbar */}
      <div className="preview-toolbar">
        <div className="preview-meta-group">
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>A4 Preview</span>
          <span style={{ color: 'var(--border-strong)' }}>·</span>
          <span className="preview-meta-badge">{templateLabel}</span>
          <span className="preview-meta-badge" title={`Total ${pageCount} halaman A4 ketika diexport ke PDF`}>
            {pageCount} Hal
          </span>
          <span style={{ color: 'var(--border-strong)' }}>·</span>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Klik teks pada kertas untuk mengedit langsung
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="preview-scale-controls">
          <button
            onClick={handleZoomOut}
            className="btn btn-ghost btn-sm"
            title="Perkecil"
            style={{ padding: '4px 6px' }}
          >
            <Minus size={13} />
          </button>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              minWidth: '40px',
              textAlign: 'center',
            }}
          >
            {zoomLevel}%
          </span>
          <button
            onClick={handleZoomIn}
            className="btn btn-ghost btn-sm"
            title="Perbesar"
            style={{ padding: '4px 6px' }}
          >
            <Plus size={13} />
          </button>
          <button
            onClick={handleResetZoom}
            className="btn btn-ghost btn-sm"
            title="Reset Zoom 100%"
            style={{ padding: '4px 6px' }}
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      {/* Sheet Viewport */}
      <div className="preview-viewport">
        <div
          id="resume-sheet-container"
          className="resume-sheet"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            fontFamily: getFontFamilyCSS(resume.settings?.fontFamily),
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
