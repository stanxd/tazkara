
import React from 'react';
import { useFanData } from './fans/useFanData';
import TeamDistributionChart from './fans/TeamDistributionChart';
import FansTicketsList from './fans/FansTicketsList';

interface TeamFansDataProps {
  teamProfile: any;
}

const TeamFansData: React.FC<TeamFansDataProps> = ({ teamProfile }) => {
  const { isLoading, tickets, teamDistribution } = useFanData(teamProfile);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">بيانات الجمهور</h2>
      <TeamDistributionChart isLoading={isLoading} teamDistribution={teamDistribution} />
      <FansTicketsList isLoading={isLoading} tickets={tickets} />
    </div>
  );
};

export default TeamFansData;
