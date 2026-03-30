'use client';

import { useRef, useEffect, useState } from 'react';
import { INVESTMENT_TERMS } from '../data';

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

/* ─── Term rows ─── */

const TERM_ROWS = [
  { label: 'Entity', value: INVESTMENT_TERMS.entity },
  { label: 'Structure', value: INVESTMENT_TERMS.structure },
  { label: 'Preferred Return', value: `${INVESTMENT_TERMS.preferredReturn} recoupment before profit split` },
  { label: 'Profit Split', value: INVESTMENT_TERMS.profitSplit },
  { label: 'Tax Credit Treatment', value: INVESTMENT_TERMS.taxCreditTreatment },
  { label: 'Revenue Timeline', value: INVESTMENT_TERMS.revenueTimeline },
];

/* ─── InvestmentTermsSection ─── */

export default function InvestmentTermsSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section ref={ref} style={S.section(visible)}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Investment Terms</p>

      {/* Definition-list card */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px',
        overflow: 'hidden',
        marginBottom: '24px',
      }}>
        {TERM_ROWS.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '24px',
              padding: '18px 24px',
              borderBottom: i < TERM_ROWS.length - 1
                ? '1px solid rgba(255,255,255,0.06)'
                : 'none',
            }}
          >
            {/* Label */}
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(11px, 1.1vw, 13px)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: '#8899AA',
              width: '160px',
              flexShrink: 0,
              paddingTop: '2px',
              lineHeight: 1.5,
            }}>
              {row.label}
            </span>

            {/* Value */}
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(13px, 1.3vw, 15px)',
              color: '#E8DCC8',
              lineHeight: 1.6,
              flex: 1,
            }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Closing disclaimer */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 'clamp(11px, 1.1vw, 13px)',
        color: '#556677',
        lineHeight: 1.7,
        fontStyle: 'italic',
      }}>
        All terms subject to finalization in the LLC Operating Agreement drafted by entertainment counsel.
        This business plan is a marketing document, not a securities offering. A formal PPM and Subscription
        Agreement will be prepared by counsel.
      </p>
    </section>
  );
}
