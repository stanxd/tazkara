
import { Match } from '@/components/dashboard/matches/types';
import { getStoredMatches } from '@/components/dashboard/matches/matchUtils';
import { getPredefinedMatches } from './predefinedMatches';

/**
 * Get available matches from all teams that have future dates
 * @returns Array of match objects
 */
export const getAvailableMatches = (): Match[] => {
  try {
    // Get predefined matches that should always be shown
    const predefinedMatches = getPredefinedMatches().filter(match => match.alwaysShow);
    
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
    
    // Combine predefined matches with available matches
    // Use a Map to prevent duplicates by ID
    const matchesMap = new Map<number, Match>();
    
    // Add predefined matches first
    predefinedMatches.forEach(match => {
      matchesMap.set(match.id, match);
    });
    
    // Then add available matches, which will overwrite predefined matches if they have the same ID
    availableMatches.forEach(match => {
      matchesMap.set(match.id, match);
    });
    
    // Convert Map back to array
    const combinedMatches = Array.from(matchesMap.values());
    
    console.log('Combined matches found:', combinedMatches.length, 'including predefined matches');
    if (combinedMatches.length === 0) {
      console.log('No matches found, team IDs checked:', allTeamIds);
    }
    
    return combinedMatches;
  } catch (error) {
    console.error("Error getting available matches:", error);
    // Return at least the predefined matches as a fallback
    return getPredefinedMatches().filter(match => match.alwaysShow);
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
