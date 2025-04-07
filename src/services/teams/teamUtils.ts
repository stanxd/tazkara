
/**
 * Utility functions for team-related operations
 */

import { Match } from "@/components/dashboard/matches/types";
import { getTeamProfileById, getMatchesByTeamId } from "../storage/localStorageUtils";
import { getLowerPopularityTeams } from "../matches/predefinedMatches";

/**
 * Helper function to get the team name associated with a match
 */
export const getTeamNameFromMatch = (match: Match): string => {
  if (!match) {
    console.warn("getTeamNameFromMatch called with invalid match object");
    return "فريق النصر"; // Default to Al-Nasr instead of unknown
  }
  
  // If match already has homeTeam info from our enhanced matches, use it
  if (match.homeTeam) {
    // If homeTeam is "فريق غير معروف", return "فريق النصر" instead
    if (match.homeTeam === "فريق غير معروف") {
      return "فريق النصر";
    }
    return match.homeTeam.startsWith('فريق ') ? match.homeTeam : `فريق ${match.homeTeam}`;
  }
  
  // If match has homeTeamId, try to get the team profile directly
  if (match.homeTeamId) {
    const teamProfile = getTeamProfileById(match.homeTeamId);
    
    if (teamProfile?.team_name) {
      const teamName = teamProfile.team_name;
      const formattedName = teamName.startsWith('فريق ') ? teamName : `فريق ${teamName}`;
      console.log(`Found team name for match ID ${match.id} using homeTeamId: ${formattedName}`);
      return formattedName;
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
            const teamName = teamProfile.team_name;
            const formattedName = teamName.startsWith('فريق ') ? teamName : `فريق ${teamName}`;
            console.log(`Found team name for match ID ${match.id}: ${formattedName}`);
            return formattedName;
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
  return "فريق النصر"; // Default to Al-Nasr instead of unknown
};

/**
 * Determine if price is fluctuating based on match parameters
 */
export const isPriceFluctuating = (match: Match): boolean => {
  if (!match || !match.importanceLevel || !match.expectedDemandLevel) {
    // Set default values for matches lacking importance/demand data
    return match && match.opponent === "الهلال"; // Make matches against Al-Hilal have fluctuating prices
  }
  
  return (
    (match.importanceLevel === 'عالية') || 
    (match.importanceLevel === 'متوسطة' && match.expectedDemandLevel === 'مرتفع')
  );
};

/**
 * Check if a team is considered low popularity
 */
export const isLowPopularityTeam = (teamName: string): boolean => {
  if (!teamName) return false;
  
  // Remove 'فريق ' prefix if it exists for comparison
  const normalizedName = teamName.startsWith('فريق ') ? teamName : `فريق ${teamName}`;
  
  // Check against our list of lower popularity teams
  return getLowerPopularityTeams().includes(normalizedName);
};
