import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ConversionOptionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
}

const ConversionOption: React.FC<ConversionOptionProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick,
  disabled = false
}) => {
  return (
    <button
      className={`flex flex-col items-center p-4 rounded-lg border border-gray-200 transition-all duration-200 w-full 
        ${disabled 
          ? 'bg-gray-100 cursor-not-allowed opacity-60' 
          : 'hover:border-blue-500 hover:shadow-md bg-white'
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="bg-blue-100 p-3 rounded-full mb-3">
        <Icon size={24} className="text-blue-600" />
      </div>
      <h3 className="font-medium text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-1 text-center">{description}</p>
    </button>
  );
};

export default ConversionOption;