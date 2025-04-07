
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle } from 'lucide-react';

interface FanWaitlistTicketsProps {
  userId: string;
}

// Mock data for demonstration - in a real app this would come from a database
const MOCK_WAITLIST_TICKETS = [
  {
    id: 'wt1',
    match: 'الهلال ضد النصر',
    date: '2025-04-15',
    status: 'pending',
    requestDate: '2025-04-02'
  },
  {
    id: 'wt2',
    match: 'الاتحاد ضد الأهلي',
    date: '2025-04-20',
    status: 'pending',
    requestDate: '2025-04-03'
  }
];

const FanWaitlistTickets: React.FC<FanWaitlistTicketsProps> = ({ userId }) => {
  const [waitlistTickets, setWaitlistTickets] = useState(MOCK_WAITLIST_TICKETS);

  if (waitlistTickets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="rtl">قائمة الانتظار</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-2 text-muted-foreground rtl">لا يوجد تذاكر في قائمة الانتظار</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="rtl">قائمة الانتظار</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="rtl">المباراة</TableHead>
              <TableHead className="rtl">تاريخ المباراة</TableHead>
              <TableHead className="rtl">تاريخ الطلب</TableHead>
              <TableHead className="rtl">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {waitlistTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="rtl">{ticket.match}</TableCell>
                <TableCell className="rtl">{new Date(ticket.date).toLocaleDateString('ar-SA')}</TableCell>
                <TableCell className="rtl">{new Date(ticket.requestDate).toLocaleDateString('ar-SA')}</TableCell>
                <TableCell>
                  <Badge className="rtl bg-yellow-500">قيد الانتظار</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="mt-4 bg-amber-50 p-3 rounded-md border border-amber-200 flex rtl">
          <AlertTriangle className="h-5 w-5 text-amber-500 ml-2" />
          <p className="text-sm text-amber-700">سيتم إشعارك عند توفر التذاكر. الأولوية للمشجعين الذين لم يتغيبوا عن مباريات سابقة.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FanWaitlistTickets;
