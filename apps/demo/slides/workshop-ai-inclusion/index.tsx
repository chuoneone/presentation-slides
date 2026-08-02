import {
  type DesignSystem,
  ImagePlaceholder,
  type Page,
  type SlideMeta,
  type SlideTransition,
  Step,
  Steps,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';
import printStep1 from './assets/html學習單列印-步驟1全選.png';
import printStep2 from './assets/html學習單列印-步驟2ctrl+p.png';
import volleyballWeb from './assets/排球互動網頁.png';
import qingWeb from './assets/清朝互動網頁.png';
import worksheetFromWeb from './assets/網頁變學習單.png';
import coverImage from './assets/首頁.png';
import coverIllustration from './assets/cover_illustration.jpg';
import pixarCoverArt from './assets/pixar_cover_art.jpg';

export const design: DesignSystem = {
  palette: { bg: '#f4efe4', text: '#183b38', accent: '#e85d3f' },
  fonts: {
    display: '"Noto Serif TC", "Songti TC", "PMingLiU", serif',
    body: '"Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
  },
  typeScale: { hero: 156, body: 36 },
  radius: 24,
};

const paper = '#f4efe4';
const paperLight = '#fffdf8';
const ink = '#183b38';
const green = '#2f6b5f';
const greenDark = '#153c37';
const mint = '#dce9dc';
const coral = '#e85d3f';
const amber = '#f0bd58';
const blue = '#4f7480';
const muted = '#6f7d75';
const hairline = 'rgba(24, 59, 56, 0.16)';
const shadow = '0 24px 60px rgba(35, 57, 47, 0.14)';
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 220,
  exit: {
    duration: 150,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 220,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(7px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  fontFamily: 'var(--osd-font-body)',
};

const PageShell = ({
  children,
  eyebrow,
  dark = false,
  accent = coral,
}: {
  children: ReactNode;
  eyebrow: string;
  dark?: boolean;
  accent?: string;
}) => {
  const { current, total } = useSlidePageNumber();
  const foreground = dark ? paperLight : 'var(--osd-text)';
  const secondary = dark ? 'rgba(255, 253, 248, 0.64)' : muted;
  return (
    <div
      style={{
        ...fill,
        position: 'relative',
        display: 'grid',
        gridTemplateRows: '36px 1fr 32px',
        padding: '64px 112px 48px',
        color: foreground,
        background: dark
          ? greenDark
          : 'radial-gradient(circle at 82% 12%, rgba(240, 189, 88, 0.16), transparent 26%), radial-gradient(circle at 12% 88%, rgba(47, 107, 95, 0.10), transparent 28%), var(--osd-bg)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 60,
          right: 112,
          width: 112,
          height: 12,
          background: accent,
          transform: 'rotate(-1.5deg)',
          opacity: 0.88,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: '0.18em',
          color: dark ? amber : accent,
        }}
      >
        {eyebrow}
      </div>
      <main
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 0,
        }}
      >
        {children}
      </main>
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          borderTop: `1px solid ${dark ? 'rgba(255, 253, 248, 0.18)' : hairline}`,
          paddingTop: 14,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '0.12em',
          color: secondary,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span>研習簡報・AI 與普特融合</span>
        <span>
          {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </footer>
    </div>
  );
};

const Title = ({
  children,
  size = 70,
  margin = '0 0 48px',
  color,
}: {
  children: ReactNode;
  size?: number;
  margin?: string;
  color?: string;
}) => (
  <h2
    style={{
      maxWidth: 1660,
      margin,
      color,
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 900,
      lineHeight: 1.12,
      letterSpacing: '-0.035em',
    }}
  >
    {children}
  </h2>
);

const Marker = ({ children, color = amber }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      position: 'relative',
      display: 'inline-block',
      padding: '0 10px 4px',
      color: ink,
      background: color,
      transform: 'rotate(-0.7deg)',
    }}
  >
    {children}
  </span>
);

const ToolButton = ({
  href,
  label,
  color = coral,
  size = 'normal',
}: {
  href?: string;
  label: string;
  color?: string;
  size?: 'normal' | 'small' | 'large';
}) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const padding = isLarge ? '20px 44px' : isSmall ? '12px 26px' : '16px 36px';
  const fontSize = isLarge ? 32 : isSmall ? 24 : 28;
  const iconBadgeSize = isLarge ? 42 : isSmall ? 32 : 36;
  const arrowSize = isLarge ? 24 : isSmall ? 18 : 21;

  if (!href) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          padding,
          borderRadius: 99,
          background: color,
          color: paperLight,
          fontSize,
          fontWeight: 950,
          letterSpacing: '0.04em',
          boxShadow: '0 8px 24px rgba(24, 59, 56, 0.18)',
        }}
      >
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 14,
        padding,
        borderRadius: 99,
        background: `linear-gradient(135deg, ${color} 0%, ${color}ee 100%)`,
        color: paperLight,
        fontSize,
        fontWeight: 950,
        textDecoration: 'none',
        boxShadow: `0 10px 28px ${color}55, 0 4px 12px rgba(0, 0, 0, 0.15)`,
        border: '2px solid rgba(255, 253, 248, 0.4)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        letterSpacing: '0.04em',
      }}
    >
      <span>{label}</span>
      <span
        style={{
          display: 'inline-grid',
          placeItems: 'center',
          width: iconBadgeSize,
          height: iconBadgeSize,
          borderRadius: '50%',
          background: 'rgba(255, 253, 248, 0.28)',
          color: paperLight,
          fontSize: arrowSize,
          lineHeight: 1,
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)',
        }}
      >
        ↗
      </span>
    </a>
  );
};

const Bullet = ({
  children,
  color = coral,
  fontSize = 34,
}: {
  children: ReactNode;
  color?: string;
  fontSize?: number;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '24px 1fr',
      alignItems: 'baseline',
      gap: 18,
      fontSize,
      lineHeight: 1.42,
      fontWeight: 650,
    }}
  >
    <span style={{ color, fontSize: 28 }}>●</span>
    <span>{children}</span>
  </div>
);

const LoadRow = ({
  index,
  label,
  note,
  width,
}: {
  index: string;
  label: string;
  note: string;
  width: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '76px 420px 1fr 360px',
      alignItems: 'center',
      gap: 28,
      minHeight: 104,
      borderBottom: `1px solid ${hairline}`,
    }}
  >
    <div
      style={{
        width: 52,
        height: 52,
        display: 'grid',
        placeItems: 'center',
        borderRadius: '50%',
        background: ink,
        color: paperLight,
        fontSize: 22,
        fontWeight: 900,
      }}
    >
      {index}
    </div>
    <div style={{ fontSize: 35, fontWeight: 850 }}>{label}</div>
    <div
      style={{
        height: 14,
        borderRadius: 99,
        background: 'rgba(24, 59, 56, 0.10)',
      }}
    >
      <div
        style={{
          width,
          height: '100%',
          borderRadius: 99,
          background: width === '92%' ? coral : width === '78%' ? amber : green,
        }}
      />
    </div>
    <div style={{ color: muted, fontSize: 28, lineHeight: 1.4 }}>{note}</div>
  </div>
);

const SupportRow = ({
  icon,
  topic,
  supports,
  color,
}: {
  icon: string;
  topic: string;
  supports: string;
  color: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '94px 300px 1fr',
      alignItems: 'center',
      minHeight: 132,
      padding: '0 34px',
      background: paperLight,
      borderBottom: `1px solid ${hairline}`,
    }}
  >
    <div
      style={{
        width: 58,
        height: 58,
        display: 'grid',
        placeItems: 'center',
        borderRadius: '50%',
        background: color,
        color: paperLight,
        fontSize: 30,
        fontWeight: 900,
      }}
    >
      {icon}
    </div>
    <div style={{ fontSize: 35, fontWeight: 900 }}>{topic}</div>
    <div style={{ fontSize: 31, lineHeight: 1.45, color: muted }}>{supports}</div>
  </div>
);

const DecisionSide = ({
  label,
  headline,
  children,
  color,
}: {
  label: string;
  headline: string;
  children: ReactNode;
  color: string;
}) => (
  <section
    style={{
      minHeight: 480,
      padding: '46px 54px',
      background: paperLight,
      borderTop: `10px solid ${color}`,
      boxShadow: shadow,
      transform: color === green ? 'rotate(-0.4deg)' : 'rotate(0.35deg)',
    }}
  >
    <div style={{ color, fontSize: 23, fontWeight: 900, letterSpacing: '0.16em' }}>{label}</div>
    <h3
      style={{
        margin: '18px 0 34px',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 48,
        lineHeight: 1.18,
      }}
    >
      {headline}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>
  </section>
);

const PathCard = ({
  glyph,
  title,
  subtitle,
  color,
}: {
  glyph: string;
  title: string;
  subtitle: string;
  color: string;
}) => (
  <div
    style={{
      width: 560,
      minHeight: 290,
      display: 'grid',
      gridTemplateColumns: '150px 1fr',
      alignItems: 'center',
      gap: 32,
      padding: '42px 48px',
      background: paperLight,
      border: `2px solid ${color}`,
      borderRadius: 30,
      boxShadow: shadow,
    }}
  >
    <div
      style={{
        width: 126,
        height: 126,
        display: 'grid',
        placeItems: 'center',
        borderRadius: 28,
        background: color,
        color: paperLight,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 62,
        fontWeight: 900,
      }}
    >
      {glyph}
    </div>
    <div>
      <div style={{ fontSize: 46, fontWeight: 900 }}>{title}</div>
      <div style={{ marginTop: 18, color: muted, fontSize: 30, lineHeight: 1.45 }}>{subtitle}</div>
    </div>
  </div>
);

const DifficultyRow = ({ index, children }: { index: string; children: ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '68px 1fr',
      alignItems: 'center',
      minHeight: 86,
      padding: '0 26px',
      borderBottom: `1px solid ${hairline}`,
      fontSize: 32,
      fontWeight: 750,
    }}
  >
    <span
      style={{
        width: 42,
        height: 42,
        display: 'grid',
        placeItems: 'center',
        borderRadius: '50%',
        background: mint,
        color: greenDark,
        fontSize: 20,
        fontWeight: 900,
      }}
    >
      {index}
    </span>
    <span>{children}</span>
  </div>
);

const LevelCard = ({
  level,
  title,
  color,
  children,
  lift,
}: {
  level: string;
  title: string;
  color: string;
  children: ReactNode;
  lift: number;
}) => (
  <section
    style={{
      minHeight: 500,
      padding: '38px 42px',
      background: paperLight,
      borderTop: `12px solid ${color}`,
      borderRadius: '0 0 28px 28px',
      boxShadow: shadow,
      transform: `translateY(${lift}px)`,
    }}
  >
    <div style={{ color, fontSize: 22, fontWeight: 900, letterSpacing: '0.18em' }}>{level}</div>
    <h3
      style={{
        margin: '18px 0 30px',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 48,
      }}
    >
      {title}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>{children}</div>
  </section>
);

const ToolRow = ({
  problem,
  tool,
  result,
  color,
}: {
  problem: string;
  tool: string;
  result: string;
  color: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '390px 330px 1fr',
      alignItems: 'center',
      minHeight: 116,
      padding: '0 36px',
      background: paperLight,
      borderBottom: `1px solid ${hairline}`,
      fontSize: 29,
    }}
  >
    <div style={{ fontWeight: 800 }}>{problem}</div>
    <div style={{ color, fontWeight: 950 }}>{tool}</div>
    <div style={{ color: muted, lineHeight: 1.4 }}>{result}</div>
  </div>
);

const TimelineStop = ({
  time,
  title,
  action,
  color,
}: {
  time: string;
  title: string;
  action: string;
  color: string;
}) => (
  <div style={{ position: 'relative', width: 360, paddingTop: 58 }}>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 34,
        height: 34,
        borderRadius: '50%',
        border: `8px solid ${paper}`,
        background: color,
        boxShadow: `0 0 0 2px ${color}`,
      }}
    />
    <div style={{ color, fontSize: 22, fontWeight: 900, letterSpacing: '0.14em' }}>{time}</div>
    <h3
      style={{
        margin: '14px 0 18px',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 46,
      }}
    >
      {title}
    </h3>
    <div style={{ color: muted, fontSize: 30, lineHeight: 1.5 }}>{action}</div>
  </div>
);

const PromptStrip = ({
  number,
  children,
  color,
}: {
  number: string;
  children: ReactNode;
  color: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '72px 1fr',
      alignItems: 'center',
      minHeight: 118,
      marginBottom: 24,
      padding: '18px 28px',
      background: paperLight,
      borderLeft: `12px solid ${color}`,
      boxShadow: '0 14px 36px rgba(35, 57, 47, 0.10)',
      transform: number === '02' ? 'rotate(0.25deg)' : 'rotate(-0.2deg)',
    }}
  >
    <span
      style={{
        color,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 34,
        fontWeight: 900,
      }}
    >
      {number}
    </span>
    <span style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.35 }}>{children}</span>
  </div>
);

const ScreenshotFrame = ({
  src,
  alt,
  caption,
  height,
  rotate = 0,
}: {
  src: string;
  alt: string;
  caption: string;
  height: number;
  rotate?: number;
}) => (
  <figure
    style={{
      margin: 0,
      padding: 18,
      background: paperLight,
      border: `2px solid ${hairline}`,
      borderRadius: 24,
      boxShadow: shadow,
      transform: `rotate(${rotate}deg)`,
    }}
  >
    <div
      style={{
        height: 38,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '0 8px 12px',
      }}
    >
      <span style={{ width: 12, height: 12, borderRadius: '50%', background: coral }} />
      <span style={{ width: 12, height: 12, borderRadius: '50%', background: amber }} />
      <span style={{ width: 12, height: 12, borderRadius: '50%', background: green }} />
      <span style={{ marginLeft: 12, color: muted, fontSize: 20, fontWeight: 800 }}>{caption}</span>
    </div>
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height,
        display: 'block',
        objectFit: 'contain',
        objectPosition: 'center',
        background: '#f2f2ef',
        borderRadius: 14,
      }}
    />
  </figure>
);

const VersionPanel = ({
  title,
  subtitle,
  color,
  children,
}: {
  title: string;
  subtitle: string;
  color: string;
  children: ReactNode;
}) => (
  <div
    style={{
      minHeight: 292,
      padding: '34px 40px',
      background: paperLight,
      borderTop: `10px solid ${color}`,
      boxShadow: '0 16px 42px rgba(35, 57, 47, 0.10)',
    }}
  >
    <div style={{ color, fontSize: 21, fontWeight: 900, letterSpacing: '0.14em' }}>{subtitle}</div>
    <h3
      style={{
        margin: '14px 0 22px',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 44,
      }}
    >
      {title}
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
  </div>
);

const FlowNode = ({
  number,
  title,
  subtitle,
  color,
}: {
  number: string;
  title: string;
  subtitle: string;
  color: string;
}) => (
  <div
    style={{
      width: 410,
      minHeight: 320,
      padding: '38px 42px',
      background: paperLight,
      borderTop: `12px solid ${color}`,
      boxShadow: shadow,
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        display: 'grid',
        placeItems: 'center',
        borderRadius: '50%',
        background: color,
        color: paperLight,
        fontSize: 22,
        fontWeight: 900,
      }}
    >
      {number}
    </div>
    <h3
      style={{
        margin: '24px 0 20px',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 44,
      }}
    >
      {title}
    </h3>
    <div style={{ color: muted, fontSize: 29, lineHeight: 1.5 }}>{subtitle}</div>
  </div>
);

const ActivityRow = ({
  purpose,
  tool,
  href,
  example,
  color,
}: {
  purpose: string;
  tool: string;
  href?: string;
  example: string;
  color: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '450px 410px 1fr',
      alignItems: 'center',
      minHeight: 154,
      padding: '0 38px',
      background: paperLight,
      borderBottom: `1px solid ${hairline}`,
    }}
  >
    <div style={{ fontSize: 30, fontWeight: 850, lineHeight: 1.4 }}>{purpose}</div>
    <div>
      {href ? (
        <ToolButton href={href} label={tool} color={color} size="small" />
      ) : (
        <div style={{ color, fontSize: 32, fontWeight: 950 }}>{tool}</div>
      )}
    </div>
    <div style={{ color: muted, fontSize: 27, lineHeight: 1.45 }}>{example}</div>
  </div>
);

const ChoiceRow = ({
  index,
  problem,
  tool,
  color,
}: {
  index: string;
  problem: string;
  tool: string;
  color: string;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '72px 650px 100px 1fr',
      alignItems: 'center',
      minHeight: 102,
      padding: '0 30px',
      borderBottom: `1px solid ${hairline}`,
      background: paperLight,
    }}
  >
    <span style={{ color, fontSize: 22, fontWeight: 950 }}>{index}</span>
    <span style={{ fontSize: 30, fontWeight: 800 }}>{problem}</span>
    <span style={{ color, fontSize: 34, fontWeight: 900 }}>→</span>
    <span style={{ color, fontSize: 30, fontWeight: 950 }}>{tool}</span>
  </div>
);

const ActionCard = ({
  number,
  title,
  detail,
  color,
  rotate,
}: {
  number: string;
  title: string;
  detail: string;
  color: string;
  rotate: number;
}) => (
  <div
    style={{
      minHeight: 270,
      display: 'grid',
      gridTemplateColumns: '88px 1fr',
      gap: 22,
      padding: '38px 42px',
      background: paperLight,
      borderTop: `10px solid ${color}`,
      boxShadow: '0 18px 46px rgba(35, 57, 47, 0.11)',
      transform: `rotate(${rotate}deg)`,
    }}
  >
    <div
      style={{
        width: 64,
        height: 64,
        display: 'grid',
        placeItems: 'center',
        borderRadius: '50%',
        background: color,
        color: paperLight,
        fontSize: 25,
        fontWeight: 950,
      }}
    >
      {number}
    </div>
    <div>
      <h3
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 40,
          lineHeight: 1.25,
        }}
      >
        {title}
      </h3>
      <div style={{ marginTop: 18, color: muted, fontSize: 27, lineHeight: 1.45 }}>{detail}</div>
    </div>
  </div>
);

const Slide01Cover: Page = () => (
  <PageShell eyebrow="PINGHE JUNIOR HIGH SCHOOL · 120 MIN">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.08fr 0.92fr',
        alignItems: 'center',
        gap: 80,
      }}
    >
      <div>
        <div style={{ color: coral, fontSize: 28, fontWeight: 900, letterSpacing: '0.14em', marginBottom: 18 }}>
          透過 AI 落地普特融合
        </div>
        <h1
          style={{ margin: '0 0 32px', fontFamily: 'var(--osd-font-display)', fontSize: '95px', fontWeight: 950, lineHeight: 1.1, letterSpacing: '-0.04em', color: ink }}
        >
          AI 工具協助課程設計
          <br />
          與差異化教材實務
        </h1>
        <p
          style={{
            maxWidth: 900,
            margin: 0,
            color: muted,
            fontSize: 34,
            fontWeight: 650,
            lineHeight: 1.5,
          }}
        >
          特教學生在普通班使用 AI 教材
          <br />
          <Marker>讀得懂・練得到・答得出來</Marker>
        </p>
      </div>
      <div style={{ position: 'relative', height: 680, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            position: 'relative',
            width: 610,
            height: 610,
            borderRadius: 40,
            padding: 14,
            background: paperLight,
            boxShadow: '0 32px 80px rgba(24, 59, 56, 0.18)',
            border: `2px solid ${hairline}`,
            overflow: 'hidden',
          }}
        >
          <img
            src={pixarCoverArt}
            alt="皮克斯 3D 動畫風格特教與 AI 融合課堂"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 28,
              display: 'block',
            }}
          />
        </div>
      </div>
    </div>
  </PageShell>
);

Slide01Cover.transition = {
  duration: 280,
  exit: {
    duration: 160,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-6px)' },
    ],
  },
  enter: {
    duration: 280,
    delay: 100,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};

const AgendaCard = ({
  part,
  title,
  subtitle,
  bullets,
  color,
  rotate = 0,
}: {
  part: string;
  title: string;
  subtitle: string;
  bullets: string[];
  color: string;
  rotate?: number;
}) => (
  <div
    style={{
      minHeight: 500,
      padding: '40px 38px',
      background: paperLight,
      borderTop: `12px solid ${color}`,
      boxShadow: shadow,
      transform: `rotate(${rotate}deg)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div>
      <div style={{ color, fontSize: 22, fontWeight: 900, letterSpacing: '0.18em' }}>{part}</div>
      <h3
        style={{
          margin: '16px 0 12px',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 42,
          fontWeight: 950,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
      <div style={{ color: muted, fontSize: 27, fontWeight: 750, marginBottom: 32, lineHeight: 1.4 }}>
        {subtitle}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {bullets.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'grid',
              gridTemplateColumns: '22px 1fr',
              alignItems: 'baseline',
              gap: 14,
              fontSize: 27,
              fontWeight: 650,
              lineHeight: 1.42,
            }}
          >
            <span style={{ color, fontSize: 22 }}>●</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
    <div
      style={{
        marginTop: 28,
        padding: '12px 18px',
        borderRadius: 12,
        background: 'rgba(24, 59, 56, 0.05)',
        color: ink,
        fontSize: 22,
        fontWeight: 800,
        textAlign: 'center',
      }}
    >
      {part === 'PART 1' && '讀得懂・拿得到・寫得出來'}
      {part === 'PART 2' && '願意學・自主學・依速度學'}
      {part === 'PART 3' && '對照地圖・下週立即行動'}
    </div>
  </div>
);

const Slide01Agenda: Page = () => (
  <PageShell eyebrow="AGENDA · 本日大綱" accent={coral}>
    <Title margin="0 0 38px">
      本日研習大綱：<Marker color={amber}>從紙本到互動的 AI 備課路徑</Marker>
    </Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 38 }}>
      <AgendaCard
        part="PART 1"
        title="紙本教材差異化"
        subtitle="讓學生拿得到、讀得懂、寫得出來"
        bullets={[
          '描述學生困難，對話生成初稿',
          '三層次難度與仿 A4 學習單',
          '將紙本重新設計為學習鷹架',
        ]}
        color={green}
        rotate={-0.3}
      />
      <AgendaCard
        part="PART 2"
        title="互動網頁教學運用"
        subtitle="讓學生願意學、自主學、依速度學"
        bullets={[
          '一句話生成單元互動探索網頁',
          '基礎版與挑戰版差異化入口',
          '網頁與紙本互相轉換的學習流程',
        ]}
        color={blue}
        rotate={0.3}
      />
      <AgendaCard
        part="PART 3"
        title="現有工具與行動"
        subtitle="從下週的一個單元開始實作"
        bullets={[
          '對照課堂困難快速選擇 AI 工具',
          '省下重複講解，走近學生身邊',
          '挑選最容易的第一步開始改變',
        ]}
        color={coral}
        rotate={-0.2}
      />
    </div>
  </PageShell>
);

const Slide02NotAttitude: Page = () => (
  <PageShell eyebrow="01 · 看見教材負荷">
    <Title>
      跟不上，<Marker>不一定是不想學</Marker>
    </Title>
    <Steps>
      <Step duration={160}>
        <LoadRow index="01" label="文字太多、題目太長" note="閱讀負荷先超標" width="92%" />
      </Step>
      <Step duration={160}>
        <LoadRow index="02" label="步驟太複雜" note="不知道從哪裡開始" width="78%" />
      </Step>
      <Step duration={160}>
        <LoadRow index="03" label="講述速度太快" note="理解還沒跟上" width="64%" />
      </Step>
      <Step duration={160}>
        <LoadRow index="04" label="寫不出完整答案" note="不等於沒有想法" width="46%" />
      </Step>
    </Steps>
    <div
      style={{
        marginTop: 38,
        padding: '22px 30px',
        borderLeft: `8px solid ${coral}`,
        color: greenDark,
        background: 'rgba(232, 93, 63, 0.08)',
        fontSize: 31,
        fontWeight: 850,
      }}
    >
      發呆、逃避或干擾，有時是教材已超過學生當下能承受的負荷。
    </div>
  </PageShell>
);

const Slide03SameGoal: Page = () => (
  <PageShell eyebrow="02 · 同目標，不同路徑" accent={green}>
    <Title margin="0 0 30px">普特融合的關鍵，不是「每人一套課」</Title>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 34,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 50,
          fontWeight: 950,
          lineHeight: 1.25,
        }}
      >
        學習目標可以一致；
        <br />
        <span style={{ color: coral }}>支持方式可以不同。</span>
      </div>
      <div
        style={{
          width: 310,
          height: 96,
          display: 'grid',
          placeItems: 'center',
          borderRadius: 99,
          color: paperLight,
          background: greenDark,
          fontSize: 31,
          fontWeight: 900,
          transform: 'rotate(1.2deg)',
        }}
      >
        核心不降低
      </div>
    </div>
    <div style={{ overflow: 'visible', borderRadius: 24, boxShadow: shadow }}>
      <SupportRow icon="讀" topic="閱讀文本" supports="易讀版、關鍵詞、圖像、報讀" color={green} />
      <SupportRow icon="做" topic="練習任務" supports="分段步驟、配對、排序、選擇" color={blue} />
      <SupportRow
        icon="答"
        topic="評量活動"
        supports="線上作答、逐題呈現、多元回饋"
        color={coral}
      />
    </div>
  </PageShell>
);

const Slide04TeacherAndAi: Page = () => (
  <PageShell eyebrow="03 · 專業判斷 × 生成加速">
    <Title margin="0 0 54px">AI 讓調整變快；教師決定什麼值得學</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 58 }}>
      <DecisionSide label="TEACHER · 把關" headline="教師保留最重要的判斷" color={green}>
        <Bullet color={green}>本單元最重要的學習目標</Bullet>
        <Bullet color={green}>學生真正需要的支持</Bullet>
        <Bullet color={green}>哪些內容不能被降低</Bullet>
      </DecisionSide>
      <DecisionSide label="AI · 加速" headline="AI 先做可修改的第一版" color={coral}>
        <Bullet>生成調整版初稿</Bullet>
        <Bullet>提供不同難度與題型</Bullet>
        <Bullet>轉成紙本或互動式教材</Bullet>
      </DecisionSide>
    </div>
    <div
      style={{
        alignSelf: 'center',
        marginTop: 34,
        color: muted,
        fontSize: 29,
        fontWeight: 750,
      }}
    >
      真正的專業，是知道學生卡在哪裡，也知道什麼不能被拿掉。
    </div>
  </PageShell>
);

const Slide05TwoPaths: Page = () => (
  <PageShell eyebrow="04 · 今天的兩條教材路徑" accent={blue}>
    <Title margin="0 0 34px">同一份單元內容，可以長成兩種入口</Title>
    <div
      style={{
        alignSelf: 'center',
        minWidth: 620,
        padding: '20px 38px',
        border: `3px solid ${ink}`,
        borderRadius: 99,
        textAlign: 'center',
        background: paperLight,
        fontSize: 34,
        fontWeight: 900,
      }}
    >
      同一份單元內容
    </div>
    <div
      aria-hidden="true"
      style={{
        alignSelf: 'center',
        width: 4,
        height: 62,
        background: ink,
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
      <PathCard glyph="紙" title="紙本教材" subtitle="讀得懂、寫得出來" color={green} />
      <div
        style={{
          color: coral,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 64,
          fontWeight: 900,
        }}
      >
        ↔
      </div>
      <PathCard glyph="網" title="互動網頁" subtitle="自主學、反覆練、依速度完成" color={coral} />
    </div>
    <div
      style={{
        alignSelf: 'center',
        marginTop: 34,
        padding: '14px 30px',
        background: amber,
        color: ink,
        fontSize: 27,
        fontWeight: 900,
        transform: 'rotate(-0.6deg)',
      }}
    >
      最後再把工具放到最適合的教學情境
    </div>
  </PageShell>
);

const Slide06PaperSection: Page = () => (
  <PageShell eyebrow="PART 1 · PAPER FIRST" dark accent={amber}>
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', alignItems: 'center' }}>
      <div>
        <div style={{ color: amber, fontSize: 30, fontWeight: 900, letterSpacing: '0.16em' }}>
          紙本教材的差異化設計
        </div>
        <h2
          style={{
            margin: '28px 0 34px',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 126,
            lineHeight: 1.02,
            letterSpacing: '-0.05em',
          }}
        >
          先從手邊
          <br />
          一份教材開始
        </h2>
        <p style={{ margin: 0, color: 'rgba(255, 253, 248, 0.68)', fontSize: 34, lineHeight: 1.5 }}>
          課文、講義、題目、實驗步驟、歷史資料、運動規則
        </p>
      </div>
      <div style={{ position: 'relative', height: 650 }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 72,
            right: 54,
            width: 470,
            height: 560,
            background: '#b9cfbd',
            transform: 'rotate(7deg)',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 36,
            right: 112,
            width: 470,
            height: 560,
            padding: '54px 48px',
            boxSizing: 'border-box',
            color: ink,
            background: paperLight,
            boxShadow: '0 30px 60px rgba(0,0,0,0.24)',
            transform: 'rotate(-3deg)',
          }}
        >
          <div style={{ width: 110, height: 14, background: coral }} />
          <div
            style={{
              marginTop: 42,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 50,
              fontWeight: 900,
            }}
          >
            一份教材
          </div>
          <div style={{ marginTop: 34, height: 10, background: hairline }} />
          <div style={{ marginTop: 22, height: 10, width: '82%', background: hairline }} />
          <div style={{ marginTop: 22, height: 10, width: '68%', background: hairline }} />
          <div
            style={{
              marginTop: 56,
              padding: '24px 28px',
              border: `3px dashed ${coral}`,
              color: coral,
              fontSize: 34,
              fontWeight: 950,
              textAlign: 'center',
            }}
          >
            就是改變的起點
          </div>
        </div>
      </div>
    </div>
  </PageShell>
);

const Slide07DescribeDifficulty: Page = () => (
  <PageShell eyebrow="05 · 不用背完整咒語" accent={green}>
    <Title size={66} margin="0 0 48px">
      先把學生的<Marker>困難說出來</Marker>
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.72fr 1.28fr',
        gap: 64,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          minHeight: 520,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '52px 50px',
          color: paperLight,
          background: greenDark,
          boxShadow: shadow,
          transform: 'rotate(-1deg)',
        }}
      >
        <div style={{ color: amber, fontSize: 24, fontWeight: 900, letterSpacing: '0.16em' }}>
          PRIVACY FIRST
        </div>
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 64,
            fontWeight: 950,
            lineHeight: 1.18,
          }}
        >
          不寫姓名
          <br />
          不放個資
        </div>
        <div style={{ color: 'rgba(255, 253, 248, 0.66)', fontSize: 29, lineHeight: 1.5 }}>
          像跟助教說話一樣，
          <br />
          說明現在卡在哪裡。
        </div>
      </div>
      <div style={{ background: paperLight, boxShadow: shadow }}>
        <DifficultyRow index="01">基本計算有困難</DifficultyRow>
        <DifficultyRow index="02">識字量較少、閱讀速度較慢</DifficultyRow>
        <DifficultyRow index="03">注意力維持時間短</DifficultyRow>
        <DifficultyRow index="04">書寫、造句或組織答案有困難</DifficultyRow>
        <DifficultyRow index="05">需要將任務拆成明確步驟</DifficultyRow>
      </div>
    </div>
  </PageShell>
);

const Slide08FirstPrompt: Page = () => (
  <PageShell eyebrow="06 · 第一句，先求有" accent={coral}>
    <Title margin="0 0 42px">先做出一份可以修改的初稿</Title>
    <Steps>
      <div
        style={{
          position: 'relative',
          minHeight: 260,
          display: 'flex',
          alignItems: 'center',
          padding: '54px 68px',
          color: paperLight,
          background: greenDark,
          boxShadow: shadow,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -18,
            left: 48,
            padding: '8px 20px',
            color: ink,
            background: amber,
            fontSize: 21,
            fontWeight: 950,
            transform: 'rotate(-1.5deg)',
          }}
        >
          貼上教材後直接輸入
        </div>
        <div style={{ fontSize: 46, fontWeight: 850, lineHeight: 1.52 }}>
          「請調整難度，學生基本計算有困難，
          <br />
          識字也有困難，不專心。」
        </div>
      </div>
      <Step>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 44,
            marginTop: 38,
            padding: '30px 40px',
            border: `3px solid ${coral}`,
            background: paperLight,
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 850 }}>
            重點不是一次完美，而是先拿到
            <span style={{ color: coral }}> 可供教師修改的第一版。</span>
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            <span style={{ padding: '10px 18px', background: mint, fontSize: 24, fontWeight: 900 }}>
              計算
            </span>
            <span
              style={{ padding: '10px 18px', background: '#f7e7c4', fontSize: 24, fontWeight: 900 }}
            >
              識字
            </span>
            <span
              style={{ padding: '10px 18px', background: '#f5d8d0', fontSize: 24, fontWeight: 900 }}
            >
              專注
            </span>
          </div>
        </div>
      </Step>
    </Steps>
  </PageShell>
);

const Slide09ThreeLevels: Page = () => (
  <PageShell eyebrow="07 · 同一內容，三個入口" accent={amber}>
    <Title size={66} margin="0 0 34px">
      不必每次做三版；先從最常卡住的地方開始
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 34,
        alignItems: 'start',
      }}
    >
      <LevelCard level="ENTRY 01" title="基礎版" color={green} lift={34}>
        <Bullet color={green} fontSize={29}>
          短句與關鍵詞解釋
        </Bullet>
        <Bullet color={green} fontSize={29}>
          圖像支持、減少題量
        </Bullet>
        <Bullet color={green} fontSize={29}>
          先進入核心概念
        </Bullet>
      </LevelCard>
      <LevelCard level="ENTRY 02" title="一般版" color={blue} lift={14}>
        <Bullet color={blue} fontSize={29}>
          保留完整核心內容
        </Bullet>
        <Bullet color={blue} fontSize={29}>
          搭配標準練習
        </Bullet>
        <Bullet color={blue} fontSize={29}>
          維持班級共同進度
        </Bullet>
      </LevelCard>
      <LevelCard level="ENTRY 03" title="挑戰版" color={coral} lift={-6}>
        <Bullet color={coral} fontSize={29}>
          比較與推論
        </Bullet>
        <Bullet color={coral} fontSize={29}>
          延伸任務或探究題
        </Bullet>
        <Bullet color={coral} fontSize={29}>
          讓學得快的學生前進
        </Bullet>
      </LevelCard>
    </div>
  </PageShell>
);

const Slide10A4Worksheet: Page = () => (
  <PageShell eyebrow="08 · 第二句，讓成果可直接使用" accent={blue}>
    <Title size={60} margin="0 0 28px">
      內容有了，再請 AI 排成美觀的 A4 學習單
    </Title>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 30,
        minHeight: 92,
        marginBottom: 24,
        padding: '18px 30px',
        color: paperLight,
        background: greenDark,
      }}
    >
      <div style={{ color: amber, fontSize: 21, fontWeight: 900, letterSpacing: '0.14em' }}>
        PROMPT · 版面升級
      </div>
      <div style={{ fontSize: 29, fontWeight: 800, lineHeight: 1.4 }}>「依這份內容用html做一份仿 A4 學習單，列印要美觀且不能切割。」</div>
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.48fr 0.82fr',
        gap: 24,
        alignItems: 'start',
      }}
    >
      <ScreenshotFrame
        src={worksheetFromWeb}
        alt="Gemini Canvas 將排球網頁內容轉成仿 A4 學習單"
        caption="01 · 網頁內容轉成可列印學習單"
        height={454}
        rotate={-0.25}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <ScreenshotFrame
          src={printStep1}
          alt="全選列印設定提示文字"
          caption="02 · 全選列印設定"
          height={180}
          rotate={0.35}
        />
        <ScreenshotFrame
          src={printStep2}
          alt="按下 Ctrl+P 開啟列印或另存 PDF"
          caption="03 · Ctrl+P 列印／存 PDF"
          height={180}
          rotate={-0.25}
        />
      </div>
    </div>
  </PageShell>
);

const Slide11PaperTools: Page = () => (
  <PageShell eyebrow="09 · 先依課堂困難選工具" accent={green}>
    <Title size={60} margin="0 0 32px">
      紙本工具不是看名稱，而是看它解決哪個卡點
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '360px 480px 1fr',
        padding: '14px 36px',
        color: paperLight,
        background: greenDark,
        fontSize: 21,
        fontWeight: 900,
        letterSpacing: '0.12em',
      }}
    >
      <span>課堂困難</span>
      <span>推薦工具 (按一下開啟)</span>
      <span>可得到的支持</span>
    </div>
    <div style={{ boxShadow: shadow }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 480px 1fr',
          alignItems: 'center',
          minHeight: 110,
          padding: '0 36px',
          background: paperLight,
          borderBottom: `1px solid ${hairline}`,
          fontSize: 28,
        }}
      >
        <div style={{ fontWeight: 800 }}>文章太難讀</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <ToolButton href="https://spedmix.pages.dev/simple" label="課文簡化" color={green} size="small" />
        </div>
        <div style={{ color: muted, lineHeight: 1.4 }}>易讀文本、圖解、重點與練習</div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 480px 1fr',
          alignItems: 'center',
          minHeight: 110,
          padding: '0 36px',
          background: paperLight,
          borderBottom: `1px solid ${hairline}`,
          fontSize: 28,
        }}
      >
        <div style={{ fontWeight: 800 }}>同一份教材難度不一</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <ToolButton href="https://spedmix.pages.dev/differentiated" label="差異化教材" color={blue} size="small" />
        </div>
        <div style={{ color: muted, lineHeight: 1.4 }}>文本、重點、題目分層</div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 480px 1fr',
          alignItems: 'center',
          minHeight: 110,
          padding: '0 36px',
          background: paperLight,
          borderBottom: `1px solid ${hairline}`,
          fontSize: 28,
        }}
      >
        <div style={{ fontWeight: 800 }}>題目不符合學生能力</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <ToolButton href="https://spedmix.pages.dev/question" label="個別化出題" color={coral} size="small" />
        </div>
        <div style={{ color: muted, lineHeight: 1.4 }}>調整題型、難度與提示</div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 480px 1fr',
          alignItems: 'center',
          minHeight: 110,
          padding: '0 36px',
          background: paperLight,
          borderBottom: `1px solid ${hairline}`,
          fontSize: 28,
        }}
      >
        <div style={{ fontWeight: 800 }}>同概念需要反覆練習</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <ToolButton href="https://spedmix.pages.dev/mathquestion" label="數題數題" color="#9d6518" size="small" />
        </div>
        <div style={{ color: muted, lineHeight: 1.4 }}>一題延伸多題、循序練習</div>
      </div>
    </div>
    <div style={{ marginTop: 24, color: muted, fontSize: 26, fontWeight: 750 }}>
      不只國英數：社會、自然、健教、藝文與科技都能從「教材太難進入」開始調整。
    </div>
  </PageShell>
);

const Slide12PaperScaffold: Page = () => (
  <PageShell eyebrow="10 · 紙本是可重新設計的鷹架" accent={amber}>
    <Title size={64} margin="0 0 34px">
      紙本不是舊方法，它能把學習路徑留在桌面上
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.22fr 0.78fr',
        gap: 82,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          minHeight: 520,
          padding: '48px 56px',
          background: paperLight,
          boxShadow: shadow,
          transform: 'rotate(-0.6deg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 50, fontWeight: 950 }}>
            紙本的價值
          </div>
          <div style={{ width: 150, height: 14, background: amber }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 42 }}>
          <Bullet color={green}>有清楚的作答順序</Bullet>
          <Bullet color={blue}>能留下筆記與思考痕跡</Bullet>
          <Bullet color={coral}>適合課堂引導與師生討論</Bullet>
          <Bullet color="#9d6518">整理自主學習後的發現</Bullet>
        </div>
      </div>
      <div>
        <div
          style={{
            color: coral,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          紙本
          <br />
          不是終點
        </div>
        <div
          aria-hidden="true"
          style={{
            width: 240,
            height: 6,
            margin: '34px 0',
            background: coral,
          }}
        />
        <div style={{ color: muted, fontSize: 34, fontWeight: 750, lineHeight: 1.55 }}>
          如果想讓學生依自己的速度探索，
          <br />
          下一步就是加上
          <span style={{ color: green, fontWeight: 950 }}> 互動式網頁。</span>
        </div>
        <div style={{ marginTop: 34, color: green, fontSize: 64, fontWeight: 950 }}>→</div>
      </div>
    </div>
  </PageShell>
);

const SlidePracticePaper10Min: Page = () => (
  <PageShell eyebrow="11 · 課堂實作 10 分鐘（紙本學習單）" accent={green}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 54,
        alignItems: 'center',
      }}
    >
      <div>
        <div style={{ color: green, fontSize: 26, fontWeight: 950, letterSpacing: '0.16em' }}>
          PART 1 WORKSHOP · 紙本實作
        </div>
        <h2
          style={{
            margin: '20px 0 32px',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 84,
            fontWeight: 950,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
          }}
        >
          紙本實作時間 <span style={{ color: green }}>10 分鐘</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              padding: '24px 30px',
              background: paperLight,
              borderLeft: `10px solid ${green}`,
              boxShadow: shadow,
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1.45,
            }}
          >
            1. 挑選手邊一段學生最常卡住的課文或段落
          </div>
          <div
            style={{
              padding: '24px 30px',
              background: paperLight,
              borderLeft: `10px solid ${blue}`,
              boxShadow: shadow,
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1.45,
            }}
          >2. 輸入 Prompt 生成「基礎版易讀文本」並美化「仿 A4 學習單」</div>
          <div
            style={{
              padding: '24px 30px',
              background: paperLight,
              borderLeft: `10px solid ${coral}`,
              boxShadow: shadow,
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1.45,
            }}
          >
            3. 複製生成結果或截圖，上傳至 Padlet 研習成果板
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 30,
          padding: '48px 42px',
          background: greenDark,
          color: paperLight,
          boxShadow: shadow,
          transform: 'rotate(-0.8deg)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: '50%',
            background: amber,
            color: ink,
            fontSize: 60,
            fontWeight: 950,
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
          }}
        >
          📝
        </div>
        <div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 950 }}>
            紙本差異化成果上傳
          </div>
          <div style={{ marginTop: 12, color: 'rgba(255, 253, 248, 0.78)', fontSize: 25, lineHeight: 1.4 }}>
            請點擊下方按鈕，將實作學習單截圖或文字上傳到 Padlet
          </div>
        </div>
        <ToolButton
          href="https://padlet.com/pppchin7_1/1150828-j3bvi3ulp7iy2rwk"
          label="上傳紙本成果至 Padlet ↗"
          color={green}
          size="large"
        />
      </div>
    </div>
  </PageShell>
);

const Slide13WebSection: Page = () => (
  <PageShell eyebrow="PART 2 · INTERACTIVE WEB" dark accent={blue}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.08fr 0.92fr',
        alignItems: 'center',
        gap: 84,
      }}
    >
      <div>
        <div style={{ color: amber, fontSize: 28, fontWeight: 900, letterSpacing: '0.16em' }}>
          PART 02 · 互動式網頁
        </div>
        <h2
          style={{
            margin: '28px 0 34px',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 120,
            fontWeight: 950,
            lineHeight: 1.02,
            letterSpacing: '-0.055em',
          }}
        >
          多一個進入
          <br />
          課程的入口
        </h2>
        <p style={{ margin: 0, color: 'rgba(255, 253, 248, 0.68)', fontSize: 36, lineHeight: 1.5 }}>
          網頁不是為了炫技，而是讓學生願意學、能自主學、依自己的速度學。
        </p>
      </div>
      <div style={{ position: 'relative', height: 600 }}>
        <ScreenshotFrame
          src={qingWeb}
          alt="清朝歷史互動網頁"
          caption="示範入口 · 清朝歷史互動探索"
          height={480}
          rotate={-0.8}
        />
        <div
          style={{
            position: 'absolute',
            right: 18,
            bottom: 24,
            padding: '16px 26px',
            color: ink,
            background: amber,
            fontSize: 26,
            fontWeight: 900,
            transform: 'rotate(2deg)',
          }}
        >
          預習・探索・即時回饋
        </div>
      </div>
    </div>
  </PageShell>
);

const Slide14WhenToUseWeb: Page = () => (
  <PageShell eyebrow="11 · 網頁放在哪個教學時機？" accent={blue}>
    <Title margin="0 0 32px">學生不必在同一分鐘，完成同一件事</Title>
    <div
      style={{
        marginBottom: 60,
        color: muted,
        fontSize: 31,
        fontWeight: 700,
      }}
    >
      教師可以走到學生身邊，看見他卡在哪一段。
    </div>
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 4,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 20,
          left: 12,
          right: 12,
          height: 5,
          background: hairline,
        }}
      />
      <TimelineStop
        time="BEFORE"
        title="課前"
        action="看重點、預習概念、完成小挑戰"
        color={green}
      />
      <TimelineStop
        time="IN CLASS"
        title="課中"
        action="依自己的速度探索、操作與練習"
        color={blue}
      />
      <TimelineStop time="AFTER" title="課後" action="複習、補學、再次嘗試" color={coral} />
      <TimelineStop
        time="HOME"
        title="回家作業"
        action="留下互動與回饋，不只翻課本"
        color="#9d6518"
      />
    </div>
  </PageShell>
);

const Slide15OneSentenceWeb: Page = () => (
  <PageShell eyebrow="12 · 一句話也能生成網頁" accent={coral}>
    <Title size={62} margin="0 0 34px">
      先說出想教的內容，再用短句繼續修改
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.78fr 1.22fr',
        gap: 42,
        alignItems: 'center',
      }}
    >
      <div>
        <Steps>
          <Step>
            <PromptStrip number="01" color={green}>
              幫我做一個「清朝歷史」的互動網頁。
            </PromptStrip>
          </Step>
          <Step>
            <PromptStrip number="02" color={blue}>
              幫我做一個排球介紹的互動網頁。
            </PromptStrip>
          </Step>
          <Step>
            <PromptStrip number="03" color={coral}>
              請根據以下課文，做一個互動式學習網頁。
            </PromptStrip>
          </Step>
        </Steps>
        <div
          style={{ marginTop: 18, color: muted, fontSize: 27, fontWeight: 750, lineHeight: 1.4 }}
        >
          第一版只是起點；想加內容或活動，再補一句就好。
        </div>
      </div>
      <ScreenshotFrame
        src={volleyballWeb}
        alt="使用一句話生成的排球互動教學網頁"
        caption="跨科示例 · 排球互動網頁"
        height={452}
        rotate={0.35}
      />
    </div>
  </PageShell>
);

const Slide16SocialStudiesCase: Page = () => (
  <PageShell eyebrow="13 · 案例：社會科也能快速上手" accent={green}>
    <Title size={60} margin="0 0 34px">
      「清朝歷史」不只是一段長文字，也能成為可探索的單元
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: 48,
        alignItems: 'center',
      }}
    >
      <ScreenshotFrame
        src={qingWeb}
        alt="社會科清朝歷史單元互動網頁"
        caption="社會科互動式探索頁面"
        height={460}
        rotate={-0.3}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <VersionPanel title="帝王年譜與大事記" subtitle="概念時間軸" color={green}>
          <Bullet color={green} fontSize={28}>
            歷史事件分段呈現
          </Bullet>
          <Bullet color={green} fontSize={28}>
            降低大量文字壓迫感
          </Bullet>
        </VersionPanel>
        <VersionPanel title="文化與疆域探索" subtitle="互動操作" color={blue}>
          <Bullet color={blue} fontSize={28}>
            可點擊探索細節
          </Bullet>
          <Bullet color={blue} fontSize={28}>
            附即時小挑戰檢核
          </Bullet>
        </VersionPanel>
      </div>
    </div>
  </PageShell>
);

const Slide17DifferentiateWeb: Page = () => (
  <PageShell eyebrow="14 · 網頁做好後，再補一句做差異化" accent={amber}>
    <Title size={60} margin="0 0 36px">
      基礎版先保核心；挑戰版讓學得快的學生前進
    </Title>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 30,
        marginBottom: 36,
        padding: '20px 36px',
        color: paperLight,
        background: greenDark,
      }}
    >
      <div style={{ color: amber, fontSize: 22, fontWeight: 900, letterSpacing: '0.14em' }}>
        PROMPT · 差異化網頁
      </div>
      <div style={{ fontSize: 32, fontWeight: 850 }}>
        「增加基礎版本和挑戰版本。」
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 42 }}>
      <VersionPanel title="基礎版本" subtitle="讓卡住的學生有入口" color={green}>
        <Bullet color={green}>增加關鍵詞圖解與易讀說明</Bullet>
        <Bullet color={green}>保留核心概念，減少多餘資訊</Bullet>
        <Bullet color={green}>搭配分步驟互動操作</Bullet>
      </VersionPanel>
      <VersionPanel title="挑戰版本" subtitle="讓學習快的學生深入" color={coral}>
        <Bullet color={coral}>加入比較、推論與探究提問</Bullet>
        <Bullet color={coral}>提供延伸補充資料與應用題</Bullet>
        <Bullet color={coral}>保持高動機主動探索</Bullet>
      </VersionPanel>
    </div>
  </PageShell>
);

const Slide18LearningFlow: Page = () => (
  <PageShell eyebrow="15 · 完整學習流程" accent={coral}>
    <Title size={60} margin="0 0 38px">
      網頁、紙本與線上評量，可以串成完整學習循環
    </Title>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
      <FlowNode
        number="01"
        title="互動式網頁"
        subtitle="預習、探索、操作，獲得即時回饋"
        color={green}
      />
      <div style={{ color: coral, fontSize: 60, fontWeight: 950 }}>→</div>
      <FlowNode
        number="02"
        title="A4 學習單"
        subtitle="整理、書寫，留下看得見的學習證據"
        color={blue}
      />
      <div style={{ color: coral, fontSize: 60, fontWeight: 950 }}>→</div>
      <FlowNode
        number="03"
        title="線上評量"
        subtitle="檢核、補救，看見真正還不懂的地方"
        color={coral}
      />
    </div>
    <div
      style={{
        alignSelf: 'center',
        marginTop: 46,
        padding: '16px 32px',
        background: amber,
        color: ink,
        fontSize: 30,
        fontWeight: 950,
        transform: 'rotate(-0.5deg)',
      }}
    >
      網頁不是取代紙本，而是接力。
    </div>
  </PageShell>
);

const Slide19InteractiveTools: Page = () => (
  <PageShell eyebrow="16 · 在操作中練習與檢核" accent={blue}>
    <Title size={60} margin="0 0 34px">
      互動式工具，替不同學習任務補上即時回饋
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '450px 410px 1fr',
        padding: '14px 38px',
        color: paperLight,
        background: greenDark,
        fontSize: 21,
        fontWeight: 900,
        letterSpacing: '0.12em',
      }}
    >
      <span>教學目的</span>
      <span>推薦工具</span>
      <span>跨科示例</span>
    </div>
    <div style={{ boxShadow: shadow }}>
      <ActivityRow
        purpose="數學概念視覺化、分步驟練習"
        tool="互動式數學"
        href="https://spedmix.pages.dev/interativemath"
        example="讓每一步都能點、能看、能再試一次"
        color={green}
      />
      <ActivityRow
        purpose="評量逐題呈現、降低一次看見太多題的負荷"
        tool="線上段考模板"
        href="https://spedmix.pages.dev/examtest"
        example="逐題作答、立即知道還要補哪裡"
        color={blue}
      />
      <ActivityRow
        purpose="想得到，但句子組織與書寫輸出困難"
        tool="重組句子"
        href="https://spedmix.pages.dev/unscramble"
        example="自然步驟、社會因果、健教建議都能用"
        color={coral}
      />
    </div>
  </PageShell>
);

const Slide20ActionSection: Page = () => (
  <PageShell eyebrow="PART 3 · START SMALL" dark accent={amber}>
    <div
      style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', alignItems: 'center', gap: 80 }}
    >
      <div>
        <div style={{ color: amber, fontSize: 29, fontWeight: 900, letterSpacing: '0.16em' }}>
          現有工具推薦與開始行動
        </div>
        <h2
          style={{
            margin: '28px 0 34px',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 122,
            fontWeight: 950,
            lineHeight: 1.02,
            letterSpacing: '-0.05em',
          }}
        >
          不必全學會
          <br />
          先選一個卡點
        </h2>
        <p style={{ margin: 0, color: 'rgba(255, 253, 248, 0.68)', fontSize: 34, lineHeight: 1.5 }}>
          從學生最常卡住的地方，選擇第一個工具。
        </p>
      </div>
      <div style={{ position: 'relative', height: 620 }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 38,
            right: 70,
            width: 470,
            height: 470,
            borderRadius: '50%',
            border: `22px solid ${amber}`,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 414,
            right: 4,
            width: 210,
            height: 26,
            background: amber,
            transform: 'rotate(42deg)',
            transformOrigin: 'left center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 154,
            right: 152,
            width: 310,
            textAlign: 'center',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 46,
            fontWeight: 950,
            lineHeight: 1.5,
          }}
        >
          看不懂？
          <br />
          題太多？
          <br />
          寫不出？
        </div>
      </div>
    </div>
  </PageShell>
);

const Slide21ToolMapPart1: Page = () => (
  <PageShell eyebrow="17 · 工具選擇地圖（一）· 閱讀與測驗" accent={green}>
    <Title size={58} margin="0 0 30px">
      如果學生常常這樣卡住：閱讀與測驗題卡點
    </Title>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <div
        style={{
          padding: '30px 38px',
          background: paperLight,
          borderLeft: `12px solid ${green}`,
          boxShadow: shadow,
          display: 'grid',
          gridTemplateColumns: '64px 440px 1fr auto',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: green,
            color: paperLight,
            fontSize: 22,
            fontWeight: 900,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          01
        </div>
        <div>
          <div style={{ fontSize: 32, fontWeight: 900, color: ink, lineHeight: 1.25 }}>看不懂長篇教材</div>
          <div style={{ marginTop: 8, color: muted, fontSize: 24, fontWeight: 650 }}>易讀文本、關鍵詞註解、圖解與重點摘要</div>
        </div>
        <div style={{ color: green, fontSize: 36, fontWeight: 900, justifySelf: 'center' }}>→</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <ToolButton href="https://spedmix.pages.dev/simple" label="課文簡化" color={green} />
          <ToolButton href="https://spedmix.pages.dev/differentiated" label="差異化教材" color={greenDark} />
        </div>
      </div>

      <div
        style={{
          padding: '30px 38px',
          background: paperLight,
          borderLeft: `12px solid ${blue}`,
          boxShadow: shadow,
          display: 'grid',
          gridTemplateColumns: '64px 440px 1fr auto',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: blue,
            color: paperLight,
            fontSize: 22,
            fontWeight: 900,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          02
        </div>
        <div>
          <div style={{ fontSize: 32, fontWeight: 900, color: ink, lineHeight: 1.25 }}>題目一多就放棄</div>
          <div style={{ marginTop: 8, color: muted, fontSize: 24, fontWeight: 650 }}>調整難度與提示，或改為線上逐題作答</div>
        </div>
        <div style={{ color: blue, fontSize: 36, fontWeight: 900, justifySelf: 'center' }}>→</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <ToolButton href="https://spedmix.pages.dev/question" label="個別化出題" color={blue} />
          <ToolButton href="https://spedmix.pages.dev/examtest" label="線上段考模板" color={coral} />
        </div>
      </div>
    </div>
    <div
      style={{
        alignSelf: 'flex-end',
        marginTop: 28,
        padding: '12px 24px',
        color: ink,
        background: amber,
        fontSize: 25,
        fontWeight: 900,
      }}
    >
      💡 點擊按鈕即可直接進入 AI 備課幫手線上工具頁面 ↗
    </div>
  </PageShell>
);

const Slide21ToolMapPart2: Page = () => (
  <PageShell eyebrow="18 · 工具選擇地圖（二）· 數學與表達" accent={coral}>
    <Title size={58} margin="0 0 28px">
      如果學生常常這樣卡住：數學與句型輸出卡點
    </Title>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div
        style={{
          padding: '28px 38px',
          background: paperLight,
          borderLeft: `12px solid ${coral}`,
          boxShadow: shadow,
          display: 'grid',
          gridTemplateColumns: '64px 440px 1fr auto',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: coral,
            color: paperLight,
            fontSize: 22,
            fontWeight: 900,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          03
        </div>
        <div>
          <div style={{ fontSize: 31, fontWeight: 900, color: ink, lineHeight: 1.25 }}>數學概念不穩、練習不夠</div>
          <div style={{ marginTop: 6, color: muted, fontSize: 23, fontWeight: 650 }}>一題多變反覆熟練，或將步驟動態視覺化</div>
        </div>
        <div style={{ color: coral, fontSize: 36, fontWeight: 900, justifySelf: 'center' }}>→</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <ToolButton href="https://spedmix.pages.dev/mathquestion" label="數題數題" color="#9d6518" />
          <ToolButton href="https://spedmix.pages.dev/interativemath" label="互動式數學" color={green} />
        </div>
      </div>

      <div
        style={{
          padding: '28px 38px',
          background: paperLight,
          borderLeft: `12px solid #9d6518`,
          boxShadow: shadow,
          display: 'grid',
          gridTemplateColumns: '64px 440px 1fr auto',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: '#9d6518',
            color: paperLight,
            fontSize: 22,
            fontWeight: 900,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          04
        </div>
        <div>
          <div style={{ fontSize: 31, fontWeight: 900, color: ink, lineHeight: 1.25 }}>想得到，但寫不出來</div>
          <div style={{ marginTop: 6, color: muted, fontSize: 23, fontWeight: 650 }}>句子結構重組，降低書寫負擔</div>
        </div>
        <div style={{ color: '#9d6518', fontSize: 36, fontWeight: 900, justifySelf: 'center' }}>→</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <ToolButton href="https://spedmix.pages.dev/unscramble" label="重組句子" color={coral} />
        </div>
      </div>

      <div
        style={{
          padding: '28px 38px',
          background: paperLight,
          borderLeft: `12px solid ${greenDark}`,
          boxShadow: shadow,
          display: 'grid',
          gridTemplateColumns: '64px 440px 1fr auto',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: greenDark,
            color: paperLight,
            fontSize: 22,
            fontWeight: 900,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          05
        </div>
        <div>
          <div style={{ fontSize: 31, fontWeight: 900, color: ink, lineHeight: 1.25 }}>無法依課堂速度完成</div>
          <div style={{ marginTop: 6, color: muted, fontSize: 23, fontWeight: 650 }}>提供自主速度探索頁面，配合老師個別引導</div>
        </div>
        <div style={{ color: greenDark, fontSize: 36, fontWeight: 900, justifySelf: 'center' }}>→</div>
        <div>
          <ToolButton label="互動式網頁 ＋ 基礎版" color={greenDark} />
        </div>
      </div>
    </div>
    <div
      style={{
        alignSelf: 'flex-end',
        marginTop: 22,
        padding: '10px 22px',
        color: ink,
        background: amber,
        fontSize: 24,
        fontWeight: 900,
      }}
    >
      先解決一個最常發生的困難，就已經是好的開始。
    </div>
  </PageShell>
);

const Slide21ToolHub: Page = () => (
  <PageShell eyebrow="19 · 米克師 AI 備課幫手 7 大工具" accent={amber}>
    <Title size={56} margin="0 0 28px">
      米克師 AI 備課幫手 · 工具直連地圖
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 22,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          padding: '24px 26px',
          background: paperLight,
          borderTop: `8px solid ${green}`,
          boxShadow: shadow,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 210,
        }}
      >
        <div>
          <span style={{ fontSize: 18, fontWeight: 900, color: green, letterSpacing: '0.12em' }}>
            01 · 閱讀支持
          </span>
          <h4 style={{ margin: '8px 0 8px', fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 950 }}>
            課文簡化
          </h4>
          <p style={{ margin: 0, color: muted, fontSize: 22, lineHeight: 1.4, fontWeight: 650 }}>
            產生易讀文本、圖解與關鍵詞註解
          </p>
        </div>
        <div style={{ marginTop: 16 }}>
          <ToolButton href="https://spedmix.pages.dev/simple" label="開啟工具" color={green} size="small" />
        </div>
      </div>

      <div
        style={{
          padding: '24px 26px',
          background: paperLight,
          borderTop: `8px solid ${blue}`,
          boxShadow: shadow,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 210,
        }}
      >
        <div>
          <span style={{ fontSize: 18, fontWeight: 900, color: blue, letterSpacing: '0.12em' }}>
            02 · 差異化設計
          </span>
          <h4 style={{ margin: '8px 0 8px', fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 950 }}>
            差異化教材
          </h4>
          <p style={{ margin: 0, color: muted, fontSize: 22, lineHeight: 1.4, fontWeight: 650 }}>
            基礎 / 一般 / 挑戰 三層次學習單
          </p>
        </div>
        <div style={{ marginTop: 16 }}>
          <ToolButton href="https://spedmix.pages.dev/differentiated" label="開啟工具" color={blue} size="small" />
        </div>
      </div>

      <div
        style={{
          padding: '24px 26px',
          background: paperLight,
          borderTop: `8px solid ${coral}`,
          boxShadow: shadow,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 210,
        }}
      >
        <div>
          <span style={{ fontSize: 18, fontWeight: 900, color: coral, letterSpacing: '0.12em' }}>
            03 · 評量調整
          </span>
          <h4 style={{ margin: '8px 0 8px', fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 950 }}>
            個別化出題
          </h4>
          <p style={{ margin: 0, color: muted, fontSize: 22, lineHeight: 1.4, fontWeight: 650 }}>
            依能力調整題型、難度與作答提示
          </p>
        </div>
        <div style={{ marginTop: 16 }}>
          <ToolButton href="https://spedmix.pages.dev/question" label="開啟工具" color={coral} size="small" />
        </div>
      </div>

      <div
        style={{
          padding: '24px 26px',
          background: paperLight,
          borderTop: `8px solid #9d6518`,
          boxShadow: shadow,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 210,
        }}
      >
        <div>
          <span style={{ fontSize: 18, fontWeight: 900, color: '#9d6518', letterSpacing: '0.12em' }}>
            04 · 線上評量
          </span>
          <h4 style={{ margin: '8px 0 8px', fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 950 }}>
            線上段考模板
          </h4>
          <p style={{ margin: 0, color: muted, fontSize: 22, lineHeight: 1.4, fontWeight: 650 }}>
            逐題呈現與自動化分數檢核
          </p>
        </div>
        <div style={{ marginTop: 16 }}>
          <ToolButton href="https://spedmix.pages.dev/examtest" label="開啟工具" color="#9d6518" size="small" />
        </div>
      </div>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 22,
      }}
    >
      <div
        style={{
          padding: '24px 26px',
          background: paperLight,
          borderTop: `8px solid ${green}`,
          boxShadow: shadow,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 200,
        }}
      >
        <div>
          <span style={{ fontSize: 18, fontWeight: 900, color: green, letterSpacing: '0.12em' }}>
            05 · 數學練習
          </span>
          <h4 style={{ margin: '8px 0 8px', fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 950 }}>
            數題數題
          </h4>
          <p style={{ margin: 0, color: muted, fontSize: 22, lineHeight: 1.4, fontWeight: 650 }}>
            一題多變同型題，反覆熟練概念
          </p>
        </div>
        <div style={{ marginTop: 16 }}>
          <ToolButton href="https://spedmix.pages.dev/mathquestion" label="開啟工具" color={green} size="small" />
        </div>
      </div>

      <div
        style={{
          padding: '24px 26px',
          background: paperLight,
          borderTop: `8px solid ${blue}`,
          boxShadow: shadow,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 200,
        }}
      >
        <div>
          <span style={{ fontSize: 18, fontWeight: 900, color: blue, letterSpacing: '0.12em' }}>
            06 · 概念視覺化
          </span>
          <h4 style={{ margin: '8px 0 8px', fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 950 }}>
            互動式數學
          </h4>
          <p style={{ margin: 0, color: muted, fontSize: 22, lineHeight: 1.4, fontWeight: 650 }}>
            分步驟動態操作與可視覺化練習
          </p>
        </div>
        <div style={{ marginTop: 16 }}>
          <ToolButton href="https://spedmix.pages.dev/interativemath" label="開啟工具" color={blue} size="small" />
        </div>
      </div>

      <div
        style={{
          padding: '24px 26px',
          background: paperLight,
          borderTop: `8px solid ${coral}`,
          boxShadow: shadow,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 200,
        }}
      >
        <div>
          <span style={{ fontSize: 18, fontWeight: 900, color: coral, letterSpacing: '0.12em' }}>
            07 · 句型輸出
          </span>
          <h4 style={{ margin: '8px 0 8px', fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 950 }}>
            重組句子
          </h4>
          <p style={{ margin: 0, color: muted, fontSize: 22, lineHeight: 1.4, fontWeight: 650 }}>
            降低書寫負擔，結構化組句表達
          </p>
        </div>
        <div style={{ marginTop: 16 }}>
          <ToolButton href="https://spedmix.pages.dev/unscramble" label="開啟工具" color={coral} size="small" />
        </div>
      </div>
    </div>
  </PageShell>
);

const Slide22TwentyMinutes: Page = () => (
  <PageShell eyebrow="20 · 把備課時間換回學生時間" accent={coral}>
    <Title size={60} margin="0 0 30px">
      多備 20 分鐘，換回更多支持學生的時間
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 420px 1fr',
        alignItems: 'center',
        gap: 34,
      }}
    >
      <div style={{ paddingRight: 34, borderRight: `1px solid ${hairline}` }}>
        <div style={{ color: coral, fontSize: 25, fontWeight: 950, letterSpacing: '0.14em' }}>
          LESS · 少一點
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 34 }}>
          <Bullet color={coral}>重複講解同一段</Bullet>
          <Bullet color={coral}>等待全班完全同步</Bullet>
          <Bullet color={coral}>因挫折出現的逃避</Bullet>
        </div>
      </div>
      <div
        style={{
          width: 360,
          height: 360,
          display: 'grid',
          placeItems: 'center',
          justifySelf: 'center',
          borderRadius: '50%',
          color: paperLight,
          background: greenDark,
          boxShadow: shadow,
          transform: 'rotate(-2deg)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              color: amber,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 132,
              fontWeight: 950,
              lineHeight: 0.9,
            }}
          >
            20
          </div>
          <div style={{ marginTop: 20, fontSize: 31, fontWeight: 900 }}>分鐘</div>
        </div>
      </div>
      <div style={{ paddingLeft: 34, borderLeft: `1px solid ${hairline}` }}>
        <div style={{ color: green, fontSize: 25, fontWeight: 950, letterSpacing: '0.14em' }}>
          MORE · 多一點
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 34 }}>
          <Bullet color={green}>走到學生身邊的觀察</Bullet>
          <Bullet color={green}>針對真正卡點的協助</Bullet>
          <Bullet color={green}>學生依速度完成任務</Bullet>
        </div>
      </div>
    </div>
    <div
      style={{
        alignSelf: 'center',
        maxWidth: 1280,
        marginTop: 56,
        color: muted,
        fontSize: 28,
        fontWeight: 750,
        lineHeight: 1.45,
        textAlign: 'center',
      }}
    >
      不是所有行為問題都來自教材；但當學生有能力進入學習，教師就更容易看見他真正不懂的地方。
    </div>
  </PageShell>
);

const Slide23StartNextWeek: Page = () => (
  <PageShell eyebrow="21 · 從下週的一個單元開始" accent={amber}>
    <Title size={64} margin="0 0 38px">
      今天不用做完整系統，只要選一件最容易開始的事
    </Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      <ActionCard
        number="01"
        title="做一份易讀或分層紙本"
        detail="挑一段學生最常卡住的教材，先做基礎版。"
        color={green}
        rotate={-0.35}
      />
      <ActionCard
        number="02"
        title="把一個單元做成互動網頁"
        detail="先用一句話生成，再補內容與活動。"
        color={blue}
        rotate={0.35}
      />
      <ActionCard
        number="03"
        title="增加基礎版或挑戰版"
        detail="讓不同速度的學生都能從核心目標出發。"
        color={coral}
        rotate={0.25}
      />
      <ActionCard
        number="04"
        title="把網頁轉成 A4 學習單"
        detail="留下書寫、整理與可檢視的學習證據。"
        color="#9d6518"
        rotate={-0.25}
      />
    </div>
  </PageShell>
);

const SlidePractice10Min: Page = () => (
  <PageShell eyebrow="17 · 課堂實作 10 分鐘" accent={amber}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 54,
        alignItems: 'center',
      }}
    >
      <div>
        <div style={{ color: coral, fontSize: 26, fontWeight: 950, letterSpacing: '0.16em' }}>
          HANDS-ON WORKSHOP
        </div>
        <h2
          style={{
            margin: '20px 0 32px',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 84,
            fontWeight: 950,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
          }}
        >
          實作時間 <span style={{ color: coral }}>10 分鐘</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              padding: '24px 30px',
              background: paperLight,
              borderLeft: `10px solid ${green}`,
              boxShadow: shadow,
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1.45,
            }}
          >
            1. 挑選手邊一份單元內容（課文、講義或題目）
          </div>
          <div
            style={{
              padding: '24px 30px',
              background: paperLight,
              borderLeft: `10px solid ${blue}`,
              boxShadow: shadow,
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1.45,
            }}
          >2. 使用 AI 生成互動網頁</div>
          <div
            style={{
              padding: '24px 30px',
              background: paperLight,
              borderLeft: `10px solid ${coral}`,
              boxShadow: shadow,
              fontSize: 28,
              fontWeight: 800,
              lineHeight: 1.45,
            }}
          >
            3. 將完成的成果（截圖或網頁連結）上傳至 Padlet
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 30,
          padding: '48px 42px',
          background: greenDark,
          color: paperLight,
          boxShadow: shadow,
          transform: 'rotate(0.8deg)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: '50%',
            background: amber,
            color: ink,
            fontSize: 60,
            fontWeight: 950,
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
          }}
        >
          ⏱️
        </div>
        <div>
          <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 42, fontWeight: 950 }}>
            實作成果上傳與分享
          </div>
          <div style={{ marginTop: 12, color: 'rgba(255, 253, 248, 0.78)', fontSize: 25, lineHeight: 1.4 }}>
            請點擊下方按鈕將成果上傳到 Padlet 研習板
          </div>
        </div>
        <ToolButton
          href="https://padlet.com/pppchin7_1/1150828-j3bvi3ulp7iy2rwk"
          label="點此開啟 Padlet 上傳成果 ↗"
          color={coral}
          size="large"
        />
      </div>
    </div>
  </PageShell>
);

const Slide24Closing: Page = () => (
  <PageShell eyebrow="23 · 同一目標，更多入口" accent={coral}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        gap: 74,
        alignItems: 'center',
      }}
    >
      <div>
        <div style={{ color: coral, fontSize: 25, fontWeight: 950, letterSpacing: '0.16em' }}>
          TAKEAWAY
        </div>
        <h2
          style={{
            margin: '28px 0 40px',
            fontFamily: 'var(--osd-font-display)',
            fontSize: 70,
            fontWeight: 950,
            lineHeight: 1.34,
            letterSpacing: '-0.035em',
          }}
        >
          多備的 20 分鐘，
          <br />
          不只是多做一份教材；
          <br />
          <span style={{ color: green }}>它讓學生能自己走進學習。</span>
        </h2>
        <div
          style={{
            padding: '26px 32px',
            borderLeft: `8px solid ${amber}`,
            background: paperLight,
            boxShadow: '0 14px 38px rgba(35, 57, 47, 0.09)',
            fontSize: 33,
            fontWeight: 800,
            lineHeight: 1.5,
          }}
        >
          教師也終於有時間，
          <br />
          走到學生身邊。
        </div>
        <div style={{ marginTop: 34, color: muted, fontSize: 30, fontWeight: 850 }}>
          Q&A・一起從下一份教材開始
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          padding: '44px 42px',
          background: paperLight,
          boxShadow: shadow,
          transform: 'rotate(0.5deg)',
          textAlign: 'center',
        }}
      >
        <ImagePlaceholder hint="米克師 AI 備課幫手 QR Code (https://spedmix.pages.dev/)" width={300} height={300} />
        <div>
          <div style={{ color: greenDark, fontSize: 34, fontWeight: 950, marginBottom: 14 }}>
            米克師 AI 備課幫手
          </div>
          <ToolButton href="https://spedmix.pages.dev/" label="開啟 AI 備課幫手 ↗" color={green} size="large" />
        </div>
        <div
          style={{
            width: '100%',
            marginTop: 10,
            padding: '16px 20px',
            color: paperLight,
            background: greenDark,
            fontSize: 24,
            fontWeight: 900,
            lineHeight: 1.4,
            textAlign: 'center',
          }}
        >
          AI 的價值，不是做出多厲害的網頁，
          <br />
          而是讓更多學生真正參與普通班的學習。
        </div>
      </div>
    </div>
  </PageShell>
);

export const meta: SlideMeta = {
  title: '透過 AI 談普特融合｜研習簡報',
  createdAt: '2026-07-15T14:57:41.200Z',
};

export default [
  Slide01Cover,
  Slide01Agenda,
  Slide02NotAttitude,
  Slide03SameGoal,
  Slide04TeacherAndAi,
  Slide05TwoPaths,
  Slide06PaperSection,
  Slide07DescribeDifficulty,
  Slide08FirstPrompt,
  Slide09ThreeLevels,
  Slide10A4Worksheet,
  Slide11PaperTools,
  Slide12PaperScaffold,
  SlidePracticePaper10Min,
  Slide13WebSection,
  Slide14WhenToUseWeb,
  Slide15OneSentenceWeb,
  Slide16SocialStudiesCase,
  Slide17DifferentiateWeb,
  Slide18LearningFlow,
  Slide19InteractiveTools,
  SlidePractice10Min,
  Slide20ActionSection,
  Slide21ToolMapPart1,
  Slide21ToolMapPart2,
  Slide21ToolHub,
  Slide22TwentyMinutes,
  Slide23StartNextWeek,
  Slide24Closing,
] satisfies Page[];
