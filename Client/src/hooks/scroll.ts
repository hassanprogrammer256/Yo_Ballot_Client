import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface UseActiveSectionProps {
  sectionIds: string[]; // Array of section IDs to track
  offset?: number; // Offset from top to trigger activation
}

export const useActiveSection = ({ sectionIds, offset = 100 }: UseActiveSectionProps) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Find the current active section based on scroll position
      const scrollPosition = window.scrollY + offset;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          
          // Check if the section is currently in view
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            if (activeSection !== sectionId) {
              setActiveSection(sectionId);
              
              // Update URL hash without triggering a re-render or scroll
              const newHash = `#${sectionId}`;
              if (location.hash !== newHash) {
                navigate(`${location.pathname}${newHash}`, { 
                  replace: true, // Replace history entry instead of adding new one
                  state: { fromScroll: true } // Prevent scroll-to-hash behavior
                });
              }
            }
            break;
          }
        }
      }
    };

    // Throttle scroll event for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [sectionIds, offset, activeSection, location.pathname, location.hash, navigate]);

  return activeSection;
};