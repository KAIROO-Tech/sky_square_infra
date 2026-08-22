import React from 'react';

export const InquireHeader = () => {
  return (
    <div className="pt-32 pb-16 md:pt-40 md:pb-24 px-8 md:px-16 border-b border-[#1A1A1A]/10 bg-[#F9F8F6]">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[#D4AF37]" />
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
            Private Consultation Desk
          </p>
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-[#1A1A1A] leading-[1.05] tracking-tight mb-8">
          Submit a <br />
          <span className="italic text-[#D4AF37]">Structural Consultation Request.</span>
        </h1>
        <p className="font-sans text-lg md:text-xl text-[#6C6863] leading-relaxed font-light max-w-2xl">
          Provide your land dimensions, structural parameters, or investment criteria below. Our engineering director reviews all submitted advisory requests within 24 business hours.
        </p>
      </div>
    </div>
  );
};
