
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollToTickets: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to toggle visibility based on scroll position
    const toggleVisibility = () => {
      // Show button when page is scrolled down past 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTickets = () => {
    // Find the tickets section by ID and scroll to it
    const ticketsSection = document.getElementById('tickets');
    if (ticketsSection) {
      ticketsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTickets}
      className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 rounded-full shadow-lg shadow-purple-500/20 p-3 animate-fade-in"
      size="icon"
      aria-label="التمرير إلى المباريات القادمة"
    >
      <ChevronUp className="h-6 w-6" />
    </Button>
  );
};

export default ScrollToTickets;
