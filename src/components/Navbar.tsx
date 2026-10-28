import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { TemplateType, FontFamilyType, getFontFamilyCSS } from '@/types/resume';
import { downloadResumePdf, printResume } from '@/utils/pdfExport';
import {
  Download,
  Printer,
  ChevronDown,
  Check,
  ArrowUpRight,
} from 'lucide-react';

interface NavbarProps {
  onOpenLinkedInModal: () => void;
}

const fontPresets: FontFamilyType[] = [
  'Inter',
  'Plus Jakarta Sans',
  'Merriweather',
  'Outfit',
  'JetBrains Mono',
];

const templatePresets: { id: TemplateType; name: string; tag: string }[] = [
  { id: 'modern', name: 'ATS Classic', tag: 'Centered · Standard' },
  { id: 'minimalist', name: 'ATS Clean', tag: 'Left-Aligned · Compact' },
  { id: 'executive', name: 'ATS Professional', tag: 'Serif · Editorial' },
  { id: 'tech', name: 'ATS Tech', tag: 'Skills-First · Engineering' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenLinkedInModal }) => {
  const {
    resume,
    updateResumeTitle,
    updateSettings,
    isLinkedInConnected,
    linkedInAccount,
  } = useResumeStore();

  const [isExporting, setIsExporting] = useState(false);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);

  const currentTemplateName =
    templatePresets.find((t) => t.id === resume.settings.template)?.name || 'Template';

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
          <span className="brand-mark">CV</span>
          <span>BuatCV</span>
        </div>

        <span className="brand-divider">/</span>

        <input
          type="text"
          value={resume.title}
          onChange={(e) => updateResumeTitle(e.target.value)}
          className="brand-title-input"
          title="Klik untuk mengganti judul dokumen"
          placeholder="Untitled Resume"
        />
      </div>

      {/* Quick Design Bar: Template, Font, Actions */}
      <div className="nav-controls">
        {/* Template Selector Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowTemplateMenu(!showTemplateMenu);
              setShowFontMenu(false);
            }}
            className="btn btn-secondary btn-sm"
          >
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>Layout:</span>
            <span>{currentTemplateName}</span>
            <ChevronDown size={13} color="var(--text-muted)" />
          </button>
          {showTemplateMenu && (
            <div className="dropdown-menu" style={{ width: '210px' }}>
              {templatePresets.map((tmpl) => {
                const isActive = resume.settings.template === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      updateSettings({ template: tmpl.id });
                      setShowTemplateMenu(false);
                    }}
                    className={`dropdown-item ${isActive ? 'active' : ''}`}
                    style={{ marginBottom: '2px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: isActive ? 600 : 500, fontSize: '0.8rem', color: 'var(--text-main)' }}>
                        {tmpl.name}
                      </span>
                      {isActive && <Check size={13} color="var(--text-main)" />}
                    </div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                      {tmpl.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Font Picker */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowFontMenu(!showFontMenu);
              setShowTemplateMenu(false);
            }}
            className="btn btn-secondary btn-sm"
          >
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>Font:</span>
            <span>{resume.settings.fontFamily}</span>
            <ChevronDown size={13} color="var(--text-muted)" />
          </button>
          {showFontMenu && (
            <div className="dropdown-menu" style={{ width: '175px' }}>
              {fontPresets.map((font) => {
                const isActive = resume.settings.fontFamily === font;
                return (
                  <button
                    key={font}
                    onClick={() => {
                      updateSettings({ fontFamily: font });
                      setShowFontMenu(false);
                    }}
                    className={`dropdown-item ${isActive ? 'active' : ''}`}
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: isActive ? 600 : 500,
                      fontFamily: getFontFamilyCSS(font),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{font}</span>
                    {isActive && <Check size={13} color="var(--text-main)" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* LinkedIn PDF Import Action */}
        <button
          onClick={onOpenLinkedInModal}
          className="btn btn-linkedin btn-sm"
          title="Impor data dari PDF profil LinkedIn"
        >
          <span>
            {isLinkedInConnected
              ? `LinkedIn: ${linkedInAccount?.name?.split(' ')[0] || 'Aktif'}`
              : 'Import LinkedIn PDF'}
          </span>
          <ArrowUpRight size={13} color="var(--text-muted)" />
        </button>

        {/* Print Button */}
        <button onClick={printResume} className="btn btn-secondary btn-sm" title="Cetak CV">
          <Printer size={14} />
        </button>

        {/* Primary Download PDF */}
        <button
          onClick={handleDownloadPdf}
          disabled={isExporting}
          className="btn btn-primary btn-sm"
          style={{ padding: '6px 13px' }}
        >
          <Download size={14} />
          <span>{isExporting ? 'Menyiapkan...' : 'Download PDF'}</span>
        </button>
      </div>
    </nav>
  );
};
