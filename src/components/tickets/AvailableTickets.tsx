
import React, { useState, useEffect } from 'react';
import TicketCard, { TicketProps } from './TicketCard';
import { getAvailableMatches, matchToTicket } from '@/services/matchesService';
import { Loader2 } from 'lucide-react';

const AvailableTickets: React.FC = () => {
  const [tickets, setTickets] = useState<TicketProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch all available matches when component mounts
  useEffect(() => {
    const loadTickets = () => {
      setIsLoading(true);
      const matches = getAvailableMatches();
      const ticketList = matches.map(match => matchToTicket(match));
      setTickets(ticketList);
      setIsLoading(false);
    };
    
    loadTickets();
    
    // Setup event listener for storage changes
    window.addEventListener('storage', loadTickets);
    
    return () => {
      window.removeEventListener('storage', loadTickets);
    };
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-tazkara-dark rtl">التذاكر المتوفرة</h2>
          <p className="text-gray-600 mt-2 rtl">سيتم إضافة تذاكر جديدة قريباً</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-tazkara-green" />
          </div>
        ) : tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} {...ticket} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 rtl">لا توجد تذاكر متاحة حالياً</p>
            <p className="text-gray-400 mt-2 rtl">ترقبوا إضافة مباريات جديدة قريباً</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableTickets;
