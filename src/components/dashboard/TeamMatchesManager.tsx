
import React, { useState } from 'react';
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

import MatchForm from '@/components/dashboard/matches/MatchForm';
import MatchesList from '@/components/dashboard/matches/MatchesList';
import { 
  cities, 
  stadiums, 
  getOpponentTeams, 
  mockMatches 
} from '@/components/dashboard/matches/matchUtils';
import { TeamProfile } from '@/components/dashboard/matches/types';
import * as z from 'zod';

interface TeamMatchesManagerProps {
  teamProfile: TeamProfile;
}

const TeamMatchesManager: React.FC<TeamMatchesManagerProps> = ({ teamProfile }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Get current team name, ensuring we have a fallback
  const currentTeam = teamProfile?.team_name || '';
  
  // Filter out the current team from opponents
  const opponentTeams = getOpponentTeams(currentTeam);
  
  const matches = mockMatches;

  const onSubmit = (data: z.AnyZodObject) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to your API
    setIsDialogOpen(false);
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
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة المباريات</CardTitle>
        </CardHeader>
        <CardContent>
          <MatchesList matches={matches} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamMatchesManager;
