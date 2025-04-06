
import { Match } from "@/components/dashboard/matches/types";

/**
 * Service for fetching and managing match data for the home page
 */
export const getAvailableMatches = (): Match[] => {
  // Fetch all matches from localStorage for all teams
  const allMatches: Match[] = [];
  
  // Iterate through localStorage to find all matches
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("tazkara_team_matches_")) {
      try {
        const matches = JSON.parse(localStorage.getItem(key) || "[]");
        // Only add future matches that have available tickets
        const futureMatches = matches.filter(
          (match: Match) => match.isFuture && match.availableTickets > 0
        );
        allMatches.push(...futureMatches);
      } catch (error) {
        console.error("Error parsing matches from localStorage:", error);
      }
    }
  }
  
  // If no matches are found, return an empty array (no fallback data)
  return allMatches.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
};

/**
 * Convert a match to a format suitable for the ticket card component
 */
export const matchToTicket = (match: Match) => {
  // Extract team name from the localStorage key
  const teamName = getTeamNameFromMatch(match);
  
  // Convert date from ISO format to Gregorian format (English)
  const date = new Date(match.date);
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  
  // Format the date in Gregorian calendar but with Arabic numerals and month names
  const arabicDate = date.toLocaleDateString('ar', options);
  
  // Convert time format
  const timeParts = match.time.split(':');
  let hours = parseInt(timeParts[0]);
  const minutes = timeParts[1];
  const period = hours >= 12 ? 'مساءً' : 'صباحاً';
  
  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  const arabicTime = `${hours}:${minutes} ${period}`;
  
  // Determine if price is stable based on match importance and demand
  // For demo purposes, we'll consider high-importance matches to have fluctuating prices
  const isPriceFluctuating = 
    (match.importanceLevel === 'عالية') || 
    (match.importanceLevel === 'متوسطة' && match.expectedDemandLevel === 'مرتفع');
  
  return {
    id: match.id.toString(),
    homeTeam: teamName,
    awayTeam: match.opponent,
    city: match.city,
    stadium: match.stadium,
    date: arabicDate,
    time: arabicTime,
    price: match.ticketPrice,
    isPriceFluctuating: isPriceFluctuating
  };
};

/**
 * Helper function to get the team name associated with a match
 */
const getTeamNameFromMatch = (match: Match): string => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("tazkara_team_matches_")) {
      try {
        const matches = JSON.parse(localStorage.getItem(key) || "[]");
        if (matches.some((m: Match) => m.id === match.id)) {
          // Extract the team ID from the key
          const teamId = key.replace("tazkara_team_matches_", "");
          // Try to get the team data from another storage if available (fallback to ID)
          return teamId;
        }
      } catch (error) {
        console.error("Error finding team for match:", error);
      }
    }
  }
  return "فريق غير معروف"; // Default if team name cannot be found
};
