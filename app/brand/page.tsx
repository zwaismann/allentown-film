'use client';

import { useCallback } from 'react';

/* ─── Brand Data ─── */

const COLORS = [
  { name: 'Midnight', hex: '#0D0F12', usage: 'Primary background, headers, dark surfaces' },
  { name: 'Cream', hex: '#E8DCC8', usage: 'Primary text, titles on dark backgrounds' },
  { name: 'Rust Red', hex: '#E84B2B', usage: 'Accent, emphasis, danger states, tri-bar left' },
  { name: 'Rust', hex: '#C4713B', usage: 'Secondary accent, tri-bar center' },
  { name: 'Amber', hex: '#D4943A', usage: 'Primary accent, CTAs, highlights, tri-bar right' },
  { name: 'Slate', hex: '#8899AA', usage: 'Muted text, labels, secondary information' },
  { name: 'Steel', hex: '#667788', usage: 'Tertiary text, subtle borders, captions' },
];

const FONTS = [
  {
    name: 'Anton',
    category: 'Display / Headlines',
    usage: 'All section headings, the ALLENTOWN wordmark, large display text. Always uppercase with 0.04-0.06em letter-spacing.',
    sample: 'ALLENTOWN',
    css: "font-family: 'Anton', sans-serif; text-transform: uppercase; letter-spacing: 0.06em;",
  },
  {
    name: 'DM Sans',
    category: 'Body / UI',
    usage: 'Body text, labels, buttons, navigation, captions. Weights 300-700. Default size 15-17px with 1.7-1.8 line-height.',
    sample: 'Three men. A billboard. And the American Dream.',
    css: "font-family: 'DM Sans', sans-serif; font-size: 17px; line-height: 1.75;",
  },
  {
    name: 'Crimson Pro',
    category: 'Editorial / Quotes',
    usage: 'Pull quotes, the logline, editorial italic text. Always italic. Use for storytelling moments, not UI.',
    sample: 'In 1982, a radio competition offered desperate locals the chance to win a home by living on a billboard.',
    css: "font-family: 'Crimson Pro', serif; font-style: italic;",
  },
];

const LOGO_VARIANTS = [
  { name: 'White on Transparent', file: 'allentown-white', bg: '#0D0F12', textColor: '#fff', desc: 'For dark backgrounds, social media, presentations' },
  { name: 'Black on Transparent', file: 'allentown-black', bg: '#f5f3f0', textColor: '#1a1a1a', desc: 'For light backgrounds, print, letterhead' },
  { name: 'Cream on Transparent', file: 'allentown-cream', bg: '#0D0F12', textColor: '#E8DCC8', desc: 'Primary brand color on dark backgrounds' },
  { name: 'Amber on Transparent', file: 'allentown-amber', bg: '#0D0F12', textColor: '#D4943A', desc: 'Accent version, investor materials, highlights' },
  { name: 'Tri-Color with Bar', file: 'allentown-tricolor', bg: '#0D0F12', textColor: '#E8DCC8', desc: 'Full brand lockup with signature tri-color bar' },
];

/* ─── Styles ─── */

const S = {
  heading: {
    fontFamily: "'Anton', sans-serif",
    fontSize: 'clamp(28px, 4vw, 44px)',
    letterSpacing: '0.04em',
    color: '#D4943A',
    marginBottom: '24px',
    textTransform: 'uppercase' as const,
  },
  subheading: {
    fontFamily: "'Anton', sans-serif",
    fontSize: 'clamp(18px, 2.5vw, 24px)',
    letterSpacing: '0.04em',
    color: '#E8DCC8',
    marginBottom: '16px',
    textTransform: 'uppercase' as const,
  },
  body: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'clamp(15px, 1.5vw, 17px)',
    color: '#E8DCC8',
    lineHeight: 1.8,
    opacity: 0.9,
  },
  muted: {
    color: '#8899AA',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 'clamp(12px, 1.2vw, 14px)',
  },
  section: {
    maxWidth: '960px',
    width: '100%',
    margin: '0 auto',
    padding: 'clamp(60px, 10vh, 100px) 24px',
  } as React.CSSProperties,
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px',
  },
};

/* ─── Page ─── */

export default function BrandGuidePage() {
  const downloadPNG = useCallback((color: string, name: string, includeBar = false) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1600;
    canvas.height = includeBar ? 320 : 240;

    // Transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw text using Anton font
    ctx.font = '180px Anton';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '0.06em';
    ctx.fillText('ALLENTOWN', canvas.width / 2, includeBar ? 120 : canvas.height / 2);

    // Draw tri-color bar if needed
    if (includeBar) {
      const barY = 230;
      const barW = 200;
      const barH = 8;
      const startX = (canvas.width - barW * 3) / 2;
      ctx.fillStyle = '#E84B2B';
      ctx.fillRect(startX, barY, barW, barH);
      ctx.fillStyle = '#C4713B';
      ctx.fillRect(startX + barW, barY, barW, barH);
      ctx.fillStyle = '#D4943A';
      ctx.fillRect(startX + barW * 2, barY, barW, barH);
    }

    const link = document.createElement('a');
    link.download = `${name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  const downloadBar = useCallback((variant: 'thick' | 'thin') => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barH = variant === 'thick' ? 16 : 8;
    canvas.width = 1200;
    canvas.height = barH;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const segW = canvas.width / 3;
    ctx.fillStyle = '#E84B2B';
    ctx.fillRect(0, 0, segW, barH);
    ctx.fillStyle = '#C4713B';
    ctx.fillRect(segW, 0, segW, barH);
    ctx.fillStyle = '#D4943A';
    ctx.fillRect(segW * 2, 0, segW, barH);

    const link = document.createElement('a');
    link.download = `allentown-tricolor-bar-${variant}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* ──── HEADER ──── */}
      <header style={{
        textAlign: 'center',
        padding: 'clamp(80px, 15vh, 140px) 24px clamp(40px, 8vh, 80px)',
      }}>
        <p style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: 'clamp(48px, 8vw, 80px)',
          letterSpacing: '0.06em',
          color: '#E8DCC8',
          marginBottom: '8px',
        }}>
          ALLENTOWN
        </p>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '0',
          marginBottom: '24px',
        }}>
          <div style={{ width: '40px', height: '3px', background: '#E84B2B', borderRadius: '2px' }} />
          <div style={{ width: '40px', height: '3px', background: '#C4713B', borderRadius: '2px' }} />
          <div style={{ width: '40px', height: '3px', background: '#D4943A', borderRadius: '2px' }} />
        </div>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 500,
          letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8899AA',
        }}>
          Brand Guidelines
        </p>
      </header>

      {/* ──── OVERVIEW ──── */}
      <section style={S.section}>
        <p style={S.heading}>Brand Overview</p>
        <p style={{ ...S.body, marginBottom: '24px' }}>
          The Allentown brand is built on a cinematic, steel-town aesthetic rooted in the film's 1982 period setting
          and blue-collar themes. The visual language is dark, warm, and textured - evoking rust belt industry,
          weathered Americana, and the grit of working-class perseverance.
        </p>
        <p style={{ ...S.body, marginBottom: '24px' }}>
          All materials - pitch decks, investor documents, social media, press kits, and marketing collateral -
          should maintain this visual identity. The brand should feel <strong style={{ color: '#E8DCC8' }}>cinematic,
          confident, and grounded</strong>, never flashy or overly polished.
        </p>

        <div style={{ ...S.card, padding: '24px', marginTop: '32px' }}>
          <p style={{ ...S.subheading, fontSize: '16px', marginBottom: '12px' }}>Key Principles</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'Dark backgrounds with warm, muted text - never white backgrounds with black text for brand materials',
              'Typography-driven design - let the Anton wordmark and clean type do the heavy lifting',
              'The tri-color bar (red, rust, amber) is the signature brand element - use it as a divider or accent',
              'Imagery should feel archival, textured, period-authentic - avoid modern stock photography',
              'Restraint over excess - negative space, minimal decoration, confidence in simplicity',
            ].map((principle, i) => (
              <p key={i} style={{ ...S.body, fontSize: '14px', paddingLeft: '16px', borderLeft: '2px solid rgba(212,148,58,0.3)' }}>
                {principle}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ──── COLOR PALETTE ──── */}
      <section style={S.section}>
        <p style={S.heading}>Color Palette</p>
        <p style={{ ...S.body, marginBottom: '32px' }}>
          The palette draws from steel mills, rust, and amber light - the visual texture of 1980s industrial
          Pennsylvania. Dark midnight backgrounds provide depth, while warm cream text and amber accents
          create contrast and hierarchy.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {COLORS.map((color) => (
            <div key={color.hex} style={{ ...S.card, overflow: 'hidden' }}>
              <div style={{
                height: '80px',
                background: color.hex,
                border: color.hex === '#0D0F12' ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }} />
              <div style={{ padding: '16px' }}>
                <p style={{
                  fontFamily: "'Anton', sans-serif", fontSize: '16px',
                  color: '#E8DCC8', letterSpacing: '0.04em', marginBottom: '2px',
                }}>
                  {color.name}
                </p>
                <p style={{
                  fontFamily: "'DM Sans', monospace", fontSize: '13px',
                  color: '#D4943A', marginBottom: '8px', fontWeight: 600,
                }}>
                  {color.hex}
                </p>
                <p style={{ ...S.muted, lineHeight: 1.4 }}>{color.usage}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '32px' }}>
          <p style={{ ...S.subheading, fontSize: '16px', marginBottom: '12px' }}>Tri-Color Bar</p>
          <p style={{ ...S.body, fontSize: '14px', marginBottom: '16px' }}>
            The signature tri-color gradient bar is used as a section divider and brand accent throughout all materials.
            It runs left to right: Rust Red, Rust, Amber. Available in thick (4px) and thin (2px) variants.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '0' }}>
                <div style={{ width: '80px', height: '4px', background: '#E84B2B', borderRadius: '2px 0 0 2px' }} />
                <div style={{ width: '80px', height: '4px', background: '#C4713B' }} />
                <div style={{ width: '80px', height: '4px', background: '#D4943A', borderRadius: '0 2px 2px 0' }} />
              </div>
              <p style={{ ...S.muted, flex: 1 }}>Thick variant - section headers, major dividers</p>
              <button
                onClick={() => downloadBar('thick')}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '6px 12px', borderRadius: '4px',
                  border: '1px solid rgba(212,148,58,0.5)',
                  background: 'transparent', color: '#D4943A', cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                Download PNG
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '0' }}>
                <div style={{ width: '60px', height: '2px', background: '#E84B2B', borderRadius: '1px 0 0 1px' }} />
                <div style={{ width: '60px', height: '2px', background: '#C4713B' }} />
                <div style={{ width: '60px', height: '2px', background: '#D4943A', borderRadius: '0 1px 1px 0' }} />
              </div>
              <p style={{ ...S.muted, flex: 1 }}>Thin variant - subsection dividers, subtle accents</p>
              <button
                onClick={() => downloadBar('thin')}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '6px 12px', borderRadius: '4px',
                  border: '1px solid rgba(212,148,58,0.5)',
                  background: 'transparent', color: '#D4943A', cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                Download PNG
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ──── TYPOGRAPHY ──── */}
      <section style={S.section}>
        <p style={S.heading}>Typography</p>
        <p style={{ ...S.body, marginBottom: '32px' }}>
          Three typefaces form the typographic system. Each serves a distinct purpose - do not interchange them.
          All fonts are available via Google Fonts.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {FONTS.map((font) => (
            <div key={font.name} style={{ ...S.card, padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px', flexWrap: 'wrap', gap: '8px' }}>
                <p style={{
                  fontFamily: "'Anton', sans-serif", fontSize: '20px',
                  color: '#E8DCC8', letterSpacing: '0.04em',
                }}>
                  {font.name}
                </p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4943A',
                }}>
                  {font.category}
                </p>
              </div>
              <p style={{ ...S.body, fontSize: '14px', marginBottom: '16px' }}>{font.usage}</p>
              <div style={{
                padding: '20px', borderRadius: '4px',
                background: 'rgba(255,255,255,0.02)',
                borderLeft: '3px solid rgba(212,148,58,0.3)',
              }}>
                <p style={{
                  fontFamily: font.name === 'Anton' ? "'Anton', sans-serif" :
                    font.name === 'DM Sans' ? "'DM Sans', sans-serif" : "'Crimson Pro', serif",
                  fontStyle: font.name === 'Crimson Pro' ? 'italic' : 'normal',
                  textTransform: font.name === 'Anton' ? 'uppercase' : 'none',
                  letterSpacing: font.name === 'Anton' ? '0.06em' : 'normal',
                  fontSize: font.name === 'Anton' ? '32px' : font.name === 'Crimson Pro' ? '20px' : '17px',
                  color: '#E8DCC8',
                  lineHeight: 1.6,
                } as React.CSSProperties}>
                  {font.sample}
                </p>
              </div>
              <p style={{
                fontFamily: "'DM Sans', monospace", fontSize: '12px',
                color: '#667788', marginTop: '12px',
              }}>
                {font.css}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ──── BEST PRACTICES ──── */}
      <section style={S.section}>
        <p style={S.heading}>Best Practices</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ ...S.card, padding: '28px' }}>
            <p style={S.subheading}>Pitch Decks & Presentations</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Use the Midnight (#0D0F12) background for all slides',
                'Anton for slide titles, DM Sans for body content',
                'One idea per slide - let images and typography breathe',
                'Use the tri-color bar as a consistent footer or header element',
                'Film stills and archival photography should feel desaturated, warm-toned',
                'Budget/financial slides use amber for key numbers, slate for supporting data',
                'End every deck with the ALLENTOWN wordmark + tri-color bar lockup',
              ].map((item, i) => (
                <p key={i} style={{ ...S.body, fontSize: '14px', paddingLeft: '16px', borderLeft: '2px solid rgba(212,148,58,0.2)' }}>
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div style={{ ...S.card, padding: '28px' }}>
            <p style={S.subheading}>Investor Documents</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'The executive summary (website) uses the dark cinematic treatment',
                'The full business plan uses a clean white background for print/PDF readability',
                'Both share the same typography (Anton/DM Sans/Crimson Pro) and data',
                'Financial tables use a dark header row (#2C3E50) with clean borders',
                'Key metrics always in amber (#D4943A) - ROI, revenue, budget totals',
                'Include the CONFIDENTIAL designation on all investor materials',
                'Legal disclaimers in small muted text at document close',
              ].map((item, i) => (
                <p key={i} style={{ ...S.body, fontSize: '14px', paddingLeft: '16px', borderLeft: '2px solid rgba(212,148,58,0.2)' }}>
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div style={{ ...S.card, padding: '28px' }}>
            <p style={S.subheading}>Social Media & Press</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Profile images: ALLENTOWN wordmark in cream on midnight background',
                'Cover images: billboard photography with the warm amber/rust color grade',
                'Post graphics: dark backgrounds, Anton headlines, DM Sans body text',
                'Hashtag: #AllentownFilm',
                'Tone of voice: confident, grounded, working-class authentic - not Hollywood glossy',
                'Behind-the-scenes content should feel raw, documentary-style',
                'Period-appropriate imagery only - no modern anachronisms',
              ].map((item, i) => (
                <p key={i} style={{ ...S.body, fontSize: '14px', paddingLeft: '16px', borderLeft: '2px solid rgba(212,148,58,0.2)' }}>
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div style={{ ...S.card, padding: '28px' }}>
            <p style={S.subheading}>Do's and Don'ts</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <p style={{ ...S.muted, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4943A', marginBottom: '12px' }}>Do</p>
                {[
                  'Use dark backgrounds with warm text',
                  'Let typography and negative space lead',
                  'Use the tri-color bar consistently',
                  'Keep imagery desaturated and warm',
                  'Maintain generous whitespace',
                  'Use the Anton wordmark at full width',
                ].map((item, i) => (
                  <p key={i} style={{ ...S.body, fontSize: '13px', marginBottom: '6px' }}>{item}</p>
                ))}
              </div>
              <div>
                <p style={{ ...S.muted, fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#E84B2B', marginBottom: '12px' }}>Don't</p>
                {[
                  'Use bright or neon colors',
                  'Set the wordmark in lowercase',
                  'Use modern stock photography',
                  'Add drop shadows or gradients to text',
                  'Use more than 3 fonts',
                  'Stretch or distort the wordmark',
                ].map((item, i) => (
                  <p key={i} style={{ ...S.body, fontSize: '13px', marginBottom: '6px', opacity: 0.7 }}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── LOGO DOWNLOADS ──── */}
      <section style={{ ...S.section, paddingBottom: 'clamp(80px, 12vh, 140px)' }}>
        <p style={S.heading}>Logo Downloads</p>
        <p style={{ ...S.body, marginBottom: '32px' }}>
          Download the ALLENTOWN wordmark as PNG with transparent background.
          Use the appropriate variant for your background.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {LOGO_VARIANTS.map((variant) => (
            <div key={variant.file} style={{
              ...S.card,
              overflow: 'hidden',
            }}>
              {/* Preview - rendered in HTML with actual Anton font */}
              <div style={{
                background: variant.bg,
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <p style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 'clamp(36px, 6vw, 64px)',
                  letterSpacing: '0.06em',
                  color: variant.textColor,
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}>
                  ALLENTOWN
                </p>
                {variant.file === 'allentown-tricolor' && (
                  <div style={{ display: 'flex', gap: '0', marginTop: '12px' }}>
                    <div style={{ width: '40px', height: '4px', background: '#E84B2B', borderRadius: '2px 0 0 2px' }} />
                    <div style={{ width: '40px', height: '4px', background: '#C4713B' }} />
                    <div style={{ width: '40px', height: '4px', background: '#D4943A', borderRadius: '0 2px 2px 0' }} />
                  </div>
                )}
              </div>
              {/* Info + Download */}
              <div style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}>
                <div>
                  <p style={{
                    fontFamily: "'Anton', sans-serif", fontSize: '16px',
                    color: '#E8DCC8', letterSpacing: '0.04em', marginBottom: '2px',
                  }}>
                    {variant.name}
                  </p>
                  <p style={S.muted}>{variant.desc}</p>
                </div>
                <button
                  onClick={() => downloadPNG(
                    variant.textColor,
                    `allentown-${variant.file}`,
                    variant.file === 'allentown-tricolor'
                  )}
                  style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '10px 20px', borderRadius: '4px',
                    border: '1px solid rgba(212,148,58,0.5)',
                    background: 'transparent',
                    color: '#D4943A', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Download PNG
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tri-Color Bar Downloads */}
        <p style={{ ...S.subheading, marginTop: '48px', marginBottom: '16px' }}>Tri-Color Bar</p>

        {(['thick', 'thin'] as const).map((variant) => (
          <div key={variant} style={{
            ...S.card,
            overflow: 'hidden',
            marginBottom: '16px',
          }}>
            <div style={{
              background: '#0D0F12',
              padding: '40px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', gap: '0' }}>
                <div style={{ width: variant === 'thick' ? '120px' : '100px', height: variant === 'thick' ? '6px' : '3px', background: '#E84B2B', borderRadius: variant === 'thick' ? '3px 0 0 3px' : '1.5px 0 0 1.5px' }} />
                <div style={{ width: variant === 'thick' ? '120px' : '100px', height: variant === 'thick' ? '6px' : '3px', background: '#C4713B' }} />
                <div style={{ width: variant === 'thick' ? '120px' : '100px', height: variant === 'thick' ? '6px' : '3px', background: '#D4943A', borderRadius: variant === 'thick' ? '0 3px 3px 0' : '0 1.5px 1.5px 0' }} />
              </div>
            </div>
            <div style={{
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}>
              <div>
                <p style={{
                  fontFamily: "'Anton', sans-serif", fontSize: '16px',
                  color: '#E8DCC8', letterSpacing: '0.04em', marginBottom: '2px',
                }}>
                  {variant === 'thick' ? 'Thick Bar' : 'Thin Bar'}
                </p>
                <p style={S.muted}>
                  {variant === 'thick' ? 'Section headers, major dividers' : 'Subsection dividers, subtle accents'}
                </p>
              </div>
              <button
                onClick={() => downloadBar(variant)}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '10px 20px', borderRadius: '4px',
                  border: '1px solid rgba(212,148,58,0.5)',
                  background: 'transparent',
                  color: '#D4943A', cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Download PNG
              </button>
            </div>
          </div>
        ))}

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '0', marginBottom: '16px',
          }}>
            <div style={{ width: '30px', height: '2px', background: '#E84B2B', borderRadius: '1px 0 0 1px' }} />
            <div style={{ width: '30px', height: '2px', background: '#C4713B' }} />
            <div style={{ width: '30px', height: '2px', background: '#D4943A', borderRadius: '0 1px 1px 0' }} />
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
            color: '#667788',
          }}>
            Allentown Film Company - Brand Guidelines
            <br />
            Questions? <a href="mailto:info@allentownfilm.com" style={{ color: '#D4943A', textDecoration: 'none' }}>info@allentownfilm.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
