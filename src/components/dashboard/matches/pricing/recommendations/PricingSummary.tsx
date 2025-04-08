
import React from 'react';
import { PricingModelOutput } from '../../pricing';

interface PricingSummaryProps {
  recommendation: PricingModelOutput;
}

const PricingSummary: React.FC<PricingSummaryProps> = ({ recommendation }) => {
  const getSelloutProbabilityText = (probability: string) => {
    switch(probability) {
      case 'Very High': return 'عالية جداً';
      case 'High': return 'عالية';
      case 'Medium': return 'متوسطة';
      case 'Low': return 'منخفضة';
      default: return 'متوسطة';
    }
  };
  
  const getSelloutProbabilityColor = (probability: string) => {
    switch(probability) {
      case 'Very High': return 'text-green-600';
      case 'High': return 'text-green-500';
      case 'Medium': return 'text-blue-500';
      case 'Low': return 'text-amber-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded-lg p-4 text-center">
        <h3 className="text-lg font-medium">السعر الموصى به</h3>
        <div className="text-3xl font-bold text-tazkara-green">
          {recommendation.recommendedPrice} ر.س
        </div>
        <div className="mt-2 text-sm text-gray-500">
          درجة الثقة: {Math.round(recommendation.confidenceScore * 100)}%
        </div>
      </div>
      
      <div className="border rounded-lg p-4 text-center">
        <h3 className="text-lg font-medium">احتمالية نفاد التذاكر</h3>
        <div className={`text-3xl font-bold ${getSelloutProbabilityColor(recommendation.selloutProbability)}`}>
          {getSelloutProbabilityText(recommendation.selloutProbability)}
        </div>
      </div>
    </div>
  );
};

export default PricingSummary;
