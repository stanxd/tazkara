
import React from 'react';
import { Loader2 } from 'lucide-react';

const AvailableTickets: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-tazkara-dark rtl">التذاكر المتوفرة</h2>
          <p className="text-gray-600 mt-2 rtl">سيتم إضافة التذاكر قريباً</p>
        </div>
        
        <div className="text-center py-16">
          <p className="text-xl text-gray-500 rtl">تم إزالة التذاكر مؤقتاً</p>
          <p className="text-gray-400 mt-2 rtl">ترقبوا التصميم الجديد قريباً</p>
        </div>
      </div>
    </section>
  );
};

export default AvailableTickets;
