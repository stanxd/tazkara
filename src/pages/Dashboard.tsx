
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import TeamDashboardHome from '@/components/dashboard/TeamDashboardHome';
import TeamMatchesManager from '@/components/dashboard/TeamMatchesManager';
import TeamSalesReports from '@/components/dashboard/TeamSalesReports';
import TeamFansData from '@/components/dashboard/TeamFansData';
import TeamSettings from '@/components/dashboard/TeamSettings';
import FanDashboard from '@/components/dashboard/FanDashboard';
import { Loader2, Info } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userType, setUserType] = useState<'team' | 'fan' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        // Check if user is a team
        let { data: teamData, error: teamError } = await supabase
          .from('teams')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (!teamError && teamData) {
          setUserProfile(teamData);
          setUserType('team');
          setIsLoading(false);
          return;
        }
        
        // Check if user is a fan
        let { data: fanData, error: fanError } = await supabase
          .from('fans')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (!fanError && fanData) {
          setUserProfile(fanData);
          setUserType('fan');
          setIsLoading(false);
          return;
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-tazkara-green" />
          <span className="mr-2 text-lg">جاري التحميل...</span>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Added padding-top to push the content below the fixed navbar */}
      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        {userType === 'team' ? (
          <div className="w-full">
            <div className="mb-6 rtl text-center">
              <h1 className="text-3xl font-bold">لوحة تحكم {userProfile?.team_name}</h1>
              <p className="text-muted-foreground mt-2">مرحباً بك في لوحة تحكم الفريق</p>
            </div>

            <Tabs defaultValue="home" className="w-full rtl">
              <TabsList className="w-full mb-6 grid grid-cols-2 md:grid-cols-5">
                <TabsTrigger value="home">الرئيسية</TabsTrigger>
                <TabsTrigger value="matches">إدارة المباريات</TabsTrigger>
                <TabsTrigger value="sales">تقارير المبيعات</TabsTrigger>
                <TabsTrigger value="fans">بيانات الجمهور</TabsTrigger>
                <TabsTrigger value="settings">الإعدادات</TabsTrigger>
              </TabsList>
              <TabsContent value="home">
                <TeamDashboardHome teamProfile={userProfile} />
              </TabsContent>
              <TabsContent value="matches">
                <TeamMatchesManager teamProfile={userProfile} />
              </TabsContent>
              <TabsContent value="sales">
                <TeamSalesReports teamProfile={userProfile} />
              </TabsContent>
              <TabsContent value="fans">
                <TeamFansData teamProfile={userProfile} />
              </TabsContent>
              <TabsContent value="settings">
                <TeamSettings teamProfile={userProfile} />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <FanDashboard fanProfile={userProfile} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
