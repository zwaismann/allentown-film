'use client';

import { useEffect, useRef, useState } from 'react';
import useIsMobile from './useIsMobile';

interface TeamMember {
  name: string;
  credential?: string;
  image?: string;
  imagePosition?: string;
  imageScale?: number;
}

interface TeamRow {
  label: string;
  members: TeamMember[];
}

const TEAM_ROWS: TeamRow[] = [
  {
    label: 'Writers',
    members: [
      {
        name: 'ZE\'EV WAISMANN',
        image: '/images/zev-waismann.webp',
        imagePosition: 'center 25%',
        imageScale: 2.2,
      },
      {
        name: 'PAT TAGGART',
        image: '/images/pat-taggart.webp',
        imagePosition: 'center 20%',
        imageScale: 1,
      },
      {
        name: 'CONRAD SYLVIA',
        image: '/images/conrad-sylvia.webp',
        imagePosition: 'center 8%',
        imageScale: 1.55,
      },
    ],
  },
  {
    label: 'Producers',
    members: [
      {
        name: 'GARY FOSTER',
        image: '/images/gary-foster.webp',
        imagePosition: 'center 15%',
        imageScale: 1,
      },
      {
        name: 'ROBERTO ALCAZAR',
        image: '/images/roberto-alcazar.webp',
        imagePosition: 'center 10%',
        imageScale: 1.32,
      },
      {
        name: 'PILAR DE POSADAS',
        image: '/images/pilar-de-posadas.webp',
        imagePosition: 'center 25%',
        imageScale: 1,
      },
    ],
  },
];

function renderMember(member: TeamMember, flatIndex: number, onMemberClick?: (index: number) => void) {
  return (
    <div
      key={member.name}
      style={{ textAlign: 'center', minWidth: '100px', cursor: 'pointer' }}
      onClick={() => onMemberClick?.(flatIndex)}
    >
      <div style={{
        width: '96px', height: '96px', borderRadius: '50%',
        margin: '0 auto 10px', overflow: 'hidden',
        background: '#1A1F24', border: '1px solid #2A2A2A',
      }}>
        {member.image ? (
          <div style={{
            width: '100%', height: '100%',
            backgroundImage: `url(${member.image})`,
            backgroundSize: 'cover',
            backgroundPosition: member.imagePosition || 'center 20%',
            transform: `scale(${member.imageScale || 1})`,
            transformOrigin: member.imagePosition || 'center 20%',
          }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Anton', sans-serif", fontSize: '18px',
            color: '#333', letterSpacing: '0.04em',
          }}>
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <p style={{
        fontFamily: "'Anton', sans-serif", fontSize: '12px',
        color: '#E8DCC8', letterSpacing: '0.06em', marginBottom: '2px',
      }}>{member.name}</p>
    </div>
  );
}

export default function TeamSection({ onMemberClick }: { onMemberClick?: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

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

      {/* Team - two rows: writing team (3) + producers (3) */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 'clamp(36px, 5vh, 56px)',
        maxWidth: '1100px', width: '100%',
      }}>
        {/* Row 1: Writer/Director + Writers */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 'clamp(20px, 3vw, 48px)',
            justifyContent: 'center', alignItems: isMobile ? 'center' : 'flex-start',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s',
          }}
        >
          {/* Ze'ev - Writer / Director */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.25em', textTransform: 'uppercase', color: '#667788',
              marginBottom: '16px',
            }}>Writer / Director</p>
            {renderMember(TEAM_ROWS[0].members[0], 0, onMemberClick)}
          </div>

          {/* Pat + Conrad - Writers */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600,
              letterSpacing: '0.25em', textTransform: 'uppercase', color: '#667788',
              marginBottom: '16px',
            }}>Writers</p>
            <div style={{ display: 'flex', gap: 'clamp(20px, 2.5vw, 36px)', justifyContent: 'center' }}>
              {renderMember(TEAM_ROWS[0].members[1], 1, onMemberClick)}
              {renderMember(TEAM_ROWS[0].members[2], 2, onMemberClick)}
            </div>
          </div>
        </div>

        {/* Row 2: Producers */}
        <div
          style={{
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s ease-out 0.45s, transform 1s ease-out 0.45s',
          }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.25em', textTransform: 'uppercase', color: '#667788',
            marginBottom: '16px',
          }}>Producers</p>
          <div style={{ display: 'flex', gap: 'clamp(20px, 2.5vw, 36px)', justifyContent: 'center' }}>
            {TEAM_ROWS[1].members.map((member, i) => renderMember(member, 3 + i, onMemberClick))}
          </div>
        </div>
      </div>
    </section>
  );
}
