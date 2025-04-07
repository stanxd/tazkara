
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/home/Hero';
import PlatformBenefits from '@/components/home/PlatformBenefits';
import AvailableTickets from '@/components/tickets/AvailableTickets';
import Founders from '@/components/about/Founders';
import Footer from '@/components/Footer';
import ScrollToTickets from '@/components/home/ScrollToTickets';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#13002A]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div id="tickets">
          <AvailableTickets />
        </div>
        <PlatformBenefits />
        <Founders />
      </main>
      <Footer />
      <ScrollToTickets />
    </div>
  );
};

export default Index;
