/**
 * Service providing predefined match data
 */
import { Match } from "@/components/dashboard/matches/types";

/**
 * Function to create predefined matches as requested
 */
export const getPredefinedMatches = (): Match[] => {
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
    },
    {
      id: 2001,
      homeTeam: "فريق الهلال",
      opponent: "فريق الفتح",
      city: "الرياض",
      stadium: "مرسول بارك",
      date: getNextDate(7),
      time: "20:00",
      availableTickets: 1000,
      ticketPrice: 120,
      isFuture: true,
      importanceLevel: "متوسطة",
      expectedDemandLevel: "منخفض",
      alwaysShow: true
    },
    {
      id: 2002,
      homeTeam: "فريق الفيصلي",
      opponent: "فريق ضمك",
      city: "الرياض",
      stadium: "مدينة الملك سلمان الرياضية",
      date: getNextDate(10),
      time: "19:00",
      availableTickets: 800,
      ticketPrice: 80,
      isFuture: true,
      importanceLevel: "منخفضة",
      expectedDemandLevel: "منخفض",
      alwaysShow: true
    }
  ];
};

/**
 * Function to get teams with lower popularity
 * @returns Array of team names with lower popularity
 */
export const getLowerPopularityTeams = (): string[] => {
  return [
    "فريق الفتح",
    "فريق الفيصلي",
    "فريق ضمك"
  ];
};
