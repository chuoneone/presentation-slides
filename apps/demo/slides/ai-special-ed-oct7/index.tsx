import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { useSlidePageNumber, type DesignSystem, type Page, type SlideMeta } from '@open-slide/core';

import imgHeadshot from './assets/headshot.png';
import imgAgendaSchedule from './assets/agenda-schedule.png';
import imgGeminiCanvasInput from './assets/gemini-canvas-input.png';
import imgTool1 from './assets/工具一.png';
import imgWorkshopSearchResult from './assets/workshop-search-result.png';
import imgWorkshopHomepage from './assets/workshop-homepage.png';
import imgMixerAiPrep from './assets/mixer-ai-prep.png';
import imgMixerShare from './assets/mixer-share.png';
import imgMixerTeaching from './assets/mixer-teaching.png';
import imgChineseWorksheet from './assets/chinese-worksheet-tool.png';
import imgStoryIllustrator from './assets/story-illustrator-tool.png';
import imgMathVariation from './assets/math-variation-tool.png';
import imgInteractiveStepMath from './assets/interactive-step-math.png';

export const design: DesignSystem = {
  palette: { bg: '#f1f5f9', text: '#0f172a', accent: '#6366f1' },
  fonts: {
    display: "'Outfit', 'Noto Sans TC', system-ui, -apple-system, sans-serif",
    body: "'Inter', 'Noto Sans TC', system-ui, -apple-system, sans-serif",
  },
  typeScale: { hero: 150, body: 36 },
  radius: 20,
};

const colors = {
  bg: '#f1f5f9',
  bgGradient: 'radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.08) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.07) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(14, 165, 233, 0.08) 0px, transparent 50%), #f8fafc',
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
  storyIllustrator: 'https://share.gemini.google/cAAqC9js3fLL',
  fourPanelComicOriginal: 'https://spedmix.pages.dev/four-panel-comic',
  mathVariationPrintHelp: 'https://www.notion.so/spedmix2025/3274c52ff8d0804a8f7af95b086f73af?source=copy_link',
  unscramble: 'https://spedmix.pages.dev/unscramble',
  interactiveMathInput: 'https://gemini.google.com/gem/1FnYQ8WhRcj8dQQOUi6U9U44g04HMB-Mi?usp=sharing',
  interactiveMathClick: 'https://gemini.google.com/gem/1-lMnqRSy2m4LGg2hXYujN3uWEPjIloiG?usp=sharing',
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
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
}
.es-fadeUp {
  animation: es-fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes pulseGlow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.05); }
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
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.08) 50%, transparent 70%)',
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
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.14) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 70%)',
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
        <span style={{ color: colors.muted, fontWeight: 750 }}>{subtitle ?? '教學應用與自製工具實作'}</span>
      </div>
      <div style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6 }}>
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
      style={{
        fontSize: '56px',
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
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(244, 63, 94, 0.06) 45%, transparent 70%)',
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

    <div style={{ zIndex: 2, maxWidth: 1560, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          fontSize: '96px',
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

      <p style={{ fontSize: '40px', color: colors.muted, lineHeight: 1.4, margin: '0 0 64px 0', fontWeight: 650, maxWidth: 1280 }}>
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
          { num: 2, name: 'AI 互動教材應用' },
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
      const remaining = samePractice && current.remainingSeconds > 0 ? current.remainingSeconds : totalSec;
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
  const { state, start, pause, reset, addSeconds } = useWorkshopTimer(initialMinutes, practiceNumber);

  const isCurrentPractice = state.practiceNumber === practiceNumber;
  const displayRemaining = isCurrentPractice ? state.remainingSeconds : initialMinutes * 60;
  const isRunning = isCurrentPractice && state.isRunning;
  const isFinished = isCurrentPractice && state.remainingSeconds === 0;
  const total = isCurrentPractice && state.totalSeconds > 0 ? state.totalSeconds : initialMinutes * 60;
  const progressPercent = Math.min(100, Math.max(0, ((total - displayRemaining) / total) * 100));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
      }}
    >
      {/* Digital Clock */}
      <div
        style={{
          fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace',
          fontSize: 82,
          fontWeight: 950,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: isFinished ? colors.orange : isRunning ? '#fed7aa' : colors.white,
          textShadow: isRunning ? '0 0 24px rgba(254, 215, 170, 0.5)' : 'none',
          transition: 'color 0.3s ease',
        }}
      >
        {formatTimerClock(displayRemaining)}
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: 8,
          background: 'rgba(255, 255, 255, 0.16)',
          borderRadius: 99,
          margin: '16px 0 20px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: isFinished ? colors.orange : `linear-gradient(90deg, #fed7aa, ${colors.orange})`,
            borderRadius: 99,
            transition: 'width 0.4s linear',
          }}
        />
      </div>

      {/* Primary Action Button */}
      <div style={{ display: 'flex', gap: 10, width: '100%', marginBottom: 12 }}>
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
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '14px 18px',
            background: isRunning ? '#fed7aa' : colors.orange,
            color: isRunning ? colors.navy : colors.white,
            border: 'none',
            borderRadius: 14,
            fontSize: 22,
            fontWeight: 950,
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(0,0,0,0.22)',
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
            padding: '14px 18px',
            background: 'rgba(255, 255, 255, 0.14)',
            color: colors.white,
            border: '1px solid rgba(255, 255, 255, 0.28)',
            borderRadius: 14,
            fontSize: 20,
            fontWeight: 900,
            cursor: 'pointer',
          }}
        >
          ↺
        </button>
      </div>

      {/* Quick Adjust Buttons */}
      <div style={{ display: 'flex', gap: 8, width: '100%', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => addSeconds(60)}
          style={{
            flex: 1,
            padding: '6px 10px',
            background: 'rgba(255, 255, 255, 0.08)',
            color: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          +1 分鐘
        </button>
        <button
          type="button"
          onClick={() => addSeconds(-60)}
          style={{
            flex: 1,
            padding: '6px 10px',
            background: 'rgba(255, 255, 255, 0.08)',
            color: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          -1 分鐘
        </button>
      </div>
    </div>
  );
};

// 統一實作時間組件（左右雙欄佈局：左側深色卡片計時器 + 右側任務步驟卡片與傳送門）
const PracticePage = ({
  num,
  toolName,
  time = '10 分鐘',
  desc,
  steps,
  href,
  linkText = '🚀 前往工具頁面',
}: {
  num: string;
  toolName: string;
  time?: string;
  desc?: string;
  steps: string[];
  href?: string;
  linkText?: string;
}) => {
  const minNum = Number.parseInt(time, 10) || 10;
  const practiceLabel = `實作 ${num}`;

  return (
    <div style={{ ...fill, padding: '56px 100px 96px', justifyContent: 'center' }}>
      <TextbookBg />
      <GlobalTimerFloatingBar />

      {/* 頂部 Eyebrow */}
      <div
        style={{
          zIndex: 2,
          fontSize: 26,
          fontWeight: 850,
          letterSpacing: '0.14em',
          color: colors.orange,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span>⏱️ 課堂現場實作</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span style={{ color: colors.accent, fontWeight: 900 }}>{toolName}</span>
      </div>

      {/* 主體左右雙欄佈局 */}
      <div
        style={{
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '460px 1fr',
          gap: 36,
          alignItems: 'center',
        }}
      >
        {/* 左側深色微光玻璃卡片：實作標籤 + 標題 + 實時互動計時器 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 20,
            padding: '38px 36px',
            color: colors.white,
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.94) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.22), 0 0 40px rgba(99, 102, 241, 0.12)',
            borderRadius: 24,
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-block',
                padding: '6px 18px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                color: colors.white,
                fontSize: 24,
                fontWeight: 950,
                borderRadius: 999,
                marginBottom: 12,
                boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)',
              }}
            >
              {practiceLabel}
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--osd-font-display)',
                fontSize: 54,
                fontWeight: 950,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
              }}
            >
              課堂實作 {time}
            </h2>
            <div
              style={{
                marginTop: 10,
                fontSize: 26,
                color: '#cbd5e1',
                fontWeight: 700,
                lineHeight: 1.35,
              }}
            >
              {toolName}
            </div>
          </div>

          <WorkshopPracticeTimer practiceNumber={practiceLabel} initialMinutes={minNum} />
        </div>

        {/* 右側：任務說明與步驟卡片網格 + 傳送門 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 22,
          }}
        >
          {desc && (
            <div
              className="es-fadeUp"
              style={{
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(255, 255, 255, 0.95)',
                borderLeft: `8px solid ${colors.orange}`,
                borderRadius: 20,
                padding: '20px 28px',
                fontSize: '32px',
                fontWeight: 800,
                color: colors.text,
                lineHeight: 1.45,
                boxShadow: '0 10px 24px rgba(148, 163, 184, 0.12)',
              }}
            >
              🎯 <strong>實作目標：</strong>
              {desc}
            </div>
          )}

          {/* 步驟卡片列表 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: steps.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr',
              gap: 20,
            }}
          >
            {steps.map((step, idx) => {
              const stepColor =
                idx === 0 ? colors.accent : idx === 1 ? colors.orange : colors.blue;
              return (
                <div
                  key={idx}
                  className="es-fadeUp"
                  style={{
                    animationDelay: `${0.1 + idx * 0.08}s`,
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1.5px solid rgba(255, 255, 255, 0.95)',
                    borderTop: `8px solid ${stepColor}`,
                    borderRadius: 22,
                    padding: '24px 26px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: 240,
                    gap: 12,
                    boxShadow: '0 16px 36px rgba(148, 163, 184, 0.14)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '24px',
                      fontWeight: 950,
                      color: stepColor,
                      fontFamily: 'var(--osd-font-display)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    STEP 0{idx + 1}
                  </div>
                  <div
                    style={{
                      fontSize: '30px',
                      fontWeight: 850,
                      color: colors.text,
                      lineHeight: 1.45,
                      textAlign: 'left',
                    }}
                  >
                    {step}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 傳送門按鈕 */}
          {href && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 4 }}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="es-fadeUp"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 14,
                  background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                  color: colors.white,
                  padding: '18px 46px',
                  borderRadius: 18,
                  fontSize: '30px',
                  fontWeight: 950,
                  textDecoration: 'none',
                  boxShadow: '0 14px 32px rgba(244, 63, 94, 0.35)',
                  transition: 'transform 0.15s ease',
                }}
              >
                <span>{linkText}</span>
                <span>➔</span>
              </a>
              <span style={{ fontSize: '24px', color: colors.muted, fontWeight: 700 }}>
                （點擊另開新分頁操作，計時器將在右上方背景持續計時）
              </span>
            </div>
          )}
        </div>
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
      <div style={{ fontSize: '36px', lineHeight: 1.5, color: colors.text, fontWeight: 550, textAlign: 'left' }}>
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
  children: ReactNode;
  delay?: number;
  accent?: string;
  style?: CSSProperties;
}) => (
  <div
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: 'rgba(255, 255, 255, 0.86)',
      backdropFilter: 'blur(16px)',
      border: `1.5px solid rgba(255, 255, 255, 0.92)`,
      borderTop: `7px solid ${accent}`,
      borderRadius: 22,
      padding: '28px 32px',
      boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 16,
      minHeight: 250,
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
            width: 58,
            height: 58,
            borderRadius: 16,
            background: accent === colors.accent ? 'rgba(99, 102, 241, 0.12)' : 'rgba(244, 63, 94, 0.12)',
            color: accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--osd-font-display)',
            fontSize: '28px',
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
          fontSize: '38px',
          fontWeight: 900,
          color: colors.text,
          lineHeight: 1.18,
        }}
      >
        {title}
      </h3>
    </div>
    <div style={{ fontSize: '30px', lineHeight: 1.5, color: colors.text, fontWeight: 550, textAlign: 'left' }}>
      {children}
    </div>
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
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      border: '1.5px solid rgba(255, 255, 255, 0.9)',
      borderRadius: 24,
      boxShadow: '0 24px 60px rgba(148, 163, 184, 0.22), 0 4px 16px rgba(99, 102, 241, 0.08)',
      overflow: 'hidden',
      minHeight: 0,
      display: 'grid',
      gridTemplateRows: '52px 1fr',
      ...style,
    }}
  >
    <div
      style={{
        background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 22px',
        fontSize: '24px',
        fontWeight: 900,
        letterSpacing: '0.02em',
        boxShadow: '0 2px 10px rgba(99, 102, 241, 0.25)',
      }}
    >
      {label}
    </div>
    <div
      style={{
        padding: 16,
        background: 'rgba(255, 255, 255, 0.94)',
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
      gridTemplateColumns: '80px 1fr',
      gap: 22,
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.88)',
      backdropFilter: 'blur(16px)',
      border: `1.5px solid rgba(255, 255, 255, 0.92)`,
      borderLeft: `7px solid ${accent}`,
      borderRadius: 22,
      padding: '26px 32px',
      boxShadow: '0 16px 36px rgba(148, 163, 184, 0.14)',
      textAlign: 'left',
    }}
  >
    <div
      style={{
        width: 74,
        height: 74,
        borderRadius: 20,
        background: accent === colors.accent ? 'rgba(99, 102, 241, 0.12)' : 'rgba(244, 63, 94, 0.12)',
        color: accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 36,
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
          fontSize: 42,
          lineHeight: 1.15,
          fontWeight: 950,
          color: colors.text,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 30, lineHeight: 1.4, fontWeight: 720, color: colors.muted }}>
        {children}
      </div>
    </div>
  </div>
);

const InstagramIcon = () => (
  <svg width="92" height="92" viewBox="0 0 92 92" role="img" aria-label="Instagram">
    <rect x="16" y="16" width="60" height="60" rx="18" fill="none" stroke="currentColor" strokeWidth="7" />
    <circle cx="46" cy="46" r="15" fill="none" stroke="currentColor" strokeWidth="7" />
    <circle cx="62" cy="30" r="5" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="92" height="92" viewBox="0 0 92 92" role="img" aria-label="Facebook">
    <path d="M54 31h11V17H52c-15 0-23 9-23 24v8H18v15h11v24h17V64h14l3-15H46v-7c0-7 3-11 8-11Z" fill="currentColor" />
  </svg>
);

const ThreadsIcon = () => (
  <svg width="92" height="92" viewBox="0 0 92 92" role="img" aria-label="Threads">
    <path d="M47 14c19 0 31 12 31 32 0 21-13 32-32 32-18 0-32-12-32-32 0-19 12-32 33-32Zm-1 16c-10 0-16 6-16 16 0 11 6 17 16 17 8 0 14-4 14-10 0-5-4-8-11-8h-9v10h8c3 0 5 1 5 3s-3 4-7 4c-8 0-13-6-13-16 0-9 5-15 13-15 6 0 10 2 13 7l8-5c-5-7-11-10-21-10Z" fill="currentColor" />
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
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: '44px', fontWeight: 900, lineHeight: 1.08, color: colors.text }}>
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
    <div style={{ background: '#f8fafc', borderBottom: '1px solid rgba(226, 232, 240, 0.8)', overflow: 'hidden', minHeight: 0 }}>
      <img
        src={screenshot}
        alt={screenshotAlt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 0%', display: 'block' }}
      />
    </div>
    <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr auto', gap: 12, padding: 24 }}>
      <div
        style={{
          width: 'fit-content',
          background: accent === colors.accent ? 'rgba(99, 102, 241, 0.12)' : 'rgba(244, 63, 94, 0.12)',
          color: accent,
          borderRadius: 10,
          padding: '6px 14px',
          fontSize: '22px',
          fontWeight: 950,
        }}
      >
        {label}
      </div>
      <h3 style={{ margin: 0, fontFamily: 'var(--osd-font-display)', fontSize: '42px', lineHeight: 1.08, fontWeight: 950, color: colors.text }}>
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

// Slide 01: 封面 (主講：朱旆誼，微光玻璃擬態現代感)
const Slide01_Title: Page = () => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <TextbookBg />

    {/* 中心微光光暈 */}
    <div
      style={{
        position: 'absolute',
        width: 900,
        height: 900,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(244, 63, 94, 0.06) 40%, transparent 70%)',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        filter: 'blur(30px)',
      }}
    />

    <div style={{ zIndex: 2, maxWidth: 1580, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          color: colors.accent,
          borderRadius: 999,
          padding: '12px 36px',
          fontSize: '28px',
          fontWeight: 950,
          letterSpacing: '0.14em',
          marginBottom: 36,
          boxShadow: '0 12px 32px rgba(99, 102, 241, 0.12)',
        }}
      >
        <span>✦ 特殊教育 AI 備課與自製工具實作工作坊</span>
      </div>

      <h1
        style={{
          fontSize: '112px',
          fontWeight: 950,
          lineHeight: 1.15,
          color: colors.text,
          margin: '0 0 28px 0',
          letterSpacing: '-0.035em',
        }}
      >
        特教教師的 AI 工作流
      </h1>

      <div
        style={{
          fontSize: '52px',
          fontWeight: 900,
          letterSpacing: '0.04em',
          marginBottom: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 22,
        }}
      >
        <span style={{ width: 56, height: 4, background: 'linear-gradient(90deg, #6366f1, #0ea5e9)', borderRadius: 2 }} />
        <span
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #0ea5e9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          教學應用與自製工具實作
        </span>
        <span style={{ width: 56, height: 4, background: 'linear-gradient(90deg, #0ea5e9, #6366f1)', borderRadius: 2 }} />
      </div>

      {/* 講者本名：微光玻璃擬態質感 */}
      <div
        className="es-fadeUp"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 18,
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderRadius: 999,
          padding: '16px 52px',
          boxShadow: '0 20px 44px rgba(148, 163, 184, 0.18)',
        }}
      >
        <span style={{ fontSize: '26px', color: colors.muted, fontWeight: 700, letterSpacing: '0.1em' }}>主講</span>
        <span style={{ width: 2, height: 26, background: '#cbd5e1' }} />
        <span
          style={{
            fontSize: '44px',
            fontWeight: 950,
            color: colors.text,
            letterSpacing: '0.14em',
            fontFamily: 'var(--osd-font-display)',
          }}
        >
          朱旆誼
        </span>
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
            fontSize: 54,
            fontWeight: 900,
            color: colors.text,
            margin: 0,
          }}
        >朱旆誼</h3>
        <div
          style={{
            width: 250,
            height: 250,
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
          gridTemplateRows: '1.08fr 0.92fr',
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
          輸入 <strong style={{ color: colors.orange, fontSize: 36 }}>「花蓮特教」</strong>
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
    <TextbookFooter subtitle="開啟今日簡報" />
  </div>
);

// Slide 04: 追蹤米克師社群 (直接複製 special-ed-ai-optimized 第 4 頁)
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

// Slide 06: 今日大綱 (微光玻璃擬態、大字、低字數、通透呼吸感)
const Slide03_Agenda: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader unit="今日大綱" title="特教教師的 AI 工作流 · 課程藍圖" subtitle="三個時段 ‧ 三大核心實踐" />

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, zIndex: 2, flex: 1, minHeight: 0, alignItems: 'stretch' }}>
      {/* Part 1 */}
      <div
        className="es-fadeUp"
        style={{
          background: 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.accent}`,
          borderRadius: 24,
          padding: '32px 30px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: '34px', fontWeight: 950, color: colors.accent, fontFamily: 'var(--osd-font-display)' }}>
              PART 01
            </span>
            <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: colors.accent, borderRadius: 999, padding: '6px 18px', fontSize: '24px', fontWeight: 900 }}>
              14:00 - 14:50
            </span>
          </div>

          <h3 style={{ margin: '0 0 12px 0', fontSize: '46px', fontWeight: 950, color: colors.text, lineHeight: 1.18 }}>
            行政與教材備課
          </h3>
          <div style={{ fontSize: '28px', color: colors.muted, marginBottom: 22, fontWeight: 700 }}>
            先求快速產出第一版
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['🎯 IEP 目標生成器', '📖 國文課堂精讀學習單', '🎨 逐句課文繪畫師', '🔢 數題數題（同題型變號）'].map((t) => (
              <div key={t} style={{ background: 'rgba(255, 255, 255, 0.92)', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: 16, padding: '16px 22px', fontSize: '28px', fontWeight: 900, color: colors.text, textAlign: 'left' }}>
                {t}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20, background: 'rgba(99, 102, 241, 0.1)', borderRadius: 14, padding: '14px 20px', fontSize: '24px', fontWeight: 900, color: colors.accent, textAlign: 'center' }}>
          ⏱️ 每項工具皆附 10 分鐘實作
        </div>
      </div>

      {/* Part 2 */}
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.15s',
          background: 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.orange}`,
          borderRadius: 24,
          padding: '32px 30px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: '34px', fontWeight: 950, color: colors.orange, fontFamily: 'var(--osd-font-display)' }}>
              PART 02
            </span>
            <span style={{ background: 'rgba(244, 63, 94, 0.1)', color: colors.orange, borderRadius: 999, padding: '6px 18px', fontSize: '24px', fontWeight: 900 }}>
              14:50 - 15:40
            </span>
          </div>

          <h3 style={{ margin: '0 0 12px 0', fontSize: '46px', fontWeight: 950, color: colors.text, lineHeight: 1.18 }}>
            AI 互動教材應用
          </h3>
          <div style={{ fontSize: '28px', color: colors.muted, marginBottom: 22, fontWeight: 700 }}>
            打造適性學習鷹架
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['🧩 工具一︰句型排列與語法重組', '💻 工具二︰互動式步驟數學學習單'].map((t) => (
              <div key={t} style={{ background: 'rgba(255, 255, 255, 0.92)', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: 16, padding: '16px 22px', fontSize: '28px', fontWeight: 900, color: colors.text, textAlign: 'left' }}>
                {t}
              </div>
            ))}
            <div style={{ padding: '10px 14px', fontSize: '24px', color: colors.muted, lineHeight: 1.45, textAlign: 'left' }}>
              ✓ 免寫字拖曳操作 ‧ 語音即時校對<br />
              ✓ 逐步填答型 ＋ 選項點選型雙模式
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, background: 'rgba(244, 63, 94, 0.1)', borderRadius: 14, padding: '14px 20px', fontSize: '24px', fontWeight: 900, color: colors.orange, textAlign: 'center' }}>
          ⏱️ 每項工具皆附 10 分鐘實作
        </div>
      </div>

      {/* Part 3 */}
      <div
        className="es-fadeUp"
        style={{
          animationDelay: '0.3s',
          background: 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.blue}`,
          borderRadius: 24,
          padding: '32px 30px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: '34px', fontWeight: 950, color: colors.blue, fontFamily: 'var(--osd-font-display)' }}>
              PART 03
            </span>
            <span style={{ background: 'rgba(14, 165, 233, 0.1)', color: colors.blue, borderRadius: 999, padding: '6px 18px', fontSize: '24px', fontWeight: 900 }}>
              15:40 - 16:30
            </span>
          </div>

          <h3 style={{ margin: '0 0 12px 0', fontSize: '46px', fontWeight: 950, color: colors.text, lineHeight: 1.18 }}>
            自製 AI 工具實作
          </h3>
          <div style={{ fontSize: '28px', color: colors.muted, marginBottom: 22, fontWeight: 700 }}>
            Gemini Canvas 打造專屬工具
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['💬 Vibe Coding 咒語三要素', '🛠️ 起點行為評量助手出題實測', '📑 一鍵匯出 Word 考卷與調校'].map((t) => (
              <div key={t} style={{ background: 'rgba(255, 255, 255, 0.92)', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: 16, padding: '16px 22px', fontSize: '28px', fontWeight: 900, color: colors.text, textAlign: 'left' }}>
                {t}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20, background: 'rgba(14, 165, 233, 0.1)', borderRadius: 14, padding: '14px 20px', fontSize: '24px', fontWeight: 900, color: colors.blue, textAlign: 'center' }}>
          ⏱️ 完整自製 AI 出題工具實戰
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
    desc="把繁雜行政與教材備課先交由 AI 產出第一版，老師回歸個別化微調"
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
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, rgba(244, 63, 94, 0.05) 50%, transparent 70%)',
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
          fontSize: '116px',
          fontWeight: 950,
          color: colors.text,
          margin: '0 0 28px 0',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
        }}
      >
        IEP 目標生成器
      </h1>
      <p
        style={{
          fontSize: '38px',
          color: colors.muted,
          margin: '0 0 48px 0',
          fontWeight: 650,
          maxWidth: 1100,
          lineHeight: 1.45,
        }}
      >
        輸入學生起點行為現況 · 自動精準生成符合特教通報網標準之學年與學期目標
      </p>
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
      <div style={{ marginTop: 28, fontSize: '24px', color: '#94a3b8', fontWeight: 650 }}>
        傳送門連結：<span style={{ textDecoration: 'underline', color: colors.accent }}>{toolUrls.iep}</span>
      </div>
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
    desc="找一位手邊學生的現況行為，產出第一版可修改的學期目標。"
    steps={[
      '前往 IEP 目標生成器，選擇學習領域與年級',
      '貼入學生的起點行為描述（優勢與主要困難）',
      '點擊生成，檢視並微調符合特教通報網格式的目標',
    ]}
    href={toolUrls.iep}
    linkText="🚀 前往 IEP 目標生成器"
  />
);

// Slide 10: 國文課堂學習單生成系統 (精簡文字重點 ＋ 工具截圖)
const Slide08_ChineseLessonWorksheet: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="語文備課神器"
      title="國文課堂學習單生成系統"
      subtitle="課堂精讀架構版 · 師生雙版本 Word 一鍵下載"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.98fr 1.02fr',
        gap: 32,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      {/* 左欄：重點條列 ＋ 操作按鈕 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center', minHeight: 0 }}>
        <ToolBullet num="01" title="課文架構與核心預覽" delay={0.08}>
          提煉 60～90 字大架構與核心主題，保留伏筆激發好奇心與探究動機。
        </ToolBullet>

        <ToolBullet num="02" title="逐段精讀四部曲" delay={0.16} accent={colors.orange}>
          <strong>聽圈詞</strong> ＋ <strong>十字田字格練寫</strong> ＋ <strong>雙軌情境圖解</strong> ＋ <strong>每段2題即時檢核</strong>。
        </ToolBullet>

        <ToolBullet num="03" title="課後脈絡統整表格" delay={0.24}>
          表格化結構整理，思考引導＋自主歸納挖空，建立完整篇章脈絡。
        </ToolBullet>

        <ToolBullet num="04" title="師生雙版本 Word 匯出" delay={0.32} accent={colors.orange}>
          學生課堂精讀版（完整挖空）與教師解答備課版（標示答案＋解答總表）。
        </ToolBullet>

        <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
          <a
            href={toolUrls.chineseLessonGemini}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: colors.orange,
              color: colors.white,
              padding: '14px 28px',
              borderRadius: 16,
              fontSize: '26px',
              fontWeight: 950,
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(234, 88, 12, 0.3)',
            }}
          >
            <span>🚀 開始使用 (Gemini)</span>
          </a>
        </div>
      </div>

      {/* 右欄：工具截圖 */}
      <ToolScreenshotFrame label="國文課堂學習單生成系統 · 操作介面截圖" delay={0.15}>
        <img
          src={imgChineseWorksheet}
          alt="國文課堂學習單生成系統操作畫面"
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', borderRadius: 12 }}
        />
      </ToolScreenshotFrame>
    </div>
    <TextbookFooter subtitle="第一部分：國文課堂學習單生成系統" />
  </div>
);

// Slide 11: 實作二︰國文課堂學習單生成系統 (10分鐘實作)
const Slide08_Practice_Chinese: Page = () => (
  <PracticePage
    num="02"
    toolName="國文課堂學習單生成系統"
    time="10 分鐘"
    desc="貼上一段近期課文，產出具備聽圈、田字格生字與雙版本 Word 學習單。"
    steps={[
      '點擊進入國文課堂學習單生成專區',
      '貼上一段課文內容，並填入 2~3 個生字目標詞',
      '點擊生成，體驗下載師生雙版本 Word (.docx) 檔',
    ]}
    href={toolUrls.chineseLessonGemini}
    linkText="🚀 前往國文學習單生成系統"
  />
);

// Slide 12: 逐句課文繪畫師
const Slide09_StoryIllustrator: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="語文備課神器"
      title="逐句課文繪畫師"
      subtitle="課文智慧逐句拆解 · 一句一圖專屬繪圖 (Imagen 3)"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.98fr 1.02fr',
        gap: 32,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      {/* 左欄：三大核心亮點 ＋ 連結 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center', minHeight: 0 }}>
        <ToolBullet num="✨" title="課文智慧逐句拆解" delay={0.08}>
          只需貼上您的課文或故事段落，系統自動智慧逐句拆解，無需手動斷句。
        </ToolBullet>

        <ToolBullet num="✂️" title="自由選擇逐句簡化" delay={0.16} accent={colors.orange}>
          依特教學生的識字與理解程度，自由選擇是否逐句簡化，量身打造適性文本。
        </ToolBullet>

        <ToolBullet num="🎨" title="一句一圖專屬繪圖" delay={0.24}>
          由 AI 繪畫師（Imagen 3 模型）為每一句話繪製專屬情境插圖，加深閱讀理解。
        </ToolBullet>

        <div
          style={{
            background: '#fff7ed',
            border: '2px solid #fed7aa',
            borderRadius: 16,
            padding: '12px 18px',
            fontSize: '21px',
            color: colors.muted,
            lineHeight: 1.4,
          }}
        >
          💡 <strong>使用提醒：</strong>登入 Google 帳號後，直接在對話框貼上課文傳送即可！
        </div>

        <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
          <a
            href={toolUrls.storyIllustrator}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: colors.orange,
              color: colors.white,
              padding: '14px 28px',
              borderRadius: 16,
              fontSize: '26px',
              fontWeight: 950,
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(234, 88, 12, 0.3)',
            }}
          >
            <span>🚀 立即開啟 逐句課文繪畫師</span>
          </a>
        </div>
      </div>

      {/* 右欄：工具截圖 */}
      <ToolScreenshotFrame label="逐句課文繪畫師 / AI 四格漫畫生成器介面" delay={0.15}>
        <img
          src={imgStoryIllustrator}
          alt="逐句課文繪畫師操作畫面"
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', borderRadius: 12 }}
        />
      </ToolScreenshotFrame>
    </div>
    <TextbookFooter subtitle="第一部分：逐句課文繪畫師" />
  </div>
);

// Slide 13: 實作三︰逐句課文繪畫師 (10分鐘實作)
const Slide09_Practice_Story: Page = () => (
  <PracticePage
    num="03"
    toolName="逐句課文繪畫師"
    time="10 分鐘"
    desc="貼入 3~4 句簡短課文，讓 AI 為每句話生成專屬生動情境插畫。"
    steps={[
      '開啟逐句課文繪畫師 Gemini 頁面',
      '在對話框中貼上 3~4 句課文或短篇生活故事段落',
      '觀察 AI 自動逐句拆解並繪製對應的情境插圖',
    ]}
    href={toolUrls.storyIllustrator}
    linkText="🚀 開啟逐句課文繪畫師"
  />
);

// Slide 14: 數題數題數題數題
const Slide10_MathVariation: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="數學備課神器"
      title="數題數題數題數題"
      subtitle="只需提供原題 · AI 立即為您生成五倍的同觀念練習量！"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.98fr 1.02fr',
        gap: 32,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      {/* 左欄：四大特色功能 ＋ 連結 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center', minHeight: 0 }}>
        <ToolBullet num="📋" title="簡單輸入原題" delay={0.08}>
          只要貼上題目，AI 自動精準識別解題邏輯與算式脈絡。
        </ToolBullet>

        <ToolBullet num="🔢" title="同觀念變號生成" delay={0.16} accent={colors.orange}>
          針對同一題型，生成五題觀念相同、數字不同的新練習題。
        </ToolBullet>

        <ToolBullet num="👁️" title="視覺化步驟挖空" delay={0.24}>
          步驟拆解填入、降低書寫負擔，特教補救教學最佳夥伴。
        </ToolBullet>

        <ToolBullet num="⚡" title="高效列印備課" delay={0.32} accent={colors.orange}>
          全選題目後按 <strong>Ctrl + P</strong> 即可輸出標準學習單作業卷。
        </ToolBullet>

        <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
          <a
            href={toolUrls.mathVariationPrintHelp}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: colors.orange,
              color: colors.white,
              padding: '14px 28px',
              borderRadius: 16,
              fontSize: '26px',
              fontWeight: 950,
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(234, 88, 12, 0.3)',
            }}
          >
            <span>📖 點我看列印操作指引</span>
          </a>
        </div>
      </div>

      {/* 右欄：工具截圖 */}
      <ToolScreenshotFrame label="數學練習單：同題型變號視覺化步驟挖空版" delay={0.15}>
        <img
          src={imgMathVariation}
          alt="數題數題數題數題練習單畫面"
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', borderRadius: 12 }}
        />
      </ToolScreenshotFrame>
    </div>
    <TextbookFooter subtitle="第一部分：數題數題數題數題" />
  </div>
);

// Slide 15: 實作四︰數題數題數題數題 (10分鐘實作)
const Slide10_Practice_Math: Page = () => (
  <PracticePage
    num="04"
    toolName="數題數題數題數題"
    time="10 分鐘"
    desc="貼上一道手邊正要出的數學題目，產出 5 題同觀念變號練習題並預覽列印。"
    steps={[
      '準備手邊一道數學題目（例如：一元一次方程式運算）',
      '貼入工具，立即自動生成 5 題觀念相同、數字不同的新題',
      '全選題目後按 Ctrl + P，查看標準作業卷視覺化排版效果',
    ]}
    href={toolUrls.mathVariationPrintHelp}
    linkText="📖 檢視數題數題操作教學"
  />
);

// Slide 16: PART 2 過渡頁
const Slide11_Part2Header: Page = () => (
  <PartHeaderPage
    partNum="2"
    time="14:50~15:40"
    title={'AI 互動教材應用\n打造適性學習鷹架'}
    desc="告別枯燥紙本作業！利用點選、步驟拆解、即時回饋與視覺鷹架，建立特教學生的自主學習信心"
  />
);

// Slide 17: 工具一︰句型排列與語法重組 (精簡說明版)
const Slide14_WebTool1: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader unit="單元二" title="工具一︰句型排列與語法重組" subtitle="降低書寫負擔 · 視覺拖曳 · 語音自我校對" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.12fr 0.88fr', gap: 34, flex: 1, zIndex: 2, minHeight: 0, alignItems: 'stretch' }}>
      <ToolScreenshotFrame label="句型排列操作介面 (可拖曳/點選)" delay={0.1}>
        <img
          src={imgTool1}
          alt="句型排列操作介面"
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', borderRadius: 12 }}
        />
      </ToolScreenshotFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center', minHeight: 0 }}>
        <ToolBullet num="01" title="免寫字拖曳操作" delay={0.12}>
          點選或自由拖曳詞卡組句，專注語意結構與詞序，減輕手寫挫折。
        </ToolBullet>
        <ToolBullet num="02" title="小步任務闖關" delay={0.18} accent={colors.orange}>
          5-7 題切碎化自主練習，符合特教學童短暫注意力需求。
        </ToolBullet>
        <ToolBullet num="03" title="自讀再聽發音" delay={0.24}>
          排好後先自讀檢查，再點擊「聽正確發音」聽覺校對，提升監控力。
        </ToolBullet>
        <ToolBullet num="04" title="跨領域靈活套用" delay={0.3} accent={colors.orange}>
          國語造句、英語組句、生活常規與實驗步驟皆可套用。
        </ToolBullet>

        <div style={{ marginTop: 12 }}>
          <a
            href={toolUrls.unscramble}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: colors.accent,
              color: colors.white,
              padding: '12px 28px',
              borderRadius: 14,
              fontSize: '24px',
              fontWeight: 950,
              textDecoration: 'none',
              boxShadow: '0 10px 24px rgba(13, 148, 136, 0.28)',
            }}
          >
            <span>🚀 體驗句型排列工具</span>
          </a>
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="第二部分：工具一 句型排列" />
  </div>
);

// Slide 18: 實作五︰句型排列與語法重組 (10分鐘實作)
const Slide14_Practice_Unscramble: Page = () => (
  <PracticePage
    num="05"
    toolName="句型排列與語法重組"
    time="10 分鐘"
    desc="輸入 2~3 個句子，體驗學生端免寫字詞卡拖曳與即時語音校對。"
    steps={[
      '開啟句型排列互動網頁',
      '輸入 2~3 個目標句子（可為國語造句、生活流程或英文重組）',
      '體驗學生端「點選/拖曳詞卡」作答與「點讀聽正確發音」',
    ]}
    href={toolUrls.unscramble}
    linkText="🚀 開啟句型排列工具"
  />
);

// Slide 19: 工具二︰互動式步驟數學學習單生成器 (精簡重點版，已依指示刪除第16頁)
const Slide15_InteractiveMath: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader
      unit="單元二"
      title="工具二︰互動式步驟數學學習單生成器"
      subtitle="文字題目轉化為具視覺提示、步驟拆解與即時檢核的互動網頁"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '0.98fr 1.02fr',
        gap: 32,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      {/* 左欄：核心亮點與雙模式按鈕 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center', minHeight: 0 }}>
        <ToolBullet num="🎯" title="特教鷹架即時回饋" delay={0.08}>
          步驟拆解、答對解鎖下一步、答錯即時引導，大幅降低數學運算焦慮。
        </ToolBullet>

        <ToolBullet num="🤖" title="無需程式背景" delay={0.16} accent={colors.orange}>
          老師只要提供題目，AI 自動寫 Code 生成單一獨立互動網頁。
        </ToolBullet>

        <ToolBullet num="🧠" title="專注學習痛點" delay={0.24}>
          專為注意力缺陷 (ADHD) 與數學學習障礙學童設計，大字級防呆排版。
        </ToolBullet>

        <ToolBullet num="⚡" title="即開即用分享" delay={0.32} accent={colors.orange}>
          免安裝免帳號，單一 HTML 檔案點開就能練，平板與大屏皆通用。
        </ToolBullet>

        {/* 雙軌模式傳送門 */}
        <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
          <a
            href={toolUrls.interactiveMathInput}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: colors.accent,
              color: colors.white,
              padding: '14px 22px',
              borderRadius: 14,
              fontSize: '22px',
              fontWeight: 950,
              textDecoration: 'none',
              boxShadow: '0 10px 24px rgba(13, 148, 136, 0.28)',
            }}
          >
            <span>⌨️ 逐步填答型（鍵盤）</span>
          </a>
          <a
            href={toolUrls.interactiveMathClick}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: colors.orange,
              color: colors.white,
              padding: '14px 22px',
              borderRadius: 14,
              fontSize: '22px',
              fontWeight: 950,
              textDecoration: 'none',
              boxShadow: '0 10px 24px rgba(234, 88, 12, 0.3)',
            }}
          >
            <span>👆 點選操作型（點擊）</span>
          </a>
        </div>
      </div>

      {/* 右欄：工具截圖 */}
      <ToolScreenshotFrame label="步步練互動數學：步驟拆解、選項填入與即時回饋介面" delay={0.15}>
        <img
          src={imgInteractiveStepMath}
          alt="步步練互動數學學習單畫面"
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', borderRadius: 12 }}
        />
      </ToolScreenshotFrame>
    </div>
    <TextbookFooter subtitle="第二部分：工具二 互動式步驟數學學習單" />
  </div>
);

// Slide 20: 實作六︰互動式步驟數學學習單生成器 (10分鐘實作)
const Slide15_Practice_StepMath: Page = () => (
  <PracticePage
    num="06"
    toolName="互動式步驟數學學習單"
    time="10 分鐘"
    desc="依學生需求選擇填答型或點選型，體驗 AI 自動產出具步驟鷹架的數學網頁。"
    steps={[
      '選擇「逐步填答型」或「點選操作型」傳送門進入',
      '貼入一道運算題目，觀察 AI 自動寫出 HTML 步驟拆解互動代碼',
      '在瀏覽器操作題目，感受「步驟解鎖」與「答對綠框即時回饋」',
    ]}
    href={toolUrls.interactiveMathInput}
    linkText="🚀 開啟逐步填答型生成器"
  />
);

// Slide 21: PART 3 過渡頁 (使用者指定：標題改 Gemini Canvas 教師自製 AI 工具實作)
const Slide17_Part3Header: Page = () => (
  <PartHeaderPage
    partNum="3"
    time="15:40~16:30"
    title={'Gemini Canvas 教師自製 AI 工具實作'}
    desc="不用寫一行程式碼！只要說人話，手把手將你手邊的教材變成屬於你自己的出題備課工具"
  />
);

// Slide 22: 實作前準備：請老師手邊準備一份教材 (精簡版)
const Slide18_Preparation: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader unit="單元三" title="實作前準備︰請手邊準備一份教學素材" subtitle="以真實教學需求為導向" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, flex: 1, zIndex: 2, alignItems: 'center' }}>
      <Unit2Card num="01" title="準備教材文字" delay={0.1}>
        請打開電腦中近期正要上的課文、教學單元重點、生活常規或起點行為紀錄。
      </Unit2Card>
      <Unit2Card num="02" title="設定評量題型" delay={0.2} accent={colors.orange}>
        設定適合你班級學生的題型：3 選 1 選擇題？是非題？還是詞語填空？
      </Unit2Card>
      <Unit2Card num="03" title="現場帶走成果" delay={0.3}>
        這節課結束時，親手做出一套屬於自己、能一鍵下載 Word 考卷的專屬出題生成器！
      </Unit2Card>
    </div>

    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        marginTop: 26,
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(16px)',
        border: '2px dashed #f43f5e',
        borderRadius: 22,
        padding: '24px 38px',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        boxShadow: '0 16px 40px rgba(244, 63, 94, 0.12)',
      }}
    >
      <div style={{ fontSize: '50px' }}>🎯</div>
      <div style={{ fontSize: '32px', lineHeight: 1.45, color: colors.text, fontWeight: 850 }}>
        今天我們以<strong>「出題工具：起點行為評量助手」</strong>為範例，帶大家走完自製 AI 工具全流程！
      </div>
    </div>
    <TextbookFooter subtitle="第三部分：實作前教材準備" />
  </div>
);

// Slide 23: Vibe coding「AI 備課工具」- 咒語架構三要素 (精簡版)
const Slide19_VibePromptStructure: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader unit="單元三" title="Vibe Coding 咒語架構三要素" subtitle="不用寫程式 · 說人話打造工具的心法" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, flex: 1, zIndex: 2, minHeight: 0, alignItems: 'stretch' }}>
      <div
        className="es-fadeUp"
        style={{
          background: 'rgba(255, 255, 255, 0.86)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.95)',
          borderTop: `8px solid ${colors.accent}`,
          borderRadius: 24,
          padding: '32px 30px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
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
              fontSize: '32px',
              fontWeight: 950,
              fontFamily: 'var(--osd-font-display)',
              marginBottom: 16,
            }}
          >
            01
          </div>
          <h3 style={{ margin: 0, fontSize: '46px', fontWeight: 950, color: colors.text }}>
            大目標
            <span style={{ display: 'block', fontSize: '24px', color: colors.accent, fontWeight: 800, marginTop: 4 }}>
              Goal · 宣告工具定位
            </span>
          </h3>
          <div style={{ fontSize: '32px', lineHeight: 1.5, color: colors.text, fontWeight: 650, marginTop: 16, textAlign: 'left' }}>
            做一個 <strong style={{ color: colors.accent }}>AI 備課出題工具</strong>
            <br />
            例如：「起點行為評量助手」
          </div>
        </div>
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', borderRadius: 14, padding: '14px 18px', fontSize: '24px', color: colors.muted, fontWeight: 700, marginTop: 20 }}>
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
          padding: '32px 30px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
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
              fontSize: '32px',
              fontWeight: 950,
              fontFamily: 'var(--osd-font-display)',
              marginBottom: 16,
            }}
          >
            02
          </div>
          <h3 style={{ margin: 0, fontSize: '46px', fontWeight: 950, color: colors.text }}>
            操作流程
            <span style={{ display: 'block', fontSize: '24px', color: colors.orange, fontWeight: 800, marginTop: 4 }}>
              Workflow · 介面輸入欄位
            </span>
          </h3>
          <div style={{ fontSize: '32px', lineHeight: 1.5, color: colors.text, fontWeight: 650, marginTop: 16, textAlign: 'left' }}>
            老師<strong>貼上教材</strong>、選擇<strong>年級與題型</strong>並勾選<strong>評量指標</strong>
          </div>
        </div>
        <div style={{ background: 'rgba(244, 63, 94, 0.08)', borderRadius: 14, padding: '14px 18px', fontSize: '24px', color: colors.muted, fontWeight: 700, marginTop: 20 }}>
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
          padding: '32px 30px',
          boxShadow: '0 20px 48px rgba(148, 163, 184, 0.16)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
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
              fontSize: '32px',
              fontWeight: 950,
              fontFamily: 'var(--osd-font-display)',
              marginBottom: 16,
            }}
          >
            03
          </div>
          <h3 style={{ margin: 0, fontSize: '46px', fontWeight: 950, color: colors.text }}>
            期望結果
            <span style={{ display: 'block', fontSize: '24px', color: colors.blue, fontWeight: 800, marginTop: 4 }}>
              Outcome · 具體成品
            </span>
          </h3>
          <div style={{ fontSize: '32px', lineHeight: 1.5, color: colors.text, fontWeight: 650, marginTop: 16, textAlign: 'left' }}>
            生成題目，並且可以 <strong style={{ color: colors.orange }}>一鍵匯出 Word</strong>
          </div>
        </div>
        <div style={{ background: 'rgba(14, 165, 233, 0.08)', borderRadius: 14, padding: '14px 18px', fontSize: '24px', color: colors.muted, fontWeight: 700, marginTop: 20 }}>
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
    <TextbookHeader unit="單元三" title="實作範例︰起點行為評量助手" subtitle="一句咒語啟動 Gemini Canvas" />
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 36, flex: 1, zIndex: 2, minHeight: 0, alignItems: 'center' }}>
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
        <div style={{ fontSize: '24px', fontWeight: 900, color: colors.accent, marginBottom: 12, paddingLeft: 8 }}>
          🖥️ Gemini Canvas 輸入截圖
        </div>
        <img
          src={imgGeminiCanvasInput}
          alt="Gemini Canvas 輸入畫面"
          style={{ width: '100%', height: 'auto', maxHeight: 500, objectFit: 'contain', borderRadius: 16 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          className="es-fadeUp"
          style={{
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 41, 59, 0.94) 100%)',
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
          <div style={{ color: colors.orange, fontSize: '24px', fontWeight: 950, marginBottom: 12 }}>
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
            <strong>1. 打開 Gemini：</strong>登入常用 Google 帳號。<br />
            <strong>2. 勾選 Canvas：</strong>點對話框左下角「+」，啟用 <strong>Canvas</strong>。<br />
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
    desc="貼入自己準備的教材，動手產出專屬自己班級的出題生成工具！"
    steps={[
      '打開 Gemini，在對話框點選左下角「+」啟用 Canvas 工作區',
      '貼入三要素咒語：做一個起點行為評量助手，貼上教材選題型，匯出 Word',
      '右側工具生成後，貼入今天手邊準備的教材，測試生成出題與下載 Word 考卷！',
    ]}
    href="https://gemini.google.com"
    linkText="🚀 前往 Gemini 開啟 Canvas"
  />
);

// Slide 26: 漸進式調校：讓出題工具更懂特教 (精簡版)
const Slide21_IterativeRefinement: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader unit="單元三" title="進階調校︰讓工具更符合特教需求" subtitle="三階段逐步疊加特教鷹架" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 30, flex: 1, zIndex: 2, alignItems: 'center' }}>
      <Unit2Card num="01" title="第一版：核心跑通" delay={0.1}>
        輸入學習內容 ➔ 點選 3 題選擇題 ➔ 測試 Word 匯出按鈕能否正常下載。確認流程通暢。
      </Unit2Card>

      <Unit2Card num="02" title="第二版：加特教欄位" delay={0.2} accent={colors.orange}>
        請 AI 加上：「年級選擇」、「學生現況描述欄」、「大字級 16pt / 雙倍行距」與提示詞。
      </Unit2Card>

      <Unit2Card num="03" title="第三版：對齊特需指標" delay={0.3}>
        加入特殊需求領域（社會技巧、生活管理、學習策略），讓題目情境自動融入特需能力！
      </Unit2Card>
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
        boxShadow: '0 18px 40px rgba(15, 23, 42, 0.14)',
      }}
    >
      💡 Vibe Coding 核心心法：<strong>「先做陽春版，再一句一句請它修改」</strong>，比一次寫很長更精準！
    </div>
    <TextbookFooter subtitle="第三部分：工具迭代與調校" />
  </div>
);

// Slide 27: 工具完成後的三大檢驗點 (精簡版)
const Slide22_QualityCheck: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader unit="單元三" title="品質檢視︰完成後的三大檢查點" subtitle="確保教材可直接用於教學現場" />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, flex: 1, zIndex: 2, alignItems: 'center' }}>
      <Unit2Card num="01" title="內容適切度" delay={0.1}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '28px', textAlign: 'left' }}>
          <div>✓ 題目是否切合學生真實起點？</div>
          <div>✓ 題幹文字是否簡潔明瞭無冗詞？</div>
          <div>✓ 選項之間是否有足夠區辨度？</div>
        </div>
      </Unit2Card>

      <Unit2Card num="02" title="匯出與排版" delay={0.2} accent={colors.orange}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '28px', textAlign: 'left' }}>
          <div>✓ 點擊「匯出 Word」可正常下載？</div>
          <div>✓ 字級是否達 14~16pt 友善標準？</div>
          <div>✓ 是否保留足夠手寫與作答空間？</div>
        </div>
      </Unit2Card>

      <Unit2Card num="03" title="工作流留存" delay={0.3}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '28px', textAlign: 'left' }}>
          <div>✓ 網頁是否已加入我的最愛書籤？</div>
          <div>✓ 下週換新素材，1 分鐘內快速出題？</div>
          <div>✓ 是否能分享給同校特教夥伴使用？</div>
        </div>
      </Unit2Card>
    </div>

    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        marginTop: 26,
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(16px)',
        border: '2px solid rgba(244, 63, 94, 0.4)',
        borderRadius: 20,
        padding: '20px 32px',
        textAlign: 'center',
        fontSize: '32px',
        fontWeight: 950,
        color: colors.orange,
        boxShadow: '0 16px 36px rgba(244, 63, 94, 0.12)',
      }}
    >
      🎉 只要這三點都過關，你就真正擁有了一套專屬的「自製 AI 備課出題助理」！
    </div>
    <TextbookFooter subtitle="第三部分：產出品質與工作流驗證" />
  </div>
);

// Slide 28: 今天的總結與閉幕
const Slide23_ClosingSummary: Page = () => (
  <div style={{ ...fill, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <TextbookBg />
    <div style={{ zIndex: 2, maxWidth: 1560 }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: colors.accentMuted,
          color: colors.accent,
          borderRadius: 999,
          padding: '10px 28px',
          fontSize: '26px',
          fontWeight: 900,
          marginBottom: 24,
        }}
      >
        <span>本日研習總結</span>
      </div>
      <h2 style={{ fontSize: '84px', fontWeight: 900, color: colors.text, margin: '0 0 20px 0', lineHeight: 1.15 }}>
        特教教師的 AI 工作流
      </h2>
      <p style={{ fontSize: '36px', color: colors.muted, margin: '0 0 46px 0', fontWeight: 600 }}>
        從解決一個具體痛點開始，讓 AI 永遠留在你的日常備課裡
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28, textAlign: 'left', marginBottom: 46 }}>
        <Unit2Card num="01" title="先求快速出第一版" delay={0.1}>
          利用 IEP 生成器、國文學習單、逐句繪話師與數題數題，快速獲得教材草稿。
        </Unit2Card>
        <Unit2Card num="02" title="打造適性互動鷹架" delay={0.2} accent={colors.orange}>
          將題目轉化為句型重組與互動步驟數學，給予即時回饋，讓特質學生自主參與。
        </Unit2Card>
        <Unit2Card num="03" title="自製專屬備課工具" delay={0.3}>
          透過 Gemini Canvas Vibe Coding 說出需求，打造真正切合自己班級的出題助手。
        </Unit2Card>
      </div>

      <div style={{ fontSize: '44px', fontWeight: 950, color: colors.accent, letterSpacing: '0.04em' }}>
        謝謝各位老師 · 朱旆誼 敬祝 教學順心！
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
  Slide02c_Social,
  Slide06_MixerIntro,
  Slide03_Agenda,
  Slide04_Part1Header,
  Slide05_AdminIep,
  Slide06_Practice_IEP,
  Slide08_ChineseLessonWorksheet,
  Slide08_Practice_Chinese,
  Slide09_StoryIllustrator,
  Slide09_Practice_Story,
  Slide10_MathVariation,
  Slide10_Practice_Math,
  Slide11_Part2Header,
  Slide14_WebTool1,
  Slide14_Practice_Unscramble,
  Slide15_InteractiveMath,
  Slide15_Practice_StepMath,
  Slide17_Part3Header,
  Slide18_Preparation,
  Slide19_VibePromptStructure,
  Slide20_GeminiCanvasPractice,
  Slide20_Practice_Canvas,
  Slide21_IterativeRefinement,
  Slide22_QualityCheck,
  Slide23_ClosingSummary,
] satisfies Page[];
