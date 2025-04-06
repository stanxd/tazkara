
/**
 * Type definitions for the ticket pricing model
 */

// Stadium capacity data
export interface StadiumCapacity {
  [key: string]: number;
}

// Team fan base estimates
export interface TeamFanBase {
  [key: string]: number;
}

// Match type definitions
export interface MatchTypeDefinition {
  type: string;
  teams: string[][];
}

// Input data structure for pricing model
export interface PricingModelInput {
  homeTeam: string;
  awayTeam: string;
  city: string;
  stadium: string;
  day?: string;
  time: string;
  basePrice?: number;
  previousMatches?: {
    attendance: number;
    ticketPrice: number;
  }[];
}

// Output data structure from pricing model
export interface PricingModelOutput {
  recommendedPrice: number;
  confidenceScore: number;
  selloutProbability: 'Low' | 'Medium' | 'High' | 'Very High';
  notes: string;
}
