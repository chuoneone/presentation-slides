import imgHeadshot from '@assets/headshot.webp';
import imgMixerAiPrep from '@assets/mixer-ai-prep.webp';
import imgMixerShare from '@assets/mixer-share.webp';
import imgMixerTeaching from '@assets/mixer-teaching.webp';
import {
  type DesignSystem,
  MorphElement,
  type Page,
  type SlideMeta,
  type SlideTransition,
  Step,
  Steps,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useCallback, useEffect, useState } from 'react';
import imgChineseMatch from './assets/chinese-match-quiz.webp';
import imgChineseQuiz from './assets/chinese-paragraph-quiz.webp';
import imgChineseReading from './assets/chinese-scaffold-reading.webp';
import imgChineseTable from './assets/chinese-structure-table.webp';
import imgChineseTianzi from './assets/chinese-tianzi-grid.webp';
import imgInteractiveStepMath from './assets/interactive-step-math.webp';
import imgMathCatalog from './assets/math-ebook-catalog.webp';
import imgMathConcept from './assets/math-ebook-concept.webp';
import imgMathInputGemini from './assets/math-input-gemini.webp';
import imgMathPrint from './assets/math-print-preview.webp';
import imgSpecialEdEnglish from './assets/special-ed-english-screenshot.png';
import imgTool1 from './assets/工具一.webp';

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

const SLIDE_ID = 'ai-custom-materials';

const toolUrls = {
  chineseLessonWorksheet: 'https://spedmix.pages.dev/chinese-lesson-worksheet',
  mathScaffold: 'https://spedmix.pages.dev/math-scaffold',
  unscramble: 'https://spedmix.pages.dev/unscramble',
  interactiveMath: 'https://spedmix.pages.dev/interativemath',
  vocabMaker: 'https://spedmix.pages.dev/vocab-maker',
  similarCharacters: 'https://spedmix.pages.dev/Similarcharacters',
  chineseTranslate: 'https://spedmix.pages.dev/chinesetranslate',
  mathQuestion: 'https://spedmix.pages.dev/mathquestion',
  specialEdEnglish: 'https://spedmix.pages.dev/special-ed-english-worksheet',
  vocabPractice: 'https://spedmix.pages.dev/vocab-practice-worksheet',
  steppedVocab: 'https://spedmix.pages.dev/stepped-vocab-worksheet',
  mathScaffoldVideo: 'https://youtu.be/5JHjBHxQGNI',
} as const;

const uploadFileUrls = {
  general: 'https://forms.gle/wUPvUAkE7PoFVdEFA',
  chineseMath: 'https://forms.gle/EYWo9CuWQ8TJQd2h6',
} as const;

const socialUrls = {
  instagram: 'https://www.instagram.com/spedmix2025/',
  facebook: 'https://www.facebook.com/p/%E7%B1%B3%E5%85%8B%E5%B8%AB-61583357100870/',
  threads: 'https://www.threads.com/@spedmix2025',
} as const;

const mixerSiteUrls = {
  prep: 'https://spedmix.pages.dev/',
  share: 'https://spedmixshare.pages.dev/',
  teaching: 'https://spedmixteaching.pages.dev/',
} as const;

const ICONS = [
  'add',
  'arrow_forward',
  'assignment',
  'auto_awesome',
  'auto_stories',
  'business_center',
  'calculate',
  'chat',
  'check_circle',
  'close',
  'co_present',
  'description',
  'diversity_3',
  'edit_note',
  'face',
  'folder',
  'folder_open',
  'history_edu',
  'key',
  'local_fire_department',
  'lightbulb',
  'lock',
  'menu_book',
  'open_in_new',
  'pause',
  'person',
  'photo_camera',
  'play_arrow',
  'print',
  'privacy_tip',
  'quiz',
  'record_voice_over',
  'remove',
  'reorder',
  'restart_alt',
  'school',
  'search',
  'smart_toy',
  'spellcheck',
  'stairs',
  'sync',
  'timer',
  'touch_app',
  'travel_explore',
  'translate',
  'tune',
  'upload',
  'visibility',
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
@keyframes asx-rise { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: none; } }
@keyframes asx-materialize { from { opacity: 0; transform: scale(0.94); filter: blur(18px); } to { opacity: 1; transform: none; filter: blur(0); } }
@keyframes asx-pop { from { opacity: 0; transform: scale(0.2); } to { opacity: 1; transform: none; } }
@keyframes asx-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes asx-line { from { transform: translateY(110%); } to { transform: none; } }
@keyframes asx-track { from { opacity: 0; letter-spacing: 0.6em; } to { opacity: 1; letter-spacing: 0.04em; } }
@keyframes asx-grow { from { transform: scaleX(0); } to { transform: none; } }
@keyframes asx-spin { from { opacity: 0; transform: scale(0.4) rotate(-24deg); } to { opacity: 1; transform: none; } }
[data-osd-step="revealed"] > .asx-step { animation: asx-rise ${SOFT.ms}ms ${SOFT.easing} both; }
@media (prefers-reduced-motion: reduce) {
  .asx-anim, [data-osd-step="revealed"] > .asx-step {
    animation-name: asx-fade !important;
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
const MORPH_MS = 880;

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

const morphTransition: SlideTransition = {
  duration: 300,
  exit: { duration: 320, easing: EASE_IN, keyframes: HOLD },
  enter: { duration: 320, easing: EASE_OUT, keyframes: [{ opacity: 0 }, { opacity: 1 }] },
  morph: { duration: MORPH_MS, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' },
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
      className={active ? 'asx-anim' : undefined}
      style={{
        ...style,
        animation: active
          ? `asx-${kind} ${motion.ms}ms ${motion.easing} ${delay}ms both`
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
    <div className={active ? 'asx-step' : undefined} style={style}>
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
        AI 客製化教材設計應用<span style={{ margin: '0 12px', opacity: 0.4 }}>|</span>米克師
      </span>
      <span style={{ fontFamily: 'var(--osd-font-display)', fontVariantNumeric: 'tabular-nums' }}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const HeaderRow = ({
  icon,
  title,
  morphId,
}: {
  icon: string;
  title: ReactNode;
  morphId?: string;
}) => (
  <>
    <div style={{ position: 'absolute', left: 120, top: 100 }}>
      {morphId ? (
        <MorphElement id={morphId}>
          <div>
            <Tile icon={icon} size={104} radius={30} iconSize={56} />
          </div>
        </MorphElement>
      ) : (
        <Tile icon={icon} size={104} radius={30} iconSize={56} />
      )}
    </div>
    <Rise delay={morphId ? 220 : 0} style={{ position: 'absolute', left: 256, top: 100 }}>
      <h2 style={{ ...h2, lineHeight: '104px' }}>{title}</h2>
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

// Fixed-size browser window; the screenshot is cropped from the top.
const BrowserFrame = ({
  src,
  width,
  height,
  url,
}: {
  src: string;
  width: number;
  height: number;
  url: string;
}) => (
  <div
    style={{
      ...glass,
      width,
      borderRadius: 28,
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.86)',
    }}
  >
    <FrameBar label={url} />
    <img
      src={src}
      alt=""
      style={{ display: 'block', width, height, objectFit: 'cover', objectPosition: 'top' }}
    />
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

const Divider = ({
  index,
  icon,
  morphId,
  title,
  sub,
  detail,
}: {
  index: string;
  icon: string;
  morphId?: string;
  title: ReactNode;
  sub: string;
  detail: string;
}) => (
  <Stage dots>
    <div style={{ position: 'absolute', left: 200, top: 380 }}>
      {morphId ? (
        <MorphElement id={morphId}>
          <div>
            <Tile icon={icon} size={320} radius={88} iconSize={176} />
          </div>
        </MorphElement>
      ) : (
        <Tile icon={icon} size={320} radius={88} iconSize={176} />
      )}
    </div>
    <div style={{ position: 'absolute', left: 620, top: 0, bottom: 0, right: 120 }}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Rise delay={80}>
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 44,
              fontWeight: 800,
              color: 'var(--osd-accent)',
            }}
          >
            {index}
          </div>
        </Rise>
        <Rise delay={160}>
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 136,
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
        </Rise>
        <Rise delay={260} style={{ marginTop: 20 }}>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{sub}</div>
        </Rise>
        <Rise delay={340} style={{ marginTop: 12 }}>
          <div style={{ fontSize: 32, color: muted }}>{detail}</div>
        </Rise>
      </div>
    </div>
  </Stage>
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
      <Tile icon="auto_awesome" size={240} radius={68} iconSize={132} />
    </Rise>
    <OrbitCard icon="menu_book" label="國文課堂學習單" x={1500} y={250} tilt={3} delay={500} />
    <OrbitCard icon="calculate" label="數學鷹架學習單" x={1060} y={560} tilt={-3} delay={580} />
    <OrbitCard icon="translate" label="英文資源班學習單" x={1520} y={700} tilt={4} delay={660} />
    <OrbitCard icon="touch_app" label="互動教學網頁" x={1200} y={830} tilt={-2} delay={740} />

    <div
      style={{
        position: 'absolute',
        left: 140,
        top: 0,
        bottom: 0,
        width: 880,
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
          <span style={{ fontFamily: 'var(--osd-font-display)' }}>米克師 · @spedmix2025</span>
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
          AI 客製化
          <br />
          <span style={gradText}>教材設計</span>
          <br />
          應用
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
          國英數適性學習單 ‧ 互動教學網頁
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
          <div style={{ fontSize: 34, fontWeight: 900 }}>朱旆誼</div>
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
    <HeaderRow icon="person" title="介紹" />
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

const SiteColumn = ({
  src,
  href,
  url,
  label,
  title,
  desc,
  delay,
}: {
  src: string;
  href: string;
  url: string;
  label: string;
  title: string;
  desc: string;
  delay: number;
}) => (
  <Rise delay={delay} kind="materialize" style={{ width: 528 }}>
    <a href={href} target="_blank" rel="noreferrer" style={linkReset}>
      <BrowserFrame src={src} width={528} height={258} url={url} />
    </a>
    <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column' }}>
      <span style={softPill}>{label}</span>
      <div style={{ fontSize: 42, fontWeight: 900, marginTop: 18 }}>{title}</div>
      <div style={{ fontSize: 26, lineHeight: 1.55, color: muted, marginTop: 10 }}>{desc}</div>
    </div>
  </Rise>
);

const InstagramIcon = () => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 12a7 7 0 1 1-7-7c3.87 0 6 2.5 6 5.5 0 3-2 4.5-4 4.5s-3-1.5-3-3 1.5-3 3-3c1.5 0 2.5.8 2.8 1.8" />
  </svg>
);

const SocialCard = ({
  href,
  platform,
  handle,
  color,
  icon,
  delay,
}: {
  href: string;
  platform: string;
  handle: string;
  color: string;
  icon: ReactNode;
  delay: number;
}) => (
  <Rise delay={delay} motion={BOUNCY}>
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        ...linkReset,
        ...glass,
        width: 500,
        height: 240,
        boxSizing: 'border-box',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        color: 'var(--osd-text)',
      }}
    >
      <div
        style={{
          width: 112,
          height: 112,
          borderRadius: 32,
          flexShrink: 0,
          background: color,
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 18px 36px -16px ${color}`,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 800 }}>
          {platform}
        </div>
        <div style={{ fontSize: 30, fontWeight: 700, color, marginTop: 4 }}>{handle}</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 24,
            color: muted,
            marginTop: 8,
          }}
        >
          點擊前往
          <Icon name="arrow_forward" size={26} />
        </div>
      </div>
    </a>
  </Rise>
);

const SocialLinks: Page = () => (
  <Stage dots>
    <HeaderRow icon="diversity_3" title="我的社群" />
    <SubLine>教材更新、工具分享、研習資訊，都會在這裡第一手發布</SubLine>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 280,
        bottom: 110,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: 40 }}>
        <SocialCard
          href={socialUrls.instagram}
          platform="Instagram"
          handle="@spedmix2025"
          color="#d62976"
          icon={<InstagramIcon />}
          delay={250}
        />
        <SocialCard
          href={socialUrls.facebook}
          platform="Facebook"
          handle="米克師"
          color="#1877f2"
          icon={<FacebookIcon />}
          delay={350}
        />
        <SocialCard
          href={socialUrls.threads}
          platform="Threads"
          handle="@spedmix2025"
          color="#111827"
          icon={<ThreadsIcon />}
          delay={450}
        />
      </div>
    </div>
    <Footer />
  </Stage>
);

const MixerSites: Page = () => (
  <Stage>
    <HeaderRow icon="travel_explore" title="我的三個網站" />
    <SubLine>備課、共享、學生練習，各有一個入口</SubLine>
    <div style={{ position: 'absolute', left: 120, top: 300, display: 'flex', gap: 48 }}>
      <SiteColumn
        src={imgMixerAiPrep}
        href={mixerSiteUrls.prep}
        url="spedmix.pages.dev"
        label="備課入口"
        title="AI備課幫手"
        desc="生成教材、學習單、課程素材與備課工具的主要入口。"
        delay={150}
      />
      <SiteColumn
        src={imgMixerShare}
        href={mixerSiteUrls.share}
        url="spedmixshare.pages.dev"
        label="共享入口"
        title="特教教材共享"
        desc="整理可分享的教材、工具與資源，快速找到可改用的素材。"
        delay={250}
      />
      <SiteColumn
        src={imgMixerTeaching}
        href={mixerSiteUrls.teaching}
        url="spedmixteaching.pages.dev"
        label="學生入口"
        title="步步練"
        desc="學生端的學習活動與互動教材，自學與課堂練習都好上手。"
        delay={350}
      />
    </div>
    <Footer />
  </Stage>
);

const AgendaItem = ({ n, name }: { n: string; name: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      height: 76,
      padding: '0 26px',
      borderRadius: 22,
      background: 'rgba(240, 244, 248, 0.9)',
    }}
  >
    <span
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 30,
        fontWeight: 800,
        ...gradText,
      }}
    >
      {n}
    </span>
    <span style={{ fontSize: 32, fontWeight: 700 }}>{name}</span>
  </div>
);

const PartCard = ({
  part,
  time,
  icon,
  title,
  sub,
  children,
  delay,
}: {
  part: string;
  time: string;
  icon: string;
  title: string;
  sub: string;
  children: ReactNode;
  delay: number;
}) => (
  <Rise
    delay={delay}
    motion={BOUNCY}
    style={{
      ...glass,
      width: 816,
      height: 520,
      padding: '48px 48px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Tile icon={icon} size={88} radius={26} iconSize={48} />
      <div>
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: '0.14em',
            color: 'var(--osd-accent)',
          }}
        >
          {part}
        </div>
        <div
          style={{ fontSize: 24, color: muted, marginTop: 4, fontVariantNumeric: 'tabular-nums' }}
        >
          {time}
        </div>
      </div>
    </div>
    <div style={{ fontSize: 48, fontWeight: 900, marginTop: 36 }}>{title}</div>
    <div style={{ fontSize: 28, color: muted, marginTop: 10 }}>{sub}</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 'auto' }}>
      {children}
    </div>
  </Rise>
);

const Agenda: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 130 }}>
      <Rise>
        <div style={eyebrow}>今日研習大綱</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 24 }}>
        <h2 style={h2}>特教教師的 AI 工作流</h2>
      </Rise>
    </div>
    <div style={{ position: 'absolute', left: 120, top: 360, display: 'flex', gap: 48 }}>
      <PartCard
        part="PART 01"
        time="08:30 – 09:30"
        icon="business_center"
        title="適性教材備課"
        sub="先求快速產出第一版"
        delay={150}
      >
        <AgendaItem n="01" name="國文課堂學習單" />
        <AgendaItem n="02" name="數學鷹架與英文學習單" />
      </PartCard>
      <PartCard
        part="PART 02"
        time="09:30 – 10:30"
        icon="touch_app"
        title="自製互動教學網頁"
        sub="打造適性特教學習鷹架"
        delay={250}
      >
        <AgendaItem n="01" name="句型排列與步驟數學" />
        <AgendaItem n="02" name="延伸：AI Agent 備課" />
      </PartCard>
    </div>
    <Footer />
  </Stage>
);

/* ─────────────────────────── Part 1 ─────────────────────────── */

const Part1: Page = () => (
  <PartDivider
    part="PART 01"
    num="01"
    time="08:30 – 09:30"
    icon="business_center"
    line1="國英數"
    line2="適性學習單"
    sub="國文 ＋ 數學 ＋ 英文"
    detail="AI 快速產出第一版，老師回歸個別化微調"
  >
    <PartTool icon="menu_book" label="國文課堂學習單" delay={760} />
    <PartTool icon="calculate" label="數學階梯鷹架學習單" delay={840} />
    <PartTool icon="translate" label="英文資源班學習單" delay={920} />
  </PartDivider>
);
Part1.transition = partReveal;

const ChapterChinese: Page = () => (
  <Divider
    index="PART 01 · 工具 1"
    icon="menu_book"
    morphId="tile-chinese"
    title={
      <>
        國文課堂
        <br />
        學習單
      </>
    }
    sub="語文備課"
    detail="雙軌閱讀、手寫鷹架、隨段即時檢核"
  />
);

const ChapterMath: Page = () => (
  <Divider
    index="PART 01 · 工具 2"
    icon="calculate"
    morphId="tile-math"
    title={
      <>
        數學階梯
        <br />
        鷹架學習單
      </>
    }
    sub="數學備課"
    detail="先懂再練，一鍵印出乾淨 A4 作業卷"
  />
);

const ChapterEnglish: Page = () => (
  <Divider
    index="PART 01 · 工具 3"
    icon="translate"
    morphId="tile-english"
    title={
      <>
        英文資源班
        <br />
        學習單
      </>
    }
    sub="英語文備課"
    detail="情境分鏡閱讀，搭配四線格練寫"
  />
);

/* ─────────────────────────── Practice ─────────────────────────── */

type TimerState = {
  label: string;
  // Planned length in minutes; a stored timer from an older plan is discarded.
  minutes: number;
  total: number;
  remaining: number;
  endAt: number | null;
};

const TIMER_KEY = '__AI_SPECIAL_ED_V2_TIMER__';
const TIMER_EVENT = 'ai-special-ed-v2-timer';

const readTimer = (): TimerState | null => {
  try {
    const raw = localStorage.getItem(TIMER_KEY);
    return raw ? (JSON.parse(raw) as TimerState) : null;
  } catch {
    return null;
  }
};

const writeTimer = (state: TimerState) => {
  try {
    localStorage.setItem(TIMER_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event(TIMER_EVENT));
  } catch {}
};

const remainingOf = (s: TimerState) =>
  s.endAt ? Math.max(0, Math.ceil((s.endAt - Date.now()) / 1000)) : s.remaining;

const chime = () => {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      gain.gain.setValueAtTime(0.25, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 0.85);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.85);
    });
  } catch {}
};

// One countdown shared through localStorage, so it keeps running while the
// presenter flips pages and stays in sync with the presenter view.
const usePracticeTimer = (label: string, minutes: number) => {
  const fresh = useCallback(
    (): TimerState => ({ label, minutes, total: minutes * 60, remaining: minutes * 60, endAt: null }),
    [label, minutes],
  );
  const load = useCallback(() => {
    const stored = typeof window === 'undefined' ? null : readTimer();
    return stored && stored.label === label && stored.minutes === minutes ? stored : fresh();
  }, [label, minutes, fresh]);

  const [state, setState] = useState<TimerState>(load);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const sync = () => setState(load());
    window.addEventListener(TIMER_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(TIMER_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [load]);

  useEffect(() => {
    if (!state.endAt) return;
    const id = window.setInterval(() => {
      setNow(Date.now());
      if (state.endAt && Date.now() >= state.endAt) {
        const stored = readTimer();
        // Only the instance that sees the timer still running ends it (and chimes).
        if (stored?.label === label && stored.endAt) {
          chime();
          writeTimer({ ...stored, remaining: 0, endAt: null });
        }
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [state.endAt, label]);

  const remaining = state.endAt
    ? Math.max(0, Math.ceil((state.endAt - now) / 1000))
    : state.remaining;
  const running = state.endAt !== null;

  const start = () => {
    const rem = remainingOf(state) || state.total;
    writeTimer({ ...state, remaining: rem, endAt: Date.now() + rem * 1000 });
  };
  const pause = () => writeTimer({ ...state, remaining: remainingOf(state), endAt: null });
  const reset = () => writeTimer(fresh());
  const adjust = (delta: number) => {
    const rem = Math.max(0, remainingOf(state) + delta);
    const total = Math.max(60, state.total + delta);
    writeTimer({
      ...state,
      total,
      remaining: rem,
      endAt: running ? Date.now() + rem * 1000 : null,
    });
  };

  return { remaining, total: state.total, running, start, pause, reset, adjust };
};

const TimerButton = ({
  icon,
  label,
  onClick,
  primary = false,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  primary?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    aria-label={label}
    style={{
      width: primary ? 112 : 84,
      height: primary ? 112 : 84,
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: primary
        ? `linear-gradient(135deg, var(--osd-accent) 0%, ${deep} 100%)`
        : 'rgba(56, 163, 165, 0.12)',
      color: primary ? '#ffffff' : 'var(--osd-accent)',
      boxShadow: primary ? '0 18px 36px -16px rgba(34, 87, 122, 0.6)' : 'none',
    }}
  >
    <Icon name={icon} size={primary ? 60 : 44} />
  </button>
);

const PracticeTimer = ({ label, minutes }: { label: string; minutes: number }) => {
  const { remaining, total, running, start, pause, reset, adjust } = usePracticeTimer(
    label,
    minutes,
  );
  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  const progress = total > 0 ? remaining / total : 0;
  const done = remaining === 0;
  return (
    <div
      style={{
        ...glass,
        width: 640,
        padding: '44px 48px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...eyebrow }}>
        <Icon name="timer" size={32} />
        實作倒數
      </div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 176,
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          fontVariantNumeric: 'tabular-nums',
          marginTop: 12,
          ...(done ? { color: warn } : gradText),
        }}
      >
        {mm}:{ss}
      </div>
      <div
        style={{
          width: '100%',
          height: 12,
          borderRadius: 999,
          background: 'rgba(56, 163, 165, 0.12)',
          marginTop: 16,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: '100%',
            borderRadius: 999,
            background: `linear-gradient(90deg, var(--osd-accent), ${deep})`,
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 36 }}>
        <TimerButton icon="remove" label="減少 1 分鐘" onClick={() => adjust(-60)} />
        <TimerButton
          icon={running ? 'pause' : 'play_arrow'}
          label={running ? '暫停' : '開始'}
          onClick={running ? pause : start}
          primary
        />
        <TimerButton icon="add" label="增加 1 分鐘" onClick={() => adjust(60)} />
        <TimerButton icon="restart_alt" label="重設" onClick={reset} />
      </div>
    </div>
  );
};

const LinkButton = ({
  href,
  icon,
  children,
  tone = 'brand',
}: {
  href: string;
  icon: string;
  children: ReactNode;
  tone?: 'brand' | 'ghost';
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    style={{
      ...linkReset,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '18px 34px',
      borderRadius: 999,
      fontSize: 30,
      fontWeight: 700,
      ...(tone === 'brand'
        ? {
            background: `linear-gradient(135deg, var(--osd-accent) 0%, ${deep} 100%)`,
            color: '#ffffff',
            boxShadow: '0 20px 40px -20px rgba(34, 87, 122, 0.6)',
          }
        : { ...glass, borderRadius: 999, color: 'var(--osd-text)' }),
    }}
  >
    <Icon name={icon} size={32} />
    {children}
  </a>
);

const Practice = ({
  n,
  minutes,
  tool,
  task,
  children,
}: {
  n: string;
  minutes: number;
  tool: ReactNode;
  task: ReactNode;
  children: ReactNode;
}) => (
  <Stage dots>
    <div style={{ position: 'absolute', left: 120, top: 0, bottom: 0, width: 960 }}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Rise>
          <Chip strong>
            <Icon name="edit_note" size={32} />
            實作 {n} · {minutes} 分鐘
          </Chip>
        </Rise>
        <Rise delay={100} style={{ marginTop: 32 }}>
          <h2 style={{ ...h2, fontSize: 80 }}>{tool}</h2>
        </Rise>
        <Rise delay={200} style={{ marginTop: 28 }}>
          <p style={{ fontSize: 34, lineHeight: 1.6, color: muted, margin: 0 }}>{task}</p>
        </Rise>
        <Rise delay={320} style={{ marginTop: 48, display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {children}
        </Rise>
      </div>
    </div>
    <Rise
      delay={200}
      kind="materialize"
      style={{ position: 'absolute', right: 120, top: 0, bottom: 0, display: 'flex' }}
    >
      <div style={{ margin: 'auto 0' }}>
        <PracticeTimer label={`實作 ${n}`} minutes={minutes} />
      </div>
    </Rise>
    <Footer />
  </Stage>
);

/* ─────────────────────── Unit intro (voices) ─────────────────────── */

const ChatBubble = ({
  icon,
  who,
  tag,
  quote,
  delay,
  side,
}: {
  icon: string;
  who: string;
  tag: string;
  quote: string;
  delay: number;
  side: 'left' | 'right';
}) => {
  const right = side === 'right';
  return (
    <Rise
      delay={delay}
      motion={BOUNCY}
      style={{
        display: 'flex',
        flexDirection: right ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: 28,
        alignSelf: right ? 'flex-end' : 'flex-start',
        maxWidth: 1360,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}
      >
        {right ? (
          <div
            style={{
              width: 104,
              height: 104,
              borderRadius: '50%',
              background: `linear-gradient(150deg, var(--osd-accent), ${deep})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={icon} size={56} color="#ffffff" />
          </div>
        ) : (
          <Tile icon={icon} size={104} radius={52} iconSize={56} tone="soft" />
        )}
        <div style={{ fontSize: 26, fontWeight: 900, color: deep }}>{who}</div>
      </div>
      <div
        style={{
          ...glass,
          padding: '36px 48px 40px',
          borderRadius: right ? '48px 48px 10px 48px' : '48px 48px 48px 10px',
          marginBottom: 46,
          ...(right
            ? {
                background: `linear-gradient(150deg, rgba(56, 163, 165, 0.94), ${deep})`,
                color: '#ffffff',
              }
            : { background: '#ffffff' }),
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.7, textAlign: right ? 'right' : 'left' }}>
          {tag}
        </div>
        <p
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 40,
            fontWeight: 700,
            lineHeight: 1.55,
            margin: '10px 0 0',
          }}
        >
          {quote}
        </p>
      </div>
    </Rise>
  );
};

const UnitIntro = ({
  icon,
  morphId,
  unit,
  title,
  teacher,
  teacherTag = '備課日常',
  student,
  studentTag = '學習困擾',
}: {
  icon: string;
  morphId: string;
  unit: string;
  title: string;
  teacher: string;
  teacherTag?: string;
  student: string;
  studentTag?: string;
}) => (
  <Stage>
    <HeaderRow icon={icon} morphId={morphId} title={title} />
    <SubLine delay={300}>{unit} · 現場需求</SubLine>
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 340,
        bottom: 130,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <ChatBubble
        icon="record_voice_over"
        who="老師"
        tag={teacherTag}
        quote={teacher}
        delay={360}
        side="left"
      />
      <ChatBubble icon="face" who="學生" tag={studentTag} quote={student} delay={760} side="right" />
    </div>
    <Footer />
  </Stage>
);

/* ─────────────────────── Feature walkthrough ─────────────────────── */

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

const Feature = ({
  unit,
  tag,
  title,
  label = '特教鷹架核心亮點',
  highlight = '降低書寫挫折，提供高結構鷹架支持',
  highlightTitle = '特教適性亮點',
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
  highlight?: ReactNode;
  highlightTitle?: string;
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
        delay={520}
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

const ChineseIntro: Page = () => (
  <UnitIntro
    icon="menu_book"
    morphId="tile-chinese"
    unit="語文備課"
    title="國文課堂學習單"
    teacher="每課找圖配圖超花時間，還要手動排版修改各種版本…"
    student="文章太長看不太懂，密密麻麻的字好想睡覺…"
  />
);
ChineseIntro.transition = morphTransition;

const Chinese1: Page = () => (
  <Feature
    unit="語文備課"
    tag="雙軌閱讀"
    title="課文雙軌對照"
    img={imgChineseReading}
    imgAlt="課文雙軌對照"
    imgLabel="雙軌閱讀 · 原文與易讀對照"
  >
    <Point n="01" delay={240}>
      原文與易讀雙軌排版
    </Point>
    <Point n="02" delay={320}>
      結合情境插圖輔助理解
    </Point>
    <Point n="03" delay={400}>
      唸讀計時檢核框
    </Point>
  </Feature>
);

const Chinese2: Page = () => (
  <Feature
    unit="語文備課"
    tag="手寫鷹架"
    title="田字格與摘要"
    img={imgChineseTianzi}
    imgAlt="田字格與摘要"
    imgLabel="手寫鷹架 · 注音田字格"
  >
    <Point n="01" delay={240}>
      注音田字格生字練寫
    </Point>
    <Point n="02" delay={320}>
      段落核心重點摘要
    </Point>
  </Feature>
);

const Chinese3: Page = () => (
  <Feature
    unit="語文備課"
    tag="隨學隨測"
    title="隨段即時檢核"
    img={imgChineseQuiz}
    imgAlt="隨堂選擇題"
    imgLabel="即時檢核 · 隨堂測驗"
  >
    <Point n="01" delay={240}>
      隨段兩題即時測驗
    </Point>
    <Point n="02" delay={320}>
      快速檢核學生理解
    </Point>
    <Point n="03" delay={400}>
      範圍縮短成每段測驗，降低負荷
    </Point>
  </Feature>
);

const Chinese4: Page = () => (
  <Feature
    unit="語文備課"
    tag="結構鷹架"
    title="課文脈絡表格"
    img={imgChineseTable}
    imgAlt="課文脈絡表格"
    imgLabel="結構鷹架 · 脈絡歸納"
  >
    <Point n="01" delay={240}>
      引導式重點歸納表格
    </Point>
    <Point n="02" delay={320}>
      文章結構脈絡梳理
    </Point>
    <Point n="03" delay={400}>
      培養深層理解
    </Point>
  </Feature>
);

const Chinese5: Page = () => (
  <Feature
    unit="語文備課"
    tag="課後評量"
    title="詞語多元評量"
    img={imgChineseMatch}
    imgAlt="詞語連連看評量"
    imgLabel="多元評量 · 詞語連連看"
  >
    <Point n="01" delay={240}>
      課文詞語注釋連連看
    </Point>
    <Point n="02" delay={320}>
      強化生字詞釋義記憶
    </Point>
  </Feature>
);

const PopularCard = ({
  icon,
  subject,
  name,
  desc,
  href,
  delay,
}: {
  icon: string;
  subject: string;
  name: string;
  desc: string;
  href: string;
  delay: number;
}) => (
  <Rise delay={delay} kind="materialize" style={{ display: 'flex', minWidth: 0 }}>
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        ...linkReset,
        ...glass,
        flex: 1,
        padding: '34px 36px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <Tile icon={icon} size={68} radius={20} iconSize={38} />
        <Chip>{subject}</Chip>
        <span style={{ marginLeft: 'auto' }}>
          <Icon name="open_in_new" size={34} color="var(--osd-accent)" />
        </span>
      </div>
      <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.25, color: deep }}>{name}</div>
      <div style={{ fontSize: 26, lineHeight: 1.5, color: muted }}>{desc}</div>
    </a>
  </Rise>
);

const PopularPicks: Page = () => (
  <Stage>
    <HeaderRow icon="local_fire_department" title="人氣工具推薦" />
    <SubLine>國語文 · 數學 · 英語文，點卡片直接開啟</SubLine>
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 310,
        bottom: 120,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 32,
      }}
    >
      <PopularCard
        icon="menu_book"
        subject="國語文"
        name="詞彙教材一鍵通"
        desc="輸入詞語，一鍵產出圖文詞彙教材，免找圖、免排版"
        href={toolUrls.vocabMaker}
        delay={160}
      />
      <PopularCard
        icon="spellcheck"
        subject="國語文"
        name="形近字學習單"
        desc="形近字並排比較，看清部件差異，一鍵印出練習單"
        href={toolUrls.similarCharacters}
        delay={220}
      />
      <PopularCard
        icon="history_edu"
        subject="國語文"
        name="文言文逐句圖文學習單"
        desc="原文與白話逐句對照，搭配圖像降低古文門檻"
        href={toolUrls.chineseTranslate}
        delay={280}
      />
      <PopularCard
        icon="calculate"
        subject="數學"
        name="數題數題"
        desc="一句話出題，示範引導 → 填空 → 獨立列式，鷹架逐步褪除"
        href={toolUrls.mathQuestion}
        delay={340}
      />
      <PopularCard
        icon="quiz"
        subject="英語文"
        name="單字練習卷生成器"
        desc="自動組合多種題型，小考卷免手動拼湊排版"
        href={toolUrls.vocabPractice}
        delay={400}
      />
      <PopularCard
        icon="stairs"
        subject="英語文"
        name="階梯式英文單字學習單"
        desc="認讀 → 填空 → 拼寫，小步驟記住單字"
        href={toolUrls.steppedVocab}
        delay={460}
      />
    </div>
    <Footer />
  </Stage>
);

const MathIntro: Page = () => (
  <UnitIntro
    icon="calculate"
    morphId="tile-math"
    unit="數學備課"
    title="數學階梯鷹架學習單"
    teacher="題目太難學生直接放棄，出分層階梯題出到心力交瘁…"
    student="步驟好多跳太快，看不懂計算過程就不想算了…"
  />
);
MathIntro.transition = morphTransition;

const Math1: Page = () => (
  <Feature
    unit="數學備課"
    tag="智能生成"
    title="輸入超簡單"
    img={imgMathInputGemini}
    imgAlt="輸入解一元一次"
    imgLabel="極簡輸入 · 階梯解題鷹架"
  >
    <Point n="01" delay={240}>
      只需輸入題目類型
    </Point>
    <Point n="02" delay={320}>
      也能直接貼上課本概念或題目截圖
    </Point>
    <Point n="03" delay={400}>
      一次一種概念，結構清楚
    </Point>
  </Feature>
);

const Math2: Page = () => (
  <Feature
    unit="數學備課"
    tag="先懂再練"
    title="概念說明"
    label="先理解，再作答"
    highlight="先懂後練、微步驟引導、降低焦慮"
    img={imgMathConcept}
    imgAlt="一元一次方程式的概念說明學習單"
    imgLabel="概念說明 → 分步練習"
  >
    <Point n="01" delay={240}>
      先說明這題在學什麼
    </Point>
    <Point n="02" delay={320}>
      用例題拆解解題想法
    </Point>
    <Point n="03" delay={400}>
      再用練習確認是否理解
    </Point>
  </Feature>
);

const Math3: Page = () => (
  <Feature
    unit="數學備課"
    tag="目錄清單"
    title="電子書功能"
    img={imgMathCatalog}
    imgAlt="單元目錄與概念檢視"
    imgLabel="概念目錄 · 循序漸進"
    imgWidth={560}
    imgHeight={520}
  >
    <Point n="01" delay={240}>
      單元目錄快速導航
    </Point>
    <Point n="02" delay={320}>
      沒有觸控大螢幕也適用
    </Point>
    <Point n="03" delay={400}>
      畫筆、秀答案等基本功能
    </Point>
  </Feature>
);

const Math4: Page = () => (
  <Feature
    unit="數學備課"
    tag="乾淨白卷"
    title="一鍵 A4 乾淨列印"
    img={imgMathPrint}
    imgAlt="A4 列印預覽"
    imgLabel="列印預覽 · 標準 A4 作業卷"
  >
    <Point n="01" delay={240}>
      一鍵濾除按鈕與答案
    </Point>
    <Point n="02" delay={320}>
      標準無干擾 A4 作業卷
    </Point>
    <Point n="03" delay={400}>
      免二次排版，直接出紙本
    </Point>
  </Feature>
);

const EnglishIntro: Page = () => (
  <UnitIntro
    icon="translate"
    morphId="tile-english"
    unit="英語文備課"
    title="英文資源班學習單"
    teacher="普通班課本句子太長太難，手動降階、重畫分鏡排版好耗時…"
    student="滿滿的英文字母不會唸也看不懂，整張考卷空白好挫折…"
  />
);
EnglishIntro.transition = morphTransition;

const English1: Page = () => (
  <Feature
    unit="英語文備課"
    tag="分鏡故事"
    title="英文資源班學習單"
    highlight="情境圖像先理解，再小步驟認讀與練寫"
    img={imgSpecialEdEnglish}
    imgAlt="英文資源班學習單生成系統"
    imgLabel="分鏡故事 · 單字認讀檢核"
    imgWidth={900}
  >
    <Point n="01" delay={240}>
      情境分鏡故事連環圖
    </Point>
    <Point n="02" delay={320}>
      英文字母四線格練寫
    </Point>
    <Point n="03" delay={400}>
      圖文重點單字檢核
    </Point>
  </Feature>
);

const PracticeChineseMath: Page = () => (
  <Practice
    n="01"
    minutes={10}
    tool="國英數適性學習單"
    task={
      <>
        依任教專長三選一：國語文、數學
        <br />
        或英文資源班學習單，實作 1 課。
      </>
    }
  >
    <LinkButton href={toolUrls.chineseLessonWorksheet} icon="menu_book">
      國語文學習單
    </LinkButton>
    <LinkButton href={toolUrls.mathScaffold} icon="calculate">
      數學簡化學習單
    </LinkButton>
    <LinkButton href={toolUrls.specialEdEnglish} icon="translate">
      英文資源班學習單
    </LinkButton>
    <LinkButton href={uploadFileUrls.chineseMath} icon="upload" tone="ghost">
      上傳檔案
    </LinkButton>
    <a
      href={toolUrls.mathScaffoldVideo}
      target="_blank"
      rel="noreferrer"
      style={{
        ...linkReset,
        flexBasis: '100%',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
        fontSize: 24,
        color: muted,
        textDecoration: 'underline',
        textUnderlineOffset: 6,
      }}
    >
      <Icon name="play_arrow" size={26} />
      忘記數學學習單怎麼用？看影片複習
    </a>
  </Practice>
);

/* ─────────────────────────── Part 2 ─────────────────────────── */

const Part2: Page = () => (
  <PartDivider
    part="PART 02"
    num="02"
    time="09:30 – 10:30"
    icon="touch_app"
    line1="自製互動"
    line2="教學網頁"
    sub="告別枯燥紙本作業"
    detail="點選、步驟拆解、即時回饋與視覺鷹架"
  >
    <PartTool icon="reorder" label="句型重組" delay={760} />
    <PartTool icon="stairs" label="互動步驟數學" delay={840} />
  </PartDivider>
);
Part2.transition = partReveal;

const ChapterSentence: Page = () => (
  <Divider
    index="PART 02 · 工具 4"
    icon="reorder"
    morphId="tile-sentence"
    title={'句型重組'}
    sub="自製互動網頁"
    detail="拖曳字卡＋語音朗讀，免手寫練句子"
  />
);

const ChapterStepMath: Page = () => (
  <Divider
    index="PART 02 · 工具 5"
    icon="stairs"
    morphId="tile-stepmath"
    title={
      <>
        互動步驟
        <br />
        數學
      </>
    }
    sub="自製互動網頁"
    detail="小步驟拆解，每一步都有即時回饋"
  />
);

const SentenceIntro: Page = () => (
  <UnitIntro
    icon="reorder"
    morphId="tile-sentence"
    unit="自製互動網頁"
    title="句型重組"
    teacher="Wordwall 有類似功能，但做多要花錢，又無法客製化…"
    student="想練句子但不會寫字，如果有得按又有聲音就好了…"
  />
);
SentenceIntro.transition = morphTransition;

const Sentence: Page = () => (
  <Feature
    unit="自製互動網頁"
    tag="語音互動"
    title="視覺點擊與逐題檢核"
    img={imgTool1}
    imgAlt="句型排列操作介面"
    imgLabel="互動操作 · 視覺拖曳與朗讀"
    imgHeight={700}
  >
    <Point n="01" delay={240}>
      免手寫，直覺拖曳操作
    </Point>
    <Point n="02" delay={320}>
      支援即時字卡語音朗讀
    </Point>
    <Point n="03" delay={400}>
      靠聽力把句子組起來，不是死記文法
    </Point>
  </Feature>
);

const StepMathIntro: Page = () => (
  <UnitIntro
    icon="stairs"
    morphId="tile-stepmath"
    unit="自製互動網頁"
    title="互動步驟數學"
    teacher="學生常跳步計算導致算錯，無法一個一個步驟即時盯著…"
    student="算到一半不知道哪裡錯，全部擦掉重算很挫折…"
  />
);
StepMathIntro.transition = morphTransition;

const StepMath: Page = () => (
  <Feature
    unit="自製互動網頁"
    tag="即時回饋"
    title="步驟拆解與檢核"
    img={imgInteractiveStepMath}
    imgAlt="步步練互動數學學習單畫面"
    imgLabel="步驟鷹架 · 即時回饋檢核"
  >
    <Point n="01" delay={240}>
      小步驟拆解解題流程
    </Point>
    <Point n="02" delay={320}>
      提供輸入與點選雙模式
    </Point>
    <Point n="03" delay={400}>
      即時回饋，強化解題信心
    </Point>
  </Feature>
);

const PracticeInteractive: Page = () => (
  <Practice
    n="02"
    minutes={10}
    tool="句型排列 / 步驟數學"
    task={
      <>
        依教學需要二選一：「句型排列」
        <br />
        或「互動步驟數學」，做 1 個互動網頁。
      </>
    }
  >
    <LinkButton href={toolUrls.unscramble} icon="reorder">
      句型排列工具
    </LinkButton>
    <LinkButton href={toolUrls.interactiveMath} icon="stairs">
      互動步驟數學
    </LinkButton>
    <LinkButton href={uploadFileUrls.general} icon="upload" tone="ghost">
      上傳檔案
    </LinkButton>
  </Practice>
);

const ChoiceCard = ({
  tag,
  title,
  delay,
  strong = false,
  children,
}: {
  tag: string;
  title: ReactNode;
  delay: number;
  strong?: boolean;
  children: ReactNode;
}) => (
  <Rise
    delay={delay}
    kind="materialize"
    style={{
      ...glass,
      width: 820,
      height: 600,
      borderRadius: 36,
      padding: '48px 56px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
      ...(strong ? { border: '3px solid var(--osd-accent)' } : {}),
    }}
  >
    <div style={softPill}>{tag}</div>
    <div style={{ fontSize: 50, fontWeight: 900, lineHeight: 1.25 }}>{title}</div>
    {children}
  </Rise>
);

const AgentChip = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      ...glass,
      borderRadius: 999,
      padding: '12px 28px',
      fontSize: 30,
      fontWeight: 800,
      fontFamily: 'var(--osd-font-display)',
    }}
  >
    {children}
  </span>
);

const Bonus: Page = () => (
  <Stage>
    <HeaderRow icon="lightbulb" title="補充：回家之後，可以怎麼走？" />
    <SubLine>依你的預算與興趣，二選一就好</SubLine>
    <div style={{ position: 'absolute', left: 120, top: 300, display: 'flex', gap: 40 }}>
      <ChoiceCard tag="有付費買 AI" title="試試 AI agent" delay={160}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <AgentChip>Codex</AgentChip>
          <AgentChip>Antigravity</AgentChip>
          <AgentChip>Claude Code</AgentChip>
        </div>
        <div style={{ fontSize: 32, lineHeight: 1.6, color: muted, marginTop: 8 }}>
          完全不同的備課模式。
          <br />
          會真正感受到
          <span style={{ ...gradText, fontWeight: 800 }}>行政文書與教材</span>
          <br />
          之間的關係與意義。
        </div>
      </ChoiceCard>
      <ChoiceCard
        tag="沒付費，對資訊工具也沒太大興趣"
        title={
          <>
            務必收藏
            <span style={gradText}>米克師的 AI 備課幫手</span>
          </>
        }
        delay={280}
        strong
      >
        <div style={{ fontSize: 30, lineHeight: 1.55, color: muted }}>
          特教現場誕生的各種工具，免費！
          <br />
          品質保證！<span style={{ fontSize: 24 }}>（應該）</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 'auto' }}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&data=${encodeURIComponent(mixerSiteUrls.prep)}`}
            alt="米克師的 AI 備課幫手 QR code"
            style={{ width: 160, height: 160, borderRadius: 18, background: '#ffffff' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <LinkButton href={mixerSiteUrls.prep} icon="open_in_new">
              spedmix.pages.dev
            </LinkButton>
            <div style={{ fontSize: 26, color: muted }}>把它當蝦皮逛，有助身心健康</div>
          </div>
        </div>
      </ChoiceCard>
    </div>
    <Footer />
  </Stage>
);

/* ─────────────────────────── Wrap-up ─────────────────────────── */

const TakeawayRow = ({ title, detail }: { title: string; detail: string }) => (
  <StepIn
    style={{
      ...glass,
      width: 1280,
      height: 112,
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '0 40px',
      borderRadius: 28,
    }}
  >
    <Tile icon="check_circle" size={64} radius={20} iconSize={36} tone="soft" />
    <span style={{ fontSize: 38, fontWeight: 900 }}>{title}</span>
    <span style={{ fontSize: 32, color: muted }}>{detail}</span>
  </StepIn>
);

const Takeaway: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 120 }}>
      <Rise>
        <div style={eyebrow}>今天的研習</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 24 }}>
        <h2 style={{ ...h2, fontSize: 112, lineHeight: 1.2 }}>
          帶走一件事，<span style={gradText}>就夠了。</span>
        </h2>
      </Rise>
      <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Steps>
          <Step duration={1}>
            <TakeawayRow title="不必全用" detail="工具很多，挑一個最上手的就好" />
          </Step>
          <Step duration={1}>
            <TakeawayRow title="不用追趕" detail="紙本或數位互動，適合你的就是好工具" />
          </Step>
          <Step duration={1}>
            <TakeawayRow title="回歸痛點" detail="看見每天重複的困擾，讓 AI 幫你少花力氣" />
          </Step>
        </Steps>
      </div>
      <Rise delay={300} style={{ marginTop: 48 }}>
        <div style={{ fontSize: 44, fontWeight: 900 }}>
          選擇<span style={gradText}>自己最不排斥的</span>！
        </div>
      </Rise>
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
          謝謝大家<span style={gradText}>！</span>
        </h2>
      </Rise>
      <Rise delay={120} style={{ marginTop: 24 }}>
        <p style={{ fontSize: 40, color: muted, margin: 0 }}>歡迎追蹤米克師，看更多特教備課工具</p>
      </Rise>
      <Rise delay={240} motion={BOUNCY} style={{ marginTop: 64 }}>
        <a
          href={mixerSiteUrls.prep}
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
  title: 'AI客製化教材設計應用',
  createdAt: '2026-11-03T00:00:00.000Z',
};

export default [
  Cover,
  Speaker,
  SocialLinks,
  MixerSites,
  Agenda,
  Part1,
  ChapterChinese,
  ChineseIntro,
  Chinese1,
  Chinese2,
  Chinese3,
  Chinese4,
  Chinese5,
  ChapterMath,
  MathIntro,
  Math1,
  Math2,
  Math3,
  Math4,
  ChapterEnglish,
  EnglishIntro,
  English1,
  PracticeChineseMath,
  Part2,
  ChapterSentence,
  SentenceIntro,
  Sentence,
  ChapterStepMath,
  StepMathIntro,
  StepMath,
  PracticeInteractive,
  PopularPicks,
  Bonus,
  Takeaway,
  Closing,
] satisfies Page[];
