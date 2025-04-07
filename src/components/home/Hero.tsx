
import React from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MatchCountdown from './MatchCountdown';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#520082] to-[#1E0040] overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624880357913-a8539238245b')] bg-cover bg-center opacity-5"></div>
      
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#520082]/90 to-[#1E0040]/80"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 rtl">
            احجز تذكرتك الآن
          </h1>
          <p className="text-xl text-purple-100 mb-10 rtl leading-relaxed">
            منصة تذكرة+ توفر لك أسهل طريقة لحجز تذاكر مباريات كرة القدم بأسعار مناسبة وتجربة فريدة
          </p>
          
          {/* Featured Match Card */}
          <div className="bg-[#13002A]/80 backdrop-blur-sm rounded-xl p-6 mb-10 border border-purple-500/20 shadow-lg shadow-purple-500/10">
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse mb-1">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">نفاذ سريع</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 rtl">الديربي الكبير: الهلال ضد النصر</h2>
            <p className="text-gray-300 mb-4 rtl">ملعب مدينة الرياض - الرياض</p>
            
            <MatchCountdown />
            
            <Button size="lg" className="mt-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-bold text-lg rtl border-none">
              احجز تذكرتك الآن <Ticket className="mr-2 h-5 w-5 rtl:ml-2 rtl:mr-0" />
            </Button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center mt-16">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-white">+40</span>
            <span className="text-purple-200 mt-2 rtl">مباراة شهرياً</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-white">+100K</span>
            <span className="text-purple-200 mt-2 rtl">متفرج مسجل</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-white">16</span>
            <span className="text-purple-200 mt-2 rtl">فريق مشارك</span>
          </div>
        </div>
      </div>
      
      {/* Subtle wave effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path fill="#ffffff" fillOpacity="0.05" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z">
          </path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
