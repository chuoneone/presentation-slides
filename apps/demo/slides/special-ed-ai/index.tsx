import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';
import imgGoogleEduNoTraining from './assets/google-edu-no-training.png';
import imgNotebookLMNoTraining from './assets/notebooklm-no-training.png';
import imgSpedmixHome from './assets/spedmix-home.png';
import imgUnsplashSports from './assets/unsplash-sports.png';
import imgPromptRevise from './assets/加強我的提示詞.png';
import imgMathExample from './assets/單元二範例題.png';
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
          fontSize: '133px',
          fontWeight: 800,
          color: colors.text,
          margin: '0 0 20px 0',
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: '40px', color: colors.muted, lineHeight: 1.4 }}>{desc}</p>
    </div>
  </div>
);

// 咒語複製專用頁面版型
const LayoutPrompt = ({
  eyebrow,
  title,
  promptText,
  note,
  unit = '單元二',
}: {
  eyebrow: string;
  title: string;
  promptText: string;
  note: string;
  unit?: string;
}) => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title={title} subtitle={eyebrow} unit={unit} />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: 40,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          background: '#ffffff',
          border: '3px dashed #cbd5e1',
          borderRadius: 'var(--osd-radius)',
          padding: '20px',
          boxShadow: '0 8px 24px rgba(100, 116, 139, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: 0,
        }}
      >
        <span
          style={{
            fontSize: '18px',
            fontWeight: 800,
            color: colors.accent,
            background: colors.accentMuted,
            padding: '4px 12px',
            borderRadius: '6px',
            alignSelf: 'flex-start',
            marginBottom: '12px',
          }}
        >
          💡 點擊下方文字框即可一鍵複製
        </span>
        <textarea
          readOnly
          value={promptText}
          onClick={(e) => {
            (e.target as HTMLTextAreaElement).select();
          }}
          style={{
            flex: 1,
            width: '100%',
            background: colors.bg,
            border: 'none',
            outline: 'none',
            fontFamily: 'monospace',
            fontSize: '40px',
            lineHeight: 1.4,
            color: colors.text,
            resize: 'none',
            borderRadius: '8px',
            padding: '16px',
            cursor: 'pointer',
          }}
        />
      </div>
      <Panel title="使用指引" delay={0.25}>
        <p style={{ margin: '0 0 16px 0', fontSize: '40px', lineHeight: 1.5 }}>{note}</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: colors.orangeLight,
            padding: '16px',
            borderRadius: '12px',
            marginTop: '24px',
          }}
        >
          <span style={{ color: colors.orange, fontSize: '32px' }}>★</span>
          <span style={{ fontSize: '32px', fontWeight: 700, color: colors.orange }}>
            點選左側文字框即可全選複製
          </span>
        </div>
      </Panel>
    </div>
    <TextbookFooter subtitle={eyebrow} />
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
      style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 40, flex: 1, zIndex: 2 }}
    >
      <Panel
        title="朱旆誼 米克師"
        delay={0.1}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fed7aa 0%, #fbbf24 100%)',
            border: '6px solid #f97316',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '80px',
            color: '#fff',
            marginBottom: '24px',
            boxShadow: '0 8px 32px rgba(249,115,22,0.25)',
          }}
        >
          👨‍🏫
        </div>
        <div style={{ fontSize: '42px', fontWeight: 900, color: colors.text, textAlign: 'center' }}>
          朱旆誼
        </div>
        <div
          style={{
            fontSize: '32px',
            color: colors.orange,
            fontWeight: 700,
            marginTop: '8px',
            textAlign: 'center',
          }}
        >
          米克師
        </div>
      </Panel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Panel title="學歷" delay={0.2}>
          <ul
            style={{
              paddingLeft: '20px',
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              fontSize: '34px',
              lineHeight: '1.5',
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
        </Panel>
        <Panel title="經歷" delay={0.35}>
          <ul
            style={{
              paddingLeft: '20px',
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              fontSize: '34px',
              lineHeight: '1.5',
            }}
          >
            <li>
              <strong>花蓮縣平和國中</strong> 資源班教師（兼巡迴支援）
            </li>
            <li>
              <strong>宜蘭縣凱旋國中</strong> 資源班教師
            </li>
          </ul>
        </Panel>
      </div>
    </div>
    <TextbookFooter subtitle="第一部分：入門心態與講師體驗" />
  </div>
);

// Slide 2b: 研習大綱
const Slide02b_Outline: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="今日研習大綱" subtitle="五個單元" unit="單元 1" />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        flex: 1,
        zIndex: 2,
        justifyContent: 'center',
      }}
    >
      {(
        [
          ['01', '單元一：入門心態建立', '特教老師的 AI 焦慮與突破心法'],
          ['02', '單元二：先快速簡化，再依障別精準調整', '從一鍵產生第一版到提示詞精準微調'],
          ['03', '單元三：網頁教材實戰三工具', '互動工具製作、圖片解法、網頁排版'],
          ['04', '單元四：自製工具管理', '一鍵自製資源傳送門，GitHub Pages 免費發佈'],
          ['05', '單元五：總結＋補充', 'AI 沒有溫度，無法接住哭泣的孩子'],
        ] as const
      ).map(([num, title, desc]) => (
        <div
          key={num}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            background: '#ffffff',
            border: '2px solid #e2e8f0',
            borderRadius: '14px',
            padding: '14px 20px',
            boxShadow: '0 2px 8px rgba(100,116,139,0.06)',
          }}
        >
          <div
            style={{
              minWidth: '72px',
              height: '72px',
              borderRadius: '12px',
              background: colors.orangeLight,
              border: `2px solid ${colors.orange}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 900,
              color: colors.orange,
              fontFamily: 'var(--osd-font-display)',
              letterSpacing: '0.05em',
            }}
          >
            PART {num}
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: colors.text, lineHeight: 1.3 }}>
              {title}
            </div>
            <div style={{ fontSize: '28px', color: colors.muted, marginTop: '4px' }}>{desc}</div>
          </div>
        </div>
      ))}
    </div>
    <TextbookFooter subtitle="第一部分：入門心態與講師體驗" />
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
    <TextbookFooter subtitle="第一部分：入門與米克師體驗" />
  </div>
);

// Slide 3: 大家今天最渴望深入的主題
const Slide03_Needs: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="前測問卷：學習主題排名" subtitle="需求調查" unit="單元 1" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, flex: 1, zIndex: 2 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Panel title="第一名 🏆" delay={0.1}>
          <strong style={{ color: colors.orange }}>針對不同障礙類別學生的客製化教材設計</strong>
          <div style={{ fontSize: '40px', color: colors.muted, marginTop: '8px' }}>
            如何為自閉、智能障礙、學習障礙學生設計教材。
          </div>
        </Panel>
        <Panel title="第二名 🥈" delay={0.25}>
          <strong>如何利用 AI 快速製作教材講義與學習單</strong>
          <div style={{ fontSize: '40px', color: colors.muted, marginTop: '8px' }}>
            加速紙本與數位學習單的生成與排版輸出。
          </div>
        </Panel>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Panel title="第三名 🥉" delay={0.15}>
          <strong>更精準的提示詞 (Prompt) 優化技巧</strong>
          <div style={{ fontSize: '40px', color: colors.muted, marginTop: '8px' }}>
            寫出符合特教邏輯的 Prompt，減少重試次數。
          </div>
        </Panel>
        <Panel title="第四名" delay={0.3}>
          <strong>AI 製作互動網頁與網頁發佈</strong>
          <div style={{ fontSize: '40px', color: colors.muted, marginTop: '8px' }}>
            利用程式碼無痛自製並發佈線上互動式教材。
          </div>
        </Panel>
      </div>
    </div>
    <TextbookFooter subtitle="第一部分：入門與米克師體驗" />
  </div>
);

// Slide 4: 破除 AI 落後焦慮
const Slide04_Anxiety: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="AI 這麼快，我跟不上怎麼辦？" subtitle="觀念翻轉" unit="單元 1" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}>
      <Panel title="核心定理" delay={0.1}>
        <div
          style={{
            fontSize: '38px',
            fontWeight: 900,
            color: colors.orange,
            lineHeight: 1.3,
            margin: '8px 0',
          }}
        >
          「工具會變，但教學工作流不會變」
        </div>
        <p style={{ margin: 0, fontSize: '36px', color: colors.muted, lineHeight: 1.5 }}>
          掌握核心的 Prompt 結構與特教邏輯，即使下週出了一個全新的 AI 模型，您也能一秒上手。
        </p>
      </Panel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Panel title="❌ 追逐工具 (落後焦慮)" delay={0.25}>
          不要當「工具的追逐者」，盲目學習各種新 AI 的按鈕與功能。
        </Panel>
        <Panel title="✅ 掌控流程 (核心工作流)" delay={0.4}>
          要當「教學工作流的設計者」，以固定備課流程來設計教材。
        </Panel>
      </div>
    </div>
    <TextbookFooter subtitle="第一部分：入門與米克師體驗" />
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
    <TextbookFooter subtitle="第一部分：入門與米克師體驗" />
  </div>
);

// Slide 6: 特教備課神助手：米克師初體驗
const Slide06_MixerIntro: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title={
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <span>米克師：專為特教設計的AI備課幫手</span>
          <a
            href="https://spedmix.pages.dev/"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '32px',
              fontWeight: 800,
              color: colors.orange,
              background: colors.orangeLight,
              padding: '6px 16px',
              borderRadius: '8px',
              letterSpacing: 0,
              lineHeight: 1.2,
              textDecoration: 'none',
            }}
          >
            🔗 spedmix.pages.dev
          </a>
        </span>
      }
      subtitle="米克師初體驗"
      unit="單元 1"
    />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        flex: 1,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          width: '100%',
          maxWidth: 1420,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          alignItems: 'center',
        }}
      >
        <img
          src={imgSpedmixHome}
          alt="米克師 AI 備課幫手首頁畫面"
          style={{
            width: '100%',
            aspectRatio: '1776 / 888',
            objectFit: 'contain',
            border: '2px solid #dbeafe',
            borderRadius: '16px',
            boxShadow: '0 22px 48px rgba(15, 23, 42, 0.16)',
            background: '#f8fafc',
          }}
        />
      </div>
    </div>
    <TextbookFooter subtitle="第一部分：入門與米克師體驗" />
  </div>
);

// Slide 7: 特教倫理：可以做與不可以做
const Slide07_Ethics: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="AI 使用倫理" subtitle="特教倫理" unit="單元 1" />
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
    <TextbookFooter subtitle="第一部分：入門與米克師體驗" />
  </div>
);

// Slide 8: Google 不訓練模型的兩種情境
const Slide08_GoogleNoTraining: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title="Google 不用來訓練模型的兩種情境"
      subtitle="使用前先確認帳號與工具"
      unit="單元 1"
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
    <TextbookFooter subtitle="第一部分：入門與米克師體驗" />
  </div>
);

// Slide 9: PART 2 過渡頁
const Slide08_Part2Header: Page = () => (
  <PartHeaderPage
    partNum="02"
    title="單元二：先快速簡化，再依障別精準調整"
    desc="從「一鍵產生第一版」到「把提示詞修到更懂學生」"
  />
);

// Slide 9: 紙本工具一：課文簡化系統 (使用步驟卡片展示)
const Slide09_PaperTool1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="方向一：課文簡化系統" subtitle="課文簡化" unit="單元 2" />
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}
    >
      <Panel title="1. 選擇程度貼上課文" delay={0.1}>
        選擇目標學生年級程度（學前至高中），貼上原始教材課文，或直接上傳圖片進行 OCR 辨識。
      </Panel>
      <Panel title="2. AI 自動進行多維改寫" delay={0.2}>
        一鍵生成符合程度的簡化課文與摘要，並為每段故事自動生成角色一致的 AI 配圖。
      </Panel>
      <Panel title="3. 自動出題與匯出" delay={0.3}>
        同步產出引導問題與多元讀後評量（選擇/填充題），支援一秒下載 Word 學習單。
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 10: 紙本工具二：數學差異化「數題數題」
const Slide10_PaperTool2: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="方向一：數題數題" subtitle="數題數題" unit="單元 2" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="同質變形題" delay={0.1}>
        <p style={{ margin: '0 0 16px 0', fontSize: '40px', lineHeight: 1.4 }}>
          輸入一題原始題目，系統能快速生出多個結構完全相同、僅數字不同的變形題。
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            alignItems: 'center',
            background: colors.bg,
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <span style={{ fontSize: '40px', fontWeight: 800, color: colors.text }}>
            原題：3x + 5 = 20
          </span>
          <span style={{ color: colors.accent }}>⬇️ 自動衍生 ⬇️</span>
          <span style={{ fontSize: '40px', color: colors.muted }}>
            7x + 2 = 23 | 4x + 9 = 37 | 6x + 1 = 19
          </span>
        </div>
      </Panel>
      <Panel title="特教教學應用" delay={0.25}>
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
            <strong>大量重複練習</strong>：滿足智能障礙或學習障礙學生所需的自動化運算練習。
          </li>
          <li>
            <strong>建立解題信心</strong>：藉由「完全同結構、僅數字不同」的題目，建立成功解題經驗。
          </li>
        </ul>
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 11: 紙本工具三：數學簡化學習單
const Slide11_PaperTool3: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="方向一：數學簡化學習單" subtitle="簡化學習單" unit="單元 2" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.8fr 1.2fr',
        gap: 40,
        flex: 1,
        zIndex: 2,
      }}
    >
      <Panel title="簡化學習單可調整面向" delay={0.1}>
        <p style={{ margin: '0 0 12px 0', fontSize: '40px', lineHeight: 1.4 }}>{''}</p>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '40px',
          }}
        >
          <li>
            <strong>降低文字量</strong>：把題意改成短句，減少不必要敘述。
          </li>
          <li>
            <strong>拆解解題步驟</strong>：把一題拆成「看題目、圈關鍵字、列算式、計算、檢查」。
          </li>
          <li>
            <strong>{''}</strong>
            {''}
          </li>
          <li>
            <strong>保留同一學習目標</strong>：題目變簡單，但不偏離概念。
          </li>
        </ul>
      </Panel>
      <Panel title="簡化與引導步驟對比" delay={0.25}>
        <img
          src={imgMathExample}
          alt="單元二數學範例題對比"
          style={{ width: '100%', height: 'auto', borderRadius: 8 }}
        />
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 11_Workshop1: 第一小節實作（大方向簡化工具實戰）
const Slide11_Workshop1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title="實作二-1：大方向簡化工具實作（20分鐘）"
      subtitle="實作挑戰"
      unit="單元 2 - 1"
    />
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}
    >
      <Panel title="1. 使用三種工具簡化" delay={0.1}>
        <p style={{ margin: 0, fontSize: '40px', lineHeight: 1.5 }}>
          分別使用
          <strong>
            {''}
            <br />
            「課文簡化系統」
            <br />
            「數題數題」
            <br />
            「數學簡化學習單」
            <br />
            {''}
          </strong>
          {''}
          <strong>{''}</strong>
          {''}
          <strong>{''}</strong>對選定的學科教材進行大方向調整與簡化。
        </p>
      </Panel>
      <Panel title="2. 產出簡化教材成果" delay={0.2}>
        <p style={{ margin: 0, fontSize: '40px', lineHeight: 1.5 }}>
          完成簡化課文配圖教材
          <br />
          或生成數字變形題/步驟化數學練習
        </p>
      </Panel>
      <Panel title="3. 完成並上傳成果" delay={0.3}>
        <p style={{ margin: 0, fontSize: '40px', lineHeight: 1.5 }}>
          完成後將簡化成果上傳至指定平台存檔。
        </p>
        <div
          style={{
            background: colors.orangeLight,
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '36px',
            fontWeight: 700,
            color: colors.orange,
            marginTop: '16px',
            border: `1px solid ${colors.orange}`,
          }}
        >
          上傳網址：
        </div>
      </Panel>
    </div>
    <TextbookFooter subtitle="單元二第一小節實作任務說明" />
  </div>
);

// Slide 12: 從工具到精準調整：為什麼還需要 Prompt？
const Slide12_WhyPrompt: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title="工具能做第一版，但學生差異要靠老師精修"
      subtitle="Prompt定位"
      unit="單元 2"
    />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="大方向工具的優點與限制" delay={0.1}>
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
            <strong>一鍵生成快速</strong>：適合快速完成教材的骨架與大方向初稿。
          </li>
          <li>
            <strong>難以貼合個別差異</strong>：同樣障別學生的識字與理解力差異極大。
          </li>
        </ul>
      </Panel>
      <Panel title="老師的專業任務" delay={0.25}>
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
            <strong>起點行為注入</strong>：將個別學生的真實弱點與學習目標放回提示詞。
          </li>
          <li>
            <strong>精細客製調校</strong>：只有老師的 Prompt，才能接住每個學生的特殊需求。
          </li>
        </ul>
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 13: 方向二：先把自己的粗咒語交給 AI 潤飾
const Slide13_AIRevise: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="提示詞偷吃步：先請 AI 加強" subtitle="Prompt潤飾" unit="單元 2" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.8fr 1.2fr',
        gap: 40,
        flex: 1,
        zIndex: 2,
      }}
    >
      <Panel title="老師只要記一個潤飾口訣" delay={0.1}>
        <div
          style={{
            background: colors.orangeLight,
            padding: '16px',
            borderRadius: '12px',
            fontSize: '79px',
            fontWeight: 700,
            color: colors.orange,
            marginBottom: 12,
          }}
        >
          加強我的咒語
        </div>
        <p style={{ margin: 0, fontSize: '40px', color: colors.muted, lineHeight: 1.4 }}>
          {''}
          {''}
          {''}
        </p>
      </Panel>
      <Panel title="提示詞加強與擴寫示意" delay={0.25}>
        <img
          src={imgPromptRevise}
          alt="加強我的提示詞示意圖"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: 8,
            border: `1px solid ${colors.border}`,
          }}
        />
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 14: 反覆修提示詞：先試生一版，再回頭微調 (使用步驟卡片展示)
const Slide14_PromptCycle: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="反覆修正出完美提示詞" subtitle="小步迭代" unit="單元 2" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: 16,
        flex: 1,
        zIndex: 2,
      }}
    >
      <Panel title="1. 生成教材" delay={0.1}>
        升級版提示詞貼到 AI 中生成第一版教材草稿。
      </Panel>
      <Panel title="2. 檢查評估" delay={0.2}>
        {'對比學生能力是否符合需求。\n'}
      </Panel>
      <Panel title="3. 反覆微調" delay={0.3}>
        回頭向 AI 對話修改，如「字數短一點」、「題目要更生活化」。
      </Panel>
      <Panel title="4. 保存提示詞" delay={0.4}>
        將滿意的 Prompt 儲存下來，做為同類型學生的常用備課模版，做成gem或GPT。
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 15: 好提示詞的兩種美觀輸出方式
const Slide15_OutputModes: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="常見痛點︰怎麼變成漂亮學習單？" subtitle="美觀輸出" unit="單元 2" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        flex: 1,
        zIndex: 2,
      }}
    >
      <Panel
        title="1. ChatGPT 生成圖像版學習單"
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
          }}
        >
          <img
            src={imgModeChatGPT}
            alt="ChatGPT 圖像版學習單"
            style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain', borderRadius: 8 }}
          />
        </div>
        <p style={{ margin: 0, fontSize: '40px', color: colors.muted, lineHeight: 1.4 }}>
          完美咒語貼到 ChatGPT。
          <br />
          按下「創立圖像」。
        </p>
      </Panel>
      <Panel
        title="2. Gemini Canvas 生成 HTML"
        delay={0.25}
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
          }}
        >
          <img
            src={imgModeGemini}
            alt="Gemini Canvas HTML 學習單"
            style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain', borderRadius: 8 }}
          />
        </div>
        <p style={{ margin: 0, fontSize: '40px', color: colors.muted, lineHeight: 1.4 }}>
          咒語貼到 Gemini按下 Canvas
          <br />
          補一句：
          <span style={{ fontStyle: 'italic', fontWeight: 700, color: colors.accent }}>
            「請用 HTML 畫一個仿 A4 的學習單，且列印出來要很美觀。」
          </span>
        </p>
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 16: 注音學習單：圖像版限制，HTML 版更穩定
const Slide16_ZhuyinFontChoice: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="常見痛點︰注音學習單如何製作？" subtitle="注音字體範例" unit="單元 2" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 40,
        flex: 1,
        zIndex: 2,
      }}
    >
      <Panel
        title="線上注音字體 範例"
        delay={0.1}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <img
          src={imgZhuyin1}
          alt="線上注音字體 範例"
          style={{
            width: '500px',
            height: '500px',
            objectFit: 'cover',
            borderRadius: 8,
            display: 'block',
            margin: '0 auto',
            objectPosition: '50% 50%',
            objectViewBox: 'inset(0% 30.66% 49.38% 0%)',
          }}
        />
      </Panel>
      <Panel
        title="Google 內建三種注音字型"
        delay={0.25}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <p style={{ margin: '0 0 24px 0', fontSize: '38px', lineHeight: 1.5 }}>{''}</p>
        <ul
          style={{
            paddingLeft: '28px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            fontSize: '38px',
            lineHeight: '1.6',
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
      </Panel>
    </div>
    <TextbookFooter
      subtitle="第二部分：紙本教材與破解"
      style={{ objectPosition: '50% 50%', objectViewBox: 'inset(0% 32.59% 49.44% 0%)' }}
    />
  </div>
);

// Slide 17: 解決對策：Markdown 表格強迫對齊法與 LaTeX 語法
const Slide17_MathFormat: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="常見痛點：為什麼數學式很醜？" subtitle="數學公式" unit="單元 2" />
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}
    >
      <Panel title="1. 壞掉的原始碼" delay={0.1}>
        <p style={{ margin: '0 0 16px 0', fontSize: '38px', lineHeight: 1.4 }}>
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
          }}
        >
          {'\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'}
        </div>
      </Panel>
      <Panel title="2. 完美渲染的樣子" delay={0.2}>
        <p style={{ margin: '0 0 24px 0', fontSize: '38px', lineHeight: 1.4 }}>
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
      </Panel>
      <Panel title="3. 魔法咒語" delay={0.3}>
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
        <p style={{ margin: 0, fontSize: '38px', lineHeight: 1.4, color: colors.muted }}>
          當 HTML 數學公式顯示異常時，直接傳送這句指令，AI 就會自動載入 <strong>KaTeX</strong>{' '}
          引擎，讓數學式瞬間變漂亮！
        </p>
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 18: 實作挑戰二（B）：美化提示詞與多元美觀輸出
const Slide18_Workshop2: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title={'實作二-2：強化提示詞與美觀輸出\n（20分鐘）'}
      subtitle="實作挑戰"
      unit="單元 2 - 2"
    />
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}
    >
      <Panel title="1. 強化提示詞" delay={0.1}>
        <p style={{ margin: 0, fontSize: '40px', lineHeight: 1.5 }}>
          使用「潤飾口訣」加強你的粗糙提示詞，讓 AI 幫你擴寫
        </p>
      </Panel>
      <Panel title="2. 美觀輸出二選一" delay={0.2}>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '38px', lineHeight: 1.4 }}>
          <li>
            <strong>ChatGPT 圖像版</strong>：貼入 ChatGPT 創立圖像，生成美觀學習單。
          </li>
          <li>
            <strong>Gemini HTML Canvas 版</strong>：貼入 Gemini Canvas 生成仿 A4 網頁學習單。
          </li>
        </ul>
      </Panel>
      <Panel title="3. GPT/Gem" delay={0.3}>
        <p style={{ margin: 0, fontSize: '40px', lineHeight: 1.5 }}>
          <strong>【進階任務】</strong>直接把調校好的提示詞製作成專屬的 <strong>GPTs</strong> 或{' '}
          <strong>Gems</strong>，方便未來一鍵使用！
        </p>
      </Panel>
    </div>
    <TextbookFooter subtitle="單元二第二小節實作任務說明" />
  </div>
);

// Slide 19: PART 3 過渡頁
const Slide19_Part3Header: Page = () => (
  <PartHeaderPage
    partNum="03"
    title={'單元三\n互動式網頁教材實戰'}
    desc="網頁互動工具體驗、直式注音學習單生成、以及網頁 Emoji 與圖床對策"
  />
);

// Slide 20: 網頁工具一：互動句型排列
const Slide20_WebTool1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="工具一：句型排列與語法重組" subtitle="互動工具" unit="單元 3" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 32,
        flex: 1,
        zIndex: 2,
      }}
    >
      <Panel title="核心理念：降低書寫負擔" delay={0.1}>
        <p style={{ margin: '0 0 12px 0', fontSize: '40px', lineHeight: 1.5 }}>
          透過拖放/點選卡片重組句子，降低手寫焦慮，讓認知資源留在「句子結構」與語法重組上。
        </p>
        <p style={{ margin: 0, fontSize: '38px', color: colors.accent, fontWeight: 700 }}>
          體驗說明：拖曳詞彙卡片進行造句，即時檢視文法是否正確，並支援語音朗讀輔助。
        </p>
      </Panel>
      <Panel
        title="工具畫面預覽"
        delay={0.25}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 350 }}
      >
        <div style={{ color: colors.muted, fontSize: '36px' }}>【畫面圖暫留空】</div>
      </Panel>
    </div>
    <TextbookFooter subtitle="第三部分：網頁教材實戰" />
  </div>
);

// Slide 21: 句型排列的教育核心：語感與聽覺訓練
const Slide21_WebTool1Core: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="語感與聽覺訓練：補足書寫與識字弱勢" subtitle="教育核心" unit="單元 3" />
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
    <TextbookFooter subtitle="第三部分：網頁教材實戰" />
  </div>
);

// Slide 22: 網頁工具二：AI 生圖測驗與雙重感官回饋
const Slide22_WebTool2: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="工具二：AI 生圖測驗與雙重感官回饋" subtitle="互動工具" unit="單元 3" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 32,
        flex: 1,
        zIndex: 2,
      }}
    >
      <Panel title="視覺與聽覺的雙重回饋" delay={0.1}>
        <p style={{ margin: '0 0 12px 0', fontSize: '40px', lineHeight: 1.5 }}>
          題目結合真實生活情境 AI 生圖，點選可發音聽讀，提供即時的語意與視覺雙重聯結。
        </p>
        <p style={{ margin: 0, fontSize: '38px', color: colors.accent, fontWeight: 700 }}>
          教學應用：成語具象化（看圖猜成語）、語文單字與真實生活情境的對應與泛化。
        </p>
      </Panel>
      <Panel
        title="工具畫面預覽"
        delay={0.25}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 350 }}
      >
        <div style={{ color: colors.muted, fontSize: '36px' }}>【畫面圖暫留空】</div>
      </Panel>
    </div>
    <TextbookFooter subtitle="第三部分：網頁教材實戰" />
  </div>
);

// Slide 23: 網頁測驗的細節：抗衝動設計與反饋機制
const Slide23_WebTool2Core: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="抗衝動設計與二次機會機制" subtitle="測驗設計" unit="單元 3" />
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
    <TextbookFooter subtitle="第三部分：網頁教材實戰" />
  </div>
);

// Slide 24: 國文差異化：通用性閱讀測驗 (使用 UDL 步驟卡片展示)
const Slide24_WebTool3: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="工具三︰通用性閱讀測驗" subtitle="互動工具" unit="單元 3" />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 32,
        flex: 1,
        zIndex: 2,
      }}
    >
      <Panel title="核心設計：通用學習設計 (UDL)" delay={0.1}>
        <ul
          style={{
            paddingLeft: '20px',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '36px',
            lineHeight: '1.5',
          }}
        >
          <li>
            <strong>逐段呈現</strong>
            ：每次只顯露一小段文章，避免整頁密密麻麻的文字，大幅降低閱讀視覺負荷。
          </li>
          <li>
            <strong>語音朗讀高亮</strong>
            ：點擊或懸停句子時自動語音朗讀並高亮句子，有效協助識字障礙學生。
          </li>
          <li>
            <strong>雙擊重點劃記</strong>
            ：允許學生雙擊句子直接在下方劃記重點線，增加閱讀的專注度與互動感。
          </li>
        </ul>
      </Panel>
      <Panel
        title="工具畫面預覽"
        delay={0.25}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 350 }}
      >
        <div style={{ color: colors.muted, fontSize: '36px' }}>【畫面圖暫留空】</div>
      </Panel>
    </div>
    <TextbookFooter subtitle="第三部分：網頁教材實戰" />
  </div>
);

// Slide 25: 痛點五：生成的網頁教材圖片全是表情符號 (Emoji)
const Slide25_EmojiPain: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title="為什麼 AI 生的網頁教材裡全是表情符號？"
      subtitle="痛點五"
      unit="單元 3"
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
    <TextbookFooter subtitle="第三部分：網頁教材實戰" />
  </div>
);

// Slide 26: 解決對策：指定 Unsplash API 動態載入照片
const Slide26_EmojiHow: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="解法一︰Unsplash API " subtitle="網頁配圖" unit="單元 3" />
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
    <TextbookFooter subtitle="第三部分：網頁教材實戰" />
  </div>
);

// Slide 26b: 解決對策：要求 AI 用 SVG 向量繪圖
const Slide26b_SvgDraw: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="解法二︰用 SVG 向量圖形繪圖" subtitle="網頁配圖" unit="單元 3" />
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
          「請幫我寫一個互動網頁教材。請在配圖部分
          <strong>完全使用簡單、質感的 SVG 程式碼繪製</strong>圖示（例如使用 &lt;svg&gt; 搭配
          &lt;path&gt; 畫一個書本或網球拍），<strong>嚴格禁止使用 Emoji 表情符號</strong>
          ，確保畫面乾淨專業。」
        </div>
      </Panel>
    </div>
    <TextbookFooter subtitle="第三部分：網頁教材實戰" />
  </div>
);

// Slide 27: 進階乾貨：自製 Google Drive 雲端圖床
const Slide27_DriveHost: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="解法三︰ 複製Google Drive 連結" subtitle="自製圖床" unit="單元 3" />
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
    <TextbookFooter subtitle="第三部分：網頁教材實戰" />
  </div>
);

// Slide 28: 懶人救星：AI 自動直連轉換咒語
const Slide28_DrivePrompt: Page = () => (
  <LayoutPrompt
    eyebrow="自製圖床"
    title="懶人咒語：不用手動改網址，讓 AI 來轉！"
    promptText={`請在 HTML 中嵌入這張圖片：[Google Drive 網址]。在寫代碼時，請幫我將其自動轉換為直連圖片網址格式（格式為：https://lh3.googleusercontent.com/d/【檔案 ID】）填入 <img> 的 src 中。`}
    note="在讓 AI 寫 HTML時，不需要自己手動改網址，把這個咒語直接貼給 AI，AI 就會自動提取 ID 並重組為直連網址！"
    unit="單元三"
  />
);

// Slide 29: 下午實作工作坊 II 任務說明 (使用步驟卡片展示)
const Slide29_Workshop2: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="實作挑戰二：自製 HTML 互動網頁教材" subtitle="工作坊 II" unit="單元 3" />
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}
    >
      <Panel title="1. 講人話即可" delay={0.1}>
        不需自己手動寫 code。直接用語音或中文指令，命令 AI 幫我們編寫教材網頁。
      </Panel>
      <Panel title="2. 完成互動小遊戲" delay={0.2}>
        目標生成一個包含「拼圖、單字配對、連連看或拖放卡片」的簡單 HTML 網頁。
      </Panel>
      <Panel title="3. 導入真實配圖" delay={0.3}>
        解決表情符號痛點，使用 Unsplash API 動態載入照片或套用雲端硬碟圖床。
      </Panel>
    </div>
    <TextbookFooter subtitle="下午實作工作坊 II 任務說明" />
  </div>
);

// Slide 30: 單元四過渡頁
const Slide30_Part4Header: Page = () => (
  <PartHeaderPage
    partNum="04"
    title="單元四：自製工具管理"
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
      unit="單元 4"
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
    <TextbookFooter subtitle="第四部分：發佈與共享篇" />
  </div>
);

// Slide 31b: 解決對策：GitHub Pages 免費部署
const Slide31b_GithubPages: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      title="如何透過 GitHub Pages 免費發佈網頁？"
      subtitle="免費部署"
      unit="單元 4"
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
    <TextbookFooter subtitle="第四部分：發佈與共享篇" />
  </div>
);

// Slide 33: 單元五過渡頁
const Slide33_Part5Header: Page = () => (
  <PartHeaderPage
    partNum="05"
    title="單元五：總結+補充"
    desc="我們不會被 AI 取代，AI 沒有溫度，無法接住哭泣的孩子"
  />
);

// Slide 34b: AI 進化路線：AI → Gem → Agent → Skill
const Slide34b_AIEvolution: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="AI 的進化路線" subtitle="工具層次" unit="單元 5" />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        flex: 1,
        zIndex: 2,
        justifyContent: 'center',
      }}
    >
      {(
        [
          [
            '🤖 一般 AI',
            colors.accent,
            '#eff6ff',
            '#bfdbfe',
            '加速「點狀」工作',
            '每次手動發問，加速單一任務。例：自己消化再產出的教材簡化步驟，現在 AI 幫你極速完成。',
          ],
          [
            '💎 Gem（定制化 AI）',
            '#7c3aed',
            '#f5f3ff',
            '#ddd6fe',
            '點狀任務一鍵化',
            '儲存您的角色設定與常用指令，不用每次重新輸入前置說明。單擊即可產生，也是「你想要做什麼，再去選工具」的選擇模式。',
          ],
          [
            '🤖➡️ AI Agent',
            '#059669',
            '#f0fdf4',
            '#a7f3d0',
            '將點串成鏈，自動完成流程',
            '自動依序執行多個任務。例：先簡化教材→生成網頁→产生語音報讀→自動存檔，不需手動介入。',
          ],
          [
            '✨ Skill（AI 職業技能包）',
            '#d97706',
            '#fffbeb',
            '#fde68a',
            '關鍵字觸發，AI 自主判斷',
            '關鍵字觸發後，AI 自行判斷要執行哪些任動。與 Gem 的差異：Gem 是「你選工具」，Skill 是「AI 看情況决定要做什麼」。',
          ],
        ] as const
      ).map(([label, color, bg, border, tag, desc]) => (
        <div
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            background: bg,
            border: `2px solid ${border}`,
            borderRadius: '14px',
            padding: '16px 24px',
          }}
        >
          <div
            style={{
              minWidth: '160px',
              fontWeight: 900,
              fontSize: '28px',
              color: color,
              fontFamily: 'var(--osd-font-display)',
            }}
          >
            {label}
          </div>
          <div
            style={{
              minWidth: '180px',
              background: 'rgba(255,255,255,0.7)',
              border: `1.5px solid ${border}`,
              borderRadius: '8px',
              padding: '6px 14px',
              fontSize: '24px',
              fontWeight: 700,
              color: color,
              whiteSpace: 'nowrap',
            }}
          >
            {tag}
          </div>
          <div style={{ fontSize: '30px', color: '#334155', lineHeight: 1.4, flex: 1 }}>{desc}</div>
        </div>
      ))}
    </div>
    <TextbookFooter subtitle="第五部分：優雅備課與總結" />
  </div>
);

// Slide 34: 研習總結
const Slide34_Summary: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="我們先是特教老師，才是 AI 掌控者" subtitle="研習總結" unit="單元 5" />
    <div
      style={{ display: 'grid', gridTemplateColumns: '1.12fr 0.88fr', gap: 40, flex: 1, zIndex: 2 }}
    >
      <Panel title="核心信念：AI 沒有溫度，無法接住哭泣的孩子" delay={0.1}>
        <div
          style={{
            fontSize: '42px',
            fontWeight: 900,
            color: colors.accent,
            lineHeight: 1.3,
            margin: '16px 0',
          }}
        >
          我們先是特教老師，
          <br />
          才是 AI 掌控者。
        </div>
        <p style={{ margin: 0, fontSize: '40px', color: colors.muted, lineHeight: 1.5 }}>
          「先學會使用 AI 的特教老師，會過得更優雅，有更多時間陪伴學生」。
        </p>
      </Panel>
      <Panel title="溫慢備課的心法" delay={0.25}>
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
            <strong>把繁瑣交給 AI</strong>：將機械性的打字、排版、生圖與代碼編寫交給 AI。
          </li>
          <li>
            <strong>把溫度留給學生</strong>：將省下的備課時間，留給引導、心靈交流與陪伴。
          </li>
        </ul>
      </Panel>
    </div>
    <TextbookFooter subtitle="第五部分：優雅備課與總結" />
  </div>
);

// Slide 35: Q&A 與交流時間
const Slide35_QA: Page = () => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center' }}>
    <TextbookBg />
    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        background: '#ffffff',
        border: '3px solid #e2e8f0',
        borderRadius: '24px',
        padding: '50px 70px',
        boxShadow: '0 12px 48px rgba(100, 116, 139, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1000px',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '66px',
          fontWeight: 900,
          color: colors.accent,
          margin: '0 0 16px 0',
          letterSpacing: '-0.02em',
        }}
      >
        Q & A
      </h1>
      <p style={{ fontSize: '40px', color: colors.text, fontWeight: 700, margin: '0 0 20px 0' }}>
        謝謝大家！讓我們一起優雅備課
      </p>
      <div
        style={{
          height: '3px',
          width: '120px',
          background: colors.orange,
          margin: '0 auto 24px auto',
          borderRadius: '2px',
        }}
      />
      <p style={{ fontSize: '40px', color: colors.muted, margin: 0, fontStyle: 'italic' }}>
        課後問卷回饋與資源下載連結
      </p>
    </div>
    <TextbookFooter subtitle="Q&A 與交流時間" />
  </div>
);

// 實作投影片定義
const Slide21_Practice1: Page = () => (
  <PartHeaderPage
    partNum="PRACTICE"
    title="實作時間︰10 分鐘"
    desc="請嘗試利用 AI 生成並微調「特教識字朗讀器」"
  />
);

const Slide23_Practice2: Page = () => (
  <PartHeaderPage
    partNum="PRACTICE"
    title="實作時間︰10 分鐘"
    desc="請嘗試利用 AI 生成並微調「圖卡配對測驗器」"
  />
);

const Slide24_Practice3: Page = () => (
  <PartHeaderPage
    partNum="PRACTICE"
    title="實作時間︰10 分鐘"
    desc="請嘗試利用 AI 生成並微調「情緒字卡閃卡」"
  />
);

const Slide31c_PracticeChallenge: Page = () => (
  <PartHeaderPage
    partNum="CHALLENGE"
    title="實作挑戰︰20 分鐘"
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
  Slide02b_Outline,
  Slide03_Needs,
  Slide04_Anxiety,
  Slide05_Mindset,
  Slide06_MixerIntro,
  Slide07_Ethics,
  Slide08_GoogleNoTraining,
  Slide08_Part2Header,
  Slide09_PaperTool1,
  Slide10_PaperTool2,
  Slide11_PaperTool3,
  Slide11_Workshop1,
  Slide12_WhyPrompt,
  Slide13_AIRevise,
  Slide14_PromptCycle,
  Slide15_OutputModes,
  Slide16_ZhuyinFontChoice,
  Slide17_MathFormat,
  Slide18_Workshop2,
  Slide19_Part3Header,
  Slide20_WebTool1,
  Slide21_WebTool1Core,
  Slide21_Practice1,
  Slide22_WebTool2,
  Slide23_WebTool2Core,
  Slide23_Practice2,
  Slide24_WebTool3,
  Slide24_Practice3,
  Slide25_EmojiPain,
  Slide26_EmojiHow,
  Slide26b_SvgDraw,
  Slide27_DriveHost,
  Slide28_DrivePrompt,
  Slide29_Workshop2,
  Slide30_Part4Header,
  Slide31_PortalPain,
  Slide31b_GithubPages,
  Slide31c_PracticeChallenge,
  Slide33_Part5Header,
  Slide34b_AIEvolution,
  Slide34_Summary,
  Slide35_QA,
] satisfies Page[];
