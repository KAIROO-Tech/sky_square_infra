import React, { useState } from 'react';
import { Button } from '../common/Button';

export const Hero = ({ onExploreArchive, onOpenConsultation }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Hero Drone Architectural Visual
  const heroImageUrl = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

  return (
    <section className="relative w-full min-h-[100svh] lg:h-screen flex flex-col lg:flex-row pt-24 lg:pt-0 bg-[#F9F8F6] border-b border-[#1A1A1A]/10 overflow-hidden">
      
      {/* 60% Left Architectural Visual Container */}
      <div className="w-full lg:w-[58%] h-[50vh] sm:h-[60vh] lg:h-full relative overflow-hidden group bg-[#EBE5DE]/40">
        
        {/* Subtle Darkening Overlay */}
        <div className="absolute inset-0 bg-[#1A1A1A]/15 z-10 mix-blend-multiply transition-opacity duration-1000 group-hover:opacity-10 pointer-events-none" />
        
        {/* Architectural Framing Border */}
        <div className="absolute inset-0 shadow-inner-hairline z-20 pointer-events-none" />

        {/* Vertical Editorial Text Label */}
        <div 
          className="hidden md:block absolute left-8 top-12 z-20 text-[10px] uppercase font-sans tracking-[0.3em] text-white/90 bg-[#1A1A1A]/80 backdrop-blur-sm px-3 py-4 select-none border-l border-[#D4AF37]"
          style={{ writingMode: 'vertical-rl' }}
        >
          EDITORIAL / VOL. 01 — HYDERABAD GROWTH CORRIDORS
        </div>

        {/* Hero Architectural Image with Ultra-slow Grayscale to Color Reveal */}
        {!imageError ? (
          <img
            src={heroImageUrl}
            alt="Sky Square Infra Architectural Masterpiece"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              imageLoaded ? 'opacity-100' : 'opacity-80'
            }`}
          />
        ) : (
          /* High-end Architectural Placeholder if offline / blocked */
          <div className="w-full h-full flex flex-col justify-center items-center bg-[#1A1A1A] text-[#F9F8F6] p-12 relative">
            <div className="w-32 h-32 border border-[#D4AF37]/40 mb-6 flex items-center justify-center font-serif text-3xl text-[#D4AF37]">
              SQ
            </div>
            <span className="font-serif text-2xl tracking-wide uppercase text-white/90">
              Sky Square Architectural View
            </span>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] mt-2">
              Telangana Growth Sector
            </span>
          </div>
        )}

        {/* Floating Architecture Metric Pill */}
        <div className="absolute bottom-6 right-6 z-20 bg-[#F9F8F6]/90 backdrop-blur-md px-6 py-4 border border-[#1A1A1A]/10 shadow-feature hidden sm:flex items-center gap-6">
          <div className="flex flex-col">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6C6863]">Coordinates</span>
            <span className="font-serif text-sm font-semibold text-[#1A1A1A]">17.3850° N, 78.4867° E</span>
          </div>
          <div className="w-px h-8 bg-[#1A1A1A]/15" />
          <div className="flex flex-col">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6C6863]">Focus</span>
            <span className="font-serif text-sm font-semibold text-[#D4AF37]">Prime Telangana</span>
          </div>
        </div>
      </div>

      {/* 40% Right Editorial Column */}
      <div className="w-full lg:w-[42%] flex-1 flex flex-col justify-center py-16 lg:py-0 px-8 sm:px-12 md:px-16 lg:px-20 bg-[#F9F8F6] relative z-20">
        
        {/* Background Architectural Monogram Watermark */}
        <div 
          className="absolute -bottom-10 -right-6 text-[35vw] lg:text-[18vw] font-serif leading-none text-[#1A1A1A]/[0.025] select-none pointer-events-none z-0"
          aria-hidden="true"
        >
          01
        </div>

        <div className="max-w-xl relative z-10">
          
          {/* Overline with decorative horizontal line */}
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-px bg-[#D4AF37]" />
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
              Sky Square Infra
            </span>
          </div>

          {/* Extreme Scale Mixed Italic Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal leading-[0.95] text-[#1A1A1A] mb-8 tracking-tight">
            Defining the <br />
            <span className="italic text-[#1A1A1A]/90 font-normal">
              Hyderabad <span className="text-[#D4AF37]">Horizon.</span>
            </span>
          </h1>

          {/* Body Paragraph */}
          <p className="font-sans text-base md:text-lg text-[#6C6863] leading-relaxed font-light mb-10 max-w-lg">
            From government-grade infrastructure to luxury land development. We bridge the gap between visionary planning and grounded reality.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-6">
            <Button
              variant="primary"
              size="default"
              onClick={onExploreArchive}
            >
              Explore Archive
            </Button>

            <Button
              variant="link"
              onClick={onOpenConsultation}
            >
              Book Site Consultation
            </Button>
          </div>

          {/* Bottom Trust Stat Bar */}
          <div className="mt-14 pt-8 border-t border-[#1A1A1A]/10 grid grid-cols-3 gap-6">
            <div>
              <span className="block font-serif text-2xl md:text-3xl text-[#1A1A1A] font-normal">134K+</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6C6863]">SFT Developed</span>
            </div>
            <div>
              <span className="block font-serif text-2xl md:text-3xl text-[#1A1A1A] font-normal">100%</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6C6863]">Govt Compliance</span>
            </div>
            <div>
              <span className="block font-serif text-2xl md:text-3xl text-[#D4AF37] font-normal">2027</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6C6863]">Key Handovers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
