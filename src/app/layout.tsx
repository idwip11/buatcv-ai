import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'BuatCV AI - Modern CV & Resume Builder with LinkedIn Auto-Fill',
  description:
    'Build professional, ATS-friendly resumes in minutes. Features LinkedIn auto-fill, real-time live preview, elegant templates, and zero database overhead.',
  keywords: ['Resume Builder', 'CV Maker', 'LinkedIn Auto-fill', 'ATS Resume', 'Next.js CV Builder'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
