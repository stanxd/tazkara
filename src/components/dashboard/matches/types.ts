
export interface Match {
  id: number;
  opponent: string;
  city: string;
  stadium: string;
  date: string;
  time: string;
  availableTickets: number;
  ticketPrice: number;
  isFuture: boolean;
  importanceLevel?: string; 
  expectedDemandLevel?: string;
  homeTeam?: string;
  homeTeamId?: string;
  giftTickets?: number;
  giftDistributed?: boolean;
  alwaysShow?: boolean; // New flag to force showing certain matches
}

export interface TeamProfile {
  team_name?: string;
  id?: string;
  mobile?: string;
  created_at?: string;
  registration_number?: string;
  email?: string;
}
