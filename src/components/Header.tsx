import React from 'react';
import { FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText size={28} className="text-white" />
          <h1 className="text-2xl font-bold">PDF Converter</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li className="hover:text-blue-200 transition-colors duration-200">
              <a href="#convert">変換</a>
            </li>
            <li className="hover:text-blue-200 transition-colors duration-200">
              <a href="#create">作成</a>
            </li>
            <li className="hover:text-blue-200 transition-colors duration-200">
              <a href="#help">ヘルプ</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;