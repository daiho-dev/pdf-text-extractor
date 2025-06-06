import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'どの形式のファイルに対応していますか？',
    answer: 'PDF形式のファイルから、Word (.docx)、テキスト (.txt)、画像 (PNG/JPG) への変換に対応しています。また、Word文書や画像ファイルからPDFを作成することも可能です。'
  },
  {
    question: '複数のファイルを一度に変換できますか？',
    answer: 'はい、複数のファイルを一度にアップロードして、バッチ処理で効率的に変換することができます。'
  },
  {
    question: '変換したファイルはどこに保存されますか？',
    answer: '変換されたファイルは自動的にダウンロードされます。デフォルトではブラウザの設定に従ってダウンロードフォルダに保存されます。'
  },
  {
    question: '日本語を含むPDFも正しく変換できますか？',
    answer: 'はい、日本語を含む多言語のPDFファイルに対応しています。文字化けなどの問題なく変換できるよう最適化されています。'
  },
  {
    question: 'ファイルサイズの制限はありますか？',
    answer: '現在のバージョンでは、最大50MBまでのファイルを処理することができます。より大きなファイルについては、分割してご利用いただくことをお勧めします。'
  }
];

const HelpSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="help" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <HelpCircle size={48} className="text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">よくある質問</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            PDFコンバーターの使用方法や機能についてのよくある質問にお答えします。
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={20} className="text-blue-600" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </button>
              
              <div 
                className={`px-6 py-4 bg-gray-50 transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 hidden'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">さらに質問がありますか？</p>
          <a 
            href="mailto:support@pdfconverter.com" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            サポートにお問い合わせ
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;