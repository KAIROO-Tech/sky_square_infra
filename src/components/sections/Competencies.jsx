import React, { useState } from 'react';
import { competencies } from '../../data/competencies';
import { ShieldCheck } from 'lucide-react';
import AnimatedContent from '../motion/AnimatedContent';

export const Competencies = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section id="services" className="w-full py-28 md:py-36 bg-[#EBE5DE]/20 px-8 md:px-16 border-b border-[#1A1A1A]/10 relative z-10">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <AnimatedContent distance={30} direction="vertical" delay={0.15}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 pb-8 border-b border-[#1A1A1A]/10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[#D4AF37]" />
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                  Core Competencies
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#1A1A1A] tracking-tight">
                Our <span className="italic text-[#D4AF37]">Expertise</span>
              </h2>
            </div>
            <p className="font-sans text-[#6C6863] max-w-md text-base mt-6 md:mt-0 font-light leading-relaxed">
              A tripartite approach to structural excellence across the public and private sectors.
            </p>
          </div>
        </AnimatedContent>

        {/* 3 Column Grid with Staggered Motion Reveal */}
        <AnimatedContent distance={30} direction="vertical" delay={0.15} stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {competencies.map((comp, index) => {
              return (
                <div
                  key={comp.number}
                  className="group bg-[#F9F8F6] border-t-2 border-t-[#1A1A1A] hover:border-t-[#D4AF37] p-8 md:p-10 border border-[#1A1A1A]/10 shadow-card hover:shadow-card-hover transition-all duration-700 flex flex-col justify-between"
                >
                  <div>
                    {/* Big Architectural Number */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-serif text-5xl md:text-6xl font-light text-[#1A1A1A]/30 group-hover:text-[#D4AF37] transition-colors duration-500 select-none">
                        {comp.number}
                      </span>
                      <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#6C6863] bg-[#EBE5DE]/50 px-3 py-1 border border-[#1A1A1A]/10">
                        Pillar {comp.number}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mb-3 group-hover:text-[#D4AF37] transition-colors duration-500">
                      {comp.title}
                    </h3>
                    
                    <p className="font-serif italic text-sm text-[#D4AF37] mb-4">
                      {comp.headline} {comp.tagline}
                    </p>

                    <p className="font-sans text-sm text-[#6C6863] leading-relaxed font-light mb-6">
                      {comp.description}
                    </p>

                    {/* Capabilities List */}
                    <div className="pt-6 border-t border-[#1A1A1A]/10 space-y-3 font-sans text-xs text-[#1A1A1A]/80">
                      {comp.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="text-[#D4AF37] text-xs mt-0.5 font-mono">✦</span>
                          <span className="leading-snug">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlight Stat Box */}
                  <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.2em] text-[#6C6863]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                      <span>{comp.highlightStat}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedContent>

      </div>
    </section>
  );
};

export default Competencies;
