'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

// Fade + rise + unblur when scrolled into view (once). `delay` staggers
// siblings; `y` sets the rise distance. Reduced motion keeps only the fade
// (MotionConfig in ThemeRegistry).
export default function Reveal({ children, as = 'div', delay = 0, y = 40, scale, ...rest }) {
  const m = useTheme().custom.motion;
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y, filter: 'blur(6px)', ...(scale ? { scale } : null) }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', ...(scale ? { scale: 1 } : null) }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: m.durations.enter, ease: m.easeOut, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
