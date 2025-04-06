
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
import { Calculator } from 'lucide-react';
import { PricingModelInput, PricingModelOutput, calculateRecommendedPrice } from './pricingModel';

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
  
  const getPricingRecommendation = () => {
    // Make sure we have the required data
    if (!matchData.homeTeam || !matchData.awayTeam || !matchData.stadium) {
      return;
    }
    
    const input: PricingModelInput = {
      homeTeam: matchData.homeTeam,
      awayTeam: matchData.awayTeam,
      city: matchData.city || '',
      stadium: matchData.stadium,
      time: matchData.time || '20:00',
    };
    
    const result = calculateRecommendedPrice(input);
    setRecommendation(result);
  };
  
  const handleApplyPrice = () => {
    if (recommendation) {
      onSelectPrice(recommendation.recommendedPrice);
      setIsOpen(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          onClick={() => getPricingRecommendation()}
          disabled={disabled}
          className="w-full mt-2"
        >
          <Calculator className="ml-2 h-4 w-4" />
          حساب السعر المناسب
        </Button>
      </DialogTrigger>
      <DialogContent className="rtl">
        <DialogHeader>
          <DialogTitle>توصية التسعير الذكي</DialogTitle>
          <DialogDescription>
            تحليل بيانات المباراة لتحديد السعر الأمثل للتذاكر
          </DialogDescription>
        </DialogHeader>
        
        {recommendation && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <h3 className="text-lg font-medium">السعر الموصى به</h3>
                <div className="text-3xl font-bold text-tazkara-green">
                  {recommendation.recommendedPrice} ر.س
                </div>
              </div>
              
              <div className="border rounded-lg p-4 text-center">
                <h3 className="text-lg font-medium">احتمالية نفاد التذاكر</h3>
                <div className="text-3xl font-bold text-blue-500">
                  {recommendation.selloutProbability === 'Very High' && 'عالية جداً'}
                  {recommendation.selloutProbability === 'High' && 'عالية'}
                  {recommendation.selloutProbability === 'Medium' && 'متوسطة'}
                  {recommendation.selloutProbability === 'Low' && 'منخفضة'}
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">ملاحظات</h3>
              <p>{recommendation.notes}</p>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleApplyPrice}>
                تطبيق السعر الموصى به
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PricingRecommendationModal;
