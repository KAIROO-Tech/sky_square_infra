import React from 'react';

/**
 * 4 Fixed architectural vertical gridlines aligned to column boundaries
 * Implements the Structural Framework from the Luxury/Editorial design system
 */
export const GridLines = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden" aria-hidden="true">
      <div className="max-w-[1600px] h-full mx-auto relative px-8 md:px-16">
        {/* Left edge gridline */}
        <div className="absolute top-0 bottom-0 left-8 md:left-16 w-px bg-[#1A1A1A]/[0.08]" />
        
        {/* Left-third gridline */}
        <div className="hidden md:block absolute top-0 bottom-0 left-[33.33%] w-px bg-[#1A1A1A]/[0.06]" />
        
        {/* Right-third gridline */}
        <div className="hidden md:block absolute top-0 bottom-0 left-[66.66%] w-px bg-[#1A1A1A]/[0.06]" />
        
        {/* Right edge gridline */}
        <div className="absolute top-0 bottom-0 right-8 md:right-16 w-px bg-[#1A1A1A]/[0.08]" />
      </div>
    </div>
  );
};
