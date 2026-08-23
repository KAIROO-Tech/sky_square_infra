import React from 'react';
import AnimatedContent from '../motion/AnimatedContent';

export const Ethos = () => {
  return (
    <section id="about" className="w-full py-28 md:py-40 bg-[#F9F8F6] relative overflow-hidden border-b border-[#1A1A1A]/10">
      
      {/* Background Watermark */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full z-0 opacity-[0.025] pointer-events-none select-none overflow-hidden flex" aria-hidden="true">
        <div className="font-serif font-bold text-[18vw] leading-none whitespace-nowrap text-[#1A1A1A]">
          LEGACY • INNOVATION • PRECISION • ARCHITECTURE
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 md:px-16 relative z-10">
        
        {/* Centered Quotation Container */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <AnimatedContent distance={30} direction="vertical" delay={0.15}>
            <div className="flex items-center gap-3 mb-8 justify-center">
              <span className="w-8 h-px bg-[#D4AF37]" />
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                The Ethos
              </p>
              <span className="w-8 h-px bg-[#D4AF37]" />
            </div>

            {/* Large Serif Statement */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-[1.15] text-[#1A1A1A] max-w-4xl tracking-tight">
              “A modern engineering powerhouse committed to delivering excellence in construction, land development, and government contract projects.”
            </h2>
          </AnimatedContent>

          {/* Architectural Thin Vertical Divider */}
          <div className="w-px h-16 bg-[#1A1A1A]/20 my-12" />

          {/* Editorial Narrative with Drop Cap */}
          <AnimatedContent distance={30} direction="vertical" delay={0.25}>
            <div className="text-left max-w-2xl font-sans text-base md:text-lg text-[#6C6863] leading-relaxed font-light">
              <p className="mb-6">
                <span className="float-left font-serif text-6xl md:text-7xl leading-[0.8] pr-3 pt-1 text-[#1A1A1A] font-medium select-none">
                  W
                </span>
                ith a strong foundation in quality, innovation, and reliability, we specialize in transforming raw land into well-planned, high-value developments. Our expertise covers residential and commercial construction, ensuring precision and superior standards in every build.
              </p>
              <p className="text-sm md:text-base text-[#6C6863]/90">
                Operating across the fastest-expanding growth corridors of Hyderabad, Shadnagar, Zaheerabad, and Attapur, Sky Square Infra applies rigorous structural discipline, uncompromising material standards, and transparent timelines to every development.
              </p>
            </div>
          </AnimatedContent>
        </div>

        {/* 3 Pillars Grid with Staggered Reveal */}
        <AnimatedContent distance={30} direction="vertical" delay={0.15} stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-16 border-t border-[#1A1A1A]/10">
            
            <div className="p-8 border-t border-[#1A1A1A]/20 hover:border-t-[#D4AF37] hover:bg-[#EBE5DE]/30 transition-all duration-500 group">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-4">
                01 / Rigor
              </span>
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3 group-hover:text-[#D4AF37] transition-colors duration-500">
                Zero-Margin Tolerances
              </h3>
              <p className="font-sans text-sm text-[#6C6863] leading-relaxed font-light">
                From soil compaction ratios to reinforced concrete compressive strength tests, every milestone is verified against strict engineering standards.
              </p>
            </div>

            <div className="p-8 border-t-2 border-t-[#D4AF37] bg-[#EBE5DE]/20 hover:bg-[#EBE5DE]/40 transition-all duration-500 group shadow-card hover:shadow-card-hover">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-4">
                02 / Vision
              </span>
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3 group-hover:text-[#D4AF37] transition-colors duration-500">
                Corridor Appreciation
              </h3>
              <p className="font-sans text-sm text-[#6C6863] leading-relaxed font-light">
                Strategic site selection situated near high-growth industrial clusters, national highways, and future infrastructure expansion belts.
              </p>
            </div>

            <div className="p-8 border-t border-[#1A1A1A]/20 hover:border-t-[#D4AF37] hover:bg-[#EBE5DE]/30 transition-all duration-500 group">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-4">
                03 / Longevity
              </span>
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3 group-hover:text-[#D4AF37] transition-colors duration-500">
                Generational Durability
              </h3>
              <p className="font-sans text-sm text-[#6C6863] leading-relaxed font-light">
                Architectural designs crafted with timeless proportion, premium waterproofing, and durable finishes built to endure decades without depreciation.
              </p>
            </div>

          </div>
        </AnimatedContent>

      </div>
    </section>
  );
};

export default Ethos;
