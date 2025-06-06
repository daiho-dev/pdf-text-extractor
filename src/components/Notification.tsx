import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({ 
  type, 
  message, 
  onClose,
  duration = 5000
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500\" size={20} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={20} />;
      case 'info':
        return <Info className="text-blue-500" size={20} />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div 
      className={`fixed top-4 right-4 max-w-sm w-full p-4 rounded-lg shadow-lg border 
        ${getBgColor()} 
        transition-opacity duration-300 
        ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-800">{message}</p>
        </div>
        <button 
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Notification;

export { Notification }