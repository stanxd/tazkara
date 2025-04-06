
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FanTicket, FanPreference, TeamDistribution } from './types';

export const useFanData = (teamProfile: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState<FanTicket[]>([]);
  const [teamDistribution, setTeamDistribution] = useState<TeamDistribution[]>([]);
  const { toast } = useToast();

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
          .select(`
            *,
            fan:fans(*)
          `)
          .eq('home_team', formattedTeamName);

        if (ticketsError) throw ticketsError;

        // Set tickets data
        setTickets(ticketsData as FanTicket[] || []);

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

  return { isLoading, tickets, teamDistribution };
};
