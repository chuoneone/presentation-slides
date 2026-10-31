import imgHeadshot from '@assets/headshot.webp';
import imgMixerAiPrep from '@assets/mixer-ai-prep.webp';
import imgMixerShare from '@assets/mixer-share.webp';
import {
  type DesignSystem,
  MorphElement,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useCallback, useEffect, useId, useState } from 'react';
import imgA4Result from './assets/a4-result.png';
import imgChineseReading from './assets/chinese-scaffold-reading.webp';
import imgDraftCanvas from './assets/draft-canvas.png';
import imgDraftPrompt from './assets/draft-prompt.png';
import imgMathConcept from './assets/math-ebook-concept.webp';
import imgPrintDialog from './assets/print-dialog.png';
import imgRemixAsk from './assets/remix-ask.png';
import imgRemixCopied from './assets/remix-code-copied.png';
import imgRemixResult from './assets/remix-result.png';
import imgSelectAll from './assets/select-all.png';
import imgSelectAsk from './assets/select-ask.png';
import imgSelectResult from './assets/select-result.png';
import imgSimilarCharacters from './assets/similar-characters.png';
import imgSpecialEdEnglish from './assets/special-ed-english-screenshot.png';
import imgTryCanvas from './assets/try-canvas-button.png';
import imgVocabMaker from './assets/vocab-maker.png';
import imgVocabPractice from './assets/vocab-practice-screenshot.png';

const SLIDE_ID = 'gemini-canvas-worksheet';

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
@keyframes fw-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes fw-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes fw-grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
@keyframes fw-pop { from { opacity: 0; transform: scale(0.6) } to { opacity: 1; transform: scale(1) } }
@keyframes fw-rise { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }
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

// Section pages sit on the periwinkle slab so a new part reads at a glance.
const slabRoot: CSSProperties = { ...root, background: blue };

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

const Heading = ({ children, size = 88 }: { children: ReactNode; size?: number }) => (
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

const Eyebrow = ({ children }: { children: ReactNode }) => {
  if (typeof children === 'string' && !children.trim()) return null;
  return (
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
};

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

const Footer = ({ label = 'Gemini Canvas 學習單研習' }: { label?: string }) => {
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
  viewBox,
  style,
  wobble = 2.2,
  children,
}: {
  width: number;
  height: number;
  viewBox?: string;
  style?: CSSProperties;
  wobble?: number;
  children: ReactNode;
}) => {
  const id = `fw${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg
      aria-hidden="true"
      width={width}
      height={height}
      viewBox={viewBox ?? `0 0 ${width} ${height}`}
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
          <feDisplacementMap in="SourceGraphic" scale={wobble} />
        </filter>
      </defs>
      <g filter={`url(#${id})`}>{children}</g>
    </svg>
  );
};

const Stroke = ({
  d,
  live,
  delay = 0.3,
  dur = 0.7,
  color = ink,
  width = 3.2,
}: {
  d: string;
  live: boolean;
  delay?: number;
  dur?: number;
  color?: string;
  width?: number;
}) => (
  <path
    d={d}
    pathLength={1}
    strokeDasharray={1}
    stroke={color}
    strokeWidth={width}
    fill="none"
    style={{
      animation: live ? `fw-draw ${dur}s cubic-bezier(0, 0, 0.2, 1) ${delay}s both` : undefined,
    }}
  />
);

const loopPath = (w: number, h: number) => {
  const p = (x: number, y: number) => `${((x * w) / 100).toFixed(1)} ${((y * h) / 100).toFixed(1)}`;
  return `M${p(30, 8)}C${p(55, 2)} ${p(90, 8)} ${p(96, 40)}C${p(100, 70)} ${p(72, 94)} ${p(42, 93)}C${p(14, 92)} ${p(2, 74)} ${p(4, 50)}C${p(6, 26)} ${p(26, 10)} ${p(56, 5)}`;
};

const CircleDoodle = ({
  x,
  y,
  w,
  h,
  live,
  color = coral,
  delay = 0.4,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  live: boolean;
  color?: string;
  delay?: number;
}) => (
  <Ink width={w} height={h} wobble={1.6} style={{ position: 'absolute', left: x, top: y }}>
    <Stroke d={loopPath(w, h)} color={color} width={3.6} live={live} delay={delay} dur={0.8} />
  </Ink>
);

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

const Caption = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div style={{ position: 'absolute', fontSize: 34, fontWeight: 700, color: body, ...style }}>
    {children}
  </div>
);

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

const CopyButton = ({
  text,
  label = '一鍵複製',
  style,
}: {
  text: string;
  label?: string;
  style?: CSSProperties;
}) => {
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
        ...style,
      }}
    >
      <CopyIcon done={copied} />
      {copied ? '已複製！' : label}
    </button>
  );
};

const PromptCard = ({
  text,
  tint = tintYellow,
  style,
  fontSize = 34,
}: {
  text: string;
  tint?: string;
  style?: CSSProperties;
  fontSize?: number;
}) => (
  <TintCard tint={tint} style={{ ...style, display: 'flex', flexDirection: 'column', gap: 22 }}>
    <div
      style={{
        fontFamily: MONO,
        fontSize: 20,
        letterSpacing: '0.06em',
        color: muted,
      }}
    >
      指令 · PROMPT
    </div>
    <div style={{ fontSize, fontWeight: 700, lineHeight: 1.45, color: ink }}>{text}</div>
    <div>
      <CopyButton text={text} />
    </div>
  </TintCard>
);

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
      fontSize: 32,
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

// Section-page hero icon that morphs into the next page's title icon.
const MORPH_MS = 820;

const morphTransition: SlideTransition = {
  duration: 300,
  exit: {
    duration: 320,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    keyframes: [{ opacity: 1 }, { opacity: 1 }],
  },
  enter: {
    duration: 320,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
  },
  morph: { duration: MORPH_MS, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' },
};

const GeneratorIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 64 64"
    fill="none"
    stroke={ink}
    strokeWidth={4}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block', width: '62%', height: '62%', overflow: 'visible' }}
  >
    <rect x="10" y="6" width="34" height="46" rx="5" fill={paper} />
    <path d="M18 18h18M18 27h14M18 36h10" />
    <path
      d="M46 30 C 47 38, 50 41, 58 42 C 50 43, 47 46, 46 54 C 45 46, 42 43, 34 42 C 42 41, 45 38, 46 30 Z"
      fill={coral}
      strokeWidth={3.5}
    />
  </svg>
);

const RemixIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 64 64"
    fill="none"
    stroke={ink}
    strokeWidth={4}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block', width: '62%', height: '62%', overflow: 'visible' }}
  >
    <rect x="6" y="6" width="28" height="34" rx="5" fill={paper} />
    <path d="M13 16h14M13 24h10" />
    <rect x="30" y="24" width="28" height="34" rx="5" fill={green} />
    <path d="M37 34h14M37 42h10" />
    <path d="M12 46c0 8 5 12 13 12" />
    <path d="M21 53l5 5-5 5" />
  </svg>
);

const IconTile = ({
  id,
  size,
  fill = yellow,
  children = <GeneratorIcon />,
}: {
  id: string;
  size: number;
  fill?: string;
  children?: ReactNode;
}) => (
  <MorphElement id={id}>
    <div
      style={{
        width: size,
        height: size,
        boxSizing: 'border-box',
        borderRadius: Math.round(size * 0.28),
        background: fill,
        border: `${size > 200 ? 6 : 4}px solid ${ink}`,
        boxShadow: hard(size > 200 ? 14 : 6),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  </MorphElement>
);

const PageHead = ({
  eyebrow,
  title,
  aside,
  iconId,
  icon,
  iconFill,
}: {
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  iconId?: string;
  icon?: ReactNode;
  iconFill?: string;
}) => (
  <>
    <div style={abs(120, 84)}>
      <Eyebrow>{eyebrow}</Eyebrow>
    </div>
    {iconId && (
      <div style={abs(120, 162)}>
        <IconTile id={iconId} size={98} fill={iconFill}>
          {icon}
        </IconTile>
      </div>
    )}
    <div style={abs(iconId ? 246 : 120, 162, 1300)}>
      <Heading>{title}</Heading>
    </div>
    {aside && (
      <div
        style={{
          ...abs(1300, 204, 500),
          textAlign: 'right',
          fontSize: 26,
          fontWeight: 700,
          color: muted,
        }}
      >
        {aside}
      </div>
    )}
  </>
);

const draftPrompt = `請你幫我製作學習單，對象是國中二年級學習障礙學生，閱讀速度慢，且書寫有困難，上課會有不專心的情形，以下分別是他的 IEP 目標和教學課文內容：

【教學課文】
水陸草木之花，可愛者甚蕃。晉陶淵明獨愛菊。自李唐來，世人盛愛牡丹。予獨愛蓮之出淤泥而不染，濯清漣而不妖，中通外直，不蔓不枝，香遠益清，亭亭淨植，可遠觀而不可褻玩焉。
予謂菊，花之隱逸者也；牡丹，花之富貴者也；蓮，花之君子者也。
噫！菊之愛，陶後鮮有聞。蓮之愛，同予者何人？牡丹之愛，宜乎眾矣。

【IEP 目標】
目標範疇｜行為目標描述（含條件、標準、評量方式）｜評量方式
生字與詞彙｜給予每課精選之 10 個核心生詞，學生能運用部首拆解或詞境配對，正確認讀並配對詞義達 8 個（80%）。｜紙筆測驗、口頭問答
白話文理解｜閱讀八年級記敘或抒情課文後，在提供「起承轉合情節表」鷹架下，能填出主要事件、人物行動與結果，正確率達 75%。｜學習單、作業評量
段落主旨提取｜給予標註段落重點關鍵詞的課文，學生能挑選出該段落的最佳核心主旨句，連續 3 次評量正確率達 80%。｜紙筆測驗、課堂提問
文言文基礎閱讀｜八年級基礎文言選文（如《兒時記趣》等長度短篇），在課本文意注釋提示下，能正確指出 3 個關鍵單詞的古今異義，正確率達 70%。｜學習單、課堂配對`;

const translatePrompt = '一句文言文下方都加入白話文翻譯';
const a4Prompt = '用 HTML 模仿成仿 A4，且列印出來會很美觀，題目之間都不能被切割到';
const blobPrompt = '列印按鈕請另外開啟 blob 分頁並跳出列印視窗';
const tieredPrompt =
  '同一課請做出三個層次的學習單，都對應同一組 IEP 目標，只調整鷹架多寡：第一層提供逐句白話，題型以圈選、連連看為主；第二層只提供部分白話，加入關鍵詞填空；第三層只附注釋，加入簡答。';
const adjustPrompt =
  '學生在古今異義這一關只答對 1 題，請把這一區改成二選一，並在每題旁邊加上提示。';

const toolUrls = {
  chineseWorksheet: 'https://spedmix.pages.dev/chinese-lesson-worksheet',
  vocabMaker: 'https://spedmix.pages.dev/vocab-maker',
  similarCharacters: 'https://spedmix.pages.dev/Similarcharacters',
  mathScaffold: 'https://spedmix.pages.dev/math-scaffold',
  specialEdEnglish: 'https://spedmix.pages.dev/special-ed-english-worksheet',
  vocabPractice: 'https://spedmix.pages.dev/vocab-practice-worksheet',
};
const Cover: Page = () => (
  <div style={root}>
    <div style={{ ...abs(120, 100), display: 'flex', alignItems: 'center', gap: 14 }}>
      <Mark size={32} />
      <span style={{ fontSize: 30, fontWeight: 760, letterSpacing: '-0.02em' }}>Gemini Canvas</span>
    </div>
    <div style={abs(120, 250)}>
      <Title>
        用 Gemini Canvas
        <br />
        做出一份
        <br />
        印得漂亮的學習單
      </Title>
    </div>
    <p style={{ ...abs(120, 760, 1040), margin: 0, fontSize: 40, lineHeight: 1.5, color: body }}>
      從打草稿、仿 A4 排版到列印，最後用生成器<Highlight>幾乎不用下指令</Highlight>。
    </p>
    <div style={{ ...abs(120, 900), fontSize: 28, color: muted }}>特教教師研習 · 米克師</div>
    <Ink width={560} height={600} style={abs(1200, 250)}>
      <circle cx="290" cy="300" r="250" fill={tintYellow} stroke="none" />
      <rect
        x="150"
        y="90"
        width="270"
        height="380"
        rx="10"
        fill={paper}
        transform="rotate(-6 285 280)"
      />
      <g transform="rotate(-6 285 280)">
        <path d="M190 150h150" />
        <path d="M190 200h190" stroke={muted} />
        <path d="M190 240h170" stroke={muted} />
        <rect x="190" y="290" width="80" height="50" rx="6" fill={pink} />
        <rect x="290" y="290" width="90" height="50" rx="6" fill={blue} />
        <path d="M190 380h190" stroke={muted} />
        <path d="M190 420h120" stroke={muted} />
      </g>
      <rect x="320" y="380" width="200" height="120" rx="16" fill={green} />
      <rect x="350" y="440" width="140" height="90" rx="6" fill={paper} />
      <path d="M370 470h100M370 500h70" />
      <circle cx="490" cy="410" r="8" fill={ink} />
      <Sparkle x={130} y={120} s={1.3} />
      <Sparkle x={500} y={150} s={0.9} />
    </Ink>
    <Footer />
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
} as const;

const linkReset: CSSProperties = { color: 'inherit', textDecoration: 'none' };

const BioItem = ({ school, dept }: { school: string; dept: string }) => (
  <div style={{ padding: '20px 0', borderTop: `3px dashed ${rule}` }}>
    <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-0.02em' }}>{school}</div>
    <div style={{ fontSize: 32, color: body, marginTop: 6 }}>{dept}</div>
  </div>
);

const Speaker: Page = () => (
  <div style={root}>
    <PageHead eyebrow={'\n'} title="介紹" />
    <TintCard
      tint={tintYellow}
      style={{
        ...abs(120, 320, 460, 620),
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src={imgHeadshot}
        alt="講師照片"
        style={{
          width: 380,
          height: 360,
          objectFit: 'cover',
          borderRadius: 20,
          border,
          boxSizing: 'border-box',
          boxShadow: hard(6),
        }}
      />
      <div style={{ fontSize: 64, fontWeight: 900, marginTop: 26, letterSpacing: '-0.03em' }}>
        朱旆誼
      </div>
      <div
        style={{
          fontSize: 25,
          fontWeight: 800,
          marginTop: 10,
          padding: '6px 20px',
          borderRadius: 999,
          background: paper,
          border: `3px solid ${ink}`,
          whiteSpace: 'nowrap',
        }}
      >
        米克師 · @spedmix2025
      </div>
    </TintCard>
    <div
      style={{
        ...abs(660, 320, 1140),
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 56,
      }}
    >
      <div>
        <div style={{ marginBottom: 22 }}>
          <Eyebrow>學歷</Eyebrow>
        </div>
        <BioItem school="國立彰化師範大學" dept="特殊教育學系（資訊工程輔系）" />
        <BioItem school="國立東華大學" dept="資訊管理所" />
        <BioItem school="國立台灣師範大學" dept="資訊教育學系博士班（就讀中）" />
      </div>
      <div>
        <div style={{ marginBottom: 22 }}>
          <Eyebrow>經歷</Eyebrow>
        </div>
        <BioItem school="花蓮縣平和國中" dept="資源班教師（兼巡迴支援）" />
        <BioItem school="宜蘭縣凱旋國中" dept="資源班教師" />
      </div>
    </div>
    <Footer />
  </div>
);

const socialIconProps = {
  width: 56,
  height: 56,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

const socials = [
  {
    platform: 'Instagram',
    handle: '@spedmix2025',
    href: socialUrls.instagram,
    tint: tintPink,
    fill: pink,
    icon: (
      <svg {...socialIconProps}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    platform: 'Facebook',
    handle: '米克師',
    href: socialUrls.facebook,
    tint: tintBlue,
    fill: blue,
    icon: (
      <svg {...socialIconProps}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    platform: 'Threads',
    handle: '@spedmix2025',
    href: socialUrls.threads,
    tint: tintYellow,
    fill: yellow,
    icon: (
      <svg {...socialIconProps}>
        <path d="M19 12a7 7 0 1 1-7-7c3.87 0 6 2.5 6 5.5 0 3-2 4.5-4 4.5s-3-1.5-3-3 1.5-3 3-3c1.5 0 2.5.8 2.8 1.8" />
      </svg>
    ),
  },
];

const SocialLinks: Page = () => (
  <div style={root}>
    <PageHead eyebrow="社群媒體" title="追蹤我，看到更多AI應用" />
    {socials.map((s, i) => (
      <a
        key={s.platform}
        href={s.href}
        target="_blank"
        rel="noreferrer"
        style={{ ...linkReset, ...abs(120 + i * 573, 380, 535, 440) }}
      >
        <TintCard
          tint={s.tint}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 32,
              background: s.fill,
              border,
              boxSizing: 'border-box',
              boxShadow: hard(6),
              color: ink,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {s.icon}
          </div>
          <div>
            <div style={{ fontSize: 60, fontWeight: 900, letterSpacing: '-0.035em' }}>
              {s.platform}
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, marginTop: 6 }}>{s.handle}</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: body, marginTop: 14 }}>
              點擊前往 →
            </div>
          </div>
        </TintCard>
      </a>
    ))}
    <Footer />
  </div>
);

const sites = [
  {
    src: imgMixerAiPrep,
    href: mixerSiteUrls.prep,
    url: 'spedmix.pages.dev',
    label: '備課入口',
    title: 'AI備課幫手',
    desc: '生成教材、學習單、備課工具的主要入口。',
  },
  {
    src: imgMixerShare,
    href: mixerSiteUrls.share,
    url: 'spedmixshare.pages.dev',
    label: '共享入口',
    title: '特教教材共享',
    desc: '整理可分享的教材、工具與資源，快速找教材。',
  },
];

const MixerSites: Page = () => (
  <div style={root}>
    <PageHead eyebrow="個人網站" title="我的網站" />
    {sites.map((s, i) => (
      <a
        key={s.url}
        href={s.href}
        target="_blank"
        rel="noreferrer"
        style={{ ...linkReset, ...abs(120 + i * 870, 320, 810) }}
      >
        <Shot
          src={s.src}
          alt={`${s.title}網站畫面`}
          style={{ position: 'relative', width: 810, height: 376 }}
          fit="cover"
          position="center top"
        />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 30 }}>
          <Eyebrow>{s.label}</Eyebrow>
          <span style={{ fontFamily: MONO, fontSize: 22, color: muted }}>{s.url}</span>
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, marginTop: 14, letterSpacing: '-0.03em' }}>
          {s.title}
        </div>
        <div style={{ fontSize: 34, lineHeight: 1.5, color: body, marginTop: 8 }}>{s.desc}</div>
      </a>
    ))}
    <Footer />
  </div>
);

const FlowArrow = ({
  x,
  y,
  live,
  delay,
}: {
  x: number;
  y: number;
  live: boolean;
  delay: number;
}) => (
  <Ink width={56} height={40} style={abs(x, y)}>
    <Stroke
      d="M4 20C20 18 34 22 50 20M36 8L52 20L36 32"
      color={coral}
      width={3.6}
      live={live}
      delay={delay}
    />
  </Ink>
);

const SplitLabel = ({ title, desc }: { title: string; desc: string }) => (
  <div style={{ padding: '0 48px' }}>
    <div style={{ fontSize: 50, fontWeight: 900, letterSpacing: '-0.03em' }}>{title}</div>
    <div
      style={{ fontSize: 34, fontWeight: 700, marginTop: 10, color: body, whiteSpace: 'nowrap' }}
    >
      {desc}
    </div>
  </div>
);

const Stance: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <div style={abs(120, 140)}>
        <Eyebrow>開始之前，先說我的立場</Eyebrow>
      </div>
      <div style={abs(120, 250, 1680)}>
        <Heading size={104}>
          AI 對我來說，只能完成 <span style={{ color: coral }}>70 分</span>。
        </Heading>
      </div>
      <p style={{ ...abs(120, 400, 1680), margin: 0, fontSize: 44, fontWeight: 700, color: body }}>
        剩下的 30 分，要靠老師自己判斷結果。
      </p>
      <div style={{ ...abs(120, 600, 1680, 240), display: 'flex', gap: 24 }}>
        <div
          style={{
            width: 1150,
            boxSizing: 'border-box',
            borderRadius: 32,
            background: coral,
            border,
            boxShadow: hard(10),
            display: 'flex',
            alignItems: 'center',
            transformOrigin: 'left center',
            animation: live ? 'fw-grow 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both' : undefined,
          }}
        >
          <SplitLabel title="70 分：AI 給速度" desc="產出內容、生成初稿、套用版型" />
        </div>
        <div
          style={{
            flex: 1,
            boxSizing: 'border-box',
            borderRadius: 32,
            background: paper,
            border: `4px dashed ${ink}`,
            display: 'flex',
            alignItems: 'center',
            animation: live ? 'fw-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1s both' : undefined,
          }}
        >
          <SplitLabel title="30 分：老師判斷" desc="起點、難度、用字、版面" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Principle: Page = () => {
  const live = useIsActivePage();
  const order = [
    { n: '1', text: '先了解學生', sub: '能力、優弱勢、教育需求', tint: tintBlue, fill: blue },
    { n: '2', text: '再訂教學目標', sub: '對準 IEP 目標', tint: tintGreen, fill: green },
    { n: '3', text: '最後才用 AI', sub: '編選、調整、設計教材', tint: tintYellow, fill: yellow },
  ];
  return (
    <div style={root}>
      <div style={abs(120, 116)}>
        <Eyebrow>先講觀念</Eyebrow>
      </div>
      <div style={abs(120, 200, 1680)}>
        <Heading size={110}>AI 生成了，不等於可以直接上課</Heading>
      </div>
      {order.map((o, i) => (
        <TintCard
          key={o.n}
          tint={o.tint}
          style={{
            ...abs(120 + i * 573, 450, 500, 300),
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
          }}
        >
          <NumBadge n={o.n} fill={o.fill} />
          <div style={{ fontSize: 50, fontWeight: 900, letterSpacing: '-0.03em' }}>{o.text}</div>
          <div style={{ fontSize: 34, lineHeight: 1.5, color: body }}>{o.sub}</div>
        </TintCard>
      ))}
      <FlowArrow x={630} y={580} live={live} delay={0.4} />
      <FlowArrow x={1203} y={580} live={live} delay={0.7} />
      <CircleDoodle x={1300} y={548} w={330} h={86} live={live} delay={1.0} />
      <p style={{ ...abs(120, 820, 1680), margin: 0, fontSize: 40, lineHeight: 1.5, color: body }}>
        AI 是教學上的助力，<Highlight>不取代老師的專業判斷</Highlight>。
      </p>
      <Footer />
    </div>
  );
};

const stages = [
  {
    n: '1',
    title: '學生能力分析',
    sub: '與教育需求',
    today: '寫進第一段指令',
    tint: tintBlue,
    fill: blue,
  },
  {
    n: '2',
    title: '教材編選',
    sub: '與調整',
    today: '打草稿、局部修改、多層次',
    tint: tintGreen,
    fill: green,
  },
  {
    n: '3',
    title: '課程設計',
    sub: '與教學進行',
    today: '仿 A4 列印、生成器',
    tint: tintPink,
    fill: pink,
  },
  {
    n: '4',
    title: '教學評量',
    sub: '與後續調整',
    today: '看卡在哪，回來改',
    tint: tintYellow,
    fill: yellow,
  },
];

const Pipeline: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <PageHead eyebrow="多層次教學的完整歷程" title="每個環節，AI 都能幫一把" />
      {stages.map((s, i) => (
        <TintCard
          key={s.n}
          tint={s.tint}
          style={{
            ...abs(120 + i * 432, 330, 384, 560),
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <NumBadge n={s.n} fill={s.fill} />
          <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.03em' }}>
            {s.title}
            <br />
            {s.sub}
          </div>
          <div
            style={{
              marginTop: 'auto',
              paddingTop: 22,
              borderTop: `3px dashed ${rule}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 700, color: muted }}>今天在這裡</div>
            <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.4 }}>{s.today}</div>
          </div>
        </TintCard>
      ))}
      {[0, 1, 2].map((i) => (
        <FlowArrow key={i} x={490 + i * 432} y={420} live={live} delay={0.4 + i * 0.2} />
      ))}
      <Footer />
    </div>
  );
};

const StudentFirst: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <PageHead eyebrow="Step 1 之前" title="指令好不好，看老師先想了多少" />
      <TintCard tint={tintBlue} style={{ ...abs(120, 320, 760, 450) }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: muted }}>老師先做 · AI 替不了</div>
        <div style={{ fontSize: 44, fontWeight: 800, marginTop: 10 }}>分析學生</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <Bullet>
            <b style={{ color: ink }}>能力現況</b>：閱讀速度慢、書寫困難
          </Bullet>
          <Bullet>
            <b style={{ color: ink }}>學習特質</b>：上課容易不專心
          </Bullet>
          <Bullet>
            <b style={{ color: ink }}>教育需求</b>：轉成四條 IEP 目標
          </Bullet>
        </div>
      </TintCard>
      <FlowArrow x={922} y={520} live={live} delay={0.4} />
      <TintCard tint={tintGreen} style={{ ...abs(1040, 320, 760, 450) }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: muted }}>再交給 AI</div>
        <div style={{ fontSize: 44, fontWeight: 800, marginTop: 10 }}>設計教材</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <Bullet>寫字困難 → 圈選、連連看取代抄寫</Bullet>
          <Bullet>容易分心 → 分塊、大字、一次一關</Bullet>
          <Bullet>每一關都對準一條 IEP 目標</Bullet>
        </div>
      </TintCard>
      <TintCard
        tint={tintYellow}
        style={{
          ...abs(120, 810, 1680, 120),
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          fontSize: 32,
          color: body,
        }}
      >
        <b style={{ color: ink, marginRight: 16 }}>個資提醒</b>
        指令裡只寫能力描述，不寫學生姓名、學校等能辨識身分的資料。
      </TintCard>
      <Footer />
    </div>
  );
};

const tiers = [
  {
    n: '1',
    title: '第一層 · 支持最多',
    desc: '逐句白話對照，圈選、連連看為主',
    tint: tintBlue,
    fill: blue,
  },
  {
    n: '2',
    title: '第二層 · 部分提示',
    desc: '只給部分白話，加入關鍵詞填空',
    tint: tintGreen,
    fill: green,
  },
  {
    n: '3',
    title: '第三層 · 挑戰',
    desc: '只附注釋，加入簡答寫出主旨',
    tint: tintPink,
    fill: pink,
  },
];

const Tiered: Page = () => (
  <div style={root}>
    <PageHead eyebrow="多層次" title="同一課，做出三個層次" aside="目標相同，只調整鷹架多寡" />
    {tiers.map((t, i) => (
      <TintCard
        key={t.n}
        tint={t.tint}
        style={{
          ...abs(120 + i * 572, 300, 536, 300),
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <NumBadge n={t.n} fill={t.fill} />
        <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: '-0.03em' }}>{t.title}</div>
        <div style={{ fontSize: 32, lineHeight: 1.5, color: body }}>{t.desc}</div>
      </TintCard>
    ))}
    <PromptCard
      text={tieredPrompt}
      tint={tintYellow}
      fontSize={32}
      style={abs(120, 636, 1680, 330)}
    />
    <Footer />
  </div>
);

const loop = [
  { n: '1', title: '上課使用', desc: '學生實際作答', tint: tintBlue, fill: blue },
  { n: '2', title: '觀察與評量', desc: '哪裡卡住？正確率？', tint: tintGreen, fill: green },
  { n: '3', title: '回 Canvas 調整', desc: '反白哪，只改哪', tint: tintPink, fill: pink },
  { n: '4', title: '下一份更貼近', desc: '鷹架加減，跟著學生', tint: tintYellow, fill: yellow },
];

const AdjustLoop: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <PageHead eyebrow="評量與後續調整" title="上完課，回來改下一份" />
      {loop.map((s, i) => (
        <TintCard
          key={s.n}
          tint={s.tint}
          style={{
            ...abs(120 + i * 432, 300, 384, 300),
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <NumBadge n={s.n} fill={s.fill} />
          <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-0.03em' }}>{s.title}</div>
          <div style={{ fontSize: 30, lineHeight: 1.5, color: body }}>{s.desc}</div>
        </TintCard>
      ))}
      {[0, 1, 2].map((i) => (
        <FlowArrow key={i} x={490 + i * 432} y={430} live={live} delay={0.4 + i * 0.2} />
      ))}
      <PromptCard
        text={adjustPrompt}
        tint={tintPink}
        fontSize={32}
        style={abs(120, 640, 1080, 310)}
      />
      <div style={abs(1280, 680, 520)}>
        <Heading size={64}>
          AI 是助力，
          <br />
          判斷還是老師。
        </Heading>
      </div>
      <Footer />
    </div>
  );
};

const parts = [
  {
    n: '1',
    title: '用 Canvas 做學習單',
    desc: '自己下指令，從零做出一份',
    items: ['打草稿', '局部修改', '仿 A4 排版與列印', '多層次版本'],
    tint: tintBlue,
    fill: blue,
  },
  {
    n: '2',
    title: '用生成器做學習單',
    desc: '選一選、貼課文，幾乎不用下指令',
    items: ['打開生成器', '貼上課文', '一鍵產出、列印'],
    tint: tintGreen,
    fill: green,
  },
  {
    n: '3',
    title: '改成自己的生成器',
    desc: '拿現成的生成器來改編',
    items: ['試用 Gemini Canvas', '複製成自己的副本', '一句話改成你要的'],
    tint: tintPink,
    fill: pink,
  },
];

const Route: Page = () => (
  <div style={root}>
    <PageHead eyebrow="今天的大綱" title="做一份 → 用生成器 → 改成自己的" />
    {parts.map((p, i) => (
      <TintCard
        key={p.n}
        tint={p.tint}
        style={{
          ...abs(120 + i * 573, 330, 535, 620),
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
        }}
      >
        <NumBadge n={p.n} fill={p.fill} />
        <div style={{ fontSize: 46, fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.03em' }}>
          {p.title}
        </div>
        <div style={{ fontSize: 34, lineHeight: 1.5, color: body }}>{p.desc}</div>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            paddingTop: 22,
            borderTop: `3px dashed ${rule}`,
          }}
        >
          {p.items.map((t) => (
            <Bullet key={t}>{t}</Bullet>
          ))}
        </div>
      </TintCard>
    ))}
    <Footer />
  </div>
);

const DraftPrompt: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Step 1 · 打草稿" title="把學生講清楚，再貼上課文" />
    <div style={{ ...abs(120, 330, 660), display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Bullet>
        <b style={{ color: ink }}>對象</b>：國二、學習障礙
      </Bullet>
      <Bullet>
        <b style={{ color: ink }}>困難</b>：閱讀慢、書寫困難、不專心
      </Bullet>
      <Bullet>
        <b style={{ color: ink }}>IEP 目標</b>：整張表直接貼上
      </Bullet>
      <Bullet>
        <b style={{ color: ink }}>課文</b>：《愛蓮說》全文
      </Bullet>
      <TintCard
        tint={tintGreen}
        style={{ marginTop: 18, padding: '26px 32px', fontSize: 32, lineHeight: 1.5, color: body }}
      >
        記得點下方的 <b style={{ color: ink }}>Canvas</b>，結果才會開成可編輯的文件。
      </TintCard>
    </div>
    <Shot
      src={imgDraftPrompt}
      alt="在 Gemini 輸入學習單指令並開啟 Canvas"
      style={abs(860, 330, 940, 493)}
    />
    <Caption style={{ left: 860, top: 845 }}>Gemini 首頁 · 輸入指令並開啟 Canvas</Caption>
    <Footer />
  </div>
);

const CopyDraftPrompt: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Step 1 · 打草稿" title="第一段指令，直接複製" />
    <div style={abs(1520, 186)}>
      <CopyButton text={draftPrompt} label="複製完整指令" />
    </div>
    <TintCard
      tint={tintYellow}
      style={{
        ...abs(120, 300, 1680, 670),
        padding: '30px 40px',
        fontSize: 22,
        lineHeight: 1.5,
        color: ink,
        whiteSpace: 'pre-wrap',
        overflow: 'hidden',
      }}
    >
      {draftPrompt}
    </TintCard>
    <Footer />
  </div>
);

const DraftResult: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Step 1 · 打草稿" title="Canvas 給的是一份能編輯的文件" />
    <Shot
      src={imgDraftCanvas}
      alt="Canvas 產出的愛蓮說結構化學習單"
      style={abs(120, 330, 1680, 600)}
      fit="cover"
      position="left top"
    />
    <Caption style={{ left: 120, top: 944 }}>草稿：《愛蓮說》結構化鷹架版</Caption>
    <Footer />
  </div>
);

const SelectEdit: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <PageHead eyebrow="Step 2 · 局部修改" title="選取一段，只改那一段" />
      <Shot
        src={imgSelectAsk}
        alt="選取課文段落後在浮動輸入框下指令"
        style={abs(120, 320, 907, 349)}
      />
      <Caption style={{ left: 120, top: 685 }}>① 反白課文 → 跳出輸入框</Caption>
      <Shot
        src={imgSelectResult}
        alt="每句文言文下方加上白話翻譯"
        style={abs(1088, 320, 712, 349)}
      />
      <Caption style={{ left: 1088, top: 685 }}>② 每一句下方都多了白話</Caption>
      <Ink width={60} height={40} style={abs(1027, 474)}>
        <Stroke
          d="M4 20C20 18 34 22 52 20M38 8L54 20L38 32"
          color={coral}
          width={3.6}
          live={live}
          delay={0.4}
        />
      </Ink>
      <CircleDoodle x={145} y={585} w={356} h={96} live={live} delay={0.9} />
      <Footer />
    </div>
  );
};

const A4Step: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Step 3 · 仿 A4 排版" title="一句話，把文件變成 A4 紙" />
    <div style={{ ...abs(120, 320, 620), display: 'flex', flexDirection: 'column', gap: 26 }}>
      <PromptCard text={a4Prompt} tint={tintPink} fontSize={38} />
      <Bullet>畫面上就是一張張 A4 紙</Bullet>
      <Bullet>題目卡片不會被切在兩頁</Bullet>
      <Bullet>大字、高對比、留白充足</Bullet>
    </div>
    <Shot src={imgA4Result} alt="Canvas 轉成仿 A4 HTML 學習單" style={abs(800, 320, 1000, 466)} />
    <Caption style={{ left: 800, top: 802 }}>右側預覽：A4 版面的《愛蓮說》學習單</Caption>
    <Footer />
  </div>
);

const PrintStep: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Step 4 · 列印" title="全選 → 右鍵列印，或 Ctrl + P" />
    <Shot src={imgSelectAll} alt="在預覽畫面全選後按右鍵列印" style={abs(120, 320, 957, 453)} />
    <Caption style={{ left: 120, top: 789 }}>① 在預覽上 Ctrl + A 全選，按右鍵 → 列印</Caption>
    <Shot src={imgPrintDialog} alt="Chrome 列印對話框與 A4 預覽" style={abs(1118, 320, 682, 453)} />
    <Caption style={{ left: 1118, top: 789 }}>② 確認頁數、邊界，另存 PDF 或直接印</Caption>
    <Footer />
  </div>
);

const PrintButtonFix: Page = () => (
  <div style={root}>
    <PageHead eyebrow="遇到問題" title="列印按鈕按了沒反應？" />
    <div style={{ ...abs(120, 320, 1680), display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ fontSize: 40, lineHeight: 1.5, color: body, width: 1503 }}>
        Canvas 的預覽被關在一個安全的小框框裡，網頁自己的列印按鈕常常會被擋住。
      </div>
      <div style={{ fontSize: 40, lineHeight: 1.5, color: body }}>
        請它<Highlight>另外開一個分頁</Highlight>再列印就好：
      </div>
      <PromptCard
        text={blobPrompt}
        tint={tintBlue}
        fontSize={44}
        style={{ width: 1680, height: 286, flexShrink: 0 }}
      />
    </div>
    <Footer />
  </div>
);

const PracticeSection: Page = () => (
  <div style={slabRoot}>
    <div style={abs(120, 116)}>
      <Eyebrow>實作練習</Eyebrow>
    </div>
    <div style={abs(120, 300, 1000)}>
      <Heading size={120}>
        換你做：
        <br />
        用生成器出一份
      </Heading>
    </div>
    <p style={{ ...abs(120, 640, 900), margin: 0, fontSize: 40, lineHeight: 1.5, color: body }}>
      米克師用 Gemini Canvas 做的學習單生成器，選一選、貼課文，
      <Highlight>幾乎不用下指令</Highlight>就有精美排版。
    </p>
    <div style={abs(1290, 290)}>
      <IconTile id="icon-generator" size={420} />
    </div>
    <Ink width={560} height={560} style={abs(1220, 220)}>
      <Sparkle x={520} y={60} s={1.4} />
      <Sparkle x={40} y={520} s={0.9} fill={pink} />
    </Ink>
    <Footer />
  </div>
);
PracticeSection.transition = morphTransition;

// Screenshot frames take the image's own aspect ratio, so nothing is cropped;
// the text column takes whatever width is left.
const BAND_TOP = 300;
const BAND_H = 660;
const COL_GAP = 60;

const ToolPage = ({
  eyebrow,
  title,
  points,
  highlight,
  pain,
  href,
  img,
  imgAlt,
  ratio,
  iconId,
}: {
  eyebrow: string;
  title: string;
  points: string[];
  highlight: string;
  pain?: string;
  href: string;
  img: string;
  imgAlt: string;
  ratio: number;
  iconId?: string;
}) => {
  // Very wide shots leave room under them, so the note cards move to the right column.
  const wide = ratio > 2;
  let w = wide ? 1000 : 960;
  let h = w / ratio;
  if (h > BAND_H) {
    h = BAND_H;
    w = h * ratio;
  }
  w = Math.round(w);
  h = Math.round(h);
  const leftW = 1680 - w - COL_GAP;
  const column = (left: number, width: number): CSSProperties => ({
    ...abs(left, BAND_TOP, width, BAND_H),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 32,
  });
  const notes = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {pain && (
        <TintCard
          tint={tintPink}
          style={{ padding: '20px 30px', fontSize: 32, lineHeight: 1.45, color: body }}
        >
          <b style={{ color: ink, marginRight: 12 }}>教學痛點</b>
          {pain}
        </TintCard>
      )}
      <TintCard
        tint={tintYellow}
        style={{ padding: '20px 30px', fontSize: 32, lineHeight: 1.45, color: body }}
      >
        <b style={{ color: ink, marginRight: 12 }}>特教適性亮點</b>
        {highlight}
      </TintCard>
    </div>
  );
  return (
    <div style={root}>
      <PageHead eyebrow={eyebrow} title={title} iconId={iconId} />
      <div style={column(120, leftW)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {points.map((p) => (
            <Bullet key={p}>{p}</Bullet>
          ))}
        </div>
        {!wide && notes}
      </div>
      <div style={column(120 + leftW + COL_GAP, w)}>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          style={{ ...linkReset, position: 'relative', display: 'block', width: w, height: h }}
        >
          <Shot src={img} alt={imgAlt} style={{ position: 'relative', width: w, height: h }} />
          <span
            style={{
              position: 'absolute',
              right: 24,
              bottom: 24,
              fontSize: 28,
              fontWeight: 800,
              color: ink,
              padding: '12px 26px',
              borderRadius: 999,
              border: `3px solid ${ink}`,
              background: coral,
              boxShadow: hard(5),
              whiteSpace: 'nowrap',
            }}
          >
            點我開啟 ↗
          </span>
        </a>
        {wide && notes}
      </div>
      <Footer />
    </div>
  );
};

const ChineseTool: Page = () => (
  <ToolPage
    eyebrow="生成器 1 · 國語文"
    title="國語文學習單"
    points={[
      '原文與易讀雙軌對照，搭配情境插圖',
      '注音田字格生字練寫、段落摘要',
      '每段兩題即時檢核，範圍縮小',
      '課文脈絡表格、詞語連連看評量',
    ]}
    highlight="依學生閱讀能力，原文與易讀版本並排對照"
    href={toolUrls.chineseWorksheet}
    img={imgChineseReading}
    ratio={2.438}
    imgAlt="國語文學習單：課文雙軌對照"
    iconId="icon-generator"
  />
);
ChineseTool.transition = morphTransition;

const VocabMakerTool: Page = () => (
  <ToolPage
    eyebrow="生成器 2 · 國語文"
    title="詞彙教材生成器"
    points={[
      '每個詞語配一張情境插圖',
      '生字大字呈現，田字格練寫',
      '造句填空，把詞語放回句子裡',
      '圖片、生字、造句一張表完成',
    ]}
    highlight="先看圖理解詞義，書寫量少、一格一格寫"
    pain="想做詞彙教材，配圖麻煩、排版又很累"
    href={toolUrls.vocabMaker}
    img={imgVocabMaker}
    ratio={1.1}
    imgAlt="詞彙教材：圖片、生字田字格與造句填空"
  />
);

const SimilarCharactersTool: Page = () => (
  <ToolPage
    eyebrow="生成器 3 · 國語文"
    title="字族學習單"
    points={[
      '以中心字串起一整個字族',
      '部首提示＋字形拆解，看懂字義',
      '注音與圖示，降低閱讀負擔',
      '短句填空，馬上用在句子裡',
    ]}
    highlight="把長得像的字放在一起，用部首分辨意思"
    pain="形近字老是寫錯、認錯，一個一個教又記不住"
    href={toolUrls.similarCharacters}
    img={imgSimilarCharacters}
    ratio={1.338}
    imgAlt="「青」字族學習單：清、請、晴、情、精"
  />
);

const MathScaffoldTool: Page = () => (
  <ToolPage
    eyebrow="生成器 4 · 數學"
    title="數學簡化學習單"
    points={[
      '只要輸入題型，或貼上課本截圖',
      '概念說明 → 例題拆解 → 分步練習',
      '一次只練一種概念，結構清楚',
      '一鍵列印乾淨 A4，免二次排版',
    ]}
    highlight="先懂再練、微步驟引導，降低學生面對題目的焦慮"
    href={toolUrls.mathScaffold}
    img={imgMathConcept}
    ratio={1.649}
    imgAlt="數學簡化學習單：概念說明"
  />
);

const SpecialEdEnglishTool: Page = () => (
  <ToolPage
    eyebrow="生成器 5 · 英語文"
    title="英文資源班學習單"
    points={[
      '情境分鏡故事連環圖',
      '標準英文字母四線格練寫',
      '隨課圖文重點單字檢核',
      '一鍵 A4 乾淨作業卷列印',
    ]}
    highlight="用分鏡故事當鷹架，看圖就能進入課文"
    pain="課本句子太長太難，手動降階、重畫分鏡、排版耗時耗力"
    href={toolUrls.specialEdEnglish}
    img={imgSpecialEdEnglish}
    ratio={1.378}
    imgAlt="英文資源班學習單：分鏡故事與單字認讀檢核"
  />
);

const VocabPracticeTool: Page = () => (
  <ToolPage
    eyebrow="生成器 6 · 英語文"
    title="單字練習卷生成器"
    points={[
      '多元題型：拼英／克漏／連連看',
      '特教適性大字體寬敞排版',
      '同步產出學生卷與解答卷',
      '支援隨機打亂出 AB 卷',
    ]}
    highlight="題型自由組合，同一份單字出不同層次的卷"
    pain="每次小考都要手動拼湊題型，出題加排版排整晚"
    href={toolUrls.vocabPractice}
    img={imgVocabPractice}
    ratio={1.432}
    imgAlt="單字練習卷：看圖抄寫與四線格"
  />
);

const toolLinks = [
  { name: '國語文學習單', href: toolUrls.chineseWorksheet, tint: tintBlue },
  { name: '詞彙教材生成器', href: toolUrls.vocabMaker, tint: tintBlue },
  { name: '字族學習單', href: toolUrls.similarCharacters, tint: tintBlue },
  { name: '數學簡化學習單', href: toolUrls.mathScaffold, tint: tintGreen },
  { name: '英文資源班學習單', href: toolUrls.specialEdEnglish, tint: tintPink },
  { name: '單字練習卷生成器', href: toolUrls.vocabPractice, tint: tintPink },
];

const ToolLinks: Page = () => (
  <div style={root}>
    <PageHead eyebrow="實作時間" title="挑一個，做一份給你的學生" aside="點卡片直接開啟" />
    {toolLinks.map((t, i) => (
      <a
        key={t.href}
        href={t.href}
        target="_blank"
        rel="noreferrer"
        style={{
          ...abs(120 + (i % 3) * 572, 300 + Math.floor(i / 3) * 330, 536, 300),
          boxSizing: 'border-box',
          borderRadius: 28,
          background: t.tint,
          border,
          boxShadow: hard(8),
          padding: '28px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 32,
          color: ink,
          textDecoration: 'none',
        }}
      >
        <NumBadge n={String(i + 1)} fill={paper} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            {t.name}
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: body }}>點擊開啟 ↗</div>
        </div>
      </a>
    ))}
    <Footer />
  </div>
);

type ShotMark = { x: number; y: number; w: number; h: number; tag: string; below?: boolean };

const MarkedShot = ({
  src,
  alt,
  natW,
  natH,
  left,
  top,
  width,
  marks = [],
}: {
  src: string;
  alt: string;
  natW: number;
  natH: number;
  left: number;
  top: number;
  width: number;
  marks?: ShotMark[];
}) => {
  const k = width / natW;
  return (
    <div style={abs(left, top, width, natH * k)}>
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

const RemixSection: Page = () => (
  <div style={slabRoot}>
    <div style={abs(120, 116)}>
      <Eyebrow>Part 3</Eyebrow>
    </div>
    <div style={abs(120, 300, 1100)}>
      <Heading size={120}>
        改成
        <br />
        自己的生成器
      </Heading>
    </div>
    <p style={{ ...abs(120, 640, 900), margin: 0, fontSize: 40, lineHeight: 1.5, color: body }}>
      不用從頭做起，拿米克師的 Canvas 來改，
      <Highlight>說出想改哪裡</Highlight>就有你的版本。
    </p>
    <div style={abs(1290, 290)}>
      <IconTile id="icon-remix" size={420} fill={green}>
        <RemixIcon />
      </IconTile>
    </div>
    <Ink width={560} height={560} style={abs(1220, 220)}>
      <Sparkle x={520} y={60} s={1.4} />
      <Sparkle x={40} y={520} s={0.9} fill={pink} />
    </Ink>
    <Footer />
  </div>
);
RemixSection.transition = morphTransition;

const remixSteps = [
  { n: '1', title: '打開生成器連結', desc: '記得先登入 Google 帳號', tint: tintBlue, fill: blue },
  {
    n: '2',
    title: '按「試用 Gemini Canvas」',
    desc: '在畫面的右下角',
    tint: tintGreen,
    fill: green,
  },
  { n: '3', title: '輸入一句話修改', desc: '在下方的對話框打字', tint: tintPink, fill: pink },
  { n: '4', title: '看預覽，滿意就好', desc: '不滿意就再說一次', tint: tintYellow, fill: yellow },
];

const RemixSteps: Page = () => (
  <div style={root}>
    <PageHead
      eyebrow="Part 3 · 改編"
      title="改編四步驟"
      iconId="icon-remix"
      iconFill={green}
      icon={<RemixIcon />}
    />
    {remixSteps.map((s, i) => (
      <TintCard
        key={s.n}
        tint={s.tint}
        style={{
          ...abs(120 + i * 426, 340, 402, 420),
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
RemixSteps.transition = morphTransition;

const TryButton: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Part 3 · 步驟 2" title="按右下角「試用 Gemini Canvas」" />
    <MarkedShot
      src={imgTryCanvas}
      alt="分享的工具頁面，右下角有試用 Gemini Canvas 按鈕"
      natW={1914}
      natH={869}
      left={240}
      top={310}
      width={1440}
      marks={[{ x: 1618, y: 807, w: 276, h: 52, tag: '按這裡' }]}
    />
    <Footer />
  </div>
);

const RemixCopied: Page = () => (
  <div style={root}>
    <PageHead eyebrow="Part 3 · 步驟 3" title="整份程式複製到你的對話" />
    <MarkedShot
      src={imgRemixCopied}
      alt="按下試用後，工具出現在自己的 Gemini 對話中"
      natW={1915}
      natH={874}
      left={120}
      top={320}
      width={1180}
      marks={[{ x: 555, y: 668, w: 871, h: 133, tag: '在這裡輸入修改', below: true }]}
    />
    <div style={{ ...abs(1360, 320, 440), display: 'flex', flexDirection: 'column', gap: 24 }}>
      {['原作品不會被改到', '上方可切換程式碼／預覽', '改壞了可以按復原箭頭'].map((t, i) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <NumBadge n={String(i + 1)} fill={[blue, green, pink][i]} />
          <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.35 }}>{t}</div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

const RemixDemo: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <PageHead eyebrow="Part 3 · 改編示範" title="看到什麼想改，就講" />
      <MarkedShot
        src={imgRemixAsk}
        alt="在問問 Gemini 輸入修改需求"
        natW={1536}
        natH={776}
        left={120}
        top={340}
        width={800}
        marks={[{ x: 1116, y: 500, w: 390, h: 93, tag: '說出想改的地方' }]}
      />
      <div style={{ ...abs(120, 780, 800), fontSize: 38, fontWeight: 800, lineHeight: 1.5 }}>
        「改一下主題色，刪掉進階認知的欄位」
      </div>
      <Ink width={60} height={40} style={abs(950, 520)}>
        <Stroke
          d="M4 20C20 18 34 22 52 20M38 8L54 20L38 32"
          color={coral}
          width={3.6}
          live={live}
          delay={0.4}
        />
      </Ink>
      <MarkedShot
        src={imgRemixResult}
        alt="改編後的工具畫面"
        natW={1259}
        natH={788}
        left={1040}
        top={340}
        width={760}
      />
      <div style={{ ...abs(1040, 840, 760), fontSize: 38, fontWeight: 800, lineHeight: 1.5 }}>
        主題色換了、欄位刪掉了，<Highlight>就改完了</Highlight>
      </div>
      <Footer />
    </div>
  );
};

const Recap: Page = () => (
  <div style={root}>
    <PageHead eyebrow="回顧" title="五句指令，帶回去用" />
    {[
      { step: '打草稿', text: '對象 + 困難 + IEP 目標 + 課文', copy: draftPrompt, tint: tintBlue },
      { step: '局部修改', text: translatePrompt, copy: translatePrompt, tint: tintGreen },
      { step: '仿 A4 排版', text: a4Prompt, copy: a4Prompt, tint: tintPink },
      { step: '列印按鈕', text: blobPrompt, copy: blobPrompt, tint: tintYellow },
      {
        step: '多層次',
        text: '同一課做出三個層次，只調整鷹架',
        copy: tieredPrompt,
        tint: tintBlue,
      },
    ].map((r, i) => (
      <div
        key={r.step}
        style={{
          ...abs(120, 300 + i * 128, 1680, 112),
          boxSizing: 'border-box',
          borderRadius: 24,
          background: r.tint,
          border,
          boxShadow: hard(6),
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 36,
        }}
      >
        <div style={{ width: 200, fontSize: 34, fontWeight: 900 }}>{r.step}</div>
        <div style={{ flex: 1, fontSize: 34, lineHeight: 1.4, color: body }}>{r.text}</div>
        <CopyButton text={r.copy} label="複製" />
      </div>
    ))}
    <Footer />
  </div>
);

const takeaways = [
  { n: '1', title: '先懂學生', detail: '對象、困難、IEP 目標，寫進第一段指令', fill: blue },
  { n: '2', title: '一段一改', detail: '反白局部修改，仿 A4 排版再列印', fill: green },
  { n: '3', title: '用生成器', detail: '選一選、貼課文，幾乎不用下指令', fill: pink },
  { n: '4', title: '改成自己的', detail: '拿現成的 Canvas，說出想改哪裡', fill: yellow },
];

const Conclusion: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <div style={abs(120, 84)}>
        <Eyebrow>結論 · 今天帶回去的</Eyebrow>
      </div>
      <div style={abs(120, 162, 1680)}>
        <Heading size={100}>
          AI 給速度，<span style={{ color: coral }}>老師給判斷。</span>
        </Heading>
      </div>
      {takeaways.map((t, i) => (
        <div
          key={t.n}
          style={{
            ...abs(120, 330 + i * 128, 1680, 108),
            boxSizing: 'border-box',
            borderRadius: 28,
            background: paper,
            border,
            boxShadow: hard(6),
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            animation: live
              ? `fw-rise 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) ${0.25 + i * 0.12}s both`
              : undefined,
          }}
        >
          <NumBadge n={t.n} fill={t.fill} />
          <span style={{ fontSize: 46, fontWeight: 900, width: 280, letterSpacing: '-0.02em' }}>
            {t.title}
          </span>
          <span style={{ fontSize: 40, fontWeight: 700, color: body }}>{t.detail}</span>
        </div>
      ))}
      <a
        href={mixerSiteUrls.prep}
        target="_blank"
        rel="noreferrer"
        style={{
          ...linkReset,
          ...abs(120, 868),
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          padding: '14px 36px',
          borderRadius: 999,
          background: coral,
          border,
          boxShadow: hard(6),
          fontSize: 36,
          fontWeight: 900,
          whiteSpace: 'nowrap',
        }}
      >
        更多生成器 · spedmix.pages.dev ↗
      </a>
      <Footer />
    </div>
  );
};

const chip: CSSProperties = {
  ...linkReset,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 14,
  height: 72,
  padding: '0 30px',
  borderRadius: 999,
  background: paper,
  border: `3px solid ${ink}`,
  boxShadow: hard(5),
  fontSize: 30,
  fontWeight: 700,
  whiteSpace: 'nowrap',
};

const Closing: Page = () => {
  const live = useIsActivePage();
  const enter = (delay: number, name = 'fw-rise') =>
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
        <div style={{ animation: enter(0, 'fw-pop') }}>
          <Mark size={120} />
        </div>
        <div style={{ marginTop: 36, animation: enter(0.12) }}>
          <Heading size={150}>
            謝謝大家<span style={{ color: coral }}>！</span>
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
          歡迎追蹤米克師，看更多特教備課工具
        </p>
        <a
          href={mixerSiteUrls.prep}
          target="_blank"
          rel="noreferrer"
          style={{
            ...linkReset,
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
            animation: enter(0.36, 'fw-pop'),
          }}
        >
          spedmix.pages.dev ↗
        </a>
        <div style={{ marginTop: 56, display: 'flex', gap: 24, animation: enter(0.5) }}>
          <a href={socialUrls.facebook} target="_blank" rel="noreferrer" style={chip}>
            <b>Facebook</b>
            <span style={{ color: muted }}>米克師</span>
          </a>
          <a href={socialUrls.instagram} target="_blank" rel="noreferrer" style={chip}>
            <b>Instagram</b>
            <span style={{ color: muted }}>@spedmix2025</span>
          </a>
          <a href={socialUrls.threads} target="_blank" rel="noreferrer" style={chip}>
            <b>Threads</b>
            <span style={{ color: muted }}>@spedmix2025</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const meta: SlideMeta = {
  title: '用 Gemini Canvas 做學習單',
  createdAt: '2026-10-31T00:00:00.000Z',
};

export default [
  Cover,
  Speaker,
  SocialLinks,
  MixerSites,
  Stance,
  Principle,
  Pipeline,
  Route,
  StudentFirst,
  DraftPrompt,
  CopyDraftPrompt,
  DraftResult,
  SelectEdit,
  A4Step,
  PrintStep,
  PrintButtonFix,
  Tiered,
  PracticeSection,
  ChineseTool,
  VocabMakerTool,
  SimilarCharactersTool,
  MathScaffoldTool,
  SpecialEdEnglishTool,
  VocabPracticeTool,
  ToolLinks,
  RemixSection,
  RemixSteps,
  TryButton,
  RemixCopied,
  RemixDemo,
  AdjustLoop,
  Recap,
  Conclusion,
  Closing,
] satisfies Page[];

export const notes: (string | undefined)[] = [
  '開場：今天用 Gemini Canvas 做學習單，先手動走一遍，再用生成器練習。',
  '講師介紹。',
  '社群媒體，歡迎追蹤。',
  '個人網站：備課幫手與教材共享。',
  '先講立場：AI 對我只能完成 70 分，剩下 30 分要靠老師判斷。後面每一步都會回到這件事。',
  '先講觀念：AI 很好用，但生成了不能直接上課。先了解學生、再訂目標、最後才用 AI。AI 是助力，不取代專業判斷。',
  '多層次教學的四個環節，今天每一段都會碰到：學生分析寫進指令、教材編選與調整、列印與生成器、評量後回來改。',
  '三部分：自己用 Canvas 做一份、用生成器做、改成自己的生成器。',
  '下指令之前，老師要先分析學生。AI 能設計教材，但看不出學生卡在哪。提醒個資：只寫能力描述，不寫姓名。',
  '第一段指令的四個要素：對象、困難、IEP 目標、課文。前一小時已介紹過 Canvas，這裡帶過即可。',
  '完整指令可以一鍵複製，貼進 Gemini 就能跟著做。',
  'Canvas 產出的是可編輯文件，小地方直接改，不用再下指令。',
  '反白一段文字會跳出輸入框，只針對那一段修改。示範加白話翻譯。',
  '一句話轉成仿 A4 的 HTML，題目不會跨頁被切開。',
  '列印：在預覽上全選、右鍵列印，或 Ctrl + P。提醒勾選背景圖形。',
  '如果頁面上的列印按鈕沒反應，請它另開 blob 分頁再列印。',
  '多層次：同一課、同一組目標，只調整鷹架。一句指令做出三個層次，班上不同程度的學生都有一份。（可現場示範）',
  '實作：米克師的生成器，幾乎不用下指令。',
  '國語文學習單生成器：掃 QR code 開啟，跟著選項做一份。',
  '詞彙教材生成器：每個詞語配圖、田字格練寫、造句填空。配圖和排版都交給它。',
  '字族學習單：以中心字串起字族，用部首提示與拆解分辨形近字。例子是「青」字族。',
  '數學簡化學習單：輸入題型或貼課本截圖，概念說明 → 例題拆解 → 分步練習。',
  '英文資源班學習單：情境分鏡故事、四線格練寫、單字檢核，一鍵 A4 列印。',
  '單字練習卷生成器：拼英、克漏、連連看自由組合，同步產出解答卷，可出 AB 卷。',
  '實作時間：六個生成器的 QR code 都在這頁，請老師挑一個做一份給自己的學生。',
  '第三部分：不用從頭做，拿米克師的 Canvas 來改。',
  '改編四步：開連結、按試用、打一句話、看預覽。',
  '分享頁右下角的「試用 Gemini Canvas」。',
  '按下後整份程式複製成自己的副本，原作品不會被改到。',
  '示範：改主題色、刪欄位，一句話就改完。',
  '評量與調整：上完課看學生卡在哪，回 Canvas 反白那一段調整。這就是閉環，判斷永遠在老師身上。',
  '回顧五句指令，每句都能複製帶回去用。',
  '結論：AI 給速度，老師給判斷。四個重點帶回去：先懂學生、一段一改、用生成器、改成自己的。',
  '謝謝大家，歡迎追蹤米克師。',
];
