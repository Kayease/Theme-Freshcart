import React, { useMemo, useState } from 'react';

const DeliveryTimeSlot = ({ onSlotSelect }) => {
  const options = useMemo(() => ([
    { id: 'standard', label: 'Standard Delivery (2-3 hours)', eta: '2-3 hours', price: 4.99 },
    { id: 'express', label: 'Express Delivery (30-60 minutes)', eta: '30-60 minutes', price: 9.99, badge: 'EXPRESS' }
  ]), []);

  const [selectedId, setSelectedId] = useState('');

  const headerEta = useMemo(() => {
    const cur = options.find(o => o.id === selectedId);
    return `Estimated delivery: ${cur?.eta || '2-3 hours'}`;
  }, [selectedId, options]);

  const handleSelect = (opt) => {
    setSelectedId(opt.id);
    if (typeof onSlotSelect === 'function') onSlotSelect(opt);
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-1">
        Delivery
      </h3>
      <p className="text-sm text-text-secondary mb-6">{headerEta}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt)}
            className={`p-4 rounded-card border text-left transition-smooth relative ${selectedId === opt.id ? 'border-primary bg-primary/5' : 'border-border bg-surface hover:border-primary/50'}`}
          >
            {opt.badge && (
              <div className="absolute -top-2 left-3 bg-accent text-accent-foreground text-xs font-caption px-2 py-1 rounded-full">
                {opt.badge}
              </div>
            )}

            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-body font-body-medium text-text-primary">{opt.label}</span>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedId === opt.id ? 'border-primary bg-primary' : 'border-border'}`}>
                {selectedId === opt.id && (
                  <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">ETA {opt.eta}</span>
              <span className="text-lg font-data font-data-medium text-primary">${opt.price.toFixed(2)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeliveryTimeSlot;