import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const DeliveryInstructions = ({ instructions, onInstructionsChange, tip, onTipChange }) => {
  const [selectedTip, setSelectedTip] = useState(tip || 0);
  const [customTip, setCustomTip] = useState('');

  const tipOptions = [
    { label: '$2', value: 2 },
    { label: '$3', value: 3 },
    { label: '$5', value: 5 },
    { label: 'Custom', value: 'custom' }
  ];

  const handleTipSelect = (value) => {
    if (value === 'custom') {
      setSelectedTip('custom');
      setCustomTip('');
    } else {
      setSelectedTip(value);
      setCustomTip('');
      onTipChange(value);
    }
  };

  const handleCustomTipChange = (value) => {
    setCustomTip(value);
    const numValue = parseFloat(value) || 0;
    onTipChange(numValue);
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-6">
        Additional Information
      </h3>

      {/* Delivery Instructions */}
      <div className="mb-6">
        <label className="block text-sm font-caption text-text-secondary mb-2">
          Special Delivery Instructions
        </label>
        <textarea
          value={instructions || ''}
          onChange={(e) => onInstructionsChange(e.target.value)}
          placeholder="e.g., Leave at front door, Ring doorbell, Call when arrived..."
          className="w-full px-3 py-2 border border-border rounded-button bg-surface text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows="3"
          maxLength="200"
        />
        <p className="text-xs text-text-secondary mt-1">
          {(instructions || '').length}/200 characters
        </p>
      </div>

      {/* Tip Section */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Heart" size={16} className="text-accent" />
          <label className="text-sm font-caption text-text-primary">
            Tip your delivery person (optional)
          </label>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {tipOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleTipSelect(option.value)}
              className={`p-3 rounded-card border text-center transition-smooth ${
                selectedTip === option.value
                  ? 'border-primary bg-primary/5 text-primary' :'border-border bg-surface text-text-primary hover:border-primary/50'
              }`}
            >
              <span className="font-body font-body-medium">{option.label}</span>
            </button>
          ))}
        </div>

        {selectedTip === 'custom' && (
          <div className="mb-4">
            <Input
              type="number"
              placeholder="Enter custom tip amount"
              value={customTip}
              onChange={(e) => handleCustomTipChange(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        )}

        <div className="flex items-center space-x-2 p-3 bg-accent/10 border border-accent/20 rounded-card">
          <Icon name="Info" size={16} className="text-accent" />
          <p className="text-sm text-accent font-caption">
            100% of your tip goes directly to your delivery person
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInstructions;