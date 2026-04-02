'use client';

import { useEffect, useRef, useState } from 'react';

type TransitionStyle = 'parallax' | 'crossfade' | 'curtain' | 'zoom-dark';

const LABELS: Record<TransitionStyle, string> = {
  'parallax': 'A — Parallax Dissolve',
  'crossfade': 'B — Image Crossfade (beat of black)',
  'curtain': 'C — Curtain Wipe',
  'zoom-dark': 'D — Zoom Into Black',
};

const DESCRIPTIONS: Record<TransitionStyle, string> = {
  'parallax': 'Hero image and text fade out at different speeds as you scroll, revealing darkness. New section emerges from black.',
  'crossfade': 'Hero fades to black, then Ron Kistler portrait fades in. A brief beat of pure darkness between the two images.',
  'curtain': 'Dark background rises up from the bottom, covering the hero like a curtain. Text appears once the hero is hidden.',
  'zoom-dark': 'Hero image zooms in and darkens as you scroll, like pushing into the frame until it goes black. New section emerges.',
};

export default function TransitionCompare() {
  const [style, setStyle] = useState<TransitionStyle>('parallax');
  const [key, setKey] = useState(0);

  const switchStyle = (s: TransitionStyle) => {
    setStyle(s);
    setKey(k => k + 1);
    window.scrollTo({ top: 0 });
  };

  return (
    <div key={key}>
      {/* Controls */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #333',
          padding: '10px 24px',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {(Object.keys(LABELS) as TransitionStyle[]).map((s) => (
          <button
            key={s}
            onClick={() => switchStyle(s)}
            style={{
              background: style === s ? '#E84B2B' : '#1A1F24',
              color: '#E8DCC8',
              border: '1px solid',
              borderColor: style === s ? '#E84B2B' : '#333',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {LABELS[s]}
          </button>
        ))}
      </div>

      {/* Description bar */}
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
        }}
      >
        <p style={{ color: '#8899AA', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
          <span style={{ color: '#D4943A' }}>{LABELS[style]}:</span> {DESCRIPTIONS[style]}
          <span style={{ color: '#667788', marginLeft: '16px' }}>Scroll down to see the transition.</span>
        </p>
      </div>

      {style === 'parallax' && <ParallaxDissolve />}
      {style === 'crossfade' && <ImageCrossfade />}
      {style === 'curtain' && <CurtainWipe />}
      {style === 'zoom-dark' && <ZoomDark />}
    </div>
  );
}

/* Shared: Section 2 content */
function Section2Content({ opacity }: { opacity: number }) {
  return (
    <div
      style={{
        opacity,
        transition: 'opacity 0.1s linear',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '0 24px',
        position: 'relative',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/ron-kistler-portrait.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          opacity: 0.15,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,10,8,0.6) 0%, rgba(12,10,8,0.4) 40%, rgba(12,10,8,0.8) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, mixBlendMode: 'overlay', pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8899AA', marginBottom: '24px' }}>
          1982
        </p>
        <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', color: '#E8DCC8', letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: '16px' }}>
          ALLENTOWN
        </h2>
        <p style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 28px)', color: '#E8DCC8', letterSpacing: '0.04em', marginBottom: '48px', opacity: 0.8 }}>
          The Bottom Fell Out
        </p>
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #E84B2B, #C4713B, #D4943A)', margin: '0 auto 48px', opacity: 0.6 }} />
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.75, color: '#E8DCC8', opacity: 0.85, marginBottom: '32px' }}>
          In 1982, the Lehigh Valley was the center of something most Americans were only reading about in the papers. Bethlehem Steel, the company that built the Golden Gate Bridge and armed two World Wars, was dying. The blast furnaces that kept an entire region employed were going silent one by one.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.75, color: '#E8DCC8', opacity: 0.85, marginBottom: '32px' }}>
          Factories shuttered. Storefronts boarded up. Mortgage rates climbed to 18%. Unemployment hit 16%.
        </p>
        <p style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 26px)', color: '#E8DCC8', lineHeight: 1.5, marginTop: '48px' }}>
          For the people of Allentown, the American Dream wasn&apos;t slipping away. It was already gone.
        </p>
      </div>
    </div>
  );
}

/* Shared hero section */
function HeroSection({ style: extraStyle }: { style?: React.CSSProperties }) {
  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#000',
        ...extraStyle,
      }}
    >
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
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', textAlign: 'center', padding: '0 24px', paddingBottom: 'clamp(120px, 18vh, 200px)' }}>
        <div style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(24px, 3.8vw, 33px)', color: '#E8DCC8', letterSpacing: '0.08em', marginBottom: '16px' }}>
          Three men. A billboard. And the American Dream.
        </div>
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #E84B2B, #C4713B, #D4943A)', opacity: 0.8, marginBottom: '20px' }} />
        <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(56px, 12vw, 160px)', color: '#E8DCC8', letterSpacing: '0.06em', lineHeight: 1, marginBottom: '20px' }}>ALLENTOWN</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 1.2vw, 14px)', fontWeight: 500, color: '#8899AA', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
          A feature film about the<br />greatest radio contest of all time
        </p>
      </div>
    </section>
  );
}

/* ===== A: PARALLAX DISSOLVE ===== */
function ParallaxDissolve() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [section2Visible, setSection2Visible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.6)));
      setScrollProgress(progress);
      setSection2Visible(progress > 0.7);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#000' }}>
      <div ref={heroRef} style={{ height: '160vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <section style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/images/hero-billboard.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center 30%',
                opacity: 1 - scrollProgress,
                transform: `translateY(${-scrollProgress * 80}px)`,
                transition: 'none',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,31,36,0.2) 0%, rgba(26,31,36,0.35) 40%, rgba(12,10,8,0.88) 85%, rgba(12,10,8,0.95) 100%)', mixBlendMode: 'multiply' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
            </div>
            <div
              style={{
                position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', textAlign: 'center', padding: '0 24px', paddingBottom: 'clamp(120px, 18vh, 200px)',
                opacity: 1 - scrollProgress * 1.5,
                transform: `translateY(${-scrollProgress * 120}px)`,
              }}
            >
              <div style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(24px, 3.8vw, 33px)', color: '#E8DCC8', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Three men. A billboard. And the American Dream.
              </div>
              <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #E84B2B, #C4713B, #D4943A)', opacity: 0.8, marginBottom: '20px' }} />
              <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(56px, 12vw, 160px)', color: '#E8DCC8', letterSpacing: '0.06em', lineHeight: 1, marginBottom: '20px' }}>ALLENTOWN</h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 1.2vw, 14px)', fontWeight: 500, color: '#8899AA', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                A feature film about the<br />greatest radio contest of all time
              </p>
            </div>
          </section>
        </div>
      </div>
      <section style={{ background: '#000', position: 'relative' }}>
        <Section2Content opacity={section2Visible ? 1 : 0} />
      </section>
      <div style={{ height: '50vh', background: '#000' }} />
    </div>
  );
}

/* ===== B: IMAGE CROSSFADE ===== */
function ImageCrossfade() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.6)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 0-0.4: hero fades out. 0.4-0.6: black beat. 0.6-1: new image fades in
  const heroOpacity = Math.max(0, 1 - scrollProgress * 2.5);
  const blackBeat = scrollProgress > 0.35 && scrollProgress < 0.65;
  const section2Opacity = Math.max(0, (scrollProgress - 0.6) * 2.5);

  return (
    <div style={{ background: '#000' }}>
      <div ref={triggerRef} style={{ height: '180vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          {/* Hero image */}
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(/images/hero-billboard.png)',
              backgroundSize: 'cover', backgroundPosition: 'center 30%',
              opacity: heroOpacity,
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,31,36,0.2) 0%, rgba(26,31,36,0.35) 40%, rgba(12,10,8,0.88) 85%, rgba(12,10,8,0.95) 100%)', mixBlendMode: 'multiply' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
          </div>
          {/* Ron portrait fading in */}
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(/images/ron-kistler-portrait.png)',
              backgroundSize: 'cover', backgroundPosition: 'center 20%',
              opacity: section2Opacity * 0.15,
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(12,10,8,0.6) 0%, rgba(12,10,8,0.4) 40%, rgba(12,10,8,0.8) 100%)' }} />
          </div>
          {/* Hero text */}
          <div
            style={{
              position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', textAlign: 'center', padding: '0 24px', paddingBottom: 'clamp(120px, 18vh, 200px)',
              opacity: heroOpacity,
            }}
          >
            <div style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(24px, 3.8vw, 33px)', color: '#E8DCC8', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Three men. A billboard. And the American Dream.
            </div>
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #E84B2B, #C4713B, #D4943A)', opacity: 0.8, marginBottom: '20px' }} />
            <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(56px, 12vw, 160px)', color: '#E8DCC8', letterSpacing: '0.06em', lineHeight: 1, marginBottom: '20px' }}>ALLENTOWN</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 1.2vw, 14px)', fontWeight: 500, color: '#8899AA', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              A feature film about the<br />greatest radio contest of all time
            </p>
          </div>
          {/* Section 2 text appearing */}
          {section2Opacity > 0 && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px', opacity: section2Opacity }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8899AA', marginBottom: '24px' }}>1982</p>
              <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', color: '#E8DCC8', letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: '16px' }}>ALLENTOWN</h2>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 28px)', color: '#E8DCC8', letterSpacing: '0.04em', opacity: 0.8 }}>The Bottom Fell Out</p>
            </div>
          )}
        </div>
      </div>
      <section style={{ background: '#000', position: 'relative' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 120px' }}>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #E84B2B, #C4713B, #D4943A)', margin: '0 auto 48px', opacity: 0.6 }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.75, color: '#E8DCC8', opacity: 0.85, marginBottom: '32px' }}>
            In 1982, the Lehigh Valley was the center of something most Americans were only reading about in the papers. Bethlehem Steel, the company that built the Golden Gate Bridge and armed two World Wars, was dying. The blast furnaces that kept an entire region employed were going silent one by one.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.75, color: '#E8DCC8', opacity: 0.85, marginBottom: '32px' }}>
            Factories shuttered. Storefronts boarded up. Mortgage rates climbed to 18%. Unemployment hit 16%.
          </p>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 26px)', color: '#E8DCC8', lineHeight: 1.5, marginTop: '48px' }}>
            For the people of Allentown, the American Dream wasn&apos;t slipping away. It was already gone.
          </p>
        </div>
      </section>
      <div style={{ height: '50vh', background: '#000' }} />
    </div>
  );
}

/* ===== C: CURTAIN WIPE ===== */
function CurtainWipe() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.5)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const curtainY = (1 - scrollProgress) * 100;
  const section2Opacity = Math.max(0, (scrollProgress - 0.7) * 3.3);

  return (
    <div style={{ background: '#000' }}>
      <div ref={triggerRef} style={{ height: '160vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          {/* Hero underneath */}
          <section style={{ position: 'absolute', inset: 0, background: '#000' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/hero-billboard.png)', backgroundSize: 'cover', backgroundPosition: 'center 30%' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,31,36,0.2) 0%, rgba(26,31,36,0.35) 40%, rgba(12,10,8,0.88) 85%, rgba(12,10,8,0.95) 100%)', mixBlendMode: 'multiply' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
            </div>
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', textAlign: 'center', padding: '0 24px', paddingBottom: 'clamp(120px, 18vh, 200px)' }}>
              <div style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(24px, 3.8vw, 33px)', color: '#E8DCC8', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Three men. A billboard. And the American Dream.
              </div>
              <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #E84B2B, #C4713B, #D4943A)', opacity: 0.8, marginBottom: '20px' }} />
              <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(56px, 12vw, 160px)', color: '#E8DCC8', letterSpacing: '0.06em', lineHeight: 1, marginBottom: '20px' }}>ALLENTOWN</h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 1.2vw, 14px)', fontWeight: 500, color: '#8899AA', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                A feature film about the<br />greatest radio contest of all time
              </p>
            </div>
          </section>
          {/* Curtain */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#000',
              transform: `translateY(${curtainY}%)`,
              zIndex: 30,
            }}
          >
            {/* Section 2 content inside curtain */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '0 24px', opacity: section2Opacity }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8899AA', marginBottom: '24px' }}>1982</p>
              <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', color: '#E8DCC8', letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: '16px' }}>ALLENTOWN</h2>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 28px)', color: '#E8DCC8', letterSpacing: '0.04em', opacity: 0.8 }}>The Bottom Fell Out</p>
            </div>
          </div>
        </div>
      </div>
      <section style={{ background: '#000', position: 'relative' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 120px' }}>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #E84B2B, #C4713B, #D4943A)', margin: '0 auto 48px', opacity: 0.6 }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.75, color: '#E8DCC8', opacity: 0.85, marginBottom: '32px' }}>
            In 1982, the Lehigh Valley was the center of something most Americans were only reading about in the papers. Bethlehem Steel, the company that built the Golden Gate Bridge and armed two World Wars, was dying.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.75, color: '#E8DCC8', opacity: 0.85, marginBottom: '32px' }}>
            Factories shuttered. Storefronts boarded up. Mortgage rates climbed to 18%. Unemployment hit 16%.
          </p>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 26px)', color: '#E8DCC8', lineHeight: 1.5, marginTop: '48px' }}>
            For the people of Allentown, the American Dream wasn&apos;t slipping away. It was already gone.
          </p>
        </div>
      </section>
      <div style={{ height: '50vh', background: '#000' }} />
    </div>
  );
}

/* ===== D: ZOOM INTO BLACK ===== */
function ZoomDark() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height * 0.5)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const imgScale = 1 + scrollProgress * 0.4;
  const imgBrightness = Math.max(0, 1 - scrollProgress * 1.8);
  const textOpacity = Math.max(0, 1 - scrollProgress * 2);
  const section2Opacity = Math.max(0, (scrollProgress - 0.7) * 3.3);

  return (
    <div style={{ background: '#000' }}>
      <div ref={triggerRef} style={{ height: '160vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          {/* Hero image zooming and darkening */}
          <div
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'url(/images/hero-billboard.png)',
              backgroundSize: 'cover', backgroundPosition: 'center 30%',
              transform: `scale(${imgScale})`,
              filter: `brightness(${imgBrightness})`,
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,31,36,0.2) 0%, rgba(26,31,36,0.35) 40%, rgba(12,10,8,0.88) 85%, rgba(12,10,8,0.95) 100%)', mixBlendMode: 'multiply' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />
          </div>
          {/* Hero text */}
          <div
            style={{
              position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%', textAlign: 'center', padding: '0 24px', paddingBottom: 'clamp(120px, 18vh, 200px)',
              opacity: textOpacity,
            }}
          >
            <div style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(24px, 3.8vw, 33px)', color: '#E8DCC8', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Three men. A billboard. And the American Dream.
            </div>
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #E84B2B, #C4713B, #D4943A)', opacity: 0.8, marginBottom: '20px' }} />
            <h1 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(56px, 12vw, 160px)', color: '#E8DCC8', letterSpacing: '0.06em', lineHeight: 1, marginBottom: '20px' }}>ALLENTOWN</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(11px, 1.2vw, 14px)', fontWeight: 500, color: '#8899AA', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              A feature film about the<br />greatest radio contest of all time
            </p>
          </div>
          {/* Section 2 emerging */}
          {section2Opacity > 0 && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px', opacity: section2Opacity }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8899AA', marginBottom: '24px' }}>1982</p>
              <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(40px, 8vw, 80px)', color: '#E8DCC8', letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: '16px' }}>ALLENTOWN</h2>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 28px)', color: '#E8DCC8', letterSpacing: '0.04em', opacity: 0.8 }}>The Bottom Fell Out</p>
            </div>
          )}
        </div>
      </div>
      <section style={{ background: '#000', position: 'relative' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px 120px' }}>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #E84B2B, #C4713B, #D4943A)', margin: '0 auto 48px', opacity: 0.6 }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.75, color: '#E8DCC8', opacity: 0.85, marginBottom: '32px' }}>
            In 1982, the Lehigh Valley was the center of something most Americans were only reading about in the papers. Bethlehem Steel, the company that built the Golden Gate Bridge and armed two World Wars, was dying. The blast furnaces that kept an entire region employed were going silent one by one.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(16px, 1.8vw, 18px)', lineHeight: 1.75, color: '#E8DCC8', opacity: 0.85, marginBottom: '32px' }}>
            Factories shuttered. Storefronts boarded up. Mortgage rates climbed to 18%. Unemployment hit 16%.
          </p>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 26px)', color: '#E8DCC8', lineHeight: 1.5, marginTop: '48px' }}>
            For the people of Allentown, the American Dream wasn&apos;t slipping away. It was already gone.
          </p>
        </div>
      </section>
      <div style={{ height: '50vh', background: '#000' }} />
    </div>
  );
}
