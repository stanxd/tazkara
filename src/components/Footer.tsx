
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Logo from './Logo';

const Footer: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted');
    // Handle form submission
  };

  return (
    <footer className="bg-[#13002A] border-t border-purple-500/20 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-6 rtl">اتصل بنا</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 rtl">
                <Label htmlFor="name">الاسم</Label>
                <Input id="name" className="bg-purple-900/20 text-white border-purple-500/40" placeholder="الاسم الكامل" />
              </div>
              <div className="space-y-2 rtl">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" className="bg-purple-900/20 text-white border-purple-500/40" placeholder="example@mail.com" />
              </div>
              <div className="space-y-2 rtl">
                <Label htmlFor="message">الرسالة</Label>
                <Textarea id="message" className="bg-purple-900/20 text-white border-purple-500/40 min-h-[120px]" placeholder="اكتب رسالتك هنا..." />
              </div>
              <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 w-full rtl">
                إرسال
              </Button>
            </form>
          </div>
          
          {/* Company Info */}
          <div className="order-1 md:order-2 flex flex-col items-start">
            <Logo />
            
            <div className="mt-6 rtl text-purple-200 space-y-2">
              <p>المملكة العربية السعودية، الرياض</p>
              <p>هاتف: 966-123-456789+</p>
              <p>البريد الإلكتروني: info@tazkara-plus.sa</p>
            </div>
            
            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4 rtl">ساعات العمل</h4>
              <div className="rtl text-purple-200 space-y-1">
                <p>من الأحد إلى الخميس: ٩ ص - ٥ م</p>
                <p>الجمعة والسبت: مغلق</p>
              </div>
            </div>
            
            <div className="mt-8 w-full border-t border-purple-500/20 pt-8 text-center md:text-right rtl">
              <p className="text-purple-300">© ٢٠٢٥ تذكرة+ | جميع الحقوق محفوظة</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
