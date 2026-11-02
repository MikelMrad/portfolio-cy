'use client';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

// Thin reading-progress bar pinned to the top edge.
export default function ScrollProgress() {
  const theme = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: '0 50%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1100,
        backgroundColor: theme.custom.colors.label,
      }}
    />
  );
}
