import React, { useState } from 'react';
import { FileText, Image, FileType, File } from 'lucide-react';
import FileUploader from './FileUploader';
import ConversionOption from './ConversionOption';
import ProgressBar from './ProgressBar';
import { Notification, NotificationType } from './Notification';
// @ts-expect-error:pdfjs-distの型定義がないため無視（getDocument, GlobalWorkerOptionsの読み込み）
import { extractPdfText } from '../utils/extractPdfText'; // パスは実際の構成に合わせて
import { convertToWord } from '../utils/convertToWord';
import { convertPdfToImages } from '../utils/convertPdfToImages';

const ConversionSection: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState<boolean>(false);
  const [conversionProgress, setConversionProgress] = useState<number>(0);
  const [notifications, setNotifications] = useState<Array<{ id: string; type: NotificationType; message: string }>>([]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const showNotification = (type: NotificationType, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { id, type, message }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleConversion = async (format: string, formatName: string) => {
  if (selectedFiles.length === 0) {
    showNotification('error', 'ファイルが選択されていません。');
    return;
  }

  setConverting(true);
  setConversionProgress(0);

  try {
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileProgress = (i / selectedFiles.length) * 100;
      setConversionProgress(fileProgress);

      if (format === 'docx') {
        const extractedText = await extractPdfText(file);
        await convertToWord(extractedText, `${file.name.split('.')[0]}.docx`);
      } else if (format === 'txt') {
        const extractedText = await extractPdfText(file);
        const convertedBlob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });

        const url = URL.createObjectURL(convertedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${file.name.split('.')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      else if (format === 'png') {
        const imageBlobs = await convertPdfToImages(file);
        for (let j = 0; j < imageBlobs.length; j++) {
          const blob = imageBlobs[j];
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${file.name.split('.')[0]}_page${j + 1}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }
    }

    setConversionProgress(100);
    showNotification('success', `${selectedFiles.length}個のファイルを${formatName}に変換しました。`);
  } catch (error) {
    showNotification('error', '変換中にエラーが発生しました。');
    console.error('Conversion error:', error);
  } finally {
    setTimeout(() => {
      setConverting(false);
      setConversionProgress(0);
    }, 1000);
  }
};

  return (
    <section id="convert" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">PDFからの変換</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <FileUploader
            acceptedFileTypes=".pdf"
            multiple={true}
            onFilesSelected={handleFilesSelected}
            title="PDFファイルをドロップ"
            subtitle="または、クリックしてファイルを選択"
          />
          
          {converting && (
            <div className="mt-6">
              <ProgressBar 
                progress={conversionProgress} 
                label="変換中..." 
              />
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">変換形式を選択</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ConversionOption
                title="Wordに変換"
                description="PDFをWord (.docx)形式に変換"
                icon={FileText}
                onClick={() => handleConversion('docx', 'Word')}
                disabled={converting || selectedFiles.length === 0}
              />
              <ConversionOption
                title="テキストに変換"
                description="PDFをテキスト (.txt)形式に変換"
                icon={FileType}
                onClick={() => handleConversion('txt', 'テキスト')}
                disabled={converting || selectedFiles.length === 0}
              />
              <ConversionOption
                title="画像に変換"
                description="PDFを画像 (PNG)形式に変換"
                icon={Image}
                onClick={() => handleConversion('png', '画像')}
                disabled={converting || selectedFiles.length === 0}
              />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-gray-800">PDFの作成</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <FileUploader
            acceptedFileTypes=".docx,.png,.jpg,.jpeg,.tiff"
            multiple={true}
            onFilesSelected={handleFilesSelected}
            title="ファイルをドロップ"
            subtitle="Word文書(.docx)や画像ファイル(PNG/JPG)をアップロード"
          />
          
          {converting && (
            <div className="mt-6">
              <ProgressBar 
                progress={conversionProgress} 
                label="作成中..." 
              />
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">PDFを作成</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ConversionOption
                title="PDFに変換"
                description="選択したファイルからPDFを作成"
                icon={File}
                onClick={() => handleConversion('pdf', 'PDF')}
                disabled={converting || selectedFiles.length === 0}
              />
            </div>
          </div>
        </div>
      </div>
      
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </section>
  );
};

export default ConversionSection;