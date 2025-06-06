import React from 'react';
import { FilePlus2, FileText, Languages, Server, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: '高品質な変換',
    description: '元のレイアウトとフォーマットを維持した高精度な変換を実現します。'
  },
  {
    icon: Languages,
    title: '多言語対応',
    description: '日本語を含む多言語のテキスト変換に対応しています。'
  },
  {
    icon: Server,
    title: 'バッチ処理',
    description: '複数ファイルの一括変換により、作業効率を大幅に向上させます。'
  },
  {
    icon: Shield,
    title: 'セキュリティ',
    description: 'ファイルはローカルで処理され、安全に保護されます。'
  },
  {
    icon: Zap,
    title: '高速処理',
    description: '最適化されたアルゴリズムによる迅速な変換処理を実現します。'
  },
  {
    icon: FilePlus2,
    title: '多様な形式',
    description: 'Word、テキスト、画像など様々な形式に対応しています。'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">主な機能</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            当PDFコンバーターは、高品質な変換と豊富な機能を提供し、文書作業の効率化をサポートします。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <feature.icon size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;