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

export default function ContestSection() {
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

  // Phase mapping across 450vh:
  // 0.00 - 0.12: "Then somebody had an idea." fades in
  // 0.12 - 0.22: bridge text fades out
  // 0.22 - 0.36: "ONE BILLBOARD." fades in
  // 0.36 - 0.48: "THREE MEN." fades in
  // 0.48 - 0.62: "LAST ONE DOWN WINS A HOME." fades in
  // 0.60 - 0.72: billboard image fades in behind text
  // 0.70 - 0.82: text fades out, image stays
  // 0.82 - 1.00: hold on image, then fade out

  const line1Show = phaseValue(progress, 0.0, 0.20);
  const line2Show = phaseValue(progress, 0.20, 0.40);
  const line3Show = phaseValue(progress, 0.40, 0.60);

  // Billboard image fades in as lines appear
  const imageIn = phaseValue(progress, 0.12, 0.25);
  const imageOut = phaseValue(progress, 0.92, 1.0);
  const imageOpacity = imageIn * (1 - imageOut) * 0.45;

  // Text fades out as image takes over
  const textExit = phaseValue(progress, 0.68, 0.78);
  const textExitEased = easeInOutCubic(textExit);
  const textOpacity = 1 - textExitEased;

  // "The Contestants" bridge card
  const contestantsShow = phaseValue(progress, 0.82, 0.92);

  // Ambient color intensity builds with the lines
  const colorIntensity = Math.max(line1Show * 0.3, line2Show * 0.5, line3Show * 0.8) * textOpacity;

  return (
    <div
      ref={containerRef}
      id="contest"
      style={{
        height: '270vh',
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
        }}
      >
        {/* Billboard 59-days image - fades in behind text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/billboard-59-days.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            opacity: imageOpacity,
            willChange: 'opacity',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.5) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)' }} />
          <div className="film-grain" />
        </div>

        {/* Ambient steel blue glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 50% 60%, rgba(44,62,80,${colorIntensity * 0.15}) 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />
        {/* Warm accent glow from bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 50% 100%, rgba(212,148,58,${colorIntensity * 0.06}) 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Block letter lines - fade out when image takes over */}
        {line1Show > 0 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 24px',
            opacity: textOpacity,
            willChange: 'opacity',
          }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(36px, 8vw, 90px)',
                  color: '#E8DCC8',
                  letterSpacing: '0.06em',
                  overflowWrap: 'break-word',
                  lineHeight: 1.15,
                  opacity: line1Show,
                  transform: `translateY(${(1 - line1Show) * 20}px)`,
                  marginBottom: '8px',
                }}
              >
                ONE BILLBOARD.
              </h2>

              <h2
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(36px, 8vw, 90px)',
                  color: '#E8DCC8',
                  letterSpacing: '0.06em',
                  overflowWrap: 'break-word',
                  lineHeight: 1.15,
                  opacity: line2Show,
                  transform: `translateY(${(1 - line2Show) * 20}px)`,
                  marginBottom: '8px',
                }}
              >
                THREE MEN.
              </h2>

              <h2
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(36px, 8vw, 90px)',
                  color: '#D4943A',
                  letterSpacing: '0.06em',
                  overflowWrap: 'break-word',
                  lineHeight: 1.15,
                  opacity: line3Show,
                  transform: `translateY(${(1 - line3Show) * 20}px)`,
                }}
              >
                LAST ONE DOWN WINS A HOME.
              </h2>

              {/* Tri-bar */}
              <div
                className="tri-bar-thick"
                style={{
                  width: '120px',
                  margin: '24px auto 0',
                  opacity: line3Show * 0.8,
                  transform: `scaleX(${line3Show})`,
                }}
              />
            </div>
          </div>
        )}

        {/* "The Contestants" bridge card */}
        {contestantsShow > 0 && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 24px',
            opacity: contestantsShow,
            transform: `translateY(${(1 - contestantsShow) * 20}px)`,
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#8899AA',
              marginBottom: '16px',
            }}>
              Meet
            </p>
            <h2 style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(40px, 8vw, 80px)',
              color: '#E8DCC8',
              letterSpacing: '0.06em',
              lineHeight: 1,
            }}>
              THE CONTESTANTS
            </h2>
            <div className="tri-bar" style={{ width: '80px', marginTop: '20px', opacity: 0.8 }} />
          </div>
        )}
      </div>
    </div>
  );
}
