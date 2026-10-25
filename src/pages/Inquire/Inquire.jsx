import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { InquireHeader } from './components/InquireHeader';
import { Consultation } from '../../components/sections/Consultation';
import './Inquire.css';

export const Inquire = () => {
  const location = useLocation();
  const passedProject = location.state?.selectedProject || null;
  const [selectedProject, setSelectedProject] = useState(passedProject);

  useEffect(() => {
    if (location.state?.selectedProject) {
      setSelectedProject(location.state.selectedProject);
    }
  }, [location.state?.selectedProject]);

  useEffect(() => {
    if (location.hash === '#consultation' || location.state?.scrollToForm) {
      const scrollTimer = setTimeout(() => {
        const targetEl = document.getElementById('consultation');
        if (targetEl) {
          const headerOffset = 90;
          const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;

          if (window.lenis && typeof window.lenis.scrollTo === 'function') {
            window.lenis.scrollTo(targetY, { duration: 1.2 });
          } else {
            window.scrollTo({
              top: Math.max(0, targetY),
              behavior: 'smooth'
            });
          }
        }
      }, 100);

      return () => clearTimeout(scrollTimer);
    }
  }, [location.hash, location.state]);

  return (
    <div className="inquire-page-container w-full min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-primary)] selection:bg-[#d4af37]/30 selection:text-[#d4af37]">
      <InquireHeader />
      <Consultation 
        selectedProject={selectedProject}
        onClearSelectedProject={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Inquire;
