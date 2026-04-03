'use client';

import { useState, useEffect } from 'react';

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

export default function InvestorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

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

  if (!open) return null;

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: `rgba(0,0,0,${visible ? 0.85 : 0})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.3s ease',
        padding: '24px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          background: '#14171B',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: 'clamp(20px, 5vw, 48px)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: '16px', right: '20px',
            background: 'none', border: 'none', color: '#667788',
            fontSize: '24px', cursor: 'pointer', lineHeight: 1,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          &times;
        </button>

        {/* Title */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8899AA',
          marginBottom: '12px', textAlign: 'center',
        }}>For Investors</p>

        <div className="tri-bar" style={{ width: '60px', margin: '0 auto 28px', opacity: 0.8 }} />

        {!unlocked ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              color: '#E8DCC8', lineHeight: 1.7, marginBottom: '28px', opacity: 0.8,
            }}>
              Please enter the access code to view confidential investor materials.
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
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  letterSpacing: '0.08em',
                  padding: '12px 20px',
                  background: 'rgba(255,255,255,0.05)',
                  border: error ? '1px solid #E84B2B' : '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '4px',
                  color: '#E8DCC8',
                  outline: 'none',
                  width: '200px',
                  transition: 'border-color 0.3s ease',
                }}
              />
              <button
                type="submit"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px', fontWeight: 600,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  padding: '13px 24px',
                  background: 'transparent',
                  border: '1px solid rgba(212,148,58,0.5)',
                  borderRadius: '4px',
                  color: '#D4943A',
                  cursor: 'pointer',
                }}
              >
                Enter
              </button>
            </form>

            {error && (
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
                color: '#E84B2B', marginTop: '12px',
              }}>
                Incorrect access code
              </p>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px', color: '#E8DCC8', lineHeight: 1.7,
              textAlign: 'center', marginBottom: '8px', opacity: 0.8,
            }}>
              Thank you for your interest in Allentown.
            </p>

            {DOCUMENTS.map((doc, i) => (
              <a
                key={doc.title}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
                  padding: '20px 24px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  opacity: 0,
                  animation: `modalFadeIn 0.5s ease-out ${0.1 + i * 0.12}s forwards`,
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
                    fontSize: '18px', color: '#E8DCC8',
                    letterSpacing: '0.04em', marginBottom: '3px',
                  }}>
                    {doc.title}
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '12px', color: '#8899AA', lineHeight: 1.4,
                  }}>
                    {doc.description}
                  </p>
                </div>
                <div style={{ flexShrink: 0, marginLeft: '20px', textAlign: 'right' }}>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
                    fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: '#D4943A',
                  }}>PDF</span>
                  <br />
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: '#667788',
                  }}>{doc.size}</span>
                </div>
              </a>
            ))}

            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
              color: '#667788', textAlign: 'center', marginTop: '8px',
            }}>
              Questions? <a href="mailto:info@allentownfilm.com" style={{ color: '#D4943A', textDecoration: 'none' }}>info@allentownfilm.com</a>
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
