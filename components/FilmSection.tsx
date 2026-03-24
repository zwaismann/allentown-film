'use client';

import { useEffect, useRef, useState } from 'react';

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function phaseValue(progress: number, start: number, end: number): number {
  const raw = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return easeOutCubic(raw);
}

export default function FilmSection() {
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

  const titleShow = phaseValue(progress, 0.02, 0.15);
  const loglineShow = phaseValue(progress, 0.15, 0.35);
  const bodyShow = phaseValue(progress, 0.38, 0.65);
  const exitFade = phaseValue(progress, 0.85, 1.0);
  const contentOpacity = 1 - exitFade * 0.5;

  return (
    <div ref={containerRef} id="film" style={{ height: '200vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        background: '#0D0F12',
      }}>

        {/* Static background image - no scroll-linked transforms */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/film-tone.webp)',
          backgroundSize: 'cover', backgroundPosition: 'center 30%',
          opacity: 0.12,
          pointerEvents: 'none',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.7) 100%)' }} />
        </div>

        {/* Subtle grain */}
        <div className="film-grain" style={{ zIndex: 2, opacity: 0.06, pointerEvents: 'none' }} />

        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 clamp(24px, 5vw, 80px)',
          opacity: contentOpacity,
        }}>
          <div style={{ maxWidth: '800px' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8899AA',
              marginBottom: '16px', opacity: titleShow, transform: `translateY(${(1 - titleShow) * 10}px)`,
            }}>The Film</p>

            {/* Title on one line or balanced two lines - never orphan a word */}
            <h2 style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(36px, 7vw, 72px)',
              textTransform: 'uppercase',
              color: '#E8DCC8', letterSpacing: '0.06em', lineHeight: 1.15,
              marginBottom: '12px', opacity: loglineShow,
              transform: `translateY(${(1 - loglineShow) * 15}px)`,

            }}>A RUST BELT FAIRY TALE.</h2>

            <div className="tri-bar" style={{ width: '60px', margin: '20px auto 28px', opacity: loglineShow * 0.8 }} />

            {/* Unified DM Sans for both paragraphs - they appear together */}
            <div style={{
              opacity: bodyShow * 0.9,
              transform: `translateY(${(1 - bodyShow) * 12}px)`,
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(15px, 1.5vw, 17px)',
                fontWeight: 300, color: '#E8DCC8', lineHeight: 1.8,
                marginBottom: '24px',
              }}>
                A film that lives in the space between absurdity and heartbreak, where the biggest laughs come from the most desperate circumstances and the most moving moments sneak up on you sideways.
              </p>

              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(15px, 1.5vw, 17px)',
                fontWeight: 400, fontStyle: 'italic', color: '#E8DCC8', lineHeight: 1.8,
              }}>
                A comedy about survival. A drama about dignity. And a love letter to the people who build their lives with whatever they&apos;ve got.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
