'use client';
import { styled } from '@mui/material/styles';
import Type from '@/components/ui/Type';
import TextLink from '@/components/ui/TextLink';
import { t } from '@/content/i18n';

// Full-bleed night 404 (the night background spans the full viewport width).
const Root = styled('section')(({ theme }) => ({
  minHeight: '100svh',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.custom.colors.night,
  color: theme.custom.colors.snow,
}));

const Inner = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: theme.custom.layout.maxWidth,
  marginInline: 'auto',
  paddingInline: theme.custom.layout.gutter,
  paddingBlock: 120,
}));

export default function NotFoundView() {
  return (
    <Root>
      <Inner>
        <Type token="display1" as="h1">
          404
        </Type>
        <Type token="body" as="p" tone="night" muted style={{ marginTop: 16, maxWidth: '44ch' }}>
          {t('notFound.line')}
        </Type>
        <div style={{ marginTop: 32 }}>
          <TextLink href="/" tone="night">
            {t('notFound.backHome')}
          </TextLink>
        </div>
      </Inner>
    </Root>
  );
}
