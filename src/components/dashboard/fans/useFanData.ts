
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

        // Process tickets and add gift fields (for demo purposes)
        // In a real app, these would come from the database
        const processedTickets = (ticketsData || []).map(ticket => {
          const isRandomGift = Math.random() > 0.5;
          return {
            ...ticket,
            isGift: isRandomGift,
            giftAccepted: isRandomGift ? Math.random() > 0.3 : false
          };
        });

        // Set tickets data
        setTickets(processedTickets as FanTicket[]);

        // Fetch data for all fans to analyze their favorite team preferences
        const { data: fansData, error: fansError } = await supabase
          .from('fans')
          .select('id, name, favorite_team')
          .order('created_at', { ascending: false });

        if (fansError) throw fansError;

        // Process fan preferences into chart data
        const teamCounts: Record<string, number> = {};

        (fansData || []).forEach((fan) => {
          if (fan.favorite_team) {
            // Normalize team name - strip "فريق " prefix if present
            const normalizedTeamName = fan.favorite_team.replace(/^فريق\s+/i, '').trim();
            if (normalizedTeamName) {
              teamCounts[normalizedTeamName] = (teamCounts[normalizedTeamName] || 0) + 1;
            }
          }
        });

        // Convert team counts to chart format and sort by count (descending)
        const chartData: TeamDistribution[] = Object.keys(teamCounts)
          .map(team => ({
            name: team,
            value: teamCounts[team]
          }))
          .sort((a, b) => b.value - a.value);

        // If data exists, use it; otherwise use default placeholder data
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
    const fansChannel = supabase
      .channel('fans_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'fans'
      }, (payload) => {
        console.log('Fans real-time update:', payload);
        // Refresh data upon changes
        fetchData();
      })
      .subscribe();

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

    // Cleanup
    return () => {
      supabase.removeChannel(ticketsChannel);
      supabase.removeChannel(fansChannel);
    };
  }, [teamProfile, toast]);

  return { isLoading, tickets, teamDistribution };
};
