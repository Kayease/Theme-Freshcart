import React, { useEffect } from 'react';
import Icon from '../AppIcon';

const Toast = ({ type, message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  const icons = {
    success: 'CheckCircle',
    error: 'XCircle',
    warning: 'AlertTriangle',
    info: 'Info'
  };

  return (
    <div className={`${typeStyles[type]} rounded-lg p-4 shadow-lg flex items-center space-x-3 min-w-[300px] animate-slide-in`}>
      <Icon name={icons[type]} size={20} />
      <span className="flex-1 font-medium">{message}</span>
      <button onClick={onClose} className="hover:opacity-70">
        <Icon name="X" size={16} />
      </button>
    </div>
  );
};

export default Toast;