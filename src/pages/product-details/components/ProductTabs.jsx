import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description', icon: 'FileText' },
    { id: 'nutrition', label: 'Nutrition', icon: 'Activity' },
    { id: 'ingredients', label: 'Ingredients', icon: 'List' },
    { id: 'allergens', label: 'Allergens', icon: 'AlertTriangle' },
  ];

  const renderNutritionTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 font-body-medium text-text-primary">Nutrient</th>
            <th className="text-right py-2 font-body-medium text-text-primary">Per 100g</th>
            <th className="text-right py-2 font-body-medium text-text-primary">% Daily Value</th>
          </tr>
        </thead>
        <tbody>
          {product.nutrition?.map((item, index) => (
            <tr key={index} className="border-b border-border-light">
              <td className="py-2 font-body text-text-primary">{item.name}</td>
              <td className="text-right py-2 font-data text-text-primary">{item.amount}</td>
              <td className="text-right py-2 font-data text-text-secondary">{item.dailyValue || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderIngredientsList = () => (
    <div className="space-y-3">
      <p className="text-sm font-body text-text-secondary">
        Ingredients are listed in order of quantity (highest to lowest):
      </p>
      <div className="flex flex-wrap gap-2">
        {product.ingredients?.map((ingredient, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm font-body text-text-primary"
          >
            {ingredient}
          </span>
        ))}
      </div>
    </div>
  );

  const renderAllergens = () => (
    <div className="space-y-4">
      {product.allergens && product.allergens.length > 0 ? (
        <>
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <Icon name="AlertTriangle" size={20} className="text-red-600" />
            <span className="font-body-medium text-red-800">
              Contains allergens
            </span>
          </div>
          <div className="space-y-2">
            {product.allergens.map((allergen, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-red-500" />
                <span className="font-body text-text-primary">{allergen}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <Icon name="CheckCircle" size={20} className="text-green-600" />
          <span className="font-body-medium text-green-800">
            No known allergens
          </span>
        </div>
      )}
      
      <p className="text-xs font-caption text-text-secondary">
        Please check the product packaging for the most up-to-date allergen information.
      </p>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <p className="font-body text-text-primary leading-relaxed">
              {product.description}
            </p>
            {product.features && (
              <div className="space-y-2">
                <h4 className="font-body-medium text-text-primary">Features:</h4>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="font-body text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      case 'nutrition':
        return renderNutritionTable();
      case 'ingredients':
        return renderIngredientsList();
      case 'allergens':
        return renderAllergens();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-body-medium text-sm transition-smooth whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;