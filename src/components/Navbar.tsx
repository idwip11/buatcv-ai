import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { TemplateType, FontFamilyType, getFontFamilyCSS } from '@/types/resume';
import { downloadResumePdf, printResume } from '@/utils/pdfExport';
import {
  FileText,
  Download,
  Printer,
  Linkedin,
  Palette,
  Type,
  LayoutTemplate,
  RefreshCw,
  Check,
} from 'lucide-react';

interface NavbarProps {
  onOpenLinkedInModal: () => void;
}

const colorPresets = [
  { name: 'Royal Blue', value: '#2563eb' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Violet Indigo', value: '#7c3aed' },
  { name: 'Crimson Rose', value: '#e11d48' },
  { name: 'Amber Gold', value: '#d97706' },
  { name: 'Ocean Cyan', value: '#0891b2' },
  { name: 'Slate Executive', value: '#334155' },
];

const fontPresets: FontFamilyType[] = [
  'Inter',
  'Plus Jakarta Sans',
  'Merriweather',
  'Outfit',
  'JetBrains Mono',
];

const templatePresets: { id: TemplateType; name: string; tag: string }[] = [
  { id: 'modern', name: 'ATS Classic', tag: 'Centered • Most Popular' },
  { id: 'minimalist', name: 'ATS Clean', tag: 'Left-Aligned • Compact' },
  { id: 'executive', name: 'ATS Professional', tag: 'Serif • Corporate' },
  { id: 'tech', name: 'ATS Tech', tag: 'Skills-First • Developer' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenLinkedInModal }) => {
  const {
    resume,
    updateResumeTitle,
    updateSettings,
    resetToSample,
    loadResumeData,
    isLinkedInConnected,
    linkedInAccount,
  } = useResumeStore();

  const [isExporting, setIsExporting] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const handleDownloadPdf = async () => {
    setIsExporting(true);
    const sanitizedName = (resume.personalInfo.firstName + '_' + resume.personalInfo.lastName + '_CV')
      .replace(/[^a-z0-9_]/gi, '')
      .toLowerCase();
    await downloadResumePdf('resume-sheet-container', `${sanitizedName || 'my_cv'}.pdf`);
    setIsExporting(false);
  };

  return (
    <nav className="navbar">
      {/* Brand & Resume Title */}
      <div className="brand-section">
        <div className="brand-badge" style={{ cursor: 'default' }}>
          <img
            src="/logo-dark.png"
            alt="BuatCV AI"
            style={{
              height: '34px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        <input
          type="text"
          value={resume.title}
          onChange={(e) => updateResumeTitle(e.target.value)}
          className="brand-title-input"
          title="Click to rename resume"
          placeholder="Untitled Resume"
        />
      </div>

      {/* Quick Design Bar: Template, Color, Font */}
      <div className="nav-controls">
        {/* Template Selector Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowTemplateMenu(!showTemplateMenu);
              setShowColorMenu(false);
              setShowFontMenu(false);
            }}
            className="btn btn-secondary btn-sm"
          >
            <LayoutTemplate size={15} />
            <span>Template</span>
          </button>
          {showTemplateMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '8px',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '10px',
                padding: '8px',
                width: '210px',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 60,
              }}
            >
              {templatePresets.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    updateSettings({ template: tmpl.id });
                    setShowTemplateMenu(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: resume.settings.template === tmpl.id ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                    border: 'none',
                    color: resume.settings.template === tmpl.id ? '#60a5fa' : '#e2e8f0',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '4px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem' }}>{tmpl.name}</span>
                    {resume.settings.template === tmpl.id && <Check size={14} />}
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{tmpl.tag}</span>
                </button>
              ))}
            </div>
          )}
        </div>


        {/* Font Picker */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowFontMenu(!showFontMenu);
              setShowColorMenu(false);
              setShowTemplateMenu(false);
            }}
            className="btn btn-secondary btn-sm"
          >
            <Type size={15} />
            <span>{resume.settings.fontFamily}</span>
          </button>
          {showFontMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '8px',
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '10px',
                padding: '8px',
                width: '170px',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 60,
              }}
            >
              {fontPresets.map((font) => (
                <button
                  key={font}
                  onClick={() => {
                    updateSettings({ fontFamily: font });
                    setShowFontMenu(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: resume.settings.fontFamily === font ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                    border: 'none',
                    color: resume.settings.fontFamily === font ? '#60a5fa' : '#e2e8f0',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    fontFamily: getFontFamilyCSS(font),
                  }}
                >
                  {font}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* LinkedIn Connection Status / Action */}
        {/* LinkedIn PDF Import Action */}
        <button
          onClick={onOpenLinkedInModal}
          className={`btn btn-sm ${isLinkedInConnected ? 'btn-secondary' : 'btn-linkedin'}`}
          title="Auto-Fill dari LinkedIn PDF"
        >
          <Linkedin size={15} />
          <span>{isLinkedInConnected ? linkedInAccount?.name?.split(' ')[0] || 'Terisi' : 'Import LinkedIn PDF'}</span>
        </button>

        {/* Print Button */}
        <button onClick={printResume} className="btn btn-secondary btn-sm" title="Print Resume">
          <Printer size={15} />
        </button>

        {/* Primary Download PDF */}
        <button
          onClick={handleDownloadPdf}
          disabled={isExporting}
          className="btn btn-primary"
        >
          <Download size={16} />
          <span>{isExporting ? 'Generating...' : 'Download PDF'}</span>
        </button>
      </div>
    </nav>
  );
};
