
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountStatus from './fans/AccountStatus';
import FanTickets from './fans/FanTickets';
import AccountStats from './fans/AccountStats';
import AccountSettings from './fans/AccountSettings';

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
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold rtl">لوحة التحكم</CardTitle>
          <CardDescription className="rtl">مرحباً بك في حسابك الشخصي</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2 space-y-2">
              <h3 className="text-lg font-medium rtl">البريد الإلكتروني:</h3>
              <p className="rtl">{fanProfile?.email}</p>
            </div>
            <div className="md:w-1/2 space-y-2">
              <h3 className="text-lg font-medium rtl">الاسم:</h3>
              <p className="rtl">{fanProfile?.name}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2 space-y-2">
              <h3 className="text-lg font-medium rtl">رقم الجوال:</h3>
              <p className="rtl">{fanProfile?.mobile}</p>
            </div>
            <div className="md:w-1/2 space-y-2">
              <h3 className="text-lg font-medium rtl">الفريق المفضل:</h3>
              <p className="rtl">{fanProfile?.favorite_team || user?.user_metadata?.favorite_team || "غير محدد"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Status */}
      <AccountStatus userId={user?.id || ''} />

      <Tabs defaultValue="tickets" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 rtl">
          <TabsTrigger value="tickets">التذاكر</TabsTrigger>
          <TabsTrigger value="stats">الإحصاءات</TabsTrigger>
          <TabsTrigger value="settings">إعدادات الحساب</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tickets">
          <FanTickets userId={user?.id || ''} />
        </TabsContent>
        
        <TabsContent value="stats">
          <AccountStats userId={user?.id || ''} />
        </TabsContent>
        
        <TabsContent value="settings">
          <AccountSettings fanProfile={fanProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FanDashboard;
