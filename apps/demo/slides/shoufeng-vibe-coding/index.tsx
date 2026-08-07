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
import githubStep1 from './assets/github-step1.png';
import githubStep2 from './assets/github-step2.png';
import githubStep3 from './assets/github-step3.png';
import githubStep4 from './assets/github-step4.png';
import githubStep5 from './assets/github-step5.png';
import githubStep6 from './assets/github-step6.png';
import githubStep7 from './assets/github-step7.png';
import githubStep8 from './assets/github-step8.png';
import githubStep9 from './assets/github-step9.png';
import githubStep10 from './assets/github-step10.png';
import githubStep11 from './assets/github-step11.png';
import githubStep12 from './assets/github-step12.png';
import githubStep13 from './assets/github-step13.png';
import githubStep16 from './assets/github-step16.png';
import githubStep23 from './assets/github-step23.png';
import githubStep24 from './assets/github-step24.png';
import githubStep25 from './assets/github-step25.png';
import githubStep26 from './assets/github-step26.png';
import githubStep27 from './assets/github-step27.png';
import githubStep31 from './assets/github-step31.png';
import githubStep39 from './assets/github-step39.png';
import githubStep40 from './assets/github-step40.png';
import githubStep41 from './assets/github-step41.png';
import githubStep42 from './assets/github-step42.png';
import githubStep43 from './assets/github-step43.png';
import githubStep44 from './assets/github-step44.png';
import githubStep45 from './assets/github-step45.png';
import githubStep46 from './assets/github-step46.png';
import indexHtmlFile from './assets/index-html-file.png';

export const design: DesignSystem = {
  palette: { bg: '#edf4f1', text: '#27343b', accent: '#ee9a83' },
  fonts: {
    display: '"Noto Serif TC", "Songti TC", "PMingLiU", serif',
    body: '"Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
  },
  typeScale: { hero: 156, body: 42 },
  radius: 18,
};

const panel = '#fffdf7';
const panelSoft = '#e4f0eb';
const cyan = '#78aeb2';
const mint = '#a9cfbd';
const yellow = '#f1d47b';
const coral = '#ee9a83';
const muted = '#68797e';
const white = '#27343b';
const mono = '"Cascadia Code", "SFMono-Regular", Consolas, monospace';
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

const sectionTransition: SlideTransition = {
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
      { opacity: 0, transform: 'translateY(10px)', filter: 'blur(3px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
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
  accent = mint,
  mood = 'base',
}: {
  children: ReactNode;
  eyebrow: string;
  accent?: string;
  mood?: 'base' | 'blue' | 'green' | 'warm';
}) => {
  const { current, total } = useSlidePageNumber();
  const moodBackground =
    mood === 'green'
      ? 'radial-gradient(circle at 82% 18%, rgba(169, 207, 189, 0.66), transparent 28%), linear-gradient(135deg, #edf4f1 0%, #dcece6 74%)'
      : mood === 'blue'
        ? 'radial-gradient(circle at 84% 16%, rgba(120, 174, 178, 0.32), transparent 27%), linear-gradient(135deg, #f7f5ec 0%, #e6f0ef 72%)'
        : mood === 'warm'
          ? 'radial-gradient(circle at 84% 16%, rgba(241, 212, 123, 0.45), transparent 25%), linear-gradient(135deg, #fff8e7 0%, #f6efd9 72%)'
          : 'radial-gradient(circle at 88% 12%, rgba(169, 207, 189, 0.28), transparent 24%), radial-gradient(circle at 10% 90%, rgba(238, 154, 131, 0.18), transparent 28%), var(--osd-bg)';
  return (
    <div
      style={{
        ...fill,
        position: 'relative',
        display: 'grid',
        gridTemplateRows: '46px 1fr 38px',
        padding: '58px 116px 44px',
        color: 'var(--osd-text)',
        background: moodBackground,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '0',
          opacity: 0.34,
          backgroundImage:
            'linear-gradient(rgba(120, 174, 178, 0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(120, 174, 178, 0.20) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.52), transparent 78%)',
        }}
      />
      <header
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: mono,
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          color: accent,
        }}
      >
        <span>{eyebrow}</span>
        <span style={{ color: muted, letterSpacing: '0.06em' }}>SHOUFENG · VIBE CODING</span>
      </header>
      <main
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          minHeight: 0,
          flexDirection: 'column',
          justifyContent: 'center',
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
          borderTop: '1px solid rgba(39, 52, 59, 0.18)',
          paddingTop: 13,
          color: muted,
          fontFamily: mono,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '0.08em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <span>AI 協作開發 · 個人網頁實作</span>
        <span>
          {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </footer>
    </div>
  );
};

const Title = ({
  children,
  size = 80,
  margin = '0 0 46px',
  maxWidth = 1660,
}: {
  children: ReactNode;
  size?: number;
  margin?: string;
  maxWidth?: number;
}) => (
  <h2
    style={{
      maxWidth,
      margin,
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

const MonoTag = ({ children, color = mint }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      width: 'fit-content',
      minHeight: 48,
      padding: '0 18px',
      border: '1px solid rgba(39, 52, 59, 0.22)',
      borderRadius: 999,
      color,
      background: 'rgba(255, 253, 247, 0.88)',
      fontFamily: mono,
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: '0.06em',
    }}
  >
    {children}
  </span>
);

const WindowFrame = ({
  children,
  title,
  accent = mint,
  height = 500,
}: {
  children: ReactNode;
  title: string;
  accent?: string;
  height?: number;
}) => (
  <div
    style={{
      height,
      border: '1px solid rgba(39, 52, 59, 0.20)',
      borderRadius: 26,
      background: panel,
      boxShadow: '0 22px 44px rgba(55, 76, 73, 0.16)',
    }}
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr 100px',
        alignItems: 'center',
        minHeight: 62,
        padding: '0 22px',
        borderBottom: '1px solid rgba(39, 52, 59, 0.16)',
      }}
    >
      <div style={{ display: 'flex', gap: 10 }}>
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: coral }} />
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: yellow }} />
        <span style={{ width: 14, height: 14, borderRadius: '50%', background: mint }} />
      </div>
      <div
        style={{
          color: muted,
          fontFamily: mono,
          fontSize: 22,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        {title}
      </div>
      <div
        style={{
          justifySelf: 'end',
          width: 50,
          height: 6,
          borderRadius: 999,
          background: accent,
          opacity: 0.9,
        }}
      />
    </div>
    <div style={{ height: height - 63, padding: 28, boxSizing: 'border-box' }}>{children}</div>
  </div>
);

const BigCard = ({
  title,
  children,
  accent = mint,
  icon,
  compact = false,
}: {
  title: string;
  children?: ReactNode;
  accent?: string;
  icon: string;
  compact?: boolean;
}) => (
  <div
    style={{
      minHeight: compact ? 180 : 242,
      padding: compact ? '26px 28px' : '34px 38px',
      border: '1px solid rgba(39, 52, 59, 0.20)',
      borderTop: `7px solid ${accent}`,
      borderRadius: 24,
      background: panel,
      boxShadow: '0 16px 34px rgba(55, 76, 73, 0.12)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
      <span
        style={{
          display: 'grid',
          width: compact ? 50 : 58,
          height: compact ? 50 : 58,
          placeItems: 'center',
          borderRadius: 16,
          color: '#27343b',
          background: accent,
          fontFamily: mono,
          fontSize: compact ? 22 : 26,
          fontWeight: 900,
        }}
      >
        {icon}
      </span>
      <h3
        style={{
          margin: 0,
          fontSize: compact ? 32 : 38,
          fontWeight: 900,
          lineHeight: 1.18,
        }}
      >
        {title}
      </h3>
    </div>
    <div style={{ color: muted, fontSize: compact ? 27 : 31, lineHeight: 1.5 }}>{children}</div>
  </div>
);

const RouteNode = ({
  index,
  label,
  color = mint,
  wide = false,
}: {
  index: string;
  label: string;
  color?: string;
  wide?: boolean;
}) => (
  <div
    style={{
      display: 'grid',
      minWidth: wide ? 250 : 170,
      minHeight: 138,
      padding: '22px 24px',
      placeItems: 'center',
      border: '1px solid rgba(39, 52, 59, 0.20)',
      borderRadius: 24,
      background: panel,
      textAlign: 'center',
    }}
  >
    <span style={{ color, fontFamily: mono, fontSize: 19, fontWeight: 900 }}>{index}</span>
    <span style={{ fontSize: wide ? 34 : 30, fontWeight: 900, lineHeight: 1.18 }}>{label}</span>
  </div>
);

const Arrow = ({ color = muted }: { color?: string }) => (
  <span style={{ color, fontFamily: mono, fontSize: 44, fontWeight: 900 }}>→</span>
);

const StatusChip = ({ children, color = mint }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      minHeight: 50,
      padding: '0 20px',
      border: '1px solid rgba(39, 52, 59, 0.18)',
      borderRadius: 999,
      color,
      background: panel,
      fontSize: 25,
      fontWeight: 800,
    }}
  >
    {children}
  </span>
);

const PromptPanel = ({
  children,
  label = 'PROMPT',
  color = mint,
}: {
  children: ReactNode;
  label?: string;
  color?: string;
}) => (
  <div
    style={{
      padding: '26px 30px',
      border: '1px solid rgba(39, 52, 59, 0.20)',
      borderLeft: `7px solid ${color}`,
      borderRadius: 18,
      color: white,
      background: '#f8f3e7',
      fontFamily: mono,
      fontSize: 34,
      lineHeight: 1.55,
      whiteSpace: 'pre-line',
    }}
  >
    <div
      style={{
        marginBottom: 14,
        color,
        fontSize: 22,
        fontWeight: 900,
        letterSpacing: '0.12em',
      }}
    >
      {label}
    </div>
    {children}
  </div>
);

const FauxSite = ({ compact = false }: { compact?: boolean }) => (
  <div
    style={{
      height: '100%',
      borderRadius: compact ? 16 : 22,
      color: '#173228',
      background: '#f3f1e8',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: compact ? 46 : 58,
        padding: compact ? '0 16px' : '0 24px',
        borderBottom: '1px solid rgba(23, 50, 40, 0.18)',
        fontSize: compact ? 16 : 20,
        fontWeight: 900,
      }}
    >
      <span>林老師的教學小站</span>
      <span style={{ color: '#2f6d59' }}>關於我　課程　作品</span>
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        alignItems: 'center',
        gap: compact ? 12 : 22,
        padding: compact ? '18px 18px 12px' : '30px 32px 22px',
      }}
    >
      <div>
        <div
          style={{
            width: compact ? 56 : 74,
            height: 7,
            marginBottom: compact ? 12 : 18,
            borderRadius: 999,
            background: '#e6a756',
          }}
        />
        <div
          style={{
            fontFamily: 'var(--osd-font-body)',
            fontSize: compact ? 27 : 40,
            fontWeight: 900,
            lineHeight: 1.15,
          }}
        >
          把好奇心，
          <br />
          做成看得見的作品。
        </div>
        <div
          style={{ marginTop: compact ? 10 : 18, color: '#61756e', fontSize: compact ? 15 : 20 }}
        >
          教學設計 · 數位學習 · 校園共創
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          minHeight: compact ? 112 : 164,
          placeItems: 'center',
          borderRadius: compact ? 16 : 22,
          color: '#f3f1e8',
          background: 'linear-gradient(145deg, #2f6d59, #16382f)',
          fontSize: compact ? 34 : 48,
          fontWeight: 900,
        }}
      >
        SH
      </div>
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: compact ? 8 : 12,
        padding: compact ? '0 18px 16px' : '0 32px 26px',
      }}
    >
      <div style={{ height: compact ? 44 : 60, borderRadius: 10, background: '#d9e7df' }} />
      <div style={{ height: compact ? 44 : 60, borderRadius: 10, background: '#ecd9bd' }} />
      <div style={{ height: compact ? 44 : 60, borderRadius: 10, background: '#d8e1e8' }} />
    </div>
  </div>
);

const Slide01Cover: Page = () => (
  <PageShell eyebrow="壽豐國中研習 · 3 HOURS" accent={coral} mood="warm">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        alignItems: 'center',
        gap: 76,
      }}
    >
      <div>
        <MonoTag color={coral}>AI 協作開發</MonoTag>
        <h1
          style={{
            margin: '34px 0 26px',
            fontFamily: 'var(--osd-font-display)',
            fontSize: '115px',
            fontWeight: 950,
            lineHeight: '1.3',
            letterSpacing: '-0.055em',
          }}
        >
          AI 協作開發：
          <br />用 Vibe Coding
          <br />
          自製個人網頁
        </h1>
        <p style={{ margin: 0, color: muted, fontSize: 42, fontWeight: 700, lineHeight: 1.45 }}>
          不寫程式，用說的做網站！
        </p>
      </div>
      <WindowFrame title="idea → website" accent={mint} height={560}>
        <div style={{ display: 'grid', height: '100%', gridTemplateRows: '1fr auto', gap: 22 }}>
          <PromptPanel label="YOU">
            幫我做一個繁體中文的
            {'\n'}教師個人網頁。
          </PromptPanel>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '22px 26px',
              borderRadius: 18,
              color: '#071723',
              background: mint,
              fontFamily: mono,
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            <span>https://you.github.io/</span>
            <span>↗</span>
          </div>
        </div>
      </WindowFrame>
    </div>
  </PageShell>
);
Slide01Cover.transition = sectionTransition;

const AgendaCard = ({ step, title, color }: { step: string; title: string; color: string }) => (
  <div
    style={{
      minHeight: 270,
      padding: '34px 36px',
      border: '1px solid rgba(39, 52, 59, 0.18)',
      borderTop: `14px solid ${color}`,
      background: panel,
      boxShadow: '0 12px 24px rgba(55, 76, 73, 0.08)',
    }}
  >
    <div
      style={{ color, fontFamily: mono, fontSize: 30, fontWeight: 900, letterSpacing: '0.08em' }}
    >
      STEP {step}
    </div>
    <div style={{ marginTop: 48, fontSize: 46, fontWeight: 950, lineHeight: 1.3 }}>{title}</div>
  </div>
);

const Slide02WorkshopAgenda: Page = () => (
  <PageShell eyebrow="WORKSHOP MAP · 180 MINUTES" accent={coral} mood="warm">
    <Title size={76} margin="0 0 18px">
      今天先完成三件事
    </Title>
    <div style={{ marginBottom: 36, color: muted, fontSize: 34, fontWeight: 750 }}>
      註冊 → 生成 → 上傳
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
      <AgendaCard step="01" title="註冊 GitHub 帳號" color={cyan} />
      <AgendaCard step="02" title="用 Gemini 生成網頁" color={mint} />
      <AgendaCard step="03" title="上傳網頁到 GitHub" color={yellow} />
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        alignItems: 'center',
        minHeight: 150,
        marginTop: 22,
        border: '1px dashed rgba(39, 52, 59, 0.28)',
        borderLeft: `14px solid ${coral}`,
        background: 'rgba(255, 255, 255, 0.48)',
      }}
    >
      <div
        style={{
          padding: '0 34px',
          color: coral,
          fontFamily: mono,
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: '0.08em',
        }}
      >
        有時間再補充
      </div>
      <div
        style={{
          padding: '26px 38px',
          borderLeft: '1px solid rgba(39, 52, 59, 0.12)',
          fontSize: 42,
          fontWeight: 950,
        }}
      >
        用 Antigravity 管理與更新
      </div>
    </div>
  </PageShell>
);
Slide02WorkshopAgenda.transition = sectionTransition;

const Slide02Outcome: Page = () => (
  <PageShell eyebrow="00 · THE DESTINATION" accent={cyan} mood="warm">
    <Title size={76} margin="0 0 34px">
      三小時後，你會帶走自己的網站
    </Title>
    <div style={{ width: 1380, margin: '0 auto' }}>
      <WindowFrame title="https://你的帳號.github.io/" accent={cyan} height={560}>
        <FauxSite />
      </WindowFrame>
    </div>
  </PageShell>
);

const ComparePanel = ({
  index,
  label,
  title,
  color,
  children,
}: {
  index: string;
  label: string;
  title: string;
  color: string;
  children: ReactNode;
}) => (
  <div
    style={{
      minHeight: 360,
      padding: '34px 38px',
      border: '1px solid rgba(39, 52, 59, 0.16)',
      borderTop: `14px solid ${color}`,
      background: panel,
      boxShadow: '0 18px 40px rgba(55, 76, 73, 0.10)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ color, fontFamily: mono, fontSize: 28, fontWeight: 900 }}>0{index}</span>
      <span style={{ color: muted, fontSize: 28, fontWeight: 800 }}>{label}</span>
    </div>
    <div style={{ marginTop: 26, fontSize: 46, fontWeight: 950 }}>{title}</div>
    <div style={{ marginTop: 34 }}>{children}</div>
  </div>
);

const Slide03TwoRoutes: Page = () => (
  <PageShell eyebrow="01 · FROM CODE TO CONVERSATION" accent={coral} mood="warm">
    <Title size={74} margin="0 0 16px">
      做網頁的方式，已經改變了
    </Title>
    <div style={{ color: muted, fontSize: 34, fontWeight: 750 }}>
      從「先學程式碼」，變成「先把需求說清楚」
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 110px 1fr',
        alignItems: 'center',
        gap: 24,
        marginTop: 34,
      }}
    >
      <ComparePanel index="1" label="以前" title="自己寫程式碼" color={yellow}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <div
            style={{
              padding: '22px 12px',
              color: '#071723',
              background: yellow,
              fontFamily: mono,
              fontSize: 25,
              fontWeight: 900,
              textAlign: 'center',
            }}
          >
            HTML
          </div>
          <div
            style={{
              padding: '22px 12px',
              color: '#071723',
              background: yellow,
              fontFamily: mono,
              fontSize: 25,
              fontWeight: 900,
              textAlign: 'center',
            }}
          >
            CSS
          </div>
          <div
            style={{
              padding: '22px 12px',
              color: '#071723',
              background: yellow,
              fontFamily: mono,
              fontSize: 25,
              fontWeight: 900,
              textAlign: 'center',
            }}
          >
            JS
          </div>
        </div>
      </ComparePanel>
      <div
        style={{
          display: 'grid',
          width: 82,
          height: 82,
          margin: '0 auto',
          placeItems: 'center',
          borderRadius: 999,
          color: '#071723',
          background: coral,
          fontFamily: mono,
          fontSize: 42,
          fontWeight: 950,
          boxShadow: '0 16px 32px rgba(239, 124, 100, 0.22)',
        }}
      >
        →
      </div>
      <ComparePanel index="2" label="現在" title="把需求告訴 Gemini" color={mint}>
        <div
          style={{
            padding: '20px 24px',
            borderLeft: `8px solid ${mint}`,
            color: white,
            background: 'rgba(72, 242, 194, 0.10)',
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1.45,
          }}
        >
          「幫我做一個清楚、好閱讀的教師個人網頁。」
        </div>
      </ComparePanel>
    </div>
    <div
      style={{
        marginTop: 28,
        padding: '24px 30px',
        borderLeft: `12px solid ${cyan}`,
        color: white,
        background: 'rgba(120, 204, 216, 0.14)',
        fontSize: 38,
        fontWeight: 950,
        textAlign: 'center',
      }}
    >
      你主導想法與判斷，AI 協助實作
    </div>
  </PageShell>
);

const _Slide04Roadmap: Page = () => (
  <PageShell eyebrow="01 · LIVE DEMO" accent={cyan}>
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 90,
        right: 120,
        color: 'rgba(70, 184, 255, 0.08)',
        fontFamily: mono,
        fontSize: 250,
        fontWeight: 950,
      }}
    >
      60s
    </div>
    <Title>講師 LIVE DEMO：一分鐘看見 AI 寫出網頁</Title>
    <Steps>
      <Step>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
          <RouteNode index="01" label="輸入咒語" color={mint} />
          <Arrow color={mint} />
          <RouteNode index="02" label="AI 生成" color={mint} />
          <Arrow color={mint} />
          <RouteNode index="03" label="開啟預覽" color={mint} />
        </div>
      </Step>
      <Step>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            marginTop: 28,
          }}
        >
          <RouteNode index="04" label="點擊互動" color={cyan} />
          <Arrow color={cyan} />
          <RouteNode index="05" label="看見程式碼" color={cyan} wide />
          <Arrow color={cyan} />
          <RouteNode index="06" label="建立信心" color={cyan} wide />
        </div>
      </Step>
      <Step>
        <div
          style={{
            width: 340,
            margin: '28px auto 0',
            padding: '22px 26px',
            borderRadius: 22,
            color: '#071723',
            background: yellow,
            fontSize: 36,
            fontWeight: 950,
            textAlign: 'center',
          }}
        >
          目標：原來我也做得到！
        </div>
      </Step>
    </Steps>
  </PageShell>
);

const SafetyLine = ({ children, color }: { children: ReactNode; color: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 36, fontWeight: 800 }}>
    <span
      style={{ width: 13, height: 13, flex: '0 0 auto', borderRadius: 999, background: color }}
    />
    <span>{children}</span>
  </div>
);

const SafetyCard = ({
  symbol,
  title,
  color,
  children,
}: {
  symbol: string;
  title: string;
  color: string;
  children: ReactNode;
}) => (
  <div
    style={{
      minHeight: 430,
      padding: '38px 42px',
      border: '1px solid rgba(39, 52, 59, 0.16)',
      borderTop: `14px solid ${color}`,
      background: panel,
      boxShadow: '0 18px 40px rgba(55, 76, 73, 0.10)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
      <div
        style={{
          display: 'grid',
          width: 72,
          height: 72,
          placeItems: 'center',
          borderRadius: 999,
          color: '#071723',
          background: color,
          fontSize: 38,
          fontWeight: 950,
        }}
      >
        {symbol}
      </div>
      <div style={{ fontSize: 48, fontWeight: 950 }}>{title}</div>
    </div>
    <div style={{ display: 'grid', gap: 24, marginTop: 40 }}>{children}</div>
  </div>
);

const Slide05PublicSafety: Page = () => (
  <PageShell eyebrow="00 · BEFORE YOU PUBLISH" accent={yellow} mood="warm">
    <Title size={74} margin="0 0 16px">
      公開前，先分清楚什麼能放
    </Title>
    <div style={{ marginBottom: 34, color: muted, fontSize: 34, fontWeight: 750 }}>
      網頁一上線，任何拿到網址的人都可能看見
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
      <SafetyCard symbol="✓" title="可以公開" color={mint}>
        <SafetyLine color={mint}>教學理念與專長</SafetyLine>
        <SafetyLine color={mint}>已公開的課程與作品</SafetyLine>
        <SafetyLine color={mint}>自己有權使用的圖片</SafetyLine>
      </SafetyCard>
      <SafetyCard symbol="!" title="不要公開" color={coral}>
        <SafetyLine color={coral}>學生個資與未授權照片</SafetyLine>
        <SafetyLine color={coral}>私人電話、住址與證件</SafetyLine>
        <SafetyLine color={coral}>密碼、API Key、登入資訊</SafetyLine>
      </SafetyCard>
    </div>
  </PageShell>
);

const _Slide06AccountCheck: Page = () => (
  <PageShell eyebrow="00 · ACCOUNT TRAFFIC LIGHT" accent={yellow}>
    <Title>先確認能登入；卡住，也不會掉隊</Title>
    <Steps>
      <Step>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
          <BigCard title="綠燈" icon="✓" accent={mint} compact>
            Gemini、GitHub 已登入
            <br />
            Email 已驗證
          </BigCard>
          <BigCard title="黃燈" icon="?" accent={yellow} compact>
            忘記密碼
            <br />
            還在收驗證信
          </BigCard>
          <BigCard title="紅燈" icon="!" accent={coral} compact>
            尚未有 GitHub
            <br />
            Canvas 無法使用
          </BigCard>
        </div>
      </Step>
      <Step>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 40,
            marginTop: 42,
            padding: '28px 34px',
            border: '1px solid rgba(255, 207, 92, 0.34)',
            borderRadius: 22,
            background: 'rgba(255, 207, 92, 0.08)',
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 850 }}>
            記下 GitHub 使用者名稱；不是 Email，也不要交出密碼。
          </div>
          <StatusChip color={yellow}>卡住先與鄰座共作</StatusChip>
        </div>
      </Step>
    </Steps>
  </PageShell>
);

const PlanBox = ({
  index,
  title,
  example,
  color = mint,
}: {
  index: string;
  title: string;
  example: string;
  color?: string;
}) => (
  <div
    style={{
      minHeight: 205,
      padding: '28px 32px',
      border: '1px solid rgba(169, 189, 201, 0.24)',
      borderRadius: 22,
      background: 'rgba(13, 38, 53, 0.90)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <span style={{ color, fontFamily: mono, fontSize: 22, fontWeight: 900 }}>{index}</span>
      <span style={{ fontSize: 35, fontWeight: 900 }}>{title}</span>
    </div>
    <div
      style={{
        marginTop: 22,
        paddingTop: 18,
        borderTop: '1px solid rgba(169, 189, 201, 0.18)',
        color: muted,
        fontSize: 28,
        lineHeight: 1.42,
      }}
    >
      {example}
    </div>
  </div>
);

const PromptBrick = ({
  index,
  title,
  note,
  color = mint,
}: {
  index: string;
  title: string;
  note: string;
  color?: string;
}) => (
  <div
    style={{
      display: 'grid',
      minHeight: 160,
      padding: '24px 22px',
      border: '1px solid rgba(169, 189, 201, 0.24)',
      borderBottom: `8px solid ${color}`,
      borderRadius: 22,
      background: 'rgba(13, 38, 53, 0.92)',
      textAlign: 'center',
    }}
  >
    <span style={{ color, fontFamily: mono, fontSize: 19, fontWeight: 900 }}>{index}</span>
    <span style={{ fontSize: 34, fontWeight: 950 }}>{title}</span>
    <span style={{ color: muted, fontSize: 24, fontWeight: 700 }}>{note}</span>
  </div>
);

const CheckBoxCard = ({
  index,
  title,
  note,
  color = mint,
}: {
  index: string;
  title: string;
  note: string;
  color?: string;
}) => (
  <div
    style={{
      display: 'grid',
      minHeight: 226,
      gridTemplateColumns: '80px 1fr',
      alignItems: 'center',
      gap: 26,
      padding: '30px 36px',
      border: '1px solid rgba(169, 189, 201, 0.24)',
      borderRadius: 24,
      background: 'rgba(13, 38, 53, 0.90)',
    }}
  >
    <div
      style={{
        display: 'grid',
        width: 72,
        height: 72,
        placeItems: 'center',
        border: `4px solid ${color}`,
        borderRadius: 18,
        color,
        fontFamily: mono,
        fontSize: 28,
        fontWeight: 900,
      }}
    >
      {index}
    </div>
    <div>
      <div style={{ fontSize: 40, fontWeight: 950 }}>{title}</div>
      <div style={{ marginTop: 12, color: muted, fontSize: 28, lineHeight: 1.4 }}>{note}</div>
    </div>
  </div>
);

const FileBadge = ({ label = 'index.html' }: { label?: string }) => (
  <div
    style={{
      display: 'grid',
      width: 360,
      minHeight: 230,
      padding: '28px',
      placeItems: 'center',
      border: '2px solid rgba(72, 242, 194, 0.58)',
      borderRadius: 28,
      color: mint,
      background: '#08131d',
      boxShadow: '0 24px 64px rgba(72, 242, 194, 0.14)',
      fontFamily: mono,
      fontSize: 36,
      fontWeight: 900,
    }}
  >
    <span style={{ fontSize: 72 }}>&lt;/&gt;</span>
    <span>{label}</span>
  </div>
);

const _Slide09FourQuestions: Page = () => (
  <PageShell eyebrow="01 · CONTENT BEFORE PROMPT" accent={mint}>
    <Title>寫提示詞前，先回答四個問題</Title>
    <Steps>
      <Step>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          <PlanBox index="01" title="我是誰？" example="林老師｜自然科與數位學習" color={mint} />
          <PlanBox index="02" title="我在做什麼？" example="讓學生把好奇心做成作品" color={cyan} />
        </div>
      </Step>
      <Step>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 28,
            marginTop: 28,
          }}
        >
          <PlanBox
            index="03"
            title="想展示什麼？"
            example="三門課程、三件作品或三項專長"
            color={yellow}
          />
          <PlanBox
            index="04"
            title="希望訪客做什麼？"
            example="看作品、開教材、留下聯絡"
            color={coral}
          />
        </div>
      </Step>
    </Steps>
  </PageShell>
);

const _Slide10PromptBricks: Page = () => (
  <PageShell eyebrow="01 · BUILD A BETTER PROMPT" accent={yellow}>
    <Title>好提示詞，由五塊積木組成</Title>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
      <PromptBrick index="01" title="角色" note="幫我設計" color={mint} />
      <PromptBrick index="02" title="對象" note="給誰看" color={cyan} />
      <PromptBrick index="03" title="內容" note="要放什麼" color={yellow} />
      <PromptBrick index="04" title="風格" note="看起來如何" color={coral} />
      <PromptBrick index="05" title="技術限制" note="單一靜態檔" color={mint} />
    </div>
    <div
      style={{
        marginTop: 42,
        padding: '24px 28px',
        border: '1px solid rgba(72, 242, 194, 0.40)',
        borderRadius: 20,
        color: mint,
        background: 'rgba(72, 242, 194, 0.07)',
        fontFamily: mono,
        fontSize: 29,
        fontWeight: 850,
        textAlign: 'center',
      }}
    >
      前四塊決定像不像你；第五塊決定能不能順利發布。
    </div>
  </PageShell>
);

const _Slide11MasterPrompt: Page = () => (
  <PageShell eyebrow="01 · COPY, THEN CUSTOMIZE" accent={mint}>
    <div style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 50 }}>
      <div>
        <MonoTag>MASTER PROMPT</MonoTag>
        <Title size={72} margin="28px 0 30px">
          換成自己的內容；
          <br />
          技術限制固定保留。
        </Title>
        <div style={{ display: 'grid', gap: 16 }}>
          <StatusChip color={cyan}>繁體中文</StatusChip>
          <StatusChip color={cyan}>手機可讀</StatusChip>
          <StatusChip color={mint}>單一 index.html</StatusChip>
          <StatusChip color={mint}>不使用 React / npm / 後端</StatusChip>
        </div>
      </div>
      <WindowFrame title="gemini.canvas / prompt" accent={mint} height={650}>
        <PromptPanel label="可複製的精簡版" color={mint}>
          請製作繁體中文的教師個人網站。
          {'\n'}內容有：自我介紹、三項專長、
          {'\n'}教學理念與三個資源連結。
          {'\n'}
          {'\n'}配色成熟、文字清楚，
          {'\n'}手機與電腦都要好讀。
          {'\n'}
          {'\n'}只使用一個 index.html；
          {'\n'}CSS 與 JavaScript 全部內嵌。
          {'\n'}不使用 React、npm、後端或 API Key。
        </PromptPanel>
      </WindowFrame>
    </div>
  </PageShell>
);

const _Slide12GenerateFirst: Page = () => (
  <PageShell eyebrow="01 · HANDS ON" accent={cyan}>
    <Title>現場實作：先看見第一版，再談完美</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: 42 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          padding: '52px 30px',
          border: '1px solid rgba(169, 189, 201, 0.22)',
          borderRadius: 26,
          background: 'rgba(13, 38, 53, 0.84)',
        }}
      >
        <RouteNode index="01" label="Gemini" color={mint} />
        <Arrow color={mint} />
        <RouteNode index="02" label="Canvas" color={mint} />
        <Arrow color={cyan} />
        <RouteNode index="03" label="貼上" color={cyan} />
        <Arrow color={cyan} />
        <RouteNode index="04" label="預覽" color={yellow} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <div
          style={{ padding: '36px 12px', borderRadius: 24, background: panel, textAlign: 'center' }}
        >
          <div style={{ color: mint, fontFamily: mono, fontSize: 64, fontWeight: 950 }}>3</div>
          <div style={{ color: muted, fontSize: 23, fontWeight: 800 }}>示範</div>
        </div>
        <div
          style={{
            padding: '36px 12px',
            borderRadius: 24,
            background: panelSoft,
            textAlign: 'center',
          }}
        >
          <div style={{ color: cyan, fontFamily: mono, fontSize: 64, fontWeight: 950 }}>8</div>
          <div style={{ color: muted, fontSize: 23, fontWeight: 800 }}>自己做</div>
        </div>
        <div
          style={{ padding: '36px 12px', borderRadius: 24, background: panel, textAlign: 'center' }}
        >
          <div style={{ color: yellow, fontFamily: mono, fontSize: 64, fontWeight: 950 }}>1</div>
          <div style={{ color: muted, fontSize: 23, fontWeight: 800 }}>回報</div>
        </div>
      </div>
    </div>
    <div
      style={{
        marginTop: 40,
        padding: '26px 32px',
        borderRadius: 22,
        color: '#071723',
        background: mint,
        fontSize: 38,
        fontWeight: 950,
        textAlign: 'center',
      }}
    >
      完成＝畫面看得到自己的網站
    </div>
  </PageShell>
);

const _Slide13OneChange: Page = () => (
  <PageShell eyebrow="01 · ITERATE IN SMALL STEPS" accent={yellow}>
    <Title>修改網站時，一次只說一件事</Title>
    <Steps>
      <Step>
        <PromptPanel label="01 · 先改內容" color={mint}>
          請把首頁自我介紹改成以下文字，
          {'\n'}不要自行補資料：……
        </PromptPanel>
      </Step>
      <Step>
        <div style={{ marginTop: 22 }}>
          <PromptPanel label="02 · 再改外觀" color={cyan}>
            配色改成森林綠與米白色，
            {'\n'}字體再放大一點。
          </PromptPanel>
        </div>
      </Step>
      <Step>
        <div style={{ marginTop: 22 }}>
          <PromptPanel label="03 · 最後加功能" color={yellow}>
            新增三張作品卡，
            {'\n'}點擊後開啟我提供的連結。
          </PromptPanel>
        </div>
      </Step>
      <div
        style={{ marginTop: 30, color: muted, fontSize: 30, fontWeight: 750, textAlign: 'center' }}
      >
        拆小修改，出錯時才知道問題在哪裡。
      </div>
    </Steps>
  </PageShell>
);

const _Slide14MakeItYours: Page = () => (
  <PageShell eyebrow="01 · HANDS ON" accent={mint}>
    <Title>今天必做兩次修改，讓網站真正像你</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34 }}>
      <CheckBoxCard
        index="01"
        title="刪除假資料"
        note="姓名、經歷、作品與連結都要是真的。"
        color={coral}
      />
      <CheckBoxCard
        index="02"
        title="調整一項視覺"
        note="配色、字體、卡片或按鈕，選一項即可。"
        color={mint}
      />
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
        marginTop: 42,
      }}
    >
      <StatusChip color={cyan}>＋課程區塊</StatusChip>
      <StatusChip color={yellow}>＋教材按鈕</StatusChip>
      <StatusChip color={mint}>＋手機版檢查</StatusChip>
      <span style={{ marginLeft: 12, color: muted, fontSize: 24 }}>快速完成者挑戰</span>
    </div>
  </PageShell>
);

const _Slide15PublishReady: Page = () => (
  <PageShell eyebrow="01 · HANDOFF TO GITHUB" accent={mint}>
    <Title>取得可以發布的版本：主線只做一件事</Title>
    <Steps>
      <Step>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 100px 360px',
            alignItems: 'center',
            gap: 30,
          }}
        >
          <BigCard title="主線 · 複製程式碼" icon="01" accent={mint}>
            開啟 Code → 複製完整內容
          </BigCard>
          <Arrow color={mint} />
          <FileBadge />
        </div>
      </Step>
      <Step>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 100px 360px',
            alignItems: 'center',
            gap: 30,
            marginTop: 26,
          }}
        >
          <BigCard title="備用 · 下載檔案" icon="02" accent={cyan} compact>
            有 Download 才下載；先解壓縮。
          </BigCard>
          <Arrow color={cyan} />
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <StatusChip color={cyan}>最外層要有 index.html</StatusChip>
          </div>
        </div>
      </Step>
      <Step>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 34 }}>
          <StatusChip color={mint}>無個資</StatusChip>
          <StatusChip color={mint}>無假資料</StatusChip>
          <StatusChip color={mint}>連結正確</StatusChip>
          <StatusChip color={mint}>單一檔案</StatusChip>
        </div>
      </Step>
    </Steps>
  </PageShell>
);

const TermCard = ({
  term,
  plain,
  icon,
  color = mint,
}: {
  term: string;
  plain: string;
  icon: string;
  color?: string;
}) => (
  <div
    style={{
      display: 'grid',
      minHeight: 210,
      gridTemplateColumns: '74px 1fr',
      alignItems: 'center',
      gap: 26,
      padding: '30px 34px',
      border: '1px solid rgba(169, 189, 201, 0.24)',
      borderRadius: 24,
      background: 'rgba(13, 38, 53, 0.90)',
    }}
  >
    <div
      style={{
        display: 'grid',
        width: 68,
        height: 68,
        placeItems: 'center',
        borderRadius: 20,
        color: '#071723',
        background: color,
        fontFamily: mono,
        fontSize: 27,
        fontWeight: 950,
      }}
    >
      {icon}
    </div>
    <div>
      <div style={{ color, fontFamily: mono, fontSize: 29, fontWeight: 950 }}>{term}</div>
      <div style={{ marginTop: 8, fontSize: 34, fontWeight: 850 }}>{plain}</div>
    </div>
  </div>
);

const FormField = ({
  label,
  value,
  active = false,
}: {
  label: string;
  value: string;
  active?: boolean;
}) => (
  <div>
    <div style={{ marginBottom: 8, color: muted, fontSize: 18, fontWeight: 800 }}>{label}</div>
    <div
      style={{
        minHeight: 54,
        padding: '12px 16px',
        border: active ? '2px solid #48f2c2' : '1px solid rgba(169, 189, 201, 0.24)',
        borderRadius: 10,
        color: active ? mint : white,
        background: '#07131d',
        fontFamily: mono,
        fontSize: 22,
        fontWeight: 800,
      }}
    >
      {value}
    </div>
  </div>
);

const NumberStep = ({
  index,
  children,
  active = false,
}: {
  index: string;
  children: ReactNode;
  active?: boolean;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '48px 1fr',
      alignItems: 'center',
      gap: 16,
      minHeight: 70,
      padding: '10px 14px',
      borderRadius: 16,
      color: active ? white : muted,
      background: active ? 'rgba(72, 242, 194, 0.11)' : 'transparent',
      fontSize: 25,
      fontWeight: 800,
    }}
  >
    <span
      style={{
        display: 'grid',
        width: 44,
        height: 44,
        placeItems: 'center',
        borderRadius: 14,
        color: active ? '#071723' : muted,
        background: active ? mint : 'rgba(169, 189, 201, 0.12)',
        fontFamily: mono,
        fontSize: 18,
        fontWeight: 950,
      }}
    >
      {index}
    </span>
    <span>{children}</span>
  </div>
);

const FolderTree = ({ correct, title }: { correct: boolean; title: string }) => (
  <div
    style={{
      minHeight: 390,
      padding: '32px 36px',
      border: correct
        ? '2px solid rgba(72, 242, 194, 0.52)'
        : '2px solid rgba(255, 123, 114, 0.52)',
      borderRadius: 26,
      background: 'rgba(13, 38, 53, 0.90)',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
      }}
    >
      <span style={{ fontSize: 36, fontWeight: 950 }}>{title}</span>
      <StatusChip color={correct ? mint : coral}>{correct ? '會開啟' : '可能 404'}</StatusChip>
    </div>
    <div
      style={{
        display: 'grid',
        gap: 18,
        padding: '26px 30px',
        borderRadius: 20,
        color: muted,
        background: '#07131d',
        fontFamily: mono,
        fontSize: 28,
        lineHeight: 1.45,
      }}
    >
      <div style={{ color: cyan }}>▾ your-name.github.io/</div>
      {correct ? (
        <>
          <div style={{ paddingLeft: 42, color: mint }}>◇ index.html</div>
          <div style={{ paddingLeft: 42 }}>◇ README.md</div>
        </>
      ) : (
        <>
          <div style={{ paddingLeft: 42, color: coral }}>▾ 我的網站資料夾/</div>
          <div style={{ paddingLeft: 84, color: coral }}>◇ index.html</div>
          <div style={{ paddingLeft: 42 }}>◇ README.md</div>
        </>
      )}
    </div>
  </div>
);

const DiagnosticCard = ({
  index,
  title,
  note,
  color = mint,
}: {
  index: string;
  title: string;
  note: string;
  color?: string;
}) => (
  <div
    style={{
      minHeight: 150,
      padding: '22px 24px',
      border: '1px solid rgba(169, 189, 201, 0.22)',
      borderRadius: 20,
      background: 'rgba(13, 38, 53, 0.90)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span style={{ color, fontFamily: mono, fontSize: 19, fontWeight: 950 }}>{index}</span>
      <span style={{ fontSize: 29, fontWeight: 950 }}>{title}</span>
    </div>
    <div style={{ marginTop: 12, color: muted, fontSize: 23, fontWeight: 700 }}>{note}</div>
  </div>
);

const Slide16FourTerms: Page = () => (
  <PageShell eyebrow="PART 2 · GITHUB PAGES" accent={cyan} mood="blue">
    <Title>四個名詞，已經足夠完成今天的網站</Title>
    <Steps>
      <Step>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
          <TermCard term="Repository" plain="網站的線上資料夾" icon="▣" color={mint} />
          <TermCard term="Commit" plain="替版本取名存檔" icon="✓" color={cyan} />
        </div>
      </Step>
      <Step>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 26,
            marginTop: 26,
          }}
        >
          <TermCard term="main" plain="今天發布的主要版本" icon="│" color={yellow} />
          <TermCard term="Pages" plain="把資料夾變成網址" icon="↗" color={coral} />
        </div>
      </Step>
    </Steps>
  </PageShell>
);
Slide16FourTerms.transition = sectionTransition;

const GitHubStepPair = ({
  eyebrow,
  title,
  firstInstruction,
  firstImage,
  secondInstruction,
  secondImage,
}: {
  eyebrow: string;
  title: string;
  firstInstruction?: string;
  firstImage?: string;
  secondInstruction?: string;
  secondImage?: string;
}) => {
  const cards = [
    {
      instruction: firstInstruction,
      image: firstImage,
      color: cyan,
      border: '1px solid rgba(120, 174, 178, 0.52)',
    },
    {
      instruction: secondInstruction,
      image: secondImage,
      color: mint,
      border: '1px solid rgba(169, 207, 189, 0.80)',
    },
  ].filter(
    (card): card is { instruction: string; image: string; color: string; border: string } =>
      card.instruction !== undefined && card.image !== undefined,
  );

  return (
    <PageShell eyebrow={eyebrow} accent={mint} mood="blue">
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto minmax(0, 1fr)',
          flex: '1 1 auto',
          minHeight: 0,
          gap: 20,
          padding: '16px 0 10px',
        }}
      >
        <Title size={66} margin="0">
          {title}
        </Title>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cards.length}, minmax(0, 1fr))`,
            minHeight: 0,
            gap: 32,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.instruction}
              style={{
                display: 'grid',
                gridTemplateRows: 'auto minmax(0, 1fr)',
                minHeight: 0,
                gap: 12,
                padding: 18,
                border: card.border,
                borderRadius: 22,
                background: panel,
              }}
            >
              <div
                style={{
                  color: card.color,
                  fontSize: card.instruction.length > 90 ? 31 : 34,
                  fontWeight: 900,
                  lineHeight: 1.35,
                  overflowWrap: 'anywhere',
                }}
              >
                {card.instruction}
              </div>
              <img
                src={card.image}
                alt={card.instruction}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: 0,
                  objectFit: 'contain',
                  borderRadius: 12,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
};

const GitHubChapter = ({
  part,
  title,
  description,
  accent,
}: {
  part: string;
  title: string;
  description: string;
  accent: string;
}) => (
  <PageShell eyebrow="GITHUB 網頁發布工作流" accent={accent} mood="blue">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          padding: '14px 24px',
          border: `1px solid ${accent}`,
          borderRadius: 999,
          color: accent,
          background: panel,
          fontFamily: mono,
          fontSize: 30,
          fontWeight: 900,
          letterSpacing: '0.12em',
        }}
      >
        {part}
      </div>
      <h1
        style={{
          margin: '42px 0 28px',
          color: white,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 124,
          fontWeight: 950,
          lineHeight: 1.15,
          letterSpacing: '-0.04em',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          maxWidth: 1040,
          margin: 0,
          color: muted,
          fontSize: '41px',
          fontWeight: 700,
          lineHeight: 1.55,
        }}
      >
        {description}
      </p>
    </div>
  </PageShell>
);

const PracticeBreak = () => (
  <div
    style={{
      ...fill,
      position: 'relative',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--osd-text)',
      background:
        'radial-gradient(circle at 82% 18%, rgba(241, 212, 123, 0.58), transparent 24%), radial-gradient(circle at 14% 84%, rgba(169, 207, 189, 0.62), transparent 26%), linear-gradient(135deg, #fff8e7 0%, #edf4f1 100%)',
    }}
  >
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 118,
        right: 150,
        width: 310,
        height: 310,
        border: '34px solid rgba(238, 154, 131, 0.28)',
        borderRadius: '50%',
      }}
    />
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 138,
        left: 150,
        width: 480,
        height: 22,
        borderRadius: 999,
        background: cyan,
        opacity: 0.62,
      }}
    />
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 128,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '0.08em',
        }}
      >
        實作時間
      </div>
      <div
        style={{
          marginTop: 48,
          color: coral,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 260,
          fontWeight: 950,
          lineHeight: 0.92,
          letterSpacing: '-0.04em',
        }}
      >
        10 分鐘
      </div>
    </div>
  </div>
);

const Part01Practice: Page = () => <PracticeBreak />;
const Part02Practice: Page = () => <PracticeBreak />;
const Part03Practice: Page = () => <PracticeBreak />;
const Part04Practice: Page = () => <PracticeBreak />;

Part01Practice.transition = sectionTransition;
Part02Practice.transition = sectionTransition;
Part03Practice.transition = sectionTransition;
Part04Practice.transition = sectionTransition;

const Slide17AccountChapter: Page = () => (
  <GitHubChapter
    part="PART 01"
    title="註冊 GitHub 帳戶"
    description="使用 Google 登入，完成帳號設定並建立第一個 Repository。"
    accent={mint}
  />
);

const Slide22CanvasChapter: Page = () => (
  <GitHubChapter
    part="PART 02"
    title="用 Gemini Canvas 製作網頁"
    description="輸入指令生成 HTML 網頁，下載後依作品內容重新命名。"
    accent={yellow}
  />
);

const Slide27UploadChapter: Page = () => (
  <GitHubChapter
    part="PART 03"
    title="上傳到Github"
    description="先把第一版網頁命名為 index.html，只上傳一個檔案也能完成公開網址。"
    accent={mint}
  />
);

const Slide28PublishChapter: Page = () => (
  <GitHubChapter
    part="PART 04"
    title="發布第一個公開網址"
    description="在 GitHub Pages 選擇 main 與 /(root)，讓 index.html 真正上線。"
    accent={cyan}
  />
);

const Slide17GithubSignup: Page = () => (
  <GitHubStepPair
    eyebrow="02 · GITHUB ACCOUNT"
    title="開始註冊 GitHub"
    firstInstruction="步驟 1｜開啟 github.com，點選右上角「Sign up」"
    firstImage={githubStep1}
    secondInstruction="步驟 2｜選擇「Continue with Google」快速註冊"
    secondImage={githubStep2}
  />
);

const Slide18GoogleLogin: Page = () => (
  <GitHubStepPair
    eyebrow="02 · GITHUB ACCOUNT"
    title="使用 Google 帳號登入"
    firstInstruction="步驟 3｜選擇要用來登入 GitHub 的 Google 帳號"
    firstImage={githubStep3}
    secondInstruction="步驟 4｜確認帳號資訊後，按下「繼續」"
    secondImage={githubStep4}
  />
);

const Slide19AccountSetup: Page = () => (
  <GitHubStepPair
    eyebrow="02 · GITHUB ACCOUNT"
    title="完成 GitHub 帳號設定"
    firstInstruction="步驟 5｜確認 GitHub 要使用的帳號與電子郵件"
    firstImage={githubStep5}
    secondInstruction="步驟 6｜回到 Dashboard，點選「Create repository」"
    secondImage={githubStep6}
  />
);

const Slide20CreateRepository: Page = () => (
  <GitHubStepPair
    eyebrow="02 · NEW REPOSITORY"
    title="建立要放網站檔案的 Repository"
    firstInstruction="步驟 7｜輸入 Repository 名稱，保持 Public，建立儲存庫"
    firstImage={githubStep7}
    secondInstruction="步驟 8｜確認名稱可用後，按下「Create repository」"
    secondImage={githubStep8}
  />
);

const Slide21UploadFiles: Page = () => (
  <GitHubStepPair
    eyebrow="02 · UPLOAD FILES"
    title="進入 Repository，準備上傳"
    firstInstruction="步驟 3｜進入剛建立的 Repository，選擇「uploading an existing file」"
    firstImage={githubStep9}
    secondInstruction="步驟 4｜在上傳頁面按「choose your files」，選取 index.html"
    secondImage={githubStep10}
  />
);

const Slide22CanvasPrompt: Page = () => (
  <GitHubStepPair
    eyebrow="03 · GEMINI CANVAS"
    title="在 Gemini Canvas 請 AI 生成網頁"
    firstInstruction="步驟 1｜在提示框寫下主題，明確要求「用 HTML 製作互動網頁」"
    firstImage={githubStep11}
    secondInstruction="步驟 2｜確認 Canvas 預覽已生成網頁，再檢查版面內容"
    secondImage={githubStep12}
  />
);

const Slide23DownloadAndUpload: Page = () => (
  <PageShell eyebrow="03 · DOWNLOAD HTML" accent={mint} mood="blue">
    <Title size={66} margin="0 0 20px">
      找到下載的 HTML 檔
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '74px 1fr',
        minHeight: 610,
        padding: 18,
        border: '1px solid rgba(169, 207, 189, 0.80)',
        borderRadius: 22,
        background: panel,
      }}
    >
      <div style={{ color: mint, fontSize: 34, fontWeight: 900, lineHeight: 1.35 }}>
        步驟 3｜找到下載的 code_artifact HTML 檔，準備重新命名
      </div>
      <img
        src={githubStep13}
        alt="找到下載的 code_artifact HTML 檔"
        style={{
          width: '100%',
          height: '100%',
          minHeight: 0,
          objectFit: 'contain',
          borderRadius: 12,
        }}
      />
    </div>
  </PageShell>
);

const Slide24UploadToRepository: Page = () => (
  <GitHubStepPair
    eyebrow="03 · UPLOAD TO GITHUB"
    title="上傳 index.html，完成第一版"
    secondInstruction="步驟 6｜Commit 後，Repository 清單中會出現 index.html"
    secondImage={githubStep16}
  />
);

const Slide27ConfirmFilename: Page = () => (
  <GitHubStepPair
    eyebrow="03 · RENAME HTML"
    title="把檔案命名為 index.html"
    firstInstruction="步驟 1｜把下載的 HTML 改名為 index.html，按 Enter 完成"
    firstImage={indexHtmlFile}
  />
);

const Slide28OpenPagesSettings: Page = () => (
  <GitHubStepPair
    eyebrow="04 · GITHUB PAGES"
    title="開啟 GitHub Pages 設定"
    firstInstruction="步驟 1｜點選上方「Settings」分頁，再按左側邊欄的「Pages」"
    firstImage={githubStep23}
    secondInstruction="步驟 2｜在 Branch 下拉選單中選擇 main"
    secondImage={githubStep24}
  />
);

const Slide29PublishPages: Page = () => (
  <GitHubStepPair
    eyebrow="04 · GITHUB PAGES"
    title="選擇 main 分支並發布"
    firstInstruction="步驟 3｜其它都不用動，直接按save"
    firstImage={githubStep25}
    secondInstruction="步驟 4｜按 Save 後等待 GitHub Pages 完成部署"
    secondImage={githubStep26}
  />
);

const Slide30FindSiteUrl: Page = () => (
  <GitHubStepPair
    eyebrow="04 · GITHUB PAGES"
    title="取得第一個公開網址"
    firstInstruction="步驟 5｜看到「Your site is live」後，複製或點選網站網址"
    firstImage={githubStep27}
  />
);

const Slide32MoreExamples: Page = () => (
  <PageShell eyebrow="04 · WEBSITE LIVE" accent={mint} mood="blue">
    <Title size={66} margin="0 0 20px">
      第一版網站已經公開
    </Title>
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '74px 1fr',
        minHeight: 610,
        padding: 18,
        border: '1px solid rgba(169, 207, 189, 0.80)',
        borderRadius: 22,
        background: panel,
      }}
    >
      <div style={{ color: mint, fontSize: 34, fontWeight: 900, lineHeight: 1.35 }}>
        接下來想做多個頁面，再用首頁把它們串起來。
      </div>
      <img
        src={githubStep31}
        alt="開啟 history.html 網頁作品"
        style={{
          width: '100%',
          height: '100%',
          minHeight: 0,
          objectFit: 'contain',
          borderRadius: 12,
        }}
      />
    </div>
  </PageShell>
);

const Slide36AntigravityChapter: Page = () => (
  <GitHubChapter
    part="BONUS · ANTIGRAVITY"
    title="把 GitHub 網站帶進 Antigravity"
    description="建立本機專案資料夾，貼上 Repository 網址，讓 AI 協助你繼續修改網站。"
    accent={coral}
  />
);

const Slide37CopyRepositoryUrl: Page = () => (
  <GitHubStepPair
    eyebrow="BONUS · ANTIGRAVITY"
    title="先複製 GitHub 專案網址"
    firstInstruction="步驟 1｜在 GitHub Repository 按 Code，複製 HTTPS 專案網址"
    firstImage={githubStep39}
    secondInstruction="步驟 2｜開啟 Antigravity，在 Projects 區按新增專案"
    secondImage={githubStep40}
  />
);

const Slide38CreateProjectFolder: Page = () => (
  <GitHubStepPair
    eyebrow="BONUS · ANTIGRAVITY"
    title="建立自己的專案資料夾"
    firstInstruction="步驟 3｜在 Create Project 視窗按 Add Folder，選擇或建立資料夾"
    firstImage={githubStep41}
    secondInstruction="步驟 4｜建立一個新資料夾，作為這個網站的本機工作區"
    secondImage={githubStep42}
  />
);

const Slide39SelectProjectFolder: Page = () => (
  <GitHubStepPair
    eyebrow="BONUS · ANTIGRAVITY"
    title="選擇資料夾並建立專案"
    firstInstruction="步驟 5｜將資料夾命名，例如 myhome，方便辨識自己的網站專案"
    firstImage={githubStep43}
    secondInstruction="步驟 6｜回到 Create Project，確認已選取 myhome 資料夾後按 Next"
    secondImage={githubStep44}
  />
);

const Slide40DownloadRepository: Page = () => (
  <GitHubStepPair
    eyebrow="BONUS · ANTIGRAVITY"
    title="貼上網址，下載 GitHub 專案"
    firstInstruction="步驟 7｜選擇適合的 Agent 安全設定，再完成專案建立"
    firstImage={githubStep45}
    secondInstruction="步驟 8｜輸入「下載」加上剛複製的 GitHub HTTPS 網址，讓 Antigravity 取得專案"
    secondImage={githubStep46}
  />
);

const _Slide17NewRepository: Page = () => (
  <PageShell eyebrow="02 · NEW REPOSITORY" accent={mint}>
    <Title>建立自己的網站 Repository</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.65fr', gap: 36 }}>
      <WindowFrame title="github.com/new" accent={mint} height={590}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.36fr 0.64fr', gap: 14 }}>
          <FormField label="Owner" value="your-name" />
          <FormField label="Repository name" value="your-name.github.io" active />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginTop: 20,
          }}
        >
          <div
            style={{
              padding: '17px 20px',
              border: '2px solid #48f2c2',
              borderRadius: 14,
              color: mint,
              fontSize: 23,
              fontWeight: 900,
            }}
          >
            ● Public
          </div>
          <div
            style={{
              padding: '17px 20px',
              border: '1px solid rgba(169, 189, 201, 0.22)',
              borderRadius: 14,
              color: muted,
              fontSize: 23,
              fontWeight: 800,
            }}
          >
            ○ Private
          </div>
        </div>
        <div
          style={{
            marginTop: 22,
            padding: '18px 20px',
            borderRadius: 14,
            color: white,
            background: '#07131d',
            fontSize: 23,
            fontWeight: 800,
          }}
        >
          ☑ Add a README file
        </div>
        <div
          style={{
            width: 290,
            marginTop: 24,
            marginLeft: 'auto',
            padding: '16px 22px',
            borderRadius: 14,
            color: '#071723',
            background: mint,
            fontSize: 24,
            fontWeight: 950,
            textAlign: 'center',
          }}
        >
          Create repository
        </div>
      </WindowFrame>
      <div style={{ display: 'grid', alignContent: 'center', gap: 6 }}>
        <NumberStep index="01">右上角 ＋</NumberStep>
        <NumberStep index="02">New repository</NumberStep>
        <NumberStep index="03" active>
          使用者名稱.github.io
        </NumberStep>
        <NumberStep index="04">Public＋README</NumberStep>
        <NumberStep index="05">Create</NumberStep>
        <div style={{ marginTop: 20, color: coral, fontSize: 24, fontWeight: 850 }}>
          不要 Email、中文或空格
        </div>
      </div>
    </div>
  </PageShell>
);

const _Slide18RootFolder: Page = () => (
  <PageShell eyebrow="02 · FILE LOCATION" accent={yellow}>
    <Title>網站大門 index.html，要放在最外層</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34 }}>
      <FolderTree correct title="正確位置" />
      <FolderTree correct={false} title="多包一層" />
    </div>
    <div
      style={{
        marginTop: 36,
        color: yellow,
        fontFamily: mono,
        fontSize: 30,
        fontWeight: 900,
        textAlign: 'center',
      }}
    >
      第一堂課先不要建立多層資料夾。
    </div>
  </PageShell>
);

const _Slide19CreateIndex: Page = () => (
  <PageShell eyebrow="02 · CREATE INDEX.HTML" accent={cyan}>
    <Title>把 Canvas 程式碼貼成 index.html</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: 36 }}>
      <WindowFrame title="github.com/your-name/your-name.github.io" accent={cyan} height={600}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
          <StatusChip color={cyan}>Add file ▾</StatusChip>
          <StatusChip color={mint}>Create new file</StatusChip>
        </div>
        <FormField label="Name your file..." value="index.html" active />
        <div
          style={{
            height: 260,
            marginTop: 18,
            padding: '22px 24px',
            border: '1px solid rgba(169, 189, 201, 0.20)',
            borderRadius: 14,
            color: '#b8d8e9',
            background: '#061019',
            fontFamily: mono,
            fontSize: 19,
            lineHeight: 1.58,
          }}
        >
          <div style={{ color: coral }}>&lt;!doctype html&gt;</div>
          <div>&lt;html lang="zh-Hant"&gt;</div>
          <div style={{ paddingLeft: 24, color: cyan }}>&lt;head&gt; ... &lt;/head&gt;</div>
          <div style={{ paddingLeft: 24, color: mint }}>&lt;body&gt;</div>
          <div style={{ paddingLeft: 48 }}>我的個人網站內容</div>
          <div style={{ paddingLeft: 24, color: mint }}>&lt;/body&gt;</div>
          <div>&lt;/html&gt;</div>
        </div>
      </WindowFrame>
      <div style={{ display: 'grid', alignContent: 'center', gap: 8 }}>
        <NumberStep index="01">Add file</NumberStep>
        <NumberStep index="02">Create new file</NumberStep>
        <NumberStep index="03" active>
          命名 index.html
        </NumberStep>
        <NumberStep index="04">貼上完整程式碼</NumberStep>
        <div style={{ marginTop: 24 }}>
          <StatusChip color={muted}>備用：Upload files</StatusChip>
        </div>
      </div>
    </div>
  </PageShell>
);

const _Slide20Commit: Page = () => (
  <PageShell eyebrow="02 · SAVE A VERSION" accent={mint}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.78fr 1.22fr',
        alignItems: 'center',
        gap: 62,
      }}
    >
      <div>
        <MonoTag>COMMIT</MonoTag>
        <Title size={84} margin="30px 0 28px">
          替這次版本，
          <br />
          取一個看得懂的名字。
        </Title>
        <p style={{ margin: 0, color: muted, fontSize: 31, lineHeight: 1.5 }}>
          Commit 不是發布按鈕；
          <br />
          它是一個可辨認的版本存檔。
        </p>
      </div>
      <WindowFrame title="Commit changes" accent={mint} height={520}>
        <FormField label="Commit message" value="建立第一版個人網站" active />
        <div
          style={{
            display: 'grid',
            gap: 16,
            marginTop: 28,
            padding: '24px 26px',
            borderRadius: 18,
            background: '#07131d',
            fontSize: 25,
            fontWeight: 850,
          }}
        >
          <div style={{ color: mint }}>● Commit directly to the main branch</div>
          <div style={{ color: muted }}>○ Create a new branch</div>
        </div>
        <div
          style={{
            width: 300,
            margin: '34px 0 0 auto',
            padding: '18px 20px',
            borderRadius: 14,
            color: '#071723',
            background: mint,
            fontSize: 25,
            fontWeight: 950,
            textAlign: 'center',
          }}
        >
          Commit changes
        </div>
      </WindowFrame>
    </div>
  </PageShell>
);

const _Slide21EnablePages: Page = () => (
  <PageShell eyebrow="02 · SETTINGS → PAGES" accent={cyan}>
    <Title>開啟 GitHub Pages：一次只看一個畫面</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
      <WindowFrame title="1 · Repository settings" accent={cyan} height={500}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.4fr 0.6fr', gap: 22 }}>
          <div style={{ display: 'grid', gap: 10 }}>
            <NumberStep index="•">General</NumberStep>
            <NumberStep index="•">Collaborators</NumberStep>
            <NumberStep index="1" active>
              Pages
            </NumberStep>
          </div>
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              border: '2px solid rgba(70, 184, 255, 0.52)',
              borderRadius: 20,
              color: cyan,
              background: 'rgba(70, 184, 255, 0.08)',
              fontSize: 40,
              fontWeight: 950,
              textAlign: 'center',
            }}
          >
            Settings
            <br />↓<br />
            Pages
          </div>
        </div>
      </WindowFrame>
      <WindowFrame title="2 · Build and deployment" accent={mint} height={500}>
        <div style={{ display: 'grid', gap: 18 }}>
          <FormField label="Source" value="Deploy from a branch" active />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <FormField label="Branch" value="main" active />
            <FormField label="Folder" value="/(root)" active />
          </div>
          <div
            style={{
              width: 220,
              margin: '18px 0 0 auto',
              padding: '16px 20px',
              borderRadius: 14,
              color: '#071723',
              background: mint,
              fontSize: 25,
              fontWeight: 950,
              textAlign: 'center',
            }}
          >
            Save
          </div>
        </div>
      </WindowFrame>
    </div>
  </PageShell>
);

const _Slide22PublicUrl: Page = () => (
  <PageShell eyebrow="02 · YOUR SITE IS LIVE" accent={mint}>
    <Title>你的公開網址，已經有固定格式</Title>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '34px 42px',
        border: '2px solid rgba(72, 242, 194, 0.50)',
        borderRadius: 26,
        color: mint,
        background: '#08131d',
        boxShadow: '0 24px 60px rgba(72, 242, 194, 0.12)',
        fontFamily: mono,
        fontSize: 52,
        fontWeight: 950,
      }}
    >
      <span>https://你的使用者名稱.github.io/</span>
      <span>↗</span>
    </div>
    <Steps>
      <Step>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26, marginTop: 42 }}
        >
          <BigCard title="先等待" icon="0–10" accent={yellow} compact>
            Pages 發布可能需要幾分鐘
          </BigCard>
          <BigCard title="手機測試" icon="▯" accent={mint} compact>
            確認行動版能正常開啟
          </BigCard>
          <BigCard title="鄰座測試" icon="↗" accent={cyan} compact>
            從另一台裝置打開網址
          </BigCard>
        </div>
      </Step>
    </Steps>
  </PageShell>
);

const _Slide23SuccessCheckpoint: Page = () => (
  <PageShell eyebrow="02 · SUCCESS CHECKPOINT" accent={mint}>
    <Title>現場實作：三個檢查點都亮綠燈</Title>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
      <CheckBoxCard index="01" title="根目錄" note="看得到 index.html" color={mint} />
      <CheckBoxCard index="02" title="Pages" note="main ＋ /(root)" color={mint} />
      <CheckBoxCard index="03" title="另一台裝置" note="公開網址能開" color={mint} />
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 18,
        marginTop: 36,
        textAlign: 'center',
      }}
    >
      <StatusChip color={mint}>綠燈：互測網址</StatusChip>
      <StatusChip color={yellow}>黃燈：依序檢查</StatusChip>
      <StatusChip color={coral}>紅燈：找協助者</StatusChip>
    </div>
  </PageShell>
);

const _Slide24Troubleshoot: Page = () => (
  <PageShell eyebrow="02 · 404 CHECKLIST" accent={coral}>
    <Title margin="0 0 34px">看到 404 或空白頁，照順序檢查</Title>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
      <DiagnosticCard index="01" title="名稱" note="帳號.github.io" color={mint} />
      <DiagnosticCard index="02" title="Public" note="Repository 可公開" color={mint} />
      <DiagnosticCard index="03" title="根目錄" note="直接看到 index.html" color={mint} />
      <DiagnosticCard index="04" title="Pages" note="main ＋ /(root)" color={cyan} />
      <DiagnosticCard index="05" title="等待" note="幾分鐘後再整理" color={yellow} />
      <DiagnosticCard index="06" title="純靜態" note="不是 React / npm 專案" color={coral} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 28 }}>
      <StatusChip color={yellow}>圖片不見＝檢查路徑</StatusChip>
      <StatusChip color={yellow}>只有文字＝貼錯內容</StatusChip>
      <StatusChip color={yellow}>按鈕無效＝仍是 #</StatusChip>
    </div>
  </PageShell>
);

const _Slide25UpdateOnce: Page = () => (
  <PageShell eyebrow="02 · UPDATE THE SAME URL" accent={cyan}>
    <Title>同一個網址，也能持續更新</Title>
    <Steps>
      <Step>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <RouteNode index="01" label="Edit" color={cyan} />
          <Arrow color={cyan} />
          <RouteNode index="02" label="改一句" color={cyan} />
          <Arrow color={cyan} />
          <RouteNode index="03" label="Commit" color={mint} />
        </div>
      </Step>
      <Step>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            marginTop: 26,
          }}
        >
          <RouteNode index="04" label="等待" color={yellow} />
          <Arrow color={yellow} />
          <RouteNode index="05" label="重新整理" color={yellow} wide />
          <Arrow color={mint} />
          <RouteNode index="06" label="內容更新" color={mint} wide />
        </div>
      </Step>
      <Step>
        <div
          style={{
            width: 900,
            margin: '36px auto 0',
            padding: '26px 32px',
            borderRadius: 24,
            color: '#071723',
            background: mint,
            fontFamily: mono,
            fontSize: 34,
            fontWeight: 950,
            textAlign: 'center',
          }}
        >
          網址不變，內容更新。
        </div>
      </Step>
    </Steps>
  </PageShell>
);

const TriggerPill = ({ children, color = cyan }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      minHeight: 58,
      padding: '14px 20px',
      border: '1px solid rgba(169, 189, 201, 0.22)',
      borderLeft: `6px solid ${color}`,
      borderRadius: 16,
      color: white,
      background: 'rgba(13, 38, 53, 0.86)',
      fontSize: 26,
      fontWeight: 850,
    }}
  >
    {children}
  </div>
);

const GitAction = ({
  term,
  plain,
  index,
  color = mint,
}: {
  term: string;
  plain: string;
  index: string;
  color?: string;
}) => (
  <div
    style={{
      display: 'grid',
      minHeight: 178,
      padding: '24px 22px',
      border: '1px solid rgba(169, 189, 201, 0.22)',
      borderRadius: 22,
      background: 'rgba(13, 38, 53, 0.90)',
      textAlign: 'center',
    }}
  >
    <span style={{ color, fontFamily: mono, fontSize: 18, fontWeight: 950 }}>{index}</span>
    <span style={{ color, fontFamily: mono, fontSize: 29, fontWeight: 950 }}>{term}</span>
    <span style={{ color: muted, fontSize: 23, fontWeight: 750, lineHeight: 1.35 }}>{plain}</span>
  </div>
);

const ReadyLine = ({ children, color = mint }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '46px 1fr',
      alignItems: 'center',
      gap: 16,
      minHeight: 64,
      fontSize: 29,
      fontWeight: 800,
    }}
  >
    <span
      style={{
        display: 'grid',
        width: 42,
        height: 42,
        placeItems: 'center',
        borderRadius: 14,
        color: '#071723',
        background: color,
        fontFamily: mono,
        fontSize: 20,
        fontWeight: 950,
      }}
    >
      ✓
    </span>
    <span>{children}</span>
  </div>
);

const GateCard = ({
  index,
  title,
  note,
  color = mint,
}: {
  index: string;
  title: string;
  note: string;
  color?: string;
}) => (
  <div
    style={{
      minHeight: 190,
      padding: '28px 30px',
      border: '1px solid rgba(169, 189, 201, 0.24)',
      borderTop: `7px solid ${color}`,
      borderRadius: 22,
      background: 'rgba(13, 38, 53, 0.92)',
    }}
  >
    <div style={{ color, fontFamily: mono, fontSize: 19, fontWeight: 950 }}>GATE {index}</div>
    <div style={{ marginTop: 10, fontSize: 34, fontWeight: 950 }}>{title}</div>
    <div style={{ marginTop: 12, color: muted, fontSize: 25, fontWeight: 700, lineHeight: 1.4 }}>
      {note}
    </div>
  </div>
);

const StageCard = ({
  index,
  title,
  detail,
  color = mint,
}: {
  index: string;
  title: string;
  detail: string;
  color?: string;
}) => (
  <div
    style={{
      display: 'grid',
      minHeight: 108,
      gridTemplateColumns: '58px 1fr',
      alignItems: 'center',
      gap: 20,
      padding: '18px 22px',
      border: '1px solid rgba(169, 189, 201, 0.22)',
      borderRadius: 18,
      background: 'rgba(13, 38, 53, 0.90)',
    }}
  >
    <span
      style={{
        display: 'grid',
        width: 54,
        height: 54,
        placeItems: 'center',
        borderRadius: 16,
        color: '#071723',
        background: color,
        fontFamily: mono,
        fontSize: 19,
        fontWeight: 950,
      }}
    >
      {index}
    </span>
    <div>
      <div style={{ fontSize: 31, fontWeight: 950 }}>{title}</div>
      <div style={{ marginTop: 4, color: muted, fontSize: 23, fontWeight: 700 }}>{detail}</div>
    </div>
  </div>
);

const VideoCard = ({
  index,
  title,
  minutes,
  color = mint,
}: {
  index: string;
  title: string;
  minutes: string;
  color?: string;
}) => (
  <div
    style={{
      minHeight: 185,
      padding: '26px 24px',
      border: '1px solid rgba(169, 189, 201, 0.22)',
      borderRadius: 22,
      background: 'rgba(13, 38, 53, 0.90)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', color, fontFamily: mono }}>
      <span style={{ fontSize: 20, fontWeight: 950 }}>{index}</span>
      <span style={{ fontSize: 18, fontWeight: 850 }}>{minutes}</span>
    </div>
    <div style={{ marginTop: 34, fontSize: 30, fontWeight: 950, lineHeight: 1.3 }}>{title}</div>
  </div>
);

const LevelCard = ({
  level,
  title,
  children,
  color = mint,
  featured = false,
}: {
  level: string;
  title: string;
  children: ReactNode;
  color?: string;
  featured?: boolean;
}) => (
  <div
    style={{
      minHeight: featured ? 390 : 330,
      padding: '32px 34px',
      border: featured ? '3px solid #48f2c2' : '1px solid rgba(169, 189, 201, 0.24)',
      borderRadius: 26,
      background: featured ? 'rgba(72, 242, 194, 0.10)' : 'rgba(13, 38, 53, 0.90)',
      transform: featured ? 'translateY(-20px)' : 'translateY(0)',
    }}
  >
    <div style={{ color, fontFamily: mono, fontSize: 20, fontWeight: 950 }}>{level}</div>
    <div style={{ marginTop: 16, fontSize: featured ? 40 : 36, fontWeight: 950 }}>{title}</div>
    <div
      style={{
        display: 'grid',
        gap: 12,
        marginTop: 24,
        color: featured ? white : muted,
        fontSize: featured ? 27 : 25,
        fontWeight: 750,
        lineHeight: 1.4,
      }}
    >
      {children}
    </div>
  </div>
);

const ActionCard = ({
  index,
  title,
  color = mint,
}: {
  index: string;
  title: string;
  color?: string;
}) => (
  <div
    style={{
      display: 'grid',
      minHeight: 250,
      padding: '28px 24px',
      placeItems: 'center',
      border: '1px solid rgba(169, 189, 201, 0.22)',
      borderRadius: 24,
      color: '#fffdf7',
      background: 'rgba(13, 38, 53, 0.90)',
      textAlign: 'center',
    }}
  >
    <div
      style={{
        display: 'grid',
        width: 56,
        height: 56,
        placeItems: 'center',
        border: `3px solid ${color}`,
        borderRadius: '50%',
        color,
        fontFamily: mono,
        fontSize: 20,
        fontWeight: 950,
      }}
    >
      {index}
    </div>
    <div style={{ fontSize: 36, fontWeight: 950, lineHeight: 1.3 }}>{title}</div>
    <div style={{ color, fontFamily: mono, fontSize: 30 }}>○</div>
  </div>
);

const ResourceCard = ({
  hint,
  title,
  color = mint,
  href,
}: {
  hint: string;
  title: string;
  color?: string;
  href?: string;
}) => (
  <a
    href={href}
    target={href ? '_blank' : undefined}
    rel={href ? 'noreferrer' : undefined}
    style={{
      display: 'grid',
      minHeight: 252,
      padding: '20px 18px',
      placeItems: 'center',
      border: '1px solid rgba(169, 189, 201, 0.22)',
      borderTop: `6px solid ${color}`,
      borderRadius: 22,
      color: '#f7f5ec',
      background: 'rgba(13, 38, 53, 0.90)',
      textAlign: 'center',
      textDecoration: 'none',
    }}
  >
    <ImagePlaceholder hint={hint} width={150} height={150} />
    <div style={{ color, fontSize: 28, fontWeight: 900 }}>{title}</div>
  </a>
);

const _Slide26WhenAdvanced: Page = () => (
  <PageShell eyebrow="PART 3 · ANTIGRAVITY + GIT" accent={cyan} mood="blue">
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.72fr 1.28fr',
        alignItems: 'center',
        gap: 70,
      }}
    >
      <div>
        <MonoTag>WHEN TO LEVEL UP</MonoTag>
        <Title size={82} margin="30px 0 32px">
          網站變大，
          <br />
          就換一種更新方式。
        </Title>
        <FileBadge />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.72fr', gap: 28 }}>
        <WindowFrame title="your-name.github.io/" accent={cyan} height={560}>
          <div
            style={{
              display: 'grid',
              gap: 16,
              color: muted,
              fontFamily: mono,
              fontSize: 26,
              lineHeight: 1.45,
            }}
          >
            <div style={{ color: cyan }}>▾ website/</div>
            <div style={{ paddingLeft: 34, color: mint }}>◇ index.html</div>
            <div style={{ paddingLeft: 34 }}>◇ works.html</div>
            <div style={{ paddingLeft: 34 }}>◇ about.html</div>
            <div style={{ paddingLeft: 34, color: yellow }}>▾ assets/</div>
            <div style={{ paddingLeft: 68 }}>◇ profile.jpg</div>
            <div style={{ paddingLeft: 68 }}>◇ course.pdf</div>
          </div>
        </WindowFrame>
        <div style={{ display: 'grid', alignContent: 'center', gap: 16 }}>
          <TriggerPill>多個頁面</TriggerPill>
          <TriggerPill color={yellow}>圖片與附件</TriggerPill>
          <TriggerPill color={mint}>經常更新</TriggerPill>
          <TriggerPill color={coral}>需要版本紀錄</TriggerPill>
          <TriggerPill color={cyan}>不想整份重貼</TriggerPill>
        </div>
      </div>
    </div>
  </PageShell>
);
_Slide26WhenAdvanced.transition = sectionTransition;

const _Slide27GitActions: Page = () => (
  <PageShell eyebrow="03 · GIT IN PLAIN LANGUAGE" accent={mint}>
    <Title>Git：替網站留下可以回頭看的版本</Title>
    <Steps>
      <Step>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <GitAction index="01" term="Clone" plain="第一次帶回電腦" color={mint} />
          <Arrow color={mint} />
          <GitAction index="02" term="Status / Diff" plain="看這次改了什麼" color={cyan} />
          <Arrow color={cyan} />
          <GitAction index="03" term="Commit" plain="建立一個存檔點" color={yellow} />
        </div>
      </Step>
      <Step>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            marginTop: 30,
          }}
        >
          <GitAction index="04" term="Push" plain="把版本送上 GitHub" color={coral} />
          <Arrow color={coral} />
          <GitAction index="05" term="Pull" plain="先取得最新版本" color={mint} />
          <StatusChip color={muted}>不必背指令；要看懂動作</StatusChip>
        </div>
      </Step>
    </Steps>
  </PageShell>
);

const _Slide28AdvancedReady: Page = () => (
  <PageShell eyebrow="03 · READY, THEN REVIEW" accent={yellow}>
    <Title>進階示範先準備好，也要把權限關在正確範圍</Title>
    <Steps>
      <Step>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 34 }}>
          <BigCard title="準備 Ready" icon="✓" accent={mint}>
            <div style={{ display: 'grid', gap: 10 }}>
              <ReadyLine>Antigravity＋個人 Gmail</ReadyLine>
              <ReadyLine>已發布的 Repository</ReadyLine>
              <ReadyLine>可安裝軟體的權限</ReadyLine>
              <ReadyLine>專門的練習資料夾</ReadyLine>
            </div>
          </BigCard>
          <div />
        </div>
      </Step>
      <Step>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 34,
            marginTop: 28,
          }}
        >
          <div />
          <BigCard title="安全 Review" icon="!" accent={yellow}>
            <div style={{ display: 'grid', gap: 10 }}>
              <ReadyLine color={yellow}>先看計畫，再同意修改</ReadyLine>
              <ReadyLine color={yellow}>安裝前看方式與權限</ReadyLine>
              <ReadyLine color={yellow}>只開放課程資料夾</ReadyLine>
              <ReadyLine color={yellow}>完成後一定看 Diff</ReadyLine>
            </div>
          </BigCard>
        </div>
      </Step>
    </Steps>
    <div
      style={{ marginTop: 26, color: muted, fontSize: 28, fontWeight: 750, textAlign: 'center' }}
    >
      未安裝者先看示範；不在現場逐台停下來處理。
    </div>
  </PageShell>
);

const _Slide29InstallGit: Page = () => (
  <PageShell eyebrow="03 · ANTIGRAVITY SAFETY GATES" accent={cyan}>
    <Title margin="0 0 34px">先檢查 Git；說明清楚，才允許安裝</Title>
    <Steps>
      <Step>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <GateCard index="01" title="先檢查" note="執行 git --version" color={cyan} />
          <GateCard index="02" title="先說明" note="安裝方式、權限與改動" color={yellow} />
        </div>
      </Step>
      <Step>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 22,
            marginTop: 22,
          }}
        >
          <GateCard index="03" title="我確認" note="等我同意後再安裝" color={coral} />
          <GateCard index="04" title="再驗證" note="確認 Git，再 Clone 並列檔案" color={mint} />
        </div>
      </Step>
      <div
        style={{
          marginTop: 28,
          padding: '20px 26px',
          borderRadius: 18,
          color: '#071723',
          background: yellow,
          fontFamily: mono,
          fontSize: 30,
          fontWeight: 950,
          textAlign: 'center',
        }}
      >
        關鍵句：等我確認後再安裝。
      </div>
    </Steps>
  </PageShell>
);

const _Slide30AdvancedPipeline: Page = () => (
  <PageShell eyebrow="03 · REVIEW BEFORE PUSH" accent={mint}>
    <Title margin="0 0 34px">先讀、先預覽、先看差異，再送上 GitHub</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 34 }}>
      <Steps>
        <Step>
          <StageCard
            index="01"
            title="讀網站 → 提計畫"
            detail="新增 works.html 與首頁連結"
            color={mint}
          />
        </Step>
        <Step>
          <div style={{ marginTop: 14 }}>
            <StageCard
              index="02"
              title="預覽 → Status / Diff"
              detail="確認只改到預期檔案"
              color={cyan}
            />
          </div>
        </Step>
        <Step>
          <div style={{ marginTop: 14 }}>
            <StageCard
              index="03"
              title="Commit → Push"
              detail="Pages 以同一網址更新"
              color={yellow}
            />
          </div>
        </Step>
      </Steps>
      <WindowFrame title="git diff · works.html" accent={mint} height={515}>
        <div
          style={{
            display: 'grid',
            gap: 10,
            color: '#b8d8e9',
            fontFamily: mono,
            fontSize: 21,
            lineHeight: 1.45,
          }}
        >
          <div style={{ color: muted }}>@@ index.html</div>
          <div style={{ color: coral }}>- &lt;a href="#"&gt;作品&lt;/a&gt;</div>
          <div style={{ color: mint }}>+ &lt;a href="works.html"&gt;作品&lt;/a&gt;</div>
          <div style={{ color: muted, marginTop: 16 }}>@@ works.html</div>
          <div style={{ color: mint }}>+ &lt;h1&gt;我的教學作品&lt;/h1&gt;</div>
          <div style={{ color: mint }}>+ &lt;article&gt;課程一&lt;/article&gt;</div>
          <div style={{ color: mint }}>+ &lt;article&gt;課程二&lt;/article&gt;</div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 30,
            padding: '18px 20px',
            borderRadius: 14,
            color: mint,
            background: 'rgba(72, 242, 194, 0.08)',
            fontFamily: mono,
            fontSize: 20,
            fontWeight: 900,
          }}
        >
          <span>2 files changed</span>
          <span>reviewed ✓</span>
        </div>
      </WindowFrame>
    </div>
    <div style={{ marginTop: 22, color: muted, fontSize: 24, textAlign: 'center' }}>
      Commit 身分建議使用 Repository local 設定與 GitHub noreply Email。
    </div>
  </PageShell>
);

const _Slide31VideoPlaylist: Page = () => (
  <PageShell eyebrow="03 · LEARN AGAIN AT HOME" accent={cyan}>
    <Title>課後影片拆成四小段，比一支長影片更好複習</Title>
    <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 0.55fr', gap: 32 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <VideoCard index="01" title="安裝、登入與安全設定" minutes="5–8 MIN" color={mint} />
        <VideoCard index="02" title="Git 安裝與 GitHub 授權" minutes="5–8 MIN" color={cyan} />
        <VideoCard index="03" title="Clone、修改與看 Diff" minutes="5–8 MIN" color={yellow} />
        <VideoCard index="04" title="Commit、Push 與回復" minutes="5–8 MIN" color={coral} />
      </div>
      <div
        style={{
          display: 'grid',
          minHeight: 390,
          padding: '26px 22px',
          placeItems: 'center',
          border: '1px solid rgba(169, 189, 201, 0.22)',
          borderRadius: 24,
          background: 'rgba(13, 38, 53, 0.90)',
          textAlign: 'center',
        }}
      >
        <ImagePlaceholder hint="Antigravity 課後複習影片入口 QR Code" width={210} height={210} />
        <div style={{ color: cyan, fontSize: 28, fontWeight: 950 }}>課後影片入口</div>
        <StatusChip color={mint}>先試 git --version</StatusChip>
      </div>
    </div>
  </PageShell>
);

const _Slide32ExitLevels: Page = () => (
  <PageShell eyebrow="PART 4 · EXIT CHECK" accent={mint} mood="green">
    <Title>離場前，確認你完成到哪一級</Title>
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1.08fr 1fr', alignItems: 'end', gap: 26 }}
    >
      <LevelCard level="LEVEL 01" title="基本成功" color={cyan}>
        <div>✓ Canvas 看得到個人網頁</div>
      </LevelCard>
      <LevelCard level="LEVEL 02" title="今日目標" color={mint} featured>
        <div>✓ 根目錄有 index.html</div>
        <div>✓ Pages 網址能開啟</div>
        <div>✓ 已更新一次</div>
        <div>✓ 沒有公開個資</div>
      </LevelCard>
      <LevelCard level="LEVEL 03" title="進階挑戰" color={yellow}>
        <div>✓ 看懂 Clone → Diff → Commit → Push</div>
      </LevelCard>
    </div>
  </PageShell>
);
_Slide32ExitLevels.transition = sectionTransition;

const Slide33SevenDayAction: Page = () => (
  <PageShell eyebrow="04 · ONE SMALL NEXT STEP" accent={yellow}>
    <Title size={82}>七天內，只更新一件事</Title>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 22 }}>
      <ActionCard index="01" title="加一張作品卡" color={mint} />
      <ActionCard index="02" title="放一個教材連結" color={cyan} />
      <ActionCard index="03" title="補上教學理念" color={yellow} />
      <ActionCard index="04" title="錄一分鐘介紹" color={coral} />
      <ActionCard index="05" title="完成進階更新" color={mint} />
    </div>
    <div
      style={{ marginTop: 36, color: muted, fontSize: 34, fontWeight: 750, textAlign: 'center' }}
    >
      網站不是今天一次做完；而是從今天開始持續長大。
    </div>
  </PageShell>
);

const Slide34Closing: Page = () => (
  <PageShell eyebrow="04 · SHIP THE IDEA" accent={mint} mood="blue">
    <Steps>
      <Step>
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 68,
            fontWeight: 950,
            lineHeight: 1.2,
            letterSpacing: '-0.035em',
            textAlign: 'center',
          }}
        >
          說清楚想做什麼，
        </div>
      </Step>
      <Step>
        <div
          style={{
            marginTop: 12,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 68,
            fontWeight: 950,
            lineHeight: 1.2,
            letterSpacing: '-0.035em',
            textAlign: 'center',
          }}
        >
          看懂 AI 做了什麼，
        </div>
      </Step>
      <Step>
        <div
          style={{
            marginTop: 12,
            color: mint,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 74,
            fontWeight: 950,
            lineHeight: 1.2,
            letterSpacing: '-0.035em',
            textAlign: 'center',
          }}
        >
          把作品交到需要的人手上。
        </div>
      </Step>
      <Step>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20, marginTop: 46 }}
        >
          <ResourceCard hint="壽豐國中研習提示詞範本 QR Code" title="提示詞範本" color={mint} />
          <ResourceCard hint="GitHub Pages 圖解步驟 QR Code" title="Pages 圖解" color={cyan} />
          <ResourceCard hint="Antigravity 課後影片 QR Code" title="課後影片" color={yellow} />
          <ResourceCard
            hint="壽豐國中 AI 網頁製作複習影片 QR Code"
            title="複習影片"
            color={mint}
            href="https://youtu.be/8Nd71kGVfj8?si=7oDbbfV6nP3PXeck"
          />
          <ResourceCard hint="壽豐國中研習成果表單 QR Code" title="成果表單 · Q&A" color={coral} />
        </div>
      </Step>
    </Steps>
  </PageShell>
);
Slide34Closing.transition = sectionTransition;

export const meta: SlideMeta = {
  title: 'AI 協作開發｜壽豐國中',
  createdAt: '2026-07-15T15:46:25.071Z',
};

export default [
  Slide01Cover,
  Slide02WorkshopAgenda,
  Slide02Outcome,
  Slide03TwoRoutes,
  Slide05PublicSafety,
  Slide17AccountChapter,
  Slide17GithubSignup,
  Slide18GoogleLogin,
  Slide19AccountSetup,
  Slide20CreateRepository,
  Part01Practice,
  Slide22CanvasChapter,
  Slide22CanvasPrompt,
  Slide23DownloadAndUpload,
  Slide27ConfirmFilename,
  Part02Practice,
  Slide27UploadChapter,
  Slide21UploadFiles,
  Slide24UploadToRepository,
  Part03Practice,
  Slide28PublishChapter,
  Slide28OpenPagesSettings,
  Slide29PublishPages,
  Slide30FindSiteUrl,
  Slide32MoreExamples,
  Part04Practice,
  Slide36AntigravityChapter,
  Slide37CopyRepositoryUrl,
  Slide38CreateProjectFolder,
  Slide39SelectProjectFolder,
  Slide40DownloadRepository,
  Slide33SevenDayAction,
  Slide34Closing,
] satisfies Page[];
