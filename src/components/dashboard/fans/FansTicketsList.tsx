
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MessageSquare, Loader2 } from 'lucide-react';
import { FanTicket } from './types';
import { useToast } from '@/hooks/use-toast';

interface FansTicketsListProps {
  isLoading: boolean;
  tickets: FanTicket[];
}

const FansTicketsList: React.FC<FansTicketsListProps> = ({ isLoading, tickets }) => {
  const { toast } = useToast();

  const handleMessageFan = (fanId: string, fanName: string) => {
    toast({
      title: `إرسال رسالة`,
      description: `تم إرسال رسالة إلى ${fanName}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>قائمة المشجعين الذين اشتروا التذاكر</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-tazkara-green" />
            <span className="mr-2">جاري تحميل البيانات...</span>
          </div>
        ) : tickets.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>رقم الجوال</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>المباراة</TableHead>
                <TableHead>الفريق المفضل</TableHead>
                <TableHead>التواصل</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map(ticket => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.fan?.name || 'غير متوفر'}</TableCell>
                  <TableCell>{ticket.fan?.mobile || 'غير متوفر'}</TableCell>
                  <TableCell>{'غير متوفر'}</TableCell>
                  <TableCell>{`${ticket.home_team} ضد ${ticket.away_team}`}</TableCell>
                  <TableCell>{ticket.fan?.favorite_team || 'غير متوفر'}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleMessageFan(ticket.fan_id, ticket.fan?.name || 'المشجع')}
                    >
                      <MessageSquare className="h-4 w-4 ml-2" />
                      إرسال رسالة
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد بيانات للمشجعين حتى الآن
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FansTicketsList;
