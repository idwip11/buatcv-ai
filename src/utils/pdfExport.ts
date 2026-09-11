import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumeData } from '@/types/resume';

/**
 * Triggers native high-fidelity browser print dialog.
 * When printed, CSS @media print guarantees exact vector fonts and zero pixelation.
 */
export function printResume(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}

/**
 * Finds intelligent page break points to avoid awkwardly slicing headings,
 * experience items, or bullet points in half between A4 pages.
 */
function findSmartBreakPoints(container: HTMLElement, pageHeightPx: number): number[] {
  const containerRect = container.getBoundingClientRect();
  const totalHeight = container.scrollHeight || container.offsetHeight;

  // If content fits within 1 page (with small tolerance)
  if (totalHeight <= pageHeightPx + 20) {
    return [totalHeight];
  }

  // Collect candidate break elements (headings, section blocks, list items, paragraphs)
  const candidates = container.querySelectorAll(
    'h1, h2, h3, h4, section, p, li, [data-break-avoid], div[style*="borderBottom"], div[style*="border-bottom"]'
  );

  const candidateTops: number[] = [];
  candidates.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const top = rect.top - containerRect.top;
    // Skip elements too close to the top or bottom
    if (top > 50 && top < totalHeight - 20) {
      candidateTops.push(Math.round(top));
    }
  });

  candidateTops.sort((a, b) => a - b);

  const breakPoints: number[] = [];
  let currentY = 0;

  while (currentY + pageHeightPx < totalHeight) {
    const idealBreak = currentY + pageHeightPx;
    let bestBreak = idealBreak;

    // Look for a break candidate up to 180px before idealBreak to avoid cutting through an element
    for (let i = candidateTops.length - 1; i >= 0; i--) {
      const top = candidateTops[i];
      if (top > currentY + 140 && top <= idealBreak && top >= idealBreak - 180) {
        bestBreak = top;
        break;
      }
    }

    breakPoints.push(bestBreak);
    currentY = bestBreak;
  }

  // Final boundary
  breakPoints.push(totalHeight);
  return breakPoints;
}

/**
 * Client-side multi-page PDF download using html2canvas and jsPDF.
 * Renders multi-page A4 resume sheets with zero content cut-off.
 * Every page is exported in standard A4 portrait dimensions (210mm x 297mm).
 */
export async function downloadResumePdf(
  elementId: string = 'resume-sheet-container',
  fileName: string = 'My_Resume.pdf'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    // 1. Temporarily reset zoom scale transform to measure and capture at native resolution
    const originalTransform = element.style.transform;
    element.style.transform = 'none';

    // Native layout dimensions
    const originalWidth = element.offsetWidth || 794;
    const totalHeight = element.scrollHeight || element.offsetHeight || 1123;

    // Standard A4 aspect ratio: 297mm / 210mm = 1.4142857
    // In CSS pixels at 96 DPI: 794px width -> 1123px height
    const a4PageHeightPx = Math.round(originalWidth * (297 / 210));

    // Calculate smart page break points
    const breakPoints = findSmartBreakPoints(element, a4PageHeightPx);

    // 2. High-resolution canvas capture of entire document
    const canvas = await html2canvas(element, {
      scale: 2.5, // 2.5x retina scaling for crystal crisp text
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      width: originalWidth,
      height: totalHeight,
    });

    // Restore original transform
    element.style.transform = originalTransform;

    // 3. Initialize jsPDF with standard A4 format
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const scale = canvas.width / originalWidth;
    const pdfA4WidthMm = 210;

    // 4. Slice canvas and populate pages
    let prevBreakY = 0;
    for (let pageIdx = 0; pageIdx < breakPoints.length; pageIdx++) {
      const currentBreakY = breakPoints[pageIdx];
      const sliceHeightDom = currentBreakY - prevBreakY;

      if (sliceHeightDom <= 0) continue;

      const srcY = Math.round(prevBreakY * scale);
      const srcH = Math.min(Math.round(sliceHeightDom * scale), canvas.height - srcY);

      if (srcH <= 0) break;

      // Create an offscreen canvas for this slice
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = srcH;

      const ctx = pageCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          srcY,
          canvas.width,
          srcH,
          0,
          0,
          pageCanvas.width,
          pageCanvas.height
        );
      }

      const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);

      // If beyond page 1, create a new A4 page
      if (pageIdx > 0) {
        pdf.addPage('a4', 'portrait');
      }

      // Height on the PDF page in mm
      const renderHeightMm = (pageCanvas.height * pdfA4WidthMm) / pageCanvas.width;

      pdf.addImage(pageImgData, 'JPEG', 0, 0, pdfA4WidthMm, renderHeightMm, undefined, 'FAST');

      prevBreakY = currentBreakY;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to window.print if html2canvas encounters issues
    printResume();
    return false;
  }
}

/**
 * Backup / Export full resume data as a JSON file (100% database-less persistence)
 */
export function exportResumeToJson(resumeData: ResumeData): void {
  const dataStr = JSON.stringify(resumeData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  const sanitizedTitle = (resumeData.title || 'Resume').replace(/[^a-z0-9]/gi, '_').toLowerCase();
  link.download = `${sanitizedTitle}_backup.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Import and parse a JSON backup file
 */
export function readResumeJsonFile(file: File): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (!json.personalInfo) {
          throw new Error('Invalid resume JSON format: missing personalInfo');
        }
        resolve(json as ResumeData);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}
