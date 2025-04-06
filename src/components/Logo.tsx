
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-2xl font-bold text-tazkara-green">TAZKARA</span>
      <span className="text-2xl font-bold text-tazkara-gold">+</span>
      <span className="text-xl font-bold text-tazkara-green mr-1 rtl">تذكرة</span>
      <span className="text-xl font-bold text-tazkara-gold rtl">+</span>
    </div>
  );
};

export default Logo;
