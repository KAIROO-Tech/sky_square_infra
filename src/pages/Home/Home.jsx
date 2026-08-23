import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandEntry } from '../../components/common/BrandEntry';
import { Hero } from '../../components/sections/Hero';
import { Ethos } from '../../components/sections/Ethos';
import { ScrollExpand } from '../../components/motion/ScrollExpand';
import { Transformation } from '../../components/sections/Transformation';
import { ArchiveGlimpse } from '../../components/sections/ArchiveGlimpse';
import { Competencies } from '../../components/sections/Competencies';
import { ConsultationCTA } from '../../components/sections/ConsultationCTA';

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
      {/* 1. Brand Intro Entry Animation */}
      <BrandEntry />

      {/* 2. Hero Section */}
      <Hero 
        onExploreArchive={handleExploreArchive} 
        onOpenConsultation={handleOpenConsultation} 
      />

      {/* 3. Ethos Section */}
      <Ethos />

      {/* 4. ScrollExpand Motion Bridge */}
      <ScrollExpand
        useWindowScroll={true}
        mediaUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
        badge="ARCHITECTURE IN MOTION"
        title="Engineering Beyond Boundaries"
        description="Master-planned land developments and high-precision civil infrastructure across Telangana's primary growth corridors."
      />

      {/* 5. Transformation Scroll Narrative */}
      <Transformation />

      {/* 6. Archive Glimpse Showcase */}
      <ArchiveGlimpse />

      {/* 7. Competencies Column Preview */}
      <Competencies />

      {/* 8. Consultation CTA */}
      <ConsultationCTA />
    </main>
  );
};

export default Home;
