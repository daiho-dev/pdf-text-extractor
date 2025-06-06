import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.js?url';

GlobalWorkerOptions.workerSrc = workerUrl;

export const convertPdfToImages = async (file: File): Promise<Blob[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;

  const imageBlobs: Blob[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 }); // 拡大倍率調整可
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context!, viewport }).promise;

    // canvas → Blob（PNG）
    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((blob) => resolve(blob!), 'image/png')
    );

    imageBlobs.push(blob);
  }

  return imageBlobs;
};
