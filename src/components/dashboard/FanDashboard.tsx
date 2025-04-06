
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FanDashboardProps {
  fanProfile: any;
}

const FanDashboard: React.FC<FanDashboardProps> = ({ fanProfile }) => {
  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold rtl">لوحة التحكم</CardTitle>
          <CardDescription className="rtl">مرحباً بك في حسابك الشخصي</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 rtl">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">البريد الإلكتروني:</h3>
            <p>{fanProfile?.email}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">الاسم:</h3>
            <p>{fanProfile?.name}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">رقم الجوال:</h3>
            <p>{fanProfile?.mobile}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">الفريق المفضل:</h3>
            <p>{fanProfile?.favorite_team}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="rtl">المباريات القادمة</CardTitle>
          <CardDescription className="rtl">سيتم إضافة تذاكر للمباريات القادمة قريباً</CardDescription>
        </CardHeader>
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground rtl">تم إزالة عرض التذاكر مؤقتاً</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FanDashboard;
