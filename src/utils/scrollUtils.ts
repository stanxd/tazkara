
/**
 * Smoothly scrolls to the target element with offset for fixed header
 */
export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Get the navbar height to use as offset
  const navbar = document.querySelector('nav');
  const navbarHeight = navbar ? navbar.offsetHeight : 0;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Extra 20px padding
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Handles hash navigation scrolling with navbar offset
 */
export const handleHashScroll = () => {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1); // Remove the # character
    setTimeout(() => {
      scrollToElement(targetId);
    }, 100); // Small delay to ensure DOM is ready
  }
};

