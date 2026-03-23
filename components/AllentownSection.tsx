'use client';

import { useEffect, useRef, useState } from 'react';

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
  '/images/recession-unemployment-line.jpg',
  '/images/recession-job-sign.jpg',
  '/images/recession-decay.jpg',
  '/images/recession-dump-reagan.webp',
];

const STATS = [
  { number: '18%', label: 'mortgage rates', color: '#99AABB' },
  { number: '16%', label: 'unemployment', color: '#7A8FA0' },
  { number: '13.5%', label: 'inflation', color: '#C4713B' },
  { number: '12M', label: 'out of work', color: '#D4943A' },
  { number: '$1.5B', label: 'steel losses', color: '#E84B2B' },
];

export default function AllentownSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

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

  // Tighter mapping across 400vh:
  // 0.00 - 0.08: "1982 / ALLENTOWN, PA"
  // 0.06 - 0.25: recession images scroll
  // 0.23 - 0.30: title exits, congress image fades in
  // 0.30 - 0.65: stats appear left to right over congress image
  // 0.65 - 0.72: stats + image fade out
  // 0.72 - 0.88: closing line
  // 0.88 - 0.95: "gone" turns red

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

  // Stats appear one by one from left to right, all stay visible
  const statsStart = 0.30;
  const statsEnd = 0.60;
  const statSlice = (statsEnd - statsStart) / STATS.length;

  // Closing line appears below stats (stats stay visible)
  const closingShow = phaseValue(progress, 0.62, 0.72);
  const goneRedShift = phaseValue(progress, 0.75, 0.82);

  // Everything fades out together after the red shift
  const allExit = phaseValue(progress, 0.85, 0.95);
  const allOpacity = 1 - easeInOutCubic(allExit);

  return (
    <div
      ref={containerRef}
      id="story"
      style={{ height: '400vh', position: 'relative' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--color-bg)' }}>

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
                top: '50%', width: 'min(52vw, 520px)', height: 'min(45vh, 380px)',
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

        {/* Congress protest image - visible through stats */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/congress-protest.jpg)',
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

        {/* Stats + closing line - unified section */}
        {heroImageOpacity > 0 && allOpacity > 0 && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '0 clamp(16px, 3vw, 40px)',
            opacity: allOpacity,
          }}>
            {/* Stats row */}
            <div style={{
              display: 'flex', gap: 'clamp(12px, 2.5vw, 32px)',
              flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-end',
              marginBottom: '40px',
            }}>
              {STATS.map((stat, i) => {
                const statAppear = phaseValue(progress, statsStart + i * statSlice, statsStart + i * statSlice + statSlice * 0.6);
                if (statAppear <= 0) return null;

                return (
                  <div key={stat.number} style={{
                    textAlign: 'center',
                    opacity: statAppear,
                    transform: `translateY(${(1 - statAppear) * 15}px)`,
                  }}>
                    <p style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 'clamp(32px, 6vw, 64px)',
                      color: stat.color,
                      letterSpacing: '0.02em',
                      lineHeight: 1,
                      marginBottom: '4px',
                      textShadow: '0 2px 16px rgba(0,0,0,0.6)',
                    }}>
                      {stat.number}
                    </p>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 'clamp(9px, 1vw, 12px)',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#E8DCC8',
                      opacity: 0.5,
                      textShadow: '0 1px 8px rgba(0,0,0,0.6)',
                    }}>
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Closing line - appears below stats */}
            {closingShow > 0 && (
              <div style={{ maxWidth: '680px', textAlign: 'center' }}>
                <p style={{
                  fontFamily: "'Crimson Pro', serif", fontStyle: 'italic',
                  fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#E8DCC8',
                  lineHeight: 1.5, letterSpacing: '0.04em',
                  opacity: closingShow, transform: `translateY(${(1 - closingShow) * 15}px)`,
                  textShadow: '0 1px 12px rgba(0,0,0,0.6)',
                }}>
                  For the people of Allentown, the American Dream wasn&apos;t slipping away.{' '}
                  <span style={{
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
