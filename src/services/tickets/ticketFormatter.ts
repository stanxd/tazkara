
/**
 * Service for converting match data to ticket display format
 */

import { Match } from "@/components/dashboard/matches/types";
import { getTeamNameFromMatch, isPriceFluctuating } from "../teams/teamUtils";
import { formatDateToArabic, formatTimeToArabic } from "../utils/dateUtils";

/**
 * Ensure team name has the 'فريق' prefix
 */
const ensureTeamPrefix = (teamName: string): string => {
  if (!teamName) return "فريق غير معروف";
  return teamName.startsWith('فريق ') ? teamName : `فريق ${teamName}`;
};

/**
 * Convert a match to a format suitable for the ticket card component
 */
export const matchToTicket = (match: Match) => {
  if (!match) {
    console.error("matchToTicket called with invalid match object");
    return {
      id: "error",
      homeTeam: "فريق غير معروف",
      awayTeam: "فريق غير معروف",
      city: "غير متوفر",
      stadium: "غير متوفر",
      date: "تاريخ غير متوفر",
      time: "وقت غير متوفر",
      price: 0,
      isPriceFluctuating: false
    };
  }
  
  try {
    // Use the homeTeam directly from the enhanced match object if available
    let homeTeam = match.homeTeam || getTeamNameFromMatch(match);
    homeTeam = ensureTeamPrefix(homeTeam);
    
    // Format date and time
    const arabicDate = formatDateToArabic(match.date);
    const arabicTime = formatTimeToArabic(match.time);
    
    // Determine if price is stable based on match importance and demand
    const isPriceFluctuatingValue = isPriceFluctuating(match);
    
    // Basic validation on values
    let awayTeam = match.opponent || "غير معروف";
    awayTeam = ensureTeamPrefix(awayTeam);
    
    const city = match.city || "غير متوفر";
    const stadium = match.stadium || "غير متوفر";
    const price = typeof match.ticketPrice === 'number' ? match.ticketPrice : 0;
    
    return {
      id: match.id?.toString() || "error",
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      city: city,
      stadium: stadium,
      date: arabicDate,
      time: arabicTime,
      price: price,
      isPriceFluctuating: isPriceFluctuatingValue
    };
  } catch (error) {
    console.error("Error formatting match to ticket:", error, match);
    return {
      id: match.id?.toString() || "error",
      homeTeam: "فريق غير معروف",
      awayTeam: "فريق غير معروف",
      city: "خطأ",
      stadium: "خطأ",
      date: "خطأ",
      time: "خطأ",
      price: 0,
      isPriceFluctuating: false
    };
  }
};
