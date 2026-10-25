import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/common/Button';
import { ShieldCheck, Award, Layers } from 'lucide-react';

export const ExpertiseHero = () => {
  const navigate = useNavigate();

  return (
    <div className="expertise-hero-wrapper relative pt-32 pb-20 md:pt-44 md:pb-28 px-6 md:px-16 overflow-hidden bg-[var(--color-surface-warm)] border-b border-[var(--color-border)] text-[var(--color-text-primary)]">
      {/* Background Architectural Grid & Subtle Radial Glow */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute -top-32 left-1/3 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Editorial Dossier Top Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-10 h-px bg-[var(--color-accent)]" />
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-accent)] font-semibold">
            DOSSIER SPECIALIZATION // 03 CORE PILLARS
          </p>
        </div>
        
        {/* Main Headline & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-normal text-[var(--color-text-primary)] leading-[1.03] tracking-tight">
              Tripartite Disciplines of <br />
              <span className="italic font-serif text-[var(--color-accent)] font-light">Structural Excellence.</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="font-sans text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed font-light border-l border-[var(--color-accent)]/40 pl-6 mb-6">
              From civic cement concrete highways and master-planned gated enclaves to bespoke luxury duplexes, our engineering framework guarantees zero-tolerance structural execution across Telangana.
            </p>
            <Button
              variant="primary"
              size="large"
              onClick={() => navigate('/inquire')}
              className="bg-[var(--color-accent)] text-[var(--color-accent-fg)] hover:bg-[var(--color-accent-hover)] font-mono text-xs uppercase tracking-wider font-semibold py-3.5 px-7 shadow-md"
            >
              Initiate Project Advisory
            </Button>
          </div>
        </div>

        {/* Portfolio Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[var(--color-border)] font-mono text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
          <div className="expertise-hero-stat-card flex items-center gap-4 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm">
            <ShieldCheck className="w-8 h-8 text-[var(--color-accent)]" />
            <div>
              <span className="block text-[10px] text-[var(--color-accent)] tracking-[0.2em] mb-0.5">COMPLIANCE TIER</span>
              <span className="text-lg font-serif text-[var(--color-text-primary)] font-normal">100% State Benchmarks</span>
            </div>
          </div>

          <div className="expertise-hero-stat-card flex items-center gap-4 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm">
            <Layers className="w-8 h-8 text-[var(--color-accent)]" />
            <div>
              <span className="block text-[10px] text-[var(--color-accent)] tracking-[0.2em] mb-0.5">DEVELOPED FOOTPRINT</span>
              <span className="text-lg font-serif text-[var(--color-text-primary)] font-normal">134,000+ SFT Enclaves</span>
            </div>
          </div>

          <div className="expertise-hero-stat-card flex items-center gap-4 p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm">
            <Award className="w-8 h-8 text-[var(--color-accent)]" />
            <div>
              <span className="block text-[10px] text-[var(--color-accent)] tracking-[0.2em] mb-0.5">HIGH-RISE PORTFOLIO</span>
              <span className="text-lg font-serif text-[var(--color-text-primary)] font-normal">22,500+ SFT Multi-Storey</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExpertiseHero;
