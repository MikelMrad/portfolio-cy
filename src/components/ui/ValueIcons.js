'use client';

// Four abstract line-art motifs (waves / starburst / concentric / rings).
// 56px, stroke 1.5, currentColor — recreated inline (ui-spec §ValueCard).
const base = {
  width: 56,
  height: 56,
  viewBox: '0 0 56 56',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

function Waves() {
  return (
    <svg {...base}>
      <path d="M4 20c6-7 14-7 20 0s14 7 20 0" />
      <path d="M4 30c6-7 14-7 20 0s14 7 20 0" />
      <path d="M4 40c6-7 14-7 20 0s14 7 20 0" />
    </svg>
  );
}

function Starburst() {
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 12;
    const cx = 28;
    const cy = 28;
    return (
      <line
        key={i}
        x1={cx + Math.cos(a) * 8}
        y1={cy + Math.sin(a) * 8}
        x2={cx + Math.cos(a) * 22}
        y2={cy + Math.sin(a) * 22}
      />
    );
  });
  return (
    <svg {...base}>
      <circle cx="28" cy="28" r="4" />
      {rays}
    </svg>
  );
}

function Concentric() {
  return (
    <svg {...base}>
      <circle cx="28" cy="28" r="6" />
      <circle cx="28" cy="28" r="13" />
      <circle cx="28" cy="28" r="20" />
    </svg>
  );
}

function Rings() {
  return (
    <svg {...base}>
      <circle cx="21" cy="28" r="14" />
      <circle cx="35" cy="28" r="14" />
    </svg>
  );
}

const icons = { waves: Waves, starburst: Starburst, concentric: Concentric, rings: Rings };

export default function ValueIcon({ name }) {
  const Icon = icons[name] || Waves;
  return <Icon />;
}
