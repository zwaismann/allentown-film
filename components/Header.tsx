'use client';

const NAV_ITEMS = [
  { label: 'The Story', href: '#story' },
  { label: 'The Contest', href: '#contest' },
  { label: 'The Men', href: '#men' },
  { label: 'The Film', href: '#film' },
  { label: 'The Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Header({ visible }: { visible: boolean }) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
        </nav>
    </header>
  );
}
