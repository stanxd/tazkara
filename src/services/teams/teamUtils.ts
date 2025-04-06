
/**
 * Utility functions for team-related operations
 */

import { Match } from "@/components/dashboard/matches/types";
import { getTeamProfileById } from "../storage/localStorageUtils";

/**
 * Helper function to get the team name associated with a match
 */
export const getTeamNameFromMatch = (match: Match): string => {
  // If match already has homeTeam info from our enhanced matches, use it
  if (match.homeTeam) return match.homeTeam;
  
  // If match has homeTeamId, try to get the team profile directly
  if (match.homeTeamId) {
    const teamProfile = getTeamProfileById(match.homeTeamId);
    
    if (teamProfile?.team_name) {
      console.log(`Found team name for match ID ${match.id} using homeTeamId: ${teamProfile.team_name}`);
      return teamProfile.team_name;
    }
  }
  
  // Legacy lookup method - search all team matches
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("tazkara_team_matches_")) {
      try {
        const matches = JSON.parse(localStorage.getItem(key) || "[]");
        if (matches.some((m: Match) => m.id === match.id)) {
          // Extract the team ID from the key
          const teamId = key.replace("tazkara_team_matches_", "");
          const teamProfile = getTeamProfileById(teamId);
          
          if (teamProfile?.team_name) {
            console.log(`Found team name for match ID ${match.id}: ${teamProfile.team_name}`);
            return teamProfile.team_name;
          }
          
          return "فريق";
        }
      } catch (error) {
        console.error("Error finding team for match:", error);
      }
    }
  }
  return "فريق"; // Default if team name cannot be found
};

/**
 * Determine if price is fluctuating based on match parameters
 */
export const isPriceFluctuating = (match: Match): boolean => {
  return (
    (match.importanceLevel === 'عالية') || 
    (match.importanceLevel === 'متوسطة' && match.expectedDemandLevel === 'مرتفع')
  );
};
