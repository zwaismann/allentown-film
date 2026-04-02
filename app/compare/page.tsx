'use client';

import { useState, useEffect } from 'react';

type Version = 'A' | 'B';

export default function Compare() {
  const [version, setVersion] = useState<Version>('A');
  const [phase, setPhase] = useState(0);
  const [key, setKey] = useState(0);

  const play = (v: Version) => {
    setVersion(v);
    setPhase(0);
    setKey(k => k + 1);
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => setPhase(3), 3600),
      setTimeout(() => setPhase(4), 4800),
      setTimeout(() => setPhase(5), 6400),
      setTimeout(() => setPhase(6), 8000),
      setTimeout(() => setPhase(7), 9200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [key]);

  return (
    <div style={{ background: '#000' }}>
      {/* Controls */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #333',
          padding: '14px 24px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <span style={{ color: '#8899AA', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginRight: '8px' }}>
          Compare:
        </span>
        <button
          onClick={() => play('A')}
          style={{
            background: version === 'A' ? '#E84B2B' : '#1A1F24',
            color: '#E8DCC8',
            border: '1px solid',
            borderColor: version === 'A' ? '#E84B2B' : '#333',
            padding: '8px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          A — Current
        </button>
        <button
          onClick={() => play('B')}
          style={{
            background: version === 'B' ? '#E84B2B' : '#1A1F24',
            color: '#E8DCC8',
            border: '1px solid',
            borderColor: version === 'B' ? '#E84B2B' : '#333',
            padding: '8px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          B — Revised
        </button>
        <span style={{ color: '#667788', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", marginLeft: '16px' }}>
          {version === 'A' ? 'Center-stacked layout, current styling' : 'Bottom-third layout, unified type, scroll cue, bolder stripe'}
        </span>
      </div>

      <div key={key} style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#000' }}>
        {/* Background image - same for both */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/hero-billboard.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'scale(1)' : 'scale(1.15)',
            transition: 'opacity 2s ease-in-out, transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: version === 'A'
                ? 'linear-gradient(180deg, rgba(26,31,36,0.4) 0%, rgba(26,31,36,0.6) 50%, rgba(12,10,8,0.85) 100%)'
                : 'linear-gradient(180deg, rgba(26,31,36,0.2) 0%, rgba(26,31,36,0.35) 40%, rgba(12,10,8,0.88) 85%, rgba(12,10,8,0.95) 100%)',
              mixBlendMode: 'multiply',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.3,
              mixBlendMode: 'overlay',
              pointerEvents: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '128px 128px',
            }}
          />
        </div>

        {version === 'A' ? (
          <VersionA phase={phase} />
        ) : (
          <VersionB phase={phase} />
        )}
      </div>
    </div>
  );
}

/* ===================== VERSION A — CURRENT ===================== */
function VersionA({ phase }: { phase: number }) {
  return (
    <>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(24px, 3.8vw, 33px)',
            fontWeight: 400,
            color: '#E8DCC8',
            letterSpacing: '0.08em',
            marginBottom: '28px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0 0.35em',
          }}
        >
          <span style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 1.2s ease-out, transform 1.2s ease-out' }}>
            Three men.
          </span>
          <span style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 1.2s ease-out, transform 1.2s ease-out' }}>
            A billboard.
          </span>
          <span style={{ opacity: phase >= 4 ? 1 : 0, transform: phase >= 4 ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 1.2s ease-out, transform 1.2s ease-out' }}>
            And the American Dream.
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(56px, 12vw, 160px)',
            fontWeight: 400,
            color: '#E8DCC8',
            letterSpacing: '0.06em',
            lineHeight: 1,
            textTransform: 'uppercase',
            opacity: phase >= 5 ? 1 : 0,
            transform: phase >= 5 ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(1.02)',
            transition: 'opacity 2s ease-out, transform 2s ease-out',
            marginBottom: '32px',
          }}
        >
          ALLENTOWN
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(11px, 1.2vw, 14px)',
            fontWeight: 500,
            color: '#8899AA',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            opacity: phase >= 6 ? 1 : 0,
            transition: 'opacity 1.5s ease-out',
          }}
        >
          A feature film about the<br />greatest radio contest of all time
        </p>
      </div>

      {/* Stripe bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          display: 'flex',
          opacity: phase >= 5 ? 1 : 0,
          transition: 'opacity 2s ease-out 0.5s',
        }}
      >
        <div style={{ flex: 1, background: '#E84B2B' }} />
        <div style={{ flex: 1, background: '#C4713B' }} />
        <div style={{ flex: 1, background: '#D4943A' }} />
      </div>
    </>
  );
}

/* ===================== VERSION B — REVISED ===================== */
function VersionB({ phase }: { phase: number }) {
  return (
    <>
      {/* Text pushed to bottom third */}
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
          paddingBottom: 'clamp(80px, 12vh, 140px)',
        }}
      >
        {/* Tagline */}
        <div
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(24px, 3.8vw, 33px)',
            fontWeight: 400,
            color: '#E8DCC8',
            letterSpacing: '0.08em',
            marginBottom: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0 0.35em',
          }}
        >
          <span style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 1.2s ease-out, transform 1.2s ease-out' }}>
            Three men.
          </span>
          <span style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 1.2s ease-out, transform 1.2s ease-out' }}>
            A billboard.
          </span>
          <span style={{ opacity: phase >= 4 ? 1 : 0, transform: phase >= 4 ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity 1.2s ease-out, transform 1.2s ease-out' }}>
            And the American Dream.
          </span>
        </div>

        {/* Thin divider rule */}
        <div
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, #E84B2B, #C4713B, #D4943A)',
            opacity: phase >= 5 ? 0.8 : 0,
            transition: 'opacity 1.5s ease-out',
            marginBottom: '20px',
          }}
        />

        {/* Title - tighter to tagline */}
        <h1
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(56px, 12vw, 160px)',
            fontWeight: 400,
            color: '#E8DCC8',
            letterSpacing: '0.06em',
            lineHeight: 1,
            textTransform: 'uppercase',
            opacity: phase >= 5 ? 1 : 0,
            transform: phase >= 5 ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(1.02)',
            transition: 'opacity 2s ease-out, transform 2s ease-out',
            marginBottom: '20px',
          }}
        >
          ALLENTOWN
        </h1>

        {/* Subtitle - in Crimson Pro to match tagline */}
        <p
          style={{
            fontFamily: "'Crimson Pro', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(14px, 1.6vw, 18px)',
            fontWeight: 400,
            color: '#8899AA',
            letterSpacing: '0.06em',
            opacity: phase >= 6 ? 1 : 0,
            transform: phase >= 6 ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 1.5s ease-out, transform 1.5s ease-out',
          }}
        >
          A feature film about the<br />greatest radio contest of all time
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: phase >= 7 ? 1 : 0,
          transition: 'opacity 1.5s ease-out',
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#667788',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '24px',
            background: 'linear-gradient(180deg, #667788, transparent)',
            animation: 'pulse-line 2s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes pulse-line {
            0%, 100% { opacity: 0.4; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(1.3); }
          }
        `}</style>
      </div>

      {/* Stripe bar - bolder, animated sweep */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '5px',
          display: 'flex',
          opacity: phase >= 5 ? 1 : 0,
          transform: phase >= 5 ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'opacity 0.5s ease-out, transform 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
          transitionDelay: phase >= 5 ? '0.5s' : '0s',
        }}
      >
        <div style={{ flex: 1, background: '#E84B2B' }} />
        <div style={{ flex: 1, background: '#C4713B' }} />
        <div style={{ flex: 1, background: '#D4943A' }} />
      </div>
    </>
  );
}
