import imgHeadshot from '@assets/headshot.webp';
import imgMixerAiPrep from '@assets/mixer-ai-prep.webp';
import imgMixerShare from '@assets/mixer-share.webp';
import imgMixerTeaching from '@assets/mixer-teaching.webp';
import {
  type DesignSystem,
  ImagePlaceholder,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';
import imgAddPage from './assets/add-page.png';
import imgBannerTitle from './assets/banner-title.png';
import imgChineseReading from './assets/chinese-scaffold-reading.webp';
import imgClaudeCategory from './assets/claude-add-category.png';
import imgClaudeLinks from './assets/claude-project-links.png';
import imgClaudeShare from './assets/claude-share.png';
import imgClaudeUpdate from './assets/claude-update-public.png';
import imgContentBlock from './assets/content-block.png';
import imgEmbedCode from './assets/embed-code.png';
import imgEmbedEmpty from './assets/embed-empty.png';
import imgEmbedPlaced from './assets/embed-placed.png';
import imgEmbedPreview from './assets/embed-preview.png';
import imgFabMenu from './assets/fab-menu.png';
import imgGeminiExport from './assets/gemini-export-sites.webp';
import imgGeminiSites from './assets/gemini-sites-editor.webp';
import imgInsertButton from './assets/insert-button.png';
import imgInsertPanel from './assets/insert-panel.png';
import imgStepMath from './assets/interactive-step-math.webp';
import imgMathConcept from './assets/math-ebook-concept.webp';
import imgSettingsBrand from './assets/settings-brand.png';
import imgSiteNameLogo from './assets/site-name-logo.png';
import imgSitesHome from './assets/sites-home.png';
import imgSkillAt from './assets/skill-at.png';
import imgSkillChatWord from './assets/skill-chat-word.png';
import imgSkillGame from './assets/skill-game.png';
import imgSkillMake from './assets/skill-make.png';
import imgSkillTest from './assets/skill-test.png';
import imgEnglish from './assets/special-ed-english-screenshot.png';
import imgTheme from './assets/theme.png';
import imgUnscramble from './assets/unscramble.webp';

export const design: DesignSystem = {
  palette: { bg: '#FCFBFF', text: '#1F2937', accent: '#7C3AED' },
  fonts: {
    display: '"Outfit", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
    body: '"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 104, body: 34 },
  radius: 32,
};

const deep = '#4C1D95';
const pink = '#EC4899';
const sky = '#0EA5E9';
const muted = '#6B7280';

const SLIDE_ID = 'google-sites-materials';

const urls = {
  sites: 'https://sites.google.com/',
  gemini: 'https://gemini.google.com/',
  prep: 'https://spedmix.pages.dev/',
  share: 'https://spedmixshare.pages.dev/',
  teaching: 'https://spedmixteaching.pages.dev/',
  instagram: 'https://www.instagram.com/spedmix2025/',
  facebook: 'https://www.facebook.com/p/%E7%B1%B3%E5%85%8B%E5%B8%AB-61583357100870/',
  threads: 'https://www.threads.com/@spedmix2025',
  chineseLessonWorksheet: 'https://spedmix.pages.dev/chinese-lesson-worksheet',
  mathScaffold: 'https://spedmix.pages.dev/math-scaffold',
  specialEdEnglish: 'https://spedmix.pages.dev/special-ed-english-worksheet',
  unscramble: 'https://spedmix.pages.dev/unscramble',
  interactiveMath: 'https://spedmix.pages.dev/interativemath',
} as const;

const exampleUrl =
  'https://sites.google.com/view/centralteachers/%E4%B8%AD%E5%8D%80%E8%81%AF%E7%9B%9F';

const qr = (url: string) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=${encodeURIComponent(url)}`;

const ICONS = [
  'alternate_email',
  'arrow_forward',
  'auto_awesome',
  'auto_stories',
  'autorenew',
  'calculate',
  'campaign',
  'cancel',
  'check_circle',
  'cloud',
  'code',
  'coffee',
  'dashboard',
  'description',
  'devices',
  'diversity_3',
  'download',
  'edit',
  'emoji_events',
  'folder',
  'folder_open',
  'forum',
  'help',
  'layers',
  'lightbulb',
  'link',
  'menu_book',
  'money_off',
  'open_in_new',
  'palette',
  'pause',
  'person',
  'play_arrow',
  'publish',
  'reorder',
  'restart_alt',
  'school',
  'search',
  'short_text',
  'smart_button',
  'smartphone',
  'spellcheck',
  'timer',
  'toc',
  'touch_app',
  'translate',
  'travel_explore',
  'unfold_more',
  'update',
  'view_agenda',
  'web',
  'work',
].sort();

const FONT_LINKS: [string, string][] = [
  [
    `osd-webfont-${SLIDE_ID}`,
    'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Outfit:wght@600;800&display=swap',
  ],
  [
    `osd-icons-${SLIDE_ID}`,
    `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,500,1,0&icon_names=${ICONS.join(',')}&display=block`,
  ],
];

const css = `
[data-osd-current-page] { z-index: 1; }
@keyframes gsm-rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
@keyframes gsm-fade { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .gsm-anim { animation-name: gsm-fade !important; animation-duration: 200ms !important; }
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

export const transition: SlideTransition = {
  duration: 240,
  exit: {
    duration: 240,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    keyframes: [{ opacity: 1 }, { opacity: 1 }],
  },
  enter: {
    duration: 240,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
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

const card: CSSProperties = {
  background: 'rgba(255, 255, 255, 0.86)',
  border: '1px solid rgba(124, 58, 237, 0.10)',
  borderRadius: 'var(--osd-radius)',
  boxShadow: '0 28px 60px -34px rgba(76, 29, 149, 0.30), 0 2px 6px rgba(31, 41, 55, 0.04)',
};

const gradText: CSSProperties = {
  background: `linear-gradient(120deg, var(--osd-accent) 0%, ${pink} 55%, ${sky} 100%)`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

const gradFill = `linear-gradient(135deg, var(--osd-accent) 0%, ${pink} 100%)`;

const eyebrow: CSSProperties = {
  fontFamily: 'var(--osd-font-display)',
  fontSize: 26,
  fontWeight: 800,
  letterSpacing: '0.14em',
  color: 'var(--osd-accent)',
};

const h2: CSSProperties = {
  fontFamily: 'var(--osd-font-display)',
  fontSize: 64,
  fontWeight: 900,
  lineHeight: 1.2,
  letterSpacing: '-0.01em',
  margin: 0,
};

const pill: CSSProperties = {
  alignSelf: 'flex-start',
  fontSize: 24,
  fontWeight: 700,
  color: 'var(--osd-accent)',
  background: 'rgba(124, 58, 237, 0.10)',
  borderRadius: 999,
  padding: '6px 22px',
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

const Blob = ({ x, y, size, color }: { x: number; y: number; size: number; color: string }) => (
  <div
    style={{
      position: 'absolute',
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 66%)`,
      pointerEvents: 'none',
    }}
  />
);

const Stage = ({ children, bold = false }: { children: ReactNode; bold?: boolean }) => (
  <div style={fill}>
    <Blob x={160} y={120} size={bold ? 1300 : 1000} color="rgba(244, 114, 182, 0.24)" />
    <Blob x={1780} y={1000} size={bold ? 1400 : 1100} color="rgba(56, 189, 248, 0.24)" />
    <Blob x={1520} y={140} size={bold ? 1000 : 760} color="rgba(167, 139, 250, 0.20)" />
    {children}
  </div>
);

const Rise = ({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) => {
  const active = useIsActivePage();
  return (
    <div
      className={active ? 'gsm-anim' : undefined}
      style={{
        ...style,
        animation: active
          ? `gsm-rise 560ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms both`
          : undefined,
      }}
    >
      {children}
    </div>
  );
};

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 40,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 22,
        color: muted,
        fontWeight: 500,
      }}
    >
      <span>
        Google Sites 教材共享站<span style={{ margin: '0 12px', opacity: 0.4 }}>|</span>米克師
      </span>
      <span style={{ fontFamily: 'var(--osd-font-display)', fontVariantNumeric: 'tabular-nums' }}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Header = ({ tag, title, sub }: { tag: string; title: ReactNode; sub?: ReactNode }) => (
  <div style={{ position: 'absolute', left: 120, right: 120, top: 92 }}>
    <Rise>
      <div style={eyebrow}>{tag}</div>
    </Rise>
    <Rise delay={80} style={{ marginTop: 12 }}>
      <h2 style={h2}>{title}</h2>
    </Rise>
    {sub && (
      <Rise delay={140} style={{ marginTop: 12 }}>
        <p style={{ fontSize: 30, color: muted, margin: 0 }}>{sub}</p>
      </Rise>
    )}
  </div>
);

const Tile = ({
  icon,
  size = 88,
  soft = false,
}: {
  icon: string;
  size?: number;
  soft?: boolean;
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.3,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: soft ? 'rgba(124, 58, 237, 0.10)' : gradFill,
      boxShadow: soft ? 'none' : '0 16px 32px -14px rgba(124, 58, 237, 0.6)',
    }}
  >
    <Icon name={icon} size={size * 0.55} color={soft ? 'var(--osd-accent)' : '#ffffff'} />
  </div>
);

const NumBadge = ({ n, size = 56 }: { n: string; size?: number }) => (
  <span
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: gradFill,
      color: '#ffffff',
      fontFamily: 'var(--osd-font-display)',
      fontSize: size * 0.48,
      fontWeight: 800,
    }}
  >
    {n}
  </span>
);

const StepRow = ({
  n,
  children,
  delay,
  size = 34,
  height = 88,
}: {
  n: string;
  children: ReactNode;
  delay: number;
  size?: number;
  height?: number;
}) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      borderRadius: 24,
      minHeight: height,
      boxSizing: 'border-box',
      padding: '12px 28px 12px 18px',
      display: 'flex',
      alignItems: 'center',
      gap: 22,
    }}
  >
    <NumBadge n={n} size={Math.round(height * 0.62)} />
    <span style={{ fontSize: size, fontWeight: 700, lineHeight: 1.35 }}>{children}</span>
  </Rise>
);

const Shot = ({
  src,
  alt,
  maxW,
  maxH,
  delay = 160,
}: {
  src: string;
  alt: string;
  maxW: number;
  maxH: number;
  delay?: number;
}) => (
  <Rise delay={delay} style={{ ...card, padding: 14, borderRadius: 28, display: 'inline-block' }}>
    <img
      src={src}
      alt={alt}
      style={{ display: 'block', maxWidth: maxW, maxHeight: maxH, borderRadius: 16 }}
    />
  </Rise>
);

const Tip = ({ children, delay = 500 }: { children: ReactNode; delay?: number }) => (
  <Rise
    delay={delay}
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      fontSize: 28,
      lineHeight: 1.5,
      color: deep,
      background: 'rgba(124, 58, 237, 0.08)',
      borderRadius: 22,
      padding: '18px 24px',
    }}
  >
    <Icon name="lightbulb" size={34} color="var(--osd-accent)" />
    <span>{children}</span>
  </Rise>
);

const ScreenPage = ({
  tag,
  title,
  sub,
  children,
  visual,
  leftWidth = 660,
}: {
  tag: string;
  title: ReactNode;
  sub?: ReactNode;
  children: ReactNode;
  visual: ReactNode;
  leftWidth?: number;
}) => (
  <Stage>
    <Header tag={tag} title={title} sub={sub} />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: sub ? 330 : 290,
        width: leftWidth,
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      {children}
    </div>
    <div
      style={{
        position: 'absolute',
        left: 120 + leftWidth + 60,
        right: 120,
        top: 260,
        bottom: 110,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      {visual}
    </div>
    <Footer />
  </Stage>
);

const PartPage = ({
  num,
  title,
  sub,
  icon,
}: {
  num: string;
  title: ReactNode;
  sub: string;
  icon: string;
}) => (
  <Stage bold>
    <div
      style={{
        position: 'absolute',
        left: 160,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Rise style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <Tile icon={icon} size={112} />
        <span style={{ ...eyebrow, fontSize: 34 }}>PART {num}</span>
      </Rise>
      <Rise delay={100} style={{ marginTop: 40 }}>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 112,
            fontWeight: 900,
            lineHeight: 1.12,
            margin: 0,
          }}
        >
          {title}
        </h1>
      </Rise>
      <Rise delay={200} style={{ marginTop: 32 }}>
        <p style={{ fontSize: 38, color: muted, margin: 0 }}>{sub}</p>
      </Rise>
    </div>
    <div
      style={{
        position: 'absolute',
        right: 120,
        bottom: 60,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 360,
        fontWeight: 800,
        lineHeight: 1,
        opacity: 0.22,
        ...gradText,
      }}
    >
      {num}
    </div>
  </Stage>
);

const Countdown = ({ minutes, size = 160 }: { minutes: number; size?: number }) => {
  const [left, setLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  const btn: CSSProperties = {
    width: 76,
    height: 76,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: size,
          fontWeight: 800,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          color: left === 0 ? pink : 'var(--osd-text)',
        }}
      >
        {mm}:{ss}
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        <button
          type="button"
          aria-label={running ? '暫停' : '開始'}
          onClick={(e) => {
            e.stopPropagation();
            setRunning((r) => !r);
          }}
          style={{ ...btn, background: gradFill }}
        >
          <Icon name={running ? 'pause' : 'play_arrow'} size={44} color="#ffffff" />
        </button>
        <button
          type="button"
          aria-label="重設"
          onClick={(e) => {
            e.stopPropagation();
            setRunning(false);
            setLeft(minutes * 60);
          }}
          style={{ ...btn, background: 'rgba(124, 58, 237, 0.10)' }}
        >
          <Icon name="restart_alt" size={40} color="var(--osd-accent)" />
        </button>
      </div>
    </div>
  );
};

const QrCard = ({
  url,
  label,
  title,
  delay,
  size = 220,
  shown,
}: {
  url: string;
  label: string;
  title: string;
  delay: number;
  size?: number;
  shown?: string;
}) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18,
    }}
  >
    <a href={url} target="_blank" rel="noreferrer" style={linkReset}>
      <img src={qr(url)} alt={`${title} QR code`} style={{ width: size, height: size }} />
    </a>
    <span style={{ ...pill, alignSelf: 'center' }}>{label}</span>
    <div style={{ fontSize: 34, fontWeight: 900 }}>{title}</div>
    <div style={{ fontSize: 22, color: muted }}>
      {shown ?? url.replace(/^https:\/\//, '').replace(/\/$/, '')}
    </div>
  </Rise>
);

/* 開場 */

const Cover: Page = () => (
  <Stage bold>
    <div
      style={{
        position: 'absolute',
        left: 140,
        top: 0,
        bottom: 0,
        width: 940,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Rise>
        <span style={{ ...pill, fontSize: 28, padding: '10px 28px' }}>
          中區聯盟特教教材 · 實作工作坊
        </span>
      </Rise>
      <Rise delay={100} style={{ marginTop: 40 }}>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'var(--osd-size-hero)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          用 Google Sites
          <br />
          <span style={gradText}>打造特教教材共享站</span>
        </h1>
      </Rise>
      <Rise delay={200} style={{ marginTop: 28 }}>
        <p style={{ fontSize: 40, color: muted, margin: 0, fontWeight: 500 }}>
          用 AI 整理教材，用 Google Sites 上架
        </p>
      </Rise>
      <Rise
        delay={300}
        style={{
          ...card,
          marginTop: 56,
          alignSelf: 'flex-start',
          borderRadius: 999,
          padding: '12px 40px 12px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 22,
        }}
      >
        <img
          src={imgHeadshot}
          alt="講師照片"
          style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <div style={{ fontSize: 34, fontWeight: 900 }}>米克師 朱旆誼</div>
          <div style={{ fontSize: 24, color: muted }}>宜蘭縣凱旋國中特教教師 · SPEDMIX</div>
        </div>
      </Rise>
      <Rise delay={380} style={{ marginTop: 28 }}>
        <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, color: muted }}>
          2026.11.21
        </span>
      </Rise>
    </div>
    <Rise
      delay={260}
      style={{
        position: 'absolute',
        left: 1120,
        top: 250,
        transform: 'rotate(3deg)',
      }}
    >
      <div style={{ ...card, padding: 14, borderRadius: 28 }}>
        <img
          src={imgEmbedPlaced}
          alt="Google Sites 編輯畫面"
          style={{ display: 'block', width: 660, borderRadius: 16 }}
        />
      </div>
    </Rise>
  </Stage>
);

const AgendaCard = ({
  part,
  icon,
  title,
  sub,
  delay,
}: {
  part: string;
  icon: string;
  title: string;
  sub: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      width: 392,
      height: 440,
      boxSizing: 'border-box',
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Tile icon={icon} size={88} />
    <div style={{ ...eyebrow, marginTop: 36 }}>{part}</div>
    <div style={{ fontSize: 42, fontWeight: 900, marginTop: 12, lineHeight: 1.3 }}>{title}</div>
    <div style={{ fontSize: 28, color: muted, marginTop: 'auto', lineHeight: 1.5 }}>{sub}</div>
  </Rise>
);

const Agenda: Page = () => (
  <Stage>
    <Header tag="TODAY" title="今天的流程" />
    <div style={{ position: 'absolute', left: 120, top: 330, display: 'flex', gap: 37 }}>
      <AgendaCard
        part="OPENING"
        icon="person"
        title="開場"
        sub="教材為什麼要整理、上架"
        delay={120}
      />
      <AgendaCard
        part="PART 01"
        icon="web"
        title="AI 整理＋Google Sites"
        sub="示範＋實作 15 分鐘"
        delay={200}
      />
      <AgendaCard
        part="PART 02"
        icon="auto_awesome"
        title="Skills"
        sub="讓 5 個機器人延續下去"
        delay={280}
      />
      <AgendaCard
        part="PART 03"
        icon="school"
        title="AI 備課幫手"
        sub="米克師的備課工具箱"
        delay={360}
      />
    </div>
    <Footer />
  </Stage>
);

const BioRow = ({ school, dept, delay }: { school: string; dept: string; delay: number }) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      height: 124,
      borderRadius: 26,
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
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 4 }}>
    <Tile icon={icon} size={56} soft />
    <span style={{ fontSize: 32, fontWeight: 900 }}>{children}</span>
  </div>
);

const Speaker: Page = () => (
  <Stage>
    <Header tag="ABOUT" title="講者介紹" />
    <Rise
      delay={120}
      style={{
        ...card,
        position: 'absolute',
        left: 120,
        top: 280,
        width: 440,
        height: 660,
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
      <span style={{ ...pill, alignSelf: 'center', marginTop: 16 }}>米克師 · @spedmix2025</span>
    </Rise>
    <div
      style={{
        position: 'absolute',
        left: 620,
        top: 280,
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

const SocialCard = ({
  href,
  platform,
  handle,
  color,
  letter,
  delay,
}: {
  href: string;
  platform: string;
  handle: string;
  color: string;
  letter: string;
  delay: number;
}) => (
  <Rise delay={delay}>
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        ...linkReset,
        ...card,
        width: 520,
        height: 240,
        boxSizing: 'border-box',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        gap: 32,
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
          fontFamily: 'var(--osd-font-display)',
          fontSize: 56,
          fontWeight: 800,
        }}
      >
        {letter}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 800 }}>
          {platform}
        </div>
        <div style={{ fontSize: 30, fontWeight: 700, color, marginTop: 4 }}>{handle}</div>
      </div>
    </a>
  </Rise>
);

const SocialLinks: Page = () => (
  <Stage>
    <Header tag="SPEDMIX" title="我的社群" sub="教材更新、工具分享、研習資訊，都在這裡第一手發布" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 430,
        display: 'flex',
        justifyContent: 'center',
        gap: 40,
      }}
    >
      <SocialCard
        href={urls.instagram}
        platform="Instagram"
        handle="@spedmix2025"
        color="#d62976"
        letter="IG"
        delay={200}
      />
      <SocialCard
        href={urls.facebook}
        platform="Facebook"
        handle="米克師"
        color="#1877f2"
        letter="f"
        delay={280}
      />
      <SocialCard
        href={urls.threads}
        platform="Threads"
        handle="@spedmix2025"
        color="#111827"
        letter="@"
        delay={360}
      />
    </div>
    <Footer />
  </Stage>
);

const SiteColumn = ({
  src,
  href,
  label,
  title,
  desc,
  delay,
}: {
  src: string;
  href: string;
  label: string;
  title: string;
  desc: string;
  delay: number;
}) => (
  <Rise delay={delay} style={{ width: 528 }}>
    <a href={href} target="_blank" rel="noreferrer" style={linkReset}>
      <div style={{ ...card, padding: 12, borderRadius: 26 }}>
        <img
          src={src}
          alt={title}
          style={{
            display: 'block',
            width: 504,
            height: 260,
            objectFit: 'cover',
            objectPosition: 'top',
            borderRadius: 16,
          }}
        />
      </div>
    </a>
    <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column' }}>
      <span style={pill}>{label}</span>
      <div style={{ fontSize: 42, fontWeight: 900, marginTop: 18 }}>{title}</div>
      <div style={{ fontSize: 26, lineHeight: 1.55, color: muted, marginTop: 10 }}>{desc}</div>
    </div>
  </Rise>
);

const MixerSites: Page = () => (
  <Stage>
    <Header tag="SPEDMIX" title="我的三個網站" sub="備課、共享、學生練習，各有一個入口" />
    <div style={{ position: 'absolute', left: 120, top: 340, display: 'flex', gap: 48 }}>
      <SiteColumn
        src={imgMixerAiPrep}
        href={urls.prep}
        label="備課入口"
        title="AI 備課幫手"
        desc="生成教材、學習單與備課工具的主要入口。"
        delay={150}
      />
      <SiteColumn
        src={imgMixerShare}
        href={urls.share}
        label="共享入口"
        title="特教教材共享"
        desc="整理可分享的教材與資源，快速找到可改用的素材。"
        delay={230}
      />
      <SiteColumn
        src={imgMixerTeaching}
        href={urls.teaching}
        label="學生入口"
        title="步步練"
        desc="學生端的互動教材，自學與課堂練習都好上手。"
        delay={310}
      />
    </div>
    <Footer />
  </Stage>
);

const GemCard = ({ icon, name, delay }: { icon: string; name: string; delay: number }) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      width: 312,
      height: 320,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
    }}
  >
    <Tile icon={icon} size={112} />
    <div style={{ fontSize: 40, fontWeight: 900 }}>{name}</div>
  </Rise>
);

const FiveGems: Page = () => (
  <Stage>
    <Header
      tag="WHERE WE ARE"
      title="社群的 5 個教材機器人"
      sub="社群老師各自用 Gem 做的通用設計國語文機器人"
    />
    <div style={{ position: 'absolute', left: 120, top: 380, display: 'flex', gap: 30 }}>
      <GemCard icon="edit" name="生字" delay={160} />
      <GemCard icon="spellcheck" name="語詞" delay={220} />
      <GemCard icon="reorder" name="句型" delay={280} />
      <GemCard icon="short_text" name="句子" delay={340} />
      <GemCard icon="auto_stories" name="課文閱讀" delay={400} />
    </div>
    <Rise
      delay={600}
      style={{ position: 'absolute', left: 120, right: 120, top: 760, textAlign: 'center' }}
    >
      <span style={{ fontSize: 44, fontWeight: 900 }}>
        做出來的教材，<span style={gradText}>放在哪裡？</span>
      </span>
    </Rise>
    <Footer />
  </Stage>
);

const MessNote = ({
  icon,
  text,
  x,
  y,
  tilt,
  delay,
}: {
  icon: string;
  text: string;
  x: number;
  y: number;
  tilt: number;
  delay: number;
}) => (
  <Rise delay={delay} style={{ position: 'absolute', left: x, top: y }}>
    <div
      style={{
        ...card,
        transform: `rotate(${tilt}deg)`,
        padding: '28px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: 22,
      }}
    >
      <Tile icon={icon} size={72} soft />
      <span style={{ fontSize: 38, fontWeight: 700 }}>{text}</span>
    </div>
  </Rise>
);

const Mess: Page = () => (
  <Stage>
    <Header tag="THE PROBLEM" title="教材做好了，卻找不到" />
    <MessNote icon="cloud" text="在某位老師自己的雲端" x={160} y={330} tilt={-3} delay={160} />
    <MessNote
      icon="description"
      text="檔名叫「新增文件 (3)」"
      x={1000}
      y={380}
      tilt={2}
      delay={260}
    />
    <MessNote icon="forum" text="在 LINE 群組裡往上滑…" x={260} y={620} tilt={2} delay={360} />
    <MessNote
      icon="layers"
      text="v2、v2 最終、v2 真的最終"
      x={1020}
      y={680}
      tilt={-2}
      delay={460}
    />
    <Footer />
  </Stage>
);

const WhyCard = ({
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
    style={{
      ...card,
      width: 528,
      height: 480,
      boxSizing: 'border-box',
      padding: 48,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Tile icon={icon} size={104} />
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 64,
        fontWeight: 900,
        marginTop: 48,
        ...gradText,
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: 32, color: muted, marginTop: 20, lineHeight: 1.5 }}>{desc}</div>
  </Rise>
);

const WhyPublish: Page = () => (
  <Stage>
    <Header tag="WHY" title="為什麼要整理、上架？" />
    <div style={{ position: 'absolute', left: 120, top: 330, display: 'flex', gap: 48 }}>
      <WhyCard icon="search" title="找得到" desc="一個網址，所有教材都在這裡" delay={160} />
      <WhyCard icon="download" title="拿得到" desc="點開就能用，不必再跟人要權限" delay={260} />
      <WhyCard
        icon="autorenew"
        title="用得久"
        desc="有固定位置，之後有人接手維護、上架"
        delay={360}
      />
    </div>
    <Footer />
  </Stage>
);

const ExampleSite: Page = () => (
  <Stage>
    <Header tag="GOAL" title="完成的範例站長這樣" sub="用 AI 整理成入口網頁，再放上 Google Sites" />
    <div style={{ position: 'absolute', left: 120, top: 340, width: 420 }}>
      <QrCard
        url={exampleUrl}
        shown="…/view/centralteachers"
        label="掃我看範例"
        title="中區聯盟"
        delay={160}
        size={260}
      />
    </div>
    <Rise
      delay={240}
      style={{ position: 'absolute', left: 600, top: 340, width: 1200, height: 600 }}
    >
      <ImagePlaceholder
        hint="範例站截圖（sites.google.com/view/centralteachers 中區聯盟頁）"
        width={1200}
        height={600}
      />
    </Rise>
    <Footer />
  </Stage>
);

const TakeCard = ({
  n,
  title,
  desc,
  icon,
  delay,
}: {
  n: string;
  title: string;
  desc: string;
  icon: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      width: 816,
      height: 440,
      boxSizing: 'border-box',
      padding: 56,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <NumBadge n={n} size={72} />
      <Tile icon={icon} size={72} soft />
    </div>
    <div style={{ fontSize: 56, fontWeight: 900, marginTop: 48 }}>{title}</div>
    <div style={{ fontSize: 32, color: muted, marginTop: 20, lineHeight: 1.5 }}>{desc}</div>
  </Rise>
);

const Takeaway: Page = () => (
  <Stage>
    <Header tag="TAKEAWAY" title="今天結束，你會帶走" />
    <div style={{ position: 'absolute', left: 120, top: 340, display: 'flex', gap: 48 }}>
      <TakeCard
        n="1"
        icon="web"
        title="一個自己的教材頁"
        desc="已經上架一份教材，網址可以直接分享"
        delay={160}
      />
      <TakeCard
        n="2"
        icon="auto_awesome"
        title="一個能用的 skill"
        desc="把機器人的備課流程打包，打 @ 就叫得出來"
        delay={260}
      />
    </div>
    <Footer />
  </Stage>
);

/* PART 1 Google Sites */

const Part1: Page = () => (
  <PartPage
    num="01"
    icon="web"
    title={
      <>
        AI 整理
        <br />
        Google Sites 上架
      </>
    }
    sub="AI 整理 → Google Sites 上架 → 實作 15 分鐘"
  />
);

const ListRow = ({
  n,
  name,
  url,
  unit,
  delay,
}: {
  n: string;
  name: string;
  url: string;
  unit: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr 420px 200px',
      alignItems: 'center',
      height: 74,
      padding: '0 32px',
      borderTop: '1px solid rgba(124, 58, 237, 0.08)',
      fontSize: 30,
    }}
  >
    <span
      style={{ fontFamily: 'var(--osd-font-display)', fontWeight: 800, color: 'var(--osd-accent)' }}
    >
      {n}
    </span>
    <span style={{ fontWeight: 700 }}>{name}</span>
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{ ...linkReset, color: sky, fontFamily: 'var(--osd-font-display)', fontSize: 28 }}
    >
      {url.replace('https://', '')}
    </a>
    <span style={{ color: muted }}>{unit}</span>
  </Rise>
);

const MaterialList: Page = () => (
  <Stage>
    <Header
      tag="STEP 0 · 整理"
      title="先整理成一張清單"
      sub="編號、名稱、網址、研發單位，四欄就夠"
    />
    <div
      style={{
        ...card,
        position: 'absolute',
        left: 120,
        right: 120,
        top: 320,
        paddingBottom: 8,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '90px 1fr 420px 200px',
          alignItems: 'center',
          height: 64,
          padding: '0 32px',
          fontSize: 24,
          fontWeight: 700,
          color: muted,
        }}
      >
        <span>編號</span>
        <span>名稱</span>
        <span>網址</span>
        <span>研發單位</span>
      </div>
      <ListRow
        n="1"
        name="通用設計學習國語文教材平台（UDL Master）"
        url="https://reurl.cc/j6nNA1"
        unit=""
        delay={120}
      />
      <ListRow
        n="2"
        name="生字探索樂園"
        url="https://reurl.cc/j6nNmD"
        unit="策略聯盟"
        delay={160}
      />
      <ListRow
        n="3"
        name="課文圈詞連連看"
        url="https://reurl.cc/R2ZpEr"
        unit="策略聯盟"
        delay={200}
      />
      <ListRow
        n="4"
        name="短語教材產生器"
        url="https://reurl.cc/8egKRd"
        unit="策略聯盟"
        delay={240}
      />
      <ListRow
        n="5"
        name="句型鷹架與仿寫"
        url="https://reurl.cc/mpmVjG"
        unit="策略聯盟"
        delay={280}
      />
      <ListRow
        n="6"
        name="課文結構學習單"
        url="https://reurl.cc/R2ZpVn"
        unit="策略聯盟"
        delay={320}
      />
      <ListRow
        n="7"
        name="課文閱讀理解學習單"
        url="https://reurl.cc/DxVR2N"
        unit="策略聯盟"
        delay={360}
      />
    </div>
    <Footer />
  </Stage>
);

const PromptPage: Page = () => (
  <Stage>
    <Header tag="咒語" title="一段話，做出入口網頁" sub="清單前面加一句話，整份貼給 AI" />
    <Rise
      delay={160}
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 340,
        borderRadius: 'var(--osd-radius)',
        padding: '44px 56px',
        background: gradFill,
        color: '#ffffff',
      }}
    >
      <div style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.5 }}>
        新增一個專案叫「策略聯盟AI研發教材」，把以下網址做成入口
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 30,
          lineHeight: 1.7,
          fontWeight: 500,
          background: 'rgba(255, 255, 255, 0.14)',
          borderRadius: 22,
          padding: '24px 32px',
        }}
      >
        編號　名稱　網址　研發單位
        <br />
        1　通用設計學習國語文教材平台（UDL Master）　https://reurl.cc/j6nNA1
        <br />
        2　生字探索樂園　https://reurl.cc/j6nNmD　策略聯盟
        <br />
        …（7 筆清單整份貼上）
      </div>
      <div style={{ marginTop: 28, fontSize: 34, fontWeight: 700 }}>
        做好再加一句：「要有分類功能」
      </div>
    </Rise>
    <Footer />
  </Stage>
);

const RouteCard = ({
  icon,
  name,
  badge,
  flow,
  good,
  delay,
}: {
  icon: string;
  name: string;
  badge: string;
  flow: string;
  good: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      width: 816,
      height: 560,
      boxSizing: 'border-box',
      padding: 52,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Tile icon={icon} size={96} />
      <div>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 900 }}>
          {name}
        </div>
        <span style={{ ...pill, display: 'inline-block', marginTop: 8 }}>{badge}</span>
      </div>
    </div>
    <div style={{ fontSize: 38, fontWeight: 900, marginTop: 56, lineHeight: 1.45, color: deep }}>
      {flow}
    </div>
    <div
      style={{
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontSize: 30,
        fontWeight: 700,
      }}
    >
      <Icon name="check_circle" size={38} color="#10B981" />
      {good}
    </div>
  </Rise>
);

const Routes: Page = () => (
  <Stage>
    <Header tag="兩條路" title="用哪個 AI 整理？" />
    <div style={{ position: 'absolute', left: 120, top: 290, display: 'flex', gap: 48 }}>
      <RouteCard
        icon="auto_awesome"
        name="Gemini"
        badge="免費、付費都可以"
        flow="Canvas 做網頁 → 匯出 → Google 協作平台"
        good="沒付費的老師用這條"
        delay={160}
      />
      <RouteCard
        icon="link"
        name="Claude 付費版"
        badge="需要付費方案"
        flow="做好網頁 → 公開分享 → 複製連結"
        good="連結不變，用說的就更新"
        delay={260}
      />
    </div>
    <Footer />
  </Stage>
);

const Gemini1: Page = () => (
  <SkillStep
    tag="GEMINI"
    n="1"
    total="2"
    title="匯出 → Google 協作平台"
    desc="把咒語和清單貼給 Gemini，Canvas 做好入口網頁後，按右上「匯出」選「Google 協作平台」。"
    img={imgGeminiExport}
    alt="Gemini Canvas 匯出到 Google 協作平台"
  />
);

const Gemini2: Page = () => (
  <SkillStep
    tag="GEMINI"
    n="2"
    total="2"
    title="直接進到協作平台"
    desc="網頁已經放進新網站，改好網站名稱，按右上「發布」就上線。"
    img={imgGeminiSites}
    alt="匯出後的 Google 協作平台編輯畫面"
  />
);

const ClaudeOrg1: Page = () => (
  <SkillStep
    tag="CLAUDE 付費版"
    n="1"
    total="3"
    title="清單丟給 Claude"
    desc="把同一段咒語和清單貼給 Claude，它直接做出入口網頁。"
    img={imgClaudeLinks}
    alt="請 Claude 把網址做成入口"
    maxW={900}
  />
);

const ClaudeOrg2: Page = () => (
  <SkillStep
    tag="CLAUDE 付費版"
    n="2"
    total="3"
    title="用說的加分類"
    desc="說「要有分類功能」，它就依字、詞、句、篇章分好，還加上搜尋框。"
    img={imgClaudeCategory}
    alt="請 Claude 加上分類功能"
  />
);

const ClaudeOrg3: Page = () => (
  <SkillStep
    tag="CLAUDE 付費版"
    n="3"
    total="3"
    title="直接分享連結"
    desc="按「匯出」選公開分享連結、複製連結。之後改完說「確認更新公開網頁」，同一個連結就是新版。"
    visual={
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <Shot
          src={imgClaudeShare}
          alt="分享設定：任何人都可以開啟此連結"
          maxW={760}
          maxH={330}
          delay={220}
        />
        <Shot src={imgClaudeUpdate} alt="確認更新公開網頁" maxW={980} maxH={330} delay={340} />
      </div>
    }
  />
);

const FeatureChip = ({ icon, title, delay }: { icon: string; title: string; delay: number }) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      width: 384,
      height: 300,
      boxSizing: 'border-box',
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <Tile icon={icon} size={96} />
    <div style={{ fontSize: 40, fontWeight: 900 }}>{title}</div>
  </Rise>
);

const WhatSites: Page = () => (
  <Stage>
    <Header
      tag="GOOGLE SITES"
      title="Google Sites 是什麼？"
      sub="用 Google 帳號就能做網站，像在排簡報一樣"
    />
    <div style={{ position: 'absolute', left: 120, top: 400, display: 'flex', gap: 48 }}>
      <FeatureChip icon="money_off" title="免費" delay={160} />
      <FeatureChip icon="touch_app" title="拖拉就好，不用寫程式" delay={220} />
      <FeatureChip icon="cloud" title="直接放雲端檔案" delay={280} />
      <FeatureChip icon="devices" title="手機電腦都能看" delay={340} />
    </div>
    <Rise
      delay={480}
      style={{ position: 'absolute', left: 120, right: 120, top: 790, textAlign: 'center' }}
    >
      <a
        href={urls.sites}
        target="_blank"
        rel="noreferrer"
        style={{
          ...linkReset,
          ...pill,
          fontSize: 36,
          padding: '14px 40px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        sites.google.com
        <Icon name="open_in_new" size={36} />
      </a>
    </Rise>
    <Footer />
  </Stage>
);

const TwoPaths: Page = () => (
  <ScreenPage
    tag="開新網站"
    title="兩條路：範本 or 空白"
    leftWidth={600}
    visual={<Shot src={imgSitesHome} alt="Google Sites 首頁" maxW={1040} maxH={620} />}
  >
    <StepRow n="1" delay={160}>
      <div>範本</div>
      <div style={{ fontSize: 26, color: muted, fontWeight: 500 }}>
        個人資料、活動、專案…套了就有版面
      </div>
    </StepRow>
    <StepRow n="2" delay={240}>
      <div>空白網站</div>
      <div style={{ fontSize: 26, color: muted, fontWeight: 500 }}>從零開始，自己排每一區</div>
    </StepRow>
    <Tip delay={400}>今天示範從「空白網站」開始，每個功能都看得到。</Tip>
  </ScreenPage>
);

const PanelRow = ({
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
      ...card,
      borderRadius: 24,
      padding: '22px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 24,
    }}
  >
    <Tile icon={icon} size={72} />
    <div>
      <div style={{ fontSize: 38, fontWeight: 900 }}>{name}</div>
      <div style={{ fontSize: 26, color: muted, marginTop: 4 }}>{desc}</div>
    </div>
  </Rise>
);

const EditorTour: Page = () => (
  <ScreenPage
    tag="編輯畫面"
    title="右側面板：三個分頁"
    leftWidth={760}
    visual={<Shot src={imgInsertPanel} alt="插入面板" maxW={700} maxH={640} />}
  >
    <PanelRow
      icon="dashboard"
      name="插入"
      desc="文字、圖片、內嵌、雲端硬碟、內容區塊"
      delay={160}
    />
    <PanelRow icon="toc" name="頁面" desc="新增頁面、排順序、做選單" delay={240} />
    <PanelRow icon="palette" name="主題" desc="一鍵換配色和字型" delay={320} />
  </ScreenPage>
);

const Banner: Page = () => (
  <ScreenPage
    tag="橫幅"
    title="橫幅：網站的門面"
    leftWidth={560}
    visual={<Shot src={imgBannerTitle} alt="編輯橫幅標題" maxW={1080} maxH={560} />}
  >
    <StepRow n="1" delay={160}>
      點標題，直接打字
    </StepRow>
    <StepRow n="2" delay={240}>
      工具列調字級、字型、對齊
    </StepRow>
    <StepRow n="3" delay={320}>
      滑過橫幅可換背景圖
    </StepRow>
  </ScreenPage>
);

const NameLogo: Page = () => (
  <ScreenPage
    tag="網站名稱"
    title="網站名稱與標誌"
    leftWidth={760}
    visual={<Shot src={imgSiteNameLogo} alt="網站名稱與新增標誌" maxW={820} maxH={600} />}
  >
    <StepRow n="1" delay={160}>
      左上角「輸入網站名稱」
    </StepRow>
    <StepRow n="2" delay={240}>
      滑過去會出現「新增標誌」
    </StepRow>
    <StepRow n="3" delay={320}>
      上傳學校或社群的 Logo
    </StepRow>
    <Tip delay={460}>網站名稱 ≠ 檔案名稱；左上角那個才是訪客看到的。</Tip>
  </ScreenPage>
);

const SettingItem = ({
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
  <Rise delay={delay} style={{ display: 'flex', alignItems: 'center', gap: 20, height: 92 }}>
    <Tile icon={icon} size={64} soft />
    <div>
      <div style={{ fontSize: 34, fontWeight: 900 }}>{name}</div>
      <div style={{ fontSize: 24, color: muted }}>{desc}</div>
    </div>
  </Rise>
);

const Settings: Page = () => (
  <ScreenPage
    tag="設定"
    title="齒輪「設定」裡的小功能"
    leftWidth={700}
    visual={<Shot src={imgSettingsBrand} alt="設定視窗" maxW={940} maxH={620} />}
  >
    <SettingItem icon="view_agenda" name="導覽" desc="選單放上方或側邊" delay={140} />
    <SettingItem icon="palette" name="品牌圖片" desc="標誌、網站小圖示" delay={190} />
    <SettingItem icon="update" name="檢視者工具" desc="顯示最後更新時間" delay={240} />
    <SettingItem icon="link" name="自訂網域" desc="換成自己的網址" delay={290} />
    <SettingItem icon="search" name="分析" desc="看有多少人瀏覽" delay={340} />
    <SettingItem icon="campaign" name="公告橫幅" desc="重要通知置頂" delay={390} />
  </ScreenPage>
);

const ThemePage: Page = () => (
  <ScreenPage
    tag="主題"
    title="主題：一鍵換風格"
    leftWidth={860}
    visual={<Shot src={imgTheme} alt="主題面板" maxW={480} maxH={680} />}
  >
    <StepRow n="1" delay={160}>
      右側點「主題」
    </StepRow>
    <StepRow n="2" delay={220}>
      選內建主題：簡單、亞里斯多德…
    </StepRow>
    <StepRow n="3" delay={280}>
      點下方圓點換配色
    </StepRow>
    <StepRow n="4" delay={340}>
      「字型樣式」換整站字體
    </StepRow>
    <Tip delay={480}>先選主題再放內容，之後換主題也不會跑版。</Tip>
  </ScreenPage>
);

const Pages: Page = () => (
  <ScreenPage
    tag="頁面"
    title="新增頁面，自動變選單"
    leftWidth={820}
    visual={<Shot src={imgAddPage} alt="新增頁面" maxW={840} maxH={560} />}
  >
    <StepRow n="1" delay={160}>
      右側點「頁面」→ 右下角 ＋
    </StepRow>
    <StepRow n="2" delay={220}>
      輸入名稱，例如「數學」
    </StepRow>
    <StepRow n="3" delay={280}>
      上方選單自動多一個
    </StepRow>
    <StepRow n="4" delay={340}>
      拖曳排順序、拉進去變子頁面
    </StepRow>
  </ScreenPage>
);

const FabOption = ({
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
      ...card,
      borderRadius: 24,
      padding: '20px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 24,
    }}
  >
    <Tile icon={icon} size={68} soft />
    <div>
      <div style={{ fontSize: 34, fontWeight: 900 }}>{name}</div>
      <div style={{ fontSize: 26, color: muted, marginTop: 2 }}>{desc}</div>
    </div>
  </Rise>
);

const FabMenu: Page = () => (
  <ScreenPage
    tag="頁面"
    title="＋ 按鈕的四個選項"
    leftWidth={980}
    visual={<Shot src={imgFabMenu} alt="新增選單" maxW={560} maxH={520} />}
  >
    <FabOption icon="description" name="新增頁面" desc="一般內容頁" delay={160} />
    <FabOption icon="link" name="新增連結" desc="選單直接連到外部網址，例如 Gem" delay={220} />
    <FabOption icon="code" name="整頁嵌入" desc="整頁就是一個網頁或程式碼" delay={280} />
    <FabOption icon="unfold_more" name="新增選單專區" desc="多個頁面收成一組下拉選單" delay={340} />
  </ScreenPage>
);

const MiniTip = ({ icon, text, delay }: { icon: string; text: string; delay: number }) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      flex: 1,
      borderRadius: 24,
      padding: '22px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
    }}
  >
    <Tile icon={icon} size={60} soft />
    <span style={{ fontSize: 30, fontWeight: 700 }}>{text}</span>
  </Rise>
);

const ContentBlocks: Page = () => (
  <Stage>
    <Header tag="插入" title="內容區塊：版面一鍵排好" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 270,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Shot src={imgContentBlock} alt="內容區塊" maxW={1500} maxH={540} />
    </div>
    <div
      style={{ position: 'absolute', left: 120, right: 120, top: 860, display: 'flex', gap: 32 }}
    >
      <MiniTip icon="touch_app" text="點一下就加到頁面" delay={360} />
      <MiniTip icon="layers" text="點 ＋ 放圖片或檔案" delay={420} />
      <MiniTip icon="toc" text="下方還有可收合群組、目錄" delay={480} />
    </div>
    <Footer />
  </Stage>
);

const DocCol = ({
  icon,
  title,
  hint,
  path,
  delay,
}: {
  icon: string;
  title: string;
  hint: string;
  path: string;
  delay: number;
}) => (
  <Rise delay={delay} style={{ width: 816, display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <Tile icon={icon} size={72} />
      <span style={{ fontSize: 44, fontWeight: 900 }}>{title}</span>
    </div>
    <ImagePlaceholder hint={hint} width={816} height={400} />
    <div style={{ fontSize: 30, fontWeight: 700, color: deep }}>{path}</div>
  </Rise>
);

const DocsVideo: Page = () => (
  <Stage>
    <Header tag="插入" title="放文件和影片" />
    <div style={{ position: 'absolute', left: 120, top: 280, display: 'flex', gap: 48 }}>
      <DocCol
        icon="description"
        title="雲端文件"
        hint="插入 → 雲端硬碟，選取學習單檔案的畫面"
        path="插入 → 雲端硬碟 → 選檔案"
        delay={160}
      />
      <DocCol
        icon="play_arrow"
        title="YouTube 影片"
        hint="插入 → YouTube，搜尋或貼上影片網址的畫面"
        path="插入 → YouTube → 搜尋或貼網址"
        delay={260}
      />
    </div>
    <Rise delay={420} style={{ position: 'absolute', left: 120, right: 120, top: 900 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 14,
          fontSize: 28,
          color: pink,
          fontWeight: 700,
        }}
      >
        <Icon name="lightbulb" size={34} color={pink} />
        雲端檔案記得改成「知道連結的任何人都能檢視」
      </div>
    </Rise>
    <Footer />
  </Stage>
);

const ButtonPage: Page = () => (
  <ScreenPage
    tag="插入"
    title="按鈕：一鍵連到工具"
    leftWidth={760}
    visual={<Shot src={imgInsertButton} alt="插入按鈕" maxW={900} maxH={520} />}
  >
    <StepRow n="1" delay={160}>
      插入 → 按鈕
    </StepRow>
    <StepRow n="2" delay={220}>
      名稱：例「開啟生字機器人」
    </StepRow>
    <StepRow n="3" delay={280}>
      連結：貼 Gem、表單或工具網址
    </StepRow>
    <Tip delay={420}>學生和老師都看得懂的按鈕，比一串網址好用。</Tip>
  </ScreenPage>
);

const Embed1: Page = () => (
  <ScreenPage
    tag="插入 · 內嵌"
    title="內嵌：把互動網頁放進來"
    leftWidth={760}
    visual={
      <>
        <Shot src={imgEmbedEmpty} alt="嵌入程式碼空白視窗" maxW={760} maxH={300} delay={160} />
        <Shot src={imgEmbedCode} alt="貼上 HTML 程式碼" maxW={760} maxH={300} delay={300} />
      </>
    }
  >
    <StepRow n="1" delay={160}>
      插入 → 內嵌
    </StepRow>
    <StepRow n="2" delay={220}>
      切到「嵌入程式碼」
    </StepRow>
    <StepRow n="3" delay={280}>
      貼上整份 HTML（例如 Canvas 做的遊戲）
    </StepRow>
    <StepRow n="4" delay={340}>
      按「下一個」
    </StepRow>
  </ScreenPage>
);

const Embed2: Page = () => (
  <Stage>
    <Header tag="插入 · 內嵌" title="放進頁面，學生直接玩" sub="預覽確認 → 插入 → 拉角落調整大小" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 330,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 48,
      }}
    >
      <Shot src={imgEmbedPreview} alt="嵌入預覽" maxW={620} maxH={560} delay={180} />
      <Icon name="arrow_forward" size={72} color="var(--osd-accent)" />
      <Shot src={imgEmbedPlaced} alt="嵌入後的頁面" maxW={880} maxH={560} delay={320} />
    </div>
    <Footer />
  </Stage>
);

const SmallFeature = ({
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
      ...card,
      height: 270,
      boxSizing: 'border-box',
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Tile icon={icon} size={80} />
    <div style={{ fontSize: 40, fontWeight: 900, marginTop: 28 }}>{name}</div>
    <div style={{ fontSize: 28, color: muted, marginTop: 8 }}>{desc}</div>
  </Rise>
);

const SmallFeatures: Page = () => (
  <Stage>
    <Header tag="小功能" title="還有這些好用的" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 280,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 40,
      }}
    >
      <SmallFeature icon="unfold_more" name="可收合群組" desc="長內容先收起來" delay={140} />
      <SmallFeature icon="toc" name="目錄" desc="自動抓頁面標題" delay={200} />
      <SmallFeature icon="smart_button" name="按鈕" desc="一鍵連到工具" delay={260} />
      <SmallFeature icon="campaign" name="公告橫幅" desc="重要通知放最上面" delay={320} />
      <SmallFeature icon="update" name="最後更新時間" desc="大家知道內容新不新" delay={380} />
      <SmallFeature icon="smartphone" name="裝置預覽" desc="手機版長怎樣先看" delay={440} />
    </div>
    <Footer />
  </Stage>
);

const Publish: Page = () => (
  <ScreenPage
    tag="發布"
    title="預覽，再發布"
    leftWidth={760}
    visual={
      <Rise delay={200}>
        <ImagePlaceholder
          hint="「發布到網路」視窗截圖（網址 centralteachers、誰可以查看：所有人）"
          width={900}
          height={600}
        />
      </Rise>
    }
  >
    <StepRow n="1" delay={160}>
      右上「預覽」：手機、平板、電腦
    </StepRow>
    <StepRow n="2" delay={220}>
      右上「發布」→ 設定網址
    </StepRow>
    <StepRow n="3" delay={280}>
      選誰可以看：所有人或校內
    </StepRow>
    <StepRow n="4" delay={340}>
      之後改內容，要再按一次發布
    </StepRow>
    <Tip delay={480}>沒按發布，別人看到的永遠是舊版。</Tip>
  </ScreenPage>
);

const PracticeSites: Page = () => (
  <Stage>
    <Header tag="實作 · 15 分鐘" title="做出你的教材頁" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 270,
        width: 1080,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <StepRow n="1" delay={100} size={32} height={78}>
        咒語＋清單貼給 Gemini
      </StepRow>
      <StepRow n="2" delay={140} size={32} height={78}>
        再說一句：「要有分類功能」
      </StepRow>
      <StepRow n="3" delay={180} size={32} height={78}>
        匯出 → Google 協作平台
      </StepRow>
      <StepRow n="4" delay={220} size={32} height={78}>
        改網站名稱和橫幅標題
      </StepRow>
      <StepRow n="5" delay={260} size={32} height={78}>
        新增頁面：放一份自己的教材
      </StepRow>
      <StepRow n="6" delay={300} size={32} height={78}>
        換主題、調整版面
      </StepRow>
      <StepRow n="7" delay={340} size={32} height={78}>
        加一個按鈕連到工具
      </StepRow>
      <StepRow n="8" delay={380} size={32} height={78}>
        預覽 → 發布 → 網址貼到群組
      </StepRow>
    </div>
    <Rise
      delay={300}
      style={{
        ...card,
        position: 'absolute',
        left: 1260,
        right: 120,
        top: 270,
        height: 700,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 32,
      }}
    >
      <Tile icon="timer" size={96} />
      <Countdown minutes={15} size={130} />
    </Rise>
    <Footer />
  </Stage>
);

const HelpCard = ({ q, a, delay }: { q: string; a: string; delay: number }) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      width: 528,
      height: 520,
      boxSizing: 'border-box',
      padding: 48,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Tile icon="help" size={88} soft />
    <div style={{ fontSize: 40, fontWeight: 900, marginTop: 36, lineHeight: 1.35 }}>{q}</div>
    <div style={{ fontSize: 30, color: deep, marginTop: 'auto', lineHeight: 1.5 }}>{a}</div>
  </Rise>
);

const Troubleshoot: Page = () => (
  <Stage>
    <Header tag="卡關急救" title="常見三個狀況" />
    <div style={{ position: 'absolute', left: 120, top: 300, display: 'flex', gap: 48 }}>
      <HelpCard q="別人點檔案打不開" a="雲端共用改成「知道連結的任何人」" delay={160} />
      <HelpCard q="內嵌出來一片空白" a="有些網站不給嵌入，改用按鈕連過去" delay={240} />
      <HelpCard q="網址打開看不到新內容" a="回編輯畫面，再按一次「發布」" delay={320} />
    </div>
    <Footer />
  </Stage>
);

const Break: Page = () => (
  <Stage bold>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
      }}
    >
      <Rise>
        <Tile icon="coffee" size={128} />
      </Rise>
      <Rise delay={100}>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 120,
            fontWeight: 900,
            margin: 0,
            ...gradText,
          }}
        >
          休息一下
        </h1>
      </Rise>
      <Rise delay={200}>
        <Countdown minutes={10} size={180} />
      </Rise>
    </div>
  </Stage>
);

/* PART 2 Skills */

const Part2: Page = () => (
  <PartPage
    num="02"
    icon="auto_awesome"
    title={
      <>
        Skills
        <br />
        讓機器人延續下去
      </>
    }
    sub="把一次的備課流程，變成隨時叫得出來的技能"
  />
);

const FlowBox = ({
  label,
  title,
  delay,
  strong = false,
}: {
  label: string;
  title: ReactNode;
  delay: number;
  strong?: boolean;
}) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      width: 440,
      height: 340,
      boxSizing: 'border-box',
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 20,
      background: strong ? gradFill : card.background,
      color: strong ? '#ffffff' : 'var(--osd-text)',
    }}
  >
    <div style={{ fontSize: 26, fontWeight: 700, opacity: 0.8 }}>{label}</div>
    <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.35 }}>{title}</div>
  </Rise>
);

const Arrow = ({ delay }: { delay: number }) => (
  <Rise delay={delay}>
    <Icon name="arrow_forward" size={72} color="var(--osd-accent)" />
  </Rise>
);

const WhatSkill: Page = () => (
  <Stage>
    <Header tag="SKILL" title="Skill 是什麼？" sub="把一整段備課流程打包，以後一句話就叫出來" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
      }}
    >
      <FlowBox label="你丟進去" title="一篇文言文" delay={160} />
      <Arrow delay={240} />
      <FlowBox label="@ 技能" title="classical-chinese-prep" delay={320} strong />
      <Arrow delay={400} />
      <FlowBox
        label="一次拿到"
        title={
          <>
            Word 對照講義
            <br />
            ＋互動遊戲
          </>
        }
        delay={480}
      />
    </div>
    <Footer />
  </Stage>
);

const CompareRow = ({
  label,
  gem,
  skill,
  delay,
}: {
  label: string;
  gem: string;
  skill: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    style={{
      display: 'grid',
      gridTemplateColumns: '320px 1fr 1fr',
      gap: 24,
      alignItems: 'stretch',
    }}
  >
    <div style={{ fontSize: 32, fontWeight: 900, display: 'flex', alignItems: 'center' }}>
      {label}
    </div>
    <div style={{ ...card, borderRadius: 22, padding: '28px 32px', fontSize: 32, color: muted }}>
      {gem}
    </div>
    <div
      style={{
        ...card,
        borderRadius: 22,
        padding: '28px 32px',
        fontSize: 32,
        fontWeight: 700,
        color: deep,
        border: '2px solid rgba(124, 58, 237, 0.35)',
      }}
    >
      {skill}
    </div>
  </Rise>
);

const GemVsSkill: Page = () => (
  <Stage>
    <Header tag="GEM vs SKILL" title="Gem 和 Skill 差在哪？" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 290,
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <Rise delay={100} style={{ display: 'grid', gridTemplateColumns: '320px 1fr 1fr', gap: 24 }}>
        <span />
        <span style={{ ...eyebrow, color: muted }}>GEM</span>
        <span style={eyebrow}>SKILL</span>
      </Rise>
      <CompareRow
        label="怎麼叫出來"
        gem="從側欄點開那個 Gem"
        skill="任何對話打 @ 就叫得出來"
        delay={180}
      />
      <CompareRow
        label="能做什麼"
        gem="一個固定角色，陪你對話"
        skill="一整套流程，一次產出好幾樣"
        delay={260}
      />
      <CompareRow
        label="怎麼做出來"
        gem="自己寫一大段指令"
        skill="先做一次，再請 AI 幫你打包"
        delay={340}
      />
    </div>
    <Footer />
  </Stage>
);

const SkillStep = ({
  tag = '示範',
  n,
  total = '5',
  title,
  desc,
  img,
  visual,
  alt,
  maxW = 1000,
  maxH = 620,
}: {
  tag?: string;
  n: string;
  total?: string;
  title: string;
  desc: ReactNode;
  img?: string;
  visual?: ReactNode;
  alt?: string;
  maxW?: number;
  maxH?: number;
}) => (
  <Stage>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 0,
        bottom: 110,
        width: 560,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Rise>
        <div style={eyebrow}>
          {tag} · STEP {n} / {total}
        </div>
      </Rise>
      <Rise delay={80} style={{ marginTop: 28 }}>
        <NumBadge n={n} size={112} />
      </Rise>
      <Rise delay={140} style={{ marginTop: 36 }}>
        <h2 style={{ ...h2, fontSize: 60 }}>{title}</h2>
      </Rise>
      <Rise delay={200} style={{ marginTop: 24 }}>
        <p style={{ fontSize: 32, color: muted, margin: 0, lineHeight: 1.55 }}>{desc}</p>
      </Rise>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 740,
        right: 120,
        top: 100,
        bottom: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {visual ?? (img && <Shot src={img} alt={alt ?? title} maxW={maxW} maxH={maxH} delay={220} />)}
    </div>
    <Footer />
  </Stage>
);

const Skill1: Page = () => (
  <SkillStep
    n="1"
    title="先正常備課一次"
    desc="貼一篇文言文，請 Gemini 做白話對照，輸出 Word。"
    img={imgSkillChatWord}
    alt="請 Gemini 做白話對照 Word"
  />
);

const Skill2: Page = () => (
  <SkillStep
    n="2"
    title="再加一步：互動遊戲"
    desc="接著請它做精熟練習網頁，讓學生把翻譯練熟。"
    img={imgSkillGame}
    alt="請 Gemini 做互動遊戲"
  />
);

const Skill3: Page = () => (
  <SkillStep
    n="3"
    title="請它做成 skill"
    desc="「把這個備課流程做成 skill，以後丟文言文就給我 Word＋遊戲。」"
    img={imgSkillMake}
    alt="請 Gemini 做成 skill"
  />
);

const Skill4: Page = () => (
  <SkillStep
    n="4"
    title="打 @ 叫出技能"
    desc="開新對話輸入 @，在「技能」裡就找得到它。"
    img={imgSkillAt}
    alt="輸入 @ 找到技能"
  />
);

const Skill5: Page = () => (
  <SkillStep
    n="5"
    title="丟一篇新文本測試"
    desc="換成〈登鸛雀樓〉，看它是不是一次就照流程做完。"
    img={imgSkillTest}
    alt="用新文本測試 skill"
  />
);

const PracticeSkill: Page = () => (
  <Stage>
    <Header tag="帶做" title="把你的 Gem 變成 skill" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 280,
        width: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <StepRow n="1" delay={100} size={32} height={86}>
        打開 Gemini 新對話（或你的 Gem）
      </StepRow>
      <StepRow n="2" delay={150} size={32} height={86}>
        貼一份課文，照平常做一次教材
      </StepRow>
      <StepRow n="3" delay={200} size={32} height={86}>
        滿意後，貼上右邊這段話
      </StepRow>
      <StepRow n="4" delay={250} size={32} height={86}>
        開新對話，輸入 @ 找到它
      </StepRow>
      <StepRow n="5" delay={300} size={32} height={86}>
        換一篇課文測試
      </StepRow>
      <StepRow n="6" delay={350} size={32} height={86}>
        不滿意：「請修改這個 skill，讓它…」
      </StepRow>
    </div>
    <Rise
      delay={300}
      style={{
        position: 'absolute',
        left: 1180,
        right: 120,
        top: 280,
        height: 650,
        boxSizing: 'border-box',
        borderRadius: 'var(--osd-radius)',
        padding: 48,
        background: gradFill,
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 700 }}
      >
        <Icon name="alternate_email" size={36} color="#ffffff" />
        貼給 Gemini
      </div>
      <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.6, marginTop: 36 }}>
        請你幫我把這個備課流程做成一個 skill，以後我只要丟一份課文給你，你就照這個流程做出教材給我。
      </div>
    </Rise>
    <Footer />
  </Stage>
);

const MapRow = ({
  icon,
  name,
  output,
  delay,
}: {
  icon: string;
  name: string;
  output: string;
  delay: number;
}) => (
  <Rise
    delay={delay}
    style={{
      display: 'grid',
      gridTemplateColumns: '440px 80px 1fr',
      alignItems: 'center',
      gap: 24,
    }}
  >
    <div
      style={{
        ...card,
        borderRadius: 22,
        height: 96,
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <Tile icon={icon} size={60} soft />
      <span style={{ fontSize: 34, fontWeight: 900 }}>{name} Gem</span>
    </div>
    <Icon name="arrow_forward" size={56} color="var(--osd-accent)" />
    <div
      style={{
        ...card,
        borderRadius: 22,
        height: 96,
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        border: '2px solid rgba(124, 58, 237, 0.35)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 34,
          fontWeight: 800,
          color: 'var(--osd-accent)',
        }}
      >
        @{name}
      </span>
      <span style={{ fontSize: 28, color: muted }}>{output}</span>
    </div>
  </Rise>
);

const FiveSkills: Page = () => (
  <Stage>
    <Header tag="NEXT" title="5 個機器人 → 5 個 skill" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 280,
        display: 'flex',
        flexDirection: 'column',
        gap: 26,
      }}
    >
      <MapRow icon="edit" name="生字" output="丟課文，一次拿到生字教材" delay={140} />
      <MapRow icon="spellcheck" name="語詞" output="丟課文，一次拿到語詞教材" delay={200} />
      <MapRow icon="reorder" name="句型" output="丟課文，一次拿到句型教材" delay={260} />
      <MapRow icon="short_text" name="句子" output="丟課文，一次拿到句子教材" delay={320} />
      <MapRow
        icon="auto_stories"
        name="課文閱讀"
        output="丟課文，一次拿到閱讀理解教材"
        delay={380}
      />
    </div>
    <Footer />
  </Stage>
);

/* PART 3 AI 備課幫手 */

const Part3: Page = () => (
  <PartPage
    num="03"
    icon="school"
    title={
      <>
        米克師
        <br />
        AI 備課幫手
      </>
    }
    sub="打開網頁就能用的特教備課工具箱"
  />
);

const EntryPoint = ({ icon, text, delay }: { icon: string; text: string; delay: number }) => (
  <Rise delay={delay} style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
    <Tile icon={icon} size={72} soft />
    <span style={{ fontSize: 38, fontWeight: 700 }}>{text}</span>
  </Rise>
);

const PrepEntry: Page = () => (
  <Stage>
    <Header tag="AI 備課幫手" title="一個網址，全部工具" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 330,
        width: 760,
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      <EntryPoint icon="touch_app" text="免安裝，打開就用" delay={140} />
      <EntryPoint icon="menu_book" text="國英數適性學習單" delay={200} />
      <EntryPoint icon="web" text="互動教學網頁" delay={260} />
      <EntryPoint icon="update" text="持續更新新工具" delay={320} />
    </div>
    <div
      style={{
        position: 'absolute',
        left: 960,
        right: 120,
        top: 280,
        display: 'flex',
        gap: 40,
        alignItems: 'center',
      }}
    >
      <Shot src={imgMixerAiPrep} alt="AI 備課幫手首頁" maxW={460} maxH={600} delay={200} />
      <QrCard url={urls.prep} label="掃我開啟" title="AI 備課幫手" delay={320} size={240} />
    </div>
    <Footer />
  </Stage>
);

const Point = ({ n, children, delay }: { n: string; children: ReactNode; delay: number }) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      minHeight: 96,
      borderRadius: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      padding: '16px 28px',
      boxSizing: 'border-box',
    }}
  >
    <NumBadge n={n} size={52} />
    <span style={{ fontSize: 32, fontWeight: 700, lineHeight: 1.4 }}>{children}</span>
  </Rise>
);

const ToolPage = ({
  tag,
  title,
  img,
  href,
  children,
}: {
  tag: string;
  title: string;
  img: string;
  href: string;
  children: ReactNode;
}) => (
  <Stage>
    <div
      style={{
        position: 'absolute',
        left: 120,
        top: 0,
        bottom: 110,
        width: 660,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Rise>
        <div style={eyebrow}>{tag}</div>
      </Rise>
      <Rise delay={80} style={{ marginTop: 16 }}>
        <h2 style={{ ...h2, fontSize: 68 }}>{title}</h2>
      </Rise>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 48 }}>
        {children}
      </div>
      <Rise delay={480} style={{ marginTop: 40 }}>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          style={{
            ...linkReset,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 30,
            fontWeight: 700,
            color: '#ffffff',
            background: gradFill,
            borderRadius: 999,
            padding: '16px 36px',
          }}
        >
          開啟工具
          <Icon name="open_in_new" size={32} color="#ffffff" />
        </a>
      </Rise>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 840,
        right: 120,
        top: 100,
        bottom: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Shot src={img} alt={title} maxW={920} maxH={700} delay={200} />
    </div>
    <Footer />
  </Stage>
);

const ToolChinese: Page = () => (
  <ToolPage
    tag="國文 · 學習單"
    title="國文課堂學習單"
    img={imgChineseReading}
    href={urls.chineseLessonWorksheet}
  >
    <Point n="1" delay={200}>
      原文與易讀雙軌對照
    </Point>
    <Point n="2" delay={260}>
      田字格生字、段落摘要
    </Point>
    <Point n="3" delay={320}>
      隨段即時檢核小題
    </Point>
  </ToolPage>
);

const ToolMath: Page = () => (
  <ToolPage
    tag="數學 · 學習單"
    title="數學階梯鷹架學習單"
    img={imgMathConcept}
    href={urls.mathScaffold}
  >
    <Point n="1" delay={200}>
      輸入題型或貼課本截圖
    </Point>
    <Point n="2" delay={260}>
      先說明概念，再拆解例題
    </Point>
    <Point n="3" delay={320}>
      一鍵 A4 乾淨列印
    </Point>
  </ToolPage>
);

const ToolEnglish: Page = () => (
  <ToolPage
    tag="英文 · 學習單"
    title="英文資源班學習單"
    img={imgEnglish}
    href={urls.specialEdEnglish}
  >
    <Point n="1" delay={200}>
      情境分鏡故事連環圖
    </Point>
    <Point n="2" delay={260}>
      英文字母四線格練寫
    </Point>
    <Point n="3" delay={320}>
      圖文重點單字檢核
    </Point>
  </ToolPage>
);

const ToolUnscramble: Page = () => (
  <ToolPage tag="互動網頁" title="句型重組" img={imgUnscramble} href={urls.unscramble}>
    <Point n="1" delay={200}>
      免手寫，點卡片排句子
    </Point>
    <Point n="2" delay={260}>
      字卡語音朗讀
    </Point>
    <Point n="3" delay={320}>
      逐題檢核，即時回饋
    </Point>
  </ToolPage>
);

const ToolStepMath: Page = () => (
  <ToolPage tag="互動網頁" title="互動步驟數學" img={imgStepMath} href={urls.interactiveMath}>
    <Point n="1" delay={200}>
      小步驟拆解解題流程
    </Point>
    <Point n="2" delay={260}>
      輸入與點選雙模式
    </Point>
    <Point n="3" delay={320}>
      即時回饋，建立信心
    </Point>
  </ToolPage>
);

/* 收尾 */

const ShareQ = ({ n, text, delay }: { n: string; text: string; delay: number }) => (
  <Rise
    delay={delay}
    style={{
      ...card,
      width: 528,
      height: 360,
      boxSizing: 'border-box',
      padding: 48,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <NumBadge n={n} size={80} />
    <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.35 }}>{text}</div>
  </Rise>
);

const Sharing: Page = () => (
  <Stage>
    <Header tag="SHARE" title="成果分享" sub="打開你的教材頁，每人 1 分鐘" />
    <div style={{ position: 'absolute', left: 120, top: 400, display: 'flex', gap: 48 }}>
      <ShareQ n="1" text="你放了什麼教材？" delay={160} />
      <ShareQ n="2" text="給哪一類學生用？" delay={240} />
      <ShareQ n="3" text="下一步想加什麼？" delay={320} />
    </div>
    <Footer />
  </Stage>
);

const Resources: Page = () => (
  <Stage>
    <Header tag="RESOURCES" title="今天用到的連結" />
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 300,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 36,
      }}
    >
      <QrCard url={urls.sites} label="建站" title="Google Sites" delay={140} />
      <QrCard url={urls.gemini} label="Skills" title="Gemini" delay={200} />
      <QrCard url={urls.prep} label="備課" title="AI 備課幫手" delay={260} />
      <QrCard url={urls.share} label="共享" title="特教教材共享" delay={320} />
    </div>
    <Footer />
  </Stage>
);

const Thanks: Page = () => (
  <Stage bold>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 36,
      }}
    >
      <Rise>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 150,
            fontWeight: 900,
            margin: 0,
            ...gradText,
          }}
        >
          謝謝大家
        </h1>
      </Rise>
      <Rise delay={120}>
        <p style={{ fontSize: 40, color: muted, margin: 0 }}>你的教材頁，就是共享站的第一頁</p>
      </Rise>
      <Rise
        delay={240}
        style={{
          ...card,
          marginTop: 24,
          borderRadius: 999,
          padding: '12px 40px 12px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 22,
        }}
      >
        <img
          src={imgHeadshot}
          alt="講師照片"
          style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ fontSize: 32, fontWeight: 900 }}>米克師 · @spedmix2025</div>
      </Rise>
    </div>
  </Stage>
);

export const meta: SlideMeta = {
  title: '用 Google Sites 打造特教教材共享站（AI 整理版）',
  createdAt: '2026-11-13T12:30:07.004Z',
};

export default [
  Cover,
  Agenda,
  Speaker,
  SocialLinks,
  MixerSites,
  FiveGems,
  Mess,
  WhyPublish,
  ExampleSite,
  Takeaway,
  Part1,
  MaterialList,
  PromptPage,
  Routes,
  Gemini1,
  Gemini2,
  ClaudeOrg1,
  ClaudeOrg2,
  ClaudeOrg3,
  WhatSites,
  TwoPaths,
  EditorTour,
  Banner,
  NameLogo,
  Settings,
  ThemePage,
  Pages,
  FabMenu,
  ContentBlocks,
  DocsVideo,
  ButtonPage,
  Embed1,
  Embed2,
  SmallFeatures,
  Publish,
  PracticeSites,
  Troubleshoot,
  Break,
  Part2,
  WhatSkill,
  GemVsSkill,
  Skill1,
  Skill2,
  Skill3,
  Skill4,
  Skill5,
  PracticeSkill,
  FiveSkills,
  Part3,
  PrepEntry,
  ToolChinese,
  ToolMath,
  ToolEnglish,
  ToolUnscramble,
  ToolStepMath,
  Sharing,
  Resources,
  Thanks,
] satisfies Page[];

export const notes: (string | undefined)[] = [
  // Cover
  `大家午安，我是米克師朱旆誼，在宜蘭凱旋國中當特教老師。
今天是實作工作坊，下午結束時，每個人都會帶走一個自己的教材頁。
提醒：請先登入 Google 帳號，並打開 Gemini。`,
  // Agenda
  `今天分三段：先做 Google Sites，休息後做 skill，最後介紹我做的 AI 備課幫手工具。
Google Sites 會示範一輪，然後給大家 15 分鐘實作。`,
  // Speaker
  `簡單自我介紹：特教背景，也念資訊。
現在在凱旋國中資源班，平常把 AI 用在備課、做教材。`,
  // SocialLinks
  `我的教材和工具都會在這三個社群發布，歡迎追蹤。`,
  // MixerSites
  `這是我自己維護的三個網站：備課、共享、學生練習。
今天最後一段會用到「AI 備課幫手」。`,
  // FiveGems
  `去年社群的老師們各自用 Gem 做了 5 個通用設計國語文機器人：生字、語詞、句型、句子、課文閱讀理解。
機器人做得很好，但問題來了：做出來的教材，放在哪裡？`,
  // Mess
  `大家應該很有感：檔案在某個人的雲端、檔名看不出內容、LINE 群組要一直往上滑、版本一堆。
停一下，問大家：你最常在哪裡找教材？`,
  // WhyPublish
  `所以要整理、要上架。三個理由：
找得到：一個網址就是入口。
拿得到：點開就能用，不用再要權限。
用得久：有固定位置，之後由舊生接手維護和上架，教材就不會斷掉。`,
  // ExampleSite
  `先看完成的樣子：中區聯盟範例站。
這一頁是我請 AI 整理成入口網頁，再放上 Google Sites 的。
（打開範例站，點分類按鈕和搜尋框給大家看。請大家掃 QR code 一起看。）`,
  // Takeaway
  `今天的兩個成果：一個自己的教材頁、一個能用的 skill。
接下來先做第一個。`,
  // Part1
  `PART 1：Google Sites。先示範，再給大家 15 分鐘實作。`,
  // MaterialList
  `上架前先整理成一張清單：編號、名稱、網址、研發單位。
這是策略聯盟的 7 個工具，今天就用它來示範。
清單整理好，後面整份貼給 Claude 就好。`,
  // PromptPage
  `這就是我用的咒語：清單前面加一句「新增一個專案叫…，把以下網址做成入口」，整份貼上去。
做好後再說一句「要有分類功能」，它就會依字、詞、句、篇章分好，還加上搜尋框。
這段咒語 Gemini 和 Claude 都能用。`,
  // Routes
  `那要用哪個 AI？分兩種老師：
完全沒付費的老師，用 Gemini，免費、付費都可以，做好直接匯出到 Google 協作平台。
有付費 Claude 的老師，可以直接公開分享連結，之後用說的就更新，連結都不變。
今天實作以 Gemini 為主。`,
  // Gemini1
  `Gemini 的做法：把咒語和清單貼上，Canvas 會做出入口網頁。
右上角「匯出」選「Google 協作平台」。`,
  // Gemini2
  `按下去就直接進到 Google 協作平台，網頁已經放好了。
改網站名稱，按右上「發布」就上線，接下來就是剛剛講的 Google Sites 操作。`,
  // ClaudeOrg1
  `有付費 Claude 的老師：同一段咒語和清單貼給 Claude，它會直接做出入口網頁。`,
  // ClaudeOrg2
  `一樣用說的加功能：「要有分類功能」。`,
  // ClaudeOrg3
  `付費版最方便的地方：按匯出選公開分享連結，確認「任何人都可以開啟此連結」，複製連結就能分享，不用經過 Google Sites。
之後改內容，說「確認更新公開網頁」，同一個連結打開就是新版。`,
  // WhatSites
  `Google Sites 是 Google 的免費建站工具，用學校帳號就能用。
操作像在排簡報，拖拉就好，也能直接放雲端檔案。
請大家現在打開 sites.google.com。`,
  // TwoPaths
  `進來會看到上方的範本，和左邊的空白網站。
範本套了就有版面；空白網站從零開始。
今天示範從空白開始，這樣每個功能都會看到。`,
  // EditorTour
  `進到編輯畫面，右邊面板有三個分頁：插入、頁面、主題。
今天的操作幾乎都在這三個分頁裡。`,
  // Banner
  `最上面的橫幅是網站門面。點標題直接打字，工具列可以調字級和字型。
滑過橫幅可以換背景圖。`,
  // NameLogo
  `左上角是網站名稱，這是訪客看到的名字；檔案名稱是另一個。
滑過去會出現「新增標誌」，可以放學校或社群 Logo。`,
  // Settings
  `右上齒輪是設定，裡面有幾個實用功能：
導覽可以選選單放上方或側邊；品牌圖片放標誌和網站小圖示；
檢視者工具可以顯示最後更新時間；公告橫幅適合放重要通知。
自訂網域和分析知道有就好，今天不用設。`,
  // ThemePage
  `主題分頁可以一鍵換風格。選一個主題，再用下方圓點換配色，字型樣式換字體。
建議先選主題再放內容。`,
  // Pages
  `頁面分頁右下角按 ＋，新增頁面，打名稱。
頁面會自動出現在上方選單。拖曳可以排順序，拉進另一頁底下就變子頁面。`,
  // FabMenu
  `＋ 按鈕其實有四個選項：
新增頁面是一般頁；新增連結可以讓選單直接連到外部網址，例如 Gem；
整頁嵌入是整頁放一個網頁；新增選單專區把多頁收成一組下拉選單。`,
  // ContentBlocks
  `插入分頁下面的內容區塊是我最推薦的功能：點一下，版面就排好了。
再點 ＋ 放圖片或檔案。往下還有可收合群組和目錄。`,
  // DocsVideo
  `放文件：插入 → 雲端硬碟 → 選檔案。放影片：插入 → YouTube。
最重要的提醒：雲端檔案的共用設定要改成「知道連結的任何人都能檢視」，不然別人打不開。
（截圖待補，可直接現場示範。）`,
  // ButtonPage
  `按鈕很適合連到 Gem、表單或工具。名稱寫清楚，例如「開啟生字機器人」。`,
  // Embed1
  `內嵌是 Google Sites 的精華：插入 → 內嵌 → 嵌入程式碼，貼上整份 HTML。
例如用 Gemini Canvas 做的互動遊戲，複製程式碼貼進來就好。`,
  // Embed2
  `按下一個會先預覽，確認沒問題再插入。插入後拉角落調整大小。
學生在網站上就能直接玩，不用另外開連結。`,
  // SmallFeatures
  `快速帶過其他小功能：可收合群組適合放長的說明；目錄自動抓標題；
公告橫幅放重要通知；最後更新時間讓大家知道內容新不新；右上角的裝置圖示可以看手機版。`,
  // Publish
  `做好先預覽，切手機、平板、電腦看看。
右上角發布，設定網址和誰可以看。
最常見的錯：改完內容忘記再按發布，別人看到的還是舊版。
（截圖待補，可現場示範發布視窗。）`,
  // PracticeSites
  `實作 15 分鐘。這頁會一直留在螢幕上，照步驟做。
按播放鍵開始倒數。
沒有自己清單的老師，可以先用策略聯盟這 7 個網址練習。
有付費 Claude 的老師，也可以改走 Claude，直接分享連結。
提醒：先做出一頁就好，不求完美。
做完把網址貼到群組，最後成果分享會用到。
（巡場看大家卡在哪一步。）`,
  // Troubleshoot
  `巡場時最常遇到這三個狀況：檔案打不開是共用權限；內嵌空白是對方網站不給嵌，改用按鈕；
看不到新內容是忘記發布。`,
  // Break
  `休息 10 分鐘。回來做 skill，請先打開 Gemini。`,
  // Part2
  `PART 2：Skills。目標是讓社群的 5 個機器人延續下去。`,
  // WhatSkill
  `Skill 就是把一整段備課流程打包起來。
例如我做的 classical-chinese-prep：丟一篇文言文，一次就拿到 Word 對照講義和互動遊戲。`,
  // GemVsSkill
  `和 Gem 的差別：Gem 要從側欄點開，是一個固定角色在陪你對話；
Skill 在任何對話打 @ 就能叫出來，能串好幾個步驟，一次產出好幾樣。
最大的不同是做法：Gem 要自己寫一大段指令；Skill 是先做一次，再請 AI 幫你打包。
（依現場 Gemini 介面實際狀況調整說法。）`,
  // Skill1
  `示範第一步：先正常備課。我貼了〈愛蓮說〉，請它做白話對照版，輸出 Word。`,
  // Skill2
  `第二步：接著請它做互動遊戲，目標是學生精熟這些翻譯。`,
  // Skill3
  `第三步：滿意了，就請它把剛剛的流程做成 skill。
它會幫你取名、寫好說明，並且啟用。`,
  // Skill4
  `第四步：開新對話，輸入 @，在「技能」裡就看得到剛做好的 skill。`,
  // Skill5
  `第五步：測試。換一篇〈登鸛雀樓〉，看它是不是照流程一次做完。
不滿意的地方，就請它修改 skill。`,
  // PracticeSkill
  `換大家做。用你們社群的 Gem，或你平常的備課方式，先做一次，再打包成 skill。
右邊這段話可以直接照打。
提醒：一定要開新對話用 @ 測試，才知道 skill 有沒有成功。`,
  // FiveSkills
  `社群的 5 個機器人，都可以用同樣方式變成 5 個 skill。
之後由舊生負責維護，教材做好就上架到共享站。`,
  // Part3
  `PART 3：介紹我自己做的 AI 備課幫手。時間夠的話多講幾個工具。`,
  // PrepEntry
  `AI 備課幫手是一個網址，所有工具都在裡面，免安裝。
請大家掃 QR code 打開，等一下可以邊看邊試。`,
  // ToolChinese
  `國文課堂學習單：原文與易讀版雙軌對照，加田字格、段落摘要和隨段檢核。`,
  // ToolMath
  `數學階梯鷹架學習單：輸入題型或貼課本截圖，先講概念再拆例題，可以一鍵 A4 列印。`,
  // ToolEnglish
  `英文資源班學習單：用分鏡故事帶單字，搭配四線格練寫。`,
  // ToolUnscramble
  `句型重組：學生點卡片排句子，有語音朗讀，適合書寫困難的學生。
這種互動網頁也可以用剛剛學的內嵌，放進你的 Google Sites。`,
  // ToolStepMath
  `互動步驟數學：把解題拆成小步驟，每一步即時回饋。`,
  // Sharing
  `成果分享：打開你的教材頁，每人一分鐘，回答這三個問題。`,
  // Resources
  `今天用到的連結都在這裡，可以拍照或掃 QR code。`,
  // Thanks
  `謝謝大家。你們今天做的教材頁，就是共享站的第一頁。`,
];
