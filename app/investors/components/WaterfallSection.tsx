'use client';

import { useRef, useEffect, useState } from 'react';
import { WATERFALL_TIERS } from '../data';

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

/* ─── WaterfallSection ─── */

export default function WaterfallSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section ref={ref} style={S.section(visible)}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Revenue Waterfall</p>

      {/* Vertical flow diagram */}
      <div style={{
        position: 'relative',
        paddingLeft: '32px',
        borderLeft: '2px solid rgba(212,148,58,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        marginBottom: '40px',
      }}>
        {WATERFALL_TIERS.map((item, i) => {
          const isInvestorTier = item.tier >= 7;
          return (
            <div
              key={item.tier}
              style={{
                position: 'relative',
                marginBottom: i < WATERFALL_TIERS.length - 1 ? '16px' : '0',
              }}
            >
              {/* Timeline dot */}
              <div style={{
                position: 'absolute',
                left: '-39px',
                top: '10px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: isInvestorTier ? '#D4943A' : 'rgba(212,148,58,0.35)',
                boxShadow: isInvestorTier ? '0 0 8px rgba(212,148,58,0.5)' : 'none',
              }} />

              {/* Tier card */}
              <div style={{
                padding: '16px 20px',
                background: isInvestorTier
                  ? 'rgba(212,148,58,0.05)'
                  : 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderLeft: isInvestorTier
                  ? '3px solid rgba(212,148,58,0.55)'
                  : '3px solid transparent',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                {/* Tier number circle */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isInvestorTier ? 'rgba(212,148,58,0.2)' : 'rgba(255,255,255,0.06)',
                  border: isInvestorTier ? '1px solid rgba(212,148,58,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}>
                    {item.tier}
                  </span>
                </div>

                {/* Label + description */}
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 'clamp(15px, 1.6vw, 18px)',
                    letterSpacing: '0.04em',
                    color: isInvestorTier ? '#E8DCC8' : '#C9BBA8',
                    marginBottom: '4px',
                    lineHeight: 1.2,
                  }}>
                    {item.label}
                  </p>
                  <p style={{ ...S.muted, fontSize: '13px', lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </div>

                {/* Investor territory badge */}
                {isInvestorTier && (
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase' as const,
                    color: '#D4943A',
                    opacity: 0.7,
                    flexShrink: 0,
                    display: item.tier >= 8 ? 'inline' : 'none',
                  }}>
                    Investor
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Callout note */}
      <div style={{
        padding: '24px 28px',
        background: 'rgba(212,148,58,0.04)',
        border: '1px solid rgba(212,148,58,0.2)',
        borderRadius: '6px',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
          color: '#D4943A',
          marginBottom: '12px',
          opacity: 0.85,
        }}>
          Key Investor Protections
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(13px, 1.3vw, 15px)',
          color: '#C9BBA8',
          lineHeight: 1.7,
        }}>
          First-position recoupment before producers. 120% preferred return before profit split.
          PA tax credit accelerates recoupment. CAM provides independent revenue tracking.
        </p>
      </div>
    </section>
  );
}
