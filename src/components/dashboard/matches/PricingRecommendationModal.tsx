
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { PricingModelInput, PricingModelOutput, calculateRecommendedPrice } from './pricing';
import LoadingState from './pricing/recommendations/LoadingState';
import ErrorState from './pricing/recommendations/ErrorState';
import PricingRecommendationContent from './pricing/recommendations/PricingRecommendationContent';
import { calculateImportanceLevel, getMatchType } from './pricing/utils';

interface PricingRecommendationModalProps {
  matchData: Partial<PricingModelInput>;
  onSelectPrice: (price: number) => void;
  disabled?: boolean;
}

const PricingRecommendationModal: React.FC<PricingRecommendationModalProps> = ({
  matchData,
  onSelectPrice,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [recommendation, setRecommendation] = React.useState<PricingModelOutput | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [modelError, setModelError] = React.useState<string | null>(null);
  
  const getPricingRecommendation = () => {
    if (!matchData.homeTeam || !matchData.awayTeam || !matchData.stadium) {
      setModelError("بيانات المباراة غير مكتملة");
      return;
    }
    
    setModelError(null);
    setLoading(true);
    
    console.log(`Getting price recommendation for match:`, matchData);
    
    setTimeout(() => {
      try {
        const input: PricingModelInput = {
          homeTeam: matchData.homeTeam,
          awayTeam: matchData.awayTeam,
          city: matchData.city || '',
          stadium: matchData.stadium,
          time: matchData.time || '20:00',
          day: matchData.day || 'الجمعة',
        };
        
        console.log(`Prepared pricing model input:`, input);
        
        const result = calculateRecommendedPrice(input);
        
        if (result.recommendedPrice <= 0) {
          console.error("Model returned negative or zero price, adjusting to minimum", result);
          result.recommendedPrice = 20;
          result.notes += "\n\nملاحظة: تم تعديل السعر للحد الأدنى بسبب عوامل غير متوقعة.";
        }
        
        // Get match type and importance for logging
        const matchType = getMatchType(input.homeTeam, input.awayTeam);
        const importanceLevel = calculateImportanceLevel(input.homeTeam, input.awayTeam, matchType);
        
        console.log("Calculated recommendation:", {
          input, 
          result,
          matchType,
          importanceLevel
        });
        
        setRecommendation(result);
        setLoading(false);
      } catch (error) {
        console.error("Error calculating price recommendation:", error);
        setModelError("حدث خطأ أثناء حساب السعر الموصى به");
        setLoading(false);
      }
    }, 800);
  };
  
  const handleApplyPrice = () => {
    if (recommendation && recommendation.recommendedPrice > 0) {
      onSelectPrice(recommendation.recommendedPrice);
      setIsOpen(false);
    } else {
      setModelError("لا يمكن تطبيق سعر سالب أو صفر");
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          onClick={() => {
            setRecommendation(null);
            setModelError(null);
            getPricingRecommendation();
          }}
          disabled={disabled}
          className="w-full mt-2 flex items-center"
        >
          <Brain className="ml-2 h-4 w-4" />
          تحليل سعر مقترح
        </Button>
      </DialogTrigger>
      <DialogContent className="rtl max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">توصية التسعير الذكي</DialogTitle>
          <DialogDescription>
            تحليل بيانات المباراة لتحديد السعر الأمثل للتذاكر
          </DialogDescription>
        </DialogHeader>
        
        {loading && <LoadingState />}
        {modelError && !loading && <ErrorState error={modelError} />}
        
        {recommendation && !loading && !modelError && (
          <PricingRecommendationContent 
            matchData={matchData}
            recommendation={recommendation}
            onApplyPrice={handleApplyPrice}
            onClose={() => setIsOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PricingRecommendationModal;
