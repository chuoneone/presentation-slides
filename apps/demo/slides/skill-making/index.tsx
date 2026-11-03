import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  Step,
  Steps,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useId } from 'react';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..800&family=Newsreader:ital,opsz,wght@1,6..72,400&display=swap';
const FONT_LINK_ID = 'osd-webfont-skill-making';
const STYLE_ID = 'osd-styles-skill-making';
const KEYFRAMES = `
@keyframes fw-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes fw-fade { from { opacity: 0 } to { opacity: 1 } }
`;

if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;

  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== KEYFRAMES) style.textContent = KEYFRAMES;
}

const SANS =
  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft JhengHei", "PingFang TC", "Noto Sans TC", sans-serif';
// Chinese has no true italic, so quotes use an upright CJK serif fallback.
const SERIF = '"Newsreader", "Noto Serif TC", "PMingLiU", "Songti TC", Georgia, serif';

export const design: DesignSystem = {
  palette: { bg: '#FFFEFC', text: '#191919', accent: '#E8553B' },
  fonts: { display: SANS, body: SANS },
  typeScale: { hero: 150, body: 32 },
  radius: 24,
};

const INK = '#191919';
const CORAL = '#E8553B';
const BODY = '#5F5E5B';
const SOFT = '#9B9A97';
const RULE = 'rgba(25,25,25,0.12)';

const YELLOW = '#F8DA7E';
const BLUE = '#8DBDEB';
const PINK = '#F6C3CF';
const GREEN = '#A6D4B2';

const TINT_YELLOW = '#FBF3DB';
const TINT_BLUE = '#E7F3F8';
const TINT_PINK = '#FAF1F5';
const TINT_GREEN = '#EDF3EC';

const X0 = 120;

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 240,
  exit: { duration: 240, easing: EASE_IN, keyframes: [{ opacity: 1 }, { opacity: 1 }] },
  enter: {
    duration: 240,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(5px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

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
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  fontVariantNumeric: 'tabular-nums',
  WebkitFontSmoothing: 'antialiased',
};

const Title = ({ children }: { children: ReactNode }) => (
  <h1
    style={{
      margin: 0,
      fontFamily: 'var(--osd-font-display)',
      fontSize: 'var(--osd-size-hero)',
      fontWeight: 780,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      wordSpacing: '0.08em',
      color: INK,
    }}
  >
    {children}
  </h1>
);

const Heading = ({ children, size = 96 }: { children: ReactNode; size?: number }) => (
  <h2
    style={{
      margin: 0,
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 780,
      lineHeight: 1.1,
      letterSpacing: size >= 90 ? '-0.02em' : '-0.01em',
      wordSpacing: '0.08em',
      color: INK,
    }}
  >
    {children}
  </h2>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 26, fontWeight: 650, letterSpacing: '-0.01em', color: CORAL }}>
    {children}
  </div>
);

const Mark = ({ size = 24 }: { size?: number }) => (
  <svg
    aria-hidden="true"
    width={size * 0.8}
    height={size}
    viewBox="0 0 20 25"
    style={{ display: 'block' }}
  >
    <path d="M10 24C8.5 20 1.5 15 1.5 9.5a8.5 8.5 0 0 1 17 0C18.5 15 11.5 20 10 24Z" fill={INK} />
    <circle cx="10" cy="9.5" r="3.4" fill="#FFFEFC" />
  </svg>
);

const Footer = ({
  brand = '自製 Skill',
  label = '備課工作坊',
}: {
  brand?: string;
  label?: string;
}) => {
  const { current, total } = useSlidePageNumber();
  const pad2 = (n: number) => String(n).padStart(2, '0');
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        top: 1000,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 21,
        color: SOFT,
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Mark size={24} />
        <span style={{ color: INK, fontWeight: 720, letterSpacing: '-0.02em' }}>{brand}</span>
        <span style={{ marginLeft: 12 }}>{label}</span>
      </span>
      <span>
        {pad2(current)} / {pad2(total)}
      </span>
    </div>
  );
};

const Highlight = ({ children, color = '#FCE38A' }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      background: color,
      borderRadius: '6px 12px 8px 14px',
      padding: '0 6px',
      margin: '0 -2px',
      color: INK,
      WebkitBoxDecorationBreak: 'clone',
      boxDecorationBreak: 'clone',
    }}
  >
    {children}
  </span>
);

const TintCard = ({
  tint = TINT_BLUE,
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
      borderRadius: 'var(--osd-radius)',
      background: tint,
      padding: '34px 44px 32px',
      ...style,
    }}
  >
    {children}
  </div>
);

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
      stroke={INK}
      strokeWidth={3.2}
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
  color = INK,
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
  color = CORAL,
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

const Underline = ({ x, y, w, live }: { x: number; y: number; w: number; live: boolean }) => (
  <Ink width={w} height={40} style={abs(x, y)}>
    <Stroke
      d={`M6 22C${w * 0.22} 10 ${w * 0.48} 30 ${w * 0.74} 16S${w * 0.95} 12 ${w - 8} 16`}
      color={CORAL}
      live={live}
    />
  </Ink>
);

const Sparkle = ({
  x,
  y,
  s = 1,
  fill = YELLOW,
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

const Worksheet = ({ fill = '#FFFFFF', head = PINK }: { fill?: string; head?: string }) => (
  <g>
    <rect x="0" y="0" width="260" height="330" rx="6" fill={fill} />
    <rect x="30" y="30" width="120" height="30" rx="4" fill={head} stroke="none" />
    <path d="M30 96H230M30 136H230M30 176H180" strokeWidth={2.6} />
    <rect x="30" y="206" width="56" height="56" rx="4" fill="#FFFFFF" />
    <rect x="102" y="206" width="56" height="56" rx="4" fill="#FFFFFF" />
    <rect x="174" y="206" width="56" height="56" rx="4" fill="#FFFFFF" />
    <path d="M30 296H150" strokeWidth={2.6} />
  </g>
);

const Pencil = () => (
  <g>
    <rect x="0" y="-13" width="210" height="26" rx="3" fill={BLUE} />
    <path d="M0 -13L-36 0L0 13Z" fill="#FFFFFF" />
    <path d="M-36 0L-24 -4.3L-24 4.3Z" fill={INK} />
    <rect x="210" y="-13" width="28" height="26" rx="5" fill={PINK} />
    <path d="M206 -13V13" />
  </g>
);

const CoverArt = () => (
  <Ink width={820} height={700} style={abs(1000, 150)}>
    <circle cx="420" cy="330" r="250" fill={YELLOW} stroke="none" />
    <g transform="translate(250 150) rotate(-9 130 165)">
      <Worksheet />
    </g>
    <g transform="translate(300 160) rotate(5 130 165)">
      <Worksheet head={GREEN} />
    </g>
    <g transform="translate(560 470) rotate(-38)">
      <Pencil />
    </g>
    <g transform="translate(560 70)">
      <rect x="0" y="0" width="150" height="64" rx="12" fill={CORAL} />
      <text
        x="75"
        y="43"
        textAnchor="middle"
        fill="#FFFFFF"
        stroke="none"
        fontSize="30"
        fontWeight="780"
        fontFamily={SANS}
      >
        Skill
      </text>
    </g>
    <Sparkle x={760} y={250} s={1.1} />
    <Sparkle x={200} y={120} s={0.7} fill="#FFFFFF" />
    <Sparkle x={170} y={520} s={0.9} />
    <path d="M40 640Q300 635 560 639T800 638" />
  </Ink>
);

const LoopArt = () => (
  <Ink width={300} height={180}>
    <circle cx="150" cy="92" r="78" fill={BLUE} stroke="none" />
    <path d="M96 70Q120 30 168 40Q206 50 212 92" />
    <path d="M196 80L212 96L226 76" />
    <path d="M204 116Q180 156 132 146Q94 136 88 94" />
    <path d="M104 106L88 90L74 110" />
  </Ink>
);

const ChatArt = () => (
  <Ink width={300} height={180}>
    <circle cx="150" cy="92" r="78" fill={GREEN} stroke="none" />
    <path
      d="M60 40H186Q198 40 198 52V96Q198 108 186 108H108L84 128V108H72Q60 108 60 96V52Q60 40 72 40Z"
      fill="#FFFFFF"
    />
    <path d="M86 66H170M86 84H140" strokeWidth={2.6} />
    <path
      d="M150 88H238Q250 88 250 100V136Q250 148 238 148H226V166L204 148H150Q138 148 138 136V100Q138 88 150 88Z"
      fill={YELLOW}
    />
    <circle cx="170" cy="118" r="4" fill={INK} />
    <circle cx="194" cy="118" r="4" fill={INK} />
    <circle cx="218" cy="118" r="4" fill={INK} />
  </Ink>
);

const RestartArt = () => (
  <Ink width={300} height={180}>
    <circle cx="150" cy="92" r="78" fill={PINK} stroke="none" />
    <rect
      x="96"
      y="30"
      width="96"
      height="124"
      rx="6"
      fill="#FFFFFF"
      transform="rotate(-8 144 92)"
    />
    <rect x="112" y="34" width="96" height="124" rx="6" fill="#FFFFFF" />
    <path d="M128 66H190M128 88H178M128 110H186" strokeWidth={2.6} />
    <path d="M200 40Q240 52 236 96" />
    <path d="M222 86L236 100L250 84" />
  </Ink>
);

const HandbookArt = () => (
  <Ink width={620} height={560} style={abs(1160, 330)}>
    <circle cx="310" cy="270" r="230" fill={YELLOW} stroke="none" />
    <g transform="rotate(-6 310 280)">
      <rect x="150" y="90" width="320" height="380" rx="10" fill="#FFFFFF" />
      <rect x="150" y="90" width="46" height="380" rx="8" fill={BLUE} />
      <path d="M230 160H430M230 220H410M230 280H430M230 340H390" strokeWidth={2.6} />
      <circle cx="236" cy="160" r="5" fill={INK} stroke="none" />
      <circle cx="236" cy="220" r="5" fill={INK} stroke="none" />
      <circle cx="236" cy="280" r="5" fill={INK} stroke="none" />
      <circle cx="236" cy="340" r="5" fill={INK} stroke="none" />
      <path d="M410 90V160L432 142L454 160V90" fill={CORAL} />
    </g>
    <Sparkle x={520} y={110} s={1} />
    <Sparkle x={110} y={420} s={0.8} fill="#FFFFFF" />
    <path d="M60 520Q300 515 560 519" />
  </Ink>
);

const DraftArt = () => (
  <Ink width={460} height={520} style={abs(1300, 340)}>
    <circle cx="230" cy="250" r="200" fill={GREEN} stroke="none" />
    <g transform="translate(100 80) rotate(4 130 165)">
      <Worksheet head={YELLOW} />
    </g>
    <Sparkle x={400} y={90} s={0.9} />
    <path d="M30 480Q230 475 430 479" />
  </Ink>
);

const Cover: Page = () => (
  <div style={root}>
    <div style={{ ...abs(X0, 100), display: 'flex', alignItems: 'center', gap: 14 }}>
      <Mark size={32} />
      <span style={{ fontSize: 30, fontWeight: 760, letterSpacing: '-0.02em' }}>自製 Skill</span>
    </div>
    <div style={abs(X0, 262)}>
      <Title>
        把備課
        <br />
        變成 Skill
      </Title>
    </div>
    <p style={{ ...abs(X0, 640, 820), margin: 0, fontSize: 36, lineHeight: 1.5, color: BODY }}>
      不用每一課都從頭溝通——<Highlight>讓 AI 記住你的做法</Highlight>。
    </p>
    <div style={{ ...abs(X0, 830), fontSize: 26, color: SOFT }}>一位國中老師的真實備課經驗</div>
    <CoverArt />
    <Footer />
  </div>
);

const PainCard = ({
  x,
  tint,
  index,
  art,
  title,
  body,
}: {
  x: number;
  tint: string;
  index: string;
  art: ReactNode;
  title: string;
  body: string;
}) => (
  <TintCard
    tint={tint}
    style={{ ...abs(x, 330, 536, 560), display: 'flex', flexDirection: 'column' }}
  >
    <div style={{ marginLeft: -8 }}>{art}</div>
    <div style={{ marginTop: 30, fontSize: 22, fontWeight: 700, color: SOFT }}>{index}</div>
    <div style={{ marginTop: 10 }}>
      <Heading size={52}>{title}</Heading>
    </div>
    <p style={{ margin: '22px 0 0', fontSize: 30, lineHeight: 1.5, color: BODY }}>{body}</p>
  </TintCard>
);

const Pain: Page = () => (
  <div style={root}>
    <div style={abs(X0, 116)}>
      <Eyebrow>開場</Eyebrow>
    </div>
    <div style={abs(X0, 160)}>
      <Heading>你是不是也這樣？</Heading>
    </div>
    <PainCard
      x={120}
      tint={TINT_BLUE}
      index="01"
      art={<LoopArt />}
      title="每課重講格式"
      body="每一課都要重新跟 AI 解釋一次，你要的學習單長什麼樣子。"
    />
    <PainCard
      x={692}
      tint={TINT_GREEN}
      index="02"
      art={<ChatArt />}
      title="來回改好幾輪"
      body="字體、注音、題型順序……一輪一輪修，才終於滿意。"
    />
    <PainCard
      x={1264}
      tint={TINT_PINK}
      index="03"
      art={<RestartArt />}
      title="下一課又重來"
      body="上一課磨出來的經驗，沒有被留下來。"
    />
    <div style={{ ...abs(X0, 920), fontSize: 30, color: BODY }}>
      其實，你只需要<Highlight>好好教 AI 一次</Highlight>。
    </div>
    <Footer />
  </div>
);

const ListRow = ({
  top,
  n,
  title,
  body,
}: {
  top: number;
  n: string;
  title: string;
  body: string;
}) => (
  <div
    style={{
      ...abs(X0, top, 960, 120),
      display: 'flex',
      alignItems: 'center',
      gap: 36,
      borderTop: `1.5px solid ${RULE}`,
    }}
  >
    <span style={{ width: 60, fontSize: 26, fontWeight: 700, color: SOFT }}>{n}</span>
    <span style={{ width: 300, fontSize: 40, fontWeight: 760, letterSpacing: '-0.01em' }}>
      {title}
    </span>
    <span style={{ fontSize: 28, color: BODY }}>{body}</span>
  </div>
);

const WhatIs: Page = () => (
  <div style={root}>
    <div style={abs(X0, 116)}>
      <Eyebrow>Skill 是什麼？</Eyebrow>
    </div>
    <div style={abs(X0, 160)}>
      <Heading>一份寫給 AI 的備課 SOP</Heading>
    </div>
    <div style={{ ...abs(X0, 300, 960), fontSize: 32, lineHeight: 1.5, color: BODY }}>
      就像代課老師拿到的<Highlight>交接本</Highlight>，寫清楚四件事：
    </div>
    <ListRow top={400} n="01" title="什麼時候用" body="看到什麼情況就要啟動" />
    <ListRow top={520} n="02" title="要做出什麼" body="學習單？網頁？還是兩個都要" />
    <ListRow top={640} n="03" title="做成什麼樣子" body="版面、題型、字體的固定格式" />
    <ListRow top={760} n="04" title="做好放哪裡" body="每次都存到同一個地方" />
    <div style={{ ...abs(X0, 880, 960), borderTop: `1.5px solid ${RULE}` }} />
    <HandbookArt />
    <Footer />
  </div>
);

const Bubble = ({ who, tint, children }: { who: string; tint: string; children: ReactNode }) => (
  <TintCard tint={tint} style={{ padding: '28px 40px' }}>
    <div style={{ fontSize: 22, fontWeight: 700, color: SOFT }}>{who}</div>
    <div style={{ marginTop: 8, fontSize: 34, lineHeight: 1.5 }}>{children}</div>
  </TintCard>
);

const Step1: Page = () => (
  <div style={root}>
    <div style={abs(X0, 116)}>
      <Eyebrow>Step 1　第一次備課</Eyebrow>
    </div>
    <div style={abs(X0, 160)}>
      <Heading>把教材交給 agent</Heading>
    </div>
    <div style={{ ...abs(X0, 340, 1080), display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Bubble who="我" tint={TINT_BLUE}>
        （附上課文）把這篇文做成一份
        <Highlight>上課用的學習單</Highlight>。
      </Bubble>
      <Bubble who="AI" tint={TINT_GREEN}>
        好的！這是學習單初稿，包含生字、詞語和閱讀理解題。
      </Bubble>
    </div>
    <div style={{ ...abs(X0, 800, 1080), fontSize: 28, lineHeight: 1.5, color: BODY }}>
      第一版很快就出來了，但通常還不是你心中的樣子。
    </div>
    <DraftArt />
    <div style={{ ...abs(1300, 870, 460), textAlign: 'center', fontSize: 26, color: SOFT }}>
      學習單 v1
    </div>
    <Footer />
  </div>
);

const Exchange = ({ ask, reply }: { ask: string; reply: string }) => (
  <div
    style={{
      height: 128,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 8,
      borderTop: `1.5px solid ${RULE}`,
    }}
  >
    <div style={{ fontSize: 36, fontWeight: 650 }}>
      <span style={{ color: SOFT, fontWeight: 700, marginRight: 20 }}>我</span>
      {ask}
    </div>
    <div style={{ fontSize: 26, color: BODY, paddingLeft: 56 }}>{reply}</div>
  </div>
);

const Version = ({ v, note }: { v: string; note: string }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, height: 84 }}>
    <span style={{ fontSize: 44, fontWeight: 760, color: SOFT, textDecoration: 'line-through' }}>
      {v}
    </span>
    <span style={{ fontSize: 24, color: SOFT }}>{note}</span>
  </div>
);

const Step2: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <div style={abs(X0, 116)}>
        <Eyebrow>Step 2　來回溝通</Eyebrow>
      </div>
      <div style={abs(X0, 160)}>
        <Heading>一輪一輪，磨出定稿</Heading>
      </div>
      <div style={abs(X0, 330, 1040)}>
        <Steps>
          <Step>
            <Exchange ask="字再大一點，生字加上注音。" reply="AI：已調整 ✓" />
          </Step>
          <Step>
            <Exchange ask="題型改成先選擇、再填空。" reply="AI：已調整 ✓" />
          </Step>
          <Step>
            <Exchange ask="最後加一題延伸思考。" reply="AI：已調整 ✓" />
          </Step>
          <Step>
            <Exchange ask="對，就是這個！" reply="終於是我要的學習單" />
          </Step>
        </Steps>
        <div style={{ borderTop: `1.5px solid ${RULE}` }} />
      </div>
      <div style={abs(1340, 330, 460)}>
        <Version v="v1" note="太擠" />
        <Version v="v2" note="少了注音" />
        <Version v="v3" note="題型順序不對" />
        <Version v="v4" note="還差一點" />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginTop: 16 }}>
          <span style={{ fontSize: 84, fontWeight: 780, letterSpacing: '-0.04em' }}>v5</span>
          <span style={{ fontSize: 32, fontWeight: 700 }}>定稿</span>
        </div>
      </div>
      <CircleDoodle x={1300} y={680} w={300} h={140} live={live} delay={0.5} />
      <Footer />
    </div>
  );
};

const Chip = ({ x, w, label, fill }: { x: number; w: number; label: string; fill: string }) => (
  <g transform={`translate(${x} 0)`}>
    <rect x="0" y="0" width={w} height="96" rx="14" fill={fill} />
    <text
      x={w / 2}
      y="62"
      textAnchor="middle"
      fill={INK}
      stroke="none"
      fontSize="42"
      fontWeight="700"
      fontFamily={SANS}
    >
      {label}
    </text>
  </g>
);

const Slot = ({ x, w }: { x: number; w: number }) => (
  <rect x={x} y="0" width={w} height="96" rx="14" fill="#FFFFFF" strokeDasharray="10 12" />
);

const SentenceArt = () => (
  <Ink width={1680} height={500} style={abs(X0, 400)}>
    <rect x="4" y="4" width="1672" height="490" rx="20" fill="#FFFFFF" />
    <path d="M4 74H1676" />
    <circle cx="48" cy="40" r="10" fill={PINK} />
    <circle cx="82" cy="40" r="10" fill={YELLOW} />
    <circle cx="116" cy="40" r="10" fill={GREEN} />
    <text x="70" y="146" fill={BODY} stroke="none" fontSize="32" fontWeight="500" fontFamily={SANS}>
      把詞卡拖到下面，排成正確的句子：
    </text>
    <g transform="translate(70 196)">
      <Chip x={0} w={180} label="看書" fill={BLUE} />
      <Chip x={210} w={180} label="小明" fill={YELLOW} />
      <Chip x={420} w={220} label="安靜地" fill={GREEN} />
      <Chip x={670} w={220} label="圖書館" fill={PINK} />
      <Chip x={920} w={120} label="在" fill={BLUE} />
    </g>
    <g transform="translate(70 344)">
      <Slot x={0} w={180} />
      <Slot x={210} w={120} />
      <Slot x={360} w={220} />
      <Slot x={610} w={220} />
      <Slot x={860} w={180} />
    </g>
    <path d="M1250 250Q1330 200 1400 260" stroke={CORAL} />
    <path d="M1384 236L1402 262L1374 268" stroke={CORAL} />
    <Sparkle x={1500} y={330} s={1.2} />
  </Ink>
);

const Step3: Page = () => (
  <div style={root}>
    <div style={abs(X0, 116)}>
      <Eyebrow>Step 3　再加一個</Eyebrow>
    </div>
    <div style={abs(X0, 160)}>
      <Heading>句型排列互動網頁</Heading>
    </div>
    <div style={{ ...abs(1080, 196, 720), fontSize: 30, lineHeight: 1.5, color: BODY }}>
      「再幫我做一個<Highlight>句型排列</Highlight>的互動網頁。」
    </div>
    <SentenceArt />
    <Footer />
  </div>
);

const LessonRow = ({ top, name }: { top: number; name: string }) => (
  <div
    style={{
      ...abs(X0, top, 1680, 100),
      display: 'flex',
      alignItems: 'center',
      fontSize: 34,
      borderTop: `1.5px solid ${RULE}`,
    }}
  >
    <span style={{ width: 500, fontWeight: 700 }}>{name}</span>
    <span style={{ width: 380, color: BODY }}>學習單 ✓</span>
    <span style={{ width: 380, color: BODY }}>網頁 ✓</span>
    <span style={{ fontWeight: 700 }}>10 次</span>
  </div>
);

const Step4: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <div style={abs(X0, 116)}>
        <Eyebrow>Step 4　發現痛點</Eyebrow>
      </div>
      <div style={abs(X0, 160)}>
        <Heading>每課都要，卻不想重來</Heading>
      </div>
      <div
        style={{
          ...abs(X0, 320, 1680, 60),
          display: 'flex',
          alignItems: 'center',
          fontSize: 24,
          fontWeight: 700,
          color: SOFT,
          borderBottom: `2px solid ${INK}`,
        }}
      >
        <span style={{ width: 500 }}>課次</span>
        <span style={{ width: 380 }}>學習單</span>
        <span style={{ width: 380 }}>互動網頁</span>
        <span>重新溝通</span>
      </div>
      <LessonRow top={382} name="第 1 課" />
      <LessonRow top={482} name="第 2 課" />
      <LessonRow top={582} name="第 3 課" />
      <LessonRow top={682} name="第 4 課……" />
      <div
        style={{
          ...abs(X0, 782, 1680, 120),
          display: 'flex',
          alignItems: 'center',
          borderTop: `2px solid ${INK}`,
        }}
      >
        <span style={{ width: 1260, fontSize: 32, color: BODY }}>
          <Highlight>要是 AI 記得我的做法就好了……</Highlight>
        </span>
        <span style={{ fontSize: 72, fontWeight: 780, letterSpacing: '-0.04em' }}>40+ 次</span>
      </div>
      <CircleDoodle x={1340} y={776} w={320} h={132} live={live} delay={0.5} />
      <Footer />
    </div>
  );
};

const Step5: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <div style={abs(X0, 116)}>
        <Eyebrow>Step 5　一句話變成 Skill</Eyebrow>
      </div>
      <div style={abs(X0, 160)}>
        <Heading>我對 AI 說了這句話</Heading>
      </div>
      <Underline x={X0} y={282} w={640} live={live} />
      <blockquote
        style={{
          ...abs(X0, 380, 1500),
          margin: 0,
          fontFamily: SERIF,
          fontSize: 62,
          lineHeight: 1.45,
          letterSpacing: '0.01em',
        }}
      >
        「我以後都要這樣備課，所以幫我做個
        skill：當我給你課文內容，你就要做出這種格式的學習單和網頁，並都放在我的桌面，建一個資料夾。」
      </blockquote>
      <div style={{ ...abs(X0, 820), fontSize: 28, color: BODY }}>
        就這樣，這套備課做法<Highlight>變成了一個 Skill</Highlight>。
      </div>
      <Footer />
    </div>
  );
};

const PartCard = ({
  x,
  tint,
  index,
  title,
  quote,
  body,
}: {
  x: number;
  tint: string;
  index: string;
  title: string;
  quote: string;
  body: string;
}) => (
  <TintCard
    tint={tint}
    style={{ ...abs(x, 420, 402, 400), display: 'flex', flexDirection: 'column' }}
  >
    <div style={{ fontSize: 22, fontWeight: 700, color: SOFT }}>{index}</div>
    <div style={{ marginTop: 14 }}>
      <Heading size={48}>{title}</Heading>
    </div>
    <div style={{ marginTop: 30, fontFamily: SERIF, fontSize: 40, lineHeight: 1.3 }}>
      「{quote}」
    </div>
    <p style={{ margin: 'auto 0 0', fontSize: 28, lineHeight: 1.5, color: BODY }}>{body}</p>
  </TintCard>
);

const Breakdown: Page = () => (
  <div style={root}>
    <div style={abs(X0, 116)}>
      <Eyebrow>拆解這句話</Eyebrow>
    </div>
    <div style={abs(X0, 160)}>
      <Heading>一句話裡的四個要素</Heading>
    </div>
    <div style={{ ...abs(X0, 310, 1680), fontSize: 30, lineHeight: 1.5, color: BODY }}>
      當我給你課文內容，你就要做出<Highlight>這種格式</Highlight>的學習單和網頁，並都放在我的桌面……
    </div>
    <Steps>
      <Step>
        <PartCard
          x={120}
          tint={TINT_BLUE}
          index="01"
          title="觸發條件"
          quote="給你課文"
          body="什麼時候要啟動"
        />
      </Step>
      <Step>
        <PartCard
          x={546}
          tint={TINT_GREEN}
          index="02"
          title="產出物"
          quote="學習單＋網頁"
          body="要做出哪些東西"
        />
      </Step>
      <Step>
        <PartCard
          x={972}
          tint={TINT_YELLOW}
          index="03"
          title="格式標準"
          quote="這種格式"
          body="就是剛剛磨出來的定稿"
        />
      </Step>
      <Step>
        <PartCard
          x={1398}
          tint={TINT_PINK}
          index="04"
          title="存放位置"
          quote="桌面資料夾"
          body="每次都放同一個地方"
        />
      </Step>
    </Steps>
    <Footer />
  </div>
);

const FlowLine = ({
  n,
  children,
  dim = false,
}: {
  n: string;
  children: ReactNode;
  dim?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 20,
      padding: '18px 0',
      borderTop: `1.5px solid ${RULE}`,
      fontSize: 32,
      color: dim ? BODY : INK,
    }}
  >
    <span style={{ width: 40, fontSize: 22, fontWeight: 700, color: SOFT }}>{n}</span>
    <span>{children}</span>
  </div>
);

const Compare: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <div style={abs(X0, 116)}>
        <Eyebrow>之後的備課</Eyebrow>
      </div>
      <div style={abs(X0, 160)}>
        <Heading>以前 vs. 現在</Heading>
      </div>
      <TintCard tint={TINT_PINK} style={abs(120, 330, 818, 590)}>
        <div style={{ fontSize: 26, fontWeight: 700, color: SOFT }}>以前</div>
        <div
          style={{
            marginTop: 6,
            fontSize: 120,
            fontWeight: 780,
            letterSpacing: '-0.04em',
            color: SOFT,
          }}
        >
          20+ 次
        </div>
        <div style={{ marginTop: 20 }}>
          <FlowLine n="1" dim>
            貼上課文
          </FlowLine>
          <FlowLine n="2" dim>
            來回溝通，做出學習單
          </FlowLine>
          <FlowLine n="3" dim>
            再來回溝通，做出網頁
          </FlowLine>
        </div>
      </TintCard>
      <TintCard tint={TINT_GREEN} style={abs(982, 330, 818, 590)}>
        <div style={{ fontSize: 26, fontWeight: 700, color: SOFT }}>現在</div>
        <div style={{ marginTop: 6, fontSize: 120, fontWeight: 780, letterSpacing: '-0.04em' }}>
          1 次
        </div>
        <div style={{ marginTop: 20 }}>
          <FlowLine n="1">貼上課文</FlowLine>
          <FlowLine n="2">AI 照著 Skill 一次做完</FlowLine>
          <FlowLine n="3">桌面資料夾：學習單＋網頁</FlowLine>
        </div>
      </TintCard>
      <CircleDoodle x={996} y={420} w={250} h={150} live={live} delay={0.5} />
      <Footer />
    </div>
  );
};

const TipRow = ({
  top,
  tint,
  n,
  title,
  body,
}: {
  top: number;
  tint: string;
  n: string;
  title: string;
  body: string;
}) => (
  <TintCard
    tint={tint}
    style={{ ...abs(X0, top, 1680, 180), display: 'flex', alignItems: 'center', gap: 48 }}
  >
    <span style={{ width: 90, fontSize: 84, fontWeight: 780, letterSpacing: '-0.04em' }}>{n}</span>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Heading size={46}>{title}</Heading>
      <span style={{ fontSize: 28, color: BODY }}>{body}</span>
    </div>
  </TintCard>
);

const TryIt: Page = () => (
  <div style={root}>
    <div style={abs(X0, 116)}>
      <Eyebrow>換你試試</Eyebrow>
    </div>
    <div style={abs(X0, 160)}>
      <Heading>自製 Skill 三撇步</Heading>
    </div>
    <TipRow
      top={330}
      tint={TINT_YELLOW}
      n="1"
      title="先手動磨出一版滿意的成品"
      body="有了定稿，AI 才知道「這種格式」長什麼樣子。"
    />
    <TipRow
      top={530}
      tint={TINT_BLUE}
      n="2"
      title="請 AI 把這套做法寫成 Skill"
      body="講清楚：什麼時候用、做出什麼、什麼格式、放在哪裡。"
    />
    <TipRow
      top={730}
      tint={TINT_GREEN}
      n="3"
      title="用了覺得不對，就叫 AI 修 Skill"
      body="Skill 不是一次寫死，越用越順手。"
    />
    <Footer />
  </div>
);

const FolderArt = () => (
  <Ink width={680} height={560} style={abs(1120, 280)}>
    <circle cx="340" cy="270" r="230" fill={YELLOW} stroke="none" />
    <g transform="translate(170 110) rotate(-8 100 130)">
      <Worksheet head={GREEN} />
    </g>
    <g transform="translate(300 90) rotate(7 130 165)">
      <rect x="0" y="0" width="240" height="200" rx="10" fill="#FFFFFF" />
      <path d="M0 40H240" />
      <rect x="24" y="70" width="80" height="40" rx="8" fill={PINK} />
      <rect x="120" y="70" width="90" height="40" rx="8" fill={BLUE} />
      <rect x="24" y="130" width="186" height="40" rx="8" fill="#FFFFFF" strokeDasharray="8 10" />
    </g>
    <path
      d="M110 260H260L290 290H570Q586 290 586 306V470Q586 486 570 486H126Q110 486 110 470Z"
      fill={BLUE}
    />
    <Sparkle x={600} y={120} s={1.1} />
    <Sparkle x={80} y={190} s={0.8} fill="#FFFFFF" />
    <path d="M40 520Q300 515 640 519" />
  </Ink>
);

const Closer: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={root}>
      <div style={abs(X0, 140)}>
        <Heading size={124}>
          先磨一次，
          <br />
          以後一句話
        </Heading>
      </div>
      <Underline x={X0} y={426} w={600} live={live} />
      <div style={{ ...abs(X0, 490), fontSize: 34, color: BODY }}>謝謝聆聽，歡迎回去試試看。</div>
      <div style={{ ...abs(X0, 580, 900), borderTop: `1.5px solid ${RULE}` }} />
      <blockquote
        style={{
          ...abs(X0, 620, 900),
          margin: 0,
          fontFamily: SERIF,
          fontSize: 56,
          lineHeight: 1.3,
        }}
      >
        「滿意的成品，都值得寫成 Skill。」
      </blockquote>
      <FolderArt />
      <Footer label="謝謝聆聽" />
    </div>
  );
};

export const notes: (string | undefined)[] = [
  '今天分享我怎麼把自己的備課流程，變成 AI 會記住的 Skill。',
  '先問大家：用 AI 備課時，是不是每一課都要重新講一次格式？改好幾輪才滿意，下一課又重來？',
  'Skill 說穿了，就是一份寫給 AI 的 SOP。像代課老師的交接本：什麼時候用、做什麼、做成什麼樣、放哪裡。',
  '我的第一步很普通：把課文交給 agent，請它做一份上課用的學習單。',
  '第一版通常不會完全滿意。我一輪一輪地改：字體、注音、題型順序……改到第五版，終於是我要的。',
  '學習單滿意後，我又請它做句型排列的互動網頁，學生可以拖曳詞卡排句子。',
  '做完才發現問題：每一課我都想要學習單加網頁，但每次都要重新溝通一遍，四課下來就是四十幾次。',
  '所以我跟 AI 說了這句話。就這樣，這套備課做法變成了一個 Skill。',
  '仔細看這句話，它剛好包含 Skill 的四個要素：觸發條件、產出物、格式標準、存放位置。',
  '之後備課就簡單了：貼上課文，AI 照著 Skill 一次做完，直接出現在桌面資料夾。',
  '想自己做 Skill，記得三件事：先磨出定稿、請 AI 寫成 Skill、用了不順就叫它修。',
  '先磨一次，以後一句話。謝謝大家。',
];

export const meta: SlideMeta = {
  title: '把備課變成 Skill',
  theme: 'fieldwork',
  createdAt: '2026-11-03T07:31:18.844Z',
};

export default [
  Cover,
  Pain,
  WhatIs,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Breakdown,
  Compare,
  TryIt,
  Closer,
] satisfies Page[];
