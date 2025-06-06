import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ConversionSection from './components/ConversionSection';
import FeaturesSection from './components/FeaturesSection';
import HelpSection from './components/HelpSection';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PDFドキュメント変換ツール
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              高品質なPDF変換・作成を簡単に。レイアウトを維持したまま、様々な形式への変換が可能です。
            </p>
            <a 
              href="#convert" 
              className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md font-medium inline-block transition-colors duration-200"
            >
              今すぐ変換する
            </a>
          </div>
        </section>
        
        <FeaturesSection />
        <ConversionSection />
        <HelpSection />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;