#!/usr/bin/env node

import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import toIco from 'to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#00509d"/>
  <path d="M16 24L8 8h4l4 10l4-10h4L16 24z" fill="white"/>
  <circle cx="24" cy="10" r="2" fill="#ff9013"/>
</svg>`;

const OG_IMAGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#00509d;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#73c8d2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="600" y="280" font-family="Inter, -apple-system, sans-serif" font-size="96" font-weight="700" fill="white" text-anchor="middle">
    Vocalario
  </text>
  <text x="600" y="360" font-family="Inter, -apple-system, sans-serif" font-size="32" font-weight="400" fill="white" text-anchor="middle" opacity="0.9">
    Learn vocabulary from websites you visit
  </text>
</svg>`;

async function generateFavicons() {
  console.log('🎨 Generating favicon and icon assets...\n');

  try {
    // Generate PNG versions at different sizes
    const sizes = [16, 32, 180, 512];
    const pngBuffers = [];

    for (const size of sizes) {
      console.log(`Generating ${size}x${size} PNG...`);
      const buffer = await sharp(Buffer.from(FAVICON_SVG))
        .resize(size, size)
        .png()
        .toBuffer();
      
      if (size === 180) {
        // Apple touch icon
        await writeFile(join(__dirname, 'apple-touch-icon.png'), buffer);
        console.log(`  ✓ Saved apple-touch-icon.png`);
      } else if (size === 512) {
        // Large icon for manifests
        await writeFile(join(__dirname, 'icon-512.png'), buffer);
        console.log(`  ✓ Saved icon-512.png`);
      } else {
        pngBuffers.push(buffer);
      }
    }

    // Generate .ico file (16x16 and 32x32)
    console.log('\nGenerating favicon.ico...');
    const icoBuffer = await toIco(pngBuffers);
    await writeFile(join(__dirname, 'favicon.ico'), icoBuffer);
    console.log('  ✓ Saved favicon.ico');

    // Generate OG image
    console.log('\nGenerating og-image.png...');
    const ogBuffer = await sharp(Buffer.from(OG_IMAGE_SVG))
      .resize(1200, 630)
      .png({ quality: 90 })
      .toBuffer();
    await writeFile(join(__dirname, 'src/images/og-image.png'), ogBuffer);
    console.log('  ✓ Saved src/images/og-image.png');

    console.log('\n✅ All assets generated successfully!');
    console.log('\n📋 Generated files:');
    console.log('   - favicon.svg (already exists)');
    console.log('   - favicon.ico (16x16, 32x32)');
    console.log('   - apple-touch-icon.png (180x180)');
    console.log('   - icon-512.png (512x512)');
    console.log('   - src/images/og-image.png (1200x630)');
    console.log('   - src/images/logo.svg (already exists)');

  } catch (error) {
    console.error('\n❌ Error generating assets:', error);
    process.exit(1);
  }
}

generateFavicons();
