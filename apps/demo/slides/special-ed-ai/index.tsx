import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';
import React from 'react';
import headshot from './assets/headshot.png';
import imgPromptRevise from './assets/加強我的提示詞.png';
import imgMathExample from './assets/單元二範例題.png';
import imgModeChatGPT from './assets/方式一：ChatGPT 生成圖像版學習單.png';
import imgModeGemini from './assets/方式二：Gemini Canvas 生成 HTML 仿 A4 學習單.png';
import imgZhuyin1 from './assets/注音一.png';
import imgZhuyin2 from './assets/注音二.png';

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

const TextbookHeader = ({ title, subtitle, unit = '單元 1' }: { title: string; subtitle?: string; unit?: string }) => (
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
      style={{ fontFamily: 'var(--osd-font-display)', fontSize: '65px', fontWeight: 800, color: 'var(--osd-text)', margin: '8px 0 0 0', letterSpacing: '-0.02em', lineHeight: 1.2 }}
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
        <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: 'var(--osd-accent)' }} />
        <span style={{ fontWeight: 600 }}>{subtitle}</span>
      </div>
      <div style={{ fontFamily: 'monospace', letterSpacing: '0.08em', fontWeight: 600 }}>
        PAGE <span style={{ color: 'var(--osd-accent)', fontSize: 22 }}>{String(current).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
};

const Panel = ({ title, children, delay = 0, style }: { title?: string; children: ReactNode; delay?: number; style?: CSSProperties }) => (
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
      ...style
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
        <span style={{ color: '#ea580c' }}>◆</span> {title}
      </h3>
    )}
    <div style={{ fontSize: 40, lineHeight: 1.5, color: 'var(--osd-text)' }}>
      {children}
    </div>
  </div>
);

// 大章節過渡頁版型
const PartHeaderPage = ({ partNum, title, desc }: { partNum: string; title: string; desc: string }) => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center' }}>
    <TextbookBg />
    <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '1000px' }}>
      <div style={{ fontSize: '28px', fontFamily: 'var(--osd-font-display)', fontWeight: 900, color: colors.orange, background: colors.orangeLight, padding: '8px 24px', borderRadius: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '24px' }}>
        PART {partNum}
      </div>
      <h2 style={{ fontSize: '65px', fontWeight: 800, color: colors.text, margin: '0 0 20px 0', letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      <p style={{ fontSize: '40px', color: colors.muted, lineHeight: 1.4 }}>
        {desc}
      </p>
    </div>
  </div>
);

// 咒語複製專用頁面版型
const LayoutPrompt = ({ eyebrow, title, promptText, note, unit = "單元二" }: { eyebrow: string; title: string; promptText: string; note: string; unit?: string }) => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title={title} subtitle={eyebrow} unit={unit} />
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, flex: 1, zIndex: 2, minHeight: 0 }}>
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
          minHeight: 0
        }}
      >
        <span style={{ fontSize: '18px', fontWeight: 800, color: colors.accent, background: colors.accentMuted, padding: '4px 12px', borderRadius: '6px', alignSelf: 'flex-start', marginBottom: '12px' }}>
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
        <p style={{ margin: '0 0 16px 0', fontSize: '40px', lineHeight: 1.5 }}>
          {note}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: colors.orangeLight, padding: '16px', borderRadius: '12px', marginTop: '24px' }}>
          <span style={{ color: colors.orange, fontSize: '32px' }}>★</span>
          <span style={{ fontSize: '32px', fontWeight: 700, color: colors.orange }}>點選左側文字框即可全選複製</span>
        </div>
      </Panel>
    </div>
    <TextbookFooter subtitle={eyebrow} />
  </div>
);

// Agenda 卡片組件 (台日美感教科書風格)
const AgendaCard = ({ num, unit, title, children, delay = 0 }: { num: string; unit: string; title: string; children: ReactNode; delay?: number }) => (
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: '66px', fontWeight: 900, color: colors.accent, lineHeight: 1 }}>
        {num}
      </span>
      <span style={{ fontSize: '18px', fontWeight: 800, color: colors.orange, background: colors.orangeLight, padding: '3px 8px', borderRadius: '4px', marginTop: '6px', whiteSpace: 'nowrap' }}>
        {unit}
      </span>
    </div>
    <div style={{ width: '2px', alignSelf: 'stretch', background: '#e2e8f0' }} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <h4 style={{ fontSize: '32px', fontWeight: 900, color: colors.text, margin: 0 }}>
        {title}
      </h4>
      <p style={{ fontSize: '28px', color: colors.muted, margin: 0, lineHeight: 1.4 }}>
        {children}
      </p>
    </div>
  </div>
);

// ==========================================
// 3. 投影片頁面定義 (Slide 01 - 35)
// ==========================================

// Abstract Montessori blocks graphic representing special education custom material construction
const BlockGraphic = () => (
  <div style={{
    position: 'relative',
    width: '100%',
    height: '480px',
    background: '#f8fafc',
    border: '2px solid #cbd5e1',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.02)'
  }}>
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '20px 20px', opacity: 0.3 }} />
    <div style={{
      position: 'absolute',
      bottom: '50px',
      left: '50px',
      width: '160px',
      height: '80px',
      background: colors.accent,
      borderTopLeftRadius: '80px',
      borderTopRightRadius: '80px',
      opacity: 0.9,
      boxShadow: '0 8px 16px rgba(13, 148, 136, 0.15)'
    }} />
    <div style={{
      position: 'absolute',
      bottom: '150px',
      left: '90px',
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: colors.orange,
      opacity: 0.9,
      boxShadow: '0 8px 16px rgba(234, 88, 12, 0.15)'
    }} />
    <div style={{
      position: 'absolute',
      bottom: '50px',
      right: '50px',
      width: '80px',
      height: '200px',
      background: '#eab308',
      borderRadius: '40px 40px 0 0',
      opacity: 0.9,
      boxShadow: '0 8px 16px rgba(234, 179, 8, 0.15)'
    }} />
    <div style={{
      position: 'absolute',
      bottom: '270px',
      right: '60px',
      width: '0',
      height: '0',
      borderStyle: 'solid',
      borderWidth: '0 0 100px 100px',
      borderColor: 'transparent transparent #94a3b8 transparent',
      opacity: 0.8
    }} />
    <div style={{
      position: 'absolute',
      top: '50px',
      left: '60px',
      width: '140px',
      height: '4px',
      background: '#cbd5e1',
      borderRadius: '2px',
      transform: 'rotate(-12deg)'
    }} />
  </div>
);

// Slide 1: 標題頁
const Slide01_Title: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div
      className="es-fadeUp"
      style={{
        display: 'grid',
        gridTemplateColumns: '0.85fr 1.15fr',
        gap: 50,
        flex: 1,
        zIndex: 2,
        alignItems: 'center',
        background: '#ffffff',
        border: '3px solid #e2e8f0',
        borderRadius: '24px',
        padding: '50px 60px',
        boxShadow: '0 12px 48px rgba(100, 116, 139, 0.05)',
      }}
    >
      <BlockGraphic />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: '24px' }}>
          <span style={{ fontSize: '20px', letterSpacing: '0.15em', color: colors.accent, fontWeight: 800, background: colors.accentMuted, padding: '6px 16px', borderRadius: '6px', border: `1px solid ${colors.accent}` }}>
            🏫 嘉義輔導團
          </span>
          <span style={{ fontSize: '20px', letterSpacing: '0.15em', color: colors.orange, fontWeight: 800, background: colors.orangeLight, padding: '6px 16px', borderRadius: '6px', border: `1px solid ${colors.orange}` }}>
            🛠️ 進階實務工作坊
          </span>
        </div>
        <h1 style={{ fontSize: '62px', fontWeight: 900, lineHeight: 1.2, color: colors.text, margin: '0 0 20px 0', letterSpacing: '-0.02em' }}>
          生成式 AI <span style={{ color: colors.orange, fontWeight: 400 }}>×</span><br />
          特殊教育備課
        </h1>
        <div style={{ display: 'inline-block', background: colors.accentMuted, padding: '10px 18px', borderRadius: '8px', borderLeft: `6px solid ${colors.accent}`, marginBottom: '30px', alignSelf: 'flex-start' }}>
          <span style={{ fontSize: '30px', fontWeight: 800, color: colors.accent }}>
            🎯 從客製教材到互動實務
          </span>
        </div>
        <div style={{ width: '100%', height: '2px', background: '#f1f5f9', marginBottom: '24px' }} />
        <p style={{ margin: 0, fontSize: '26px', color: colors.muted, lineHeight: 1.4, fontWeight: 500 }}>
          📌 主軸：針對不同障礙類別的學生設計不同教材<br />
          📅 日期：115 年 7 月 7 日
        </p>
      </div>
    </div>
    <TextbookFooter subtitle="進階實務工作坊" />
  </div>
);

// Slide 2: 聽眾起點行為
const Slide02_Stats: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="今天來參加研習的我們是誰？" subtitle="聽眾起點行為" unit="單元 1" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 32, flex: 1, zIndex: 2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Panel title="Gemini 使用率" delay={0.1}>
          <div style={{ fontSize: '45px', fontWeight: 900, color: colors.accent }}>100% (10人)</div>
          全員皆有用過 Gemini！可以多用 Google 體系作為演示。
        </Panel>
        <Panel title="ChatGPT 使用率" delay={0.2}>
          <div style={{ fontSize: '45px', fontWeight: 900, color: colors.accent }}>80% (8人)</div>
          大多數老師並用 ChatGPT 且開始有老師將 Claude 融入教學中。
        </Panel>
        <Panel title="教材改寫經驗" delay={0.3}>
          <div style={{ fontSize: '45px', fontWeight: 900, color: colors.accent }}>100%</div>
          全員已用過 AI 改寫或簡化特教教材文本。
        </Panel>
        <Panel title="自我熟練度 (1-5)" delay={0.4}>
          <div style={{ fontSize: '45px', fontWeight: 900, color: colors.accent }}>平均 3.1 分</div>
          具備基本觀念，適合直奔進階實務與痛點突破！
        </Panel>
      </div>
      <Panel title="老師們的核心痛點" delay={0.5}>
        <p style={{ margin: '0 0 12px 0', fontSize: '40px', lineHeight: 1.4, fontStyle: 'italic', color: colors.orange }}>
          「會因為教材製作時間有限，ai功能不熟練，造成心理期待使用，但無法順利完成...」
        </p>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '40px', color: colors.text, lineHeight: 1.4 }}>
          今天工作坊的核心目的：帶大家直接練習實際課程的教材生成流程，把時間省下來！
        </p>
      </Panel>
    </div>
    <TextbookFooter subtitle="第一部分：入門與米克師體驗" />
  </div>
);

// Slide 3: 大家今天最渴望深入的主題
const Slide03_Needs: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="前測問卷：大家今天最想學什麼？" subtitle="需求調查" unit="單元 1" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, flex: 1, zIndex: 2 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Panel title="第一名 (10 票 / 滿票) 🏆" delay={0.1}>
          <strong style={{ color: colors.orange }}>針對不同障礙類別學生的客製化教材設計</strong>
          <div style={{ fontSize: '40px', color: colors.muted, marginTop: '8px' }}>如何為自閉、智能障礙、學習障礙學生設計教材。</div>
        </Panel>
        <Panel title="第二名 (9 票) 🥈" delay={0.25}>
          <strong>如何利用 AI 快速製作教材講義與學習單</strong>
          <div style={{ fontSize: '40px', color: colors.muted, marginTop: '8px' }}>加速紙本與數位學習單的生成與排版輸出。</div>
        </Panel>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Panel title="第三名 (8 票) 🥉" delay={0.15}>
          <strong>更精準的提示詞 (Prompt) 優化技巧</strong>
          <div style={{ fontSize: '40px', color: colors.muted, marginTop: '8px' }}>寫出符合特教邏輯的 Prompt，減少重試次數。</div>
        </Panel>
        <Panel title="第四名 (7 票)" delay={0.3}>
          <strong>AI 製作互動網頁與網頁發佈</strong>
          <div style={{ fontSize: '40px', color: colors.muted, marginTop: '8px' }}>利用程式碼無痛自製並發佈線上互動式教材。</div>
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
    <TextbookHeader title="AI 迭代這麼快，我跟不上怎麼辦？" subtitle="觀念翻轉" unit="單元 1" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="核心定理" delay={0.1}>
        <div style={{ fontSize: '42px', fontWeight: 900, color: colors.orange, lineHeight: 1.3, margin: '12px 0' }}>
          「工具會變，<br />但教學工作流（Workflow）不會變」
        </div>
        <p style={{ margin: 0, fontSize: '40px', color: colors.muted, lineHeight: 1.5 }}>
          掌握核心的 Prompt 結構與特教邏輯，即使下週出了一個全新的 AI 模型，您也能一秒上手。
        </p>
      </Panel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
    <TextbookHeader title="不要太貪心：與 AI 互動的健康心態" subtitle="合作心態" unit="單元 1" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, flex: 1, zIndex: 2 }}>
      <Panel title="不要求一次得到 100 分" delay={0.1}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>理解隨機性</strong>：AI 的輸出有起伏是正常的現象。</li>
          <li><strong>多次對話</strong>：經由 2-3 次對話微調，逼近完美教材。</li>
        </ul>
      </Panel>
      <Panel title="「70分實習老師」理論" delay={0.2}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>打字極快助理</strong>：讓 AI 幫忙生成 70 分的初稿。</li>
          <li><strong>專業教育把關</strong>：老師負責剩下的 30% 專業校對。</li>
        </ul>
      </Panel>
      <Panel title="小步迭代" delay={0.3}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>分批給予任務</strong>：每次只要求修改一段或增加支持。</li>
          <li><strong>防止指令混亂</strong>：避免一次性塞給 AI 超載的規則。</li>
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
    <TextbookHeader title="米克師：專為特教設計的備課小秘書" subtitle="米克師初體驗" unit="單元 1" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, flex: 1, zIndex: 2, alignItems: 'center' }}>
      <Panel title="對焦需求：我想要課程計畫與 IEP 目標小助手" delay={0.1}>
        <p style={{ margin: '0 0 12px 0', fontSize: '40px', lineHeight: 1.4 }}>
          問卷中很多老師提到希望能有自動對接特教課綱向度的工具。
        </p>
        <p style={{ margin: 0, fontSize: '40px', color: colors.accent, fontWeight: 700 }}>
          <strong>米克師 (https://spedmix.pages.dev/)</strong> 內建特教專屬工作流，一秒生成符合新課綱的學年與學期教學目標，打通備課關卡！
        </p>
      </Panel>
      <Panel title="現場體驗引導" delay={0.25}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '40px', fontWeight: 800, color: colors.orange, background: colors.orangeLight, padding: '6px 16px', borderRadius: '8px' }}>
            🔗 spedmix.pages.dev
          </span>
          <p style={{ margin: '10px 0 0 0', fontSize: '40px', color: colors.muted, lineHeight: 1.4 }}>
            請老師們用手機或平板直接打開此網址，我們來體驗如何一鍵產出個別化 IEP 目標！
          </p>
        </div>
      </Panel>
    </div>
    <TextbookFooter subtitle="第一部分：入門與米克師體驗" />
  </div>
);

// Slide 7: 特教倫理：學生的個資安全紅線
const Slide07_Ethics: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="把學生的起點行為餵給 AI，安全嗎？" subtitle="特教倫理" unit="單元 1" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="個資去識別化 SOP" delay={0.1}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '40px' }}>
          <li><strong>絕對不要輸入</strong>：學生真實姓名、身份證字號、具體學校與班級。</li>
          <li><strong>完全可以輸入</strong>：起點行為描述（如：「中度智能障礙，識字量 20 個，只能理解具體單詞」）。</li>
          <li>AI 只需要能力特質，不需要學生真實身份。</li>
        </ul>
      </Panel>
      <Panel title="共享與雲端硬碟權限" delay={0.25}>
        <p style={{ margin: '0 0 16px 0', fontSize: '40px', lineHeight: 1.4 }}>
          當我們將自製教材發佈給學生，或導入圖片時，Google Drive 共享設定：
        </p>
        <div style={{ background: colors.orangeLight, padding: '16px', borderRadius: '12px', fontSize: '40px', fontWeight: 800, color: colors.orange, textAlign: 'center' }}>
          限制為「檢視者」
        </div>
        <p style={{ margin: '12px 0 0 0', fontSize: '40px', color: colors.muted, fontStyle: 'italic' }}>
          * 絕對不要開啟「編輯者」，防止教材原始檔被學生意外修改或移除。
        </p>
      </Panel>
    </div>
    <TextbookFooter subtitle="第一部分：入門與米克師體驗" />
  </div>
);

// Slide 8: PART 2 過渡頁
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
    <TextbookHeader title="方向一：用課文簡化系統快速做出語文教材第一版" subtitle="課文簡化" unit="單元 2" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}>
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
    <TextbookHeader title="方向一：用「數題數題」快速生成同質練習" subtitle="數題數題" unit="單元 2" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="同質變形題" delay={0.1}>
        <p style={{ margin: '0 0 16px 0', fontSize: '40px', lineHeight: 1.4 }}>
          輸入一題原始題目（例如：`3x + 5 = 20`），系統能快速衍生出多個結構完全相同、僅數字不同的變形題（例如：`7x + 2 = 23`, `4x + 9 = 37`, `6x + 1 = 19`）。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', background: colors.bg, padding: '16px', borderRadius: '12px' }}>
          <span style={{ fontSize: '40px', fontWeight: 800, color: colors.text }}>原題：3x + 5 = 20</span>
          <span style={{ color: colors.accent }}>⬇️ 自動衍生 ⬇️</span>
          <span style={{ fontSize: '40px', color: colors.muted }}>7x + 2 = 23 | 4x + 9 = 37 | 6x + 1 = 19</span>
        </div>
      </Panel>
      <Panel title="特教教學應用" delay={0.25}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>大量重複練習</strong>：滿足智能障礙或學習障礙學生所需的自動化運算練習。</li>
          <li><strong>建立解題信心</strong>：藉由「完全同結構、僅數字不同」的題目，建立成功解題經驗。</li>
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
    <TextbookHeader title="方向一：數學簡化學習單，降低理解與書寫負荷" subtitle="簡化學習單" unit="單元 2" />
    <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 40, flex: 1, zIndex: 2, alignItems: 'center' }}>
      <Panel title="簡化學習單可調整面向" delay={0.1}>
        <p style={{ margin: '0 0 12px 0', fontSize: '40px', lineHeight: 1.4 }}>
          數學簡化不是把題目變幼稚，而是把看不見的思考步驟變成看得見的支持：
        </p>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '40px' }}>
          <li><strong>降低文字量</strong>：把題意改成短句，減少不必要敘述。</li>
          <li><strong>拆解解題步驟</strong>：把一題拆成「看題目、圈關鍵字、列算式、計算、檢查」。</li>
          <li><strong>增加視覺提示</strong>：用表格、框線、顏色、範例題協助對焦。</li>
          <li><strong>保留同一學習目標</strong>：題目變簡單，但不偏離概念。</li>
        </ul>
      </Panel>
      <Panel title="簡化與引導步驟對比" delay={0.25}>
        <img src={imgMathExample} alt="單元二數學範例題對比" style={{ width: '100%', height: 'auto', borderRadius: 8 }} />
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 12: 從工具到精準調整：為什麼還需要 Prompt？
const Slide12_WhyPrompt: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="工具能做第一版，但學生差異要靠老師精修" subtitle="Prompt定位" unit="單元 2" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="大方向工具的優點與限制" delay={0.1}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>一鍵生成快速</strong>：適合快速完成教材的骨架與大方向初稿。</li>
          <li><strong>難以貼合個別差異</strong>：同樣障別學生的識字與理解力差異極大。</li>
        </ul>
      </Panel>
      <Panel title="老師的專業任務" delay={0.25}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>起點行為注入</strong>：將個別學生的真實弱點與學習目標放回提示詞。</li>
          <li><strong>精細客製調校</strong>：只有老師的 Prompt，才能接住每個學生的特殊需求。</li>
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
    <TextbookHeader title="不用一開始就會寫完美咒語：先請 AI 加強你的提示詞" subtitle="Prompt潤飾" unit="單元 2" />
    <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 40, flex: 1, zIndex: 2, alignItems: 'center' }}>
      <Panel title="老師只要記一個潤飾口訣" delay={0.1}>
        <div style={{ background: colors.orangeLight, padding: '16px', borderRadius: '12px', fontSize: '40px', fontWeight: 700, color: colors.orange, marginBottom: 12 }}>
          「加強我的咒語：把教材調整成給國二自閉症的學生」
        </div>
        <p style={{ margin: 0, fontSize: '40px', color: colors.muted, lineHeight: 1.4 }}>
          亦可替換為：<br />
          - 「加強我的咒語：把這篇課文改為國小學障學生的閱讀學習單」<br />
          - 「加強我的咒語：把這份數學題目改成給智障學生的步驟化練習」
        </p>
      </Panel>
      <Panel title="提示詞加強與擴寫示意" delay={0.25}>
        <img src={imgPromptRevise} alt="加強我的提示詞示意圖" style={{ width: '100%', height: 'auto', borderRadius: 8, border: `1px solid ${colors.border}` }} />
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 14: 反覆修提示詞：先試生一版，再回頭微調 (使用步驟卡片展示)
const Slide14_PromptCycle: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="提示詞不是一次定生死，而是可以反覆修正的教材設計草稿" subtitle="小步迭代" unit="單元 2" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, flex: 1, zIndex: 2 }}>
      <Panel title="1. 生成教材" delay={0.1}>
        將擴寫後的 Prompt 貼到 AI (如 Gemini) 中生成第一版教材草稿。
      </Panel>
      <Panel title="2. 檢查評估" delay={0.2}>
        對比學生起點行為，檢查字數、詞彙、題型與視覺支持是否合適。
      </Panel>
      <Panel title="3. 反覆微調" delay={0.3}>
        回頭向 AI 對話修改，如「字數短一點」、「把填空改成選擇題」。
      </Panel>
      <Panel title="4. 保存 Prompt" delay={0.4}>
        將滿意的 Prompt 儲存下來，做為同類型學生的常用備課模版。
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 15: 好提示詞的兩種美觀輸出方式
const Slide15_OutputModes: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="得到好咒語之後，怎麼變成漂亮學習單？" subtitle="美觀輸出" unit="單元 2" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2, alignItems: 'center' }}>
      <Panel title="1. ChatGPT 生成圖像版學習單" delay={0.1} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 12 }}>
          <img src={imgModeChatGPT} alt="ChatGPT 圖像版學習單" style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain', borderRadius: 8 }} />
        </div>
        <p style={{ margin: 0, fontSize: '40px', color: colors.muted, lineHeight: 1.4 }}>
          將修好的咒語貼到 ChatGPT。按下「創立圖像」，請它直接生成視覺美觀的學習單圖像。適合用作教材封面、可展示版。
        </p>
      </Panel>
      <Panel title="2. Gemini Canvas 生成 HTML 仿 A4 學習單" delay={0.25} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 12 }}>
          <img src={imgModeGemini} alt="Gemini Canvas HTML 學習單" style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain', borderRadius: 8 }} />
        </div>
        <p style={{ margin: 0, fontSize: '40px', color: colors.muted, lineHeight: 1.4 }}>
          將修好的咒語貼到 Gemini。按下 Canvas，在提示詞最後補上一句：
          <span style={{ fontStyle: 'italic', fontWeight: 700, color: colors.accent }}>「請用 HTML 畫一個仿 A4 的學習單，且列印出來要很美觀。」</span>
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
    <TextbookHeader title="如果學習單需要注音，建議直接指定線上注音字體" subtitle="注音字體範例" unit="單元 2" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2, alignItems: 'center' }}>
      <Panel title="線上注音字體 範例一" delay={0.1} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <img src={imgZhuyin1} alt="線上注音字體 範例一" style={{ width: '500px', height: '500px', objectFit: 'cover', borderRadius: 8, display: 'block', margin: '0 auto' }} />
      </Panel>
      <Panel title="線上注音字體 範例二" delay={0.25} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <img src={imgZhuyin2} alt="線上注音字體 範例二" style={{ width: '500px', height: '500px', objectFit: 'cover', borderRadius: 8, display: 'block', margin: '0 auto' }} />
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 17: 解決對策：Markdown 表格強迫對齊法與 LaTeX 語法
const Slide17_MathFormat: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="讓 AI 幫你把數學版面變成可讀的學習支持" subtitle="數學解決對策" unit="單元 2" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}>
      <Panel title="1. 用 Markdown 表格強迫對齊直式" delay={0.1}>
        請 AI 將算式以表格輸出，位值各放一欄，底線用 `---` 繪製，即可保證對齊不歪斜。
      </Panel>
      <Panel title="2. 引導 AI 使用 LaTeX 語法" delay={0.2}>
        請 AI 使用標準 LaTeX 語法輸出（如：`\frac{1}{2}` 或 `\sqrt{2}`），讓分數呈現教科書級的優雅排版。
      </Panel>
      <Panel title="3. 在 Prompt 中指定版面規則" delay={0.3}>
        指定：「請將每一道題目拆成：題目、提示、列式區、計算區、答案區，並保留足夠空白。」或用米克師內建工具。
      </Panel>
    </div>
    <TextbookFooter subtitle="第二部分：紙本教材與破解" />
  </div>
);

// Slide 18: 上午實作工作坊 I 任務說明 (使用步驟卡片展示)
const Slide18_Workshop1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="實作挑戰一：先產第一版，再做障別精準調整" subtitle="工作坊 I" unit="單元 2" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}>
      <Panel title="1. 工具快速產出" delay={0.1}>
        使用「課文簡化系統」或「數學簡化系統」先做出一份可修改的教材草稿。
      </Panel>
      <Panel title="2. 白話語句調整提示詞" delay={0.2}>
        向 AI 發送「加強我的提示詞：...」，讓 AI 幫忙擴寫為特教起點行為 Prompt。
      </Panel>
      <Panel title="3. 定稿生成與對比" delay={0.3}>
        用擴寫 Prompt 重新生成，並對比前後版本，討論哪裡更符合個別化需求，並保存 Prompt。
      </Panel>
    </div>
    <TextbookFooter subtitle="上午實作工作坊 I 任務說明" />
  </div>
);

// Slide 19: PART 3 過渡頁
const Slide19_Part3Header: Page = () => (
  <PartHeaderPage
    partNum="03"
    title="單元三：視覺化與互動式網頁教材實戰"
    desc="網頁互動工具體驗、直式注音學習單生成、以及網頁 Emoji 與圖床對策"
  />
);

// Slide 20: 網頁工具一：互動句型排列
const Slide20_WebTool1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="工具一：句型排列與語法重組" subtitle="互動工具" unit="單元 3" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, flex: 1, zIndex: 2, alignItems: 'center' }}>
      <Panel title="核心理念：降低書寫負擔" delay={0.1}>
        <p style={{ margin: '0 0 12px 0', fontSize: '40px', lineHeight: 1.4 }}>
          透過拖放/點選卡片重組句子，降低手寫焦慮，讓認知資源留在「句子結構」與語法重組上。
        </p>
        <p style={{ margin: 0, fontSize: '40px', color: colors.accent, fontWeight: 700 }}>
          教學應用：國文造句練習、英語語文語法重組。
        </p>
      </Panel>
      <Panel title="掃碼體驗" delay={0.25}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '40px', fontWeight: 800, color: colors.orange, background: colors.orangeLight, padding: '6px 16px', borderRadius: '8px' }}>
            📱 右上角附體驗 QR Code
          </span>
          <p style={{ margin: '10px 0 0 0', fontSize: '40px', color: colors.muted, lineHeight: 1.4 }}>
            免手寫造句，點點看，體驗特教無障礙拖放學習單！
          </p>
        </div>
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
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>聽覺理解優越</strong>：特教學生往往聽覺理解能力優於識字與長文閱讀。</li>
          <li><strong>多重感官整合</strong>：以「語音朗讀」配合「視覺字卡」建立立體記憶。</li>
        </ul>
      </Panel>
      <Panel title="自然語感培養" delay={0.25}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>耳朵記憶節奏</strong>：透過重複聆聽與句子重組，自然熟悉句型結構。</li>
          <li><strong>降低焦慮感</strong>：無痛建立文法直覺，跳過枯燥的語法公式背誦。</li>
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
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, flex: 1, zIndex: 2, alignItems: 'center' }}>
      <Panel title="視覺與聽覺的雙重回饋" delay={0.1}>
        <p style={{ margin: '0 0 12px 0', fontSize: '40px', lineHeight: 1.4 }}>
          題目結合真實情境 AI 生圖，點選可發聲聽讀。
        </p>
        <p style={{ margin: 0, fontSize: '40px', color: colors.accent, fontWeight: 700 }}>
          教學應用：成語具象化（用圖片猜成語）、語文單字與真實情境對應。
        </p>
      </Panel>
      <Panel title="掃碼體驗" delay={0.25}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', textAlign: 'center' }}>
          <span style={{ fontSize: '40px', fontWeight: 800, color: colors.orange, background: colors.orangeLight, padding: '6px 16px', borderRadius: '8px' }}>
            📱 掃描 QR Code 進入體驗
          </span>
          <p style={{ margin: '10px 0 0 0', fontSize: '40px', color: colors.muted, lineHeight: 1.4 }}>
            看精美圖片，聽讀發音，秒選答案！
          </p>
        </div>
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
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>按鈕徹底分離</strong>：將「選取答案」與「送出檢測」按鈕徹底分開。</li>
          <li><strong>遏止直覺亂點</strong>：避免 ADHD 學生為趕快看分數而衝動猜題。</li>
        </ul>
      </Panel>
      <Panel title="二次機會（敗部復活）" delay={0.25}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>錯誤引導提示</strong>：答錯時不直接給答案，而是給予提示再次嘗試。</li>
          <li><strong>建立成功經驗</strong>：在第二次回答正確時，同樣給予正向增強。</li>
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
    <TextbookHeader title="國文差異化：通用性閱讀測驗" subtitle="互動工具" unit="單元 3" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}>
      <Panel title="1. 逐段呈現" delay={0.1}>
        每次只顯露一小段文章，避免整頁密密麻麻的文字，大幅降低閱讀時的視覺負荷。
      </Panel>
      <Panel title="2. 語音朗讀高亮" delay={0.2}>
        滑鼠滑過或點擊句子時會自動播放語音朗讀並高亮該句，協助識字障礙學生。
      </Panel>
      <Panel title="3. 雙擊重點劃記" delay={0.3}>
        允許學生雙擊句子直接在下方劃記重點線，增加閱讀的專注度與互動感。
      </Panel>
    </div>
    <TextbookFooter subtitle="第三部分：網頁教材實戰" />
  </div>
);

// Slide 25: 痛點五：生成的網頁教材圖片全是表情符號 (Emoji)
const Slide25_EmojiPain: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="為什麼 AI 幫我生的網頁教材裡全是表情符號？" subtitle="痛點五" unit="單元 3" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="原因分析" delay={0.1}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>避免失效破圖</strong>：AI 寫 HTML 時最喜歡用 Unicode Emoji 當成圖片。</li>
          <li><strong>版面過度幼稚</strong>：過多的表情符號會干擾與分散學生的注意力。</li>
        </ul>
      </Panel>
      <Panel title="特教的需求" delay={0.25}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>生活化真實照片</strong>：特教學生需要的是「具體生活照」，而非 Emoji。</li>
          <li><strong>概念泛化需求</strong>：Emoji 缺乏真實物理空間與深度，不利於認知泛化。</li>
        </ul>
      </Panel>
    </div>
    <TextbookFooter subtitle="第三部分：網頁教材實戰" />
  </div>
);

// Slide 26: 解決對策：指定 Unsplash API 動態載入照片、SVG向量繪圖
const Slide26_EmojiHow: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="Unsplash API & SVG 向量繪圖對策" subtitle="網頁配圖" unit="單元 3" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, flex: 1, zIndex: 2 }}>
      <Panel title="引導 AI 使用外部免版權圖庫 API" delay={0.1}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>動態載入真實照片</strong>：使用 Unsplash API 動態嵌入具體的生活照片。</li>
          <li><strong>自動處理英文關鍵字</strong>：讓 AI 自動將中文字詞轉換為合適的英文圖片標籤。</li>
        </ul>
      </Panel>
      <Panel title="替換為 SVG 向量圖" delay={0.25}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>無縫適應排版</strong>：要求 AI 用 CSS/SVG 繪製簡單、高質感的圖示與簡筆畫。</li>
          <li><strong>嚴格禁止 Emoji</strong>：在 Prompt 中加上限制，確保網頁教材呈現專業與乾淨。</li>
        </ul>
      </Panel>
    </div>
    <TextbookFooter subtitle="第三部分：網頁教材實戰" />
  </div>
);

// Slide 27: 進階乾貨：自製 Google Drive 雲端圖床
const Slide27_DriveHost: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="如何把 Google Drive 變成網頁圖片資料庫？" subtitle="自製圖床" unit="單元 3" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}>
      <Panel title="問題與原因" delay={0.1}>
        直接放 Drive 分享網址會破圖，因為它是「網頁檢視器」。
      </Panel>
      <Panel title="轉換公式" delay={0.2}>
        提取【檔案 ID】，重組為：
        <div style={{ color: colors.accent, fontWeight: 700, wordBreak: 'break-all', marginTop: '10px', fontSize: '42px' }}>
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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, flex: 1, zIndex: 2 }}>
      <Panel title="1. 白話命令 AI 寫程式" delay={0.1}>
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
    title="單元四：自製工具管理、發佈與團隊共享"
    desc="一鍵自製資源傳送門網頁，透過 GitHub Pages 免費發佈"
  />
);

// Slide 31: 痛點六：如何一鍵收集、整理並分享自己自製的 AI 工具與教材？
const Slide31_PortalPain: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="如何收集自己製作的 AI 到網頁中集中管理，或是分享給夥伴？" subtitle="數位發佈" unit="單元 4" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, flex: 1, zIndex: 2, alignItems: 'center' }}>
      <Panel title="核心痛點" delay={0.1}>
        做好的一堆學習單、Prompts 和 GPTs 連結，散落各處。
      </Panel>
      <Panel title="解法：一鍵自製傳送門網頁" delay={0.25}>
        <p style={{ margin: 0, fontSize: '40px', lineHeight: 1.5 }}>
          針對網址，貼給 AI 要求：「幫我做成一個數位學習網站，依照科目分類，並有搜尋與放大字型與深色模式」。
        </p>
      </Panel>
    </div>
    <TextbookFooter subtitle="第四部分：發佈與共享篇" />
  </div>
);

// Slide 32: 解決對策：自製傳送門網頁與 GitHub Pages 免費部署
const Slide32_PortalPrompt: Page = () => (
  <LayoutPrompt
    eyebrow="集中管理"
    title="解決對策：一秒部署為專屬數位教材首頁"
    promptText={`幫我把這些連結做成一個數位學習網站，依照科目分類，每一個連結都有對應的按鈕。請使用現代美觀的 CSS 玻璃磨砂卡片設計，並加入即時搜尋框、我的最愛（Favorites）星號釘選功能、深淺主題切換，以及特教友善的放大字型切換按鈕。以下是連結：...`}
    note="複製咒語貼給 AI。拿到的 HTML 貼入 GitHub 免費儲存庫中，開啟 Pages 功能即可一秒發佈成個人專屬的備課傳送門網頁！"
    unit="單元四"
  />
);

// Slide 33: 單元五過渡頁
const Slide33_Part5Header: Page = () => (
  <PartHeaderPage
    partNum="05"
    title="單元五：優雅備課心法與研習總結"
    desc="我們不會被 AI 取代，AI 沒有溫度，無法接住哭泣的孩子"
  />
);

// Slide 34: 研習總結
const Slide34_Summary: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="我們先是特教老師，才是 AI 掌控者" subtitle="研習總結" unit="單元 5" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.12fr 0.88fr', gap: 40, flex: 1, zIndex: 2 }}>
      <Panel title="核心信念：AI 沒有溫度，無法接住哭泣的孩子" delay={0.1}>
        <div style={{ fontSize: '42px', fontWeight: 900, color: colors.accent, lineHeight: 1.3, margin: '16px 0' }}>
          我們先是特教老師，<br />才是 AI 掌控者。
        </div>
        <p style={{ margin: 0, fontSize: '40px', color: colors.muted, lineHeight: 1.5 }}>
          「先學會使用 AI 的特教老師，會過得更優雅，有更多時間陪伴學生」。
        </p>
      </Panel>
      <Panel title="溫慢備課的心法" delay={0.25}>
        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '40px', lineHeight: '1.6' }}>
          <li><strong>把繁瑣交給 AI</strong>：將機械性的打字、排版、生圖與代碼編寫交給 AI。</li>
          <li><strong>把溫度留給學生</strong>：將省下的備課時間，留給引導、心靈交流與陪伴。</li>
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
      <h1 style={{ fontSize: '66px', fontWeight: 900, color: colors.accent, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
        Q & A
      </h1>
      <p style={{ fontSize: '40px', color: colors.text, fontWeight: 700, margin: '0 0 20px 0' }}>
        謝謝大家！讓我們一起優雅備課
      </p>
      <div style={{ height: '3px', width: '120px', background: colors.orange, margin: '0 auto 24px auto', borderRadius: '2px' }} />
      <p style={{ fontSize: '40px', color: colors.muted, margin: 0, fontStyle: 'italic' }}>
        課後問卷回饋與資源下載連結
      </p>
    </div>
    <TextbookFooter subtitle="Q&A 與交流時間" />
  </div>
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
  Slide02_Stats,
  Slide03_Needs,
  Slide04_Anxiety,
  Slide05_Mindset,
  Slide06_MixerIntro,
  Slide07_Ethics,
  Slide08_Part2Header,
  Slide09_PaperTool1,
  Slide10_PaperTool2,
  Slide11_PaperTool3,
  Slide12_WhyPrompt,
  Slide13_AIRevise,
  Slide14_PromptCycle,
  Slide15_OutputModes,
  Slide16_ZhuyinFontChoice,
  Slide17_MathFormat,
  Slide18_Workshop1,
  Slide19_Part3Header,
  Slide20_WebTool1,
  Slide21_WebTool1Core,
  Slide22_WebTool2,
  Slide23_WebTool2Core,
  Slide24_WebTool3,
  Slide25_EmojiPain,
  Slide26_EmojiHow,
  Slide27_DriveHost,
  Slide28_DrivePrompt,
  Slide29_Workshop2,
  Slide30_Part4Header,
  Slide31_PortalPain,
  Slide32_PortalPrompt,
  Slide33_Part5Header,
  Slide34_Summary,
  Slide35_QA
] satisfies Page[];
