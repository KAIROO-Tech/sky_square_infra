import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  projectTitle = 'Project Specification',
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const beforeUrl = typeof beforeImage === 'string' ? beforeImage : beforeImage?.url;
  const beforeLabel = typeof beforeImage === 'object' && beforeImage?.label ? beforeImage.label : 'Raw Site / Pre-Construction';

  const afterUrl = typeof afterImage === 'string' ? afterImage : afterImage?.url;
  const afterLabel = typeof afterImage === 'object' && afterImage?.label ? afterImage.label : 'Commissioned Architecture';

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !e.touches[0]) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handlePointerUp]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  const handleContainerClick = (e) => {
    handleMove(e.clientX);
  };

  return (
    <div className={`before-after-module w-full ${className}`}>
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-[#D4AF37]" />
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Execution Transformation Analysis
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#6C6863] tracking-widest uppercase">
          DRAG TO COMPARE STAGES
        </span>
      </div>

      {/* Comparison Frame (Strict 0px radius, hairline borders) */}
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className="relative w-full h-[340px] sm:h-[440px] md:h-[500px] overflow-hidden select-none cursor-ew-resize bg-[#1A1A1A] border border-[#1A1A1A]/20"
        role="region"
        aria-label={`Before and after transformation comparison for ${projectTitle}`}
      >
        {/* After Image (Full background layer) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={afterUrl}
            alt={`After: ${afterLabel}`}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/10 pointer-events-none" />
          <div className="absolute inset-0 shadow-inner-hairline pointer-events-none" />

          {/* After Label Badge */}
          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] bg-[#1A1A1A]/90 border border-[#D4AF37]/50 text-[#D4AF37] px-3 py-1.5 backdrop-blur-sm">
              AFTER // {afterLabel}
            </span>
          </div>
        </div>

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={beforeUrl}
            alt={`Before: ${beforeLabel}`}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-[#1A1A1A]/20 pointer-events-none" />
          <div className="absolute inset-0 shadow-inner-hairline pointer-events-none" />

          {/* Before Label Badge */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] bg-[#1A1A1A]/90 border border-white/20 text-white/90 px-3 py-1.5 backdrop-blur-sm">
              BEFORE // {beforeLabel}
            </span>
          </div>
        </div>

        {/* Vertical Divider Hairline & Draggable Handle */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Vertical Hairline */}
          <div className="w-px h-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]" />

          {/* Handle Button */}
          <div
            tabIndex={0}
            role="slider"
            aria-label="Drag slider to compare before and after images"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={handleKeyDown}
            className={`pointer-events-auto absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-[#1A1A1A] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-transform duration-150 ${
              isDragging ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            <ChevronsLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#EBE5DE]/80 bg-[#1A1A1A]/85 px-3 py-1 border border-white/10 backdrop-blur-sm">
            STAGE VIEW: {Math.round(sliderPosition)}% EXECUTED
          </span>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
