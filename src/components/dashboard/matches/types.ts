
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
}

export interface TeamProfile {
  team_name?: string;
  id?: string;
  mobile?: string;
  created_at?: string;
  registration_number?: string;
  email?: string;
}
