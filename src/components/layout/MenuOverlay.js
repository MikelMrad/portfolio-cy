'use client';
import { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { styled, useTheme } from '@mui/material/styles';
import { site } from '@/content/site';
import { t } from '@/content/i18n';
import { pages, contactPage, isActive } from './nav';

// Small-screen menu: a rounded glass panel that drops from the nav capsule over
// a dimmed page. Tapping outside or pressing Escape closes it.
const Scrim = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: 998,
  backgroundColor: 'rgba(0,0,0,0.32)',
  [theme.breakpoints.up('sm')]: { display: 'none' },
}));

const Panel = styled(motion.div)(({ theme }) => {
  const c = theme.custom.colors;
  const l = theme.custom.layout;
  return {
    position: 'fixed',
    top: `calc(max(${l.navTop}px, env(safe-area-inset-top)) + ${l.header + 8}px)`,
    left: 12,
    right: 12,
    zIndex: 999,
    maxHeight: 'calc(100svh - 96px)',
    overflowY: 'auto',
    padding: '12px 20px 20px',
    borderRadius: theme.custom.radius.tile,
    color: c.label,
    backgroundColor: c.navBg,
    backdropFilter: 'saturate(180%) blur(24px)',
    WebkitBackdropFilter: 'saturate(180%) blur(24px)',
    boxShadow: `inset 0 0 0 1px ${c.separator}, 0 16px 48px rgba(0,0,0,0.18)`,
    transformOrigin: 'top center',
    '@media (prefers-reduced-transparency: reduce)': { backgroundColor: c.bg },
    [theme.breakpoints.up('sm')]: { display: 'none' },
  };
});

const MenuLink = styled(Link)(({ theme }) => ({
  ...theme.custom.type.display3,
  fontSize: '1.75rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 56,
  color: theme.custom.colors.label,
  '&[aria-current="page"]': { color: theme.custom.colors.label2 },
  '& .chev': { ...theme.custom.type.body, color: theme.custom.colors.label2 },
}));

const Meta = styled('div')(({ theme }) => ({
  ...theme.custom.type.body,
  color: theme.custom.colors.label2,
  display: 'flex',
  flexDirection: 'column',
  marginTop: 12,
  paddingTop: 8,
  borderTop: `1px solid ${theme.custom.colors.separator}`,
  '& a, & span': { display: 'inline-flex', alignItems: 'center', minHeight: 44, width: 'fit-content' },
}));

export default function MenuOverlay({ open, onClose, triggerRef }) {
  const ref = useRef(null);
  const theme = useTheme();
  const pathname = usePathname();
  const lenis = useLenis();
  const m = theme.custom.motion;

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        // Trap focus across the open panel and its trigger in the nav capsule.
        const trigger = triggerRef?.current;
        const inPanel = [...(ref.current?.querySelectorAll('a[href], button:not([disabled])') || [])];
        const focusables = trigger ? [trigger, ...inPanel] : inPanel;
        if (!focusables.length) return;
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
    [onClose, triggerRef]
  );

  useEffect(() => {
    if (!open) return undefined;
    const trigger = triggerRef?.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lenis?.stop(); // pause smooth scroll behind the open menu
    ref.current?.querySelector('a[href]')?.focus();
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      document.removeEventListener('keydown', onKeyDown);
      trigger?.focus(); // return focus to the trigger on close
    };
  }, [open, onKeyDown, triggerRef, lenis]);

  // Close if the viewport grows past the small-screen breakpoint while open.
  useEffect(() => {
    if (!open) return undefined;
    const mq = window.matchMedia(theme.breakpoints.up('sm').replace('@media ', ''));
    const onChange = (e) => e.matches && onClose();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [open, onClose, theme]);

  const links = [{ href: '/', key: 'home' }, ...pages, contactPage];

  return (
    <div id="menu-overlay">
      <AnimatePresence>
        {open ? (
          <>
            <Scrim key="scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <Panel
              key="panel"
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.menu')}
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: m.durations.base, ease: m.easeOut }}
            >
              <nav aria-label="Primary">
                {links.map((p, i) => (
                  <motion.div
                    key={p.key}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: m.durations.base, ease: m.easeOut, delay: 0.04 * i }}
                  >
                    <MenuLink
                      href={p.href}
                      onClick={onClose}
                      aria-current={(p.href === '/' ? pathname === '/' : isActive(pathname, p.href)) ? 'page' : undefined}
                    >
                      {t(`nav.${p.key}`)}
                      <span className="chev" aria-hidden="true">
                        ›
                      </span>
                    </MenuLink>
                  </motion.div>
                ))}
              </nav>
              <Meta>
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <a href={`tel:${site.phone.replace(/\s+/g, '')}`}>{site.phone}</a>
              </Meta>
            </Panel>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
