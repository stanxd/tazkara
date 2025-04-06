
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold rtl">لوحة التحكم</CardTitle>
            <CardDescription className="rtl">مرحباً بك في حسابك الشخصي</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 rtl">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">البريد الإلكتروني:</h3>
              <p>{user?.email}</p>
            </div>
            
            <Button 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => signOut()}
            >
              تسجيل الخروج
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
