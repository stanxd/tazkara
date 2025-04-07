
/**
 * Service for fetching and managing match data for the home page
 */
import { Match } from "@/components/dashboard/matches/types";
import { getTeamProfiles } from "../storage/localStorageUtils";
import { isMatchInFuture } from "../utils/dateUtils";
import { getPredefinedMatches } from "./predefinedMatches";

/**
 * Service for fetching available matches from localStorage
 */
export const getAvailableMatches = (): Match[] => {
  // Fetch all matches from localStorage for all teams
  const allMatches: Match[] = [];
  
  console.log("Starting to fetch available matches from localStorage");
  
  try {
    // First, collect all team profiles to ensure we have team names
    const teamProfiles = getTeamProfiles();
    
    // Check if there are matches in localStorage
    let hasMatchesInStorage = false;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("tazkara_team_matches_")) {
        hasMatchesInStorage = true;
        break;
      }
    }
    
    // If no matches in storage, use our predefined matches
    if (!hasMatchesInStorage) {
      console.log("No matches found in localStorage, using predefined matches");
      return getPredefinedMatches();
    }
    
    // Iterate through localStorage to find all matches
    allMatches.push(...collectMatchesFromStorage(teamProfiles));
  } catch (error) {
    console.error("Fatal error accessing localStorage:", error);
    // Return predefined matches if there's an error accessing localStorage
    return getPredefinedMatches();
  }
  
  console.log(`Total available matches found: ${allMatches.length}`);
  
  // If no matches found in localStorage, use predefined matches
  if (allMatches.length === 0) {
    console.log("No matches found in localStorage, using predefined matches");
    return getPredefinedMatches();
  }
  
  // Sort matches by date
  return sortMatchesByDate(allMatches);
};

/**
 * Helper function to collect matches from localStorage
 */
const collectMatchesFromStorage = (teamProfiles: Record<string, any>): Match[] => {
  const matches: Match[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith("tazkara_team_matches_")) continue;
    
    try {
      const teamId = key.replace("tazkara_team_matches_", "");
      const matchesData = localStorage.getItem(key);
      
      if (!matchesData) {
        console.log(`No match data found for team key: ${key}`);
        continue;
      }
      
      const teamMatches = JSON.parse(matchesData);
      console.log(`Processing ${teamMatches.length} matches from team ID: ${teamId}`);
      
      // Only add future matches that have available tickets
      const futureMatches = teamMatches.filter((match: Match) => {
        const isFuture = isMatchInFuture(match.date);
        const hasTickets = match.availableTickets > 0;
        
        if (!isFuture) console.log(`Match ${match.id} is not in the future: ${match.date}`);
        if (!hasTickets) console.log(`Match ${match.id} has no tickets available: ${match.availableTickets}`);
        
        return isFuture && hasTickets;
      });
      
      // Enhance matches with team information
      const enhancedMatches = futureMatches.map((match: Match) => {
        // Add the home team ID to the match object for better identification
        // Default to Al-Nasr if no team found
        const teamName = teamProfiles[teamId]?.team_name || "النصر";
        console.log(`Enhancing match ${match.id} with team name: ${teamName}`);
        
        return {
          ...match,
          homeTeamId: teamId,
          homeTeam: teamName.startsWith('فريق ') ? teamName : `فريق ${teamName}`,
          importanceLevel: match.importanceLevel || 'متوسطة', // Add default importance
          expectedDemandLevel: match.expectedDemandLevel || 'متوسط' // Add default demand
        };
      });
      
      matches.push(...enhancedMatches);
      
      console.log(`Added ${enhancedMatches.length} future matches from team ID: ${teamId}`);
      if (enhancedMatches.length > 0) {
        console.log("Sample match details:", JSON.stringify(enhancedMatches[0]));
      }
    } catch (error) {
      console.error(`Error processing matches for key ${key}:`, error);
    }
  }
  
  return matches;
};

/**
 * Helper function to sort matches by date
 */
const sortMatchesByDate = (matches: Match[]): Match[] => {
  try {
    return matches.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      // Handle invalid dates
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        console.warn("Invalid date encountered during sort:", a.date, b.date);
        return 0;
      }
      
      return dateA.getTime() - dateB.getTime();
    });
  } catch (error) {
    console.error("Error sorting matches:", error);
    return matches;
  }
};
