'use client';
import Link from 'next/link';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { t } from '@/content/i18n';

// Small translucent glass card over the hero (bottom-right on md+). Whole card links to detail.
const Card = styled(Link)(({ theme }) => {
  const c = theme.custom.colors;
  const m = theme.custom.motion;
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: 12,
    // Full-width glass teaser under the hero copy on mobile; fixed float on md+.
    width: '100%',
    maxWidth: '100%',
    color: c.snow,
    [theme.breakpoints.up('md')]: { width: 320 },
    backgroundColor: c.chipDark,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: `1px solid ${c.lineDark}`,
    transition: `background-color ${m.durations.header}s ${m.ease}`,
    '&:hover': { backgroundColor: 'rgba(255,255,255,0.10)' },
    '&:focus-visible': { outline: `2px solid ${c.snow}`, outlineOffset: 4 },
  };
});

const Thumb = styled('div')(({ theme }) => ({
  position: 'relative',
  flex: 'none',
  width: 96,
  height: 96,
  backgroundColor: theme.custom.colors.imgLoading,
  overflow: 'hidden',
}));

const Body = styled('div')({ minWidth: 0 });

const LabelRow = styled('div')(({ theme }) => ({
  ...theme.custom.type.label,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  color: theme.custom.colors.snow,
}));

const Name = styled('div')(({ theme }) => ({
  ...theme.custom.type.hSmall,
  color: theme.custom.colors.snow,
  marginTop: 6,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export default function LatestProjectCard({ project }) {
  if (!project) return null;
  return (
    <Card href={`/projects/${project.slug}/`} aria-label={`${t('home.latestProject')}: ${project.title}`}>
      <Thumb>
        <Image src={project.heroImage.src} alt="" fill sizes="96px" style={{ objectFit: 'cover' }} />
      </Thumb>
      <Body>
        <LabelRow>
          <span>{t('home.latestProject')}</span>
          <span aria-hidden="true">↗</span>
        </LabelRow>
        <Name>{project.title}</Name>
        <div style={{ opacity: 0.75, marginTop: 2 }}>{project.year}</div>
      </Body>
    </Card>
  );
}
