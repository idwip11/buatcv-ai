import { NextRequest, NextResponse } from 'next/server';
import { extractInfoFromLinkedInText, extractStructuredTextFromPdfDocument } from '@/utils/linkedinParser';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Tidak ada file yang diunggah. Silakan pilih file PDF LinkedIn.' },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, error: 'Format file tidak didukung. Harap unggah file dokumen PDF (.pdf).' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const path = await import('path');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');
    pdfjs.GlobalWorkerOptions.workerSrc = path.resolve(process.cwd(), 'node_modules/pdfjs-dist/legacy/build/pdf.worker.js');

    const loadingTask = pdfjs.getDocument({
      data: uint8Array,
      useSystemFonts: true,
      disableFontFace: true,
    });

    const pdfDocument = await loadingTask.promise;
    const extractedText = await extractStructuredTextFromPdfDocument(pdfDocument);

    if (!extractedText.trim()) {
      return NextResponse.json(
        { success: false, error: 'Gagal mengekstrak teks dari PDF. Pastikan file bukan hasil scan gambar murni.' },
        { status: 422 }
      );
    }

    const parsedProfile = extractInfoFromLinkedInText(extractedText);

    return NextResponse.json({
      success: true,
      message: 'File PDF LinkedIn berhasil diproses di server backend.',
      filename: file.name,
      pageCount: pdfDocument.numPages,
      profile: parsedProfile,
    });
  } catch (error: any) {
    console.error('Backend PDF parse error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Terjadi kesalahan saat memproses file PDF di backend server.',
      },
      { status: 500 }
    );
  }
}
