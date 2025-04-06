
/**
 * Utility functions for localStorage operations related to teams and matches
 */

import { Match, TeamProfile } from "@/components/dashboard/matches/types";

/**
 * Get all team profiles stored in localStorage
 */
export const getTeamProfiles = (): Record<string, TeamProfile> => {
  const teamProfiles: Record<string, TeamProfile> = {};
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith("tazkara_team_profile_")) continue;
      
      try {
        const teamId = key.replace("tazkara_team_profile_", "");
        const profileData = localStorage.getItem(key);
        if (profileData) {
          const profile = JSON.parse(profileData);
          teamProfiles[teamId] = profile;
          console.log(`Loaded team profile for ${teamId}: ${profile.team_name || 'Unknown team'}`);
        }
      } catch (error) {
        console.error(`Error parsing team profile for key ${key}:`, error);
      }
    }
  } catch (error) {
    console.error("Fatal error accessing localStorage:", error);
  }
  
  return teamProfiles;
};

/**
 * Get team profile by ID
 */
export const getTeamProfileById = (teamId: string): TeamProfile | null => {
  if (!teamId) {
    console.warn("getTeamProfileById called with invalid teamId:", teamId);
    return null;
  }
  
  try {
    const teamProfileKey = `tazkara_team_profile_${teamId}`;
    const teamProfileData = localStorage.getItem(teamProfileKey);
    
    if (!teamProfileData) {
      console.warn(`No profile found for team ID: ${teamId}`);
      return null;
    }
    
    return JSON.parse(teamProfileData);
  } catch (error) {
    console.error(`Error retrieving team profile for ID ${teamId}:`, error);
    return null;
  }
};

/**
 * Get matches for a specific team ID
 */
export const getMatchesByTeamId = (teamId: string): Match[] => {
  if (!teamId) {
    console.warn("getMatchesByTeamId called with invalid teamId");
    return [];
  }
  
  try {
    const key = `tazkara_team_matches_${teamId}`;
    const matchesData = localStorage.getItem(key);
    
    if (!matchesData) {
      return [];
    }
    
    return JSON.parse(matchesData);
  } catch (error) {
    console.error(`Error retrieving matches for team ID ${teamId}:`, error);
    return [];
  }
};

