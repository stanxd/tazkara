
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { handleHashScroll, scrollToElement } from './utils/scrollUtils.ts'

// Handle smooth scrolling for hash navigation
document.addEventListener('DOMContentLoaded', () => {
  // Handle initial hash in URL
  handleHashScroll();
  
  // Handle all hash links
  document.body.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const anchor = target.closest('a');
    
    if (anchor && anchor.hash && anchor.pathname === window.location.pathname) {
      event.preventDefault();
      const targetId = anchor.hash.substring(1);
      
      scrollToElement(targetId);
      
      // Update URL without reload
      history.pushState(null, '', anchor.hash);
    }
  });
});

createRoot(document.getElementById("root")!).render(<App />);
