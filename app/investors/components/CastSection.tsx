'use client';

import { useState, useRef, useEffect } from 'react';
import { CAST } from '../data';

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

/* ─── CastSection ─── */

export default function CastSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section ref={ref} style={S.section(visible)}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Cast</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {CAST.map((member) => {
          const isDane = member.name === 'Dane DeHaan';
          const displayName = member.name === 'TBD' ? 'To Be Announced' : member.name;
          const isAttached = member.status === 'Attached';

          return (
            <div key={member.role} style={{
              padding: isDane ? '32px' : '24px',
              background: isDane ? 'rgba(212,148,58,0.05)' : 'rgba(255,255,255,0.03)',
              border: isDane ? '1px solid rgba(212,148,58,0.25)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {/* Header: image + name block */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  flexShrink: 0,
                  backgroundImage: `url(${member.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  border: isDane ? '2px solid rgba(212,148,58,0.6)' : '2px solid rgba(212,148,58,0.3)',
                }} />
                <div>
                  {/* Status badge */}
                  <span style={{
                    display: 'inline-block',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase' as const,
                    color: isAttached ? '#D4943A' : '#8899AA',
                    border: isAttached ? '1px solid rgba(212,148,58,0.4)' : '1px solid rgba(136,153,170,0.3)',
                    borderRadius: '3px',
                    padding: '2px 8px',
                    marginBottom: '6px',
                  }}>
                    {member.status}
                  </span>
                  {/* Name */}
                  <p style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: isDane ? 'clamp(20px, 2.2vw, 26px)' : 'clamp(18px, 2vw, 22px)',
                    color: '#E8DCC8',
                    letterSpacing: '0.04em',
                    lineHeight: 1.1,
                    marginBottom: '2px',
                  }}>
                    {displayName}
                  </p>
                  {/* Role */}
                  <p style={{ ...S.muted, fontSize: '13px' }}>
                    as <span style={{ color: '#E8DCC8', fontStyle: 'italic' }}>{member.role}</span>
                  </p>
                </div>
              </div>

              {/* Credits */}
              {member.credits && (
                <p style={{
                  ...S.muted,
                  fontSize: '12px',
                  lineHeight: 1.6,
                  paddingTop: '4px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{ color: '#667788', letterSpacing: '0.1em', textTransform: 'uppercase' as const, fontSize: '10px', fontWeight: 600 }}>
                    Credits
                  </span>
                  <br />
                  {member.credits}
                </p>
              )}

              {/* Value */}
              {member.value && (
                <p style={{ ...S.body, fontSize: '13px', lineHeight: 1.6, opacity: 0.85 }}>
                  {member.value}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
