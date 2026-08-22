import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects';
import { ArchiveHero } from './components/ArchiveHero';
import { ProjectModal } from '../../components/sections/ProjectModal';
import { Button } from '../../components/common/Button';
import './Archive.css';

export const Archive = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.status.toLowerCase() === activeFilter.toLowerCase();
  });

  const handleInquireForProject = (project) => {
    setSelectedProject(null);
    navigate('/inquire', { state: { selectedProject: project } });
  };

  return (
    <div className="archive-page-container w-full min-h-screen bg-[#F9F8F6] text-[#1A1A1A]">
      <ArchiveHero />

      <section className="w-full py-20 md:py-28 px-8 md:px-16 border-b border-[#1A1A1A]/10">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Filter Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-[#1A1A1A]/10">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#6C6863] font-medium">
                Filter Portfolio Works
              </p>
            </div>

            <div className="flex gap-8 mt-6 md:mt-0 font-sans text-xs uppercase tracking-[0.25em]">
              {[
                { id: 'all', label: 'All Works' },
                { id: 'ongoing', label: 'Ongoing' },
                { id: 'completed', label: 'Completed' },
              ].map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`py-2 transition-all duration-500 relative cursor-pointer ${
                      isActive
                        ? 'text-[#1A1A1A] font-semibold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#D4AF37]'
                        : 'text-[#6C6863] hover:text-[#1A1A1A]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {filteredProjects.map((project, index) => {
              const isFullWidth = project.featured || (index === 0 && activeFilter === 'all');

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative overflow-hidden bg-[#1A1A1A] border border-[#1A1A1A]/20 shadow-feature cursor-pointer transition-all duration-700 ${
                    isFullWidth ? 'md:col-span-2 h-[520px] md:h-[620px]' : 'h-[480px] md:h-[540px]'
                  }`}
                >
                  {/* Background Architectural Image */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className={`object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-[1600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105 opacity-85 group-hover:opacity-100 ${
                        project.isBlueprint ? 'invert contrast-125 sepia-[0.3]' : ''
                      }`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 shadow-inner-hairline z-10 pointer-events-none" />
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
                    {project.isBlueprint && (
                      <span className="backdrop-blur-md bg-[#1A1A1A]/80 border border-[#D4AF37]/60 text-[#D4AF37] px-4 py-1.5 uppercase tracking-[0.25em] text-[10px] font-sans">
                        Architectural Blueprint
                      </span>
                    )}
                    <span className={`backdrop-blur-md px-3.5 py-1 uppercase tracking-[0.2em] text-[10px] font-sans border ${
                      project.status === 'ongoing'
                        ? 'bg-[#1A1A1A]/80 border-[#D4AF37]/40 text-[#D4AF37]'
                        : 'bg-[#1A1A1A]/80 border-white/30 text-white/90'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-700 z-10" />

                  {/* Content Panel */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 transform translate-y-24 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col justify-end h-full">
                    
                    <div className="mb-4">
                      <div className="flex gap-4 items-center mb-3">
                        <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#D4AF37] font-medium">
                          {project.location}
                        </span>
                        <div className="w-1 h-1 bg-[#D4AF37]" />
                        <span className="font-sans text-xs tracking-[0.25em] uppercase text-white/70">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-normal group-hover:text-[#F9F8F6] transition-colors duration-500">
                        {project.title}
                      </h3>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      <p className="text-white/80 font-sans text-sm md:text-base leading-relaxed max-w-2xl mb-6 font-light">
                        {project.summary}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-sans text-xs tracking-widest uppercase text-white/60 border-t border-white/15 pt-6 mt-4">
                        {project.metrics?.map((m, i) => (
                          <div key={i} className="flex flex-col gap-1">
                            <span className="text-[#D4AF37] text-[10px] tracking-[0.2em]">
                              {m.label}
                            </span>
                            <span className="text-white font-serif text-sm">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between pt-4">
                        <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] flex items-center gap-2 group-hover:underline">
                          <span>Inspect Architectural File</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Architecture CTA */}
          <div className="mt-20 p-12 bg-[#EBE5DE]/30 border-t-2 border-t-[#D4AF37] border border-[#1A1A1A]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h4 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] mb-2 font-normal">
                Have a land parcel or custom architectural project?
              </h4>
              <p className="font-sans text-sm text-[#6C6863] font-light">
                We provide turnkey feasibility studies, land demarcation, and civil structural engineering.
              </p>
            </div>
            <Button
              variant="primary"
              size="default"
              onClick={() => navigate('/inquire')}
            >
              Request Project Valuation
            </Button>
          </div>

        </div>
      </section>

      {/* Project Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquireForProject}
      />
    </div>
  );
};

export default Archive;
