
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
  homeTeam?: string;  // Added this property
  homeTeamId?: string; // Added this property
  giftTickets?: number; // Added for gift feature
  giftDistributed?: boolean; // Track if gifts have been distributed
}

export interface TeamProfile {
  team_name?: string;
  id?: string;
  mobile?: string;
  created_at?: string;
  registration_number?: string;
  email?: string;
}
