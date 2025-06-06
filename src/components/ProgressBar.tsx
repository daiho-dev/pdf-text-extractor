import React from 'react';

interface ProgressBarProps {
  progress: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  // Ensure progress is between 0 and 100
  const validProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="w-full">
      {label && <div className="mb-1 text-sm flex justify-between">
        <span>{label}</span>
        <span className="font-medium">{validProgress.toFixed(0)}%</span>
      </div>}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${validProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;