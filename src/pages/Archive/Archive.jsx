import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, Layers, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProjects } from '../../context/ProjectsContext';
import { ArchiveHero } from './components/ArchiveHero';
import { Button } from '../../components/common/Button';
import './Archive.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const Archive = () => {
  const { projects } = useProjects();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [cardMousePos, setCardMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);
  const navigate = useNavigate();

  const pinnedSectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Filter only active pinned projects for the Pinned Dossier Stack
  const pinnedProjects = projects
    .filter((p) => p.isPinned !== false)
    .sort((a, b) => (a.stackOrder ?? 0) - (b.stackOrder ?? 0));

  const filteredProjects = pinnedProjects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.status.toLowerCase() === activeFilter.toLowerCase();
  });

  const categoryCounts = {
    all: pinnedProjects.length,
    ongoing: pinnedProjects.filter((p) => p.status.toLowerCase() === 'ongoing').length,
    completed: pinnedProjects.filter((p) => p.status.toLowerCase() === 'completed').length,
  };


  // Viewport resize listener
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // GSAP ScrollTrigger pinned staging sequence with clean deck stacking & zero ghosting
  useEffect(() => {
    if (!isDesktop || !pinnedSectionRef.current) return;

    setActiveCardIndex(0);

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const totalCards = cards.length;
      if (!totalCards) return;

      // 1. Initial positions: Card 0 is 100% visible, all others below with proper z-indexes
      cards.forEach((card, index) => {
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 100,
          scale: index === 0 ? 1 : 0.95,
          opacity: index === 0 ? 1 : 0,
          zIndex: 10 + index,
          visibility: index === 0 ? 'visible' : 'hidden',
        });
      });

      if (totalCards <= 1) return;

      // 2. Build equalized scrub timeline where each step is exactly 1 unit of time
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedSectionRef.current,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          start: 'top top+=65',
          end: () => `+=${(totalCards - 1) * 120}%`,
          snap: {
            snapTo: 1 / (totalCards - 1),
            duration: { min: 0.2, max: 0.4 },
            delay: 0.05,
            ease: 'power1.out',
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const step = Math.round(self.progress * (totalCards - 1));
            setActiveCardIndex(Math.min(Math.max(step, 0), totalCards - 1));
          },
        },
      });

      // 3. Symmetrical transitions: Next card slides up cleanly, previous card hides completely
      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];

        // Ensure next card becomes visible before it enters
        tl.set(nextCard, { visibility: 'visible' }, i);

        // Slide next card up to center
        tl.to(
          nextCard,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 1.0,
            ease: 'power2.inOut',
          },
          i
        );

        // Fade & slightly scale down the outgoing card so it never bleeds through
        tl.to(
          currentCard,
          {
            scale: 0.94,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.inOut',
          },
          i + 0.3
        );

        // Once fully covered, hide previous card completely from rendering & clicks
        tl.set(currentCard, { visibility: 'hidden' }, i + 1);
      }
    }, pinnedSectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [activeFilter, isDesktop, filteredProjects.length]);

  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCardMousePos({ x, y });
    setHoveredCardId(id);
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
  };

  const handleCardClick = (projectId) => {
    navigate(`/archive/${projectId}`);
  };

  return (
    <div className="archive-page-container w-full min-h-screen bg-[#0c0c0c] text-[#f5f5f7] selection:bg-[#d4af37]/30 selection:text-[#d4af37]">
      {/* Hero Section with Parallax Effect */}
      <ArchiveHero />

      {/* Sticky Filter Header */}
      <div className="archive-sticky-filter py-4 px-6 md:px-16 border-b border-white/10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse" />
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/70">
              ARCHITECTURAL DOSSIER SECTORS ({filteredProjects.length} WORKS)
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter Architectural Projects"
            className="flex gap-2 p-1.5 bg-white/[0.03] border border-white/10 rounded-full font-mono text-xs uppercase tracking-wider"
          >
            {[
              { id: 'all', label: 'All Works' },
              { id: 'ongoing', label: 'Ongoing' },
              { id: 'completed', label: 'Completed' },
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              const count = categoryCounts[tab.id];

              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="archive-project-viewport"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-5 py-2 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#d4af37] ${
                    isActive
                      ? 'bg-[#d4af37] text-[#0c0c0c] font-semibold shadow-lg shadow-[#d4af37]/20'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-[#0c0c0c]/20 text-[#0c0c0c]' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Works Viewport Section */}
      <div ref={pinnedSectionRef} className="archive-pinned-wrapper px-6 md:px-16">
        <div className="max-w-[1600px] mx-auto relative">
          
          {/* Deck Header & Live Progress Tracker */}
          <div className="flex items-center justify-between mb-4 pt-2 font-mono text-xs uppercase tracking-widest text-white/60 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#d4af37]" />
              <span>PINNED DOSSIER STACK</span>
            </div>

            {isDesktop && (
              <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 px-4 py-1 rounded-full">
                <span className="text-[#d4af37] font-semibold">
                  {String(activeCardIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-white/30">/</span>
                <span>{String(filteredProjects.length).padStart(2, '0')}</span>
              </div>
            )}
          </div>

          {/* DESKTOP: GSAP Pinned Deck Viewport */}
          {isDesktop ? (
            <div
              id="archive-project-viewport"
              role="tabpanel"
              aria-labelledby={`tab-${activeFilter}`}
              className="archive-stack-viewport"
            >
              {filteredProjects.map((project, index) => {
                const isHovered = hoveredCardId === project.id;
                const firstGal = project.galleryImages?.[0];
                const fallbackGal = typeof firstGal === 'string' ? firstGal : firstGal?.url;
                const secondaryImage = project.hoverImage || fallbackGal;

                return (
                  <div
                    key={project.id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    onMouseMove={(e) => handleMouseMove(e, project.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleCardClick(project.id)}
                    className="archive-stack-card group cursor-pointer"
                  >
                    {/* Magnetic Cursor Spotlight */}
                    {isHovered && (
                      <div
                        className="pointer-events-none absolute -inset-px z-30 transition-opacity duration-300 opacity-100"
                        style={{
                          background: `radial-gradient(700px circle at ${cardMousePos.x}px ${cardMousePos.y}px, rgba(212, 175, 55, 0.16), transparent 45%)`,
                        }}
                      />
                    )}

                    {/* Card Architectural Header */}
                    <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
                      <div className="font-mono text-xs tracking-widest text-white/70 flex items-center gap-2 bg-[#0c0c0c]/70 backdrop-blur-md px-3.5 py-1.5 border border-white/10">
                        <span className="text-[#d4af37] font-semibold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span>//</span>
                        <span className="uppercase text-[10px] tracking-[0.2em]">{project.category}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.isBlueprint && (
                          <span className="backdrop-blur-md bg-[#0c0c0c]/80 border border-[#d4af37]/60 text-[#d4af37] px-3 py-1 uppercase tracking-[0.2em] text-[10px] font-mono">
                            Blueprint Stage
                          </span>
                        )}
                        <span
                          className={`backdrop-blur-md px-3.5 py-1 uppercase tracking-[0.2em] text-[10px] font-mono border ${
                            project.status.toLowerCase() === 'ongoing'
                              ? 'bg-[#d4af37]/20 border-[#d4af37]/50 text-[#d4af37]'
                              : 'bg-white/10 border-white/20 text-white/90'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Background Hero Image with Hover Crossfade */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                      {/* Primary Hero Image */}
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className={`archive-card-image ${
                          project.isBlueprint ? 'invert contrast-125 sepia-[0.3]' : ''
                        } ${isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'}`}
                      />

                      {/* Secondary Preview Plate on Hover */}
                      {secondaryImage && (
                        <img
                          src={secondaryImage}
                          alt={`${project.title} Preview Plate`}
                          className={`archive-card-image absolute inset-0 ${
                            project.isBlueprint ? 'invert contrast-125 sepia-[0.3]' : ''
                          } ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500 z-10" />
                    </div>

                    {/* Card Content Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20 flex flex-col justify-end h-full">
                      <div className="transform group-hover:-translate-y-1.5 transition-transform duration-500 ease-out max-w-4xl">
                        <div className="flex items-center gap-2 mb-1.5 text-[#d4af37] font-mono text-xs tracking-wider uppercase">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{project.location}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#f5f5f7] font-normal leading-tight group-hover:text-[#d4af37] transition-colors duration-300 mb-2">
                          {project.title}
                        </h3>

                        <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed line-clamp-2 font-light mb-4">
                          {project.summary}
                        </p>
                      </div>

                      {/* Dynamic Metrics Drawer */}
                      {project.metrics && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 my-1 border-t border-white/15 font-mono text-xs tracking-wider uppercase opacity-85 group-hover:opacity-100 transition-opacity duration-300 max-w-4xl">
                          {project.metrics.map((metric, i) => (
                            <div key={i} className="archive-metric-item">
                              <span className="block text-[10px] text-[#d4af37] tracking-widest">{metric.label}</span>
                              <span className="text-white font-serif text-sm font-normal">{metric.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Pill Button */}
                      <div className="pt-3 flex items-center justify-between">
                        <button
                          type="button"
                          className="archive-pill-btn group-hover:bg-[#d4af37]/20 group-hover:border-[#d4af37]"
                        >
                          <span>Inspect Architectural File</span>
                          <ArrowRight className="w-3.5 h-3.5 arrow-icon text-[#d4af37]" />
                        </button>

                        <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                          DOSSIER FILE #{project.id.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* MOBILE: Cascading Feed */
            <div className="flex flex-col gap-8">
              {filteredProjects.map((project) => {
                const firstGal = project.galleryImages?.[0];
                const fallbackGal = typeof firstGal === 'string' ? firstGal : firstGal?.url;
                const secondaryImage = project.hoverImage || fallbackGal;

                return (
                  <div
                    key={project.id}
                    onClick={() => handleCardClick(project.id)}
                    className="archive-mobile-card group cursor-pointer p-6 flex flex-col justify-end"
                  >
                    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className="archive-card-image group-hover:opacity-0"
                      />
                      {secondaryImage && (
                        <img
                          src={secondaryImage}
                          alt={`${project.title} Preview`}
                          className="archive-card-image absolute inset-0 opacity-0 group-hover:opacity-100"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/70 to-transparent z-10" />
                    </div>

                    <div className="relative z-20">
                      <span className="text-[#d4af37] font-mono text-xs uppercase tracking-wider block mb-1">
                        {project.location}
                      </span>
                      <h3 className="text-2xl font-serif text-white mb-2">{project.title}</h3>
                      <p className="text-white/70 text-xs line-clamp-2 mb-4 font-light">{project.summary}</p>
                      <div className="flex items-center justify-between border-t border-white/10 pt-3">
                        <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest flex items-center gap-1">
                          Inspect File <ChevronRight className="w-3 h-3" />
                        </span>
                        <span className="font-mono text-[10px] text-white/50 uppercase">{project.status}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* Luxury Architectural Valuation CTA Section */}
      <section className="w-full py-16 px-6 md:px-16 border-t border-white/10 bg-[#0c0c0c]">
        <div className="max-w-[1600px] mx-auto">
          <div className="p-8 md:p-14 bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-white/[0.04] border-t-2 border-t-[#d4af37] border border-white/10 backdrop-blur-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl z-10">
              <div className="flex items-center gap-2 text-[#d4af37] font-mono text-xs uppercase tracking-widest mb-3">
                <Sparkles className="w-4 h-4" />
                <span>TURNKEY LAND &amp; STRUCTURAL ENGINEERING</span>
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#f5f5f7] mb-3 font-normal leading-snug">
                Have a land parcel or custom architectural project?
              </h4>
              <p className="font-sans text-sm md:text-base text-white/70 font-light leading-relaxed">
                We provide comprehensive feasibility studies, land demarcation, structural civil blueprints, and turnkey construction management across Telangana.
              </p>
            </div>

            <div className="z-10 w-full lg:w-auto">
              <Button
                variant="primary"
                size="default"
                onClick={() => navigate('/inquire')}
                className="w-full sm:w-auto bg-[#d4af37] text-[#0c0c0c] hover:bg-[#c29f2f] font-mono text-xs uppercase tracking-wider font-semibold py-4 px-8 shadow-lg shadow-[#d4af37]/20"
              >
                Request Project Valuation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Archive;
