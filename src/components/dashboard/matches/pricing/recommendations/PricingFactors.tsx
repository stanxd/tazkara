
import React from 'react';
import { PricingModelInput } from '../../pricing';
import { calculateImportanceLevel, getMatchType } from '../utils';

interface PricingFactorsProps {
  matchData: Partial<PricingModelInput>;
}

const PricingFactors: React.FC<PricingFactorsProps> = ({ matchData }) => {
  // Calculate importance level using the same logic as in the pricing calculator
  const getImportanceDisplay = () => {
    if (!matchData.homeTeam || !matchData.awayTeam) return 'غير محددة';
    
    const matchType = getMatchType(matchData.homeTeam, matchData.awayTeam);
    return calculateImportanceLevel(matchData.homeTeam, matchData.awayTeam, matchType);
  };
  
  // Calculate expected demand
  const getDemandDisplay = () => {
    if (!matchData.awayTeam) return 'غير محدد';
    
    if (matchData.awayTeam.includes('الهلال') || matchData.awayTeam.includes('النصر')) {
      return 'مرتفع';
    } else {
      return 'متوسط';
    }
  };
  
  return (
    <div className="border rounded-lg p-2">
      <h3 className="font-medium text-sm mb-2 border-b pb-1">عوامل التحليل</h3>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>أهمية المباراة:</span>
          <span className="font-medium">
            {matchData.homeTeam && matchData.awayTeam ? 
              getImportanceDisplay() : 'غير محددة'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>الطلب المتوقع:</span>
          <span className="font-medium">
            {getDemandDisplay()}
          </span>
        </div>
        <div className="flex justify-between">
          <span>سعة الملعب:</span>
          <span className="font-medium">
            {matchData.stadium === 'استاد الملك فهد الدولي' ? '67,000' : 
             matchData.stadium === 'استاد الملك عبدالله' ? '62,000' : 
             matchData.stadium === 'الجوهرة' ? '45,000' : 
             matchData.stadium === 'المملكة أرينا' ? '25,000' : 
             matchData.stadium === 'الأول بارك' ? '22,000' : 'غير محدد'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>المدينة:</span>
          <span className="font-medium">{matchData.city || 'غير محددة'}</span>
        </div>
        <div className="flex justify-between">
          <span>توقيت:</span>
          <span className="font-medium">{matchData.time || '20:00'}</span>
        </div>
      </div>
    </div>
  );
};

export default PricingFactors;
