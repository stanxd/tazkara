
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Star, TrendingUp, User, BarChart } from 'lucide-react';
const Roadmap = () => {
  return <section id="roadmap" className="py-16 dark-purple-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold gradient-text mb-4">خارطة التطوير لمنصة تذكرة+ مستمرة</h2>
          <p className="text-purple-200 max-w-3xl mx-auto">
            نعمل باستمرار على تطوير منصتنا لتقديم أفضل تجربة للأندية والجماهير، إليكم المزايا القادمة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* صوت الجمهور */}
          <Card className="overflow-hidden border border-purple-500/20 bg-[#1A0033]/80 backdrop-blur-sm hover-grow">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-500 p-4">
              <CardTitle className="text-white flex items-center text-xl">
                <MessageSquare className="ml-2 h-6 w-6" />
                صوت الجمهور
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-purple-100 mb-4">ميزة تفاعلية تتيح للمشجعين إبداء آرائهم واقتراحاتهم حول الفريق أو المدرب أو الجهاز الإداري بشكل منظم ومؤثر.</p>
              
              <h4 className="text-lg font-semibold text-purple-300 mb-2">الأهداف المرجوة:</h4>
              <ul className="text-purple-200 space-y-2 mr-6 rtl">
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-pink-400 ml-2 mt-1" />
                  <span>تعويض الجمهور عن اللجوء لمنصات التواصل الاجتماعي لسماع أصواتهم</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-pink-400 ml-2 mt-1" />
                  <span>توفير بيانات دقيقة للنادي والجهات المنظمة عن الحالة المزاجية للجمهور</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-pink-400 ml-2 mt-1" />
                  <span>إمكانية التفاعل المباشر بين النادي وجمهوره لخلق روابط صحية</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* اكتشاف المواهب */}
          <Card className="overflow-hidden border border-purple-500/20 bg-[#1A0033]/80 backdrop-blur-sm hover-grow">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-500 p-4">
              <CardTitle className="text-white flex items-center text-xl">
                <Star className="ml-2 h-6 w-6" />
                اكتشاف المواهب
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-purple-100 mb-4">ميزة مبتكرة تتيح لكل موهوب في كرة القدم مشاركة مواهبه مباشرة، مع تقييم بواسطة الذكاء الاصطناعي واقتراح المواهب للأندية.</p>

              <h4 className="text-lg font-semibold text-purple-300 mb-2">معايير التقييم:</h4>
              <ul className="text-purple-200 space-y-2 mr-6 rtl mb-4">
                <li className="flex items-start">
                  <User className="h-5 w-5 text-blue-400 ml-2 mt-1" />
                  <span>المهارات الفنية والإحصاءات المنجزة والتكتيك والانضباط ومستوى الروح القتالية</span>
                </li>
                <li className="flex items-start">
                  <User className="h-5 w-5 text-blue-400 ml-2 mt-1" />
                  <span>تقييم اللياقة والجهد والسرعة وقوة التحمل وجودة النوم والحالة النفسية</span>
                </li>
              </ul>

              <h4 className="text-lg font-semibold text-purple-300 mb-2">الأهداف المرجوة:</h4>
              <ul className="text-purple-200 space-y-2 mr-6 rtl">
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-blue-400 ml-2 mt-1" />
                  <span>آتمتة اكتشاف المواهب بعيداً عن المحسوبيات</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-blue-400 ml-2 mt-1" />
                  <span>تقليل رحلة اكتشاف المواهب والتكاليف المرتبطة بها</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* نظام تسعير الذكاء الاصطناعي */}
          <Card className="overflow-hidden border border-purple-500/20 bg-[#1A0033]/80 backdrop-blur-sm hover-grow">
            <CardHeader className="bg-gradient-to-r from-green-600 to-blue-500 p-4">
              <CardTitle className="text-white flex items-center text-xl">
                <BarChart className="ml-2 h-6 w-6" />
                تسعير ذكي للتذاكر
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-purple-100 mb-4">نظام تسعير متقدم يستخدم نماذج الانحدار الخطي والذكاء الاصطناعي لتحديد أسعار تذاكر المباريات بناءً على عوامل متعددة.</p>
              
              <h4 className="text-lg font-semibold text-purple-300 mb-2">العوامل المؤثرة:</h4>
              <ul className="text-purple-200 space-y-2 mr-6 rtl">
                <li className="flex items-start">
                  <BarChart className="h-5 w-5 text-green-400 ml-2 mt-1" />
                  <span>أهمية المباراة وشعبية الفرق المشاركة والسجل التاريخي</span>
                </li>
                <li className="flex items-start">
                  <BarChart className="h-5 w-5 text-green-400 ml-2 mt-1" />
                  <span>سعة الملعب والموقع والتوقيت وبيانات الحضور السابقة</span>
                </li>
              </ul>
              
              <h4 className="text-lg font-semibold text-purple-300 mb-2 mt-4">المميزات:</h4>
              <ul className="text-purple-200 space-y-2 mr-6 rtl">
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-green-400 ml-2 mt-1" />
                  <span>تعظيم الإيرادات مع الحفاظ على امتلاء المدرجات</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-green-400 ml-2 mt-1" />
                  <span>تحسين الدقة مع تراكم البيانات عبر الوقت</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default Roadmap;
