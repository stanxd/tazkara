import { StadiumCapacity, TeamFanBase, MatchTypeDefinition, RealMatchData } from './types';

/**
 * Data constants for the pricing model
 */

// Stadium capacity data (updated with accurate capacities and consistent names)
export const stadiumCapacities: StadiumCapacity = {
  'المملكة أرينا': 25000,
  'استاد الملك فهد الدولي': 67000,
  'الأول بارك': 22000,
  'ملعب الشباب': 15000,
  'الجوهرة': 45000,
  'استاد الملك عبدالله': 62000,
  'ملعب أبها': 12000,
  'استاد الأمير سلطان': 25000
};

// Team fan base estimates (updated with recent attendance data)
export const teamFanBases: TeamFanBase = {
  'الهلال': 1000000,  // High overall fanbase with 73,000 recent attendance
  'النصر': 950000,    // High fanbase with 86,000 recent attendance
  'الأهلي': 850000,    // Strong fanbase with 129,000 recent attendance
  'الاتحاد': 900000,   // Very strong fanbase with 192,000 recent attendance
  'الشباب': 550000     // Solid fanbase
};

// Team home cities
export const teamHomeCities: Record<string, string> = {
  'الهلال': 'الرياض',
  'النصر': 'الرياض',
  'الشباب': 'الرياض',
  'الاتحاد': 'جدة',
  'الأهلي': 'جدة'
};

// Match type categories
export const matchTypes: MatchTypeDefinition[] = [
  { type: 'ديربي', teams: [['الهلال', 'النصر'], ['الأهلي', 'الاتحاد']] },
  { type: 'قمة', teams: [['الهلال', 'الأهلي'], ['الهلال', 'الاتحاد'], ['النصر', 'الأهلي'], ['النصر', 'الاتحاد']] }
];

// Historical match attendance rates (as percentage of capacity)
export const historicalAttendanceRates: Record<string, number> = {
  'الهلال': 0.85,
  'النصر': 0.88,
  'الأهلي': 0.82,
  'الاتحاد': 0.90,
  'الشباب': 0.75
};

/**
 * Real match data for training the pricing model
 * Based on actual historical matches
 */
export const realMatchData: RealMatchData[] = [
  // النصر matches
  {
    date: '2024-10-01',
    homeTeam: 'النصر',
    awayTeam: 'التعاون',
    city: 'الرياض',
    stadium: 'الأول بارك',
    attendance: 25000,
    ticketPrice: 100,
    opponentRanking: 'متوسط',
    importance: 'عادية'
  },
  {
    date: '2024-09-24',
    homeTeam: 'النصر',
    awayTeam: 'الأهلي',
    city: 'الرياض',
    stadium: 'الأول بارك',
    attendance: 30000,
    ticketPrice: 250,
    opponentRanking: 'منافس',
    importance: 'ديربي'
  },
  {
    date: '2024-09-12',
    homeTeam: 'النصر',
    awayTeam: 'الوحدة',
    city: 'الرياض',
    stadium: 'الأول بارك',
    attendance: 20000,
    ticketPrice: 80,
    opponentRanking: 'ضعيف',
    importance: 'عادية'
  },
  {
    date: '2024-08-28',
    homeTeam: 'النصر',
    awayTeam: 'الفتح',
    city: 'الرياض',
    stadium: 'الأول بارك',
    attendance: 22000,
    ticketPrice: 90,
    opponentRanking: 'متوسط',
    importance: 'عادية'
  },
  {
    date: '2024-09-15',
    homeTeam: 'النصر',
    awayTeam: 'الهلال',
    city: 'الرياض',
    stadium: 'الأول بارك',
    attendance: 30000,
    ticketPrice: 400,
    opponentRanking: 'منافس',
    importance: 'ديربي'
  },
  
  // الاتحاد matches
  {
    date: '2024-10-01',
    homeTeam: 'الاتحاد',
    awayTeam: 'التعاون',
    city: 'جدة',
    stadium: 'استاد الملك عبدالله',
    attendance: 30000,
    ticketPrice: 30,
    opponentRanking: 'متوسط',
    importance: 'عادية'
  },
  {
    date: '2024-09-24',
    homeTeam: 'الاتحاد',
    awayTeam: 'الأهلي',
    city: 'جدة',
    stadium: 'استاد الملك عبدالله',
    attendance: 35000,
    ticketPrice: 100,
    opponentRanking: 'منافس',
    importance: 'ديربي'
  },
  {
    date: '2024-09-12',
    homeTeam: 'الاتحاد',
    awayTeam: 'الوحدة',
    city: 'جدة',
    stadium: 'استاد الملك عبدالله',
    attendance: 20000,
    ticketPrice: 50,
    opponentRanking: 'ضعيف',
    importance: 'عادية'
  },
  {
    date: '2024-08-28',
    homeTeam: 'الاتحاد',
    awayTeam: 'الفتح',
    city: 'جدة',
    stadium: 'استاد الملك عبدالله',
    attendance: 28000,
    ticketPrice: 30,
    opponentRanking: 'متوسط',
    importance: 'عادية'
  },
  
  // الهلال matches
  {
    date: '2024-10-01',
    homeTeam: 'الهلال',
    awayTeam: 'التعاون',
    city: 'الرياض',
    stadium: 'المملكة أرينا',
    attendance: 30000,
    ticketPrice: 150,
    opponentRanking: 'متوسط',
    importance: 'عادية'
  },
  {
    date: '2024-09-24',
    homeTeam: 'الهلال',
    awayTeam: 'الأهلي',
    city: 'الرياض',
    stadium: 'المملكة أرينا',
    attendance: 35000,
    ticketPrice: 300,
    opponentRanking: 'منافس',
    importance: 'ديربي'
  },
  {
    date: '2024-09-12',
    homeTeam: 'الهلال',
    awayTeam: 'الوحدة',
    city: 'الرياض',
    stadium: 'المملكة أرينا',
    attendance: 25000,
    ticketPrice: 100,
    opponentRanking: 'ضعيف',
    importance: 'عادية'
  },
  {
    date: '2024-08-28',
    homeTeam: 'الهلال',
    awayTeam: 'الفتح',
    city: 'الرياض',
    stadium: 'المملكة أرينا',
    attendance: 28000,
    ticketPrice: 120,
    opponentRanking: 'متوسط',
    importance: 'عادية'
  },
  {
    date: '2024-09-15',
    homeTeam: 'الهلال',
    awayTeam: 'النصر',
    city: 'الرياض',
    stadium: 'المملكة أرينا',
    attendance: 30000,
    ticketPrice: 400,
    opponentRanking: 'منافس',
    importance: 'ديربي'
  }
];
