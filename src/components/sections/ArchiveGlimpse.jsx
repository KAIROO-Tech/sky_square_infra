import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects';
import { Button } from '../common/Button';
import AnimatedContent from '../motion/AnimatedContent';
import { ArrowUpRight, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';

export const ArchiveGlimpse = () => {
  const navigate = useNavigate();

  // Target the 3 featured showcase projects requested
  const targetIds = ['indus-farm-lands', '4800-duplex-villa', 'mamidipally-connectivity'];
  const showcaseProjects = targetIds
    .map(id => projects.find(p => p.id === id))
    .filter(Boolean);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = showcaseProjects[activeProjectIndex] || showcaseProjects[0];

  return (
    <section className="w-full py-24 md:py-36 bg-[#F9F8F6] px-6 sm:px-12 md:px-16 border-b border-[#1A1A1A]/10 relative z-10">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <AnimatedContent distance={30} direction="vertical" delay={0.15}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-[#1A1A1A]/10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#C5A880]" />
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
                  Editorial Visual Showcase
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#1A1A1A] tracking-tight">
                Featured <span className="italic text-[#C5A880]">Artifacts</span>
              </h2>
            </div>
            <p className="font-sans text-[#6C6863] max-w-md text-sm md:text-base mt-6 md:mt-0 font-light leading-relaxed">
              An architectural window into our landmark residential developments, private estates, and civil infrastructure.
            </p>
          </div>
        </AnimatedContent>

        {/* Single-Window Editorial Visual Showcase with Curtain/Wipe Crossfade */}
        {activeProject && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#0d0f11] text-white border border-white/15 shadow-2xl p-6 sm:p-8 lg:p-10 mb-14 rounded-2xl overflow-hidden">
            
            {/* Left Column: Architectural Curtain/Wipe Image Frame (7 Cols) */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] overflow-hidden group bg-[#000000] rounded-xl border border-white/10">
              {showcaseProjects.map((project, idx) => {
                const isActive = activeProjectIndex === idx;
                return (
                  <div
                    key={project.id}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                      isActive 
                        ? 'opacity-100 scale-105 z-10 pointer-events-auto' 
                        : 'opacity-0 scale-100 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 shadow-inner-hairline pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f11] via-transparent to-black/30" />
                    
                    {/* Status & Category Badges */}
                    <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                      <span className="backdrop-blur-md bg-black/70 border border-[#C5A880]/60 text-[#C5A880] px-4 py-1.5 uppercase tracking-[0.25em] text-[10px] font-mono font-medium rounded-full">
                        {project.category}
                      </span>
                      <span className="backdrop-blur-md bg-black/70 border border-white/20 text-white/90 px-3.5 py-1.5 uppercase tracking-[0.2em] text-[10px] font-mono rounded-full">
                        {project.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Interactive Inspector Panel with Micro-Animations (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between pt-4 lg:pt-0">
              
              {/* Active Project Specifications */}
              <div className="relative min-h-[220px]">
                {showcaseProjects.map((p, idx) => {
                  const isActive = activeProjectIndex === idx;
                  return (
                    <div
                      key={`spec-${p.id}`}
                      className={`transition-all duration-500 ease-out ${
                        isActive
                          ? 'opacity-100 translate-x-0 relative z-10 pointer-events-auto block'
                          : 'opacity-0 translate-x-4 absolute inset-0 z-0 pointer-events-none hidden'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-[#C5A880] text-xs font-mono uppercase tracking-[0.25em] mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{p.location}</span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-serif font-normal text-white mb-4 tracking-tight">
                        {p.title}
                      </h3>

                      <p className="font-sans text-sm text-white/75 leading-relaxed font-light mb-6">
                        {p.summary}
                      </p>

                      {/* Key Metrics Grid */}
                      <div className="grid grid-cols-2 gap-4 border-y border-white/15 py-5 mb-6">
                        {p.metrics?.slice(0, 4).map((m, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C5A880]">
                              {m.label}
                            </span>
                            <span className="font-serif text-base font-normal text-white mt-1">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Switcher Menu with Active Glowing Border Indicators */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 mb-3 font-medium">
                  Select Visual Showcase Artifact
                </p>
                <div className="space-y-2.5 mb-8">
                  {showcaseProjects.map((p, index) => {
                    const isSelected = activeProjectIndex === index;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setActiveProjectIndex(index)}
                        className={`w-full text-left px-4 py-3.5 rounded-lg border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#C5A880] bg-[#C5A880]/10 text-white shadow-[0_0_15px_rgba(197,168,128,0.15)] font-medium'
                            : 'border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-xs ${isSelected ? 'text-[#C5A880]' : 'text-white/40'}`}>
                            0{index + 1}
                          </span>
                          <span className="font-serif text-sm tracking-wide">{p.title}</span>
                        </div>
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 opacity-40" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Inspect Details Button */}
                <div>
                  <button
                    onClick={() => navigate(`/archive/${activeProject.id}`)}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C5A880] hover:text-white transition-colors cursor-pointer group"
                  >
                    <span>Inspect Full Architectural File</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Central Archive Navigation CTA */}
        <AnimatedContent distance={20} direction="vertical" delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-between p-8 sm:p-10 bg-[#EBE5DE]/30 border border-[#1A1A1A]/10 gap-6 rounded-xl">
            <div>
              <h4 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-normal mb-1">
                Explore the Complete Architectural Index
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#6C6863] font-light">
                Browse our full portfolio of completed handovers, active sites, and pre-construction blueprints.
              </p>
            </div>

            <Button
              variant="primary"
              size="large"
              onClick={() => navigate('/archive')}
              className="bg-[#1A1A1A] text-white hover:bg-[#C5A880] hover:text-[#0d0f11] font-mono text-xs uppercase tracking-widest"
            >
              Explore Complete Archive
            </Button>
          </div>
        </AnimatedContent>

      </div>
    </section>
  );
};

export default ArchiveGlimpse;
