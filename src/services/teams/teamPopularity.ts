
// Popular teams are marked with a flame icon and have higher demand
export const popularTeams = ["الهلال", "النصر", "الاتحاد"];

// Check if a team is considered popular (has high fan demand)
export const isPopularTeam = (teamName: string): boolean => {
  return popularTeams.includes(teamName);
};
