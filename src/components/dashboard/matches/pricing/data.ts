
import { StadiumCapacity, TeamFanBase, MatchTypeDefinition } from './types';

/**
 * Data constants for the pricing model
 */

// Stadium capacity data
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

// Team fan base estimates
export const teamFanBases: TeamFanBase = {
  'الهلال': 1200000,
  'النصر': 1000000,
  'الأهلي': 800000,
  'الاتحاد': 850000,
  'الشباب': 600000
};

// Match type categories
export const matchTypes: MatchTypeDefinition[] = [
  { type: 'ديربي', teams: [['الهلال', 'النصر'], ['الأهلي', 'الاتحاد']] },
  { type: 'قمة', teams: [['الهلال', 'الأهلي'], ['الهلال', 'الاتحاد'], ['النصر', 'الأهلي'], ['النصر', 'الاتحاد']] }
];
