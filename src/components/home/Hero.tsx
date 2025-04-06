import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const Hero: React.FC = () => {
  return <section className="relative bg-gradient-to-br from-tazkara-green to-tazkara-green/70 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624880357913-a8539238245b')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 rtl">
            احجز تذاكر مباريات كرة القدم بسهولة وأمان
          </h1>
          <p className="text-xl text-white/90 mb-8 rtl">
            منصة تذكرة+ توفر لك أسهل طريقة لشراء تذاكر المباريات وحضور أقوى المنافسات في الملاعب السعودية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-tazkara-green hover:bg-white/90 font-bold text-lg rtl">
                سجل الآن
              </Button>
            </Link>
            <a href="#tickets">
              <Button size="lg" variant="outline" className="border-white font-bold text-lg rtl bg-zinc-50 text-zinc-950">
                استعرض التذاكر
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Wave effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z">
          </path>
        </svg>
      </div>
    </section>;
};
export default Hero;