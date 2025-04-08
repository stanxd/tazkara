
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
    <div className="space-y-4"> {/* تقليل المساحة بين المكونات */}
      <PricingSummary recommendation={recommendation} />
      
      {/* PriceOptimizationChart */}
      <div className="border rounded-lg p-2"> {/* تقليل حجم الحاوية */}
        <PriceOptimizationChart 
          recommendedPrice={recommendation.recommendedPrice} 
          matchData={matchData} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3"> {/* ترتيب المكونات بجانب بعضها على الشاشات الكبيرة */}
        <PricingFactors matchData={matchData} />
        <PricingNotes notes={recommendation.notes} />
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onClose} size="sm">
          إلغاء
        </Button>
        <Button 
          onClick={onApplyPrice}
          className="bg-tazkara-green hover:bg-tazkara-green/90"
          size="sm"
        >
          تطبيق السعر الموصى به
        </Button>
      </div>
    </div>
  );
};

export default PricingRecommendationContent;
