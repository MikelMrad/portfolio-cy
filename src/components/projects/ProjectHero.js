'use client';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { styled, useTheme } from '@mui/material/styles';
import Container from '@/components/layout/Container';
import Type from '@/components/ui/Type';

// Centered title block that rises in on load, then the lead render, which opens
// from an inset rounded frame to full width as the page scrolls.
const Root = styled('header')({
  paddingTop: 'clamp(32px, 6vw, 80px)',
});

const Copy = styled('div')({ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 });

const Frame = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  marginTop: 'clamp(40px, 6vw, 64px)',
  height: 'min(78svh, 75vw)',
  minHeight: 300,
  overflow: 'hidden',
  backgroundColor: theme.custom.colors.imgLoading,
}));

export default function ProjectHero({ project }) {
  const m = useTheme().custom.motion;
  const enter = (delay) => ({
    initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: m.durations.enter, ease: m.easeOut, delay },
  });

  const { scrollY } = useScroll();
  const inset = useTransform(scrollY, [0, 480], [5, 0]);
  const radius = useTransform(scrollY, [0, 480], [28, 0]);
  const clipPath = useMotionTemplate`inset(0 ${inset}% round ${radius}px)`;
  const imgScale = useTransform(scrollY, [0, 480], [1.12, 1]);

  return (
    <Root id="overview">
      <Container>
        <Copy>
          <motion.div {...enter(0)}>
            <Type token="eyebrow" as="p" muted>
              {project.academicContext} · {project.year}
            </Type>
          </motion.div>
          <motion.div {...enter(0.08)}>
            <Type token="display1" as="h1">
              {project.title}
            </Type>
          </motion.div>
          <motion.div {...enter(0.18)}>
            <Type token="intro" as="p" muted sx={{ maxWidth: '38ch' }}>
              {project.summary}
            </Type>
          </motion.div>
        </Copy>
      </Container>
      <Frame style={{ clipPath }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: m.durations.enter, delay: 0.3 }}>
        <motion.div style={{ position: 'absolute', inset: 0, scale: imgScale }}>
          <Image src={project.heroImage.src} alt={project.heroImage.alt} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        </motion.div>
      </Frame>
    </Root>
  );
}
