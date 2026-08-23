import React from 'react';

export const ContactHeader = () => {
  return (
    <div className="theme-page-header pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-16 border-b border-white/10 bg-[#0c0c0c] text-[#f5f5f7]">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-[#d4af37]" />
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            CONNECT &amp; CORPORATE LOCATION // EXECUTIVE DESK
          </p>
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-[#f5f5f7] leading-[1.05] tracking-tight mb-6">
          Direct Line to <br />
          <span className="italic font-serif text-[#d4af37] font-light">Head Office &amp; Advisory.</span>
        </h1>
        <p className="font-sans text-lg md:text-xl text-white/70 leading-relaxed font-light max-w-2xl">
          Connect directly with our executive directors and engineering studio in Hyderabad for property acquisitions, municipal approvals, and structural consultation.
        </p>
      </div>
    </div>
  );
};

export default ContactHeader;
