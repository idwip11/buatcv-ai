import React, { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { TechTemplate } from './templates/TechTemplate';
import { getFontFamilyCSS } from '@/types/resume';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw, Edit3, FileText } from 'lucide-react';

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

  return (
    <div className="preview-panel">
      {/* Preview Top Toolbar */}
      <div className="preview-toolbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8' }}>Live A4 Preview</span>
          <span
            style={{
              fontSize: '0.72rem',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              color: '#34d399',
              padding: '2px 8px',
              borderRadius: '10px',
              fontWeight: 600,
            }}
          >
            ATS {resume.settings.template === 'modern' ? 'CLASSIC' : resume.settings.template === 'minimalist' ? 'CLEAN' : resume.settings.template === 'executive' ? 'PROFESSIONAL' : 'TECH'}
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              backgroundColor: pageCount > 1 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(148, 163, 184, 0.15)',
              color: pageCount > 1 ? '#60a5fa' : '#cbd5e1',
              padding: '2px 8px',
              borderRadius: '10px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid rgba(59, 130, 246, 0.3)',
            }}
            title={`Total ${pageCount} halaman A4 ketika diexport ke PDF`}
          >
            <FileText size={11} />
            <span>{pageCount} Halaman A4</span>
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              color: '#38bdf8',
              padding: '2px 8px',
              borderRadius: '8px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
            }}
            title="Klik langsung teks di lembar CV untuk mengetik atau menghapus"
          >
            <Edit3 size={11} />
            <span>Klik teks di preview untuk edit/hapus langsung</span>
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="preview-scale-controls">
          <button
            onClick={handleZoomOut}
            className="btn btn-secondary btn-sm"
            title="Zoom Out"
            style={{ padding: '4px 8px' }}
          >
            <ZoomOut size={14} />
          </button>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', minWidth: '42px', textAlign: 'center' }}>
            {zoomLevel}%
          </span>
          <button
            onClick={handleZoomIn}
            className="btn btn-secondary btn-sm"
            title="Zoom In"
            style={{ padding: '4px 8px' }}
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={handleResetZoom}
            className="btn btn-ghost btn-sm"
            title="Reset Zoom to 100%"
            style={{ padding: '4px 8px' }}
          >
            <RotateCcw size={13} />
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
