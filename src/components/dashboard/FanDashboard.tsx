
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Ticket, CalendarCheck } from 'lucide-react';

interface FanDashboardProps {
  fanProfile: any;
}

const FanDashboard: React.FC<FanDashboardProps> = ({ fanProfile }) => {
  // Placeholder data for upcoming matches
  const upcomingMatches = [
    {
      id: 1,
      team1: 'النصر',
      team2: 'الهلال',
      date: '2025-04-15',
      time: '20:00',
      stadium: 'مملكة آرينا',
      city: 'الرياض',
      ticketPrice: 100
    },
    {
      id: 2,
      team1: 'الاتحاد',
      team2: 'الأهلي',
      date: '2025-04-20',
      time: '21:00',
      stadium: 'الجوهرة',
      city: 'جدة',
      ticketPrice: 120
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold rtl">لوحة التحكم</CardTitle>
          <CardDescription className="rtl">مرحباً بك في حسابك الشخصي</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 rtl">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">البريد الإلكتروني:</h3>
            <p>{fanProfile?.email}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">الاسم:</h3>
            <p>{fanProfile?.name}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">رقم الجوال:</h3>
            <p>{fanProfile?.mobile}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">الفريق المفضل:</h3>
            <p>{fanProfile?.favorite_team}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="rtl">المباريات القادمة</CardTitle>
          <CardDescription className="rtl">يمكنك شراء تذاكر للمباريات القادمة</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {upcomingMatches.map(match => (
            <div key={match.id} className="border-b p-4 rtl flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{match.date} - {match.time}</span>
                </div>
                <h3 className="font-semibold text-lg">{match.team1} ضد {match.team2}</h3>
                <div className="text-sm text-muted-foreground flex flex-col gap-1">
                  <span>{match.stadium} - {match.city}</span>
                  <span>سعر التذكرة: {match.ticketPrice} ر.س</span>
                </div>
              </div>
              <Button className="bg-tazkara-green hover:bg-tazkara-green/90 flex gap-2">
                <Ticket className="h-4 w-4" />
                شراء تذكرة
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FanDashboard;
