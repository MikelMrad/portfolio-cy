'use client';
import { useCallback, useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { styled, useTheme } from '@mui/material/styles';
import { site } from '@/content/site';
import { t } from '@/content/i18n';
import { LenisContext } from './LenisContext';

const pages = [
  { href: '/', key: 'home' },
  { href: '/projects', key: 'projects' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
];

const Overlay = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: 1500,
  backgroundColor: theme.custom.colors.night,
  color: theme.custom.colors.snow,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingInline: theme.custom.layout.gutter,
  paddingBlock: 96,
}));

const List = styled(motion.nav)({ display: 'flex', flexDirection: 'column', gap: 4 });

const MenuLink = styled(Link)(({ theme }) => {
  const m = theme.custom.motion;
  return {
    ...theme.custom.type.display3,
    display: 'inline-block',
    color: theme.custom.colors.nightMuted,
    width: 'fit-content',
    paddingBlock: 6,
    transition: `transform ${m.durations.reduced}s ${m.ease}, color ${m.durations.reduced}s ${m.ease}`,
    '&:hover': { color: theme.custom.colors.snow },
    '&:focus-visible': { outline: `2px solid ${theme.custom.colors.snow}`, outlineOffset: 4, color: theme.custom.colors.snow },
    // translate only when motion is allowed (reduced-motion keeps the color change only)
    '@media (prefers-reduced-motion: no-preference)': {
      '&:hover': { transform: 'translateX(8px)' },
    },
  };
});

const Hairline = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.custom.colors.lineDark}`,
  marginTop: 40,
  paddingTop: 24,
}));

const Meta = styled('div')(({ theme }) => ({
  ...theme.custom.type.label,
  color: theme.custom.colors.nightMuted,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
}));

const MetaLink = styled('a')(({ theme }) => ({
  color: 'inherit',
  width: 'fit-content',
  '&:focus-visible': { outline: `2px solid ${theme.custom.colors.snow}`, outlineOffset: 4 },
}));

export default function MenuOverlay({ open, onClose, triggerRef }) {
  const ref = useRef(null);
  const lenisRef = useContext(LenisContext);
  const theme = useTheme();
  const reduce = useReducedMotion();
  const m = theme.custom.motion;

  // Motion variants: clip-path reveal + staggered link fade-up; opacity-only under reduced motion.
  const overlayVariants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: m.durations.reduced, when: 'beforeChildren', staggerChildren: 0 } },
        exit: { opacity: 0, transition: { duration: m.durations.reduced } },
      }
    : {
        hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
        visible: {
          clipPath: 'inset(0 0 0% 0)',
          opacity: 1,
          transition: { duration: m.durations.base, ease: m.easeArray, when: 'beforeChildren', staggerChildren: m.stagger, delayChildren: 0.12 },
        },
        exit: { clipPath: 'inset(0 0 100% 0)', opacity: 0, transition: { duration: m.durations.base, ease: m.easeArray } },
      };

  const itemVariants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: m.durations.base, ease: m.easeArray } },
      };

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const focusables = ref.current?.querySelectorAll('a[href], button:not([disabled])');
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return undefined;
    const trigger = triggerRef?.current;
    const lenis = lenisRef?.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // native scroll lock (covers reduced-motion / no Lenis)
    lenis?.stop(); // pause smooth scroll while the overlay is open
    const focusables = ref.current?.querySelectorAll('a[href], button:not([disabled])');
    focusables?.[0]?.focus();
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      document.removeEventListener('keydown', onKeyDown);
      trigger?.focus(); // return focus to the trigger on close
    };
  }, [open, onKeyDown, triggerRef, lenisRef]);

  return (
    <div id="menu-overlay">
      <AnimatePresence>
        {open ? (
          <Overlay
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.menu')}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <List>
              {pages.map((p) => (
                <motion.div key={p.key} variants={itemVariants}>
                  <MenuLink href={p.href} onClick={onClose}>
                    {t(`nav.${p.key}`)}
                  </MenuLink>
                </motion.div>
              ))}
            </List>
            <motion.div variants={itemVariants}>
              <Hairline>
                <Meta>
                  <MetaLink href={`mailto:${site.email}`}>{site.email}</MetaLink>
                  <span>{site.location}</span>
                </Meta>
              </Hairline>
            </motion.div>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
