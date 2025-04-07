
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
        
        allMatches.push(...enhancedMatches);
        
        console.log(`Added ${enhancedMatches.length} future matches from team ID: ${teamId}`);
        if (enhancedMatches.length > 0) {
          console.log("Sample match details:", JSON.stringify(enhancedMatches[0]));
        }
      } catch (error) {
        console.error(`Error processing matches for key ${key}:`, error);
      }
    }
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
  try {
    return allMatches.sort((a, b) => {
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
    return allMatches;
  }
};

// Function to create predefined matches as requested
const getPredefinedMatches = (): Match[] => {
  const nextMonth = new Date();
  nextMonth.setDate(nextMonth.getDate() + 7);
  
  const getNextDate = (daysToAdd: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  };
  
  return [
    {
      id: 1001,
      homeTeam: "فريق الهلال",
      opponent: "فريق النصر",
      city: "الرياض",
      stadium: "مرسول بارك",
      date: getNextDate(7),
      time: "20:00",
      availableTickets: 1000,
      ticketPrice: 150,
      isFuture: true,
      importanceLevel: "عالية",
      expectedDemandLevel: "عالي"
    },
    {
      id: 1002,
      homeTeam: "فريق الاتحاد",
      opponent: "فريق الاهلي",
      city: "جدة",
      stadium: "الجوهرة",
      date: getNextDate(10),
      time: "21:00",
      availableTickets: 800,
      ticketPrice: 120,
      isFuture: true,
      importanceLevel: "متوسطة",
      expectedDemandLevel: "عالي"
    },
    {
      id: 1003,
      homeTeam: "فريق الشباب",
      opponent: "فريق الهلال",
      city: "الرياض",
      stadium: "مدينة الملك فهد الرياضية",
      date: getNextDate(14),
      time: "19:30",
      availableTickets: 1200,
      ticketPrice: 100,
      isFuture: true,
      importanceLevel: "متوسطة",
      expectedDemandLevel: "متوسط"
    },
    {
      id: 1004,
      homeTeam: "فريق الاهلي",
      opponent: "فريق الهلال",
      city: "جدة",
      stadium: "مدينة الملك عبدالله الرياضية",
      date: getNextDate(21),
      time: "20:30",
      availableTickets: 900,
      ticketPrice: 130,
      isFuture: true,
      importanceLevel: "عالية",
      expectedDemandLevel: "عالي"
    },
    {
      id: 1005,
      homeTeam: "فريق النصر",
      opponent: "فريق الاتحاد",
      city: "الرياض",
      stadium: "مرسول بارك",
      date: getNextDate(25),
      time: "19:00",
      availableTickets: 1500,
      ticketPrice: 140,
      isFuture: true,
      importanceLevel: "عالية",
      expectedDemandLevel: "عالي"
    },
    {
      id: 1006,
      homeTeam: "فريق الفتح",
      opponent: "فريق الفيصلي",
      city: "الإحساء",
      stadium: "مدينة الأمير عبدالله بن جلوي الرياضية",
      date: getNextDate(28),
      time: "18:45",
      availableTickets: 600,
      ticketPrice: 80,
      isFuture: true,
      importanceLevel: "متوسطة",
      expectedDemandLevel: "منخفض"
    }
  ];
};

// Re-export ticketFormatter function for easier imports
export { matchToTicket };
