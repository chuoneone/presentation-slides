import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';
import imgFourPanelComic from './assets/four-panel-comic.png';
import imgGeminiGemConsistent from './assets/gemini-gem-consistent.png';
import imgGoogleEduNoTraining from './assets/google-edu-no-training.png';
import imgHeadshot from './assets/headshot.png';
import imgMixerAiPrep from './assets/mixer-ai-prep.png';
import imgMixerShare from './assets/mixer-share.png';
import imgMixerTeaching from './assets/mixer-teaching.png';
import imgNotebookLMNoTraining from './assets/notebooklm-no-training.png';
import imgPracticeLinks from './assets/practice-links.png';
import imgSkill1 from './assets/skill1.png';
import imgSkill2 from './assets/skill2.png';
import imgSkill3 from './assets/skill3.png';
import imgUnsplashSports from './assets/unsplash-sports.png';
import imgWorkshopHomepage from './assets/workshop-homepage.png';
import imgWorkshopSearchResult from './assets/workshop-search-result.png';
import imgPromptRevise from './assets/加強我的提示詞.png';
import imgTool1 from './assets/工具一.png';
import imgTool3 from './assets/工具三.png';
import imgTool2 from './assets/工具二.png';
import imgTool2b from './assets/工具二-2.png';
import imgModeChatGPT from './assets/方式一：ChatGPT 生成圖像版學習單.png';
import imgModeGemini from './assets/方式二：Gemini Canvas 生成 HTML 仿 A4 學習單.png';
import imgZhuyin1 from './assets/注音一.png';
import imgTitleFullBleed from './assets/第一頁滿版.png';

// ==========================================
// 1. 設計系統與視覺 Tokens (符合 Warm Textbook 風格)
// ==========================================
export const design: DesignSystem = {
  palette: { bg: '#fdfbf7', text: '#1e293b', accent: '#0d9488' }, // 溫暖乳白底、深藍灰字、羽毛綠主調
  fonts: {
    display: "'Outfit', 'Noto Sans TC', system-ui, -apple-system, sans-serif",
    body: "'Inter', 'Noto Sans TC', system-ui, -apple-system, sans-serif",
  },
  typeScale: { hero: 150, body: 36 },
  radius: 16,
};

const colors = {
  bg: '#fdfbf7',
  text: '#1e293b',
  accent: '#0d9488',
  accentMuted: '#ccfbf1',
  orange: '#ea580c',
  orangeLight: '#ffedd5',
  border: '#e2e8f0',
  muted: '#64748b',
  white: '#ffffff',
} as const;

const uploadEntryUrl = 'https://padlet.com/pppchin7_1/1150707-87uoa6s4bcpxuzwp';

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'var(--osd-font-body)',
  color: colors.text,
  background: colors.bg,
  boxSizing: 'border-box',
  padding: '100px 120px 140px 120px',
  display: 'flex',
  flexDirection: 'column',
};

const keyframes = `
@keyframes textbook-fadeUp {
  from { opacity: 0; transform: translateY(15px); }
  to   { opacity: 1; transform: translateY(0); }
}
.es-fadeUp { 
  opacity: 0; 
  animation: textbook-fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
}
`;

// ==========================================
// 2. 溫馨教科書風格 Fixed 組件
// ==========================================

const TextbookBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'var(--osd-bg, #fdfbf7)',
      boxSizing: 'border-box',
      border: '16px solid #e2e8f0',
      overflow: 'hidden',
      zIndex: 1,
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px',
        opacity: 0.45,
        pointerEvents: 'none',
      }}
    />
    <style>{keyframes}</style>
  </div>
);

const TextbookHeader = ({
  title,
  subtitle,
  unit = '單元 1',
}: {
  title: ReactNode;
  subtitle?: string;
  unit?: string;
}) => (
  <div style={{ position: 'relative', zIndex: 2, marginBottom: 24 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          fontFamily: 'var(--osd-font-body)',
          fontSize: 22,
          color: 'var(--osd-accent)',
          letterSpacing: '0.12em',
          fontWeight: 700,
          background: '#ccfbf1',
          padding: '6px 16px',
          borderRadius: 6,
        }}
      >
        {unit}
      </span>
      {subtitle && (
        <span
          style={{
            fontFamily: 'var(--osd-font-body)',
            fontSize: 22,
            color: '#ea580c',
            fontWeight: 700,
            background: '#ffedd5',
            padding: '6px 16px',
            borderRadius: 6,
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: '65px',
        fontWeight: 800,
        color: 'var(--osd-text)',
        margin: '8px 0 0 0',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        textAlign: 'center',
      }}
    >
      {title}
    </h2>
    <div
      style={{
        height: 3,
        background: `linear-gradient(90deg, var(--osd-accent) 0%, #ccfbf1 70%, transparent 100%)`,
        marginTop: 8,
        borderRadius: 2,
      }}
    />
  </div>
);

const TextbookFooter = ({ subtitle = '生成式 AI 融入特教備課' }: { subtitle?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 45,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--osd-font-body)',
        fontSize: 20,
        color: '#64748b',
        borderTop: '2px dashed #e2e8f0',
        paddingTop: 14,
        zIndex: 2,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            display: 'inline-block',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--osd-accent)',
          }}
        />
        <span style={{ fontWeight: 600 }}>{subtitle}</span>
      </div>
      <div style={{ fontFamily: 'monospace', letterSpacing: '0.08em', fontWeight: 600 }}>
        PAGE{' '}
        <span style={{ color: 'var(--osd-accent)', fontSize: 22 }}>
          {String(current).padStart(2, '0')}
        </span>{' '}
        / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
};

const Panel = ({
  title,
  children,
  delay = 0,
  style,
}: {
  title?: string;
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) => (
  <div
    className="es-fadeUp"
    style={{
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: 'var(--osd-radius)',
      padding: '24px 32px',
      boxShadow: '0 8px 24px rgba(100, 116, 139, 0.04)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      animationDelay: `${delay}s`,
      zIndex: 2,
      position: 'relative',
      ...style,
      letterSpacing: '1px',
      lineHeight: '3',
    }}
  >
    {title && (
      <h3
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 50,
          color: 'var(--osd-accent)',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontWeight: 800,
        }}
      >
        {title}
      </h3>
    )}
    <div style={{ fontSize: 40, lineHeight: 1.5, color: 'var(--osd-text)' }}>{children}</div>
  </div>
);

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

const InstagramIcon = () => (
  <svg width="92" height="92" viewBox="0 0 92 92" role="img" aria-label="Instagram">
    <rect
      x="16"
      y="16"
      width="60"
      height="60"
      rx="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
    />
    <circle cx="46" cy="46" r="15" fill="none" stroke="currentColor" strokeWidth="7" />
    <circle cx="62" cy="30" r="5" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="92" height="92" viewBox="0 0 92 92" role="img" aria-label="Facebook">
    <path
      d="M54 31h11V17H52c-15 0-23 9-23 24v8H18v15h11v24h17V64h14l3-15H46v-7c0-7 3-11 8-11Z"
      fill="currentColor"
    />
  </svg>
);

const ThreadsIcon = () => (
  <svg width="92" height="92" viewBox="0 0 92 92" role="img" aria-label="Threads">
    <path
      d="M47 14c19 0 31 12 31 32 0 21-13 32-32 32-18 0-32-12-32-32 0-19 12-32 33-32Zm-1 16c-10 0-16 6-16 16 0 11 6 17 16 17 8 0 14-4 14-10 0-5-4-8-11-8h-9v10h8c3 0 5 1 5 3s-3 4-7 4c-8 0-13-6-13-16 0-9 5-15 13-15 6 0 10 2 13 7l8-5c-5-7-11-10-21-10Z"
      fill="currentColor"
    />
  </svg>
);

const SocialLinkCard = ({
  href,
  label,
  handle,
  children,
  icon,
  color,
  delay,
}: {
  href: string;
  label: string;
  handle: string;
  children: ReactNode;
  icon: ReactNode;
  color: string;
  delay: number;
}) => (
  <a
    className="es-fadeUp"
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={`開啟米克師 ${label}`}
    style={{
      animationDelay: `${delay}s`,
      display: 'grid',
      gridTemplateColumns: '128px 1fr',
      gap: 26,
      alignItems: 'center',
      minHeight: 172,
      background: colors.white,
      border: '2px solid #e2e8f0',
      borderRadius: 24,
      padding: '28px 34px',
      color: colors.text,
      textDecoration: 'none',
      boxShadow: '0 18px 44px rgba(15, 23, 42, 0.09)',
    }}
  >
    <div
      style={{
        width: 118,
        height: 118,
        borderRadius: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.white,
        background: color,
        boxShadow: `0 18px 36px ${color}33`,
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '44px',
          fontWeight: 900,
          lineHeight: 1.08,
          color: colors.text,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: '30px', color, fontWeight: 850, lineHeight: 1.18 }}>{handle}</div>
      <div style={{ fontSize: '26px', color: colors.muted, fontWeight: 650, lineHeight: 1.34 }}>
        {children}
      </div>
    </div>
  </a>
);

const MixerSiteCard = ({
  href,
  label,
  screenshot,
  screenshotAlt,
  title,
  children,
  delay,
  accent = colors.accent,
}: {
  href: string;
  label: string;
  screenshot: string;
  screenshotAlt: string;
  title: string;
  children: ReactNode;
  delay: number;
  accent?: string;
}) => (
  <a
    className="es-fadeUp"
    href={href}
    target="_blank"
    rel="noreferrer"
    style={{
      animationDelay: `${delay}s`,
      background: colors.white,
      border: `3px solid ${accent === colors.accent ? '#99f6e4' : '#fed7aa'}`,
      borderRadius: 22,
      padding: 0,
      minHeight: 0,
      color: colors.text,
      textDecoration: 'none',
      boxShadow: '0 20px 46px rgba(15, 23, 42, 0.09)',
      display: 'grid',
      gridTemplateRows: '250px 1fr',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        background: '#f8fafc',
        borderBottom: '2px solid #e2e8f0',
        overflow: 'hidden',
        minHeight: 0,
      }}
    >
      <img
        src={screenshot}
        alt={screenshotAlt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '50% 0%',
          display: 'block',
        }}
      />
    </div>
    <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr auto', gap: 12, padding: 24 }}>
      <div
        style={{
          width: 'fit-content',
          background: accent === colors.accent ? colors.accentMuted : colors.orangeLight,
          color: accent,
          borderRadius: 10,
          padding: '6px 14px',
          fontSize: '22px',
          fontWeight: 950,
        }}
      >
        {label}
      </div>
      <h3
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: '42px',
          lineHeight: 1.08,
          fontWeight: 950,
          color: colors.text,
        }}
      >
        {title}
      </h3>
      <div style={{ fontSize: '27px', lineHeight: 1.36, color: colors.muted, fontWeight: 680 }}>
        {children}
      </div>
      <div
        style={{
          color: accent,
          background: accent === colors.accent ? '#f0fdfa' : '#fff7ed',
          borderRadius: 10,
          padding: '12px 14px',
          fontSize: '20px',
          lineHeight: 1.18,
          fontWeight: 850,
          overflowWrap: 'anywhere',
        }}
      >
        {href}
      </div>
    </div>
  </a>
);

const Unit2Card = ({
  num,
  title,
  children,
  delay,
  accent = colors.accent,
  style,
}: {
  num?: string;
  title: string;
  children: ReactNode;
  delay: number;
  accent?: string;
  style?: CSSProperties;
}) => (
  <div
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background:
        accent === colors.accent
          ? 'linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%)'
          : 'linear-gradient(180deg, #ffffff 0%, #fff7ed 100%)',
      border: `2px solid ${accent === colors.accent ? '#99f6e4' : '#fed7aa'}`,
      borderRadius: 22,
      padding: '28px 30px',
      boxShadow: '0 18px 42px rgba(15, 23, 42, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      minHeight: 0,
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 9,
        background: accent,
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {num && (
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 16,
            background: accent === colors.accent ? colors.accentMuted : colors.orangeLight,
            color: accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--osd-font-display)',
            fontSize: '28px',
            fontWeight: 950,
            flexShrink: 0,
          }}
        >
          {num}
        </div>
      )}
      <h3
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: '39px',
          fontWeight: 920,
          color: colors.text,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h3>
    </div>
    <div style={{ fontSize: '34px', lineHeight: 1.45, color: colors.text, fontWeight: 560 }}>
      {children}
    </div>
  </div>
);

const UploadEntryLink = ({
  delay = 0,
  compact = false,
  style,
}: {
  delay?: number;
  compact?: boolean;
  style?: CSSProperties;
}) => (
  <a
    className="es-fadeUp"
    href={uploadEntryUrl}
    target="_blank"
    rel="noreferrer"
    style={{
      animationDelay: `${delay}s`,
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'center',
      gap: compact ? 12 : 18,
      background: colors.text,
      color: colors.white,
      border: '2px solid rgba(255, 255, 255, 0.16)',
      borderRadius: compact ? 16 : 22,
      padding: compact ? '16px 18px' : '24px 30px',
      textDecoration: 'none',
      boxShadow: '0 18px 38px rgba(15, 23, 42, 0.18)',
      minWidth: 0,
      ...style,
    }}
  >
    <span
      style={{
        background: colors.orange,
        color: colors.white,
        borderRadius: compact ? 12 : 16,
        padding: compact ? '7px 11px' : '10px 16px',
        fontSize: compact ? '22px' : '28px',
        fontWeight: 950,
        whiteSpace: 'nowrap',
      }}
    >
      上傳入口
    </span>
    <span
      style={{
        fontSize: compact ? '21px' : '30px',
        lineHeight: 1.2,
        fontWeight: 800,
        overflowWrap: 'anywhere',
      }}
    >
      {uploadEntryUrl}
    </span>
  </a>
);

const PracticeHeaderPage = ({ num, title, desc }: { num: string; title: string; desc: string }) => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center' }}>
    <TextbookBg />
    <div
      style={{
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '1540px',
      }}
    >
      <div
        style={{
          fontSize: '32px',
          fontFamily: 'var(--osd-font-display)',
          fontWeight: 950,
          color: colors.orange,
          background: colors.orangeLight,
          padding: '10px 24px',
          borderRadius: '10px',
          marginBottom: '26px',
        }}
      >
        實作{num}
      </div>
      <h2
        style={{
          fontSize: '132px',
          fontWeight: 900,
          color: colors.text,
          margin: '0 0 18px 0',
          letterSpacing: 0,
          lineHeight: 1.08,
          maxWidth: '1540px',
        }}
      >
        實作{num}
      </h2>
      <p
        style={{
          fontSize: '42px',
          color: colors.text,
          fontWeight: 850,
          lineHeight: 1.28,
          margin: 0,
        }}
      >
        {title}
      </p>
      <p style={{ fontSize: '34px', color: colors.muted, lineHeight: 1.38, margin: '14px 0 0 0' }}>
        {desc}
      </p>
      <UploadEntryLink delay={0.15} style={{ width: 1180, marginTop: 44 }} />
    </div>
  </div>
);

const AdminDocCard = ({
  num,
  title,
  accent,
  children,
  delay = 0,
}: {
  num: string;
  title: string;
  accent: string;
  children: ReactNode;
  delay?: number;
}) => (
  <div
    className="es-fadeUp"
    style={{
      background: colors.white,
      border: '2px solid #e2e8f0',
      borderTop: `12px solid ${accent}`,
      borderRadius: 22,
      padding: '34px 38px',
      minHeight: 350,
      display: 'flex',
      flexDirection: 'column',
      gap: 26,
      boxShadow: '0 18px 42px rgba(15, 23, 42, 0.09)',
      animationDelay: `${delay}s`,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <div
        style={{
          width: 74,
          height: 74,
          borderRadius: 18,
          background: accent,
          color: colors.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 30,
          fontWeight: 950,
          fontFamily: 'var(--osd-font-display)',
        }}
      >
        {num}
      </div>
      <h3
        style={{
          margin: 0,
          fontSize: 56,
          lineHeight: 1.1,
          fontWeight: 900,
          color: colors.text,
          fontFamily: 'var(--osd-font-display)',
        }}
      >
        {title}
      </h3>
    </div>
    <div style={{ fontSize: 38, lineHeight: 1.45, color: colors.text, fontWeight: 650 }}>
      {children}
    </div>
  </div>
);

// 大章節過渡頁版型
const PartHeaderPage = ({
  partNum,
  title,
  desc,
}: {
  partNum: string;
  title: string;
  desc: string;
}) => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center' }}>
    <TextbookBg />
    <div
      style={{
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '1600px',
      }}
    >
      <div
        style={{
          fontSize: '28px',
          fontFamily: 'var(--osd-font-display)',
          fontWeight: 900,
          color: colors.orange,
          background: colors.orangeLight,
          padding: '8px 24px',
          borderRadius: '8px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '24px',
        }}
      >
        PART {partNum}
      </div>
      <h2
        style={{
          fontSize: '102px',
          fontWeight: 800,
          color: colors.text,
          margin: '0 0 20px 0',
          letterSpacing: 0,
          whiteSpace: 'pre-line',
          lineHeight: 1.08,
          maxWidth: '1600px',
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: '40px', color: colors.muted, lineHeight: 1.4 }}>{desc}</p>
    </div>
  </div>
);

// Agenda 卡片組件 (台日美感教科書風格)
const _AgendaCard = ({
  num,
  unit,
  title,
  children,
  delay = 0,
}: {
  num: string;
  unit: string;
  title: string;
  children: ReactNode;
  delay?: number;
}) => (
  <div
    className="es-fadeUp"
    style={{
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: 'var(--osd-radius)',
      padding: '20px 28px',
      boxShadow: '0 8px 24px rgba(100, 116, 139, 0.03)',
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      animationDelay: `${delay}s`,
      zIndex: 2,
      position: 'relative',
    }}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '66px',
          fontWeight: 900,
          color: colors.accent,
          lineHeight: 1,
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontSize: '18px',
          fontWeight: 800,
          color: colors.orange,
          background: colors.orangeLight,
          padding: '3px 8px',
          borderRadius: '4px',
          marginTop: '6px',
          whiteSpace: 'nowrap',
        }}
      >
        {unit}
      </span>
    </div>
    <div style={{ width: '2px', alignSelf: 'stretch', background: '#e2e8f0' }} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <h4 style={{ fontSize: '32px', fontWeight: 900, color: colors.text, margin: 0 }}>{title}</h4>
      <p style={{ fontSize: '28px', color: colors.muted, margin: 0, lineHeight: 1.4 }}>
        {children}
      </p>
    </div>
  </div>
);

const OutlineCard = ({
  num,
  title,
  children,
  accent = colors.accent,
  delay = 0,
}: {
  num: string;
  title: string;
  children: ReactNode;
  accent?: string;
  delay?: number;
}) => (
  <div
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: colors.white,
      border: '2px solid #e2e8f0',
      borderLeft: `10px solid ${accent}`,
      borderRadius: 16,
      padding: '18px 22px',
      minHeight: 142,
      display: 'grid',
      gridTemplateColumns: '76px 1fr',
      gap: 18,
      alignItems: 'center',
      boxShadow: '0 12px 28px rgba(15, 23, 42, 0.06)',
    }}
  >
    <div
      style={{
        width: 68,
        height: 68,
        borderRadius: 16,
        background: accent === colors.orange ? colors.orangeLight : colors.accentMuted,
        color: accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 28,
        fontWeight: 950,
      }}
    >
      {num}
    </div>
    <div style={{ minWidth: 0 }}>
      <div
        style={{
          fontSize: 32,
          fontWeight: 900,
          color: colors.text,
          lineHeight: 1.18,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 24, color: colors.muted, lineHeight: 1.32, fontWeight: 650 }}>
        {children}
      </div>
    </div>
  </div>
);

// ==========================================
// 3. 投影片頁面定義 (Slide 01 - 35)
// ==========================================

// Slide 1: 標題頁
const Slide01_Title: Page = () => (
  <div style={{ ...fill, padding: 0, background: '#f8fafc' }}>
    <img
      src={imgTitleFullBleed}
      alt="生成式 AI × 特殊教育備課滿版背景"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '64%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        fontFamily: 'var(--osd-font-display)',
        fontSize: '46px',
        fontWeight: 800,
        color: '#334155',
        textShadow: '0 2px 12px rgba(255, 255, 255, 0.88)',
        letterSpacing: 0,
        whiteSpace: 'nowrap',
      }}
    >
      朱旆誼(米克師)
    </div>
  </div>
);

// Slide 2: 講師介紹
const Slide02_Speaker: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="介紹" subtitle="關於我" unit="單元 1" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.82fr 1.18fr',
        gap: 36,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        alignItems: 'stretch',
        paddingBottom: 20,
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.1s',
          background: colors.white,
          border: '2px solid #e2e8f0',
          borderRadius: 24,
          padding: '30px 34px',
          boxShadow: '0 18px 42px rgba(15, 23, 42, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 22,
          minHeight: 0,
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 48,
            lineHeight: 1.08,
            fontWeight: 900,
            color: colors.accent,
            margin: 0,
          }}
        >
          朱旆誼 (米克師)
        </h3>
        <div
          style={{
            width: 430,
            height: 430,
            borderRadius: '50%',
            padding: '10px',
            background: '#ffffff',
            border: '8px solid #f97316',
            boxShadow: '0 24px 52px rgba(249, 115, 22, 0.22)',
            overflow: 'hidden',
            fontSize: 0,
            lineHeight: 0,
          }}
        >
          <img
            src={imgHeadshot}
            alt="朱旆誼（米克師）大頭照"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: '50% 42%',
              display: 'block',
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '1.04fr 0.86fr',
          gap: 20,
          minHeight: 0,
        }}
      >
        <div
          className="es-fadeUp"
          style={{
            animationDelay: '0.2s',
            background: colors.white,
            border: '2px solid #e2e8f0',
            borderRadius: 24,
            padding: '24px 30px',
            boxShadow: '0 18px 42px rgba(15, 23, 42, 0.08)',
            minHeight: 0,
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 44,
              lineHeight: 1.1,
              fontWeight: 900,
              color: colors.accent,
              margin: '0 0 14px 0',
            }}
          >
            學歷
          </h3>
          <ul
            style={{
              paddingLeft: '20px',
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '30px',
              lineHeight: '1.42',
              color: colors.text,
            }}
          >
            <li>
              <strong>國立彰化師範大學</strong> 特殊教育學系（資訊工程輔系）
            </li>
            <li>
              <strong>國立東華大學</strong> 資訊管理所
            </li>
            <li>
              <strong>國立台灣師範大學</strong> 資訊教育學系博士班（就讀中）
            </li>
          </ul>
        </div>
        <div
          className="es-fadeUp"
          style={{
            animationDelay: '0.35s',
            background: colors.white,
            border: '2px solid #e2e8f0',
            borderRadius: 24,
            padding: '24px 30px',
            boxShadow: '0 18px 42px rgba(15, 23, 42, 0.08)',
            minHeight: 0,
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 44,
              lineHeight: 1.1,
              fontWeight: 900,
              color: colors.accent,
              margin: '0 0 14px 0',
            }}
          >
            經歷
          </h3>
          <ul
            style={{
              paddingLeft: '20px',
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '30px',
              lineHeight: '1.42',
              color: colors.text,
            }}
          >
            <li>
              <strong>花蓮縣平和國中</strong> 資源班教師（兼巡迴支援）
            </li>
            <li>
              <strong>宜蘭縣凱旋國中</strong> 資源班教師
            </li>
          </ul>
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="第一部分：AI心法" />
  </div>
);

const WorkshopStepCard = ({
  num,
  title,
  children,
  delay,
  accent = colors.accent,
}: {
  num: string;
  title: string;
  children: ReactNode;
  delay: number;
  accent?: string;
}) => (
  <div
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      display: 'grid',
      gridTemplateColumns: '82px 1fr',
      gap: 22,
      alignItems: 'start',
      background: colors.white,
      border: `2px solid ${accent === colors.accent ? '#99f6e4' : '#fed7aa'}`,
      borderRadius: 20,
      padding: '24px 28px',
      boxShadow: '0 16px 34px rgba(15, 23, 42, 0.08)',
    }}
  >
    <div
      style={{
        width: 68,
        height: 68,
        borderRadius: 18,
        background: accent === colors.accent ? colors.accentMuted : colors.orangeLight,
        color: accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 34,
        fontWeight: 950,
        fontFamily: 'var(--osd-font-display)',
      }}
    >
      {num}
    </div>
    <div>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 38,
          lineHeight: 1.12,
          fontWeight: 950,
          color: colors.text,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 29, lineHeight: 1.36, fontWeight: 720, color: colors.muted }}>
        {children}
      </div>
    </div>
  </div>
);

const Slide02a_WorkshopSlides: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="本日研習簡報" subtitle="開啟今日簡報" unit="單元 1" />
    <div
      style={{
        zIndex: 2,
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '0.86fr 1.14fr',
        gap: 34,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      <div style={{ display: 'grid', gap: 18, alignContent: 'center', minHeight: 0 }}>
        <WorkshopStepCard num="01" title="搜尋「米克師」" delay={0.1}>
          點擊搜尋結果中的「米克師｜AI備課幫手」，進入備課平台。
        </WorkshopStepCard>
        <WorkshopStepCard
          num="02"
          title="點選右上角「研習簡報」"
          delay={0.2}
          accent={colors.orange}
        >
          進入首頁後，看右上方導覽列，按下「研習簡報」。
        </WorkshopStepCard>
        <WorkshopStepCard num="03" title="輸入今日密碼" delay={0.3}>
          輸入 <strong style={{ color: colors.orange, fontSize: 36 }}>1150707</strong>
          ，即可看到今日研習簡報。
        </WorkshopStepCard>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '0.72fr 1.28fr',
          gap: 20,
          minHeight: 0,
        }}
      >
        <div
          className="es-fadeUp"
          style={{
            animationDelay: '0.15s',
            background: colors.white,
            border: '2px solid #dbe4ee',
            borderRadius: 18,
            padding: 16,
            boxShadow: '0 18px 38px rgba(15, 23, 42, 0.08)',
            overflow: 'hidden',
          }}
        >
          <img
            src={imgWorkshopSearchResult}
            alt="搜尋米克師並點擊 AI 備課幫手"
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </div>
        <div
          className="es-fadeUp"
          style={{
            animationDelay: '0.25s',
            background: colors.white,
            border: '2px solid #dbe4ee',
            borderRadius: 18,
            padding: 16,
            boxShadow: '0 18px 38px rgba(15, 23, 42, 0.08)',
            overflow: 'hidden',
          }}
        >
          <img
            src={imgWorkshopHomepage}
            alt="米克師 AI 備課幫手首頁右上角研習簡報"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              objectPosition: '50% 50%',
              objectViewBox: 'inset(0% 0% 46.21% 34.55%)',
            }}
          />
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="第一部分：AI心法" />
  </div>
);

// Slide 2c: 社群入口
const Slide02c_Social: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="追蹤米克師社群" subtitle="社群入口" unit="單元 1" />
    <div
      style={{
        zIndex: 2,
        flex: 1,
        width: '100%',
        maxWidth: 1580,
        alignSelf: 'center',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 28,
        alignItems: 'center',
        minHeight: 0,
      }}
    >
      <SocialLinkCard
        href={socialUrls.instagram}
        label="Instagram"
        handle="@spedmix2025"
        icon={<InstagramIcon />}
        color="#d62976"
        delay={0.1}
      >
        點擊前往
      </SocialLinkCard>
      <SocialLinkCard
        href={socialUrls.facebook}
        label="Facebook"
        handle="米克師"
        icon={<FacebookIcon />}
        color="#1877f2"
        delay={0.2}
      >
        點擊前往
      </SocialLinkCard>
      <SocialLinkCard
        href={socialUrls.threads}
        label="Threads"
        handle="@spedmix2025"
        icon={<ThreadsIcon />}
        color="#111827"
        delay={0.3}
      >
        點擊前往
      </SocialLinkCard>
    </div>
    <TextbookFooter subtitle="第一部分：AI心法" />
  </div>
);

// Slide 2b: 研習大綱
const Slide02b_Outline: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="今日研習大綱" subtitle="六個單元" unit="單元 1" />
    <div
      style={{
        zIndex: 2,
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18,
        alignContent: 'center',
        minHeight: 0,
      }}
    >
      <OutlineCard num="01" title="單元一：AI心法" delay={0.05}>
        特教老師的 AI 焦慮、工作模式與健康心態
      </OutlineCard>
      <OutlineCard num="02" title="單元二：AI應用於行政文書" accent={colors.orange} delay={0.1}>
        IEP 目標、課程計畫與教材改編快速生成
      </OutlineCard>
      <OutlineCard num="03" title="單元三：快速簡化與精準調整" delay={0.15}>
        從一鍵產生第一版到提示詞精準微調
      </OutlineCard>
      <OutlineCard num="04" title="單元四：網頁教材實戰" accent={colors.orange} delay={0.2}>
        互動工具製作、圖片解法、網頁排版
      </OutlineCard>
      <OutlineCard num="05" title="單元五：自製工具管理" delay={0.25}>
        一鍵自製資源傳送門，GitHub Pages 免費發佈
      </OutlineCard>
      <OutlineCard
        num="06"
        title="單元六：AI倫理和 Agent 小介紹"
        accent={colors.orange}
        delay={0.3}
      >
        特教倫理、資料隱私與 AI Agent 工具層次
      </OutlineCard>
    </div>
    <TextbookFooter subtitle="第一部分：AI心法" />
  </div>
);

// Slide 2 (disabled): 聽眾起點行為
const _Slide02_Stats: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="今天工作坊對象？" subtitle="聽眾起點行為" unit="單元 1" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: 32,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22, minHeight: 0 }}>
        <Panel title="AI 工具使用經驗" delay={0.1} style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ fontSize: '40px', color: '#000000', lineHeight: 1.15 }}>{''}</div>
            <div style={{ fontSize: '40px', lineHeight: 1.45, color: colors.text }}>
              都用過 Gemini。
              <br />
              多數老師均用過 ChatGPT 與 Claude。
            </div>
          </div>
        </Panel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          <Panel title="教材改寫經驗" delay={0.25}>
            <span style={{ fontSize: '38px', lineHeight: 1.45 }}>
              全員皆有用 AI 改寫教材的經驗。
            </span>
          </Panel>
          <Panel title="AI 熟練度" delay={0.35}>
            <span style={{ fontSize: '38px', lineHeight: 1.45 }}>
              具備基本觀念，針對實務與痛點突破。
            </span>
          </Panel>
        </div>
      </div>
      <Panel title="老師們的核心痛點" delay={0.45} style={{ justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              background: colors.orangeLight,
              border: '2px solid #fed7aa',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <div
              style={{ fontSize: '46px', fontWeight: 900, color: colors.orange, lineHeight: 1.2 }}
            >
              時間有限、功能不熟
            </div>
            <p style={{ margin: '12px 0 0 0', fontSize: '38px', lineHeight: 1.45 }}>
              想使用 AI，卻不知如何順利完成。
            </p>
          </div>
          <div
            style={{
              background: '#ecfeff',
              border: '2px solid #a5f3fc',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <div
              style={{ fontSize: '46px', fontWeight: 900, color: colors.accent, lineHeight: 1.2 }}
            >
              今日目標
            </div>
            <p style={{ margin: '12px 0 0 0', fontSize: '38px', lineHeight: 1.45 }}>
              直接練習生成流程，把時間省下來！
            </p>
          </div>
        </div>
      </Panel>
    </div>
    <TextbookFooter subtitle="第一部分：AI心法" />
  </div>
);

const NeedRankCard = ({
  rank,
  topic,
  description,
  delay,
}: {
  rank: string;
  topic: string;
  description: string;
  delay: number;
}) => (
  <Panel
    delay={delay}
    style={{
      height: '100%',
      minHeight: 0,
      padding: '22px 30px',
      justifyContent: 'center',
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '34px',
          color: 'var(--osd-accent)',
          margin: 0,
          fontWeight: 900,
          lineHeight: 1.1,
        }}
      >
        {rank}
      </div>
      <div style={{ color: colors.text, fontSize: '40px', fontWeight: 850, lineHeight: 1.28 }}>
        {topic}
      </div>
      <div style={{ fontSize: '40px', color: colors.muted, lineHeight: 1.38, fontWeight: 500 }}>
        {description}
      </div>
    </div>
  </Panel>
);

const SkillFlowShot = ({
  src,
  alt,
  delay,
  style,
}: {
  src: string;
  alt: string;
  delay: number;
  style: CSSProperties;
}) => (
  <div
    className="es-fadeUp"
    style={{
      position: 'absolute',
      zIndex: 2,
      background: colors.white,
      border: '2px solid #dbe7ee',
      borderRadius: 18,
      boxShadow: '0 18px 44px rgba(15, 23, 42, 0.12)',
      padding: 12,
      boxSizing: 'border-box',
      overflow: 'hidden',
      animationDelay: `${delay}s`,
      ...style,
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'contain',
        borderRadius: 10,
      }}
    />
  </div>
);

const SubjectToolCard = ({
  num,
  title,
  children,
  note,
  href,
  delay,
  accent = colors.accent,
}: {
  num: string;
  title: string;
  children: ReactNode;
  note: string;
  href?: string;
  delay: number;
  accent?: string;
}) => {
  const cardStyle: CSSProperties = {
    animationDelay: `${delay}s`,
    background: colors.white,
    border: `2px solid ${accent === colors.accent ? '#99f6e4' : '#fed7aa'}`,
    borderRadius: 16,
    padding: '24px 28px',
    boxShadow: '0 16px 36px rgba(15, 23, 42, 0.08)',
    display: 'grid',
    gridTemplateColumns: '84px 1fr',
    gap: 22,
    alignItems: 'start',
    alignSelf: 'center',
    minHeight: 0,
    color: 'inherit',
    textDecoration: 'none',
  };

  const content = (
    <>
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 18,
          background: accent === colors.accent ? colors.accentMuted : colors.orangeLight,
          color: accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '34px',
          fontWeight: 900,
          fontFamily: 'var(--osd-font-display)',
        }}
      >
        {num}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '38px',
            fontWeight: 900,
            color: colors.text,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: '28px', color: colors.text, lineHeight: 1.42, fontWeight: 650 }}>
          {children}
        </div>
        {href ? (
          <div
            style={{
              fontSize: '21px',
              color: accent,
              lineHeight: 1.25,
              fontWeight: 850,
              overflowWrap: 'anywhere',
            }}
          >
            {href}
          </div>
        ) : null}
        {note ? (
          <div style={{ fontSize: '24px', color: colors.muted, lineHeight: 1.35 }}>{note}</div>
        ) : null}
      </div>
    </>
  );

  if (href) {
    return (
      <a className="es-fadeUp" href={href} rel="noreferrer" style={cardStyle} target="_blank">
        {content}
      </a>
    );
  }

  return (
    <div className="es-fadeUp" style={cardStyle}>
      {content}
    </div>
  );
};

const WorkshopPainCard = ({
  label,
  title,
  children,
  delay,
}: {
  label: string;
  title: string;
  children: ReactNode;
  delay: number;
}) => (
  <div
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: colors.white,
      border: '2px solid #e2e8f0',
      borderRadius: 14,
      padding: '20px 22px',
      boxShadow: '0 12px 28px rgba(15, 23, 42, 0.06)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      minHeight: 0,
    }}
  >
    <div
      style={{
        width: 'fit-content',
        background: colors.orangeLight,
        color: colors.orange,
        borderRadius: 8,
        padding: '6px 12px',
        fontSize: '23px',
        fontWeight: 900,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: '33px',
        fontWeight: 900,
        color: colors.text,
        lineHeight: 1.12,
      }}
    >
      {title}
    </div>
    <div style={{ fontSize: '27px', lineHeight: 1.35, color: colors.muted, fontWeight: 650 }}>
      {children}
    </div>
  </div>
);

const ToolScreenshotFrame = ({
  label,
  children,
  delay,
  style,
}: {
  label: string;
  children: ReactNode;
  delay: number;
  style?: CSSProperties;
}) => (
  <div
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: '#ffffff',
      border: '1px solid rgba(13, 148, 136, 0.22)',
      borderRadius: 24,
      boxShadow: '0 24px 60px rgba(15, 23, 42, 0.14)',
      overflow: 'hidden',
      minHeight: 0,
      display: 'grid',
      gridTemplateRows: '50px 1fr',
      ...style,
    }}
  >
    <div
      style={{
        background: 'linear-gradient(90deg, #0f766e 0%, #0d9488 52%, #155e75 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 22px',
        fontSize: '24px',
        fontWeight: 900,
        letterSpacing: '0.02em',
      }}
    >
      {label}
    </div>
    <div
      style={{
        padding: 16,
        background:
          'linear-gradient(180deg, rgba(204, 251, 241, 0.22) 0%, rgba(255, 255, 255, 0.96) 42%, #ffffff 100%)',
        minHeight: 0,
      }}
    >
      {children}
    </div>
  </div>
);

const ToolBullet = ({
  num,
  title,
  children,
  delay,
  accent = colors.accent,
}: {
  num: string;
  title: string;
  children: ReactNode;
  delay: number;
  accent?: string;
}) => (
  <div
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      display: 'grid',
      gridTemplateColumns: '56px 1fr',
      gap: 14,
      alignItems: 'start',
      background: 'linear-gradient(90deg, #ffffff 0%, #f8fafc 100%)',
      border: '1px solid #dbe7ee',
      borderLeft: `8px solid ${accent}`,
      borderRadius: 18,
      padding: '16px 18px 16px 12px',
      boxShadow: '0 12px 28px rgba(15, 23, 42, 0.07)',
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 999,
        background: '#ffffff',
        color: accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        fontWeight: 900,
        fontFamily: 'var(--osd-font-display)',
        border: `2px solid ${accent === colors.accent ? colors.accentMuted : colors.orangeLight}`,
        boxShadow: 'inset 0 0 0 4px rgba(255, 255, 255, 0.82)',
      }}
    >
      {num}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        style={{
          fontSize: '28px',
          fontWeight: 900,
          color: colors.text,
          lineHeight: 1.18,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: '23px', lineHeight: 1.34, color: colors.muted, fontWeight: 650 }}>
        {children}
      </div>
    </div>
  </div>
);

const FeaturePromptCard = ({
  label,
  title,
  prompt,
  children,
  delay,
  accent = colors.accent,
  style,
}: {
  label: string;
  title: string;
  prompt: string;
  children: ReactNode;
  delay: number;
  accent?: string;
  style?: CSSProperties;
}) => (
  <div
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: colors.white,
      border: `2px solid ${accent === colors.accent ? '#99f6e4' : '#fed7aa'}`,
      borderRadius: 16,
      padding: '14px 20px',
      boxShadow: '0 16px 34px rgba(15, 23, 42, 0.08)',
      display: 'grid',
      gridTemplateColumns: '78px 270px 1fr',
      gap: 18,
      alignItems: 'center',
      minHeight: 0,
      ...style,
    }}
  >
    <div
      style={{
        width: 62,
        height: 62,
        borderRadius: 14,
        background: accent === colors.accent ? colors.accentMuted : colors.orangeLight,
        color: accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 25,
        fontWeight: 950,
      }}
    >
      {label}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 34,
          lineHeight: 1.1,
          fontWeight: 950,
          color: colors.text,
        }}
      >
        {title}
      </div>
      {children ? (
        <div
          style={{
            fontSize: 20,
            lineHeight: 1.12,
            color: colors.muted,
            fontWeight: 650,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {children}
        </div>
      ) : null}
    </div>
    <div
      style={{
        background: accent === colors.accent ? '#f0fdfa' : '#fff7ed',
        color: accent,
        borderRadius: 12,
        padding: '13px 18px',
        fontSize: 30,
        lineHeight: 1.16,
        fontWeight: 900,
      }}
    >
      「{prompt}」
    </div>
  </div>
);

// Slide 3: 大家今天最渴望深入的主題
const Slide03_Needs: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="前測問卷：學習主題排名" subtitle="需求調查" unit="單元 1" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 20,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <NeedRankCard
        rank="第一名 🏆"
        topic="針對不同障礙類別學生的客製化教材設計"
        description="如何為自閉、智能障礙、學習障礙學生設計教材。"
        delay={0.1}
      />
      <NeedRankCard
        rank="第二名 🥈"
        topic="如何利用 AI 快速製作教材講義與學習單"
        description="加速紙本與數位學習單的生成與排版輸出。"
        delay={0.18}
      />
      <NeedRankCard
        rank="第三名 🥉"
        topic="更精準的提示詞 (Prompt) 優化技巧"
        description="寫出符合特教邏輯的 Prompt，減少重試次數。"
        delay={0.26}
      />
      <NeedRankCard
        rank="第四名"
        topic="AI 製作互動網頁與網頁發佈"
        description="利用程式碼無痛自製並發佈線上互動式教材。"
        delay={0.34}
      />
    </div>
    <TextbookFooter subtitle="第一部分：AI心法" />
  </div>
);

// Slide 4: 選擇適合自己的工具
const Slide04_Anxiety: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="先看流程，再選工具" subtitle="觀念翻轉" unit="單元 1" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.92fr 1.08fr',
        gap: 34,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          background: '#ffffff',
          border: '2px solid #ccfbf1',
          borderRadius: 16,
          padding: '42px 44px',
          boxShadow: '0 20px 44px rgba(15, 23, 42, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 22,
        }}
      >
        <div
          style={{
            width: 'fit-content',
            background: colors.accentMuted,
            color: colors.accent,
            borderRadius: 10,
            padding: '10px 18px',
            fontSize: '26px',
            fontWeight: 900,
          }}
        >
          最重要的不是最新
        </div>
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '64px',
            fontWeight: 900,
            color: colors.text,
            lineHeight: 1.08,
          }}
        >
          選自己最適合的工具
        </div>
        <p style={{ margin: 0, fontSize: '32px', lineHeight: 1.5, color: colors.muted }}>
          先看清楚自己的工作流程，找出重複性最高、規則最固定的環節。
        </p>
        <div
          style={{
            marginTop: 8,
            borderLeft: `8px solid ${colors.orange}`,
            padding: '18px 22px',
            background: colors.orangeLight,
            borderRadius: 12,
            fontSize: '34px',
            fontWeight: 900,
            color: colors.text,
            lineHeight: 1.35,
          }}
        >
          重複性高 + 規則清楚
          <br />
          就是 AI 可以幫忙的地方
        </div>
      </div>
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.16s',
          background: '#ffffff',
          border: '2px solid #fed7aa',
          borderRadius: 16,
          padding: '38px 42px',
          boxShadow: '0 20px 44px rgba(15, 23, 42, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: '44px',
            color: colors.accent,
            lineHeight: 1.1,
          }}
        >
          重複工作雷達
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          {[
            ['每天', '都要做簡化的學習單'],
            ['每次', '都要貼到 Word'],
            ['每次', '都要放大字體'],
            ['段考', '都需要報讀'],
          ].map(([label, text]) => (
            <div
              key={`${label}-${text}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '96px 1fr',
                alignItems: 'center',
                gap: 18,
                padding: '18px 20px',
                background: '#f8fafc',
                border: '2px solid #e2e8f0',
                borderRadius: 14,
              }}
            >
              <div
                style={{
                  background: '#0f766e',
                  color: '#ffffff',
                  borderRadius: 10,
                  textAlign: 'center',
                  padding: '8px 0',
                  fontSize: '26px',
                  fontWeight: 900,
                }}
              >
                {label}
              </div>
              <div
                style={{ fontSize: '34px', fontWeight: 850, color: colors.text, lineHeight: 1.25 }}
              >
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="第一部分：AI心法" />
  </div>
);

// Slide 4b: 不同工作模式
const Slide04b_WorkStyle: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="工作模式沒有標準答案" subtitle="依習慣選工具" unit="單元 1" />
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: 24,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          background: '#ffffff',
          border: '2px solid #e2e8f0',
          borderRadius: 16,
          padding: '24px 34px',
          boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
          fontSize: '36px',
          fontWeight: 850,
          color: colors.text,
          lineHeight: 1.35,
        }}
      >
        有人喜歡把一份學習單快速做到 80-90%，也有人喜歡一次先做完十份學習單架構，再慢慢精修。
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, minHeight: 0 }}>
        <div
          className="es-fadeUp"
          style={{
            animationDelay: '0.12s',
            background: '#ffffff',
            border: '3px solid #99f6e4',
            borderRadius: 16,
            padding: '34px 36px',
            boxShadow: '0 20px 44px rgba(13, 148, 136, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: '48px',
              fontWeight: 900,
              color: colors.accent,
              lineHeight: 1.1,
            }}
          >
            小步快跑型
          </div>
          <div style={{ fontSize: '34px', fontWeight: 850, color: colors.text, lineHeight: 1.42 }}>
            先把某一份學習單做完，完成率可以高達 80-90%。
          </div>
          <div style={{ fontSize: '30px', color: colors.muted, lineHeight: 1.45 }}>
            喜歡快速完成小小的東西，再慢慢累積成大的成果。
          </div>
        </div>
        <div
          className="es-fadeUp"
          style={{
            animationDelay: '0.22s',
            background: '#ffffff',
            border: '3px solid #fed7aa',
            borderRadius: 16,
            padding: '34px 36px',
            boxShadow: '0 20px 44px rgba(234, 88, 12, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: '48px',
              fontWeight: 900,
              color: colors.orange,
              lineHeight: 1.1,
            }}
          >
            先搭架構型
          </div>
          <div style={{ fontSize: '34px', fontWeight: 850, color: colors.text, lineHeight: 1.42 }}>
            一次先做十份學習單，每份完成度可能先到 60%。
          </div>
          <div style={{ fontSize: '30px', color: colors.muted, lineHeight: 1.45 }}>
            喜歡先把整體架構鋪出來，再回頭慢慢精修細節。
          </div>
        </div>
      </div>
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.32s',
          background: colors.text,
          color: '#ffffff',
          borderRadius: 16,
          padding: '24px 34px',
          fontSize: '38px',
          fontWeight: 900,
          textAlign: 'center',
          lineHeight: 1.25,
        }}
      >
        沒有哪個比較好，端看自己的習慣與任務情境。
      </div>
    </div>
    <TextbookFooter subtitle="第一部分：AI心法" />
  </div>
);

// Slide 5: 與 AI 長久合作的健康互動心態
const Slide05_Mindset: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="佛系心法：與 AI 互動的健康心態" subtitle="合作心態" unit="單元 1" />
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, flex: 1, zIndex: 2 }}
    >
      <Panel title="不求一次得 100 分" delay={0.1}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontSize: '40px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>理解隨機性</strong>：AI 的輸出有起伏是正常的現象。
          </li>
          <li>
            <strong>多次對話</strong>：經由 2-3 次對話微調，逼近完美教材。
          </li>
        </ul>
      </Panel>
      <Panel title="70分實習生" delay={0.2}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontSize: '40px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>打字極快助理</strong>：讓 AI 幫忙生成 70 分的初稿。
          </li>
          <li>
            <strong>專業教育把關</strong>：老師負責剩下的 30% 專業校對。
          </li>
        </ul>
      </Panel>
      <Panel title="當自己學生" delay={0.3}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontSize: '40px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>分批給予任務</strong>：每次只要求修改一段或增加支持。
          </li>
          <li>
            <strong>防止指令混亂</strong>：避免一次性塞給 AI 超載的規則。
          </li>
        </ul>
      </Panel>
    </div>
    <TextbookFooter subtitle="第一部分：AI心法" />
  </div>
);

// Slide 6: 米克師相關網站
const Slide06_MixerIntro: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="米克師相關網站" subtitle="三個入口" unit="單元 1" />
    <div
      style={{
        zIndex: 2,
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 28,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      <MixerSiteCard
        href={mixerSiteUrls.prep}
        label="備課入口"
        screenshot={imgMixerAiPrep}
        screenshotAlt="AI 備課幫手網站首頁畫面"
        title="AI備課幫手"
        delay={0.1}
      >
        特教老師生成教材、學習單、課程素材與備課工具的主要入口。
      </MixerSiteCard>
      <MixerSiteCard
        href={mixerSiteUrls.share}
        label="共享入口"
        screenshot={imgMixerShare}
        screenshotAlt="特教教材資源共享網站畫面"
        title="特教教材共享"
        delay={0.2}
        accent={colors.orange}
      >
        整理可分享的特教教材、工具與教學資源，方便快速找到可改用的素材。
      </MixerSiteCard>
      <MixerSiteCard
        href={mixerSiteUrls.teaching}
        label="學生入口"
        screenshot={imgMixerTeaching}
        screenshotAlt="SpedMix 學習平台網站畫面"
        title="學生學習平台"
        delay={0.3}
      >
        提供學生端使用的學習活動與互動教材，讓自學與課堂練習更容易進入。
      </MixerSiteCard>
    </div>
    <TextbookFooter subtitle="第一部分：AI心法" />
  </div>
);

// Slide 7: 特教倫理：可以做與不可以做
const Slide07_Ethics: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="AI 使用倫理" subtitle="特教倫理" unit="單元 6" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="可以做" delay={0.1}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '40px',
          }}
        >
          <li>
            <strong>輸入行為</strong>：
            <span style={{ fontWeight: '400' }}>例如障礙類別、能力現況、學習困難。</span>
          </li>
          <li>
            <strong>描述教學需求</strong>：例如想練習的概念、題型、提示層次與評量方式。
          </li>
          <li>
            <strong>
              去識別化︰<span style={{ fontWeight: '400' }}>「米克師」改成「米OO」</span>
            </strong>
            {''}
          </li>
        </ul>
      </Panel>
      <Panel title="不可以做" delay={0.25}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '40px',
          }}
        >
          <li>
            <strong>不輸入個資</strong>：姓名、身分證字號、學校、班級、地址。
          </li>
          <li>
            <strong>不上傳敏感文件</strong>：診斷證明、IEP 原始檔、輔導紀錄。
          </li>
          <li>
            <strong>{''}</strong>
            {''}
          </li>
        </ul>
      </Panel>
    </div>
    <TextbookFooter subtitle="第六部分：AI倫理和 Agent 小介紹" />
  </div>
);

// Slide 8: Google 不訓練模型的兩種情境
const Slide08_GoogleNoTraining: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title="Google 不用來訓練模型的兩種情境"
      subtitle="使用前先確認帳號與工具"
      unit="單元 6"
    />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          background: '#ffffff',
          border: '2px solid #dbeafe',
          borderRadius: '18px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          boxShadow: '0 18px 36px rgba(15, 23, 42, 0.08)',
          fontSize: '30px',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '50px',
            fontFamily: 'var(--osd-font-display)',
            color: 'var(--osd-accent)',
            lineHeight: 1.15,
            fontWeight: '700',
          }}
        >
          1. 教育版帳號
        </h3>
        <p style={{ margin: 0, fontSize: '40px', lineHeight: 1.35, color: colors.text }}>
          使用教育版 Gemini 時，畫面會提示：對話不會用於改良 Google 模型。
        </p>
        <img
          src={imgGoogleEduNoTraining}
          alt="教育版 Gemini 對話不會用於改良 Google 模型的截圖"
          style={{
            width: '100%',
            marginTop: 'auto',
            border: '2px solid #e2e8f0',
            borderRadius: '14px',
            boxShadow: '0 14px 28px rgba(15, 23, 42, 0.12)',
          }}
        />
      </div>
      <div
        className="es-fadeUp"
        style={{
          background: '#ffffff',
          border: '2px solid #ddd6fe',
          borderRadius: '18px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          boxShadow: '0 18px 36px rgba(15, 23, 42, 0.08)',
          animationDelay: '0.15s',
          objectFit: 'cover',
          objectPosition: '50% 50%',
          objectViewBox: 'inset(0% 0.96% 0% 0.95%)',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '50px',
            fontFamily: 'var(--osd-font-display)',
            color: '#6d28d9',
            lineHeight: 1.15,
            fontWeight: '700',
          }}
        >
          2. NotebookLM
        </h3>
        <p style={{ margin: 0, fontSize: '40px', lineHeight: 1.35, color: colors.text }}>
          NotebookLM 說明頁承諾：重視隱私，不會將資料用於訓練 NotebookLM。
        </p>
        <img
          src={imgNotebookLMNoTraining}
          alt="NotebookLM 隱私與不訓練模型承諾的截圖"
          style={{
            width: '100%',
            marginTop: 'auto',
            border: '2px solid #e9d5ff',
            borderRadius: '14px',
            boxShadow: '0 14px 28px rgba(15, 23, 42, 0.12)',
          }}
        />
      </div>
    </div>
    <TextbookFooter subtitle="第六部分：AI倫理和 Agent 小介紹" />
  </div>
);

// Slide 9: PART 2 過渡頁
const Slide08_Part2Header: Page = () => (
  <PartHeaderPage
    partNum="02"
    title={'單元二：AI應用於行政文書'}
    desc="把行政文書先生成可修改的第一版，再交回老師判斷與調整"
  />
);

// Slide 10: AI 應用於行政文書
const Slide08_AdminDocs: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="AI應用於行政文書" subtitle="行政工作先做出第一版" unit="單元 2" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 34,
        zIndex: 2,
        flex: 1,
        alignItems: 'stretch',
        minHeight: 0,
      }}
    >
      <AdminDocCard num="01" title="IEP目標生成" accent={colors.accent} delay={0.08}>
        輸入學生現況、需求與課程重點，先產出可討論、可微調的 IEP 目標草稿。
      </AdminDocCard>
      <AdminDocCard num="02" title="課程計畫生成" accent={colors.orange} delay={0.18}>
        把教學主題、學生起點、支持策略與評量方式，整理成課程計畫第一版。
      </AdminDocCard>
    </div>
    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        marginTop: 30,
        background: colors.text,
        color: colors.white,
        borderRadius: 24,
        padding: '30px 40px',
        display: 'grid',
        gridTemplateColumns: '210px 1fr',
        gap: 30,
        alignItems: 'center',
        boxShadow: '0 22px 48px rgba(15, 23, 42, 0.18)',
        animationDelay: '0.28s',
      }}
    >
      <div
        style={{
          background: colors.orange,
          borderRadius: 18,
          padding: '16px 20px',
          fontSize: 34,
          fontWeight: 950,
          textAlign: 'center',
          fontFamily: 'var(--osd-font-display)',
        }}
      >
        改編 TIP
      </div>
      <div style={{ fontSize: 42, lineHeight: 1.32, fontWeight: 850 }}>
        全選 Word 內容貼上，或截圖畫面給 AI 看，改編最精準。
      </div>
    </div>
    <TextbookFooter subtitle="第二部分：AI應用於行政文書" />
  </div>
);

const Slide08_AdminPractice: Page = () => (
  <PracticeHeaderPage
    num="0"
    title="操作IEP目標生成器與課程計畫生成器"
    desc="選一個行政文書情境，先產出可修改的第一版，再回頭檢查是否符合學生需求。"
  />
);

// Slide 12: PART 3 過渡頁
const Slide08_Part3Header: Page = () => (
  <PartHeaderPage
    partNum="03"
    title={'單元三：先快速簡化\n再依障別精準調整'}
    desc="從「一鍵產生第一版」到「把提示詞修到更懂學生」"
  />
);

// Slide 13: 紙本工具一：課文簡化系統 (使用步驟卡片展示)
const Slide09_PaperTool1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="Gemini Canvas︰課文簡化系統" subtitle="課文簡化" unit="單元 3" />
    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        marginTop: 28,
        background: colors.text,
        color: colors.white,
        borderRadius: 18,
        padding: '18px 28px',
        fontSize: '32px',
        lineHeight: 1.28,
        fontWeight: 900,
        boxShadow: '0 18px 38px rgba(15, 23, 42, 0.14)',
      }}
    >
      這是用 Gemini Canvas 寫出的「有 AI
      功能的程式」：提示流程已固定，老師用點選與欄位輸入就能產出教材。
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 28,
        zIndex: 2,
        alignItems: 'center',
        marginTop: 30,
      }}
    >
      <Unit2Card num="01" title="選程度，貼課文" delay={0.1} style={{ minHeight: 320 }}>
        先用點選設定學生年級程度，再貼上原始課文或上傳圖片 OCR，讓系統知道要改到哪個閱讀層級。
      </Unit2Card>
      <Unit2Card
        num="02"
        title="AI 多維改寫"
        delay={0.2}
        accent={colors.orange}
        style={{ minHeight: 320 }}
      >
        產出簡化課文、摘要與段落配圖，先把教材從「老師可讀」改成「學生可入口」。
      </Unit2Card>
      <Unit2Card num="03" title="出題與 Word 匯出" delay={0.3} style={{ minHeight: 320 }}>
        同步生成引導問題與讀後評量，最後匯出指定格式的 Word 學習單，方便老師二次微調。
      </Unit2Card>
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

// Slide 10: 紙本工具二：數學差異化「數題數題」
const Slide10_PaperTool2: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="Gem︰數題數題" subtitle="數題數題" unit="單元 3" />
    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        marginTop: 18,
        marginBottom: 24,
        background: colors.white,
        border: '2px solid #fed7aa',
        color: colors.text,
        borderRadius: 18,
        padding: '18px 28px',
        fontSize: '32px',
        lineHeight: 1.28,
        fontWeight: 900,
        boxShadow: '0 14px 30px rgba(15, 23, 42, 0.08)',
      }}
    >
      這是使用 Gemini Gem 的方式生成：彈性高，但輸入要求仍以文字描述為主，需要老師把條件說清楚。
    </div>
    <div
      style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 36, flex: 1, zIndex: 2 }}
    >
      <Unit2Card num="01" title="同一個結構，換不同數字" delay={0.1}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ color: colors.muted }}>
            輸入一題原始題目，系統快速生出多個「解法相同、數字不同」的練習。
          </div>
          <div
            style={{
              background: colors.white,
              border: '2px solid #ccfbf1',
              borderRadius: 18,
              padding: '22px 26px',
              display: 'grid',
              gap: 14,
              textAlign: 'center',
              boxShadow: 'inset 0 0 0 5px rgba(204, 251, 241, 0.32)',
            }}
          >
            <div style={{ fontSize: '42px', fontWeight: 950, color: colors.text }}>
              原題：3x + 5 = 20
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: colors.accent }}>
              自動衍生同質題
            </div>
            <div style={{ fontSize: '34px', fontWeight: 760, color: colors.muted }}>
              7x + 2 = 23　｜　4x + 9 = 37　｜　6x + 1 = 19
            </div>
          </div>
        </div>
      </Unit2Card>
      <Unit2Card num="02" title="為什麼適合特教現場" delay={0.25} accent={colors.orange}>
        <ul style={{ margin: 0, paddingLeft: 26, display: 'grid', gap: 18 }}>
          <li>
            <strong>大量重複練習：</strong>讓學生反覆練同一種解題路徑。
          </li>
          <li>
            <strong>降低題目陌生感：</strong>不必每題重新理解全新情境。
          </li>
          <li>
            <strong>建立成功經驗：</strong>先穩定做對，再慢慢增加變化。
          </li>
        </ul>
      </Unit2Card>
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

const CompareHeader = ({ children, accent }: { children: ReactNode; accent?: string }) => (
  <div
    style={{
      background: colors.text,
      color: colors.white,
      borderRadius: 16,
      padding: '22px 28px',
      fontSize: '36px',
      fontWeight: 950,
      lineHeight: 1.1,
      minHeight: 92,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      borderBottom: `8px solid ${accent ?? colors.accent}`,
    }}
  >
    {children}
  </div>
);

const CompareRow = ({
  label,
  gem,
  tool,
  strong,
}: {
  label: string;
  gem: ReactNode;
  tool: ReactNode;
  strong?: boolean;
}) => (
  <>
    <div
      style={{
        padding: '16px 22px',
        fontSize: '27px',
        fontWeight: 900,
        color: colors.text,
        background: strong ? colors.accentMuted : 'rgba(255,255,255,0.72)',
        borderBottom: '1px solid #dbe4ee',
      }}
    >
      {label}
    </div>
    <div
      style={{
        padding: '16px 22px',
        fontSize: '27px',
        fontWeight: strong ? 900 : 720,
        color: colors.text,
        background: strong ? '#fff7ed' : colors.white,
        borderBottom: '1px solid #dbe4ee',
        lineHeight: 1.22,
      }}
    >
      {gem}
    </div>
    <div
      style={{
        padding: '16px 22px',
        fontSize: '27px',
        fontWeight: strong ? 900 : 720,
        color: colors.text,
        background: strong ? '#ecfdf5' : colors.white,
        borderBottom: '1px solid #dbe4ee',
        lineHeight: 1.22,
      }}
    >
      {tool}
    </div>
  </>
);

const Slide10b_AIModeCompare: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title="兩種自製 AI 模式比較"
      subtitle="Gemini Gems vs 自製 AI 工具"
      unit="單元 3"
    />
    <div
      style={{
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: '0.82fr 1.08fr 1.1fr',
        gap: 0,
        marginTop: 34,
        border: '2px solid #cbd5e1',
        borderRadius: 22,
        overflow: 'hidden',
        boxShadow: '0 24px 58px rgba(15, 23, 42, 0.12)',
      }}
    >
      <CompareHeader accent={colors.muted}>比較項目</CompareHeader>
      <CompareHeader accent={colors.orange}>
        Gemini Gems
        <br />
        半固定 AI 機器人
      </CompareHeader>
      <CompareHeader>
        自製 AI 工具
        <br />
        固定 AI 工作流
      </CompareHeader>
      <CompareRow
        label="本質"
        gem="用 Gem 指令生成，邊對話邊調整"
        tool="Gemini Canvas 寫出的有 AI 功能程式"
      />
      <CompareRow
        label="輸入模式"
        gem="仍以文字輸入要求為主"
        tool="表單、欄位、選項式輸入"
        strong
      />
      <CompareRow
        label="操作方式"
        gem="老師補充條件，依對話逐步修正"
        tool="點選後直接生成，操作上更易用"
        strong
      />
      <CompareRow
        label="輸出模式"
        gem="依對話內容動態生成"
        tool="可輸出指定格式的 Word 文件"
        strong
      />
      <CompareRow label="輸出穩定性" gem="每次結果可能略有不同" tool="格式與流程較一致" />
      <CompareRow label="適合情境" gem="還在思考與調整內容" tool="想快速產出固定格式教材" />
      <CompareRow label="教師使用狀態" gem="「我想跟 AI 討論」" tool="「我想直接產出」" strong />
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

// Slide 11_Workshop1: 第一小節實作（大方向簡化工具實戰）
const Slide11_Workshop1: Page = () => (
  <PracticeHeaderPage
    num="1"
    title="大方向簡化工具實作（20分鐘）"
    desc="請選擇一份教材，快速產出可以修改的第一版。"
  />
);

// Slide 12: 從工具到精準調整：為什麼還需要 Prompt？
const Slide12_WhyPrompt: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="提示詞加強術" subtitle="Prompt定位" unit="單元 3" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 36,
        zIndex: 2,
        alignItems: 'center',
        marginTop: 42,
      }}
    >
      <Unit2Card num="01" title="工具適合做第一版" delay={0.1} style={{ minHeight: 430 }}>
        <ul style={{ margin: 0, paddingLeft: 26, display: 'grid', gap: 18 }}>
          <li>
            <strong>速度快：</strong>先完成教材骨架與大方向初稿。
          </li>
          <li>
            <strong>降低空白焦慮：</strong>老師不必從零開始排版與出題。
          </li>
          <li>
            <strong>限制也清楚：</strong>很難自動知道每位學生的真實起點。
          </li>
        </ul>
      </Unit2Card>
      <Unit2Card
        num="02"
        title="精準調整要靠老師"
        delay={0.25}
        accent={colors.orange}
        style={{ minHeight: 430 }}
      >
        <ul style={{ margin: 0, paddingLeft: 26, display: 'grid', gap: 18 }}>
          <li>
            <strong>補起點行為：</strong>把識字量、理解弱點與學習目標放回提示詞。
          </li>
          <li>
            <strong>補學生脈絡：</strong>同樣障別，也可能需要完全不同的支持。
          </li>
          <li>
            <strong>補教學判斷：</strong>AI 生第一版，老師決定能不能真的用。
          </li>
        </ul>
      </Unit2Card>
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

// Slide 13: 方向二：先把自己的粗咒語交給 AI 潤飾
const Slide13_AIRevise: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="提示詞加強術" subtitle="Prompt潤飾" unit="單元 3" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.8fr 1.2fr',
        gap: 40,
        zIndex: 2,
        alignItems: 'center',
        marginTop: 38,
      }}
    >
      <Unit2Card num="01" title="老師只要記一句口訣" delay={0.1} style={{ minHeight: 460 }}>
        <div
          style={{
            background: colors.orangeLight,
            border: '2px solid #fed7aa',
            borderRadius: 22,
            padding: '34px 28px',
            fontSize: '72px',
            fontWeight: 950,
            color: colors.orange,
            lineHeight: 1.05,
            textAlign: 'center',
            boxShadow: 'inset 0 0 0 8px rgba(255, 255, 255, 0.55)',
          }}
        >
          加強我的咒語
        </div>
        <div style={{ color: colors.muted }}>
          先把粗略需求丟給 AI，再依據他提供的結構化咒語再做微調。
        </div>
      </Unit2Card>
      <Unit2Card
        num="02"
        title="提示詞加強會補出結構"
        delay={0.25}
        accent={colors.orange}
        style={{ minHeight: 460 }}
      >
        <img
          src={imgPromptRevise}
          alt="加強我的提示詞示意圖"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: 18,
            border: '2px solid #fed7aa',
            background: colors.white,
            boxShadow: '0 18px 36px rgba(15, 23, 42, 0.1)',
            marginBottom: 16,
          }}
        />
        <ul style={{ margin: 0, paddingLeft: 26, display: 'grid', gap: 12 }}>
          <li>明確指定學生能力與教材目標。</li>
          <li>要求輸出格式，避免生成不需要的內容。</li>
          <li>{''}</li>
        </ul>
      </Unit2Card>
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

// Slide 14: 反覆修提示詞：先試生一版，再回頭微調 (使用步驟卡片展示)
const Slide14_PromptCycle: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="提示詞加強術" subtitle="小步迭代" unit="單元 3" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 24,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <Unit2Card
        num="01"
        title="生成教材"
        delay={0.1}
        style={{ padding: '30px 34px', justifyContent: 'center' }}
      >
        升級版提示詞貼到 AI 中生成第一版教材草稿。
      </Unit2Card>
      <Unit2Card
        num="02"
        title="檢查評估"
        delay={0.2}
        style={{ padding: '30px 34px', justifyContent: 'center' }}
      >
        對照學生能力、閱讀負荷與學習目標，判斷是否能直接使用。
      </Unit2Card>
      <Unit2Card
        num="03"
        title="反覆微調"
        delay={0.3}
        accent={colors.orange}
        style={{ padding: '30px 34px', justifyContent: 'center' }}
      >
        回頭向 AI 對話修改，如「字數短一點」、「題目要更生活化」。
      </Unit2Card>
      <Unit2Card
        num="04"
        title="保存提示詞"
        delay={0.4}
        style={{ padding: '30px 34px', justifyContent: 'center' }}
      >
        將滿意的 Prompt 儲存下來，做為同類型學生的常用備課模版，做成gem或GPT。
      </Unit2Card>
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

// Slide 15: 好提示詞的兩種美觀輸出方式
const Slide15_OutputModes: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="常見痛點︰怎麼變成漂亮學習單？" subtitle="美觀輸出" unit="單元 3" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        flex: 1,
        zIndex: 2,
      }}
    >
      <Unit2Card
        num="01"
        title="ChatGPT 圖像版學習單"
        delay={0.1}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginBottom: 12,
            background: colors.white,
            border: '2px solid #ccfbf1',
            borderRadius: 18,
            padding: 12,
          }}
        >
          <img
            src={imgModeChatGPT}
            alt="ChatGPT 圖像版學習單"
            style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain', borderRadius: 12 }}
          />
        </div>
        <p style={{ margin: 0, fontSize: '32px', color: colors.muted, lineHeight: 1.38 }}>
          完美咒語貼到 ChatGPT。
          <br />
          按下「創立圖像」。
        </p>
      </Unit2Card>
      <Unit2Card
        num="02"
        title="Gemini Canvas 生成 HTML"
        delay={0.25}
        accent={colors.orange}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginBottom: 12,
            background: colors.white,
            border: '2px solid #fed7aa',
            borderRadius: 18,
            padding: 12,
          }}
        >
          <img
            src={imgModeGemini}
            alt="Gemini Canvas HTML 學習單"
            style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain', borderRadius: 12 }}
          />
        </div>
        <p style={{ margin: 0, fontSize: '32px', color: colors.muted, lineHeight: 1.38 }}>
          咒語貼到 Gemini按下 Canvas
          <br />
          補一句：
          <span style={{ fontStyle: 'italic', fontWeight: 700, color: colors.accent }}>
            「請用 HTML 畫一個仿 A4 的學習單，且列印出來要很美觀。」
          </span>
        </p>
      </Unit2Card>
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

// Slide 16: 注音學習單：圖像版限制，HTML 版更穩定
const Slide16_ZhuyinFontChoice: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="常見痛點︰注音學習單如何製作？" subtitle="注音字體範例" unit="單元 3" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        flex: 1,
        zIndex: 2,
      }}
    >
      <Unit2Card
        num="01"
        title="線上注音字體範例"
        delay={0.1}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: colors.white,
            border: '2px solid #ccfbf1',
            borderRadius: 18,
            padding: 16,
            boxShadow: '0 16px 34px rgba(15, 23, 42, 0.09)',
          }}
        >
          <img
            src={imgZhuyin1}
            alt="線上注音字體 範例"
            style={{
              width: '500px',
              height: '500px',
              objectFit: 'cover',
              borderRadius: 12,
              display: 'block',
              margin: '0 auto',
              objectPosition: '50% 50%',
              objectViewBox: 'inset(0% 30.66% 49.38% 0%)',
            }}
          />
        </div>
      </Unit2Card>
      <Unit2Card
        num="02"
        title="Google 內建三種注音字型"
        delay={0.25}
        accent={colors.orange}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <ul
          style={{
            paddingLeft: '28px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            fontSize: '34px',
            lineHeight: '1.46',
          }}
        >
          <li>
            <strong>芫荽注音體 (Bpmf Iansui)</strong>：仿手寫鋼筆字感，最適合國小與特教的溫暖風格。
          </li>
          <li>
            <strong>粉圓注音體 (Bpmf Huninn)</strong>：圓體字感，適合幼兒園或繪本類的可愛設計。
          </li>
          <li>
            <strong>字嗨注音體 (Bpmf Zihi Kai Std)</strong>：教育部標準楷書字感，適合標準識字教學。
          </li>
        </ul>
      </Unit2Card>
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

// Slide 17: 解決對策：Markdown 表格強迫對齊法與 LaTeX 語法
const Slide17_MathFormat: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="常見痛點：為什麼數學式很醜？" subtitle="數學公式" unit="單元 3" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 24,
        zIndex: 2,
        alignItems: 'center',
        marginTop: 38,
      }}
    >
      <Unit2Card num="01" title="壞掉的原始碼" delay={0.1} style={{ minHeight: 450 }}>
        <p style={{ margin: '0 0 16px 0', fontSize: '32px', lineHeight: 1.38 }}>
          AI 給你的網頁如果漏掉渲染套件，畫面上只會顯示乾巴巴的原始碼：
        </p>
        <div
          style={{
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            padding: '16px',
            borderRadius: '10px',
            fontFamily: 'monospace',
            fontSize: '36px',
            color: '#e11d48',
            textAlign: 'center',
            marginTop: '12px',
            wordBreak: 'break-all',
          }}
        >
          {'\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'}
        </div>
      </Unit2Card>
      <Unit2Card
        num="02"
        title="完美渲染的樣子"
        delay={0.2}
        accent={colors.orange}
        style={{ minHeight: 450 }}
      >
        <p style={{ margin: '0 0 24px 0', fontSize: '32px', lineHeight: 1.38 }}>
          真正美觀的網頁會將原始碼自動轉為教科書級、比例精準的數學公式：
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            background: '#f8fafc',
            border: `1px solid ${colors.border}`,
            borderRadius: '10px',
            minHeight: '120px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: '48px',
              fontWeight: 600,
              gap: '8px',
              color: colors.text,
            }}
          >
            <span style={{ fontStyle: 'italic' }}>x</span>
            <span>=</span>
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                lineHeight: 1.1,
              }}
            >
              <span
                style={{
                  borderBottom: '2.5px solid currentColor',
                  padding: '0 6px',
                  paddingBottom: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                -b &plusmn; &radic;
                <span
                  style={{
                    borderTop: '2px solid currentColor',
                    padding: '0 4px',
                    marginLeft: '2px',
                    fontSize: '44px',
                  }}
                >
                  b<sup>2</sup> - 4ac
                </span>
              </span>
              <span style={{ paddingTop: '6px', fontSize: '44px' }}>2a</span>
            </div>
          </div>
        </div>
      </Unit2Card>
      <Unit2Card num="03" title="魔法咒語" delay={0.3} style={{ minHeight: 450 }}>
        <div
          style={{
            background: colors.orangeLight,
            padding: '16px',
            borderRadius: '12px',
            fontSize: '36px',
            fontWeight: 700,
            color: colors.orange,
            marginBottom: 12,
            border: `1px solid ${colors.orange}`,
          }}
        >
          「請用 KaTeX 幫我渲染網頁中的數學式」
        </div>
        <p style={{ margin: 0, fontSize: '32px', lineHeight: 1.42, color: colors.muted }}>
          當 HTML 數學公式顯示異常時，直接傳送這句指令，AI 就會自動載入 <strong>KaTeX</strong>{' '}
          引擎，讓數學式瞬間變漂亮！
        </p>
      </Unit2Card>
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

// Slide 17b: 常見痛點︰為什麼生成的圖不連貫？
const Slide17b_ConsistentImages: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title="常見痛點︰為什麼生成的圖不連貫？"
      subtitle="角色與畫風一致性"
      unit="單元 3"
    />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        flex: 1,
        zIndex: 2,
      }}
    >
      <Unit2Card
        num="01"
        title="方法一︰與 AI 約定並固定特徵 (自訂 Gem)"
        delay={0.1}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginBottom: 12,
            background: colors.white,
            border: '2px solid #ccfbf1',
            borderRadius: 18,
            padding: 12,
          }}
        >
          <img
            src={imgGeminiGemConsistent}
            alt="Gemini 自訂角色特徵設計"
            style={{ maxWidth: '100%', maxHeight: '310px', objectFit: 'contain', borderRadius: 12 }}
          />
        </div>
        <p style={{ margin: 0, fontSize: '30px', color: colors.muted, lineHeight: 1.38 }}>
          在自訂 Gem 寫明：只要使用者輸入故事動作，就將動作翻譯成英文，並與固定的主角外貌
          (如年齡、髮型、穿著) 及畫風 Prompt 組合。
        </p>
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://gemini.google.com/gem/1nwL4LXks9Cqxl3ZAWV6rJ851hAAleQBW?usp=sharing"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 16,
              padding: '12px 24px',
              background: colors.accent,
              color: colors.white,
              borderRadius: 12,
              fontSize: '28px',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(13, 148, 136, 0.2)',
            }}
          >
            開啟角色生圖 Gem ➜
          </a>
        </div>
      </Unit2Card>
      <Unit2Card
        num="02"
        title="方法二︰使用專門漫畫生成器 (AI連環漫畫工廠)"
        delay={0.25}
        accent={colors.orange}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginBottom: 12,
            background: colors.white,
            border: '2px solid #fed7aa',
            borderRadius: 18,
            padding: 12,
          }}
        >
          <img
            src={imgFourPanelComic}
            alt="AI連環漫畫工廠"
            style={{ maxWidth: '100%', maxHeight: '310px', objectFit: 'contain', borderRadius: 12 }}
          />
        </div>
        <p style={{ margin: 0, fontSize: '30px', color: colors.muted, lineHeight: 1.38 }}>
          直接貼上課文或寫一小段故事，系統便會自動規劃漫畫分鏡、生成旁白對話，並使用 Imagen 3
          引擎自動繪製出角色連貫、生動的連環漫畫。
        </p>
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://spedmix.pages.dev/four-panel-comic"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 16,
              padding: '12px 24px',
              background: colors.orange,
              color: colors.white,
              borderRadius: 12,
              fontSize: '28px',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)',
            }}
          >
            開啟 AI 連環漫畫工廠 ➜
          </a>
        </div>
      </Unit2Card>
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

// Slide 18: 實作挑戰二（B）：美化提示詞與多元美觀輸出

const Slide18_Workshop2: Page = () => (
  <PracticeHeaderPage
    num="2"
    title="強化提示詞與美觀輸出（20分鐘）"
    desc="請用 AI 加強提示詞，產出一份可用的學習單。"
  />
);

const Slide18b_ChineseAiTools: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="米克師工具推薦-國文" subtitle="單元三延伸應用" unit="單元 3" />
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: 22,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          background: colors.white,
          border: '2px solid #e2e8f0',
          borderRadius: 16,
          padding: '22px 30px',
          boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
          fontSize: '32px',
          fontWeight: 800,
          color: colors.text,
          lineHeight: 1.35,
        }}
      >
        把 AI
        用在國文備課時，重點不是產出更多文字，而是把同一份教材調成學生讀得進去、練得起來的版本。
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22, minHeight: 0 }}>
        <SubjectToolCard
          num="01"
          title="課文簡化"
          href="https://spedmix.pages.dev/simple"
          delay={0.1}
          note=""
        >
          自動調整課文難度與閱讀量，提供不同程度版本，符合學生學習需求。
        </SubjectToolCard>
        <SubjectToolCard
          num="02"
          title="詞彙教材"
          href="https://spedmix.pages.dev/vocab-maker"
          delay={0.2}
          accent={colors.orange}
          note=""
        >
          自動生成詞語教材與測驗，包含解釋、例句、練習題與測驗卷。
        </SubjectToolCard>
        <SubjectToolCard
          num="03"
          title="文言文"
          href="https://spedmix.pages.dev/chinesetranslate"
          delay={0.3}
          note=""
        >
          文言文白話翻譯與重點整理，支援逐句解析、語法標註與重點整理。
        </SubjectToolCard>
      </div>
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.4s',
          background: colors.text,
          color: colors.white,
          borderRadius: 16,
          padding: '20px 30px',
          fontSize: '34px',
          lineHeight: 1.25,
          fontWeight: 900,
          textAlign: 'center',
        }}
      >
        國文 AI 的核心：不是替學生讀，而是幫學生跨過「文字理解」的第一道門檻。
      </div>
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

const Slide18c_MathAiTools: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="米克師工具推薦-數學" subtitle="單元三延伸應用" unit="單元 3" />
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: 22,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          background: colors.white,
          border: '2px solid #e2e8f0',
          borderRadius: 16,
          padding: '22px 30px',
          boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
          fontSize: '32px',
          fontWeight: 800,
          color: colors.text,
          lineHeight: 1.35,
        }}
      >
        數學卡住的不一定是計算，常常是題目太長、步驟太隱性、情境太陌生。
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22, minHeight: 0 }}>
        <SubjectToolCard
          num="01"
          title="數學簡化"
          href="https://spedmix.pages.dev/math-scaffold"
          delay={0.1}
          note=""
        >
          自動簡化題目敘述與步驟說明，降低閱讀負擔，幫助學生專注於解題。
        </SubjectToolCard>
        <SubjectToolCard
          num="02"
          title="數題數題"
          href="https://spedmix.pages.dev/mathquestion"
          delay={0.2}
          accent={colors.orange}
          note=""
        >
          依需求快速生成不同難度、題型與情境的數學題目，涵蓋基礎到進階。
        </SubjectToolCard>
        <SubjectToolCard
          num="03"
          title="數學應用題畫家"
          href="https://spedmix.pages.dev/math-painter"
          delay={0.3}
          note=""
        >
          自動建立應用題情境圖像，幫助學生看懂題意、連結生活脈絡。
        </SubjectToolCard>
      </div>
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.4s',
          background: colors.text,
          color: colors.white,
          borderRadius: 16,
          padding: '20px 30px',
          fontSize: '34px',
          lineHeight: 1.25,
          fontWeight: 900,
          textAlign: 'center',
        }}
      >
        數學 AI 的核心：把題意拆小、把步驟看見、把練習變成可以反覆嘗試。
      </div>
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

const Slide18d_OtherAiTools: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="米克師工具推薦-其它" subtitle="單元三延伸應用" unit="單元 3" />
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: 28,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          background: colors.white,
          border: '2px solid #e2e8f0',
          borderRadius: 16,
          padding: '22px 30px',
          boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
          fontSize: '32px',
          fontWeight: 800,
          color: colors.text,
          lineHeight: 1.35,
        }}
      >
        除了國文與數學，也可以把出題、工作步驟拆解成更適合個別學生的教材素材。
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, minHeight: 0 }}>
        <SubjectToolCard
          num="01"
          title="個別化出題"
          href="https://spedmix.pages.dev/question"
          delay={0.1}
          note=""
        >
          依學生能力與教學目標快速生成題目，讓練習內容更貼近個別需求。
        </SubjectToolCard>
        <SubjectToolCard
          num="02"
          title="工作分析圖文生成"
          href="https://spedmix.pages.dev/taskanalysis"
          delay={0.2}
          accent={colors.orange}
          note=""
        >
          將任務拆成清楚步驟並搭配圖文提示，協助生活技能與作業流程教學。
        </SubjectToolCard>
      </div>
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.3s',
          background: colors.text,
          color: colors.white,
          borderRadius: 16,
          padding: '20px 30px',
          fontSize: '34px',
          lineHeight: 1.25,
          fontWeight: 900,
          textAlign: 'center',
        }}
      >
        其它工具的核心：把老師腦中的調整策略，變成學生看得懂、做得到的材料。
      </div>
    </div>
    <TextbookFooter subtitle="第三部分：紙本教材與破解" />
  </div>
);

// Slide 19: PART 3 過渡頁
const Slide19_Part3Header: Page = () => (
  <PartHeaderPage
    partNum="04"
    title={'單元四\n互動式網頁教材實戰'}
    desc="網頁互動工具體驗、直式注音學習單生成、以及網頁 Emoji 與圖床對策"
  />
);

const Slide19b_WhyGeminiCanvas: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="為什麼我會選擇 Gemini Canvas" subtitle="簡單提示詞" unit="單元 4" />
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: 20,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          background: '#ffffff',
          border: '2px solid #e2e8f0',
          borderRadius: 16,
          padding: '16px 28px',
          boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
          fontSize: '30px',
          fontWeight: 850,
          color: colors.text,
          lineHeight: 1.24,
        }}
      >
        免費的情況下，CP值高！！
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(5, 1fr)',
          gap: 10,
          minHeight: 0,
        }}
      >
        <FeaturePromptCard
          label="後台"
          title="想紀錄成績"
          prompt="幫我引入 Firebase SDK，紀錄學生成績。"
          delay={0.1}
        >
          {''}
        </FeaturePromptCard>
        <FeaturePromptCard
          label="AI"
          title="想加入 AI 功能"
          prompt="幫我加入 AI 生成文字或圖片功能。"
          delay={0.18}
          accent={colors.orange}
        >
          {''}
        </FeaturePromptCard>
        <FeaturePromptCard
          label="圖片"
          title="想加入圖片"
          prompt="http://....請放進教材。"
          delay={0.26}
        >
          {''}
        </FeaturePromptCard>
        <FeaturePromptCard
          label="語音"
          title="想加入報讀"
          prompt="幫我加入 Gemini TTS 語音功能。"
          delay={0.34}
          accent={colors.orange}
        >
          {''}
        </FeaturePromptCard>
        <FeaturePromptCard
          label="分享"
          title="想分享連結"
          prompt="右上角按共用或分享，就可以把連結給別人。"
          delay={0.42}
        >
          {''}
        </FeaturePromptCard>
      </div>
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.5s',
          background: colors.text,
          color: colors.white,
          borderRadius: 16,
          padding: '16px 30px',
          fontSize: '43px',
          lineHeight: 1.25,
          fontWeight: 900,
          textAlign: 'center',
          boxShadow: '0 18px 40px rgba(15, 23, 42, 0.14)',
        }}
      >
        最重要的是，按下「試用Gemini Canvas」即可站在別人的肩膀上繼續改編
      </div>
    </div>
    <TextbookFooter subtitle="第四部分：網頁教材實戰" />
  </div>
);

const Slide19c_PracticeLinksImage: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: colors.white,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px',
      boxSizing: 'border-box',
    }}
  >
    <img
      src={imgPracticeLinks}
      alt="實作範例連結清單"
      style={{ width: '100%', maxWidth: 1760, maxHeight: 920, objectFit: 'contain' }}
    />
  </div>
);

// Slide 20: 網頁工具一：互動句型排列
const Slide20_WebTool1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="工具一：生成句型排列GEM" subtitle="互動工具" unit="單元 4" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.12fr 0.88fr',
        gap: 34,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      <ToolScreenshotFrame label="學生操作畫面" delay={0.1}>
        <img
          src={imgTool1}
          alt="句型排列與語法重組工具畫面"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'contain',
            borderRadius: 12,
          }}
        />
      </ToolScreenshotFrame>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          justifyContent: 'center',
          minHeight: 0,
        }}
      >
        <ToolBullet num="01" title="降低書寫與打字負擔" delay={0.14}>
          學生用點選或拖曳詞語卡片完成句子，不必先被輸入能力卡住。
        </ToolBullet>
        <ToolBullet num="02" title="把大任務切成小關卡" delay={0.22} accent={colors.orange}>
          題號、進度與倒數讓任務有邊界，適合低持續度學生短時間練習。
        </ToolBullet>
        <ToolBullet num="03" title="檢查答案與聽答案分開" delay={0.3}>
          學生可以先嘗試排序，再用聽覺支援修正，不是直接猜完就結束。
        </ToolBullet>
        <ToolBullet num="04" title="可延伸到多學科句型" delay={0.38}>
          國文語序、英文句型、故事重組都能套用同一個互動結構。
        </ToolBullet>
      </div>
    </div>
    <TextbookFooter subtitle="第四部分：網頁教材實戰" />
  </div>
);

// Slide 21: 句型排列的教育核心：語感與聽覺訓練
const Slide21_WebTool1Core: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="語感與聽覺訓練：補足書寫與識字弱勢" subtitle="教育核心" unit="單元 4" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="利用聽覺理解優勢" delay={0.1}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '40px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>聽覺理解優越</strong>：特教學生往往聽覺理解能力優於識字與長文閱讀。
          </li>
          <li>
            <strong>多重感官整合</strong>：以「語音朗讀」配合「視覺字卡」建立立體記憶。
          </li>
        </ul>
      </Panel>
      <Panel title="自然語感培養" delay={0.25}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '40px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>耳朵記憶節奏</strong>：透過重複聆聽與句子重組，自然熟悉句型結構。
          </li>
          <li>
            <strong>降低焦慮感</strong>：無痛建立文法直覺，跳過枯燥的語法公式背誦。
          </li>
        </ul>
      </Panel>
    </div>
    <TextbookFooter subtitle="第四部分：網頁教材實戰" />
  </div>
);

// Slide 22: 網頁工具二：挖空填詞與圖文測驗
const Slide22_WebTool2: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="工具二：挖空填詞與圖文測驗" subtitle="互動測驗" unit="單元 4" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.12fr 0.88fr',
        gap: 34,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      <ToolScreenshotFrame label="預覽與作答畫面" delay={0.1}>
        <div
          style={{
            position: 'relative',
            height: '100%',
            minHeight: 0,
          }}
        >
          <img
            src={imgTool2}
            alt="挖空填詞測驗詞語與例句預覽畫面"
            style={{
              width: '82%',
              height: '64%',
              display: 'block',
              objectFit: 'contain',
              borderRadius: 14,
              background: '#ffffff',
              border: '1px solid #dbe7ee',
              boxShadow: '0 16px 34px rgba(15, 23, 42, 0.1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 4,
              bottom: 0,
              width: '58%',
              height: '48%',
              padding: 10,
              background: '#ffffff',
              border: '1px solid rgba(234, 88, 12, 0.28)',
              borderRadius: 16,
              boxShadow: '0 18px 42px rgba(15, 23, 42, 0.18)',
            }}
          >
            <img
              src={imgTool2b}
              alt="挖空填詞測驗作答畫面"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'contain',
                borderRadius: 10,
              }}
            />
          </div>
        </div>
      </ToolScreenshotFrame>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          justifyContent: 'center',
          minHeight: 0,
        }}
      >
        <ToolBullet num="01" title="先預覽詞語與例句" delay={0.14}>
          老師可以快速確認本單元詞彙、例句與朗讀語音是否符合學生程度。
        </ToolBullet>
        <ToolBullet num="02" title="圖片支援語意理解" delay={0.22} accent={colors.orange}>
          題目搭配情境圖片，幫助閱讀障礙學生把文字連回生活經驗。
        </ToolBullet>
        <ToolBullet num="03" title="報讀支援降低閱讀負荷" delay={0.3}>
          學生可聽題目或選項，不會因為看不懂題幹就失去練習機會。
        </ToolBullet>
        <ToolBullet num="04" title="選項與檢查分開" delay={0.38}>
          先選答案再檢查，避免看到按鈕就亂點，也保留重新思考的空間。
        </ToolBullet>
      </div>
    </div>
    <TextbookFooter subtitle="第四部分：網頁教材實戰" />
  </div>
);

// Slide 23: 網頁測驗的細節：抗衝動設計與反饋機制
const Slide23_WebTool2Core: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="抗衝動設計與二次機會機制" subtitle="測驗設計" unit="單元 4" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="特教友善：抗衝動設計" delay={0.1}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '40px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>按鈕徹底分離</strong>：將「選取答案」與「送出檢測」按鈕徹底分開。
          </li>
          <li>
            <strong>遏止直覺亂點</strong>：避免 ADHD 學生為趕快看分數而衝動猜題。
          </li>
        </ul>
      </Panel>
      <Panel title="二次機會（敗部復活）" delay={0.25}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '40px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>錯誤引導提示</strong>：答錯時不直接給答案，而是給予提示再次嘗試。
          </li>
          <li>
            <strong>建立成功經驗</strong>：在第二次回答正確時，同樣給予正向增強。
          </li>
        </ul>
      </Panel>
    </div>
    <TextbookFooter subtitle="第四部分：網頁教材實戰" />
  </div>
);

// Slide 24: 國文差異化：通用性閱讀測驗 (使用 UDL 步驟卡片展示)
const Slide24_WebTool3: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="工具三︰通用性閱讀測驗" subtitle="互動工具" unit="單元 4" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.12fr 0.88fr',
        gap: 34,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      <ToolScreenshotFrame label="閱讀輔助畫面" delay={0.1}>
        <img
          src={imgTool3}
          alt="通用性閱讀測驗工具畫面"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'contain',
            borderRadius: 12,
          }}
        />
      </ToolScreenshotFrame>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          justifyContent: 'center',
          minHeight: 0,
        }}
      >
        <ToolBullet num="01" title="文章分段呈現" delay={0.14}>
          每次只處理一小段文字，避免整篇文章一次壓上來造成視覺負荷。
        </ToolBullet>
        <ToolBullet num="02" title="朗讀與高亮同步" delay={0.22} accent={colors.orange}>
          點擊段落後語音朗讀，文字同步高亮，支援識字與閱讀障礙學生。
        </ToolBullet>
        <ToolBullet num="03" title="等待倒數守住思考時間" delay={0.3}>
          朗讀後先等待，讓學生看完內容再作答，減少直接亂猜。
        </ToolBullet>
        <ToolBullet num="04" title="語速可調、可重複聽" delay={0.38}>
          學生能用自己的節奏反覆聽讀，讓自學網頁更接近個別化支持。
        </ToolBullet>
      </div>
    </div>
    <TextbookFooter subtitle="第四部分：網頁教材實戰" />
  </div>
);

// Slide 25: 痛點五：生成的網頁教材圖片全是表情符號 (Emoji)
const Slide25_EmojiPain: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title="為什麼 AI 生的網頁教材裡全是表情符號？"
      subtitle="痛點五"
      unit="單元 4"
    />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="原因分析" delay={0.1}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '38px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>避免失效破圖</strong>：AI 寫 HTML 時最喜歡用 Unicode Emoji 當成圖片。
          </li>
          <li>
            <strong style={{ fontSize: '200px' }}>🤣</strong>
            {''}
          </li>
        </ul>
      </Panel>
      <Panel title="三個方法" delay={0.25}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            fontSize: '36px',
            lineHeight: '1.5',
          }}
        >
          <li>
            <strong>解法一：Unsplash API</strong> — 動態嵌入高畫質生活實景照片
          </li>
          <li>
            <strong>解法二：用 SVG 向量圖形</strong> — 指令引導 AI 完全用 SVG 程式碼繪圖
          </li>
          <li>
            <strong>解法三：複製 Google Drive 連結</strong> — 複製轉換雲端硬碟直連圖片
          </li>
        </ul>
      </Panel>
    </div>
    <TextbookFooter subtitle="第四部分：網頁教材實戰" />
  </div>
);

// Slide 26: 解決對策：指定 Unsplash API 動態載入照片
const Slide26_EmojiHow: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="解法一︰Unsplash API " subtitle="網頁配圖" unit="單元 4" />
    <div
      style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 32, flex: 1, zIndex: 2 }}
    >
      <Panel title="引導 AI 使用外部免版權圖庫 API" delay={0.1}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '38px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>動態載入真實照片</strong>：使用 Unsplash API
            動態嵌入高畫質生活實景照片，跳過幼稚的表情符號。
          </li>
          <li>
            <strong>{''}</strong>
            {''}
          </li>
        </ul>
      </Panel>
      <Panel
        title=""
        delay={0.4}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <img
          src={imgUnsplashSports}
          alt="球類運動互動學習樂園"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        />
      </Panel>
    </div>
    <TextbookFooter subtitle="第四部分：網頁教材實戰" />
  </div>
);

// Slide 26b: 解決對策：要求 AI 用 SVG 向量繪圖
const Slide26b_SvgDraw: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="解法二︰用 SVG 向量圖形繪圖" subtitle="網頁配圖" unit="單元 4" />
    <div
      style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 32, flex: 1, zIndex: 2 }}
    >
      <Panel title="SVG 向量繪圖對策" delay={0.1}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '38px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>明確下達繪圖指令</strong>：下指令時直接命令 AI「使用 SVG
            標籤與路徑幫你畫圖」，而不是使用 Emoji。
          </li>
          <li>
            <strong>控制複雜度與適應性</strong>：指示 AI
            採用乾淨、線條簡單的向量風格，易於用程式碼渲染。
          </li>
          <li>
            <strong>嚴格禁止 Emoji 代替</strong>：明確加上限制條件，防止 AI 偷懶使用 Unicode
            表情符號干擾畫面。
          </li>
        </ul>
      </Panel>
      <Panel
        title="指令下達 (Prompt) 範例"
        delay={0.3}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div
          style={{
            background: colors.orangeLight,
            border: `2px dashed ${colors.orange}`,
            borderRadius: '12px',
            padding: '24px',
            fontFamily: 'var(--osd-font-display)',
            fontSize: '32px',
            lineHeight: '1.6',
            color: colors.text,
            textAlign: 'left',
          }}
        >
          <strong style={{ color: colors.orange, display: 'block', marginBottom: '8px' }}>
            💡 提示詞範例：
          </strong>
          「寫一個互動網頁教材。配圖部分完全使用 SVG 程式碼繪製圖示
          <strong>{''}</strong>
          {''}
          <strong>{''}</strong>
          {''}
        </div>
      </Panel>
    </div>
    <TextbookFooter subtitle="第四部分：網頁教材實戰" />
  </div>
);

// Slide 27: 進階乾貨：自製 Google Drive 雲端圖床
const Slide27_DriveHost: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="解法三︰ 複製Google Drive 連結" subtitle="自製圖床" unit="單元 4" />
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}
    >
      <Panel title="問題與原因" delay={0.1}>
        直接放 Drive 分享網址會破圖，因為它是「網頁檢視器」。
      </Panel>
      <Panel title="轉換公式" delay={0.2}>
        提取【檔案 ID】，重組為：
        <div
          style={{
            color: colors.accent,
            fontWeight: 700,
            wordBreak: 'break-all',
            marginTop: '10px',
            fontSize: '42px',
          }}
        >
          https://lh3.googleusercontent.com/d/【檔案 ID】
        </div>
      </Panel>
      <Panel title="提醒" delay={0.3}>
        共享權限一定要開啟「檢視者」。
      </Panel>
    </div>
    <TextbookFooter subtitle="第四部分：網頁教材實戰" />
  </div>
);

// Slide 29: 下午實作工作坊 II 任務說明 (使用步驟卡片展示)
const Slide29_Workshop2: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="實作6" subtitle="為學生打造自學網頁" unit="單元 4" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.9fr 1.1fr',
        gap: 30,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          background: colors.white,
          border: '2px solid #99f6e4',
          borderRadius: 16,
          padding: '34px 36px',
          boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 22,
        }}
      >
        <div
          style={{
            width: 'fit-content',
            background: colors.accentMuted,
            color: colors.accent,
            borderRadius: 10,
            padding: '8px 16px',
            fontSize: '26px',
            fontWeight: 900,
          }}
        >
          任務目標
        </div>
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '48px',
            fontWeight: 900,
            color: colors.text,
            lineHeight: 1.12,
          }}
        >
          選一個學科，設計課後自學互動網頁
        </div>
        <p style={{ margin: 0, fontSize: '31px', lineHeight: 1.5, color: colors.muted }}>
          請選擇國文、英文或數學，為一位低持續度、有書寫與閱讀障礙的學生設計自學網頁。
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <span
            style={{
              background: '#ecfeff',
              color: '#0e7490',
              borderRadius: 10,
              padding: '8px 14px',
              fontSize: '28px',
              fontWeight: 900,
            }}
          >
            國文
          </span>
          <span
            style={{
              background: '#eff6ff',
              color: '#1d4ed8',
              borderRadius: 10,
              padding: '8px 14px',
              fontSize: '28px',
              fontWeight: 900,
            }}
          >
            英文
          </span>
          <span
            style={{
              background: colors.orangeLight,
              color: colors.orange,
              borderRadius: 10,
              padding: '8px 14px',
              fontSize: '28px',
              fontWeight: 900,
            }}
          >
            數學
          </span>
        </div>
        <div
          style={{
            marginTop: 4,
            borderLeft: `8px solid ${colors.orange}`,
            background: colors.orangeLight,
            borderRadius: 12,
            padding: '18px 22px',
            fontSize: '30px',
            lineHeight: 1.38,
            color: colors.text,
            fontWeight: 850,
          }}
        >
          進階任務：讓老師看得到學生在家學習的內容與作答紀錄。
        </div>
        <UploadEntryLink delay={0.22} compact />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 16,
          minHeight: 0,
        }}
      >
        <WorkshopPainCard label="痛點 1" title="書寫困難" delay={0.1}>
          學生無法流暢打字或寫字，網頁要降低輸入負擔。
        </WorkshopPainCard>
        <WorkshopPainCard label="痛點 2" title="閱讀障礙" delay={0.18}>
          有注音、圖片、報讀支援，學習效果會更好。
        </WorkshopPainCard>
        <WorkshopPainCard label="痛點 3" title="持續度差、常點錯" delay={0.26}>
          看到按鈕就亂點，點錯容易挫折或分心。
        </WorkshopPainCard>
        <WorkshopPainCard label="痛點 4" title="想直接作答不思考" delay={0.34}>
          習慣用猜的，不想看題目，需要先看題再作答的設計。
        </WorkshopPainCard>
      </div>
    </div>
    <TextbookFooter subtitle="第四部分：自學網頁實作任務" />
  </div>
);

// Slide 30: 單元五過渡頁
const Slide30_Part4Header: Page = () => (
  <PartHeaderPage
    partNum="05"
    title="單元五：自製工具管理"
    desc="一鍵自製資源傳送門網頁，透過 GitHub Pages 免費發佈"
  />
);

// Slide 31: 痛點六：如何一鍵收集、整理並分享自己自製的 AI 工具與教材？
const Slide31_PortalPain: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title="如何收集自己製作的 AI 到網頁中集中管理？"
      subtitle="數位發佈"
      unit="單元 5"
    />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="核心痛點" delay={0.1}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '38px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>資料散落各處</strong>：做好的一堆學習單、Prompts 和 GPTs
            連結，散落各處難以管理。
          </li>
          <li>
            <strong>分享協作不易</strong>：要一個個複製給同事或家長，流程繁瑣且容易漏掉。
          </li>
        </ul>
      </Panel>
      <Panel title="解決對策：一鍵自製首頁" delay={0.25}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '38px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>網址丟給 AI 整合</strong>：將所有整理好的連結貼給
            AI，下指令要求直接做成數位學習網站。
          </li>
          <li>
            <strong>特教友善排版</strong>：要求 AI
            自動進行科目分類、加入即時搜尋、深淺色切換與放大字型按鈕。
          </li>
        </ul>
      </Panel>
    </div>
    <TextbookFooter subtitle="第五部分：發佈與共享篇" />
  </div>
);

// Slide 31b: 解決對策：GitHub Pages 免費部署
const Slide31b_GithubPages: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title="如何透過 GitHub Pages 免費發佈網頁？"
      subtitle="免費部署"
      unit="單元 5"
    />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="第一階段：上傳檔案" delay={0.1}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '36px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>1. 註冊 GitHub 帳號</strong>：至 <code>github.com</code> 免費註冊個人帳號。
          </li>
          <li>
            <strong>2. 新建儲存庫 (Repo)</strong>：點擊右上角「New」新建一個專案儲存庫。
          </li>
          <li>
            <strong>3. 設定名稱與上傳</strong>：輸入儲存庫名稱，將 AI 寫好的 <code>index.html</code>{' '}
            網頁檔案上傳。
          </li>
        </ul>
      </Panel>
      <Panel title="第二階段：設定 Pages 發佈" delay={0.25}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '36px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>4. 進入 Settings 頁面</strong>：進入該專案儲存庫頁面頂部的「Settings」。
          </li>
          <li>
            <strong>5. 開啟 Pages 選單</strong>：點擊左側功能選單中的「Pages」。
          </li>
          <li>
            <strong>6. 選取部署分支</strong>：在 Branch 區塊將 None 改選為「main」分支。
          </li>
          <li>
            <strong>7. 儲存與完成部署</strong>
            ：點擊「Save」，稍等一分鐘即可獲得您專屬的公開網站連結！
          </li>
        </ul>
      </Panel>
    </div>
    <TextbookFooter subtitle="第五部分：發佈與共享篇" />
  </div>
);

// Slide 33: 單元六過渡頁
const Slide33_Part5Header: Page = () => (
  <PartHeaderPage
    partNum="06"
    title="單元六：AI倫理+ Agent 小介紹"
    desc="特教倫理、資料隱私與 AI Agent 工具層次"
  />
);

// Slide 34b: 一般 AI vs AI Agent
const Slide34b_AIvsAgent: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="一般 AI vs AI Agent" subtitle="工具層次" unit="單元 6" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: 24,
        flex: 1,
        zIndex: 2,
        alignItems: 'stretch',
      }}
    >
      {/* Left: 一般 AI */}
      <Panel
        title="🤖 一般 AI"
        delay={0.1}
        style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
      >
        <p style={{ margin: 0, fontSize: '34px', color: colors.muted, lineHeight: 1.5 }}>
          加速「點狀」工作。每次手動發問，加速單一任動。
        </p>
        {/* 點狀視覺 */}
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}
        >
          {['簡化教材', '寫學習單', '製作試題'].map((task) => (
            <div key={task} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: colors.accent,
                  border: '3px solid #93c5fd',
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  background: '#eff6ff',
                  border: '2px solid #bfdbfe',
                  borderRadius: 10,
                  padding: '10px 20px',
                  fontSize: '34px',
                  fontWeight: 700,
                  color: colors.accent,
                }}
              >
                {task}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '32px', color: colors.muted, fontStyle: 'italic' }}>
          → 每個點都需要您手動觸發
        </div>
      </Panel>
      {/* Middle Arrow */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 8,
          padding: '0 8px',
        }}
      >
        <div style={{ fontSize: '48px', color: '#94a3b8' }}>⇨</div>
        <div
          style={{
            fontSize: '24px',
            color: colors.muted,
            textAlign: 'center',
            writingMode: 'vertical-rl',
          }}
        >
          進化
        </div>
      </div>
      {/* Right: AI Agent */}
      <Panel
        title="🤖➡️ AI Agent"
        delay={0.2}
        style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
      >
        <p style={{ margin: 0, fontSize: '34px', color: colors.muted, lineHeight: 1.5 }}>
          將點串成鏈，自動執行完整流程。
        </p>
        {/* 連線點狀視覺 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            alignItems: 'flex-start',
            position: 'relative',
          }}
        >
          {['簡化教材', '生成網頁', '語音報讀', '自動存檔'].map((task, i) => (
            <div
              key={task}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: '#059669',
                      border: '3px solid #6ee7b7',
                      flexShrink: 0,
                    }}
                  />
                  {i < 3 && <div style={{ width: 3, height: 24, background: '#6ee7b7' }} />}
                </div>
                <div
                  style={{
                    background: '#f0fdf4',
                    border: '2px solid #a7f3d0',
                    borderRadius: 10,
                    padding: '10px 20px',
                    fontSize: '34px',
                    fontWeight: 700,
                    color: '#059669',
                  }}
                >
                  {task}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '32px', color: '#059669', fontWeight: 700 }}>
          → AI 自動依序完成，不需介入
        </div>
      </Panel>
    </div>
    <TextbookFooter subtitle="第六部分：優雅備課與總結" />
  </div>
);

const Slide34d_ExamSkillShare: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="Skill 分享：考卷產生 Agent" subtitle="exam_generator" unit="單元 6" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.12fr 0.88fr',
        gap: 36,
        flex: 1,
        zIndex: 2,
        alignItems: 'stretch',
      }}
    >
      <Panel
        title="這個 Skill 做什麼？"
        delay={0.1}
        style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
      >
        <p style={{ margin: 0, fontSize: '38px', lineHeight: 1.55, color: colors.text }}>
          把常用的出題流程包成一個 AI Skill：老師只要說明科目、題型、題數與需求， AI
          會依流程產出學生版、教師版與解析檔。
        </p>
        <div
          style={{
            background: '#ecfeff',
            border: '2px solid #a5f3fc',
            borderRadius: 16,
            padding: '24px 28px',
            fontSize: '36px',
            lineHeight: 1.5,
            fontWeight: 800,
            color: colors.accent,
          }}
        >
          適合：段考報讀、學習單改編、練習卷快速產生
        </div>
      </Panel>
      <Panel title="GitHub 來源" delay={0.25} style={{ justifyContent: 'center', gap: 28 }}>
        <div
          style={{
            fontSize: '34px',
            color: colors.muted,
            lineHeight: 1.5,
            fontWeight: 700,
          }}
        >
          安裝與原始碼：
        </div>
        <a
          href="https://github.com/chuoneone/exam_generator"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'block',
            color: colors.accent,
            background: colors.accentMuted,
            border: '3px solid #5eead4',
            borderRadius: 16,
            padding: '28px 30px',
            fontSize: '42px',
            lineHeight: 1.25,
            fontWeight: 900,
            textDecoration: 'none',
            wordBreak: 'break-word',
          }}
        >
          chuoneone/exam_generator
        </a>
        <div style={{ fontSize: '30px', color: colors.muted, lineHeight: 1.4 }}>
          https://github.com/chuoneone/exam_generator
        </div>
      </Panel>
    </div>
    <TextbookFooter subtitle="第六部分：優雅備課與總結" />
  </div>
);

const Slide34e_ExamSkillFlow: Page = () => (
  <div style={{ ...fill, padding: 0 }}>
    <TextbookBg />
    <h2
      style={{
        position: 'absolute',
        top: 58,
        left: 120,
        right: 120,
        zIndex: 2,
        margin: 0,
        textAlign: 'center',
        fontFamily: 'var(--osd-font-display)',
        fontSize: '74px',
        lineHeight: 1.1,
        fontWeight: 900,
        color: colors.text,
      }}
    >
      exam_generator 操作流程
    </h2>
    <SkillFlowShot
      src={imgSkill1}
      alt="安裝 exam_generator skill 的截圖"
      delay={0.1}
      style={{ left: 120, top: 190, width: 720, height: 696 }}
    />
    <SkillFlowShot
      src={imgSkill2}
      alt="輸入題目需求並產出教材的截圖"
      delay={0.2}
      style={{ left: 980, top: 205, width: 650, height: 558 }}
    />
    <SkillFlowShot
      src={imgSkill3}
      alt="產出的六個教材檔案截圖"
      delay={0.3}
      style={{ left: 980, top: 788, width: 650, height: 277 }}
    />
  </div>
);

// Slide 34c: Gem vs Skill
const Slide34c_GemVsSkill: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="Gem vs Skill" subtitle="工具層次" unit="單元 6" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        flex: 1,
        zIndex: 2,
        alignItems: 'stretch',
      }}
    >
      {/* Left: Gem */}
      <Panel
        title="💎 Gem（定製化 AI）"
        delay={0.1}
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <div
          style={{
            fontSize: '34px',
            color: '#7c3aed',
            fontWeight: 800,
            background: '#f5f3ff',
            border: '2px solid #ddd6fe',
            borderRadius: 12,
            padding: '12px 20px',
          }}
        >
          「你想要做什麼，再去選工具」
        </div>
        <ul
          style={{
            paddingLeft: 20,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            fontSize: '34px',
            lineHeight: 1.5,
          }}
        >
          <li>儲存角色設定與常用指令，不用每次重新輸入</li>
          <li>單擊即可產生，適合重複性简化任動</li>
          <li>使用者主動選擇要啟用哪個 Gem</li>
        </ul>
        <div style={{ marginTop: 'auto', fontSize: '30px', color: '#7c3aed', fontStyle: 'italic' }}>
          例：「特教教材簡化 Gem」→點擊→一鍵產出
        </div>
      </Panel>
      {/* Right: Skill */}
      <Panel
        title="✨ Skill（AI 職業技能包）"
        delay={0.2}
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <div
          style={{
            fontSize: '34px',
            color: '#d97706',
            fontWeight: 800,
            background: '#fffbeb',
            border: '2px solid #fde68a',
            borderRadius: 12,
            padding: '12px 20px',
          }}
        >
          「AI 看情況，自行决定要做什麼」
        </div>
        <ul
          style={{
            paddingLeft: 20,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            fontSize: '34px',
            lineHeight: 1.5,
          }}
        >
          <li>關鍵字觸發後，AI 自主判斷要執行哪些任動</li>
          <li>不需選工具，AI 能同時運用多種技能</li>
          <li>AI 辨識上下文，主動判斷現在需要做什麼</li>
        </ul>
        <div style={{ marginTop: 'auto', fontSize: '30px', color: '#d97706', fontStyle: 'italic' }}>
          例：輸入「特教備課」，AI 自行分析『需簡化→需語音→需存檔』
        </div>
      </Panel>
    </div>
    <TextbookFooter subtitle="第六部分：優雅備課與總結" />
  </div>
);

// Slide 34: 研習總結
const Slide34_Summary: Page = () => (
  <div
    style={{
      ...fill,
      justifyContent: 'center',
      alignItems: 'center',
      padding: '110px 150px',
    }}
  >
    <TextbookBg />
    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        width: '100%',
        maxWidth: 1500,
        display: 'grid',
        gap: 42,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          justifySelf: 'center',
          width: 'fit-content',
          background: colors.orangeLight,
          color: colors.orange,
          border: '2px solid #fed7aa',
          borderRadius: 14,
          padding: '10px 24px',
          fontSize: 30,
          fontWeight: 950,
          letterSpacing: '0.08em',
        }}
      >
        最後想留下的一句話
      </div>
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.86)',
          border: '3px solid #ccfbf1',
          borderRadius: 28,
          padding: '58px 76px 64px',
          boxShadow: '0 28px 70px rgba(15, 23, 42, 0.1)',
          display: 'grid',
          gap: 34,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 82,
            lineHeight: 1.16,
            color: colors.text,
            fontWeight: 950,
            letterSpacing: 0,
          }}
        >
          沒有最好、最快、
          <br />
          最厲害的使用方式
        </h2>
        <div
          style={{
            height: 4,
            width: 520,
            justifySelf: 'center',
            borderRadius: 999,
            background: `linear-gradient(90deg, transparent, ${colors.accent}, ${colors.orange}, transparent)`,
          }}
        />
        <div
          style={{
            fontSize: 76,
            lineHeight: 1.12,
            fontWeight: 980,
            color: colors.accent,
            fontFamily: 'var(--osd-font-display)',
          }}
        >
          只有最適合你的方式
        </div>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 46,
          lineHeight: 1.42,
          color: colors.text,
          fontWeight: 850,
        }}
      >
        資訊融入教育的精華，
        <span style={{ color: colors.orange, fontWeight: 950 }}>仍然是在教育者本身。</span>
      </p>
    </div>
  </div>
);

// Slide 35: Q&A 與交流時間
const Slide35_QA: Page = () => (
  <div
    style={{
      ...fill,
      padding: '115px 135px 140px',
      justifyContent: 'center',
    }}
  >
    <TextbookBg />
    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.06fr 0.94fr',
        gap: 64,
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'grid', gap: 28 }}>
        <div
          style={{
            width: 'fit-content',
            background: colors.orangeLight,
            color: colors.orange,
            border: '2px solid #fed7aa',
            borderRadius: 12,
            padding: '10px 22px',
            fontSize: 28,
            fontWeight: 950,
            fontFamily: 'var(--osd-font-display)',
            letterSpacing: '0.08em',
          }}
        >
          Q&A 與交流時間
        </div>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 132,
            lineHeight: 1.02,
            fontWeight: 950,
            color: colors.text,
            margin: 0,
            letterSpacing: 0,
          }}
        >
          謝謝大家
        </h1>
        <p
          style={{
            fontSize: 52,
            lineHeight: 1.24,
            color: colors.accent,
            fontWeight: 900,
            margin: 0,
          }}
        >
          讓我們一起優雅備課
        </p>
        <div
          style={{
            width: 620,
            height: 6,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${colors.accent}, ${colors.orange}, transparent)`,
          }}
        />
        <div
          style={{
            width: 'fit-content',
            background: colors.white,
            border: '2px solid #e2e8f0',
            borderRadius: 18,
            padding: '20px 28px',
            color: colors.muted,
            fontSize: 32,
            lineHeight: 1.35,
            fontWeight: 800,
            boxShadow: '0 16px 36px rgba(15, 23, 42, 0.08)',
          }}
        >
          PADLET推薦連結
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          minHeight: 520,
          background: colors.text,
          borderRadius: 32,
          border: '3px solid rgba(255,255,255,0.18)',
          boxShadow: '0 32px 80px rgba(15, 23, 42, 0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '58px 64px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '0 auto auto 0',
            width: '100%',
            height: 14,
            background: `linear-gradient(90deg, ${colors.accent}, ${colors.orange})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -80,
            top: 56,
            width: 260,
            height: 260,
            border: '28px solid rgba(20, 184, 166, 0.25)',
            borderRadius: 32,
            transform: 'rotate(14deg)',
          }}
        />
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 178,
            lineHeight: 0.92,
            fontWeight: 950,
            color: colors.white,
            letterSpacing: 0,
          }}
        >
          Q&A
        </div>
        <div
          style={{
            marginTop: 34,
            display: 'grid',
            gap: 16,
            color: '#e2e8f0',
            fontSize: 36,
            lineHeight: 1.36,
            fontWeight: 750,
          }}
        >
          <div>提問</div>
          <div>交流</div>
          <div>把下一步帶回教室</div>
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="Q&A 與交流時間" />
  </div>
);

// 實作投影片定義
const Slide21_Practice1: Page = () => (
  <PracticeHeaderPage num="3" title="（10分鐘）" desc="請嘗試利用此GEM 生成並微調" />
);

const Slide23_Practice2: Page = () => (
  <PracticeHeaderPage num="4" title="（10分鐘）" desc="請嘗試利用「試用Gemini Canvas」修改" />
);

const Slide24_Practice3: Page = () => (
  <PracticeHeaderPage num="5" title="（10分鐘）" desc="請嘗試利用「試用Gemini Canvas」修改" />
);

const Slide24b_InteractiveTemplates: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="米克師工具推薦-互動模版" subtitle="單元四延伸應用" unit="單元 4" />
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: 28,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          background: colors.white,
          border: '2px solid #e2e8f0',
          borderRadius: 16,
          padding: '22px 30px',
          boxShadow: '0 14px 30px rgba(15, 23, 42, 0.06)',
          fontSize: '32px',
          fontWeight: 800,
          color: colors.text,
          lineHeight: 1.35,
        }}
      >
        從空白頁開始很花力氣，直接套用互動模版，可以把時間留給題目設計與學生回饋。
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, minHeight: 0 }}>
        <SubjectToolCard
          num="01"
          title="線上段考模版"
          href="https://spedmix.pages.dev/examtest"
          delay={0.1}
          note=""
        >
          快速建立可線上作答的測驗頁面，分段呈現各大題分數，能有效維持學生答題動機。適合段考複習、課堂小考與自學檢核。
        </SubjectToolCard>
        <SubjectToolCard
          num="02"
          title="課堂互動遊戲模版"
          href="https://spedmix.pages.dev/cowboy"
          delay={0.2}
          accent={colors.orange}
          note=""
        >
          將練習題包裝成課堂互動遊戲，讓學生在即時回饋中反覆練習。
        </SubjectToolCard>
      </div>
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.3s',
          background: colors.text,
          color: colors.white,
          borderRadius: 16,
          padding: '20px 30px',
          fontSize: '34px',
          lineHeight: 1.25,
          fontWeight: 900,
          textAlign: 'center',
        }}
      >
        互動模版的核心：先有穩定骨架，再把教材內容換成自己的版本。
      </div>
    </div>
    <TextbookFooter subtitle="第四部分：互動式網頁教材實戰" />
  </div>
);

const Slide31c_PracticeChallenge: Page = () => (
  <PracticeHeaderPage
    num="7"
    title="教材傳送門發布挑戰（20分鐘）"
    desc="自製您的教材傳送門網頁，並使用 GitHub Pages 免費發佈共享！"
  />
);

export const meta: SlideMeta = {
  title: '生成式 AI × 特殊教育教材備課：從客製化教材到互動實務',
  createdAt: '2026-07-02T00:15:00+08:00',
};

// ==========================================
// 4. 匯出投影片頁面數組
// ==========================================
export default [
  Slide01_Title,
  Slide02_Speaker,
  Slide02a_WorkshopSlides,
  Slide02c_Social,
  Slide06_MixerIntro,
  Slide03_Needs,
  Slide02b_Outline,
  Slide04_Anxiety,
  Slide04b_WorkStyle,
  Slide05_Mindset,
  Slide08_Part2Header,
  Slide08_AdminDocs,
  Slide08_AdminPractice,
  Slide08_Part3Header,
  Slide09_PaperTool1,
  Slide10_PaperTool2,
  Slide10b_AIModeCompare,
  Slide11_Workshop1,
  Slide12_WhyPrompt,
  Slide13_AIRevise,
  Slide14_PromptCycle,
  Slide15_OutputModes,
  Slide16_ZhuyinFontChoice,
  Slide17_MathFormat,
  Slide17b_ConsistentImages,
  Slide18_Workshop2,
  Slide18b_ChineseAiTools,
  Slide18c_MathAiTools,
  Slide18d_OtherAiTools,
  Slide19_Part3Header,
  Slide19b_WhyGeminiCanvas,
  Slide19c_PracticeLinksImage,
  Slide20_WebTool1,
  Slide21_WebTool1Core,
  Slide21_Practice1,
  Slide22_WebTool2,
  Slide23_WebTool2Core,
  Slide23_Practice2,
  Slide24_WebTool3,
  Slide24_Practice3,
  Slide24b_InteractiveTemplates,
  Slide25_EmojiPain,
  Slide26_EmojiHow,
  Slide26b_SvgDraw,
  Slide27_DriveHost,
  Slide29_Workshop2,
  Slide30_Part4Header,
  Slide31_PortalPain,
  Slide31b_GithubPages,
  Slide31c_PracticeChallenge,
  Slide33_Part5Header,
  Slide07_Ethics,
  Slide08_GoogleNoTraining,
  Slide34b_AIvsAgent,
  Slide34d_ExamSkillShare,
  Slide34e_ExamSkillFlow,
  Slide34c_GemVsSkill,
  Slide34_Summary,
  Slide35_QA,
] satisfies Page[];
