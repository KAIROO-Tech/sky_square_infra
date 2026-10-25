import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PillarDetailCard = ({ comp }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="expertise-pillar-card relative bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 rounded-2xl p-8 md:p-12 shadow-card hover:shadow-card-hover transition-all duration-500 flex flex-col justify-between overflow-hidden group"
    >
      {/* Magnetic Cursor Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px z-30 transition-opacity duration-300 opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(184, 147, 88, 0.15), transparent 45%)`,
          }}
        />
      )}

      {/* Top Header & Number Index */}
      <div className="relative z-20">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--color-border)]">
          <span className="font-serif text-6xl md:text-7xl font-light text-[var(--color-accent)] select-none tracking-tighter">
            {comp.number}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-3.5 py-1.5 border border-[var(--color-accent)]/30 rounded-full">
            PILLAR {comp.number}
          </span>
        </div>

        <h3 className="text-3xl md:text-4xl font-serif text-[var(--color-text-primary)] mb-2 font-normal group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {comp.title}
        </h3>
        
        <p className="font-serif italic text-base text-[var(--color-accent)] mb-6 font-light">
          {comp.headline} {comp.tagline}
        </p>

        <p className="font-sans text-base text-[var(--color-text-secondary)] leading-relaxed font-light mb-8">
          {comp.description}
        </p>

        {/* Operational Capabilities List */}
        <div className="pt-6 border-t border-[var(--color-border)] space-y-3.5 font-sans text-sm text-[var(--color-text-secondary)]">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold mb-3">
            Core Operational Capabilities
          </p>
          {comp.capabilities.map((cap, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[var(--color-accent)] text-xs mt-1 font-mono">✦</span>
              <span className="leading-relaxed font-light text-[var(--color-text-secondary)]">{cap}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="relative z-20 mt-10 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <ShieldCheck className="w-4 h-4 text-[var(--color-accent)]" />
          <span>{comp.highlightStat}</span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/inquire', { state: { interest: comp.title } })}
          className="archive-pill-btn group-hover:bg-[var(--color-accent-subtle)] group-hover:border-[var(--color-accent)]"
        >
          <span>Engage Pillar</span>
          <ArrowRight className="w-3.5 h-3.5 arrow-icon text-[var(--color-accent)]" />
        </button>
      </div>
    </div>
  );
};

export default PillarDetailCard;
