import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';

export const PillarDetailCard = ({ comp }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F8F6] border-t-2 border-t-[#1A1A1A] hover:border-t-[#D4AF37] p-8 md:p-12 border border-[#1A1A1A]/10 shadow-card hover:shadow-card-hover transition-all duration-700 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-8">
          <span className="font-serif text-6xl md:text-7xl font-light text-[#1A1A1A]/30 group-hover:text-[#D4AF37] transition-colors duration-500 select-none">
            {comp.number}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#6C6863] bg-[#EBE5DE]/50 px-3 py-1 border border-[#1A1A1A]/10">
            Pillar {comp.number}
          </span>
        </div>

        <h3 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-3">
          {comp.title}
        </h3>
        
        <p className="font-serif italic text-base text-[#D4AF37] mb-6">
          {comp.headline} {comp.tagline}
        </p>

        <p className="font-sans text-base text-[#6C6863] leading-relaxed font-light mb-8">
          {comp.description}
        </p>

        <div className="pt-6 border-t border-[#1A1A1A]/10 space-y-4 font-sans text-sm text-[#1A1A1A]/85">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#6C6863] font-medium mb-2">
            Core Operational Scope
          </p>
          {comp.capabilities.map((cap, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[#D4AF37] text-sm mt-0.5 font-mono">✦</span>
              <span className="leading-relaxed font-light">{cap}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#6C6863]">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>{comp.highlightStat}</span>
        </div>
        <Button
          variant="secondary"
          size="small"
          onClick={() => navigate('/inquire', { state: { interest: comp.title } })}
          className="flex items-center gap-2 text-xs"
        >
          <span>Engage Pillar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};
