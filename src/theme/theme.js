import { createTheme } from '@mui/material/styles';

// ─────────────────────────────────────────────────────────────────────────
// Single design-token source. Every styled() component reads from here, no
// component hardcodes a color / font / size.
//
// Colors are CSS custom properties (defined in globals.css) so the whole site
// follows the visitor's light/dark appearance with no JS and no flash. The
// `night*` tokens are the black showcase sections, fixed in both appearances.
// ─────────────────────────────────────────────────────────────────────────

const colors = {
  bg: 'var(--c-bg)', // page background
  bgAlt: 'var(--c-bg-alt)', // alternating section / grouped background
  tile: 'var(--c-tile)', // card surface on bgAlt
  label: 'var(--c-label)', // primary text
  label2: 'var(--c-label-2)', // secondary text
  separator: 'var(--c-separator)',
  fill: 'var(--c-fill)', // quiet control fill (chips, inputs)
  fillHover: 'var(--c-fill-hover)',
  buttonBg: 'var(--c-button-bg)',
  buttonFg: 'var(--c-button-fg)',
  navBg: 'var(--c-nav-bg)',
  imgLoading: 'var(--c-img-loading)',
  danger: 'var(--c-danger)',
  night: '#000000',
  nightTile: '#1d1d1f',
  nightLabel: '#f5f5f7',
  nightLabel2: '#a1a1a6',
  nightSeparator: 'rgba(255,255,255,0.16)',
};

// System font first (SF Pro on Apple devices), Inter self-hosted as the fallback
// elsewhere (var set by next/font in layout.js).
const SANS =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", var(--font-inter), "Helvetica Neue", Helvetica, Arial, sans-serif';

// Apple-style text styles. Hierarchy comes from size first, then weight and
// color. Each token is a full style object, spread into sx/styled.
const type = {
  display1: { fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.015em' },
  display2: { fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(2.25rem, 4.6vw, 3.5rem)', lineHeight: 1.07, letterSpacing: '-0.01em' },
  display3: { fontFamily: SANS, fontWeight: 600, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.1, letterSpacing: '-0.005em' },
  hSmall: { fontFamily: SANS, fontWeight: 600, fontSize: '1.3125rem', lineHeight: 1.24, letterSpacing: '0.005em' },
  eyebrow: { fontFamily: SANS, fontWeight: 600, fontSize: '1.0625rem', lineHeight: 1.3, letterSpacing: '-0.01em' },
  intro: { fontFamily: SANS, fontWeight: 400, fontSize: 'clamp(1.1875rem, 1.7vw, 1.5rem)', lineHeight: 1.4, letterSpacing: '0.005em' },
  body: { fontFamily: SANS, fontWeight: 400, fontSize: '1.0625rem', lineHeight: 1.53, letterSpacing: '-0.01em' },
  label: { fontFamily: SANS, fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.43, letterSpacing: '-0.005em' },
  caption: { fontFamily: SANS, fontWeight: 400, fontSize: '0.75rem', lineHeight: 1.33, letterSpacing: 0 },
};

const motion = {
  ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // CSS transitions
  easeArray: [0.25, 0.1, 0.25, 1], // Framer Motion `ease`
  easeOut: [0.16, 1, 0.3, 1], // entrances (Framer)
  durations: { fast: 0.2, base: 0.32, reveal: 0.6, enter: 0.9 },
  spring: { type: 'spring', stiffness: 380, damping: 32 }, // nav pill, indicators
};

const radius = { tile: 28, image: 18, card: 18, control: 12, pill: 980 };

const layout = {
  maxWidth: 1200,
  wideMaxWidth: 1440, // full-width imagery
  gutter: 'clamp(20px, 4vw, 40px)',
  sectionPad: 'clamp(72px, 10vw, 140px)',
  header: 52, // floating nav capsule height
  navTop: 12, // capsule offset from the top edge
  navClearance: 76, // space content keeps clear of the capsule (top + height + gap)
};

export const theme = createTheme({
  // Real colors here only feed MUI internals; the rendered colors are the CSS
  // variables above (body colors are set in CssBaseline below).
  palette: {
    mode: 'light',
    primary: { main: '#1d1d1f', contrastText: '#ffffff' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#1d1d1f', secondary: '#6e6e73' },
  },
  shape: { borderRadius: radius.control },
  shadows: Array(25).fill('none'), // depth via surfaces + separators; must be length 25
  typography: {
    fontFamily: SANS,
    htmlFontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    button: { textTransform: 'none', fontWeight: 400, letterSpacing: 0 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: colors.bg, color: colors.label, ...type.body },
      },
    },
    MuiPaper: { defaultProps: { elevation: 0 }, styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
  },
  // Arbitrary namespace, survives createTheme's deepmerge; read via useTheme()/styled(({theme})).
  custom: { colors, type, motion, radius, layout },
});

export default theme;
