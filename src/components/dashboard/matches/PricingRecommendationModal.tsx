
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
    // Make sure we have the required data
    if (!matchData.homeTeam || !matchData.awayTeam || !matchData.stadium) {
      setModelError("بيانات المباراة غير مكتملة");
      return;
    }
    
    setModelError(null);
    setLoading(true);
    
    // Simulate a bit of processing time for a better UX
    setTimeout(() => {
      try {
        const input: PricingModelInput = {
          homeTeam: matchData.homeTeam,
          awayTeam: matchData.awayTeam,
          city: matchData.city || '',
          stadium: matchData.stadium,
          time: matchData.time || '20:00',
          day: matchData.day || 'الجمعة', // Default to Friday if not provided
        };
        
        const result = calculateRecommendedPrice(input);
        
        // Safety check to ensure price is positive
        if (result.recommendedPrice <= 0) {
          console.error("Model returned negative or zero price, adjusting to minimum", result);
          result.recommendedPrice = 20; // Minimum price as fallback
          result.notes += "\n\nملاحظة: تم تعديل السعر للحد الأدنى بسبب عوامل غير متوقعة.";
        }
        
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
      <DialogContent className="rtl max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">توصية التسعير الذكي</DialogTitle>
          <DialogDescription>
            تحليل بيانات المباراة لتحديد السعر الأمثل للتذاكر
          </DialogDescription>
        </DialogHeader>
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-tazkara-green rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">جاري تحليل البيانات...</p>
          </div>
        )}

        {modelError && !loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-red-500">{modelError}</p>
          </div>
        )}
        
        {recommendation && !loading && !modelError && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
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
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3 border-b pb-2">عوامل التحليل</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>أهمية المباراة:</span>
                  <span className="font-medium">
                    {matchData.homeTeam && matchData.awayTeam && matchData.stadium ? 
                      (matchData.awayTeam.includes('الهلال') || matchData.awayTeam.includes('النصر') || 
                       matchData.awayTeam.includes('الأهلي') || matchData.awayTeam.includes('الاتحاد') ? 'عالية' : 'متوسطة') 
                      : 'غير محددة'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>الطلب المتوقع:</span>
                  <span className="font-medium">
                    {matchData.awayTeam && 
                     (matchData.awayTeam.includes('الهلال') || matchData.awayTeam.includes('النصر')) ? 
                     'مرتفع' : 'متوسط'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>سعة الملعب:</span>
                  <span className="font-medium">
                    {matchData.stadium === 'استاد الملك فهد الدولي' ? '67,000 متفرج' : 
                     matchData.stadium === 'استاد الملك عبدالله' ? '62,000 متفرج' : 
                     matchData.stadium === 'الجوهرة' ? '45,000 متفرج' : 
                     matchData.stadium === 'مملكة آرينا' ? '25,000 متفرج' : 
                     matchData.stadium === 'مرسول بارك' ? '22,000 متفرج' : 'غير محدد'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>المدينة:</span>
                  <span className="font-medium">{matchData.city || 'غير محددة'}</span>
                </div>
                <div className="flex justify-between">
                  <span>توقيت المباراة:</span>
                  <span className="font-medium">{matchData.time || '20:00'}</span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">ملاحظات</h3>
              <p className="text-sm whitespace-pre-line">{recommendation.notes}</p>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                إلغاء
              </Button>
              <Button 
                onClick={handleApplyPrice}
                className="bg-tazkara-green hover:bg-tazkara-green/90"
              >
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
