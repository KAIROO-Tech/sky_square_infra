import React, { useState, useEffect } from 'react';

export const BrandEntry = () => {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0); // 0: Lines draw, 1: SKY, 2: SQUARE, 3: INFRA, 4: Curtain Reveal

  useEffect(() => {
    // Check if current navigation is a reload
    const navigationEntries = performance.getEntriesByType('navigation');
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === 'reload';

    // Check if brand entry has already been shown in this session
    const isShown = sessionStorage.getItem('skysquare_brand_entry_shown');

    if (isShown && !isReload) {
      document.body.style.overflow = '';
      return;
    }

    setVisible(true);
    document.body.style.overflow = 'hidden';

    // Sequence timings
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1400);
    const t4 = setTimeout(() => setPhase(4), 2100);
    const t5 = setTimeout(() => {
      handleComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      document.body.style.overflow = '';
    };
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem('skysquare_brand_entry_shown', 'true');
    setVisible(false);
    document.body.style.overflow = '';
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0c0c0c] select-none transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        phase === 4 ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Skip Button */}
      <button
        type="button"
        onClick={handleComplete}
        className="absolute top-8 right-8 z-[100000] font-mono text-[10px] uppercase tracking-[0.25em] text-white/50 hover:text-[#d4af37] border border-white/10 hover:border-[#d4af37]/30 px-3.5 py-1.5 bg-[#0c0c0c]/80 backdrop-blur-sm transition-all duration-300 cursor-pointer"
        aria-label="Skip introduction"
      >
        Skip Intro
      </button>

      {/* Architectural Hairline Grid */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div
          className={`absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/10 origin-top transition-transform duration-1000 ease-out ${
            phase >= 0 ? 'scale-y-100' : 'scale-y-0'
          }`}
        />
        <div
          className={`absolute top-0 bottom-0 left-3/4 w-[1px] bg-white/10 origin-bottom transition-transform duration-1000 ease-out ${
            phase >= 0 ? 'scale-y-100' : 'scale-y-0'
          }`}
        />
        <div
          className={`absolute left-0 right-0 top-1/3 h-[1px] bg-white/10 origin-left transition-transform duration-1000 ease-out ${
            phase >= 0 ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
        <div
          className={`absolute left-0 right-0 top-2/3 h-[1px] bg-white/10 origin-right transition-transform duration-1000 ease-out ${
            phase >= 0 ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </div>

      {/* Typography Sequence Container */}
      <div className="relative z-20 flex flex-col items-center justify-center space-y-4 text-center">
        <div className="absolute font-serif text-[18vw] text-white/[0.02] font-light leading-none select-none pointer-events-none z-0">
          SQ
        </div>

        <div className="relative z-10 overflow-hidden flex flex-col items-center">
          <h1
            className={`font-serif tracking-[0.35em] text-4xl sm:text-6xl font-light text-white transition-all duration-700 ease-out transform ${
              phase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            SKY
          </h1>
          <h1
            className={`font-serif tracking-[0.25em] text-4xl sm:text-6xl font-normal text-white mt-2 transition-all duration-700 ease-out transform ${
              phase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            SQUARE
          </h1>
        </div>

        <div className="relative z-10 overflow-hidden pt-1">
          <p
            className={`font-mono tracking-[0.5em] text-xs sm:text-sm font-semibold text-[#d4af37] transition-all duration-700 ease-out transform ${
              phase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            INFRA
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandEntry;
