
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
  
  // Sort by date (closest matches first)
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
  
  return {
    id: match.id.toString(),
    homeTeam: match.opponent, // The opponent team in the saved match
    awayTeam: "الفريق المضيف", // This could be improved with actual team data
    city: match.city,
    stadium: match.stadium,
    date: arabicDate,
    time: arabicTime,
  };
};
