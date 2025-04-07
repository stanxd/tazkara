
/**
 * Service providing data about popular/major teams
 */

/**
 * Array of teams considered to be popular/major
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
 * List of all major/popular teams for reference
 */
export const getMajorTeamsList = (): string[] => {
  return [...popularTeams];
};

// Export the array for internal usage
export { popularTeams };
