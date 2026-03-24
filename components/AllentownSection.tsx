'use client';

import { useEffect, useRef, useState } from 'react';
import useIsMobile from './useIsMobile';

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function phaseValue(progress: number, start: number, end: number): number {
  const raw = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return easeOutCubic(raw);
}

const IMAGES = [
  '/images/recession-unemployment-line.webp',
  '/images/recession-job-sign.webp',
  '/images/recession-decay.webp',
  '/images/recession-dump-reagan.webp',
];

const STATS = [
  { value: 18, suffix: '%', label: 'mortgage rates' },
  { value: 16, suffix: '%', label: 'unemployment' },
  { value: 13.5, suffix: '%', label: 'inflation' },
  { value: 12, suffix: 'M', label: 'out of work' },
  { value: 1.5, prefix: '$', suffix: 'B', label: 'steel losses' },
];

function formatStat(stat: typeof STATS[0], countProgress: number): string {
  const current = stat.value * countProgress;
  // Format with appropriate decimal places
  let formatted: string;
  if (stat.value % 1 !== 0) {
    formatted = current.toFixed(1);
  } else {
    formatted = Math.round(current).toString();
  }
  return (stat.prefix || '') + formatted + stat.suffix;
}

export default function AllentownSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const yearShow = phaseValue(progress, 0.0, 0.05);
  const cityShow = phaseValue(progress, 0.04, 0.09);
  const barShow = phaseValue(progress, 0.03, 0.08);
  const titleExit = phaseValue(progress, 0.23, 0.30);
  const titleExitEased = easeInOutCubic(titleExit);
  const titleOpacity = Math.min(yearShow, 1) * (1 - titleExitEased);

  const imageProgress = Math.min(1, Math.max(0, (progress - 0.06) / 0.19));

  // Congress image fades in and stays through stats
  const heroImageIn = phaseValue(progress, 0.25, 0.32);
  const heroImageOut = phaseValue(progress, 0.65, 0.72);
  const heroImageOpacity = heroImageIn * (1 - heroImageOut) * 0.4;

  // Stats appear one by one, each with a count-up animation
  const statsStart = 0.30;
  const statsEnd = 0.60;
  const statSlice = (statsEnd - statsStart) / STATS.length;

  // Closing line appears below stats
  const closingShow = phaseValue(progress, 0.62, 0.72);
  const goneRedShift = phaseValue(progress, 0.75, 0.85);

  // Gentle late fade
  const allExit = phaseValue(progress, 0.90, 1.0);
  const allOpacity = 1 - allExit * 0.6;

  return (
    <div
      ref={containerRef}
      id="story"
      style={{ height: '340vh', position: 'relative' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: `rgba(13, 15, 18, ${Math.min(1, progress * 10)})` }}>

        {/* Scrolling recession images */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {IMAGES.map((src, i) => {
            const totalImages = IMAGES.length;
            const imgSlice = 1 / totalImages;
            const imageStart = i * imgSlice * 0.7;
            const imageDuration = imgSlice * 1.6;
            const localProgress = Math.min(1, Math.max(0, (imageProgress - imageStart) / imageDuration));
            const yPercent = (1 - localProgress * 2) * 100;
            const fadeIn = Math.min(1, localProgress * 4);
            const fadeOut = Math.min(1, (1 - localProgress) * 4);
            const opacity = Math.min(fadeIn, fadeOut) * 0.6;
            if (opacity <= 0) return null;
            const isLeft = i % 2 === 0;

            return (
              <div key={src} style={{
                position: 'absolute',
                left: isLeft ? 'clamp(16px, 3vw, 40px)' : 'auto',
                right: isLeft ? 'auto' : 'clamp(16px, 3vw, 40px)',
                top: '50%',
                width: isMobile ? 'min(70vw, 320px)' : 'min(52vw, 520px)',
                height: 'min(45vh, 380px)',
                backgroundColor: '#1A1F24',
                transform: `translateY(calc(-50% + ${yPercent}%))`,
                opacity, borderRadius: '2px', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="film-grain" />
                <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5)' }} />
              </div>
            );
          })}
        </div>

        {/* Congress protest image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/congress-protest.webp)',
          backgroundSize: 'cover', backgroundPosition: 'center center',
          opacity: heroImageOpacity,
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.6) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)' }} />
          <div className="film-grain" />
        </div>

        {/* Fog */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: titleOpacity * 0.5, zIndex: 8 }}>
          <div className="fog-layer fog-1" />
          <div className="fog-layer fog-2" />
          <div className="fog-layer fog-3" />
        </div>

        {/* 1982 / ALLENTOWN, PA */}
        {titleOpacity > 0 && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(48px, 10vw, 100px)', color: '#E8DCC8', letterSpacing: '0.06em', lineHeight: 1, marginBottom: '16px', opacity: titleOpacity, transform: `translateX(${(1 - yearShow) * -60}px)` }}>1982</h2>
            <div className="tri-bar" style={{ width: '80px', marginBottom: '16px', opacity: titleOpacity * 0.8, transform: `scaleX(${barShow})` }} />
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(48px, 10vw, 100px)', color: '#E8DCC8', letterSpacing: '0.06em', lineHeight: 1, opacity: titleOpacity, transform: `translateX(${(1 - cityShow) * 60}px)` }}>ALLENTOWN, PA</h2>
          </div>
        )}

        {/* Stats + closing line */}
        {allOpacity > 0 && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '0 clamp(16px, 3vw, 40px)',
            opacity: allOpacity,
          }}>
            {/* Stats row - all white/cream, with count-up animation */}
            <div style={{
              display: 'flex', gap: isMobile ? 'clamp(8px, 2vw, 16px)' : 'clamp(12px, 2.5vw, 32px)',
              flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-end',
              marginBottom: '40px',
            }}>
              {STATS.map((stat, i) => {
                const statAppear = phaseValue(progress, statsStart + i * statSlice, statsStart + i * statSlice + statSlice * 0.6);
                const countUp = phaseValue(progress, statsStart + i * statSlice, statsStart + i * statSlice + statSlice * 1.2);
                if (statAppear <= 0) return null;

                return (
                  <div key={stat.label} style={{
                    textAlign: 'center',
                    opacity: statAppear,
                    transform: `translateY(${(1 - statAppear) * 15}px)`,
                  }}>
                    <p style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 'clamp(32px, 6vw, 64px)',
                      color: '#E8DCC8',
                      letterSpacing: '0.02em',
                      lineHeight: 1,
                      marginBottom: '4px',
                      textShadow: '0 2px 16px rgba(0,0,0,0.6)',
                    }}>
                      {formatStat(stat, countUp)}
                    </p>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 'clamp(11px, 1.2vw, 14px)',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#E8DCC8',
                      opacity: 0.75,
                      textShadow: '0 1px 8px rgba(0,0,0,0.6)',
                    }}>
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Closing line - unified DM Sans font */}
            {closingShow > 0 && (
              <div style={{ maxWidth: '680px', textAlign: 'center' }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  fontWeight: 300,
                  color: '#E8DCC8',
                  lineHeight: 1.6, letterSpacing: '0.02em',
                  opacity: closingShow, transform: `translateY(${(1 - closingShow) * 15}px)`,
                  textShadow: '0 1px 12px rgba(0,0,0,0.6)',
                }}>
                  For the people of Allentown, the American Dream wasn&apos;t slipping away.{' '}
                  <span style={{
                    fontWeight: 500,
                    color: goneRedShift > 0
                      ? `rgb(${Math.round(232 * goneRedShift + 232 * (1 - goneRedShift))}, ${Math.round(75 * goneRedShift + 220 * (1 - goneRedShift))}, ${Math.round(43 * goneRedShift + 200 * (1 - goneRedShift))})`
                      : '#E8DCC8',
                  }}>
                    It was already gone.
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
