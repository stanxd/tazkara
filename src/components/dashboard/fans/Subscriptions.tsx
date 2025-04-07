
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, Star } from 'lucide-react';

interface SubscriptionsProps {
  userId: string;
}

const Subscriptions: React.FC<SubscriptionsProps> = ({ userId }) => {
  const handleSubscribe = (planType: string) => {
    console.log(`Subscribing to ${planType} plan for user ${userId}`);
    // Here you would typically redirect to payment or show a payment modal
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-2 rtl">باقات الاشتراك</h2>
        <p className="text-gray-500 rtl">
          اشترك في إحدى الباقات للحصول على مزايا حصرية
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Plan */}
        <Card className="border-2 border-purple-400 overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-purple-400 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rtl">
            باقة أساسية
          </div>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl rtl">الباقة الفضية</CardTitle>
            <CardDescription className="rtl">للمشجعين المتحمسين</CardDescription>
            <div className="mt-2">
              <span className="text-3xl font-bold">١٩.٩٩</span>
              <span className="text-gray-500 rtl mr-1">ريال / شهرياً</span>
            </div>
          </CardHeader>
          <CardContent className="rtl">
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 ml-2" />
                <span>تغيير الفريق المفضل مرة واحدة شهرياً</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 ml-2" />
                <span>أولوية في قوائم الانتظار</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 ml-2" />
                <span>إشعارات مبكرة لبيع التذاكر</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-2">
            <Button 
              className="w-full bg-purple-500 hover:bg-purple-600" 
              onClick={() => handleSubscribe('silver')}
            >
              <Star className="ml-2 h-4 w-4" />
              اشترك الآن
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="border-2 border-amber-400 overflow-hidden relative">
          <div className="absolute top-0 right-0 bg-amber-400 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rtl">
            باقة مميزة
          </div>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl rtl">الباقة الذهبية</CardTitle>
            <CardDescription className="rtl">للمشجعين المتميزين</CardDescription>
            <div className="mt-2">
              <span className="text-3xl font-bold">٤٩.٩٩</span>
              <span className="text-gray-500 rtl mr-1">ريال / شهرياً</span>
            </div>
          </CardHeader>
          <CardContent className="rtl">
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 ml-2" />
                <span>تغيير الفريق المفضل بدون قيود</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 ml-2" />
                <span>أولوية قصوى في قوائم الانتظار</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 ml-2" />
                <span>حجز تذاكر المباريات الحصرية</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 ml-2" />
                <span>خصومات على المنتجات والتذاكر</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 ml-2" />
                <span>دعم فني على مدار الساعة</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pt-2">
            <Button 
              className="w-full bg-amber-500 hover:bg-amber-600" 
              onClick={() => handleSubscribe('gold')}
            >
              <Crown className="ml-2 h-4 w-4" />
              اشترك الآن
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Subscriptions;
