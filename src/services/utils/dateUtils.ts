
/**
 * Utility functions for date operations related to matches
 */

/**
 * Helper function to check if a match date is in the future
 */
export const isMatchInFuture = (dateStr: string): boolean => {
  if (!dateStr) {
    console.warn("isMatchInFuture called with invalid date string");
    return false;
  }
  
  try {
    const matchDate = new Date(dateStr);
    
    // Check if date is valid
    if (isNaN(matchDate.getTime())) {
      console.warn(`Invalid date format: ${dateStr}`);
      return false;
    }
    
    const today = new Date();
    // Clear time part for date comparison
    today.setHours(0, 0, 0, 0);
    matchDate.setHours(0, 0, 0, 0);
    return matchDate >= today;
  } catch (error) {
    console.error(`Error processing date ${dateStr}:`, error);
    return false;
  }
};

/**
 * Format date to Arabic display format
 */
export const formatDateToArabic = (dateStr: string): string => {
  if (!dateStr) {
    console.warn("formatDateToArabic called with invalid date string");
    return "تاريخ غير متوفر";
  }
  
  try {
    const date = new Date(dateStr);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date format: ${dateStr}`);
      return "تاريخ غير صالح";
    }
    
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    
    // Format the date in Gregorian calendar but with Arabic numerals and month names
    return date.toLocaleDateString('ar', options);
  } catch (error) {
    console.error(`Error formatting date ${dateStr} to Arabic:`, error);
    return "خطأ في التاريخ";
  }
};

/**
 * Format time to Arabic display format (12-hour)
 */
export const formatTimeToArabic = (timeStr: string): string => {
  if (!timeStr || !timeStr.includes(':')) {
    console.warn("formatTimeToArabic called with invalid time string:", timeStr);
    return "وقت غير متوفر";
  }
  
  try {
    const timeParts = timeStr.split(':');
    if (timeParts.length !== 2) {
      console.warn(`Invalid time format: ${timeStr}`);
      return "وقت غير صالح";
    }
    
    let hours = parseInt(timeParts[0]);
    const minutes = timeParts[1];
    
    if (isNaN(hours) || isNaN(parseInt(minutes))) {
      console.warn(`Invalid time components in: ${timeStr}`);
      return "وقت غير صالح";
    }
    
    const period = hours >= 12 ? 'مساءً' : 'صباحاً';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    return `${hours}:${minutes} ${period}`;
  } catch (error) {
    console.error(`Error formatting time ${timeStr} to Arabic:`, error);
    return "خطأ في الوقت";
  }
};

