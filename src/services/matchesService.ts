
import { Match } from "@/components/dashboard/matches/types";

/**
 * Service for fetching and managing match data for the home page
 */
export const getAvailableMatches = (): Match[] => {
  // Fetch all matches from localStorage for all teams
  const allMatches: Match[] = [];
  
  console.log("Starting to fetch available matches from localStorage");
  
  // First, collect all team profiles to ensure we have team names
  const teamProfiles: Record<string, any> = {};
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

/**
 * Helper function to check if a match date is in the future
 */
const isMatchInFuture = (dateStr: string): boolean => {
  const matchDate = new Date(dateStr);
  const today = new Date();
  // Clear time part for date comparison
  today.setHours(0, 0, 0, 0);
  matchDate.setHours(0, 0, 0, 0);
  return matchDate >= today;
};

/**
 * Convert a match to a format suitable for the ticket card component
 */
export const matchToTicket = (match: Match) => {
  // Use the homeTeam directly from the enhanced match object if available
  const homeTeam = match.homeTeam || getTeamNameFromMatch(match);
  
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
    homeTeam: homeTeam,
    awayTeam: match.opponent,
    city: match.city,
    stadium: match.stadium,
    date: arabicDate,
    time: arabicTime,
    price: match.ticketPrice,
    isPriceFluctuating
  };
};

/**
 * Helper function to get the team name associated with a match
 */
const getTeamNameFromMatch = (match: Match): string => {
  // If match already has homeTeam info from our enhanced matches, use it
  if (match.homeTeam) return match.homeTeam;
  
  // If match has homeTeamId, try to get the team profile directly
  if (match.homeTeamId) {
    const teamProfileKey = `tazkara_team_profile_${match.homeTeamId}`;
    const teamProfileData = localStorage.getItem(teamProfileKey);
    
    if (teamProfileData) {
      try {
        const teamProfile = JSON.parse(teamProfileData);
        if (teamProfile.team_name) {
          console.log(`Found team name for match ID ${match.id} using homeTeamId: ${teamProfile.team_name}`);
          return teamProfile.team_name;
        }
      } catch (error) {
        console.error("Error parsing team profile:", error);
      }
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
          
          // Try to get the team profile from localStorage
          const teamProfileKey = `tazkara_team_profile_${teamId}`;
          const teamProfileData = localStorage.getItem(teamProfileKey);
          
          if (teamProfileData) {
            const teamProfile = JSON.parse(teamProfileData);
            console.log(`Found team name for match ID ${match.id}: ${teamProfile.team_name}`);
            return teamProfile.team_name || "فريق";
          }
          
          return "فريق";
        }
      } catch (error) {
        console.error("Error finding team for match:", error);
      }
    }
  }
  return "فريق"; // Default if team name cannot be found, removed "غير معروف"
};

