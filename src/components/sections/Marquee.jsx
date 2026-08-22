import React from 'react';

export const Marquee = () => {
  const words = [
    'LEGACY',
    'INNOVATION',
    'PRECISION',
    'ARCHITECTURAL RIGOR',
    'GOVERNMENT INFRASTRUCTURE',
    'LUXURY RESIDENTIAL',
    'LAND ENCLAVES'
  ];

  return (
    <div className="w-full overflow-hidden border-b border-[#1A1A1A]/10 bg-[#EBE5DE]/30 py-4 select-none relative z-10">
      <div className="flex w-[200%] animate-marquee">
        <div className="flex items-center gap-12 whitespace-nowrap font-serif text-sm md:text-base tracking-[0.25em] text-[#1A1A1A]/40 uppercase px-6">
          {words.map((word, i) => (
            <React.Fragment key={`m1-${i}`}>
              <span className="hover:text-[#D4AF37] transition-colors duration-500">{word}</span>
              <span className="text-[#D4AF37]/60 text-xs">✦</span>
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center gap-12 whitespace-nowrap font-serif text-sm md:text-base tracking-[0.25em] text-[#1A1A1A]/40 uppercase px-6">
          {words.map((word, i) => (
            <React.Fragment key={`m2-${i}`}>
              <span className="hover:text-[#D4AF37] transition-colors duration-500">{word}</span>
              <span className="text-[#D4AF37]/60 text-xs">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
