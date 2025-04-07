
import { Match } from '@/components/dashboard/matches/types';
import { getStoredMatches } from '@/components/dashboard/matches/matchUtils';

/**
 * Get available matches from all teams that have future dates
 * @returns Array of match objects
 */
export const getAvailableMatches = (): Match[] => {
  try {
    // Get all teams from localStorage (temporary implementation)
    const allTeamIds = getAllTeamIds();
    
    // Collect all matches from all teams
    let allMatches: Match[] = [];
    allTeamIds.forEach(teamId => {
      const teamMatches = getStoredMatches(teamId);
      allMatches = [...allMatches, ...teamMatches];
    });
    
    // Filter only future matches with available tickets
    const availableMatches = allMatches.filter(match => 
      match.isFuture && 
      match.availableTickets > 0
    );
    
    console.log('Available matches found:', availableMatches.length);
    if (availableMatches.length === 0) {
      console.log('No available matches found, team IDs checked:', allTeamIds);
    }
    
    return availableMatches;
  } catch (error) {
    console.error("Error getting available matches:", error);
    return [];
  }
};

/**
 * Get all team IDs from localStorage (temporary implementation)
 * In a real app, this would come from the database
 */
const getAllTeamIds = (): string[] => {
  try {
    // Get all keys from localStorage
    const allKeys = Object.keys(localStorage);
    
    // Filter keys that start with 'tazkara_team_matches_'
    const teamIds = allKeys
      .filter(key => key.startsWith('tazkara_team_matches_'))
      .map(key => key.replace('tazkara_team_matches_', ''));
    
    console.log('Found team IDs:', teamIds);
    return teamIds.length > 0 ? teamIds : ['default'];
  } catch (error) {
    console.error("Error getting team IDs:", error);
    return ['default']; // Fallback to default
  }
};

/**
 * Check if a user has received a gift ticket for a match
 * @param userId User ID to check
 * @param matchId Match ID to check
 * @returns Boolean indicating if user has a gift ticket
 */
export const hasGiftTicket = (userId: string, matchId: number): boolean => {
  // This is a placeholder implementation
  // In a real app, you would check this from a database
  
  // For now, simulate a 20% chance of having a gift ticket
  // This makes it testable in the UI
  return Math.random() < 0.2;
};
