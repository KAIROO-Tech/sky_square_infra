import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';

export const ConsultationCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#1A1A1A] py-24 md:py-32 px-8 md:px-16 relative overflow-hidden z-10 border-b border-[#1A1A1A]">
      
      {/* Background Architectural Monogram Watermark */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.02] z-0" 
        aria-hidden="true"
      >
        <span className="font-serif font-bold text-[30vw] leading-none whitespace-nowrap text-white">
          SKY SQUARE
        </span>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading and copy */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#D4AF37]" />
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
              Private Advisory Services
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-white leading-[1.1] mb-6 tracking-tight">
            Ready to secure a corridor plot or <br />
            <span className="italic text-[#D4AF37]">initiate construction?</span>
          </h2>

          <p className="font-sans text-[#EBE5DE]/85 text-sm md:text-base max-w-2xl leading-relaxed font-light">
            Whether securing prime acreage in high-growth corridors or drafting architectural blueprints for a custom residential villa, our engineering division provides structural clarity and turnkey feasibility reports.
          </p>
        </div>

        {/* Right Column: CTA Dispatch button */}
        <div className="lg:col-span-4 lg:justify-self-end w-full lg:w-auto">
          <div className="p-8 bg-[#EBE5DE]/5 border border-white/10 flex flex-col items-center text-center backdrop-blur-sm">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#EBE5DE]/60 mb-4 block">
              ESTATE ADVISORY DESK
            </span>
            <Button
              variant="primary"
              size="large"
              className="w-full"
              onClick={() => navigate('/inquire')}
            >
              Request Valuation
            </Button>
            <span className="font-sans text-[9px] text-[#EBE5DE]/45 mt-4">
              * Consultations remain strictly confidential.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ConsultationCTA;
