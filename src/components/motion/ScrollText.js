'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import Type from '@/components/ui/Type';

// Statement that lights up word by word as it scrolls through the viewport.
// `parts`: [{ text, muted }], so two-tone statements keep their tones.
function Word({ children, progress, range, muted }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} data-muted={muted ? '' : undefined}>
      {children}
    </motion.span>
  );
}

export default function ScrollText({ parts, token = 'display2', as = 'p', tone, sx }) {
  const ref = useRef(null);
  const c = useTheme().custom.colors;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.55'] });
  const words = parts.flatMap((p) => p.text.split(' ').map((w) => ({ w, muted: p.muted })));
  return (
    <Type
      ref={ref}
      token={token}
      as={as}
      tone={tone}
      sx={{ '& [data-muted]': { color: tone === 'night' ? c.nightLabel2 : c.label2 }, ...sx }}
      aria-label={parts.map((p) => p.text).join(' ')}
    >
      {words.map(({ w, muted: isMuted }, i) => {
        const start = i / words.length;
        return (
          <span key={`${w}-${i}`} aria-hidden="true">
            <Word progress={scrollYProgress} range={[start, start + 1 / words.length]} muted={isMuted}>
              {w}
            </Word>{' '}
          </span>
        );
      })}
    </Type>
  );
}
