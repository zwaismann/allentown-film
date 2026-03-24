'use client';

import { useEffect, useRef, useState } from 'react';
import useIsMobile from './useIsMobile';

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function phaseValue(progress: number, start: number, end: number): number {
  const raw = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return easeOutCubic(raw);
}

interface TimelineBeat {
  day: string;
  text: string;
  image?: string;
  imagePosition?: string;
  accent?: boolean;
  side: 'left' | 'right';
}

const BEATS: TimelineBeat[] = [
  { day: 'DAY 1', text: 'Three men climb a billboard above Route 22.', image: '/images/timeline-day1.webp', imagePosition: 'center 40%', side: 'left' },
  { day: 'DAY 15', text: 'Nobody comes down. The station figured it would be over by now.', image: '/images/timeline-day15.webp', imagePosition: 'center 30%', side: 'right' },
  { day: 'DAY 67', text: 'The Wall Street Journal puts the story on the front page.', image: '/images/timeline-wsj.webp', imagePosition: 'center 20%', side: 'left' },
  { day: 'DAY 71', text: 'Billy Joel releases "Allentown."', image: '/images/timeline-billy-joel.webp', imagePosition: 'center 30%', side: 'right' },
  { day: 'DAY 86', text: 'A record blizzard. Three strangers huddle in one tent to survive.', image: '/images/timeline-blizzard.webp', imagePosition: 'center 40%', side: 'left' },
  { day: 'DAY 96', text: 'Christmas on the billboard.', image: '/images/timeline-christmas.webp', imagePosition: 'center 30%', side: 'right' },
  { day: 'DAY 158', text: 'Phil Donahue calls. Japanese news crews arrive.', image: '/images/timeline-media.webp', imagePosition: 'center 30%', side: 'left' },
  { day: 'DAY 196', text: 'Dalton Young is arrested and removed.', image: '/images/timeline-dalton-arrested.webp', imagePosition: 'center 20%', accent: true, side: 'right' },
  { day: 'DAY 260', text: 'Two men remain. One makes a decision.', image: '/images/timeline-two-men.webp', imagePosition: 'center 30%', side: 'left' },
  { day: 'DAY 261', text: 'It ends the way no one expected.', image: '/images/timeline-end.webp', imagePosition: 'center 30%', accent: true, side: 'right' },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

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

  // Phases:
  // 0.00 - 0.05: "NOBODY EXPECTED IT TO LAST" fades in as full-page headline
  // 0.05 - 0.14: headline holds at full opacity (breathing room)
  // 0.14 - 0.80: beats scroll through OVER the headline (headline dims to bg)
  // 0.80 - 0.88: headline transforms into closing quote
  // 0.88 - 1.00: closing quote holds

  const headlineShow = phaseValue(progress, 0.0, 0.05);
  // Headline dims when beats start scrolling over it
  const headlineDim = phaseValue(progress, 0.14, 0.20);
  const headlineOpacity = headlineShow * (1 - headlineDim * 0.85); // dims to 15%
  // Headline fully fades when closing quote appears
  const headlineFadeOut = phaseValue(progress, 0.78, 0.85);

  const beatsStart = 0.14;
  const beatsEnd = 0.82;
  const beatsDuration = beatsEnd - beatsStart;

  // Closing quote replaces headline
  const closingShow = phaseValue(progress, 0.82, 0.90);

  // Center line visible during beats
  const lineIn = phaseValue(progress, 0.14, 0.20);
  const lineOut = 1 - phaseValue(progress, 0.78, 0.82);
  const lineOpacity = Math.min(lineIn, lineOut) * 0.25;

  return (
    <div
      ref={containerRef}
      id="timeline"
      style={{ height: '480vh', position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: `rgba(13, 15, 18, ${Math.min(1, progress * 10)})`,
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at 50% 50%, rgba(44,62,80,${lineOpacity * 0.4}) 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />

        {/* "NOBODY EXPECTED IT TO LAST" - full page headline, stays as background */}
        {(headlineOpacity > 0 || (headlineFadeOut < 1 && closingShow <= 0)) && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '0 clamp(24px, 5vw, 80px)',
            opacity: headlineFadeOut < 1 ? (headlineShow * (1 - headlineDim * 0.7)) * (1 - easeInOutCubic(headlineFadeOut)) : 0,
          }}>
            <h2 style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(36px, 7vw, 80px)',
              color: '#E8DCC8',
              letterSpacing: '0.06em',
              lineHeight: 1.15,
              textTransform: 'uppercase',
            }}>
              NOBODY EXPECTED<br />IT TO LAST.
            </h2>
          </div>
        )}

        {/* Center timeline line - hidden on mobile */}
        <div
          style={{
            position: 'absolute', left: '50%', top: '10%', bottom: '10%',
            width: '1px',
            background: 'linear-gradient(180deg, transparent 0%, #667788 15%, #667788 85%, transparent 100%)',
            opacity: isMobile ? 0 : lineOpacity, transform: 'translateX(-50%)',
          }}
        />

        {/* Glowing dot on center line - hidden on mobile */}
        <div
          className="timeline-dot"
          style={{
            position: 'absolute', left: '50%', top: '50%',
            width: '7px', height: '7px', borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #E84B2B, #D4943A)',
            opacity: isMobile ? 0 : (lineOpacity > 0 ? 0.8 : 0),
          }}
        />

        {/* Scrolling beats - float up over the headline */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 5 }}>
          {BEATS.map((beat, i) => {
            const totalBeats = BEATS.length;
            const beatSlice = 1 / totalBeats;
            const beatStart = i * beatSlice * 0.75;
            const beatDur = beatSlice * 1.4;
            const beatProgress = Math.min(1, Math.max(0,
              ((progress - beatsStart) / beatsDuration - beatStart) / beatDur
            ));

            const yPercent = (1 - beatProgress * 2) * 100;
            const fadeIn = Math.min(1, beatProgress * 4);
            const fadeOut = Math.min(1, (1 - beatProgress) * 4);
            const opacity = Math.min(fadeIn, fadeOut);

            if (opacity <= 0) return null;

            const isLeft = beat.side === 'left';
            const hDrift = isMobile ? 0 : (1 - Math.min(1, beatProgress * 3)) * (isLeft ? -12 : 12);

            return (
              <div
                key={beat.day}
                style={{
                  position: 'absolute',
                  ...(isMobile
                    ? { left: '24px', right: '24px', width: 'auto' }
                    : {
                        left: isLeft ? 'auto' : 'calc(50% + 32px)',
                        right: isLeft ? 'calc(50% + 32px)' : 'auto',
                        width: 'min(36vw, 380px)',
                      }
                  ),
                  top: '50%',
                  transform: `translate(${hDrift}px, calc(-50% + ${yPercent}%))`,
                  opacity, willChange: 'transform, opacity',
                  display: 'flex', flexDirection: 'column', gap: '14px',
                  textAlign: isMobile ? 'center' : (isLeft ? 'right' : 'left'),
                }}
              >
                {beat.image && (
                  <div style={{
                    width: '100%', height: 'min(26vh, 200px)',
                    borderRadius: '2px', overflow: 'hidden', position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: `url(${beat.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: beat.imagePosition || 'center',
                    }} />
                    <div className="film-grain" />
                    <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)' }} />
                  </div>
                )}

                <div>
                  <p style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 'clamp(18px, 2.8vw, 26px)',
                    color: beat.accent ? '#E84B2B' : '#D4943A',
                    letterSpacing: '0.06em', lineHeight: 1, marginBottom: '6px',
                  }}>
                    {beat.day}
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'clamp(14px, 1.4vw, 16px)',
                    color: '#E8DCC8', lineHeight: 1.7, opacity: 0.85,
                  }}>
                    {beat.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing quote - replaces headline */}
        {closingShow > 0 && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '0 clamp(24px, 5vw, 80px)',
          }}>
            <p style={{
              fontFamily: "'Crimson Pro', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(20px, 3vw, 28px)',
              color: '#E8DCC8',
              letterSpacing: '0.04em', lineHeight: 1.5, maxWidth: '720px',
              opacity: closingShow,
              transform: `translateY(${(1 - closingShow) * 15}px)`,
            }}>
              &ldquo;You can tell the story of the United States through that billboard contest.&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
