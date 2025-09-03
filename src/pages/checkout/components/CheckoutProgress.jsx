import React from 'react';
import Icon from '../../../components/AppIcon';

const CheckoutProgress = ({ currentStep, completedSteps }) => {
  const steps = [
    { id: 1, name: 'Address', icon: 'MapPin' },
    { id: 2, name: 'Delivery', icon: 'Clock' },
    { id: 3, name: 'Payment', icon: 'CreditCard' },
    { id: 4, name: 'Review', icon: 'CheckCircle' }
  ];

  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      default:
        return 'bg-border-light text-text-secondary border-border';
    }
  };

  const getConnectorClasses = (stepId) => {
    return completedSteps.includes(stepId) ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="bg-surface border border-border rounded-card p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-smooth ${
                getStepClasses(getStepStatus(step.id))
              }`}>
                {getStepStatus(step.id) === 'completed' ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <span className={`text-xs font-caption mt-2 text-center ${
                getStepStatus(step.id) === 'current' ? 'text-primary font-caption-medium' : 'text-text-secondary'
              }`}>
                {step.name}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <div className={`h-0.5 transition-smooth ${
                  getConnectorClasses(step.id)
                }`}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProgress;