import React, { useState } from 'react';
import Icon from './AppIcon';

const HomeStyleSelector = ({ currentStyle, onStyleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = [
    { id: 'style1', name: 'Classic Layout', desc: 'Traditional e-commerce design', preview: '🏪' },
    { id: 'style2', name: 'Modern Gradient', desc: 'Contemporary with gradients', preview: '🎨' },
    { id: 'style3', name: 'Minimal Clean', desc: 'Clean and minimalist', preview: '✨' },
    { id: 'style4', name: 'Deal Focused', desc: 'E-commerce with deals', preview: '🔥' }
  ];

  return (
    <div className="fixed bottom-20 left-2 z-50">
      <div className={`mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <div className="bg-white rounded-lg shadow-xl border p-4 w-64">
          <h3 className="font-heading font-bold text-sm mb-3 text-text-primary">Choose Home Style</h3>
          <div className="space-y-2">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => {
                  onStyleChange(style.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-3 rounded-lg transition-all ${currentStyle === style.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-50 hover:bg-gray-100 text-text-primary'
                  }`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">{style.preview}</span>
                  <div>
                    <div className="font-medium text-sm">{style.name}</div>
                    <div className={`text-xs ${currentStyle === style.id ? 'text-white/80' : 'text-text-secondary'}`}>
                      {style.desc}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      >
        <Icon name={isOpen ? "X" : "Palette"} size={20} />
      </button>
    </div>
  );
};

export default HomeStyleSelector;