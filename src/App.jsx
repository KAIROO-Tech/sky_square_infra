import React, { useState } from 'react';
import { GridLines } from './components/common/GridLines';
import { NoiseOverlay } from './components/common/NoiseOverlay';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Marquee } from './components/sections/Marquee';
import { Ethos } from './components/sections/Ethos';
import { Archive } from './components/sections/Archive';
import { Competencies } from './components/sections/Competencies';
import { Consultation } from './components/sections/Consultation';
import { ProjectModal } from './components/sections/ProjectModal';

export const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [consultationProject, setConsultationProject] = useState(null);

  const handleOpenConsultation = (project = null) => {
    if (project) {
      setConsultationProject(project);
    }
    const el = document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreArchive = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F9F8F6] text-[#1A1A1A] font-sans antialiased overflow-x-hidden selection:bg-[#D4AF37] selection:text-white">
      
      {/* 4 Architectural Vertical Gridlines */}
      <GridLines />

      {/* Tactile Paper Noise Texture Overlay */}
      <NoiseOverlay />

      {/* Navigation Header */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      {/* Main Editorial Experience */}
      <main className="relative z-10 flex flex-col w-full">
        <Hero 
          onExploreArchive={handleExploreArchive} 
          onOpenConsultation={() => handleOpenConsultation()} 
        />
        <Marquee />
        <Ethos />
        <Archive onSelectProject={(project) => setSelectedProject(project)} />
        <Competencies />
        <Consultation 
          selectedProject={consultationProject} 
          onClearSelectedProject={() => setConsultationProject(null)} 
        />
      </main>

      {/* Architectural Project Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(project) => {
          setSelectedProject(null);
          handleOpenConsultation(project);
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
