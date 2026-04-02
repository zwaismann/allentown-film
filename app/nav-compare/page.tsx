'use client';

import { useState } from 'react';

type NavStyle = 'top' | 'left-vertical' | 'left-rotated' | 'right-stack';

const NAV_ITEMS = [
  { label: 'The Story', href: '#story' },
  { label: 'The Men', href: '#men' },
  { label: 'The Film', href: '#film' },
  { label: 'The Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
  { label: 'For Investors', href: '#investors' },
];

const LABELS: Record<NavStyle, string> = {
  'top': 'A — Current (horizontal top bar)',
  'left-vertical': 'B — Left sidebar (stacked vertical)',
  'left-rotated': 'C — Left edge (rotated 90°, running up the side)',
  'right-stack': 'D — Right sidebar (stacked, right-aligned)',
};

export default function NavCompare() {
  const [style, setStyle] = useState<NavStyle>('top');

  return (
    <div style={{ background: '#000', width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Selector */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid #333',
          padding: '12px 24px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {(Object.keys(LABELS) as NavStyle[]).map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            style={{
              background: style === s ? '#E84B2B' : '#1A1F24',
              color: '#E8DCC8',
              border: '1px solid',
              borderColor: style === s ? '#E84B2B' : '#333',
              padding: '6px 14px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {LABELS[s]}
          </button>
        ))}
      </div>

      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero-billboard.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,31,36,0.2) 0%, rgba(26,31,36,0.35) 40%, rgba(12,10,8,0.88) 85%, rgba(12,10,8,0.95) 100%)', mixBlendMode: 'multiply' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
      </div>

      {/* Title block - always visible for context */}
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
        }}
      >
        <div style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(24px, 3.8vw, 33px)', color: '#E8DCC8', letterSpacing: '0.08em', marginBottom: '16px' }}>
          Three men. A billboard. And the American Dream.
        </div>
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #E84B2B, #C4713B, #D4943A)', opacity: 0.8, marginBottom: '20px' }} />
        <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(56px, 12vw, 160px)', color: '#E8DCC8', letterSpacing: '0.06em', lineHeight: 1, marginBottom: '20px' }}>
          ALLENTOWN
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 1.2vw, 14px)', fontWeight: 500, color: '#8899AA', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          A feature film about the<br />greatest radio contest of all time
        </p>
      </div>

      {/* ===== NAV VARIANTS ===== */}

      {/* A: Current top bar */}
      {style === 'top' && (
        <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(24px, 4vw, 48px)', height: '64px', opacity: 0.5 }}>
          <a href="#" style={{ fontFamily: "'Anton', sans-serif", fontSize: '18px', letterSpacing: '0.08em', color: '#E8DCC8', textDecoration: 'none' }}>ALLENTOWN</a>
          <nav style={{ display: 'flex', gap: 'clamp(16px, 2.5vw, 32px)' }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8DCC8', textDecoration: 'none' }}>{item.label}</a>
            ))}
          </nav>
        </header>
      )}

      {/* B: Left sidebar stacked */}
      {style === 'left-vertical' && (
        <header style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, display: 'flex', flexDirection: 'column', padding: 'clamp(24px, 4vw, 40px)', opacity: 0.5, gap: '0' }}>
          <a href="#" style={{ fontFamily: "'Anton', sans-serif", fontSize: '18px', letterSpacing: '0.08em', color: '#E8DCC8', textDecoration: 'none', marginBottom: '40px' }}>ALLENTOWN</a>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8DCC8', textDecoration: 'none' }}>{item.label}</a>
            ))}
          </nav>
        </header>
      )}

      {/* C: Left edge rotated */}
      {style === 'left-rotated' && (
        <header style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, width: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.5 }}>
          {/* Logo at top, not rotated */}
          <a href="#" style={{ fontFamily: "'Anton', sans-serif", fontSize: '14px', letterSpacing: '0.08em', color: '#E8DCC8', textDecoration: 'none', writingMode: 'vertical-lr', transform: 'rotate(180deg)', marginTop: '24px', marginBottom: '32px' }}>ALLENTOWN</a>
          {/* Thin vertical line */}
          <div style={{ width: '1px', height: '24px', background: 'linear-gradient(180deg, #E84B2B, #C4713B, #D4943A)', marginBottom: '32px' }} />
          {/* Nav items rotated */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E8DCC8', textDecoration: 'none', writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>{item.label}</a>
            ))}
          </nav>
        </header>
      )}

      {/* D: Right sidebar stacked, right-aligned text */}
      {style === 'right-stack' && (
        <header style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: 'clamp(24px, 4vw, 40px)', opacity: 0.5 }}>
          <a href="#" style={{ fontFamily: "'Anton', sans-serif", fontSize: '18px', letterSpacing: '0.08em', color: '#E8DCC8', textDecoration: 'none', marginBottom: '40px' }}>ALLENTOWN</a>
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px' }}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E8DCC8', textDecoration: 'none' }}>{item.label}</a>
            ))}
          </nav>
        </header>
      )}

      {/* Stripe bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '5px', display: 'flex', zIndex: 10 }}>
        <div style={{ flex: 1, background: '#E84B2B' }} />
        <div style={{ flex: 1, background: '#C4713B' }} />
        <div style={{ flex: 1, background: '#D4943A' }} />
      </div>
    </div>
  );
}
