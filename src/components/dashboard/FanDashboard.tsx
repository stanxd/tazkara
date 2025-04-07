
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AccountStatus from './fans/AccountStatus';
import FanTickets from './fans/FanTickets';
import AccountStats from './fans/AccountStats';
import AccountSettings from './fans/AccountSettings';
import FanWaitlistTickets from './fans/FanWaitlistTickets';
import AttendanceHistory from './fans/AttendanceHistory';
import Subscriptions from './fans/Subscriptions';
import { supabase } from '@/integrations/supabase/client';
import { Info, Heart } from 'lucide-react';

interface FanDashboardProps {
  fanProfile: any;
}

const FanDashboard: React.FC<FanDashboardProps> = ({
  fanProfile: initialProfile
}) => {
  const { user } = useAuth();
  const [fanProfile, setFanProfile] = useState(initialProfile);

  // Update Mohammed Abdullah's favorite team to Al-Hilal
  useEffect(() => {
    if (fanProfile?.name === 'محمد عبدالله' && fanProfile?.favorite_team !== 'الهلال') {
      const updateFavoriteTeam = async () => {
        try {
          const { error } = await supabase.from('fans').update({
            favorite_team: 'الهلال'
          }).eq('id', user?.id);
          
          if (!error) {
            // Update the local state with the new favorite team
            setFanProfile({
              ...fanProfile,
              favorite_team: 'الهلال'
            });
            console.log('تم تحديث الفريق المفضل بنجاح');
          } else {
            console.error('خطأ في تحديث الفريق المفضل:', error);
          }
        } catch (error) {
          console.error('خطأ:', error);
        }
      };
      updateFavoriteTeam();
    }
  }, [user, fanProfile]);

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
            <div className="md:w-1/3 space-y-2">
              <h3 className="text-lg font-medium rtl">الاسم:</h3>
              <p className="rtl">{fanProfile?.name}</p>
            </div>
            <div className="md:w-1/3 space-y-2">
              <h3 className="text-lg font-medium rtl">رقم الهوية:</h3>
              <p className="rtl">{fanProfile?.id_number || '1109878576'}</p>
            </div>
            <div className="md:w-1/3 space-y-2">
              <h3 className="text-lg font-medium rtl">البريد الإلكتروني:</h3>
              <p className="rtl">{user?.email || 'mod@t.sa'}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2 space-y-2">
              <h3 className="text-lg font-medium rtl">رقم الجوال:</h3>
              <p className="rtl">{fanProfile?.mobile}</p>
            </div>
            <div className="md:w-1/2 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium rtl">الفريق المفضل:</h3>
                <div className="flex items-center text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                  <Heart className="h-3 w-3 ml-1" />
                  <span className="rtl">الفريق المفضل</span>
                </div>
              </div>
              <p className="rtl font-semibold text-tazkara-green">
                {fanProfile?.favorite_team || user?.user_metadata?.favorite_team || "غير محدد"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Status */}
      <AccountStatus userId={user?.id || ''} />

      <Tabs defaultValue="tickets" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-6 rtl">
          <TabsTrigger value="tickets">التذاكر</TabsTrigger>
          <TabsTrigger value="waitlist">قائمة الانتظار</TabsTrigger>
          <TabsTrigger value="attendance">سجل الحضور</TabsTrigger>
          <TabsTrigger value="stats">الإحصاءات</TabsTrigger>
          <TabsTrigger value="subscriptions">الباقات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tickets">
          <FanTickets userId={user?.id || ''} />
        </TabsContent>
        
        <TabsContent value="waitlist">
          <FanWaitlistTickets userId={user?.id || ''} />
        </TabsContent>
        
        <TabsContent value="attendance">
          <AttendanceHistory userId={user?.id || ''} />
        </TabsContent>
        
        <TabsContent value="stats">
          <AccountStats userId={user?.id || ''} />
        </TabsContent>
        
        <TabsContent value="subscriptions">
          <Subscriptions userId={user?.id || ''} />
        </TabsContent>
        
        <TabsContent value="settings">
          <AccountSettings fanProfile={fanProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FanDashboard;
