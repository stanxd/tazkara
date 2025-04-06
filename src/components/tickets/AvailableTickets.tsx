
import React from 'react';
import TicketCard, { TicketProps } from './TicketCard';

// Mock data for available tickets
const tickets: TicketProps[] = [
  {
    id: '1',
    homeTeam: 'الهلال',
    awayTeam: 'النصر',
    city: 'الرياض',
    stadium: 'مملكة آرينا',
    date: '١٥ أبريل ٢٠٢٥',
    time: '٨:٠٠ مساءً',
  },
  {
    id: '2',
    homeTeam: 'الاتحاد',
    awayTeam: 'الأهلي',
    city: 'جدة',
    stadium: 'الجوهرة',
    date: '١٧ أبريل ٢٠٢٥',
    time: '٩:٣٠ مساءً',
  },
  {
    id: '3',
    homeTeam: 'الشباب',
    awayTeam: 'الهلال',
    city: 'الرياض',
    stadium: 'مملكة آرينا',
    date: '٢٠ أبريل ٢٠٢٥',
    time: '١٠:٠٠ مساءً',
  },
  {
    id: '4',
    homeTeam: 'النصر',
    awayTeam: 'الاتحاد',
    city: 'الرياض',
    stadium: 'مملكة آرينا',
    date: '٢٢ أبريل ٢٠٢٥',
    time: '٨:٣٠ مساءً',
  },
  {
    id: '5',
    homeTeam: 'الأهلي',
    awayTeam: 'الشباب',
    city: 'جدة',
    stadium: 'الجوهرة',
    date: '٢٥ أبريل ٢٠٢٥',
    time: '٩:٠٠ مساءً',
  },
  {
    id: '6',
    homeTeam: 'الشباب',
    awayTeam: 'النصر',
    city: 'أبها',
    stadium: 'ملعب أبها',
    date: '٢٧ أبريل ٢٠٢٥',
    time: '٨:٠٠ مساءً',
  },
];

const AvailableTickets: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-tazkara-dark rtl">التذاكر المتوفرة</h2>
          <p className="text-gray-600 mt-2 rtl">احجز تذاكرك الآن لأقوى مباريات الدوري السعودي</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} {...ticket} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvailableTickets;
