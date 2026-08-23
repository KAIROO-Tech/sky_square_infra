import React, { useEffect, useState } from 'react';

export const ArchiveHero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculations: retreat, scale down slightly and fade as user scrolls
  const parallaxOffset = Math.min(scrollY * 0.35, 180);
  const parallaxOpacity = Math.max(1 - scrollY / 650, 0);
  const parallaxScale = Math.max(1 - scrollY / 2500, 0.94);

  return (
    <div className="relative pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-16 overflow-hidden bg-[#0c0c0c] border-b border-white/10 text-[#f5f5f7]">
      {/* Background Architectural Blueprint Grid & Glow */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.8) 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Parallax Content Container */}
      <div 
        className="max-w-[1600px] mx-auto relative z-10 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(0, ${parallaxOffset}px, 0) scale(${parallaxScale})`,
          opacity: parallaxOpacity,
          willChange: 'transform, opacity',
        }}
      >
        {/* Editorial Top Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-10 h-px bg-[#d4af37]" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold">
            DOSSIER REF: TELANGANA-2026 // ARCHITECTURAL PORTFOLIO
          </p>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-normal text-[#f5f5f7] leading-[1.03] tracking-tight">
              The Architectural <br />
              <span className="italic font-serif text-[#d4af37] font-light">Archive.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed font-light border-l border-[#d4af37]/40 pl-6">
              An exhaustive dossier of state civic infrastructure, master-planned farm enclaves, and bespoke residential duplexes engineered across Telangana’s prime growth corridors.
            </p>
          </div>
        </div>

        {/* Tactical Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 font-mono text-xs uppercase tracking-widest text-white/60">
          <div>
            <span className="block text-[10px] text-[#d4af37] tracking-[0.2em] mb-1">TOTAL FOOTPRINT</span>
            <span className="text-xl md:text-2xl font-serif text-[#f5f5f7] font-normal">168,300+ SFT</span>
          </div>
          <div>
            <span className="block text-[10px] text-[#d4af37] tracking-[0.2em] mb-1">ACTIVE SECTORS</span>
            <span className="text-xl md:text-2xl font-serif text-[#f5f5f7] font-normal">6 ENCLAVES</span>
          </div>
          <div>
            <span className="block text-[10px] text-[#d4af37] tracking-[0.2em] mb-1">EXECUTION TIER</span>
            <span className="text-xl md:text-2xl font-serif text-[#f5f5f7] font-normal">TURNKEY CIVIC & RESIDENTIAL</span>
          </div>
          <div>
            <span className="block text-[10px] text-[#d4af37] tracking-[0.2em] mb-1">GEOGRAPHIC CORRIDOR</span>
            <span className="text-xl md:text-2xl font-serif text-[#f5f5f7] font-normal">HYDERABAD / SHANKERPALLY</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ArchiveHero;
