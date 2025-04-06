
/**
 * Utility functions for team matches management
 */

export const cities = ['الرياض', 'جدة', 'أبها'];

export const stadiums = {
  'الرياض': ['مملكة آرينا', 'استاد الملك فهد الدولي'],
  'جدة': ['الجوهرة', 'استاد الملك عبدالله'],
  'أبها': ['ملعب أبها', 'استاد الأمير سلطان'],
};

export const allTeams = ['الهلال', 'النصر', 'الأهلي', 'الاتحاد', 'الشباب'];

export const getOpponentTeams = (currentTeam: string): string[] => {
  // Normalize team names for comparison by removing "فريق " prefix if present
  const normalizedCurrentTeam = currentTeam.replace('فريق ', '');
  
  return allTeams.filter(team => {
    const normalizedTeam = team.replace('فريق ', '');
    return normalizedTeam !== normalizedCurrentTeam;
  });
};

// Mock data for matches
export const mockMatches = [
  { 
    id: 1, 
    opponent: 'الهلال', 
    city: 'الرياض', 
    stadium: 'مملكة آرينا', 
    date: '2025-04-15', 
    time: '20:00', 
    availableTickets: 1000, 
    ticketPrice: 100,
    isFuture: true
  },
  { 
    id: 2, 
    opponent: 'الأهلي', 
    city: 'جدة', 
    stadium: 'الجوهرة', 
    date: '2025-05-01', 
    time: '21:00', 
    availableTickets: 1500, 
    ticketPrice: 120,
    isFuture: true
  },
  { 
    id: 3, 
    opponent: 'الشباب', 
    city: 'الرياض', 
    stadium: 'مملكة آرينا', 
    date: '2025-03-15', 
    time: '20:30', 
    availableTickets: 1200, 
    ticketPrice: 80,
    isFuture: false
  },
];
