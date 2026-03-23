'use client';

import { useEffect, useRef, useState } from 'react';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      id="contact"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(48px, 8vh, 100px) 24px clamp(40px, 6vh, 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Tagline callback */}
      <p style={{
        fontFamily: "'Crimson Pro', serif",
        fontStyle: 'italic',
        fontSize: 'clamp(20px, 3vw, 28px)',
        color: '#E8DCC8',
        letterSpacing: '0.04em',
        lineHeight: 1.5,
        marginBottom: '40px',
        maxWidth: '600px',
        opacity: visible ? 0.9 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(15px)',
        transition: 'opacity 1.5s ease-out, transform 1.5s ease-out',
      }}>
        Three men. A billboard. And the American Dream.
      </p>

      {/* Tri-bar */}
      <div className="tri-bar" style={{
        width: '80px',
        marginBottom: '40px',
        opacity: visible ? 0.8 : 0,
        transition: 'opacity 1.5s ease-out 0.3s',
      }} />

      {/* Contact */}
      <a
        href="mailto:info@allentownfilm.com"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(14px, 1.6vw, 18px)',
          fontWeight: 500,
          color: '#D4943A',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          marginBottom: '60px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 1.2s ease-out 0.5s, transform 1.2s ease-out 0.5s',
        }}
      >
        info@allentownfilm.com
      </a>

      {/* Bottom bar */}
      <div className="tri-bar-thick" style={{
        width: '100%',
        maxWidth: '1200px',
        marginBottom: '24px',
        opacity: visible ? 0.8 : 0,
        transition: 'opacity 1.5s ease-out 0.7s',
      }} />

      {/* Copyright */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.15em',
        color: '#667788',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.2s ease-out 0.9s',
      }}>
        &copy; 2026 Electra Filmworks. All rights reserved.
      </p>
    </footer>
  );
}
