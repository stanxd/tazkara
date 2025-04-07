
/**
 * Service for identifying popular teams in the system
 */

/**
 * Array of teams considered to be popular
 */
const popularTeams = [
  "الهلال",
  "النصر",
  "الأهلي", 
  "الاهلي",
  "الإتحاد",
  "الاتحاد"
];

/**
 * Check if a team is in the popular teams list
 */
export const isPopularTeam = (teamName: string): boolean => {
  // Clean up team name for comparison (remove "فريق " prefix if exists)
  const cleanTeamName = teamName.replace(/فريق /i, '').trim();
  
  // Case insensitive check for presence in popular teams list
  return popularTeams.some(
    popularTeam => cleanTeamName.toLowerCase() === popularTeam.toLowerCase()
  );
};
