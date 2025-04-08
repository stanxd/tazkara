
import { TeamFanBase } from '../types';

/**
 * Team fan base estimates (updated with recent attendance data)
 */
export const teamFanBases: TeamFanBase = {
  'الهلال': 1000000,  // High overall fanbase with 73,000 recent attendance
  'النصر': 950000,    // High fanbase with 86,000 recent attendance
  'الأهلي': 850000,    // Strong fanbase with 129,000 recent attendance
  'الاتحاد': 900000,   // Very strong fanbase with 192,000 recent attendance
  'الشباب': 550000     // Solid fanbase
};

/**
 * Team home cities
 */
export const teamHomeCities: Record<string, string> = {
  'الهلال': 'الرياض',
  'النصر': 'الرياض',
  'الشباب': 'الرياض',
  'الاتحاد': 'جدة',
  'الأهلي': 'جدة'
};

/**
 * Historical match attendance rates (as percentage of capacity)
 */
export const historicalAttendanceRates: Record<string, number> = {
  'الهلال': 0.85,
  'النصر': 0.88,
  'الأهلي': 0.82,
  'الاتحاد': 0.90,
  'الشباب': 0.75
};
