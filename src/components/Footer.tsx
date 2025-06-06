import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} PDF Converter. All rights reserved.</p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <Github size={20} />
            </a>
            <span className="flex items-center text-gray-400">
              Made with <Heart size={16} className="mx-1 text-red-500" /> by Developer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;