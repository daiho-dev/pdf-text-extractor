import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
//import workerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.js?url';

// PDF.jsワーカーのURL文字列を設定（Viteでは ?url が必要）
GlobalWorkerOptions.workerSrc = workerUrl;

// PDFファイルからテキストを抽出し、文字化けを防ぐ関数
export const extractPdfText = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;

  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => {
        const textItem = item as { str?: string };
        if (typeof textItem.str === 'string') {
          try {
            return decodeURIComponent(escape(textItem.str));
          } catch {
            return textItem.str;
          }
        }
        return '';
      })
      .join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
};