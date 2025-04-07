
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FounderProps {
  name: string;
  title: string;
}

const founders: FounderProps[] = [
  {
    name: 'عفاف المطرفي',
    title: 'مدير فريق',
  },
  {
    name: 'ليان الجهني',
    title: 'عضو فريق',
  },
  {
    name: 'شوق الاحمدي',
    title: 'عضو فريق',
  },
  {
    name: 'آمل العلوي',
    title: 'عضو فريق',
  },
  {
    name: 'شموخ سعيد',
    title: 'مستشار',
  },
  {
    name: 'سلطان الصاعدي',
    title: 'مطور نماذج آولية',
  },
];

const Founders: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-t from-[#13002A] to-[#520082]" id="founders">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white rtl">الأعضاء المؤسسين</h2>
          <p className="text-purple-200 mt-2 rtl">تعرف على فريق عمل تذكرة+</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {founders.map((founder, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-[#13002A]/80 backdrop-blur-sm border border-purple-500/20">
              <CardContent className="text-center py-8 rtl">
                <h3 className="font-bold text-xl text-white">{founder.name}</h3>
                <p className="text-purple-200 mt-2">{founder.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
