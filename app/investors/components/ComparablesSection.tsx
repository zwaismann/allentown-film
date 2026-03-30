'use client';

import { useState, useRef, useEffect } from 'react';
import { ASPIRATIONAL_COMPS, DIRECT_COMPS } from '../data';

/* ─── Utility: section fade-in hook ─── */

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Styles ─── */

const S = {
  sectionHeading: {
    fontFamily: "'Anton', sans-serif",
    fontSize: 'clamp(28px, 4vw, 44px)',
    letterSpacing: '0.04em',
    color: '#D4943A',
    marginBottom: '32px',
    textTransform: 'uppercase' as const,
  },
  body: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'clamp(15px, 1.5vw, 17px)',
    color: '#E8DCC8',
    lineHeight: 1.8,
    opacity: 0.9,
  },
  bold: {
    fontWeight: 700 as const,
    color: '#E8DCC8',
  },
  muted: {
    color: '#8899AA',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'clamp(12px, 1.2vw, 14px)',
  },
  section: (visible: boolean, delay = 0): React.CSSProperties => ({
    maxWidth: '960px',
    width: '100%',
    margin: '0 auto',
    padding: 'clamp(60px, 10vh, 120px) 24px',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
  }),
};

/* ─── Shared table column config ─── */

type CompFilm = { title: string; year: number; budget: string; domestic: string; worldwide: string; roi: string };

const COL_HEADERS = ['Film', 'Year', 'Budget', 'Domestic', 'Worldwide', 'ROI'];

function CompsTable({ films }: { films: CompFilm[] }) {
  return (
    <div style={{
      padding: '0',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '6px',
      overflow: 'hidden',
    }}>
      {/* Header row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
        padding: '12px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        {COL_HEADERS.map((h) => (
          <span key={h} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: '#667788',
          }}>
            {h}
          </span>
        ))}
      </div>

      {/* Data rows */}
      {films.map((film, i) => (
        <div key={film.title} style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
          padding: '14px 20px',
          borderBottom: i < films.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(14px, 1.6vw, 17px)',
            color: '#E8DCC8',
            letterSpacing: '0.03em',
          }}>
            {film.title}
          </span>
          <span style={{ ...S.muted, fontSize: '13px' }}>{film.year}</span>
          <span style={{ ...S.muted, fontSize: '13px' }}>{film.budget}</span>
          <span style={{ ...S.muted, fontSize: '13px' }}>{film.domestic}</span>
          <span style={{ ...S.muted, fontSize: '13px' }}>{film.worldwide}</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 700,
            color: '#D4943A',
          }}>
            {film.roi}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── ComparablesSection ─── */

export default function ComparablesSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section ref={ref} style={S.section(visible)}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Comparable Films</p>

      {/* Genre Ceiling */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
          color: '#8899AA',
          marginBottom: '16px',
        }}>
          Genre Ceiling
        </p>
        <CompsTable films={ASPIRATIONAL_COMPS} />
      </div>

      {/* Budget-Range Comparables */}
      <div>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
          color: '#8899AA',
          marginBottom: '16px',
        }}>
          Budget-Range Comparables
        </p>
        <CompsTable films={DIRECT_COMPS} />
      </div>
    </section>
  );
}
