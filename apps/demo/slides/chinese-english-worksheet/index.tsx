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
import imgCharacterFamily from './assets/character-family-screenshot.png';
import imgChineseReading from './assets/chinese-scaffold-reading.webp';
import imgChineseTranslate from './assets/chinese-translate-screenshot.png';
import imgMathPrint from './assets/math-print-preview.webp';
import imgSpecialEdEnglish from './assets/special-ed-english-screenshot.png';
import imgSteppedVocab from './assets/stepped-vocab-screenshot.png';
import imgVocabPractice from './assets/vocab-practice-screenshot.png';

export const design: DesignSystem = {
  palette: { bg: '#F0F4F8', text: '#1e293b', accent: '#38A3A5' },
  fonts: {
    display:
      '"Outfit", "Chiron GoRound TC", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body: '"Chiron GoRound TC", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 132, body: 36 },
  radius: 36,
};

const deep = '#22577A';
const muted = '#64748b';
const rose = '#f43f5e';

const SLIDE_ID = 'chinese-english-worksheet';

const toolUrls = {
  chineseLessonWorksheet: 'https://spedmix.pages.dev/chinese-lesson-worksheet',
  chineseTranslate: 'https://spedmix.pages.dev/chinesetranslate',
  characterFamily: 'https://spedmix.pages.dev/character-family-generator',
  specialEdEnglish: 'https://spedmix.pages.dev/special-ed-english-worksheet',
  steppedVocab: 'https://spedmix.pages.dev/stepped-vocab-worksheet',
  vocabPractice: 'https://spedmix.pages.dev/vocab-practice-worksheet',
  ebookHome: 'https://spedmix.pages.dev/',
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
  'auto_awesome',
  'auto_stories',
  'chat_bubble',
  'check',
  'face',
  'favorite',
  'folder_shared',
  'history_edu',
  'lightbulb',
  'menu_book',
  'open_in_new',
  'pause',
  'photo_library',
  'play_arrow',
  'quiz',
  'remove',
  'restart_alt',
  'school',
  'sentiment_dissatisfied',
  'spellcheck',
  'stairs',
  'task_alt',
  'timer',
  'translate',
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

const css = `
@keyframes cew-rise { from { opacity: 0; transform: translateY(36px); } to { opacity: 1; transform: none; } }
@keyframes cew-materialize { from { opacity: 0; transform: scale(0.94); filter: blur(18px); } to { opacity: 1; transform: none; filter: blur(0); } }
@keyframes cew-pop { from { opacity: 0; transform: scale(0.2); } to { opacity: 1; transform: none; } }
@keyframes cew-fade { from { opacity: 0; } to { opacity: 1; } }
[data-osd-step="revealed"] > .cew-step { animation: cew-rise ${SOFT.ms}ms ${SOFT.easing} both; }
.cew-link { transition: transform 160ms ease-out; }
.cew-link:active { transform: scale(0.97); transition-duration: 80ms; }
@media (prefers-reduced-motion: reduce) {
  .cew-anim, [data-osd-step="revealed"] > .cew-step {
    animation-name: cew-fade !important;
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

const brandGradient = `linear-gradient(135deg, var(--osd-accent) 0%, ${deep} 100%)`;

const gradText: CSSProperties = {
  background: brandGradient,
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
      className={active ? 'cew-anim' : undefined}
      style={{
        ...style,
        animation: active
          ? `cew-${kind} ${motion.ms}ms ${motion.easing} ${delay}ms both`
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
    <div className={active ? 'cew-step' : undefined} style={style}>
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
        米克師<span style={{ margin: '0 12px', opacity: 0.4 }}>|</span>一鍵搞定國英適性教材
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

const Pill = ({ children }: { children: ReactNode }) => (
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
          maxWidth: width - 220,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
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

const shortUrl = (href: string) => href.replace(/^https?:\/\//, '').replace(/\/$/, '');

// ============================================================
// 開場
// ============================================================

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
          從使用 AI 到打造適性教材
        </Chip>
      </Rise>
      <Rise delay={120} kind="materialize" style={{ marginTop: 44 }}>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          一鍵搞定<span style={gradText}>國英適性教材</span>
        </h1>
      </Rise>
      <Rise delay={260} style={{ marginTop: 28 }}>
        <div style={{ fontSize: 84, fontWeight: 900, lineHeight: 1.2, letterSpacing: '0.02em' }}>
          特教老師的隨身備課神器
        </div>
      </Rise>
      <Rise delay={380} style={{ marginTop: 28 }}>
        <p style={{ fontSize: 36, color: muted, margin: 0, lineHeight: 1.5 }}>
          國文學習單 ‧ 英文資源班教材 ‧ 雙模式電子書
        </p>
      </Rise>
      <Rise
        delay={500}
        motion={BOUNCY}
        style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 20 }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            padding: '20px 48px',
            borderRadius: 999,
            background: brandGradient,
            color: '#ffffff',
            fontSize: 34,
            fontWeight: 700,
            boxShadow: '0 24px 48px -20px rgba(34, 87, 122, 0.6)',
          }}
        >
          主講人 ‧ 朱旆誼
        </div>
        <Chip>@spedmix2025</Chip>
      </Rise>
    </div>
  </Stage>
);
Cover.transition = settle;

const ProfileList = ({
  icon,
  title,
  items,
  delay,
}: {
  icon: string;
  title: string;
  items: [string, string][];
  delay: number;
}) => (
  <Rise
    delay={delay}
    style={{ ...glass, padding: '40px 48px', display: 'flex', gap: 36, alignItems: 'flex-start' }}
  >
    <Tile icon={icon} size={88} radius={26} iconSize={48} />
    <div>
      <div style={{ fontSize: 44, fontWeight: 900 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
        {items.map(([org, role]) => (
          <div key={org} style={{ fontSize: 32, lineHeight: 1.4 }}>
            <strong style={{ fontWeight: 900 }}>{org}</strong>
            <span style={{ color: muted }}> {role}</span>
          </div>
        ))}
      </div>
    </div>
  </Rise>
);

const Speaker: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 110 }}>
      <Rise>
        <div style={eyebrow}>關於我</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 20 }}>
        <h2 style={h2}>介紹</h2>
      </Rise>
    </div>
    <Rise
      delay={150}
      kind="materialize"
      style={{
        ...glass,
        position: 'absolute',
        left: 120,
        top: 300,
        width: 520,
        height: 620,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
      }}
    >
      <div
        style={{
          width: 320,
          height: 320,
          borderRadius: '50%',
          padding: 8,
          background: `linear-gradient(145deg, #4FBDBE 0%, var(--osd-accent) 45%, ${deep} 100%)`,
          boxShadow: '0 30px 60px -24px rgba(34, 87, 122, 0.55)',
        }}
      >
        <img
          src={imgHeadshot}
          alt="講師照片"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block',
            border: '6px solid #ffffff',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, fontWeight: 900 }}>
        朱旆誼
      </div>
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 688,
        top: 300,
        width: 1112,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <ProfileList
        icon="school"
        title="學歷"
        delay={250}
        items={[
          ['國立彰化師範大學', '特殊教育學系（資訊工程輔系）'],
          ['國立東華大學', '資訊管理所'],
          ['國立台灣師範大學', '資訊教育學系博士班（就讀中）'],
        ]}
      />
      <ProfileList
        icon="work"
        title="經歷"
        delay={350}
        items={[
          ['花蓮縣平和國中', '資源班教師（兼巡迴支援）'],
          ['宜蘭縣凱旋國中', '資源班教師'],
        ]}
      />
    </div>
    <Footer />
  </Stage>
);

const SiteColumn = ({
  href,
  label,
  src,
  icon,
  title,
  desc,
  delay,
}: {
  href: string;
  label: string;
  src: string;
  icon: string;
  title: string;
  desc: string;
  delay: number;
}) => (
  <Rise delay={delay} kind="materialize" style={{ width: 528 }}>
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="cew-link"
      style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}
    >
      <BrowserFrame src={src} width={528} url={shortUrl(href)} />
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginTop: 32 }}>
        <Tile icon={icon} size={72} radius={22} iconSize={40} tone="soft" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Pill>{label}</Pill>
          <div style={{ fontSize: 40, fontWeight: 900 }}>{title}</div>
          <div style={{ fontSize: 24, lineHeight: 1.55, color: muted }}>{desc}</div>
        </div>
      </div>
    </a>
  </Rise>
);

const MixerSites: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 110 }}>
      <Rise>
        <div style={eyebrow}>三個入口</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 20 }}>
        <h2 style={h2}>本人相關網站</h2>
      </Rise>
    </div>
    <div style={{ position: 'absolute', left: 120, top: 290, display: 'flex', gap: 48 }}>
      <SiteColumn
        href={mixerSiteUrls.prep}
        label="備課入口"
        src={imgMixerAiPrep}
        icon="auto_awesome"
        title="AI備課幫手"
        desc="特教老師生成教材、學習單、課程素材與備課工具的主要入口。"
        delay={150}
      />
      <SiteColumn
        href={mixerSiteUrls.share}
        label="共享入口"
        src={imgMixerShare}
        icon="folder_shared"
        title="特教教材共享"
        desc="整理可分享的特教教材、工具與教學資源，方便快速找到可改用的素材。"
        delay={250}
      />
      <SiteColumn
        href={mixerSiteUrls.teaching}
        label="學生入口"
        src={imgMixerTeaching}
        icon="stairs"
        title="步步練"
        desc="提供學生端使用的學習活動與互動教材，讓自學與課堂練習更容易進入。"
        delay={350}
      />
    </div>
    <Footer />
  </Stage>
);

const parts = [
  {
    num: '01',
    icon: 'menu_book',
    module: '國語文模組',
    name: '國語文適性教材',
    sub: '課文鷹架與識字讀本',
    items: ['國文課堂學習單', '文言文逐句翻譯', '字族文生成器'],
  },
  {
    num: '02',
    icon: 'translate',
    module: '英語文模組',
    name: '英語文適性教材',
    sub: '分鏡故事與階梯單字',
    items: ['英文資源班學習單', '階梯式單字學習單', '單字練習卷生成'],
  },
  {
    num: '03',
    icon: 'auto_stories',
    module: '自製電子書',
    name: '雙模式自製電子書',
    sub: '大屏教學與一鍵白卷',
    items: ['大屏互動教學 / 板書', '學生端一鍵 A4 乾淨列印', '一套教材兩種教學情境'],
  },
] as const;

const Agenda: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 110 }}>
      <Rise>
        <div style={eyebrow}>今日大綱 ‧ 三大核心實踐 ‧ 模組化流程</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 20 }}>
        <h2 style={h2}>特教語文適性教學工作流</h2>
      </Rise>
    </div>
    <div style={{ position: 'absolute', left: 120, top: 320, display: 'flex', gap: 48 }}>
      {parts.map((part, index) => (
        <Rise
          key={part.num}
          delay={150 + index * 90}
          motion={BOUNCY}
          style={{
            ...glass,
            width: 528,
            height: 600,
            padding: '44px 44px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Tile icon={part.icon} size={96} radius={28} iconSize={52} />
            <span
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: 56,
                fontWeight: 800,
                letterSpacing: '-0.03em',
                ...gradText,
              }}
            >
              PART {part.num}
            </span>
          </div>
          <div style={{ marginTop: 36 }}>
            <Pill>{part.module}</Pill>
          </div>
          <div style={{ fontSize: 44, fontWeight: 900, marginTop: 18 }}>{part.name}</div>
          <div style={{ fontSize: 28, color: muted, marginTop: 8 }}>{part.sub}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 'auto' }}>
            {part.items.map((item, i) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  fontSize: 27,
                  fontWeight: 700,
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    flexShrink: 0,
                    background: 'rgba(56, 163, 165, 0.12)',
                    color: 'var(--osd-accent)',
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: 20,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item}
              </div>
            ))}
          </div>
        </Rise>
      ))}
    </div>
    <Footer />
  </Stage>
);

// ============================================================
// 章節頁與工具頁
// ============================================================

const Divider = ({
  partIndex,
  module,
  title,
  sub,
  desc,
}: {
  partIndex: 0 | 1 | 2;
  module: string;
  title: string;
  sub: string;
  desc: string;
}) => {
  const part = parts[partIndex];
  return (
    <Stage dots>
      <div style={{ position: 'absolute', left: 200, top: 380 }}>
        <MorphElement id={`tile-part${partIndex + 1}`}>
          <div>
            <Tile icon={part.icon} size={320} radius={88} iconSize={176} />
          </div>
        </MorphElement>
      </div>
      <div style={{ position: 'absolute', left: 620, right: 100, top: 0, bottom: 0 }}>
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
                fontSize: 40,
                fontWeight: 800,
                color: 'var(--osd-accent)',
              }}
            >
              PART {part.num} · {module}
            </div>
          </Rise>
          <Rise delay={160} style={{ marginTop: 12 }}>
            <div
              style={{
                fontFamily: 'var(--osd-font-display)',
                fontSize: 108,
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </div>
          </Rise>
          <Rise delay={240} style={{ marginTop: 8 }}>
            <div style={{ fontSize: 60, fontWeight: 900, lineHeight: 1.3, ...gradText }}>{sub}</div>
          </Rise>
          <Rise delay={320} style={{ marginTop: 28 }}>
            <div style={{ fontSize: 32, lineHeight: 1.55, color: muted, maxWidth: 1080 }}>
              {desc}
            </div>
          </Rise>
          <Rise delay={420} style={{ marginTop: 48, display: 'flex', gap: 16 }}>
            {parts.map((p, i) => {
              const done = i < partIndex;
              const current = i === partIndex;
              return (
                <span
                  key={p.num}
                  style={{
                    ...glass,
                    borderRadius: 999,
                    padding: '12px 28px',
                    fontSize: 26,
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    color: current ? '#ffffff' : done ? deep : muted,
                    ...(current ? { background: brandGradient, border: 'none' } : {}),
                  }}
                >
                  <Icon name={done ? 'check' : p.icon} size={30} />
                  {p.name}
                </span>
              );
            })}
          </Rise>
        </div>
      </div>
    </Stage>
  );
};

type Voice = { text: string };

const VoiceCard = ({
  who,
  icon,
  status,
  statusIcon,
  text,
  accent,
}: {
  who: string;
  icon: string;
  status: string;
  statusIcon: string;
  text: string;
  accent: string;
}) => (
  <StepIn
    style={{
      ...glass,
      width: 828,
      height: 560,
      boxSizing: 'border-box',
      padding: '52px 56px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <span
      style={{
        position: 'absolute',
        right: 40,
        top: -40,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 320,
        fontWeight: 800,
        lineHeight: 1,
        color: accent,
        opacity: 0.1,
      }}
    >
      ”
    </span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: 26,
          background: accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 18px 36px -16px ${accent}`,
        }}
      >
        <Icon name={icon} size={48} color="#ffffff" />
      </div>
      <div>
        <div style={{ fontSize: 40, fontWeight: 900 }}>{who}</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 24,
            color: muted,
            marginTop: 4,
          }}
        >
          <Icon name={statusIcon} size={26} color={accent} />
          {status}
        </div>
      </div>
    </div>
    <div
      style={{
        fontSize: 44,
        fontWeight: 700,
        lineHeight: 1.6,
        marginTop: 'auto',
        marginBottom: 'auto',
      }}
    >
      「{text}」
    </div>
  </StepIn>
);

const ToolCover = ({
  unit,
  icon,
  morphId,
  title,
  teacher,
  student,
}: {
  unit: string;
  icon: string;
  morphId: string;
  title: string;
  teacher: Voice;
  student: Voice;
}) => (
  <Stage>
    <HeaderRow icon={icon} morphId={morphId} title={title} />
    <Rise delay={100} style={{ position: 'absolute', left: 256, top: 214 }}>
      <p style={{ fontSize: 30, color: muted, margin: 0 }}>{unit} · 單元導覽 · 現場需求引導</p>
    </Rise>
    <div style={{ position: 'absolute', left: 120, top: 330, display: 'flex', gap: 24 }}>
      <Steps>
        <Step duration={1}>
          <VoiceCard
            who="老師心聲"
            icon="school"
            status="備課日常"
            statusIcon="chat_bubble"
            text={teacher.text}
            accent={rose}
          />
        </Step>
        <Step duration={1}>
          <VoiceCard
            who="學生心聲"
            icon="face"
            status="學習困擾"
            statusIcon="sentiment_dissatisfied"
            text={student.text}
            accent="#3b82f6"
          />
        </Step>
      </Steps>
    </div>
    <Footer />
  </Stage>
);

const ToolFeature = ({
  icon,
  morphId,
  title,
  subtitle,
  tag,
  points,
  href,
  img,
  imgLabel,
}: {
  icon: string;
  morphId: string;
  title: string;
  subtitle: string;
  tag: string;
  points: string[];
  href: string;
  img: string;
  imgLabel: string;
}) => (
  <Stage>
    <HeaderRow icon={icon} morphId={morphId} title={title} />
    <Rise delay={100} style={{ position: 'absolute', left: 256, top: 214 }}>
      <p style={{ fontSize: 30, color: muted, margin: 0 }}>{subtitle}</p>
    </Rise>
    <div style={{ position: 'absolute', left: 120, top: 316, width: 700 }}>
      <Rise delay={160} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ ...eyebrow, fontSize: 24 }}>特教鷹架核心亮點</span>
        <Pill>{tag}</Pill>
      </Rise>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
        {points.map((point, index) => (
          <Rise
            key={point}
            delay={240 + index * 80}
            style={{
              ...glass,
              height: 96,
              borderRadius: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '0 32px',
            }}
          >
            <span
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: brandGradient,
                color: '#ffffff',
                fontFamily: 'var(--osd-font-display)',
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              {index + 1}
            </span>
            <span style={{ fontSize: 32, fontWeight: 900 }}>{point}</span>
          </Rise>
        ))}
      </div>
      <Rise delay={600} motion={BOUNCY} style={{ marginTop: 32 }}>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="cew-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            padding: '18px 44px',
            borderRadius: 999,
            background: brandGradient,
            color: '#ffffff',
            fontSize: 32,
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 24px 48px -20px rgba(34, 87, 122, 0.6)',
          }}
        >
          傳送門 · 前往工具
          <Icon name="arrow_forward" size={36} />
        </a>
      </Rise>
    </div>
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 900, top: 300 }}>
      <BrowserFrame src={img} width={900} url={shortUrl(href)} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginTop: 22,
          fontSize: 26,
          color: muted,
        }}
      >
        <Icon name="photo_library" size={30} color="var(--osd-accent)" />
        {imgLabel}
      </div>
    </Rise>
    <Footer />
  </Stage>
);

// ============================================================
// 實作計時器
// ============================================================

type TimerState = { total: number; remaining: number; endAt: number | null };

const timerKey = (id: string) => `__CEW_PRACTICE_TIMER_${id}__`;

const readTimer = (id: string, minutes: number): TimerState => {
  const fallback = { total: minutes * 60, remaining: minutes * 60, endAt: null };
  try {
    const raw = localStorage.getItem(timerKey(id));
    if (!raw) return fallback;
    const saved = JSON.parse(raw) as TimerState;
    if (saved.endAt) {
      saved.remaining = Math.max(0, Math.ceil((saved.endAt - Date.now()) / 1000));
      if (saved.remaining === 0) saved.endAt = null;
    }
    return saved;
  } catch {
    return fallback;
  }
};

const writeTimer = (id: string, state: TimerState) => {
  try {
    localStorage.setItem(timerKey(id), JSON.stringify(state));
  } catch {}
};

const playChime = () => {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
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

const usePracticeTimer = (id: string, minutes: number) => {
  const [state, setState] = useState<TimerState>(() => readTimer(id, minutes));

  const commit = useCallback(
    (next: TimerState) => {
      writeTimer(id, next);
      setState(next);
    },
    [id],
  );

  useEffect(() => {
    if (!state.endAt) return;
    const endAt = state.endAt;
    const tick = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      if (remaining === 0) {
        playChime();
        commit({ ...state, remaining: 0, endAt: null });
      } else {
        setState((s) => ({ ...s, remaining }));
      }
    }, 250);
    return () => clearInterval(tick);
  }, [state, commit]);

  const running = state.endAt !== null;
  return {
    ...state,
    running,
    toggle: () => {
      if (running) commit({ ...state, endAt: null });
      else {
        const remaining = state.remaining > 0 ? state.remaining : state.total;
        commit({ ...state, remaining, endAt: Date.now() + remaining * 1000 });
      }
    },
    reset: () => commit({ total: minutes * 60, remaining: minutes * 60, endAt: null }),
    add: (sec: number) => {
      const remaining = Math.max(10, state.remaining + sec);
      commit({
        total: Math.max(remaining, state.total),
        remaining,
        endAt: running ? Date.now() + remaining * 1000 : null,
      });
    },
  };
};

const clock = (sec: number) =>
  `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

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
    className="cew-link"
    style={{
      ...(primary ? {} : glass),
      border: primary ? 'none' : glass.border,
      background: primary ? brandGradient : glass.background,
      color: primary ? '#ffffff' : 'var(--osd-text)',
      borderRadius: 999,
      padding: primary ? '16px 40px' : '14px 26px',
      fontSize: primary ? 30 : 24,
      fontWeight: 700,
      fontFamily: 'var(--osd-font-body)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: 'pointer',
      boxShadow: primary ? '0 24px 48px -20px rgba(34, 87, 122, 0.6)' : glass.boxShadow,
    }}
  >
    <Icon name={icon} size={primary ? 36 : 28} />
    {label}
  </button>
);

const PracticeTimer = ({ id, minutes }: { id: string; minutes: number }) => {
  const t = usePracticeTimer(id, minutes);
  const radius = 240;
  const circumference = 2 * Math.PI * radius;
  const ratio = t.total > 0 ? t.remaining / t.total : 0;
  const finished = t.remaining === 0;
  const gradId = `cew-ring-${id}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          ...glass,
          width: 560,
          height: 560,
          borderRadius: '50%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="560"
          height="560"
          style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4FBDBE" />
              <stop offset="100%" stopColor={deep} />
            </linearGradient>
          </defs>
          <circle
            cx="280"
            cy="280"
            r={radius}
            fill="none"
            stroke="rgba(56, 163, 165, 0.12)"
            strokeWidth="22"
          />
          <circle
            cx="280"
            cy="280"
            r={radius}
            fill="none"
            stroke={finished ? rose : `url(#${gradId})`}
            strokeWidth="22"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - ratio)}
            style={{ transition: t.running ? 'stroke-dashoffset 1s linear' : 'none' }}
          />
        </svg>
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 150,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            fontVariantNumeric: 'tabular-nums',
            ...(finished ? { color: rose } : gradText),
          }}
        >
          {clock(t.remaining)}
        </div>
        <div
          style={{
            marginTop: 16,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 26,
            fontWeight: 700,
            color: finished ? rose : t.running ? 'var(--osd-accent)' : muted,
          }}
        >
          <Icon name={finished ? 'task_alt' : t.running ? 'timer' : 'pause'} size={30} />
          {finished ? '時間到！' : t.running ? '實作進行中' : '待命中'}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 36 }}>
        <TimerButton icon="remove" label="1 分" onClick={() => t.add(-60)} />
        <TimerButton
          primary
          icon={t.running ? 'pause' : finished ? 'restart_alt' : 'play_arrow'}
          label={t.running ? '暫停計時' : finished ? '重新計時' : '開始計時'}
          onClick={finished ? t.reset : t.toggle}
        />
        <TimerButton icon="restart_alt" label="重設" onClick={t.reset} />
        <TimerButton icon="add" label="1 分" onClick={() => t.add(60)} />
      </div>
    </div>
  );
};

const Practice = ({
  num,
  toolName,
  minutes,
  task,
  links,
}: {
  num: string;
  toolName: string;
  minutes: number;
  task: string;
  links: { label: string; href: string }[];
}) => (
  <Stage dots>
    <div style={{ position: 'absolute', left: 120, top: 0, bottom: 0, width: 860 }}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Rise>
          <div style={eyebrow}>
            實作 {num} · 課堂實作 {minutes} 分鐘
          </div>
        </Rise>
        <Rise delay={100} style={{ marginTop: 24 }}>
          <h2 style={{ ...h2, fontSize: 92 }}>
            <span style={gradText}>{toolName}</span>
          </h2>
        </Rise>
        <Rise delay={200} style={{ marginTop: 32 }}>
          <p style={{ fontSize: 36, lineHeight: 1.6, color: muted, margin: 0 }}>{task}</p>
        </Rise>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 44 }}>
          {links.map(({ label, href }, index) => (
            <Rise key={href} delay={300 + index * 80} motion={BOUNCY}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="cew-link"
                style={{
                  ...glass,
                  borderRadius: 28,
                  height: 92,
                  padding: '0 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  color: 'var(--osd-text)',
                  textDecoration: 'none',
                  width: 640,
                }}
              >
                <Tile icon="open_in_new" size={56} radius={18} iconSize={30} tone="soft" />
                <span style={{ fontSize: 34, fontWeight: 900 }}>{label}</span>
                <span style={{ marginLeft: 'auto', display: 'flex' }}>
                  <Icon name="arrow_forward" size={36} color="var(--osd-accent)" />
                </span>
              </a>
            </Rise>
          ))}
        </div>
      </div>
    </div>
    <Rise
      delay={150}
      kind="materialize"
      style={{ position: 'absolute', left: 1120, top: 0, bottom: 0, display: 'flex' }}
    >
      <div style={{ margin: 'auto 0' }}>
        <PracticeTimer id={num} minutes={minutes} />
      </div>
    </Rise>
    <Footer />
  </Stage>
);

// ============================================================
// PART 01: 國語文適性教材
// ============================================================

const Part1Divider: Page = () => (
  <Divider
    partIndex={0}
    module="國語文適性模組"
    title="國語文適性教材備課"
    sub="課文鷹架與多層次讀本"
    desc="國文課堂學習單 ＋ 文言文逐句翻譯 ＋ 字族文生成器，AI 快速產出多層次適性國語文素材"
  />
);
Part1Divider.transition = morphTransition;

const ChineseLessonCover: Page = () => (
  <ToolCover
    unit="國語文備課"
    icon="menu_book"
    morphId="tile-part1"
    title="國文課堂學習單"
    teacher={{ text: '每課找圖配圖超花時間，還要手動排版修改各種注音與摘要版本…' }}
    student={{ text: '課文太長看不太懂，密密麻麻的字好想睡覺，考試又記不住…' }}
  />
);
ChineseLessonCover.transition = morphTransition;

const ChineseLessonFeature: Page = () => (
  <ToolFeature
    icon="menu_book"
    morphId="tile-part1"
    title="國文課堂學習單"
    subtitle="課文雙軌與高結構鷹架"
    tag="高結構鷹架"
    points={['原文與易讀雙軌排版', '注音田字格生字練寫', '隨段即時兩題檢核', '課文脈絡表格整理']}
    href={toolUrls.chineseLessonWorksheet}
    img={imgChineseReading}
    imgLabel="雙軌閱讀 · 原文與易讀對照"
  />
);
ChineseLessonFeature.transition = morphTransition;

const ChineseTranslateCover: Page = () => (
  <ToolCover
    unit="國語文備課"
    icon="history_edu"
    morphId="tile-chinese-translate"
    title="文言文逐句翻譯"
    teacher={{ text: '文言文對特教生如同天書，逐句解釋與手動查找注釋耗費大半節課…' }}
    student={{ text: '古文字分開認得、合在一起完全看不懂，上課聽不懂只想發呆…' }}
  />
);
ChineseTranslateCover.transition = morphTransition;

const ChineseTranslateFeature: Page = () => (
  <ToolFeature
    icon="history_edu"
    morphId="tile-chinese-translate"
    title="文言文逐句翻譯"
    subtitle="逐句白話對照與生難字詞註解"
    tag="語意理解鷹架"
    points={[
      '原文白話逐句精準對照',
      '核心生難字詞隨句註釋',
      '段落核心脈絡提煉',
      '一鍵輸出適性閱讀讀本',
    ]}
    href={toolUrls.chineseTranslate}
    img={imgChineseTranslate}
    imgLabel="白話逐句對照 · 句意註釋"
  />
);
ChineseTranslateFeature.transition = morphTransition;

const CharacterFamilyCover: Page = () => (
  <ToolCover
    unit="識字備課"
    icon="spellcheck"
    morphId="tile-character-family"
    title="字族文生成器"
    teacher={{ text: '形近字與同音字學生老是搞混，手動編寫趣味聯想故事非常燒腦…' }}
    student={{ text: '晴、睛、清、請長得都好像，考試每次都填錯部首和生字…' }}
  />
);
CharacterFamilyCover.transition = morphTransition;

const CharacterFamilyFeature: Page = () => (
  <ToolFeature
    icon="spellcheck"
    morphId="tile-character-family"
    title="字族文生成器"
    subtitle="部件歸納與趣味韻文情境"
    tag="識字記憶鷹架"
    points={[
      '聲旁與形旁字族歸納',
      '趣味短篇韻文故事脈絡',
      '田字格手寫加深記憶',
      '一鍵產出字族識字學習單',
    ]}
    href={toolUrls.characterFamily}
    img={imgCharacterFamily}
    imgLabel="字族故事 · 語境辨字"
  />
);
CharacterFamilyFeature.transition = morphTransition;

const PracticeChinese: Page = () => (
  <Practice
    num="01"
    toolName="國語文教材生成"
    minutes={5}
    task="請挑選上方任一國文工具，輸入課文或字族試做一份適性教材。"
    links={[
      { label: '國文課堂學習單', href: toolUrls.chineseLessonWorksheet },
      { label: '文言文逐句翻譯', href: toolUrls.chineseTranslate },
      { label: '字族文生成器', href: toolUrls.characterFamily },
    ]}
  />
);

// ============================================================
// PART 02: 英語文適性教材
// ============================================================

const Part2Divider: Page = () => (
  <Divider
    partIndex={1}
    module="英語文適性模組"
    title="英語文適性教材備課"
    sub="情境分鏡與階梯記憶"
    desc="英文資源班學習單 ＋ 階梯式單字 ＋ 單字練習卷，打造低焦慮特教英文學習鷹架"
  />
);
Part2Divider.transition = morphTransition;

const SpecialEdEnglishCover: Page = () => (
  <ToolCover
    unit="英語文備課"
    icon="translate"
    morphId="tile-part2"
    title="英文資源班學習單"
    teacher={{ text: '普通班英文課本句子太長太難，手動降階重畫分鏡排版耗時耗力…' }}
    student={{ text: '滿滿的英文字母不會唸也看不懂，整張考卷空白好挫折…' }}
  />
);
SpecialEdEnglishCover.transition = morphTransition;

const SpecialEdEnglishFeature: Page = () => (
  <ToolFeature
    icon="translate"
    morphId="tile-part2"
    title="英文資源班學習單"
    subtitle="情境分鏡閱讀與四線格臨摹"
    tag="分鏡故事鷹架"
    points={[
      '情境分鏡故事連環圖',
      '標準英文字母四線格練寫',
      '隨課圖文重點單字檢核',
      '一鍵 A4 乾淨作業卷列印',
    ]}
    href={toolUrls.specialEdEnglish}
    img={imgSpecialEdEnglish}
    imgLabel="分鏡故事 · 單字認讀檢核"
  />
);
SpecialEdEnglishFeature.transition = morphTransition;

const SteppedVocabCover: Page = () => (
  <ToolCover
    unit="英語文備課"
    icon="stairs"
    morphId="tile-stepped-vocab"
    title="階梯式英文單字學習單"
    teacher={{ text: '死記硬背單字學生轉頭就忘，需要循序漸進的多層次拆解鷹架…' }}
    student={{ text: '英文字母順序老是記錯，背了好多次考試還是拼不出來…' }}
  />
);
SteppedVocabCover.transition = morphTransition;

const SteppedVocabFeature: Page = () => (
  <ToolFeature
    icon="stairs"
    morphId="tile-stepped-vocab"
    title="階梯式英文單字學習單"
    subtitle="字母拆解與階梯式記憶鷹架"
    tag="階梯式鷹架"
    points={[
      '階梯設計：認讀➔填空➔拼寫',
      '圖像情境與中英雙語對照',
      '音節拆解與自然發音提示',
      '依學生起點自選練習層級',
    ]}
    href={toolUrls.steppedVocab}
    img={imgSteppedVocab}
    imgLabel="階梯練習 · 中翻英三選一"
  />
);
SteppedVocabFeature.transition = morphTransition;

const VocabPracticeCover: Page = () => (
  <ToolCover
    unit="英語評量"
    icon="quiz"
    morphId="tile-vocab-practice"
    title="單字練習卷生成器"
    teacher={{ text: '每次小考都要手動拼湊不同題型，出題加排版排整晚超累…' }}
    student={{ text: '題目字太小太擠很容易看錯行，題型太複雜會直接慌張…' }}
  />
);
VocabPracticeCover.transition = morphTransition;

const VocabPracticeFeature: Page = () => (
  <ToolFeature
    icon="quiz"
    morphId="tile-vocab-practice"
    title="單字練習卷生成器"
    subtitle="多元題型組合與一鍵出卷"
    tag="多元評量組合"
    points={[
      '多元題型：拼英／克漏／連連看',
      '特教適性大字體寬敞排版',
      '同步產出學生卷與解答卷',
      '支援隨機打亂出 AB 卷',
    ]}
    href={toolUrls.vocabPractice}
    img={imgVocabPractice}
    imgLabel="單字練習卷 · 看圖抄寫與四線格"
  />
);
VocabPracticeFeature.transition = morphTransition;

const PracticeEnglish: Page = () => (
  <Practice
    num="02"
    toolName="英語文教材生成"
    minutes={5}
    task="請挑選上方任一英文工具，輸入單字或課文試做一份適性學習單。"
    links={[
      { label: '英文資源班學習單', href: toolUrls.specialEdEnglish },
      { label: '階梯式英文單字', href: toolUrls.steppedVocab },
      { label: '單字練習卷生成', href: toolUrls.vocabPractice },
    ]}
  />
);

// ============================================================
// PART 03: 雙模式自製電子書
// ============================================================

const Part3Divider: Page = () => (
  <Divider
    partIndex={2}
    module="電子書模組"
    title="雙模式自製教學電子書"
    sub="大屏互動與純淨紙本"
    desc="一套教材、兩種場景！教師端大屏投影即時教學，學生端一鍵 A4 乾淨無干擾列印"
  />
);
Part3Divider.transition = morphTransition;

const EbookCover: Page = () => (
  <ToolCover
    unit="數位備課"
    icon="auto_stories"
    morphId="tile-part3"
    title="雙模式自製教學電子書"
    teacher={{ text: '上課投影片跟印給學生的學習單格式不同，每次備課都要做好幾份…' }}
    student={{ text: '上課大螢幕跟手上紙本對不起來，常常找不到老師現在講到哪裡…' }}
  />
);
EbookCover.transition = morphTransition;

const EbookFeature: Page = () => (
  <ToolFeature
    icon="auto_stories"
    morphId="tile-part3"
    title="雙模式自製教學電子書"
    subtitle="大屏教學與一鍵 A4 乾淨列印"
    tag="雙模式教學"
    points={[
      '學生端：一鍵 A4 乾淨白卷列印',
      '教師端：大屏投影／逐題秀答案',
      '內建板書螢光筆圈記劃線',
      '單一 HTML 檔案隨開隨用',
    ]}
    href={toolUrls.ebookHome}
    img={imgMathPrint}
    imgLabel="雙模式 · 大屏教學與 A4 列印"
  />
);
EbookFeature.transition = morphTransition;

// ============================================================
// 結尾
// ============================================================

const takeaways = [
  { icon: 'check', label: '不必全用', text: '工具很多，挑一個最上手的就好。' },
  { icon: 'favorite', label: '不用追趕', text: '紙本、數位或自製 AI，適合你的就是好工具。' },
  { icon: 'lightbulb', label: '回歸痛點', text: '看見每天重複的困擾，讓 AI 幫你少花一點力氣。' },
] as const;

const ClosingSummary: Page = () => (
  <Stage dots>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Rise>
        <Chip strong>今天的研習</Chip>
      </Rise>
      <Rise delay={120} kind="materialize" style={{ marginTop: 36 }}>
        <h2 style={{ ...h2, fontSize: 112, lineHeight: 1.2 }}>
          帶走一件事，<span style={gradText}>就夠了。</span>
        </h2>
      </Rise>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 52 }}>
        {takeaways.map(({ icon, label, text }, index) => (
          <Rise
            key={label}
            delay={260 + index * 100}
            style={{
              ...glass,
              width: 1240,
              height: 112,
              borderRadius: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              padding: '0 40px',
            }}
          >
            <Tile icon={icon} size={64} radius={20} iconSize={36} tone="soft" />
            <span style={{ fontSize: 38, fontWeight: 900 }}>{label}</span>
            <span style={{ fontSize: 34, color: muted }}>{text}</span>
          </Rise>
        ))}
      </div>
      <Rise delay={620} motion={BOUNCY} style={{ marginTop: 52 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            padding: '22px 56px',
            borderRadius: 999,
            background: brandGradient,
            color: '#ffffff',
            fontSize: 44,
            fontWeight: 900,
            boxShadow: '0 30px 60px -24px rgba(34, 87, 122, 0.6)',
          }}
        >
          選擇自己最不排斥的！
        </div>
      </Rise>
    </div>
    <Footer />
  </Stage>
);
ClosingSummary.transition = settle;

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
      className="cew-link"
      style={{
        ...glass,
        width: 500,
        height: 240,
        boxSizing: 'border-box',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        color: 'var(--osd-text)',
        textDecoration: 'none',
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

const Social: Page = () => (
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
      <Rise>
        <div style={eyebrow}>社群入口</div>
      </Rise>
      <Rise delay={100} kind="materialize" style={{ marginTop: 28 }}>
        <h2 style={{ ...h2, fontSize: 112, lineHeight: 1.2 }}>
          謝謝大家！<span style={gradText}>歡迎追蹤看更多</span>
        </h2>
      </Rise>
      <div style={{ display: 'flex', gap: 40, marginTop: 80 }}>
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
Social.transition = settle;

export const meta: SlideMeta = {
  title: '一鍵搞定國英適性教材 特教老師的隨身備課神器',
  createdAt: '2026-10-02T19:50:00.000Z',
};

export default [
  Cover,
  Speaker,
  MixerSites,
  Agenda,
  Part1Divider,
  ChineseLessonCover,
  ChineseLessonFeature,
  ChineseTranslateCover,
  ChineseTranslateFeature,
  CharacterFamilyCover,
  CharacterFamilyFeature,
  PracticeChinese,
  Part2Divider,
  SpecialEdEnglishCover,
  SpecialEdEnglishFeature,
  SteppedVocabCover,
  SteppedVocabFeature,
  VocabPracticeCover,
  VocabPracticeFeature,
  PracticeEnglish,
  Part3Divider,
  EbookCover,
  EbookFeature,
  ClosingSummary,
  Social,
] satisfies Page[];
