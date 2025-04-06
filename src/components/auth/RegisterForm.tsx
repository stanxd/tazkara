
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const RegisterForm = () => {
  const [userType, setUserType] = useState<'fan' | 'team'>('fan');
  
  // In a real app, this function would handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration attempted as:', userType);
    // Handle registration logic
  };

  return (
    <div className="flex justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold rtl">إنشاء حساب جديد</CardTitle>
          <CardDescription className="rtl">أدخل بياناتك لإنشاء حسابك</CardDescription>
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
                    <Label htmlFor="fan-name">الاسم</Label>
                    <Input id="fan-name" placeholder="الاسم الكامل" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-id">رقم الهوية</Label>
                    <Input id="fan-id" placeholder="رقم الهوية" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-mobile">رقم الجوال</Label>
                    <Input id="fan-mobile" type="tel" placeholder="05XXXXXXXX" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-team">الفريق المفضل</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفريق المفضل" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alhilal">الهلال</SelectItem>
                        <SelectItem value="alnassir">النصر</SelectItem>
                        <SelectItem value="alahli">الأهلي</SelectItem>
                        <SelectItem value="alittihad">الاتحاد</SelectItem>
                        <SelectItem value="alshabab">الشباب</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-password">كلمة المرور</Label>
                    <Input id="fan-password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fan-confirm-password">تأكيد كلمة المرور</Label>
                    <Input id="fan-confirm-password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full bg-tazkara-green hover:bg-tazkara-green/90">
                    تسجيل
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="team">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 rtl">
                  <div className="space-y-2">
                    <Label htmlFor="team-name">اسم الفريق</Label>
                    <Input id="team-name" placeholder="اسم الفريق" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-registration">رقم السجل التجاري</Label>
                    <Input id="team-registration" placeholder="رقم السجل التجاري" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-email">البريد الإلكتروني الرسمي</Label>
                    <Input id="team-email" type="email" placeholder="example@team.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-mobile">رقم الجوال</Label>
                    <Input id="team-mobile" type="tel" placeholder="05XXXXXXXX" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-password">كلمة المرور</Label>
                    <Input id="team-password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="team-confirm-password">تأكيد كلمة المرور</Label>
                    <Input id="team-confirm-password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full bg-tazkara-green hover:bg-tazkara-green/90">
                    تسجيل
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center rtl">
          <p>
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="text-tazkara-green hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;
