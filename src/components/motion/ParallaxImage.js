'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

// next/image filling its positioned parent, drifting slower than the page as it
// scrolls past (overscaled so the drift never reveals an edge).
export default function ParallaxImage({ src, alt, sizes, priority = false, amount = 8 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <motion.div style={{ position: 'absolute', inset: `-${amount}% 0`, y }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover' }} />
      </motion.div>
    </div>
  );
}
