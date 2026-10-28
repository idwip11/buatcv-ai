'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useResumeStore } from '@/store/useResumeStore';
import { Navbar } from '@/components/Navbar';
import { BuilderPanel } from '@/components/builder/BuilderPanel';
import { ResumePreview } from '@/components/preview/ResumePreview';
import { LinkedInModal } from '@/components/common/LinkedInModal';
import { Github } from 'lucide-react';

function BuilderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { applyLinkedInProfile } = useResumeStore();

  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    // Check for LinkedIn OAuth Success Callback
    const linkedinSuccess = searchParams.get('linkedin_success');
    const profileDataStr = searchParams.get('profile');

    if (linkedinSuccess === '1' && profileDataStr) {
      try {
        const decoded = JSON.parse(decodeURIComponent(profileDataStr));
        applyLinkedInProfile({
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          email: decoded.email,
          avatarUrl: decoded.avatarUrl,
          headline: decoded.headline || '',
        });
        // Clean URL
        router.replace('/');
      } catch (e) {
        console.error('Failed to parse LinkedIn OAuth profile data:', e);
      }
    }

    // Check if user was redirected for Demo mode
    const isDemo = searchParams.get('linkedin');
    if (isDemo === 'demo') {
      setIsLinkedInModalOpen(true);
      router.replace('/');
    }
  }, [searchParams, router, applyLinkedInProfile]);

  if (!isHydrated) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-app)',
          gap: '12px',
        }}
      >
        <div className="brand-mark" style={{ width: '32px', height: '32px', fontSize: '0.82rem' }}>
          CV
        </div>
        <div
          style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          Memuat ruang kerja...
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar onOpenLinkedInModal={() => setIsLinkedInModalOpen(true)} />

      {/* Mobile Tab Switcher (Visible on small screens) */}
      <div
        style={{
          display: 'none',
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '8px 16px',
          justifyContent: 'center',
          gap: '8px',
        }}
        className="mobile-tab-bar"
      >
        <button
          onClick={() => setMobileTab('editor')}
          className={`btn btn-sm ${mobileTab === 'editor' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <span>Editor</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`btn btn-sm ${mobileTab === 'preview' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <span>Preview A4</span>
        </button>
      </div>

      {/* Main Split-Screen Workspace */}
      <main className="workspace-container">
        <div className={`workspace-col workspace-col-builder ${mobileTab === 'preview' ? 'mobile-hidden' : ''}`}>
          <BuilderPanel onOpenLinkedInModal={() => setIsLinkedInModalOpen(true)} />
        </div>
        <div className={`workspace-col workspace-col-preview ${mobileTab === 'editor' ? 'mobile-hidden' : ''}`}>
          <ResumePreview />
        </div>
      </main>

      {/* App Bottom Footer */}
      <footer className="app-footer">
        <div className="app-footer-left">
          <span className="app-footer-brand">BuatCV</span>
          <span className="app-footer-divider">/</span>
          <span className="app-footer-desc">ATS-Friendly Resume Builder</span>
        </div>

        <div className="app-footer-right">
          <span>Design by</span>
          <a
            href="https://github.com/idwip11"
            target="_blank"
            rel="noopener noreferrer"
            className="app-footer-link"
          >
            <Github size={12} />
            <span>idwip11</span>
          </a>
        </div>
      </footer>

      {/* LinkedIn Modal */}
      <LinkedInModal isOpen={isLinkedInModalOpen} onClose={() => setIsLinkedInModalOpen(false)} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ height: '100vh', background: '#faf9f6' }} />}>
      <BuilderContent />
    </Suspense>
  );
}
