import imgHeadshot from '@assets/headshot.webp';
import imgMixerAiPrep from '@assets/mixer-ai-prep.webp';
import imgMixerShare from '@assets/mixer-share.webp';
import imgMixerTeaching from '@assets/mixer-teaching.webp';
import imgWorkshopHomepage from '@assets/workshop-homepage.webp';
import imgWorkshopSearchResult from '@assets/workshop-search-result.webp';
import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useCallback, useEffect, useState } from 'react';
import imgChineseMatch from './assets/chinese-match-quiz.webp';
import imgChineseQuiz from './assets/chinese-paragraph-quiz.webp';
import imgChineseReading from './assets/chinese-scaffold-reading.webp';
import imgChineseTable from './assets/chinese-structure-table.webp';
import imgChineseTianzi from './assets/chinese-tianzi-grid.webp';
import imgChineseWorksheet from './assets/chinese-worksheet-tool.webp';
import imgChineseTranslate from './assets/chinese-translate-screenshot.png';
import imgCharacterFamily from './assets/character-family-screenshot.png';
import imgSteppedVocab from './assets/stepped-vocab-screenshot.png';
import imgVocabPractice from './assets/vocab-practice-screenshot.png';
import imgSpecialEdEnglish from './assets/special-ed-english-screenshot.png';
import imgEbookDraft from './assets/ebook-draft-input.png';
import imgEnglishHandwriting from './assets/english-handwriting-practice.webp';
import imgEnglishInput from './assets/english-input-form.webp';
import imgEnglishQuiz from './assets/english-scene-quiz.webp';
import imgEnglishSummary from './assets/english-story-summary.webp';
import imgEnglishStoryboard from './assets/english-storyboard-reading.webp';
import imgMathPrint from './assets/math-print-preview.webp';

export const design: DesignSystem = {
  palette: { bg: '#f1f5f9', text: '#0f172a', accent: '#6366f1' },
  fonts: {
    display:
      "'Playfair Display', 'Noto Serif TC', 'Source Han Serif TC', 'Songti TC', 'MingLiU', serif",
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
  chineseLessonWorksheet: 'https://spedmix.pages.dev/chinese-lesson-worksheet',
  chineseTranslate: 'https://spedmix.pages.dev/chinesetranslate',
  characterFamily: 'https://spedmix.pages.dev/character-family-generator',
  specialEdEnglish: 'https://spedmix.pages.dev/special-ed-english-worksheet',
  steppedVocab: 'https://spedmix.pages.dev/stepped-vocab-worksheet',
  vocabPractice: 'https://spedmix.pages.dev/vocab-practice-worksheet',
  ebookHome: 'https://spedmix.pages.dev/',
} as const;

const uploadFileUrls = {
  general: 'https://forms.gle/wnMPK8xJXCwQ6VNh8',
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
      border: '14px solid rgba(255, 255, 255, 0.85)',
      background: 'transparent',
      overflow: 'hidden',
      pointerEvents: 'none',
    }}
  >
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
          特教語文適性教學工作流
        </span>
        <span style={{ color: inverse ? 'rgba(255, 255, 255, 0.35)' : '#cbd5e1' }}>·</span>
        <span style={{ color: inverse ? '#cbd5e1' : colors.muted, fontWeight: 750 }}>
          {subtitle ?? '國文 ‧ 英文 ‧ 自製電子書'}
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
    '3': '#385a73', // 北歐謐藍 (PART 3)
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
            letterSpacing: '-0.025em',
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
            { num: 1, name: '國語文適性教材' },
            { num: 2, name: '英語文適性教材' },
            { num: 3, name: '雙模式自製電子書' },
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
// 實作計時器組件
// ==========================================
const TIMER_STORAGE_KEY = '__WORKSHOP_PRACTICE_TIMER_CE__';
const TIMER_UPDATE_EVENT = 'workshop_timer_update_ce';

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
    totalSeconds: 300,
    remainingSeconds: 300,
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
    const playTone = (freq: number, start: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur);
    };
    playTone(523.25, 0, 0.4);
    playTone(659.25, 0.15, 0.4);
    playTone(783.99, 0.3, 0.6);
  } catch (e) {}
}

const usePracticeTimer = (initialMinutes = 5, practiceNumber = '實作') => {
  const [state, setState] = useState(() => {
    const stored = getStoredTimer();
    return {
      totalSeconds: stored.totalSeconds || initialMinutes * 60,
      remainingSeconds: stored.remainingSeconds !== undefined ? stored.remainingSeconds : initialMinutes * 60,
      isRunning: stored.isRunning || false,
      endTimestamp: stored.endTimestamp || null,
      practiceNumber: stored.practiceNumber || practiceNumber,
    };
  });

  useEffect(() => {
    const sync = () => {
      const current = getStoredTimer();
      setState(current);
    };
    window.addEventListener(TIMER_UPDATE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(TIMER_UPDATE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  useEffect(() => {
    if (!state.isRunning) return;
    const timer = setInterval(() => {
      const stored = getStoredTimer();
      if (!stored.isRunning || !stored.endTimestamp) return;
      const left = Math.max(0, Math.ceil((stored.endTimestamp - Date.now()) / 1000));
      if (left <= 0) {
        playTimerChimeSound();
        const next = { ...stored, remainingSeconds: 0, isRunning: false, endTimestamp: null };
        saveStoredTimer(next);
        setState(next);
      } else {
        setState({ ...stored, remainingSeconds: left });
      }
    }, 250);
    return () => clearInterval(timer);
  }, [state.isRunning]);

  const toggle = useCallback(() => {
    const stored = getStoredTimer();
    if (stored.isRunning) {
      const left = stored.endTimestamp ? Math.max(0, Math.ceil((stored.endTimestamp - Date.now()) / 1000)) : stored.remainingSeconds;
      const next = { ...stored, remainingSeconds: left, isRunning: false, endTimestamp: null };
      saveStoredTimer(next);
      setState(next);
    } else {
      const secs = stored.remainingSeconds > 0 ? stored.remainingSeconds : initialMinutes * 60;
      const end = Date.now() + secs * 1000;
      const next = { ...stored, totalSeconds: secs, remainingSeconds: secs, isRunning: true, endTimestamp: end, practiceNumber };
      saveStoredTimer(next);
      setState(next);
    }
  }, [initialMinutes, practiceNumber]);

  const reset = useCallback((mins = initialMinutes, pNum = practiceNumber) => {
    const secs = mins * 60;
    const next = { totalSeconds: secs, remainingSeconds: secs, isRunning: false, endTimestamp: null, practiceNumber: pNum };
    saveStoredTimer(next);
    setState(next);
  }, [initialMinutes, practiceNumber]);

  const addSeconds = useCallback((sec: number) => {
    const stored = getStoredTimer();
    const curLeft = stored.isRunning && stored.endTimestamp ? Math.max(0, Math.ceil((stored.endTimestamp - Date.now()) / 1000)) : stored.remainingSeconds;
    const newLeft = Math.max(0, curLeft + sec);
    const newEnd = stored.isRunning ? Date.now() + newLeft * 1000 : null;
    const next = { ...stored, totalSeconds: Math.max(stored.totalSeconds, newLeft), remainingSeconds: newLeft, endTimestamp: newEnd };
    saveStoredTimer(next);
    setState(next);
  }, []);

  return { ...state, toggle, reset, addSeconds };
};

const WorkshopPracticeTimer = ({
  practiceNumber = '實作',
  initialMinutes = 5,
}: {
  practiceNumber?: string;
  initialMinutes?: number;
}) => {
  const { totalSeconds, remainingSeconds, isRunning, toggle, reset, addSeconds } = usePracticeTimer(initialMinutes, practiceNumber);
  const isFinished = remainingSeconds === 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #242b35 0%, #1e242d 100%)',
          border: '8px solid rgba(255, 255, 255, 0.95)',
          boxShadow: isRunning ? '0 16px 48px rgba(196, 93, 71, 0.35)' : '0 12px 36px rgba(15, 23, 42, 0.18)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.white,
          position: 'relative',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '84px',
            fontWeight: 950,
            letterSpacing: '0.04em',
            fontVariantNumeric: 'tabular-nums',
            color: isFinished ? '#fb7185' : colors.white,
            lineHeight: 1,
          }}
        >
          {formatTimerClock(remainingSeconds)}
        </div>
        <div
          style={{
            fontSize: '20px',
            fontWeight: 800,
            color: isRunning ? '#86efac' : '#cbd5e1',
            letterSpacing: '0.06em',
            marginTop: 8,
          }}
        >
          {isRunning ? '⏱ 實作進行中' : isFinished ? '🎉 時間到！' : '⏸ 待命中'}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
          onClick={toggle}
          style={{
            padding: '12px 34px',
            background: isRunning
              ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)'
              : 'linear-gradient(135deg, #d9822b 0%, #c45d47 100%)',
            color: colors.white,
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

const PracticePage = ({
  num,
  toolName,
  time = '5 分鐘',
  task,
  buttons,
}: {
  num: string;
  toolName: string;
  time?: string;
  task?: string;
  buttons?: Array<{
    label: string;
    href: string;
    variant?: 'primary' | 'secondary' | 'accent' | 'dark';
  }>;
}) => {
  const minNum = Number.parseInt(time, 10) || 5;
  const practiceLabel = `實作 ${num}`;
  const taskText = task || `請挑選上方任一工具試做教材。`;

  const buttonItems = (buttons || []).map((b) => {
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
  });

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

      <div style={{ zIndex: 2 }}>
        <WorkshopPracticeTimer practiceNumber={practiceLabel} initialMinutes={minNum} />
      </div>

      <div
        className="es-fadeUp"
        style={{
          zIndex: 2,
          marginTop: 24,
          maxWidth: 1200,
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

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
          {buttonItems.map((btn, idx) => (
            <a
              key={idx}
              href={btn.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: btn.bg,
                color: colors.white,
                padding: '14px 34px',
                borderRadius: 18,
                fontSize: '26px',
                fontWeight: 950,
                textDecoration: 'none',
                boxShadow: btn.shadow,
                letterSpacing: '0.04em',
                transition: 'transform 0.15s ease',
              }}
            >
              <span>{btn.label}</span>
              <span style={{ fontSize: '22px' }}>➔</span>
            </a>
          ))}
        </div>
      </div>

      <TextbookFooter subtitle={`實作時間：${toolName}`} />
    </div>
  );
};

// 截圖外框
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
      background: 'rgba(255, 255, 255, 0.92)',
      border: '2px solid rgba(255, 255, 255, 0.95)',
      borderRadius: 24,
      padding: '18px 20px 20px 20px',
      boxShadow: '0 20px 48px rgba(15, 23, 42, 0.10)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      height: 580,
      maxHeight: 580,
      boxSizing: 'border-box',
      ...style,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 12,
        marginBottom: 12,
        borderBottom: '1px solid rgba(203, 213, 225, 0.7)',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', gap: 7 }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f87171' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#fbbf24' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#34d399' }} />
      </div>
      <span style={{ fontSize: '18px', fontWeight: 800, color: colors.muted, letterSpacing: '0.04em' }}>
        {label}
      </span>
      <span style={{ fontSize: '16px', fontWeight: 700, color: '#94a3b8' }}>介面預覽</span>
    </div>
    <div
      style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#f8fafc',
        borderRadius: 14,
        padding: 8,
      }}
    >
      {children}
    </div>
  </div>
);

// 工具主題封面扉頁共用組件 (老師心聲 + 學生心聲)
interface PainPointBubble {
  tag?: string;
  text: string;
  status?: string;
  color?: 'rose' | 'sky' | 'amber' | 'indigo' | 'emerald';
}

const ToolCoverSlide = ({
  unit,
  title,
  painPoints,
}: {
  unit: string;
  title: string;
  painPoints?: Array<PainPointBubble | string>;
}) => {
  const defaultColors: Array<'rose' | 'sky'> = ['rose', 'sky'];
  const defaultTags = ['👩‍🏫 老師心聲', '👦 學生心聲'];
  const defaultStatuses = ['💬 備課日常', '😩 學習困擾'];

  const formattedPoints: PainPointBubble[] = (painPoints || []).map((pt, idx) => {
    if (typeof pt === 'string') {
      return {
        tag: defaultTags[idx % defaultTags.length],
        text: pt,
        status: defaultStatuses[idx % defaultStatuses.length],
        color: defaultColors[idx % defaultColors.length],
      };
    }
    return {
      tag: pt.tag || defaultTags[idx % defaultTags.length],
      text: pt.text,
      status: pt.status || defaultStatuses[idx % defaultStatuses.length],
      color: pt.color || defaultColors[idx % defaultColors.length],
    };
  });

  const colorStyles = {
    rose: {
      bg: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)',
      border: 'rgba(251, 113, 133, 0.45)',
      badgeBg: 'rgba(196, 93, 71, 0.15)',
      badgeColor: '#c45d47',
      shadow: '0 14px 32px rgba(196, 93, 71, 0.10)',
    },
    sky: {
      bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      border: 'rgba(56, 189, 248, 0.45)',
      badgeBg: 'rgba(56, 90, 115, 0.15)',
      badgeColor: '#385a73',
      shadow: '0 14px 32px rgba(56, 90, 115, 0.10)',
    },
    amber: {
      bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
      border: 'rgba(245, 158, 11, 0.45)',
      badgeBg: 'rgba(217, 130, 43, 0.15)',
      badgeColor: '#d9822b',
      shadow: '0 14px 32px rgba(217, 130, 43, 0.10)',
    },
    indigo: {
      bg: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
      border: 'rgba(99, 102, 241, 0.45)',
      badgeBg: 'rgba(79, 70, 229, 0.15)',
      badgeColor: '#4f46e5',
      shadow: '0 14px 32px rgba(79, 70, 229, 0.10)',
    },
    emerald: {
      bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      border: 'rgba(16, 185, 129, 0.45)',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      badgeColor: '#059669',
      shadow: '0 14px 32px rgba(16, 185, 129, 0.10)',
    },
  };

  return (
    <div
      style={{
        ...fill,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '54px 108px 100px 108px',
      }}
    >
      <TextbookBg />

      <div
        className="es-fadeUp"
        style={{
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          marginBottom: 32,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            color: colors.accent,
            fontFamily: 'var(--osd-font-display)',
            fontWeight: 900,
            fontSize: '28px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: 'rgba(166, 104, 50, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(166, 104, 50, 0.25)',
            padding: '8px 28px',
            borderRadius: 14,
            boxShadow: '0 4px 14px rgba(166, 104, 50, 0.08)',
          }}
        >
          {unit}
        </span>

        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '92px',
            fontWeight: 950,
            margin: 0,
            color: colors.text,
            letterSpacing: '-0.03em',
            lineHeight: 1.12,
          }}
        >
          {title}
        </h1>
      </div>

      <div
        style={{
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 32,
          width: '100%',
          maxWidth: 1420,
          boxSizing: 'border-box',
        }}
      >
        {formattedPoints.map((pt, idx) => {
          const cStyle = colorStyles[pt.color || (idx === 0 ? 'rose' : 'sky')];
          return (
            <div
              key={idx}
              className="es-fadeUp"
              style={{
                animationDelay: `${0.12 + idx * 0.1}s`,
                background: cStyle.bg,
                border: `2px solid ${cStyle.border}`,
                borderRadius: 28,
                padding: '36px 38px',
                boxShadow: cStyle.shadow,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 20,
                textAlign: 'left',
                position: 'relative',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: '26px',
                    fontWeight: 950,
                    color: cStyle.badgeColor,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  {pt.tag}
                </span>
                <span
                  style={{
                    background: cStyle.badgeBg,
                    color: cStyle.badgeColor,
                    padding: '6px 16px',
                    borderRadius: 999,
                    fontSize: '20px',
                    fontWeight: 900,
                  }}
                >
                  {pt.status}
                </span>
              </div>

              <p
                style={{
                  fontSize: '40px',
                  lineHeight: 1.35,
                  fontWeight: 900,
                  color: colors.text,
                  margin: 0,
                  letterSpacing: '-0.015em',
                }}
              >
                「{pt.text}」
              </p>
            </div>
          );
        })}
      </div>

      <TextbookFooter subtitle="單元導覽 · 現場需求引導" />
    </div>
  );
};

// 工具功能特色介紹頁組件（簡潔列點 + 傳送門按鈕 + 截圖預覽）
const ToolFeatureSlide = ({
  unit,
  title,
  subtitle,
  tag,
  points,
  btnHref,
  btnText = '傳送門 ➔ 前往工具',
  imgSrc,
  imgAlt,
  frameLabel,
}: {
  unit: string;
  title: string;
  subtitle?: string;
  tag: string;
  points: string[];
  btnHref: string;
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
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: 36,
        flex: 1,
        zIndex: 2,
        minHeight: 0,
        height: 580,
        maxHeight: 580,
        alignItems: 'stretch',
      }}
    >
      {/* 左側：特色列點與按鈕 */}
      <div
        className="es-fadeUp"
        style={{
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.98)',
          borderTop: `8px solid ${colors.accent}`,
          boxShadow: '0 20px 48px rgba(78, 64, 53, 0.10)',
          borderRadius: 24,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '24px',
              fontWeight: 900,
              color: colors.accent,
            }}
          >
            <span>✨ 特教鷹架核心亮點</span>
          </div>
          <span
            style={{
              background: 'rgba(166, 104, 50, 0.12)',
              color: colors.accent,
              padding: '6px 18px',
              borderRadius: 999,
              fontSize: '20px',
              fontWeight: 900,
            }}
          >
            {tag}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            flex: 1,
            justifyContent: 'center',
            margin: '12px 0',
          }}
        >
          {points.map((pt, idx) => {
            const accents = [
              { bg: 'rgba(166, 104, 50, 0.12)', text: '#d9822b', border: 'rgba(166, 104, 50, 0.25)', num: `0${idx + 1}` },
              { bg: 'rgba(196, 93, 71, 0.12)', text: '#c45d47', border: 'rgba(196, 93, 71, 0.25)', num: `0${idx + 1}` },
              { bg: 'rgba(56, 90, 115, 0.12)', text: '#385a73', border: 'rgba(56, 90, 115, 0.25)', num: `0${idx + 1}` },
              { bg: 'rgba(5, 150, 105, 0.12)', text: '#059669', border: 'rgba(5, 150, 105, 0.25)', num: `0${idx + 1}` },
            ];
            const acc = accents[idx % accents.length];
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  background: 'rgba(255, 255, 255, 0.98)',
                  border: '1.5px solid rgba(226, 232, 240, 0.9)',
                  borderRadius: 18,
                  padding: '16px 20px',
                  boxShadow: '0 4px 14px rgba(148, 163, 184, 0.08)',
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
                    fontWeight: 900,
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

        <a
          href={btnHref}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            background: 'linear-gradient(135deg, #d9822b 0%, #a66832 100%)',
            color: colors.white,
            padding: '14px 28px',
            borderRadius: 16,
            fontSize: '26px',
            fontWeight: 950,
            textDecoration: 'none',
            boxShadow: '0 12px 28px rgba(196, 93, 71, 0.32)',
            marginTop: 4,
          }}
        >
          <span>{btnText}</span>
          <span style={{ fontSize: '22px' }}>➔</span>
        </a>
      </div>

      {/* 右側：截圖預覽框 */}
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
    <TextbookFooter subtitle={`工具導覽：${title}`} />
  </div>
);

// 相關社群連結卡片
const SocialLinkCard = ({
  href,
  label,
  handle,
  icon,
  color,
  children,
  delay = 0,
}: {
  href: string;
  label: string;
  handle: string;
  icon: ReactNode;
  color: string;
  children?: ReactNode;
  delay?: number;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(20px)',
      border: '1.5px solid rgba(255, 255, 255, 0.98)',
      borderRadius: 24,
      padding: '36px 32px',
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      textDecoration: 'none',
      color: colors.text,
      boxShadow: '0 18px 44px rgba(78, 64, 53, 0.10)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        width: 96,
        height: 96,
        borderRadius: 24,
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.white,
        flexShrink: 0,
        boxShadow: `0 12px 28px ${color}44`,
      }}
    >
      {icon}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: '38px', fontWeight: 950, color: colors.text, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: '28px', color: colors.muted, fontWeight: 750, marginBottom: 8 }}>{handle}</div>
      <div style={{ fontSize: '24px', color: color, fontWeight: 900 }}>{children || '點擊前往 ➔'}</div>
    </div>
  </a>
);

const InstagramIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12a7 7 0 1 1-7-7c3.87 0 6 2.5 6 5.5 0 3-2 4.5-4 4.5s-3-1.5-3-3 1.5-3 3-3c1.5 0 2.5.8 2.8 1.8" />
  </svg>
);

const MixerSiteCard = ({
  href,
  label,
  screenshot,
  screenshotAlt,
  title,
  children,
  delay = 0,
  accent = colors.accent,
}: {
  href: string;
  label: string;
  screenshot: string;
  screenshotAlt: string;
  title: string;
  children: ReactNode;
  delay?: number;
  accent?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="es-fadeUp"
    style={{
      animationDelay: `${delay}s`,
      background: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(20px)',
      border: '1.5px solid rgba(255, 255, 255, 0.98)',
      borderTop: `7px solid ${accent}`,
      boxShadow: '0 20px 48px rgba(78, 64, 53, 0.10)',
      borderRadius: 24,
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      textDecoration: 'none',
      color: colors.text,
      height: '100%',
      boxSizing: 'border-box',
    }}
  >
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: '20px', fontWeight: 900, color: accent, background: `${accent}15`, padding: '4px 14px', borderRadius: 999 }}>
          {label}
        </span>
        <span style={{ fontSize: '24px', color: accent, fontWeight: 900 }}>↗</span>
      </div>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '38px', fontWeight: 950, color: colors.text }}>{title}</h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '24px', color: colors.muted, lineHeight: 1.4, fontWeight: 700 }}>
        {children}
      </p>
    </div>
    <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #e2e8f0', height: 210 }}>
      <img src={screenshot} alt={screenshotAlt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  </a>
);

// ============================================================
// 各頁投影片定義 (Pages)
// ============================================================

// Slide 01: 研習封面
const Slide01_Title: Page = () => (
  <div
    style={{
      ...fill,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <TextbookBg />

    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        maxWidth: 1540,
        width: '100%',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(28px)',
        border: '1.5px solid rgba(255, 255, 255, 0.98)',
        borderRadius: 36,
        padding: '52px 64px 44px',
        boxShadow: '0 28px 64px rgba(78, 64, 53, 0.12), 0 6px 20px rgba(181, 141, 103, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(166, 104, 50, 0.12)',
          border: '1.5px solid rgba(166, 104, 50, 0.28)',
          borderRadius: 999,
          padding: '10px 32px',
          fontSize: '26px',
          fontWeight: 950,
          color: colors.accent,
          letterSpacing: '0.08em',
        }}
      >
        <span>從使用 AI 到打造適性教材</span>
      </div>

      <div>
        <h1
          style={{
            fontFamily: 'var(--osd-font-display)',
            fontSize: '94px',
            fontWeight: 950,
            color: colors.text,
            margin: '0 0 16px 0',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
          }}
        >
          一鍵搞定國英適性教材<br />特教老師的隨身備課神器
        </h1>
        <p
          style={{
            fontSize: '44px',
            fontWeight: 800,
            color: colors.muted,
            margin: 0,
            letterSpacing: '0.04em',
            lineHeight: 1.3,
          }}
        >
          國文學習單 ‧ 英文資源班教材 ‧ 雙模式電子書
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          width: '100%',
          flexWrap: 'wrap',
          marginTop: 6,
        }}
      >
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

// Slide 02: 講師介紹
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

// Slide 03: 米克師三大網站
const Slide03_MixerIntro: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="本人相關網站" subtitle="三個入口" unit="單元 1" />
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
        accent={colors.blue}
      >
        提供學生端使用的學習活動與互動教材，讓自學與課堂練習更容易進入。
      </MixerSiteCard>
    </div>
    <TextbookFooter subtitle="米克師三大網站" />
  </div>
);

// Slide 04: 本日研習簡報
const Slide04_WorkshopSlides: Page = () => (
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
        <div
          className="es-fadeUp"
          style={{
            background: colors.white,
            borderRadius: 18,
            padding: '16px 20px',
            border: '1.5px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(166,104,50,0.12)', color: colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 950 }}>01</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: colors.text }}>搜尋「米克師」進入備課平台</div>
        </div>
        <div
          className="es-fadeUp"
          style={{
            background: colors.white,
            borderRadius: 18,
            padding: '16px 20px',
            border: '1.5px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(196,93,71,0.12)', color: colors.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 950 }}>02</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: colors.text }}>點選首頁右上角「研習簡報」</div>
        </div>
        <div
          className="es-fadeUp"
          style={{
            background: colors.white,
            borderRadius: 18,
            padding: '16px 20px',
            border: '1.5px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(56,90,115,0.12)', color: colors.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 950 }}>03</div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: colors.text }}>輸入密碼 <strong style={{ color: colors.orange }}>「米克師」</strong> 即可閱覽</div>
        </div>
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
          }}
        >
          <img
            src={imgWorkshopSearchResult}
            alt="搜尋米克師並點擊 AI 備課幫手"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
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
          }}
        >
          <img
            src={imgWorkshopHomepage}
            alt="米克師 AI 備課幫手首頁右上角研習簡報"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectViewBox: 'inset(0% 0% 46.21% 34.55%)',
              borderRadius: 12,
            }}
          />
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="開啟今日簡報" />
  </div>
);

// Slide 05: 今日研習大綱
const Slide05_Agenda: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="特教語文適性教學工作流" subtitle="三大核心實踐 ‧ 模組化流程" unit="今日大綱" />
    <div
      style={{
        zIndex: 2,
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 28,
        minHeight: 0,
        height: 520,
        maxHeight: 520,
        alignItems: 'stretch',
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
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '32px', fontWeight: 950, color: colors.accent, fontFamily: 'var(--osd-font-display)' }}>
              PART 01
            </span>
            <span style={{ background: 'rgba(166, 104, 50, 0.12)', color: colors.accent, borderRadius: 999, padding: '4px 14px', fontSize: '18px', fontWeight: 900 }}>
              國語文模組
            </span>
          </div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '36px', fontWeight: 950, color: colors.text }}>國語文適性教材</h3>
          <div style={{ fontSize: '22px', color: colors.muted, fontWeight: 750 }}>課文鷹架與識字讀本</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 16px', fontSize: '24px', fontWeight: 900 }}>
            01 國文課堂學習單
          </div>
          <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 16px', fontSize: '24px', fontWeight: 900 }}>
            02 文言文逐句翻譯
          </div>
          <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 16px', fontSize: '24px', fontWeight: 900 }}>
            03 字族文生成器
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
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '32px', fontWeight: 950, color: colors.orange, fontFamily: 'var(--osd-font-display)' }}>
              PART 02
            </span>
            <span style={{ background: 'rgba(196, 93, 71, 0.12)', color: colors.orange, borderRadius: 999, padding: '4px 14px', fontSize: '18px', fontWeight: 900 }}>
              英語文模組
            </span>
          </div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '36px', fontWeight: 950, color: colors.text }}>英語文適性教材</h3>
          <div style={{ fontSize: '22px', color: colors.muted, fontWeight: 750 }}>分鏡故事與階梯單字</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 16px', fontSize: '24px', fontWeight: 900 }}>
            01 英文資源班學習單
          </div>
          <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 16px', fontSize: '24px', fontWeight: 900 }}>
            02 階梯式單字學習單
          </div>
          <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 16px', fontSize: '24px', fontWeight: 900 }}>
            03 單字練習卷生成
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
          borderTop: `7px solid ${colors.blue}`,
          boxShadow: '0 20px 48px rgba(78, 64, 53, 0.10)',
          borderRadius: 28,
          padding: '32px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '32px', fontWeight: 950, color: colors.blue, fontFamily: 'var(--osd-font-display)' }}>
              PART 03
            </span>
            <span style={{ background: 'rgba(56, 90, 115, 0.12)', color: colors.blue, borderRadius: 999, padding: '4px 14px', fontSize: '18px', fontWeight: 900 }}>
              自製電子書
            </span>
          </div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '36px', fontWeight: 950, color: colors.text }}>雙模式自製電子書</h3>
          <div style={{ fontSize: '22px', color: colors.muted, fontWeight: 750 }}>大屏教學與一鍵白卷</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 16px', fontSize: '24px', fontWeight: 900 }}>
            01 大屏互動教學 / 板書
          </div>
          <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 16px', fontSize: '24px', fontWeight: 900 }}>
            02 學生端一鍵 A4 乾淨列印
          </div>
          <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: 14, padding: '12px 16px', fontSize: '24px', fontWeight: 900 }}>
            03 一套教材兩種教學情境
          </div>
        </div>
      </div>
    </div>
    <TextbookFooter subtitle="今日研習大綱" />
  </div>
);

// ============================================================
// PART 01: 國語文適性教材 (3 工具 + 5 分鐘實作)
// ============================================================

// PART 01 過渡頁
const Slide06_Part1Header: Page = () => (
  <PartHeaderPage
    partNum="1"
    time="國語文適性模組"
    title={'國語文適性教材備課\n課文鷹架與多層次讀本'}
    desc="國文課堂學習單 ＋ 文言文逐句翻譯 ＋ 字族文生成器，AI 快速產出多層次適性國語文素材"
  />
);

// 國文工具 1: 國文課堂學習單 - 扉頁心聲
const Slide07_ChineseLessonCover: Page = () => (
  <ToolCoverSlide
    unit="國語文備課"
    title="國文課堂學習單"
    painPoints={[
      {
        tag: '👩‍🏫 老師心聲',
        status: '💬 備課日常',
        text: '每課找圖配圖超花時間，還要手動排版修改各種注音與摘要版本…',
        color: 'rose',
      },
      {
        tag: '👦 學生心聲',
        status: '😩 學習困擾',
        text: '課文太長看不太懂，密密麻麻的字好想睡覺，考試又記不住…',
        color: 'sky',
      },
    ]}
  />
);

// 國文工具 1: 國文課堂學習單 - 功能介紹頁
const Slide08_ChineseLessonFeature: Page = () => (
  <ToolFeatureSlide
    unit="國語文備課"
    title="國文課堂學習單"
    subtitle="課文雙軌與高結構鷹架"
    tag="高結構鷹架"
    points={[
      '原文與易讀雙軌排版',
      '注音田字格生字練寫',
      '隨段即時兩題檢核',
      '課文脈絡表格整理',
    ]}
    btnHref={toolUrls.chineseLessonWorksheet}
    imgSrc={imgChineseReading}
    imgAlt="國文課堂學習單雙軌閱讀畫面"
    frameLabel="雙軌閱讀 · 原文與易讀對照"
  />
);

// 國文工具 2: 文言文逐句翻譯 - 扉頁心聲
const Slide09_ChineseTranslateCover: Page = () => (
  <ToolCoverSlide
    unit="國語文備課"
    title="文言文逐句翻譯"
    painPoints={[
      {
        tag: '👩‍🏫 老師心聲',
        status: '💬 備課日常',
        text: '文言文對特教生如同天書，逐句解釋與手動查找注釋耗費大半節課…',
        color: 'rose',
      },
      {
        tag: '👦 學生心聲',
        status: '😩 學習困擾',
        text: '古文字分開認得、合在一起完全看不懂，上課聽不懂只想發呆…',
        color: 'sky',
      },
    ]}
  />
);

// 國文工具 2: 文言文逐句翻譯 - 功能介紹頁
const Slide10_ChineseTranslateFeature: Page = () => (
  <ToolFeatureSlide
    unit="國語文備課"
    title="文言文逐句翻譯"
    subtitle="逐句白話對照與生難字詞註解"
    tag="語意理解鷹架"
    points={[
      '原文白話逐句精準對照',
      '核心生難字詞隨句註釋',
      '段落核心脈絡提煉',
      '一鍵輸出適性閱讀讀本',
    ]}
    btnHref={toolUrls.chineseTranslate}
    imgSrc={imgChineseTranslate}
    imgAlt="文言文逐句翻譯水陸草木之花畫面"
    frameLabel="白話逐句對照 · 句意註釋"
  />
);

// 國文工具 3: 字族文生成器 - 扉頁心聲
const Slide11_CharacterFamilyCover: Page = () => (
  <ToolCoverSlide
    unit="識字備課"
    title="字族文生成器"
    painPoints={[
      {
        tag: '👩‍🏫 老師心聲',
        status: '💬 備課日常',
        text: '形近字與同音字學生老是搞混，手動編寫趣味聯想故事非常燒腦…',
        color: 'rose',
      },
      {
        tag: '👦 學生心聲',
        status: '😩 學習困擾',
        text: '晴、睛、清、請長得都好像，考試每次都填錯部首和生字…',
        color: 'sky',
      },
    ]}
  />
);

// 國文工具 3: 字族文生成器 - 功能介紹頁
const Slide12_CharacterFamilyFeature: Page = () => (
  <ToolFeatureSlide
    unit="識字備課"
    title="字族文生成器"
    subtitle="部件歸納與趣味韻文情境"
    tag="識字記憶鷹架"
    points={[
      '聲旁與形旁字族歸納',
      '趣味短篇韻文故事脈絡',
      '田字格手寫加深記憶',
      '一鍵產出字族識字學習單',
    ]}
    btnHref={toolUrls.characterFamily}
    imgSrc={imgCharacterFamily}
    imgAlt="字族文故事與閃爍礫石情境畫面"
    frameLabel="字族故事 · 語境辨字"
  />
);

// 國文 5 分鐘選擇體驗
const Slide13_Practice_Chinese: Page = () => (
  <PracticePage
    num="01"
    toolName="國語文教材生成"
    time="5 分鐘"
    task="請挑選上方任一國文工具，輸入課文或字族試做一份適性教材。"
    buttons={[
      { label: '國文課堂學習單', href: toolUrls.chineseLessonWorksheet, variant: 'primary' },
      { label: '文言文逐句翻譯', href: toolUrls.chineseTranslate, variant: 'accent' },
      { label: '字族文生成器', href: toolUrls.characterFamily, variant: 'primary' },
    ]}
  />
);

// ============================================================
// PART 02: 英語文適性教材 (3 工具 + 5 分鐘實作)
// ============================================================

// PART 02 過渡頁
const Slide14_Part2Header: Page = () => (
  <PartHeaderPage
    partNum="2"
    time="英語文適性模組"
    title={'英語文適性教材備課\n情境分鏡與階梯記憶'}
    desc="英文資源班學習單 ＋ 階梯式單字 ＋ 單字練習卷，打造低焦慮特教英文學習鷹架"
  />
);

// 英文工具 1: 英文資源班學習單 - 扉頁心聲
const Slide15_SpecialEdEnglishCover: Page = () => (
  <ToolCoverSlide
    unit="英語文備課"
    title="英文資源班學習單"
    painPoints={[
      {
        tag: '👩‍🏫 老師心聲',
        status: '💬 備課日常',
        text: '普通班英文課本句子太長太難，手動降階重畫分鏡排版耗時耗力…',
        color: 'rose',
      },
      {
        tag: '👦 學生心聲',
        status: '😩 學習困擾',
        text: '滿滿的英文字母不會唸也看不懂，整張考卷空白好挫折…',
        color: 'sky',
      },
    ]}
  />
);

// 英文工具 1: 英文資源班學習單 - 功能介紹頁
const Slide16_SpecialEdEnglishFeature: Page = () => (
  <ToolFeatureSlide
    unit="英語文備課"
    title="英文資源班學習單"
    subtitle="情境分鏡閱讀與四線格臨摹"
    tag="分鏡故事鷹架"
    points={[
      '情境分鏡故事連環圖',
      '標準英文字母四線格練寫',
      '隨課圖文重點單字檢核',
      '一鍵 A4 乾淨作業卷列印',
    ]}
    btnHref={toolUrls.specialEdEnglish}
    imgSrc={imgSpecialEdEnglish}
    imgAlt="英文資源班學習單分鏡與單字認讀檢核畫面"
    frameLabel="分鏡故事 · 單字認讀檢核"
  />
);

// 英文工具 2: 階梯式英文單字學習單 - 扉頁心聲
const Slide17_SteppedVocabCover: Page = () => (
  <ToolCoverSlide
    unit="英語文備課"
    title="階梯式英文單字學習單"
    painPoints={[
      {
        tag: '👩‍🏫 老師心聲',
        status: '💬 備課日常',
        text: '死記硬背單字學生轉頭就忘，需要循序漸進的多層次拆解鷹架…',
        color: 'rose',
      },
      {
        tag: '👦 學生心聲',
        status: '😩 學習困擾',
        text: '英文字母順序老是記錯，背了好多次考試還是拼不出來…',
        color: 'sky',
      },
    ]}
  />
);

// 英文工具 2: 階梯式英文單字學習單 - 功能介紹頁
const Slide18_SteppedVocabFeature: Page = () => (
  <ToolFeatureSlide
    unit="英語文備課"
    title="階梯式英文單字學習單"
    subtitle="字母拆解與階梯式記憶鷹架"
    tag="階梯式鷹架"
    points={[
      '階梯設計：認讀➔填空➔拼寫',
      '圖像情境與中英雙語對照',
      '音節拆解與自然發音提示',
      '依學生起點自選練習層級',
    ]}
    btnHref={toolUrls.steppedVocab}
    imgSrc={imgSteppedVocab}
    imgAlt="階梯式英文單字看中文選英文三選一畫面"
    frameLabel="階梯練習 · 中翻英三選一"
  />
);

// 英文工具 3: 單字練習卷生成 - 扉頁心聲
const Slide19_VocabPracticeCover: Page = () => (
  <ToolCoverSlide
    unit="英語評量"
    title="單字練習卷生成器"
    painPoints={[
      {
        tag: '👩‍🏫 老師心聲',
        status: '💬 備課日常',
        text: '每次小考都要手動拼湊不同題型，出題加排版排整晚超累…',
        color: 'rose',
      },
      {
        tag: '👦 學生心聲',
        status: '😩 學習困擾',
        text: '題目字太小太擠很容易看錯行，題型太複雜會直接慌張…',
        color: 'sky',
      },
    ]}
  />
);

// 英文工具 3: 單字練習卷生成 - 功能介紹頁
const Slide20_VocabPracticeFeature: Page = () => (
  <ToolFeatureSlide
    unit="英語評量"
    title="單字練習卷生成器"
    subtitle="多元題型組合與一鍵出卷"
    tag="多元評量組合"
    points={[
      '多元題型：拼英／克漏／連連看',
      '特教適性大字體寬敞排版',
      '同步產出學生卷與解答卷',
      '支援隨機打亂出 AB 卷',
    ]}
    btnHref={toolUrls.vocabPractice}
    imgSrc={imgVocabPractice}
    imgAlt="單字練習卷看圖抄寫與四線格畫面"
    frameLabel="單字練習卷 · 看圖抄寫與四線格"
  />
);

// 英文 5 分鐘選擇體驗
const Slide21_Practice_English: Page = () => (
  <PracticePage
    num="02"
    toolName="英語文教材生成"
    time="5 分鐘"
    task="請挑選上方任一英文工具，輸入單字或課文試做一份適性學習單。"
    buttons={[
      { label: '英文資源班學習單', href: toolUrls.specialEdEnglish, variant: 'primary' },
      { label: '階梯式英文單字', href: toolUrls.steppedVocab, variant: 'accent' },
      { label: '單字練習卷生成', href: toolUrls.vocabPractice, variant: 'primary' },
    ]}
  />
);

// ============================================================
// PART 03: 雙模式自製電子書 (大屏教學 + 一鍵 A4 列印)
// ============================================================

// PART 03 過渡頁
const Slide22_Part3Header: Page = () => (
  <PartHeaderPage
    partNum="3"
    time="電子書模組"
    title={'雙模式自製教學電子書\n大屏互動與純淨紙本'}
    desc="一套教材、兩種場景！教師端大屏投影即時教學，學生端一鍵 A4 乾淨無干擾列印"
  />
);

// 電子書扉頁心聲
const Slide23_EbookCover: Page = () => (
  <ToolCoverSlide
    unit="數位備課"
    title="雙模式自製教學電子書"
    painPoints={[
      {
        tag: '👩‍🏫 老師心聲',
        status: '💬 備課日常',
        text: '上課投影片跟印給學生的學習單格式不同，每次備課都要做好幾份…',
        color: 'rose',
      },
      {
        tag: '👦 學生心聲',
        status: '😩 學習困擾',
        text: '上課大螢幕跟手上紙本對不起來，常常找不到老師現在講到哪裡…',
        color: 'sky',
      },
    ]}
  />
);

// 電子書功能介紹頁
const Slide24_EbookFeature: Page = () => (
  <ToolFeatureSlide
    unit="數位備課"
    title="雙模式自製教學電子書"
    subtitle="大屏教學與一鍵 A4 乾淨列印"
    tag="雙模式教學"
    points={[
      '學生端：一鍵 A4 乾淨白卷列印',
      '教師端：大屏投影／逐題秀答案',
      '內建板書螢光筆圈記劃線',
      '單一 HTML 檔案隨開隨用',
    ]}
    btnHref={toolUrls.ebookHome}
    imgSrc={imgMathPrint}
    imgAlt="雙模式自製電子書列印與大屏介面"
    frameLabel="雙模式 · 大屏教學與 A4 列印"
  />
);

// ============================================================
// 結尾章節 (帶走一件事 + 社群追蹤 + 三大網站)
// ============================================================

// 帶走一件事
const Slide25_ClosingSummary: Page = () => (
  <div
    style={{
      ...fill,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '54px 108px 100px 108px',
    }}
  >
    <TextbookBg />

    <div
      className="es-fadeUp"
      style={{
        zIndex: 2,
        maxWidth: 1400,
        width: '100%',
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(28px)',
        border: '1.5px solid rgba(255, 255, 255, 0.98)',
        borderRadius: 36,
        padding: '52px 64px 44px',
        boxShadow: '0 28px 64px rgba(78, 64, 53, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          background: 'rgba(196, 93, 71, 0.12)',
          color: colors.orange,
          borderRadius: 999,
          padding: '8px 28px',
          fontSize: '24px',
          fontWeight: 900,
        }}
      >
        <span>今天的研習</span>
      </div>

      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: '90px',
          fontWeight: 950,
          color: colors.text,
          margin: 0,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
        }}
      >
        帶走一件事，就夠了。
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          fontSize: '36px',
          fontWeight: 750,
          color: colors.text,
          lineHeight: 1.5,
          textAlign: 'left',
          marginTop: 8,
        }}
      >
        <div>
          <strong style={{ color: colors.accent }}>不必全用：</strong>工具很多，挑一個最上手的就好。
        </div>
        <div>
          <strong style={{ color: colors.orange }}>不用追趕：</strong>紙本、數位或自製 AI，適合你的就是好工具。
        </div>
        <div>
          <strong style={{ color: colors.blue }}>回歸痛點：</strong>看見每天重複的困擾，讓 AI 幫你少花一點力氣。
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          background: 'linear-gradient(135deg, #242b35 0%, #3a4758 100%)',
          color: '#ffffff',
          padding: '16px 48px',
          borderRadius: 999,
          fontSize: '34px',
          fontWeight: 950,
          boxShadow: '0 12px 28px rgba(36, 43, 53, 0.28)',
        }}
      >
        選擇自己最不排斥的！
      </div>
    </div>

    <TextbookFooter subtitle="總結與賦歸" />
  </div>
);

// 社群追蹤
const Slide26_Social: Page = () => (
  <div style={fill}>
    <TextbookBg />
    <TextbookHeader title="謝謝大家！歡迎追蹤看更多" subtitle="社群入口" unit="單元 1" />
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

export const meta: SlideMeta = {
  title: '一鍵搞定國英適性教材 特教老師的隨身備課神器',
  createdAt: '2026-10-02T19:50:00.000Z',
};

export default [
  Slide01_Title,
  Slide02_Speaker,
  Slide03_MixerIntro,
  Slide05_Agenda,
  Slide06_Part1Header,
  Slide07_ChineseLessonCover,
  Slide08_ChineseLessonFeature,
  Slide09_ChineseTranslateCover,
  Slide10_ChineseTranslateFeature,
  Slide11_CharacterFamilyCover,
  Slide12_CharacterFamilyFeature,
  Slide13_Practice_Chinese,
  Slide14_Part2Header,
  Slide15_SpecialEdEnglishCover,
  Slide16_SpecialEdEnglishFeature,
  Slide17_SteppedVocabCover,
  Slide18_SteppedVocabFeature,
  Slide19_VocabPracticeCover,
  Slide20_VocabPracticeFeature,
  Slide21_Practice_English,
  Slide22_Part3Header,
  Slide23_EbookCover,
  Slide24_EbookFeature,
  Slide25_ClosingSummary,
  Slide26_Social,
] satisfies Page[];
