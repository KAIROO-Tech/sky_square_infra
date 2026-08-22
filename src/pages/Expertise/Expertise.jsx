import React from 'react';
import { competencies } from '../../data/competencies';
import { ExpertiseHero } from './components/ExpertiseHero';
import { PillarDetailCard } from './components/PillarDetailCard';
import './Expertise.css';

export const Expertise = () => {
  return (
    <div className="expertise-page-container w-full min-h-screen bg-[#F9F8F6] text-[#1A1A1A]">
      <ExpertiseHero />

      <section className="w-full py-20 md:py-28 px-8 md:px-16 bg-[#EBE5DE]/20 border-b border-[#1A1A1A]/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#D4AF37]" />
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                Detailed Pillars
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-[#1A1A1A]">
              Comprehensive <span className="italic text-[#D4AF37]">Execution Spectrum</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {competencies.map((comp) => (
              <PillarDetailCard key={comp.number} comp={comp} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Expertise;
