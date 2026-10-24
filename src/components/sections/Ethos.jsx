import React from 'react';
import AnimatedContent from '../motion/AnimatedContent';
import Marquee from './Marquee';

export const Ethos = () => {
  return (
    <section id="about" className="w-full pt-10 pb-28 md:pt-14 md:pb-40 bg-[var(--color-page-bg)] relative overflow-hidden border-b border-[var(--color-border)]">
      
      {/* Dedicated Decorative Architectural Marquee Band */}
      <div className="w-full overflow-hidden select-none pointer-events-none mb-12 md:mb-16 opacity-[0.20] dark:opacity-[0.25]" aria-hidden="true">
        <Marquee 
          speed={32} 
          textClassName="font-serif tracking-widest text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-[var(--color-text-primary)] font-light select-none leading-none"
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-8 md:px-16 relative z-10">
        
        {/* Centered Quotation Container */}
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <AnimatedContent distance={30} direction="vertical" delay={0.15}>
            <div className="flex items-center gap-3 mb-8 justify-center">
              <span className="w-8 h-px bg-[var(--color-accent)]" />
              <p className="font-sans text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-medium">
                The Ethos
              </p>
              <span className="w-8 h-px bg-[var(--color-accent)]" />
            </div>

            {/* Large Serif Statement */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-[1.15] text-[var(--color-text-primary)] max-w-4xl tracking-tight mb-12">
              “A modern engineering powerhouse committed to delivering excellence in construction, land development, and government contract projects.”
            </h2>
          </AnimatedContent>

          {/* Editorial Narrative with Drop Cap */}
          <AnimatedContent distance={30} direction="vertical" delay={0.25}>
            <div className="text-left max-w-2xl font-sans text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed font-light">
              <p className="mb-6">
                <span className="float-left font-serif text-6xl md:text-7xl leading-[0.8] pr-3 pt-1 text-[var(--color-text-primary)] font-medium select-none">
                  W
                </span>
                ith a strong foundation in quality, innovation, and reliability, we specialize in transforming raw land into well-planned, high-value developments. Our expertise covers residential and commercial construction, ensuring precision and superior standards in every build.
              </p>
              <p className="text-sm md:text-base text-[var(--color-text-secondary)]">
                Operating across the fastest-expanding growth corridors of Hyderabad, Shadnagar, Zaheerabad, and Attapur, Sky Square Infra applies rigorous structural discipline, uncompromising material standards, and transparent timelines to every development.
              </p>
            </div>
          </AnimatedContent>
        </div>

        {/* 3 Pillars Grid with Staggered Reveal */}
        <AnimatedContent distance={30} direction="vertical" delay={0.15} stagger={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-16 border-t border-[var(--color-border)]">
            
            <div className="p-8 border border-[var(--color-border)] border-t-2 border-t-[var(--color-border-strong)] hover:border-t-[var(--color-accent)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-warm)] transition-all duration-500 group shadow-sm">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-semibold block mb-4">
                01 / Rigor
              </span>
              <h3 className="font-serif text-2xl text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-500">
                Zero-Margin Tolerances
              </h3>
              <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed font-light">
                From soil compaction ratios to reinforced concrete compressive strength tests, every milestone is verified against strict engineering standards.
              </p>
            </div>

            <div className="p-8 border border-[var(--color-border)] border-t-2 border-t-[var(--color-accent)] bg-[var(--color-surface-warm)] hover:bg-[var(--color-surface-elevated)] transition-all duration-500 group shadow-card hover:shadow-card-hover">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-semibold block mb-4">
                02 / Vision
              </span>
              <h3 className="font-serif text-2xl text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-500">
                Corridor Appreciation
              </h3>
              <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed font-light">
                Strategic site selection situated near high-growth industrial clusters, national highways, and future infrastructure expansion belts.
              </p>
            </div>

            <div className="p-8 border border-[var(--color-border)] border-t-2 border-t-[var(--color-border-strong)] hover:border-t-[var(--color-accent)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-warm)] transition-all duration-500 group shadow-sm">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-semibold block mb-4">
                03 / Longevity
              </span>
              <h3 className="font-serif text-2xl text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-500">
                Generational Durability
              </h3>
              <p className="font-sans text-sm text-[var(--color-text-secondary)] leading-relaxed font-light">
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
