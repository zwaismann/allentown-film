import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.resolve('public/images');

const HEADSHOTS = [
  'zev-waismann',
  'pat-taggart',
  'conrad-sylvia',
  'gary-foster',
  'roberto-alcazar',
  'pilar-de-posadas',
];

const ALREADY_WEBP = [
  'gary-foster.webp',
  'roberto-alcazar.webp',
  'recession-dump-reagan.webp',
];

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath, ext);
  const fullBasename = path.basename(filePath);

  if (ALREADY_WEBP.includes(fullBasename)) {
    console.log('  SKIP (already webp): ' + fullBasename);
    return { skipped: true };
  }

  if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
    console.log('  SKIP (unsupported): ' + fullBasename);
    return { skipped: true };
  }

  const originalSize = fs.statSync(filePath).size;
  const metadata = await sharp(filePath).metadata();

  const outputPath = path.join(IMAGES_DIR, basename + '.webp');
  let pipeline = sharp(filePath);
  if (metadata.width > 1920) {
    pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
  }
  await pipeline.webp({ quality: 80 }).toFile(outputPath);
  const newSize = fs.statSync(outputPath).size;

  console.log('  ' + fullBasename + ' -> ' + basename + '.webp');
  console.log('    ' + (originalSize / 1024 / 1024).toFixed(2) + ' MB -> ' + (newSize / 1024 / 1024).toFixed(2) + ' MB (' + Math.round((1 - newSize / originalSize) * 100) + '% reduction)');
  if (metadata.width > 1920) {
    console.log('    Resized: ' + metadata.width + 'x' + metadata.height + ' -> 1920px wide');
  }

  const isHeadshot = HEADSHOTS.includes(basename);
  if (isHeadshot) {
    const smallPath = path.join(IMAGES_DIR, basename + '-small.webp');
    await sharp(filePath)
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(smallPath);
    const smallSize = fs.statSync(smallPath).size;
    console.log('    + ' + basename + '-small.webp (400px wide, ' + (smallSize / 1024).toFixed(0) + ' KB)');
  }

  return { originalSize, newSize, skipped: false };
}

async function main() {
  const files = fs.readdirSync(IMAGES_DIR);
  let totalOriginal = 0;
  let totalNew = 0;
  let count = 0;

  console.log('Image Optimization Report');
  console.log('='.repeat(60));
  console.log('');

  for (const file of files.sort()) {
    const filePath = path.join(IMAGES_DIR, file);
    if (!fs.statSync(filePath).isFile()) continue;
    const result = await optimizeImage(filePath);
    if (!result.skipped) {
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      count++;
    }
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('Converted ' + count + ' images');
  console.log('Total before: ' + (totalOriginal / 1024 / 1024).toFixed(1) + ' MB');
  console.log('Total after:  ' + (totalNew / 1024 / 1024).toFixed(1) + ' MB');
  console.log('Savings:      ' + ((totalOriginal - totalNew) / 1024 / 1024).toFixed(1) + ' MB (' + Math.round((1 - totalNew / totalOriginal) * 100) + '% reduction)');
}

main().catch(console.error);
