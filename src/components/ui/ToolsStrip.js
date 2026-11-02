'use client';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Type from './Type';
import { site } from '@/content/site';
import { t } from '@/content/i18n';

// The software she works in, as a quiet row of pills.
const Wrap = styled('div')({ marginTop: 'clamp(40px, 6vw, 64px)', textAlign: 'center' });

const Row = styled('ul')({
  listStyle: 'none',
  margin: '16px 0 0',
  padding: 0,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 8,
});

const Tool = styled(motion.li)(({ theme }) => ({
  ...theme.custom.type.label,
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 36,
  paddingInline: 16,
  borderRadius: theme.custom.radius.pill,
  backgroundColor: theme.custom.colors.tile,
  color: theme.custom.colors.label,
}));

export default function ToolsStrip() {
  return (
    <Wrap>
      <Type token="label" as="p" muted>
        {t('home.tools')}
      </Type>
      <Row>
        {site.tools.map((tool, i) => (
          <Tool
            key={tool}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
          >
            {tool}
          </Tool>
        ))}
      </Row>
    </Wrap>
  );
}
