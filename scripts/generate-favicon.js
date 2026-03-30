// Generate favicon for Allentown
// Run: node scripts/generate-favicon.js

const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Register Anton font - MUST happen before any createCanvas calls
const FONT_PATH = path.join(__dirname, '..', 'public', 'fonts', 'Anton-Regular.ttf');
if (fs.existsSync(FONT_PATH)) {
  registerFont(FONT_PATH, { family: 'Anton' });
  console.log('Anton font registered');
} else {
  console.error('ERROR: Anton font not found at', FONT_PATH);
  process.exit(1);
}

const sizes = [
  { size: 32, name: 'favicon-32x32.png' },
  { size: 16, name: 'favicon-16x16.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

const OUT_DIR = path.join(__dirname, '..', 'app');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

for (const { size, name } of sizes) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Dark background
  ctx.fillStyle = '#0D0F12';
  ctx.fillRect(0, 0, size, size);

  // "A" in Anton-style (bold, condensed)
  const fontSize = Math.round(size * 0.7);
  ctx.font = `bold ${fontSize}px Anton`;
  ctx.fillStyle = '#E8DCC8';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('A', size / 2, size / 2 + (size * 0.03));

  // Small amber bar at bottom
  const barH = Math.max(2, Math.round(size * 0.04));
  const barY = size - barH - Math.round(size * 0.08);
  const barW = Math.round(size * 0.15);
  const barStart = (size - barW * 3) / 2;
  ctx.fillStyle = '#E84B2B';
  ctx.fillRect(barStart, barY, barW, barH);
  ctx.fillStyle = '#C4713B';
  ctx.fillRect(barStart + barW, barY, barW, barH);
  ctx.fillStyle = '#D4943A';
  ctx.fillRect(barStart + barW * 2, barY, barW, barH);

  const buffer = canvas.toBuffer('image/png');
  // favicon-32 and favicon-16 go to app/ dir for Next.js, rest to public/
  if (name.startsWith('favicon')) {
    fs.writeFileSync(path.join(OUT_DIR, name), buffer);
  } else {
    fs.writeFileSync(path.join(PUBLIC_DIR, name), buffer);
  }
  console.log(`Created ${name} (${size}x${size})`);
}

// Also create the main favicon.ico sized version in app/
const ico = createCanvas(32, 32);
const ictx = ico.getContext('2d');
ictx.fillStyle = '#0D0F12';
ictx.fillRect(0, 0, 32, 32);
ictx.font = 'bold 22px Anton';
ictx.fillStyle = '#E8DCC8';
ictx.textAlign = 'center';
ictx.textBaseline = 'middle';
ictx.fillText('A', 16, 17);
const barH2 = 2;
const barY2 = 27;
const bw = 5;
const bs = (32 - bw * 3) / 2;
ictx.fillStyle = '#E84B2B';
ictx.fillRect(bs, barY2, bw, barH2);
ictx.fillStyle = '#C4713B';
ictx.fillRect(bs + bw, barY2, bw, barH2);
ictx.fillStyle = '#D4943A';
ictx.fillRect(bs + bw * 2, barY2, bw, barH2);

fs.writeFileSync(path.join(OUT_DIR, 'icon.png'), ico.toBuffer('image/png'));
console.log('Created icon.png (Next.js app dir favicon)');

console.log('Done!');
