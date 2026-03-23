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

  const bgIn = phaseValue(progress, 0.0, 0.12);
  const titleShow = phaseValue(progress, 0.02, 0.10);
  const loglineShow = phaseValue(progress, 0.10, 0.18);
  const toneShow = phaseValue(progress, 0.20, 0.35);
  const closingShow = phaseValue(progress, 0.40, 0.55);
  const sectionExit = phaseValue(progress, 0.65, 0.85);
  const contentOpacity = 1 - sectionExit;

  return (
    <div ref={containerRef} id="film" style={{ height: '280vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--color-bg)' }}>

        {/* Background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/film-tone.png)',
          backgroundSize: 'cover', backgroundPosition: 'center 30%',
          opacity: bgIn * 0.2 * contentOpacity,
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%)' }} />
          <div className="film-grain" />
        </div>

        {/* Ambient grain on viewport */}
        <div className="film-grain" style={{ zIndex: 2, opacity: 0.15 }} />

        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 24px', opacity: contentOpacity,
        }}>
          <div style={{ maxWidth: '720px' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8899AA',
              marginBottom: '16px', opacity: titleShow, transform: `translateY(${(1 - titleShow) * 10}px)`,
            }}>The Film</p>

            <h2 style={{
              fontFamily: "'Anton', sans-serif", fontSize: 'clamp(36px, 8vw, 80px)', textTransform: 'uppercase',
              color: '#E8DCC8', letterSpacing: '0.06em', lineHeight: 1.15,
              marginBottom: '12px', opacity: loglineShow, transform: `translateY(${(1 - loglineShow) * 15}px)`,
            }}>A rust belt fairy tale.</h2>

            <div className="tri-bar" style={{ width: '60px', margin: '20px auto 28px', opacity: loglineShow * 0.8 }} />

            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(15px, 1.6vw, 17px)',
              color: '#E8DCC8', lineHeight: 1.8,
              opacity: toneShow * 0.85, transform: `translateY(${(1 - toneShow) * 12}px)`,
              marginBottom: '32px',
            }}>
              A film that lives in the space between absurdity and heartbreak, where the biggest laughs come from the most desperate circumstances and the most moving moments sneak up on you sideways.
            </p>

            <p style={{
              fontFamily: "'Crimson Pro', serif", fontStyle: 'italic',
              fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#E8DCC8',
              lineHeight: 1.5, letterSpacing: '0.04em',
              opacity: closingShow * 0.9, transform: `translateY(${(1 - closingShow) * 12}px)`,
            }}>
              A comedy about survival. A drama about dignity. And a love letter to the people who build their lives with whatever they&apos;ve got.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
