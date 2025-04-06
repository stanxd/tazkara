
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { MessageSquare, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface TeamFansDataProps {
  teamProfile: any;
}

interface FanTicket {
  id: string;
  fan_id: string;
  match_id: number;
  home_team: string;
  away_team: string;
  purchase_date: string;
  ticket_price: number;
  fan?: Fan;
}

interface Fan {
  id: string;
  name: string;
  mobile: string;
  favorite_team: string;
}

interface FanPreference {
  id: string;
  fan_id: string;
  favorite_team: string;
}

interface TeamDistribution {
  name: string;
  value: number;
}

const TeamFansData: React.FC<TeamFansDataProps> = ({ teamProfile }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState<FanTicket[]>([]);
  const [teamDistribution, setTeamDistribution] = useState<TeamDistribution[]>([]);
  const { toast } = useToast();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    if (!teamProfile) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Get the team name to query tickets
        const teamName = teamProfile.team_name;
        const formattedTeamName = teamName.startsWith('فريق ') ? teamName : `فريق ${teamName}`;

        // First, fetch tickets where this team is the home team
        const { data: ticketsData, error: ticketsError } = await supabase
          .from('fan_tickets')
          .select('*, fan:fans(*)')
          .eq('home_team', formattedTeamName);

        if (ticketsError) throw ticketsError;

        // Set tickets data
        setTickets(ticketsData || []);

        // Get fan preferences for the pie chart
        const { data: preferencesData, error: preferencesError } = await supabase
          .from('fan_preferences')
          .select('*')
          .contains('favorite_team', teamName.replace('فريق ', ''));

        if (preferencesError) throw preferencesError;

        // Process preferences into chart data
        const teamCounts: Record<string, number> = {};

        (preferencesData || []).forEach((pref: FanPreference) => {
          const team = pref.favorite_team;
          teamCounts[team] = (teamCounts[team] || 0) + 1;
        });

        // Convert team counts to chart format
        const chartData: TeamDistribution[] = Object.keys(teamCounts).map(team => ({
          name: team,
          value: teamCounts[team]
        }));

        setTeamDistribution(chartData.length > 0 ? chartData : [
          { name: 'الهلال', value: 0 },
          { name: 'النصر', value: 0 },
          { name: 'الأهلي', value: 0 },
          { name: 'الاتحاد', value: 0 },
          { name: 'الشباب', value: 0 }
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching fan data:', error);
        toast({
          title: 'خطأ في تحميل البيانات',
          description: 'حدث خطأ أثناء تحميل بيانات المشجعين',
          variant: 'destructive'
        });
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up real-time listeners
    const ticketsChannel = supabase
      .channel('fan_tickets_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'fan_tickets'
      }, (payload) => {
        console.log('Tickets real-time update:', payload);
        // Refresh data upon changes
        fetchData();
      })
      .subscribe();

    const preferencesChannel = supabase
      .channel('fan_preferences_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'fan_preferences'
      }, (payload) => {
        console.log('Preferences real-time update:', payload);
        // Refresh data upon changes
        fetchData();
      })
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(ticketsChannel);
      supabase.removeChannel(preferencesChannel);
    };
  }, [teamProfile, toast]);

  // Function to send a message to a fan (placeholder)
  const handleMessageFan = (fanId: string, fanName: string) => {
    toast({
      title: `إرسال رسالة`,
      description: `تم إرسال رسالة إلى ${fanName}`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">بيانات الجمهور</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>توزيع المشجعين حسب الفريق المفضل</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-80 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-tazkara-green" />
              <span className="mr-2">جاري تحميل البيانات...</span>
            </div>
          ) : (
            <div className="h-80">
              <ChartContainer
                config={{
                  fans: {
                    label: "المشجعين",
                    theme: { light: "#10b981", dark: "#10b981" }
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={teamDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {teamDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          )}
        </CardContent>
      </Card>

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
    </div>
  );
};

export default TeamFansData;
