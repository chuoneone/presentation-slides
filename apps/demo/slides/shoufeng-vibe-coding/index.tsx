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
import { useCallback, useEffect, useState, type CSSProperties, type ReactNode } from 'react';
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
import spedmixQr from './assets/spedmix-qr.png';
import headshot from './assets/headshot.png';
import imgMixerTeaching from './assets/mixer-teaching.png';

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
  duration: 380,
  exit: {
    duration: 180,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0) scale(1)' },
      { opacity: 0, transform: 'translateY(-10px) scale(0.995)' },
    ],
  },
  enter: {
    duration: 380,
    delay: 60,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(20px) scale(0.992)', filter: 'blur(2px)' },
      { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
    ],
  },
};

const sectionTransition: SlideTransition = {
  duration: 460,
  exit: {
    duration: 200,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0) scale(1)' },
      { opacity: 0, transform: 'translateY(-14px) scale(0.99)' },
    ],
  },
  enter: {
    duration: 460,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(30px) scale(0.985)', filter: 'blur(5px)' },
      { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
    ],
  },
};

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  fontFamily: 'var(--osd-font-body)',
};

const pageMotionStyles = `
@keyframes shoufeng-rise {
  from { opacity: 0; transform: translateY(24px); filter: blur(3px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes shoufeng-card-in {
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes shoufeng-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
.shoufeng-page-shell .shoufeng-grid-texture {
  animation: shoufeng-fade 900ms ease-out both;
}
.shoufeng-page-shell .shoufeng-eyebrow {
  animation: shoufeng-rise 480ms ${EASE_OUT} 60ms both;
}
.shoufeng-page-shell .shoufeng-content > :not([data-osd-step]) {
  animation: shoufeng-rise 620ms ${EASE_OUT} both;
}
.shoufeng-page-shell .shoufeng-content > :not([data-osd-step]):nth-child(1) { animation-delay: 120ms; }
.shoufeng-page-shell .shoufeng-content > :not([data-osd-step]):nth-child(2) { animation-delay: 220ms; }
.shoufeng-page-shell .shoufeng-content > :not([data-osd-step]):nth-child(3) { animation-delay: 320ms; }
.shoufeng-page-shell .shoufeng-content > :not([data-osd-step]):nth-child(4) { animation-delay: 420ms; }
.shoufeng-page-shell .shoufeng-stagger > * {
  animation: shoufeng-card-in 620ms ${EASE_OUT} both;
}
.shoufeng-page-shell .shoufeng-stagger > *:nth-child(1) { animation-delay: 300ms; }
.shoufeng-page-shell .shoufeng-stagger > *:nth-child(2) { animation-delay: 400ms; }
.shoufeng-page-shell .shoufeng-stagger > *:nth-child(3) { animation-delay: 500ms; }
.shoufeng-page-shell .shoufeng-stagger > *:nth-child(4) { animation-delay: 600ms; }
.shoufeng-page-shell .shoufeng-stagger > *:nth-child(5) { animation-delay: 700ms; }
.shoufeng-page-shell .shoufeng-stagger > *:nth-child(n + 6) { animation-delay: 800ms; }
.shoufeng-page-shell .shoufeng-footer {
  animation: shoufeng-fade 520ms ease-out 520ms both;
}
@media print, (prefers-reduced-motion: reduce) {
  .shoufeng-page-shell *,
  .shoufeng-page-shell *::before,
  .shoufeng-page-shell *::after {
    animation: none !important;
    transition-duration: 0ms !important;
  }
}
`;

// ==========================================
// 實作計時器 Persistent State & Audio Utility
// ==========================================

const TIMER_STORAGE_KEY = '__SHOUFENG_PRACTICE_TIMER__';
const TIMER_UPDATE_EVENT = 'shoufeng_timer_update';

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
    practiceNumber: '實作時間',
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
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
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

function useWorkshopTimer(initialMinutes: number = 10, defaultPracticeName: string = '實作時間') {
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
        top: 20,
        right: 48,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 18px',
        borderRadius: 999,
        background: isFinished ? coral : '#183833',
        color: '#ffffff',
        boxShadow: '0 14px 34px rgba(0,0,0,0.32)',
        border: `2px solid ${isFinished ? yellow : cyan}`,
        fontFamily: mono,
        backdropFilter: 'blur(8px)',
      }}
    >
      <span style={{ fontSize: 20 }}>⏱️</span>
      <span style={{ color: yellow, fontSize: 16, fontWeight: 950 }}>
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
          background: state.isRunning ? yellow : coral,
          color: '#1a2b27',
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
          color: '#ffffff',
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
  const moodBackgroundColor =
    mood === 'green'
      ? '#dcece6'
      : mood === 'blue'
        ? '#e6f0ef'
        : mood === 'warm'
          ? '#f6efd9'
          : 'var(--osd-bg)';
  return (
    <div
      className="shoufeng-page-shell"
      style={{
        ...fill,
        position: 'relative',
        display: 'grid',
        gridTemplateRows: '46px 1fr 38px',
        padding: '58px 116px 44px',
        color: 'var(--osd-text)',
        background: moodBackground,
        backgroundColor: moodBackgroundColor,
      }}
    >
      <GlobalTimerFloatingBar />
      <style>{pageMotionStyles}</style>
      <div
        aria-hidden="true"
        className="shoufeng-grid-texture"
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
        className="shoufeng-eyebrow"
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
        className="shoufeng-content"
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
        className="shoufeng-footer"
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

const Slide01Speaker: Page = () => (
  <PageShell eyebrow="00 · 講師介紹" accent={cyan} mood="warm">
    <Title size={68} margin="0 0 20px">介紹</Title>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '340px 1fr',
        gap: 28,
        alignItems: 'stretch',
        minHeight: 0,
      }}
    >
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderRadius: 24,
          padding: '24px 20px',
          boxShadow: '0 16px 34px rgba(55, 76, 73, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 18,
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: 46,
            lineHeight: 1.1,
            fontWeight: 950,
            color: '#27343b',
            margin: 0,
          }}
        >朱旆誼</h3>
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: '50%',
            padding: 6,
            background: '#ffffff',
            border: `6px solid ${coral}`,
            boxShadow: '0 14px 32px rgba(238, 154, 131, 0.35)',
            overflow: 'hidden',
          }}
        >
          <img
            src={headshot}
            alt="朱旆誼 老師"
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
          <MonoTag color={cyan}>Chu pei yi</MonoTag>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '0.78fr 1.22fr',
          gap: 18,
          minHeight: 0,
        }}
      >
        <div
          style={{
            background: panel,
            border: '1px solid rgba(39, 52, 59, 0.18)',
            borderLeft: `10px solid ${cyan}`,
            borderRadius: 22,
            padding: '20px 32px',
            boxShadow: '0 14px 30px rgba(55, 76, 73, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 34,
              lineHeight: 1.1,
              fontWeight: 950,
              color: '#245257',
              margin: '0 0 10px 0',
            }}
          >
            🎓 學歷
          </h3>
          <ul
            style={{
              paddingLeft: 26,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontSize: 30,
              lineHeight: 1.35,
              color: '#27343b',
            }}
          >
            <li>
              <strong style={{ fontWeight: 900 }}>國立彰化師範大學</strong> 特殊教育學系（資訊工程輔系）
            </li>
            <li>
              <strong style={{ fontWeight: 900 }}>國立東華大學</strong> 資訊管理所 碩士
            </li>
            <li>
              <strong style={{ fontWeight: 900 }}>國立台灣師範大學</strong> 資訊教育學系博士班（就讀中）
            </li>
          </ul>
        </div>
        <div
          style={{
            background: panel,
            border: '1px solid rgba(39, 52, 59, 0.18)',
            borderLeft: `10px solid ${coral}`,
            borderRadius: 22,
            padding: '20px 32px',
            boxShadow: '0 14px 30px rgba(55, 76, 73, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 34,
              lineHeight: 1.1,
              fontWeight: 950,
              color: coral,
              margin: '0 0 10px 0',
            }}
          >
            🏫 經歷
          </h3>
          <ul
            style={{
              paddingLeft: 26,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontSize: 30,
              lineHeight: 1.35,
              color: '#27343b',
            }}
          >
            <li>
              <strong style={{ fontWeight: 900 }}>宜蘭縣凱旋國中</strong> 資源班教師
            </li>
            <li>
              <strong style={{ fontWeight: 900 }}>花蓮縣平和國中</strong>{' 資源班教師（兼巡迴輔導）'}
            </li>
            <li>
              <strong style={{ color: '#1a4b43', fontWeight: 900 }}>米克師 AI 備課幫手 創辦人</strong>：自製多種 AI 教材工具
            </li>
            <li>
              <strong style={{ color: '#1a4b43', fontWeight: 900 }}>特教教材共享平台 發起人</strong>：建立特師教材共享生態
            </li>
            <li>
              <strong style={{ color: '#1a4b43', fontWeight: 900 }}>特教 AI 研習講師</strong>：受邀於各縣市特教輔導團與學校分享
            </li>
          </ul>
        </div>
      </div>
    </div>
  </PageShell>
);
Slide01Speaker.transition = sectionTransition;

const AgendaCard = ({
  label,
  title,
  color,
  href,
}: {
  label: string;
  title: string;
  color: string;
  href: string;
}) => (
  <a
    href={href}
    aria-label={`前往${title}`}
    style={{
      display: 'block',
      minHeight: 180,
      padding: '24px 28px',
      border: '1px solid rgba(39, 52, 59, 0.18)',
      borderTop: `12px solid ${color}`,
      background: panel,
      boxShadow: '0 12px 24px rgba(55, 76, 73, 0.08)',
      color: 'inherit',
      textDecoration: 'none',
      borderRadius: 18,
    }}
  >
    <div
      style={{ color, fontFamily: mono, fontSize: 26, fontWeight: 900, letterSpacing: '0.08em' }}
    >
      {label}
    </div>
    <div style={{ marginTop: 24, fontSize: 36, fontWeight: 950, lineHeight: 1.25 }}>{title}</div>
  </a>
);

const Slide02WorkshopAgenda: Page = () => (
  <PageShell eyebrow="WORKSHOP MAP · 180 MINUTES" accent={coral} mood="warm">
    <Title size={76} margin="0 0 16px">
      今天會完成六個 PART
    </Title>
    <div style={{ marginBottom: 28, color: muted, fontSize: 30, fontWeight: 750 }}>
      PART 01 → PART 02 → PART 03 → PART 04 → PART 05 → PART 06
    </div>
    <div
      className="shoufeng-stagger"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}
    >
      <AgendaCard label="PART 01" title="註冊 GitHub 帳戶" color={cyan} href="?p=7" />
      <AgendaCard label="PART 02" title="用 Gemini 生成網頁" color={mint} href="?p=14" />
      <AgendaCard label="PART 03" title="上傳到 GitHub" color={yellow} href="?p=20" />
      <AgendaCard label="PART 04" title="發布 GitHub Pages" color={cyan} href="?p=24" />
      <AgendaCard label="PART 05" title="用 Antigravity 協作" color={coral} href="?p=30" />
      <AgendaCard label="PART 06" title="用 Git 留下版本紀錄" color={mint} href="?p=37" />
    </div>
  </PageShell>
);
Slide02WorkshopAgenda.transition = sectionTransition;

const Slide02Outcome: Page = () => (
  <PageShell eyebrow="00 · 成果範例" accent={cyan} mood="warm">
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}
    >
      <Title size={72} margin="0">
        範例展示：步步練
      </Title>
      <a
        href="https://spedmixteaching.pages.dev/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 22px',
          background: cyan,
          color: '#ffffff',
          borderRadius: 999,
          fontFamily: mono,
          fontSize: 22,
          fontWeight: 900,
          textDecoration: 'none',
          boxShadow: '0 8px 20px rgba(120, 174, 178, 0.32)',
        }}
      >
        <span>開啟網站 ↗</span>
      </a>
    </div>
    <div style={{ width: 1380, margin: '0 auto' }}>
      <WindowFrame title="https://spedmixteaching.pages.dev/" accent={cyan} height={560}>
        <a
          href="https://spedmixteaching.pages.dev/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(39, 52, 59, 0.12)',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <img
            src={imgMixerTeaching}
            alt="步步練 網站畫面截圖"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              padding: '8px 18px',
              background: 'rgba(24, 56, 51, 0.88)',
              color: '#ffffff',
              borderRadius: 10,
              fontFamily: mono,
              fontSize: 18,
              fontWeight: 800,
              backdropFilter: 'blur(6px)',
            }}
          >
            點擊可直接前往真實網站 ↗
          </div>
        </a>
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
    <div
      className="shoufeng-stagger"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}
    >
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
          className="shoufeng-stagger"
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
  actionLabel,
  actionHref,
}: {
  part: string;
  title: string;
  description: string;
  accent: string;
  actionLabel?: string;
  actionHref?: string;
}) => (
  <PageShell eyebrow="GITHUB 網頁發布工作流" accent={accent} mood="blue">
    <div
      className="shoufeng-stagger"
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
      {actionLabel && actionHref ? (
        <a
          href={actionHref}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            marginTop: 34,
            padding: '17px 26px',
            border: `2px solid ${accent}`,
            borderRadius: 999,
            color: '#183b38',
            background: accent,
            boxShadow: `0 12px 24px ${accent}44`,
            fontSize: 30,
            fontWeight: 950,
            textDecoration: 'none',
          }}
        >
          {actionLabel}
          <span aria-hidden="true" style={{ fontSize: 34, lineHeight: 1 }}>
            ↗
          </span>
        </a>
      ) : null}
    </div>
  </PageShell>
);

const PracticeCountdownWidget = ({
  practiceNumber = '實作時間',
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
        maxWidth: 620,
        margin: '0 auto',
      }}
    >
      {/* Digital Clock */}
      <div
        style={{
          fontFamily: mono,
          fontSize: 100,
          fontWeight: 950,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: isFinished ? coral : isRunning ? yellow : '#ffffff',
          textShadow: isRunning ? '0 0 28px rgba(241, 212, 123, 0.45)' : 'none',
          transition: 'color 0.3s ease',
        }}
      >
        {formatTimerClock(displayRemaining)}
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: 10,
          background: 'rgba(255, 255, 255, 0.16)',
          borderRadius: 99,
          margin: '20px 0 22px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: isFinished ? coral : `linear-gradient(90deg, ${yellow}, ${coral})`,
            borderRadius: 99,
            transition: 'width 0.4s linear',
          }}
        />
      </div>

      {/* Primary Action Button */}
      <div style={{ display: 'flex', gap: 12, width: '100%', marginBottom: 14 }}>
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
            padding: '16px 20px',
            background: isRunning ? yellow : coral,
            color: isRunning ? '#183833' : '#ffffff',
            border: 'none',
            borderRadius: 16,
            fontSize: 24,
            fontWeight: 950,
            cursor: 'pointer',
            boxShadow: '0 10px 24px rgba(0,0,0,0.22)',
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
            padding: '16px 20px',
            background: 'rgba(255, 255, 255, 0.14)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 16,
            fontSize: 22,
            fontWeight: 900,
            cursor: 'pointer',
          }}
        >
          ↺
        </button>
      </div>

      {/* Quick Adjust Buttons */}
      <div style={{ display: 'flex', gap: 10, width: '100%', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => addSeconds(60)}
          style={{
            flex: 1,
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.08)',
            color: 'rgba(255, 255, 255, 0.88)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: 10,
            fontSize: 16,
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
            padding: '8px 12px',
            background: 'rgba(255, 255, 255, 0.08)',
            color: 'rgba(255, 255, 255, 0.88)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: 10,
            fontSize: 16,
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

const PracticeBreak = ({
  partNumber = 'PART 01',
  title = '實作時間 10 分鐘',
  minutes = 10,
}: {
  partNumber?: string;
  title?: string;
  minutes?: number;
}) => (
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
    <GlobalTimerFloatingBar />
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
    <div
      style={{
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: '6px 20px',
          background: coral,
          color: '#ffffff',
          fontFamily: mono,
          fontSize: 22,
          fontWeight: 950,
          borderRadius: 999,
          letterSpacing: '0.08em',
        }}
      >
        {partNumber} · HANDS ON
      </div>

      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 78,
          fontWeight: 950,
          lineHeight: 1.1,
          letterSpacing: '0.04em',
        }}
      >
        {title}
      </h2>

      <div
        style={{
          background: '#183833',
          padding: '36px 44px 28px',
          borderRadius: 28,
          boxShadow: '0 24px 60px rgba(24, 56, 51, 0.28)',
          width: 580,
        }}
      >
        <PracticeCountdownWidget practiceNumber={`${partNumber} · ${title}`} initialMinutes={minutes} />
      </div>
    </div>
  </div>
);

const Part01Practice: Page = () => (
  <PracticeBreak partNumber="PART 01" title="實作時間 10 分鐘" minutes={10} />
);

const Slide22InspirationIdeas: Page = () => (
  <PageShell eyebrow="PART 02 · 網站主題靈感" accent={yellow} mood="warm">
    <div style={{ marginBottom: 16 }}>
      <Title size={66} margin="0 0 8px">
        不知道做什麼？挑一個主題開始！
      </Title>
      <div style={{ color: muted, fontSize: 26, fontWeight: 800 }}>
        不用從零思考！挑選下方 6 大主題，直接告訴 Gemini 你的需求：
      </div>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 18,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      {/* 1 */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `8px solid ${cyan}`,
          borderRadius: 20,
          padding: '22px 24px',
          boxShadow: '0 10px 24px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 28, fontWeight: 950, color: '#245257' }}>
            🏫 教師個人小站
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              padding: '3px 10px',
              borderRadius: 6,
              background: 'rgba(120, 174, 178, 0.22)',
              color: '#1a4b43',
            }}
          >
            新手推薦
          </span>
        </div>
        <div style={{ fontSize: 22, color: '#27343b', fontWeight: 800, lineHeight: 1.45 }}>
          自我介紹、任教科目、教育理念、推薦好書、聯絡與社群方式。
        </div>
      </div>

      {/* 2 */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `8px solid ${mint}`,
          borderRadius: 20,
          padding: '22px 24px',
          boxShadow: '0 10px 24px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 28, fontWeight: 950, color: '#27523f' }}>
            📚 課程學習導航
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              padding: '3px 10px',
              borderRadius: 6,
              background: 'rgba(169, 207, 189, 0.35)',
              color: '#1d4834',
            }}
          >
            教學實用
          </span>
        </div>
        <div style={{ fontSize: 22, color: '#27343b', fontWeight: 800, lineHeight: 1.45 }}>
          單元重點摘要卡片、核心概念、延伸影音連結、課堂小叮嚀。
        </div>
      </div>

      {/* 3 */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `8px solid ${yellow}`,
          borderRadius: 20,
          padding: '22px 24px',
          boxShadow: '0 10px 24px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 28, fontWeight: 950, color: '#7a5a12' }}>
            🎯 學生專題成果展
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              padding: '3px 10px',
              borderRadius: 6,
              background: 'rgba(241, 212, 123, 0.35)',
              color: '#654807',
            }}
          >
            成果展覽
          </span>
        </div>
        <div style={{ fontSize: 22, color: '#27343b', fontWeight: 800, lineHeight: 1.45 }}>
          各組專題作品、圖片預覽框、作品簡介、評語與回饋區。
        </div>
      </div>

      {/* 4 */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `8px solid ${coral}`,
          borderRadius: 20,
          padding: '22px 24px',
          boxShadow: '0 10px 24px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 28, fontWeight: 950, color: '#96392b' }}>
            🧩 課堂趣味問答測驗
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              padding: '3px 10px',
              borderRadius: 6,
              background: 'rgba(238, 154, 131, 0.35)',
              color: '#82271a',
            }}
          >
            互動首選
          </span>
        </div>
        <div style={{ fontSize: 22, color: '#27343b', fontWeight: 800, lineHeight: 1.45 }}>
          3~5 題單選問答、點選即時正誤回饋、計分器與通關彩帶。
        </div>
      </div>

      {/* 5 */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `8px solid #4f7480`,
          borderRadius: 20,
          padding: '22px 24px',
          boxShadow: '0 10px 24px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 28, fontWeight: 950, color: '#2c4b57' }}>
            🏡 班級生活日誌
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              padding: '3px 10px',
              borderRadius: 6,
              background: 'rgba(79, 116, 128, 0.22)',
              color: '#1d353f',
            }}
          >
            導師必備
          </span>
        </div>
        <div style={{ fontSize: 22, color: '#27343b', fontWeight: 800, lineHeight: 1.45 }}>
          班級公約、每週值日生、重要行事曆、活動照片牆、家長小叮嚀。
        </div>
      </div>

      {/* 6 */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `8px solid #8e629c`,
          borderRadius: 20,
          padding: '22px 24px',
          boxShadow: '0 10px 24px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 28, fontWeight: 950, color: '#593863' }}>
            🧘 心情充電解憂角
          </span>
          <span
            style={{
              fontSize: 15,
              fontWeight: 900,
              padding: '3px 10px',
              borderRadius: 6,
              background: 'rgba(142, 98, 156, 0.22)',
              color: '#46274e',
            }}
          >
            多元支持
          </span>
        </div>
        <div style={{ fontSize: 22, color: '#27343b', fontWeight: 800, lineHeight: 1.45 }}>
          心情溫度計、深呼吸放鬆指引、暖心正能量小語、預約諮商信箱。
        </div>
      </div>
    </div>
  </PageShell>
);
Slide22InspirationIdeas.transition = sectionTransition;

const Part02Practice: Page = () => (
  <PageShell eyebrow="PART 02 · 現場實作 15 分鐘" accent={yellow} mood="warm">
    <div style={{ marginBottom: 20 }}>
      <Title size={68} margin="0 0 10px">
        用 Gemini Canvas 生成你的第一個網頁
      </Title>
      <div style={{ color: muted, fontSize: 30, fontWeight: 850 }}>
        請在 Gemini 說出剛才挑選的主題需求，並在右側 Canvas 即時預覽與調整
      </div>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        alignItems: 'stretch',
        minHeight: 0,
      }}
    >
      {/* 1. Left Column: 4 Steps */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `8px solid ${cyan}`,
          borderRadius: 24,
          padding: '28px 30px',
          boxShadow: '0 12px 30px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
          <span style={{ fontSize: 32 }}>🎯</span>
          <h3 style={{ margin: 0, fontSize: 34, fontWeight: 950, color: '#245257' }}>
            實作 4 個步驟
          </h3>
        </div>

        <div
          style={{
            background: '#f6f3eb',
            border: '1px solid rgba(39, 52, 59, 0.12)',
            borderRadius: 16,
            padding: '14px 20px',
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 950, color: '#245257', marginBottom: 4 }}>
            01｜說出網站需求
          </div>
          <div style={{ fontSize: 20, color: '#27343b', fontWeight: 800, lineHeight: 1.4 }}>
            在 Gemini 對話框描述你想製作的主題、單元或個人簡介。
          </div>
        </div>

        <div
          style={{
            background: '#f6f3eb',
            border: '1px solid rgba(39, 52, 59, 0.12)',
            borderRadius: 16,
            padding: '14px 20px',
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 950, color: '#245257', marginBottom: 4 }}>
            02｜查看 Canvas 預覽
          </div>
          <div style={{ fontSize: 20, color: '#27343b', fontWeight: 800, lineHeight: 1.4 }}>
            點選右側 Canvas 畫布，即時查看 AI 生成的網頁視覺畫面。
          </div>
        </div>

        <div
          style={{
            background: '#f6f3eb',
            border: '1px solid rgba(39, 52, 59, 0.12)',
            borderRadius: 16,
            padding: '14px 20px',
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 950, color: '#245257', marginBottom: 4 }}>
            03｜對話微調 1~2 次
          </div>
          <div style={{ fontSize: 20, color: '#27343b', fontWeight: 800, lineHeight: 1.4 }}>
            針對顏色、文字或版面區塊，直接告訴 AI 想要調整之處。
          </div>
        </div>

        <div
          style={{
            background: '#f6f3eb',
            border: '1px solid rgba(39, 52, 59, 0.12)',
            borderRadius: 16,
            padding: '14px 20px',
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 950, color: '#245257', marginBottom: 4 }}>
            04｜下載或複製 HTML
          </div>
          <div style={{ fontSize: 20, color: '#27343b', fontWeight: 800, lineHeight: 1.4 }}>
            取得程式碼並確認檔名為 <code style={{ fontFamily: mono, color: coral, fontWeight: 900 }}>index.html</code>。
          </div>
        </div>
      </div>

      {/* 2. Right Column: 15-Min Timer */}
      <div
        style={{
          background: '#183833',
          border: '1px solid rgba(120, 174, 178, 0.35)',
          borderRadius: 24,
          padding: '36px 32px',
          boxShadow: '0 20px 48px rgba(24, 56, 51, 0.28)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PracticeCountdownWidget
          practiceNumber="PART 02 · 實作 15 分鐘"
          initialMinutes={15}
        />
      </div>
    </div>
  </PageShell>
);
const Part03Practice: Page = () => (
  <PracticeBreak partNumber="PART 03" title="實作時間 10 分鐘" minutes={10} />
);
const Part04Practice: Page = () => (
  <PracticeBreak partNumber="PART 04" title="實作時間 10 分鐘" minutes={10} />
);

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

const Slide17WhatIsGithub: Page = () => (
  <PageShell eyebrow="PART 01 · GITHUB 到底是什麼？" accent={cyan} mood="blue">
    <div style={{ marginBottom: 18 }}>
      <Title size={72} margin="0 0 10px">
        GitHub 是什麼？跟老師有什麼關係？
      </Title>
      <div style={{ color: muted, fontSize: 30, fontWeight: 800 }}>
        把它想像成「能把教材檔案直接變成公開網址」的免費雲端發布機
      </div>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 22,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      {/* 1. Free website host */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `10px solid ${cyan}`,
          borderRadius: 24,
          padding: '26px 26px',
          boxShadow: '0 14px 32px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 32, fontWeight: 950, color: '#245257' }}>
              🌐 免費個人教學網站
            </span>
            <span
              style={{
                fontSize: 17,
                fontWeight: 900,
                padding: '4px 12px',
                borderRadius: 6,
                background: 'rgba(120, 174, 178, 0.25)',
                color: '#1a4b43',
              }}
            >
              終生免費
            </span>
          </div>
          <div
            style={{
              background: '#f6f3eb',
              borderRadius: 14,
              padding: '16px 18px',
              fontSize: 23,
              color: '#27343b',
              fontWeight: 850,
              lineHeight: 1.45,
            }}
          >
            不用花錢買主機或租網域！把做好的網頁丟上去，GitHub <strong>直接送你專屬公開網址</strong>。
          </div>
        </div>
        <div style={{ fontSize: 20, color: muted, fontWeight: 800 }}>
          ✨ 教師個人頁、課程導航輕鬆上線
        </div>
      </div>

      {/* 2. Instant student access */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `10px solid ${mint}`,
          borderRadius: 24,
          padding: '26px 26px',
          boxShadow: '0 14px 32px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 32, fontWeight: 950, color: '#1f4e41' }}>
              📱 學生家長掃碼即用
            </span>
            <span
              style={{
                fontSize: 17,
                fontWeight: 900,
                padding: '4px 12px',
                borderRadius: 6,
                background: 'rgba(169, 207, 189, 0.35)',
                color: '#1d4834',
              }}
            >
              跨平台
            </span>
          </div>
          <div
            style={{
              background: '#f6f3eb',
              borderRadius: 14,
              padding: '16px 18px',
              fontSize: 23,
              color: '#27343b',
              fontWeight: 850,
              lineHeight: 1.45,
            }}
          >
            <strong>免安裝 App、免登入帳號</strong>，手機平板直接掃 QR Code 就能玩互動測驗與點讀學習單！
          </div>
        </div>
        <div style={{ fontSize: 20, color: muted, fontWeight: 800 }}>
          ✨ 特教點讀、生生用平板教學超方便
        </div>
      </div>

      {/* 3. Cloud safe */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `10px solid ${yellow}`,
          borderRadius: 24,
          padding: '26px 26px',
          boxShadow: '0 14px 32px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: 32, fontWeight: 950, color: '#7a5a12' }}>
              🔒 教材雲端永久保存
            </span>
            <span
              style={{
                fontSize: 17,
                fontWeight: 900,
                padding: '4px 12px',
                borderRadius: 6,
                background: 'rgba(241, 212, 123, 0.35)',
                color: '#654807',
              }}
            >
              永不遺失
            </span>
          </div>
          <div
            style={{
              background: '#f6f3eb',
              borderRadius: 14,
              padding: '16px 18px',
              fontSize: 23,
              color: '#27343b',
              fontWeight: 850,
              lineHeight: 1.45,
            }}
          >
            不怕隨身碟壞掉或換電腦檔案不見！所有版本修改都有紀錄，更是 <strong>AI Agent 協作的雲端基地</strong>。
          </div>
        </div>
        <div style={{ fontSize: 20, color: muted, fontWeight: 800 }}>
          ✨ 連接 Antigravity 一鍵推播更新
        </div>
      </div>
    </div>

    {/* Bottom summary bar */}
    <div
      style={{
        marginTop: 18,
        padding: '14px 22px',
        background: '#27343b',
        borderRadius: 14,
        color: '#fdf4c8',
        fontSize: 23,
        fontWeight: 900,
        textAlign: 'center',
      }}
    >
      💡 <strong>一句話搞懂 GitHub：</strong>它是你的「教材雲端硬碟 ＋ 免費網站發布機」，讓你的作品隨時能分享給全世界！
    </div>
  </PageShell>
);
Slide17WhatIsGithub.transition = sectionTransition;

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
        接下來可以持續更新內容，讓網站慢慢長大。
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
    part="PART 05 · ANTIGRAVITY"
    title="把 GitHub 網站帶進 Antigravity"
    description="建立本機專案資料夾，貼上 Repository 網址，讓 AI 協助你繼續修改網站。"
    accent={coral}
    actionLabel="下載 Antigravity"
    actionHref="https://antigravity.google/download"
  />
);

const BeginnerTag = ({ children, color }: { children: ReactNode; color: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      width: 'fit-content',
      minHeight: 54,
      padding: '0 20px',
      border: '1px solid rgba(39, 52, 59, 0.22)',
      borderRadius: 999,
      color,
      background: 'rgba(255, 253, 247, 0.92)',
      fontFamily: mono,
      fontSize: 28,
      fontWeight: 900,
      letterSpacing: '0.04em',
    }}
  >
    {children}
  </span>
);

const Slide36AgentVsChat: Page = () => (
  <PageShell eyebrow="PART 05 · AI AGENT" accent={coral} mood="warm">
    <Title size={74} margin="0 0 24px">
      AI Agent 不只回答，還會動手做
    </Title>
    <div style={{ marginBottom: 24, color: muted, fontSize: 33, fontWeight: 800 }}>
      一樣用對話交代事情，但它們能幫忙的範圍不一樣。
    </div>
    <div
      className="shoufeng-stagger"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}
    >
      <div
        style={{
          minHeight: 520,
          padding: '34px 36px',
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `8px solid ${cyan}`,
          borderRadius: 26,
          background: panel,
          boxShadow: '0 18px 38px rgba(55, 76, 73, 0.12)',
        }}
      >
        <BeginnerTag color={cyan}>對話框 AI</BeginnerTag>
        <h3 style={{ margin: '24px 0 10px', fontSize: 44, fontWeight: 900, lineHeight: 1.2 }}>
          像提供建議的顧問
        </h3>
        <p style={{ margin: 0, color: muted, fontSize: 31, lineHeight: 1.45 }}>
          你提問，它在對話框裡回答文字。
        </p>
        <div
          style={{
            margin: '28px 0',
            padding: '18px 22px',
            borderRadius: 16,
            color: '#27343b',
            background: 'rgba(120, 174, 178, 0.18)',
            fontSize: 34,
            fontWeight: 900,
          }}
        >
          你提問 → 它回答
        </div>
        <div style={{ display: 'grid', gap: 12, color: muted, fontSize: 30, lineHeight: 1.4 }}>
          <span>• 整理想法與資料</span>
          <span>• 產生文字內容</span>
          <span>• 回答問題、提供做法</span>
        </div>
      </div>
      <div
        style={{
          minHeight: 520,
          padding: '34px 36px',
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `8px solid ${coral}`,
          borderRadius: 26,
          background: panel,
          boxShadow: '0 18px 38px rgba(55, 76, 73, 0.12)',
        }}
      >
        <BeginnerTag color={coral}>AI AGENT · ANTIGRAVITY</BeginnerTag>
        <h3 style={{ margin: '24px 0 10px', fontSize: 44, fontWeight: 900, lineHeight: 1.2 }}>
          像坐在電腦前的協作助理
        </h3>
        <p style={{ margin: 0, color: muted, fontSize: 31, lineHeight: 1.45 }}>
          你交代任務，它會讀檔案、修改、預覽與檢查。
        </p>
        <div
          style={{
            margin: '28px 0',
            padding: '18px 22px',
            borderRadius: 16,
            color: '#27343b',
            background: 'rgba(238, 154, 131, 0.22)',
            fontSize: 34,
            fontWeight: 900,
          }}
        >
          你交代任務 → 它直接操作
        </div>
        <div style={{ display: 'grid', gap: 12, color: muted, fontSize: 30, lineHeight: 1.4 }}>
          <span>• 直接修改網站檔案</span>
          <span>• 一次處理多個頁面</span>
          <span>• 持續完成一連串步驟</span>
        </div>
      </div>
    </div>
    <div
      style={{
        marginTop: 20,
        padding: '16px 22px',
        borderLeft: `7px solid ${yellow}`,
        color: '#27343b',
        background: 'rgba(255, 253, 247, 0.78)',
        fontSize: 30,
        fontWeight: 850,
      }}
    >
      Agent 真的會動到檔案，所以請說清楚：要改哪一頁、改什麼、哪些不要動。
    </div>
  </PageShell>
);

const Slide37CopyRepositoryUrl: Page = () => (
  <GitHubStepPair
    eyebrow="PART 05 · ANTIGRAVITY"
    title="先複製 GitHub 專案網址"
    firstInstruction="步驟 1｜在 GitHub Repository 按 Code，複製 HTTPS 專案網址"
    firstImage={githubStep39}
    secondInstruction="步驟 2｜開啟 Antigravity，在 Projects 區按新增專案"
    secondImage={githubStep40}
  />
);

const Slide38CreateProjectFolder: Page = () => (
  <GitHubStepPair
    eyebrow="PART 05 · ANTIGRAVITY"
    title="建立自己的專案資料夾"
    firstInstruction="步驟 3｜選擇 New Project"
    firstImage={githubStep41}
    secondInstruction="步驟 4｜建立新資料夾並命名，例如 myhome，作為網站本機工作區"
    secondImage={githubStep43}
  />
);

const Slide39SelectProjectFolder: Page = () => (
  <GitHubStepPair
    eyebrow="PART 05 · ANTIGRAVITY"
    title="選擇資料夾並建立專案"
    firstInstruction="步驟 5｜回到 Create Project，確認已選取 myhome 資料夾後按 Next"
    firstImage={githubStep44}
    secondInstruction="步驟 6｜選擇適合的 Agent 安全設定，再完成專案建立"
    secondImage={githubStep45}
  />
);

const Slide40DownloadRepository: Page = () => (
  <GitHubStepPair
    eyebrow="PART 05 · ANTIGRAVITY"
    title="貼上網址，下載 GitHub 專案"
    firstInstruction="步驟 7｜輸入「下載」加上剛複製的 GitHub HTTPS 網址，讓 Antigravity 取得專案"
    firstImage={githubStep46}
  />
);

const Slide41AntigravityPossibilities: Page = () => {
  const possibilities = [
    ['01', '多頁網站', '加入首頁、課程、作品與聯絡頁。', coral],
    ['02', '教材集中管理', '圖片、講義與影片放在同一個專案。', mint],
    ['03', '持續更新', '直接說要改哪裡，Agent 幫你修改與檢查。', cyan],
  ] as const;

  return (
    <PageShell eyebrow="PART 05 · KEEP BUILDING" accent={mint} mood="green">
      <Title size={72} margin="0 0 20px">
        專案進入 Antigravity，網站就能繼續長大
      </Title>
      <div style={{ marginBottom: 28, color: muted, fontSize: 33, fontWeight: 800 }}>
        不用重做，只要在原本的網站上，一次增加一個需要的功能。
      </div>
      <div
        className="shoufeng-stagger"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}
      >
        {possibilities.map(([index, title, description, accent]) => (
          <div
            key={title}
            style={{
              display: 'flex',
              minHeight: 420,
              padding: '42px 44px',
              flexDirection: 'column',
              border: '1px solid rgba(39, 52, 59, 0.18)',
              borderTop: `9px solid ${accent}`,
              borderRadius: 28,
              background: panel,
              boxShadow: '0 20px 42px rgba(55, 76, 73, 0.13)',
            }}
          >
            <span
              style={{
                display: 'grid',
                width: 68,
                height: 68,
                placeItems: 'center',
                borderRadius: 18,
                color: '#27343b',
                background: accent,
                fontFamily: mono,
                fontSize: 27,
                fontWeight: 950,
              }}
            >
              {index}
            </span>
            <h3 style={{ margin: '34px 0 20px', fontSize: 48, fontWeight: 900, lineHeight: 1.15 }}>
              {title}
            </h3>
            <p style={{ margin: 0, color: muted, fontSize: 34, lineHeight: 1.5 }}>{description}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

const Slide42GitChapter: Page = () => (
  <GitHubChapter
    part="PART 06 · GIT"
    title="用 Git 留下版本紀錄"
    description="Git 是網站的版本紀錄本，記住每次修改，並與 GitHub 保持連線。"
    accent={cyan}
    actionLabel="下載 Git"
    actionHref="https://git-scm.com/downloads/"
  />
);

const Slide42GitBasics: Page = () => (
  <PageShell eyebrow="PART 06 · GIT BASICS" accent={cyan} mood="blue">
    <Title size={74} margin="0 0 22px">
      Git 是網站的「版本紀錄本」
    </Title>
    <div style={{ marginBottom: 28, color: muted, fontSize: 33, fontWeight: 800 }}>
      它會記住每次修改，也負責讓電腦裡的專案和 GitHub 保持連線。
    </div>
    <div
      className="shoufeng-stagger"
      style={{ display: 'grid', gridTemplateColumns: '1fr 86px 1fr', alignItems: 'stretch' }}
    >
      <div
        style={{
          minHeight: 410,
          padding: '38px 42px',
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `8px solid ${yellow}`,
          borderRadius: 26,
          background: panel,
          boxShadow: '0 16px 34px rgba(55, 76, 73, 0.11)',
        }}
      >
        <BeginnerTag color="#a36a00">電腦裡 · GIT</BeginnerTag>
        <h3 style={{ margin: '25px 0 18px', fontSize: 45, fontWeight: 900 }}>記住每一次修改</h3>
        <div style={{ display: 'grid', gap: 20, color: muted, fontSize: 32, lineHeight: 1.45 }}>
          <span>• 留下這次改了什麼</span>
          <span>• 改壞了，還能找回舊版本</span>
          <span>• 不必複製一堆「最終版」檔案</span>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          color: cyan,
          fontSize: 52,
          fontWeight: 950,
        }}
      >
        ⇄
      </div>
      <div
        style={{
          minHeight: 410,
          padding: '38px 42px',
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `8px solid ${cyan}`,
          borderRadius: 26,
          background: panel,
          boxShadow: '0 16px 34px rgba(55, 76, 73, 0.11)',
        }}
      >
        <BeginnerTag color={cyan}>網路上 · GITHUB</BeginnerTag>
        <h3 style={{ margin: '25px 0 18px', fontSize: 45, fontWeight: 900 }}>
          保存、發布與分享專案
        </h3>
        <div style={{ display: 'grid', gap: 20, color: muted, fontSize: 32, lineHeight: 1.45 }}>
          <span>• 保存網站的線上版本</span>
          <span>• 發布成大家能開啟的網址</span>
          <span>• 換電腦也能找回專案</span>
        </div>
      </div>
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 28,
        marginTop: 28,
        padding: '20px 24px 20px 30px',
        borderRadius: 22,
        background: '#27343b',
      }}
    >
      <div style={{ color: panel, fontSize: 32, fontWeight: 850, lineHeight: 1.4 }}>
        建議先安裝 Git。設定完成後，就不用一直到 GitHub 網頁重複上傳檔案。
      </div>
      <a
        href="https://git-scm.com/downloads/"
        target="_blank"
        rel="noreferrer"
        style={{
          flex: '0 0 auto',
          padding: '16px 30px',
          borderRadius: 999,
          color: '#27343b',
          background: yellow,
          fontSize: 30,
          fontWeight: 950,
          textDecoration: 'none',
        }}
      >
        下載 Git ↗
      </a>
    </div>
  </PageShell>
);

const Slide42GitStep1Install: Page = () => (
  <PageShell eyebrow="PART 06 · STEP 1 / 4" accent={cyan} mood="blue">
    <div style={{ marginBottom: 18 }}>
      <Title size={72} margin="0 0 10px">
        步驟 1｜在對話框請 AI 安裝 Git
      </Title>
      <div style={{ color: muted, fontSize: 30, fontWeight: 800 }}>
        不用手動搜尋下載安裝檔，直接讓 Antigravity 自動配置完成
      </div>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        gap: 28,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      {/* Prompt Card */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `10px solid ${cyan}`,
          borderRadius: 24,
          padding: '28px 32px',
          boxShadow: '0 14px 32px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 900,
              padding: '4px 14px',
              borderRadius: 8,
              background: 'rgba(120, 174, 178, 0.25)',
              color: '#1a4b43',
            }}
          >
            💬 對話框指令
          </span>
          <div
            style={{
              marginTop: 16,
              padding: '22px 26px',
              background: '#1d353f',
              borderRadius: 18,
              color: '#fdf4c8',
              fontFamily: mono,
              fontSize: 42,
              fontWeight: 950,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              textAlign: 'center',
            }}
          >
            「請你幫我安裝 Git」
          </div>
          <div
            style={{
              marginTop: 22,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              fontSize: 28,
              color: '#27343b',
              fontWeight: 850,
              lineHeight: 1.45,
            }}
          >
            <div>1️⃣ 打開 Antigravity 專案對話框</div>
            <div>2️⃣ 直接輸入「請你幫我安裝 Git」</div>
            <div>3️⃣ AI 自動檢查電腦環境並執行安裝</div>
          </div>
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#1a4b43',
            fontWeight: 850,
            background: '#eef6f2',
            padding: '12px 18px',
            borderRadius: 12,
          }}
        >
          💡 <strong>貼心提醒：</strong>AI 若詢問是否同意安裝，點擊「同意 / Approve」即可。
        </div>
      </div>

      {/* Why Git Card */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `10px solid ${mint}`,
          borderRadius: 24,
          padding: '28px 32px',
          boxShadow: '0 14px 32px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 900,
              padding: '4px 14px',
              borderRadius: 8,
              background: 'rgba(169, 207, 189, 0.35)',
              color: '#1d4834',
            }}
          >
            🌟 為什麼一定要裝 Git？
          </span>
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                background: '#f6f3eb',
                borderRadius: 16,
                padding: '16px 20px',
              }}
            >
              <div style={{ fontSize: 26, color: '#27343b', fontWeight: 950 }}>
                🚀 免去網頁重複上傳
              </div>
              <div style={{ fontSize: 22, color: muted, marginTop: 4, fontWeight: 750, lineHeight: 1.35 }}>
                之後修改網站，不用再手動把 HTML 檔案拖到 GitHub 網頁。
              </div>
            </div>
            <div
              style={{
                background: '#f6f3eb',
                borderRadius: 16,
                padding: '16px 20px',
              }}
            >
              <div style={{ fontSize: 26, color: '#27343b', fontWeight: 950 }}>
                🔄 完整版本存檔紀錄
              </div>
              <div style={{ fontSize: 22, color: muted, marginTop: 4, fontWeight: 750, lineHeight: 1.35 }}>
                每一次修改都有備份，改壞了也能隨時一鍵還原。
              </div>
            </div>
            <div
              style={{
                background: '#f6f3eb',
                borderRadius: 16,
                padding: '16px 20px',
              }}
            >
              <div style={{ fontSize: 26, color: '#27343b', fontWeight: 950 }}>
                🤖 Agent 必備連線工具
              </div>
              <div style={{ fontSize: 22, color: muted, marginTop: 4, fontWeight: 750, lineHeight: 1.35 }}>
                讓 Antigravity 可以直接幫你把本機專案推播到 GitHub。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageShell>
);
Slide42GitStep1Install.transition = sectionTransition;

const Slide42GitStep2Auth: Page = () => (
  <PageShell eyebrow="PART 06 · STEP 2 / 4" accent={yellow} mood="warm">
    <div style={{ marginBottom: 18 }}>
      <Title size={70} margin="0 0 10px">
        步驟 2｜首次權限認證（只需做一次！）
      </Title>
      <div style={{ color: muted, fontSize: 30, fontWeight: 800 }}>
        綁定你的 GitHub 帳號權限，終生只需在電腦上認證這一次
      </div>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 22,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      {/* Step 2.1 */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `10px solid ${cyan}`,
          borderRadius: 22,
          padding: '26px 26px',
          boxShadow: '0 12px 28px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 30, fontWeight: 950, color: '#245257' }}>
              01 · 開啟命令列
            </span>
            <span
              style={{
                fontSize: 17,
                fontWeight: 900,
                padding: '4px 10px',
                borderRadius: 6,
                background: 'rgba(120, 174, 178, 0.25)',
                color: '#1a4b43',
              }}
            >
              快捷鍵
            </span>
          </div>
          <div style={{ marginTop: 18, fontSize: 25, color: '#27343b', fontWeight: 850, lineHeight: 1.45 }}>
            按下鍵盤快捷鍵：
            <div
              style={{
                margin: '14px 0',
                padding: '14px 16px',
                background: '#27343b',
                borderRadius: 14,
                color: '#fdf4c8',
                fontFamily: mono,
                fontSize: 28,
                fontWeight: 950,
                textAlign: 'center',
              }}
            >
              Windows 鍵 ＋ R
            </div>
            輸入 <strong style={{ color: '#245257', fontFamily: mono, fontSize: 28 }}>CMD</strong> 並按 Enter，開啟「命令提示字元」。
          </div>
        </div>
        <div style={{ fontSize: 18, color: muted, fontWeight: 750 }}>
          💡 也可在 Antigravity 內建 Terminal 執行。
        </div>
      </div>

      {/* Step 2.2 */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `10px solid ${yellow}`,
          borderRadius: 22,
          padding: '26px 26px',
          boxShadow: '0 12px 28px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 30, fontWeight: 950, color: '#7a5a12' }}>
              02 · 貼上認證指令
            </span>
            <span
              style={{
                fontSize: 17,
                fontWeight: 900,
                padding: '4px 10px',
                borderRadius: 6,
                background: 'rgba(241, 212, 123, 0.35)',
                color: '#654807',
              }}
            >
              執行指令
            </span>
          </div>
          <div style={{ marginTop: 18, fontSize: 25, color: '#27343b', fontWeight: 850, lineHeight: 1.45 }}>
            AI 安裝好 Git 後，會在對話框提供一段認證指令。
            <div
              style={{
                margin: '14px 0',
                padding: '14px 16px',
                background: '#f6f3eb',
                borderRadius: 14,
                color: '#654807',
                fontFamily: mono,
                fontSize: 22,
                fontWeight: 900,
                border: '1px solid rgba(241, 212, 123, 0.5)',
                textAlign: 'center',
              }}
            >
              複製 AI 給的指令
            </div>
            在 CMD 視窗中<strong>右鍵貼上並按 Enter 執行</strong>。
          </div>
        </div>
        <div style={{ fontSize: 18, color: muted, fontWeight: 750 }}>
          💡 指令執行後會自動彈出瀏覽器認證網頁。
        </div>
      </div>

      {/* Step 2.3 */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `10px solid ${mint}`,
          borderRadius: 22,
          padding: '26px 26px',
          boxShadow: '0 12px 28px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 30, fontWeight: 950, color: '#1f4e41' }}>
              03 · 點擊授權按鈕
            </span>
            <span
              style={{
                fontSize: 17,
                fontWeight: 900,
                padding: '4px 10px',
                borderRadius: 6,
                background: 'rgba(169, 207, 189, 0.35)',
                color: '#1d4834',
              }}
            >
              綠色按鈕
            </span>
          </div>
          <div style={{ marginTop: 18, fontSize: 25, color: '#27343b', fontWeight: 850, lineHeight: 1.45 }}>
            瀏覽器會跳出 GitHub 授權視窗：
            <div
              style={{
                margin: '14px 0',
                padding: '14px 18px',
                background: '#2ea44f',
                borderRadius: 14,
                color: '#ffffff',
                fontSize: 26,
                fontWeight: 950,
                textAlign: 'center',
                boxShadow: '0 6px 16px rgba(46, 164, 79, 0.3)',
              }}
            >
              Authorize github ✓
            </div>
            點擊「<strong>認證</strong>」及「<strong>綠色按鈕</strong>」，即完成權限綁定！
          </div>
        </div>
        <div style={{ fontSize: 18, color: '#1d4834', fontWeight: 850 }}>
          🎉 成功綁定！此動作終生只需做一次。
        </div>
      </div>
    </div>
  </PageShell>
);
Slide42GitStep2Auth.transition = sectionTransition;

const Slide42GitStep3Push: Page = () => (
  <PageShell eyebrow="PART 06 · STEP 3 / 4" accent={coral} mood="warm">
    <div style={{ marginBottom: 18 }}>
      <Title size={72} margin="0 0 10px">
        步驟 3｜首次上傳（Push 至 GitHub）
      </Title>
      <div style={{ color: muted, fontSize: 30, fontWeight: 800 }}>
        權限認證完畢後，一句話讓 AI 把電腦裡的網站推上雲端
      </div>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        gap: 28,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      {/* Left: Prompt */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `10px solid ${coral}`,
          borderRadius: 24,
          padding: '28px 32px',
          boxShadow: '0 14px 32px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 900,
              padding: '4px 14px',
              borderRadius: 8,
              background: 'rgba(238, 154, 131, 0.35)',
              color: '#82271a',
            }}
          >
            💬 對話框指令
          </span>
          <div
            style={{
              marginTop: 16,
              padding: '22px 26px',
              background: '#1d353f',
              borderRadius: 18,
              color: '#fdf4c8',
              fontFamily: mono,
              fontSize: 34,
              fontWeight: 950,
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              lineHeight: 1.35,
              textAlign: 'center',
            }}
          >
            「幫我將做好的網站上傳到 GitHub」
          </div>
          <div
            style={{
              marginTop: 22,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              fontSize: 28,
              color: '#27343b',
              fontWeight: 850,
              lineHeight: 1.45,
            }}
          >
            <div>1️⃣ 認證完成後，回到 Antigravity 對話框</div>
            <div>2️⃣ 直接說「幫我將做好的網站上傳到 GitHub」</div>
            <div>3️⃣ AI 自動執行推播（Push）動作並回報結果</div>
          </div>
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#82271a',
            fontWeight: 850,
            background: '#fdf3f0',
            padding: '12px 18px',
            borderRadius: 12,
          }}
        >
          💡 <strong>小秘訣：</strong>也可以直接對 AI 說「幫我 Push」或「上傳」。
        </div>
      </div>

      {/* Right: What AI does */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `10px solid ${yellow}`,
          borderRadius: 24,
          padding: '28px 32px',
          boxShadow: '0 14px 32px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 900,
              padding: '4px 14px',
              borderRadius: 8,
              background: 'rgba(241, 212, 123, 0.35)',
              color: '#654807',
            }}
          >
            ⚙️ AI 在背景自動完成的三件事
          </span>
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                background: '#f6f3eb',
                borderRadius: 16,
                padding: '16px 20px',
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 950, color: cyan, fontFamily: mono }}>
                📦 git add .
              </div>
              <div style={{ fontSize: 22, color: muted, marginTop: 4, fontWeight: 750, lineHeight: 1.35 }}>
                自動打包所有新增與修改的網頁、圖片與檔案。
              </div>
            </div>
            <div
              style={{
                background: '#f6f3eb',
                borderRadius: 16,
                padding: '16px 20px',
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 950, color: '#9a7011', fontFamily: mono }}>
                🔖 git commit
              </div>
              <div style={{ fontSize: 22, color: muted, marginTop: 4, fontWeight: 750, lineHeight: 1.35 }}>
                為這次修改建立專屬存檔點與版本說明。
              </div>
            </div>
            <div
              style={{
                background: '#f6f3eb',
                borderRadius: 16,
                padding: '16px 20px',
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 950, color: coral, fontFamily: mono }}>
                🚀 git push
              </div>
              <div style={{ fontSize: 22, color: muted, marginTop: 4, fontWeight: 750, lineHeight: 1.35 }}>
                正式推播同步到 GitHub 遠端儲存庫，啟動自動部署！
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageShell>
);
Slide42GitStep3Push.transition = sectionTransition;

const Slide42GitStep4UpdateWorkflow: Page = () => (
  <PageShell eyebrow="PART 06 · STEP 4 / 4" accent={mint} mood="green">
    <div style={{ marginBottom: 18 }}>
      <Title size={70} margin="0 0 10px">
        步驟 4｜未來的日常更新與狀態確認
      </Title>
      <div style={{ color: muted, fontSize: 30, fontWeight: 800 }}>
        網站發布後的極簡工作流：對話交代修改 → 自動上傳 → 確認綠勾勾上線
      </div>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 28,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      {/* Left: Everyday workflow */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `10px solid ${mint}`,
          borderRadius: 24,
          padding: '28px 32px',
          boxShadow: '0 14px 32px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 900,
              padding: '4px 14px',
              borderRadius: 8,
              background: 'rgba(169, 207, 189, 0.35)',
              color: '#1d4834',
            }}
          >
            🔄 日常修改超直覺
          </span>
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                background: '#f6f3eb',
                borderRadius: 16,
                padding: '16px 20px',
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 950, color: '#27343b' }}>
                💬 1. 對話交代修改內容
              </div>
              <div style={{ fontSize: 24, color: '#1d4834', marginTop: 6, fontWeight: 900 }}>
                例如：「幫我增加一些西方歷史的內容」
              </div>
            </div>
            <div
              style={{
                background: '#f6f3eb',
                borderRadius: 16,
                padding: '16px 20px',
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 950, color: '#27343b' }}>
                🚀 2. AI 自動或手動上傳
              </div>
              <div style={{ fontSize: 22, color: muted, marginTop: 6, fontWeight: 750, lineHeight: 1.4 }}>
                AI 修改完通常會「自動」幫你上傳；也可以隨時對 AI 說「<strong>上傳</strong>」或「<strong>Push</strong>」。
              </div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 22, color: '#1d4834', fontWeight: 850 }}>
          ✨ 不需接觸任何複雜指令，動動嘴巴就能維護網站！
        </div>
      </div>

      {/* Right: Status Check */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(39, 52, 59, 0.18)',
          borderTop: `10px solid ${yellow}`,
          borderRadius: 24,
          padding: '28px 32px',
          boxShadow: '0 14px 32px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 14,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 20,
              fontWeight: 900,
              padding: '4px 14px',
              borderRadius: 8,
              background: 'rgba(241, 212, 123, 0.35)',
              color: '#654807',
            }}
          >
            👀 如何確認更新成功？（看 GitHub 燈號）
          </span>
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                background: '#fffbf0',
                border: '1px solid rgba(241, 212, 123, 0.55)',
                borderRadius: 16,
                padding: '16px 20px',
              }}
            >
              <div style={{ fontSize: 26, color: '#7a5a12', fontWeight: 950 }}>
                🟡 黃色 / 咖啡色圓點（Building）
              </div>
              <div style={{ fontSize: 22, color: muted, marginTop: 6, fontWeight: 750, lineHeight: 1.35 }}>
                代表 GitHub Pages 正在自動編譯與部署，稍候約 1~2 分鐘。
              </div>
            </div>
            <div
              style={{
                background: '#f0fdf4',
                border: '1px solid rgba(74, 222, 128, 0.45)',
                borderRadius: 16,
                padding: '16px 20px',
              }}
            >
              <div style={{ fontSize: 26, color: '#166534', fontWeight: 950 }}>
                🟢 綠色勾勾（Success）
              </div>
              <div style={{ fontSize: 22, color: muted, marginTop: 6, fontWeight: 750, lineHeight: 1.35 }}>
                代表已順利部署完成！
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#166534',
            fontWeight: 900,
            background: '#eefcf2',
            padding: '14px 18px',
            borderRadius: 12,
            textAlign: 'center',
          }}
        >
          🔄 <strong>最後一步：</strong>重新整理個人網頁（或按 Ctrl + F5），即可看到最新內容！
        </div>
      </div>
    </div>
  </PageShell>
);
Slide42GitStep4UpdateWorkflow.transition = sectionTransition;
Slide42GitStep4UpdateWorkflow.transition = sectionTransition;

const Slide43GitPlainLanguage: Page = () => {
  const actions = [
    ['CLONE', '第一次下載', '幫我把 GitHub 上的專案下載到電腦。', mint],
    ['PULL', '開始前更新', '幫我抓回 GitHub 上最新的版本。', cyan],
    ['COMMIT', '完成後留紀錄', '幫我把這次修改存成一個版本。', yellow],
    ['PUSH', '上傳到 GitHub', '幫我把剛才的修改上傳。', coral],
  ] as const;

  return (
    <PageShell eyebrow="PART 06 · SAY IT NATURALLY" accent={coral} mood="warm">
      <Title size={74} margin="0 0 20px">
        Git 指令不用背，直接說人話
      </Title>
      <div style={{ marginBottom: 26, color: muted, fontSize: 33, fontWeight: 800 }}>
        完成設定後，把想做的事告訴 Agent，它會幫你使用正確的 Git 動作。
      </div>
      <div
        className="shoufeng-stagger"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}
      >
        {actions.map(([command, title, phrase, accent]) => (
          <div
            key={command}
            style={{
              display: 'grid',
              gridTemplateColumns: '164px 1fr',
              minHeight: 205,
              overflow: 'hidden',
              border: '1px solid rgba(39, 52, 59, 0.18)',
              borderRadius: 24,
              background: panel,
              boxShadow: '0 14px 30px rgba(55, 76, 73, 0.10)',
            }}
          >
            <div
              style={{
                display: 'grid',
                placeItems: 'center',
                color: '#27343b',
                background: accent,
                fontFamily: mono,
                fontSize: 30,
                fontWeight: 950,
              }}
            >
              {command}
            </div>
            <div style={{ padding: '28px 30px' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: 38, fontWeight: 900, lineHeight: 1.15 }}>
                {title}
              </h3>
              <p style={{ margin: 0, color: muted, fontSize: 30, lineHeight: 1.42 }}>
                「{phrase}」
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 24,
          padding: '21px 28px',
          borderRadius: 20,
          color: panel,
          background: '#27343b',
          fontSize: 32,
          fontWeight: 850,
          lineHeight: 1.4,
          textAlign: 'center',
        }}
      >
        最常用的一句：「幫我把這次修改 commit，然後 push 到 GitHub。」
      </div>
    </PageShell>
  );
};

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

const ResourceCard = ({
  hint,
  title,
  color = mint,
  href,
  imageSrc,
}: {
  hint: string;
  title: string;
  color?: string;
  href?: string;
  imageSrc?: string;
}) => (
  <a
    href={href}
    target={href ? '_blank' : undefined}
    rel={href ? 'noreferrer' : undefined}
    style={{
      display: 'grid',
      minHeight: 252,
      gap: 12,
      padding: '22px 20px 18px',
      placeItems: 'center',
      border: '1px solid rgba(238, 117, 82, 0.24)',
      borderTop: `8px solid ${color}`,
      borderRadius: 22,
      color: '#183b38',
      background: 'linear-gradient(145deg, #fffaf2 0%, #ffe9dc 100%)',
      textAlign: 'center',
      textDecoration: 'none',
      boxShadow: '0 18px 34px rgba(181, 91, 68, 0.14)',
    }}
  >
    {imageSrc ? (
      <img
        src={imageSrc}
        alt={hint}
        style={{ width: 150, height: 150, borderRadius: 12, objectFit: 'contain' }}
      />
    ) : (
      <ImagePlaceholder hint={hint} width={150} height={150} />
    )}
    <div style={{ color, fontSize: 28, fontWeight: 950, lineHeight: 1.25 }}>{title}</div>
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

const Slide33SevenDayAction: Page = () => {
  const outcomes = [
    {
      index: '01',
      title: '管理自己的教材',
      note: '把講義、練習與連結集中在自己的網址。',
      color: mint,
    },
    {
      index: '02',
      title: '增加上課互動性',
      note: '加入按鈕、問答與小練習，讓學生更容易開始。',
      color: cyan,
    },
    {
      index: '03',
      title: '經營個人網誌',
      note: '記錄生活觀察、教學想法與自己的作品。',
      color: yellow,
    },
    {
      index: '04',
      title: '做專屬記帳工具',
      note: '依自己的分類記錄支出，想看哪種統計自己決定。',
      color: coral,
    },
    {
      index: '05',
      title: '規劃旅遊行程網站',
      note: '把景點、地圖、預算與行程集中在一頁。',
      color: mint,
    },
    {
      index: '06',
      title: '整理作品與活動頁',
      note: '把照片、作品、活動紀錄整理成自己的展示頁。',
      color: cyan,
    },
  ];

  return (
    <PageShell eyebrow="04 · WHAT CHANGES" accent={yellow} mood="green">
      <Title size={78} margin="0 0 16px">
        會做簡單網頁，生活和工作都多出哪些可能？
      </Title>
      <div style={{ marginBottom: 28, color: muted, fontSize: 34, fontWeight: 750 }}>
        不只教師，任何人都能從自己的需要開始。
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {outcomes.map((outcome) => (
          <div
            key={outcome.index}
            style={{
              minHeight: 210,
              padding: '24px 26px',
              border: '1px solid rgba(39, 52, 59, 0.16)',
              borderTop: `10px solid ${outcome.color}`,
              borderRadius: 18,
              background: panel,
              boxShadow: '0 12px 24px rgba(55, 76, 73, 0.08)',
            }}
          >
            <div
              style={{
                color: outcome.color,
                fontFamily: mono,
                fontSize: 24,
                fontWeight: 950,
                letterSpacing: '0.08em',
              }}
            >
              {outcome.index}
            </div>
            <div style={{ marginTop: 18, fontSize: 38, fontWeight: 950, lineHeight: 1.2 }}>
              {outcome.title}
            </div>
            <div
              style={{
                marginTop: 12,
                color: muted,
                fontSize: 25,
                fontWeight: 700,
                lineHeight: 1.4,
              }}
            >
              {outcome.note}
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
};
Slide33SevenDayAction.transition = sectionTransition;

const Slide33LifeTransformation: Page = () => (
  <PageShell eyebrow="VALUE · 價值比較" accent={yellow} mood="warm">
    <div style={{ marginBottom: 24 }}>
      <Title size={74} margin="0 0 12px">
        學會使用 Antigravity，對教學與生活帶來什麼改變？
      </Title>
      <div style={{ color: muted, fontSize: 32, fontWeight: 800 }}>
        從重複勞動的「檔案排版工」，升級為掌控全域的「教學總指揮」
      </div>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 32,
        minHeight: 0,
        alignItems: 'stretch',
      }}
    >
      {/* Before Column */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(238, 154, 131, 0.35)',
          borderTop: `10px solid ${coral}`,
          borderRadius: 24,
          padding: '30px 32px',
          boxShadow: '0 14px 32px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 18,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 40 }}>❌</span>
          <h3 style={{ margin: 0, fontSize: 38, fontWeight: 950, color: '#96392b' }}>
            過去：手動搬移與重複勞動
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            ['📄', '複製貼上繁瑣'],
            ['📦', '大量資料整理無從下手'],
            ['⏳', '每次開新對話都要重教'],
            ['😫', '瑣碎排版耗盡備課時間'],
          ].map(([icon, label]) => (
            <div
              key={label}
              style={{
                background: '#fdf5f3',
                borderRadius: 16,
                padding: '20px 24px',
                border: '1px solid rgba(238, 154, 131, 0.25)',
                fontSize: 30,
                fontWeight: 950,
                color: '#96392b',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span style={{ fontSize: 34 }}>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* After Column */}
      <div
        style={{
          background: panel,
          border: '1px solid rgba(120, 174, 178, 0.35)',
          borderTop: `10px solid ${mint}`,
          borderRadius: 24,
          padding: '30px 32px',
          boxShadow: '0 14px 32px rgba(55, 76, 73, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 18,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 40 }}>✨</span>
          <h3 style={{ margin: 0, fontSize: 38, fontWeight: 950, color: '#1a4b43' }}>
            現在：說一句話，Agent 自主搞定
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            ['🚀', '一句話直接改電腦本機檔案'],
            ['📦', '海量資料一鍵批次處理'],
            ['🧠', '擁有完整專案長期記憶'],
            ['☕', '找回準時下班的高品質生活'],
          ].map(([icon, label]) => (
            <div
              key={label}
              style={{
                background: '#eef6f2',
                borderRadius: 16,
                padding: '20px 24px',
                border: '1px solid rgba(169, 207, 189, 0.35)',
                fontSize: 30,
                fontWeight: 950,
                color: '#1a4b43',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span style={{ fontSize: 34 }}>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageShell>
);
Slide33LifeTransformation.transition = sectionTransition;

const Slide34Closing: Page = () => {
  const reviewVideoUrl = 'https://youtu.be/8Nd71kGVfj8?si=2NFISOG9l3G44gX_';
  const reviewVideoQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=12&data=${encodeURIComponent(reviewVideoUrl)}`;

  return (
    <PageShell eyebrow="05 · WRAP UP" accent={coral} mood="warm">
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1.18fr 0.82fr',
          alignItems: 'center',
          gap: 58,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: -44,
            right: 10,
            width: 176,
            height: 176,
            border: '2px solid rgba(238, 117, 82, 0.18)',
            borderRadius: '50%',
            background: 'rgba(255, 221, 190, 0.32)',
            transform: 'rotate(-12deg)',
          }}
        />
        <div>
          <div
            style={{
              color: coral,
              fontFamily: mono,
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: '0.12em',
            }}
          >
            THANK YOU FOR BUILDING WITH US
          </div>
          <Title size={88} margin="28px 0 24px">
            謝謝大家！
            {''}
          </Title>
          <div
            style={{ maxWidth: 760, color: muted, fontSize: 31, fontWeight: 750, lineHeight: 1.55 }}
          >
            從 GitHub、Gemini 到網址上線
            <br />
            你已經把一個想法變成可以分享的作品
          </div>
          <div
            style={{
              display: 'inline-block',
              marginTop: 26,
              padding: '12px 20px',
              borderLeft: `8px solid ${yellow}`,
              borderRadius: 8,
              background: 'rgba(255, 255, 255, 0.62)',
              color: '#315d58',
              fontSize: 25,
              fontWeight: 850,
              lineHeight: 1.35,
            }}
          >
            不用一次做完，先從一個真正需要的頁面開始。
          </div>
          <div
            style={{
              marginTop: 28,
              color: coral,
              fontFamily: 'var(--osd-font-display)',
              fontSize: 54,
              fontWeight: 950,
            }}
          >
            {''}
          </div>
        </div>
        <div>
          <div
            style={{
              marginBottom: 14,
              color: coral,
              fontSize: 27,
              fontWeight: 900,
              letterSpacing: '0.04em',
            }}
          >
            回去後想再看一次？
          </div>
          <ResourceCard
            hint="壽豐國中 AI 網頁製作複習影片"
            title="掃描回去複習"
            color={coral}
            href={reviewVideoUrl}
            imageSrc={reviewVideoQrUrl}
          />
          <div
            style={{
              marginTop: 16,
              color: muted,
              fontFamily: mono,
              fontSize: 16,
              lineHeight: 1.45,
              overflowWrap: 'anywhere',
            }}
          >
            {reviewVideoUrl}
          </div>
        </div>
      </div>
    </PageShell>
  );
};
Slide34Closing.transition = sectionTransition;

const Slide35SpedmixRecommendation: Page = () => {
  const spedmixUrl = 'https://spedmix.pages.dev/';

  return (
    <PageShell eyebrow="TOOL · 備課工具推薦" accent={cyan} mood="blue">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.18fr 0.82fr',
          alignItems: 'center',
          gap: 58,
        }}
      >
        <div>
          <div
            style={{
              color: cyan,
              fontFamily: mono,
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: '0.12em',
            }}
          >
            RECOMMENDED TOOLS FOR TEACHERS
          </div>
          <Title size={80} margin="20px 0 16px">
            米克師 AI 備課幫手
          </Title>
          <div
            style={{
              maxWidth: 780,
              color: '#27343b',
              fontSize: 34,
              fontWeight: 800,
              lineHeight: 1.6,
            }}
          >
            專為教師設計的備課工具箱，
            <br />
            一鍵產出多層次教材與互動教學網頁。
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            padding: '36px 32px',
            background: panel,
            border: '2px solid rgba(120, 174, 178, 0.35)',
            borderRadius: 24,
            boxShadow: '0 20px 48px rgba(55, 76, 73, 0.12)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: cyan,
              fontSize: 24,
              fontWeight: 950,
              letterSpacing: '0.06em',
            }}
          >
            📱 掃描或點擊直接開啟
          </div>
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: 16,
              background: '#ffffff',
              padding: 12,
              boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
              border: '2px solid rgba(39, 52, 59, 0.12)',
            }}
          >
            <img
              src={spedmixQr}
              alt="米克師 AI 備課幫手 QR Code"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </div>

          <a
            href={spedmixUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              width: '100%',
              padding: '16px 24px',
              background: cyan,
              color: '#ffffff',
              borderRadius: 14,
              fontSize: 24,
              fontWeight: 950,
              textDecoration: 'none',
              boxShadow: '0 10px 24px rgba(120, 174, 178, 0.35)',
            }}
          >
            開啟「米克師 AI 備課幫手」 ↗
          </a>

          <div
            style={{
              color: muted,
              fontFamily: mono,
              fontSize: 18,
              fontWeight: 800,
              wordBreak: 'break-all',
            }}
          >
            {spedmixUrl}
          </div>
        </div>
      </div>
    </PageShell>
  );
};
Slide35SpedmixRecommendation.transition = sectionTransition;

export const meta: SlideMeta = {
  title: 'AI 協作開發： 用 Vibe Coding 自製個人網頁',
  createdAt: '2026-07-15T15:46:25.071Z',
};

export default [
  Slide01Cover,
  Slide01Speaker,
  Slide02WorkshopAgenda,
  Slide02Outcome,
  Slide03TwoRoutes,
  Slide05PublicSafety,
  Slide17AccountChapter,
  Slide17WhatIsGithub,
  Slide17GithubSignup,
  Slide18GoogleLogin,
  Slide19AccountSetup,
  Slide20CreateRepository,
  Part01Practice,
  Slide22CanvasChapter,
  Slide22CanvasPrompt,
  Slide23DownloadAndUpload,
  Slide27ConfirmFilename,
  Slide22InspirationIdeas,
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
  Slide36AgentVsChat,
  Slide37CopyRepositoryUrl,
  Slide38CreateProjectFolder,
  Slide39SelectProjectFolder,
  Slide40DownloadRepository,
  Slide41AntigravityPossibilities,
  Slide42GitChapter,
  Slide42GitBasics,
  Slide42GitStep1Install,
  Slide42GitStep2Auth,
  Slide42GitStep3Push,
  Slide42GitStep4UpdateWorkflow,
  Slide43GitPlainLanguage,
  Slide33SevenDayAction,
  Slide33LifeTransformation,
  Slide34Closing,
  Slide35SpedmixRecommendation,
] satisfies Page[];
