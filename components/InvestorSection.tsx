'use client';

import { useState, useRef, useEffect } from 'react';

const DOCUMENTS = [
  {
    title: 'Pitch Deck',
    description: 'Visual treatment, logline, story overview, and creative vision',
    href: '/docs/ALLENTOWN_Pitch_Deck.pdf',
    size: '34.9 MB',
  },
  {
    title: 'Budget Assumptions',
    description: 'Production budget preamble, assumptions, and methodology',
    href: '/docs/ALLENTOWN_Budget_Preamble.pdf',
    size: '100 KB',
  },
  {
    title: 'Production Budget',
    description: 'Full production budget breakdown - $2.5M, 26 shoot days',
    href: '/docs/ALLENTOWN_Production_Budget.pdf',
    size: '29 KB',
  },
  {
    title: 'Screenplay',
    description: 'Revised draft by Pat Taggart, Conrad Sylvia, and Ze\'ev Waismann',
    href: '/docs/ALLENTOWN_Script.pdf',
    size: '1 MB',
  },
];

export default function InvestorSection() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
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

  return (
    <section
      ref={ref}
      id="investors"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(80px, 12vh, 140px) 24px clamp(60px, 8vh, 100px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Title */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
        letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8899AA',
        marginBottom: '16px',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 1.2s ease-out, transform 1.2s ease-out',
      }}>For Investors</p>

      <div className="tri-bar" style={{
        width: '60px', marginBottom: '32px',
        opacity: visible ? 0.8 : 0, transition: 'opacity 1.5s ease-out 0.2s',
      }} />

      {!unlocked ? (
        /* Password gate */
        <div style={{
          maxWidth: '440px', width: '100%', textAlign: 'center',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(15px)',
          transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(14px, 1.4vw, 16px)',
            color: '#E8DCC8', lineHeight: 1.7, marginBottom: '32px', opacity: 0.8,
          }}>
            This section contains confidential materials for potential investors and partners. Please enter the access code to continue.
          </p>

          <form onSubmit={handleSubmit} style={{
            display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', alignItems: 'center',
          }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Access code"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                letterSpacing: '0.08em',
                padding: '12px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: error ? '1px solid #E84B2B' : '1px solid rgba(255,255,255,0.15)',
                borderRadius: '4px',
                color: '#E8DCC8',
                outline: 'none',
                width: 'min(100%, 220px)',
                transition: 'border-color 0.3s ease',
              }}
            />
            <button
              type="submit"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '13px 24px',
                background: 'transparent',
                border: '1px solid rgba(212,148,58,0.5)',
                borderRadius: '4px',
                color: '#D4943A',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212,148,58,0.1)';
                e.currentTarget.style.borderColor = '#D4943A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(212,148,58,0.5)';
              }}
            >
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
      ) : (
        /* Unlocked - document cards */
        <div style={{
          maxWidth: '800px', width: '100%',
          display: 'flex', flexDirection: 'column', gap: '20px',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(14px, 1.4vw, 16px)',
            color: '#E8DCC8', lineHeight: 1.7, textAlign: 'center',
            marginBottom: '16px', opacity: 0.8,
          }}>
            Thank you for your interest in Allentown. Below are the key documents for your review.
          </p>

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
                animation: `fadeSlideIn 0.6s ease-out ${0.2 + i * 0.15}s forwards`,
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
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(12px, 1.2vw, 14px)',
                  color: '#8899AA', lineHeight: 1.5,
                }}>
                  {doc.description}
                </p>
              </div>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
                flexShrink: 0, marginLeft: '24px',
              }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: '#D4943A',
                }}>
                  PDF
                </span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
                  color: '#667788', marginTop: '2px',
                }}>
                  {doc.size}
                </span>
              </div>
            </a>
          ))}

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
            color: '#667788', textAlign: 'center', marginTop: '16px',
            letterSpacing: '0.05em',
          }}>
            For questions, contact <a href="mailto:info@allentownfilm.com" style={{ color: '#D4943A', textDecoration: 'none' }}>info@allentownfilm.com</a>
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
