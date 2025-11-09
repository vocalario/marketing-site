#!/usr/bin/env node

import { readFile, writeFile, mkdir, copyFile, readdir, stat } from 'node:fs/promises';
import { join, dirname, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { minify as minifyHTML } from 'html-minifier-terser';
import CleanCSS from 'clean-css';
import { minify as minifyJS } from 'terser';

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
async function processHTML(inputPath, outputPath) {
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
  
  console.log(`  ✓ ${(originalSize / 1024).toFixed(1)}KB → ${(minifiedSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
}

/**
 * Minify CSS file
 */
async function processCSS(inputPath, outputPath) {
  console.log(`Minifying CSS: ${relative(ROOT_DIR, inputPath)}`);
  const content = await readFile(inputPath, 'utf-8');
  
  const result = new CleanCSS({
    level: 2,
    sourceMap: false
  }).minify(content);
  
  if (result.errors.length > 0) {
    console.error('  ✗ CSS minification errors:', result.errors);
    throw new Error('CSS minification failed');
  }
  
  await ensureDir(outputPath);
  await writeFile(outputPath, result.styles, 'utf-8');
  
  const originalSize = Buffer.byteLength(content, 'utf-8');
  const minifiedSize = Buffer.byteLength(result.styles, 'utf-8');
  const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
  
  console.log(`  ✓ ${(originalSize / 1024).toFixed(1)}KB → ${(minifiedSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
}

/**
 * Minify JavaScript file
 */
async function processJS(inputPath, outputPath) {
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
  
  console.log(`  ✓ ${(originalSize / 1024).toFixed(1)}KB → ${(minifiedSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
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
    
    let htmlCount = 0;
    let cssCount = 0;
    let jsCount = 0;
    let otherCount = 0;
    
    // Process each file
    for (const inputPath of srcFiles) {
      const outputPath = getFlatOutputPath(inputPath);
      const ext = extname(inputPath).toLowerCase();
      
      try {
        switch (ext) {
          case '.html':
            await processHTML(inputPath, outputPath);
            htmlCount++;
            break;
          case '.css':
            await processCSS(inputPath, outputPath);
            cssCount++;
            break;
          case '.js':
            await processJS(inputPath, outputPath);
            jsCount++;
            break;
          default:
            await copyAsIs(inputPath, outputPath);
            otherCount++;
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
    console.log(`   HTML files: ${htmlCount}`);
    console.log(`   CSS files: ${cssCount}`);
    console.log(`   JS files: ${jsCount}`);
    console.log(`   Other files: ${otherCount}`);
    console.log(`   Total files: ${htmlCount + cssCount + jsCount + otherCount}`);
    console.log(`   Duration: ${duration}s`);
    console.log(`\n📁 Output directory: ${relative(ROOT_DIR, DIST_DIR)}/`);
    
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}

// Run build
build();
