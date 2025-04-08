
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

// Linear regression model data types
export interface LinearRegressionModelDetails {
  slope: number;
  intercept: number;
  rSquared: number;
}

export interface TrainingDataPoint {
  features: number[];
  price: number;
  matchDetails?: {
    homeTeam: string;
    awayTeam: string;
    stadium: string;
    attendance: number;
  };
}

/**
 * Real match data structure from historical data
 */
export interface RealMatchData {
  date: string;
  homeTeam: string;
  awayTeam: string;
  city: string;
  stadium: string;
  attendance: number;
  ticketPrice: number;
  opponentRanking: 'منافس' | 'متوسط' | 'ضعيف';
  importance: 'ديربي' | 'عادية';
}
