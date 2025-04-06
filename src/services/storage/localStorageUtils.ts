
/**
 * Utility functions for localStorage operations related to teams and matches
 */

import { Match, TeamProfile } from "@/components/dashboard/matches/types";

/**
 * Get all team profiles stored in localStorage
 */
export const getTeamProfiles = (): Record<string, TeamProfile> => {
  const teamProfiles: Record<string, TeamProfile> = {};
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("tazkara_team_profile_")) {
      try {
        const teamId = key.replace("tazkara_team_profile_", "");
        const profileData = localStorage.getItem(key);
        if (profileData) {
          const profile = JSON.parse(profileData);
          teamProfiles[teamId] = profile;
          console.log(`Loaded team profile for ${teamId}: ${profile.team_name}`);
        }
      } catch (error) {
        console.error("Error parsing team profile:", error);
      }
    }
  }
  
  return teamProfiles;
};

/**
 * Get team profile by ID
 */
export const getTeamProfileById = (teamId: string): TeamProfile | null => {
  try {
    const teamProfileKey = `tazkara_team_profile_${teamId}`;
    const teamProfileData = localStorage.getItem(teamProfileKey);
    
    if (teamProfileData) {
      return JSON.parse(teamProfileData);
    }
  } catch (error) {
    console.error("Error parsing team profile:", error);
  }
  
  return null;
};
