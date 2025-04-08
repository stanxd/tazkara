
import { RealMatchData } from '../types';

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
