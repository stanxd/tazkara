
import { Match } from "@/components/dashboard/matches/types";
import { getTeamProfiles } from "./storage/localStorageUtils";
import { isMatchInFuture } from "./utils/dateUtils";
import { matchToTicket } from "./tickets/ticketFormatter";

/**
 * Service for fetching and managing match data for the home page
 */
export const getAvailableMatches = (): Match[] => {
  // Fetch all matches from localStorage for all teams
  const allMatches: Match[] = [];
  
  console.log("Starting to fetch available matches from localStorage");
  
  // First, collect all team profiles to ensure we have team names
  const teamProfiles = getTeamProfiles();
  
  // Iterate through localStorage to find all matches
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("tazkara_team_matches_")) {
      try {
        const teamId = key.replace("tazkara_team_matches_", "");
        const matchesData = localStorage.getItem(key);
        
        if (!matchesData) {
          console.log(`No match data found for team key: ${key}`);
          continue;
        }
        
        const matches = JSON.parse(matchesData);
        console.log(`Processing ${matches.length} matches from team ID: ${teamId}`);
        
        // Only add future matches that have available tickets
        const futureMatches = matches.filter((match: Match) => {
          const isFuture = isMatchInFuture(match.date);
          const hasTickets = match.availableTickets > 0;
          
          if (!isFuture) console.log(`Match ${match.id} is not in the future: ${match.date}`);
          if (!hasTickets) console.log(`Match ${match.id} has no tickets available: ${match.availableTickets}`);
          
          return isFuture && hasTickets;
        });
        
        // Enhance matches with team information
        const enhancedMatches = futureMatches.map((match: Match) => {
          // Add the home team ID to the match object for better identification
          return {
            ...match,
            homeTeamId: teamId,
            homeTeam: teamProfiles[teamId]?.team_name || "فريق"
          };
        });
        
        allMatches.push(...enhancedMatches);
        
        console.log(`Added ${enhancedMatches.length} future matches from team ID: ${teamId}`);
        if (enhancedMatches.length > 0) {
          console.log("Sample match details:", enhancedMatches[0]);
        }
      } catch (error) {
        console.error("Error parsing matches from localStorage:", error);
      }
    }
  }
  
  console.log(`Total available matches found: ${allMatches.length}`);
  
  // Sort matches by date
  return allMatches.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
};

// Re-export ticketFormatter function for easier imports
export { matchToTicket };
