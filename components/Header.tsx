'use client';

import { useState, useCallback, useEffect } from 'react';

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
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (fading) return;

    const id = href.replace('#', '');
    const targetY = getTargetScroll(id);

    setMenuOpen(false);
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

  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (fading) return;
    setMenuOpen(false);
    setFading(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      requestAnimationFrame(() => setFading(false));
    }, 400);
  }, [fading]);

  const handleInvestorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    onInvestorClick?.();
  }, [onInvestorClick]);

  return (
    <>
      {/* Desktop header - right-side vertical nav (hidden on mobile via CSS) */}
      <header
        className="header-desktop"
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
          onClick={handleLogoClick}
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
            onClick={handleInvestorClick}
            style={{ color: 'rgba(212,148,58,0.7)' }}
          >
            For Investors
          </a>
        </nav>
      </header>

      {/* Mobile header bar - logo left, hamburger right (hidden on desktop via CSS) */}
      <div
        className="mobile-header-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease-out',
          pointerEvents: 'none',
          background: menuOpen ? 'transparent' : 'linear-gradient(180deg, rgba(13,15,18,0.8) 0%, rgba(13,15,18,0.2) 70%, transparent 100%)',
        }}
      >
        <a
          href="#"
          className="nav-logo"
          onClick={handleLogoClick}
          style={{ pointerEvents: visible ? 'auto' : 'none' }}
        >
          ALLENTOWN
        </a>

        <button
          className={`hamburger-btn${menuOpen ? ' hamburger-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ pointerEvents: visible ? 'auto' : 'none' }}
        >
          <span className="hamburger-line hamburger-line-1" />
          <span className="hamburger-line hamburger-line-2" />
          <span className="hamburger-line hamburger-line-3" />
        </button>
      </div>

      {/* Mobile full-screen overlay menu */}
      <div
        className="mobile-menu-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 55,
          background: '#0D0F12',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#investors"
            className="mobile-nav-link"
            onClick={handleInvestorClick}
            style={{ color: 'rgba(212,148,58,0.85)' }}
          >
            For Investors
          </a>
        </nav>
      </div>

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
    </>
  );
}
