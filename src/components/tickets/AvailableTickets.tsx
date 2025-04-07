
import React, { useState, useEffect } from 'react';
import { Ticket, Map, Gift } from 'lucide-react';
import { getAvailableMatches, matchToTicket, hasGiftTicket } from '@/services/matches';
import ModernTicketCard from './card/ModernTicketCard';
import { Match } from '@/components/dashboard/matches/types';
import { TicketProps } from '@/components/tickets/TicketCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const AvailableTickets: React.FC = () => {
  const [tickets, setTickets] = useState<TicketProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCity, setActiveCity] = useState<string>("all");
  const { user } = useAuth();

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setIsLoading(true);
        // Get available matches from service
        const matches = getAvailableMatches();
        
        if (matches && matches.length > 0) {
          // Convert matches to ticket format
          const ticketData = matches.map(match => {
            const ticket = matchToTicket(match) as TicketProps;
            
            // Check if the current user has a gift ticket for this match
            if (user?.id && match.giftDistributed) {
              const hasGift = hasGiftTicket(user.id, match.id);
              if (hasGift) {
                ticket.isGift = true;
              }
            }
            
            return ticket;
          });
          
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
    
    // Listen for storage events to refresh tickets when matches are updated
    const handleStorageChange = () => {
      loadTickets();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user]);

  const filteredTickets = activeCity === "all" 
    ? tickets 
    : tickets.filter(ticket => ticket.city === activeCity);

  // Get unique cities from tickets, ensuring Riyadh and Jeddah are always included
  const cities = ["الرياض", "جدة", ...new Set(tickets.map(ticket => ticket.city))].filter(
    (city, index, self) => self.indexOf(city) === index
  );

  return (
    <section className="py-16 bg-gradient-to-b from-[#520082] to-[#13002A]" id="tickets">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3 rtl">
            المباريات القادمة
          </h2>
          <p className="text-purple-200 mt-2 mb-8 rtl">احجز تذكرتك الآن للمباريات القادمة</p>
          
          <div className="inline-flex bg-[#13002A]/80 backdrop-blur-sm p-1.5 rounded-lg border border-purple-500/20 mb-10">
            <Button 
              variant="ghost"
              onClick={() => setActiveCity("all")} 
              className={`mx-1 text-sm font-medium rtl ${activeCity === "all" ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white" : "text-purple-200 hover:text-white"}`}
            >
              جميع المباريات
            </Button>
            {cities.map(city => (
              <Button 
                key={city}
                variant="ghost" 
                onClick={() => setActiveCity(city)}
                className={`mx-1 text-sm font-medium rtl ${activeCity === city ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white" : "text-purple-200 hover:text-white"}`}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <Skeleton className="h-[320px] w-full bg-[#13002A]/50" />
              </div>
            ))}
          </div>
        ) : filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map((ticket) => (
              <ModernTicketCard 
                key={ticket.id} 
                {...ticket} 
                extraIcon={ticket.isGift ? <Gift className="h-5 w-5 text-amber-400" /> : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#13002A]/60 backdrop-blur-sm rounded-lg border border-purple-500/20">
            <Map className="w-16 h-16 text-purple-400/50 mx-auto mb-4" />
            <p className="text-xl text-purple-200 rtl">لا توجد تذاكر متوفرة حالياً</p>
            <p className="text-purple-300/60 mt-2 rtl">سيتم إضافة تذاكر جديدة قريباً</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AvailableTickets;
