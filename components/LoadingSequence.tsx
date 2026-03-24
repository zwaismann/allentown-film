'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function LoadingSequence({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [introZoomDone, setIntroZoomDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  onCompleteRef.current = onComplete;

  // Skip intro on early scroll
  const skipToEnd = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    setPhase(7);
    setIntroZoomDone(true);
    onCompleteRef.current?.();
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 2600),
      setTimeout(() => setPhase(4), 3400),
      setTimeout(() => setPhase(5), 4800),
      setTimeout(() => setPhase(6), 6000),
      setTimeout(() => setPhase(7), 7200),
      setTimeout(() => setIntroZoomDone(true), 4600),
      setTimeout(() => onCompleteRef.current?.(), 8200),
    ];
    timersRef.current = timers;
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = Math.min(1, Math.max(0, -rect.top / scrollable));
      setScrollProgress(raw);

      // If user scrolls during intro, skip it
      if (raw > 0.05 && phase < 7) {
        skipToEnd();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [phase, skipToEnd]);

  const easedProgress = easeOutCubic(scrollProgress);
  // Scroll-driven fade - no CSS transition, immediate response
  const scrollFade = Math.max(0, 1 - easedProgress * 2);
  // Background fades to transparent so the next section shows through
  const bgOpacity = Math.max(0, 1 - easedProgress * 1.5);

  return (
    <div
      ref={containerRef}
      style={{
        height: '115vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: `rgba(13, 15, 18, ${bgOpacity})`,
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/hero-billboard.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            opacity: (phase >= 1 ? 1 : 0) * scrollFade,
            transform: phase >= 1 ? 'scale(1)' : 'scale(1.15)',
            transition: introZoomDone ? 'none' : 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,31,36,0.2) 0%, rgba(26,31,36,0.35) 40%, rgba(12,10,8,0.88) 85%, rgba(12,10,8,0.95) 100%)', mixBlendMode: 'multiply' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
          <div className="film-grain" />
        </div>

        {/* Text content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: '100%',
            textAlign: 'center',
            padding: '0 24px',
            paddingBottom: 'clamp(120px, 18vh, 200px)',
            opacity: scrollFade,
          }}
        >
          <div style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(24px, 3.8vw, 33px)', fontWeight: 400, color: '#E8DCC8', letterSpacing: '0.08em', marginBottom: '16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.35em' }}>
            <span style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 1.2s ease-out, transform 1.2s ease-out' }}>Three men.</span>
            <span style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 1.2s ease-out, transform 1.2s ease-out' }}>A billboard.</span>
            <span style={{ opacity: phase >= 4 ? 1 : 0, transform: phase >= 4 ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 1.2s ease-out, transform 1.2s ease-out' }}>And the American Dream.</span>
          </div>

          <div className="tri-bar" style={{ width: '60px', opacity: phase >= 5 ? 0.8 : 0, transition: 'opacity 1.5s ease-out', marginBottom: '20px' }} />

          <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(56px, 12vw, 160px)', fontWeight: 400, color: '#E8DCC8', letterSpacing: '0.06em', lineHeight: 1, textTransform: 'uppercase', opacity: phase >= 5 ? 1 : 0, transform: phase >= 5 ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(1.02)', transition: 'opacity 2s ease-out, transform 2s ease-out', marginBottom: '20px' }}>
            ALLENTOWN
          </h1>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 1.2vw, 14px)', fontWeight: 500, color: '#8899AA', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: phase >= 6 ? 1 : 0, transition: 'opacity 1.5s ease-out' }}>
            A feature film about the<br />greatest radio contest of all time
          </p>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: phase >= 7 && scrollProgress < 0.15 ? Math.max(0, 1 - scrollProgress * 8) : 0, transition: 'opacity 0.8s ease-out' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#667788' }}>Scroll</span>
          <div className="scroll-pulse" style={{ width: '1px', height: '24px', background: 'linear-gradient(180deg, #667788, transparent)' }} />
        </div>

        {/* Animated stripe bar */}
        <div
          className="tri-bar-thick"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            opacity: phase >= 5 ? scrollFade : 0,
            transform: phase >= 5 ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left center',
            transition: phase < 6 ? 'transform 1.8s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            transitionDelay: phase >= 5 && phase < 6 ? '0.5s' : '0s',
            zIndex: 4,
          }}
        />
      </div>
    </div>
  );
}
