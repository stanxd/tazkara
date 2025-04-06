
import React, { useState, useEffect } from 'react';
import { Ticket, Map } from 'lucide-react';
import { getAvailableMatches, matchToTicket } from '@/services/matchesService';
import ModernTicketCard from '@/components/tickets/ModernTicketCard';
import { Match } from '@/components/dashboard/matches/types';
import { TicketProps } from '@/components/tickets/TicketCard';
import { Skeleton } from '@/components/ui/skeleton';

const AvailableTickets: React.FC = () => {
  const [tickets, setTickets] = useState<TicketProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setIsLoading(true);
        // Get available matches from service
        const matches = getAvailableMatches();
        
        if (matches && matches.length > 0) {
          // Convert matches to ticket format
          const ticketData = matches.map(match => matchToTicket(match));
          setTickets(ticketData);
        } else {
          console.log("No available matches found");
        }
      } catch (error) {
        console.error("Error loading tickets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTickets();
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50" id="tickets">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-3">
            <Ticket className="w-6 h-6 text-tazkara-green mr-2" />
            <h2 className="text-3xl font-bold text-tazkara-dark rtl">التذاكر المتوفرة</h2>
          </div>
          <p className="text-gray-600 mt-2 rtl">استعرض أحدث التذاكر المتوفرة للمباريات القادمة</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <Skeleton className="h-[320px] w-full" />
              </div>
            ))}
          </div>
        ) : tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <ModernTicketCard 
                key={ticket.id} 
                {...ticket} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
            <Map className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 rtl">لا توجد تذاكر متوفرة حالياً</p>
            <p className="text-gray-400 mt-2 rtl">سيتم إضافة تذاكر جديدة قريباً</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableTickets;
