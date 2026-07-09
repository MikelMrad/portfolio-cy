'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { LenisContext } from './LenisContext';

// Smooth scroll (lerp 0.1). Skipped entirely under prefers-reduced-motion.
// Lenis autoRaf defaults to false, so we drive the RAF loop ourselves. The
// instance is shared via context so the menu overlay can pause it.
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({ lerp: 0.1 });
    lenisRef.current = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Lenis auto-observes content resizes, but late layout shifts (web fonts
    // settling, images decoding) can land just outside that. Re-measure the
    // scroll limit once those complete so the wheel always reaches the bottom.
    const resize = () => lenis.resize();
    window.addEventListener('load', resize);
    if (document.fonts?.ready) document.fonts.ready.then(resize).catch(() => {});

    return () => {
      window.removeEventListener('load', resize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
