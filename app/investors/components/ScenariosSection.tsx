'use client';

import { useState, useRef, useEffect } from 'react';
import { SCENARIOS } from '../data';

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

type ScenarioKey = 'conservative' | 'moderate' | 'optimistic';

/* ─── Waterfall Row ─── */

function WaterfallRow({
  label,
  amount,
  variant = 'default',
  large = false,
}: {
  label: string;
  amount: string;
  variant?: 'default' | 'deduction' | 'addition' | 'subtotal' | 'total' | 'header';
  large?: boolean;
}) {
  const colorMap: Record<string, string> = {
    default: '#E8DCC8',
    deduction: '#CC8888',
    addition: '#88BB88',
    subtotal: '#C8BB9A',
    total: '#D4943A',
    header: '#D4943A',
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: variant === 'subtotal' || variant === 'total' ? '10px 0' : '7px 0',
      borderTop: variant === 'subtotal' || variant === 'total' ? '1px solid rgba(255,255,255,0.08)' : 'none',
      borderBottom: variant === 'total' ? '1px solid rgba(255,255,255,0.08)' : 'none',
    }}>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: large ? 'clamp(15px, 1.6vw, 18px)' : '14px',
        fontWeight: variant === 'subtotal' || variant === 'total' || variant === 'header' ? 700 : 400,
        color: colorMap[variant],
        paddingLeft: variant === 'deduction' || variant === 'addition' ? '16px' : '0',
        letterSpacing: variant === 'header' ? '0.04em' : '0',
      }}>
        {variant === 'deduction' ? '- ' : variant === 'addition' ? '+ ' : ''}{label}
      </span>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: large ? 'clamp(16px, 1.8vw, 20px)' : '14px',
        fontWeight: variant === 'subtotal' || variant === 'total' ? 700 : 500,
        color: colorMap[variant],
      }}>
        {amount}
      </span>
    </div>
  );
}

/* ─── ScenariosSection ─── */

export default function ScenariosSection() {
  const { ref, visible } = useFadeIn();
  const [active, setActive] = useState<ScenarioKey>('moderate');

  const scenario = SCENARIOS[active];
  const wf = scenario.waterfall;
  const isConservative = active === 'conservative';

  return (
    <section ref={ref} style={S.section(visible)}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Return Scenarios</p>

      {/* Tab buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '36px',
        flexWrap: 'wrap',
      }}>
        {(['conservative', 'moderate', 'optimistic'] as ScenarioKey[]).map((key) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '10px 22px',
                background: isActive ? '#D4943A' : 'transparent',
                border: isActive ? '1px solid #D4943A' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: '4px',
                color: isActive ? '#0D0F12' : '#8899AA',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {SCENARIOS[key].label}
            </button>
          );
        })}
      </div>

      {/* Premise */}
      <p style={{
        fontFamily: "'Crimson Pro', serif",
        fontStyle: 'italic',
        fontSize: 'clamp(16px, 1.8vw, 20px)',
        color: '#E8DCC8',
        lineHeight: 1.7,
        opacity: 0.85,
        marginBottom: '32px',
      }}>
        {scenario.premise}
      </p>

      {/* Revenue Sources */}
      <div style={{
        padding: '24px 28px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px',
        marginBottom: '24px',
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
          Revenue Sources
        </p>
        {scenario.revenue.map((item, i) => (
          <div key={item.source} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: i < scenario.revenue.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
          }}>
            <span style={{ ...S.body, fontSize: '14px' }}>{item.source}</span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
              color: '#E8DCC8',
            }}>
              {item.amount}
            </span>
          </div>
        ))}
        {/* Total */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0 0',
          marginTop: '4px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            fontWeight: 700,
            color: '#D4943A',
          }}>
            Total Gross Revenue
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '16px',
            fontWeight: 700,
            color: '#D4943A',
          }}>
            {scenario.totalGross}
          </span>
        </div>
      </div>

      {/* Waterfall Breakdown */}
      <div style={{
        padding: '24px 28px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px',
        marginBottom: '24px',
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
          Revenue Waterfall
        </p>

        <WaterfallRow label="Gross Revenue" amount={scenario.totalGross} variant="header" />
        <WaterfallRow label="Exhibitor / Platform Retention" amount={wf.exhibitorShare} variant="deduction" />
        <WaterfallRow label="Distributor Gross" amount={wf.distributorGross} variant="subtotal" />
        <WaterfallRow label="Distribution Fee (30%)" amount={wf.distributionFee} variant="deduction" />
        <WaterfallRow label="P&A / Marketing" amount={wf.pAndA} variant="deduction" />
        <WaterfallRow label="Sales Agent Commission (12%)" amount={wf.salesAgent} variant="deduction" />
        <WaterfallRow label="CAM Fees (1.5%)" amount={wf.camFees} variant="deduction" />
        <WaterfallRow label="Net to Production" amount={wf.netToProduction} variant="subtotal" />
        <WaterfallRow label="PA Film Tax Credit" amount={wf.taxCredit} variant="addition" />
        <WaterfallRow label="Available for Recoupment" amount={wf.availableForRecoupment} variant="subtotal" />

        <div style={{ height: '8px' }} />

        <WaterfallRow label="Investor Recoupment Needed (120%)" amount={wf.recoupmentNeeded} variant="default" />

        {isConservative ? (
          <>
            <WaterfallRow
              label={'Shortfall vs. 120% target'}
              amount={'-' + (wf as typeof SCENARIOS.conservative.waterfall).shortfall}
              variant="deduction"
            />
            <div style={{ height: '12px' }} />
            <WaterfallRow
              label="Investor Return"
              amount={(wf as typeof SCENARIOS.conservative.waterfall).investorReturn}
              variant="total"
              large
            />
          </>
        ) : (
          <>
            <WaterfallRow
              label="Deferred Compensation"
              amount={(wf as typeof SCENARIOS.moderate.waterfall).deferredComp!}
              variant="deduction"
            />
            <WaterfallRow
              label="Net Profits"
              amount={(wf as typeof SCENARIOS.moderate.waterfall).netProfits!}
              variant="subtotal"
            />
            <WaterfallRow
              label="Investor Profit Share (50%)"
              amount={(wf as typeof SCENARIOS.moderate.waterfall).investorProfitShare!}
              variant="addition"
            />
            <WaterfallRow
              label="Producer Profit Share (50%)"
              amount={(wf as typeof SCENARIOS.moderate.waterfall).producerProfitShare!}
              variant="default"
            />
            <div style={{ height: '12px' }} />
            <WaterfallRow
              label="Total Investor Return"
              amount={(wf as typeof SCENARIOS.moderate.waterfall).totalInvestorReturn!}
              variant="total"
              large
            />
            <WaterfallRow
              label="Investor ROI"
              amount={(wf as typeof SCENARIOS.moderate.waterfall).investorROI!}
              variant="total"
              large
            />
          </>
        )}
      </div>

      {/* Outcome */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 'clamp(14px, 1.4vw, 16px)',
        fontWeight: 700,
        color: '#E8DCC8',
        letterSpacing: '0.02em',
        opacity: 0.9,
      }}>
        {scenario.outcome}
      </p>
    </section>
  );
}
