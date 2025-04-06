
import { StadiumCapacity, TeamFanBase, MatchTypeDefinition } from './types';

/**
 * Data constants for the pricing model
 */

// Stadium capacity data (updated with accurate capacities)
export const stadiumCapacities: StadiumCapacity = {
  'مملكة آرينا': 25000,
  'استاد الملك فهد الدولي': 67000,
  'مرسول بارك': 22000,
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
