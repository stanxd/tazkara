
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface Ticket {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  stadium: string;
  price: number;
}

interface FanTicketsProps {
  userId: string;
}

// Mock data for demonstration
const upcomingTickets: Ticket[] = [
  { id: '1', homeTeam: 'الهلال', awayTeam: 'النصر', date: '2025-04-15', time: '18:30', stadium: 'الملك فهد', price: 300 },
  { id: '2', homeTeam: 'الاتحاد', awayTeam: 'الأهلي', date: '2025-04-22', time: '20:00', stadium: 'مدينة الملك عبدالله', price: 250 },
];

const pastTickets: Ticket[] = [
  { id: '3', homeTeam: 'الهلال', awayTeam: 'الاتحاد', date: '2025-03-10', time: '19:00', stadium: 'الملك فهد', price: 200 },
  { id: '4', homeTeam: 'النصر', awayTeam: 'الأهلي', date: '2025-03-05', time: '18:00', stadium: 'مرسول بارك', price: 180 },
];

const FanTickets: React.FC<FanTicketsProps> = ({ userId }) => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState({ upcoming: [...upcomingTickets], past: [...pastTickets] });
  
  const canSellTicket = (date: string, time: string): boolean => {
    const ticketDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const fiveHoursInMs = 5 * 60 * 60 * 1000;
    return ticketDateTime.getTime() - now.getTime() > fiveHoursInMs;
  };
  
  const handleSellTicket = (ticketId: string) => {
    // Logic to sell the ticket would go here
    setTickets(prev => ({
      ...prev,
      upcoming: prev.upcoming.filter(ticket => ticket.id !== ticketId)
    }));
    
    toast({
      title: "تم بيع التذكرة",
      description: "تم بيع التذكرة بنجاح وسيتم إضافة المبلغ لحسابك",
    });
  };
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="rtl">تذاكر المباريات</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rtl">
            <TabsTrigger value="upcoming">المباريات القادمة</TabsTrigger>
            <TabsTrigger value="past">المباريات السابقة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {tickets.upcoming.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الفريقان</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">الوقت</TableHead>
                    <TableHead className="text-right">الملعب</TableHead>
                    <TableHead className="text-right">السعر</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.upcoming.map((ticket) => {
                    const sellable = canSellTicket(ticket.date, ticket.time);
                    return (
                      <TableRow key={ticket.id}>
                        <TableCell className="text-right">{ticket.homeTeam} ضد {ticket.awayTeam}</TableCell>
                        <TableCell className="text-right">{ticket.date}</TableCell>
                        <TableCell className="text-right">{ticket.time}</TableCell>
                        <TableCell className="text-right">{ticket.stadium}</TableCell>
                        <TableCell className="text-right">{ticket.price} ريال</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            onClick={() => handleSellTicket(ticket.id)}
                            disabled={!sellable}
                            variant={sellable ? "destructive" : "outline"}
                            size="sm"
                          >
                            {sellable ? "بيع التذكرة" : "لا يمكن البيع"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground rtl">
                لا توجد تذاكر للمباريات القادمة
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {tickets.past.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الفريقان</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">الوقت</TableHead>
                    <TableHead className="text-right">الملعب</TableHead>
                    <TableHead className="text-right">السعر</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.past.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="text-right">{ticket.homeTeam} ضد {ticket.awayTeam}</TableCell>
                      <TableCell className="text-right">{ticket.date}</TableCell>
                      <TableCell className="text-right">{ticket.time}</TableCell>
                      <TableCell className="text-right">{ticket.stadium}</TableCell>
                      <TableCell className="text-right">{ticket.price} ريال</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground rtl">
                لا توجد تذاكر للمباريات السابقة
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FanTickets;
