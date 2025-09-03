import React, { useState, useEffect } from 'react';
import Icon from './AppIcon';

const AppLoader = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingSteps = [
    { progress: 20, text: 'Loading components...' },
    { progress: 40, text: 'Setting up store...' },
    { progress: 60, text: 'Preparing products...' },
    { progress: 80, text: 'Finalizing setup...' },
    { progress: 100, text: 'Ready!' }
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setProgress(loadingSteps[currentStep].progress);
        setLoadingText(loadingSteps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => onLoadComplete?.(), 500);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-50 flex items-center justify-center">
      <div className="text-center max-w-sm mx-4">
        {/* Logo and Spinner */}
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-border rounded-full animate-spin border-t-primary mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-card">
              <Icon name="ShoppingBag" size={24} color="white" />
            </div>
          </div>
        </div>

        {/* Brand */}
        <h1 className="font-heading font-heading-bold text-3xl text-primary mb-2">FreshCart</h1>
        <p className="text-text-secondary font-body mb-8">Your Fresh Shopping Experience</p>

        {/* Progress Bar */}
        <div className="w-full bg-border rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading Text */}
        <p className="text-text-secondary font-body text-sm">{loadingText}</p>
      </div>
    </div>
  );
};

export default AppLoader;