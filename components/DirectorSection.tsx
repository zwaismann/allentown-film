'use client';

import { useEffect, useRef, useState } from 'react';

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function phaseValue(progress: number, start: number, end: number): number {
  const raw = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return easeOutCubic(raw);
}

export default function DirectorSection() {
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

  const titleShow = phaseValue(progress, 0.0, 0.12);
  const p1Show = phaseValue(progress, 0.12, 0.32);
  const p2Show = phaseValue(progress, 0.34, 0.55);
  const sigShow = phaseValue(progress, 0.55, 0.68);
  // Gentle late fade - content softens at the very end but never disappears
  const directorExit = phaseValue(progress, 0.90, 1.0);
  const contentOpacity = 1 - directorExit * 0.5;

  return (
    <div
      ref={containerRef}
      id="director"
      style={{
        height: '220vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: `rgba(13, 15, 18, ${Math.min(1, progress * 10)})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
        }}
      >
        {/* Ambient texture */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: contentOpacity * 0.4 }}>
          <div className="fog-layer fog-2" />
        </div>
        <div className="film-grain" style={{ opacity: 0.15 }} />

        <div style={{ maxWidth: '640px', textAlign: 'left', opacity: contentOpacity, position: 'relative', zIndex: 2 }}>
          {/* Label */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#8899AA',
            marginBottom: '24px',
            opacity: titleShow,
            transform: `translateY(${(1 - titleShow) * 10}px)`,
          }}>
            A note from the director
          </p>

          <div className="tri-bar" style={{ width: '60px', marginBottom: '32px', opacity: titleShow * 0.8, transform: `scaleX(${titleShow})`, transformOrigin: 'left' }} />

          {/* Statement */}
          <p style={{
            fontFamily: "'Crimson Pro', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(17px, 2vw, 20px)',
            color: '#E8DCC8',
            lineHeight: 1.8,
            letterSpacing: '0.02em',
            marginBottom: '28px',
            opacity: p1Show * 0.9,
            transform: `translateY(${(1 - p1Show) * 12}px)`,
          }}>
            I&apos;ve been developing Allentown for several years now, and the thing that keeps pulling me back is how much this story feels like right now. In 1982, three ordinary guys climbed a billboard because it was the only path to something most Americans take for granted: a place to call home.
          </p>

          <p style={{
            fontFamily: "'Crimson Pro', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(17px, 2vw, 20px)',
            color: '#E8DCC8',
            lineHeight: 1.8,
            letterSpacing: '0.02em',
            marginBottom: '40px',
            opacity: p2Show * 0.9,
            transform: `translateY(${(1 - p2Show) * 12}px)`,
          }}>
            That&apos;s the story I want to tell. Not a period piece about the &apos;80s, but a film about what happens when the ground falls out from under you and the only direction left is up. Literally.
          </p>

          {/* Signature */}
          <div style={{
            opacity: sigShow,
            transform: `translateY(${(1 - sigShow) * 10}px)`,
          }}>
            <p style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              color: '#E8DCC8',
              letterSpacing: '0.04em',
              marginBottom: '4px',
            }}>
              ZE&apos;EV WAISMANN
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#667788',
            }}>
              Director / Co-Writer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
