'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ASPIRATIONAL_COMPS, BUDGET_BREAKDOWN, DISTRIBUTION_PHASES,
  TEAM_MEMBERS, DOCUMENTS, CONTACTS, ENTITY_NAME,
  BUDGET_SHORTHAND, EQUITY_RAISE, TAX_CREDIT, PRODUCTION_PHASES,
} from './data';

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

/* ─── Page ─── */

export default function InvestorsPage() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [gateVisible, setGateVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setGateVisible(true));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Allentown2026') {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  /* ─── Password Gate ─── */
  if (!unlocked) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}>
        {/* Back link */}
        <Link href="/" style={{
          position: 'fixed', top: 'clamp(20px, 3vw, 32px)', left: 'clamp(20px, 3vw, 32px)',
          fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: '#8899AA', textDecoration: 'none',
          opacity: gateVisible ? 1 : 0, transition: 'opacity 1s ease-out',
        }}>
          &larr; Back
        </Link>

        <div style={{
          textAlign: 'center', maxWidth: '480px',
          opacity: gateVisible ? 1 : 0, transform: gateVisible ? 'translateY(0)' : 'translateY(15px)',
          transition: 'opacity 1s ease-out 0.2s, transform 1s ease-out 0.2s',
        }}>
          <p style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(32px, 5vw, 48px)',
            letterSpacing: '0.06em',
            color: '#E8DCC8',
            marginBottom: '8px',
          }}>
            ALLENTOWN
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4943A',
            marginBottom: '32px',
          }}>
            Executive Summary
          </p>

          <div className="tri-bar" style={{ width: '60px', margin: '0 auto 32px', opacity: 0.8 }} />

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(14px, 1.4vw, 16px)',
            color: '#E8DCC8', lineHeight: 1.7, marginBottom: '32px', opacity: 0.8,
          }}>
            This section contains confidential materials for potential investors and partners.
            Please enter the access code to continue.
          </p>

          <form onSubmit={handleSubmit} style={{
            display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center',
          }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Access code"
              autoFocus
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
                letterSpacing: '0.08em', padding: '12px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: error ? '1px solid #E84B2B' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: '4px', color: '#E8DCC8', outline: 'none', width: '220px',
                transition: 'border-color 0.3s ease',
              }}
            />
            <button type="submit" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '13px 24px', background: 'transparent',
              border: '1px solid rgba(212,148,58,0.5)', borderRadius: '4px',
              color: '#D4943A', cursor: 'pointer', transition: 'all 0.3s ease',
            }}>
              Enter
            </button>
          </form>

          {error && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
              color: '#E84B2B', marginTop: '12px', letterSpacing: '0.05em',
            }}>
              Incorrect access code
            </p>
          )}
        </div>
      </div>
    );
  }

  /* ─── Unlocked Content ─── */
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Fixed back link */}
      <Link href="/" style={{
        position: 'fixed', top: 'clamp(20px, 3vw, 32px)', left: 'clamp(20px, 3vw, 32px)',
        fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: '#8899AA', textDecoration: 'none', zIndex: 50,
      }}>
        &larr; Back
      </Link>

      {/* ──── HERO ──── */}
      <HeroSection />

      {/* ──── LOGLINE ──── */}
      <LoglineSection />

      {/* ──── EXECUTIVE SUMMARY ──── */}
      <ExecutiveSummarySection />

      {/* ──── MARKET ANALYSIS ──── */}
      <MarketAnalysisSection />

      {/* ──── FINANCIAL PLAN ──── */}
      <FinancialPlanSection />

      {/* ──── PRODUCTION PLAN ──── */}
      <ProductionPlanSection />

      {/* ──── DISTRIBUTION STRATEGY ──── */}
      <DistributionSection />

      {/* ──── THE TEAM ──── */}
      <TeamSection />

      {/* ──── MORE INFORMATION / DOWNLOADS ──── */}
      <DownloadsSection />

      <style>{`
        @keyframes investorFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Section Components ─── */

function HeroSection() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { requestAnimationFrame(() => setVisible(true)); }, []);

  return (
    <section style={{
      position: 'relative',
      height: '70vh',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/images/billboard-59-days.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        filter: 'brightness(0.4) saturate(0.7)',
        transform: visible ? 'scale(1)' : 'scale(1.05)',
        transition: 'transform 2s ease-out',
      }} />
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(13,15,18,0.3) 0%, rgba(13,15,18,0.6) 60%, var(--color-bg) 100%)',
      }} />
      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center', padding: '0 24px 60px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1.2s ease-out 0.3s, transform 1.2s ease-out 0.3s',
      }}>
        <p style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(48px, 8vw, 96px)',
          letterSpacing: '0.06em',
          color: '#E8DCC8',
          lineHeight: 0.95,
          marginBottom: '16px',
        }}>
          ALLENTOWN
        </p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(12px, 1.4vw, 16px)',
          fontWeight: 400,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#8899AA',
          marginBottom: '24px',
        }}>
          Executive Summary
        </p>
        <div className="tri-bar" style={{ width: '80px', margin: '0 auto', opacity: 0.8 }} />
      </div>
    </section>
  );
}

function LoglineSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} style={S.section(visible)}>
      <p style={{
        ...S.sectionHeading,
        fontSize: 'clamp(22px, 3vw, 32px)',
        color: '#D4943A',
        marginBottom: '24px',
      }}>
        Logline
      </p>
      <p style={{
        fontFamily: "'Crimson Pro', serif",
        fontStyle: 'italic',
        fontSize: 'clamp(18px, 2.2vw, 24px)',
        color: '#E8DCC8',
        lineHeight: 1.7,
        opacity: 0.9,
      }}>
        In 1982, a radio competition in recession-hit <strong style={S.bold}>Allentown</strong>, offered
        desperate locals the chance to <strong style={S.bold}>win a home by living on a billboard</strong>.
        Braving the worst winter in forty years, a media circus and police entrapment, three blue collar
        men would spend <strong style={{ ...S.bold, color: '#D4943A' }}>261 days on top of that billboard</strong> fighting
        for the <strong style={S.bold}>American Dream</strong>.
      </p>
    </section>
  );
}

function ExecutiveSummarySection() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} style={S.section(visible)}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Executive Summary</p>

      <p style={{ ...S.body, marginBottom: '24px' }}>
        <strong style={S.bold}>ALLENTOWN</strong>, a gritty indie drama / comedy inspired by the true story of the
        Allentown Billboard Sitters - three out of work, blue collar guys who entered a radio contest and lived
        on a billboard for 261 days competing for a mobile home.
      </p>

      <p style={{ ...S.body, marginBottom: '32px' }}>
        With a <strong style={S.bold}>$2.3M budget</strong>, we seek equity, Pennsylvania's 25-30% Film Tax Credit (~$600K),
        and grants (e.g., Greater Philadelphia Film Office). Projected revenue of{' '}
        <strong style={{ ...S.bold, color: '#D4943A' }}>$5.75M (150% ROI)</strong> spans festivals (Sundance),
        limited theatrical, streaming (Netflix, Amazon), and international sales.
      </p>

      {/* Comparable films */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: '#8899AA', marginBottom: '16px',
      }}>
        Comparable Films
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {ASPIRATIONAL_COMPS.map((film) => (
          <div key={film.title} style={{
            padding: '24px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '6px',
          }}>
            <p style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              color: '#E8DCC8', letterSpacing: '0.04em', marginBottom: '8px',
            }}>
              {film.title}
            </p>
            <p style={{ ...S.muted, marginBottom: '4px' }}>
              Budget: <span style={{ color: '#E8DCC8' }}>{film.budget}</span>
            </p>
            <p style={{ ...S.muted, marginBottom: '4px' }}>
              Worldwide: <span style={{ color: '#E8DCC8' }}>{film.worldwide}</span>
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
              fontWeight: 600, color: '#D4943A',
            }}>
              {film.roi} ROI
            </p>
          </div>
        ))}
      </div>

      <p style={S.body}>
        Led by producer <strong style={S.bold}>Gary Foster</strong> (<em>Sleepless in Seattle</em>), the team
        ensures execution and global appeal. Pennsylvania's incentives and the lean $2.3M budget mitigate risk,
        positioning Allentown as a profitable, uplifting investment.
      </p>
    </section>
  );
}

function MarketAnalysisSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} style={{
      ...S.section(visible),
      position: 'relative',
    }}>
      {/* Subtle side image */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%',
        width: '300px', height: '400px',
        backgroundImage: 'url(/images/hero-billboard.webp)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.06, borderRadius: '8px',
        pointerEvents: 'none',
      }} />

      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Market Analysis</p>

      <p style={{ ...S.body, marginBottom: '24px' }}>
        <strong style={S.bold}>ALLENTOWN</strong> taps into the thriving indie dramedy market. Streaming
        platforms like Netflix and Amazon, acquiring Sundance titles for $5-15M, crave gritty, true-story
        narratives like Allentown's radio contest saga.
      </p>

      <p style={{ ...S.body, marginBottom: '24px' }}>
        The film targets <strong style={S.bold}>Millennials/Gen X</strong> (25-45, 60% of audience), drawn to its
        housing crisis relevance (49% Millennial homeownership vs. 70% Boomers), and{' '}
        <strong style={S.bold}>Boomers</strong> (55+, 30%), nostalgic for 1980s Allentown and Billy Joel's anthem.
      </p>

      <p style={S.body}>
        Festival circuits (Sundance, TIFF) offer awards buzz and acquisition deals, while international
        markets embrace the global media frenzy hook, ensuring broad appeal and high revenue potential.
      </p>
    </section>
  );
}

function FinancialPlanSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} style={S.section(visible)}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Financial Plan</p>

      <p style={{ ...S.body, marginBottom: '32px' }}>
        <strong style={S.bold}>{ENTITY_NAME}</strong> is budgeted at{' '}
        <strong style={{ ...S.bold, color: '#D4943A' }}>{BUDGET_SHORTHAND}</strong>, leveraging Pennsylvania's low-cost
        locations and 25-30% Film Tax Credit (~{TAX_CREDIT}). Equity raise of{' '}
        <strong style={{ ...S.bold, color: '#D4943A' }}>{EQUITY_RAISE}</strong> with full three-scenario projections below.
      </p>

      {/* Budget breakdown */}
      <div style={{
        padding: '28px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px',
        marginBottom: '32px',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#8899AA', marginBottom: '16px',
        }}>
          Budget Breakdown - {BUDGET_SHORTHAND}
        </p>
        {BUDGET_BREAKDOWN.map((item) => (
          <div key={item.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}>
            <span style={{ ...S.body, fontSize: '14px' }}>{item.label}</span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
              fontWeight: 600, color: '#E8DCC8',
            }}>{item.amount}</span>
          </div>
        ))}
      </div>
      {/* Revenue projections will be replaced by the three-scenario section */}

      <p style={S.body}>
        Pennsylvania's tax credit reduces investor exposure to <strong style={S.bold}>~{EQUITY_RAISE}</strong>,
        while a 10% contingency mitigates overruns. This conservative financial model,
        paired with festival buzz and streaming demand, positions {ENTITY_NAME} as a low-risk,
        high-return investment.
      </p>
    </section>
  );
}

function ProductionPlanSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} style={{
      ...S.section(visible),
      position: 'relative',
    }}>
      {/* Subtle background image */}
      <div style={{
        position: 'absolute', top: '5%', left: '-5%',
        width: '280px', height: '350px',
        backgroundImage: 'url(/images/recession-decay.webp)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.06, borderRadius: '8px',
        pointerEvents: 'none',
      }} />

      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Production Plan</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginBottom: '24px',
      }}>
        {PRODUCTION_PHASES.map((item) => (
          <div key={item.phase} style={{
            padding: '24px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '6px',
          }}>
            <p style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: '18px', color: '#D4943A',
              letterSpacing: '0.04em', marginBottom: '4px',
            }}>
              {item.phase}
            </p>
            <p style={{ ...S.muted, marginBottom: '12px' }}>{item.timeline}</p>
            <p style={{ ...S.body, fontSize: '14px' }}>{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DistributionSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} style={S.section(visible)}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Distribution Strategy</p>

      <p style={{ ...S.body, marginBottom: '32px' }}>
        <strong style={S.bold}>ALLENTOWN's</strong> distribution maximizes revenue through a
        festival-to-streaming pipeline.
      </p>

      <div style={{
        position: 'relative',
        paddingLeft: '32px',
        borderLeft: '2px solid rgba(212,148,58,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        marginBottom: '32px',
      }}>
        {DISTRIBUTION_PHASES.map((item) => (
          <div key={item.phase} style={{ position: 'relative' }}>
            {/* Timeline dot */}
            <div style={{
              position: 'absolute',
              left: '-39px', top: '4px',
              width: '12px', height: '12px',
              borderRadius: '50%',
              background: '#D4943A',
              boxShadow: '0 0 8px rgba(212,148,58,0.4)',
            }} />
            <p style={{ ...S.muted, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>
              {item.phase} - {item.timeline}
            </p>
            <p style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(18px, 2vw, 22px)',
              color: '#E8DCC8', letterSpacing: '0.04em', marginBottom: '8px',
            }}>
              {item.title}
            </p>
            <p style={{ ...S.body, fontSize: '14px' }}>{item.description}</p>
          </div>
        ))}
      </div>

      <p style={S.body}>
        This multi-channel strategy, proven by Three Billboards' $160M gross, ensures Allentown reaches
        diverse audiences and delivers strong returns for investors.
      </p>
    </section>
  );
}

function TeamSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} style={S.section(visible)}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>The Team</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {TEAM_MEMBERS.map((member) => (
          <div key={member.name} style={{
            display: 'flex', gap: '16px', alignItems: 'flex-start',
            padding: '24px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '6px',
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
              backgroundImage: `url(${member.image})`,
              backgroundSize: 'cover', backgroundPosition: 'center top',
              border: '2px solid rgba(212,148,58,0.3)',
            }} />
            <div>
              <p style={{ ...S.muted, fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2px' }}>
                {member.role}
              </p>
              <p style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: '18px', color: '#E8DCC8',
                letterSpacing: '0.04em', marginBottom: '6px',
              }}>
                {member.name}
              </p>
              <p style={{ ...S.body, fontSize: '13px', lineHeight: 1.5 }}>{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DownloadsSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} style={{
      ...S.section(visible),
      paddingBottom: 'clamp(80px, 12vh, 140px)',
    }}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>More Information</p>

      <p style={{ ...S.body, marginBottom: '32px' }}>
        Dive deeper into Allentown's true-story journey. Review the script, pitch deck, and Billboard Boys documentary for full details.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
        {DOCUMENTS.map((doc, i) => (
          <a
            key={doc.title}
            href={doc.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
              padding: '24px 28px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              opacity: 0,
              animation: visible ? `investorFadeIn 0.6s ease-out ${0.2 + i * 0.12}s forwards` : 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212,148,58,0.06)';
              e.currentTarget.style.borderColor = 'rgba(212,148,58,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <div>
              <p style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(18px, 2vw, 22px)',
                color: '#E8DCC8', letterSpacing: '0.04em', marginBottom: '4px',
              }}>
                {doc.title}
              </p>
              <p style={{ ...S.muted, lineHeight: 1.5 }}>{doc.description}</p>
            </div>
            <span style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#D4943A', flexShrink: 0, marginLeft: '24px',
            }}>
              {doc.type === 'PDF' ? 'PDF' : 'VIEW'}
            </span>
          </a>
        ))}
      </div>

      {/* Contact */}
      <div className="tri-bar" style={{ width: '60px', margin: '0 auto 32px', opacity: 0.6 }} />

      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#8899AA', marginBottom: '24px',
        }}>
          Contact
        </p>

        {CONTACTS.map((c) => (
          <p key={c.name} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(13px, 1.3vw, 15px)',
            color: '#E8DCC8',
            lineHeight: 1.8,
            opacity: 0.8,
          }}>
            <span style={{ ...S.muted, fontSize: '11px', letterSpacing: '0.1em' }}>{c.role}</span>
            {' '}
            <strong style={S.bold}>{c.name}</strong>
            {' | '}
            <span style={{ color: '#8899AA' }}>{c.phone}</span>
            {' | '}
            <a href={`mailto:${c.email}`} style={{ color: '#D4943A', textDecoration: 'none' }}>{c.email}</a>
          </p>
        ))}

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
          color: '#667788', marginTop: '24px',
        }}>
          General inquiries: <a href="mailto:info@allentownfilm.com" style={{ color: '#D4943A', textDecoration: 'none' }}>info@allentownfilm.com</a>
        </p>
      </div>
    </section>
  );
}
