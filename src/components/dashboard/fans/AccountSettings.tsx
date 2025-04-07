import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Lock, Info } from 'lucide-react';

interface AccountSettingsProps {
  fanProfile: any;
}

const profileSchema = z.object({
  name: z.string().min(2, { message: 'يجب أن يكون الاسم أكثر من حرفين' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
  mobile: z.string().min(10, { message: 'يجب أن يكون رقم الجوال 10 أرقام على الأقل' }),
  id_number: z.string(),
  favorite_team: z.string().min(2, { message: 'يجب تحديد الفريق المفضل' }),
});

const AccountSettings: React.FC<AccountSettingsProps> = ({ fanProfile }) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: fanProfile?.name || '',
      email: 'mod@t.sa',
      mobile: fanProfile?.mobile || '',
      id_number: '1109878576',
      favorite_team: fanProfile?.name === 'محمد عبدالله' ? 'الهلال' : (fanProfile?.favorite_team || ''),
    },
  });
  
  // Update form when profile changes
  useEffect(() => {
    if (fanProfile) {
      const favoriteTeam = fanProfile.name === 'محمد عبدالله' ? 'الهلال' : fanProfile.favorite_team;
      
      form.reset({
        name: fanProfile.name || '',
        email: 'mod@t.sa',
        mobile: fanProfile.mobile || '',
        id_number: '1109878576',
        favorite_team: favoriteTeam || '',
      });
    }
  }, [fanProfile, form]);
  
  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    try {
      // Here you would typically send the data to your API
      const { error } = await supabase
        .from('fans')
        .update({
          name: data.name,
          mobile: data.mobile,
        })
        .eq('id', fanProfile.id);
        
      if (error) throw error;
      
      console.log('Profile update:', data);
      toast({
        title: 'تم تحديث البيانات',
        description: 'تم تحديث بيانات الحساب بنجاح',
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'خطأ في تحديث البيانات',
        description: error.message,
        variant: "destructive"
      });
    }
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
              name="id_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="rtl flex items-center">
                    رقم الهوية <Lock className="mr-1 h-4 w-4 text-gray-500" />
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="rtl bg-gray-100" 
                      readOnly 
                    />
                  </FormControl>
                  <FormDescription className="rtl text-xs text-gray-500">
                    لا يمكن تعديل رقم الهوية
                  </FormDescription>
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
                    <Input 
                      type="email" 
                      {...field} 
                      className="rtl" 
                      value="mod@t.sa"
                      onChange={(e) => {
                        field.onChange("mod@t.sa");
                      }}
                    />
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
                  <FormLabel className="rtl flex items-center">
                    الفريق المفضل <Info className="mr-1 h-4 w-4 text-blue-500" />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="rtl bg-gray-100" readOnly />
                  </FormControl>
                  <FormDescription className="rtl text-xs text-amber-600 font-medium">
                    لا يمكن تغيير الفريق المفضل إلا بعد الاشتراك في إحدى الباقات
                  </FormDescription>
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
