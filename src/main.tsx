
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Handle smooth scrolling for hash navigation
document.addEventListener('DOMContentLoaded', () => {
  // Handle initial hash in URL
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1); // Remove the # character
    setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navbar = document.querySelector('nav');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay to ensure DOM is ready
  }
  
  // Handle all hash links
  document.body.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const anchor = target.closest('a');
    
    if (anchor && anchor.hash && anchor.pathname === window.location.pathname) {
      event.preventDefault();
      const targetId = anchor.hash.substring(1);
      
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without reload
        history.pushState(null, '', anchor.hash);
      }
    }
  });
});

createRoot(document.getElementById("root")!).render(<App />);
