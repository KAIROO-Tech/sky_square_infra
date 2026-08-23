import React, { useState, useEffect } from 'react';

export const BrandEntry = () => {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0); // 0: Lines draw, 1: SKY, 2: SQUARE, 3: INFRA, 4: Curtain Reveal

  useEffect(() => {
    // Check if the current navigation is a page reload (hard reload)
    const navigationEntries = performance.getEntriesByType('navigation');
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === 'reload';

    // Check if brand entry has already been shown in this session
    const isShown = sessionStorage.getItem('skysquare_brand_entry_shown');

    if (isShown && !isReload) {
      // If shown already and NOT a reload, bypass intro completely
      document.body.style.overflow = '';
      return;
    }

    // Set scroll lock and make intro visible
    setVisible(true);
    document.body.style.overflow = 'hidden';

    // Sequence timings:
    // T = 0ms: Grid lines start drawing (phase 0)
    // T = 400ms: 'SKY' fades in & slides up (phase 1)
    const t1 = setTimeout(() => setPhase(1), 400);

    // T = 900ms: 'SQUARE' fades in & slides up (phase 2)
    const t2 = setTimeout(() => setPhase(2), 900);

    // T = 1400ms: 'INFRA' resolves in muted gold (phase 3)
    const t3 = setTimeout(() => setPhase(3), 1400);

    // T = 2100ms: Seamless curtain reveal begins (phase 4)
    const t4 = setTimeout(() => setPhase(4), 2100);

    // T = 2800ms: Animation completed, unmount component & release scroll lock
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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1A1A1A] select-none transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        phase === 4 ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Subtle background noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-repeat"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />

      {/* Skip Button */}
      <button
        type="button"
        onClick={handleComplete}
        className="absolute top-8 right-8 z-[10000] font-sans text-[10px] uppercase tracking-[0.25em] text-white/50 hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/30 px-3 py-1.5 bg-[#1A1A1A]/80 backdrop-blur-sm transition-all duration-500 cursor-pointer"
        aria-label="Skip introduction"
      >
        Skip Intro
      </button>

      {/* Architectural Hairline Grid */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Vertical lines */}
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
        {/* Horizontal lines */}
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
        {/* Monogram backdrop */}
        <div className="absolute font-serif text-[18vw] text-white/[0.015] font-light leading-none select-none pointer-events-none z-0">
          SQ
        </div>

        <div className="relative z-10 overflow-hidden flex flex-col items-center">
          {/* SKY */}
          <h1
            className={`font-serif tracking-[0.35em] text-4xl sm:text-6xl font-light text-white transition-all duration-700 ease-out transform ${
              phase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            SKY
          </h1>

          {/* SQUARE */}
          <h1
            className={`font-serif tracking-[0.25em] text-4xl sm:text-6xl font-normal text-white mt-2 transition-all duration-700 ease-out transform ${
              phase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            SQUARE
          </h1>
        </div>

        {/* INFRA (Muted Gold Accent) */}
        <div className="relative z-10 overflow-hidden pt-1">
          <p
            className={`font-sans tracking-[0.5em] text-xs sm:text-sm font-semibold text-[#D4AF37] transition-all duration-700 ease-out transform ${
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
