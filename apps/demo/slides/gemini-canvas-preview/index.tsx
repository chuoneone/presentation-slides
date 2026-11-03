import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useCallback, useEffect, useId, useState } from 'react';
import imgCanvasMenu from './assets/canvas-menu.png';
import imgGenerating from './assets/generating.png';
import imgPreview from './assets/preview.png';
import imgPrompt from './assets/prompt.png';
import imgResult from './assets/result.png';
import imgSent from './assets/sent.png';
import imgUpload from './assets/upload.png';

const SLIDE_ID = 'gemini-canvas-preview';

const FONT =
  '"Gabarito", "Chiron GoRound TC", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif';
const MONO = '"DM Mono", ui-monospace, monospace';

const cream = '#FFF3DF';
const ink = '#151313';
const coral = '#FF5A2C';
const body = '#3D3833';
const muted = '#736D65';
const rule = 'rgba(21, 19, 19, 0.16)';
const paper = '#FFFCF6';
const yellow = '#FFD23F';
const blue = '#98A6FF';
const pink = '#FFB0D0';
const green = '#7EDDB0';
const tintYellow = '#FFE48A';
const tintBlue = '#C9CFFF';
const tintPink = '#FFD3E4';
const tintGreen = '#BDEFD5';

const hard = (n: number) => `${n}px ${n}px 0 ${ink}`;
const border = `4px solid ${ink}`;

export const design: DesignSystem = {
  palette: { bg: cream, text: ink, accent: coral },
  fonts: { display: FONT, body: FONT },
  typeScale: { hero: 150, body: 34 },
  radius: 28,
};

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
      { opacity: 0, transform: 'translateY(5px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Chiron+GoRound+TC:wght@400;500;700;900&family=DM+Mono:wght@500&family=Gabarito:wght@500;700;800;900&display=swap';

const KEYFRAMES = `
@keyframes gcp-pop { from { opacity: 0; transform: scale(0.6) } to { opacity: 1; transform: scale(1) } }
@keyframes gcp-rise { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }
`;

if (typeof document !== 'undefined') {
  const linkId = `osd-webfont-${SLIDE_ID}`;
  let link = document.getElementById(linkId) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;
  const styleId = `osd-styles-${SLIDE_ID}`;
  let style = document.getElementById(styleId);
  if (!style) {
    style = document.createElement('style');
    style.id = styleId;
    document.head.appendChild(style);
  }
  if (style.textContent !== KEYFRAMES) style.textContent = KEYFRAMES;
}

const abs = (left: number, top: number, width?: number, height?: number): CSSProperties => ({
  position: 'absolute',
  left,
  top,
  width,
  height,
});

const root: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  background: cream,
  color: ink,
  fontFamily: FONT,
  fontVariantNumeric: 'tabular-nums',
  WebkitFontSmoothing: 'antialiased',
};

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      margin: 0,
      fontFamily: FONT,
      fontSize: 132,
      fontWeight: 900,
      lineHeight: 1.08,
      letterSpacing: '-0.035em',
      color: ink,
    }}
  >
    {children}
  </h1>
);

const Heading = ({ children, size = 80 }: { children: ReactNode; size?: number }) => (
  <h2
    style={{
      margin: 0,
      fontFamily: FONT,
      fontSize: size,
      fontWeight: 900,
      lineHeight: 1.1,
      letterSpacing: '-0.035em',
      color: ink,
    }}
  >
    {children}
  </h2>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      height: 50,
      padding: '0 24px',
      border: `3px solid ${ink}`,
      borderRadius: 999,
      background: yellow,
      boxShadow: hard(4),
      fontSize: 28,
      fontWeight: 800,
      color: ink,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);

const Highlight = ({ children, color = yellow }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      background: color,
      borderRadius: 10,
      padding: '0 8px',
      margin: '0 2px',
      color: ink,
      fontWeight: 800,
      boxShadow: `inset 0 0 0 3px ${ink}`,
      WebkitBoxDecorationBreak: 'clone',
      boxDecorationBreak: 'clone',
    }}
  >
    {children}
  </span>
);

const TintCard = ({
  tint = tintBlue,
  style,
  children,
}: {
  tint?: string;
  style?: CSSProperties;
  children: ReactNode;
}) => (
  <div
    style={{
      position: 'relative',
      boxSizing: 'border-box',
      borderRadius: 28,
      background: tint,
      border,
      boxShadow: hard(8),
      padding: '34px 44px 32px',
      ...style,
    }}
  >
    {children}
  </div>
);

const Mark = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    aria-hidden="true"
    style={{ display: 'block', overflow: 'visible' }}
  >
    <path
      d="M36.5 13.5 C 38.5 6, 46.5 2.5, 55 4.5 C 53 12, 45 16, 36.5 13.5 Z"
      style={{ fill: green, stroke: ink, strokeWidth: 3.5, strokeLinejoin: 'round' }}
    />
    <path
      d="M32 19 C 32 13, 33 9, 36 6"
      style={{ fill: 'none', stroke: ink, strokeWidth: 4, strokeLinecap: 'round' }}
    />
    <path
      d="M32 19 C 23 13, 6 15, 6 34 C 6 50, 17 60, 25 60 C 28 60, 30 58.5, 32 58.5 C 34 58.5, 36 60, 39 60 C 47 60, 58 50, 58 34 C 58 15, 41 13, 32 19 Z"
      style={{ fill: coral, stroke: ink, strokeWidth: 4, strokeLinejoin: 'round' }}
    />
    <path
      d="M26.5 58.6 V 47 A 5.5 5.5 0 0 1 37.5 47 V 58.6"
      style={{ fill: cream, stroke: ink, strokeWidth: 3.5, strokeLinejoin: 'round' }}
    />
    <path
      d="M15 30 C 15.5 25.5, 18.5 22.5, 22.5 21.5"
      style={{ fill: 'none', stroke: paper, strokeWidth: 3.5, strokeLinecap: 'round' }}
    />
  </svg>
);

const Footer = ({ label = 'Gemini Canvas 預覽程式' }: { label?: string }) => {
  const { current, total } = useSlidePageNumber();
  const pad2 = (n: number) => String(n).padStart(2, '0');
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 996,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 24,
        color: muted,
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Mark size={34} />
        <span style={{ color: ink, fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em' }}>
          米克師
        </span>
        <span style={{ marginLeft: 12, fontWeight: 600 }}>{label}</span>
      </span>
      <span
        style={{
          fontFamily: MONO,
          fontSize: 17,
          letterSpacing: '0.06em',
          height: 38,
          padding: '0 16px',
          borderRadius: 999,
          background: ink,
          color: cream,
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        {pad2(current)} / {pad2(total)}
      </span>
    </div>
  );
};

const Ink = ({
  width,
  height,
  style,
  children,
}: {
  width: number;
  height: number;
  style?: CSSProperties;
  children: ReactNode;
}) => {
  const id = `gcp${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg
      aria-hidden="true"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      stroke={ink}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', overflow: 'visible', ...style }}
    >
      <defs>
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={4} />
          <feDisplacementMap in="SourceGraphic" scale={2.2} />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>{children}</g>
    </svg>
  );
};

const Sparkle = ({
  x,
  y,
  s = 1,
  fill = yellow,
}: {
  x: number;
  y: number;
  s?: number;
  fill?: string;
}) => (
  <path
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M0 -20Q3 -3 20 0Q3 3 0 20Q-3 3 -20 0Q-3 -3 0 -20Z"
    fill={fill}
    strokeWidth={3 / s}
  />
);

const Shot = ({
  src,
  alt,
  style,
  fit = 'contain',
  position = 'center',
}: {
  src: string;
  alt: string;
  style?: CSSProperties;
  fit?: 'contain' | 'cover';
  position?: string;
}) => (
  <div
    style={{
      position: 'absolute',
      boxSizing: 'border-box',
      borderRadius: 22,
      overflow: 'hidden',
      background: paper,
      border,
      boxShadow: hard(8),
      ...style,
    }}
  >
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: fit,
        objectPosition: position,
        display: 'block',
      }}
    />
  </div>
);

type ShotMark = { x: number; y: number; w: number; h: number; tag: string; below?: boolean };

// Screenshots are frames cropped from the 1918×1128 screen recording.
const NAT_W = 1918;
const NAT_H = 1128;

const MarkedShot = ({
  src,
  alt,
  left = 740,
  top = 300,
  width = 1060,
  marks = [],
}: {
  src: string;
  alt: string;
  left?: number;
  top?: number;
  width?: number;
  marks?: ShotMark[];
}) => {
  const k = width / NAT_W;
  return (
    <div style={abs(left, top, width, NAT_H * k)}>
      <Shot src={src} alt={alt} style={{ inset: 0 }} />
      {marks.map((m) => (
        <div
          key={m.tag}
          style={{
            ...abs(m.x * k - 8, m.y * k - 8, m.w * k + 16, m.h * k + 16),
            boxSizing: 'border-box',
            border: `5px solid ${coral}`,
            borderRadius: 14,
          }}
        >
          <span
            style={{
              position: 'absolute',
              right: -4,
              ...(m.below ? { top: '100%', marginTop: 10 } : { bottom: '100%', marginBottom: 10 }),
              padding: '6px 16px',
              borderRadius: 999,
              background: coral,
              color: ink,
              border: `3px solid ${ink}`,
              boxShadow: hard(4),
              fontSize: 28,
              fontWeight: 800,
              whiteSpace: 'nowrap',
            }}
          >
            {m.tag}
          </span>
        </div>
      ))}
    </div>
  );
};

const CopyIcon = ({ done }: { done: boolean }) => (
  <svg
    aria-hidden="true"
    width={26}
    height={26}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {done ? (
      <path d="M4 12.5l5 5L20 6.5" />
    ) : (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2.5" />
        <path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" />
      </>
    )}
  </svg>
);

const CopyButton = ({ text, label = '一鍵複製' }: { text: string; label?: string }) => {
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
        border: `3px solid ${ink}`,
        cursor: 'pointer',
        borderRadius: 999,
        padding: '14px 28px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        background: copied ? green : coral,
        color: ink,
        boxShadow: hard(4),
        fontFamily: FONT,
        fontSize: 28,
        fontWeight: 800,
        whiteSpace: 'nowrap',
      }}
    >
      <CopyIcon done={copied} />
      {copied ? '已複製！' : label}
    </button>
  );
};

const NumBadge = ({ n, fill }: { n: string; fill: string }) => (
  <div
    style={{
      width: 64,
      height: 64,
      borderRadius: 999,
      background: fill,
      border: `3px solid ${ink}`,
      boxSizing: 'border-box',
      boxShadow: hard(4),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 38,
      fontWeight: 900,
      flexShrink: 0,
    }}
  >
    {n}
  </div>
);

const Bullet = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      gap: 18,
      alignItems: 'baseline',
      fontSize: 34,
      lineHeight: 1.5,
      color: body,
    }}
  >
    <span
      style={{
        width: 14,
        height: 14,
        borderRadius: 99,
        background: coral,
        border: `2.5px solid ${ink}`,
        flexShrink: 0,
        transform: 'translateY(-6px)',
      }}
    />
    <span>{children}</span>
  </div>
);

const PageHead = ({ eyebrow, title }: { eyebrow: string; title: ReactNode }) => (
  <>
    <div style={abs(120, 84)}>
      <Eyebrow>{eyebrow}</Eyebrow>
    </div>
    <div style={abs(120, 162, 1680)}>
      <Heading>{title}</Heading>
    </div>
  </>
);

const SideList = ({ children }: { children: ReactNode }) => (
  <div style={{ ...abs(120, 320, 560), display: 'flex', flexDirection: 'column', gap: 24 }}>
    {children}
  </div>
);

const previewPrompt = '用預覽模式canvas開啟';

const Cover: Page = () => (
  <div style={root}>
    <div style={{ ...abs(120, 100), display: 'flex', alignItems: 'center', gap: 14 }}>
      <Mark size={32} />
      <span style={{ fontSize: 30, fontWeight: 760, letterSpacing: '-0.02em' }}>Gemini Canvas</span>
    </div>
    <div style={abs(120, 250)}>
      <Title>
        含 AI 功能的程式
        <br />
        <span style={{ color: coral }}>免 API key</span>
        <br />
        直接執行
      </Title>
    </div>
    <p style={{ ...abs(120, 760, 1040), margin: 0, fontSize: 40, lineHeight: 1.5, color: body }}>
      把程式放進 Gemini Canvas 預覽，<Highlight>AI 功能登入就能用</Highlight>。
    </p>
    <div style={{ ...abs(120, 900), fontSize: 28, color: muted }}>特教教師研習 · 米克師</div>
    <Ink width={560} height={600} style={abs(1220, 240)}>
      <circle cx="290" cy="300" r="250" fill={tintYellow} stroke="none" />
      <rect x="90" y="120" width="400" height="300" rx="18" fill={paper} />
      <path d="M90 170h400" />
      <circle cx="122" cy="145" r="7" fill={coral} />
      <circle cx="148" cy="145" r="7" fill={yellow} />
      <circle cx="174" cy="145" r="7" fill={green} />
      <path d="M130 215h170" />
      <path d="M130 255h230" stroke={muted} />
      <path d="M130 290h200" stroke={muted} />
      <rect x="130" y="330" width="180" height="54" rx="27" fill={blue} />
      <circle cx="440" cy="470" r="70" fill={paper} />
      <circle cx="420" cy="455" r="18" fill={yellow} />
      <path d="M434 469l38 38M455 490l-10 10M465 500l-10 10" />
      <circle cx="440" cy="470" r="70" stroke={coral} strokeWidth={8} />
      <path d="M392 422l96 96" stroke={coral} strokeWidth={8} />
      <Sparkle x={470} y={110} s={1.6} fill={blue} />
      <Sparkle x={70} y={470} s={1.1} />
    </Ink>
    <Footer />
  </div>
);

const Problem: Page = () => (
  <div style={root}>
    <PageHead eyebrow="為什麼要這樣做" title="自己做的 AI 程式，卡在 API key" />
    <TintCard
      tint={tintPink}
      style={{ ...abs(120, 330, 800, 600), display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      <div style={{ fontSize: 46, fontWeight: 900, letterSpacing: '-0.03em' }}>直接打開 HTML</div>
      <div style={{ borderTop: `3px dashed ${rule}` }} />
      <Bullet>要先去申請 API key</Bullet>
      <Bullet>金鑰要貼進程式，怕外流</Bullet>
      <Bullet>分享給別人，每個人都要有 key</Bullet>
      <Bullet>AI 功能按下去沒反應</Bullet>
    </TintCard>
    <TintCard
      tint={tintGreen}
      style={{ ...abs(1000, 330, 800, 600), display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      <div style={{ fontSize: 46, fontWeight: 900, letterSpacing: '-0.03em' }}>
        放進 Gemini Canvas
      </div>
      <div style={{ borderTop: `3px dashed ${rule}` }} />
      <Bullet>登入 Google 帳號就能用</Bullet>
      <Bullet>AI 由 Gemini 環境直接提供</Bullet>
      <Bullet>不用申請、不用貼金鑰</Bullet>
      <Bullet>
        <Highlight>上傳 → 一句話 → 預覽</Highlight>
      </Bullet>
    </TintCard>
    <Footer />
  </div>
);

const steps = [
  { n: '1', title: '上傳程式檔', desc: '按「＋」上傳 HTML 檔', tint: tintBlue, fill: blue },
  { n: '2', title: '輸入一句話', desc: '用預覽模式 canvas 開啟', tint: tintGreen, fill: green },
  { n: '3', title: '選 Canvas 送出', desc: '工具清單裡選 Canvas', tint: tintPink, fill: pink },
  { n: '4', title: '預覽並使用', desc: 'AI 功能直接動起來', tint: tintYellow, fill: yellow },
];

const Steps: Page = () => (
  <div style={root}>
    <PageHead eyebrow="流程總覽" title="四個步驟就完成" />
    {steps.map((s, i) => (
      <TintCard
        key={s.n}
        tint={s.tint}
        style={{
          ...abs(120 + i * 426, 340, 402, 440),
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
        }}
      >
        <NumBadge n={s.n} fill={s.fill} />
        <div style={{ fontSize: 46, fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.03em' }}>
          {s.title}
        </div>
        <div style={{ fontSize: 34, lineHeight: 1.5, color: body }}>{s.desc}</div>
      </TintCard>
    ))}
    <Footer />
  </div>
);

const Upload: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Step 1 · 上傳程式" title="把程式檔丟給 Gemini" />
    <SideList>
      <Bullet>
        按輸入框左邊的 <b style={{ color: ink }}>＋</b>
      </Bullet>
      <Bullet>
        選 <b style={{ color: ink }}>上傳檔案</b>
      </Bullet>
      <Bullet>挑你的 HTML 程式檔</Bullet>
      <TintCard
        tint={tintGreen}
        style={{ marginTop: 12, padding: '26px 32px', fontSize: 30, lineHeight: 1.5, color: body }}
      >
        範例：<b style={{ color: ink }}>國文課堂學習單生成系統.html</b>
      </TintCard>
    </SideList>
    <MarkedShot
      src={imgUpload}
      alt="檔案總管中選取國文課堂學習單生成系統.html"
      marks={[{ x: 435, y: 864, w: 1013, h: 36, tag: '選程式檔' }]}
    />
    <Footer />
  </div>
);

const Prompt: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Step 2 · 輸入指令" title="只要打一句話" />
    <TintCard
      tint={tintYellow}
      style={{ ...abs(120, 330, 560), display: 'flex', flexDirection: 'column', gap: 22 }}
    >
      <div style={{ fontFamily: MONO, fontSize: 20, letterSpacing: '0.06em', color: muted }}>
        指令 · PROMPT
      </div>
      <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.4 }}>{previewPrompt}</div>
      <div>
        <CopyButton text={previewPrompt} />
      </div>
    </TintCard>
    <p style={{ ...abs(120, 700, 560), margin: 0, fontSize: 32, lineHeight: 1.55, color: body }}>
      檔案會出現在輸入框上方，確認是你要的那一份。
    </p>
    <MarkedShot
      src={imgPrompt}
      alt="Gemini 輸入框上方附上程式檔，輸入用預覽模式canvas開啟"
      marks={[{ x: 530, y: 822, w: 300, h: 60, tag: '輸入這句', below: true }]}
    />
    <Footer />
  </div>
);

const PickCanvas: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Step 3 · 選 Canvas" title="工具選 Canvas，再送出" />
    <SideList>
      <Bullet>
        再按一次 <b style={{ color: ink }}>＋</b>
      </Bullet>
      <Bullet>往下捲，找到 Canvas</Bullet>
      <Bullet>輸入框出現 Canvas 標籤</Bullet>
      <Bullet>按右邊箭頭送出</Bullet>
      <TintCard
        tint={tintPink}
        style={{ marginTop: 12, padding: '26px 32px', fontSize: 30, lineHeight: 1.5, color: body }}
      >
        <b style={{ color: ink }}>這步最常漏掉！</b>沒選 Canvas，就只會得到一段文字。
      </TintCard>
    </SideList>
    <MarkedShot
      src={imgCanvasMenu}
      alt="Gemini 工具選單中的 Canvas 選項"
      marks={[{ x: 543, y: 762, w: 351, h: 52, tag: '選 Canvas' }]}
    />
    <Footer />
  </div>
);

const Waiting: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Step 3 · 等一下" title="Gemini 會先整理整份程式" />
    <SideList>
      <Bullet>畫面出現 Canvas 視窗</Bullet>
      <Bullet>程式越長，等越久</Bullet>
      <Bullet>示範這份約 2～3 分鐘</Bullet>
      <Bullet>等待時別關掉分頁</Bullet>
    </SideList>
    <MarkedShot
      src={imgSent}
      alt="送出後 Gemini 回覆正在準備 Canvas 預覽"
      marks={[{ x: 592, y: 975, w: 150, h: 52, tag: 'Canvas 已開啟' }]}
    />
    <Footer />
  </div>
);

const Preview: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Step 4 · 預覽" title="程式在 Canvas 裡跑起來了" />
    <SideList>
      <Bullet>跟在電腦上打開一模一樣</Bullet>
      <Bullet>選程度、勾單元、貼課文</Bullet>
      <Bullet>
        右上角切換 <b style={{ color: ink }}>程式碼／預覽</b>
      </Bullet>
    </SideList>
    <MarkedShot
      src={imgPreview}
      alt="國文課堂學習單生成系統在 Canvas 預覽模式中開啟"
      marks={[{ x: 1293, y: 244, w: 200, h: 54, tag: '程式碼／預覽', below: true }]}
    />
    <Footer />
  </div>
);

const Generate: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Step 4 · 使用 AI" title="按下生成，AI 直接開工" />
    <div style={{ ...abs(120, 320, 560), display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Bullet>按「生成國文課堂專用學習單」</Bullet>
      <Bullet>出現「學習單建構中…」</Bullet>
      <TintCard
        tint={tintGreen}
        style={{ marginTop: 12, padding: '30px 34px', fontSize: 38, lineHeight: 1.45 }}
      >
        <b>全程沒有輸入任何 API key</b>
      </TintCard>
    </div>
    <MarkedShot src={imgGenerating} alt="學習單建構中，AI 正在分析課文" />
    <Footer />
  </div>
);

const Result: Page = () => (
  <div style={root}>
    <PageHead eyebrow="成果" title="學習單完成，連插圖都畫好了" />
    <Shot
      src={imgResult}
      alt="AI 產生的國文學習單，含課文插圖與田字格"
      style={abs(120, 300, 1680, 620)}
      fit="cover"
      position="center 60%"
    />
    <div style={{ ...abs(120, 940), fontSize: 30, fontWeight: 700, color: body }}>
      AI 用的是 Gemini 環境本身，不用自己申請金鑰
    </div>
    <Footer />
  </div>
);

const tips = [
  { title: '先登入 Google 帳號', detail: 'Canvas 裡的 AI 是用你的 Gemini 執行', fill: blue },
  { title: '一定要選 Canvas', detail: '沒選就只會回一段文字，不會開預覽', fill: green },
  { title: '程式長就耐心等', detail: '整份程式重新整理，需要幾分鐘', fill: pink },
  { title: '想改就直接說', detail: '在下方對話框打字，Canvas 會跟著改', fill: yellow },
];

const Tips: Page = () => (
  <div style={root}>
    <PageHead eyebrow="小提醒" title="這樣做比較順" />
    {tips.map((t, i) => (
      <div
        key={t.title}
        style={{
          ...abs(120, 310 + i * 160, 1680, 130),
          boxSizing: 'border-box',
          borderRadius: 24,
          background: paper,
          border,
          boxShadow: hard(6),
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 36,
        }}
      >
        <NumBadge n={String(i + 1)} fill={t.fill} />
        <div style={{ width: 420, fontSize: 40, fontWeight: 900 }}>{t.title}</div>
        <div style={{ flex: 1, fontSize: 34, color: body }}>{t.detail}</div>
      </div>
    ))}
    <Footer />
  </div>
);

const Recap: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <PageHead eyebrow="回顧" title="帶走這一句就夠了" />
      <TintCard
        tint={tintYellow}
        style={{
          ...abs(120, 320, 1680, 300),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 40,
          animation: live ? 'gcp-pop 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both' : undefined,
        }}
      >
        <div>
          <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: '0.06em', color: muted }}>
            上傳程式檔後輸入
          </div>
          <div style={{ marginTop: 18, fontSize: 80, fontWeight: 900, letterSpacing: '-0.03em' }}>
            {previewPrompt}
          </div>
        </div>
        <CopyButton text={previewPrompt} />
      </TintCard>
      <div style={{ ...abs(120, 700, 1680), display: 'flex', gap: 24, alignItems: 'center' }}>
        {['上傳 HTML', '輸入這句', '工具選 Canvas', '預覽＋使用 AI'].map((t, i) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {i > 0 && <span style={{ fontSize: 44, fontWeight: 900, color: coral }}>→</span>}
            <div
              style={{
                padding: '18px 32px',
                borderRadius: 999,
                background: [tintBlue, tintGreen, tintPink, tintYellow][i],
                border: `3px solid ${ink}`,
                boxShadow: hard(5),
                fontSize: 36,
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              {t}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

const Closing: Page = () => {
  const live = useIsActivePage();
  const enter = (delay: number, name = 'gcp-rise') =>
    live ? `${name} 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s both` : undefined;
  return (
    <div style={root}>
      <Ink width={1920} height={1080} style={abs(0, 0)}>
        <Sparkle x={300} y={230} s={1.6} />
        <Sparkle x={1640} y={260} s={1.2} fill={pink} />
        <Sparkle x={1560} y={820} s={1.5} fill={green} />
        <Sparkle x={360} y={840} s={1} fill={blue} />
      </Ink>
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
        <div style={{ animation: enter(0, 'gcp-pop') }}>
          <Mark size={120} />
        </div>
        <div style={{ marginTop: 36, animation: enter(0.12) }}>
          <Heading size={140}>
            拿你的程式試試看<span style={{ color: coral }}>！</span>
          </Heading>
        </div>
        <p
          style={{
            margin: '24px 0 0',
            fontSize: 44,
            fontWeight: 700,
            color: body,
            animation: enter(0.24),
          }}
        >
          不用 API key，AI 程式照樣跑
        </p>
        <a
          href="https://spedmix.pages.dev"
          target="_blank"
          rel="noreferrer"
          style={{
            color: 'inherit',
            textDecoration: 'none',
            marginTop: 56,
            display: 'inline-flex',
            alignItems: 'center',
            padding: '22px 56px',
            borderRadius: 999,
            background: coral,
            border,
            boxShadow: hard(10),
            fontSize: 56,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            animation: enter(0.36, 'gcp-pop'),
          }}
        >
          spedmix.pages.dev ↗
        </a>
      </div>
    </div>
  );
};

export const meta: SlideMeta = {
  title: 'Gemini Canvas 預覽：AI 程式免 API key',
  createdAt: '2026-11-03T07:15:45.754Z',
};

export const notes: (string | undefined)[] = [
  `今天分享一個小技巧：自己做的、含有 AI 功能的程式，放進 Gemini Canvas 預覽，就可以直接用，不用再輸入 API key。`,
  `先講為什麼。我們用 AI 做出來的工具，很多都有呼叫 AI 的功能，直接在電腦打開 HTML，按下去會沒反應，因為它需要 API key。
申請金鑰麻煩、貼進程式怕外流，分享給同事更是每個人都要一把。
放進 Gemini Canvas 就不一樣：AI 是 Gemini 環境本身提供的，登入就能用。`,
  `整個流程只有四步：上傳程式檔、輸入一句話、選 Canvas 送出、預覽使用。`,
  `第一步，在 Gemini 首頁按輸入框左邊的加號，選上傳檔案，挑你的 HTML 程式檔。我示範的是國文課堂學習單生成系統。`,
  `第二步，輸入一句話：用預覽模式 canvas 開啟。這句可以直接按複製。`,
  `第三步最重要，很多人會漏掉：再按一次加號，在工具裡選 Canvas，看到輸入框出現 Canvas 標籤，再送出。`,
  `送出後 Gemini 會把整份程式重新整理一次。程式越長等越久，我這份大概等了兩三分鐘，這時候不要關掉分頁。`,
  `好了之後，程式就在 Canvas 的預覽模式打開，操作跟在電腦上完全一樣。右上角可以切換程式碼和預覽。`,
  `重點來了：按下生成學習單，程式裡的 AI 功能直接開始運作，我整個過程沒有輸入任何 API key。`,
  `學習單完成，連課文插圖都畫好了。這就是 Gemini Canvas 的好處。`,
  `幾個小提醒：先登入 Google 帳號；一定要選 Canvas；程式長要耐心等；想改什麼就直接在下方對話框說。`,
  `最後帶走這一句：用預覽模式 canvas 開啟。上傳、輸入、選 Canvas，就能用。`,
  `大家回去拿自己的程式試試看，更多工具在 spedmix.pages.dev。謝謝大家！`,
];

export default [
  Cover,
  Problem,
  Steps,
  Upload,
  Prompt,
  PickCanvas,
  Waiting,
  Preview,
  Generate,
  Result,
  Tips,
  Recap,
  Closing,
] satisfies Page[];
