import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { InquireHeader } from './components/InquireHeader';
import { Consultation } from '../../components/sections/Consultation';
import './Inquire.css';

export const Inquire = () => {
  const location = useLocation();
  const passedProject = location.state?.selectedProject || null;
  const [selectedProject, setSelectedProject] = useState(passedProject);

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
