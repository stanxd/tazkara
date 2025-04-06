
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

interface TeamSettingsProps {
  teamProfile: any;
}

const profileSchema = z.object({
  teamName: z.string().min(2, { message: 'يجب أن يكون اسم الفريق أكثر من حرفين' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
  mobile: z.string().min(10, { message: 'يجب أن يكون رقم الجوال 10 أرقام على الأقل' }),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, { message: 'كلمة المرور الحالية قصيرة جدًا' }),
  newPassword: z.string().min(6, { message: 'يجب أن تكون كلمة المرور الجديدة 6 أحرف على الأقل' }),
  confirmPassword: z.string().min(6, { message: 'يجب أن تكون كلمة المرور الجديدة 6 أحرف على الأقل' }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'كلمات المرور غير متطابقة',
  path: ['confirmPassword'],
});

const TeamSettings: React.FC<TeamSettingsProps> = ({ teamProfile }) => {
  const { toast } = useToast();
  
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      teamName: teamProfile?.team_name || '',
      email: teamProfile?.email || '',
      mobile: teamProfile?.mobile || '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onProfileSubmit = (data: z.infer<typeof profileSchema>) => {
    // Here you would typically send the data to your API
    console.log('Profile update:', data);
    toast({
      title: 'تم تحديث البيانات',
      description: 'تم تحديث بيانات الفريق بنجاح',
    });
  };

  const onPasswordSubmit = (data: z.infer<typeof passwordSchema>) => {
    // Here you would typically send the data to your API
    console.log('Password update:', data);
    toast({
      title: 'تم تغيير كلمة المرور',
      description: 'تم تغيير كلمة المرور بنجاح',
    });
    passwordForm.reset();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">إعدادات الحساب</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>بيانات الفريق</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <FormField
                control={profileForm.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الفريق</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={profileForm.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الجوال</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit" className="bg-tazkara-green hover:bg-tazkara-green/90">
                  حفظ التغييرات
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>تغيير كلمة المرور</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور الحالية</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور الجديدة</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تأكيد كلمة المرور الجديدة</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit" className="bg-tazkara-green hover:bg-tazkara-green/90">
                  تغيير كلمة المرور
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">حذف الحساب</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">حذف الحساب سيؤدي إلى فقدان جميع البيانات المرتبطة به بشكل نهائي.</p>
          <Button variant="destructive">
            حذف الحساب
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamSettings;
