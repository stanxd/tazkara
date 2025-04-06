
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FounderProps {
  name: string;
  title: string;
  image: string;
}

const founders: FounderProps[] = [
  {
    name: 'محمد العمري',
    title: 'الرئيس التنفيذي',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'سارة الزهراني',
    title: 'مدير التكنولوجيا',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'أحمد السليم',
    title: 'مدير التسويق',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    name: 'نورة القحطاني',
    title: 'مدير العمليات',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const Founders: React.FC = () => {
  return (
    <section className="py-12 bg-white" id="founders">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-tazkara-dark rtl">الأعضاء المؤسسين</h2>
          <p className="text-gray-600 mt-2 rtl">تعرف على فريق عمل تذكرة+</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {founders.map((founder, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
              <div className="h-52 overflow-hidden">
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="text-center py-4 rtl">
                <h3 className="font-bold text-lg">{founder.name}</h3>
                <p className="text-gray-600">{founder.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;
