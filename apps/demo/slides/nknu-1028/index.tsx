import imgHeadshot from '@assets/headshot.webp';
import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  Step,
  Steps,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';
import imgChineseReading from './assets/chinese-scaffold-reading.webp';
import imgLibraryHome from './assets/ebook-library-home.png';
import imgEbookToolbar from './assets/ebook-toolbar.png';
import imgInteractiveStepMath from './assets/interactive-step-math.webp';
import imgMathConcept from './assets/math-ebook-concept.webp';
import imgMathPrint from './assets/math-print-preview.webp';
import imgSentence from './assets/sentence-unscramble.png';

export const design: DesignSystem = {
  palette: { bg: '#F0F4F8', text: '#1e293b', accent: '#38A3A5' },
  fonts: {
    display:
      '"Outfit", "Chiron GoRound TC", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body: '"Chiron GoRound TC", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 136, body: 34 },
  radius: 36,
};

const deep = '#22577A';
const muted = '#64748b';
const warn = '#c2410c';
const bad = '#dc2626';

const SLIDE_ID = 'nknu-1028';

const socialUrls = {
  instagram: 'https://www.instagram.com/spedmix2025/',
  facebook: 'https://www.facebook.com/p/%E7%B1%B3%E5%85%8B%E5%B8%AB-61583357100870/',
  threads: 'https://www.threads.com/@spedmix2025',
} as const;

const ICONS = [
  'ads_click',
  'arrow_downward',
  'arrow_forward',
  'auto_stories',
  'bolt',
  'calculate',
  'call_split',
  'center_focus_strong',
  'chat',
  'check_circle',
  'close',
  'co_present',
  'description',
  'folder',
  'folder_open',
  'handyman',
  'lightbulb',
  'menu_book',
  'person',
  'psychology',
  'reorder',
  'school',
  'smart_toy',
  'sports_esports',
  'stairs',
  'sync',
  'terminal',
  'touch_app',
  'visibility',
  'volume_up',
  'work',
].sort();

const FONT_LINKS: [string, string][] = [
  [
    `osd-webfont-${SLIDE_ID}`,
    'https://fonts.googleapis.com/css2?family=Chiron+GoRound+TC:wght@400;500;700;900&family=Outfit:wght@500;700;800&display=swap',
  ],
  [
    `osd-icons-${SLIDE_ID}`,
    `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,500,1,0&icon_names=${ICONS.join(',')}&display=block`,
  ],
];

// Apple's two-parameter spring (damping ratio + response), sampled into a CSS
// linear() easing so in-page entrances carry real overshoot and settle.
type Spring = { easing: string; ms: number };
const spring = (dampingRatio: number, response: number): Spring => {
  const w0 = (2 * Math.PI) / response;
  const z = dampingRatio;
  const wd = z < 1 ? w0 * Math.sqrt(1 - z * z) : 0;
  const pos = (t: number) =>
    z < 1
      ? 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + ((z * w0) / wd) * Math.sin(wd * t))
      : 1 - (1 + w0 * t) * Math.exp(-w0 * t);
  const envelope = (t: number) =>
    z < 1 ? Math.exp(-z * w0 * t) / Math.sqrt(1 - z * z) : (1 + w0 * t) * Math.exp(-w0 * t);
  let settle = 0;
  while (envelope(settle) > 0.002) settle += 0.005;
  const samples = 48;
  const points: number[] = [];
  for (let i = 0; i <= samples; i++) points.push(i === samples ? 1 : pos((settle * i) / samples));
  return {
    easing: `linear(${points.map((p) => Number(p.toFixed(4))).join(', ')})`,
    ms: Math.round(settle * 1000),
  };
};

const SOFT = spring(1, 0.5);
const BOUNCY = spring(0.7, 0.45);

// The live page gets its own stacking context so z-indexed content of an
// outgoing page can never paint through it.
const css = `
[data-osd-current-page] { z-index: 1; }
@keyframes nk-rise { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: none; } }
@keyframes nk-materialize { from { opacity: 0; transform: scale(0.94); filter: blur(18px); } to { opacity: 1; transform: none; filter: blur(0); } }
@keyframes nk-pop { from { opacity: 0; transform: scale(0.2); } to { opacity: 1; transform: none; } }
@keyframes nk-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes nk-line { from { transform: translateY(110%); } to { transform: none; } }
@keyframes nk-track { from { opacity: 0; letter-spacing: 0.6em; } to { opacity: 1; letter-spacing: 0.04em; } }
@keyframes nk-grow { from { transform: scaleX(0); } to { transform: none; } }
@keyframes nk-spin { from { opacity: 0; transform: scale(0.4) rotate(-24deg); } to { opacity: 1; transform: none; } }
[data-osd-step="revealed"] > .nk-step { animation: nk-rise ${SOFT.ms}ms ${SOFT.easing} both; }
@media (prefers-reduced-motion: reduce) {
  .nk-anim, [data-osd-step="revealed"] > .nk-step {
    animation-name: nk-fade !important;
    animation-duration: 240ms !important;
    animation-timing-function: ease-out !important;
  }
}
`;

if (typeof document !== 'undefined') {
  for (const [id, href] of FONT_LINKS) {
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    if (link.href !== href) link.href = href;
  }
  const styleId = `osd-styles-${SLIDE_ID}`;
  let style = document.getElementById(styleId);
  if (!style) {
    style = document.createElement('style');
    style.id = styleId;
    document.head.appendChild(style);
  }
  if (style.textContent !== css) style.textContent = css;
}

const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];

export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 260, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 260,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const settle: SlideTransition = {
  duration: 280,
  exit: { duration: 280, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 280,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};

// PART dividers only: the new (dark) page opens as a circle grown from the
// section icon, over the held outgoing page. The icon's centre sits at
// 216 × 206 on the 1920 × 1080 canvas; 125% of the reference radius reaches the
// farthest corner.
const PART_ORIGIN = '11.25% 19.07%';
const partReveal: SlideTransition = {
  duration: 640,
  exit: { duration: 640, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 640,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    keyframes: [
      { clipPath: `circle(0% at ${PART_ORIGIN})` },
      { clipPath: `circle(125% at ${PART_ORIGIN})` },
    ],
  },
};

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
};

// Frosted look without backdrop-filter: the stage behind is only soft glows,
// so a near-opaque white reads the same and keeps page turns cheap.
const glass: CSSProperties = {
  background: 'rgba(255, 255, 255, 0.78)',
  border: '1px solid rgba(255, 255, 255, 0.9)',
  boxShadow:
    'inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 30px 60px -30px rgba(34, 87, 122, 0.28), 0 2px 6px rgba(15, 23, 42, 0.04)',
  borderRadius: 'var(--osd-radius)',
};

const brandFill: CSSProperties = {
  background: `linear-gradient(150deg, rgba(56, 163, 165, 0.94), ${deep})`,
  color: '#ffffff',
};

const gradText: CSSProperties = {
  background: `linear-gradient(135deg, var(--osd-accent) 0%, ${deep} 100%)`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

const eyebrow: CSSProperties = {
  fontSize: 26,
  fontWeight: 700,
  letterSpacing: '0.14em',
  color: 'var(--osd-accent)',
};

const h2: CSSProperties = {
  fontFamily: 'var(--osd-font-display)',
  fontSize: 68,
  fontWeight: 900,
  lineHeight: 1.15,
  letterSpacing: '-0.01em',
  margin: 0,
};

const softPill: CSSProperties = {
  alignSelf: 'flex-start',
  fontSize: 24,
  fontWeight: 700,
  color: 'var(--osd-accent)',
  background: 'rgba(56, 163, 165, 0.12)',
  borderRadius: 999,
  padding: '6px 20px',
};

const linkReset: CSSProperties = { color: 'inherit', textDecoration: 'none' };

const Icon = ({
  name,
  size,
  color = 'currentColor',
}: {
  name: string;
  size: number;
  color?: string;
}) => (
  <span
    style={{
      fontFamily: '"Material Symbols Rounded"',
      fontSize: size,
      lineHeight: 1,
      color,
      fontWeight: 'normal',
      fontStyle: 'normal',
      letterSpacing: 'normal',
      whiteSpace: 'nowrap',
      direction: 'ltr',
      fontFeatureSettings: '"liga"',
      WebkitFontSmoothing: 'antialiased',
      display: 'inline-block',
      userSelect: 'none',
    }}
  >
    {name}
  </span>
);

const Glow = ({ x, y, size, color }: { x: number; y: number; size: number; color: string }) => (
  <div
    style={{
      position: 'absolute',
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
      pointerEvents: 'none',
    }}
  />
);

const Stage = ({ children, dots = false }: { children: ReactNode; dots?: boolean }) => (
  <div style={fill}>
    <Glow x={1500} y={260} size={1300} color="rgba(56, 163, 165, 0.20)" />
    <Glow x={260} y={900} size={1100} color="rgba(59, 130, 246, 0.10)" />
    <Glow x={1100} y={1050} size={900} color="rgba(87, 204, 153, 0.12)" />
    {dots && (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(30, 41, 59, 0.10) 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
    )}
    {children}
  </div>
);

const Rise = ({
  children,
  delay = 0,
  kind = 'rise',
  motion = SOFT,
  style,
}: {
  children: ReactNode;
  delay?: number;
  kind?: 'rise' | 'materialize' | 'pop' | 'fade' | 'line' | 'track' | 'grow' | 'spin';
  motion?: Spring;
  style?: CSSProperties;
}) => {
  const active = useIsActivePage();
  return (
    <div
      className={active ? 'nk-anim' : undefined}
      style={{
        ...style,
        animation: active
          ? `nk-${kind} ${motion.ms}ms ${motion.easing} ${delay}ms both`
          : undefined,
      }}
    >
      {children}
    </div>
  );
};

const StepIn = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => {
  const active = useIsActivePage();
  return (
    <div className={active ? 'nk-step' : undefined} style={style}>
      {children}
    </div>
  );
};

const Tile = ({
  icon,
  size,
  radius,
  iconSize,
  tone = 'brand',
}: {
  icon: string;
  size: number;
  radius: number;
  iconSize: number;
  tone?: 'brand' | 'soft' | 'warn';
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: radius,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background:
        tone === 'brand'
          ? `linear-gradient(145deg, #4FBDBE 0%, var(--osd-accent) 45%, ${deep} 100%)`
          : tone === 'warn'
            ? 'rgba(234, 88, 12, 0.12)'
            : 'rgba(56, 163, 165, 0.12)',
      boxShadow:
        tone === 'brand'
          ? 'inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 18px 36px -16px rgba(34, 87, 122, 0.55)'
          : 'none',
    }}
  >
    <Icon
      name={icon}
      size={iconSize}
      color={tone === 'brand' ? '#ffffff' : tone === 'warn' ? warn : 'var(--osd-accent)'}
    />
  </div>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 44,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 22,
        color: muted,
        fontWeight: 500,
      }}
    >
      <span>
        用 AI 製作特教教材與學習單<span style={{ margin: '0 12px', opacity: 0.4 }}>|</span>米克師
      </span>
      <span style={{ fontFamily: 'var(--osd-font-display)', fontVariantNumeric: 'tabular-nums' }}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const HeaderRow = ({ icon, title }: { icon: string; title: ReactNode }) => (
  <>
    <div style={{ position: 'absolute', left: 120, top: 100 }}>
      <Tile icon={icon} size={104} radius={30} iconSize={56} />
    </div>
    <Rise style={{ position: 'absolute', left: 256, top: 100 }}>
      <h2 style={{ ...h2, lineHeight: '104px', whiteSpace: 'nowrap' }}>{title}</h2>
    </Rise>
  </>
);

const SubLine = ({ children, delay = 100 }: { children: ReactNode; delay?: number }) => (
  <Rise delay={delay} style={{ position: 'absolute', left: 256, top: 214 }}>
    <p style={{ fontSize: 30, color: muted, margin: 0 }}>{children}</p>
  </Rise>
);

const Chip = ({ children, strong = false }: { children: ReactNode; strong?: boolean }) => (
  <span
    style={{
      ...glass,
      borderRadius: 999,
      padding: '12px 30px',
      fontSize: 28,
      fontWeight: 700,
      color: strong ? 'var(--osd-accent)' : 'var(--osd-text)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
    }}
  >
    {children}
  </span>
);

const Dot = ({ color }: { color: string }) => (
  <span style={{ width: 14, height: 14, borderRadius: '50%', background: color }} />
);

const FrameBar = ({ label }: { label: string }) => (
  <div
    style={{
      height: 52,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '0 22px',
      borderBottom: '1px solid rgba(30, 41, 59, 0.06)',
      flexShrink: 0,
    }}
  >
    <Dot color="#ff5f57" />
    <Dot color="#febc2e" />
    <Dot color="#28c840" />
    <span
      style={{
        margin: '0 auto',
        fontSize: 19,
        color: muted,
        background: 'rgba(240, 244, 248, 0.9)',
        borderRadius: 999,
        padding: '5px 26px',
        fontFamily: 'var(--osd-font-display)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
    <span style={{ width: 62 }} />
  </div>
);

// Window showing a whole screenshot (no cropping) at a fixed width, scaled up or
// down to fit; maxHeight caps tall shots.
const ShotFrame = ({
  src,
  alt,
  label,
  maxWidth,
  maxHeight,
}: {
  src: string;
  alt: string;
  label: string;
  maxWidth: number;
  maxHeight: number;
}) => (
  <div
    style={{
      ...glass,
      display: 'inline-flex',
      flexDirection: 'column',
      borderRadius: 28,
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.9)',
    }}
  >
    <FrameBar label={label} />
    <img
      src={src}
      alt={alt}
      style={{
        display: 'block',
        width: maxWidth,
        height: 'auto',
        maxHeight,
        objectFit: 'contain',
        background: '#ffffff',
      }}
    />
  </div>
);

// One title line rising out from behind its own mask.
const LineReveal = ({ children, delay }: { children: ReactNode; delay: number }) => (
  <div style={{ overflow: 'hidden', paddingBottom: 8 }}>
    <Rise delay={delay} kind="line" motion={SOFT}>
      {children}
    </Rise>
  </div>
);

// PART pages switch to a dark stage so a new section reads at a glance.
const night = '#0f2a3d';
const mint = '#8ee3df';

const partTitle: CSSProperties = {
  fontFamily: 'var(--osd-font-display)',
  fontSize: 140,
  fontWeight: 900,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: '#ffffff',
};

const PartTool = ({ icon, label, delay }: { icon: string; label: string; delay: number }) => (
  <Rise
    delay={delay}
    kind="pop"
    motion={BOUNCY}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      height: 72,
      padding: '0 30px 0 12px',
      borderRadius: 999,
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.16)',
      color: '#ffffff',
    }}
  >
    <span
      style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(142, 227, 223, 0.16)',
      }}
    >
      <Icon name={icon} size={30} color={mint} />
    </span>
    <span style={{ fontSize: 28, fontWeight: 700 }}>{label}</span>
  </Rise>
);

const PartDivider = ({
  part,
  num,
  time,
  icon,
  line1,
  line2,
  sub,
  detail,
  children,
}: {
  part: string;
  num: string;
  time: string;
  icon: string;
  line1: string;
  line2: string;
  sub: string;
  detail: string;
  children: ReactNode;
}) => (
  <div
    style={{
      ...fill,
      background: `linear-gradient(135deg, ${night} 0%, #163d52 55%, #1d5a63 100%)`,
      color: '#ffffff',
    }}
  >
    <Glow x={1500} y={300} size={1300} color="rgba(56, 163, 165, 0.30)" />
    <Glow x={200} y={1000} size={1000} color="rgba(59, 130, 246, 0.16)" />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.10) 1.5px, transparent 1.5px)',
        backgroundSize: '36px 36px',
        maskImage: 'linear-gradient(90deg, transparent 0%, black 55%, black 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 55%, black 100%)',
      }}
    />
    <Rise delay={240} kind="materialize" style={{ position: 'absolute', right: 110, top: 150 }}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 620,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: '3px rgba(142, 227, 223, 0.32)',
        }}
      >
        {num}
      </div>
    </Rise>
    <div style={{ position: 'absolute', left: 160, top: 150 }}>
      <Rise delay={120} kind="spin" motion={BOUNCY}>
        <Tile icon={icon} size={112} radius={32} iconSize={60} />
      </Rise>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 56, marginTop: 36 }}>
        <Rise delay={240} kind="track" motion={SOFT}>
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 40,
              fontWeight: 800,
              color: mint,
              whiteSpace: 'nowrap',
            }}
          >
            {part}
          </div>
        </Rise>
        <Rise delay={420} kind="grow" motion={SOFT} style={{ transformOrigin: 'left center' }}>
          <div style={{ width: 96, height: 4, borderRadius: 999, background: mint }} />
        </Rise>
        <Rise delay={520} kind="fade">
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 34,
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.6)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {time}
          </div>
        </Rise>
      </div>
      <div style={{ marginTop: 20 }}>
        <LineReveal delay={320}>
          <div style={partTitle}>{line1}</div>
        </LineReveal>
        <LineReveal delay={420}>
          <div
            style={{
              ...partTitle,
              background: `linear-gradient(90deg, ${mint} 0%, #e3fbf9 100%)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {line2}
          </div>
        </LineReveal>
      </div>
      <Rise delay={600} style={{ marginTop: 20 }}>
        <div style={{ fontSize: 40, fontWeight: 700 }}>{sub}</div>
      </Rise>
      <Rise delay={680} style={{ marginTop: 10 }}>
        <div style={{ fontSize: 30, color: 'rgba(255, 255, 255, 0.62)' }}>{detail}</div>
      </Rise>
    </div>
    <div style={{ position: 'absolute', left: 160, bottom: 110, display: 'flex', gap: 20 }}>
      {children}
    </div>
  </div>
);

const Point = ({ n, children, delay }: { n: string; children: ReactNode; delay: number }) => (
  <Rise
    delay={delay}
    style={{
      ...glass,
      minHeight: 96,
      borderRadius: 26,
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      padding: '18px 28px',
      boxSizing: 'border-box',
    }}
  >
    <span
      style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, var(--osd-accent), ${deep})`,
        color: '#ffffff',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 26,
        fontWeight: 800,
      }}
    >
      {n}
    </span>
    <span style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.4 }}>{children}</span>
  </Rise>
);

// One tool per page: what it does on the left, the real screenshot on the right.
const Feature = ({
  unit,
  tag,
  title,
  label = '功能',
  highlightTitle = '特教適性亮點',
  highlight,
  img,
  imgAlt,
  imgLabel,
  imgWidth = 940,
  imgHeight = 720,
  children,
}: {
  unit: string;
  tag: string;
  title: ReactNode;
  label?: string;
  highlightTitle?: string;
  highlight: ReactNode;
  img: string;
  imgAlt: string;
  imgLabel: string;
  imgWidth?: number;
  imgHeight?: number;
  children: ReactNode;
}) => (
  <Stage>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 0,
        bottom: 110,
        width: 700,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Rise>
        <div style={eyebrow}>
          {unit} · {tag}
        </div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 20 }}>
        <h2 style={{ ...h2, fontSize: 72 }}>{title}</h2>
      </Rise>
      <Rise delay={160} style={{ marginTop: 40 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: muted }}>{label}</div>
      </Rise>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
        {children}
      </div>
      <Rise
        delay={560}
        style={{
          marginTop: 28,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
          fontSize: 26,
          lineHeight: 1.5,
          color: deep,
          background: 'rgba(56, 163, 165, 0.10)',
          borderRadius: 22,
          padding: '18px 24px',
        }}
      >
        <Icon name="lightbulb" size={32} color={deep} />
        <span>
          <b>{highlightTitle}：</b>
          {highlight}
        </span>
      </Rise>
    </div>
    <Rise
      delay={180}
      kind="materialize"
      style={{
        position: 'absolute',
        left: 860,
        right: 120,
        top: 0,
        bottom: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ShotFrame
        src={img}
        alt={imgAlt}
        label={imgLabel}
        maxWidth={imgWidth}
        maxHeight={imgHeight}
      />
    </Rise>
    <Footer />
  </Stage>
);

/* ─────────────────────────── Opening ─────────────────────────── */

// Cover art: today's tools orbit one AI core. Positions are fixed canvas px;
// the tilt sits on an inner wrapper so it never fights Rise's transform.
const ORBIT_X = 1440;
const ORBIT_Y = 520;

const OrbitRing = ({ r, dashed = false }: { r: number; dashed?: boolean }) => (
  <div
    style={{
      position: 'absolute',
      left: ORBIT_X - r,
      top: ORBIT_Y - r,
      width: r * 2,
      height: r * 2,
      borderRadius: '50%',
      border: dashed
        ? '2px dashed rgba(56, 163, 165, 0.35)'
        : '1.5px solid rgba(56, 163, 165, 0.18)',
      boxSizing: 'border-box',
    }}
  />
);

const OrbitCard = ({
  icon,
  label,
  x,
  y,
  tilt,
  delay,
}: {
  icon: string;
  label: string;
  x: number;
  y: number;
  tilt: number;
  delay: number;
}) => (
  <Rise delay={delay} kind="pop" motion={BOUNCY} style={{ position: 'absolute', left: x, top: y }}>
    <div
      style={{
        ...glass,
        transform: `rotate(${tilt}deg)`,
        borderRadius: 26,
        padding: '16px 26px 16px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        whiteSpace: 'nowrap',
        background: 'rgba(255, 255, 255, 0.9)',
      }}
    >
      <Tile icon={icon} size={56} radius={18} iconSize={32} tone="soft" />
      <span style={{ fontSize: 28, fontWeight: 800 }}>{label}</span>
    </div>
  </Rise>
);

const Cover: Page = () => (
  <Stage dots>
    <OrbitRing r={250} dashed />
    <OrbitRing r={390} />
    <Rise
      delay={200}
      kind="materialize"
      style={{ position: 'absolute', left: ORBIT_X - 120, top: ORBIT_Y - 120 }}
    >
      <Tile icon="auto_stories" size={240} radius={68} iconSize={132} />
    </Rise>
    <OrbitCard icon="menu_book" label="國語文學習單" x={1150} y={150} tilt={-4} delay={420} />
    <OrbitCard icon="calculate" label="數學簡化學習單" x={1500} y={250} tilt={3} delay={500} />
    <OrbitCard icon="reorder" label="句型排列" x={1060} y={560} tilt={-3} delay={580} />
    <OrbitCard icon="stairs" label="互動步驟數學" x={1520} y={700} tilt={4} delay={660} />
    <OrbitCard icon="folder_open" label="國中教材庫" x={1200} y={830} tilt={-2} delay={740} />

    <div
      style={{
        position: 'absolute',
        left: 140,
        top: 0,
        bottom: 0,
        width: 900,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Rise>
        <Chip strong>
          <span
            style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--osd-accent)' }}
          />
          <span>高師大特教社群研習 · 2026.10.28</span>
        </Chip>
      </Rise>
      <Rise delay={100} kind="materialize" style={{ marginTop: 40 }}>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 136,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          用 AI 製作
          <br />
          <span style={gradText}>特教教材</span>
          <br />
          與學習單
        </h1>
      </Rise>
      <Rise delay={240} style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 20 }}>
        <span
          style={{
            width: 64,
            height: 6,
            borderRadius: 999,
            background: `linear-gradient(90deg, var(--osd-accent), ${deep})`,
          }}
        />
        <span style={{ fontSize: 36, color: muted, fontWeight: 500 }}>
          紙本 ‧ 互動網頁 ‧ 電子書 ‧ 教材閉環
        </span>
      </Rise>
      <Rise
        delay={360}
        motion={BOUNCY}
        style={{
          ...glass,
          marginTop: 56,
          alignSelf: 'flex-start',
          borderRadius: 999,
          padding: '12px 36px 12px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <img
          src={imgHeadshot}
          alt="講師照片"
          style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <div style={{ fontSize: 22, color: muted, letterSpacing: '0.12em' }}>主講人</div>
          <div style={{ fontSize: 34, fontWeight: 900 }}>朱旆誼（米克師）</div>
        </div>
      </Rise>
    </div>
  </Stage>
);
Cover.transition = settle;

const BioRow = ({ school, dept, delay }: { school: string; dept: string; delay: number }) => (
  <Rise
    delay={delay}
    style={{
      ...glass,
      height: 128,
      borderRadius: 28,
      padding: '0 36px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div style={{ fontSize: 34, fontWeight: 900 }}>{school}</div>
    <div style={{ fontSize: 26, color: muted, marginTop: 6 }}>{dept}</div>
  </Rise>
);

const BioLabel = ({ icon, children }: { icon: string; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
    <Tile icon={icon} size={56} radius={18} iconSize={32} tone="soft" />
    <span style={{ fontSize: 32, fontWeight: 900 }}>{children}</span>
  </div>
);

const Speaker: Page = () => (
  <Stage>
    <HeaderRow icon="person" title="講師介紹" />
    <Rise
      delay={120}
      kind="materialize"
      style={{
        ...glass,
        position: 'absolute',
        left: 120,
        top: 270,
        width: 440,
        height: 640,
        padding: 40,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src={imgHeadshot}
        alt="講師照片"
        style={{ width: 360, height: 336, objectFit: 'cover', borderRadius: 28 }}
      />
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 900,
          marginTop: 36,
        }}
      >
        朱旆誼
      </div>
      <span style={{ ...softPill, alignSelf: 'center', marginTop: 16 }}>米克師 · @spedmix2025</span>
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 620,
        top: 270,
        width: 1180,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Rise delay={160}>
          <BioLabel icon="school">學歷</BioLabel>
        </Rise>
        <BioRow school="國立彰化師範大學" dept="特殊教育學系（資訊工程輔系）" delay={220} />
        <BioRow school="國立東華大學" dept="資訊管理所" delay={280} />
        <BioRow school="國立台灣師範大學" dept="資訊教育學系博士班（就讀中）" delay={340} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Rise delay={200}>
          <BioLabel icon="work">經歷</BioLabel>
        </Rise>
        <BioRow school="花蓮縣平和國中" dept="資源班教師（兼巡迴支援）" delay={260} />
        <BioRow school="宜蘭縣凱旋國中" dept="資源班教師" delay={320} />
      </div>
    </div>
    <Footer />
  </Stage>
);

const SplitLabel = ({ title, desc, light }: { title: string; desc: string; light: boolean }) => (
  <div style={{ padding: '0 44px' }}>
    <div style={{ fontSize: 44, fontWeight: 900, color: light ? '#ffffff' : deep }}>{title}</div>
    <div
      style={{
        fontSize: 28,
        marginTop: 10,
        color: light ? 'rgba(255, 255, 255, 0.85)' : muted,
        whiteSpace: 'nowrap',
      }}
    >
      {desc}
    </div>
  </div>
);

const Stance: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 140 }}>
      <Rise>
        <div style={eyebrow}>開始之前，先說我的立場</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 28 }}>
        <h2 style={{ ...h2, fontSize: 96, lineHeight: 1.2 }}>
          AI 對我來說，只能完成 <span style={gradText}>70 分</span>。
        </h2>
      </Rise>
      <Rise delay={200} style={{ marginTop: 20 }}>
        <p style={{ fontSize: 40, color: muted, margin: 0 }}>剩下的 30 分，要靠我自己判斷結果。</p>
      </Rise>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 600,
        width: 1680,
        height: 220,
        display: 'flex',
        gap: 16,
      }}
    >
      <Rise
        delay={360}
        kind="grow"
        style={{
          ...brandFill,
          width: 1160,
          borderRadius: 36,
          display: 'flex',
          alignItems: 'center',
          transformOrigin: 'left center',
        }}
      >
        <SplitLabel title="70 分：AI 給速度" desc="產出內容、生成初稿、套用版型" light />
      </Rise>
      <Rise
        delay={760}
        kind="pop"
        motion={BOUNCY}
        style={{
          ...glass,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          border: `3px dashed ${deep}`,
        }}
      >
        <SplitLabel title="30 分：老師判斷" desc="學生起點、難度、用字、版面" light={false} />
      </Rise>
    </div>
    <Footer />
  </Stage>
);

const RouteCard = ({
  n,
  icon,
  title,
  solve,
  delay,
}: {
  n: string;
  icon: string;
  title: string;
  solve: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    motion={BOUNCY}
    style={{
      ...glass,
      width: 396,
      height: 480,
      padding: 44,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Tile icon={icon} size={88} radius={26} iconSize={48} />
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 800,
          ...gradText,
        }}
      >
        {n}
      </span>
    </div>
    <div style={{ fontSize: 44, fontWeight: 900, marginTop: 40 }}>{title}</div>
    <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--osd-accent)', marginTop: 'auto' }}>
      要解決的問題
    </div>
    <div style={{ fontSize: 28, lineHeight: 1.5, color: muted, marginTop: 8 }}>{solve}</div>
  </Rise>
);

const Route: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 130 }}>
      <Rise>
        <div style={eyebrow}>今天的路線</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 24 }}>
        <h2 style={h2}>從紙本到教材閉環</h2>
      </Rise>
    </div>
    <div style={{ position: 'absolute', left: 120, top: 380, display: 'flex', gap: 32 }}>
      <RouteCard
        n="01"
        icon="description"
        title="紙本教材"
        solve="AI 產得快，但排版與複製貼上仍靠手工"
        delay={150}
      />
      <RouteCard
        n="02"
        icon="touch_app"
        title="互動網頁"
        solve="現成工具精采，卻不是為特教生設計"
        delay={230}
      />
      <RouteCard
        n="03"
        icon="auto_stories"
        title="電子書模式"
        solve="同一份內容，學習單和簡報要做兩次"
        delay={310}
      />
      <RouteCard
        n="04"
        icon="sync"
        title="教材閉環"
        solve="每一份教材都要從頭交代學生程度"
        delay={390}
      />
    </div>
    <Footer />
  </Stage>
);

/* ─────────────────────────── Part 1 · 紙本 ─────────────────────────── */

const Part1: Page = () => (
  <PartDivider
    part="PART 01"
    num="01"
    time="14:38 – 14:55"
    icon="description"
    line1="紙本教材"
    line2="省掉排版"
    sub="AI 加速產出，工具接手最後一哩"
    detail="國語文學習單 ‧ 數學簡化學習單"
  >
    <PartTool icon="menu_book" label="國語文學習單" delay={760} />
    <PartTool icon="calculate" label="數學簡化學習單" delay={840} />
  </PartDivider>
);
Part1.transition = partReveal;

const ContrastRow = ({
  icon,
  tone,
  text,
}: {
  icon: string;
  tone: 'pain' | 'fix';
  text: string;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      height: 84,
      padding: '0 26px',
      borderRadius: 22,
      background: tone === 'pain' ? 'rgba(240, 244, 248, 0.9)' : 'rgba(255, 255, 255, 0.16)',
    }}
  >
    <Icon name={icon} size={36} color={tone === 'pain' ? '#94a3b8' : '#ffffff'} />
    <span style={{ fontSize: 30, fontWeight: 700 }}>{text}</span>
  </div>
);

const contrastCard: CSSProperties = {
  ...glass,
  width: 816,
  padding: '40px 44px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};

const PaperWhy: Page = () => (
  <Stage>
    <HeaderRow icon="description" title="AI 加速了產出，卻沒解決排版" />
    <div style={{ position: 'absolute', left: 120, top: 270, display: 'flex', gap: 48 }}>
      <Rise delay={200} style={contrastCard}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <span style={softPill}>過去</span>
          <span style={{ fontSize: 34, fontWeight: 900 }}>用 AI 聊天備課</span>
        </div>
        <ContrastRow icon="bolt" tone="pain" text="內容幾秒就產出" />
        <ContrastRow icon="close" tone="pain" text="複製、貼上到 Word" />
        <ContrastRow icon="close" tone="pain" text="重新排版、調字級、對齊表格" />
        <ContrastRow icon="close" tone="pain" text="每一課、每個版本都重來一次" />
      </Rise>
      <Rise delay={340} kind="materialize" style={{ ...contrastCard, ...brandFill }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <span style={{ ...softPill, color: '#ffffff', background: 'rgba(255, 255, 255, 0.18)' }}>
            自製工具
          </span>
          <span style={{ fontSize: 34, fontWeight: 900 }}>讓工具接手最後一哩</span>
        </div>
        <ContrastRow icon="check_circle" tone="fix" text="輸入課文或教學概念" />
        <ContrastRow icon="check_circle" tone="fix" text="直接產出排好版的學習單" />
        <ContrastRow icon="check_circle" tone="fix" text="一鍵列印乾淨 A4" />
        <ContrastRow icon="check_circle" tone="fix" text="版型固定，下一課直接套用" />
      </Rise>
    </div>
    <Rise delay={500} style={{ position: 'absolute', left: 120, right: 120, top: 860 }}>
      <p style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', margin: 0 }}>
        真正花時間的不是想內容，而是<span style={gradText}>排版與複製貼上</span>
      </p>
    </Rise>
    <Footer />
  </Stage>
);

const ChineseTool: Page = () => (
  <Feature
    unit="紙本教材"
    tag="工具 1"
    title="國語文學習單"
    highlight="依學生閱讀能力，原文與易讀版本並排對照"
    img={imgChineseReading}
    imgAlt="國語文學習單：課文雙軌對照"
    imgLabel="國語文學習單 · 雙軌閱讀"
  >
    <Point n="01" delay={240}>
      原文與易讀雙軌對照，搭配情境插圖
    </Point>
    <Point n="02" delay={320}>
      注音田字格生字練寫、段落摘要
    </Point>
    <Point n="03" delay={400}>
      每段兩題即時檢核，範圍縮小
    </Point>
    <Point n="04" delay={480}>
      課文脈絡表格、詞語連連看評量
    </Point>
  </Feature>
);

const MathTool: Page = () => (
  <Feature
    unit="紙本教材"
    tag="工具 2"
    title="數學簡化學習單"
    highlight="先懂再練、微步驟引導，降低學生面對題目的焦慮"
    img={imgMathConcept}
    imgAlt="數學簡化學習單：概念說明"
    imgLabel="數學簡化學習單 · 概念說明"
  >
    <Point n="01" delay={240}>
      只要輸入題型，或貼上課本截圖
    </Point>
    <Point n="02" delay={320}>
      概念說明 → 例題拆解 → 分步練習
    </Point>
    <Point n="03" delay={400}>
      一次只練一種概念，結構清楚
    </Point>
    <Point n="04" delay={480}>
      一鍵列印乾淨 A4，免二次排版
    </Point>
  </Feature>
);

const EditRow = ({ aspect, before, after }: { aspect: string; before: string; after: string }) => (
  <StepIn
    style={{
      display: 'flex',
      alignItems: 'stretch',
      gap: 24,
      height: 170,
    }}
  >
    <div
      style={{
        width: 200,
        flexShrink: 0,
        borderRadius: 28,
        ...brandFill,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 34,
        fontWeight: 900,
      }}
    >
      {aspect}
    </div>
    <div
      style={{
        width: 640,
        borderRadius: 28,
        background: 'rgba(226, 232, 240, 0.7)',
        padding: '0 36px',
        display: 'flex',
        alignItems: 'center',
        fontSize: 28,
        lineHeight: 1.55,
        color: muted,
      }}
    >
      {before}
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Icon name="arrow_forward" size={48} color="var(--osd-accent)" />
    </div>
    <div
      style={{
        ...glass,
        flex: 1,
        borderRadius: 28,
        border: '3px solid var(--osd-accent)',
        padding: '0 36px',
        display: 'flex',
        alignItems: 'center',
        fontSize: 30,
        lineHeight: 1.55,
        fontWeight: 700,
      }}
    >
      {after}
    </div>
  </StepIn>
);

const TeacherThirty: Page = () => (
  <Stage>
    <HeaderRow icon="psychology" title="老師補上的 30 分" />
    <SubLine>示意例子：七年級國文學習單，給閱讀理解較弱的學生</SubLine>
    <Rise
      delay={160}
      style={{ position: 'absolute', left: 344, top: 296, display: 'flex', gap: 0, ...eyebrow }}
    >
      <span style={{ width: 760, color: muted }}>AI 初稿</span>
      <span>我的調整</span>
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 350,
        width: 1680,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <Steps>
        <Step duration={1}>
          <EditRow
            aspect="難度"
            before="說明作者在第二段如何運用譬喻，表達對母親的思念。"
            after="作者把母親的笑容比喻成什麼？（三選一）"
          />
        </Step>
        <Step duration={1}>
          <EditRow
            aspect="用字"
            before="一次出現「依稀、惦念、潸然、躊躇」四個新詞"
            after="只留兩個詞，加上注音與生活例句"
          />
        </Step>
        <Step duration={1}>
          <EditRow
            aspect="版面"
            before="一頁 8 題、12 級字，作答區擠在一起"
            after="一頁 4 題、字級放大，作答區加框"
          />
        </Step>
      </Steps>
    </div>
    <Footer />
  </Stage>
);

/* ─────────────────────────── Part 2 · 互動 ─────────────────────────── */

const Part2: Page = () => (
  <PartDivider
    part="PART 02"
    num="02"
    time="14:55 – 15:20"
    icon="touch_app"
    line1="互動網頁"
    line2="為特教而設計"
    sub="現成工具很精采，但不是為特教生設計的"
    detail="選擇與檢核分開 ‧ 語音報讀 ‧ 視覺亮點"
  >
    <PartTool icon="reorder" label="句型排列" delay={760} />
    <PartTool icon="stairs" label="互動步驟數學" delay={840} />
  </PartDivider>
);
Part2.transition = partReveal;

const LimitCard = ({
  icon,
  title,
  desc,
  delay,
}: {
  icon: string;
  title: string;
  desc: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    motion={BOUNCY}
    style={{
      ...glass,
      height: 250,
      padding: '36px 44px',
      boxSizing: 'border-box',
      display: 'flex',
      gap: 28,
    }}
  >
    <Tile icon={icon} size={80} radius={24} iconSize={44} tone="warn" />
    <div>
      <div style={{ fontSize: 38, fontWeight: 900 }}>{title}</div>
      <div style={{ fontSize: 28, lineHeight: 1.55, color: muted, marginTop: 12 }}>{desc}</div>
    </div>
  </Rise>
);

const InteractiveWhy: Page = () => (
  <Stage>
    <HeaderRow icon="sports_esports" title="現成互動工具很精采，但……" />
    <Rise
      delay={100}
      style={{
        position: 'absolute',
        left: 256,
        top: 214,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <Chip>Kahoot!</Chip>
      <Chip>Wayground</Chip>
      <Chip>Wordwall</Chip>
      <span style={{ fontSize: 28, color: muted, marginLeft: 12 }}>題型多、上手快、學生也喜歡</span>
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 360,
        width: 1680,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
      }}
    >
      <LimitCard
        icon="sports_esports"
        title="遊戲化元素多"
        desc="排行榜、倒數計時、音效，注意力容易跑到輸贏上。"
        delay={200}
      />
      <LimitCard
        icon="ads_click"
        title="選擇＝檢核"
        desc="按下選項就判對錯，回饋很快，但常常缺乏思考。"
        delay={280}
      />
      <LimitCard
        icon="bolt"
        title="ADHD 學生衝動誤按"
        desc="一碰就送出，沒有停下來、修改答案的機會。"
        delay={360}
      />
      <LimitCard
        icon="volume_up"
        title="語音報讀相對有限"
        desc="不是每個題目、選項都能唸，閱讀困難的學生容易卡住。"
        delay={440}
      />
    </div>
    <Footer />
  </Stage>
);

type OptionState = 'idle' | 'wrong' | 'selected';

const Option = ({ label, state }: { label: string; state: OptionState }) => (
  <div
    style={{
      width: 220,
      height: 96,
      borderRadius: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 34,
      fontWeight: 800,
      fontFamily: 'var(--osd-font-display)',
      boxSizing: 'border-box',
      ...(state === 'wrong'
        ? { background: bad, color: '#ffffff' }
        : state === 'selected'
          ? {
              background: 'rgba(56, 163, 165, 0.14)',
              border: '4px solid var(--osd-accent)',
              color: deep,
            }
          : { background: '#ffffff', border: '2px solid rgba(100, 116, 139, 0.25)' }),
    }}
  >
    {label}
  </div>
);

const MockPanel = ({
  tag,
  options,
  result,
  caption,
  delay,
  good = false,
}: {
  tag: string;
  options: [string, OptionState][];
  result: ReactNode;
  caption: string;
  delay: number;
  good?: boolean;
}) => (
  <Rise
    delay={delay}
    kind="materialize"
    style={{
      ...glass,
      width: 816,
      height: 600,
      padding: 44,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      ...(good ? { border: '3px solid var(--osd-accent)' } : {}),
    }}
  >
    <span
      style={{
        ...softPill,
        ...(good ? {} : { color: muted, background: 'rgba(100, 116, 139, 0.12)' }),
      }}
    >
      {tag}
    </span>
    <div style={{ fontSize: 34, fontWeight: 800, marginTop: 28 }}>下列哪一個是複數名詞？</div>
    <div style={{ display: 'flex', gap: 24, marginTop: 36 }}>
      {options.map(([label, state]) => (
        <Option key={label} label={label} state={state} />
      ))}
    </div>
    <div style={{ height: 96, marginTop: 40 }}>{result}</div>
    <div
      style={{
        fontSize: 30,
        fontWeight: 700,
        marginTop: 'auto',
        color: good ? deep : muted,
      }}
    >
      {caption}
    </div>
  </Rise>
);

const Principle: Page = () => (
  <Stage>
    <HeaderRow icon="ads_click" title="設計原則：選擇與檢核分開" />
    <div style={{ position: 'absolute', left: 120, top: 270, display: 'flex', gap: 48 }}>
      <MockPanel
        tag="現成工具常見：點了就判"
        options={[
          ['book', 'wrong'],
          ['pencils', 'idle'],
          ['desk', 'idle'],
        ]}
        result={
          <div
            style={{
              height: 96,
              borderRadius: 24,
              background: 'rgba(220, 38, 38, 0.10)',
              color: bad,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '0 32px',
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            <Icon name="close" size={44} />
            答錯了！自動跳下一題
          </div>
        }
        caption="回饋很快，但學生容易用猜的；手一滑就送出"
        delay={150}
      />
      <MockPanel
        good
        tag="自製：先選擇，再檢核"
        options={[
          ['book', 'idle'],
          ['pencils', 'selected'],
          ['desk', 'idle'],
        ]}
        result={
          <div
            style={{
              height: 96,
              borderRadius: 24,
              background: `linear-gradient(135deg, var(--osd-accent), ${deep})`,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            <Icon name="check_circle" size={44} />
            檢查答案
          </div>
        }
        caption="多一個停頓：想清楚再按，選錯也能先改"
        delay={300}
      />
    </div>
    <Footer />
  </Stage>
);

const SentenceTool: Page = () => (
  <Feature
    unit="互動網頁"
    tag="工具 3"
    title="句型排列"
    label="設計重點"
    highlight="選擇與檢核分開，衝動的學生也有修正的機會"
    img={imgSentence}
    imgAlt="句型排列：點選詞語卡片排成句子"
    imgLabel="句型排列 · 〈一顆珍珠〉"
  >
    <Point n="01" delay={240}>
      點選詞語卡片，排成通順句子
    </Point>
    <Point n="02" delay={320}>
      「檢查答案」獨立一顆，排好才確認
    </Point>
    <Point n="03" delay={400}>
      「聽解答」語音報讀，靠聽把句子組起來
    </Point>
    <Point n="04" delay={480}>
      隨時重置，沒有倒數與排行榜
    </Point>
  </Feature>
);

const StepMathTool: Page = () => (
  <Feature
    unit="互動網頁"
    tag="工具 4"
    title="互動步驟數學"
    label="設計重點"
    highlight="一次只處理一個步驟，降低認知負荷"
    img={imgInteractiveStepMath}
    imgAlt="互動步驟數學：步驟拆解與檢核"
    imgLabel="互動步驟數學 · 步驟鷹架"
  >
    <Point n="01" delay={240}>
      把解題流程拆成一小步一小步
    </Point>
    <Point n="02" delay={320}>
      每一步輸入或點選，各自檢核
    </Point>
    <Point n="03" delay={400}>
      錯在哪一步，就停在哪一步修正
    </Point>
  </Feature>
);

const QuestionRow = ({
  n,
  text,
  state,
}: {
  n: string;
  text: ReactNode;
  state: 'done' | 'active' | 'next';
}) => (
  <div
    style={{
      position: 'relative',
      height: 150,
      borderRadius: 28,
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '0 36px',
      background: '#ffffff',
      opacity: state === 'active' ? 1 : state === 'done' ? 0.45 : 0.35,
      ...(state === 'active'
        ? {
            border: '5px solid var(--osd-accent)',
            boxShadow:
              '0 0 0 12px rgba(56, 163, 165, 0.16), 0 24px 48px -20px rgba(34, 87, 122, 0.5)',
          }
        : { border: '2px solid rgba(100, 116, 139, 0.2)' }),
    }}
  >
    <span
      style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 30,
        fontWeight: 800,
        ...(state === 'active'
          ? { background: `linear-gradient(135deg, var(--osd-accent), ${deep})`, color: '#fff' }
          : { background: 'rgba(100, 116, 139, 0.14)', color: muted }),
      }}
    >
      {state === 'done' ? <Icon name="check_circle" size={36} /> : n}
    </span>
    <span style={{ fontSize: 34, fontWeight: 700, fontFamily: 'var(--osd-font-display)' }}>
      {text}
    </span>
    {state === 'active' && (
      <span
        style={{
          position: 'absolute',
          top: -26,
          right: 36,
          background: warn,
          color: '#ffffff',
          fontSize: 24,
          fontWeight: 900,
          borderRadius: 999,
          padding: '6px 22px',
        }}
      >
        現在作答
      </span>
    )}
  </div>
);

const Blank = () => (
  <span
    style={{
      display: 'inline-block',
      width: 140,
      borderBottom: '4px solid var(--osd-accent)',
      margin: '0 10px',
    }}
  />
);

const VisualDesign: Page = () => (
  <Stage>
    <HeaderRow icon="center_focus_strong" title="視覺設計：讓學生知道現在在哪" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 290,
        width: 760,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <Point n="01" delay={200}>
        一次只亮一題，其他題目淡化
      </Point>
      <Point n="02" delay={280}>
        亮點框提示「現在要在哪裡作答」
      </Point>
      <Point n="03" delay={360}>
        大字、留白、少裝飾，控制認知負荷
      </Point>
      <Rise
        delay={480}
        style={{
          ...brandFill,
          marginTop: 24,
          borderRadius: 28,
          padding: '28px 36px',
          fontSize: 30,
          lineHeight: 1.55,
          fontWeight: 700,
        }}
      >
        這些設計沒有標準答案，
        <br />
        取決於老師多了解眼前的學生。
      </Rise>
    </div>
    <Rise
      delay={240}
      kind="materialize"
      style={{
        ...glass,
        position: 'absolute',
        left: 960,
        top: 290,
        width: 840,
        padding: '48px 40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 36,
      }}
    >
      <QuestionRow n="1" state="done" text="What is this? It is a pencil." />
      <QuestionRow
        n="2"
        state="active"
        text={
          <>
            What are these? They
            <Blank />
            pencils.
          </>
        }
      />
      <QuestionRow
        n="3"
        state="next"
        text={
          <>
            Where is my book? It is
            <Blank />
            the desk.
          </>
        }
      />
    </Rise>
    <Footer />
  </Stage>
);

const CompareCell = ({
  children,
  head = false,
  strong = false,
}: {
  children: ReactNode;
  head?: boolean;
  strong?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0 36px',
      fontSize: head ? 26 : 30,
      fontWeight: head || strong ? 800 : 500,
      color: head ? muted : strong ? deep : 'var(--osd-text)',
      letterSpacing: head ? '0.1em' : undefined,
    }}
  >
    {children}
  </div>
);

const CompareRow = ({ item, them, us }: { item: string; them: string; us: string }) => (
  <StepIn
    style={{
      ...glass,
      height: 104,
      borderRadius: 26,
      display: 'grid',
      gridTemplateColumns: '300px 650px 1fr',
    }}
  >
    <CompareCell strong>{item}</CompareCell>
    <CompareCell>{them}</CompareCell>
    <CompareCell strong>
      <Icon name="check_circle" size={36} color="var(--osd-accent)" />
      <span style={{ marginLeft: 14 }}>{us}</span>
    </CompareCell>
  </StepIn>
);

const WhySelfMade: Page = () => (
  <Stage>
    <HeaderRow icon="handyman" title="自己做，就沒有這些限制" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 270,
        width: 1680,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <Rise
        delay={100}
        style={{ height: 56, display: 'grid', gridTemplateColumns: '300px 650px 1fr' }}
      >
        <CompareCell head>項目</CompareCell>
        <CompareCell head>現成工具</CompareCell>
        <CompareCell head>自製網頁</CompareCell>
      </Rise>
      <Steps>
        <Step duration={1}>
          <CompareRow item="檢核方式" them="點選即判對錯" us="選擇與檢核分開" />
        </Step>
        <Step duration={1}>
          <CompareRow item="語音報讀" them="部分題型支援" us="題目、詞卡、解答都能唸" />
        </Step>
        <Step duration={1}>
          <CompareRow item="遊戲元素" them="排行榜、倒數、音效" us="需要才加，也可以全拿掉" />
        </Step>
        <Step duration={1}>
          <CompareRow item="版面設計" them="套用固定版型" us="依學生調整字級、亮點、題量" />
        </Step>
      </Steps>
    </div>
    <Rise delay={300} style={{ position: 'absolute', left: 120, right: 120, top: 880 }}>
      <p style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', margin: 0 }}>
        自製的前提是老師夠了解學生，這正是 AI 給不了的<span style={gradText}> 30 分</span>
      </p>
    </Rise>
    <Footer />
  </Stage>
);

/* ─────────────────────────── Part 3 · 電子書 ─────────────────────────── */

const Part3: Page = () => (
  <PartDivider
    part="PART 03"
    num="03"
    time="15:20 – 15:40"
    icon="auto_stories"
    line1="電子書模式"
    line2="做一次就夠"
    sub="一份檔案，同時是紙本，也是投影"
    detail="跳脫「加速做學習單、加速做簡報」的備課模式"
  >
    <PartTool icon="folder_open" label="國中教材庫" delay={760} />
  </PartDivider>
);
Part3.transition = partReveal;

const FlowBox = ({ children, strong = false }: { children: ReactNode; strong?: boolean }) => (
  <div
    style={{
      height: 100,
      borderRadius: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      fontSize: 30,
      fontWeight: 800,
      ...(strong
        ? { ...brandFill }
        : { background: '#ffffff', border: '2px solid rgba(100, 116, 139, 0.2)' }),
    }}
  >
    {children}
  </div>
);

const FlowPanel = ({
  tag,
  source,
  outputs,
  verdict,
  good,
  delay,
}: {
  tag: string;
  source: ReactNode;
  outputs: [string, string][];
  verdict: string;
  good: boolean;
  delay: number;
}) => (
  <Rise
    delay={delay}
    kind="materialize"
    style={{
      ...glass,
      width: 816,
      height: 520,
      padding: '40px 56px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      ...(good ? { border: '3px solid var(--osd-accent)' } : {}),
    }}
  >
    <span
      style={{
        ...softPill,
        ...(good ? {} : { color: muted, background: 'rgba(100, 116, 139, 0.12)' }),
      }}
    >
      {tag}
    </span>
    <div style={{ marginTop: 28 }}>{source}</div>
    <div style={{ display: 'flex', justifyContent: 'space-around', height: 64 }}>
      <Icon name="arrow_downward" size={52} color={good ? 'var(--osd-accent)' : '#94a3b8'} />
      <Icon name="arrow_downward" size={52} color={good ? 'var(--osd-accent)' : '#94a3b8'} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      {outputs.map(([icon, label]) => (
        <FlowBox key={label}>
          <Icon name={icon} size={36} color={good ? 'var(--osd-accent)' : muted} />
          {label}
        </FlowBox>
      ))}
    </div>
    <div
      style={{
        marginTop: 'auto',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 900,
        color: good ? deep : warn,
      }}
    >
      {verdict}
    </div>
  </Rise>
);

const EbookWhy: Page = () => (
  <Stage>
    <HeaderRow icon="auto_stories" title="我們一直在加速做學習單、做簡報" />
    <div style={{ position: 'absolute', left: 120, top: 270, display: 'flex', gap: 48 }}>
      <FlowPanel
        tag="以前的備課"
        source={<FlowBox>同一份教學內容</FlowBox>}
        outputs={[
          ['description', '學習單 Word'],
          ['co_present', '簡報 PPT'],
        ]}
        verdict="做兩次、改兩次"
        good={false}
        delay={150}
      />
      <FlowPanel
        tag="電子書模式"
        source={
          <FlowBox strong>
            <Icon name="auto_stories" size={40} />
            一份電子書
          </FlowBox>
        }
        outputs={[
          ['description', '列印：A4 紙本'],
          ['co_present', '投影：上課呈現'],
        ]}
        verdict="做一次，兩種用法"
        good
        delay={300}
      />
    </div>
    <Rise delay={480} style={{ position: 'absolute', left: 120, right: 120, top: 850 }}>
      <p style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', margin: 0 }}>
        簡報的本質，只是<span style={gradText}>上課時方便呈現給學生看</span>
      </p>
    </Rise>
    <Footer />
  </Stage>
);

const LibraryTool: Page = () => (
  <Feature
    unit="電子書模式"
    tag="實例"
    title="國中教材庫"
    label="怎麼整理"
    highlightTitle="延伸"
    highlight="所有教材集中在同一個資料夾，之後 agent 也讀得到"
    img={imgLibraryHome}
    imgAlt="國中教材庫首頁"
    imgLabel="國中教材庫 · 依年級與科目分類"
  >
    <Point n="01" delay={240}>
      依年級、科目分類，一課一張卡片
    </Point>
    <Point n="02" delay={320}>
      每一份都是獨立的電子書
    </Point>
    <Point n="03" delay={400}>
      學生練習、老師投影，開的是同一份
    </Point>
  </Feature>
);

const ToolbarTool: Page = () => (
  <Feature
    unit="電子書模式"
    tag="教師端"
    title="投影上課的工具列"
    label="右上角膠囊工具列"
    highlight="不需要觸控大螢幕，一般投影就能用"
    img={imgEbookToolbar}
    imgAlt="電子書投影模式與工具列"
    imgLabel="七上英語 Unit 2 · 文法篇"
  >
    <Point n="01" delay={240}>
      逐題顯示答案，或一鍵全部揭曉
    </Point>
    <Point n="02" delay={320}>
      螢光筆、板書筆直接圈畫
    </Point>
    <Point n="03" delay={400}>
      放大縮小、全螢幕
    </Point>
    <Point n="04" delay={480}>
      一鍵列印，自動拿掉答案與按鈕
    </Point>
  </Feature>
);

const ModeColumn = ({
  src,
  alt,
  label,
  icon,
  title,
  desc,
  delay,
}: {
  src: string;
  alt: string;
  label: string;
  icon: string;
  title: string;
  desc: string;
  delay: number;
}) => (
  <Rise delay={delay} kind="materialize" style={{ width: 816 }}>
    <div
      style={{
        ...glass,
        width: 816,
        height: 520,
        borderRadius: 28,
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FrameBar label={label} />
      <img
        src={src}
        alt={alt}
        style={{ display: 'block', width: 816, flex: 1, minHeight: 0, objectFit: 'contain' }}
      />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 28 }}>
      <Tile icon={icon} size={72} radius={22} iconSize={40} tone="soft" />
      <div>
        <div style={{ fontSize: 36, fontWeight: 900 }}>{title}</div>
        <div style={{ fontSize: 26, color: muted, marginTop: 4 }}>{desc}</div>
      </div>
    </div>
  </Rise>
);

const DualMode: Page = () => (
  <Stage>
    <HeaderRow icon="call_split" title="同一份檔案：投影 vs 列印" />
    <div style={{ position: 'absolute', left: 120, top: 260, display: 'flex', gap: 48 }}>
      <ModeColumn
        src={imgMathConcept}
        alt="數學電子書投影模式"
        label="投影模式"
        icon="co_present"
        title="上課：投影講解"
        desc="逐題顯答、畫筆圈記，帶著全班一起看"
        delay={150}
      />
      <ModeColumn
        src={imgMathPrint}
        alt="數學電子書列印預覽"
        label="列印模式"
        icon="description"
        title="練習：A4 白卷"
        desc="答案與按鈕自動拿掉，直接發給學生寫"
        delay={280}
      />
    </div>
    <Footer />
  </Stage>
);

/* ─────────────────────────── Part 4 · 閉環 ─────────────────────────── */

const Part4: Page = () => (
  <PartDivider
    part="PART 04"
    num="04"
    time="15:40 – 15:55"
    icon="sync"
    line1="教材閉環"
    line2="接著做下一份"
    sub="讓 agent 讀得到你的電子書庫"
    detail="上一份的回饋，變成下一份的起點"
  >
    <PartTool icon="terminal" label="Codex" delay={760} />
    <PartTool icon="smart_toy" label="Antigravity" delay={840} />
    <PartTool icon="terminal" label="Claude Code" delay={920} />
  </PartDivider>
);
Part4.transition = partReveal;

const LOOP_W = 360;
const LOOP_GAP = 80;
const loopX = (i: number) => 120 + i * (LOOP_W + LOOP_GAP);

const LoopCard = ({
  i,
  icon,
  title,
  children,
  strong = false,
}: {
  i: number;
  icon: string;
  title: string;
  children: ReactNode;
  strong?: boolean;
}) => (
  <Rise
    delay={150 + i * 120}
    motion={BOUNCY}
    style={{
      ...glass,
      ...(strong ? brandFill : {}),
      position: 'absolute',
      left: loopX(i),
      top: 290,
      width: LOOP_W,
      height: 400,
      padding: 36,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {strong ? (
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 22,
          background: 'rgba(255, 255, 255, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={40} color="#ffffff" />
      </div>
    ) : (
      <Tile icon={icon} size={72} radius={22} iconSize={40} tone="soft" />
    )}
    <div style={{ fontSize: 36, fontWeight: 900, marginTop: 24 }}>{title}</div>
    <div style={{ fontSize: 26, lineHeight: 1.55, marginTop: 12, opacity: strong ? 0.95 : 1 }}>
      {children}
    </div>
  </Rise>
);

const Loop: Page = () => (
  <Stage>
    <HeaderRow icon="sync" title="教材閉環：接著做，不重來" />
    <LoopCard i={0} icon="co_present" title="上課使用">
      <span style={{ color: muted }}>投影講解，加上紙本練習</span>
    </LoopCard>
    <LoopCard i={1} icon="visibility" title="觀察學生">
      <span style={{ color: muted }}>哪裡卡住？完成度多少？</span>
    </LoopCard>
    <LoopCard i={2} icon="chat" title="跟 agent 說" strong>
      「上次這份內容有些難，學生完成度低，下一份簡化一點。」
    </LoopCard>
    <LoopCard i={3} icon="description" title="產出下一份">
      <span style={{ color: muted }}>agent 讀過上一份，直接調整難度與題量</span>
    </LoopCard>
    {[0, 1, 2].map((i) => (
      <Rise
        key={i}
        delay={240 + i * 120}
        kind="fade"
        style={{
          position: 'absolute',
          left: loopX(i) + LOOP_W + (LOOP_GAP - 48) / 2,
          top: 466,
        }}
      >
        <Icon name="arrow_forward" size={48} color="var(--osd-accent)" />
      </Rise>
    ))}
    <Rise delay={760} kind="fade" style={{ position: 'absolute', left: 0, top: 0 }}>
      <svg
        width={1920}
        height={1080}
        style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}
        aria-hidden="true"
      >
        <path
          d={`M ${loopX(3) + LOOP_W / 2} 700 V 790 H ${loopX(0) + LOOP_W / 2} V 712`}
          fill="none"
          stroke="#38A3A5"
          strokeWidth={4}
          strokeDasharray="12 10"
        />
        <path
          d={`M ${loopX(0) + LOOP_W / 2 - 16} 724 L ${loopX(0) + LOOP_W / 2} 702 L ${loopX(0) + LOOP_W / 2 + 16} 724`}
          fill="none"
          stroke="#38A3A5"
          strokeWidth={4}
          strokeLinejoin="round"
        />
      </svg>
    </Rise>
    <Rise delay={820} style={{ position: 'absolute', left: 0, right: 0, top: 766 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span style={{ ...softPill, background: '#e6f4f4', fontSize: 26 }}>下一輪</span>
      </div>
    </Rise>
    <Rise delay={900} style={{ position: 'absolute', left: 120, right: 120, top: 870 }}>
      <p style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', margin: 0 }}>
        關鍵只有一個：<span style={gradText}>agent 讀得到上一份教材</span>
      </p>
    </Rise>
    <Footer />
  </Stage>
);

const TreeLine = ({
  depth,
  name,
  folder = false,
  mark,
}: {
  depth: number;
  name: string;
  folder?: boolean;
  mark?: string;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      height: 50,
      paddingLeft: depth * 40,
      fontSize: 27,
      fontWeight: folder ? 800 : 500,
      fontFamily: 'var(--osd-font-display)',
      whiteSpace: 'nowrap',
    }}
  >
    <Icon
      name={folder ? 'folder' : 'description'}
      size={30}
      color={folder ? '#e0a526' : mark ? 'var(--osd-accent)' : '#94a3b8'}
    />
    <span style={mark ? { color: deep, fontWeight: 800 } : undefined}>{name}</span>
    {mark && (
      <span
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: warn,
          background: 'rgba(234, 88, 12, 0.10)',
          borderRadius: 999,
          padding: '4px 16px',
        }}
      >
        {mark}
      </span>
    )}
  </div>
);

const AgentFolder: Page = () => (
  <Stage>
    <HeaderRow icon="folder_open" title="讓 agent 讀得到你的教材庫" />
    <Rise
      delay={150}
      kind="materialize"
      style={{
        ...glass,
        position: 'absolute',
        left: 120,
        top: 270,
        width: 720,
        borderRadius: 28,
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.9)',
      }}
    >
      <FrameBar label="國中教材庫（示意）" />
      <div style={{ padding: '24px 36px 32px' }}>
        <TreeLine depth={0} name="國中教材庫" folder />
        <TreeLine depth={1} name="七年級" folder />
        <TreeLine depth={2} name="英語" folder />
        <TreeLine depth={3} name="unit1-文法.html" />
        <TreeLine depth={3} name="unit1-單字.html" />
        <TreeLine depth={3} name="unit2-文法.html" mark="上次：完成度低" />
        <TreeLine depth={3} name="unit2-單字.html" />
        <TreeLine depth={3} name="段考複習-U1-U2.html" />
        <TreeLine depth={2} name="國文" folder />
        <TreeLine depth={1} name="八年級" folder />
      </div>
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 920,
        top: 270,
        width: 880,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Rise delay={200}>
        <div style={eyebrow}>用哪一個 agent 都可以</div>
      </Rise>
      <Rise delay={260} style={{ display: 'flex', gap: 16, marginTop: 18 }}>
        <Chip>Codex</Chip>
        <Chip>Antigravity</Chip>
        <Chip>Claude Code</Chip>
      </Rise>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 40 }}>
        <Point n="01" delay={340}>
          教材都放在同一個資料夾
        </Point>
        <Point n="02" delay={420}>
          agent 看得到每一份的難度與版型
        </Point>
        <Point n="03" delay={500}>
          一句話調整，不用重新交代學生程度
        </Point>
      </div>
      <Rise
        delay={620}
        style={{
          ...brandFill,
          marginTop: 32,
          borderRadius: 28,
          padding: '26px 36px',
          fontSize: 32,
          fontWeight: 800,
        }}
      >
        備課從「每次重來」，變成「接著做」
      </Rise>
    </div>
    <Footer />
  </Stage>
);

/* ─────────────────────────── Wrap-up ─────────────────────────── */

const TakeawayRow = ({ icon, title, detail }: { icon: string; title: string; detail: string }) => (
  <StepIn
    style={{
      ...glass,
      width: 1400,
      height: 112,
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '0 40px',
      borderRadius: 28,
    }}
  >
    <Tile icon={icon} size={64} radius={20} iconSize={36} tone="soft" />
    <span style={{ fontSize: 38, fontWeight: 900, width: 220 }}>{title}</span>
    <span style={{ fontSize: 32, color: muted }}>{detail}</span>
  </StepIn>
);

const Takeaway: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 120 }}>
      <Rise>
        <div style={eyebrow}>今天想分享的</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 24 }}>
        <h2 style={{ ...h2, fontSize: 112, lineHeight: 1.2 }}>
          AI 給速度，<span style={gradText}>老師給判斷。</span>
        </h2>
      </Rise>
      <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Steps>
          <Step duration={1}>
            <TakeawayRow
              icon="description"
              title="紙本教材"
              detail="讓工具接手排版，老師專心在內容"
            />
          </Step>
          <Step duration={1}>
            <TakeawayRow
              icon="touch_app"
              title="互動網頁"
              detail="為學生設計回饋，而不是為了遊戲"
            />
          </Step>
          <Step duration={1}>
            <TakeawayRow icon="sync" title="電子書閉環" detail="做一次就夠，下一份接著改" />
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </Stage>
);

const Social = ({ platform, handle, href }: { platform: string; handle: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    style={{
      ...linkReset,
      ...glass,
      borderRadius: 999,
      padding: '16px 34px',
      fontSize: 28,
      display: 'inline-flex',
      gap: 14,
    }}
  >
    <span style={{ fontWeight: 900 }}>{platform}</span>
    <span style={{ color: muted }}>{handle}</span>
  </a>
);

const Closing: Page = () => (
  <Stage dots>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Rise kind="materialize">
        <h2 style={{ ...h2, fontSize: 128, lineHeight: 1.2 }}>
          謝謝聆聽<span style={gradText}>，敬請指教</span>
        </h2>
      </Rise>
      <Rise delay={120} style={{ marginTop: 24 }}>
        <p style={{ fontSize: 40, color: muted, margin: 0 }}>歡迎追蹤米克師，看更多特教備課工具</p>
      </Rise>
      <Rise delay={240} motion={BOUNCY} style={{ marginTop: 64 }}>
        <a
          href="https://spedmix.pages.dev/"
          target="_blank"
          rel="noreferrer"
          style={{
            ...linkReset,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 20,
            padding: '26px 60px',
            borderRadius: 999,
            background: `linear-gradient(135deg, var(--osd-accent) 0%, ${deep} 100%)`,
            color: '#ffffff',
            fontSize: 56,
            fontWeight: 800,
            fontFamily: 'var(--osd-font-display)',
            letterSpacing: '-0.01em',
            boxShadow: '0 30px 60px -24px rgba(34, 87, 122, 0.6)',
          }}
        >
          spedmix.pages.dev
          <Icon name="arrow_forward" size={56} />
        </a>
      </Rise>
      <Rise delay={380} style={{ marginTop: 64, display: 'flex', gap: 20 }}>
        <Social platform="Facebook" handle="米克師" href={socialUrls.facebook} />
        <Social platform="Instagram" handle="@spedmix2025" href={socialUrls.instagram} />
        <Social platform="Threads" handle="@spedmix2025" href={socialUrls.threads} />
      </Rise>
    </div>
  </Stage>
);
Closing.transition = settle;

export const meta: SlideMeta = {
  title: '用 AI 製作特教教材與學習單（高師大 10/28）',
  createdAt: '2026-10-11T07:42:22.657Z',
};

export default [
  Cover,
  Speaker,
  Stance,
  Route,
  Part1,
  PaperWhy,
  ChineseTool,
  MathTool,
  Part2,
  InteractiveWhy,
  Principle,
  SentenceTool,
  StepMathTool,
  VisualDesign,
  WhySelfMade,
  Part3,
  EbookWhy,
  LibraryTool,
  ToolbarTool,
  DualMode,
  Part4,
  Loop,
  AgentFolder,
  Takeaway,
  Closing,
] satisfies Page[];

export const notes: (string | undefined)[] = [
  '14:30 開場。感謝邀請，今天的主題是用 AI 製作特教教材與學習單，以分享現有成果為主。',
  '簡短自我介紹，帶過特教與資訊的雙背景。',
  '先講立場：AI 對我只能完成 70 分，剩下 30 分要靠老師判斷。後面每個工具都會回到這件事。',
  '今天的路線：四段，每一段都先講「要解決什麼問題」，再看工具。',
  '14:38 PART 1 紙本教材，約 17 分鐘。',
  '動機：AI 讓內容變快了，但貼到 Word、排版、調字級還是手工。工具要解決的是最後一哩。',
  '國語文學習單：一個工具，產出雙軌閱讀、田字格、隨段檢核等版面，直接可以印。',
  '數學簡化學習單：輸入題型就好，先懂再練，一鍵列印。',
  '14:55 PART 2 互動網頁，約 25 分鐘。',
  '先肯定現成工具，再講四個限制。重點是「選擇就等於檢核」對 ADHD 學生的影響。',
  '對照：點了就判 vs 先選再檢核。多一個停頓，學生就有思考與修正的空間。',
  '句型排列：檢查答案是獨立按鈕；聽解答可以語音報讀。（可現場示範）',
  '互動步驟數學：一次一步、每步各自檢核，錯在哪就停在哪。',
  '視覺設計：一次亮一題、亮點提示作答位置。這需要老師了解學生，沒有標準答案。',
  '整理：自己做就沒有這些限制，但前提是老師懂學生，這就是那 30 分。逐列點開。',
  '15:20 PART 3 電子書模式，約 20 分鐘。',
  '思維轉換：我們一直想加速做學習單、做簡報；但簡報的本質只是方便呈現。電子書做一次就有兩種用法。',
  '國中教材庫：依年級科目整理，每一課是一份電子書。順帶提一句：都在同一個資料夾，後面會用到。',
  '工具列：逐題顯答、螢光筆、放大、列印。一般投影就能用。（可現場開一份示範）',
  '同一份檔案的兩種輸出：投影講解與 A4 白卷。',
  '15:40 PART 4 教材閉環，約 15 分鐘。',
  '閉環：上課 → 觀察 → 跟 agent 說一句話 → 下一份自動調整。教學內容在 AI 裡是連貫的。',
  '關鍵是讓 agent 讀得到教材庫資料夾；Codex、Antigravity、Claude Code 都可以。備課從每次重來變成接著做。',
  '15:55 收尾：AI 給速度，老師給判斷。逐列點開三個重點。',
  '致謝，結束。',
];
