import React, { useState } from 'react';
import { competencies } from '../../data/competencies';
import { ShieldCheck } from 'lucide-react';
import AnimatedContent from '../motion/AnimatedContent';

export const Competencies = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section id="services" className="w-full py-28 md:py-36 bg-[var(--color-surface-warm)] px-8 md:px-16 border-b border-[var(--color-border)] relative z-10">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <AnimatedContent distance={30} direction="vertical" delay={0.15}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 pb-8 border-b border-[var(--color-border)]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[var(--color-accent)]" />
                <p className="font-sans text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-medium">
                  Core Competencies
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[var(--color-text-primary)] tracking-tight">
                Our <span className="italic text-[var(--color-accent)]">Expertise</span>
              </h2>
            </div>
            <p className="font-sans text-[var(--color-text-secondary)] max-w-md text-base mt-6 md:mt-0 font-light leading-relaxed">
              A tripartite approach to structural excellence across the public and private sectors.
            </p>
          </div>
        </AnimatedContent>

        {/* 3 Column Grid with Staggered Motion Reveal */}
        <AnimatedContent distance={30} direction="vertical" delay={0.15} stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {competencies.map((comp) => {
              return (
                <div
                  key={comp.number}
                  className="group bg-[var(--color-surface)] border-t-2 border-t-[var(--color-border-strong)] hover:border-t-[var(--color-accent)] p-8 md:p-10 border border-[var(--color-border)] shadow-card hover:shadow-card-hover transition-all duration-700 flex flex-col justify-between"
                >
                  <div>
                    {/* Big Architectural Number */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-serif text-5xl md:text-6xl font-light text-[var(--color-text-primary)]/20 group-hover:text-[var(--color-accent)] transition-colors duration-500 select-none">
                        {comp.number}
                      </span>
                      <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-secondary)] bg-[var(--color-surface-warm)] px-3 py-1 border border-[var(--color-border)]">
                        Pillar {comp.number}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-2xl md:text-3xl font-serif text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-500">
                      {comp.title}
                    </h3>
                    
                    <p className="font-serif italic text-sm text-[var(--color-accent)] mb-4">
                      {comp.headline} {comp.tagline}
                    </p>

                    <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed font-light mb-6">
                      {comp.description}
                    </p>

                    {/* Capabilities List */}
                    <div className="pt-6 border-t border-[var(--color-border)] space-y-3 font-sans text-xs text-[var(--color-text-secondary)]">
                      {comp.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="text-[var(--color-accent)] text-xs mt-0.5 font-mono">✦</span>
                          <span className="leading-snug">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlight Stat Box */}
                  <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[var(--color-accent)]" />
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
