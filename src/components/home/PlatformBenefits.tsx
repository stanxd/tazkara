
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Lock, Users, Ticket } from 'lucide-react';

const PlatformBenefits: React.FC = () => {
  return (
    <section className="bg-[#13002A] py-16 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624880357913-a8539238245b')] bg-cover bg-center opacity-[0.03]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 rtl">تسعير مبتكر - تجربة أذكى</h2>
          <p className="text-lg text-purple-200 max-w-3xl mx-auto rtl">
            منصتنا توفر تجربة فريدة للمشجعين والأندية من خلال نظام متكامل للتذاكر
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <Card className="bg-[#190038] border-purple-500/20 hover:border-purple-400/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10">
            <CardHeader className="pb-2">
              <div className="rounded-full bg-purple-900/50 w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="text-xl text-white rtl">مقترح سعر تحليلي</CardTitle>
            </CardHeader>
            <CardContent className="rtl">
              <p className="text-purple-100 text-sm leading-relaxed">
                منصة تقدم نموذج يتيح للفريق نشر تذاكر مبارياته القادمة مع تقديم سعر مقترح للفريق، ونعتمد في ذلك على عدة معطيات منها حجم الجمهور للفريق، والمدينة المقام فيها الحدث، ونوع الملعب، والتوقيت، ونوع المباراة، وسلوك المشجعين المسجلين لديها
              </p>
            </CardContent>
          </Card>
          
          {/* Feature 2 */}
          <Card className="bg-[#190038] border-purple-500/20 hover:border-purple-400/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10">
            <CardHeader className="pb-2">
              <div className="rounded-full bg-purple-900/50 w-12 h-12 flex items-center justify-center mb-4">
                <Ticket className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="text-xl text-white rtl">سعر ديناميكي ذكي</CardTitle>
            </CardHeader>
            <CardContent className="rtl">
              <p className="text-purple-100 text-sm leading-relaxed">
                بغض النظر عن السعر الأساسي، فإن المنصة تمكن الفريق من تفعيله للسعر الديناميكي من عدمه، ويعمل التسعير الديناميكي بعد بيع 30% من عدد التذاكر أو الست ساعات الأولى، وبعد ذلك بناءً على حجم الإقبال يتم تفعيل خاصية السعر المتغير ارتفاعاً أو انخفاضاً، ويعتمد ذلك على حجم الطلب + القوة الشرائية لجمهور النادي، ويتم تحديد القوة الشرائية للمشجع بناءً على سلوكه في منصتنا
              </p>
            </CardContent>
          </Card>
          
          {/* Feature 3 */}
          <Card className="bg-[#190038] border-purple-500/20 hover:border-purple-400/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10">
            <CardHeader className="pb-2">
              <div className="rounded-full bg-purple-900/50 w-12 h-12 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="text-xl text-white rtl">تنظيم السوق</CardTitle>
            </CardHeader>
            <CardContent className="rtl">
              <p className="text-purple-100 text-sm leading-relaxed">
                كل التذاكر لدينا مؤمنة ولا يمكن إساءة استخدامها أو خلق سوق سوداء لها، بحيث أن التذكرة مرتبطة بكل مشجع وتحتوي على اسمه ورقم هويته، مع تمكين المشجع من بيع تذكرته بشكل فوري داخل المنصة وسيتم إضافتها للمعروض
              </p>
            </CardContent>
          </Card>
          
          {/* Feature 4 */}
          <Card className="bg-[#190038] border-purple-500/20 hover:border-purple-400/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10">
            <CardHeader className="pb-2">
              <div className="rounded-full bg-purple-900/50 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <CardTitle className="text-xl text-white rtl">تحسين تجربة المشجعين</CardTitle>
            </CardHeader>
            <CardContent className="rtl">
              <p className="text-purple-100 text-sm leading-relaxed">
                كل مشجع عند التسجيل يختار فريقه المفضل ولا يمكن له تغييره إلا وفقاً لشروط محددة، وبذلك سيتمكن مشجعي النادي من حجز التذاكر وتكون لهم الأولوية بالحجز، وأي مشجع آخر سيتم وضعه في قائمة الانتظار لحين توفر تذاكر
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PlatformBenefits;
