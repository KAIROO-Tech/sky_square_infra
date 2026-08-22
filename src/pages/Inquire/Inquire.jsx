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
    <div className="inquire-page-container w-full min-h-screen bg-[#F9F8F6] text-[#1A1A1A]">
      <InquireHeader />
      <Consultation 
        selectedProject={selectedProject}
        onClearSelectedProject={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Inquire;
