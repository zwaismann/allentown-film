'use client';

import { useEffect, useState } from 'react';

interface TeamMemberData {
  name: string;
  role: string;
  credential?: string;
  image?: string;
  imagePosition?: string;
  imageScale?: number;
  bio: string;
}

// Order must match flat index from TeamSection groups: Ze'ev, Pat, Conrad, Gary, Roberto, Pilar
const TEAM_BIOS: TeamMemberData[] = [
  {
    name: "ZE'EV WAISMANN",
    role: 'Writer / Director',
    image: '/images/zev-waismann.webp',
    imagePosition: 'center 25%',
    imageScale: 2.2,
    bio: "Ze'ev Waismann is a multidisciplinary director and cinematographer. Ze'ev's ambition is to create purposeful and emotionally-charged films rooted in his belief that images speak to the soul of the viewer. His hands-on approach has led him to both direct and shoot visually distinctive branded content and commercial work for clients including Nike, Adidas, Reebok, Dodge, Chevrolet, Blue Cross Blue Shield, AT&T, and others.\n\nBorn in Rio de Janeiro, Ze'ev holds a master's degree in Film from the USC School of Cinematic Arts and a bachelor's in Economics from the London School of Economics.",
  },
  {
    name: 'PAT TAGGART',
    role: 'Writer',
    image: '/images/pat-taggart.webp',
    imagePosition: 'center 20%',
    imageScale: 1,
    bio: 'Pat Taggart is a screenwriter and playwright whose work draws on the textures of working-class American life. Pat co-wrote the Allentown screenplay, bringing a sharp ear for dialogue and a deep understanding of the characters who populate this story. His writing captures the humor, desperation, and resilience of ordinary people in extraordinary circumstances.',
  },
  {
    name: 'CONRAD SYLVIA',
    role: 'Writer',
    image: '/images/conrad-sylvia.webp',
    imagePosition: 'center 8%',
    imageScale: 1.55,
    bio: 'Conrad Sylvia is a screenwriter and academic whose work bridges research and storytelling. As co-writer on Allentown, Conrad brought extensive knowledge of the real events and historical context that underpin the screenplay. His background in research and narrative structure helped shape the story into a screenplay that honors the true events while crafting a compelling dramatic arc.',
  },
  {
    name: 'GARY FOSTER',
    role: 'Producer',
    credential: 'Oscar-nominated',
    image: '/images/gary-foster.webp',
    imagePosition: 'center 15%',
    imageScale: 1,
    bio: 'Gary Foster is an Oscar-nominated producer whose credits include Sleepless in Seattle, Short Circuit, and The Soloist. With decades of experience navigating the studio system and independent film landscape, Gary brings both creative vision and industry relationships to Allentown. His track record of producing films that balance commercial appeal with genuine storytelling makes him the ideal steward for this project.',
  },
  {
    name: 'ROBERTO ALCAZAR',
    role: 'Producer',
    image: '/images/roberto-alcazar.webp',
    imagePosition: 'center 10%',
    imageScale: 1.32,
    bio: 'Roberto Alcazar is an executive producer and entrepreneur with deep roots in entertainment finance and production. His experience in structuring independent film deals and building sustainable production models has been instrumental in bringing Allentown from concept to active development. Roberto oversees the business strategy and financial architecture of the project.',
  },
  {
    name: 'PILAR DE POSADAS',
    role: 'Producer',
    image: '/images/pilar-de-posadas.webp',
    imagePosition: 'center 25%',
    imageScale: 1,
    bio: 'Pilar de Posadas is a producer bringing international perspective and production expertise to Allentown.',
  },
];

export default function TeamModal({ memberIndex, onClose }: { memberIndex: number | null; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (memberIndex !== null) {
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [memberIndex]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  if (memberIndex === null) return null;

  const member = TEAM_BIOS[memberIndex];
  if (!member) return null;

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
          background: '#14171B',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          maxWidth: '520px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: 'clamp(32px, 5vw, 48px)',
          position: 'relative',
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

        {/* Portrait */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          marginBottom: '28px',
        }}>
          <div style={{
            width: '140px', height: '140px', borderRadius: '50%',
            overflow: 'hidden', marginBottom: '20px',
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
                fontFamily: "'Anton', sans-serif", fontSize: '32px',
                color: '#333', letterSpacing: '0.04em',
              }}>
                {member.name.charAt(0)}
              </div>
            )}
          </div>

          <h3 style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(22px, 3vw, 28px)',
            color: '#E8DCC8', letterSpacing: '0.06em',
            marginBottom: '4px', textAlign: 'center',
          }}>
            {member.name}
          </h3>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#D4943A', marginBottom: member.credential ? '4px' : '0',
          }}>
            {member.role}
          </p>

          {member.credential && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
              color: '#8899AA',
            }}>
              {member.credential}
            </p>
          )}
        </div>

        <div className="tri-bar" style={{ width: '40px', margin: '0 auto 24px', opacity: 0.6 }} />

        {/* Bio */}
        {member.bio.split('\n\n').map((paragraph, i) => (
          <p key={i} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(14px, 1.4vw, 15px)',
            fontWeight: 300,
            color: '#E8DCC8',
            lineHeight: 1.8,
            opacity: 0.85,
            marginBottom: i < member.bio.split('\n\n').length - 1 ? '16px' : '0',
          }}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
