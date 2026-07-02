'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { site } from '@/content/site';
import { t } from '@/content/i18n';
import MenuOverlay from './MenuOverlay';

// Transparent over the Home hero (snow text) → `night` bg after scrollY > 40 (0.3s).
// Solid `night` from the top on every other route. Full-width hairline beneath.
const Bar = styled('header', { shouldForwardProp: (p) => p !== 'solid' })(({ theme, solid }) => {
  const c = theme.custom.colors;
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: 72,
    display: 'flex',
    alignItems: 'center',
    color: c.snow,
    backgroundColor: solid ? c.night : 'transparent',
    borderBottom: `1px solid ${c.lineDark}`,
    transition: `background-color ${theme.custom.motion.durations.header}s ${theme.custom.motion.ease}`,
    [theme.breakpoints.up('md')]: { height: 88 },
  };
});

const Inner = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: theme.custom.layout.maxWidth,
  marginInline: 'auto',
  // Keep the wordmark / menu clear of a landscape notch.
  paddingLeft: `max(${theme.custom.layout.gutter}, env(safe-area-inset-left))`,
  paddingRight: `max(${theme.custom.layout.gutter}, env(safe-area-inset-right))`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Wordmark = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 44,
  fontFamily: theme.custom.type.display3.fontFamily,
  fontWeight: 600,
  fontSize: 22,
  lineHeight: 1,
  color: 'inherit',
  textTransform: 'lowercase',
  letterSpacing: '-0.01em',
  '&:focus-visible': { outline: `2px solid ${theme.custom.colors.snow}`, outlineOffset: 4 },
}));

const MenuButton = styled('button')(({ theme }) => ({
  ...theme.custom.type.label,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  minHeight: 44,
  minWidth: 44,
  justifyContent: 'flex-end',
  padding: '0 2px',
  background: 'none',
  border: 'none',
  color: 'inherit',
  cursor: 'pointer',
  '&:focus-visible': { outline: `2px solid ${theme.custom.colors.snow}`, outlineOffset: 4 },
}));

// 24×12 two-line hamburger that converges on hover and rotates to an × when open.
const Burger = styled('span', { shouldForwardProp: (p) => p !== 'open' })(({ theme, open }) => {
  const dur = theme.custom.motion.durations.header;
  const ease = theme.custom.motion.ease;
  return {
    position: 'relative',
    display: 'inline-block',
    width: 24,
    height: 12,
    flex: 'none',
    '& i': {
      position: 'absolute',
      left: 0,
      display: 'block',
      width: '100%',
      height: 2,
      backgroundColor: 'currentColor',
      transition: `top ${dur}s ${ease}, transform ${dur}s ${ease}`,
    },
    '& i:nth-of-type(1)': { top: open ? 5 : 0, transform: open ? 'rotate(45deg)' : 'none' },
    '& i:nth-of-type(2)': { top: open ? 5 : 10, transform: open ? 'rotate(-45deg)' : 'none' },
  };
});

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isHome) return undefined;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const solid = !isHome || scrolled || open;
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <>
      <Bar solid={solid}>
        <Inner>
          <Wordmark href="/">{site.wordmark}</Wordmark>
          <MenuButton
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls="menu-overlay"
            aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t('nav.close') : t('nav.menu')}
            <Burger open={open} aria-hidden="true">
              <i />
              <i />
            </Burger>
          </MenuButton>
        </Inner>
      </Bar>
      <MenuOverlay open={open} onClose={closeMenu} triggerRef={triggerRef} />
    </>
  );
}
