// Generate Open Graph images for each page
// Run: node scripts/generate-og.js
// Requires: npm install canvas (one-time)

const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;
const OUT_DIR = path.join(__dirname, '..', 'public', 'og');

// Try to register Anton font if available locally
try {
  // Check common paths for Anton
  const fontPaths = [
    path.join(__dirname, '..', 'public', 'fonts', 'Anton-Regular.ttf'),
    '/Users/zeevwaismann/Library/Fonts/Anton-Regular.ttf',
  ];
  for (const fp of fontPaths) {
    if (fs.existsSync(fp)) {
      registerFont(fp, { family: 'Anton' });
      break;
    }
  }
} catch (e) {
  console.log('Anton font not found locally, using fallback');
}

const PAGES = [
  {
    filename: 'og-home.png',
    bg: '#0D0F12',
    title: 'ALLENTOWN',
    subtitle: 'Three Men. A Billboard. And the American Dream.',
    label: '',
  },
  {
    filename: 'og-investors.png',
    bg: '#0D0F12',
    title: 'ALLENTOWN',
    subtitle: 'Executive Summary',
    label: 'FOR INVESTORS',
  },
  {
    filename: 'og-business-plan.png',
    bg: '#0D0F12',
    title: 'ALLENTOWN',
    subtitle: 'Business Plan',
    label: 'CONFIDENTIAL',
  },
  {
    filename: 'og-brand.png',
    bg: '#0D0F12',
    title: 'ALLENTOWN',
    subtitle: 'Brand Guidelines',
    label: '',
  },
];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

for (const page of PAGES) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = page.bg;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtle border
  ctx.strokeStyle = 'rgba(232, 220, 200, 0.08)';
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, WIDTH - 80, HEIGHT - 80);

  // Title
  ctx.font = '120px "Anton", "Impact", sans-serif';
  ctx.fillStyle = '#E8DCC8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(page.title, WIDTH / 2, HEIGHT / 2 - 40);

  // Tri-color bar
  const barW = 80;
  const barH = 5;
  const barY = HEIGHT / 2 + 30;
  const barStart = (WIDTH - barW * 3) / 2;
  ctx.fillStyle = '#E84B2B';
  ctx.fillRect(barStart, barY, barW, barH);
  ctx.fillStyle = '#C4713B';
  ctx.fillRect(barStart + barW, barY, barW, barH);
  ctx.fillStyle = '#D4943A';
  ctx.fillRect(barStart + barW * 2, barY, barW, barH);

  // Subtitle
  ctx.font = '24px "DM Sans", "Helvetica Neue", sans-serif';
  ctx.fillStyle = '#8899AA';
  ctx.fillText(page.subtitle, WIDTH / 2, HEIGHT / 2 + 75);

  // Label (top right)
  if (page.label) {
    ctx.font = '14px "DM Sans", "Helvetica Neue", sans-serif';
    ctx.fillStyle = '#D4943A';
    ctx.textAlign = 'right';
    ctx.fillText(page.label, WIDTH - 60, 75);
    ctx.textAlign = 'center';
  }

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUT_DIR, page.filename), buffer);
  console.log(`Created ${page.filename}`);
}

console.log('Done! OG images saved to public/og/');
