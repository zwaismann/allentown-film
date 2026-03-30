'use client';

import { useRef, useEffect, useState } from 'react';
import { SENSITIVITY_MATRIX } from '../data';

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

/* ─── SensitivitySection ─── */

export default function SensitivitySection() {
  const { ref, visible } = useFadeIn();

  return (
    <section ref={ref} style={S.section(visible)}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Sensitivity Analysis</p>

      {/* Break-Even Callout Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '40px',
      }}>
        <div style={{
          padding: '28px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '6px',
          textAlign: 'center',
        }}>
          <p style={{ ...S.muted, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Break-Even (100% Principal)
          </p>
          <p style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(32px, 4vw, 44px)',
            color: '#D4943A',
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}>
            ~$2.1M
          </p>
          <p style={{ ...S.muted, fontSize: '12px', marginTop: '8px' }}>gross revenue</p>
        </div>

        <div style={{
          padding: '28px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '6px',
          textAlign: 'center',
        }}>
          <p style={{ ...S.muted, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
            120% Recoupment Target
          </p>
          <p style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(32px, 4vw, 44px)',
            color: '#D4943A',
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}>
            ~$3.3M
          </p>
          <p style={{ ...S.muted, fontSize: '12px', marginTop: '8px' }}>gross revenue</p>
        </div>
      </div>

      {/* Sensitivity Matrix Table */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px',
        overflow: 'hidden',
        marginBottom: '32px',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr 1.2fr 0.8fr 1.2fr',
          padding: '12px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.02)',
        }}>
          {['Gross Revenue', 'Net + Tax Credit', 'Investor Return', 'ROI', 'Note'].map((h) => (
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
        {SENSITIVITY_MATRIX.map((row, i) => {
          const isModerate = row.note === 'Moderate scenario';
          return (
            <div
              key={row.grossRevenue}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.3fr 1.2fr 0.8fr 1.2fr',
                padding: '13px 20px',
                borderBottom: i < SENSITIVITY_MATRIX.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                borderLeft: isModerate ? '3px solid rgba(212,148,58,0.55)' : '3px solid transparent',
                background: isModerate ? 'rgba(212,148,58,0.05)' : 'transparent',
                alignItems: 'center',
              }}
            >
              <span style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(13px, 1.4vw, 16px)',
                color: '#E8DCC8',
                letterSpacing: '0.03em',
              }}>
                {row.grossRevenue}
              </span>
              <span style={{ ...S.muted, fontSize: '13px' }}>{row.netPlusTaxCredit}</span>
              <span style={{ ...S.muted, fontSize: '13px' }}>{row.investorReturn}</span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 700,
                color: '#D4943A',
              }}>
                {row.investorROI}
              </span>
              <span style={{ ...S.muted, fontSize: '12px' }}>{row.note}</span>
            </div>
          );
        })}
      </div>

      {/* IRR Estimates */}
      <div style={{
        padding: '24px 28px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px',
        marginBottom: '16px',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#8899AA',
          marginBottom: '16px',
        }}>
          IRR Estimates (30-month horizon)
        </p>

        {[
          { label: 'Conservative', irr: '~-1%', note: 'Near principal recovery' },
          { label: 'Moderate', irr: '~25-30%', note: 'Full recoupment + profit share' },
          { label: 'Optimistic', irr: '~60-70%', note: 'Breakout scenario' },
        ].map((item, i, arr) => (
          <div key={item.label} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '9px 0',
            borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              color: '#8899AA',
              width: '100px',
              flexShrink: 0,
            }}>
              {item.label}
            </span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              fontWeight: 700,
              color: '#D4943A',
              width: '90px',
              flexShrink: 0,
            }}>
              {item.irr}
            </span>
            <span style={{ ...S.muted, fontSize: '13px' }}>{item.note}</span>
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '12px',
        color: '#556677',
        fontStyle: 'italic',
      }}>
        Based on estimated 30-month average return timeline. IRR calculations assume single capital deployment at close.
      </p>
    </section>
  );
}
