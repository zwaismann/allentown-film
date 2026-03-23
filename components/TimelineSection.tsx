'use client';

import { useEffect, useRef, useState } from 'react';

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
  {
    day: 'DAY 1',
    text: 'Three men climb a billboard above Route 22.',
    image: '/images/timeline-day1.png',
    imagePosition: 'center 40%',
    side: 'left',
  },
  {
    day: 'DAY 15',
    text: 'Nobody comes down. The station figured it would be over by now.',
    image: '/images/timeline-day15.png',
    imagePosition: 'center 30%',
    side: 'right',
  },
  {
    day: 'DAY 67',
    text: 'The Wall Street Journal puts the story on the front page.',
    image: '/images/timeline-wsj.png',
    imagePosition: 'center 20%',
    side: 'left',
  },
  {
    day: 'DAY 71',
    text: 'Billy Joel releases "Allentown."',
    image: '/images/timeline-billy-joel.png',
    imagePosition: 'center 30%',
    side: 'right',
  },
  {
    day: 'DAY 86',
    text: 'A record blizzard. Three strangers huddle in one tent to survive.',
    image: '/images/timeline-blizzard.png',
    imagePosition: 'center 40%',
    side: 'left',
  },
  {
    day: 'DAY 96',
    text: 'Christmas on the billboard.',
    image: '/images/timeline-christmas.png',
    imagePosition: 'center 30%',
    side: 'right',
  },
  {
    day: 'DAY 158',
    text: 'Phil Donahue calls. Japanese news crews arrive.',
    image: '/images/timeline-media.png',
    imagePosition: 'center 30%',
    side: 'left',
  },
  {
    day: 'DAY 196',
    text: 'Dalton Young is arrested and removed.',
    image: '/images/timeline-dalton-arrested.png',
    imagePosition: 'center 20%',
    accent: true,
    side: 'right',
  },
  {
    day: 'DAY 260',
    text: 'Two men remain. One makes a decision.',
    image: '/images/timeline-two-men.png',
    imagePosition: 'center 30%',
    side: 'left',
  },
  {
    day: 'DAY 261',
    text: 'It ends the way no one expected.',
    image: '/images/timeline-end.png',
    imagePosition: 'center 30%',
    accent: true,
    side: 'right',
  },
];

export default function TimelineSection() {
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

  // Phases:
  // 0.00 - 0.06: "Nobody expected it to last..." fades in/out
  // 0.05 - 0.82: beats scroll through (images + text float up like the recession images)
  // 0.82 - 0.95: closing quote

  const openShow = phaseValue(progress, 0.0, 0.03);
  const openExit = phaseValue(progress, 0.03, 0.06);
  const openOpacity = openShow * (1 - easeInOutCubic(openExit));

  const beatsStart = 0.05;
  const beatsEnd = 0.85;
  const beatsDuration = beatsEnd - beatsStart;

  const closingShow = phaseValue(progress, 0.87, 0.95);

  // Center line + dot opacity: smooth fade in/out
  const lineIn = phaseValue(progress, 0.05, 0.10);
  const lineOut = 1 - phaseValue(progress, 0.83, 0.87);
  const lineOpacity = Math.min(lineIn, lineOut) * 0.25;

  return (
    <div
      ref={containerRef}
      id="timeline"
      style={{
        height: '380vh',
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
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 50% 50%, rgba(44,62,80,${lineOpacity * 0.4}) 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Center timeline line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '10%',
            bottom: '10%',
            width: '1px',
            background: 'linear-gradient(180deg, transparent 0%, #667788 15%, #667788 85%, transparent 100%)',
            opacity: lineOpacity,
            transform: 'translateX(-50%)',
          }}
        />

        {/* Glowing dot on center line */}
        <div
          className="timeline-dot"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(135deg, #E84B2B, #D4943A)',
            opacity: lineOpacity > 0 ? 0.8 : 0,
          }}
        />

        {/* Opening text */}
        {openOpacity > 0 && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px', textAlign: 'center' }}>
            <p style={{
              fontFamily: "'Crimson Pro', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(22px, 3.5vw, 32px)',
              color: '#E8DCC8',
              letterSpacing: '0.04em',
              lineHeight: 1.5,
              maxWidth: '680px',
              opacity: openOpacity,
              transform: `translateY(${(1 - openShow) * 15}px)`,
            }}>
              Nobody expected it to last.
            </p>
          </div>
        )}

        {/* Scrolling beats - images and text float up, alternating sides */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {BEATS.map((beat, i) => {
            const totalBeats = BEATS.length;
            const beatSlice = 1 / totalBeats;
            const beatStart = i * beatSlice * 0.75;
            const beatDur = beatSlice * 1.4;
            const beatProgress = Math.min(1, Math.max(0,
              ((progress - beatsStart) / beatsDuration - beatStart) / beatDur
            ));

            // Y position: enter from bottom, travel up, exit top
            const yPercent = (1 - beatProgress * 2) * 100;

            const fadeIn = Math.min(1, beatProgress * 4);
            const fadeOut = Math.min(1, (1 - beatProgress) * 4);
            const opacity = Math.min(fadeIn, fadeOut);

            if (opacity <= 0) return null;

            const isLeft = beat.side === 'left';

            // Subtle horizontal drift: starts offset, settles into position
            const hDrift = (1 - Math.min(1, beatProgress * 3)) * (isLeft ? -12 : 12);

            return (
              <div
                key={beat.day}
                style={{
                  position: 'absolute',
                  left: isLeft ? 'auto' : 'calc(50% + 32px)',
                  right: isLeft ? 'calc(50% + 32px)' : 'auto',
                  top: '50%',
                  width: 'min(36vw, 380px)',
                  transform: `translate(${hDrift}px, calc(-50% + ${yPercent}%))`,
                  opacity,
                  willChange: 'transform, opacity',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  textAlign: isLeft ? 'right' : 'left',
                }}
              >
                {/* Image (if present) */}
                {beat.image && (
                  <div
                    style={{
                      width: '100%',
                      height: 'min(26vh, 200px)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${beat.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: beat.imagePosition || 'center',
                    }} />
                    <div className="film-grain" />
                    <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(196,113,59,0.06) 0%, transparent 50%, rgba(232,75,43,0.04) 100%)' }} />
                  </div>
                )}

                {/* Day + text */}
                <div>
                  <p style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: 'clamp(18px, 2.8vw, 26px)',
                    color: beat.accent ? '#E84B2B' : '#D4943A',
                    letterSpacing: '0.06em',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}>
                    {beat.day}
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'clamp(14px, 1.4vw, 16px)',
                    color: '#E8DCC8',
                    lineHeight: 1.7,
                    opacity: 0.85,
                  }}>
                    {beat.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing quote */}
        {closingShow > 0 && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
            <p style={{
              fontFamily: "'Crimson Pro', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(20px, 3vw, 28px)',
              color: '#E8DCC8',
              letterSpacing: '0.04em',
              lineHeight: 1.5,
              maxWidth: '680px',
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
