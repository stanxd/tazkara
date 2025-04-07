
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Lock, Users, Ticket, ChevronDown, ChevronUp, Medal } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

const PlatformBenefits: React.FC = () => {
  const [openCards, setOpenCards] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
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
      description: [
        "منصة تقدم نموذج يتيح للفريق نشر تذاكر مبارياته القادمه مع خاصية تنبؤ لتقديم سعر مقترح للفريق",
        "نعتمد في ذلك على عدة معطيات منها حجم الجمهور للفريق، والمدينة المقام فيها الحدث، ونوع الملعب، والتوقيت، ونوع المباراة، وسلوك المشجعين المسجلين لديها"
      ]
    },
    {
      icon: Ticket,
      title: "سعر ديناميكي ذكي",
      description: [
        "بغض النظر عن السعر الأساسي، فان المنصة تمكن الفريق من تفعيله للسعر الديناميكي من عدمه",
        "يعمل التسعير الديناميكي بعد بيع 30% من عدد التذاكر أو الست ساعات الأولى",
        "بناءً على حجم الإقبال يتم تفعيل خاصية السعر المتغير ارتفاعاً أو انخفاضاً",
        "يعتمد ذلك على حجم الطلب + القوة الشرائية لجمهور النادي",
        "يتم تحديد القوة الشرائية للمشجع بناءً على سلوكه في منصتنا"
      ]
    },
    {
      icon: Lock,
      title: "تنظيم السوق",
      description: [
        "كل التذاكر لدينا مؤمنة ولا يمكن إساءة استخدامها أو خلق سوق سوداء لها",
        "التذكرة مرتبطة بكل مشجع وتحتوي على اسمه ورقم هويته",
        "مع تمكين المشجع من بيع تذكرته بشكل فوري داخل المنصة وسيتم إضافتها للمعروض"
      ]
    },
    {
      icon: Users,
      title: "تحسين تجربة المشجعين",
      description: [
        "كل مشجع عند التسجيل يختار فريقه المفضل ولا يمكن له تغييره إلا وفقاً لشروط محددة",
        "سيتمكن مشجعي النادي من حجز التذاكر وتكون لهم الأولوية بالحجز",
        "أي مشجع آخر سيتم وضعه في قائمة الانتظار لحين توفر تذاكر",
        "لايحتاج المشجع الى حمل التذكرة, يتم تعريف التذاكر على البوابات برقم الهوية"
      ]
    },
    {
      icon: Medal,
      title: "رفع نسبة الحضور والولاء",
      description: [
        "كل تذكرة مؤكدة لم يبيعا مالكها في الاوقات المحددة ولم يحضر للمباراة لايمكن ارجاعها",
        "يتم بيع التذكرة بنصف السعر لمشجع جديد وصلاحية دخول بين الشوطين",
        "في حال لم يحذر المشجع لـ 3 مباريات متتالية بحجوزات مؤكدة يتم تغيير حسابة من مشجع مفضل الى قائمة الانتظار للحجوزات الـ ثلاثة القادمة"
      ]
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <ul className="text-purple-100 text-sm leading-relaxed list-disc pr-4 space-y-1">
                    {openCards[index] 
                      ? feature.description.map((item, i) => <li key={i}>{item}</li>)
                      : <li>{feature.description[0]}</li>
                    }
                  </ul>
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
