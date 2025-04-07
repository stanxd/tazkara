
import React, { useState, useEffect } from 'react';

const MatchCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 40,
    seconds: 46
  });
  
  useEffect(() => {
    // This is just for demo purposes
    // In a real app, you would calculate based on the actual match date
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="flex justify-center space-x-4 rtl:space-x-reverse">
      <div className="flex flex-col items-center">
        <div className="bg-[#13002A] w-16 h-16 rounded-lg flex items-center justify-center border border-purple-500/30">
          <span className="text-2xl font-bold text-white">{timeLeft.days}</span>
        </div>
        <span className="text-xs mt-2 text-gray-300 font-medium uppercase">أيام</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-[#13002A] w-16 h-16 rounded-lg flex items-center justify-center border border-purple-500/30">
          <span className="text-2xl font-bold text-white">{timeLeft.hours}</span>
        </div>
        <span className="text-xs mt-2 text-gray-300 font-medium uppercase">ساعات</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-[#13002A] w-16 h-16 rounded-lg flex items-center justify-center border border-purple-500/30">
          <span className="text-2xl font-bold text-white">{timeLeft.minutes}</span>
        </div>
        <span className="text-xs mt-2 text-gray-300 font-medium uppercase">دقائق</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="bg-[#13002A] w-16 h-16 rounded-lg flex items-center justify-center border border-purple-500/30">
          <span className="text-2xl font-bold text-white">{timeLeft.seconds}</span>
        </div>
        <span className="text-xs mt-2 text-gray-300 font-medium uppercase">ثواني</span>
      </div>
    </div>
  );
};

export default MatchCountdown;
