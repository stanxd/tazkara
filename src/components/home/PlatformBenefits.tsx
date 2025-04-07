
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Lock, Users, Ticket, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

const PlatformBenefits: React.FC = () => {
  const [openCards, setOpenCards] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false
  });

  const toggleCard = (index: number) => {
    setOpenCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const features = [
    {
      icon: BarChart3,
      title: "مقترح سعر تحليلي",
      shortDescription: "منصة تقدم نموذج يتيح للفريق نشر تذاكر مبارياته القادمة مع تقديم سعر مقترح للفريق،",
      fullDescription: "منصة تقدم نموذج يتيح للفريق نشر تذاكر مبارياته القادمة مع تقديم سعر مقترح للفريق، ونعتمد في ذلك على عدة معطيات منها حجم الجمهور للفريق، والمدينة المقام فيها الحدث، ونوع الملعب، والتوقيت، ونوع المباراة، وسلوك المشجعين المسجلين لديها"
    },
    {
      icon: Ticket,
      title: "سعر ديناميكي ذكي",
      shortDescription: "بغض النظر عن السعر الأساسي، فان المنصة تمكن الفريق من تفعيله للسعر الديناميكي من عدمه،",
      fullDescription: "بغض النظر عن السعر الأساسي، فان المنصة تمكن الفريق من تفعيله للسعر الديناميكي من عدمه، ويعمل التسعير الديناميكي بعد بيع 30% من عدد التذاكر أو الست ساعات الأولى، وبعد ذلك بناءً على حجم الإقبال يتم تفعيل خاصية السعر المتغير ارتفاعاً أو انخفاضاً، ويعتمد ذلك على حجم الطلب + القوة الشرائية لجمهور النادي، ويتم تحديد القوة الشرائية للمشجع بناءً على سلوكه في منصتنا"
    },
    {
      icon: Lock,
      title: "تنظيم السوق",
      shortDescription: "كل التذاكر لدينا مؤمنة ولا يمكن إساءة استخدامها أو خلق سوق سوداء لها،",
      fullDescription: "كل التذاكر لدينا مؤمنة ولا يمكن إساءة استخدامها أو خلق سوق سوداء لها، بحيث أن التذكرة مرتبطة بكل مشجع وتحتوي على اسمه ورقم هويته، مع تمكين المشجع من بيع تذكرته بشكل فوري داخل المنصة وسيتم إضافتها للمعروض"
    },
    {
      icon: Users,
      title: "تحسين تجربة المشجعين",
      shortDescription: "كل مشجع عند التسجيل يختار فريقه المفضل ولا يمكن له تغييره إلا وفقاً لشروط محددة،",
      fullDescription: "كل مشجع عند التسجيل يختار فريقه المفضل ولا يمكن له تغييره إلا وفقاً لشروط محددة، وبذلك سيتمكن مشجعي النادي من حجز التذاكر وتكون لهم الأولوية بالحجز، وأي مشجع آخر سيتم وضعه في قائمة الانتظار لحين توفر تذاكر"
    }
  ];

  return <section className="bg-[#13002A] py-16 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624880357913-a8539238245b')] bg-cover bg-center opacity-[0.03]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 rtl text-center">تسعير مبتكر - تجربة أذكى</h2>
          <p className="text-lg text-purple-200 max-w-3xl mx-auto rtl text-center">
            منصتنا توفر تجربة فريدة للمشجعين والأندية من خلال نظام متكامل للتذاكر
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-[#190038] border-purple-500/20 hover:border-purple-400/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <CardHeader className="pb-2">
                <div className="rounded-full bg-purple-900/50 w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-xl text-white rtl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="rtl">
                <Collapsible open={openCards[index]} onOpenChange={() => toggleCard(index)}>
                  <div className="text-purple-100 text-sm leading-relaxed">
                    {!openCards[index] ? feature.shortDescription : feature.fullDescription}
                  </div>
                  <div className="flex justify-end mt-2">
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-purple-400 hover:bg-purple-900/30 hover:text-purple-300 p-1 h-auto"
                      >
                        {openCards[index] ? (
                          <>
                            <ChevronUp className="h-4 w-4 ml-1" />
                            <span className="text-xs">عرض أقل</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 ml-1" />
                            <span className="text-xs">عرض المزيد</span>
                          </>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>;
};

export default PlatformBenefits;
