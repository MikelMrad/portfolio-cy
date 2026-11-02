'use client';
import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from 'framer-motion';
import 'lenis/dist/lenis.css';

// Smooth, weighted wheel scrolling (Lenis) for the whole page. Framer's
// useScroll reads the native scroll position Lenis drives, so scroll-linked
// animations follow it. In-page anchors glide too, honoring scroll-margin-top.
// Reduced motion falls back to native scrolling.
export default function SmoothScroll({ children }) {
  const reduce = useReducedMotion();
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: !reduce, anchors: !reduce }}>
      {children}
    </ReactLenis>
  );
}
