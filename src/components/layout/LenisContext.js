'use client';
import { createContext } from 'react';

// Shares the Lenis instance (as a ref) from SmoothScroll to consumers that need
// to pause/resume smooth scroll (e.g. MenuOverlay). Null under reduced motion.
export const LenisContext = createContext(null);
