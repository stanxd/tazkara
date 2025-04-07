
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

interface AccountSettingsProps {
  fanProfile: any;
}

const profileSchema = z.object({
  name: z.string().min(2, { message: 'يجب أن يكون الاسم أكثر من حرفين' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
  mobile: z.string().min(10, { message: 'يجب أن يكون رقم الجوال 10 أرقام على الأقل' }),
  favorite_team: z.string().min(2, { message: 'يجب تحديد الفريق المفضل' }),
});

const AccountSettings: React.FC<AccountSettingsProps> = ({ fanProfile }) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: fanProfile?.name || '',
      email: fanProfile?.email || '',
      mobile: fanProfile?.mobile || '',
      favorite_team: fanProfile?.favorite_team || '',
    },
  });
  
  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    // Here you would typically send the data to your API
    console.log('Profile update:', data);
    toast({
      title: 'تم تحديث البيانات',
      description: 'تم تحديث بيانات الحساب بنجاح',
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="rtl">تعديل معلومات الحساب</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="rtl">الاسم</FormLabel>
                  <FormControl>
                    <Input {...field} className="rtl" />
                  </FormControl>
                  <FormMessage className="rtl" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="rtl">البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className="rtl" />
                  </FormControl>
                  <FormMessage className="rtl" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="rtl">رقم الجوال</FormLabel>
                  <FormControl>
                    <Input {...field} className="rtl" />
                  </FormControl>
                  <FormMessage className="rtl" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="favorite_team"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="rtl">الفريق المفضل</FormLabel>
                  <FormControl>
                    <Input {...field} className="rtl" />
                  </FormControl>
                  <FormMessage className="rtl" />
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
  );
};

export default AccountSettings;
