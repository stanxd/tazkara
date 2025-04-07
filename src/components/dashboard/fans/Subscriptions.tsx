
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, Star, Award } from 'lucide-react';

interface SubscriptionsProps {
  userId: string;
}

const Subscriptions: React.FC<SubscriptionsProps> = ({
  userId
}) => {
  const handleSubscribe = (planType: string) => {
    console.log(`Subscribing to ${planType} plan for user ${userId}`);
    // Here you would typically redirect to payment or show a payment modal
  };

  return <div className="space-y-6">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-2 rtl">باقات الاشتراك</h2>
        <p className="text-gray-500 rtl">
          اشترك في إحدى الباقات للحصول على مزايا حصرية
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:flex md:flex-row-reverse">
        {/* Standard Plan (displayed on the right in RTL) */}
        <div className="md:w-1/2">
          <Card className="border-2 border-purple-400 overflow-hidden relative h-full">
            <div className="absolute top-0 right-0 bg-purple-400 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rtl">
              الباقة العادية
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl rtl">للمشجعين الحماسيين</CardTitle>
              <div className="mt-2 rtl">
                <span className="text-3xl font-bold">99</span>
                <span className="text-gray-500 mr-1">ريال</span>
              </div>
            </CardHeader>
            <CardContent className="rtl flex-grow">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 ml-2" />
                  <span>تغيير الفريق المفضل مرة واحدة كل 60 يوم</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 ml-2" />
                  <span>أولوية في قوائم الانتظار</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 ml-2" />
                  <span>إمكانية دعوة فريق او لاعب لحضور حدث معين</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full bg-purple-500 hover:bg-purple-600" onClick={() => handleSubscribe('standard')}>
                <Star className="ml-2 h-4 w-4" />
                اشترك الآن
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Leadership Plan (displayed on the left in RTL) */}
        <div className="md:w-1/2">
          <Card className="border-2 border-amber-400 overflow-hidden relative h-full">
            <div className="absolute top-0 right-0 bg-amber-400 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rtl">
              الباقة القيادية
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl rtl">للمشجعين المتميزين</CardTitle>
              <div className="mt-2 rtl">
                <span className="text-3xl font-bold">499</span>
                <span className="text-gray-500 mr-1">ريال</span>
              </div>
            </CardHeader>
            <CardContent className="rtl flex-grow">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Award className="h-5 w-5 text-amber-500 ml-2" />
                  <span className="font-medium">كل مميزات الباقة الأولى</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 ml-2" />
                  <span>مسار سريع لدخول وخروج الملعب (مرة واحدة)</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 ml-2" />
                  <span>توصيل من المواقف للبوابة والعكس (مرتين)</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="pt-2">
              <Button className="w-full bg-amber-500 hover:bg-amber-600" onClick={() => handleSubscribe('leadership')}>
                <Crown className="ml-2 h-4 w-4" />
                اشترك الآن
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>;
};

export default Subscriptions;
