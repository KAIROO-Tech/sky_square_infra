import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import { Button } from '../common/Button';
import AnimatedContent from '../motion/AnimatedContent';
import { ArrowUpRight, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';

export const ArchiveGlimpse = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();

  // Target the 3 featured showcase projects requested or fallback to available
  const targetIds = ['indus-farm-lands', '4800-duplex-villa', 'mamidipally-connectivity'];
  const normalize = (str) =>
    (str || '')
      .toLowerCase()
      .trim()
      .replace(/-sft/g, '')
      .replace(/-project/g, '')
      .replace(/-blueprint/g, '');

  let showcaseProjects = targetIds
    .map((tid) => projects.find((p) => p.id === tid || normalize(p.id) === normalize(tid)))
    .filter(Boolean);

  if (showcaseProjects.length === 0 && projects.length > 0) {
    showcaseProjects = projects.slice(0, 3);
  }

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = showcaseProjects[activeProjectIndex] || showcaseProjects[0];


  return (
    <section className="w-full py-24 md:py-36 bg-[var(--color-page-bg)] px-6 sm:px-12 md:px-16 border-b border-[var(--color-border)] relative z-10">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <AnimatedContent distance={30} direction="vertical" delay={0.15}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-[var(--color-border)]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[var(--color-accent)]" />
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-medium">
                  Editorial Visual Showcase
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[var(--color-text-primary)] tracking-tight">
                Featured <span className="italic text-[var(--color-accent)]">Artifacts</span>
              </h2>
            </div>
            <p className="font-sans text-[var(--color-text-secondary)] max-w-md text-sm md:text-base mt-6 md:mt-0 font-light leading-relaxed">
              An architectural window into our landmark residential developments, private estates, and civil infrastructure.
            </p>
          </div>
        </AnimatedContent>

        {/* Single-Window Editorial Visual Showcase with Curtain/Wipe Crossfade */}
        {activeProject && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] shadow-xl p-6 sm:p-8 lg:p-10 mb-14 rounded-2xl overflow-hidden transition-colors duration-300">
            
            {/* Left Column: Architectural Curtain/Wipe Image Frame (7 Cols) */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] overflow-hidden group bg-[var(--color-surface-warm)] rounded-xl border border-[var(--color-border)]">
              {showcaseProjects.map((project, idx) => {
                const isActive = activeProjectIndex === idx;
                return (
                  <div
                    key={project.id}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                      isActive 
                        ? 'opacity-100 scale-100 z-10 pointer-events-auto' 
                        : 'opacity-0 scale-100 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 shadow-inner-hairline pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                    
                    {/* Status & Category Badges */}
                    <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
                      <span className="backdrop-blur-md bg-black/65 border border-[var(--color-accent)]/60 text-[var(--color-accent)] px-4 py-1.5 uppercase tracking-[0.25em] text-[10px] font-mono font-medium rounded-full">
                        {project.category}
                      </span>
                      <span className="backdrop-blur-md bg-black/65 border border-white/20 text-white/90 px-3.5 py-1.5 uppercase tracking-[0.2em] text-[10px] font-mono rounded-full">
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
                      <div className="flex items-center gap-2 text-[var(--color-accent)] text-xs font-mono uppercase tracking-[0.25em] mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{p.location}</span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-serif font-normal text-[var(--color-text-primary)] mb-4 tracking-tight">
                        {p.title}
                      </h3>

                      <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed font-light mb-6">
                        {p.summary}
                      </p>

                      {/* Key Metrics Grid */}
                      <div className="grid grid-cols-2 gap-4 border-y border-[var(--color-border)] py-5 mb-6">
                        {p.metrics?.slice(0, 4).map((m, i) => (
                          <div key={i} className="flex flex-col">
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                              {m.label}
                            </span>
                            <span className="font-serif text-base font-normal text-[var(--color-text-primary)] mt-1">
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
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-muted)] mb-3 font-medium">
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
                            ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-text-primary)] font-medium shadow-sm'
                            : 'border-[var(--color-border)] bg-[var(--color-surface-warm)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-xs ${isSelected ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`}>
                            0{index + 1}
                          </span>
                          <span className="font-serif text-sm tracking-wide">{p.title}</span>
                        </div>
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Inspect Details Button */}
                <div>
                  <button
                    onClick={() => navigate(`/archive/${activeProject.id}`)}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors cursor-pointer group font-semibold"
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
          <div className="flex flex-col sm:flex-row items-center justify-between p-8 sm:p-10 bg-[var(--color-surface-warm)] border border-[var(--color-border)] gap-6 rounded-xl shadow-sm">
            <div>
              <h4 className="font-serif text-xl sm:text-2xl text-[var(--color-text-primary)] font-normal mb-1">
                Explore the Complete Architectural Index
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[var(--color-text-secondary)] font-light">
                Browse our full portfolio of completed handovers, active sites, and pre-construction blueprints.
              </p>
            </div>

            <Button
              variant="primary"
              size="large"
              onClick={() => navigate('/archive')}
              className="bg-[#141416] text-[#F7F5F0] dark:bg-[var(--color-surface-elevated)] dark:text-[var(--color-text-primary)] border border-transparent dark:border-[var(--color-border-strong)] hover:bg-[var(--color-accent)] hover:text-white dark:hover:border-[var(--color-accent)] font-mono text-xs uppercase tracking-widest shadow-md transition-all"
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
