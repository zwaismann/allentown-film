'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

/* ─── Data ─── */

const ASPIRATIONAL_COMPS = [
  { title: 'I, TONYA', budget: '$11M', gross: '$56M', roi: '408%' },
  { title: 'THREE BILLBOARDS', budget: '$15M', gross: '$160M', roi: '967%' },
  { title: 'MONEYBALL', budget: '$50M', gross: '$222.6M', roi: '345%' },
];

const DIRECT_COMPS = [
  { title: 'THE FLORIDA PROJECT', budget: '$2M', gross: '$10.8M', roi: '440%' },
  { title: 'CAPTAIN FANTASTIC', budget: '$5M', gross: '$22.8M', roi: '356%' },
  { title: 'SHORT TERM 12', budget: '$1M', gross: '$3.5M', roi: '250%' },
];

const REVENUE_BREAKDOWN = [
  { label: 'Streaming Deals', amount: '$2.7M', note: 'Netflix / Amazon' },
  { label: 'Limited Theatrical', amount: '$1.9M', note: '500 screens, US & UK' },
  { label: 'International Sales', amount: '$0.75M', note: 'Global distribution' },
  { label: 'Ancillaries & Tie-ins', amount: '$0.4M', note: 'Merchandise, licensing' },
];

const BUDGET_BREAKDOWN = [
  { label: 'Above-The-Line (Script, Producers, Director, Cast)', amount: '$764K' },
  { label: 'Production (Crew, Equipment, Locations)', amount: '$1.04M' },
  { label: 'Post-Production (Editing, Sound, VFX, Music)', amount: '$268K' },
  { label: 'Other (Insurance, Publicity, General)', amount: '$56K' },
  { label: 'Contingency (10%)', amount: '$213K' },
];

const DISTRIBUTION_PHASES = [
  {
    phase: 'Phase 1',
    timeline: 'Q4 2026',
    title: 'Festival Premiere',
    description: 'Premiere at Sundance and TIFF, targeting awards buzz and acquisition deals, mirroring I, Tonya\'s path.',
  },
  {
    phase: 'Phase 2',
    timeline: 'Q2 2027',
    title: 'Limited Theatrical',
    description: 'Limited theatrical release (500 screens, $1.9M gross) in key markets (US, UK), leveraging housing crisis relevance.',
  },
  {
    phase: 'Phase 3',
    timeline: 'Q3 2027',
    title: 'Streaming & International',
    description: 'Streaming deals with Netflix/Amazon ($2.7M) and international sales ($0.75M), capitalizing on the radio contest\'s global media frenzy.',
  },
];

const TEAM_MEMBERS = [
  {
    role: 'PRODUCER',
    name: 'Gary Foster',
    image: '/images/gary-foster.webp',
    short: 'Krasnoff/Foster Entertainment. Bedford Park (2026 Sundance), Sleepless in Seattle ($300M+)',
    bio: 'President of Krasnoff/Foster Entertainment with 40+ years in the industry. Most recently produced Bedford Park (2026 Sundance, Special Jury Award, acquired by Sony Pictures Classics) and Finestkind (2023, Paramount+). Earlier credits include Denial (2016, BAFTA nominated), Community (TV), and the Oscar-nominated Sleepless in Seattle ($300M+ worldwide). Also produced Daredevil, Elektra, and Ghost Rider for Marvel.',
  },
  {
    role: 'DIRECTOR / CO-WRITER',
    name: 'Ze\'ev Waismann',
    image: '/images/zev-waismann.webp',
    short: 'Commercial director. Nike, Adidas, Chevrolet, Scout Motors, Unilever',
    bio: 'Commercial director with over a decade of experience directing campaigns for Nike, Adidas, Chevrolet, Scout Motors, and Unilever. Brings a cinematic eye and narrative precision to his first feature, blending gritty realism with heartfelt storytelling.',
  },
  {
    role: 'WRITER',
    name: 'Conrad Sylvia',
    image: '/images/conrad-sylvia.webp',
    short: 'Writer, director. AVP: Requiem, Deck the Halls, The Week in Television',
    bio: 'Writer, director, and creator of The Week in Television, a respected industry newsletter covering the television landscape. Credits include Aliens vs. Predator: Requiem and Deck the Halls. Develops projects for studios and production companies, with deep expertise in the current TV and international marketplace.',
  },
  {
    role: 'WRITER',
    name: 'Pat Taggart',
    image: '/images/pat-taggart.webp',
    short: 'Allentown native. Director, Billboard Boys documentary (2017)',
    bio: 'Allentown native and the filmmaker who brought this story to light. Directed the Billboard Boys documentary (2017), which premiered at film festivals and was featured in The Philadelphia Inquirer, WHYY, and PhillyVoice. His personal connection to the Lehigh Valley and years of research into the billboard sitters give the script its authenticity.',
  },
  {
    role: 'EXECUTIVE PRODUCER',
    name: 'Roberto Alcazar',
    image: '/images/roberto-alcazar.webp',
    short: 'EO Integration. 200 Cartas (Lin-Manuel Miranda), YASUNI',
    bio: 'Managing Partner at EO Integration with extensive experience in impact-driven entertainment. Executive produced 200 Cartas (starring Lin-Manuel Miranda) and produced the documentary YASUNI, which premiered at the Miami International Film Festival. Also produced and directed CASI 10, featured in 25+ film festivals worldwide.',
  },
  {
    role: 'EXECUTIVE PRODUCER',
    name: 'Pilar de Posadas',
    image: '/images/pilar-de-posadas.webp',
    short: 'Scenic Rights (LA). International sales and acquisitions',
    bio: 'International content and distribution specialist. Associate at Scenic Rights (Los Angeles), with prior roles as Television Development and Acquisitions Head at Herrick Entertainment and International Sales Consultant for Dopamine Content and Zebra Producciones. Brings deep expertise in international sales, acquisitions, and scripted content development.',
  },
];

const DOCUMENTS = [
  {
    title: 'Business Plan',
    description: 'Full investor business plan - financial projections, waterfall, terms',
    href: '/investors/business-plan',
    type: 'LINK',
  },
  {
    title: 'Screenplay',
    description: 'Revised draft by Pat Taggart, Conrad Sylvia, and Ze\'ev Waismann',
    href: '/docs/ALLENTOWN_Script.pdf',
    type: 'PDF',
  },
  {
    title: 'Pitch Deck',
    description: 'Visual treatment, logline, story overview, and creative vision',
    href: 'https://indd.adobe.com/view/582021df-5e82-4974-98a7-f9d574890a39',
    type: 'LINK',
  },
  {
    title: 'Billboard Boys Documentary',
    description: 'The original documentary on the Allentown billboard sitters',
    href: 'https://vimeo.com/user48884984/review/232709722/f0ab22adb9',
    type: 'LINK',
  },
  {
    title: 'Budget Assumptions',
    description: 'Production budget preamble, assumptions, and methodology',
    href: '/docs/ALLENTOWN_Budget_Preamble.pdf',
    type: 'PDF',
  },
  {
    title: 'Production Budget',
    description: 'Full production budget breakdown - $2.3M, 26 shoot days',
    href: '/docs/ALLENTOWN_Production_Budget.pdf',
    type: 'PDF',
  },
];

const CONTACTS = [
  { role: 'PRODUCER', name: 'Gary Foster', phone: '+1 (508) 292 5752', email: 'gsfhorse@mac.com' },
  { role: 'EXECUTIVE PRODUCER', name: 'Roberto Alcazar', phone: '+1 (646) 346 9213', email: 'alcazar@eointegration.com' },
  { role: 'EXECUTIVE PRODUCER', name: 'Pilar De Posadas', phone: '+1 (310) 740 5530', email: 'pposadas@scenicrights.com' },
];

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

      {/* ──── CURRENT ATTACHMENTS ──── */}
      <AttachmentsSection />

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
        A{' '}
        <a href="/investors/business-plan" style={{ color: '#D4943A', textDecoration: 'none', borderBottom: '1px solid rgba(212,148,58,0.4)' }}>
          full business plan
        </a>{' '}
        with detailed financial projections and waterfall analysis is available below.
      </p>

      {/* Aspirational comps */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: '#8899AA', marginBottom: '16px',
      }}>
        Genre Ceiling
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
              Gross: <span style={{ color: '#E8DCC8' }}>{film.gross}</span>
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

      {/* Budget-range comps */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        color: '#8899AA', marginBottom: '16px',
      }}>
        Budget-Range Comparables
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {DIRECT_COMPS.map((film) => (
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
              Gross: <span style={{ color: '#E8DCC8' }}>{film.gross}</span>
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
        Led by producer <strong style={S.bold}>Gary Foster</strong> (<em>Bedford Park</em>, 2026 Sundance,
        <em> Sleepless in Seattle</em>), the team ensures execution and global appeal. Pennsylvania's incentives
        and the lean $2.3M budget mitigate risk, positioning Allentown as a profitable, uplifting investment.
      </p>
    </section>
  );
}

function MarketAnalysisSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} style={S.section(visible)}>
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
        <strong style={S.bold}>ALLENTOWN</strong> is budgeted at{' '}
        <strong style={{ ...S.bold, color: '#D4943A' }}>$2.3M</strong>, leveraging Pennsylvania's low-cost
        locations and 25-30% Film Tax Credit (~$600K). Projected revenue of{' '}
        <strong style={{ ...S.bold, color: '#D4943A' }}>$5.75M yields a 150% ROI</strong>.
      </p>

      {/* Two-column: budget + revenue */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px',
      }}>
        {/* Budget breakdown */}
        <div style={{
          padding: '28px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '6px',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#8899AA', marginBottom: '16px',
          }}>
            Budget Breakdown - $2.3M
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

        {/* Revenue projections */}
        <div style={{
          padding: '28px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '6px',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#8899AA', marginBottom: '16px',
          }}>
            Revenue Projections - $5.75M
          </p>
          {REVENUE_BREAKDOWN.map((item) => (
            <div key={item.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div>
                <span style={{ ...S.body, fontSize: '14px' }}>{item.label}</span>
                <span style={{ ...S.muted, display: 'block', fontSize: '12px' }}>{item.note}</span>
              </div>
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
                fontWeight: 600, color: '#D4943A',
              }}>{item.amount}</span>
            </div>
          ))}
        </div>
      </div>

      <p style={S.body}>
        Pennsylvania's tax credit reduces investor exposure to <strong style={S.bold}>~$1.7M</strong>,
        while a 10% contingency ($213K) mitigates overruns. This conservative financial model,
        paired with festival buzz and streaming demand, positions Allentown as a low-risk,
        high-return investment.
      </p>
    </section>
  );
}

function AttachmentsSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} style={S.section(visible)}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Current Attachments</p>

      <div style={{
        display: 'flex', gap: '24px', alignItems: 'flex-start',
        padding: '28px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px',
        marginBottom: '16px',
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%', flexShrink: 0,
          backgroundImage: 'url(/images/ron-kistler.webp)',
          backgroundSize: 'cover', backgroundPosition: 'center top',
          border: '2px solid rgba(212,148,58,0.4)',
        }} />
        <div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#D4943A', marginBottom: '4px',
          }}>
            Attached
          </p>
          <p style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(22px, 2.5vw, 28px)',
            color: '#E8DCC8', letterSpacing: '0.04em', marginBottom: '4px',
          }}>
            Dane DeHaan
            <span style={{ ...S.muted, fontSize: '14px', marginLeft: '12px', fontFamily: "'DM Sans', sans-serif" }}>
              as Ron Kistler
            </span>
          </p>
          <p style={{ ...S.body, fontSize: '14px', marginBottom: '8px' }}>
            Chronicle ($126M worldwide), The Amazing Spider-Man 2, Valerian and the City of a Thousand Planets, A Cure for Wellness, ZeroZeroZero
          </p>
          <p style={S.muted}>
            Internationally recognized name that elevates distribution value, drives streaming platform interest, and strengthens international pre-sale positioning.
          </p>
        </div>
      </div>

      <div style={{
        display: 'flex', gap: '24px', alignItems: 'flex-start',
        padding: '28px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px',
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%', flexShrink: 0,
          backgroundImage: 'url(/images/mike-mackay.webp)',
          backgroundSize: 'cover', backgroundPosition: 'center top',
          border: '2px solid rgba(212,148,58,0.4)',
        }} />
        <div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#D4943A', marginBottom: '4px',
          }}>
            Attached
          </p>
          <p style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(22px, 2.5vw, 28px)',
            color: '#E8DCC8', letterSpacing: '0.04em', marginBottom: '4px',
          }}>
            Matt Wood
            <span style={{ ...S.muted, fontSize: '14px', marginLeft: '12px', fontFamily: "'DM Sans', sans-serif" }}>
              as Mike Mackay
            </span>
          </p>
          <p style={{ ...S.body, fontSize: '14px' }}>
            Saturday Night (2024, directed by Jason Reitman, as John Belushi)
          </p>
        </div>
      </div>
    </section>
  );
}

function ProductionPlanSection() {
  const { ref, visible } = useFadeIn();
  return (
    <section ref={ref} style={{
      ...S.section(visible),
    }}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>Production Plan</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginBottom: '24px',
      }}>
        {[
          {
            phase: 'Pre-Production',
            timeline: 'Q2-Q3 2026, 6 months',
            detail: 'Casting bankable talent, scouting Allentown\'s steel mills and downtown, and securing Pennsylvania\'s 25-30% tax credit.',
          },
          {
            phase: 'Production',
            timeline: 'Q4 2026, 26-day shoot',
            detail: 'Leverages local crew via Central Pennsylvania Film Commission, minimizing costs, with a billboard set as the centerpiece.',
          },
          {
            phase: 'Post-Production',
            timeline: 'Q1-Q2 2027, 6 months',
            detail: 'Covers editing, sound design, and festival submissions (Sundance, TIFF).',
          },
        ].map((item) => (
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
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section ref={ref} style={S.section(visible)}>
      <div className="tri-bar-thin" style={{ width: '40px', marginBottom: '24px', opacity: 0.6 }} />
      <p style={S.sectionHeading}>The Team</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {TEAM_MEMBERS.map((member) => {
          const isOpen = expanded === member.name;
          return (
            <div
              key={member.name}
              onClick={() => setExpanded(isOpen ? null : member.name)}
              style={{
                display: 'flex', gap: '16px', alignItems: 'center',
                padding: '16px 20px',
                background: isOpen ? 'rgba(212,148,58,0.06)' : 'rgba(255,255,255,0.03)',
                border: isOpen ? '1px solid rgba(212,148,58,0.25)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flexWrap: 'wrap',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                backgroundImage: `url(${member.image})`,
                backgroundSize: 'cover', backgroundPosition: 'center top',
                border: '2px solid rgba(212,148,58,0.3)',
              }} />
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: '17px', color: '#E8DCC8',
                  letterSpacing: '0.04em',
                }}>
                  <span style={{ ...S.muted, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '10px', fontFamily: "'DM Sans', sans-serif" }}>
                    {member.role}
                  </span>
                  {member.name}
                </p>
                <p style={{ ...S.muted, fontSize: '13px', lineHeight: 1.4, marginTop: '2px' }}>
                  {member.short}
                </p>
              </div>
              <span style={{
                color: '#667788', fontSize: '18px', flexShrink: 0,
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s ease',
              }}>
                &#9662;
              </span>

              {isOpen && (
                <div style={{
                  width: '100%', paddingTop: '12px', marginTop: '8px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <p style={{ ...S.body, fontSize: '14px', lineHeight: 1.6 }}>
                    {member.bio}
                  </p>
                </div>
              )}
            </div>
          );
        })}
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
