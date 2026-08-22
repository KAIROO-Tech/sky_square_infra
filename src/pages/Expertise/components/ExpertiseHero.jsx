import React from 'react';
import { Button } from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';

export const ExpertiseHero = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-28 px-8 md:px-16 border-b border-[#1A1A1A]/10 bg-[#F9F8F6]">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[#D4AF37]" />
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
            Capabilities &amp; Specialization
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-[#1A1A1A] leading-[1.05] tracking-tight mb-8">
              Tripartite Disciplines of <br />
              <span className="italic text-[#D4AF37]">Structural Excellence.</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-[#6C6863] leading-relaxed font-light max-w-2xl">
              From civic cement concrete highways and master-planned gated layouts to bespoke luxury residential landmarks, our engineering framework guarantees zero-tolerance structural execution.
            </p>
          </div>
          
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
            <Button
              variant="primary"
              size="large"
              onClick={() => navigate('/inquire')}
            >
              Initiate Project Advisory
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
