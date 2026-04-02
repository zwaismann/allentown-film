'use client';

import { useState, useEffect, useCallback } from 'react';

type AnimStyle = 'fade' | 'zoom-out' | 'curtain' | 'blur' | 'film-burn';

const LABELS: Record<AnimStyle, string> = {
  'fade': '1. Simple Fade',
  'zoom-out': '2. Slow Zoom Out (Ken Burns reverse)',
  'curtain': '3. Vertical Curtain Reveal',
  'blur': '4. Blur to Sharp',
  'film-burn': '5. Film Burn (white flash to image)',
};

const DESCRIPTIONS: Record<AnimStyle, string> = {
  'fade': 'What you have now. Clean opacity fade from black.',
  'zoom-out': 'Image starts slightly zoomed in and slowly pulls back as it fades in, like a camera pulling focus.',
  'curtain': 'A horizontal line sweeps down the screen revealing the image, like a curtain lifting.',
  'blur': 'Image is there from the start but heavily blurred, then sharpens into focus.',
  'film-burn': 'A brief warm white flash, then the image bleeds in from the center outward, like old film stock catching light.',
};

export default function Demo() {
  const [style, setStyle] = useState<AnimStyle>('fade');
  const [playing, setPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const play = useCallback((s: AnimStyle) => {
    setStyle(s);
    setPlaying(false);
    // Force remount
    setKey(k => k + 1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPlaying(true);
      });
    });
  }, []);

  return (
    <div style={{ background: '#111', minHeight: '100vh' }}>
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
          padding: '16px 24px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <span style={{ color: '#8899AA', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginRight: '8px' }}>
          Image Reveal:
        </span>
        {(Object.keys(LABELS) as AnimStyle[]).map((s) => (
          <button
            key={s}
            onClick={() => play(s)}
            style={{
              background: style === s ? '#E84B2B' : '#1A1F24',
              color: '#E8DCC8',
              border: '1px solid',
              borderColor: style === s ? '#E84B2B' : '#333',
              padding: '6px 14px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s',
            }}
          >
            {LABELS[s]}
          </button>
        ))}
      </div>

      {/* Description */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid #333',
          padding: '14px 24px',
        }}
      >
        <p style={{ color: '#8899AA', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
          <span style={{ color: '#D4943A' }}>{LABELS[style]}:</span>{' '}
          {DESCRIPTIONS[style]}
        </p>
      </div>

      {/* Animation viewport */}
      <div
        key={key}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        <ImageReveal style={style} playing={playing} />
      </div>
    </div>
  );
}

function ImageReveal({ style, playing }: { style: AnimStyle; playing: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (playing) {
      const t = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(t);
    }
  }, [playing]);

  const active = playing && mounted;

  const baseImageStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url(/images/hero-billboard.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
  };

  const overlays = (
    <>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(26,31,36,0.4) 0%, rgba(26,31,36,0.6) 50%, rgba(12,10,8,0.85) 100%)',
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
    </>
  );

  if (style === 'fade') {
    return (
      <div
        style={{
          ...baseImageStyle,
          opacity: active ? 1 : 0,
          transition: 'opacity 2.5s ease-in-out',
        }}
      >
        {overlays}
      </div>
    );
  }

  if (style === 'zoom-out') {
    return (
      <div
        style={{
          ...baseImageStyle,
          opacity: active ? 1 : 0,
          transform: active ? 'scale(1)' : 'scale(1.15)',
          transition: 'opacity 2s ease-in-out, transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        {overlays}
      </div>
    );
  }

  if (style === 'curtain') {
    return (
      <>
        <div
          style={{
            ...baseImageStyle,
          }}
        >
          {overlays}
        </div>
        {/* Black curtain that slides up */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#000',
            transform: active ? 'translateY(-100%)' : 'translateY(0)',
            transition: 'transform 2.2s cubic-bezier(0.77, 0, 0.18, 1)',
          }}
        />
      </>
    );
  }

  if (style === 'blur') {
    return (
      <div
        style={{
          ...baseImageStyle,
          filter: active ? 'blur(0px) brightness(1)' : 'blur(30px) brightness(0.4)',
          transition: 'filter 3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        {overlays}
      </div>
    );
  }

  if (style === 'film-burn') {
    return (
      <>
        <div
          style={{
            ...baseImageStyle,
            opacity: active ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out 0.6s',
          }}
        >
          {overlays}
        </div>
        {/* White flash */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(232,220,200,0.9) 0%, rgba(212,148,58,0.6) 40%, transparent 70%)',
            opacity: active ? 0 : 0,
            animation: active ? 'film-flash 2s ease-out forwards' : 'none',
          }}
        />
        <style>{`
          @keyframes film-flash {
            0% { opacity: 0; }
            15% { opacity: 1; }
            40% { opacity: 0.8; }
            100% { opacity: 0; }
          }
        `}</style>
      </>
    );
  }

  return null;
}
