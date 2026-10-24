import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Compass, DraftingCompass, Building, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { competencies } from '../../data/competencies';
import { ExpertiseHero } from './components/ExpertiseHero';
import { PillarDetailCard } from './components/PillarDetailCard';
import { Button } from '../../components/common/Button';
import './Expertise.css';

export const Expertise = () => {
  const navigate = useNavigate();

  const engineeringStandards = [
    {
      icon: DraftingCompass,
      code: 'STD-CIV-01',
      title: 'Seismic & Structural Mechanics',
      description: 'Seismic Zone II compliant reinforced concrete framing with post-tensioned spans and column-free central entertainment pavilions.',
    },
    {
      icon: Compass,
      code: 'STD-HYD-02',
      title: 'Hydrological & Sub-grade Engineering',
      description: 'Engineered stormwater drainage, trapezoidal side channels, and subsurface groundwater recharge pits engineered for extreme monsoonal traffic.',
    },
    {
      icon: Building,
      code: 'STD-[#GEO]-03',
      title: 'Geodetic Topography & Layouts',
      description: 'Laser-guided topographical surveying, CAD parcel subdivisions, and high-voltage underground cabling conduits.',
    },
    {
      icon: Award,
      code: 'STD-GOV-04',
      title: 'Turnkey Governance & Quality Audits',
      description: 'M30 grade cement concrete compaction testing, waterproofed foundation membranes, and zero-discrepancy municipal handover certificates.',
    },
  ];

  return (
    <div className="expertise-page-container w-full min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-primary)] selection:bg-[var(--color-accent)]/30 selection:text-[var(--color-accent)]">
      {/* Hero Section */}
      <ExpertiseHero />

      {/* Main 3 Core Pillars Section */}
      <section className="w-full py-20 md:py-28 px-6 md:px-16 border-b border-[var(--color-border)]">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-[var(--color-accent)]" />
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-semibold">
                TRIPARTITE EXECUTION SPECTRUM
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-normal text-[var(--color-text-primary)] leading-tight">
              Comprehensive <span className="italic text-[var(--color-accent)] font-light">Discipline Spectrum.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {competencies.map((comp) => (
              <PillarDetailCard key={comp.number} comp={comp} />
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Benchmarks Grid Section */}
      <section className="w-full py-20 md:py-28 px-6 md:px-16 bg-[var(--color-surface-warm)] border-b border-[var(--color-border)]">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[var(--color-accent)]" />
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)] font-semibold">
                BENCHMARK SPECIFICATIONS // AUDIT STANDARDS
              </p>
            </div>
            <h3 className="text-3xl md:text-4xl font-serif text-[var(--color-text-primary)] font-normal">
              Engineering <span className="italic text-[var(--color-accent)] font-light">Quality Benchmarks.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringStandards.map((std, idx) => {
              const Icon = std.icon;
              return (
                <div key={idx} className="expertise-benchmark-card group">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-6 h-6 text-[var(--color-accent)]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                      {std.code}
                    </span>
                  </div>
                  <h4 className="font-serif text-xl text-[var(--color-text-primary)] mb-2 font-normal group-hover:text-[var(--color-accent)] transition-colors">
                    {std.title}
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-[var(--color-text-secondary)] font-light leading-relaxed">
                    {std.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Project Advisory Valuation CTA */}
      <section className="w-full py-16 px-6 md:px-16 bg-[var(--color-surface-warm)] border-t border-[var(--color-border)]">
        <div className="max-w-[1600px] mx-auto">
          <div className="p-8 md:p-14 bg-[var(--color-surface)] border-t-2 border-t-[var(--color-accent)] border border-[var(--color-border)] rounded-2xl shadow-card flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl z-10">
              <div className="flex items-center gap-2 text-[var(--color-accent)] font-mono text-xs uppercase tracking-widest mb-3">
                <Sparkles className="w-4 h-4" />
                <span>ENGAGE STRUCTURAL SPECIALISTS</span>
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-[var(--color-text-primary)] mb-3 font-normal leading-snug">
                Require technical specifications or layout demarcation?
              </h4>
              <p className="font-sans text-sm md:text-base text-[var(--color-text-secondary)] font-light leading-relaxed">
                Connect directly with our engineering directorate for turnkey land surveys, structural blueprints, and civil execution estimates.
              </p>
            </div>

            <div className="z-10 w-full lg:w-auto">
              <Button
                variant="primary"
                size="default"
                onClick={() => navigate('/inquire')}
                className="w-full sm:w-auto bg-[var(--color-accent)] text-[var(--color-accent-fg)] hover:bg-[var(--color-accent-hover)] font-mono text-xs uppercase tracking-wider font-semibold py-4 px-8 shadow-md"
              >
                Initiate Project Advisory
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Expertise;
