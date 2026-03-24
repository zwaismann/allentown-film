'use client';

import { useState, useCallback } from 'react';

const NAV_ITEMS = [
  { label: 'The Story', href: '#story' },
  { label: 'The Contest', href: '#contest' },
  { label: 'The Contestants', href: '#men' },
  { label: 'The Film', href: '#film' },
  { label: 'The Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

// Target scroll progress within each scroll-driven section
// so the nav lands on the "loaded" state of the content
const SECTION_TARGETS: Record<string, number> = {
  story: 0.12,    // "1982 / ALLENTOWN, PA" both titles fully visible
  contest: 0.55,  // "ONE BILLBOARD. THREE MEN. LAST ONE DOWN WINS A HOME." all loaded
  men: 0.1,       // First contestant visible
  film: 0.45,     // "A RUST BELT FAIRY TALE" with body text
};

function getTargetScroll(id: string): number {
  const el = document.getElementById(id);
  if (!el) return 0;

  const sectionTop = el.getBoundingClientRect().top + window.scrollY;
  const targetProgress = SECTION_TARGETS[id];

  if (targetProgress !== undefined) {
    const scrollable = el.offsetHeight - window.innerHeight;
    return sectionTop + targetProgress * scrollable;
  }

  // For sections without a target progress (team, contact), just go to the top
  return sectionTop;
}

export default function Header({ visible, onInvestorClick }: { visible: boolean; onInvestorClick?: () => void }) {
  const [fading, setFading] = useState(false);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (fading) return;

    const id = href.replace('#', '');
    const targetY = getTargetScroll(id);

    setFading(true);

    // After fade-out completes, jump to position and fade back in
    setTimeout(() => {
      window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
      // Small delay to let scroll settle before fading in
      requestAnimationFrame(() => {
        setFading(false);
      });
    }, 400);
  }, [fading]);

  return (
    <header
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          padding: 'clamp(24px, 4vw, 40px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease-out',
          pointerEvents: 'none',
          background: 'linear-gradient(270deg, rgba(13,15,18,0.6) 0%, rgba(13,15,18,0.15) 60%, transparent 100%)',
        }}
      >
        <a
          href="#"
          className="nav-logo"
          onClick={(e) => {
            e.preventDefault();
            if (fading) return;
            setFading(true);
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
              requestAnimationFrame(() => setFading(false));
            }, 400);
          }}
          style={{ marginBottom: '40px', pointerEvents: visible ? 'auto' : 'none' }}
        >
          ALLENTOWN
        </a>

        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '20px',
            pointerEvents: visible ? 'auto' : 'none',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#investors"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              onInvestorClick?.();
            }}
            style={{ color: 'rgba(212,148,58,0.7)' }}
          >
            For Investors
          </a>
        </nav>
        {/* Fade overlay for nav transitions */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0D0F12',
            opacity: fading ? 1 : 0,
            transition: `opacity ${fading ? '0.4s' : '0.6s'} ease-${fading ? 'in' : 'out'}`,
            pointerEvents: 'none',
            zIndex: 999,
          }}
        />
    </header>
  );
}
