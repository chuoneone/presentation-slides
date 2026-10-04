import imgHeadshot from '@assets/headshot.webp';
import imgMixerAiPrep from '@assets/mixer-ai-prep.webp';
import imgMixerShare from '@assets/mixer-share.webp';
import imgMixerTeaching from '@assets/mixer-teaching.webp';
import imgWorkshopSearchResult from '@assets/workshop-search-result.webp';
import { type DesignSystem, type Page, type SlideMeta, useSlidePageNumber } from '@open-slide/core';
import { type CSSProperties, type ReactNode, useCallback, useEffect, useState } from 'react';
import imgChineseMatch from './assets/chinese-match-quiz.webp';
import imgChineseQuiz from './assets/chinese-paragraph-quiz.webp';
import imgChineseReading from './assets/chinese-scaffold-reading.webp';
import imgChineseTable from './assets/chinese-structure-table.webp';
import imgChineseTianzi from './assets/chinese-tianzi-grid.webp';
import imgEbookConcept from './assets/ebook-concept-input.png';
import imgEbookDraft from './assets/ebook-draft-input.png';
import imgInteractiveStepMath from './assets/interactive-step-math.webp';
import imgMathCatalog from './assets/math-ebook-catalog.webp';
import imgMathConcept from './assets/math-ebook-concept.webp';
import imgMathInputGemini from './assets/math-input-gemini.webp';
import imgMathPrint from './assets/math-print-preview.webp';
import imgWorkshopHomepageNav from './assets/workshop-homepage-nav.png';
import imgTool1 from './assets/工具一.webp';

export const design: DesignSystem = {
  palette: { bg: '#f5efe6', text: '#1e1b18', accent: '#a66832' },
  fonts: {
    display:
      "'Playfair Display', 'Noto Serif TC', 'Source Han Serif TC', 'Songti TC', 'MingLiU', serif",
    body: "'Inter', 'Noto Sans TC', system-ui, -apple-system, sans-serif",
  },
  typeScale: { hero: 150, body: 36 },
  radius: 20,
};

const colors = {
  bg: '#f5efe6', // 暖燕麥拿鐵奶茶色
  bgGradient:
    'radial-gradient(at 0% 0%, rgba(197, 137, 85, 0.12) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(181, 141, 103, 0.10) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(196, 93, 71, 0.08) 0px, transparent 50%), #f5efe6',
  text: '#1e1b18', // 濃縮深焙黑咖啡暖字
  accent: '#a66832', // 焦糖琥珀暖棕（社群主色）
  accentMuted: '#f4eae0', // 燕麥奶白
  orange: '#c45d47', // 暖陶紅／珊瑚赤陶（點綴色）
  orangeLight: '#faebe6',
  kraft: '#b58d67', // 牛皮紙膠帶色
  kraftLight: '#f6f0ea',
  slate: '#242b35', // SPED Logo 極致深藍岩灰
  slateLight: '#e8edf2',
  blue: '#385a73', // 北歐謐藍
  blueLight: '#eaf0f5',
  border: 'rgba(226, 216, 204, 0.85)',
  muted: '#706459', // 溫暖可可灰
  white: '#ffffff',
  navy: '#1e1b18',
  glassBg: 'rgba(255, 255, 255, 0.94)',
  glassBorder: 'rgba(255, 255, 255, 0.98)',
  glassShadow: '0 18px 44px rgba(78, 64, 53, 0.10), 0 4px 14px rgba(181, 141, 103, 0.06)',
} as const;

const toolUrls = {
  iep: 'https://spedmix.pages.dev/IEP',
  iepStatus: 'https://spedmix.pages.dev/iep-status',
  iepCombined: 'https://spedmix.pages.dev/iep-combined',
  iepMeeting: 'https://spedmix.pages.dev/iep-meeting',
  lessonPlan: 'https://spedmix.pages.dev/lesson-plan',
  aiToolsOverview: 'https://spedmix.pages.dev/#detail/ai-tools',
  chineseLessonWorksheet: 'https://spedmix.pages.dev/chinese-lesson-worksheet',
  chineseLessonGemini: 'https://spedmix.pages.dev/chinese-lesson-worksheet',
  mathScaffold: 'https://spedmix.pages.dev/math-scaffold',
  mathScaffoldGemini: 'https://gemini.google.com/gem/1sw8yM0nrQC-kenKUSqeB-eqzcMyF_zQI?usp=sharing',
  englishWorksheet: 'https://spedmix.pages.dev/special-ed-english-worksheet',
  englishWorksheetGemini: 'https://share.gemini.google/ZFGGl35CNHVH',
  unscramble: 'https://spedmix.pages.dev/unscramble',
  interactiveMath: 'https://spedmix.pages.dev/interativemath',
} as const;

const uploadFileUrls = {
  language: 'https://forms.gle/wnMPK8xJXCwQ6VNh8',
  general: 'https://forms.gle/wUPvUAkE7PoFVdEFA',
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

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'var(--osd-font-body)',
  color: colors.text,
  background: colors.bgGradient,
  boxSizing: 'border-box',
  padding: '64px 108px 110px 108px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const keyframes = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@600;700;900&family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600;1,700&display=swap');

h1, h2, h3, [data-heading] {
  font-family: var(--osd-font-display), 'Playfair Display', 'Noto Serif TC', 'Source Han Serif TC', 'Songti TC', 'MingLiU', serif !important;
}
`;

const TextbookBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      border: '14px solid rgba(255, 255, 255, 0.85)',
      background: 'transparent',
      overflow: 'hidden',
      pointerEvents: 'none',
    }}
  >
    {/* 暖陽柔光發光球體 (呼應社群日照光影質感) */}
    <div
      style={{
        position: 'absolute',
        top: '-15%',
        right: '-8%',
        width: 680,
        height: 680,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(181, 141, 103, 0.20) 0%, rgba(197, 137, 85, 0.08) 50%, transparent 70%)',
        filter: 'blur(50px)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-8%',
        width: 720,
        height: 720,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(196, 93, 71, 0.12) 0%, rgba(181, 141, 103, 0.08) 50%, transparent 70%)',
        filter: 'blur(60px)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.35,
        backgroundImage: 'radial-gradient(rgba(140, 120, 105, 0.35) 1.2px, transparent 1.2px)',
        backgroundSize: '28px 28px',
      }}
    />
    <style>{keyframes}</style>
  </div>
);

const TextbookFooter = ({
  subtitle,
  inverse = false,
}: {
  subtitle?: string;
  inverse?: boolean;
}) => {
  const { current, total } = useSlidePageNumber();
  return (
    <footer
      style={{
        position: 'absolute',
        bottom: 20,
        left: 120,
        right: 120,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: inverse
          ? '1px solid rgba(255, 255, 255, 0.2)'
          : '1px solid rgba(203, 213, 225, 0.6)',
        paddingTop: 16,
        fontSize: '24px',
        color: inverse ? '#cbd5e1' : colors.muted,
        fontWeight: 700,
        zIndex: 10,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span
          style={{
            background: 'linear-gradient(90deg, #a66832, #c45d47)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 950,
          }}
        >
          特教教師的AI工作流
        </span>
        <span style={{ color: inverse ? 'rgba(255, 255, 255, 0.35)' : '#cbd5e1' }}>·</span>
        <span style={{ color: inverse ? '#cbd5e1' : colors.muted, fontWeight: 750 }}>
          {subtitle ?? '教學應用與自製工具實作'}
        </span>
      </div>
      <div
        style={{
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.08em',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontSize: '20px', color: inverse ? '#94a3b8' : '#94a3b8' }}>PAGE</span>
        <span
          style={{
            padding: '2px 10px',
            background: inverse ? 'rgba(255, 255, 255, 0.15)' : 'rgba(166, 104, 50, 0.12)',
            color: inverse ? '#c7d2fe' : colors.accent,
            borderRadius: 6,
            fontWeight: 950,
            fontSize: '26px',
          }}
        >
          {String(current).padStart(2, '0')}
        </span>
        <span style={{ color: inverse ? 'rgba(255, 255, 255, 0.35)' : '#cbd5e1' }}>/</span>
        <span style={{ color: inverse ? '#cbd5e1' : '#64748b' }}>
          {String(total).padStart(2, '0')}
        </span>
      </div>
    </footer>
  );
};

const TextbookHeader = ({
  unit,
  title,
  subtitle,
}: {
  unit: string;
  title: string;
  subtitle?: string;
}) => (
  <div style={{ zIndex: 2, marginBottom: 26 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <span
        style={{
          color: colors.accent,
          fontFamily: 'var(--osd-font-display)',
          fontWeight: 900,
          fontSize: '26px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          background: 'rgba(166, 104, 50, 0.1)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(166, 104, 50, 0.2)',
          padding: '6px 20px',
          borderRadius: 10,
          boxShadow: '0 2px 8px rgba(166, 104, 50, 0.08)',
          display: 'inline-block',
        }}
      >
        {unit}
      </span>
      {subtitle && (
        <span style={{ color: colors.muted, fontSize: '26px', fontWeight: 700 }}>{subtitle}</span>
      )}
    </div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: '80px',
        fontWeight: 900,
        margin: '8px 0 0 0',
        color: colors.text,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
      }}
    >
      {title}
    </h2>
  </div>
);

const PartHeaderPage = ({
  partNum,
  time,
  title,
  desc,
}: {
  partNum: string;
  time: string;
  title: string;
  desc: string;
}) => {
  const accents: Record<string, string> = {
    '1': '#d9822b', // 焦糖琥珀暖金 (PART 1)
    '2': '#c45d47', // 暖陶珊瑚赤紅 (PART 2)
    '3': '#4a90b8', // 北歐謐藍 (PART 3)
  };
  const accent = accents[partNum] ?? '#d9822b';

  return (
    <div
      style={{
        ...fill,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: colors.white,
        background: 'linear-gradient(135deg, #1c222b 0%, #242b35 52%, #2c3644 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.14) 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />

      {/* 暖色柔光球體 */}
      <div
        style={{
          position: 'absolute',
          width: 850,
          height: 850,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}55 0%, rgba(28, 34, 43, 0) 70%)`,
          filter: 'blur(50px)',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      />

      {/* 背景大數字水印 */}
      <div
        style={{
          position: 'absolute',
          fontSize: '340px',
          fontWeight: 950,
          color: colors.white,
          opacity: 0.06,
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--osd-font-display)',
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        0{partNum}
      </div>

      <div
        style={{
          zIndex: 2,
          maxWidth: 1560,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            fontSize: '28px',
            fontFamily: 'var(--osd-font-display)',
            fontWeight: 950,
            color: '#ffffff',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            border: `1.5px solid ${accent}99`,
            padding: '10px 32px',
            borderRadius: 999,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 32,
            boxShadow: `0 10px 28px ${accent}4d`,
          }}
        >
          <span>PART 0{partNum}</span>
          <span>·</span>
          <span>{time}</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '80px',
            fontWeight: 950,
            color: colors.white,
            margin: '0 0 28px 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            whiteSpace: 'pre-line',
          }}
        >
          {title}
        </h2>

        <p
          style={{
            fontSize: '40px',
            color: '#d2d9e0',
            lineHeight: 1.4,
            margin: '0 0 64px 0',
            fontWeight: 650,
            maxWidth: 1280,
          }}
        >
          {desc}
        </p>

        {/* 底部 3 階段導引節奏 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            padding: '18px 42px',
            background: 'rgba(28, 34, 43, 0.65)',
            backdropFilter: 'blur(20px)',
            borderRadius: 999,
            border: '1.5px solid rgba(255, 255, 255, 0.16)',
            boxShadow: '0 18px 44px rgba(2, 6, 23, 0.28)',
          }}
        >
          {[
            { num: 1, name: '行政與教材備課' },
            { num: 2, name: '自製互動教學網頁' },
            { num: 3, name: '自製 AI 工具實作' },
          ].map((item) => {
            const currentPart = Number.parseInt(partNum, 10);
            const isActive = item.num === currentPart;
            const isPassed = item.num < currentPart;
            return (
              <div
                key={item.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontWeight: isActive ? 950 : 700,
                  color: isActive ? '#ffffff' : isPassed ? '#f4eae0' : '#8c9aa8',
                  fontSize: '28px',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: isActive
                      ? `linear-gradient(135deg, ${accent} 0%, #ffffff 180%)`
                      : isPassed
                        ? 'linear-gradient(135deg, #a66832 0%, #8c5222 100%)'
                        : 'rgba(255, 255, 255, 0.18)',
                    color: isActive ? colors.navy : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: 950,
                    boxShadow: isActive ? `0 4px 16px ${accent}66` : 'none',
                  }}
                >
                  {isPassed ? '✓' : item.num}
                </div>
                <span>{item.name}</span>
                {item.num < 3 && (
                  <span style={{ color: 'rgba(255, 255, 255, 0.32)', marginLeft: 20 }}>➔</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <TextbookFooter subtitle={`PART 0${partNum}`} inverse />
    </div>
  );
};

// ==========================================
// 實作計時器 Persistent State & Audio Utility
// ==========================================

const TIMER_STORAGE_KEY = '__WORKSHOP_PRACTICE_TIMER__';
const TIMER_UPDATE_EVENT = 'workshop_timer_update';

function getStoredTimer(): {
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  endTimestamp: number | null;
  practiceNumber: string;
} {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(TIMER_STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.isRunning && parsed.endTimestamp) {
        const remaining = Math.max(0, Math.ceil((parsed.endTimestamp - Date.now()) / 1000));
        return {
          ...parsed,
          remainingSeconds: remaining,
          isRunning: parsed.isRunning,
        };
      }
      return parsed;
    }
  } catch (e) {}
  return {
    totalSeconds: 600,
    remainingSeconds: 600,
    isRunning: false,
    endTimestamp: null,
    practiceNumber: '實作 1',
  };
}

function saveStoredTimer(state: any) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(state));
      window.dispatchEvent(new Event(TIMER_UPDATE_EVENT));
    }
  } catch (e) {}
}

function formatTimerClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function playTimerChimeSound() {
  try {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      gain.gain.setValueAtTime(0.25, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 0.85);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.85);
    });
  } catch (e) {}
}

function useWorkshopTimer(initialMinutes: number = 10, defaultPracticeName: string = '實作 1') {
  const [state, setState] = useState(() => getStoredTimer());

  useEffect(() => {
    const onUpdate = () => {
      setState(getStoredTimer());
    };
    window.addEventListener(TIMER_UPDATE_EVENT, onUpdate);
    window.addEventListener('storage', onUpdate);

    const interval = setInterval(() => {
      const current = getStoredTimer();
      if (current.isRunning && current.endTimestamp) {
        const rem = Math.max(0, Math.ceil((current.endTimestamp - Date.now()) / 1000));
        if (rem <= 0) {
          playTimerChimeSound();
          const next = { ...current, isRunning: false, remainingSeconds: 0, endTimestamp: null };
          saveStoredTimer(next);
          setState(next);
        } else {
          setState({ ...current, remainingSeconds: rem });
        }
      }
    }, 250);

    return () => {
      window.removeEventListener(TIMER_UPDATE_EVENT, onUpdate);
      window.removeEventListener('storage', onUpdate);
      clearInterval(interval);
    };
  }, []);

  const start = useCallback(
    (practiceName?: string, minutes?: number) => {
      const current = getStoredTimer();
      const targetPractice = practiceName || defaultPracticeName;
      const samePractice = current.practiceNumber === targetPractice;
      const totalSec =
        (minutes || (current.totalSeconds > 0 ? current.totalSeconds / 60 : initialMinutes)) * 60;
      const remaining =
        samePractice && current.remainingSeconds > 0 ? current.remainingSeconds : totalSec;
      const end = Date.now() + remaining * 1000;
      const next = {
        totalSeconds: totalSec,
        remainingSeconds: remaining,
        isRunning: true,
        endTimestamp: end,
        practiceNumber: targetPractice,
      };
      saveStoredTimer(next);
      setState(next);
    },
    [initialMinutes, defaultPracticeName],
  );

  const pause = useCallback(() => {
    const current = getStoredTimer();
    const remaining = current.endTimestamp
      ? Math.max(0, Math.ceil((current.endTimestamp - Date.now()) / 1000))
      : current.remainingSeconds;
    const next = {
      ...current,
      isRunning: false,
      remainingSeconds: remaining,
      endTimestamp: null,
    };
    saveStoredTimer(next);
    setState(next);
  }, []);

  const reset = useCallback(
    (minutes?: number, practiceName?: string) => {
      const totalSec = (minutes || initialMinutes) * 60;
      const next = {
        totalSeconds: totalSec,
        remainingSeconds: totalSec,
        isRunning: false,
        endTimestamp: null,
        practiceNumber: practiceName || defaultPracticeName,
      };
      saveStoredTimer(next);
      setState(next);
    },
    [initialMinutes, defaultPracticeName],
  );

  const addSeconds = useCallback((sec: number) => {
    const current = getStoredTimer();
    const newRemaining = Math.max(10, current.remainingSeconds + sec);
    const newTotal = Math.max(newRemaining, current.totalSeconds);
    const next = {
      ...current,
      totalSeconds: newTotal,
      remainingSeconds: newRemaining,
      endTimestamp: current.isRunning ? Date.now() + newRemaining * 1000 : null,
    };
    saveStoredTimer(next);
    setState(next);
  }, []);

  return {
    state,
    start,
    pause,
    reset,
    addSeconds,
  };
}

const GlobalTimerFloatingBar = () => {
  const { state, start, pause, reset } = useWorkshopTimer();

  const isMidway = state.remainingSeconds > 0 && state.remainingSeconds < state.totalSeconds;
  if (!state.isRunning && !isMidway && state.remainingSeconds !== 0) {
    return null;
  }

  const isFinished = state.remainingSeconds === 0;

  return (
    <div
      style={{
        position: 'fixed',
        top: 22,
        right: 48,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 18px',
        borderRadius: 999,
        background: isFinished ? colors.orange : colors.navy,
        color: colors.white,
        boxShadow: '0 14px 34px rgba(0,0,0,0.32)',
        border: `2px solid ${isFinished ? colors.orangeLight : 'rgba(204, 251, 241, 0.65)'}`,
        fontFamily: 'monospace',
        backdropFilter: 'blur(8px)',
      }}
    >
      <span style={{ fontSize: 20 }}>⏱️</span>
      <span style={{ color: '#fed7aa', fontSize: 16, fontWeight: 950 }}>
        {state.practiceNumber || '實作'}
      </span>
      <span style={{ fontSize: 24, fontWeight: 950, letterSpacing: '0.06em' }}>
        {formatTimerClock(state.remainingSeconds)}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (state.isRunning) pause();
          else start(state.practiceNumber, Math.ceil(state.remainingSeconds / 60));
        }}
        style={{
          border: 'none',
          borderRadius: 999,
          padding: '4px 12px',
          background: state.isRunning ? '#fed7aa' : colors.orange,
          color: state.isRunning ? colors.navy : colors.white,
          fontWeight: 950,
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        {state.isRunning ? '⏸ 暫停' : '▶ 繼續'}
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          reset(10, state.practiceNumber);
        }}
        title="重設"
        style={{
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 999,
          padding: '4px 9px',
          background: 'rgba(255,255,255,0.1)',
          color: colors.white,
          fontWeight: 800,
          cursor: 'pointer',
          fontSize: 13,
        }}
      >
        ↺
      </button>
    </div>
  );
};

const WorkshopPracticeTimer = ({
  practiceNumber = '實作',
  initialMinutes = 10,
}: {
  practiceNumber?: string;
  initialMinutes?: number;
}) => {
  const { state, start, pause, reset, addSeconds } = useWorkshopTimer(
    initialMinutes,
    practiceNumber,
  );

  const isCurrentPractice = state.practiceNumber === practiceNumber;
  const displayRemaining = isCurrentPractice ? state.remainingSeconds : initialMinutes * 60;
  const isRunning = isCurrentPractice && state.isRunning;
  const isFinished = isCurrentPractice && state.remainingSeconds === 0;
  const total =
    isCurrentPractice && state.totalSeconds > 0 ? state.totalSeconds : initialMinutes * 60;

  const radius = 135;
  const circumference = 2 * Math.PI * radius; // ~848.23
  const progressRatio = total > 0 ? displayRemaining / total : 0;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 圓形置中大型計時器錶盤 (320px) */}
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 320,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'radial-gradient(circle, rgba(15, 23, 42, 0.97) 0%, rgba(30, 41, 59, 0.94) 100%)',
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.28), 0 0 48px rgba(196, 93, 71, 0.22)',
          border: '2.5px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <svg
          width="320"
          height="320"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        >
          <defs>
            <linearGradient id="circularTimerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d9822b" />
              <stop offset="100%" stopColor="#c45d47" />
            </linearGradient>
          </defs>
          {/* 灰色底軌 */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="15"
          />
          {/* 動態進度圓環 */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke={isFinished ? colors.orange : 'url(#circularTimerGrad)'}
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 0.4s linear',
            }}
          />
        </svg>

        {/* 圓形內部時間數字（超大 88 號字） */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.white,
            userSelect: 'none',
          }}
        >
          <div
            style={{
              fontFamily:
                '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace',
              fontSize: '88px',
              fontWeight: 950,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: isFinished ? colors.orange : isRunning ? '#fed7aa' : colors.white,
              textShadow: isRunning
                ? '0 0 36px rgba(254, 215, 170, 0.7)'
                : '0 4px 20px rgba(0, 0, 0, 0.4)',
              transition: 'color 0.3s ease',
            }}
          >
            {formatTimerClock(displayRemaining)}
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: '20px',
              fontWeight: 850,
              color: isRunning
                ? '#fed7aa'
                : isFinished
                  ? colors.orange
                  : 'rgba(255, 255, 255, 0.75)',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '5px 16px',
              borderRadius: 999,
              letterSpacing: '0.06em',
            }}
          >
            {isRunning ? '⏱️ 計時進行中' : isFinished ? '🔔 時間到！' : '⏸ 待命中'}
          </div>
        </div>
      </div>

      {/* 控制按鈕列 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginTop: 18,
        }}
      >
        <button
          type="button"
          onClick={() => addSeconds(-60)}
          title="減少 1 分鐘"
          style={{
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.90)',
            color: colors.navy,
            border: '1.5px solid rgba(255, 255, 255, 0.95)',
            borderRadius: 14,
            fontSize: '20px',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
          }}
        >
          -1 分
        </button>

        <button
          type="button"
          onClick={() => {
            if (isRunning) {
              pause();
            } else {
              start(practiceNumber, initialMinutes);
            }
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 38px',
            background: isRunning ? '#f4eae0' : 'linear-gradient(135deg, #d9822b 0%, #b56e29 100%)',
            color: isRunning ? colors.text : colors.white,
            border: 'none',
            borderRadius: 16,
            fontSize: '24px',
            fontWeight: 950,
            cursor: 'pointer',
            boxShadow: isRunning ? 'none' : '0 8px 24px rgba(181, 110, 41, 0.32)',
            transition: 'transform 0.15s ease, background 0.2s ease',
          }}
        >
          {isRunning ? '⏸ 暫停計時' : isFinished ? '↺ 重新計時' : '▶ 開始計時'}
        </button>

        <button
          type="button"
          onClick={() => reset(initialMinutes, practiceNumber)}
          title="重設計時"
          style={{
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.90)',
            color: colors.navy,
            border: '1.5px solid rgba(255, 255, 255, 0.95)',
            borderRadius: 14,
            fontSize: '20px',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
          }}
        >
          ↺ 重設
        </button>

        <button
          type="button"
          onClick={() => addSeconds(60)}
          title="增加 1 分鐘"
          style={{
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.90)',
            color: colors.navy,
            border: '1.5px solid rgba(255, 255, 255, 0.95)',
            borderRadius: 14,
            fontSize: '20px',
            fontWeight: 900,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
          }}
        >
          +1 分
        </button>
      </div>
    </div>
  );
};

// 統一實作時間組件（圓形置中計時器 + 下方任務說明與按鈕）
const PracticePage = ({
  num,
  toolName,
  time = '10 分鐘',
  desc,
  task,
  href,
  uploadHref,
  buttons,
}: {
  num: string;
  toolName: string;
  time?: string;
  desc?: string;
  task?: string;
  steps?: string[];
  href?: string;
  uploadHref?: string;
  buttons?: Array<{
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'dark';
  }>;
}) => {
  const minNum = Number.parseInt(time, 10) || 10;
  const practiceLabel = `實作 ${num}`;
  const taskText = task || desc || `請利用${toolName}，試做教材練習。`;

  const buttonItems: Array<{
    label: string;
    href: string;
    bg: string;
    shadow: string;
  }> = buttons
    ? buttons.map((b) => {
        if (b.variant === 'accent') {
          return {
            label: b.label,
            href: b.href,
            bg: 'linear-gradient(135deg, #c45d47 0%, #a66832 100%)',
            shadow: '0 12px 28px rgba(196, 93, 71, 0.32)',
          };
        }
        if (b.variant === 'dark') {
          return {
            label: b.label,
            href: b.href,
            bg: 'linear-gradient(135deg, #242b35 0%, #3a4758 100%)',
            shadow: '0 12px 28px rgba(36, 43, 53, 0.28)',
          };
        }
        return {
          label: b.label,
          href: b.href,
          bg: 'linear-gradient(135deg, #d9822b 0%, #a66832 100%)',
          shadow: '0 12px 28px rgba(166, 104, 50, 0.32)',
        };
      })
    : [
        ...(href
          ? [
              {
                label: '工具連結',
                href,
                bg: 'linear-gradient(135deg, #d9822b 0%, #a66832 100%)',
                shadow: '0 12px 28px rgba(166, 104, 50, 0.32)',
              },
            ]
          : []),
        ...(uploadHref
          ? [
              {
                label: '上傳檔案',
                href: uploadHref,
                bg: 'linear-gradient(135deg, #242b35 0%, #3a4758 100%)',
                shadow: '0 12px 28px rgba(36, 43, 53, 0.28)',
              },
            ]
          : []),
      ];

  return (
    <div
      style={{
        ...fill,
        padding: '44px 100px 92px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <TextbookBg />
      <GlobalTimerFloatingBar />

      {/* 頂部標題（80號大字）+ 實作標籤 */}
      <div style={{ zIndex: 2, marginBottom: 16 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 22px',
            borderRadius: 999,
            background: 'rgba(196, 93, 71, 0.12)',
            color: colors.orange,
            fontSize: '22px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}
        >
          <span>
            ⏱️ {practiceLabel} · 課堂實作 {time}
          </span>
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: '80px',
            fontWeight: 950,
            color: colors.text,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          {toolName}
        </h2>
      </div>

      {/* 圓形置中大型計時器 */}
      <div style={{ zIndex: 2 }}>
        <WorkshopPracticeTimer practiceNumber={practiceLabel} initialMinutes={minNum} />
      </div>

      {/* 下方：任務說明（40號字）+ 傳送門按鈕 */}
      <div
        className="es-fadeUp"
        style={{
          zIndex: 2,
          marginTop: 24,
          maxWidth: 1160,
          width: '100%',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(24px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.orange}`,
          borderRadius: 24,
          padding: '28px 48px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <div
          style={{
            fontSize: '38px',
            fontWeight: 850,
            color: colors.text,
            lineHeight: 1.45,
          }}
        >
          {taskText}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 18 }}>
          {buttonItems.map((btn, idx) => (
            <a
              key={idx}
              href={btn.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                background: btn.bg,
                color: colors.white,
                padding: '14px 44px',
                borderRadius: 18,
                fontSize: '30px',
                fontWeight: 950,
                textDecoration: 'none',
                boxShadow: btn.shadow,
                letterSpacing: '0.04em',
                transition: 'transform 0.15s ease',
              }}
            >
              <span>{btn.label}</span>
              <span style={{ fontSize: '26px' }}>➔</span>
            </a>
          ))}
        </div>
      </div>

      <TextbookFooter subtitle={`實作時間：${toolName}`} />
    </div>
  );
};

const ToolScreenshotFrame = ({
  label,
  children,
  delay = 0,
  style,
}: {
  label: string;
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) => (
  <div
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: 'rgba(255, 255, 255, 0.90)',
      backdropFilter: 'blur(20px)',
      border: '1.5px solid rgba(255, 255, 255, 0.95)',
      borderRadius: 24,
      boxShadow: '0 24px 60px rgba(148, 163, 184, 0.22), 0 4px 16px rgba(166, 104, 50, 0.08)',
      overflow: 'hidden',
      minHeight: 0,
      height: '100%',
      display: 'grid',
      gridTemplateRows: '56px 1fr',
      boxSizing: 'border-box',
      ...style,
    }}
  >
    <div
      style={{
        background: 'linear-gradient(90deg, #242b35 0%, #364150 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        fontSize: '22px',
        fontWeight: 900,
        letterSpacing: '0.02em',
        boxShadow: '0 2px 10px rgba(36, 43, 53, 0.25)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 7 }}>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.85)',
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.55)',
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.55)',
            }}
          />
        </div>
        <span>{label}</span>
      </div>
      <span
        style={{
          fontSize: '18px',
          fontWeight: 800,
          background: 'rgba(255, 255, 255, 0.22)',
          padding: '4px 14px',
          borderRadius: 12,
          letterSpacing: '0.02em',
        }}
      >
        介面預覽
      </span>
    </div>
    <div
      style={{
        padding: 16,
        background: 'rgba(248, 250, 252, 0.95)',
        minHeight: 0,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  </div>
);

// 米克師社群與網站專用組件
const WorkshopStepCard = ({
  num,
  title,
  children,
  delay = 0,
  accent = colors.accent,
}: {
  num: string;
  title: string;
  children: ReactNode;
  delay?: number;
  accent?: string;
}) => (
  <div
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      display: 'grid',
      gridTemplateColumns: '62px 1fr',
      gap: 18,
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.88)',
      backdropFilter: 'blur(16px)',
      border: `1.5px solid rgba(255, 255, 255, 0.92)`,
      borderLeft: `7px solid ${accent}`,
      borderRadius: 20,
      padding: '14px 24px',
      boxShadow: '0 12px 28px rgba(148, 163, 184, 0.12)',
      textAlign: 'left',
      height: '100%',
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        width: 58,
        height: 58,
        borderRadius: 16,
        background:
          accent === colors.accent ? 'rgba(166, 104, 50, 0.12)' : 'rgba(196, 93, 71, 0.12)',
        color: accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 30,
        fontWeight: 950,
        fontFamily: 'var(--osd-font-display)',
        boxShadow: 'inset 0 2px 6px rgba(255, 255, 255, 0.9)',
      }}
    >
      {num}
    </div>
    <div style={{ textAlign: 'left' }}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 34,
          lineHeight: 1.15,
          fontWeight: 950,
          color: colors.text,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 25, lineHeight: 1.35, fontWeight: 720, color: colors.muted }}>
        {children}
      </div>
    </div>
  </div>
);

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
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px)',
      border: '1.5px solid rgba(255, 255, 255, 0.9)',
      borderRadius: 24,
      padding: '28px 34px',
      color: colors.text,
      textDecoration: 'none',
      boxShadow: '0 20px 44px rgba(148, 163, 184, 0.16)',
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
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px)',
      border: `2px solid rgba(255, 255, 255, 0.9)`,
      borderTop: `6px solid ${accent}`,
      borderRadius: 22,
      padding: 0,
      minHeight: 0,
      color: colors.text,
      textDecoration: 'none',
      boxShadow: '0 22px 48px rgba(148, 163, 184, 0.16)',
      display: 'grid',
      gridTemplateRows: '320px 1fr',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        background: '#f8fafc',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 28 }}>
      <div
        style={{
          width: 'fit-content',
          background:
            accent === colors.accent ? 'rgba(166, 104, 50, 0.12)' : 'rgba(196, 93, 71, 0.12)',
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
          fontSize: '46px',
          lineHeight: 1.08,
          fontWeight: 950,
          color: colors.text,
        }}
      >
        {title}
      </h3>
      <div style={{ fontSize: '30px', lineHeight: 1.4, color: colors.muted, fontWeight: 680 }}>
        {children}
      </div>
      <div
        style={{
          color: accent,
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 10,
          padding: '14px 16px',
          marginTop: 'auto',
          fontSize: '20px',
          lineHeight: 1.18,
          fontWeight: 850,
          overflowWrap: 'anywhere',
          border: '1px solid rgba(226, 232, 240, 0.6)',
        }}
      >
        {href}
      </div>
    </div>
  </a>
);

// ==========================================
// 簡報各頁面組件
// ==========================================

// Slide 01: 封面 (大圖插畫風格：左側滿版大圖 + 右側大字標題與講者膠囊，精準對標參考圖比例)
// Slide 01: 封面 (社群風格：溫暖純白卡片 + 牛皮紙膠帶 + 居中大標題與講者品牌徽章)
const Slide01_Title: Page = () => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <TextbookBg />

    {/* 主卡片容器：呼應社群 Instagram 紙張質感 */}
    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        maxWidth: 1360,
        width: '92%',
        height: 640,
        background: '#ffffff',
        borderRadius: 36,
        padding: '52px 64px 44px 64px',
        boxShadow: '0 28px 68px rgba(78, 64, 53, 0.14), 0 4px 18px rgba(181, 141, 103, 0.08)',
        border: '1.5px solid rgba(255, 255, 255, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* 頂部牛皮紙膠帶 (Washi Tape 裝飾) */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          left: '50%',
          transform: 'translateX(-50%) rotate(-1.2deg)',
          width: 200,
          height: 42,
          background: 'linear-gradient(135deg, #c49a78 0%, #b58d67 100%)',
          borderRadius: 4,
          boxShadow: '0 4px 14px rgba(90, 70, 50, 0.22)',
          opacity: 0.95,
        }}
      />

      {/* 頂部小標籤 */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          fontSize: '28px',
          fontWeight: 950,
          color: colors.accent,
          background: 'rgba(166, 104, 50, 0.12)',
          border: '1.5px solid rgba(166, 104, 50, 0.25)',
          padding: '8px 32px',
          borderRadius: 999,
          letterSpacing: '0.12em',
          marginTop: 6,
        }}
      >
        <span>從使用 AI 到打造 AI</span>
      </div>

      {/* 中部核心標題與副標 */}
      <div
        style={{ margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '94px',
            fontWeight: 950,
            color: colors.text,
            margin: '0 0 16px 0',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
          }}
        >
          特教教師的教學工作流革命
        </h1>

        <p
          style={{
            fontSize: '40px',
            fontWeight: 800,
            color: colors.muted,
            margin: 0,
            letterSpacing: '0.04em',
            lineHeight: 1.3,
          }}
        >
          教學應用 ‧ 行政減量 ‧ 自製工具實作
        </p>
      </div>

      {/* 底部講者與社群品牌資訊列 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          width: '100%',
          flexWrap: 'wrap',
          marginBottom: 6,
        }}
      >
        {/* 講者膠囊 */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: colors.slate,
            color: '#ffffff',
            borderRadius: 999,
            padding: '14px 40px',
            fontSize: '32px',
            fontWeight: 950,
            letterSpacing: '0.06em',
            boxShadow: '0 10px 24px rgba(36, 43, 53, 0.28)',
          }}
        >
          <span>主講人 ‧ 朱旆誼</span>
        </div>

        {/* 社群帳號標籤 */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(181, 141, 103, 0.12)',
            color: colors.accent,
            border: '1.5px solid rgba(181, 141, 103, 0.3)',
            borderRadius: 999,
            padding: '14px 32px',
            fontSize: '28px',
            fontWeight: 900,
          }}
        >
          <span>@spedmix2025</span>
        </div>
      </div>
    </div>

    <TextbookFooter subtitle="研習封面" />
  </div>
);

// Slide 02: 講師介紹 (直接複製 special-ed-ai-optimized 第 2 頁)
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
        alignItems: 'center',
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
            fontSize: 54,
            fontWeight: 900,
            color: colors.text,
            margin: 0,
          }}
        >
          朱旆誼
        </h3>
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: '50%',
            overflow: 'hidden',
            border: `6px solid ${colors.accent}`,
            boxShadow: '0 12px 28px rgba(13, 148, 136, 0.22)',
            flexShrink: 0,
          }}
        >
          <img
            src={imgHeadshot}
            alt="講師照片"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <p
          style={{
            fontSize: 32,
            color: colors.muted,
            margin: 0,
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          {''}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto auto',
          gap: 20,
          minHeight: 0,
          alignContent: 'center',
        }}
      >
        <div
          className="es-fadeUp"
          style={{
            animationDelay: '0.2s',
            background: colors.white,
            border: '2px solid #e2e8f0',
            borderRadius: 24,
            padding: '22px 30px',
            boxShadow: '0 18px 42px rgba(15, 23, 42, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 0,
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 50,
              lineHeight: 1.1,
              fontWeight: 900,
              color: colors.accent,
              margin: '0 0 16px 0',
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
              gap: '12px',
              fontSize: '32px',
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
            padding: '22px 30px',
            boxShadow: '0 18px 42px rgba(15, 23, 42, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: 0,
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 50,
              lineHeight: 1.1,
              fontWeight: 900,
              color: colors.accent,
              margin: '0 0 16px 0',
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
              gap: '12px',
              fontSize: '32px',
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
    <TextbookFooter subtitle="講師介紹" />
  </div>
);

// Slide 03: 本日研習簡報 (直接複製 special-ed-ai-optimized 第 3 頁)
const Slide02a_WorkshopSlides: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="本日研習簡報" subtitle="開啟今日簡報" unit="單元 1" />
    <div
      style={{
        zIndex: 2,
        height: 480,
        maxHeight: 480,
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '0.88fr 1.12fr',
        gap: 28,
        alignItems: 'stretch',
        alignSelf: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
          gap: 14,
          height: '100%',
          minHeight: 0,
          boxSizing: 'border-box',
        }}
      >
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
          輸入 <strong style={{ color: colors.orange, fontSize: 30 }}>「花蓮特教」</strong>
          ，即可看到今日研習簡報。
        </WorkshopStepCard>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'minmax(0, 0.82fr) minmax(0, 1.18fr)',
          gap: 14,
          height: '100%',
          minHeight: 0,
          boxSizing: 'border-box',
        }}
      >
        <div
          className="es-fadeUp"
          style={{
            animationDelay: '0.15s',
            background: colors.white,
            border: '2px solid #dbe4ee',
            borderRadius: 20,
            padding: '12px 16px',
            boxShadow: '0 12px 28px rgba(148, 163, 184, 0.12)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            minHeight: 0,
            boxSizing: 'border-box',
          }}
        >
          <img
            src={imgWorkshopSearchResult}
            alt="搜尋米克師並點擊 AI 備課幫手"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              minHeight: 0,
            }}
          />
        </div>
        <div
          className="es-fadeUp"
          style={{
            background: colors.white,
            border: '2px solid #dbe4ee',
            borderRadius: 20,
            padding: '12px 14px',
            boxShadow: '0 12px 28px rgba(148, 163, 184, 0.12)',
            overflow: 'hidden',
            height: '100%',
            minHeight: 0,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={imgWorkshopHomepageNav}
            alt="米克師 AI 備課幫手首頁右上角研習簡報"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              borderRadius: 12,
              minHeight: 0,
            }}
          />
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="開啟今日簡報" />
  </div>
);

// Slide 04: 追蹤米克師社群 (直接複製 special-ed-ai-optimized 第 4 頁)
const Slide02c_Social: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="謝謝大家！歡迎追蹤看更多~" subtitle="社群入口" unit="單元 1" />
    <div
      className="m-grid"
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
    <TextbookFooter subtitle="社群連結" />
  </div>
);

// Slide 05: 米克師相關網站 (直接複製 special-ed-ai-optimized 第 5 頁)
const Slide06_MixerIntro: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="本人相關網站" subtitle="三個入口" unit="單元 1" />
    <div
      className="m-grid"
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
        screenshotAlt="步步練 網站畫面"
        title="步步練"
        delay={0.3}
      >
        提供學生端使用的學習活動與互動教材，讓自學與課堂練習更容易進入。
      </MixerSiteCard>
    </div>
    <TextbookFooter subtitle="米克師三大網站" />
  </div>
);

// Slide 03: 今日大綱 (亮色微光玻璃擬態、清爽大氣、三大核心實踐)
// Slide 03: 今日大綱 (簡約俐落社群風：無小插圖圖示，純淨01/02序號與清晰文字)
const Slide03_Agenda: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="今日大綱"
      title="特教教師的 AI 工作流"
      subtitle="三大核心實踐 ‧ 模組化流程"
    />

    {/* 三大精簡直立卡片 (純文字與乾淨序號，無任何多餘彩色小圖示) */}
    <div
      className="m-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
        zIndex: 2,
        flex: 1,
        alignItems: 'stretch',
        marginTop: 12,
        minHeight: 0,
        height: 540,
        maxHeight: 540,
      }}
    >
      {/* PART 01 卡片 */}
      <div
        className="es-fadeUp"
        style={{
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.98)',
          borderTop: `7px solid ${colors.accent}`,
          boxShadow: '0 20px 48px rgba(78, 64, 53, 0.10)',
          borderRadius: 28,
          padding: '36px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: '34px',
                fontWeight: 950,
                color: colors.accent,
                fontFamily: 'var(--osd-font-display)',
                letterSpacing: '0.04em',
              }}
            >
              PART 01
            </span>
            <span
              style={{
                background: 'rgba(166, 104, 50, 0.12)',
                color: colors.accent,
                borderRadius: 999,
                padding: '6px 18px',
                fontSize: '20px',
                fontWeight: 900,
              }}
            >
              14:30 - 15:20
            </span>
          </div>

          <h3
            style={{
              margin: '0 0 8px 0',
              fontSize: '40px',
              fontWeight: 950,
              color: colors.text,
              lineHeight: 1.2,
            }}
          >
            行政與教材備課
          </h3>
          <div style={{ fontSize: '24px', color: colors.muted, fontWeight: 750 }}>
            先求快速產出第一版
          </div>
        </div>

        {/* 兩大核心要點 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 216, 204, 0.85)',
              borderRadius: 18,
              padding: '18px 22px',
              boxShadow: '0 4px 14px rgba(78, 64, 53, 0.05)',
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: 'rgba(166, 104, 50, 0.12)',
                color: colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: colors.text }}>
              IEP 目標生成器
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 216, 204, 0.85)',
              borderRadius: 18,
              padding: '18px 22px',
              boxShadow: '0 4px 14px rgba(78, 64, 53, 0.05)',
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: 'rgba(196, 93, 71, 0.12)',
                color: colors.orange,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: colors.text }}>
              國數適性學習單
            </div>
          </div>
        </div>
      </div>

      {/* PART 02 卡片 */}
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.12s',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.98)',
          borderTop: `7px solid ${colors.orange}`,
          boxShadow: '0 20px 48px rgba(78, 64, 53, 0.10)',
          borderRadius: 28,
          padding: '36px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: '34px',
                fontWeight: 950,
                color: colors.orange,
                fontFamily: 'var(--osd-font-display)',
                letterSpacing: '0.04em',
              }}
            >
              PART 02
            </span>
            <span
              style={{
                background: 'rgba(196, 93, 71, 0.12)',
                color: colors.orange,
                borderRadius: 999,
                padding: '6px 18px',
                fontSize: '20px',
                fontWeight: 900,
              }}
            >
              15:20 - 16:20
            </span>
          </div>

          <h3
            style={{
              margin: '0 0 8px 0',
              fontSize: '40px',
              fontWeight: 950,
              color: colors.text,
              lineHeight: 1.2,
            }}
          >
            自製互動教學網頁
          </h3>
          <div style={{ fontSize: '24px', color: colors.muted, fontWeight: 750 }}>
            打造適性特教學習鷹架
          </div>
        </div>

        {/* 兩大核心要點 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 216, 204, 0.85)',
              borderRadius: 18,
              padding: '18px 22px',
              boxShadow: '0 4px 14px rgba(78, 64, 53, 0.05)',
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: 'rgba(166, 104, 50, 0.12)',
                color: colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: colors.text }}>
              句型排列與步驟數學
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 216, 204, 0.85)',
              borderRadius: 18,
              padding: '18px 22px',
              boxShadow: '0 4px 14px rgba(78, 64, 53, 0.05)',
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: 'rgba(196, 93, 71, 0.12)',
                color: colors.orange,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: colors.text }}>自製電子書</div>
          </div>
        </div>
      </div>

      {/* PART 03 卡片 */}
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.24s',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.98)',
          borderTop: `7px solid ${colors.slate}`,
          boxShadow: '0 20px 48px rgba(78, 64, 53, 0.10)',
          borderRadius: 28,
          padding: '36px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontSize: '34px',
                fontWeight: 950,
                color: colors.slate,
                fontFamily: 'var(--osd-font-display)',
                letterSpacing: '0.04em',
              }}
            >
              PART 03
            </span>
            <span
              style={{
                background: 'rgba(36, 43, 53, 0.10)',
                color: colors.slate,
                borderRadius: 999,
                padding: '6px 18px',
                fontSize: '20px',
                fontWeight: 900,
              }}
            >
              16:20 - 17:00
            </span>
          </div>

          <h3
            style={{
              margin: '0 0 8px 0',
              fontSize: '40px',
              fontWeight: 950,
              color: colors.text,
              lineHeight: 1.2,
            }}
          >
            自製 AI 工具實作(補充)
          </h3>
          <div style={{ fontSize: '24px', color: colors.muted, fontWeight: 750 }}>
            Canvas 打造專屬工具
          </div>
        </div>

        {/* 兩大核心要點 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 216, 204, 0.85)',
              borderRadius: 18,
              padding: '18px 22px',
              boxShadow: '0 4px 14px rgba(78, 64, 53, 0.05)',
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: 'rgba(166, 104, 50, 0.12)',
                color: colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: colors.text }}>
              Vibe Coding 咒語
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 216, 204, 0.85)',
              borderRadius: 18,
              padding: '18px 22px',
              boxShadow: '0 4px 14px rgba(78, 64, 53, 0.05)',
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: 'rgba(36, 43, 53, 0.12)',
                color: colors.slate,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, color: colors.text }}>
              Canvas 出題助手
            </div>
          </div>
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="今日研習大綱" />
  </div>
);

// Slide 07: PART 1 過渡頁
const Slide04_Part1Header: Page = () => (
  <PartHeaderPage
    partNum="1"
    time="14:30~15:20"
    title={'行政減量與教材備課\n實例分享'}
    desc="IEP 行政目標生成 ＋ 國數適性課堂學習單，AI 快速產出第一版，老師回歸個別化微調"
  />
);

// Slide 08: IEP 目標生成器 (雙卡片：問題與解方 - 一對一呼應版)
const Slide05_AdminIep: Page = () => {
  const problemPoints = [
    'IEP 極重要，但每學期耗費大量時間',
    '學生人數多，個別起點與標準各異',
    '現有 AI 仍需反覆複製貼上調表格',
    '各縣市各階段格式不同、難以通用',
  ];

  const solutionPoints = [
    '貼入現況一秒產出，大幅釋放時間',
    '內建適性標準，精準對應個別差異',
    '自動化整合排版，告別複製貼上工',
    '客製化專屬範本，完美吻合在地格式',
  ];

  return (
    <div style={fill}>
      <TextbookBg />
      <TextbookHeader
        unit="行政減量"
        title="IEP 目標撰寫：從痛點到自製解方"
        subtitle="問題與解方"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 36,
          flex: 1,
          zIndex: 2,
          minHeight: 0,
          height: 600,
          maxHeight: 600,
          alignItems: 'stretch',
        }}
      >
        {/* 左卡：問題 */}
        <div
          className="es-fadeUp"
          style={{
            height: '100%',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(254, 205, 211, 0.95)',
            borderTop: `8px solid ${colors.orange}`,
            borderRadius: 24,
            padding: '28px 32px',
            boxShadow: '0 20px 48px rgba(196, 93, 71, 0.10)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(196, 93, 71, 0.1)',
                border: '1.5px solid rgba(196, 93, 71, 0.25)',
                padding: '8px 24px',
                borderRadius: 20,
                fontSize: '26px',
                fontWeight: 950,
                color: '#c45d47',
                letterSpacing: '0.04em',
              }}
            >
              問題
            </div>
            <span style={{ fontSize: '22px', fontWeight: 800, color: colors.muted }}>
              教學現場痛點
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {problemPoints.map((pt, idx) => (
              <div
                key={idx}
                className="m-rise"
                style={{
                  animationDelay: `${idx * 80 + 100}ms`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  background: 'rgba(255, 255, 255, 0.98)',
                  border: '1.5px solid rgba(226, 232, 240, 0.9)',
                  borderLeft: `7px solid ${colors.orange}`,
                  borderRadius: 18,
                  padding: '18px 22px',
                  boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: 'rgba(196, 93, 71, 0.12)',
                    color: '#c45d47',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 950,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>
                <span
                  style={{
                    fontSize: '34px',
                    fontWeight: 950,
                    color: colors.text,
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {pt}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 右卡：解方 */}
        <div
          className="es-fadeUp"
          style={{
            animationDelay: '120ms',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(199, 210, 254, 0.95)',
            borderTop: '8px solid #4f46e5',
            borderRadius: 24,
            padding: '28px 32px',
            boxShadow: '0 20px 48px rgba(79, 70, 229, 0.10)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(166, 104, 50, 0.1)',
                border: '1.5px solid rgba(166, 104, 50, 0.25)',
                padding: '8px 24px',
                borderRadius: 20,
                fontSize: '26px',
                fontWeight: 950,
                color: '#4338ca',
                letterSpacing: '0.04em',
              }}
            >
              解方
            </div>
            <span style={{ fontSize: '22px', fontWeight: 800, color: colors.muted }}>
              自製工具思考
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {solutionPoints.map((pt, idx) => (
              <div
                key={idx}
                className="m-rise"
                style={{
                  animationDelay: `${idx * 80 + 200}ms`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  background: 'rgba(255, 255, 255, 0.98)',
                  border: '1.5px solid rgba(226, 232, 240, 0.9)',
                  borderLeft: '7px solid #4f46e5',
                  borderRadius: 18,
                  padding: '18px 22px',
                  boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: 'rgba(166, 104, 50, 0.12)',
                    color: '#4338ca',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 950,
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>
                <span
                  style={{
                    fontSize: '34px',
                    fontWeight: 950,
                    color: colors.text,
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {pt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TextbookFooter subtitle="第一部分：IEP 目標生成器（問題與解方）" />
    </div>
  );
};

// 更多 IEP 與行政減量工具 (第 7 頁後延伸：卡片展示，下方統一入口)
const Slide05b_OtherIepTools: Page = () => {
  const tools = [
    {
      num: '01',
      name: 'IEP 能力現況',
      accent: colors.accent,
    },
    {
      num: '02',
      name: 'IEP 完整報告',
      accent: colors.orange,
    },
    {
      num: '03',
      name: 'IEP 會議紀錄',
      accent: colors.slate,
    },
    {
      num: '04',
      name: '課程計畫',
      accent: '#385a73',
    },
  ];

  return (
    <div style={fill}>
      <TextbookBg />
      <TextbookHeader
        unit="行政減量"
        title="更多 IEP 與行政減量工具"
        subtitle="平台精選工具清單 · 請至下方統一入口體驗"
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          flex: 1,
          zIndex: 2,
          minHeight: 0,
          justifyContent: 'center',
        }}
      >
        {/* 四大工具 2x2 展示卡片 */}
        <div
          className="m-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 26,
            height: 440,
            minHeight: 0,
          }}
        >
          {tools.map(({ num, name, accent }, index) => (
            <div
              key={name}
              className="es-fadeUp"
              style={{
                animationDelay: `${index * 0.08}s`,
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(226, 232, 240, 0.9)',
                borderLeft: `12px solid ${accent}`,
                borderRadius: 24,
                padding: '28px 40px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 16px 36px rgba(148, 163, 184, 0.14)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* 背景水印數字 */}
              <span
                style={{
                  position: 'absolute',
                  right: 32,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '130px',
                  fontWeight: 950,
                  fontFamily: 'var(--osd-font-display)',
                  color: accent,
                  opacity: 0.08,
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}
              >
                {num}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 24, zIndex: 1 }}>
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 18,
                    background: `${accent}18`,
                    color: accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: 950,
                    fontFamily: 'var(--osd-font-display)',
                    flexShrink: 0,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--osd-font-display)',
                    fontSize: '48px',
                    fontWeight: 950,
                    color: colors.text,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部平台整體工具區統一入口 */}
        <a
          href={toolUrls.aiToolsOverview}
          target="_blank"
          rel="noreferrer"
          className="es-fadeUp"
          style={{
            animationDelay: '0.35s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            padding: '18px 36px',
            background:
              'linear-gradient(135deg, rgba(36, 43, 53, 0.06) 0%, rgba(166, 104, 50, 0.1) 100%)',
            border: '2px dashed rgba(166, 104, 50, 0.45)',
            borderRadius: 18,
            textDecoration: 'none',
            color: colors.accent,
            fontSize: '26px',
            fontWeight: 900,
            boxShadow: '0 6px 20px rgba(78, 64, 53, 0.06)',
            transition: 'background 0.2s ease, transform 0.2s ease',
          }}
        >
          <span>👉 更多特教行政與 AI 工具，歡迎前往 spedmix 平台專區自行摸索：</span>
          <span style={{ textDecoration: 'underline', color: colors.orange, fontWeight: 950 }}>
            https://spedmix.pages.dev/#detail/ai-tools
          </span>
          <span style={{ fontSize: '24px' }}>↗</span>
        </a>
      </div>

      <TextbookFooter subtitle="更多 IEP 與行政減量工具" />
    </div>
  );
};

// Slide 09: 實作一︰IEP 目標生成器 (5分鐘實作)
const Slide06_Practice_IEP: Page = () => (
  <PracticePage
    num="01"
    toolName="IEP 目標生成器"
    time="5 分鐘"
    task="請利用 IEP 目標生成器，輸入學生現況與特教需求，試做 1 份個別化教育計畫目標。"
    href={toolUrls.iep}
  />
);

// 國文課堂學習單: 工具主題封面扉頁 (大標 + 現場痛點訊息框)
const Slide08_ChineseLessonTitle: Page = () => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <TextbookBg />

    <div
      style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(166, 104, 50, 0.15) 0%, rgba(196, 93, 71, 0.06) 50%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }}
    />

    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        maxWidth: 1440,
        width: '94%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(255, 255, 255, 0.95)',
        borderTop: `8px solid ${colors.accent}`,
        borderRadius: 36,
        padding: '44px 52px',
        boxShadow: '0 24px 60px rgba(148, 163, 184, 0.18)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          fontSize: '28px',
          fontWeight: 950,
          color: colors.accent,
          background: 'rgba(166, 104, 50, 0.1)',
          padding: '8px 30px',
          borderRadius: 999,
          letterSpacing: '0.12em',
          marginBottom: 14,
          border: '1px solid rgba(166, 104, 50, 0.2)',
        }}
      >
        <span>語文備課</span>
      </div>

      <h1
        style={{
          fontSize: '92px',
          fontWeight: 950,
          color: colors.text,
          margin: '0 0 28px 0',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
        }}
      >
        國文課堂學習單
      </h1>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 28,
            width: '100%',
            marginTop: 6,
          }}
        >
          {/* 老師心聲 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #fff5f2 0%, #faebe6 100%)',
              border: '2px solid rgba(196, 93, 71, 0.35)',
              borderRadius: '28px 28px 28px 6px',
              padding: '32px 36px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
              boxShadow: '0 14px 32px rgba(196, 93, 71, 0.10)',
              transform: 'rotate(-1.2deg)',
              transition: 'transform 0.2s ease',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '24px',
                  fontWeight: 950,
                  color: '#c45d47',
                  background: 'rgba(196, 93, 71, 0.12)',
                  padding: '6px 18px',
                  borderRadius: 999,
                }}
              >
                👩‍🏫 老師心聲
              </div>
              <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 750 }}>
                💬 備課日常
              </span>
            </div>
            <div
              style={{
                fontSize: '38px',
                fontWeight: 900,
                color: colors.text,
                lineHeight: 1.42,
                letterSpacing: '-0.01em',
              }}
            >
              「每課找圖配圖超花時間，還要手動排版修改各種版本…」
            </div>
          </div>

          {/* 學生心聲 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #faf7f2 0%, #f4ece2 100%)',
              border: '2px solid rgba(166, 104, 50, 0.35)',
              borderRadius: '28px 28px 6px 28px',
              padding: '32px 36px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
              boxShadow: '0 14px 32px rgba(166, 104, 50, 0.10)',
              transform: 'rotate(1.2deg)',
              transition: 'transform 0.2s ease',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '24px',
                  fontWeight: 950,
                  color: '#a66832',
                  background: 'rgba(166, 104, 50, 0.12)',
                  padding: '6px 18px',
                  borderRadius: 999,
                }}
              >
                👦 學生心聲
              </div>
              <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 750 }}>
                💬 學習困擾
              </span>
            </div>
            <div
              style={{
                fontSize: '38px',
                fontWeight: 900,
                color: colors.text,
                lineHeight: 1.42,
                letterSpacing: '-0.01em',
              }}
            >
              「文章太長看不太懂，密密麻麻的字好想睡覺…」
            </div>
          </div>
        </div>
      </div>
    </div>

    <TextbookFooter subtitle="單元導覽 · 現場需求引導" />
  </div>
);

// 國文課堂學習單 1: 課文雙軌對照與唸讀計時 (功能介紹)
const Slide08_ChineseLessonWorksheet1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: colors.accent,
            background: 'rgba(166, 104, 50, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(166, 104, 50, 0.2)',
            padding: '8px 22px',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(166, 104, 50, 0.08)',
          }}
        >
          語文備課
        </span>
        <span style={{ color: colors.muted, fontSize: '28px', fontWeight: 750 }}>雙軌閱讀</span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '84px',
          fontWeight: 950,
          margin: '8px 0 0 0',
          color: colors.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        課文雙軌對照
      </h2>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 36,
        alignItems: 'stretch',
        height: 600,
        marginTop: 16,
      }}
    >
      {/* 左欄卡片 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.accent}`,
          borderRadius: 28,
          padding: '30px 34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(166, 104, 50, 0.1)',
              border: '1px solid rgba(166, 104, 50, 0.25)',
              padding: '8px 20px',
              borderRadius: 20,
              fontSize: '24px',
              fontWeight: 950,
              color: colors.accent,
              letterSpacing: '0.02em',
            }}
          >
            <span>✨ 特教鷹架核心亮點</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(196, 93, 71, 0.08)',
              color: colors.orange,
              border: '1px solid rgba(196, 93, 71, 0.2)',
              padding: '8px 18px',
              borderRadius: 14,
              fontSize: '24px',
              fontWeight: 900,
            }}
          >
            雙軌閱讀
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 'auto 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(166, 104, 50, 0.12)',
                border: '1.5px solid rgba(166, 104, 50, 0.25)',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              原文與易讀雙軌排版
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(196, 93, 71, 0.12)',
                border: '1.5px solid rgba(196, 93, 71, 0.25)',
                color: '#c45d47',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              結合情境插圖輔助理解
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(56, 90, 115, 0.12)',
                border: '1.5px solid rgba(56, 90, 115, 0.25)',
                color: '#a66832',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              03
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              唸讀計時檢核框
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(246, 241, 234, 0.95) 0%, rgba(240, 233, 224, 0.95) 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: 16,
            padding: '16px 22px',
          }}
        >
          <span style={{ fontSize: '26px' }}>💡</span>
          <span style={{ fontSize: '24px', fontWeight: 850, color: colors.muted }}>
            特教適性亮點：降低書寫挫折，提供高結構鷹架支持
          </span>
        </div>
      </div>

      {/* 右欄截圖 */}
      <ToolScreenshotFrame
        label="雙軌閱讀 · 原文與易讀對照"
        delay={0.15}
        style={{ height: '100%', maxHeight: 600 }}
      >
        <img
          src={imgChineseReading}
          alt="課文雙軌對照"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 14,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
            display: 'block',
          }}
        />
      </ToolScreenshotFrame>
    </div>

    <TextbookFooter subtitle="工具導覽：課文雙軌對照" />
  </div>
);

// 國文課堂學習單 2: 田字格與重點摘要
const Slide08_ChineseLessonWorksheet2: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: colors.accent,
            background: 'rgba(166, 104, 50, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(166, 104, 50, 0.2)',
            padding: '8px 22px',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(166, 104, 50, 0.08)',
          }}
        >
          語文備課
        </span>
        <span style={{ color: colors.muted, fontSize: '28px', fontWeight: 750 }}>手寫鷹架</span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '84px',
          fontWeight: 950,
          margin: '8px 0 0 0',
          color: colors.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        田字格與摘要
      </h2>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 36,
        alignItems: 'stretch',
        height: 600,
        marginTop: 16,
      }}
    >
      {/* 左欄卡片 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.accent}`,
          borderRadius: 28,
          padding: '30px 34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(166, 104, 50, 0.1)',
              border: '1px solid rgba(166, 104, 50, 0.25)',
              padding: '8px 20px',
              borderRadius: 20,
              fontSize: '24px',
              fontWeight: 950,
              color: colors.accent,
              letterSpacing: '0.02em',
            }}
          >
            <span>✨ 特教鷹架核心亮點</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(196, 93, 71, 0.08)',
              color: colors.orange,
              border: '1px solid rgba(196, 93, 71, 0.2)',
              padding: '8px 18px',
              borderRadius: 14,
              fontSize: '24px',
              fontWeight: 900,
            }}
          >
            手寫鷹架
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, margin: 'auto 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '26px 28px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 14,
                background: 'rgba(166, 104, 50, 0.12)',
                border: '1.5px solid rgba(166, 104, 50, 0.25)',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div
              style={{
                fontSize: '40px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              注音田字格生字練寫
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '26px 28px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 14,
                background: 'rgba(196, 93, 71, 0.12)',
                border: '1.5px solid rgba(196, 93, 71, 0.25)',
                color: '#c45d47',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div
              style={{
                fontSize: '40px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              段落核心重點摘要
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(246, 241, 234, 0.95) 0%, rgba(240, 233, 224, 0.95) 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: 16,
            padding: '16px 22px',
          }}
        >
          <span style={{ fontSize: '26px' }}>💡</span>
          <span style={{ fontSize: '24px', fontWeight: 850, color: colors.muted }}>
            特教適性亮點：降低書寫挫折，提供高結構鷹架支持
          </span>
        </div>
      </div>

      {/* 右欄截圖 */}
      <ToolScreenshotFrame
        label="手寫鷹架 · 注音田字格"
        delay={0.15}
        style={{ height: '100%', maxHeight: 600 }}
      >
        <img
          src={imgChineseTianzi}
          alt="田字格與摘要"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 14,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
            display: 'block',
          }}
        />
      </ToolScreenshotFrame>
    </div>

    <TextbookFooter subtitle="工具導覽：田字格與摘要" />
  </div>
);

// 國文課堂學習單 3: 隨段四選一即時檢核
const Slide08_ChineseLessonWorksheet3: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: colors.accent,
            background: 'rgba(166, 104, 50, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(166, 104, 50, 0.2)',
            padding: '8px 22px',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(166, 104, 50, 0.08)',
          }}
        >
          語文備課
        </span>
        <span style={{ color: colors.muted, fontSize: '28px', fontWeight: 750 }}>隨學隨測</span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '84px',
          fontWeight: 950,
          margin: '8px 0 0 0',
          color: colors.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        隨段即時檢核
      </h2>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 36,
        alignItems: 'stretch',
        height: 600,
        marginTop: 16,
      }}
    >
      {/* 左欄卡片 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.accent}`,
          borderRadius: 28,
          padding: '30px 34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(166, 104, 50, 0.1)',
              border: '1px solid rgba(166, 104, 50, 0.25)',
              padding: '8px 20px',
              borderRadius: 20,
              fontSize: '24px',
              fontWeight: 950,
              color: colors.accent,
              letterSpacing: '0.02em',
            }}
          >
            <span>✨ 特教鷹架核心亮點</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(196, 93, 71, 0.08)',
              color: colors.orange,
              border: '1px solid rgba(196, 93, 71, 0.2)',
              padding: '8px 18px',
              borderRadius: 14,
              fontSize: '24px',
              fontWeight: 900,
            }}
          >
            隨學隨測
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 'auto 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(166, 104, 50, 0.12)',
                border: '1.5px solid rgba(166, 104, 50, 0.25)',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              隨段兩題即時測驗
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(196, 93, 71, 0.12)',
                border: '1.5px solid rgba(196, 93, 71, 0.25)',
                color: '#c45d47',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              快速檢核學生理解
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(56, 90, 115, 0.12)',
                border: '1.5px solid rgba(56, 90, 115, 0.25)',
                color: '#a66832',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              03
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              範圍縮短成每段測驗，降低負荷
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(246, 241, 234, 0.95) 0%, rgba(240, 233, 224, 0.95) 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: 16,
            padding: '16px 22px',
          }}
        >
          <span style={{ fontSize: '26px' }}>💡</span>
          <span style={{ fontSize: '24px', fontWeight: 850, color: colors.muted }}>
            特教適性亮點：降低書寫挫折，提供高結構鷹架支持
          </span>
        </div>
      </div>

      {/* 右欄截圖 */}
      <ToolScreenshotFrame
        label="即時檢核 · 隨堂測驗"
        delay={0.15}
        style={{ height: '100%', maxHeight: 600 }}
      >
        <img
          src={imgChineseQuiz}
          alt="隨堂選擇題"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 14,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
            display: 'block',
          }}
        />
      </ToolScreenshotFrame>
    </div>

    <TextbookFooter subtitle="工具導覽：隨段即時檢核" />
  </div>
);

// 國文課堂學習單 4: 課文脈絡統整表格
const Slide08_ChineseLessonWorksheet4: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: colors.accent,
            background: 'rgba(166, 104, 50, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(166, 104, 50, 0.2)',
            padding: '8px 22px',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(166, 104, 50, 0.08)',
          }}
        >
          語文備課
        </span>
        <span style={{ color: colors.muted, fontSize: '28px', fontWeight: 750 }}>結構鷹架</span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '84px',
          fontWeight: 950,
          margin: '8px 0 0 0',
          color: colors.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        課文脈絡表格
      </h2>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 36,
        alignItems: 'stretch',
        height: 600,
        marginTop: 16,
      }}
    >
      {/* 左欄卡片 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.accent}`,
          borderRadius: 28,
          padding: '30px 34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(166, 104, 50, 0.1)',
              border: '1px solid rgba(166, 104, 50, 0.25)',
              padding: '8px 20px',
              borderRadius: 20,
              fontSize: '24px',
              fontWeight: 950,
              color: colors.accent,
              letterSpacing: '0.02em',
            }}
          >
            <span>✨ 特教鷹架核心亮點</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(196, 93, 71, 0.08)',
              color: colors.orange,
              border: '1px solid rgba(196, 93, 71, 0.2)',
              padding: '8px 18px',
              borderRadius: 14,
              fontSize: '24px',
              fontWeight: 900,
            }}
          >
            結構鷹架
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 'auto 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(166, 104, 50, 0.12)',
                border: '1.5px solid rgba(166, 104, 50, 0.25)',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              引導式重點歸納表格
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(196, 93, 71, 0.12)',
                border: '1.5px solid rgba(196, 93, 71, 0.25)',
                color: '#c45d47',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              文章結構脈絡梳理
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(56, 90, 115, 0.12)',
                border: '1.5px solid rgba(56, 90, 115, 0.25)',
                color: '#a66832',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              03
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              培養深層理解
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(246, 241, 234, 0.95) 0%, rgba(240, 233, 224, 0.95) 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: 16,
            padding: '16px 22px',
          }}
        >
          <span style={{ fontSize: '26px' }}>💡</span>
          <span style={{ fontSize: '24px', fontWeight: 850, color: colors.muted }}>
            特教適性亮點：降低書寫挫折，提供高結構鷹架支持
          </span>
        </div>
      </div>

      {/* 右欄截圖 */}
      <ToolScreenshotFrame
        label="結構鷹架 · 脈絡歸納"
        delay={0.15}
        style={{ height: '100%', maxHeight: 600 }}
      >
        <img
          src={imgChineseTable}
          alt="課文脈絡表格"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 14,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
            display: 'block',
          }}
        />
      </ToolScreenshotFrame>
    </div>

    <TextbookFooter subtitle="工具導覽：課文脈絡表格" />
  </div>
);

// 國文課堂學習單 5: 詞語注釋多元評量
const Slide08_ChineseLessonWorksheet5: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: colors.accent,
            background: 'rgba(166, 104, 50, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(166, 104, 50, 0.2)',
            padding: '8px 22px',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(166, 104, 50, 0.08)',
          }}
        >
          語文備課
        </span>
        <span style={{ color: colors.muted, fontSize: '28px', fontWeight: 750 }}>課後評量</span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '84px',
          fontWeight: 950,
          margin: '8px 0 0 0',
          color: colors.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        詞語多元評量
      </h2>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 36,
        alignItems: 'stretch',
        height: 600,
        marginTop: 16,
      }}
    >
      {/* 左欄卡片 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.accent}`,
          borderRadius: 28,
          padding: '30px 34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(166, 104, 50, 0.1)',
              border: '1px solid rgba(166, 104, 50, 0.25)',
              padding: '8px 20px',
              borderRadius: 20,
              fontSize: '24px',
              fontWeight: 950,
              color: colors.accent,
              letterSpacing: '0.02em',
            }}
          >
            <span>✨ 特教鷹架核心亮點</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(196, 93, 71, 0.08)',
              color: colors.orange,
              border: '1px solid rgba(196, 93, 71, 0.2)',
              padding: '8px 18px',
              borderRadius: 14,
              fontSize: '24px',
              fontWeight: 900,
            }}
          >
            課後評量
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, margin: 'auto 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '26px 28px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 14,
                background: 'rgba(166, 104, 50, 0.12)',
                border: '1.5px solid rgba(166, 104, 50, 0.25)',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div
              style={{
                fontSize: '40px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              課文詞語注釋連連看
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '26px 28px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 14,
                background: 'rgba(196, 93, 71, 0.12)',
                border: '1.5px solid rgba(196, 93, 71, 0.25)',
                color: '#c45d47',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div
              style={{
                fontSize: '40px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              強化生字詞釋義記憶
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(246, 241, 234, 0.95) 0%, rgba(240, 233, 224, 0.95) 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: 16,
            padding: '16px 22px',
          }}
        >
          <span style={{ fontSize: '26px' }}>💡</span>
          <span style={{ fontSize: '24px', fontWeight: 850, color: colors.muted }}>
            特教適性亮點：降低書寫挫折，提供高結構鷹架支持
          </span>
        </div>
      </div>

      {/* 右欄截圖 */}
      <ToolScreenshotFrame
        label="多元評量 · 詞語連連看"
        delay={0.15}
        style={{ height: '100%', maxHeight: 600 }}
      >
        <img
          src={imgChineseMatch}
          alt="詞語連連看評量"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 14,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
            display: 'block',
          }}
        />
      </ToolScreenshotFrame>
    </div>

    <TextbookFooter subtitle="工具導覽：詞語多元評量" />
  </div>
);

// 數學簡化學習單: 工具主題封面扉頁 (大標 + 現場痛點訊息框)
const Slide10_MathScaffoldTitle: Page = () => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <TextbookBg />

    <div
      style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(166, 104, 50, 0.15) 0%, rgba(196, 93, 71, 0.06) 50%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }}
    />

    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        maxWidth: 1440,
        width: '94%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(255, 255, 255, 0.95)',
        borderTop: `8px solid ${colors.accent}`,
        borderRadius: 36,
        padding: '44px 52px',
        boxShadow: '0 24px 60px rgba(148, 163, 184, 0.18)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          fontSize: '28px',
          fontWeight: 950,
          color: colors.accent,
          background: 'rgba(166, 104, 50, 0.1)',
          padding: '8px 30px',
          borderRadius: 999,
          letterSpacing: '0.12em',
          marginBottom: 14,
          border: '1px solid rgba(166, 104, 50, 0.2)',
        }}
      >
        <span>數學備課</span>
      </div>

      <h1
        style={{
          fontSize: '92px',
          fontWeight: 950,
          color: colors.text,
          margin: '0 0 28px 0',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
        }}
      >
        數學階梯鷹架學習單
      </h1>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 28,
            width: '100%',
            marginTop: 6,
          }}
        >
          {/* 老師心聲 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #fff5f2 0%, #faebe6 100%)',
              border: '2px solid rgba(196, 93, 71, 0.35)',
              borderRadius: '28px 28px 28px 6px',
              padding: '32px 36px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
              boxShadow: '0 14px 32px rgba(196, 93, 71, 0.10)',
              transform: 'rotate(-1.2deg)',
              transition: 'transform 0.2s ease',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '24px',
                  fontWeight: 950,
                  color: '#c45d47',
                  background: 'rgba(196, 93, 71, 0.12)',
                  padding: '6px 18px',
                  borderRadius: 999,
                }}
              >
                👩‍🏫 老師心聲
              </div>
              <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 750 }}>
                💬 備課日常
              </span>
            </div>
            <div
              style={{
                fontSize: '38px',
                fontWeight: 900,
                color: colors.text,
                lineHeight: 1.42,
                letterSpacing: '-0.01em',
              }}
            >
              「題目太難學生直接放棄，出分層階梯題出到心力交瘁…」
            </div>
          </div>

          {/* 學生心聲 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #faf7f2 0%, #f4ece2 100%)',
              border: '2px solid rgba(166, 104, 50, 0.35)',
              borderRadius: '28px 28px 6px 28px',
              padding: '32px 36px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
              boxShadow: '0 14px 32px rgba(166, 104, 50, 0.10)',
              transform: 'rotate(1.2deg)',
              transition: 'transform 0.2s ease',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '24px',
                  fontWeight: 950,
                  color: '#a66832',
                  background: 'rgba(166, 104, 50, 0.12)',
                  padding: '6px 18px',
                  borderRadius: 999,
                }}
              >
                👦 學生心聲
              </div>
              <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 750 }}>
                💬 學習困擾
              </span>
            </div>
            <div
              style={{
                fontSize: '38px',
                fontWeight: 900,
                color: colors.text,
                lineHeight: 1.42,
                letterSpacing: '-0.01em',
              }}
            >
              「步驟好多跳太快，看不懂計算過程就不想算了…」
            </div>
          </div>
        </div>
      </div>
    </div>

    <TextbookFooter subtitle="單元導覽 · 現場需求引導" />
  </div>
);

// 數學課堂學習單 1: 輸入超簡單 (功能介紹)
const Slide10_MathScaffold1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: colors.accent,
            background: 'rgba(166, 104, 50, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(166, 104, 50, 0.2)',
            padding: '8px 22px',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(166, 104, 50, 0.08)',
          }}
        >
          數學備課
        </span>
        <span style={{ color: colors.muted, fontSize: '28px', fontWeight: 750 }}>智能生成</span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '84px',
          fontWeight: 950,
          margin: '8px 0 0 0',
          color: colors.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        輸入超簡單
      </h2>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 36,
        alignItems: 'stretch',
        height: 600,
        marginTop: 16,
      }}
    >
      {/* 左欄卡片 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.accent}`,
          borderRadius: 28,
          padding: '30px 34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(166, 104, 50, 0.1)',
              border: '1px solid rgba(166, 104, 50, 0.25)',
              padding: '8px 20px',
              borderRadius: 20,
              fontSize: '24px',
              fontWeight: 950,
              color: colors.accent,
              letterSpacing: '0.02em',
            }}
          >
            <span>✨ 特教鷹架核心亮點</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(196, 93, 71, 0.08)',
              color: colors.orange,
              border: '1px solid rgba(196, 93, 71, 0.2)',
              padding: '8px 18px',
              borderRadius: 14,
              fontSize: '24px',
              fontWeight: 900,
            }}
          >
            智能生成
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 'auto 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(166, 104, 50, 0.12)',
                border: '1.5px solid rgba(166, 104, 50, 0.25)',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              只需輸入題目類型
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(196, 93, 71, 0.12)',
                border: '1.5px solid rgba(196, 93, 71, 0.25)',
                color: '#c45d47',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              也能直接貼上課本概念或題目截圖
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(56, 90, 115, 0.12)',
                border: '1.5px solid rgba(56, 90, 115, 0.25)',
                color: '#a66832',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              03
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              一次一種概念結構清楚
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(246, 241, 234, 0.95) 0%, rgba(240, 233, 224, 0.95) 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: 16,
            padding: '16px 22px',
          }}
        >
          <span style={{ fontSize: '26px' }}>💡</span>
          <span style={{ fontSize: '24px', fontWeight: 850, color: colors.muted }}>
            特教適性亮點：降低書寫挫折，提供高結構鷹架支持
          </span>
        </div>
      </div>

      {/* 右欄截圖 */}
      <ToolScreenshotFrame
        label="極簡輸入 · 階梯解題鷹架"
        delay={0.15}
        style={{ height: '100%', maxHeight: 600 }}
      >
        <img
          src={imgMathInputGemini}
          alt="輸入解一元一次"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 14,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
            display: 'block',
          }}
        />
      </ToolScreenshotFrame>
    </div>

    <TextbookFooter subtitle="工具導覽：輸入超簡單" />
  </div>
);

// Slide 15: 數學課堂學習單（概念說明 + 分步練習）
const Slide10_MathScaffold2: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader unit="數學備課" title="概念說明" subtitle="先懂再練" />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.95fr 1.05fr',
        gap: 36,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        height: 560,
        maxHeight: 560,
        alignItems: 'stretch',
      }}
    >
      {/* 左欄：概念說明（40號大字） */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.orange}`,
          borderRadius: 24,
          padding: '28px 32px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          minHeight: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background:
                'linear-gradient(135deg, rgba(166, 104, 50, 0.1) 0%, rgba(196, 93, 71, 0.1) 100%)',
              border: '1px solid rgba(166, 104, 50, 0.22)',
              padding: '6px 16px',
              borderRadius: 20,
              fontSize: '22px',
              fontWeight: 900,
              color: colors.accent,
            }}
          >
            <span>💡 先理解，再作答</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(196, 93, 71, 0.08)',
              color: colors.orange,
              border: '1px solid rgba(196, 93, 71, 0.2)',
              padding: '6px 14px',
              borderRadius: 14,
              fontSize: '20px',
              fontWeight: 850,
            }}
          >
            概念說明
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '12px 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '16px 20px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(196, 93, 71, 0.12)',
                border: '1px solid rgba(196, 93, 71, 0.25)',
                color: colors.orange,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 950,
                flexShrink: 0,
              }}
            >
              💡
            </div>
            <span style={{ fontSize: '32px', fontWeight: 850, color: colors.text }}>
              先說明這題在學什麼
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '16px 20px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(166, 104, 50, 0.12)',
                border: '1px solid rgba(166, 104, 50, 0.25)',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 950,
                flexShrink: 0,
              }}
            >
              ②
            </div>
            <span style={{ fontSize: '32px', fontWeight: 850, color: colors.text }}>
              用例題拆解解題想法
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '16px 20px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(56, 90, 115, 0.12)',
                border: '1px solid rgba(56, 90, 115, 0.25)',
                color: '#a66832',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 950,
                flexShrink: 0,
              }}
            >
              ③
            </div>
            <span style={{ fontSize: '32px', fontWeight: 850, color: colors.text }}>
              再用練習確認是否理解
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(246, 241, 234, 0.95) 0%, rgba(240, 233, 224, 0.95) 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: 16,
            padding: '12px 18px',
            marginTop: 4,
          }}
        >
          <span style={{ fontSize: '22px' }}>💡</span>
          <span
            style={{
              fontSize: '22px',
              fontWeight: 800,
              color: colors.muted,
              lineHeight: 1.35,
            }}
          >
            特教適性亮點：先懂後練、微步驟引導、降低焦慮
          </span>
        </div>
      </div>

      {/* 右欄：原生 SVG 圖解卡片 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderRadius: 24,
          padding: '28px 32px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 620,
            height: 310,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={imgMathConcept}
            alt="七年級數學一元一次方程式的概念說明學習單"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: 12,
            }}
          />
        </div>

        {/* 下方方程式示範列 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            marginTop: 10,
            padding: '10px 32px',
            background: 'rgba(241, 245, 249, 0.9)',
            borderRadius: 16,
            fontSize: '34px',
            fontWeight: 950,
            color: colors.text,
            letterSpacing: '0.04em',
          }}
        >
          <span>概念說明</span>
          <span style={{ color: colors.orange }}>➔</span>
          <span>分步練習</span>
        </div>
      </div>
    </div>

    <TextbookFooter subtitle="第一部分：數學概念說明" />
  </div>
);

// Slide 15: 數學課堂學習單（章節目錄導覽）
const Slide10_MathScaffold3: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: colors.accent,
            background: 'rgba(166, 104, 50, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(166, 104, 50, 0.2)',
            padding: '8px 22px',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(166, 104, 50, 0.08)',
          }}
        >
          數學備課
        </span>
        <span style={{ color: colors.muted, fontSize: '28px', fontWeight: 750 }}>目錄清單</span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '84px',
          fontWeight: 950,
          margin: '8px 0 0 0',
          color: colors.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        電子書功能
      </h2>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 36,
        alignItems: 'stretch',
        height: 600,
        marginTop: 16,
      }}
    >
      {/* 左欄卡片 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.accent}`,
          borderRadius: 28,
          padding: '30px 34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(166, 104, 50, 0.1)',
              border: '1px solid rgba(166, 104, 50, 0.25)',
              padding: '8px 20px',
              borderRadius: 20,
              fontSize: '24px',
              fontWeight: 950,
              color: colors.accent,
              letterSpacing: '0.02em',
            }}
          >
            <span>✨ 特教鷹架核心亮點</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(196, 93, 71, 0.08)',
              color: colors.orange,
              border: '1px solid rgba(196, 93, 71, 0.2)',
              padding: '8px 18px',
              borderRadius: 14,
              fontSize: '24px',
              fontWeight: 900,
            }}
          >
            目錄清單
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 'auto 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(166, 104, 50, 0.12)',
                border: '1.5px solid rgba(166, 104, 50, 0.25)',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              單元目錄快速導航
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(196, 93, 71, 0.12)',
                border: '1.5px solid rgba(196, 93, 71, 0.25)',
                color: '#c45d47',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              無觸控大屏也適用
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(56, 90, 115, 0.12)',
                border: '1.5px solid rgba(56, 90, 115, 0.25)',
                color: '#a66832',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              03
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              畫筆、秀答案等基本功能
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(246, 241, 234, 0.95) 0%, rgba(240, 233, 224, 0.95) 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: 16,
            padding: '16px 22px',
          }}
        >
          <span style={{ fontSize: '26px' }}>💡</span>
          <span style={{ fontSize: '24px', fontWeight: 850, color: colors.muted }}>
            特教適性亮點：降低書寫挫折，提供高結構鷹架支持
          </span>
        </div>
      </div>

      {/* 右欄截圖 */}
      <ToolScreenshotFrame
        label="概念目錄 · 循序漸進"
        delay={0.15}
        style={{ height: '100%', maxHeight: 600 }}
      >
        <img
          src={imgMathCatalog}
          alt="單元目錄與概念檢視"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 14,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
            display: 'block',
          }}
        />
      </ToolScreenshotFrame>
    </div>

    <TextbookFooter subtitle="工具導覽：單元概念目錄" />
  </div>
);

// Slide 16: 數學課堂學習單（一鍵純淨列印）
const Slide10_MathScaffold4: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: colors.accent,
            background: 'rgba(166, 104, 50, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(166, 104, 50, 0.2)',
            padding: '8px 22px',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(166, 104, 50, 0.08)',
          }}
        >
          數學備課
        </span>
        <span style={{ color: colors.muted, fontSize: '28px', fontWeight: 750 }}>乾淨白卷</span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '84px',
          fontWeight: 950,
          margin: '8px 0 0 0',
          color: colors.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        一鍵 A4 乾淨列印
      </h2>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 36,
        alignItems: 'stretch',
        height: 600,
        marginTop: 16,
      }}
    >
      {/* 左欄卡片 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.accent}`,
          borderRadius: 28,
          padding: '30px 34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(166, 104, 50, 0.1)',
              border: '1px solid rgba(166, 104, 50, 0.25)',
              padding: '8px 20px',
              borderRadius: 20,
              fontSize: '24px',
              fontWeight: 950,
              color: colors.accent,
              letterSpacing: '0.02em',
            }}
          >
            <span>✨ 特教鷹架核心亮點</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(196, 93, 71, 0.08)',
              color: colors.orange,
              border: '1px solid rgba(196, 93, 71, 0.2)',
              padding: '8px 18px',
              borderRadius: 14,
              fontSize: '24px',
              fontWeight: 900,
            }}
          >
            乾淨白卷
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 'auto 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(166, 104, 50, 0.12)',
                border: '1.5px solid rgba(166, 104, 50, 0.25)',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              一鍵濾除按鈕與答案
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(196, 93, 71, 0.12)',
                border: '1.5px solid rgba(196, 93, 71, 0.25)',
                color: '#c45d47',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              標準無干擾 A4 作業卷
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(56, 90, 115, 0.12)',
                border: '1.5px solid rgba(56, 90, 115, 0.25)',
                color: '#a66832',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              03
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              免二次排版直接出紙本
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(246, 241, 234, 0.95) 0%, rgba(240, 233, 224, 0.95) 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: 16,
            padding: '16px 22px',
          }}
        >
          <span style={{ fontSize: '26px' }}>💡</span>
          <span style={{ fontSize: '24px', fontWeight: 850, color: colors.muted }}>
            特教適性亮點：降低書寫挫折，提供高結構鷹架支持
          </span>
        </div>
      </div>

      {/* 右欄截圖 */}
      <ToolScreenshotFrame
        label="列印預覽：標準 A4 白底作業卷"
        delay={0.15}
        style={{ height: '100%', maxHeight: 600 }}
      >
        <img
          src={imgMathPrint}
          alt="A4 列印預覽"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 14,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
            display: 'block',
          }}
        />
      </ToolScreenshotFrame>
    </div>

    <TextbookFooter subtitle="工具導覽：一鍵 A4 乾淨列印" />
  </div>
);

// Slide 17: 實作二︰國數適性學習單備課 (二選一，10分鐘實作)
const Slide10_Practice_ChineseMath: Page = () => (
  <PracticePage
    num="02"
    toolName="國數適性學習單（二選一）"
    time="10 分鐘"
    task="請依據您的任教專長，自由選擇「國語文學習單」或「數學簡化學習單」進行 1 課實作體驗。"
    buttons={[
      { label: '國語文學習單', href: toolUrls.chineseLessonWorksheet, variant: 'primary' },
      { label: '數學簡化學習單', href: toolUrls.mathScaffold, variant: 'accent' },
      { label: '上傳檔案', href: uploadFileUrls.general, variant: 'dark' },
    ]}
  />
);

// Slide 16: PART 2 過渡頁
const Slide11_Part2Header: Page = () => (
  <PartHeaderPage
    partNum="2"
    time="15:30~16:20"
    title="自製互動網頁"
    desc="告別枯燥紙本作業！利用點選、步驟拆解、即時回饋與視覺鷹架，打造專屬互動教材"
  />
);

// 句型排列: 工具主題封面扉頁 (大標 + 現場痛點訊息框)
const Slide14_WebTool1Title: Page = () => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <TextbookBg />

    <div
      style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(166, 104, 50, 0.15) 0%, rgba(196, 93, 71, 0.06) 50%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }}
    />

    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        maxWidth: 1440,
        width: '94%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(255, 255, 255, 0.95)',
        borderTop: `8px solid ${colors.accent}`,
        borderRadius: 36,
        padding: '44px 52px',
        boxShadow: '0 24px 60px rgba(148, 163, 184, 0.18)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          fontSize: '28px',
          fontWeight: 950,
          color: colors.accent,
          background: 'rgba(166, 104, 50, 0.1)',
          padding: '8px 30px',
          borderRadius: 999,
          letterSpacing: '0.12em',
          marginBottom: 14,
          border: '1px solid rgba(166, 104, 50, 0.2)',
        }}
      >
        <span>單元二：自製互動網頁</span>
      </div>

      <h1
        style={{
          fontSize: '92px',
          fontWeight: 950,
          color: colors.text,
          margin: '0 0 28px 0',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
        }}
      >
        句型重組
      </h1>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 28,
            width: '100%',
            marginTop: 6,
          }}
        >
          {/* 老師心聲 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #fff5f2 0%, #faebe6 100%)',
              border: '2px solid rgba(196, 93, 71, 0.35)',
              borderRadius: '28px 28px 28px 6px',
              padding: '32px 36px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
              boxShadow: '0 14px 32px rgba(196, 93, 71, 0.10)',
              transform: 'rotate(-1.2deg)',
              transition: 'transform 0.2s ease',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '24px',
                  fontWeight: 950,
                  color: '#c45d47',
                  background: 'rgba(196, 93, 71, 0.12)',
                  padding: '6px 18px',
                  borderRadius: 999,
                }}
              >
                👩‍🏫 老師心聲
              </div>
              <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 750 }}>
                💬 備課日常
              </span>
            </div>
            <div
              style={{
                fontSize: '38px',
                fontWeight: 900,
                color: colors.text,
                lineHeight: 1.42,
                letterSpacing: '-0.01em',
              }}
            >
              「wordwall有類似功能，但若要做多，要花錢，且無法客製化…」
            </div>
          </div>

          {/* 學生心聲 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #faf7f2 0%, #f4ece2 100%)',
              border: '2px solid rgba(166, 104, 50, 0.35)',
              borderRadius: '28px 28px 6px 28px',
              padding: '32px 36px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
              boxShadow: '0 14px 32px rgba(166, 104, 50, 0.10)',
              transform: 'rotate(1.2deg)',
              transition: 'transform 0.2s ease',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '24px',
                  fontWeight: 950,
                  color: '#a66832',
                  background: 'rgba(166, 104, 50, 0.12)',
                  padding: '6px 18px',
                  borderRadius: 999,
                }}
              >
                👦 學生心聲
              </div>
              <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 750 }}>
                💬 學習困擾
              </span>
            </div>
            <div
              style={{
                fontSize: '38px',
                fontWeight: 900,
                color: colors.text,
                lineHeight: 1.42,
                letterSpacing: '-0.01em',
              }}
            >
              「想練句子但不會寫字，如果有得按又有聲音就好了…」
            </div>
          </div>
        </div>
      </div>
    </div>

    <TextbookFooter subtitle="單元導覽 · 現場需求引導" />
  </div>
);

// Slide 17: 工具一︰句型排列與語法重組 (功能介紹)
const Slide14_WebTool1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: colors.accent,
            background: 'rgba(166, 104, 50, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(166, 104, 50, 0.2)',
            padding: '8px 22px',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(166, 104, 50, 0.08)',
          }}
        >
          單元二：自製互動網頁
        </span>
        <span style={{ color: colors.muted, fontSize: '28px', fontWeight: 750 }}>語音互動</span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '84px',
          fontWeight: 950,
          margin: '8px 0 0 0',
          color: colors.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        視覺點擊與逐題檢核
      </h2>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 36,
        alignItems: 'stretch',
        height: 600,
        marginTop: 16,
      }}
    >
      {/* 左欄卡片 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.accent}`,
          borderRadius: 28,
          padding: '30px 34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(166, 104, 50, 0.1)',
              border: '1px solid rgba(166, 104, 50, 0.25)',
              padding: '8px 20px',
              borderRadius: 20,
              fontSize: '24px',
              fontWeight: 950,
              color: colors.accent,
              letterSpacing: '0.02em',
            }}
          >
            <span>✨ 特教鷹架核心亮點</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(196, 93, 71, 0.08)',
              color: colors.orange,
              border: '1px solid rgba(196, 93, 71, 0.2)',
              padding: '8px 18px',
              borderRadius: 14,
              fontSize: '24px',
              fontWeight: 900,
            }}
          >
            語音互動
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 'auto 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(166, 104, 50, 0.12)',
                border: '1.5px solid rgba(166, 104, 50, 0.25)',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              免手寫直覺拖曳操作
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(196, 93, 71, 0.12)',
                border: '1.5px solid rgba(196, 93, 71, 0.25)',
                color: '#c45d47',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              支援即時字卡語音朗讀
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(56, 90, 115, 0.12)',
                border: '1.5px solid rgba(56, 90, 115, 0.25)',
                color: '#a66832',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              03
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              靠聽力去把句子組起來，不是死記文法
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(246, 241, 234, 0.95) 0%, rgba(240, 233, 224, 0.95) 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: 16,
            padding: '16px 22px',
          }}
        >
          <span style={{ fontSize: '26px' }}>💡</span>
          <span style={{ fontSize: '24px', fontWeight: 850, color: colors.muted }}>
            特教適性亮點：降低書寫挫折，提供高結構鷹架支持
          </span>
        </div>
      </div>

      {/* 右欄截圖 */}
      <ToolScreenshotFrame
        label="互動操作 · 視覺拖曳與朗讀"
        delay={0.15}
        style={{ height: '100%', maxHeight: 600 }}
      >
        <img
          src={imgTool1}
          alt="句型排列操作介面"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 14,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
            display: 'block',
          }}
        />
      </ToolScreenshotFrame>
    </div>

    <TextbookFooter subtitle="工具導覽：視覺拖曳與校對" />
  </div>
);

// 互動步驟數學: 工具主題封面扉頁 (大標 + 現場痛點訊息框)
const Slide15_InteractiveMathTitle: Page = () => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <TextbookBg />

    <div
      style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(166, 104, 50, 0.15) 0%, rgba(196, 93, 71, 0.06) 50%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }}
    />

    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        maxWidth: 1440,
        width: '94%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(255, 255, 255, 0.95)',
        borderTop: `8px solid ${colors.accent}`,
        borderRadius: 36,
        padding: '44px 52px',
        boxShadow: '0 24px 60px rgba(148, 163, 184, 0.18)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          fontSize: '28px',
          fontWeight: 950,
          color: colors.accent,
          background: 'rgba(166, 104, 50, 0.1)',
          padding: '8px 30px',
          borderRadius: 999,
          letterSpacing: '0.12em',
          marginBottom: 14,
          border: '1px solid rgba(166, 104, 50, 0.2)',
        }}
      >
        <span>單元二：自製互動網頁</span>
      </div>

      <h1
        style={{
          fontSize: '92px',
          fontWeight: 950,
          color: colors.text,
          margin: '0 0 28px 0',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
        }}
      >
        互動步驟數學
      </h1>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 28,
            width: '100%',
            marginTop: 6,
          }}
        >
          {/* 老師心聲 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #fff5f2 0%, #faebe6 100%)',
              border: '2px solid rgba(196, 93, 71, 0.35)',
              borderRadius: '28px 28px 28px 6px',
              padding: '32px 36px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
              boxShadow: '0 14px 32px rgba(196, 93, 71, 0.10)',
              transform: 'rotate(-1.2deg)',
              transition: 'transform 0.2s ease',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '24px',
                  fontWeight: 950,
                  color: '#c45d47',
                  background: 'rgba(196, 93, 71, 0.12)',
                  padding: '6px 18px',
                  borderRadius: 999,
                }}
              >
                👩‍🏫 老師心聲
              </div>
              <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 750 }}>
                💬 備課日常
              </span>
            </div>
            <div
              style={{
                fontSize: '38px',
                fontWeight: 900,
                color: colors.text,
                lineHeight: 1.42,
                letterSpacing: '-0.01em',
              }}
            >
              「學生常跳步計算導致算錯，無法一個一個步驟即時盯著…」
            </div>
          </div>

          {/* 學生心聲 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #faf7f2 0%, #f4ece2 100%)',
              border: '2px solid rgba(166, 104, 50, 0.35)',
              borderRadius: '28px 28px 6px 28px',
              padding: '32px 36px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
              boxShadow: '0 14px 32px rgba(166, 104, 50, 0.10)',
              transform: 'rotate(1.2deg)',
              transition: 'transform 0.2s ease',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '24px',
                  fontWeight: 950,
                  color: '#a66832',
                  background: 'rgba(166, 104, 50, 0.12)',
                  padding: '6px 18px',
                  borderRadius: 999,
                }}
              >
                👦 學生心聲
              </div>
              <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 750 }}>
                💬 學習困擾
              </span>
            </div>
            <div
              style={{
                fontSize: '38px',
                fontWeight: 900,
                color: colors.text,
                lineHeight: 1.42,
                letterSpacing: '-0.01em',
              }}
            >
              「算到一半不知道哪裡錯，全部擦掉重算很挫折…」
            </div>
          </div>
        </div>
      </div>
    </div>

    <TextbookFooter subtitle="單元導覽 · 現場需求引導" />
  </div>
);

// Slide 19: 工具二︰互動式步驟數學學習單生成器 (功能介紹)
const Slide15_InteractiveMath: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: colors.accent,
            background: 'rgba(166, 104, 50, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(166, 104, 50, 0.2)',
            padding: '8px 22px',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(166, 104, 50, 0.08)',
          }}
        >
          單元二：自製互動網頁
        </span>
        <span style={{ color: colors.muted, fontSize: '28px', fontWeight: 750 }}>即時回饋</span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '84px',
          fontWeight: 950,
          margin: '8px 0 0 0',
          color: colors.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        步驟拆解與檢核
      </h2>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 36,
        alignItems: 'stretch',
        height: 600,
        marginTop: 16,
      }}
    >
      {/* 左欄卡片 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.accent}`,
          borderRadius: 28,
          padding: '30px 34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(166, 104, 50, 0.1)',
              border: '1px solid rgba(166, 104, 50, 0.25)',
              padding: '8px 20px',
              borderRadius: 20,
              fontSize: '24px',
              fontWeight: 950,
              color: colors.accent,
              letterSpacing: '0.02em',
            }}
          >
            <span>✨ 特教鷹架核心亮點</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(196, 93, 71, 0.08)',
              color: colors.orange,
              border: '1px solid rgba(196, 93, 71, 0.2)',
              padding: '8px 18px',
              borderRadius: 14,
              fontSize: '24px',
              fontWeight: 900,
            }}
          >
            即時回饋
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 'auto 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(166, 104, 50, 0.12)',
                border: '1.5px solid rgba(166, 104, 50, 0.25)',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              小步驟拆解解題流程
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(196, 93, 71, 0.12)',
                border: '1.5px solid rgba(196, 93, 71, 0.25)',
                color: '#c45d47',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              提供輸入與點選雙模式
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(56, 90, 115, 0.12)',
                border: '1.5px solid rgba(56, 90, 115, 0.25)',
                color: '#a66832',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              03
            </div>
            <div
              style={{
                fontSize: '35px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              即時回饋強化解題信心
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(246, 241, 234, 0.95) 0%, rgba(240, 233, 224, 0.95) 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: 16,
            padding: '16px 22px',
          }}
        >
          <span style={{ fontSize: '26px' }}>💡</span>
          <span style={{ fontSize: '24px', fontWeight: 850, color: colors.muted }}>
            特教適性亮點：降低書寫挫折，提供高結構鷹架支持
          </span>
        </div>
      </div>

      {/* 右欄截圖 */}
      <ToolScreenshotFrame
        label="步驟鷹架 · 即時回饋檢核"
        delay={0.15}
        style={{ height: '100%', maxHeight: 600 }}
      >
        <img
          src={imgInteractiveStepMath}
          alt="步步練互動數學學習單畫面"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 14,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
            display: 'block',
          }}
        />
      </ToolScreenshotFrame>
    </div>

    <TextbookFooter subtitle="工具導覽：步驟拆解與檢核" />
  </div>
);

// Slide 20: 實作三︰句型排列與步驟數學 (二選一，10分鐘實作)
const Slide15_Practice_InteractiveWeb: Page = () => (
  <PracticePage
    num="03"
    toolName="句型排列 / 步驟數學（二選一）"
    time="10 分鐘"
    task="請依據教學需要，自由選擇「句型排列」或「互動步驟數學」進行 1 次課堂互動網頁體驗。"
    buttons={[
      { label: '句型排列工具', href: toolUrls.unscramble, variant: 'primary' },
      { label: '互動步驟數學', href: toolUrls.interactiveMath, variant: 'accent' },
      { label: '上傳檔案', href: uploadFileUrls.general, variant: 'dark' },
    ]}
  />
);

// 自製電子書: 工具主題封面扉頁 (大標 + 現場痛點訊息框)
const Slide16_EbookTitle: Page = () => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <TextbookBg />

    <div
      style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(166, 104, 50, 0.15) 0%, rgba(196, 93, 71, 0.06) 50%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }}
    />

    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        maxWidth: 1440,
        width: '94%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(255, 255, 255, 0.95)',
        borderTop: `8px solid ${colors.orange}`,
        borderRadius: 36,
        padding: '44px 52px',
        boxShadow: '0 24px 60px rgba(148, 163, 184, 0.18)',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          fontSize: '28px',
          fontWeight: 950,
          color: colors.orange,
          background: 'rgba(196, 93, 71, 0.1)',
          padding: '8px 30px',
          borderRadius: 999,
          letterSpacing: '0.12em',
          marginBottom: 14,
          border: '1px solid rgba(196, 93, 71, 0.2)',
        }}
      >
        <span>單元二：自製互動網頁</span>
      </div>

      <h1
        style={{
          fontSize: '92px',
          fontWeight: 950,
          color: colors.text,
          margin: '0 0 28px 0',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
        }}
      >
        自製電子書
      </h1>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 28,
            width: '100%',
            marginTop: 6,
          }}
        >
          {/* 老師心聲 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #fff5f2 0%, #faebe6 100%)',
              border: '2px solid rgba(196, 93, 71, 0.35)',
              borderRadius: '28px 28px 28px 6px',
              padding: '32px 36px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
              boxShadow: '0 14px 32px rgba(196, 93, 71, 0.10)',
              transform: 'rotate(-1.2deg)',
              transition: 'transform 0.2s ease',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '24px',
                  fontWeight: 950,
                  color: '#c45d47',
                  background: 'rgba(196, 93, 71, 0.12)',
                  padding: '6px 18px',
                  borderRadius: 999,
                }}
              >
                👩‍🏫 老師心聲
              </div>
              <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 750 }}>
                💬 備課與課堂痛點
              </span>
            </div>
            <div
              style={{
                fontSize: '35px',
                fontWeight: 900,
                color: colors.text,
                lineHeight: 1.42,
                letterSpacing: '-0.01em',
              }}
            >
              「自編學習單上課若沒觸控螢幕，在黑板抄寫手忙腳亂；但每堂課都做簡報，備課時間真的不夠…」
            </div>
          </div>

          {/* 學生心聲 */}
          <div
            style={{
              background: 'linear-gradient(135deg, #faf7f2 0%, #f4ece2 100%)',
              border: '2px solid rgba(166, 104, 50, 0.35)',
              borderRadius: '28px 28px 6px 28px',
              padding: '32px 36px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
              boxShadow: '0 14px 32px rgba(166, 104, 50, 0.10)',
              transform: 'rotate(1.2deg)',
              transition: 'transform 0.2s ease',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '24px',
                  fontWeight: 950,
                  color: '#a66832',
                  background: 'rgba(166, 104, 50, 0.12)',
                  padding: '6px 18px',
                  borderRadius: 999,
                }}
              >
                👦 學生心聲
              </div>
              <span style={{ fontSize: '18px', color: '#94a3b8', fontWeight: 750 }}>
                💬 課堂學習困擾
              </span>
            </div>
            <div
              style={{
                fontSize: '35px',
                fontWeight: 900,
                color: colors.text,
                lineHeight: 1.42,
                letterSpacing: '-0.01em',
              }}
            >
              「老師在黑板寫的我抄很慢，希望能看著大螢幕的題目，一步步對照自己桌上的學習單…」
            </div>
          </div>
        </div>
      </div>
    </div>

    <TextbookFooter subtitle="單元導覽 · 現場需求引導" />
  </div>
);

// 自製電子書: 一次備課，雙重教學產出 (大屏互動電子書 + 學生純淨 A4 學習單)
const Slide16_EbookDualMode: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: colors.orange,
            background: 'rgba(196, 93, 71, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(196, 93, 71, 0.2)',
            padding: '8px 22px',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(196, 93, 71, 0.08)',
          }}
        >
          單元二：自製互動網頁
        </span>
        <span style={{ color: colors.muted, fontSize: '28px', fontWeight: 750 }}>
          雙模式備課神器
        </span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '84px',
          fontWeight: 950,
          margin: '8px 0 0 0',
          color: colors.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        一次 AI 備課，雙重教學產出
      </h2>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 36,
        alignItems: 'stretch',
        height: 600,
        marginTop: 16,
      }}
    >
      {/* 左欄卡片 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.90)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.orange}`,
          borderRadius: 28,
          padding: '30px 34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(196, 93, 71, 0.1)',
              border: '1px solid rgba(196, 93, 71, 0.25)',
              padding: '8px 20px',
              borderRadius: 20,
              fontSize: '24px',
              fontWeight: 950,
              color: colors.orange,
              letterSpacing: '0.02em',
            }}
          >
            <span>✨ 特教備課核心創新</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(166, 104, 50, 0.08)',
              color: colors.accent,
              border: '1px solid rgba(166, 104, 50, 0.2)',
              padding: '8px 18px',
              borderRadius: 14,
              fontSize: '24px',
              fontWeight: 900,
            }}
          >
            一魚兩吃
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: 'auto 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(196, 93, 71, 0.12)',
                border: '1.5px solid rgba(196, 93, 71, 0.25)',
                color: colors.orange,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              01
            </div>
            <div
              style={{
                fontSize: '33px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              教師端大屏：點擊秀答案＋畫筆板書
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(166, 104, 50, 0.12)',
                border: '1.5px solid rgba(166, 104, 50, 0.25)',
                color: colors.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              02
            </div>
            <div
              style={{
                fontSize: '33px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              學生端列印：一鍵還原乾淨 A4 作業卷
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              borderRadius: 18,
              padding: '18px 24px',
              boxShadow: '0 4px 16px rgba(148, 163, 184, 0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: 'rgba(56, 90, 115, 0.12)',
                border: '1.5px solid rgba(56, 90, 115, 0.25)',
                color: '#385a73',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 950,
                fontFamily: 'var(--osd-font-display)',
                flexShrink: 0,
              }}
            >
              03
            </div>
            <div
              style={{
                fontSize: '33px',
                lineHeight: 1.35,
                fontWeight: 900,
                color: colors.text,
                letterSpacing: '-0.01em',
              }}
            >
              零門檻備課：告別每堂課熬夜做簡報
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background:
              'linear-gradient(135deg, rgba(246, 241, 234, 0.95) 0%, rgba(240, 233, 224, 0.95) 100%)',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            borderRadius: 16,
            padding: '16px 22px',
          }}
        >
          <span style={{ fontSize: '26px' }}>💡</span>
          <span style={{ fontSize: '24px', fontWeight: 850, color: colors.muted }}>
            特教適性亮點：同步滿足「大螢幕視覺引導」與「個別紙本手寫練習」
          </span>
        </div>
      </div>

      {/* 右欄截圖 */}
      <ToolScreenshotFrame
        label="自製電子書 · 互動功能工具列"
        delay={0.15}
        style={{ height: '100%', maxHeight: 600 }}
      >
        <img
          src={imgEbookDraft}
          alt="自製電子書操作畫面"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 14,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
            display: 'block',
          }}
        />
      </ToolScreenshotFrame>
    </div>

    <TextbookFooter subtitle="工具導覽：雙模式教學與備課" />
  </div>
);

// 自製電子書: 兩種輸入模式・隨手就能備課
const Slide16_EbookScenarios: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
        <span
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            color: colors.orange,
            background: 'rgba(196, 93, 71, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(196, 93, 71, 0.2)',
            padding: '8px 22px',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(196, 93, 71, 0.08)',
          }}
        >
          單元二：自製互動網頁
        </span>
        <span style={{ color: colors.muted, fontSize: '28px', fontWeight: 750 }}>靈活備課流程</span>
      </div>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '84px',
          fontWeight: 950,
          margin: '8px 0 0 0',
          color: colors.text,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}
      >
        兩種輸入模式 ‧ 隨手就能備課
      </h2>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        alignItems: 'stretch',
        height: 600,
        marginTop: 16,
      }}
    >
      {/* 情境一：丟現成學習單草稿 */}
      <div
        className="es-fadeUp"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.accent}`,
          borderRadius: 28,
          padding: '24px 28px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.14)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(166, 104, 50, 0.12)',
              color: colors.accent,
              padding: '6px 18px',
              borderRadius: 999,
              fontSize: '22px',
              fontWeight: 950,
              marginBottom: 10,
            }}
          >
            📸 情境一：丟現成草稿 / 圖片
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 850,
              color: colors.text,
              lineHeight: 1.35,
              marginBottom: 12,
            }}
          >
            已有設計好的學習單草稿？拍照上傳直接轉化為電子書！
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: 16,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            background: '#f8fafc',
          }}
        >
          <img
            src={imgEbookDraft}
            alt="丟草稿生成電子書"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>

      {/* 情境二：輸入概念或課本截圖 */}
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.1s',
          height: '100%',
          boxSizing: 'border-box',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `6px solid ${colors.orange}`,
          borderRadius: 28,
          padding: '24px 28px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.14)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(196, 93, 71, 0.12)',
              color: colors.orange,
              padding: '6px 18px',
              borderRadius: 999,
              fontSize: '22px',
              fontWeight: 950,
              marginBottom: 10,
            }}
          >
            ✍️ 情境二：輸入概念 / 特教需求
          </div>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 850,
              color: colors.text,
              lineHeight: 1.35,
              marginBottom: 12,
            }}
          >
            只給單元概念（如：一元一次方程式、數學學障），AI 直出特教學習單！
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: 16,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            background: '#f8fafc',
          }}
        >
          <img
            src={imgEbookConcept}
            alt="輸入概念生成電子書"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    </div>

    <TextbookFooter subtitle="工具導覽：草稿上傳與概念生成雙模式" />
  </div>
);

// 實作四︰自製電子書 (10分鐘實作)
const Slide16_Practice_Ebook: Page = () => (
  <PracticePage
    num="04"
    toolName="自製電子書"
    time="10 分鐘"
    task="請嘗試丟上一份手邊的學習單草稿圖，或直接輸入教學概念（例如：七年級一元一次方程式學習障礙學習單），體驗生成自製電子書！"
    buttons={[
      { label: '自製電子書 Gem', href: 'https://gemini.google.com/', variant: 'primary' },
      { label: '上傳檔案', href: uploadFileUrls.general, variant: 'dark' },
    ]}
  />
);

// Slide 21: PART 3 過渡頁 (使用者指定：標題改 Gemini Canvas 教師自製 AI 工具實作)
const Slide17_Part3Header: Page = () => (
  <PartHeaderPage
    partNum="3"
    time="16:20~17:00"
    title="Gemini Canvas 教師自製 AI 工具"
    desc="只要說人話，就能自己做AI工具"
  />
);

// Slide 23: Vibe coding「AI 備課工具」- 咒語架構三要素 (精簡版)
const Slide19_VibePromptStructure: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="單元三"
      title="Vibe Coding 咒語架構三要素"
      subtitle="以 AI 智能考卷生成助手為例"
    />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 32,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        alignItems: 'center',
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          background: 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.accent}`,
          borderRadius: 24,
          padding: '28px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'rgba(166, 104, 50, 0.12)',
              color: colors.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '34px',
              fontWeight: 950,
              fontFamily: 'var(--osd-font-display)',
              marginBottom: 16,
            }}
          >
            01
          </div>
          <h3 style={{ margin: 0, fontSize: '52px', fontWeight: 950, color: colors.text }}>
            大目標
            <span
              style={{
                display: 'block',
                fontSize: '26px',
                color: colors.accent,
                fontWeight: 800,
                marginTop: 4,
              }}
            >
              Goal · 宣告工具定位
            </span>
          </h3>
          <div
            style={{
              fontSize: '36px',
              lineHeight: 1.42,
              color: colors.text,
              fontWeight: 650,
              marginTop: 16,
              textAlign: 'left',
            }}
          >
            「做一個 AI 考卷生成助手」<strong style={{ color: colors.accent }}>{''}</strong>
            {''}
            {''}
          </div>
        </div>
        <div
          style={{
            background: 'rgba(166, 104, 50, 0.08)',
            borderRadius: 14,
            padding: '12px 16px',
            fontSize: '26px',
            color: colors.muted,
            fontWeight: 700,
            marginTop: 16,
          }}
        >
          💡 明確設定工具目的與角色。
        </div>
      </div>

      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.15s',
          background: 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.orange}`,
          borderRadius: 24,
          padding: '28px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'rgba(196, 93, 71, 0.12)',
              color: colors.orange,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '34px',
              fontWeight: 950,
              fontFamily: 'var(--osd-font-display)',
              marginBottom: 16,
            }}
          >
            02
          </div>
          <h3 style={{ margin: 0, fontSize: '52px', fontWeight: 950, color: colors.text }}>
            操作流程
            <span
              style={{
                display: 'block',
                fontSize: '26px',
                color: colors.orange,
                fontWeight: 800,
                marginTop: 4,
              }}
            >
              Workflow · 介面輸入欄位
            </span>
          </h3>
          <div
            style={{
              fontSize: '36px',
              lineHeight: 1.42,
              color: colors.text,
              fontWeight: 650,
              marginTop: 16,
              textAlign: 'left',
            }}
          >
            「使用者貼上教材、選擇題型」<strong>{''}</strong>
            {''}
            <strong>{''}</strong>
            {''}
            <strong>{''}</strong>
          </div>
        </div>
        <div
          style={{
            background: 'rgba(196, 93, 71, 0.08)',
            borderRadius: 14,
            padding: '12px 16px',
            fontSize: '26px',
            color: colors.muted,
            fontWeight: 700,
            marginTop: 16,
          }}
        >
          💡 規劃畫面要按什麼、填什麼。
        </div>
      </div>

      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.3s',
          background: 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.blue}`,
          borderRadius: 24,
          padding: '28px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <div>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: 'rgba(56, 90, 115, 0.12)',
              color: colors.blue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '34px',
              fontWeight: 950,
              fontFamily: 'var(--osd-font-display)',
              marginBottom: 16,
            }}
          >
            03
          </div>
          <h3 style={{ margin: 0, fontSize: '52px', fontWeight: 950, color: colors.text }}>
            期望結果
            <span
              style={{
                display: 'block',
                fontSize: '26px',
                color: colors.blue,
                fontWeight: 800,
                marginTop: 4,
              }}
            >
              Outcome · 具體成品
            </span>
          </h3>
          <div
            style={{
              fontSize: '36px',
              lineHeight: 1.42,
              color: colors.text,
              fontWeight: 650,
              marginTop: 16,
              textAlign: 'left',
            }}
          >
            「就能生成題目並匯出 Word」<strong style={{ color: colors.orange }}>{''}</strong>
          </div>
        </div>
        <div
          style={{
            background: 'rgba(56, 90, 115, 0.08)',
            borderRadius: 14,
            padding: '12px 16px',
            fontSize: '26px',
            color: colors.muted,
            fontWeight: 700,
            marginTop: 16,
          }}
        >
          💡 產出實體可用的檔案與成果。
        </div>
      </div>
    </div>

    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        marginTop: 26,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: colors.white,
        borderRadius: 20,
        padding: '20px 32px',
        textAlign: 'center',
        fontSize: '32px',
        fontWeight: 850,
        boxShadow: '0 16px 36px rgba(15, 23, 42, 0.14)',
      }}
    >
      🎯 黃金公式：<strong>【做什麼工具】＋【使用者輸入什麼】＋【產出什麼檔案】</strong>
    </div>
    <TextbookFooter subtitle="第三部分：Vibe Coding 咒語架構" />
  </div>
);

const Slide20_CommonIssuesHelper: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="單元三"
      title="自製工具，現場也會卡關"
      subtitle="把常見問題整理成一個 AI 小幫手"
    />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 28,
        flex: 1,
        minHeight: 0,
        alignItems: 'stretch',
        zIndex: 2,
      }}
    >
      {[
        {
          number: '01',
          title: 'Canvas 接 AI',
          problem: '要求使用者輸入 API',
          solution: '要求 AI 自動串接 Gemini',
          accent: colors.accent,
          tint: 'rgba(166, 104, 50, 0.1)',
        },
        {
          number: '02',
          title: '列印按鈕',
          problem: '按了按鈕，列印功能卻沒反應。',
          solution: '點擊按鈕後另開 blob 分頁，並跳出列印視窗。',
          accent: colors.orange,
          tint: 'rgba(196, 93, 71, 0.1)',
        },
        {
          number: '03',
          title: 'Word 匯出',
          problem: '格式跑掉，或檔案沒有照預期產生。',
          solution: '直接截圖貼上個人常用格式。',
          accent: colors.blue,
          tint: 'rgba(56, 90, 115, 0.1)',
        },
      ].map((issue) => (
        <div
          key={issue.number}
          style={{
            minHeight: 250,
            padding: '34px 36px',
            borderRadius: 24,
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1.5px solid rgba(255, 255, 255, 0.95)',
            borderTop: `8px solid ${issue.accent}`,
            boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            zIndex: 2,
          }}
        >
          <span
            style={{
              alignSelf: 'flex-start',
              padding: '8px 16px',
              borderRadius: 10,
              background: issue.tint,
              color: issue.accent,
              fontSize: '25px',
              fontWeight: 950,
            }}
          >
            {issue.number}
          </span>
          <h3 style={{ margin: 0, color: colors.text, fontSize: '50px', fontWeight: 950 }}>
            {issue.title}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: 12 }}>
              <strong style={{ color: colors.orange, fontSize: '30px', fontWeight: 950 }}>
                問題
              </strong>
              <p
                style={{
                  margin: 0,
                  color: colors.text,
                  fontSize: '30px',
                  lineHeight: 1.4,
                  fontWeight: 700,
                }}
              >
                {issue.problem}
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '88px 1fr',
                gap: 12,
                borderTop: '1px solid rgba(148, 163, 184, 0.3)',
                paddingTop: 14,
              }}
            >
              <strong style={{ color: colors.blue, fontSize: '30px', fontWeight: 950 }}>
                解方
              </strong>
              <p
                style={{
                  margin: 0,
                  color: colors.muted,
                  fontSize: '30px',
                  lineHeight: 1.4,
                  fontWeight: 700,
                }}
              >
                {issue.solution}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div
      style={{
        zIndex: 2,
        marginTop: 28,
        padding: '24px 32px',
        borderRadius: 22,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: colors.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 28,
        boxShadow: '0 18px 40px rgba(15, 23, 42, 0.16)',
      }}
    >
      <div style={{ fontSize: '30px', lineHeight: 1.45, fontWeight: 750 }}>
        遇到這些狀況不用自己慢慢試，
        <strong style={{ color: '#c7d2fe' }}>直接問 AI 小幫手</strong>，少繞一點路。
      </div>
      <a
        href="https://gemini.google.com/gem/1wKgy93k8glqhdWihRvKa3MTJA2yu9UEu?usp=sharing"
        target="_blank"
        rel="noreferrer"
        style={{
          flexShrink: 0,
          padding: '18px 24px',
          borderRadius: 14,
          background: 'linear-gradient(135deg, #818cf8, #38bdf8)',
          color: '#0f172a',
          fontSize: '26px',
          fontWeight: 950,
          textDecoration: 'none',
          boxShadow: '0 10px 24px rgba(56, 189, 248, 0.2)',
        }}
      >
        開啟 AI 小幫手 ↗
      </a>
    </div>
    <TextbookFooter subtitle="第三部分：自製 AI 工具現場支援" />
  </div>
);

const Slide20_IterationTakeaway: Page = () => (
  <div style={{ ...fill, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
    <TextbookBg />
    <div style={{ zIndex: 2, maxWidth: 1420 }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          borderRadius: 999,
          background: 'rgba(166, 104, 50, 0.12)',
          color: colors.accent,
          padding: '10px 28px',
          fontSize: '26px',
          fontWeight: 950,
          marginBottom: 30,
        }}
      >
        自製 AI 工具的心法
      </div>
      <h2
        style={{
          color: colors.text,
          fontSize: '82px',
          fontWeight: 950,
          lineHeight: 1.18,
          letterSpacing: '-0.03em',
          margin: 0,
        }}
      >
        厲害的不是提示詞下得多漂亮
        <br />
        而是看得出問題，說得清楚
      </h2>
      <p
        style={{
          color: colors.muted,
          fontSize: '38px',
          fontWeight: 700,
          lineHeight: 1.5,
          margin: '30px 0 0',
        }}
      >
        請它修正，再看一次。保持耐心，工具會慢慢長成你要的樣子。
      </p>
      <div
        style={{
          marginTop: 44,
          borderRadius: 24,
          background: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)',
          boxShadow: '0 22px 50px rgba(49, 46, 129, 0.22)',
          color: colors.white,
          padding: '28px 46px',
          fontSize: '42px',
          fontWeight: 950,
          lineHeight: 1.35,
        }}
      >
        把迭代當成遊戲破關，耐心就會變成樂趣。
      </div>
    </div>
    <TextbookFooter subtitle="第三部分：自製工具的迭代心法" />
  </div>
);

// Slide 28: 今天的總結與閉幕
const Slide23_ClosingSummary: Page = () => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <TextbookBg />
    <div
      style={{
        zIndex: 2,
        maxWidth: 1480,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: colors.accentMuted,
          color: colors.accent,
          borderRadius: 999,
          padding: '10px 28px',
          fontSize: '26px',
          fontWeight: 900,
          marginBottom: 28,
        }}
      >
        今天的研習
      </div>
      <h2
        style={{
          fontSize: '82px',
          fontWeight: 950,
          color: colors.text,
          margin: '0 0 32px',
          lineHeight: 1.18,
          letterSpacing: '-0.03em',
        }}
      >
        帶走一件事，就夠了。
      </h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          width: '100%',
          fontSize: '38px',
          color: colors.muted,
          fontWeight: 650,
          lineHeight: 1.45,
          textAlign: 'left',
        }}
      >
        <div>
          <strong style={{ color: colors.text, fontWeight: 950 }}>不必全用：</strong>
          工具很多，挑一個最上手的就好。
        </div>
        <div>
          <strong style={{ color: colors.text, fontWeight: 950 }}>不用追趕：</strong>
          紙本、數位或自製 AI，適合你的就是好工具。
        </div>
        <div>
          <strong style={{ color: colors.text, fontWeight: 950 }}>回歸痛點：</strong>
          看見每天重複的困擾，讓 AI 幫你少花一點力氣。
        </div>
      </div>
      <div
        style={{
          marginTop: 46,
          fontSize: '42px',
          fontWeight: 950,
          color: colors.orange,
          letterSpacing: '0.03em',
        }}
      >
        選擇自己最不排斥的<strong>{''}</strong>！
      </div>
    </div>
    <TextbookFooter subtitle="總結與賦歸" />
  </div>
);

const toolRecommendations = [
  {
    painPoint: '想做詞彙教材，配圖麻煩、排版又很累',
    name: '詞彙教材生成器',
    href: 'https://spedmix.pages.dev/vocab-maker',
    accent: '#6366f1',
  },
  {
    painPoint: '學生學文言文理解有限，學習動機也低',
    name: '文言文翻譯與導讀',
    href: 'https://spedmix.pages.dev/chinesetranslate',
    accent: '#385a73',
  },
  {
    painPoint: '課文太難，學生需要逐句搭配圖解',
    name: '逐句課文繪畫師',
    href: 'https://spedmix.pages.dev/four-panel-comic',
    accent: '#f59e0b',
  },
  {
    painPoint: '特需課程太空洞，不知道要上什麼',
    name: '特需課程教材',
    href: 'https://spedmix.pages.dev/#detail/special-needs',
    accent: '#ec4899',
  },
  {
    painPoint: '書商題目太難，學生做起來不適性',
    name: '個別化出題小幫手',
    href: 'https://spedmix.pages.dev/question',
    accent: '#c45d47',
  },
  {
    painPoint: '要教學生技能，還要拆步驟與配圖',
    name: '工作分析教材',
    href: 'https://spedmix.pages.dev/taskanalysis',
    accent: '#14b8a6',
  },
] as const;

const Slide24_RecommendedTools: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="延伸工具"
      title="還有這些工具，也很好用"
      subtitle="從教學痛點直接挑工具"
    />
    <div
      className="m-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 22,
        flex: 1,
        minHeight: 0,
        zIndex: 2,
      }}
    >
      {toolRecommendations.map(({ painPoint, name, href, accent }, index) => (
        <a
          className="es-fadeUp"
          href={href}
          key={href}
          rel="noreferrer"
          style={{
            animationDelay: `${index * 0.06}s`,
            background: 'rgba(255, 255, 255, 0.94)',
            border: '1.5px solid rgba(226, 232, 240, 0.9)',
            borderLeft: `10px solid ${accent}`,
            borderRadius: 22,
            boxShadow: '0 16px 32px rgba(148, 163, 184, 0.14)',
            color: colors.text,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '22px 30px',
            position: 'relative',
            textDecoration: 'none',
          }}
          target="_blank"
        >
          <span
            style={{
              color: accent,
              fontFamily: 'var(--osd-font-display)',
              fontSize: '104px',
              fontWeight: 950,
              letterSpacing: '-0.08em',
              lineHeight: 1,
              opacity: 0.08,
              position: 'absolute',
              right: 26,
              top: 10,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div
            style={{
              alignItems: 'center',
              color: accent,
              display: 'flex',
              fontSize: '22px',
              fontWeight: 950,
              gap: 10,
              letterSpacing: '0.08em',
              position: 'relative',
            }}
          >
            <span
              style={{
                alignItems: 'center',
                background: `${accent}18`,
                borderRadius: 999,
                display: 'inline-flex',
                fontSize: '19px',
                height: 32,
                justifyContent: 'center',
                letterSpacing: 0,
                width: 32,
              }}
            >
              {index + 1}
            </span>
            遇到這個情況
          </div>
          <div
            style={{
              color: colors.text,
              fontSize: '29px',
              fontWeight: 700,
              lineHeight: 1.35,
              marginTop: 12,
              position: 'relative',
            }}
          >
            {painPoint}
          </div>
          <div
            style={{
              alignItems: 'center',
              color: accent,
              display: 'flex',
              fontSize: '42px',
              fontWeight: 950,
              gap: 12,
              letterSpacing: '-0.02em',
              marginTop: 12,
              position: 'relative',
            }}
          >
            <span>{name}</span>
            <span style={{ fontSize: '28px' }}>↗</span>
          </div>
        </a>
      ))}
    </div>
    <TextbookFooter subtitle="延伸工具推薦" />
  </div>
);

export const meta: SlideMeta = {
  title: '特教教師的AI工作流-教學應用與自製工具實作',
  createdAt: '2026-09-10T20:25:00.000Z',
};

export default [
  Slide01_Title,
  Slide02_Speaker,
  Slide06_MixerIntro,
  Slide02a_WorkshopSlides,
  Slide03_Agenda,
  Slide04_Part1Header,
  Slide05_AdminIep,
  Slide05b_OtherIepTools,
  Slide06_Practice_IEP,
  Slide08_ChineseLessonTitle,
  Slide08_ChineseLessonWorksheet1,
  Slide08_ChineseLessonWorksheet2,
  Slide08_ChineseLessonWorksheet3,
  Slide08_ChineseLessonWorksheet4,
  Slide08_ChineseLessonWorksheet5,
  Slide10_MathScaffoldTitle,
  Slide10_MathScaffold1,
  Slide10_MathScaffold2,
  Slide10_MathScaffold3,
  Slide10_MathScaffold4,
  Slide10_Practice_ChineseMath,
  Slide11_Part2Header,
  Slide14_WebTool1Title,
  Slide14_WebTool1,
  Slide15_InteractiveMathTitle,
  Slide15_InteractiveMath,
  Slide15_Practice_InteractiveWeb,
  Slide16_EbookTitle,
  Slide16_EbookDualMode,
  Slide16_EbookScenarios,
  Slide16_Practice_Ebook,
  Slide17_Part3Header,
  Slide19_VibePromptStructure,
  Slide20_CommonIssuesHelper,
  Slide20_IterationTakeaway,
  Slide24_RecommendedTools,
  Slide23_ClosingSummary,
  Slide02c_Social,
] satisfies Page[];
