import React from 'react';

export const Marquee = ({
  text,
  items,
  speed = 35,
  className = '',
  textClassName = '',
  reverse = false
}) => {
  const defaultItems = [
    'INNOVATION',
    'PRECISION',
    'ARCHITECTURAL RIGOR',
    'GOVERNMENT INFRASTRUCTURE',
    'LUXURY RESIDENTIAL',
    'LEGACY',
    'ENGINEERING EXCELLENCE'
  ];

  const listToRender = items || (text ? [text] : defaultItems);

  return (
    <div className={`w-full overflow-hidden select-none relative ${className}`}>
      <div 
        className="flex w-[200%] pointer-events-none will-change-transform"
        style={{
          animation: `marqueeScroll ${speed}s linear infinite ${reverse ? 'reverse' : 'normal'}`
        }}
      >
        {/* Loop 1 */}
        <div className="flex items-center gap-12 whitespace-nowrap px-6 shrink-0 min-w-full justify-around">
          {listToRender.map((item, i) => (
            <React.Fragment key={`m1-${i}`}>
              <span className={textClassName || "font-serif text-sm tracking-[0.25em] text-[#1A1A1A]/40 uppercase"}>
                {item}
              </span>
              <span className="text-[#D4AF37]/60 text-xs select-none">✦</span>
            </React.Fragment>
          ))}
        </div>

        {/* Loop 2 (Duplicate for smooth infinite seamless wrap) */}
        <div className="flex items-center gap-12 whitespace-nowrap px-6 shrink-0 min-w-full justify-around">
          {listToRender.map((item, i) => (
            <React.Fragment key={`m2-${i}`}>
              <span className={textClassName || "font-serif text-sm tracking-[0.25em] text-[#1A1A1A]/40 uppercase"}>
                {item}
              </span>
              <span className="text-[#D4AF37]/60 text-xs select-none">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
