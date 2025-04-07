
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

interface FanDashboardProps {
  fanProfile: any;
}

const FanDashboard: React.FC<FanDashboardProps> = ({ fanProfile }) => {
  const { user } = useAuth();

  useEffect(() => {
    // إضافة سجل للتحقق من بيانات المستخدم
    console.log("Fan Dashboard - User data:", user);
    console.log("Fan Dashboard - User metadata:", user?.user_metadata);
    console.log("Fan Dashboard - Favorite team:", user?.user_metadata?.favorite_team);
    console.log("Fan Dashboard - Fan profile:", fanProfile);
  }, [user, fanProfile]);

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
            <p>{fanProfile?.favorite_team || user?.user_metadata?.favorite_team || "غير محدد"}</p>
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
