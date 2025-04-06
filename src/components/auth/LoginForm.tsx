
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const LoginForm = () => {
  const [userType, setUserType] = useState<'fan' | 'team'>('fan');

  // In a real app, this function would handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted as:', userType);
    // Handle login logic
  };

  return (
    <div className="flex justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold rtl">تسجيل الدخول</CardTitle>
          <CardDescription className="rtl">أدخل بياناتك للوصول إلى حسابك</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fan" onValueChange={(value) => setUserType(value as 'fan' | 'team')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="fan" className="text-center rtl">مشجع</TabsTrigger>
              <TabsTrigger value="team" className="text-center rtl">فريق</TabsTrigger>
            </TabsList>

            <TabsContent value="fan">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 rtl">
                  <div className="space-y-2">
                    <Label htmlFor="fan-mobile">رقم الجوال</Label>
                    <Input id="fan-mobile" type="tel" placeholder="05XXXXXXXX" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-password">كلمة المرور</Label>
                    <Input id="fan-password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full bg-tazkara-green hover:bg-tazkara-green/90">
                    دخول
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="team">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 rtl">
                  <div className="space-y-2">
                    <Label htmlFor="team-email">البريد الإلكتروني</Label>
                    <Input id="team-email" type="email" placeholder="example@team.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-password">كلمة المرور</Label>
                    <Input id="team-password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full bg-tazkara-green hover:bg-tazkara-green/90">
                    دخول
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center rtl">
          <p>
            ليس لديك حساب؟{' '}
            <Link to="/register" className="text-tazkara-green hover:underline">
              إنشاء حساب جديد
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
