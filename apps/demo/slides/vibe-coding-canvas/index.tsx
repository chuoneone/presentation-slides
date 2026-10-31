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
import imgChineseTextComic from './assets/chinese-text-comic.webp';
import imgGeminiHome from './assets/gemini-home.png';
import imgPromptInput from './assets/prompt-input.png';
import imgRemixAsk from './assets/remix-ask.png';
import imgRemixCopied from './assets/remix-code-copied.png';
import imgRemixResult from './assets/remix-result.png';
import imgResultFull from './assets/result-fullscreen.png';
import imgResultWindow from './assets/result-window.png';
import imgShareDialog from './assets/share-dialog.png';
import imgShareMenu from './assets/share-menu.png';
import imgToolQuestion from './assets/tool-question.jpg';
import imgToolVocabPractice from './assets/tool-vocab-practice.jpg';
import imgToolboxNotepad from './assets/toolbox-notepad.png';
import imgToolboxPrompt from './assets/toolbox-prompt.png';
import imgToolboxResult from './assets/toolbox-result.png';
import imgTryCanvas from './assets/try-canvas-button.png';

export const design: DesignSystem = {
  palette: { bg: '#FFF3DF', text: '#151313', accent: '#FF5A2C' },
  fonts: {
    display:
      '"Gabarito", "Chiron GoRound TC", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body: '"Gabarito", "Chiron GoRound TC", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 150, body: 37 },
  radius: 36,
};

const ink = '#151313';
const paper = '#FFFCF6';
const butter = '#FFD23F';
const peri = '#98A6FF';
const muted = '#736D65';
const warn = '#E0401A';
const hard = (n: number) => `${n}px ${n}px 0 ${ink}`;

const SLIDE_ID = 'vibe-coding-canvas';

const toolUrls = {
  vocabMaker: 'https://spedmix.pages.dev/vocab-maker',
  question: 'https://spedmix.pages.dev/question',
  vocabPractice: 'https://spedmix.pages.dev/vocab-practice-worksheet',
  gem: 'https://gemini.google.com/gem/1wKgy93k8glqhdWihRvKa3MTJA2yu9UEu?usp=sharing',
  spellDoc:
    'https://docs.google.com/document/d/e/2PACX-1vRBq71d8p-_w2Namh1CmwZWaB2jwvwspu69JZatzytsXJlWsyd5ULgGbkzRKtN7LL62qjx_CltDsEXj/pub',
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
  'account_circle',
  'add',
  'apps',
  'arrow_downward',
  'arrow_forward',
  'auto_awesome',
  'auto_fix_high',
  'auto_stories',
  'block',
  'bolt',
  'bug_report',
  'calculate',
  'cancel',
  'chat',
  'check_circle',
  'close',
  'coffee',
  'construction',
  'content_copy',
  'dashboard',
  'description',
  'diamond',
  'edit_note',
  'explore',
  'format_size',
  'forum',
  'healing',
  'help',
  'history',
  'hourglass_top',
  'image',
  'info',
  'key',
  'keyboard',
  'label',
  'lightbulb',
  'link_off',
  'lock',
  'looks_one',
  'menu_book',
  'mood',
  'open_in_full',
  'open_in_new',
  'pause',
  'person',
  'photo_camera',
  'play_arrow',
  'privacy_tip',
  'radio_button_checked',
  'record_voice_over',
  'remove',
  'restart_alt',
  'save',
  'savings',
  'school',
  'search',
  'share',
  'smart_toy',
  'star',
  'style',
  'sync',
  'tab',
  'timer',
  'touch_app',
  'travel_explore',
  'undo',
  'visibility',
  'work',
].sort();

const FONT_LINKS: [string, string][] = [
  [
    `osd-webfont-${SLIDE_ID}`,
    'https://fonts.googleapis.com/css2?family=Chiron+GoRound+TC:wght@400;500;700;900&family=Gabarito:wght@500;700;800;900&display=swap',
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
@keyframes asx-ring { 0%, 100% { box-shadow: 0 0 0 0 rgba(255, 90, 44, 0.5); } 50% { box-shadow: 0 0 0 16px rgba(255, 90, 44, 0); } }
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
  background: paper,
  border: `4px solid ${ink}`,
  boxShadow: hard(8),
  borderRadius: 'var(--osd-radius)',
  boxSizing: 'border-box',
};

const brandFill: CSSProperties = {
  background: 'var(--osd-accent)',
  color: ink,
};

const gradText: CSSProperties = {
  color: 'var(--osd-accent)',
};

const eyebrow: CSSProperties = {
  fontSize: 33,
  fontWeight: 700,
  letterSpacing: '0.14em',
  color: warn,
};

const h2: CSSProperties = {
  fontFamily: 'var(--osd-font-display)',
  fontSize: 75,
  fontWeight: 900,
  lineHeight: 1.15,
  letterSpacing: '-0.03em',
  margin: 0,
};

const softPill: CSSProperties = {
  alignSelf: 'flex-start',
  fontSize: 31,
  fontWeight: 700,
  color: ink,
  background: butter,
  border: `3px solid ${ink}`,
  boxShadow: hard(4),
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

const Stage = ({ children, dots = false }: { children: ReactNode; dots?: boolean }) => (
  <div style={fill}>
    {dots && (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(21, 19, 19, 0.16) 2px, transparent 1.5px)',
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
      background: tone === 'brand' ? 'var(--osd-accent)' : tone === 'warn' ? '#FFB0D0' : butter,
      border: `${Math.max(3, Math.round(size / 28))}px solid ${ink}`,
      boxSizing: 'border-box',
      boxShadow: hard(Math.max(4, Math.round(size / 18))),
    }}
  >
    <Icon name={icon} size={iconSize} color={ink} />
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
        fontSize: 28,
        color: muted,
        fontWeight: 500,
      }}
    >
      <span>
        Vibe Coding 自製個人 AI 工具<span style={{ margin: '0 12px', opacity: 0.4 }}>|</span>米克師
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
    <p style={{ fontSize: 37, color: muted, margin: 0 }}>{children}</p>
  </Rise>
);

const Chip = ({ children, strong = false }: { children: ReactNode; strong?: boolean }) => (
  <span
    style={{
      ...glass,
      borderRadius: 999,
      padding: '12px 30px',
      fontSize: 35,
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
      borderBottom: `3px solid ${ink}`,
      flexShrink: 0,
    }}
  >
    <Dot color="#ff5f57" />
    <Dot color="#febc2e" />
    <Dot color="#28c840" />
    <span
      style={{
        margin: '0 auto',
        fontSize: 24,
        color: muted,
        background: '#FFF3DF',
        border: `2.5px solid ${ink}`,
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
      background: paper,
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

// One title line rising out from behind its own mask.
const LineReveal = ({ children, delay }: { children: ReactNode; delay: number }) => (
  <div style={{ overflow: 'hidden', paddingBottom: 8 }}>
    <Rise delay={delay} kind="line" motion={SOFT}>
      {children}
    </Rise>
  </div>
);

// PART pages switch to a dark stage so a new section reads at a glance.
const night = '#151313';
const mint = butter;

const partTitle: CSSProperties = {
  fontFamily: 'var(--osd-font-display)',
  fontSize: 154,
  fontWeight: 900,
  lineHeight: 1.1,
  letterSpacing: '-0.03em',
  color: ink,
};

const PartDivider = ({
  part,
  num,
  time,
  icon,
  morphId,
  line1,
  line2,
}: {
  part: string;
  num: string;
  time: string;
  icon: string;
  morphId: string;
  line1: string;
  line2: string;
}) => (
  <div
    style={{
      ...fill,
      background: peri,
      color: ink,
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(21, 19, 19, 0.18) 2px, transparent 1.5px)',
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
          WebkitTextStroke: '5px rgba(21, 19, 19, 0.22)',
        }}
      >
        {num}
      </div>
    </Rise>
    <div style={{ position: 'absolute', left: 160, top: 380 }}>
      <MorphElement id={morphId}>
        <div>
          <Tile icon={icon} size={320} radius={88} iconSize={176} />
        </div>
      </MorphElement>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 580,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 56 }}>
        <Rise delay={240} kind="track" motion={SOFT}>
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 51,
              fontWeight: 800,
              color: ink,
              whiteSpace: 'nowrap',
            }}
          >
            {part}
          </div>
        </Rise>
        <Rise delay={420} kind="grow" motion={SOFT} style={{ transformOrigin: 'left center' }}>
          <div style={{ width: 96, height: 6, borderRadius: 999, background: ink }} />
        </Rise>
        <Rise delay={520} kind="fade">
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 43,
              fontWeight: 700,
              color: 'rgba(21, 19, 19, 0.6)',
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
              color: paper,
              WebkitTextStroke: `5px ${ink}`,
              paintOrder: 'stroke fill',
            }}
          >
            {line2}
          </div>
        </LineReveal>
      </div>
    </div>
  </div>
);
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
    <div style={{ fontSize: 43, fontWeight: 900 }}>{school}</div>
    <div style={{ fontSize: 33, color: muted, marginTop: 6 }}>{dept}</div>
  </Rise>
);

const BioLabel = ({ icon, children }: { icon: string; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
    <Tile icon={icon} size={56} radius={18} iconSize={32} tone="soft" />
    <span style={{ fontSize: 41, fontWeight: 900 }}>{children}</span>
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
          fontSize: 70,
          fontWeight: 900,
          marginTop: 36,
        }}
      >
        朱旆誼
      </div>
      <span
        style={{
          ...softPill,
          alignSelf: 'center',
          marginTop: 16,
          fontSize: 25,
          whiteSpace: 'nowrap',
        }}
      >
        米克師 · @spedmix2025
      </span>
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
      <div style={{ fontSize: 53, fontWeight: 900, marginTop: 18 }}>{title}</div>
      <div style={{ fontSize: 33, lineHeight: 1.55, color: muted, marginTop: 10 }}>{desc}</div>
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
          color: ink,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 18px 36px -16px ${color}`,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 56, fontWeight: 800 }}>
          {platform}
        </div>
        <div style={{ fontSize: 37, fontWeight: 700, color, marginTop: 4 }}>{handle}</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 31,
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
    <HeaderRow icon="travel_explore" title="米克師的三個網站" />
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
      background: tone === 'pain' ? '#FFF3DF' : paper,
      border: tone === 'pain' ? '3px dashed rgba(21, 19, 19, 0.16)' : `3px solid ${ink}`,
      color: ink,
    }}
  >
    <Icon name={icon} size={36} color={tone === 'pain' ? muted : ink} />
    <span style={{ fontSize: 37, fontWeight: 700 }}>{text}</span>
  </div>
);
const PrivacyTag = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontSize: 33,
      fontWeight: 700,
      color: warn,
      background: '#FFB0D0',
      border: `3px solid ${ink}`,
      borderRadius: 999,
      padding: '8px 22px',
    }}
  >
    {children}
  </span>
);

type TimerState = {
  label: string;
  total: number;
  remaining: number;
  endAt: number | null;
};

const TIMER_KEY = '__VIBE_CODING_CANVAS_TIMER__';
const TIMER_EVENT = 'vibe-coding-canvas-timer';

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
    (): TimerState => ({ label, total: minutes * 60, remaining: minutes * 60, endAt: null }),
    [label, minutes],
  );
  const load = useCallback(() => {
    const stored = typeof window === 'undefined' ? null : readTimer();
    return stored && stored.label === label ? stored : fresh();
  }, [label, fresh]);

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
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: primary ? 'var(--osd-accent)' : butter,
      color: ink,
      border: `${primary ? 4 : 3}px solid ${ink}`,
      boxSizing: 'border-box',
      boxShadow: hard(primary ? 6 : 4),
    }}
  >
    <Icon name={icon} size={primary ? 60 : 44} />
  </button>
);

const PracticeTimer = ({
  label,
  minutes,
  caption = '實作倒數',
}: {
  label: string;
  minutes: number;
  caption?: string;
}) => {
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
        {caption}
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
          background: 'rgba(255, 90, 44, 0.12)',
          marginTop: 16,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: '100%',
            borderRadius: 999,
            background: 'var(--osd-accent)',
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
      fontSize: 37,
      fontWeight: 700,
      ...(tone === 'brand'
        ? {
            background: 'var(--osd-accent)',
            color: ink,
            border: `4px solid ${ink}`,
            boxShadow: hard(6),
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
  children?: ReactNode;
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
          <h2 style={{ ...h2, fontSize: 88 }}>{tool}</h2>
        </Rise>
        <Rise delay={200} style={{ marginTop: 28 }}>
          <p style={{ fontSize: 43, lineHeight: 1.6, color: muted, margin: 0 }}>{task}</p>
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
    <span style={{ fontSize: 48, fontWeight: 900 }}>{title}</span>
    <span style={{ fontSize: 41, color: muted }}>{detail}</span>
  </StepIn>
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
      fontSize: 35,
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
        <h2 style={{ ...h2, fontSize: 141, lineHeight: 1.2 }}>
          謝謝大家<span style={gradText}>！</span>
        </h2>
      </Rise>
      <Rise delay={120} style={{ marginTop: 24 }}>
        <p style={{ fontSize: 51, color: muted, margin: 0 }}>
          Q&amp;A ・ 歡迎追蹤米克師，看更多特教自製工具
        </p>
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
            background: 'var(--osd-accent)',
            border: `4px solid ${ink}`,
            color: ink,
            fontSize: 70,
            fontWeight: 800,
            fontFamily: 'var(--osd-font-display)',
            letterSpacing: '-0.01em',
            boxShadow: hard(10),
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

/* ─────────────────────────── Shared pieces ─────────────────────────── */

type Mark = {
  x: number;
  y: number;
  w: number;
  h: number;
  tag?: string;
  tagBelow?: boolean;
  tagLeft?: boolean;
};

// Screenshot at a fixed width with pulsing rings around the parts to click.
// Mark coordinates are in the screenshot's natural pixels.
const AnnotatedShot = ({
  src,
  alt,
  natW,
  width,
  label,
  marks = [],
}: {
  src: string;
  alt: string;
  natW: number;
  width: number;
  label?: string;
  marks?: Mark[];
}) => {
  const s = width / natW;
  return (
    <div
      style={{
        ...glass,
        width,
        borderRadius: 28,
        background: paper,
      }}
    >
      {label && <FrameBar label={label} />}
      <div style={{ position: 'relative' }}>
        <img
          src={src}
          alt={alt}
          style={{
            display: 'block',
            width,
            height: 'auto',
            borderRadius: label ? '0 0 28px 28px' : 28,
          }}
        />
        {marks.map((m) => (
          <div
            key={`${m.x}-${m.y}`}
            style={{
              position: 'absolute',
              left: m.x * s - 10,
              top: m.y * s - 10,
              width: m.w * s + 20,
              height: m.h * s + 20,
              border: `5px solid ${warn}`,
              borderRadius: 18,
              boxSizing: 'border-box',
              animation: 'asx-ring 1.8s ease-out infinite',
            }}
          >
            {m.tag && (
              <span
                style={{
                  position: 'absolute',
                  ...(m.tagLeft ? { left: -5 } : { right: -5 }),
                  ...(m.tagBelow
                    ? { top: '100%', marginTop: 12 }
                    : { bottom: '100%', marginBottom: 12 }),
                  whiteSpace: 'nowrap',
                  background: warn,
                  color: ink,
                  fontSize: 33,
                  fontWeight: 800,
                  borderRadius: 999,
                  padding: '8px 22px',
                  border: `3px solid ${ink}`,
                  boxShadow: hard(4),
                }}
              >
                {m.tag}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const NumRow = ({
  n,
  title,
  desc,
  delay,
  width,
}: {
  n: string;
  title: ReactNode;
  desc?: ReactNode;
  delay: number;
  width?: number;
}) => (
  <Rise
    delay={delay}
    style={{
      ...glass,
      width,
      minHeight: 120,
      boxSizing: 'border-box',
      borderRadius: 28,
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '24px 36px',
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
        background: 'var(--osd-accent)',
        border: `3px solid ${ink}`,
        boxSizing: 'border-box',
        color: ink,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 41,
        fontWeight: 800,
      }}
    >
      {n}
    </span>
    <div>
      <div style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.35 }}>{title}</div>
      {desc && (
        <div style={{ fontSize: 33, lineHeight: 1.45, color: muted, marginTop: 6 }}>{desc}</div>
      )}
    </div>
  </Rise>
);

const IconRow = ({
  icon,
  title,
  desc,
  delay,
  tone = 'brand',
}: {
  icon: string;
  title: ReactNode;
  desc: ReactNode;
  delay: number;
  tone?: 'brand' | 'warn';
}) => (
  <Rise
    delay={delay}
    style={{
      ...glass,
      height: 156,
      borderRadius: 28,
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      padding: '0 40px',
    }}
  >
    <Tile icon={icon} size={88} radius={26} iconSize={48} tone={tone} />
    <div>
      <div style={{ fontSize: 48, fontWeight: 900 }}>{title}</div>
      <div style={{ fontSize: 35, color: muted, marginTop: 8 }}>{desc}</div>
    </div>
  </Rise>
);

const Card = ({
  icon,
  title,
  desc,
  delay,
  width,
  height,
  tone = 'soft',
  children,
}: {
  icon: string;
  title: ReactNode;
  desc?: ReactNode;
  delay: number;
  width: number;
  height: number;
  tone?: 'brand' | 'soft' | 'warn';
  children?: ReactNode;
}) => (
  <Rise
    delay={delay}
    motion={BOUNCY}
    style={{
      ...glass,
      width,
      height,
      padding: '44px 44px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Tile icon={icon} size={96} radius={28} iconSize={52} tone={tone} />
    <div style={{ fontSize: 48, fontWeight: 900, marginTop: 32, lineHeight: 1.3 }}>{title}</div>
    {desc && (
      <div style={{ fontSize: 35, lineHeight: 1.55, color: muted, marginTop: 14 }}>{desc}</div>
    )}
    {children}
  </Rise>
);

const StepCard = ({
  n,
  icon,
  title,
  desc,
  delay,
}: {
  n: string;
  icon: string;
  title: ReactNode;
  desc: ReactNode;
  delay: number;
}) => (
  <Rise
    delay={delay}
    motion={BOUNCY}
    style={{
      ...glass,
      width: 390,
      height: 470,
      padding: '40px 36px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}
  >
    <span
      style={{
        position: 'absolute',
        right: 32,
        top: 18,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 123,
        fontWeight: 800,
        lineHeight: 1,
        color: 'rgba(255, 90, 44, 0.16)',
      }}
    >
      {n}
    </span>
    <Tile icon={icon} size={96} radius={28} iconSize={52} />
    <div style={{ fontSize: 44, fontWeight: 900, marginTop: 40, lineHeight: 1.35 }}>{title}</div>
    <div style={{ fontSize: 35, lineHeight: 1.55, color: muted, marginTop: 16 }}>{desc}</div>
  </Rise>
);

const BrandBanner = ({
  children,
  delay,
  style,
}: {
  children: ReactNode;
  delay: number;
  style?: CSSProperties;
}) => (
  <Rise
    delay={delay}
    kind="materialize"
    style={{
      ...glass,
      ...brandFill,
      padding: '36px 48px',
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      fontSize: 51,
      fontWeight: 900,
      ...style,
    }}
  >
    {children}
  </Rise>
);

const Quote = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontSize: 43,
      lineHeight: 1.75,
      fontWeight: 600,
      borderLeft: '8px solid var(--osd-accent)',
      paddingLeft: 32,
    }}
  >
    {children}
  </div>
);

const Blank = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      color: 'var(--osd-accent)',
      fontWeight: 900,
      borderBottom: '4px solid rgba(255, 90, 44, 0.45)',
      padding: '0 6px',
    }}
  >
    {children}
  </span>
);

/* ─────────────────────────── Opening ─────────────────────────── */

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
      border: dashed ? '2px dashed rgba(255, 90, 44, 0.35)' : '1.5px solid rgba(255, 90, 44, 0.18)',
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
        background: paper,
      }}
    >
      <Tile icon={icon} size={56} radius={18} iconSize={32} tone="soft" />
      <span style={{ fontSize: 35, fontWeight: 800 }}>{label}</span>
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
    <OrbitCard icon="menu_book" label="詞語教材生成器" x={1130} y={150} tilt={-4} delay={420} />
    <OrbitCard icon="auto_stories" label="社會性故事圖卡" x={1480} y={250} tilt={3} delay={500} />
    <OrbitCard icon="mood" label="情緒溫度計" x={1040} y={560} tilt={-3} delay={580} />
    <OrbitCard icon="style" label="注音字卡" x={1580} y={690} tilt={4} delay={660} />
    <OrbitCard icon="apps" label="我的工具箱" x={1200} y={830} tilt={-2} delay={740} />

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
          <span style={{ fontFamily: 'var(--osd-font-display)' }}>米克師 · @spedmix2025</span>
        </Chip>
      </Rise>
      <Rise delay={100} kind="materialize" style={{ marginTop: 40 }}>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 141,
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          <span style={gradText}>Vibe Coding</span>
          <br />
          自製個人
          <br />
          AI 工具
        </h1>
      </Rise>
      <Rise delay={240} style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 20 }}>
        <span
          style={{
            width: 64,
            height: 6,
            borderRadius: 999,
            background: 'var(--osd-accent)',
          }}
        />
        <span style={{ fontSize: 41, color: muted, fontWeight: 500 }}>
          用說的，在 Gemini Canvas 做出你的工具
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
          <div style={{ fontSize: 28, color: muted, letterSpacing: '0.12em' }}>主講人</div>
          <div style={{ fontSize: 43, fontWeight: 900 }}>朱旆誼</div>
        </div>
      </Rise>
    </div>
  </Stage>
);
Cover.transition = settle;

const AgendaSlot = ({
  time,
  icon,
  title,
  hot = false,
  delay,
}: {
  time: string;
  icon: string;
  title: string;
  hot?: boolean;
  delay: number;
}) => (
  <Rise
    delay={delay}
    style={{
      ...glass,
      ...(hot ? brandFill : {}),
      width: 348,
      height: 440,
      boxSizing: 'border-box',
      borderRadius: 32,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 26,
      padding: '0 28px',
      textAlign: 'center',
    }}
  >
    <span
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 48,
        fontWeight: 800,
        fontVariantNumeric: 'tabular-nums',
        color: hot ? ink : 'var(--osd-accent)',
      }}
    >
      {time}
    </span>
    <Icon name={icon} size={72} color={hot ? ink : muted} />
    <span style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.3 }}>{title}</span>
    {hot && (
      <span
        style={{
          fontSize: 31,
          fontWeight: 800,
          background: butter,
          border: `3px solid ${ink}`,
          borderRadius: 999,
          padding: '6px 18px',
        }}
      >
        實作
      </span>
    )}
  </Rise>
);

const AgendaArrow = ({ delay }: { delay: number }) => (
  <Rise delay={delay}>
    <Icon name="arrow_forward" size={64} color="var(--osd-accent)" />
  </Rise>
);

const Agenda: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 110 }}>
      <Rise>
        <div style={eyebrow}>先改現成的，再自己做一個 · 18:00 – 20:00</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 20 }}>
        <h2 style={h2}>今日研習大綱</h2>
      </Rise>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 400,
        width: 1680,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <AgendaSlot time="01" icon="lightbulb" title="認識 Vibe Coding" delay={150} />
      <AgendaArrow delay={200} />
      <AgendaSlot time="02" icon="content_copy" title="改編現成工具" hot delay={250} />
      <AgendaArrow delay={300} />
      <AgendaSlot time="03" icon="construction" title="從零做一個" hot delay={350} />
      <AgendaArrow delay={400} />
      <AgendaSlot time="04" icon="forum" title="工具箱與分享" delay={450} />
    </div>
    <Footer />
  </Stage>
);

/* ─────────────────────────── Part 1 ─────────────────────────── */

const Part1: Page = () => (
  <PartDivider
    part="PART 01"
    num="01"
    time="18:00 – 18:20"
    icon="lightbulb"
    morphId="tile-part1"
    line1="為什麼要"
    line2="自己做工具"
  />
);

const Pain: Page = () => (
  <Stage>
    <HeaderRow icon="lightbulb" morphId="tile-part1" title="你有沒有遇過這些狀況？" />
    <div style={{ position: 'absolute', left: 120, top: 290, display: 'flex', gap: 40 }}>
      <Card
        icon="search"
        title="找到很棒的工具，卻不完全適合我"
        delay={150}
        width={533}
        height={360}
      />
      <Card
        icon="format_size"
        title="字太小、題目太難、廣告太多"
        delay={250}
        width={533}
        height={360}
      />
      <Card icon="lock" title="想改，卻改不了" delay={350} width={533} height={360} />
    </div>
    <BrandBanner delay={520} style={{ position: 'absolute', left: 120, right: 120, top: 710 }}>
      <Icon name="lightbulb" size={56} />
      如果我能自己做就好了……
    </BrandBanner>
    <Footer />
  </Stage>
);
Pain.transition = morphTransition;

const KnowStudents: Page = () => (
  <Stage>
    <HeaderRow icon="school" title="最懂學生的人，是你" />
    <div style={{ position: 'absolute', left: 120, top: 270, display: 'flex', gap: 48 }}>
      <Rise
        delay={200}
        style={{
          ...glass,
          width: 816,
          padding: '40px 44px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <span style={softPill}>工程師</span>
          <span style={{ fontSize: 43, fontWeight: 900 }}>會寫程式</span>
        </div>
        <ContrastRow icon="close" tone="pain" text="不認識你的學生" />
        <ContrastRow icon="close" tone="pain" text="不知道課堂上卡在哪裡" />
        <ContrastRow icon="close" tone="pain" text="做出來的東西要再改給你" />
      </Rise>
      <Rise
        delay={320}
        kind="materialize"
        style={{
          ...glass,
          ...brandFill,
          width: 816,
          padding: '40px 44px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <span style={{ ...softPill, background: paper }}>老師</span>
          <span style={{ fontSize: 43, fontWeight: 900 }}>最懂學生</span>
        </div>
        <ContrastRow icon="check_circle" tone="fix" text="知道學生卡在哪一步" />
        <ContrastRow icon="check_circle" tone="fix" text="知道需要多大的字、多少提示" />
        <ContrastRow icon="check_circle" tone="fix" text="知道什麼樣的畫面學生看得懂" />
      </Rise>
    </div>
    <Rise delay={480} style={{ position: 'absolute', left: 120, right: 120, top: 760 }}>
      <div style={{ fontSize: 61, fontWeight: 900, textAlign: 'center' }}>
        現在，你只要把需求<span style={gradText}>「說清楚」</span>就夠了
      </div>
    </Rise>
    <Footer />
  </Stage>
);

const RoleList = ({ items, light = false }: { items: string[]; light?: boolean }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
    {items.map((t) => (
      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 43 }}>
        <Icon name="check_circle" size={36} color={light ? ink : 'var(--osd-accent)'} />
        <span style={{ fontWeight: 700 }}>{t}</span>
      </div>
    ))}
  </div>
);

const VibeCoding: Page = () => (
  <Stage dots>
    <div style={{ position: 'absolute', left: 120, top: 120 }}>
      <Rise>
        <div style={eyebrow}>什麼是 VIBE CODING？</div>
      </Rise>
      <Rise delay={100} kind="materialize" style={{ marginTop: 20 }}>
        <h2 style={{ ...h2, fontSize: 132 }}>
          用<span style={gradText}>說的</span>寫程式
        </h2>
      </Rise>
    </div>
    <div style={{ position: 'absolute', left: 120, top: 430, display: 'flex', gap: 48 }}>
      <Rise
        delay={240}
        motion={BOUNCY}
        style={{ ...glass, width: 816, height: 400, padding: 48, boxSizing: 'border-box' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Tile icon="record_voice_over" size={88} radius={26} iconSize={48} tone="soft" />
          <span style={{ fontSize: 61, fontWeight: 900 }}>你負責</span>
        </div>
        <RoleList items={['描述需求', '看結果', '提出修改']} />
      </Rise>
      <Rise
        delay={340}
        motion={BOUNCY}
        style={{
          ...glass,
          ...brandFill,
          width: 816,
          height: 400,
          padding: 48,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Tile icon="smart_toy" size={88} radius={26} iconSize={48} />
          <span style={{ fontSize: 61, fontWeight: 900 }}>AI 負責</span>
        </div>
        <RoleList light items={['寫程式碼']} />
        <div style={{ fontSize: 37, marginTop: 40, opacity: 0.85 }}>你不用看懂任何一行程式</div>
      </Rise>
    </div>
    <Footer />
  </Stage>
);

const CanvasIntro: Page = () => (
  <Stage>
    <HeaderRow icon="dashboard" title="今天的工具：Gemini Canvas" />
    <SubLine>在 Gemini 對話中開啟 Canvas，邊聊邊看到做出來的工具</SubLine>
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 120, top: 330 }}>
      <AnnotatedShot
        src={imgGeminiHome}
        alt="Gemini 輸入框與 Canvas 按鈕"
        natW={862}
        width={900}
        label="gemini.google.com"
        marks={[{ x: 161, y: 228, w: 106, h: 38, tag: '先按 Canvas 再送出', tagBelow: true }]}
      />
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 1080,
        top: 330,
        width: 720,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <NumRow n="1" title="打開 gemini.google.com" desc="先登入自己的 Google 帳號" delay={300} />
      <NumRow
        n="2"
        title="按輸入框的「Canvas」"
        desc="Gemini 會把結果做成可以操作的畫面"
        delay={400}
      />
      <NumRow n="3" title="聊天後，打開直接預覽" desc="可切換「程式碼」與「預覽」" delay={500} />
    </div>
    <Footer />
  </Stage>
);

const BenefitAi: Page = () => (
  <Stage>
    <HeaderRow icon="smart_toy" title="好處一：工具裡可以直接放 AI" />
    <div style={{ position: 'absolute', left: 120, top: 290, display: 'flex', gap: 40 }}>
      <Card
        icon="auto_awesome"
        title="呼叫 AI 模型"
        desc="生成文字、生成圖片，直接做在你的工具裡"
        delay={150}
        width={533}
        height={420}
        tone="brand"
      />
      <Card
        icon="key"
        title="不用 API key"
        desc="不用自己申請，也不怕被別人盜用"
        delay={250}
        width={533}
        height={420}
        tone="brand"
      />
      <Card
        icon="savings"
        title="不用另外付費"
        desc="登入 Google 帳號就能使用"
        delay={350}
        width={533}
        height={420}
        tone="brand"
      />
    </div>
    <Rise
      delay={500}
      style={{
        ...glass,
        position: 'absolute',
        left: 120,
        right: 120,
        top: 770,
        padding: '32px 44px',
        display: 'flex',
        alignItems: 'center',
        gap: 32,
      }}
    >
      <span style={{ ...softPill, flexShrink: 0 }}>API key 是什麼？</span>
      <div style={{ fontSize: 37, lineHeight: 1.55 }}>
        就像使用 AI 的<b style={{ color: 'var(--osd-accent)' }}>「會員卡」</b>
        ：以前要自己去辦、還要綁信用卡；
        <br />在 Canvas 裡，Google 已經幫你刷好卡，留空就能用。
      </div>
    </Rise>
    <Footer />
  </Stage>
);

const BenefitImage: Page = () => (
  <Stage>
    <HeaderRow icon="image" title="好處二：生圖可以有正確的中文字" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 300,
        width: 760,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <NumRow n="1" title="字卡、圖卡、標語直接產生" desc="圖片裡的中文字不再是亂碼" delay={200} />
      <NumRow n="2" title="特教現場很好用" desc="生活字卡、社會性故事、情境圖卡" delay={300} />
      <NumRow n="3" title="做進工具裡" desc="學生輸入詞語，工具就畫出配圖" delay={400} />
    </div>
    <Rise delay={300} kind="materialize" style={{ position: 'absolute', left: 960, top: 330 }}>
      <img
        src={imgChineseTextComic}
        alt="AI 生成的漫畫，圖中中文字正確清楚"
        style={{
          ...glass,
          display: 'block',
          width: 840,
          height: 'auto',
          borderRadius: 28,
          padding: 0,
        }}
      />
      <div style={{ fontSize: 30, fontWeight: 800, marginTop: 24, color: muted }}>
        AI 生成的漫畫，連圖中的中文字都正確
      </div>
    </Rise>
    <Footer />
  </Stage>
);

const BenefitShare: Page = () => (
  <Stage>
    <HeaderRow icon="share" title="好處三：分享只要一個連結" />
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 120, top: 290 }}>
      <AnnotatedShot
        src={imgTryCanvas}
        alt="分享後的工具畫面，右下角有試用 Gemini Canvas 按鈕"
        natW={1914}
        width={1100}
        label="share.gemini.google"
        marks={[{ x: 1618, y: 807, w: 276, h: 52, tag: '改成自己的版本' }]}
      />
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 1270,
        top: 290,
        width: 530,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <NumRow n="1" title="傳一個連結" desc="對方打開就能直接用" delay={300} />
      <NumRow
        n="2"
        title="按右下角「試用 Gemini Canvas」"
        desc="整份工具複製一份，改成他自己的"
        delay={400}
      />
    </div>
    <Footer />
  </Stage>
);

const Limits: Page = () => (
  <Stage>
    <HeaderRow icon="info" title="先知道的限制" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 290,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <IconRow
        icon="account_circle"
        tone="warn"
        title="使用者要登入 Google 帳號"
        desc="分享出去的工具，對方也要登入才能使用"
        delay={150}
      />
      <IconRow
        icon="hourglass_top"
        tone="warn"
        title="免費額度雖然很足夠"
        desc="但短時間用量大的時候，可能要等一下再試"
        delay={250}
      />
      <IconRow
        icon="block"
        tone="warn"
        title="學校的教育版帳號想要製作並分享，「沒有分享功能」"
        desc="建議使用個人帳號"
        delay={350}
      />
    </div>
    <Footer />
  </Stage>
);

const RedLine: Page = () => (
  <Stage>
    <HeaderRow icon="privacy_tip" title="一條紅線：不放學生個資" />
    <Rise
      delay={150}
      style={{
        ...glass,
        position: 'absolute',
        left: 120,
        top: 290,
        width: 900,
        padding: '40px 44px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Tile icon="privacy_tip" size={64} radius={20} iconSize={36} tone="warn" />
        <span style={{ fontSize: 48, fontWeight: 900, color: warn }}>這些都不要輸入</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 28 }}>
        <PrivacyTag>姓名</PrivacyTag>
        <PrivacyTag>學號</PrivacyTag>
        <PrivacyTag>身分證字號</PrivacyTag>
        <PrivacyTag>生日</PrivacyTag>
        <PrivacyTag>學校與班級</PrivacyTag>
        <PrivacyTag>診斷</PrivacyTag>
        <PrivacyTag>家庭狀況</PrivacyTag>
        <PrivacyTag>照片</PrivacyTag>
      </div>
      <p style={{ fontSize: 35, lineHeight: 1.55, color: muted, margin: '28px 0 0' }}>
        工具分享出去之後，別人也看得到你放進去的內容。
      </p>
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 1080,
        top: 290,
        width: 720,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <NumRow
        n="1"
        title="需要學生資料時，先去識別化"
        desc="用「A 生」等代號，只描述學習表現"
        delay={250}
      />
      <NumRow
        n="2"
        title="AI 產出的內容，自己核對過"
        desc="尤其是注音、筆順、數學答案"
        delay={350}
      />
    </div>
    <Footer />
  </Stage>
);

/* ─────────────────────────── Part 2 ─────────────────────────── */

const Part2: Page = () => (
  <PartDivider
    part="PART 02"
    num="02"
    time="18:20 – 19:05"
    icon="content_copy"
    morphId="tile-part2"
    line1="不要從零開始，"
    line2="先改編"
  />
);

const RemixWhy: Page = () => (
  <Stage>
    <HeaderRow icon="content_copy" morphId="tile-part2" title="第一招：先拿現成的來改" />
    <div style={{ position: 'absolute', left: 120, top: 270, display: 'flex', gap: 48 }}>
      <Rise
        delay={200}
        style={{
          ...glass,
          width: 816,
          padding: '40px 44px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <span style={softPill}>從零開始</span>
          <span style={{ fontSize: 43, fontWeight: 900 }}>新手容易卡關</span>
        </div>
        <ContrastRow icon="close" tone="pain" text="要先想清楚整個需求" />
        <ContrastRow icon="close" tone="pain" text="不知道怎麼下指令" />
        <ContrastRow icon="close" tone="pain" text="來回修改，花很多時間" />
      </Rise>
      <Rise
        delay={320}
        kind="materialize"
        style={{
          ...glass,
          ...brandFill,
          width: 816,
          padding: '40px 44px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <span style={{ ...softPill, background: paper }}>改編</span>
          <span style={{ fontSize: 43, fontWeight: 900 }}>站在現成作品上</span>
        </div>
        <ContrastRow icon="check_circle" tone="fix" text="工具已經能用，直接看到成果" />
        <ContrastRow icon="check_circle" tone="fix" text="只要說「想改哪裡」" />
        <ContrastRow icon="check_circle" tone="fix" text="十分鐘就有自己的版本" />
      </Rise>
    </div>
    <Rise delay={480} style={{ position: 'absolute', left: 120, right: 120, top: 760 }}>
      <div style={{ fontSize: 61, fontWeight: 900, textAlign: 'center' }}>
        不用花時間從頭做起，<span style={gradText}>先改再說</span>
      </div>
    </Rise>
    <Footer />
  </Stage>
);
RemixWhy.transition = morphTransition;

const RemixSteps: Page = () => (
  <Stage>
    <HeaderRow icon="sync" title="改編四步驟" />
    <div style={{ position: 'absolute', left: 120, top: 310, display: 'flex', gap: 40 }}>
      <StepCard
        n="1"
        icon="open_in_new"
        title="打開工具連結"
        desc="記得先登入 Google 帳號"
        delay={150}
      />
      <StepCard
        n="2"
        icon="touch_app"
        title="按「試用 Gemini Canvas」"
        desc="在畫面的右下角"
        delay={250}
      />
      <StepCard
        n="3"
        icon="edit_note"
        title="輸入一句話修改"
        desc="在下方的對話框打字"
        delay={350}
      />
      <StepCard
        n="4"
        icon="visibility"
        title="看預覽，滿意就好"
        desc="不滿意就再說一次"
        delay={450}
      />
    </div>
    <Footer />
  </Stage>
);

const TryButton: Page = () => (
  <Stage>
    <HeaderRow icon="touch_app" title="步驟 2：按右下角「試用 Gemini Canvas」" />
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 240, top: 260 }}>
      <AnnotatedShot
        src={imgTryCanvas}
        alt="分享的工具頁面，右下角有試用 Gemini Canvas 按鈕"
        natW={1914}
        width={1440}
        label="share.gemini.google"
        marks={[{ x: 1618, y: 807, w: 276, h: 52, tag: '按這裡' }]}
      />
    </Rise>
    <Footer />
  </Stage>
);

const RemixCopied: Page = () => (
  <Stage>
    <HeaderRow icon="content_copy" title="按下後：整份程式複製到你的對話" />
    <SubLine>這是你自己的副本，在下方輸入框打字，接著改就好</SubLine>
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 120, top: 300 }}>
      <AnnotatedShot
        src={imgRemixCopied}
        alt="按下試用後，工具出現在自己的 Gemini 對話中"
        natW={1915}
        width={1180}
        label="gemini.google.com"
        marks={[{ x: 555, y: 668, w: 871, h: 133, tag: '在這裡輸入修改', tagBelow: true }]}
      />
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 1340,
        top: 300,
        width: 460,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <NumRow n="1" title="原作品不會被改到" delay={300} />
      <NumRow n="2" title="上方可切換程式碼／預覽" delay={400} />
      <NumRow n="3" title="改壞了可以按復原箭頭" delay={500} />
    </div>
    <Footer />
  </Stage>
);

const RemixDemo: Page = () => (
  <Stage>
    <HeaderRow icon="auto_fix_high" title="改編示範：看到什麼想改，就講" />
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 120, top: 300 }}>
      <AnnotatedShot
        src={imgRemixAsk}
        alt="在問問 Gemini 輸入修改需求"
        natW={1536}
        width={800}
        marks={[{ x: 1116, y: 500, w: 390, h: 93, tag: '說出想改的地方' }]}
      />
      <div style={{ fontSize: 37, fontWeight: 800, marginTop: 24, lineHeight: 1.5 }}>
        「改一下主題色，刪掉進階認知的欄位」
      </div>
    </Rise>
    <Rise
      delay={360}
      kind="pop"
      motion={BOUNCY}
      style={{ position: 'absolute', left: 940, top: 460 }}
    >
      <Icon name="arrow_forward" size={72} color="var(--osd-accent)" />
    </Rise>
    <Rise delay={460} kind="materialize" style={{ position: 'absolute', left: 1040, top: 300 }}>
      <AnnotatedShot src={imgRemixResult} alt="改編後的工具畫面" natW={1259} width={760} />
      <div style={{ fontSize: 37, fontWeight: 800, marginTop: 24 }}>
        主題色換了、欄位刪掉了，<span style={gradText}>就改完了</span>
      </div>
    </Rise>
    <Footer />
  </Stage>
);

const ToolPick = ({
  src,
  href,
  title,
  desc,
  delay,
}: {
  src: string;
  href: string;
  title: string;
  desc: string;
  delay: number;
}) => (
  <Rise delay={delay} kind="materialize" style={{ width: 528 }}>
    <a href={href} target="_blank" rel="noreferrer" style={linkReset}>
      <BrowserFrame src={src} width={528} height={290} url={href.replace('https://', '')} />
    </a>
    <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 51, fontWeight: 900 }}>{title}</div>
      <div style={{ fontSize: 33, lineHeight: 1.55, color: muted, marginTop: 10 }}>{desc}</div>
    </div>
  </Rise>
);

const ReadyTools: Page = () => (
  <Stage>
    <HeaderRow icon="apps" title="米克師的現成工具，挑一個" />
    <SubLine>打開工具，按「試用 Gemini Canvas」就能開始改</SubLine>
    <div style={{ position: 'absolute', left: 120, top: 300, display: 'flex', gap: 48 }}>
      <ToolPick
        src={imgTryCanvas}
        href={toolUrls.vocabMaker}
        title="詞彙教材一鍵通"
        desc="貼上文本與目標詞彙，一鍵產出圖卡練習單與文章測驗單。"
        delay={150}
      />
      <ToolPick
        src={imgToolQuestion}
        href={toolUrls.question}
        title="個別化出題小幫手"
        desc="拍照或貼上課文，依程度分層，快速生成個別化練習卷。"
        delay={250}
      />
      <ToolPick
        src={imgToolVocabPractice}
        href={toolUrls.vocabPractice}
        title="單字練習卷生成"
        desc="抄寫配圖、拼字、看英選中、句型填空，一鍵匯出 Word。"
        delay={350}
      />
    </div>
    <Footer />
  </Stage>
);

const TaskChip = ({ stars, children }: { stars: number; children: ReactNode }) => (
  <span
    style={{
      ...glass,
      borderRadius: 999,
      padding: '14px 28px',
      fontSize: 35,
      fontWeight: 700,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
    }}
  >
    <span style={{ display: 'inline-flex' }}>
      {Array.from({ length: stars }, (_, i) => (
        <Icon key={`star-${i + 1}`} name="star" size={30} color="#f59e0b" />
      ))}
    </span>
    {children}
  </span>
);

const PracticeRemix: Page = () => (
  <Practice
    n="01"
    minutes={10}
    tool="改編米克師的工具"
    task={
      <>
        挑一個工具，按「試用 Gemini Canvas」，
        <br />
        從任務卡挑一張完成它。
      </>
    }
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <TaskChip stars={1}>把字放大、換成喜歡的顏色</TaskChip>
      <TaskChip stars={2}>把題目換成這週的單元</TaskChip>
      <TaskChip stars={3}>加上語音朗讀按鈕</TaskChip>
      <TaskChip stars={3}>難度降一級，加上提示</TaskChip>
    </div>
  </Practice>
);

const SaveSteps: Page = () => (
  <Stage>
    <HeaderRow icon="save" title="存檔三步驟：每做完一個就做一次" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 290,
        width: 780,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <NumRow
        n="1"
        title="按右上角分享圖示，選「共用」"
        desc="Canvas 工具列最右邊的分享鈕"
        delay={200}
      />
      <NumRow n="2" title="複製連結" desc="出現「✓ 已複製連結」就成功了" delay={300} />
      <NumRow n="3" title="貼到記事本，在前面取名字" desc="記得按存檔" delay={400} />
    </div>
    <Rise delay={300} kind="materialize" style={{ position: 'absolute', left: 960, top: 290 }}>
      <AnnotatedShot
        src={imgShareMenu}
        alt="分享選單"
        natW={225}
        width={280}
        marks={[{ x: 33, y: 67, w: 132, h: 54 }]}
      />
    </Rise>
    <Rise delay={450} kind="materialize" style={{ position: 'absolute', left: 1240, top: 400 }}>
      <AnnotatedShot
        src={imgShareDialog}
        alt="Canvas 的公開分享連結視窗"
        natW={752}
        width={560}
        marks={[{ x: 513, y: 120, w: 185, h: 46, tag: '複製連結', tagBelow: true }]}
      />
    </Rise>
    <Footer />
  </Stage>
);

const Notepad: Page = () => (
  <Stage>
    <HeaderRow icon="edit_note" title="記事本這樣寫" />
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 120, top: 270 }}>
      <AnnotatedShot
        src={imgToolboxNotepad}
        alt="記事本裡整理好的工具名稱與連結"
        natW={1064}
        width={1680}
        label="我的工具.txt — 記事本"
        marks={[{ x: 16, y: 26, w: 92, h: 22, tag: '名字寫在連結前面', tagLeft: true }]}
      />
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 800,
        width: 1680,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
      }}
    >
      <NumRow
        n="1"
        title="一個工具一段，中間空一行"
        desc="名字就是之後按鈕上顯示的字"
        delay={300}
      />
      <NumRow
        n="2"
        title="用電腦內建的「記事本」"
        desc="不要用 Word，符號容易被自動轉換"
        delay={400}
      />
    </div>
    <Footer />
  </Stage>
);

const RuleCard = ({
  title,
  good,
  bad,
  delay,
}: {
  title: string;
  good: string;
  bad: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    motion={BOUNCY}
    style={{
      ...glass,
      width: 533,
      height: 520,
      padding: '44px 40px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    }}
  >
    <div style={{ fontSize: 53, fontWeight: 900, marginBottom: 12 }}>{title}</div>
    <div
      style={{
        ...brandFill,
        borderRadius: 24,
        padding: '22px 26px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontSize: 41,
        fontWeight: 800,
      }}
    >
      <Icon name="check_circle" size={38} color={ink} />
      {good}
    </div>
    <div
      style={{
        borderRadius: 24,
        padding: '22px 26px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontSize: 35,
        fontWeight: 700,
        color: muted,
        background: '#FFF3DF',
        border: '3px dashed rgba(21, 19, 19, 0.16)',
        textDecoration: 'line-through',
      }}
    >
      <Icon name="close" size={38} color={muted} />
      {bad}
    </div>
  </Rise>
);

const NamingRules: Page = () => (
  <Stage>
    <HeaderRow icon="label" title="取名字的小規則" />
    <div style={{ position: 'absolute', left: 120, top: 300, display: 'flex', gap: 40 }}>
      <RuleCard title="8 個字以內" good="注音字卡產生器" bad="幫學生練注音的字卡工具" delay={150} />
      <RuleCard title="一看就知道用途" good="情緒溫度計" bad="我的工具1" delay={250} />
      <RuleCard title="學生看得懂的字" good="今天的心情" bad="情緒自我調節量表" delay={350} />
    </div>
    <Footer />
  </Stage>
);

const SayCard = ({
  tone,
  children,
  delay,
}: {
  tone: 'bad' | 'good';
  children: ReactNode;
  delay: number;
}) => (
  <Rise
    delay={delay}
    kind={tone === 'good' ? 'materialize' : 'rise'}
    style={{
      ...glass,
      ...(tone === 'good' ? brandFill : {}),
      width: 816,
      height: 380,
      padding: '44px 48px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Icon
        name={tone === 'good' ? 'check_circle' : 'cancel'}
        size={56}
        color={tone === 'good' ? ink : muted}
      />
      <span style={{ fontSize: 45, fontWeight: 900 }}>
        {tone === 'good' ? '這樣說' : '不要這樣說'}
      </span>
    </div>
    <div style={{ fontSize: 51, fontWeight: 800, lineHeight: 1.6, marginTop: 36 }}>{children}</div>
  </Rise>
);

const OneThing: Page = () => (
  <Stage>
    <HeaderRow icon="looks_one" title="技巧一：一次只改一件事" />
    <div style={{ position: 'absolute', left: 120, top: 290, display: 'flex', gap: 48 }}>
      <SayCard tone="bad" delay={200}>
        「字放大、換顏色、
        <br />
        加音效、題目變十題」
      </SayCard>
      <SayCard tone="good" delay={340}>
        「把題目的字放大到
        <br />
        現在的兩倍」
      </SayCard>
    </div>
    <Rise delay={500} style={{ position: 'absolute', left: 120, right: 120, top: 760 }}>
      <div style={{ fontSize: 56, fontWeight: 900, textAlign: 'center' }}>
        一次改一件，<span style={gradText}>壞了才知道是哪裡壞的</span>
      </div>
    </Rise>
    <Footer />
  </Stage>
);

const SeeWant: Page = () => (
  <Stage>
    <HeaderRow icon="chat" title="技巧二：說清楚「看到什麼」和「想要什麼」" />
    <BrandBanner
      delay={200}
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 290,
        fontSize: 70,
        justifyContent: 'center',
      }}
    >
      現在 ＿＿＿＿，我希望 ＿＿＿＿
    </BrandBanner>
    <Rise
      delay={360}
      style={{
        ...glass,
        position: 'absolute',
        left: 120,
        right: 120,
        top: 500,
        padding: '40px 48px',
      }}
    >
      <div style={{ ...eyebrow, marginBottom: 16 }}>範例</div>
      <Quote>
        現在<Blank>按鈕在最下面，要捲動才看得到</Blank>，
        <br />
        我希望<Blank>按鈕固定在畫面上方</Blank>。
      </Quote>
    </Rise>
    <Rise delay={500} style={{ position: 'absolute', left: 120, top: 830 }}>
      <Chip strong>
        <Icon name="photo_camera" size={32} />
        說不清楚的時候，直接截圖貼上去
      </Chip>
    </Rise>
    <Footer />
  </Stage>
);

const ErrorPopup = () => (
  <div
    style={{
      width: 640,
      boxSizing: 'border-box',
      background: '#f1f4f9',
      borderRadius: 36,
      padding: '40px 44px 36px',
      boxShadow: '0 30px 60px -30px rgba(15, 23, 42, 0.35), 0 2px 6px rgba(15, 23, 42, 0.06)',
      fontFamily: '"Noto Sans TC", "Microsoft JhengHei", sans-serif',
      position: 'relative',
    }}
  >
    <div style={{ display: 'flex', gap: 24 }}>
      <Icon name="info" size={44} color="#1f2937" />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 40, fontWeight: 800, color: '#111827' }}>發生錯誤</div>
        <div style={{ fontSize: 33, color: '#374151', marginTop: 8 }}>執行程式碼時發生問題。</div>
      </div>
      <Icon name="close" size={40} color="#374151" />
    </div>
    <div style={{ display: 'flex', gap: 56, marginTop: 36, paddingLeft: 68 }}>
      <span
        style={{
          position: 'relative',
          fontSize: 33,
          fontWeight: 700,
          color: '#1a56db',
        }}
      >
        修正錯誤
        <span
          style={{
            position: 'absolute',
            inset: '-14px -18px',
            border: `5px solid ${warn}`,
            borderRadius: 18,
            animation: 'asx-ring 1.8s ease-out infinite',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: -18,
            top: '100%',
            marginTop: 26,
            whiteSpace: 'nowrap',
            background: warn,
            color: ink,
            fontSize: 31,
            fontWeight: 800,
            borderRadius: 999,
            padding: '8px 22px',
            fontFamily: 'var(--osd-font-body)',
          }}
        >
          直接按這裡
        </span>
      </span>
      <span style={{ fontSize: 33, fontWeight: 700, color: '#1a56db' }}>顯示控制台</span>
    </div>
  </div>
);

const Rescue: Page = () => (
  <Stage>
    <HeaderRow icon="healing" title="技巧三：做壞了怎麼辦？" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 290,
        width: 980,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <IconRow
        icon="bug_report"
        title="左下角跳出「發生錯誤」"
        desc="很正常！直接按「修正錯誤」就好"
        delay={150}
      />
      <IconRow
        icon="undo"
        title="越改越亂"
        desc="按 Canvas 上方的復原箭頭，退回上一個版本"
        delay={250}
      />
      <IconRow icon="save" title="改到滿意的版本" desc="先分享、存連結，再繼續往下改" delay={350} />
    </div>
    <Rise delay={300} kind="materialize" style={{ position: 'absolute', left: 1160, top: 330 }}>
      <ErrorPopup />
      <div style={{ fontSize: 33, fontWeight: 800, marginTop: 110, color: muted }}>
        製作過程中常常出現，不用緊張
      </div>
    </Rise>
    <Footer />
  </Stage>
);

const Break: Page = () => (
  <Stage dots>
    <div style={{ position: 'absolute', left: 160, top: 0, bottom: 0, display: 'flex' }}>
      <div style={{ margin: 'auto 0' }}>
        <Rise>
          <Chip strong>
            <Icon name="coffee" size={32} />
            19:05 – 19:15
          </Chip>
        </Rise>
        <Rise delay={100} kind="materialize" style={{ marginTop: 32 }}>
          <h2 style={{ ...h2, fontSize: 141 }}>
            休息<span style={gradText}>一下</span>
          </h2>
        </Rise>
        <Rise delay={200} style={{ marginTop: 24 }}>
          <p style={{ fontSize: 45, color: muted, margin: 0 }}>
            還沒存檔的老師，趁現在把連結存進記事本
          </p>
        </Rise>
      </div>
    </div>
    <Rise
      delay={200}
      kind="materialize"
      style={{ position: 'absolute', right: 160, top: 0, bottom: 0, display: 'flex' }}
    >
      <div style={{ margin: 'auto 0' }}>
        <PracticeTimer label="休息" minutes={10} caption="休息倒數" />
      </div>
    </Rise>
    <Footer />
  </Stage>
);

/* ─────────────────────────── Part 3 ─────────────────────────── */

const Part3: Page = () => (
  <PartDivider
    part="PART 03"
    num="03"
    time="19:15 – 19:45"
    icon="construction"
    morphId="tile-part3"
    line1="從零做一個"
    line2="自己的工具"
  />
);

const BuildSteps: Page = () => (
  <Stage>
    <HeaderRow icon="construction" morphId="tile-part3" title="第二招：從零做一個，四步驟" />
    <div style={{ position: 'absolute', left: 120, top: 310, display: 'flex', gap: 40 }}>
      <StepCard n="1" icon="label" title="先取名字" desc="給 AI 一個方向" delay={150} />
      <StepCard
        n="2"
        icon="touch_app"
        title="想像使用畫面"
        desc="要輸入什麼？要點選什麼？"
        delay={250}
      />
      <StepCard n="3" icon="description" title="想像輸出內容" desc="最後想拿到什麼？" delay={350} />
      <StepCard
        n="4"
        icon="photo_camera"
        title="有學習單就截圖"
        desc="AI 看圖就懂你要的格式"
        delay={450}
      />
    </div>
    <Footer />
  </Stage>
);
BuildSteps.transition = morphTransition;

const NameFirst: Page = () => (
  <Stage>
    <HeaderRow icon="label" title="步驟一：先取名字" />
    <BrandBanner
      delay={200}
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 270,
        height: 220,
        boxSizing: 'border-box',
        justifyContent: 'center',
        fontSize: 97,
        fontFamily: 'var(--osd-font-display)',
      }}
    >
      國語文詞語教材生成器
    </BrandBanner>
    <div style={{ position: 'absolute', left: 120, top: 540, display: 'flex', gap: 48 }}>
      <Card
        icon="explore"
        title="名字就是給 AI 的方向"
        desc="一看名字，AI 就知道你要做什麼類型的工具"
        delay={360}
        width={816}
        height={410}
      />
      <Card
        icon="help"
        title="只傳名字也能生出東西"
        desc="但內容不一定是你想要的，所以還要接著說清楚"
        delay={460}
        width={816}
        height={410}
      />
    </div>
    <Footer />
  </Stage>
);

const MockField = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      background: paper,
      border: '2px solid rgba(100, 116, 139, 0.25)',
      borderRadius: 18,
      padding: '18px 24px',
      fontSize: 35,
      lineHeight: 1.6,
      color: 'var(--osd-text)',
    }}
  >
    {children}
  </div>
);

const MockOption = ({ on = false, children }: { on?: boolean; children: ReactNode }) => (
  <span
    style={{
      borderRadius: 999,
      padding: '10px 24px',
      fontSize: 33,
      fontWeight: 700,
      ...(on
        ? { ...brandFill }
        : { background: paper, border: '2px solid rgba(100, 116, 139, 0.25)', color: muted }),
    }}
  >
    {children}
  </span>
);

const ImagineUi: Page = () => (
  <Stage>
    <HeaderRow icon="touch_app" title="步驟二：想像使用畫面" />
    <div style={{ position: 'absolute', left: 120, top: 270, display: 'flex', gap: 48 }}>
      <Card icon="keyboard" title="使用者要「輸入」什麼？" delay={150} width={816} height={510}>
        <div style={{ marginTop: 24 }}>
          <MockField>
            短暫
            <br />
            沉迷
            <br />
            視力
          </MockField>
        </div>
      </Card>
      <Card
        icon="radio_button_checked"
        title="使用者要「點選」什麼？"
        delay={250}
        width={816}
        height={510}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 28 }}>
          <MockOption on>三年級</MockOption>
          <MockOption>四年級</MockOption>
          <MockOption>五年級</MockOption>
          <MockOption on>填空造句</MockOption>
          <MockOption>詞語解釋</MockOption>
          <MockOption on>加注音</MockOption>
        </div>
      </Card>
    </div>
    <BrandBanner
      delay={420}
      style={{ position: 'absolute', left: 120, right: 120, top: 820, fontSize: 44 }}
    >
      <Icon name="lightbulb" size={52} />
      <span>做成按鈕和欄位，以後點一點就好，不用每次重寫提示詞</span>
    </BrandBanner>
    <Footer />
  </Stage>
);

const ImagineOutput: Page = () => (
  <Stage>
    <HeaderRow icon="description" title="步驟三：想像輸出內容" />
    <Rise
      delay={150}
      style={{
        ...glass,
        position: 'absolute',
        left: 120,
        right: 120,
        top: 340,
        padding: '56px 64px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontSize: 56, fontWeight: 900 }}>你最後想拿到什麼？</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 40 }}>
        <Chip>詞語解釋</Chip>
        <Chip>造句</Chip>
        <Chip>配合題</Chip>
        <Chip>AI 配圖</Chip>
        <Chip strong>可列印的學習單</Chip>
        <Chip strong>匯出 Word</Chip>
      </div>
    </Rise>
    <BrandBanner
      delay={300}
      style={{ position: 'absolute', left: 120, right: 120, top: 720, fontSize: 44 }}
    >
      <Icon name="lightbulb" size={52} />
      <span>先想好成品長什麼樣子，AI 才做得出你要的</span>
    </BrandBanner>
    <Footer />
  </Stage>
);

const PasteSheet: Page = () => (
  <Stage>
    <HeaderRow icon="photo_camera" title="步驟四：有現成的學習單？" />
    <SubLine>直接截圖貼上，AI 看圖就懂你要的格式，比用文字描述排版快很多</SubLine>
    <Rise delay={300} kind="materialize" style={{ position: 'absolute', left: 310, top: 320 }}>
      <AnnotatedShot
        src={imgPromptInput}
        alt="在輸入框附上學習單截圖"
        natW={902}
        width={1300}
        label="gemini.google.com"
        marks={[
          {
            x: 28,
            y: 22,
            w: 152,
            h: 142,
            tag: '附上自己的學習單截圖',
            tagBelow: true,
            tagLeft: true,
          },
        ]}
      />
    </Rise>
    <Footer />
  </Stage>
);

const fullPrompt = `做一個國語文詞語教材 AI 生成器
使用者輸入：課文中的詞語，先幫我製作一個載入範例的按鈕
使用者點選：年級、題型
輸出：一份可以輸出成 Word 的詞語學習單，格式參考附上的截圖。`;

const CopyPromptButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => setCopied(true));
  }, [text]);
  return (
    <button
      type="button"
      onClick={copy}
      style={{
        ...brandFill,
        border: 'none',
        cursor: 'pointer',
        borderRadius: 999,
        padding: '26px 52px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 18,
        fontFamily: 'var(--osd-font-body)',
        fontSize: 44,
        fontWeight: 900,
        boxShadow: '0 18px 36px -18px rgba(21, 19, 19, 0.6)',
      }}
    >
      <Icon name={copied ? 'check_circle' : 'content_copy'} size={52} color={ink} />
      {copied ? '已複製！' : '一鍵複製咒語'}
    </button>
  );
};

const CopyPrompt: Page = () => (
  <Stage>
    <HeaderRow icon="content_copy" title="完整咒語，直接複製" />
    <SubLine>貼到 Gemini 前，記得附上學習單截圖、打開 Canvas</SubLine>
    <Rise
      delay={200}
      kind="materialize"
      style={{
        ...glass,
        position: 'absolute',
        left: 120,
        right: 120,
        top: 300,
        padding: '52px 64px',
        boxSizing: 'border-box',
        background: paper,
        fontSize: 46,
        fontWeight: 700,
        lineHeight: 1.75,
        whiteSpace: 'pre-wrap',
      }}
    >
      {fullPrompt}
    </Rise>
    <Rise delay={400} style={{ position: 'absolute', left: 120, top: 790 }}>
      <CopyPromptButton text={fullPrompt} />
    </Rise>
    <Footer />
  </Stage>
);

const LoadExample: Page = () => (
  <Stage>
    <HeaderRow icon="bolt" title="加碼：做一個「載入範例」按鈕" />
    <SubLine>一鍵填好示範內容，馬上看到結果</SubLine>
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 120, top: 310 }}>
      <AnnotatedShot
        src={imgResultFull}
        alt="工具左上方的載入範例按鈕"
        natW={1847}
        width={1100}
        label="國語文詞語教材AI生成器"
        marks={[{ x: 501, y: 228, w: 118, h: 34, tag: '按一下就填好範例' }]}
      />
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 1290,
        top: 310,
        width: 510,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <NumRow n="1" title="測試時不用每次打字" delay={300} />
      <NumRow n="2" title="別人拿到也馬上看懂怎麼用" delay={400} />
      <Rise delay={500} style={{ ...glass, padding: '28px 32px' }}>
        <div style={{ ...eyebrow, fontSize: 28 }}>指令加一句</div>
        <div style={{ fontSize: 37, fontWeight: 800, marginTop: 10, lineHeight: 1.5 }}>
          「先幫我製作一個載入範例的按鈕」
        </div>
      </Rise>
    </div>
    <Footer />
  </Stage>
);

const PromptPart = ({ label, text, delay }: { label: string; text: string; delay: number }) => (
  <Rise
    delay={delay}
    style={{
      ...glass,
      height: 120,
      borderRadius: 28,
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      padding: '0 32px',
    }}
  >
    <span style={{ ...softPill, alignSelf: 'center', flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: 37, fontWeight: 800 }}>{text}</span>
  </Rise>
);

const RealPrompt: Page = () => (
  <Stage>
    <HeaderRow icon="chat" title="實際這樣下指令" />
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 120, top: 290 }}>
      <AnnotatedShot
        src={imgPromptInput}
        alt="米克師實際輸入的指令"
        natW={902}
        width={860}
        label="gemini.google.com"
        marks={[{ x: 92, y: 346, w: 134, h: 50, tag: '記得開 Canvas', tagBelow: true }]}
      />
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 1040,
        top: 290,
        width: 760,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <PromptPart label="名字" text="國語文詞語教材 AI 生成器" delay={300} />
      <PromptPart label="輸入" text="課文詞語＋載入範例按鈕" delay={380} />
      <PromptPart label="點選" text="年級、題型" delay={460} />
      <PromptPart label="輸出" text="可匯出 Word 的學習單" delay={540} />
      <PromptPart label="截圖" text="附上自己的學習單當格式" delay={620} />
    </div>
    <Footer />
  </Stage>
);

const UseGem: Page = () => (
  <Stage>
    <HeaderRow icon="diamond" title="從零做：用現成 Gem" />
    <SubLine>咒語已經放在 Gem 裡，直接把需求貼進去就好</SubLine>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 300,
        width: 900,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <NumRow n="1" title="已經指定好 AI 模型" desc="不用自己挑，也不會選錯" delay={200} />
      <NumRow n="2" title="出錯率降低很多" desc="固定的串接寫法，生成的工具比較穩定" delay={300} />
      <NumRow n="3" title="咒語也分享給大家" desc="以後想做任何生成器，自己都能用" delay={400} />
    </div>
    <div
      style={{
        position: 'absolute',
        left: 1100,
        top: 300,
        width: 700,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <Rise delay={300} motion={BOUNCY} style={{ ...glass, padding: '32px 40px' }}>
        <div style={{ fontSize: 46, fontWeight: 900 }}>生成器製作 Gem</div>
        <div style={{ fontSize: 33, color: muted, margin: '8px 0 22px' }}>
          打開後直接輸入四步驟需求
        </div>
        <LinkButton href={toolUrls.gem} icon="open_in_new">
          開啟 Gem
        </LinkButton>
      </Rise>
      <Rise delay={400} motion={BOUNCY} style={{ ...glass, padding: '32px 40px' }}>
        <div style={{ fontSize: 46, fontWeight: 900 }}>咒語全文（Google 文件）</div>
        <div style={{ fontSize: 33, color: muted, margin: '8px 0 22px' }}>
          方便複製，存到自己的 Gem 或 Skill
        </div>
        <LinkButton href={toolUrls.spellDoc} icon="description" tone="ghost">
          咒語文件
        </LinkButton>
      </Rise>
    </div>
    <Footer />
  </Stage>
);

const SpellCard = ({
  n,
  icon,
  title,
  plain,
  code,
  delay,
}: {
  n: string;
  icon: string;
  title: string;
  plain: ReactNode;
  code: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    motion={BOUNCY}
    style={{
      ...glass,
      width: 533,
      height: 640,
      padding: '40px 40px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tile icon={icon} size={80} radius={24} iconSize={44} />
      <div>
        <div style={{ ...eyebrow, fontSize: 28 }}>咒語 {n}</div>
        <div style={{ fontSize: 48, fontWeight: 900 }}>{title}</div>
      </div>
    </div>
    <div style={{ fontSize: 34, lineHeight: 1.6, margin: '28px 0 20px', fontWeight: 600 }}>
      {plain}
    </div>
    <div
      style={{
        marginTop: 'auto',
        background: night,
        color: mint,
        borderRadius: 18,
        padding: '18px 22px',
        fontFamily: 'Consolas, monospace',
        fontSize: 23,
        lineHeight: 1.5,
        whiteSpace: 'pre',
      }}
    >
      {code}
    </div>
  </Rise>
);

const SpellExplain: Page = () => (
  <Stage>
    <HeaderRow icon="auto_fix_high" title="咒語在說什麼？白話版" />
    <SubLine>看不懂程式沒關係，知道它在幫你做什麼就好</SubLine>
    <div style={{ position: 'absolute', left: 120, top: 310, display: 'flex', gap: 40 }}>
      <SpellCard
        n="1"
        icon="key"
        title="鑰匙留空"
        plain={
          <>
            AI 的「鑰匙」留空白，Canvas 會自動補上。
            <br />
            工具<b style={{ color: 'var(--osd-accent)' }}>絕不向使用者要鑰匙</b>，大家打開就能用。
          </>
        }
        code={'const apiKey = "";'}
        delay={150}
      />
      <SpellCard
        n="2"
        icon="smart_toy"
        title="指定 AI 模型"
        plain={
          <>
            出題用<b style={{ color: 'var(--osd-accent)' }}>文字模型</b>
            ，並要求照固定表格回答，格式不會跑掉； 要配圖時改用
            <b style={{ color: 'var(--osd-accent)' }}>生圖模型</b>，圖片可放進網頁和 Word。
          </>
        }
        code={'gemini-2.5-flash-preview-09-2025\ngemini-3.1-flash-image-preview'}
        delay={250}
      />
      <SpellCard
        n="3"
        icon="restart_alt"
        title="忙線自動重試"
        plain={
          <>
            AI 太忙或網路不穩時，工具會<b style={{ color: 'var(--osd-accent)' }}>等一下再試</b>
            ，每次等久一點，最多試 5 次，不會直接當掉。
          </>
        }
        code={'fetchWithBackoff(url, options, 5)'}
        delay={350}
      />
    </div>
    <Footer />
  </Stage>
);

const ZoomIn: Page = () => (
  <Stage>
    <HeaderRow icon="open_in_full" title="生成後：放大再操作" />
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 120, top: 360 }}>
      <AnnotatedShot
        src={imgResultWindow}
        alt="生成後的小視窗"
        natW={1398}
        width={814}
        marks={[{ x: 1222, y: 100, w: 52, h: 50, tag: '按這裡放大' }]}
      />
      <div style={{ fontSize: 37, fontWeight: 800, marginTop: 24 }}>一開始是對話中的小視窗</div>
    </Rise>
    <Rise
      delay={360}
      kind="pop"
      motion={BOUNCY}
      style={{ position: 'absolute', left: 953, top: 504 }}
    >
      <Icon name="arrow_forward" size={72} color="var(--osd-accent)" />
    </Rise>
    <Rise delay={460} kind="materialize" style={{ position: 'absolute', left: 1036, top: 360 }}>
      <AnnotatedShot src={imgResultFull} alt="放大後的完整工具畫面" natW={1847} width={764} />
      <div style={{ fontSize: 37, fontWeight: 800, marginTop: 24 }}>
        放大後，操作和檢查都比較方便
      </div>
    </Rise>
    <Footer />
  </Stage>
);

const Ideas: Page = () => (
  <Stage>
    <HeaderRow icon="lightbulb" title="靈感清單：特教老師可以做什麼？" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 290,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 533px)',
        gap: 40,
      }}
    >
      {[
        { icon: 'menu_book', title: '國語文詞語教材生成器' },
        { icon: 'style', title: '生活字卡、注音字卡' },
        { icon: 'mood', title: '情緒溫度計' },
        { icon: 'auto_stories', title: '社會性故事圖卡' },
        { icon: 'calculate', title: '數學應用題情境改寫' },
        { icon: 'edit_note', title: 'IEP 文字草稿助手', note: '記得去識別化' },
      ].map((it, i) => (
        <Rise
          key={it.title}
          delay={150 + i * 70}
          motion={BOUNCY}
          style={{
            ...glass,
            height: 250,
            padding: '36px 40px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Tile icon={it.icon} size={80} radius={24} iconSize={44} tone="soft" />
          <div style={{ fontSize: 45, fontWeight: 900, marginTop: 24 }}>{it.title}</div>
          {it.note && (
            <div style={{ fontSize: 31, fontWeight: 700, color: warn, marginTop: 8 }}>
              {it.note}
            </div>
          )}
        </Rise>
      ))}
    </div>
    <Footer />
  </Stage>
);

const PracticeBuild: Page = () => (
  <Practice
    n="02"
    minutes={10}
    tool="從零做一個自己的工具"
    task={
      <>
        用四步驟說出需求，記得加「載入範例」按鈕。
        <br />
        做完別忘了：存檔三步驟！
      </>
    }
  >
    <LinkButton href={toolUrls.gem} icon="open_in_new">
      開啟生成器製作 Gem
    </LinkButton>
    <LinkButton href={toolUrls.spellDoc} icon="description" tone="ghost">
      咒語文件
    </LinkButton>
  </Practice>
);

/* ─────────────────────────── Part 4 ─────────────────────────── */

const Part4: Page = () => (
  <PartDivider
    part="PART 04"
    num="04"
    time="19:45 – 20:00"
    icon="apps"
    morphId="tile-part4"
    line1="把連結集中成"
    line2="我的工具箱"
  />
);

const LostLinks: Page = () => (
  <Stage>
    <HeaderRow icon="apps" morphId="tile-part4" title="工具越做越多，連結去哪了？" />
    <Rise
      delay={200}
      style={{
        ...glass,
        position: 'absolute',
        left: 120,
        top: 290,
        width: 700,
        height: 560,
        padding: '40px 44px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div style={{ fontSize: 43, fontWeight: 900, marginBottom: 12 }}>連結散落各處</div>
      <ContrastRow icon="chat" tone="pain" text="LINE 聊天紀錄" />
      <ContrastRow icon="history" tone="pain" text="Gemini 對話紀錄" />
      <ContrastRow icon="tab" tone="pain" text="瀏覽器分頁" />
      <ContrastRow icon="search" tone="pain" text="要用的時候找不到" />
    </Rise>
    <Rise
      delay={360}
      kind="pop"
      motion={BOUNCY}
      style={{ position: 'absolute', left: 852, top: 530 }}
    >
      <Icon name="arrow_forward" size={80} color="var(--osd-accent)" />
    </Rise>
    <Rise
      delay={460}
      kind="materialize"
      style={{
        ...glass,
        position: 'absolute',
        left: 980,
        top: 290,
        width: 820,
        height: 560,
        borderRadius: 28,
        overflow: 'hidden',
        background: paper,
      }}
    >
      <FrameBar label="我的教學工具箱" />
      <div style={{ padding: '36px 44px' }}>
        <div style={{ fontSize: 56, fontWeight: 900 }}>我的教學工具箱</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            marginTop: 32,
          }}
        >
          {['國文課堂學習單', '國文個別化出題', '數學簡化學習單', '工作分析圖文生成'].map((t) => (
            <span
              key={t}
              style={{
                ...brandFill,
                borderRadius: 24,
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 41,
                fontWeight: 900,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Rise>
    <Footer />
  </Stage>
);
LostLinks.transition = morphTransition;

const ToolboxPrompt: Page = () => (
  <Stage>
    <HeaderRow icon="auto_awesome" title="一段話做出工具箱" />
    <SubLine>開 Canvas，把記事本內容整份貼進去</SubLine>
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 120, top: 300 }}>
      <AnnotatedShot
        src={imgToolboxPrompt}
        alt="在 Gemini 輸入整理工具箱的指令"
        natW={952}
        width={1000}
        label="gemini.google.com"
        marks={[
          { x: 120, y: 300, w: 134, h: 48, tag: '記得開 Canvas', tagBelow: true, tagLeft: true },
        ]}
      />
    </Rise>
    <Rise
      delay={360}
      style={{
        ...glass,
        position: 'absolute',
        left: 1180,
        top: 300,
        width: 620,
        padding: '40px 44px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ ...eyebrow, marginBottom: 20 }}>指令這樣寫</div>
      <Quote>
        幫我把以下連結整理成一個教學工具箱的網頁，按鈕名稱和連結如下：
        <br />
        <Blank>（貼上記事本內容）</Blank>
      </Quote>
    </Rise>
    <Rise delay={480} style={{ position: 'absolute', left: 1180, top: 760, width: 620 }}>
      <Chip strong>
        <Icon name="add" size={32} />
        多一個工具：「再加一顆按鈕」＋名字和連結
      </Chip>
    </Rise>
    <Footer />
  </Stage>
);

const ToolboxResult: Page = () => (
  <Stage>
    <HeaderRow icon="apps" title="完成：我的教學工具箱" />
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 120, top: 250 }}>
      <AnnotatedShot
        src={imgToolboxResult}
        alt="Gemini 生成的教學工具箱網頁"
        natW={1199}
        width={1000}
        label="AI 數位教學工具箱"
        marks={[{ x: 61, y: 740, w: 448, h: 55, tag: '按鈕名稱 = 記事本取的名字' }]}
      />
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 1180,
        top: 270,
        width: 620,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <NumRow n="1" title="每個工具一顆按鈕" desc="點了就打開那個工具" delay={300} />
      <NumRow n="2" title="自動分類、加上說明" desc="國文、數學、特教輔助一目了然" delay={400} />
      <NumRow n="3" title="做好後一樣按分享" desc="工具箱連結也存進記事本" delay={500} />
    </div>
    <Footer />
  </Stage>
);

const githubVideoUrl = 'https://www.youtube.com/watch?v=8Nd71kGVfj8&t=258s';

const PracticeToolbox: Page = () => (
  <Practice
    n="03"
    minutes={10}
    tool="做一個我的教學工具箱"
    task={
      <>
        把記事本的名字和網址貼給 AI，做成按鈕工具箱。
        <br />
        做完一樣按分享，把工具箱連結存起來！
      </>
    }
  />
);

const MyExample: Page = () => (
  <Stage>
    <HeaderRow icon="travel_explore" title="米克師的範例" />
    <SubLine>工具多了以後，可以整理成固定的網站入口</SubLine>
    <Rise delay={200} kind="materialize" style={{ position: 'absolute', left: 120, top: 300 }}>
      <a href={mixerSiteUrls.prep} target="_blank" rel="noreferrer" style={linkReset}>
        <BrowserFrame src={imgMixerAiPrep} width={880} height={625} url="spedmix.pages.dev" />
      </a>
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 1040,
        top: 300,
        width: 760,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <NumRow n="1" title="先用 Canvas 工具箱" desc="一段話就做好，最快上手" delay={300} />
      <NumRow n="2" title="想要固定網址" desc="Google 協作平台，免寫程式也免費" delay={400} />
      <NumRow
        n="3"
        title="進階：GitHub ＋ AI Agent"
        desc="固定網址，想改就請 Agent 幫你改"
        delay={500}
      />
      <Rise delay={600}>
        <LinkButton href={githubVideoUrl} icon="play_arrow" tone="ghost">
          教學影片：Antigravity＋GitHub
        </LinkButton>
      </Rise>
    </div>
    <Footer />
  </Stage>
);

const Takeaway: Page = () => (
  <Stage>
    <div style={{ position: 'absolute', left: 120, top: 120 }}>
      <Rise>
        <div style={eyebrow}>今天帶走</div>
      </Rise>
      <Rise delay={100} style={{ marginTop: 24 }}>
        <h2 style={{ ...h2, fontSize: 123, lineHeight: 1.2 }}>
          記住<span style={gradText}>三件事</span>
        </h2>
      </Rise>
      <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Steps>
          <Step duration={1}>
            <TakeawayRow title="先改編" detail="不要從零開始，改現成的最快" />
          </Step>
          <Step duration={1}>
            <TakeawayRow title="一次只改一件事" detail="壞了才知道是哪裡壞的" />
          </Step>
          <Step duration={1}>
            <TakeawayRow title="做完就存檔" detail="分享 → 複製連結 → 記事本取名字" />
          </Step>
        </Steps>
      </div>
    </div>
    <Footer />
  </Stage>
);

const ShareBack: Page = () => (
  <Stage>
    <HeaderRow icon="share" title="分享給別人：按分享按鈕就好" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 290,
        width: 780,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <NumRow
        n="1"
        title="按右上角分享圖示，選「共用」"
        desc="Canvas 工具列最右邊的分享鈕"
        delay={200}
      />
      <NumRow n="2" title="按「複製連結」" desc="出現「✓ 已複製連結」就成功了" delay={300} />
      <NumRow
        n="3"
        title="貼給同事"
        desc="對方登入 Google 就能用，也能按「試用 Gemini Canvas」改成自己的"
        delay={400}
      />
    </div>
    <Rise delay={300} kind="materialize" style={{ position: 'absolute', left: 960, top: 290 }}>
      <AnnotatedShot
        src={imgShareMenu}
        alt="分享選單"
        natW={225}
        width={280}
        marks={[{ x: 33, y: 67, w: 132, h: 54 }]}
      />
    </Rise>
    <Rise delay={450} kind="materialize" style={{ position: 'absolute', left: 1240, top: 400 }}>
      <AnnotatedShot
        src={imgShareDialog}
        alt="Canvas 的公開分享連結視窗"
        natW={752}
        width={560}
        marks={[{ x: 513, y: 120, w: 185, h: 46, tag: '複製連結', tagBelow: true }]}
      />
    </Rise>
    <Footer />
  </Stage>
);

export const meta: SlideMeta = {
  title: 'Vibe Coding 自製個人 AI 工具',
  createdAt: '2026-10-30T00:00:00.000Z',
};

export default [
  Cover,
  Speaker,
  SocialLinks,
  Agenda,
  Part1,
  Pain,
  KnowStudents,
  VibeCoding,
  CanvasIntro,
  BenefitAi,
  BenefitImage,
  BenefitShare,
  Limits,
  Part2,
  RemixWhy,
  RemixSteps,
  TryButton,
  RemixCopied,
  RemixDemo,
  ReadyTools,
  PracticeRemix,
  SaveSteps,
  Notepad,
  OneThing,
  SeeWant,
  Rescue,
  Break,
  Part3,
  BuildSteps,
  NameFirst,
  ImagineUi,
  ImagineOutput,
  PasteSheet,
  LoadExample,
  RealPrompt,
  CopyPrompt,
  UseGem,
  SpellExplain,
  ZoomIn,
  PracticeBuild,
  Part4,
  LostLinks,
  ToolboxPrompt,
  ToolboxResult,
  PracticeToolbox,
  MyExample,
  Takeaway,
  ShareBack,
  Closing,
] satisfies Page[];
