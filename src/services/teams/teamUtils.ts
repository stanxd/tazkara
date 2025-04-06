
/**
 * Utility functions for team-related operations
 */

import { Match } from "@/components/dashboard/matches/types";
import { getTeamProfileById, getMatchesByTeamId } from "../storage/localStorageUtils";

/**
 * Helper function to get the team name associated with a match
 */
export const getTeamNameFromMatch = (match: Match): string => {
  if (!match) {
    console.warn("getTeamNameFromMatch called with invalid match object");
    return "فريق غير معروف";
  }
  
  // If match already has homeTeam info from our enhanced matches, use it
  if (match.homeTeam) {
    return match.homeTeam;
  }
  
  // If match has homeTeamId, try to get the team profile directly
  if (match.homeTeamId) {
    const teamProfile = getTeamProfileById(match.homeTeamId);
    
    if (teamProfile?.team_name) {
      console.log(`Found team name for match ID ${match.id} using homeTeamId: ${teamProfile.team_name}`);
      return teamProfile.team_name;
    }
  }
  
  // Legacy lookup method - search all team matches
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith("tazkara_team_matches_")) continue;
      
      try {
        const teamId = key.replace("tazkara_team_matches_", "");
        const matches = getMatchesByTeamId(teamId);
        
        if (matches.some(m => m.id === match.id)) {
          const teamProfile = getTeamProfileById(teamId);
          
          if (teamProfile?.team_name) {
            console.log(`Found team name for match ID ${match.id}: ${teamProfile.team_name}`);
            return teamProfile.team_name;
          }
          
          break; // Break after finding the matching team, even if name wasn't found
        }
      } catch (error) {
        console.error(`Error searching matches for team in localStorage key ${key}:`, error);
      }
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }
  
  console.warn(`Could not find team name for match ID ${match.id}`);
  return "فريق غير معروف"; // Default if team name cannot be found
};

/**
 * Determine if price is fluctuating based on match parameters
 */
export const isPriceFluctuating = (match: Match): boolean => {
  if (!match || !match.importanceLevel || !match.expectedDemandLevel) {
    console.warn(`Missing match criteria for price fluctuation check: ${JSON.stringify(match)}`);
    return false;
  }
  
  return (
    (match.importanceLevel === 'عالية') || 
    (match.importanceLevel === 'متوسطة' && match.expectedDemandLevel === 'مرتفع')
  );
};

