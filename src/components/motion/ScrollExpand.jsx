import React, { useEffect, useRef, useState } from 'react';
import './ScrollExpand.css';

/**
 * ScrollExpand Motion Component
 * Dynamically expands media frame width & adjusts border radius as user scrolls.
 */
export function ScrollExpand({
  mediaUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
  mediaType = 'image',
  alt = 'Sky Square Infra Signature Development',
  badge,
  title,
  description,
  useWindowScroll = true,
  initialWidthPercent = 78,
  expandedWidthPercent = 100,
  initialRadiusPx = 24,
  expandedRadiusPx = 0,
  className = '',
  children
}) {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const mediaRef = useRef(null);
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;

    const calculateScrollProgress = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      const startPoint = windowHeight * 0.85;
      const endPoint = windowHeight * 0.15;

      const currentPosition = rect.top;
      const totalDistance = startPoint - endPoint;
      
      let p = (startPoint - currentPosition) / totalDistance;
      p = Math.max(0, Math.min(1, p));

      setProgress(p);

      if (frameRef.current) {
        const width = initialWidthPercent + (expandedWidthPercent - initialWidthPercent) * p;
        const radius = initialRadiusPx - (initialRadiusPx - expandedRadiusPx) * p;
        
        frameRef.current.style.width = `${width}%`;
        frameRef.current.style.borderRadius = `${radius}px`;
      }

      if (mediaRef.current) {
        const scale = 1.15 - (0.15 * p);
        mediaRef.current.style.transform = `scale(${scale})`;
      }
    };

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(calculateScrollProgress);
    };

    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll, { passive: true });
      calculateScrollProgress();
    } else {
      const scrollParent = containerRef.current?.parentElement;
      if (scrollParent) {
        scrollParent.addEventListener('scroll', handleScroll, { passive: true });
        calculateScrollProgress();
      }
    }

    return () => {
      if (useWindowScroll) {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      } else {
        const scrollParent = containerRef.current?.parentElement;
        if (scrollParent) {
          scrollParent.removeEventListener('scroll', handleScroll);
        }
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [useWindowScroll, initialWidthPercent, expandedWidthPercent, initialRadiusPx, expandedRadiusPx]);

  return (
    <div ref={containerRef} className={`scroll-expand ${className}`}>
      <div className="scroll-expand__stage">
        <div 
          ref={frameRef} 
          className="scroll-expand__frame"
          style={{
            width: `${initialWidthPercent}%`,
            borderRadius: `${initialRadiusPx}px`
          }}
        >
          <div className="scroll-expand__media-wrapper">
            {mediaType === 'video' ? (
              <video
                ref={mediaRef}
                src={mediaUrl}
                autoPlay
                loop
                muted
                playsInline
                className="scroll-expand__media"
              />
            ) : (
              <img
                ref={mediaRef}
                src={mediaUrl}
                alt={alt}
                className="scroll-expand__media"
                loading="lazy"
              />
            )}
          </div>

          {(badge || title || description || children) && (
            <div className="scroll-expand__overlay">
              <div 
                className="scroll-expand__overlay-content"
                style={{
                  opacity: 0.4 + progress * 0.6,
                  transform: `translateY(${(1 - progress) * 20}px)`
                }}
              >
                {badge && <span className="scroll-expand__badge">{badge}</span>}
                {title && <h3 className="scroll-expand__title">{title}</h3>}
                {description && <p className="scroll-expand__description">{description}</p>}
                {children}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScrollExpand;
