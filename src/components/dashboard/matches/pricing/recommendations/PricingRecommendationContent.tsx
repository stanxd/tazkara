
import React from 'react';
import { PricingModelInput, PricingModelOutput } from '../../pricing';
import PriceOptimizationChart from '../charts/PriceOptimizationChart';
import PricingSummary from './PricingSummary';
import PricingFactors from './PricingFactors';
import PricingNotes from './PricingNotes';
import { Button } from '@/components/ui/button';

interface PricingRecommendationContentProps {
  matchData: Partial<PricingModelInput>;
  recommendation: PricingModelOutput;
  onApplyPrice: () => void;
  onClose: () => void;
}

const PricingRecommendationContent: React.FC<PricingRecommendationContentProps> = ({
  matchData,
  recommendation,
  onApplyPrice,
  onClose
}) => {
  return (
    <div className="space-y-6">
      <PricingSummary recommendation={recommendation} />
      
      {/* PriceOptimizationChart */}
      <div className="border rounded-lg p-4">
        <PriceOptimizationChart 
          recommendedPrice={recommendation.recommendedPrice} 
          matchData={matchData} 
        />
      </div>
      
      <PricingFactors matchData={matchData} />
      <PricingNotes notes={recommendation.notes} />
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onClose}>
          إلغاء
        </Button>
        <Button 
          onClick={onApplyPrice}
          className="bg-tazkara-green hover:bg-tazkara-green/90"
        >
          تطبيق السعر الموصى به
        </Button>
      </div>
    </div>
  );
};

export default PricingRecommendationContent;
