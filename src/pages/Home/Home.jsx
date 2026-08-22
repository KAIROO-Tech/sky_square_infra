import React from 'react';
import { Hero } from '../../components/sections/Hero';
import { Marquee } from '../../components/sections/Marquee';
import { Ethos } from '../../components/sections/Ethos';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handleOpenConsultation = (project = null) => {
    navigate('/inquire', { state: { selectedProject: project } });
  };

  const handleExploreArchive = () => {
    navigate('/archive');
  };

  return (
    <main className="relative z-10 flex flex-col w-full">
      <Hero 
        onExploreArchive={handleExploreArchive} 
        onOpenConsultation={handleOpenConsultation} 
      />
      <Marquee />
      <Ethos />
    </main>
  );
};

export default Home;
