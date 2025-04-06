
/**
 * Utility functions for date operations related to matches
 */

/**
 * Helper function to check if a match date is in the future
 */
export const isMatchInFuture = (dateStr: string): boolean => {
  const matchDate = new Date(dateStr);
  const today = new Date();
  // Clear time part for date comparison
  today.setHours(0, 0, 0, 0);
  matchDate.setHours(0, 0, 0, 0);
  return matchDate >= today;
};

/**
 * Format date to Arabic display format
 */
export const formatDateToArabic = (dateStr: string): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  
  // Format the date in Gregorian calendar but with Arabic numerals and month names
  return date.toLocaleDateString('ar', options);
};

/**
 * Format time to Arabic display format (12-hour)
 */
export const formatTimeToArabic = (timeStr: string): string => {
  const timeParts = timeStr.split(':');
  let hours = parseInt(timeParts[0]);
  const minutes = timeParts[1];
  const period = hours >= 12 ? 'مساءً' : 'صباحاً';
  
  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  return `${hours}:${minutes} ${period}`;
};
