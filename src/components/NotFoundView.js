'use client';
import { styled } from '@mui/material/styles';
import Type from '@/components/ui/Type';
import Button from '@/components/ui/Button';
import { t } from '@/content/i18n';

const Root = styled('section')(({ theme }) => ({
  minHeight: `calc(100svh - ${theme.custom.layout.navClearance}px)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  paddingInline: theme.custom.layout.gutter,
  paddingBlock: 96,
}));

export default function NotFoundView() {
  return (
    <Root>
      <div>
        <Type token="eyebrow" as="p" muted>
          404
        </Type>
        <Type token="display1" as="h1" sx={{ marginTop: '8px' }}>
          {t('notFound.title')}
        </Type>
        <Type token="intro" as="p" muted sx={{ marginTop: '16px', maxWidth: '32ch', marginInline: 'auto' }}>
          {t('notFound.line')}
        </Type>
        <div style={{ marginTop: 32 }}>
          <Button href="/">{t('notFound.backHome')}</Button>
        </div>
      </div>
    </Root>
  );
}
