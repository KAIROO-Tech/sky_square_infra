import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * AnimatedContent Motion Component
 * Wraps content with GSAP + ScrollTrigger entrance animations.
 */
export function AnimatedContent({
  children,
  distance = 40,
  direction = 'vertical',
  reverse = false,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  duration = 0.9,
  delay = 0,
  ease = 'power3.out',
  start = 'top 85%',
  end = 'bottom 15%',
  scrub = false,
  once = true,
  stagger = 0,
  className = '',
  as: Component = 'div',
  ...restProps
}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const axis = direction === 'horizontal' ? 'x' : 'y';
      const offsetMultiplier = reverse ? -1 : 1;
      const initialOffset = distance * offsetMultiplier;

      const fromVars = {
        [axis]: initialOffset,
        opacity: animateOpacity ? initialOpacity : 1,
        scale: scale !== 1 ? scale : 1,
      };

      const toVars = {
        [axis]: 0,
        opacity: 1,
        scale: 1,
        duration: duration,
        delay: delay,
        ease: ease,
        scrollTrigger: {
          trigger: element,
          start: start,
          end: end,
          scrub: scrub,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      };

      if (stagger > 0 && element.children.length > 1) {
        gsap.fromTo(element.children, fromVars, {
          ...toVars,
          stagger: stagger,
        });
      } else {
        gsap.fromTo(element, fromVars, toVars);
      }
    }, elementRef);

    return () => ctx.revert();
  }, [
    distance,
    direction,
    reverse,
    initialOpacity,
    animateOpacity,
    scale,
    duration,
    delay,
    ease,
    start,
    end,
    scrub,
    once,
    stagger,
  ]);

  return (
    <Component ref={elementRef} className={className} {...restProps}>
      {children}
    </Component>
  );
}

export default AnimatedContent;
