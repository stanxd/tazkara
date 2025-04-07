
/**
 * Utility functions for team matches management
 */

import { Match } from './types';

export const cities = ['الرياض', 'جدة', 'أبها'];

export const stadiums = {
  'الرياض': ['مملكة آرينا', 'استاد الملك فهد الدولي', 'مرسول بارك', 'ملعب الشباب'],
  'جدة': ['الجوهرة', 'استاد الملك عبدالله'],
  'أبها': ['ملعب أبها', 'استاد الأمير سلطان'],
};

export const allTeams = ['فريق الهلال', 'فريق النصر', 'فريق الأهلي', 'فريق الاتحاد', 'فريق الشباب'];

export const getOpponentTeams = (currentTeam: string): string[] => {
  // Normalize team names for comparison by removing "فريق " prefix if present
  const normalizedCurrentTeam = currentTeam.replace('فريق ', '');
  
  return allTeams.filter(team => {
    const normalizedTeam = team.replace('فريق ', '');
    return normalizedTeam !== normalizedCurrentTeam;
  });
};

// Initial mock data for matches
export const mockMatches = [
  { 
    id: 1, 
    opponent: 'الهلال', 
    city: 'الرياض', 
    stadium: 'مملكة آرينا', 
    date: '2025-04-15', 
    time: '20:00', 
    availableTickets: 1000, 
    ticketPrice: 100,
    isFuture: true,
    homeTeam: 'فريق النصر',
    homeTeamId: 'default'
  },
  { 
    id: 2, 
    opponent: 'الأهلي', 
    city: 'جدة', 
    stadium: 'الجوهرة', 
    date: '2025-05-01', 
    time: '21:00', 
    availableTickets: 1500, 
    ticketPrice: 120,
    isFuture: true,
    homeTeam: 'فريق النصر',
    homeTeamId: 'default'
  },
  { 
    id: 3, 
    opponent: 'الشباب', 
    city: 'الرياض', 
    stadium: 'مملكة آرينا', 
    date: '2025-03-15', 
    time: '20:30', 
    availableTickets: 1200, 
    ticketPrice: 80,
    isFuture: false,
    homeTeam: 'فريق النصر',
    homeTeamId: 'default'
  },
];

// LocalStorage key for storing matches
const MATCHES_STORAGE_KEY = 'tazkara_team_matches';

// Get matches from localStorage or use mockMatches if none exist
export const getStoredMatches = (teamId: string): Match[] => {
  try {
    const key = `${MATCHES_STORAGE_KEY}_${teamId}`;
    const storedMatches = localStorage.getItem(key);
    if (storedMatches) {
      const parsedMatches = JSON.parse(storedMatches);
      console.log(`Retrieved ${parsedMatches.length} matches for team ID: ${teamId}`);
      return parsedMatches;
    }
    console.log(`No stored matches found for team ID: ${teamId}, using mock data`);
    return mockMatches;
  } catch (error) {
    console.error("Error loading matches from localStorage:", error);
    return mockMatches;
  }
};

// Save matches to localStorage
export const saveMatchesToStorage = (matches: Match[], teamId: string): void => {
  try {
    const key = `${MATCHES_STORAGE_KEY}_${teamId}`;
    localStorage.setItem(key, JSON.stringify(matches));
    console.log(`Saved ${matches.length} matches for team ID: ${teamId} with key: ${key}`);
  } catch (error) {
    console.error("Error saving matches to localStorage:", error);
  }
};

// Helper to generate a unique ID for new matches
export const generateMatchId = (matches: Match[]): number => {
  if (matches.length === 0) return 1;
  const maxId = Math.max(...matches.map(match => match.id));
  return maxId + 1;
};

// Determine if a match date is in the future
export const isMatchInFuture = (dateStr: string): boolean => {
  const matchDate = new Date(dateStr);
  const today = new Date();
  // Clear time part for date comparison
  today.setHours(0, 0, 0, 0);
  matchDate.setHours(0, 0, 0, 0);
  return matchDate >= today;
};
