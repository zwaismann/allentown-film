'use client';

import { useEffect, useRef, useState } from 'react';

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function phaseValue(progress: number, start: number, end: number): number {
  const raw = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return easeOutCubic(raw);
}

interface Contestant {
  name: string;
  role?: string;
  roleColor: string;
  quote: string;
  bio: string;
  image: string;
  imagePosition: string;
  textSide: 'left' | 'right';
  flipImage?: boolean;
}

const CONTESTANTS: Contestant[] = [
  {
    name: 'MIKE MACKAY',
    role: 'Billboard Mike',
    roleColor: '#E84B2B',
    quote: '"I Need A Home"',
    bio: 'Mike MacKay entered the contest 47,000 times. A stocky, bearded loudmouth who never met a room he didn\'t want to own. His wife Linda just wanted him to come home. Mike wanted to be famous.',
    image: '/images/mike-mackay.png',
    imagePosition: 'center 30%',
    textSide: 'left',
  },
  {
    name: 'RON KISTLER',
    role: 'The Quiet Warrior',
    roleColor: '#8899AA',
    quote: '"Due to the high cost of living, I may never be able to purchase a home of my own."',
    bio: 'Ron Kistler was 25, a house painter who picked up trucking shifts when he could find them. Quiet. Stubborn. He had a piece of land, a girl named Sue, and no way to build a life with either one.',
    image: '/images/ron-kistler.png',
    imagePosition: 'center 20%',
    textSide: 'right',
    flipImage: true,
  },
  {
    name: 'DALTON YOUNG',
    role: 'The Telepath',
    roleColor: '#C4713B',
    quote: '"I could live indefinitely on a billboard."',
    bio: 'His mother entered him while he slept. Dalton was 22, an Army veteran fresh out of Korea, unemployed, doing karate in his underwear in his childhood bedroom. He didn\'t volunteer for this.',
    image: '/images/dalton-young.png',
    imagePosition: 'center 25%',
    textSide: 'left',
  },
  {
    name: 'MATT KRASJA',
    role: 'The Marketer',
    roleColor: '#D4943A',
    quote: '"Part publicity stunt, part social experiment, part act of accidental cruelty."',
    bio: 'WSAN\'s marketing director and the man who dreamed the whole thing up. He wore the fanciest suit an AM radio salary could buy, convinced Fulmer to green-light it, and when it spiraled out of control, he was the one who had to explain why on national television.',
    image: '/images/matt-krasja.png',
    imagePosition: 'center 25%',
    textSide: 'right',
  },
  {
    name: 'HAROLD FULMER',
    role: 'The McMillionaire',
    roleColor: '#667788',
    quote: '"He didn\'t believe in handouts. He believed in hand-ups."',
    bio: 'Harold Fulmer drove a 1937 Rolls-Royce Phantom III, wore a ten-gallon hat, and owned WSAN. A self-made millionaire who believed these three men should earn their home the same way he earned his.',
    image: '/images/harold-fulmer.png',
    imagePosition: 'center 30%',
    textSide: 'left',
  },
];

export default function ContestantsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contestantSlice = 1 / CONTESTANTS.length;

  return (
    <div
      ref={containerRef}
      id="men"
      style={{
        height: `${CONTESTANTS.length * 110}vh`,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'var(--color-bg)',
        }}
      >
        {CONTESTANTS.map((person, i) => {
          const sliceStart = i * contestantSlice;
          const sliceEnd = (i + 1) * contestantSlice;
          const sliceDuration = sliceEnd - sliceStart;

          const imgIn = phaseValue(progress, sliceStart, sliceStart + sliceDuration * 0.15);
          const imgOut = i < CONTESTANTS.length - 1
            ? 1 - phaseValue(progress, sliceEnd - sliceDuration * 0.2, sliceEnd)
            : 1 - phaseValue(progress, sliceEnd - sliceDuration * 0.25, sliceEnd);
          const imgOpacity = Math.min(imgIn, imgOut);

          const txtIn = phaseValue(progress, sliceStart + sliceDuration * 0.05, sliceStart + sliceDuration * 0.2);
          const txtOut = i < CONTESTANTS.length - 1
            ? 1 - phaseValue(progress, sliceEnd - sliceDuration * 0.25, sliceEnd - sliceDuration * 0.05)
            : 1 - phaseValue(progress, sliceEnd - sliceDuration * 0.3, sliceEnd - sliceDuration * 0.05);
          const txtOpacity = Math.min(txtIn, txtOut);

          const txtExitProgress = phaseValue(progress, sliceEnd - sliceDuration * 0.25, sliceEnd - sliceDuration * 0.05);
          const txtTranslateY = -txtExitProgress * 40;

          const nameShow = phaseValue(progress, sliceStart + sliceDuration * 0.05, sliceStart + sliceDuration * 0.15);
          const roleShow = person.role ? phaseValue(progress, sliceStart + sliceDuration * 0.07, sliceStart + sliceDuration * 0.17) : 1;
          const quoteShow = phaseValue(progress, sliceStart + sliceDuration * 0.10, sliceStart + sliceDuration * 0.20);
          const bioShow = phaseValue(progress, sliceStart + sliceDuration * 0.15, sliceStart + sliceDuration * 0.25);
          const barShow = phaseValue(progress, sliceStart + sliceDuration * 0.08, sliceStart + sliceDuration * 0.18);

          if (imgOpacity <= 0 && txtOpacity <= 0) return null;

          const isRight = person.textSide === 'right';

          return (
            <div key={person.name} style={{ position: 'absolute', inset: 0 }}>
              {/* Full-bleed portrait - image only, may be flipped */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${person.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: person.imagePosition,
                  opacity: imgOpacity * 0.7,
                  transform: person.flipImage ? 'scaleX(-1)' : 'none',
                }}
              />
              {/* Overlays - not flipped */}
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: imgOpacity > 0 ? 1 : 0 }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: isRight
                    ? 'linear-gradient(270deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.2) 100%)'
                    : 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.2) 100%)',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.4) 100%)' }} />
                <div className="film-grain" />
              </div>

              {/* Text overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isRight ? 'flex-end' : 'flex-start',
                  justifyContent: 'center',
                  padding: 'clamp(32px, 6vw, 80px)',
                  paddingRight: isRight ? 'clamp(48px, 12vw, 200px)' : 'clamp(32px, 6vw, 80px)',
                  opacity: txtOpacity,
                  transform: `translateY(${txtTranslateY}px)`,
                  textAlign: isRight ? 'right' : 'left',
                }}
              >
                <div style={{ maxWidth: '480px' }}>
                  {/* Name */}
                  <h3
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: 'clamp(36px, 7vw, 72px)',
                      color: '#E8DCC8',
                      letterSpacing: '0.06em',
                      lineHeight: 1.1,
                      marginBottom: person.role ? '4px' : '12px',
                      opacity: nameShow,
                      transform: `translateY(${(1 - nameShow) * 20}px)`,
                    }}
                  >
                    {person.name}
                  </h3>

                  {/* Role (if present) */}
                  {person.role && (
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 'clamp(11px, 1.2vw, 14px)',
                        fontWeight: 500,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: person.roleColor,
                        marginBottom: '12px',
                        opacity: roleShow,
                        transform: `translateY(${(1 - roleShow) * 10}px)`,
                      }}
                    >
                      {person.role}
                    </p>
                  )}

                  {/* Tri-bar */}
                  <div
                    className="tri-bar"
                    style={{
                      width: '60px',
                      marginBottom: '20px',
                      opacity: barShow * 0.8,
                      transform: `scaleX(${barShow})`,
                      transformOrigin: isRight ? 'right' : 'left',
                      marginLeft: isRight ? 'auto' : 0,
                    }}
                  />

                  {/* Entry quote */}
                  <p
                    style={{
                      fontFamily: "'Crimson Pro', serif",
                      fontStyle: 'italic',
                      fontSize: 'clamp(18px, 2.5vw, 24px)',
                      color: person.roleColor,
                      lineHeight: 1.4,
                      marginBottom: '24px',
                      textShadow: '0 1px 8px rgba(0,0,0,0.5)',
                      opacity: quoteShow,
                      transform: `translateY(${(1 - quoteShow) * 12}px)`,
                    }}
                  >
                    {person.quote}
                  </p>

                  {/* Bio */}
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 'clamp(16px, 1.6vw, 18px)',
                      color: '#E8DCC8',
                      lineHeight: 1.8,
                      opacity: bioShow * 0.85,
                      transform: `translateY(${(1 - bioShow) * 12}px)`,
                    }}
                  >
                    {person.bio}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
