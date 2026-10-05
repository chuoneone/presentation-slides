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
import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';
import imgHome from './assets/index.png';
import imgPresentation from './assets/presentation.png';
import imgSkills from './assets/skills.png';
import imgInvite from './assets/workshop-invitation.png';

export const design: DesignSystem = {
  palette: { bg: '#F0F4F8', text: '#1e293b', accent: '#38A3A5' },
  fonts: {
    display:
      '"Outfit", "Chiron GoRound TC", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body: '"Chiron GoRound TC", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 168, body: 36 },
  radius: 36,
};

const deep = '#22577A';
const muted = '#64748b';
const heart = '#f43f5e';

const SLIDE_ID = 'spedmix-intro';

const ICONS = [
  'accessibility_new',
  'arrow_forward',
  'assignment',
  'auto_awesome',
  'auto_fix_high',
  'auto_stories',
  'business_center',
  'calculate',
  'center_focus_strong',
  'co_present',
  'content_copy',
  'content_paste',
  'description',
  'diversity_3',
  'draw',
  'edit_note',
  'extension',
  'favorite',
  'folder_shared',
  'forum',
  'functions',
  'groups',
  'local_fire_department',
  'mail',
  'menu_book',
  'reorder',
  'smart_toy',
  'spellcheck',
  'sports_esports',
  'stairs',
  'translate',
  'tune',
  'volume_up',
  'widgets',
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

const css = `
@keyframes smx-rise { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: none; } }
@keyframes smx-materialize { from { opacity: 0; transform: scale(0.94); filter: blur(18px); } to { opacity: 1; transform: none; filter: blur(0); } }
@keyframes smx-pop { from { opacity: 0; transform: scale(0.2); } to { opacity: 1; transform: none; } }
@keyframes smx-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes smx-ripple { from { opacity: 0.55; transform: scale(0.6); } to { opacity: 0; transform: scale(1.9); } }
[data-osd-step="revealed"] > .smx-step { animation: smx-rise ${SOFT.ms}ms ${SOFT.easing} both; }
@media (prefers-reduced-motion: reduce) {
  .smx-anim, [data-osd-step="revealed"] > .smx-step {
    animation-name: smx-fade !important;
    animation-duration: 240ms !important;
    animation-timing-function: ease-out !important;
  }
  .smx-ripple { display: none; }
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

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
};

const glass: CSSProperties = {
  background: 'rgba(255, 255, 255, 0.62)',
  backdropFilter: 'blur(28px) saturate(180%)',
  WebkitBackdropFilter: 'blur(28px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.85)',
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
  kind?: 'rise' | 'materialize' | 'pop' | 'fade';
  motion?: Spring;
  style?: CSSProperties;
}) => {
  const active = useIsActivePage();
  return (
    <div
      className={active ? 'smx-anim' : undefined}
      style={{
        ...style,
        animation: active
          ? `smx-${kind} ${motion.ms}ms ${motion.easing} ${delay}ms both`
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
    <div className={active ? 'smx-step' : undefined} style={style}>
      {children}
    </div>
  );
};

const usePrefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const useCountUp = (target: number, delay: number, duration = 1500) => {
  const active = useIsActivePage();
  const reduce = usePrefersReducedMotion();
  const animate = active && !reduce;
  const [value, setValue] = useState(animate ? 0 : target);
  useEffect(() => {
    if (!animate) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      setValue(Math.round(target * (1 - (1 - t) ** 4)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, target, delay, duration]);
  return value;
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
  tone?: 'brand' | 'soft';
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
          : 'rgba(56, 163, 165, 0.12)',
      boxShadow:
        tone === 'brand'
          ? 'inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 18px 36px -16px rgba(34, 87, 122, 0.55)'
          : 'none',
    }}
  >
    <Icon name={icon} size={iconSize} color={tone === 'brand' ? '#ffffff' : 'var(--osd-accent)'} />
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
        米克師<span style={{ margin: '0 12px', opacity: 0.4 }}>|</span>AI備課幫手
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

const BrowserFrame = ({ src, width, url }: { src: string; width: number; url: string }) => (
  <div
    style={{
      ...glass,
      width,
      borderRadius: 28,
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.78)',
    }}
  >
    <div
      style={{
        height: 52,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '0 22px',
        borderBottom: '1px solid rgba(30, 41, 59, 0.06)',
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
        }}
      >
        {url}
      </span>
      <span style={{ width: 62 }} />
    </div>
    <img
      src={src}
      alt=""
      style={{
        display: 'block',
        width,
        height: Math.round(width * 0.625),
        objectFit: 'cover',
        objectPosition: 'top',
      }}
    />
  </div>
);

const Cover: Page = () => (
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
      <Rise delay={0}>
        <Chip strong>
          <span
            style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--osd-accent)' }}
          />
          <span style={{ fontFamily: 'var(--osd-font-display)' }}>SpedMix</span>
        </Chip>
      </Rise>
      <Rise delay={120} kind="materialize" style={{ marginTop: 44 }}>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.035em',
            margin: 0,
          }}
        >
          Special <span style={gradText}>Education</span>
        </h1>
      </Rise>
      <Rise delay={260} style={{ marginTop: 36 }}>
        <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 1.2, letterSpacing: '0.02em' }}>
          教師備課幫手
        </div>
      </Rise>
      <Rise delay={380} style={{ marginTop: 28 }}>
        <p style={{ fontSize: 36, color: muted, margin: 0, lineHeight: 1.5 }}>
          米克師｜專為特殊教育設計的 AI 備課平台
        </p>
      </Rise>
      <Rise delay={500} motion={BOUNCY} style={{ marginTop: 56 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            padding: '22px 48px',
            borderRadius: 999,
            background: `linear-gradient(135deg, var(--osd-accent) 0%, ${deep} 100%)`,
            color: '#ffffff',
            fontSize: 34,
            fontWeight: 700,
            fontFamily: 'var(--osd-font-display)',
            boxShadow: '0 24px 48px -20px rgba(34, 87, 122, 0.6)',
          }}
        >
          spedmix.pages.dev
          <Icon name="arrow_forward" size={36} />
        </div>
      </Rise>
    </div>
  </Stage>
);
Cover.transition = settle;

const PainRow = ({ icon, title, detail }: { icon: string; title: string; detail: string }) => (
  <StepIn
    style={{
      ...glass,
      width: 1180,
      height: 112,
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '0 40px',
      borderRadius: 28,
    }}
  >
    <Tile icon={icon} size={64} radius={20} iconSize={36} tone="soft" />
    <span style={{ fontSize: 40, fontWeight: 700 }}>{title}</span>
    <Icon name="arrow_forward" size={36} color={muted} />
    <span style={{ fontSize: 36, color: muted }}>{detail}</span>
  </StepIn>
);

const Why: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 120 }}>
      <Rise>
        <div style={eyebrow}>為什麼需要它</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 24 }}>
        <h2 style={{ ...h2, fontSize: 120, lineHeight: 1.2 }}>一個班，十種程度。</h2>
      </Rise>
      <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Steps>
          <Step duration={1}>
            <PainRow icon="menu_book" title="課文太難" detail="要逐段簡化、改寫、配圖" />
          </Step>
          <Step duration={1}>
            <PainRow icon="assignment" title="同一份學習單" detail="要依程度分層出好幾版" />
          </Step>
          <Step duration={1}>
            <PainRow icon="volume_up" title="評量要調整" detail="報讀、放大、降低書寫負荷" />
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </Stage>
);

const Answer: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 0, bottom: 0, width: 720 }}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Rise>
          <div style={eyebrow}>米克師｜AI備課幫手</div>
        </Rise>
        <Rise delay={100} style={{ marginTop: 28 }}>
          <h2 style={{ ...h2, fontSize: 68 }}>
            把專業的特教調整，
            <br />
            <span style={gradText}>變成一鍵完成。</span>
          </h2>
        </Rise>
        <Rise delay={200} style={{ marginTop: 40 }}>
          <p style={{ fontSize: 34, lineHeight: 1.6, color: muted, margin: 0 }}>
            老師貼上教材，AI 依學生程度
            <br />
            產出可以直接用的學習單與網頁。
          </p>
        </Rise>
        <Rise delay={320} style={{ marginTop: 48, display: 'flex', gap: 16 }}>
          <Chip>差異化教學</Chip>
          <Chip>IEP</Chip>
          <Chip>個別化學習單</Chip>
        </Rise>
      </div>
    </div>
    <Rise delay={180} kind="materialize" style={{ position: 'absolute', right: 120, top: 214 }}>
      <BrowserFrame src={imgHome} width={940} url="spedmix.pages.dev" />
    </Rise>
    <Footer />
  </Stage>
);

const StatCard = ({
  target,
  suffix = '',
  unit,
  label,
  delay,
}: {
  target: number;
  suffix?: string;
  unit: string;
  label: string;
  delay: number;
}) => {
  const value = useCountUp(target, delay + 200);
  return (
    <Rise
      delay={delay}
      kind="materialize"
      style={{
        ...glass,
        width: 396,
        height: 400,
        padding: '56px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 120,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          fontVariantNumeric: 'tabular-nums',
          ...gradText,
        }}
      >
        {value}
        {suffix}
      </div>
      <div>
        <div style={{ fontSize: 40, fontWeight: 900 }}>{unit}</div>
        <div style={{ fontSize: 26, color: muted, marginTop: 12 }}>{label}</div>
      </div>
    </Rise>
  );
};

const Numbers: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 150 }}>
      <Rise>
        <div style={eyebrow}>BY THE NUMBERS</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 24 }}>
        <h2 style={h2}>一個網站，就是一整個備課工具箱</h2>
      </Rise>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 450,
        display: 'flex',
        gap: 32,
      }}
    >
      <StatCard target={7} unit="大領域" label="國、數、英到特需領域" delay={150} />
      <StatCard target={60} suffix="+" unit="個 AI 工具" label="點開就能用，免安裝" delay={250} />
      <StatCard target={9} unit="個教學 Skills" label="裝進你的 AI Agent" delay={350} />
      <StatCard target={500} suffix="+" unit="份共享教材" label="老師之間互相分享" delay={450} />
    </div>
    <Footer />
  </Stage>
);

const EntryCard = ({
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
      width: 313,
      height: 440,
      padding: '44px 36px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Tile icon={icon} size={96} radius={28} iconSize={52} />
    <div style={{ fontSize: 42, fontWeight: 900, marginTop: 44 }}>{title}</div>
    <div style={{ fontSize: 28, lineHeight: 1.55, color: muted, marginTop: 16 }}>{desc}</div>
  </Rise>
);

const SiteMap: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 150 }}>
      <Rise>
        <div style={eyebrow}>網站地圖</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 24 }}>
        <h2 style={h2}>五個入口，各有任務</h2>
      </Rise>
    </div>
    <div style={{ position: 'absolute', left: 120, top: 420, display: 'flex', gap: 28 }}>
      <EntryCard
        icon="widgets"
        title="工具選單"
        desc="60+ 個 AI 工具，依七大領域分類"
        delay={150}
      />
      <EntryCard
        icon="extension"
        title="Skills 專區"
        desc="把備課技能裝進你的 AI Agent"
        delay={230}
      />
      <EntryCard
        icon="folder_shared"
        title="教材共享"
        desc="分享一份教材，看見 500+ 份"
        delay={310}
      />
      <EntryCard icon="co_present" title="研習簡報" desc="輸入活動代碼，直達研習簡報" delay={390} />
      <EntryCard icon="mail" title="研習邀請" desc="三步驟排版好邀請信草稿" delay={470} />
    </div>
    <Footer />
  </Stage>
);

const Divider = ({
  index,
  icon,
  morphId,
  title,
  sub,
}: {
  index: string;
  icon: string;
  morphId: string;
  title: string;
  sub: string;
}) => (
  <Stage dots>
    <div style={{ position: 'absolute', left: 200, top: 380 }}>
      <MorphElement id={morphId}>
        <div>
          <Tile icon={icon} size={320} radius={88} iconSize={176} />
        </div>
      </MorphElement>
    </div>
    <div style={{ position: 'absolute', left: 620, top: 0, bottom: 0 }}>
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
              fontSize: 160,
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
        </Rise>
        <Rise delay={260} style={{ marginTop: 12 }}>
          <div style={{ fontSize: 40, color: muted }}>{sub}</div>
        </Rise>
      </div>
    </div>
  </Stage>
);

const ToolsDivider: Page = () => (
  <Divider
    index="01"
    icon="widgets"
    morphId="tile-tools"
    title="工具選單"
    sub="60+ 個 AI 工具 · 七大領域分類"
  />
);
ToolsDivider.transition = morphTransition;

const DomainCard = ({
  icon,
  name,
  desc,
  delay,
  hot = false,
}: {
  icon: string;
  name: string;
  desc: string;
  delay: number;
  hot?: boolean;
}) => (
  <Rise
    delay={delay}
    style={{
      ...glass,
      width: 399,
      height: 326,
      padding: '40px 36px',
      display: 'flex',
      flexDirection: 'column',
      ...(hot
        ? {
            background: `linear-gradient(150deg, rgba(56, 163, 165, 0.92), ${deep})`,
            color: '#ffffff',
          }
        : {}),
    }}
  >
    {hot ? (
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 24,
          background: 'rgba(255, 255, 255, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name={icon} size={44} color="#ffffff" />
      </div>
    ) : (
      <Tile icon={icon} size={80} radius={24} iconSize={44} tone="soft" />
    )}
    <div style={{ fontSize: 40, fontWeight: 900, marginTop: 32 }}>{name}</div>
    <div
      style={{
        fontSize: 26,
        lineHeight: 1.55,
        marginTop: 14,
        color: hot ? 'rgba(255, 255, 255, 0.85)' : muted,
      }}
    >
      {desc}
    </div>
  </Rise>
);

const Domains: Page = () => (
  <Stage>
    <HeaderRow icon="widgets" morphId="tile-tools" title="七大領域，對應課堂需求" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 260,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 399px)',
        gap: 28,
      }}
    >
      <DomainCard
        icon="menu_book"
        name="國語文"
        desc="文本簡化、朗讀輔助、識字與閱讀理解"
        delay={300}
      />
      <DomainCard icon="calculate" name="數學" desc="互動教具、視覺化概念、步驟拆解" delay={360} />
      <DomainCard
        icon="translate"
        name="英語文"
        desc="中英發音、朗讀練習、單字與句型"
        delay={420}
      />
      <DomainCard
        icon="assignment"
        name="教材與評量"
        desc="差異化教材、個別化出題、評量調整"
        delay={480}
      />
      <DomainCard
        icon="business_center"
        name="行政工具"
        desc="IEP 目標生成，提升行政效率"
        delay={540}
      />
      <DomainCard
        icon="diversity_3"
        name="特需領域"
        desc="社會技巧、學習策略、溝通訓練"
        delay={600}
      />
      <DomainCard
        icon="accessibility_new"
        name="輔助科技"
        desc="語音報讀、圖片生成、文字辨識"
        delay={660}
      />
      <DomainCard
        icon="local_fire_department"
        name="熱門工具"
        desc="老師最常用的 6 個核心備課工具"
        delay={720}
        hot
      />
    </div>
    <Footer />
  </Stage>
);
Domains.transition = morphTransition;

const TopCard = ({
  rank,
  icon,
  name,
  desc,
  delay,
}: {
  rank: string;
  icon: string;
  name: string;
  desc: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    motion={BOUNCY}
    style={{
      ...glass,
      width: 538,
      height: 320,
      padding: '40px 44px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          ...gradText,
        }}
      >
        {rank}
      </span>
      <Tile icon={icon} size={72} radius={22} iconSize={40} tone="soft" />
    </div>
    <div style={{ fontSize: 40, fontWeight: 900, marginTop: 36 }}>{name}</div>
    <div style={{ fontSize: 26, lineHeight: 1.55, color: muted, marginTop: 12 }}>{desc}</div>
  </Rise>
);

const Top6: Page = () => (
  <Stage>
    <HeaderRow icon="local_fire_department" title="熱門工具 TOP 6" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 260,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 538px)',
        gap: 32,
      }}
    >
      <TopCard
        rank="01"
        icon="edit_note"
        name="IEP 目標生成器"
        desc="根據需求，快速生成 IEP 學期與學年目標"
        delay={120}
      />
      <TopCard
        rank="02"
        icon="center_focus_strong"
        name="專注力學習單生成器"
        desc="舒爾特方格、符號搜尋等 15 種視知覺練習"
        delay={190}
      />
      <TopCard
        rank="03"
        icon="groups"
        name="社會技巧備課大師"
        desc="依課綱生成教案、學習單與社會故事圖卡"
        delay={260}
      />
      <TopCard
        rank="04"
        icon="spellcheck"
        name="詞彙教材一鍵通"
        desc="貼上文章，自動產生圖卡練習單與測驗單"
        delay={330}
      />
      <TopCard
        rank="05"
        icon="menu_book"
        name="國文課堂學習單"
        desc="逐段精讀、聽圈練字、脈絡表與隨堂測驗"
        delay={400}
      />
      <TopCard
        rank="06"
        icon="auto_fix_high"
        name="課文簡化系統"
        desc="依學生程度一鍵簡化，附 AI 圖解與 Word 檔"
        delay={470}
      />
    </div>
    <Footer />
  </Stage>
);

const FlowCard = ({
  n,
  icon,
  title,
  desc,
  last = false,
}: {
  n: number;
  icon: string;
  title: string;
  desc: string;
  last?: boolean;
}) => (
  <StepIn style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <div
      style={{
        ...glass,
        width: 340,
        height: 420,
        padding: '44px 36px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Tile icon={icon} size={96} radius={28} iconSize={52} />
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: '0.14em',
          color: 'var(--osd-accent)',
          marginTop: 40,
        }}
      >
        STEP {n}
      </div>
      <div style={{ fontSize: 42, fontWeight: 900, marginTop: 10 }}>{title}</div>
      <div style={{ fontSize: 28, lineHeight: 1.55, color: muted, marginTop: 14 }}>{desc}</div>
    </div>
    <div style={{ width: 52, display: 'flex', justifyContent: 'center' }}>
      {!last && <Icon name="arrow_forward" size={48} color="rgba(56, 163, 165, 0.7)" />}
    </div>
  </StepIn>
);

const Walkthrough: Page = () => (
  <Stage>
    <HeaderRow icon="auto_fix_high" title="工具示範：課文簡化系統" />
    <Rise delay={100} style={{ position: 'absolute', left: 256, top: 214 }}>
      <p style={{ fontSize: 30, color: muted, margin: 0 }}>從一篇課文，到一份可以直接印的學習單</p>
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 340,
        display: 'flex',
        gap: 16,
      }}
    >
      <Steps>
        <Step duration={1}>
          <FlowCard n={1} icon="content_paste" title="貼上課文" desc="直接貼上課本文字" />
        </Step>
        <Step duration={1}>
          <FlowCard n={2} icon="tune" title="選擇程度" desc="依學生能力調整難度" />
        </Step>
        <Step duration={1}>
          <FlowCard
            n={3}
            icon="auto_awesome"
            title="AI 逐段圖解"
            desc="簡化改寫、情境插圖、多元題型"
          />
        </Step>
        <Step duration={1}>
          <FlowCard n={4} icon="description" title="匯出 Word" desc="印出來就是一份學習單" last />
        </Step>
      </Steps>
    </div>
    <Footer />
  </Stage>
);

const PickCard = ({
  domain,
  icon,
  name,
  desc,
  delay,
}: {
  domain: string;
  icon: string;
  name: string;
  desc: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    style={{
      ...glass,
      width: 399,
      height: 500,
      padding: '44px 36px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <span
      style={{
        alignSelf: 'flex-start',
        fontSize: 24,
        fontWeight: 700,
        color: 'var(--osd-accent)',
        background: 'rgba(56, 163, 165, 0.12)',
        borderRadius: 999,
        padding: '6px 20px',
      }}
    >
      {domain}
    </span>
    <div style={{ marginTop: 40 }}>
      <Tile icon={icon} size={96} radius={28} iconSize={52} />
    </div>
    <div style={{ fontSize: 38, fontWeight: 900, marginTop: 36 }}>{name}</div>
    <div style={{ fontSize: 28, lineHeight: 1.55, color: muted, marginTop: 14 }}>{desc}</div>
  </Rise>
);

const Picks: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 120 }}>
      <Rise>
        <div style={eyebrow}>各領域精選</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 24 }}>
        <h2 style={h2}>每個領域，都有對應的好幫手</h2>
      </Rise>
    </div>
    <div style={{ position: 'absolute', left: 120, top: 390, display: 'flex', gap: 28 }}>
      <PickCard
        domain="國語文"
        icon="spellcheck"
        name="字族文學習單"
        desc="輸入目標字，生成字族文、情境圖與練習題"
        delay={150}
      />
      <PickCard
        domain="數學"
        icon="draw"
        name="數學應用題畫家"
        desc="貼上應用題，AI 畫出題意示意圖"
        delay={230}
      />
      <PickCard
        domain="英語文"
        icon="stairs"
        name="階梯式單字學習單"
        desc="7 個階梯，從辨識一路練到自主拼寫"
        delay={310}
      />
      <PickCard
        domain="特需領域"
        icon="forum"
        name="社會性故事畫家"
        desc="寫下校園事件，畫成四格或六格漫畫"
        delay={390}
      />
    </div>
    <Footer />
  </Stage>
);

const HeartButton = () => {
  const active = useIsActivePage();
  const popStyle: CSSProperties = active
    ? { animation: `smx-pop ${BOUNCY.ms}ms ${BOUNCY.easing} 700ms both` }
    : {};
  return (
    <div style={{ position: 'relative', width: 84, height: 84 }}>
      {active && (
        <div
          className="smx-ripple"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `3px solid ${heart}`,
            animation: 'smx-ripple 700ms cubic-bezier(0, 0, 0.2, 1) 720ms both',
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 10px 24px -12px rgba(15, 23, 42, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="favorite" size={48} color="#cbd5e1" />
      </div>
      <div
        className={active ? 'smx-anim' : undefined}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...popStyle,
        }}
      >
        <Icon name="favorite" size={48} color={heart} />
      </div>
    </div>
  );
};

const Favorites: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 0, bottom: 0, width: 760 }}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Rise>
          <div style={eyebrow}>我的最愛</div>
        </Rise>
        <Rise delay={100} style={{ marginTop: 28 }}>
          <h2 style={{ ...h2, fontSize: 80 }}>
            常用工具，
            <br />
            <span style={gradText}>一鍵收藏。</span>
          </h2>
        </Rise>
        <Rise delay={200} style={{ marginTop: 40 }}>
          <p style={{ fontSize: 34, lineHeight: 1.6, color: muted, margin: 0 }}>
            在工具卡片按下愛心，
            <br />
            下次打開首頁就在最上面。
          </p>
        </Rise>
        <Rise delay={300} style={{ marginTop: 44 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 26,
              color: deep,
              background: 'rgba(56, 163, 165, 0.10)',
              borderRadius: 20,
              padding: '16px 26px',
            }}
          >
            <Icon name="smart_toy" size={30} color={deep} />
            收藏存在這台電腦的瀏覽器裡，換電腦會不見喔
          </div>
        </Rise>
      </div>
    </div>
    <div style={{ position: 'absolute', left: 1040, top: 230, width: 760 }}>
      <Rise
        kind="materialize"
        delay={150}
        style={{ ...glass, padding: '48px 48px 52px', position: 'relative' }}
      >
        <div style={{ position: 'absolute', right: 40, top: 40 }}>
          <HeartButton />
        </div>
        <Tile icon="auto_fix_high" size={104} radius={30} iconSize={56} />
        <span
          style={{
            display: 'inline-block',
            marginTop: 32,
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--osd-accent)',
            background: 'rgba(56, 163, 165, 0.12)',
            borderRadius: 999,
            padding: '6px 20px',
          }}
        >
          教材調整
        </span>
        <div style={{ fontSize: 48, fontWeight: 900, marginTop: 18 }}>課文簡化系統</div>
        <div style={{ fontSize: 28, lineHeight: 1.55, color: muted, marginTop: 12 }}>
          依學生程度一鍵簡化課文，生成 AI 圖解與 Word 學習單。
        </div>
      </Rise>
      <Rise
        delay={1000}
        motion={BOUNCY}
        style={{
          ...glass,
          marginTop: 32,
          padding: '28px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          borderRadius: 28,
        }}
      >
        <Icon name="favorite" size={40} color={heart} />
        <span style={{ fontSize: 30, fontWeight: 700 }}>我的最愛</span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 28,
            fontWeight: 700,
            color: '#ffffff',
            background: `linear-gradient(135deg, var(--osd-accent), ${deep})`,
            borderRadius: 999,
            padding: '10px 28px',
          }}
        >
          課文簡化系統
        </span>
      </Rise>
    </div>
    <Footer />
  </Stage>
);

const SkillsDivider: Page = () => (
  <Divider
    index="02"
    icon="extension"
    morphId="tile-skills"
    title="Skills 專區"
    sub="把備課技能，裝進你的 AI Agent"
  />
);
SkillsDivider.transition = morphTransition;

const HowRow = ({ n, title, detail }: { n: string; title: string; detail: ReactNode }) => (
  <StepIn
    style={{
      ...glass,
      width: 700,
      height: 150,
      borderRadius: 28,
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '0 40px',
    }}
  >
    <span
      style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, var(--osd-accent), ${deep})`,
        color: '#ffffff',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 36,
        fontWeight: 800,
      }}
    >
      {n}
    </span>
    <div>
      <div style={{ fontSize: 38, fontWeight: 900 }}>{title}</div>
      <div style={{ fontSize: 26, color: muted, marginTop: 8 }}>{detail}</div>
    </div>
  </StepIn>
);

const SkillsHow: Page = () => (
  <Stage>
    <HeaderRow icon="extension" morphId="tile-skills" title="複製、貼上，就裝好了" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 290,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <Steps>
        <Step duration={1}>
          <HowRow n="1" title="複製安裝指令" detail="點一下卡片上的指令框就複製好了" />
        </Step>
        <Step duration={1}>
          <HowRow n="2" title="貼到你的 AI Agent" detail="Claude、Codex 等 Agent 對話框都可以" />
        </Step>
        <Step duration={1}>
          <HowRow n="3" title="開始使用專業功能" detail="AI 立刻學會這項特教備課技能" />
        </Step>
      </Steps>
    </div>
    <Rise delay={300} kind="materialize" style={{ position: 'absolute', right: 120, top: 290 }}>
      <BrowserFrame src={imgSkills} width={860} url="spedmix.pages.dev/skills" />
    </Rise>
    <Footer />
  </Stage>
);
SkillsHow.transition = morphTransition;

const SkillCard = ({
  icon,
  name,
  desc,
  delay,
}: {
  icon: string;
  name: string;
  desc: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    style={{
      ...glass,
      width: 538,
      height: 208,
      borderRadius: 30,
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      gap: 28,
    }}
  >
    <Tile icon={icon} size={88} radius={26} iconSize={48} />
    <div>
      <div style={{ fontSize: 34, fontWeight: 900 }}>{name}</div>
      <div style={{ fontSize: 24, lineHeight: 1.5, color: muted, marginTop: 8, width: 340 }}>
        {desc}
      </div>
    </div>
  </Rise>
);

const NineSkills: Page = () => (
  <Stage>
    <HeaderRow icon="extension" title="9 個教學 Skills" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 252,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 538px)',
        gap: 24,
      }}
    >
      <SkillCard
        icon="description"
        name="四合一考卷生成"
        desc="一份教材，產出紙本、報讀網頁、講解簡報與解析"
        delay={100}
      />
      <SkillCard
        icon="volume_up"
        name="紙本考卷轉報讀"
        desc="考卷變成語音點讀網頁，視障生也能用"
        delay={150}
      />
      <SkillCard
        icon="auto_fix_high"
        name="差異化學習單"
        desc="依程度簡化教材，產出學習單與小測驗"
        delay={200}
      />
      <SkillCard
        icon="functions"
        name="數題數題"
        desc="一題數學題，生成同類型漸進練習"
        delay={250}
      />
      <SkillCard
        icon="stairs"
        name="互動式步驟數學"
        desc="自動拆解解題步驟，做成互動網頁"
        delay={300}
      />
      <SkillCard
        icon="reorder"
        name="重組句子製作"
        desc="拖曳網頁加紙本 Word，附語音發音"
        delay={350}
      />
      <SkillCard
        icon="edit_note"
        name="國文學習單生成"
        desc="雙版本學習單、逐段圖文與講解網頁"
        delay={400}
      />
      <SkillCard
        icon="auto_stories"
        name="自製電子書"
        desc="A4 紙本加可畫記的投影教學網頁"
        delay={450}
      />
      <SkillCard
        icon="sports_esports"
        name="遊戲化測驗"
        desc="盲盒、大富翁、3D 跑酷式互動測驗"
        delay={500}
      />
    </div>
    <Footer />
  </Stage>
);

const TicketCard = ({
  label,
  target,
  suffix,
  unit,
  delay,
  emphasis = false,
}: {
  label: string;
  target: number;
  suffix?: string;
  unit: string;
  delay: number;
  emphasis?: boolean;
}) => {
  const value = useCountUp(target, delay + 300, 1800);
  return (
    <Rise
      delay={delay}
      kind="materialize"
      style={{
        ...glass,
        width: 600,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...(emphasis
          ? {
              background: `linear-gradient(150deg, rgba(56, 163, 165, 0.94), ${deep})`,
              color: '#ffffff',
            }
          : {}),
      }}
    >
      <div style={{ fontSize: 36, fontWeight: 700, opacity: 0.85 }}>{label}</div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 176,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
          fontVariantNumeric: 'tabular-nums',
          marginTop: 8,
          ...(emphasis ? {} : gradText),
        }}
      >
        {value}
        {suffix}
      </div>
      <div style={{ fontSize: 36, fontWeight: 700 }}>{unit}</div>
    </Rise>
  );
};

const Sharing: Page = () => (
  <Stage dots>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 130,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Rise>
        <div style={eyebrow}>教材共享 · 入場券機制</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 24 }}>
        <h2 style={h2}>分享一份，換到一整座教材庫</h2>
      </Rise>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 360,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 48,
      }}
    >
      <TicketCard label="你分享" target={1} unit="份教材" delay={200} />
      <Rise delay={500} motion={BOUNCY}>
        <Icon name="arrow_forward" size={96} color="var(--osd-accent)" />
      </Rise>
      <TicketCard
        label="就能看見"
        target={500}
        suffix="+"
        unit="份老師的教材"
        delay={650}
        emphasis
      />
    </div>
    <Rise
      delay={900}
      style={{ position: 'absolute', left: 0, right: 0, top: 820, textAlign: 'center' }}
    >
      <p style={{ fontSize: 32, color: muted, margin: 0 }}>
        越多老師分享，每個人能用的資源就越多。
      </p>
    </Rise>
    <Footer />
  </Stage>
);

const ShotColumn = ({
  src,
  url,
  icon,
  title,
  desc,
  delay,
}: {
  src: string;
  url: string;
  icon: string;
  title: string;
  desc: string;
  delay: number;
}) => (
  <Rise delay={delay} kind="materialize" style={{ width: 760 }}>
    <BrowserFrame src={src} width={760} url={url} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 36 }}>
      <Tile icon={icon} size={72} radius={22} iconSize={40} tone="soft" />
      <div>
        <div style={{ fontSize: 40, fontWeight: 900 }}>{title}</div>
        <div style={{ fontSize: 28, color: muted, marginTop: 6 }}>{desc}</div>
      </div>
    </div>
  </Rise>
);

const Workshops: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 110 }}>
      <Rise>
        <div style={eyebrow}>研習專區</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 20 }}>
        <h2 style={h2}>研習前後，都在同一個網站</h2>
      </Rise>
    </div>
    <div style={{ position: 'absolute', left: 160, top: 284, display: 'flex', gap: 80 }}>
      <ShotColumn
        src={imgPresentation}
        url="spedmix.pages.dev/presentation"
        icon="co_present"
        title="研習簡報入口"
        desc="輸入活動代碼，直接打開該場簡報"
        delay={150}
      />
      <ShotColumn
        src={imgInvite}
        url="spedmix.pages.dev/workshop-invitation"
        icon="mail"
        title="研習邀請小幫手"
        desc="選時段、填資料，自動排版邀請信"
        delay={280}
      />
    </div>
    <Footer />
  </Stage>
);

const Social = ({ platform, handle }: { platform: string; handle: string }) => (
  <span
    style={{
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
  </span>
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
          讓備課，<span style={gradText}>更輕鬆一點。</span>
        </h2>
      </Rise>
      <Rise delay={200} motion={BOUNCY} style={{ marginTop: 64 }}>
        <div
          style={{
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
        </div>
      </Rise>
      <Rise delay={380} style={{ marginTop: 64, display: 'flex', gap: 20 }}>
        <Social platform="Facebook" handle="米克師" />
        <Social platform="Instagram" handle="@spedmix2025" />
        <Social platform="Threads" handle="@spedmix2025" />
      </Rise>
      <Rise delay={500} style={{ marginTop: 56 }}>
        <p style={{ fontSize: 22, color: muted, margin: 0 }}>
          © 2026 SpedMix™ 米克師™ · 採用 CC BY-NC-SA 4.0 授權，歡迎非商業轉載與改編
        </p>
      </Rise>
    </div>
  </Stage>
);
Closing.transition = settle;

export const meta: SlideMeta = {
  title: '米克師｜AI備課幫手 網站導覽',
  createdAt: '2026-10-05T00:30:51.534Z',
};

export const notes: (string | undefined)[] = [
  `大家好，今天要跟大家介紹一個專門為特教老師做的備課網站：米克師｜AI備課幫手。
網址很好記：spedmix.pages.dev。`,
  `先講為什麼需要它。特教班或資源班，一個班常常就有十種程度。
（按一下）課文太難，要逐段簡化。
（按一下）同一份學習單，要分層出好幾版。
（按一下）評量也要調整：報讀、放大、降低書寫負荷。
這些都很花時間。`,
  `米克師就是要把這些專業的調整，變成一鍵完成。
老師把教材貼進去，AI 依學生程度產出可以直接用的學習單和網頁。`,
  `用幾個數字快速認識：七大領域、六十多個 AI 工具、九個教學 Skills，還有超過五百份老師共享的教材。`,
  `網站上方有五個入口：工具選單、Skills 專區、教材共享、研習簡報、研習邀請。接下來一個一個看。`,
  `第一個，也是最常用的：工具選單。`,
  `工具依七大領域分類：國語文、數學、英語文、教材與評量、行政、特需領域、輔助科技。
另外還有一個「熱門工具」，收錄老師最常用的六個。`,
  `這就是熱門 TOP 6。IEP 目標生成器幫你寫學期與學年目標；專注力學習單有 15 種練習；
社會技巧備課大師、詞彙教材一鍵通、國文課堂學習單、課文簡化系統，都是老師回饋最常用的。`,
  `用課文簡化系統示範一次流程。
（按一下）貼上課文。（按一下）選學生程度。
（按一下）AI 逐段簡化、配情境插圖、出多元題型。（按一下）匯出 Word，印出來就能用。`,
  `每個領域都有代表工具：國語文的字族文學習單、數學的應用題畫家、英語文的階梯式單字學習單，
還有特需領域的社會性故事畫家，把校園事件畫成四格漫畫。`,
  `小技巧：在工具卡片上按愛心，就會收進「我的最愛」，下次打開就在最上面。
提醒一下，收藏是存在這台電腦的瀏覽器裡，換電腦或清除瀏覽器資料就會不見。`,
  `第二個入口：Skills 專區。如果你已經在用 AI Agent，這區可以讓 AI 學會特教備課技能。`,
  `安裝只要三步。（按一下）複製安裝指令。（按一下）貼到你的 AI Agent。（按一下）就可以開始用了。`,
  `目前有九個 Skills：從四合一考卷、語音報讀，到數學、國文學習單、電子書和遊戲化測驗。`,
  `教材共享採「入場券」機制：只要分享一份自己的教材，就能看到其他老師分享的內容，目前已經超過五百份。`,
  `研習相關的也都在網站上：研習簡報入口輸入活動代碼就能打開該場簡報；
想邀請米克師去研習，可以用研習邀請小幫手，選時段、填資料，自動排版好邀請信草稿。`,
  `最後，歡迎大家多多使用，也歡迎追蹤米克師的 Facebook、Instagram 和 Threads。
網站內容採 CC BY-NC-SA 授權，非商業用途歡迎轉載改編，記得署名米克師。謝謝大家！`,
];

export default [
  Cover,
  Why,
  Answer,
  Numbers,
  SiteMap,
  ToolsDivider,
  Domains,
  Top6,
  Walkthrough,
  Picks,
  Favorites,
  SkillsDivider,
  SkillsHow,
  NineSkills,
  Sharing,
  Workshops,
  Closing,
] satisfies Page[];
