'use client';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { site } from '@/content/site';
import { t } from '@/content/i18n';

const pages = [
  { href: '/', key: 'home' },
  { href: '/projects', key: 'projects' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
];

const Root = styled('footer')(({ theme }) => ({
  backgroundColor: theme.custom.colors.night,
  color: theme.custom.colors.snow,
  paddingBlock: theme.custom.layout.sectionPad,
}));

const Inner = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: theme.custom.layout.maxWidth,
  marginInline: 'auto',
  paddingLeft: `max(${theme.custom.layout.gutter}, env(safe-area-inset-left))`,
  paddingRight: `max(${theme.custom.layout.gutter}, env(safe-area-inset-right))`,
}));

const Top = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 48,
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}));

const ClosingLine = styled('p')(({ theme }) => ({
  ...theme.custom.type.display2,
  margin: 0,
  maxWidth: '16ch',
}));

const Columns = styled('div')({ display: 'flex', gap: 64 });

const Column = styled('div')({ display: 'flex', flexDirection: 'column', gap: 12 });

const ColTitle = styled('p')(({ theme }) => ({
  ...theme.custom.type.label,
  color: theme.custom.colors.nightMuted,
  margin: 0,
}));

// ≥44px touch targets on mobile; desktop keeps the tight inline rhythm.
const footerLinkBase = (theme) => ({
  ...theme.custom.type.label,
  color: theme.custom.colors.snow,
  display: 'inline-flex',
  alignItems: 'center',
  width: 'fit-content',
  [theme.breakpoints.down('md')]: { minHeight: 44 },
  '&:focus-visible': { outline: `2px solid ${theme.custom.colors.snow}`, outlineOffset: 4 },
});

const FooterLink = styled(Link)(({ theme }) => footerLinkBase(theme));

const ExternalLink = styled('a')(({ theme }) => footerLinkBase(theme));

// Query container so the wordmark can size to its own width (not the viewport).
const WordmarkWrap = styled('div')({ overflow: 'hidden', marginTop: 64, containerType: 'inline-size' });

// Fit the fixed 14-char wordmark to the container width so it fills edge-to-edge
// and never overflows/clips at any viewport. 100cqw = wrap width; the string is
// ~5.98em wide, so ~16cqw fills the width with a small safety margin. Capped at
// the spec's 15rem for very wide containers; overflow:hidden is a final guard.
const Wordmark = styled('p')(({ theme }) => ({
  ...theme.custom.type.wordmarkGiant,
  margin: 0,
  textTransform: 'lowercase',
  whiteSpace: 'nowrap',
  fontSize: 'min(16cqw, 15rem)',
}));

const MetaRow = styled('div')(({ theme }) => ({
  ...theme.custom.type.label,
  color: theme.custom.colors.nightMuted,
  display: 'flex',
  flexWrap: 'wrap',
  gap: 16,
  justifyContent: 'space-between',
  borderTop: `1px solid ${theme.custom.colors.lineDark}`,
  paddingTop: 24,
  marginTop: 24,
}));

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = site.socials.filter((s) => s.href && s.href !== '#'); // render only confirmed links

  return (
    <Root>
      <Inner>
        <Top>
          <ClosingLine>Designing with context.</ClosingLine>
          <Columns>
            <Column as="nav" aria-label="Footer">
              <ColTitle>{t('footer.pagesTitle')}</ColTitle>
              {pages.map((p) => (
                <FooterLink key={p.key} href={p.href}>
                  {t(`nav.${p.key}`)}
                </FooterLink>
              ))}
            </Column>
            {socials.length > 0 ? (
              <Column>
                <ColTitle>{t('footer.socialTitle')}</ColTitle>
                {socials.map((s) => (
                  <ExternalLink key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </ExternalLink>
                ))}
              </Column>
            ) : null}
          </Columns>
        </Top>

        <WordmarkWrap>
          <Wordmark>{site.wordmark}</Wordmark>
        </WordmarkWrap>

        <MetaRow>
          <span>
            © {year} {site.name} — {t('footer.rights')}
          </span>
          <span>
            {site.role} — {site.location}
          </span>
        </MetaRow>
      </Inner>
    </Root>
  );
}
