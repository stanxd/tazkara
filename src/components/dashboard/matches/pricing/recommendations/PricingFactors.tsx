
import React from 'react';
import { PricingModelInput } from '../../pricing';

interface PricingFactorsProps {
  matchData: Partial<PricingModelInput>;
}

const PricingFactors: React.FC<PricingFactorsProps> = ({ matchData }) => {
  return (
    <div className="border rounded-lg p-2">
      <h3 className="font-medium text-sm mb-2 border-b pb-1">عوامل التحليل</h3>
      <div className="space-y-1 text-xs">
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
            {matchData.stadium === 'استاد الملك فهد الدولي' ? '67,000' : 
             matchData.stadium === 'استاد الملك عبدالله' ? '62,000' : 
             matchData.stadium === 'الجوهرة' ? '45,000' : 
             matchData.stadium === 'مملكة آرينا' ? '25,000' : 
             matchData.stadium === 'مرسول بارك' ? '22,000' : 'غير محدد'}
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
