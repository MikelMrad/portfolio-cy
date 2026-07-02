import StyleGuideClient from './StyleGuideClient';

export const metadata = {
  title: 'Style Guide',
  robots: { index: false, follow: false },
};

export default function StyleGuidePage() {
  return <StyleGuideClient />;
}
