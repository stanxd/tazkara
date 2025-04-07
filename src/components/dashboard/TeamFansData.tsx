
import React from 'react';
import { useFanData } from './fans/useFanData';
import TeamDistributionChart from './fans/TeamDistributionChart';
import FansTicketsList from './fans/FansTicketsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Ticket, ChartPie, UsersRound } from 'lucide-react';

interface TeamFansDataProps {
  teamProfile: any;
}

const TeamFansData: React.FC<TeamFansDataProps> = ({ teamProfile }) => {
  const { isLoading, tickets, teamDistribution } = useFanData(teamProfile);

  // Calculate statistics
  const totalFans = teamDistribution.reduce((sum, item) => sum + item.value, 0);
  const teamFans = teamDistribution.find(
    team => team.name.toLowerCase() === teamProfile.team_name.replace(/^فريق\s+/i, '').toLowerCase()
  )?.value || 0;
  const loyaltyPercentage = totalFans > 0 ? Math.round((teamFans / totalFans) * 100) : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">بيانات الجمهور</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المشجعين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFans}</div>
            <p className="text-xs text-muted-foreground mt-1">مجموع المشجعين المسجلين</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">مشجعي {teamProfile.team_name.replace(/^فريق\s+/i, '')}</CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamFans}</div>
            <div className="text-xs text-muted-foreground mt-1">نسبة الولاء: {loyaltyPercentage}%</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">التذاكر المباعة</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.length}</div>
            <p className="text-xs text-muted-foreground mt-1">عدد التذاكر المباعة لمباريات الفريق</p>
          </CardContent>
        </Card>
      </div>
      
      <TeamDistributionChart isLoading={isLoading} teamDistribution={teamDistribution} />
      <FansTicketsList isLoading={isLoading} tickets={tickets} />
    </div>
  );
};

export default TeamFansData;
