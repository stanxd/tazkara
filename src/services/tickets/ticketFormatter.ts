
/**
 * Service for converting match data to ticket display format
 */

import { Match } from "@/components/dashboard/matches/types";
import { getTeamNameFromMatch, isPriceFluctuating } from "../teams/teamUtils";
import { formatDateToArabic, formatTimeToArabic } from "../utils/dateUtils";

/**
 * Convert a match to a format suitable for the ticket card component
 */
export const matchToTicket = (match: Match) => {
  // Use the homeTeam directly from the enhanced match object if available
  const homeTeam = match.homeTeam || getTeamNameFromMatch(match);
  
  // Format date and time
  const arabicDate = formatDateToArabic(match.date);
  const arabicTime = formatTimeToArabic(match.time);
  
  // Determine if price is stable based on match importance and demand
  const isPriceFluctuatingValue = isPriceFluctuating(match);
  
  return {
    id: match.id.toString(),
    homeTeam: homeTeam,
    awayTeam: match.opponent,
    city: match.city,
    stadium: match.stadium,
    date: arabicDate,
    time: arabicTime,
    price: match.ticketPrice,
    isPriceFluctuating: isPriceFluctuatingValue
  };
};
