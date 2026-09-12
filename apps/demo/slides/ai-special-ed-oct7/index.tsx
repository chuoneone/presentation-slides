import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useCallback, useEffect, useState } from 'react';
import imgAgendaSchedule from './assets/agenda-schedule.png';
import imgChineseWorksheet from './assets/chinese-worksheet-tool.png';
import imgChineseReading from './assets/chinese-scaffold-reading.png';
import imgChineseTianzi from './assets/chinese-tianzi-grid.png';
import imgChineseQuiz from './assets/chinese-paragraph-quiz.png';
import imgChineseTable from './assets/chinese-structure-table.png';
import imgChineseMatch from './assets/chinese-match-quiz.png';
import imgEnglishHandwriting from './assets/english-handwriting-practice.png';
import imgEnglishInput from './assets/english-input-form.png';
import imgEnglishQuiz from './assets/english-scene-quiz.png';
import imgEnglishStoryboard from './assets/english-storyboard-reading.png';
import imgEnglishSummary from './assets/english-story-summary.png';
import imgGeminiCanvasInput from './assets/gemini-canvas-input.png';
import imgHeadshot from './assets/headshot.png';
import imgHeroTeacher from './assets/hero-teacher.png';
import imgInteractiveStepMath from './assets/interactive-step-math.png';
import imgMathCatalog from './assets/math-ebook-catalog.png';
import imgMathConcept from './assets/math-ebook-concept.png';
import imgMathInputGemini from './assets/math-input-gemini.png';
import imgMathPrint from './assets/math-print-preview.png';
import imgMixerAiPrep from './assets/mixer-ai-prep.png';
import imgMixerShare from './assets/mixer-share.png';
import imgMixerTeaching from './assets/mixer-teaching.png';
import imgWorkshopHomepage from './assets/workshop-homepage.png';
import imgWorkshopSearchResult from './assets/workshop-search-result.png';
import imgTool1 from './assets/工具一.png';

export const design: DesignSystem = {
  palette: { bg: '#f1f5f9', text: '#0f172a', accent: '#6366f1' },
  fonts: {
    display: "'Outfit', 'Noto Sans TC', system-ui, -apple-system, sans-serif",
    body: "'Inter', 'Noto Sans TC', system-ui, -apple-system, sans-serif",
  },
  typeScale: { hero: 150, body: 36 },
  radius: 20,
};

export const transition: SlideTransition = {
  duration: 220,
  exit: {
    duration: 150,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 220,
    delay: 72,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const colors = {
  bg: '#f1f5f9',
  bgGradient:
    'radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.08) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.07) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(14, 165, 233, 0.08) 0px, transparent 50%), #f8fafc',
  text: '#0f172a',
  accent: '#6366f1', // 晶透鳶尾靛紫
  accentMuted: '#e0e7ff',
  orange: '#f43f5e', // 活力霓光珊瑚玫紅
  orangeLight: '#ffe4e6',
  border: 'rgba(255, 255, 255, 0.75)',
  muted: '#64748b',
  white: '#ffffff',
  navy: '#0f172a',
  blue: '#0ea5e9', // 霓光天空青
  blueLight: '#e0f2fe',
  glassBg: 'rgba(255, 255, 255, 0.78)',
  glassBorder: 'rgba(255, 255, 255, 0.85)',
  glassShadow: '0 20px 48px rgba(148, 163, 184, 0.18), 0 4px 12px rgba(99, 102, 241, 0.04)',
} as const;

const toolUrls = {
  iep: 'https://spedmix.pages.dev/IEP',
  chineseLessonWorksheet: 'https://spedmix.pages.dev/chinese-lesson-worksheet',
  chineseLessonGemini: 'https://share.gemini.google/foQvUX81Eqzh',
  mathScaffold: 'https://spedmix.pages.dev/math-scaffold',
  mathScaffoldGemini: 'https://gemini.google.com/gem/1sw8yM0nrQC-kenKUSqeB-eqzcMyF_zQI?usp=sharing',
  englishWorksheet: 'https://spedmix.pages.dev/special-ed-english-worksheet',
  englishWorksheetGemini: 'https://share.gemini.google/ZFGGl35CNHVH',
  unscramble: 'https://spedmix.pages.dev/unscramble',
  interactiveMathInput:
    'https://gemini.google.com/gem/1FnYQ8WhRcj8dQQOUi6U9U44g04HMB-Mi?usp=sharing',
  interactiveMathClick:
    'https://gemini.google.com/gem/1-lMnqRSy2m4LGg2hXYujN3uWEPjIloiG?usp=sharing',
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
@keyframes es-fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.es-fadeUp {
  animation: es-fadeUp 0.42s cubic-bezier(0, 0, 0.2, 1) both;
  will-change: transform, opacity;
}
@media (prefers-reduced-motion: reduce) {
  .es-fadeUp {
    animation-duration: 0.01ms;
    animation-delay: 0ms !important;
  }
}
`;

const TextbookBg = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      border: '14px solid rgba(255, 255, 255, 0.7)',
      background: 'transparent',
      overflow: 'hidden',
      pointerEvents: 'none',
    }}
  >
    {/* 微光玻璃發光球體 */}
    <div
      style={{
        position: 'absolute',
        top: '-15%',
        right: '-8%',
        width: 680,
        height: 680,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.08) 50%, transparent 70%)',
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
          'radial-gradient(circle, rgba(14, 165, 233, 0.14) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 70%)',
        filter: 'blur(60px)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.45,
        backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.45) 1.2px, transparent 1.2px)',
        backgroundSize: '28px 28px',
      }}
    />
    <style>{keyframes}</style>
  </div>
);

const TextbookFooter = ({ subtitle }: { subtitle?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <footer
      style={{
        position: 'absolute',
        bottom: 34,
        left: 120,
        right: 120,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(203, 213, 225, 0.6)',
        paddingTop: 16,
        fontSize: '24px',
        color: colors.muted,
        fontWeight: 700,
        zIndex: 10,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span
          style={{
            background: 'linear-gradient(90deg, #6366f1, #0ea5e9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 950,
          }}
        >
          特教教師的AI工作流
        </span>
        <span style={{ color: '#cbd5e1' }}>·</span>
        <span style={{ color: colors.muted, fontWeight: 750 }}>
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
        <span style={{ fontSize: '20px', color: '#94a3b8' }}>PAGE</span>
        <span
          style={{
            padding: '2px 10px',
            background: 'rgba(99, 102, 241, 0.1)',
            color: colors.accent,
            borderRadius: 6,
            fontWeight: 950,
            fontSize: '26px',
          }}
        >
          {String(current).padStart(2, '0')}
        </span>
        <span style={{ color: '#cbd5e1' }}>/</span>
        <span style={{ color: '#64748b' }}>{String(total).padStart(2, '0')}</span>
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
          background: 'rgba(99, 102, 241, 0.1)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          padding: '6px 20px',
          borderRadius: 10,
          boxShadow: '0 2px 8px rgba(99, 102, 241, 0.08)',
        }}
      >
        {unit}
      </span>
      {subtitle && (
        <span style={{ color: colors.muted, fontSize: '26px', fontWeight: 700 }}>{subtitle}</span>
      )}
    </div>
    <h2
      style={{ fontSize: '80px', fontWeight: 900, margin: '8px 0 0 0', color: colors.text, letterSpacing: '-0.02em', lineHeight: 1.15 }}
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
}) => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <TextbookBg />

    {/* 微光球體 */}
    <div
      style={{
        position: 'absolute',
        width: 850,
        height: 850,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(244, 63, 94, 0.06) 45%, transparent 70%)',
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
        color: colors.accent,
        opacity: 0.05,
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
          color: colors.orange,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          padding: '10px 32px',
          borderRadius: 999,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: 32,
          boxShadow: '0 8px 24px rgba(244, 63, 94, 0.12)',
        }}
      >
        <span>PART 0{partNum}</span>
        <span>·</span>
        <span>{time}</span>
      </div>

      <h2
        style={{
          fontSize: '80px',
          fontWeight: 950,
          color: colors.text,
          margin: '0 0 28px 0',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          whiteSpace: 'pre-line',
        }}
      >
        {title}
      </h2>

      <p
        style={{
          fontSize: '40px',
          color: colors.muted,
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
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: 999,
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          boxShadow: '0 18px 44px rgba(148, 163, 184, 0.18)',
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
                color: isActive ? colors.orange : isPassed ? colors.accent : colors.muted,
                fontSize: '28px',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: isActive
                    ? 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)'
                    : isPassed
                      ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                      : '#cbd5e1',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: 950,
                  boxShadow: isActive ? '0 4px 12px rgba(244, 63, 94, 0.3)' : 'none',
                }}
              >
                {isPassed ? '✓' : item.num}
              </div>
              <span>{item.name}</span>
              {item.num < 3 && <span style={{ color: '#cbd5e1', marginLeft: 20 }}>➔</span>}
            </div>
          );
        })}
      </div>
    </div>
    <TextbookFooter subtitle={`PART 0${partNum}`} />
  </div>
);

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
          boxShadow:
            '0 24px 60px rgba(15, 23, 42, 0.28), 0 0 48px rgba(244, 63, 94, 0.22)',
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
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#fb923c" />
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
              color: isRunning ? '#fed7aa' : isFinished ? colors.orange : 'rgba(255, 255, 255, 0.75)',
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
            background: isRunning
              ? '#fed7aa'
              : 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
            color: isRunning ? colors.navy : colors.white,
            border: 'none',
            borderRadius: 16,
            fontSize: '24px',
            fontWeight: 950,
            cursor: 'pointer',
            boxShadow: '0 8px 26px rgba(244, 63, 94, 0.38)',
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
  linkText = '🚀 開始實作',
}: {
  num: string;
  toolName: string;
  time?: string;
  desc?: string;
  task?: string;
  steps?: string[];
  href?: string;
  linkText?: string;
}) => {
  const minNum = Number.parseInt(time, 10) || 10;
  const practiceLabel = `實作 ${num}`;
  const taskText = task || desc || `請利用${toolName}，試做教材練習。`;

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
            background: 'rgba(244, 63, 94, 0.12)',
            color: colors.orange,
            fontSize: '22px',
            fontWeight: 900,
            letterSpacing: '0.08em',
            marginBottom: 8,
          }}
        >
          <span>⏱️ {practiceLabel} · 課堂實作 {time}</span>
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
            fontSize: '40px',
            fontWeight: 850,
            color: colors.text,
            lineHeight: 1.45,
          }}
        >
          {taskText}
        </div>

        {href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
              color: colors.white,
              padding: '14px 46px',
              borderRadius: 18,
              fontSize: '32px',
              fontWeight: 950,
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(244, 63, 94, 0.35)',
              letterSpacing: '0.04em',
              transition: 'transform 0.15s ease',
            }}
          >
            <span>{linkText}</span>
            <span style={{ fontSize: '28px' }}>➔</span>
          </a>
        )}
      </div>

      <TextbookFooter subtitle={`實作時間：${toolName}`} />
    </div>
  );
};

const AdminDocCard = ({
  num,
  title,
  accent = colors.accent,
  children,
  href,
  delay = 0,
}: {
  num: string;
  title: string;
  accent?: string;
  children: ReactNode;
  href?: string;
  delay?: number;
}) => {
  const content = (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: accent,
            color: colors.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: 950,
            fontFamily: 'var(--osd-font-display)',
          }}
        >
          {num}
        </div>
        <h3
          style={{
            margin: 0,
            fontSize: '52px',
            lineHeight: 1.15,
            fontWeight: 900,
            color: colors.text,
            fontFamily: 'var(--osd-font-display)',
          }}
        >
          {title}
        </h3>
      </div>
      <div
        style={{
          fontSize: '36px',
          lineHeight: 1.5,
          color: colors.text,
          fontWeight: 550,
          textAlign: 'left',
        }}
      >
        {children}
      </div>
      {href && (
        <div
          style={{
            marginTop: 10,
            alignSelf: 'flex-start',
            color: accent,
            fontSize: '28px',
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>傳送門連結 ➔</span>
          <span style={{ fontSize: '22px', opacity: 0.8 }}>{href}</span>
        </div>
      )}
    </>
  );

  const cardStyle: CSSProperties = {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(16px)',
    border: '1.5px solid rgba(255, 255, 255, 0.9)',
    borderTop: `8px solid ${accent}`,
    borderRadius: 24,
    padding: '30px 38px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 18,
    boxShadow: '0 22px 48px rgba(148, 163, 184, 0.16)',
    animationDelay: `${delay}s`,
    textDecoration: 'none',
    color: colors.text,
    cursor: href ? 'pointer' : 'default',
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="es-fadeUp" style={cardStyle}>
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

const Unit2Card = ({
  num,
  title,
  children,
  delay = 0,
  accent = colors.accent,
  style,
}: {
  num?: string;
  title: string;
  children?: ReactNode;
  delay?: number;
  accent?: string;
  style?: CSSProperties;
}) => (
  <div
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: 'rgba(255, 255, 255, 0.90)',
      backdropFilter: 'blur(16px)',
      border: `1.5px solid rgba(255, 255, 255, 0.95)`,
      borderLeft: `8px solid ${accent}`,
      borderRadius: 20,
      padding: children ? '20px 28px' : '22px 28px',
      boxShadow: '0 12px 32px rgba(148, 163, 184, 0.14)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: children ? 12 : 0,
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'left',
      ...style,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {num && (
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background:
              accent === colors.accent ? 'rgba(99, 102, 241, 0.12)' : 'rgba(244, 63, 94, 0.12)',
            color: accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--osd-font-display)',
            fontSize: '26px',
            fontWeight: 950,
            flexShrink: 0,
            boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.8)',
          }}
        >
          {num}
        </div>
      )}
      <h3
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: '40px',
          fontWeight: 900,
          color: colors.text,
          lineHeight: 1.25,
        }}
      >
        {title}
      </h3>
    </div>
    {children && (
      <div
        style={{
          fontSize: '30px',
          lineHeight: 1.45,
          color: colors.muted,
          fontWeight: 650,
          textAlign: 'left',
        }}
      >
        {children}
      </div>
    )}
  </div>
);

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
      boxShadow: '0 24px 60px rgba(148, 163, 184, 0.22), 0 4px 16px rgba(99, 102, 241, 0.08)',
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
        background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        fontSize: '22px',
        fontWeight: 900,
        letterSpacing: '0.02em',
        boxShadow: '0 2px 10px rgba(99, 102, 241, 0.25)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', gap: 7 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.85)' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.55)' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.55)' }} />
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

const ToolBullet = ({
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
      gridTemplateColumns: '58px 1fr',
      gap: 16,
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.86)',
      backdropFilter: 'blur(12px)',
      border: '1.5px solid rgba(255, 255, 255, 0.9)',
      borderLeft: `7px solid ${accent}`,
      borderRadius: 20,
      padding: '18px 22px 18px 18px',
      boxShadow: '0 12px 28px rgba(148, 163, 184, 0.12)',
    }}
  >
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: 999,
        background: 'rgba(255, 255, 255, 0.95)',
        color: accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 900,
        fontFamily: 'var(--osd-font-display)',
        border: `1.5px solid ${accent === colors.accent ? 'rgba(99, 102, 241, 0.25)' : 'rgba(244, 63, 94, 0.25)'}`,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)',
      }}
    >
      {num}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left' }}>
      <div style={{ fontSize: '32px', fontWeight: 900, color: colors.text, lineHeight: 1.2 }}>
        {title}
      </div>
      <div style={{ fontSize: '26px', lineHeight: 1.42, color: colors.muted, fontWeight: 650 }}>
        {children}
      </div>
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
          accent === colors.accent ? 'rgba(99, 102, 241, 0.12)' : 'rgba(244, 63, 94, 0.12)',
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
      gridTemplateRows: '250px 1fr',
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
    <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr auto', gap: 12, padding: 24 }}>
      <div
        style={{
          width: 'fit-content',
          background:
            accent === colors.accent ? 'rgba(99, 102, 241, 0.12)' : 'rgba(244, 63, 94, 0.12)',
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
          background: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 10,
          padding: '12px 14px',
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
const Slide01_Title: Page = () => (
  <div
    style={{
      ...fill,
      padding: 0,
      position: 'relative',
      overflow: 'hidden',
      background: '#ffffff',
    }}
  >
    {/* 柔和幾何有機雲朵背景 (精準呼應參考圖 #edf2f4 雲朵光斑) */}
    <div
      style={{
        position: 'absolute',
        top: '-12%',
        left: '-8%',
        width: 650,
        height: 520,
        borderRadius: '50% 60% 40% 70% / 60% 50% 60% 40%',
        background: '#edf2f4',
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '-15%',
        left: '42%',
        width: 600,
        height: 380,
        borderRadius: '40% 60% 50% 50% / 50% 40% 60% 50%',
        background: '#edf2f4',
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: '-15%',
        right: '12%',
        width: 650,
        height: 480,
        borderRadius: '60% 40% 70% 40% / 50% 60% 40% 60%',
        background: '#edf2f4',
        pointerEvents: 'none',
      }}
    />

    {/* 右上角年份：2026 (呼應參考圖右上角醒目字樣) */}
    <div
      style={{
        position: 'absolute',
        top: 75,
        right: 80,
        fontSize: '68px',
        fontWeight: 950,
        color: '#0f172a',
        fontFamily: 'var(--osd-font-display)',
        lineHeight: 1,
        letterSpacing: '0.02em',
        zIndex: 2,
      }}
    >
      2026
    </div>

    {/* 右側：巨型活力標題與資訊欄 (依指示再往右下一點，與人物拉開舒適呼吸空間並完美垂直居中) */}
    <div
      className="es-fadeUp"
      style={{
        animationDelay: '0.1s',
        position: 'absolute',
        left: '52.5%',
        right: '40px',
        top: 225,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        zIndex: 5,
      }}
    >
      {/* 巨幅亮黃斜角標籤塊 (模仿 STAY FOCUSED 大黃色長條) */}
      <div style={{ marginBottom: 6 }}>
        <div
          style={{
            display: 'inline-block',
            background: '#f8b337',
            color: '#0f172a',
            padding: '16px 44px',
            borderRadius: 6,
            transform: 'rotate(-2.4deg)',
            fontSize: '76px',
            fontWeight: 950,
            letterSpacing: '0.04em',
            boxShadow: '0 12px 32px rgba(248, 179, 55, 0.36)',
            lineHeight: 1.05,
          }}
        >
          從使用 AI 到打造 AI
        </div>
      </div>

      {/* 巨型粗黑大標 (模仿 AT WORK 150px 超強視覺震撼) */}
      <h1
        style={{
          fontSize: '108px',
          fontWeight: 950,
          color: '#0f172a',
          margin: '8px 0 16px 0',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
        }}
      >
        <>
          <span style={{ display: 'block' }}>特教教師的</span>
          <span style={{ display: 'block' }}>教學工作流革命</span>
        </>
      </h1>

      {/* 副標題 */}
      <p
        style={{
          fontSize: '44px',
          fontWeight: 900,
          color: '#1e293b',
          margin: '0 0 34px 0',
          lineHeight: 1.3,
          letterSpacing: '0.02em',
        }}
      >
        教學應用與自製工具實作
      </p>

      {/* 講者膠囊 (模仿 Warner & Spencer 飽滿紫藍大膠囊) */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
          background: '#5b72ce',
          color: '#ffffff',
          borderRadius: 999,
          padding: '16px 52px',
          fontSize: '40px',
          fontWeight: 950,
          letterSpacing: '0.06em',
          boxShadow: '0 14px 32px rgba(91, 114, 206, 0.38)',
        }}
      >
        <span>主講人 ‧ 朱旆誼</span>
      </div>
    </div>

    {/* 左側：巨幅滿版插畫 (已去背裁切，左下零邊距完全貼齊) */}
    <div
      className="es-fadeUp"
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: '820px',
        width: '915px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <img
        src={imgHeroTeacher}
        alt="特教教師備課與AI工作流"
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'contain',
          objectPosition: 'bottom left',
          filter: 'drop-shadow(24px 24px 44px rgba(15, 23, 42, 0.14))',
        }}
      />
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
          國中特教教師
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
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', minHeight: 0 }}
          />
        </div>
        <div
          className="es-fadeUp"
          style={{
            animationDelay: '0.25s',
            background: colors.white,
            border: '2px solid #dbe4ee',
            borderRadius: 20,
            padding: '12px 14px',
            boxShadow: '0 12px 28px rgba(148, 163, 184, 0.12)',
            overflow: 'hidden',
            height: '100%',
            minHeight: 0,
            boxSizing: 'border-box',
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
    <TextbookHeader title="追蹤我，我會很開心" subtitle="社群入口" unit="單元 1" />
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
    <TextbookFooter subtitle="社群連結" />
  </div>
);

// Slide 05: 米克師相關網站 (直接複製 special-ed-ai-optimized 第 5 頁)
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

// SVG 1: 紙本 (Folder + Paper + Checkmark)
const SvgPaperIcon = () => (
  <svg width="130" height="110" viewBox="0 0 130 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 26C14 20.4772 18.4772 16 24 16H48L58 26H106C111.523 26 116 30.4772 116 36V88C116 93.5228 111.523 98 106 98H24C18.4772 98 14 93.5228 14 88V26Z" fill="#2563eb" />
    <rect x="24" y="24" width="82" height="60" rx="8" fill="#ffffff" />
    <rect x="34" y="36" width="38" height="6" rx="3" fill="#cbd5e1" />
    <rect x="34" y="48" width="62" height="6" rx="3" fill="#e2e8f0" />
    <rect x="34" y="60" width="48" height="6" rx="3" fill="#e2e8f0" />
    <path d="M14 42C14 36.4772 18.4772 32 24 32H106C111.523 32 116 36.4772 116 42V88C116 93.5228 111.523 98 106 98H24C18.4772 98 14 93.5228 14 88V42Z" fill="#3b82f6" />
    <path d="M26 80C32 76 38 84 44 80C50 76 56 84 62 80" stroke="#93c5fd" strokeWidth="4" strokeLinecap="round" />
    <circle cx="96" cy="74" r="21" fill="#22c55e" />
    <circle cx="96" cy="74" r="19" stroke="#ffffff" strokeWidth="2.5" />
    <path d="M88 74L93.5 79.5L104 69" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// SVG 2: 數位 (Head Silhouette + Split Brain + Arrow)
const SvgDigitalIcon = () => (
  <svg width="130" height="110" viewBox="0 0 130 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 74L24 60L18 56L34 48L32 66L26 62L16 76H14Z" fill="#ef4444" />
    <path d="M42 96V78C42 78 40 76 38 72C36 68 36 62 38 60C34 56 34 46 36 40C38 34 44 26 56 22C68 18 84 20 92 28C100 36 102 48 100 58C98 68 96 72 96 72L106 73C108 73 110 75 109 77L104 84C102 87 104 90 102 96H42Z" fill="#f59e0b" />
    <path d="M60 26C54 26 48 32 48 40C48 44 50 48 48 52C46 56 46 62 50 66C54 70 60 70 62 70V26H60Z" fill="#3b82f6" />
    <circle cx="55" cy="38" r="3" fill="#93c5fd" />
    <circle cx="53" cy="54" r="3" fill="#93c5fd" />
    <path d="M66 26C72 26 78 30 80 38C82 44 80 48 82 52C84 56 84 62 80 66C76 70 70 70 66 70V26Z" fill="#ef4444" />
    <circle cx="73" cy="38" r="3" fill="#fca5a5" />
    <circle cx="75" cy="54" r="3" fill="#fca5a5" />
    <line x1="64" y1="24" x2="64" y2="72" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// SVG 3: 自製 AI 工具 (Developer with Headset & Laptop)
const SvgAiToolIcon = () => (
  <svg width="130" height="110" viewBox="0 0 130 110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="86" width="100" height="10" rx="3" fill="#b45309" />
    <rect x="25" y="96" width="80" height="6" rx="2" fill="#92400e" />
    <circle cx="65" cy="38" r="16" fill="#fed7aa" />
    <path d="M50 36C50 26 56 22 65 22C74 22 80 26 80 36C80 38 78 38 78 35C74 33 70 33 65 33C60 33 56 33 52 35C52 38 50 38 50 36Z" fill="#451a03" />
    <path d="M48 38C48 26 55 20 65 20C75 20 82 26 82 38" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
    <rect x="45" y="34" width="6" height="12" rx="3" fill="#f97316" />
    <rect x="79" y="34" width="6" height="12" rx="3" fill="#f97316" />
    <path d="M82 42L86 48H80" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M42 86C42 66 48 58 65 58C82 58 88 66 88 86H42Z" fill="#3b82f6" />
    <path d="M58 58L65 68L72 58" fill="#fed7aa" />
    <rect x="46" y="66" width="38" height="22" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
    <circle cx="65" cy="77" r="3" fill="#60a5fa" />
    <rect x="42" y="86" width="46" height="3" rx="1.5" fill="#475569" />
  </svg>
);

// Slide 03: 今日大綱 (亮色微光玻璃擬態、清爽大氣、三大核心實踐)
const Slide03_Agenda: Page = () => (
  <div style={{ ...fill, padding: '54px 108px 90px 108px' }}>
    <TextbookBg />

    {/* 左上角懸掛書籤／盾牌標籤 (清爽亮色微光質感) */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 108,
        width: 136,
        height: 156,
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1.5px solid rgba(255, 255, 255, 0.95)',
        borderTop: 'none',
        borderRadius: '0 0 46px 46px',
        boxShadow: '0 14px 32px rgba(148, 163, 184, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16,
        zIndex: 10,
      }}
    >
      <span
        style={{
          fontSize: '64px',
          fontWeight: 950,
          color: colors.accent,
          fontFamily: 'var(--osd-font-display)',
          lineHeight: 1,
        }}
      >
        03
      </span>
      <span
        style={{
          fontSize: '18px',
          fontWeight: 900,
          color: colors.muted,
          letterSpacing: '0.12em',
          marginTop: 6,
        }}
      >
        大綱
      </span>
    </div>

    {/* 標題區域：80 號字大標 + 40 號字副標 */}
    <div
      style={{
        marginLeft: 170,
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2,
      }}
    >
      <h2
        style={{
          fontSize: '80px',
          fontWeight: 950,
          color: colors.text,
          margin: 0,
          lineHeight: 1.15,
          fontFamily: 'var(--osd-font-display)',
        }}
      >
        特教教師的 AI 工作流
      </h2>
      <div
        style={{
          fontSize: '40px',
          fontWeight: 800,
          color: colors.muted,
          marginTop: 10,
        }}
      >
        今日研習大綱 ‧ 三大核心實踐
      </div>
    </div>

    {/* 三大直立圓角柱卡片 (清爽亮色微光玻璃擬態，高 520px) */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
        zIndex: 2,
        margin: 'auto 0',
        alignItems: 'center',
      }}
    >
      {/* 卡片 1: 行政與教材備課 + 紙本小藥丸 */}
      <div
        className="es-fadeUp"
        style={{
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.accent}`,
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          borderRadius: 24,
          padding: '22px 22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'center',
          height: '520px',
          boxSizing: 'border-box',
        }}
      >
        {/* 上部：PART 標籤 + 時間 + SVG 插圖 */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontSize: '28px',
                fontWeight: 950,
                color: colors.accent,
                fontFamily: 'var(--osd-font-display)',
              }}
            >
              PART 01
            </span>
            <span
              style={{
                background: 'rgba(99, 102, 241, 0.1)',
                color: colors.accent,
                borderRadius: 999,
                padding: '3px 14px',
                fontSize: '20px',
                fontWeight: 900,
              }}
            >
              14:00 - 14:50
            </span>
          </div>

          <div style={{ height: 84, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2px 0' }}>
            <SvgPaperIcon />
          </div>
        </div>

        {/* 中部：原標題 + 紙本小藥丸補充 + 次標 */}
        <div style={{ margin: '4px 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 6,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: '38px',
                fontWeight: 950,
                color: colors.text,
                lineHeight: 1.2,
              }}
            >
              行政與教材備課
            </h3>
            <span
              style={{
                background: 'rgba(99, 102, 241, 0.12)',
                color: colors.accent,
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: 999,
                padding: '3px 12px',
                fontSize: '19px',
                fontWeight: 900,
                whiteSpace: 'nowrap',
              }}
            >
              紙本
            </span>
          </div>
          <div style={{ fontSize: '24px', color: colors.muted, fontWeight: 700 }}>
            先求快速產出第一版
          </div>
        </div>

        {/* 下部：兩大具體列點 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['🎯 IEP 目標生成器', '📝 國英數簡化學習單'].map((t) => (
            <div
              key={t}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                borderRadius: 16,
                padding: '13px 12px',
                fontSize: '28px',
                fontWeight: 900,
                color: colors.text,
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(148, 163, 184, 0.08)',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* 卡片 2: 自製互動教學網頁 + 數位小藥丸 */}
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.12s',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.orange}`,
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          borderRadius: 24,
          padding: '22px 22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'center',
          height: '520px',
          boxSizing: 'border-box',
        }}
      >
        {/* 上部：PART 標籤 + 時間 + SVG 插圖 */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontSize: '28px',
                fontWeight: 950,
                color: colors.orange,
                fontFamily: 'var(--osd-font-display)',
              }}
            >
              PART 02
            </span>
            <span
              style={{
                background: 'rgba(244, 63, 94, 0.1)',
                color: colors.orange,
                borderRadius: 999,
                padding: '3px 14px',
                fontSize: '20px',
                fontWeight: 900,
              }}
            >
              14:50 - 15:40
            </span>
          </div>

          <div style={{ height: 84, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2px 0' }}>
            <SvgDigitalIcon />
          </div>
        </div>

        {/* 中部：原標題 + 數位小藥丸補充 + 次標 */}
        <div style={{ margin: '4px 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 6,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: '38px',
                fontWeight: 950,
                color: colors.text,
                lineHeight: 1.2,
              }}
            >
              自製互動教學網頁
            </h3>
            <span
              style={{
                background: 'rgba(244, 63, 94, 0.12)',
                color: colors.orange,
                border: '1px solid rgba(244, 63, 94, 0.25)',
                borderRadius: 999,
                padding: '3px 12px',
                fontSize: '19px',
                fontWeight: 900,
                whiteSpace: 'nowrap',
              }}
            >
              數位
            </span>
          </div>
          <div style={{ fontSize: '24px', color: colors.muted, fontWeight: 700 }}>
            打造適性特教學習鷹架
          </div>
        </div>

        {/* 下部：兩大具體列點 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['🧩 句型排列重組', '💻 互動步驟數學'].map((t) => (
            <div
              key={t}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                borderRadius: 16,
                padding: '13px 12px',
                fontSize: '28px',
                fontWeight: 900,
                color: colors.text,
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(148, 163, 184, 0.08)',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* 卡片 3: 自製 AI 工具實作 + 自製 AI 小藥丸 */}
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.24s',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.blue}`,
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          borderRadius: 24,
          padding: '22px 22px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'center',
          height: '520px',
          boxSizing: 'border-box',
        }}
      >
        {/* 上部：PART 標籤 + 時間 + SVG 插圖 */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontSize: '28px',
                fontWeight: 950,
                color: colors.blue,
                fontFamily: 'var(--osd-font-display)',
              }}
            >
              PART 03
            </span>
            <span
              style={{
                background: 'rgba(14, 165, 233, 0.1)',
                color: colors.blue,
                borderRadius: 999,
                padding: '3px 14px',
                fontSize: '20px',
                fontWeight: 900,
              }}
            >
              15:40 - 16:30
            </span>
          </div>

          <div style={{ height: 84, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2px 0' }}>
            <SvgAiToolIcon />
          </div>
        </div>

        {/* 中部：原標題 + 自製 AI 小藥丸補充 + 次標 */}
        <div style={{ margin: '4px 0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap',
              marginBottom: 6,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: '38px',
                fontWeight: 950,
                color: colors.text,
                lineHeight: 1.2,
              }}
            >
              自製 AI 工具實作
            </h3>
            <span
              style={{
                background: 'rgba(14, 165, 233, 0.12)',
                color: colors.blue,
                border: '1px solid rgba(14, 165, 233, 0.25)',
                borderRadius: 999,
                padding: '3px 12px',
                fontSize: '19px',
                fontWeight: 900,
                whiteSpace: 'nowrap',
              }}
            >
              自製 AI
            </span>
          </div>
          <div style={{ fontSize: '24px', color: colors.muted, fontWeight: 700 }}>
            Canvas 打造專屬工具
          </div>
        </div>

        {/* 下部：兩大具體列點 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['💬 Vibe Coding 咒語', '🛠️ Canvas 出題助手'].map((t) => (
            <div
              key={t}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                borderRadius: 16,
                padding: '13px 12px',
                fontSize: '28px',
                fontWeight: 900,
                color: colors.text,
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(148, 163, 184, 0.08)',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="今日課程大綱" />
  </div>
);

// Slide 07: PART 1 過渡頁
const Slide04_Part1Header: Page = () => (
  <PartHeaderPage
    partNum="1"
    time="14:00~14:50"
    title={'行政減負與教材備課\n實例分享'}
    desc="IEP 行政目標生成 ＋ 國英數適性課堂學習單，AI 快速產出第一版，老師回歸個別化微調"
  />
);

// Slide 08: IEP 目標生成器 (微光玻璃擬態大卡)
const Slide05_AdminIep: Page = () => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <TextbookBg />

    {/* 微光球體 */}
    <div
      style={{
        position: 'absolute',
        width: 800,
        height: 800,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, rgba(244, 63, 94, 0.05) 50%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }}
    />

    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        maxWidth: 1480,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(255, 255, 255, 0.95)',
        borderRadius: 32,
        padding: '54px 64px',
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
          background: 'rgba(99, 102, 241, 0.1)',
          padding: '10px 32px',
          borderRadius: 999,
          letterSpacing: '0.12em',
          marginBottom: 32,
          border: '1px solid rgba(99, 102, 241, 0.2)',
        }}
      >
        <span>🎯 行政文書神器</span>
      </div>
      <h1
        style={{
          fontSize: '80px',
          fontWeight: 950,
          color: colors.text,
          margin: '0 0 24px 0',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
        }}
      >
        IEP 目標生成器
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginBottom: 36,
          textAlign: 'left',
          maxWidth: 1040,
          width: '100%',
          background: 'rgba(255, 255, 255, 0.85)',
          borderRadius: 22,
          padding: '28px 36px',
          border: '1px solid rgba(226, 232, 240, 0.8)',
        }}
      >
        {[
          '貼入起點行為現況',
          '一秒生成標準目標',
        ].map((pt, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: '40px',
              fontWeight: 850,
              color: colors.text,
              lineHeight: 1.4,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: colors.orange,
                color: colors.white,
                fontSize: '22px',
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              ✓
            </span>
            <span>{pt}</span>
          </div>
        ))}
      </div>
      <a
        href={toolUrls.iep}
        target="_blank"
        rel="noreferrer"
        className="es-fadeUp"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 18,
          background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
          color: colors.white,
          padding: '22px 64px',
          borderRadius: 22,
          fontSize: '42px',
          fontWeight: 950,
          textDecoration: 'none',
          boxShadow: '0 18px 42px rgba(244, 63, 94, 0.35)',
          letterSpacing: '0.04em',
          transition: 'transform 0.15s ease',
        }}
      >
        <span>🚀 開始使用</span>
        <span style={{ fontSize: '38px' }}>➔</span>
      </a>
    </div>
    <TextbookFooter subtitle="第一部分：IEP 目標生成器" />
  </div>
);

// Slide 09: 實作一︰IEP 目標生成器 (10分鐘實作)
const Slide06_Practice_IEP: Page = () => (
  <PracticePage
    num="01"
    toolName="IEP 目標生成器"
    time="10 分鐘"
    task="請利用 IEP 目標生成器，輸入學生現況試做一組教育目標。"
    href={toolUrls.iep}
    linkText="🚀 前往使用"
  />
);

const MinimalToolSlide = ({
  unit,
  title,
  subtitle,
  children,
  points,
  btnHref,
  btnText = '🚀 開始使用',
  imgSrc,
  imgAlt,
  frameLabel,
}: {
  unit: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  points?: string[];
  btnHref?: string;
  btnText?: string;
  imgSrc: string;
  imgAlt: string;
  frameLabel: string;
}) => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader unit={unit} title={title} subtitle={subtitle} />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.94fr 1.06fr',
        gap: 36,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        height: 560,
        maxHeight: 560,
        alignItems: 'stretch',
      }}
    >
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
        {/* 頂部功能分類與副標籤 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(244, 63, 94, 0.1) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.22)',
              padding: '6px 16px',
              borderRadius: 20,
              fontSize: '22px',
              fontWeight: 900,
              color: colors.indigo,
              letterSpacing: '0.02em',
            }}
          >
            <span>✨ 特教鷹架核心亮點</span>
          </div>
          {subtitle && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(244, 63, 94, 0.08)',
                color: colors.orange,
                border: '1px solid rgba(244, 63, 94, 0.2)',
                padding: '6px 14px',
                borderRadius: 14,
                fontSize: '20px',
                fontWeight: 850,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* 核心卡片內容區 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1, justifyContent: 'center', margin: '12px 0' }}>
          {children && (
            <div
              style={{
                fontSize: '34px',
                lineHeight: 1.4,
                fontWeight: 850,
                color: colors.text,
                padding: '4px 2px',
              }}
            >
              {children}
            </div>
          )}

          {points && points.length > 0 && points.map((pt, idx) => {
            const accents = [
              { bg: 'rgba(99, 102, 241, 0.12)', text: '#4f46e5', border: 'rgba(99, 102, 241, 0.25)', num: '01' },
              { bg: 'rgba(244, 63, 94, 0.12)', text: '#e11d48', border: 'rgba(244, 63, 94, 0.25)', num: '02' },
              { bg: 'rgba(14, 165, 233, 0.12)', text: '#0284c7', border: 'rgba(14, 165, 233, 0.25)', num: '03' },
            ];
            const acc = accents[idx % accents.length];
            return (
              <div
                key={idx}
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
                    background: acc.bg,
                    border: `1px solid ${acc.border}`,
                    color: acc.text,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    fontWeight: 950,
                    fontFamily: 'var(--osd-font-display)',
                    flexShrink: 0,
                  }}
                >
                  {acc.num}
                </div>
                <div
                  style={{
                    fontSize: '32px',
                    lineHeight: 1.35,
                    fontWeight: 850,
                    color: colors.text,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {pt}
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部行動呼籲按鈕 或 適性成效提示 */}
        {btnHref ? (
          <a
            href={btnHref}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              background: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
              color: colors.white,
              padding: '16px 28px',
              borderRadius: 16,
              fontSize: '28px',
              fontWeight: 950,
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(244, 63, 94, 0.32)',
              marginTop: 4,
            }}
          >
            <span>{btnText}</span>
            <span style={{ fontSize: '24px' }}>➔</span>
          </a>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: 'linear-gradient(135deg, rgba(241, 245, 249, 0.9) 0%, rgba(248, 250, 252, 0.95) 100%)',
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
              特教適性亮點：降低書寫挫折，提供高結構鷹架支持
            </span>
          </div>
        )}
      </div>

      <ToolScreenshotFrame label={frameLabel} delay={0.15}>
        <img
          src={imgSrc}
          alt={imgAlt}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 14,
            border: '1px solid rgba(203, 213, 225, 0.6)',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
            display: 'block',
          }}
        />
      </ToolScreenshotFrame>
    </div>
    <TextbookFooter subtitle={`第一部分：${title}`} />
  </div>
);

// 工具封面章節頁組件 (工具第一頁：僅展示工具名稱、核心引導、行動按鈕與大截圖，無多餘條列介紹)
const ToolChapterSlide = ({
  unit,
  title,
  subtitle,
  desc,
  btnHref,
  btnText = '🚀 開始使用',
  buttons,
  imgSrc,
  imgAlt,
  frameLabel,
}: {
  unit: string;
  title: string;
  subtitle?: string;
  desc?: string;
  btnHref?: string;
  btnText?: string;
  buttons?: ReactNode;
  imgSrc: string;
  imgAlt: string;
  frameLabel: string;
}) => (
  <div style={fill}>
    <TextbookBg />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.88fr 1.12fr',
        gap: 48,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        height: 600,
        maxHeight: 600,
        alignItems: 'center',
      }}
    >
      {/* 左欄：章節主標區（純粹大器，零多餘列點介紹） */}
      <div
        className="es-fadeUp"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 24,
          paddingLeft: 8,
        }}
      >
        {/* 單元分類與標籤 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span
            style={{
              color: colors.accent,
              fontFamily: 'var(--osd-font-display)',
              fontWeight: 900,
              fontSize: '26px',
              letterSpacing: '0.08em',
              background: 'rgba(99, 102, 241, 0.1)',
              backdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(99, 102, 241, 0.25)',
              padding: '8px 24px',
              borderRadius: 14,
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.08)',
            }}
          >
            {unit}
          </span>
          {subtitle && (
            <span
              style={{
                color: colors.orange,
                background: 'rgba(244, 63, 94, 0.08)',
                border: '1.5px solid rgba(244, 63, 94, 0.2)',
                padding: '8px 20px',
                borderRadius: 14,
                fontSize: '24px',
                fontWeight: 850,
              }}
            >
              {subtitle}
            </span>
          )}
        </div>

        {/* 巨幅工具名稱（章節主標） */}
        <h1
          style={{
            fontSize: '84px',
            fontWeight: 950,
            margin: '4px 0 0 0',
            color: colors.text,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
          }}
        >
          {title}
        </h1>

        {/* 章節定位導引短語 */}
        {desc && (
          <p
            style={{
              fontSize: '32px',
              color: colors.muted,
              fontWeight: 700,
              lineHeight: 1.45,
              margin: '0',
              maxWidth: 580,
            }}
          >
            {desc}
          </p>
        )}

        {/* 行動按鈕 */}
        {buttons ? (
          <div style={{ marginTop: 12 }}>{buttons}</div>
        ) : btnHref ? (
          <div style={{ marginTop: 12 }}>
            <a
              href={btnHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 16,
                background: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
                color: colors.white,
                padding: '20px 48px',
                borderRadius: 20,
                fontSize: '32px',
                fontWeight: 950,
                textDecoration: 'none',
                boxShadow: '0 14px 36px rgba(244, 63, 94, 0.38)',
                letterSpacing: '0.02em',
              }}
            >
              <span>{btnText}</span>
              <span style={{ fontSize: '28px' }}>➔</span>
            </a>
          </div>
        ) : null}
      </div>

      {/* 右欄：大尺寸工具截圖展示框 */}
      <ToolScreenshotFrame
        label={frameLabel}
        delay={0.15}
        style={{ height: 600, maxHeight: 600 }}
      >
        <img
          src={imgSrc}
          alt={imgAlt}
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

    <TextbookFooter subtitle={`工具導覽：${title}`} />
  </div>
);

// 國文課堂學習單 1: 工具封面章節頁 (工具名稱 + 截圖 + 按鈕，零多餘列點)
const Slide08_ChineseLessonWorksheet1: Page = () => (
  <ToolChapterSlide
    unit="語文備課"
    title="國文課堂學習單"
    subtitle="雙軌對照"
    desc="原文與易讀雙軌排版，結合情境插圖與唸讀計時檢核"
    btnHref={toolUrls.chineseLessonGemini}
    imgSrc={imgChineseReading}
    imgAlt="課文雙軌對照"
    frameLabel="國文課堂學習單 · 介面全貌"
  />
);

// 國文課堂學習單 2: 田字格與重點精要
const Slide08_ChineseLessonWorksheet2: Page = () => (
  <MinimalToolSlide
    unit="語文備課"
    title="田字格與精要"
    subtitle="手寫鷹架"
    imgSrc={imgChineseTianzi}
    imgAlt="田字格與精要"
    frameLabel="手寫鷹架 · 注音田字格"
    points={[
      '注音田字格生字練寫',
      '段落核心重點精要',
      '降低特教生書寫挫折',
    ]}
  />
);

// 國文課堂學習單 3: 隨段四選一即時檢核
const Slide08_ChineseLessonWorksheet3: Page = () => (
  <MinimalToolSlide
    unit="語文備課"
    title="隨段即時檢核"
    subtitle="隨學隨測"
    imgSrc={imgChineseQuiz}
    imgAlt="隨堂選擇題"
    frameLabel="即時檢核 · 隨堂測驗"
    points={[
      '隨段兩題即時測驗',
      '快速檢核學生理解',
      '低認知負荷隨學隨測',
    ]}
  />
);

// 國文課堂學習單 4: 課文脈絡統整表格
const Slide08_ChineseLessonWorksheet4: Page = () => (
  <MinimalToolSlide
    unit="語文備課"
    title="課文脈絡表格"
    subtitle="結構鷹架"
    imgSrc={imgChineseTable}
    imgAlt="課文脈絡表格"
    frameLabel="結構鷹架 · 脈絡歸納"
    points={[
      '引導式重點歸納表格',
      '文章結構脈絡梳理',
      '培養特教生深層理解',
    ]}
  />
);

// 國文課堂學習單 5: 詞語注釋多元評量
const Slide08_ChineseLessonWorksheet5: Page = () => (
  <MinimalToolSlide
    unit="語文備課"
    title="詞語多元評量"
    subtitle="課後評量"
    btnHref={toolUrls.chineseLessonGemini}
    imgSrc={imgChineseMatch}
    imgAlt="詞語連連看評量"
    frameLabel="多元評量 · 詞語連連看"
    points={[
      '課文詞語注釋連連看',
      '強化生字詞釋義記憶',
      '師生雙版本一鍵印出',
    ]}
  />
);

// 實作二︰國文課堂學習單 (10分鐘實作)
const Slide08_Practice_Chinese: Page = () => (
  <PracticePage
    num="02"
    toolName="國文課堂學習單"
    time="10 分鐘"
    task="請利用國文課堂學習單生成器試做一課課文。"
    href={toolUrls.chineseLessonGemini}
    linkText="🚀 開始實作"
  />
);

// 數學課堂學習單 1: 工具封面章節頁 (工具名稱 + 截圖 + 按鈕，零多餘列點)
const Slide10_MathScaffold1: Page = () => (
  <ToolChapterSlide
    unit="數學備課"
    title="數學簡化學習單"
    subtitle="極簡指令輸入"
    desc="只需輸入題目類型，立即產出階梯漸進式特教解題鷹架"
    btnHref={toolUrls.mathScaffold}
    imgSrc={imgMathInputGemini}
    imgAlt="輸入解一元一次"
    frameLabel="數學簡化學習單 · 介面全貌"
  />
);

// Slide 14: 數學課堂學習單（概念說明 + SVG 圖解：等號魔法橋）
const Slide10_MathScaffold2: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="數學備課"
      title="等號魔法橋概念圖解"
      subtitle="幾何圖解"
    />

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
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(244, 63, 94, 0.1) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.22)',
              padding: '6px 16px',
              borderRadius: 20,
              fontSize: '22px',
              fontWeight: 900,
              color: colors.indigo,
            }}
          >
            <span>💡 幾何視覺化隱喻</span>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(244, 63, 94, 0.08)',
              color: colors.orange,
              border: '1px solid rgba(244, 63, 94, 0.2)',
              padding: '6px 14px',
              borderRadius: 14,
              fontSize: '20px',
              fontWeight: 850,
            }}
          >
            等號魔法橋
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
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.25)',
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
            <span style={{ fontSize: '32px', fontWeight: 850, color: colors.text }}>等號是一座魔法橋</span>
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
                background: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 950,
                flexShrink: 0,
              }}
            >
              ➕
            </div>
            <span style={{ fontSize: '32px', fontWeight: 850, color: colors.text }}>加號過橋變成減號</span>
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
                background: 'rgba(14, 165, 233, 0.12)',
                border: '1px solid rgba(14, 165, 233, 0.25)',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 950,
                flexShrink: 0,
              }}
            >
              ➖
            </div>
            <span style={{ fontSize: '32px', fontWeight: 850, color: colors.text }}>減號過橋變成加號</span>
          </div>
        </div>

        <div>
          <a
            href={toolUrls.mathScaffold}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              background: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
              color: colors.white,
              padding: '16px 28px',
              borderRadius: 16,
              fontSize: '28px',
              fontWeight: 950,
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(244, 63, 94, 0.32)',
            }}
          >
            <span>🚀 開啟電子書體驗</span>
            <span style={{ fontSize: '24px' }}>➔</span>
          </a>
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
          }}
        >
          <svg
            viewBox="0 0 600 290"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="bridgeLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="plusCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#eff6ff" />
                <stop offset="100%" stopColor="#dbeafe" />
              </linearGradient>
              <linearGradient id="minusCircleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff1f2" />
                <stop offset="100%" stopColor="#ffe4e6" />
              </linearGradient>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="6"
                refY="5"
                orient="auto"
              >
                <polygon points="0 1, 10 5, 0 9, 3 5" fill="#f43f5e" />
              </marker>
            </defs>

            {/* 橋身水平軌道 */}
            <line
              x1="70"
              y1="190"
              x2="530"
              y2="190"
              stroke="url(#bridgeLineGrad)"
              strokeWidth="7"
              strokeLinecap="round"
            />

            {/* 左側節點：+ 3 */}
            <g transform="translate(140, 190)">
              <circle r="48" fill="url(#plusCircleGrad)" stroke="#3b82f6" strokeWidth="4.5" />
              <text
                textAnchor="middle"
                dy="14"
                fontSize="40"
                fontWeight="950"
                fill="#1d4ed8"
                fontFamily="var(--osd-font-display), sans-serif"
              >
                + 3
              </text>
            </g>

            {/* 中央橋樑核心：等號魔法橋 */}
            <g transform="translate(300, 190)">
              <rect x="-34" y="26" width="68" height="14" rx="7" fill="#cbd5e1" />
              <circle r="40" fill="#4f46e5" stroke="#ffffff" strokeWidth="4.5" />
              <text
                textAnchor="middle"
                dy="14"
                fontSize="44"
                fontWeight="950"
                fill="#ffffff"
                fontFamily="var(--osd-font-display), sans-serif"
              >
                =
              </text>
              <text
                textAnchor="middle"
                dy="62"
                fontSize="20"
                fontWeight="900"
                fill="#4f46e5"
              >
                魔法橋
              </text>
            </g>

            {/* 右側節點：− 3 */}
            <g transform="translate(460, 190)">
              <circle r="48" fill="url(#minusCircleGrad)" stroke="#f43f5e" strokeWidth="4.5" />
              <text
                textAnchor="middle"
                dy="14"
                fontSize="40"
                fontWeight="950"
                fill="#e11d48"
                fontFamily="var(--osd-font-display), sans-serif"
              >
                − 3
              </text>
            </g>

            {/* 跨越等號的拱形虛線箭頭 */}
            <path
              d="M 160 126 Q 300 24 440 126"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="4.5"
              strokeDasharray="9 6"
              markerEnd="url(#arrowhead)"
            />

            {/* 箭頭上方動態標籤 */}
            <g transform="translate(300, 56)">
              <rect x="-92" y="-22" width="184" height="42" rx="21" fill="#f43f5e" />
              <text
                textAnchor="middle"
                dy="6"
                fontSize="22"
                fontWeight="950"
                fill="#ffffff"
              >
                走過等號變號！
              </text>
            </g>
          </svg>
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
          <span>x <strong style={{ color: '#1d4ed8' }}>+ 3</strong> = 8</span>
          <span style={{ color: '#f43f5e' }}>➔</span>
          <span>x = 8 <strong style={{ color: '#e11d48' }}>− 3</strong></span>
        </div>
      </div>
    </div>

    <TextbookFooter subtitle="第一部分：等號魔法橋概念圖解" />
  </div>
);

// Slide 15: 數學課堂學習單（章節目錄導覽）
const Slide10_MathScaffold3: Page = () => (
  <MinimalToolSlide
    unit="數學備課"
    title="單元章節目錄導覽"
    subtitle="工具列"
    imgSrc={imgMathCatalog}
    imgAlt="單元章節目錄選單"
    frameLabel="浮動工具列：單元章節目錄多頁跳轉"
    points={[
      '單元目錄快速跳轉',
      '階梯式基礎到變形題',
      '螢光筆板書一鍵解答',
    ]}
  />
);

// Slide 16: 數學課堂學習單（一鍵純淨列印）
const Slide10_MathScaffold4: Page = () => (
  <MinimalToolSlide
    unit="數學備課"
    title="一鍵 A4 純淨列印"
    subtitle="純淨排版"
    btnHref={toolUrls.mathScaffold}
    imgSrc={imgMathPrint}
    imgAlt="列印預覽畫面"
    frameLabel="列印預覽：標準 A4 白底作業卷"
    points={[
      '一鍵濾除按鈕與答案',
      '標準無干擾 A4 作業卷',
      '免二次排版直接出紙本',
    ]}
  />
);

// Slide 17: 實作三︰數學課堂學習單 (10分鐘實作)
const Slide10_Practice_Math: Page = () => (
  <PracticePage
    num="03"
    toolName="數學簡化學習單"
    time="10 分鐘"
    task="請利用數學簡化學習單生成器，輸入題目試做一課教材。"
    href={toolUrls.mathScaffold}
    linkText="🚀 開始實作"
  />
);

// 英文課堂學習單 1: 工具封面章節頁 (工具名稱 + 截圖 + 按鈕，零多餘列點)
const Slide09_EnglishWorksheet1: Page = () => (
  <ToolChapterSlide
    unit="英文備課"
    title="英文課堂學習單"
    subtitle="資源班專用"
    desc="貼入課文自動切分情境，聽讀說寫全方位鷹架學習"
    btnHref={toolUrls.englishWorksheet}
    imgSrc={imgEnglishInput}
    imgAlt="設定介面"
    frameLabel="英文課堂學習單 · 介面全貌"
  />
);

// Slide 19: 英文課堂學習單（分鏡圖文閱讀）
const Slide09_EnglishWorksheet2: Page = () => (
  <MinimalToolSlide
    unit="英文備課"
    title="課文分鏡圖文閱讀"
    subtitle="視覺鷹架"
    imgSrc={imgEnglishStoryboard}
    imgAlt="分鏡閱讀畫面"
    frameLabel="分鏡閱讀：圖文對照與單字高亮"
    points={[
      '4:3 全彩情境插圖',
      '大字級關鍵生字高亮',
      '慢速逐句語音朗讀',
    ]}
  />
);

// Slide 20: 英文課堂學習單（四線三格練字）
const Slide09_EnglishWorksheet3: Page = () => (
  <MinimalToolSlide
    unit="英文備課"
    title="四線三格標準練寫"
    subtitle="手寫鷹架"
    imgSrc={imgEnglishHandwriting}
    imgAlt="四線三格單字練寫"
    frameLabel="單字練寫：四線三格＋音節拆解"
    points={[
      '標記紅色第三基準線',
      '音節拆分與灰字描紅',
      '低肌肉張力貼心優化',
    ]}
  />
);

// Slide 21: 英文課堂學習單（隨段即時小測驗）
const Slide09_EnglishWorksheet4: Page = () => (
  <MinimalToolSlide
    unit="英文備課"
    title="隨段場景即時檢核"
    subtitle="隨學隨測"
    imgSrc={imgEnglishQuiz}
    imgAlt="隨段測驗畫面"
    frameLabel="隨段測驗：單字與文法四選一"
    points={[
      '每分鏡 2 題雙軌檢核',
      '免手寫拖曳即時發音',
      '答錯立即語音訂正',
    ]}
  />
);

// Slide 22: 英文課堂學習單（故事順序總結）
const Slide09_EnglishWorksheet5: Page = () => (
  <MinimalToolSlide
    unit="英文備課"
    title="故事順序總結與繪本"
    subtitle="成果整合"
    btnHref={toolUrls.englishWorksheet}
    imgSrc={imgEnglishSummary}
    imgAlt="故事順序總結畫面"
    frameLabel="順序總結：單字提示箱與角色狀態"
    points={[
      'Word Bank 提示箱',
      '四格漫畫情境繪本',
      '師生雙版 Word 匯出',
    ]}
  />
);

// Slide 23: 實作四︰英文課堂學習單生成系統 (10分鐘實作)
const Slide09_Practice_English: Page = () => (
  <PracticePage
    num="04"
    toolName="英文課堂學習單"
    time="10 分鐘"
    task="請利用英文課堂學習單生成器，貼入課文試做一課教材。"
    href={toolUrls.englishWorksheet}
    linkText="🚀 開始實作"
  />
);

// Slide 16: PART 2 過渡頁
const Slide11_Part2Header: Page = () => (
  <PartHeaderPage
    partNum="2"
    time="14:50~15:40"
    title={'自製特教互動網頁\n零程式碼打造學習鷹架'}
    desc="告別枯燥紙本作業！利用點選、步驟拆解、即時回饋與視覺鷹架，打造專屬特教學生的互動教材"
  />
);

// Slide 17: 工具一︰句型排列與語法重組 (工具封面章節頁：工具名稱 + 截圖 + 按鈕，零多餘列點)
const Slide14_WebTool1: Page = () => (
  <ToolChapterSlide
    unit="單元二：自製互動網頁"
    title="句型排列與語法重組"
    subtitle="視覺拖曳 · 語音校對"
    desc="免手寫直覺拖曳操作，支援即時語音朗讀與自我校對訂正"
    btnHref={toolUrls.unscramble}
    btnText="🚀 體驗句型排列工具"
    imgSrc={imgTool1}
    imgAlt="句型排列操作介面"
    frameLabel="句型排列操作介面 (可拖曳/點選)"
  />
);

// Slide 18: 實作五︰句型排列與語法重組 (10分鐘實作)
const Slide14_Practice_Unscramble: Page = () => (
  <PracticePage
    num="05"
    toolName="句型排列與語法重組"
    time="10 分鐘"
    task="請利用句型排列工具，輸入 2~3 個句子試做互動練習。"
    href={toolUrls.unscramble}
    linkText="🚀 開啟句型排列工具"
  />
);

// Slide 19: 工具二︰互動式步驟數學學習單生成器 (工具封面章節頁：工具名稱 + 截圖 + 雙模式按鈕，零多餘列點)
const Slide15_InteractiveMath: Page = () => (
  <ToolChapterSlide
    unit="單元二：自製互動網頁"
    title="互動步驟數學學習單"
    subtitle="步驟拆解 · 即時檢核"
    desc="小步子拆解解題流程，提供逐步填答與點選操作雙軌模式"
    buttons={
      <div style={{ display: 'flex', gap: 16 }}>
        <a
          href={toolUrls.interactiveMathInput}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: colors.accent,
            color: colors.white,
            padding: '18px 32px',
            borderRadius: 18,
            fontSize: '28px',
            fontWeight: 950,
            textDecoration: 'none',
            boxShadow: '0 10px 24px rgba(99, 102, 241, 0.35)',
          }}
        >
          <span>⌨️ 逐步填答型</span>
        </a>
        <a
          href={toolUrls.interactiveMathClick}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: colors.orange,
            color: colors.white,
            padding: '18px 32px',
            borderRadius: 18,
            fontSize: '28px',
            fontWeight: 950,
            textDecoration: 'none',
            boxShadow: '0 10px 24px rgba(244, 63, 94, 0.35)',
          }}
        >
          <span>👆 點選操作型</span>
        </a>
      </div>
    }
    imgSrc={imgInteractiveStepMath}
    imgAlt="步步練互動數學學習單畫面"
    frameLabel="步驟線互動數學 · 介面全貌"
  />
);

// Slide 20: 實作六︰互動式步驟數學學習單生成器 (10分鐘實作)
const Slide15_Practice_StepMath: Page = () => (
  <PracticePage
    num="06"
    toolName="互動式步驟數學學習單"
    time="10 分鐘"
    task="請利用互動步驟數學生成器，輸入題目試做一組題型。"
    href={toolUrls.interactiveMathInput}
    linkText="🚀 開啟逐步填答型生成器"
  />
);

// Slide 21: PART 3 過渡頁 (使用者指定：標題改 Gemini Canvas 教師自製 AI 工具實作)
const Slide17_Part3Header: Page = () => (
  <PartHeaderPage
    partNum="3"
    time="15:40~16:30"
    title="Gemini Canvas 教師自製 AI 工具"
    desc="不用寫一行程式碼！只要說人話，手把手將你手邊的教材變成屬於你自己的出題備課工具"
  />
);

// Slide 23: Vibe coding「AI 備課工具」- 咒語架構三要素 (精簡版)
const Slide19_VibePromptStructure: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="單元三"
      title="Vibe Coding 咒語架構三要素"
      subtitle="不用寫程式 · 說人話打造工具的心法"
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
              background: 'rgba(99, 102, 241, 0.12)',
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
            做一個 <strong style={{ color: colors.accent }}>AI 備課出題工具</strong>
            <br />
            例如：「起點行為評量助手」
          </div>
        </div>
        <div
          style={{
            background: 'rgba(99, 102, 241, 0.08)',
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
              background: 'rgba(244, 63, 94, 0.12)',
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
            老師<strong>貼上教材</strong>、選擇<strong>年級與題型</strong>並勾選
            <strong>評量指標</strong>
          </div>
        </div>
        <div
          style={{
            background: 'rgba(244, 63, 94, 0.08)',
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
              background: 'rgba(14, 165, 233, 0.12)',
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
            生成題目，並且可以 <strong style={{ color: colors.orange }}>一鍵匯出 Word</strong>
          </div>
        </div>
        <div
          style={{
            background: 'rgba(14, 165, 233, 0.08)',
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

// Slide 24: 實作示範：起點行為評量助手 (截圖 ＋ 咒語 ＋ 口訣)
const Slide20_GeminiCanvasPractice: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="單元三"
      title="實作範例︰起點行為評量助手"
      subtitle="一句咒語啟動 Gemini Canvas"
    />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: 36,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        alignItems: 'center',
      }}
    >
      <div
        className="es-fadeUp"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderRadius: 24,
          padding: 18,
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
        }}
      >
        <div
          style={{
            fontSize: '24px',
            fontWeight: 900,
            color: colors.accent,
            marginBottom: 12,
            paddingLeft: 8,
          }}
        >
          🖥️ Gemini Canvas 輸入截圖
        </div>
        <img
          src={imgGeminiCanvasInput}
          alt="Gemini Canvas 輸入畫面"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: 500,
            objectFit: 'contain',
            borderRadius: 16,
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          className="es-fadeUp"
          style={{
            background:
              'linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.94) 100%)',
            color: '#f8fafc',
            borderRadius: 22,
            padding: '30px 34px',
            boxShadow: '0 20px 48px rgba(15, 23, 42, 0.22)',
            fontFamily: "'Cascadia Code', Consolas, monospace",
            fontSize: '32px',
            lineHeight: 1.55,
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            textAlign: 'left',
          }}
        >
          <div
            style={{ color: colors.orange, fontSize: '24px', fontWeight: 950, marginBottom: 12 }}
          >
            💬 貼給 Gemini 的架構咒語
          </div>
          做一個ai工具，叫做起點行為評量助手，老師貼上學習內容，選擇題型，就會生成出題目，題目可以匯出成word。
        </div>

        <div
          className="es-fadeUp"
          style={{
            animationDelay: '0.2s',
            background: 'rgba(255, 255, 255, 0.88)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255, 255, 255, 0.95)',
            borderLeft: `8px solid ${colors.accent}`,
            borderRadius: 22,
            padding: '24px 30px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            boxShadow: '0 16px 36px rgba(148, 163, 184, 0.14)',
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: '28px', fontWeight: 950, color: colors.accent }}>
            ⚡ 操作 3 步驟口訣
          </div>
          <div style={{ fontSize: '26px', lineHeight: 1.5, color: colors.text, fontWeight: 700 }}>
            <strong>1. 打開 Gemini：</strong>登入常用 Google 帳號。
            <br />
            <strong>2. 勾選 Canvas：</strong>點對話框左下角「+」，啟用 <strong>Canvas</strong>。
            <br />
            <strong>3. 貼上咒語送出：</strong>等待右側自動生成可點選、可出題、可載 Word 的工具！
          </div>
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="第三部分：Gemini Canvas 實戰操作" />
  </div>
);

// Slide 25: 實作七︰Gemini Canvas 自製出題助手實戰 (15分鐘實作)
const Slide20_Practice_Canvas: Page = () => (
  <PracticePage
    num="07"
    toolName="Gemini Canvas 自製出題助手"
    time="15 分鐘"
    task="請打開 Gemini Canvas，貼入咒語試做專屬出題助手。"
    href="https://gemini.google.com"
    linkText="🚀 前往 Gemini 開啟 Canvas"
  />
);

// Slide 26: 漸進式調校：讓出題工具更懂特教 (精簡版)
const Slide21_IterativeRefinement: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="單元三"
      title="進階調校︰讓工具更符合特教需求"
      subtitle="三階段逐步疊加特教鷹架"
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
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.accent}`,
          borderRadius: 24,
          padding: '34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 24,
          height: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              fontWeight: 950,
              boxShadow: '0 8px 20px rgba(99, 102, 241, 0.35)',
              flexShrink: 0,
            }}
          >
            01
          </div>
          <h3
            style={{
              margin: 0,
              fontSize: '44px',
              fontWeight: 950,
              color: colors.text,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            第一版：核心跑通
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, justifyContent: 'center' }}>
          {['輸入學習內容', '生成 3 題選擇題', '測試 Word 下載'].map((pt, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontSize: '38px',
                lineHeight: 1.4,
                fontWeight: 850,
                color: colors.text,
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: colors.accent,
                  color: colors.white,
                  fontSize: '20px',
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.15s',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.orange}`,
          borderRadius: 24,
          padding: '34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 24,
          height: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
              color: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              fontWeight: 950,
              boxShadow: '0 8px 20px rgba(244, 63, 94, 0.35)',
              flexShrink: 0,
            }}
          >
            02
          </div>
          <h3
            style={{
              margin: 0,
              fontSize: '44px',
              fontWeight: 950,
              color: colors.text,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            第二版：加特教欄位
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, justifyContent: 'center' }}>
          {['年級與現況描述欄', '16pt 大字雙倍行距', '加上引導式提示詞'].map((pt, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontSize: '38px',
                lineHeight: 1.4,
                fontWeight: 850,
                color: colors.text,
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: colors.orange,
                  color: colors.white,
                  fontSize: '20px',
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.3s',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.accent}`,
          borderRadius: 24,
          padding: '34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 24,
          height: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              fontWeight: 950,
              boxShadow: '0 8px 20px rgba(99, 102, 241, 0.35)',
              flexShrink: 0,
            }}
          >
            03
          </div>
          <h3
            style={{
              margin: 0,
              fontSize: '44px',
              fontWeight: 950,
              color: colors.text,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            第三版：對齊特需
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, justifyContent: 'center' }}>
          {['融入社會生活管理', '學習策略情境融入', '對齊特教個別指標'].map((pt, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontSize: '38px',
                lineHeight: 1.4,
                fontWeight: 850,
                color: colors.text,
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: colors.accent,
                  color: colors.white,
                  fontSize: '20px',
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              <span>{pt}</span>
            </div>
          ))}
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
        fontSize: '36px',
        fontWeight: 900,
        boxShadow: '0 18px 40px rgba(15, 23, 42, 0.14)',
      }}
    >
      💡 Vibe Coding 核心心法：<span style={{ color: '#fed7aa' }}>「先做陽春版，再一句一句微調修改」</span>！
    </div>
    <TextbookFooter subtitle="第三部分：工具迭代與調校" />
  </div>
);

// Slide 27: 工具完成後的三大檢驗點 (精簡版)
const Slide22_QualityCheck: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="單元三"
      title="品質檢視︰完成後的三大檢查點"
      subtitle="確保教材可直接用於教學現場"
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
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.accent}`,
          borderRadius: 24,
          padding: '34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 24,
          height: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              fontWeight: 950,
              boxShadow: '0 8px 20px rgba(99, 102, 241, 0.35)',
              flexShrink: 0,
            }}
          >
            01
          </div>
          <h3
            style={{
              margin: 0,
              fontSize: '44px',
              fontWeight: 950,
              color: colors.text,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            內容適切度
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, justifyContent: 'center' }}>
          {['題目切合真實起點', '題幹簡潔明瞭無冗詞', '選項具備足夠區辨度'].map((pt, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontSize: '38px',
                lineHeight: 1.4,
                fontWeight: 850,
                color: colors.text,
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: colors.accent,
                  color: colors.white,
                  fontSize: '20px',
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.15s',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.orange}`,
          borderRadius: 24,
          padding: '34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 24,
          height: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
              color: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              fontWeight: 950,
              boxShadow: '0 8px 20px rgba(244, 63, 94, 0.35)',
              flexShrink: 0,
            }}
          >
            02
          </div>
          <h3
            style={{
              margin: 0,
              fontSize: '44px',
              fontWeight: 950,
              color: colors.text,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            匯出與排版
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, justifyContent: 'center' }}>
          {['點擊匯出 Word 正常', '字級達 14~16pt 標準', '保留足夠作答書寫空間'].map((pt, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontSize: '38px',
                lineHeight: 1.4,
                fontWeight: 850,
                color: colors.text,
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: colors.orange,
                  color: colors.white,
                  fontSize: '20px',
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.3s',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.accent}`,
          borderRadius: 24,
          padding: '34px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 24,
          height: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              fontWeight: 950,
              boxShadow: '0 8px 20px rgba(99, 102, 241, 0.35)',
              flexShrink: 0,
            }}
          >
            03
          </div>
          <h3
            style={{
              margin: 0,
              fontSize: '44px',
              fontWeight: 950,
              color: colors.text,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            工作流留存
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1, justifyContent: 'center' }}>
          {['網頁加入最愛書籤', '每週 1 分鐘快速出題', '直接分享特教夥伴'].map((pt, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontSize: '38px',
                lineHeight: 1.4,
                fontWeight: 850,
                color: colors.text,
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: colors.accent,
                  color: colors.white,
                  fontSize: '20px',
                  fontWeight: 900,
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        marginTop: 26,
        background: 'rgba(255, 255, 255, 0.90)',
        backdropFilter: 'blur(16px)',
        border: '2px solid rgba(244, 63, 94, 0.4)',
        borderRadius: 20,
        padding: '20px 32px',
        textAlign: 'center',
        fontSize: '36px',
        fontWeight: 950,
        color: colors.orange,
        boxShadow: '0 16px 36px rgba(244, 63, 94, 0.12)',
      }}
    >
      🎉 只要這三點過關，你就真正擁有一套專屬的「自製 AI 備課出題助理」！
    </div>
    <TextbookFooter subtitle="第三部分：產出品質與工作流驗證" />
  </div>
);

// Slide 28: 今天的總結與閉幕
const Slide23_ClosingSummary: Page = () => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <TextbookBg />
    <div style={{ zIndex: 2, maxWidth: 1480, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        今天的研習，先帶走一件事
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
        今天工具很多，不必全部都用到
      </h2>
      <p style={{ fontSize: '48px', fontWeight: 900, color: colors.accent, margin: '0 0 44px', lineHeight: 1.35 }}>
        挑一個最上手的，先解決一件每天重複的事
      </p>
      <p style={{ fontSize: '38px', color: colors.muted, margin: '0 0 18px', fontWeight: 650, lineHeight: 1.6 }}>
        AI 變化很快，我們追不上，也不需要追。從紙本、數位或自製 AI 中，選擇最適合自己的工具用熟就好。
      </p>
      <p style={{ fontSize: '38px', color: colors.muted, margin: 0, fontWeight: 650, lineHeight: 1.6 }}>
        真正重要的能力，是看見每天反覆出現的困擾，讓 AI 幫你少花一點力氣。
      </p>
      <div style={{ marginTop: 54, fontSize: '42px', fontWeight: 950, color: colors.orange, letterSpacing: '0.03em' }}>
        覺得困難時，就追蹤米克師吧！
      </div>
    </div>
    <TextbookFooter subtitle="總結與賦歸" />
  </div>
);

export const meta: SlideMeta = {
  title: '特教教師的AI工作流-教學應用與自製工具實作',
  createdAt: '2026-09-10T20:25:00.000Z',
};

export default [
  Slide01_Title,
  Slide02_Speaker,
  Slide02a_WorkshopSlides,
  Slide03_Agenda,
  Slide04_Part1Header,
  Slide05_AdminIep,
  Slide06_Practice_IEP,
  Slide08_ChineseLessonWorksheet1,
  Slide08_ChineseLessonWorksheet2,
  Slide08_ChineseLessonWorksheet3,
  Slide08_ChineseLessonWorksheet4,
  Slide08_ChineseLessonWorksheet5,
  Slide08_Practice_Chinese,
  Slide10_MathScaffold1,
  Slide10_MathScaffold2,
  Slide10_MathScaffold3,
  Slide10_MathScaffold4,
  Slide10_Practice_Math,
  Slide09_EnglishWorksheet1,
  Slide09_EnglishWorksheet2,
  Slide09_EnglishWorksheet3,
  Slide09_EnglishWorksheet4,
  Slide09_EnglishWorksheet5,
  Slide09_Practice_English,
  Slide11_Part2Header,
  Slide14_WebTool1,
  Slide14_Practice_Unscramble,
  Slide15_InteractiveMath,
  Slide15_Practice_StepMath,
  Slide17_Part3Header,
  Slide19_VibePromptStructure,
  Slide20_GeminiCanvasPractice,
  Slide20_Practice_Canvas,
  Slide21_IterativeRefinement,
  Slide22_QualityCheck,
  Slide23_ClosingSummary,
  Slide02c_Social,
  Slide06_MixerIntro,
] satisfies Page[];
