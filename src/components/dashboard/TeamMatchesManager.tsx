
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import MatchForm from '@/components/dashboard/matches/MatchForm';
import MatchesList from '@/components/dashboard/matches/MatchesList';
import { 
  cities, 
  stadiums, 
  getOpponentTeams, 
  getStoredMatches,
  saveMatchesToStorage,
  generateMatchId,
  isMatchInFuture
} from '@/components/dashboard/matches/matchUtils';
import { Match, TeamProfile } from '@/components/dashboard/matches/types';

interface TeamMatchesManagerProps {
  teamProfile: TeamProfile;
}

const TeamMatchesManager: React.FC<TeamMatchesManagerProps> = ({ teamProfile }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const { toast } = useToast();
  
  // Get current team name, ensuring we have a fallback
  const currentTeam = teamProfile?.team_name || '';
  const teamId = teamProfile?.id || 'default';
  
  // Filter out the current team from opponents
  const opponentTeams = getOpponentTeams(currentTeam);
  
  // Load matches from localStorage on component mount
  useEffect(() => {
    const storedMatches = getStoredMatches(teamId);
    console.log(`TeamMatchesManager - Loaded ${storedMatches.length} matches for team: ${currentTeam} (ID: ${teamId})`);
    setMatches(storedMatches);
  }, [teamId, currentTeam]);

  // Save matches to localStorage when they change
  useEffect(() => {
    if (matches.length > 0) {
      saveMatchesToStorage(matches, teamId);
      console.log(`TeamMatchesManager - Saved ${matches.length} matches for team ID: ${teamId}`);
      
      // Dispatch storage event to notify other components about the change
      window.dispatchEvent(new Event('storage'));
    }
  }, [matches, teamId]);

  const onSubmit = (data: {
    opponent: string;
    city: string;
    stadium: string;
    date: string;
    time: string;
    availableTickets: number;
    ticketPrice: number;
    importanceLevel?: string;
    expectedDemandLevel?: string;
    giftTickets?: number;
  }) => {
    // Create new match with generated ID
    const newMatch: Match = {
      id: generateMatchId(matches),
      opponent: data.opponent,
      city: data.city,
      stadium: data.stadium,
      date: data.date,
      time: data.time,
      availableTickets: data.availableTickets,
      ticketPrice: data.ticketPrice,
      isFuture: isMatchInFuture(data.date),
      importanceLevel: data.importanceLevel,
      expectedDemandLevel: data.expectedDemandLevel,
      homeTeam: currentTeam,
      homeTeamId: teamId,
      giftTickets: data.giftTickets || 0
    };
    
    console.log('Adding new match:', newMatch);
    
    // Add new match to state
    setMatches(prevMatches => [...prevMatches, newMatch]);
    
    // Show success toast
    toast({
      title: "تمت إضافة المباراة بنجاح",
      description: `تمت إضافة مباراة ${currentTeam} ضد ${data.opponent}`
    });
    
    // Close dialog
    setIsDialogOpen(false);
  };
  
  const handleDeleteMatch = (matchId: number) => {
    setMatches(prevMatches => prevMatches.filter(match => match.id !== matchId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">إدارة المباريات</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-tazkara-green hover:bg-tazkara-green/90">
              <Plus className="ml-2 h-4 w-4" />
              إضافة مباراة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg rtl">
            <DialogHeader>
              <DialogTitle>إضافة مباراة جديدة</DialogTitle>
            </DialogHeader>
            <MatchForm 
              opponentTeams={opponentTeams}
              cities={cities}
              stadiums={stadiums}
              onSubmit={onSubmit}
              onOpenChange={setIsDialogOpen}
              currentTeam={currentTeam}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المباريات</CardTitle>
        </CardHeader>
        <CardContent>
          <MatchesList 
            matches={matches} 
            onDeleteMatch={handleDeleteMatch}
            showGiftColumn={true}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamMatchesManager;
