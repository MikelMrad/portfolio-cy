'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

// Fade-up-on-scroll wrapper (Framer). Under reduced motion → opacity-only ≤ 0.2s.
export default function Reveal({ children, delay = 0, as = 'div', ...rest }) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const m = theme.custom.motion;
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    return (
      <MotionTag
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: m.durations.reduced }}
        {...rest}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y: m.revealOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: m.durations.reveal, ease: m.easeArray, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
