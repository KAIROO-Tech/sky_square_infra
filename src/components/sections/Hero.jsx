import React, { useState } from 'react';
import { Button } from '../common/Button';
import AnimatedContent from '../motion/AnimatedContent';
import Marquee from './Marquee';

export const Hero = ({ onExploreArchive, onOpenConsultation }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle subtle cursor 3D perspective shift on desktop
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const heroImageUrl = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center overflow-hidden pt-28 pb-16 bg-[#0d0f11] text-white border-b border-white/10"
    >
      {/* LAYER 1: Inception Architectural Background with Multi-Axis Drift */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="w-full h-full will-change-transform"
          style={{
            transform: `perspective(1000px) rotateX(${-mousePos.y * 3}deg) rotateY(${mousePos.x * 3}deg)`,
            transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          <img
            src={heroImageUrl}
            alt="Sky Square Architectural Masterpiece"
            className="w-full h-full object-cover object-center grayscale opacity-55 animate-hero-pan"
          />
        </div>

        {/* Multi-directional Scrim Gradients for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f11] via-[#0d0f11]/80 to-[#0d0f11]/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f11] via-transparent to-[#0d0f11]/60 z-10" />
        <div className="absolute inset-0 shadow-inner-hairline z-10 pointer-events-none" />
      </div>

      {/* LAYER 2: Infinite Watermark Marquee Background Layer */}
      <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 z-10 pointer-events-none opacity-10">
        <Marquee 
          speed={32} 
          textClassName="font-serif tracking-widest text-6xl md:text-8xl lg:text-9xl uppercase text-white font-light select-none"
        />
      </div>

      {/* LAYER 3: Editorial Content Stack Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-16 w-full flex flex-col justify-between min-h-[75vh]">
        
        {/* Main Editorial Hero Stack */}
        <div className="max-w-2xl pt-12 md:pt-20">
          
          {/* Eyebrow & Overline */}
          <AnimatedContent distance={30} direction="vertical" delay={0.15}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#C5A880]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C5A880] font-medium">
                EDITORIAL / VOL. 01 — TELANGANA CORRIDORS
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal leading-[0.98] text-white mb-6 tracking-tight">
              Defining the <br />
              <span className="italic text-white/90 font-normal">
                Hyderabad <span className="text-[#C5A880]">Horizon.</span>
              </span>
            </h1>
          </AnimatedContent>

          {/* Subtitle / Paragraph */}
          <AnimatedContent distance={30} direction="vertical" delay={0.25}>
            <p className="font-sans text-base sm:text-lg text-white/75 leading-relaxed font-light mb-10 max-w-xl">
              From government-grade infrastructure to luxury land development. We bridge the gap between visionary planning and grounded reality across prime expansion belts.
            </p>
          </AnimatedContent>

          {/* Action Buttons */}
          <AnimatedContent distance={30} direction="vertical" delay={0.35}>
            <div className="flex flex-wrap items-center gap-6">
              <Button
                variant="primary"
                size="large"
                onClick={onExploreArchive}
                className="bg-[#C5A880] text-[#0d0f11] hover:bg-[#b0926a] font-mono text-xs uppercase tracking-widest"
              >
                Explore Archive
              </Button>

              <Button
                variant="link"
                onClick={onOpenConsultation}
                className="text-white hover:text-[#C5A880] font-mono text-xs uppercase tracking-widest"
              >
                Book Site Consultation →
              </Button>
            </div>
          </AnimatedContent>

        </div>

        {/* Bottom Bar: Trust Stats + Relocated Telemetry Tag */}
        <AnimatedContent distance={30} direction="vertical" delay={0.45}>
          <div className="mt-16 pt-8 border-t border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 md:gap-12">
              <div>
                <span className="block font-serif text-2xl md:text-3xl text-white font-normal">134K+</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">SFT Developed</span>
              </div>
              <div>
                <span className="block font-serif text-2xl md:text-3xl text-white font-normal">100%</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Govt Compliance</span>
              </div>
              <div>
                <span className="block font-serif text-2xl md:text-3xl text-[#C5A880] font-normal">2027</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">Key Handovers</span>
              </div>
            </div>

            {/* Compact Telemetry Tag (Relocated to Bottom Right) */}
            <div className="flex items-center gap-4 text-[11px] font-mono tracking-widest text-white/60 border border-white/15 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm self-start md:self-auto">
              <span className="text-[#C5A880]">SECTOR: PRIME TELANGANA</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>17.3850° N, 78.4867° E</span>
            </div>

          </div>
        </AnimatedContent>

      </div>

      {/* Embedded CSS for Cinematic Camera Pan */}
      <style>{`
        @keyframes cinematicPan {
          0% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.12) translate(-1%, -1.5%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
        .animate-hero-pan {
          animation: cinematicPan 25s ease-in-out infinite alternate;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default Hero;
