#!/usr/bin/env node

import { readFile, writeFile, mkdir, copyFile, readdir, stat } from 'node:fs/promises';
import { join, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { minify as minifyHTML } from 'html-minifier-terser';
import CleanCSS from 'clean-css';
import { minify as minifyJS } from 'terser';
import { PurgeCSS } from 'purgecss';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, 'src');
const DIST_DIR = join(__dirname, 'dist');
const ROOT_DIR = __dirname;

/**
 * Get output path with flat hierarchy
 * src/index.html -> dist/index.html
 * src/css/main.css -> dist/css/main.css
 * src/js/main.js -> dist/js/main.js
 */
function getFlatOutputPath(inputPath) {
  const relativePath = relative(SRC_DIR, inputPath);
  return join(DIST_DIR, relativePath);
}

/**
 * Recursively get all files in a directory
 */
async function getAllFiles(dir, fileList = []) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      await getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

/**
 * Ensure directory exists
 */
async function ensureDir(filePath) {
  await mkdir(dirname(filePath), { recursive: true });
}

/**
 * Minify HTML file and update asset paths for flat structure
 */
async function processHTML(inputPath, outputPath, stats) {
  console.log(`Minifying HTML: ${relative(ROOT_DIR, inputPath)}`);
  const content = await readFile(inputPath, 'utf-8');
  
  // Update asset paths: src/css/ -> css/, src/js/ -> js/
  let updatedContent = content
    .replace(/src\/css\//g, 'css/')
    .replace(/src\/js\//g, 'js/');
  
  const minified = await minifyHTML(updatedContent, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
    removeEmptyAttributes: true,
    removeOptionalTags: false,
    sortAttributes: true,
    sortClassName: true
  });
  
  await ensureDir(outputPath);
  await writeFile(outputPath, minified, 'utf-8');
  
  const originalSize = Buffer.byteLength(content, 'utf-8');
  const minifiedSize = Buffer.byteLength(minified, 'utf-8');
  const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
  
  // Update stats
  if (stats) {
    stats.original += originalSize;
    stats.minified += minifiedSize;
  }
  
  console.log(`  ✓ ${(originalSize / 1024).toFixed(1)}KB → ${(minifiedSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
}

/**
 * Minify CSS file with PurgeCSS to remove unused styles
 */
async function processCSS(inputPath, outputPath, stats) {
  console.log(`Minifying CSS: ${relative(ROOT_DIR, inputPath)}`);
  const content = await readFile(inputPath, 'utf-8');
  
  // First, purge unused CSS
  const purgeCSSResults = await new PurgeCSS().purge({
    content: [
      join(SRC_DIR, '**/*.html'),
      join(SRC_DIR, '**/*.js')
    ],
    css: [{ raw: content }],
    safelist: {
      standard: [/^hero/, /^feature/, /^cta/, /^footer/, /^nav/],
      deep: [],
      greedy: []
    }
  });
  
  const purgedCSS = purgeCSSResults[0].css;
  
  // Then minify with CleanCSS
  const result = new CleanCSS({
    level: 2,
    sourceMap: false
  }).minify(purgedCSS);
  
  if (result.errors.length > 0) {
    console.error('  ✗ CSS minification errors:', result.errors);
    throw new Error('CSS minification failed');
  }
  
  await ensureDir(outputPath);
  await writeFile(outputPath, result.styles, 'utf-8');
  
  const originalSize = Buffer.byteLength(content, 'utf-8');
  const purgedSize = Buffer.byteLength(purgedCSS, 'utf-8');
  const minifiedSize = Buffer.byteLength(result.styles, 'utf-8');
  const totalSavings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
  
  // Update stats
  if (stats) {
    stats.original += originalSize;
    stats.minified += minifiedSize;
  }
  
  console.log(`  ✓ ${(originalSize / 1024).toFixed(1)}KB → ${(purgedSize / 1024).toFixed(1)}KB (purged) → ${(minifiedSize / 1024).toFixed(1)}KB (${totalSavings}% reduction)`);
}

/**
 * Minify JavaScript file
 */
async function processJS(inputPath, outputPath, stats) {
  console.log(`Minifying JS: ${relative(ROOT_DIR, inputPath)}`);
  const content = await readFile(inputPath, 'utf-8');
  
  // Skip if file is empty or only has comments
  if (content.trim().length === 0 || content.trim().startsWith('//') && content.trim().split('\n').length < 5) {
    console.log('  ⊘ Skipping empty/placeholder file');
    await ensureDir(outputPath);
    await writeFile(outputPath, content, 'utf-8');
    return;
  }
  
  const result = await minifyJS(content, {
    compress: {
      dead_code: true,
      drop_console: false,
      drop_debugger: true,
      keep_classnames: false,
      keep_fargs: true,
      keep_fnames: false,
      keep_infinity: true
    },
    mangle: {
      keep_classnames: false,
      keep_fnames: false
    },
    format: {
      comments: false
    }
  });
  
  if (result.error) {
    console.error('  ✗ JS minification error:', result.error);
    throw result.error;
  }
  
  await ensureDir(outputPath);
  await writeFile(outputPath, result.code, 'utf-8');
  
  const originalSize = Buffer.byteLength(content, 'utf-8');
  const minifiedSize = Buffer.byteLength(result.code, 'utf-8');
  const savings = originalSize > 0 ? ((1 - minifiedSize / originalSize) * 100).toFixed(1) : '0.0';
  
  // Update stats
  if (stats) {
    stats.original += originalSize;
    stats.minified += minifiedSize;
  }
  
  console.log(`  ✓ ${(originalSize / 1024).toFixed(1)}KB → ${(minifiedSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
}

/**
 * Optimize image files
 */
async function processImage(inputPath, outputPath, stats) {
  console.log(`Optimizing image: ${relative(ROOT_DIR, inputPath)}`);
  
  const ext = extname(inputPath).toLowerCase();
  const inputBuffer = await readFile(inputPath);
  const originalSize = inputBuffer.length;
  
  let outputBuffer;
  
  if (ext === '.png') {
    // Optimize PNG with compression
    outputBuffer = await sharp(inputBuffer)
      .png({ quality: 90, compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();
  } else if (ext === '.jpg' || ext === '.jpeg') {
    // Optimize JPEG
    outputBuffer = await sharp(inputBuffer)
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toBuffer();
  } else if (ext === '.webp') {
    // Optimize WebP
    outputBuffer = await sharp(inputBuffer)
      .webp({ quality: 85 })
      .toBuffer();
  } else {
    // Unsupported format, copy as-is
    outputBuffer = inputBuffer;
  }
  
  await ensureDir(outputPath);
  await writeFile(outputPath, outputBuffer);
  
  const optimizedSize = outputBuffer.length;
  const savings = originalSize > 0 ? ((1 - optimizedSize / originalSize) * 100).toFixed(1) : '0.0';
  
  // Update stats
  if (stats) {
    stats.original += originalSize;
    stats.optimized += optimizedSize;
  }
  
  console.log(`  ✓ ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
}

/**
 * Copy file as-is
 */
async function copyAsIs(inputPath, outputPath) {
  console.log(`Copying: ${relative(ROOT_DIR, inputPath)}`);
  await ensureDir(outputPath);
  await copyFile(inputPath, outputPath);
  console.log('  ✓ Copied');
}

/**
 * Process root-level files (sitemap.xml, robots.txt)
 */
async function processRootFiles() {
  const rootFiles = ['sitemap.xml', 'robots.txt'];
  
  for (const file of rootFiles) {
    const inputPath = join(ROOT_DIR, file);
    const outputPath = join(DIST_DIR, file);
    
    try {
      await copyAsIs(inputPath, outputPath);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      console.log(`  ⊘ ${file} not found, skipping`);
    }
  }
}

/**
 * Main build function
 */
async function build() {
  console.log('🚀 Starting build process...\n');
  
  const startTime = Date.now();
  
  // Track size statistics
  const stats = {
    html: { original: 0, minified: 0, count: 0 },
    css: { original: 0, minified: 0, count: 0 },
    js: { original: 0, minified: 0, count: 0 },
    images: { original: 0, optimized: 0, count: 0 },
    other: { count: 0 }
  };
  
  try {
    // Create dist directory
    await mkdir(DIST_DIR, { recursive: true });
    console.log('✓ Created dist directory\n');
    
    // Process root-level files
    console.log('📄 Processing root files:');
    await processRootFiles();
    console.log('');
    
    // Get all files from src directory
    const srcFiles = await getAllFiles(SRC_DIR);
    
    // Process each file
    for (const inputPath of srcFiles) {
      const outputPath = getFlatOutputPath(inputPath);
      const ext = extname(inputPath).toLowerCase();
      
      try {
        switch (ext) {
          case '.html':
            await processHTML(inputPath, outputPath, stats.html);
            stats.html.count++;
            break;
          case '.css':
            await processCSS(inputPath, outputPath, stats.css);
            stats.css.count++;
            break;
          case '.js':
            await processJS(inputPath, outputPath, stats.js);
            stats.js.count++;
            break;
          case '.png':
          case '.jpg':
          case '.jpeg':
          case '.webp':
            await processImage(inputPath, outputPath, stats.images);
            stats.images.count++;
            break;
          default:
            await copyAsIs(inputPath, outputPath);
            stats.other.count++;
            break;
        }
      } catch (error) {
        const relativePath = relative(SRC_DIR, inputPath);
        console.error(`\n✗ Error processing ${relativePath}:`, error.message);
        throw error;
      }
    }
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n✅ Build completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   HTML files: ${stats.html.count}`);
    console.log(`   CSS files: ${stats.css.count}`);
    console.log(`   JS files: ${stats.js.count}`);
    console.log(`   Images: ${stats.images.count}`);
    console.log(`   Other files: ${stats.other.count}`);
    console.log(`   Total files: ${stats.html.count + stats.css.count + stats.js.count + stats.images.count + stats.other.count}`);
    
    // Display minification stats
    if (stats.html.count > 0) {
      const htmlSavings = ((1 - stats.html.minified / stats.html.original) * 100).toFixed(1);
      console.log(`\n   HTML:   ${(stats.html.original / 1024).toFixed(1)}KB → ${(stats.html.minified / 1024).toFixed(1)}KB (${htmlSavings}% reduction)`);
    }
    if (stats.css.count > 0) {
      const cssSavings = ((1 - stats.css.minified / stats.css.original) * 100).toFixed(1);
      console.log(`   CSS:    ${(stats.css.original / 1024).toFixed(1)}KB → ${(stats.css.minified / 1024).toFixed(1)}KB (${cssSavings}% reduction)`);
    }
    if (stats.js.count > 0) {
      const jsSavings = ((1 - stats.js.minified / stats.js.original) * 100).toFixed(1);
      console.log(`   JS:     ${(stats.js.original / 1024).toFixed(1)}KB → ${(stats.js.minified / 1024).toFixed(1)}KB (${jsSavings}% reduction)`);
    }
    if (stats.images.count > 0) {
      const imageSavings = ((1 - stats.images.optimized / stats.images.original) * 100).toFixed(1);
      console.log(`   Images: ${(stats.images.original / 1024).toFixed(1)}KB → ${(stats.images.optimized / 1024).toFixed(1)}KB (${imageSavings}% reduction)`);
    }
    
    const totalOriginal = stats.html.original + stats.css.original + stats.js.original + stats.images.original;
    const totalMinified = stats.html.minified + stats.css.minified + stats.js.minified + stats.images.optimized;
    if (totalOriginal > 0) {
      const totalSavings = ((1 - totalMinified / totalOriginal) * 100).toFixed(1);
      console.log(`   ─────────────────────────────────────────────────`);
      console.log(`   Total: ${(totalOriginal / 1024).toFixed(1)}KB → ${(totalMinified / 1024).toFixed(1)}KB (${totalSavings}% reduction)`);
    }
    
    console.log(`\n   Duration: ${duration}s`);
    console.log(`\n📁 Output directory: ${relative(ROOT_DIR, DIST_DIR)}/`);
    
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}

// Run build
build();
