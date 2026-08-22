import React from 'react';

/**
 * Paper Noise Texture overlay
 * Creates tactile "expensive paper" feel with zero performance penalty
 */
export const NoiseOverlay = () => {
  const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E")`;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-40 select-none"
      style={{ backgroundImage: noiseSvg }}
      aria-hidden="true"
    />
  );
};
