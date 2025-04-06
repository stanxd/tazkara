
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/home/Hero';
import Founders from '@/components/about/Founders';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div id="tickets">
          {/* Placeholder for future ticket section */}
        </div>
        <Founders />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
