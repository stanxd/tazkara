
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Calendar, Ticket, Users } from 'lucide-react';

interface TeamDashboardHomeProps {
  teamProfile: any;
}

const TeamDashboardHome: React.FC<TeamDashboardHomeProps> = ({ teamProfile }) => {
  // Placeholder data - in a real application this would come from the database
  const metrics = {
    upcomingMatches: 3,
    soldTickets: 1250,
    lastMatchAttendance: 85,
    alerts: [
      { id: 1, title: 'تنبيه المباراة', message: 'تبقى 3 أيام على المباراة القادمة مع النصر' },
      { id: 2, title: 'مبيعات التذاكر', message: 'مبيعات التذاكر للمباراة القادمة أقل من المتوقع' }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">المباريات القادمة</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.upcomingMatches}</div>
            <p className="text-xs text-muted-foreground">مباريات مجدولة</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">التذاكر المباعة</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.soldTickets}</div>
            <p className="text-xs text-muted-foreground">لجميع المباريات</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">نسبة الحضور</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.lastMatchAttendance}%</div>
            <p className="text-xs text-muted-foreground">في آخر مباراة</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">تنبيهات وإشعارات</h2>
        {metrics.alerts.map(alert => (
          <Alert key={alert.id}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default TeamDashboardHome;
