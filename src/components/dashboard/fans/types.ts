
export interface Fan {
  id: string;
  name: string;
  mobile: string;
  favorite_team: string;
}

export interface FanTicket {
  id: string;
  fan_id: string;
  match_id: number;
  home_team: string;
  away_team: string;
  purchase_date: string;
  ticket_price: number;
  fan?: Fan;
}

export interface FanPreference {
  id: string;
  fan_id: string;
  favorite_team: string;
}

export interface TeamDistribution {
  name: string;
  value: number;
}
