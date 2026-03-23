'use client';

import { useEffect, useRef, useState } from 'react';

interface TeamMember {
  name: string;
  role: string;
  credential?: string;
  image?: string;
  imagePosition?: string;
  imageScale?: number;
}

const TEAM: TeamMember[] = [
  {
    name: 'GARY FOSTER',
    role: 'Producer',
    credential: 'Oscar-nominated',
    image: '/images/gary-foster.webp',
    imagePosition: 'center 15%',
    imageScale: 1,
  },
  {
    name: 'ROBERTO ALCAZAR',
    role: 'Executive Producer',
    image: '/images/roberto-alcazar.webp',
    imagePosition: 'center 15%',
    imageScale: 1.8,
  },
  {
    name: 'ZE\'EV WAISMANN',
    role: 'Director / Co-Writer',
    image: '/images/zev-waismann.jpg',
    imagePosition: 'center 10%',
    imageScale: 2,
  },
  {
    name: 'PAT TAGGART',
    role: 'Writer',
  },
  {
    name: 'CONRAD SYLVIA',
    role: 'Writer',
    image: '/images/conrad-sylvia.png',
    imagePosition: 'center 10%',
    imageScale: 2.5,
  },
];

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="team"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(60px, 10vh, 100px) 24px clamp(40px, 6vh, 60px)',
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
      }}>The Team</p>

      <div className="tri-bar" style={{
        width: '60px', marginBottom: '48px',
        opacity: visible ? 0.8 : 0, transition: 'opacity 1.5s ease-out 0.2s',
      }} />

      {/* Team - horizontal row */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: 'clamp(24px, 3vw, 48px)',
        maxWidth: '1100px', width: '100%',
      }}>
        {TEAM.map((member, i) => (
          <div
            key={member.name}
            style={{
              textAlign: 'center',
              minWidth: '120px',
              flex: '0 0 auto',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 1s ease-out ${0.3 + i * 0.12}s, transform 1s ease-out ${0.3 + i * 0.12}s`,
            }}
          >
            {/* Avatar */}
            <div style={{
              width: '96px', height: '96px', borderRadius: '50%',
              margin: '0 auto 12px', overflow: 'hidden',
              background: '#1A1F24', border: '1px solid #2A2A2A',
            }}>
              {member.image ? (
                <div style={{
                  width: '100%', height: '100%',
                  backgroundImage: `url(${member.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: member.imagePosition || 'center 20%',
                  transform: `scale(${member.imageScale || 1})`,
                }} />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Anton', sans-serif", fontSize: '20px',
                  color: '#333', letterSpacing: '0.04em',
                }}>
                  {member.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Name */}
            <p style={{
              fontFamily: "'Anton', sans-serif", fontSize: '13px',
              color: '#E8DCC8', letterSpacing: '0.06em', marginBottom: '2px',
            }}>{member.name}</p>

            {/* Role */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase', color: '#667788',
            }}>{member.role}</p>

            {/* Credential */}
            {member.credential && (
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
                color: '#8899AA', marginTop: '2px',
              }}>{member.credential}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
