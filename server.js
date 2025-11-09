#!/usr/bin/env node

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const DIST_DIR = join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

/**
 * Get MIME type from file extension
 */
function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

/**
 * Serve file from dist directory
 */
async function serveFile(res, filePath) {
  try {
    const content = await readFile(filePath);
    const mimeType = getMimeType(filePath);
    
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Cache-Control': 'no-cache'
    });
    res.end(content);
    
    console.log(`✓ 200 ${filePath.replace(DIST_DIR, '')}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      console.log(`✗ 404 ${filePath.replace(DIST_DIR, '')}`);
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      console.error(`✗ 500 ${filePath.replace(DIST_DIR, '')}:`, error.message);
    }
  }
}

/**
 * Handle HTTP requests
 */
async function handleRequest(req, res) {
  let url = req.url;
  
  // Remove query string
  const queryIndex = url.indexOf('?');
  if (queryIndex !== -1) {
    url = url.substring(0, queryIndex);
  }
  
  // Default to index.html for root
  if (url === '/') {
    url = '/index.html';
  }
  
  // Add .html extension if no extension
  if (!extname(url)) {
    url += '.html';
  }
  
  const filePath = join(DIST_DIR, url);
  
  // Security check: prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    console.log(`✗ 403 ${url} (directory traversal attempt)`);
    return;
  }
  
  // Check if file exists and is a file (not a directory)
  try {
    const stats = await stat(filePath);
    if (stats.isDirectory()) {
      // Try index.html in directory
      await serveFile(res, join(filePath, 'index.html'));
    } else {
      await serveFile(res, filePath);
    }
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    console.log(`✗ 404 ${url}`);
  }
}

/**
 * Start server
 */
const server = createServer(handleRequest);

server.listen(PORT, () => {
  console.log('\n🚀 Development server started\n');
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   Network: http://127.0.0.1:${PORT}`);
  console.log('\n📁 Serving: dist/');
  console.log('\n💡 Tip: Run "npm run build" first to generate dist/ folder');
  console.log('   Press Ctrl+C to stop\n');
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use`);
    console.error(`   Try: PORT=3001 npm run dev\n`);
  } else {
    console.error('\n❌ Server error:', error.message, '\n');
  }
  process.exit(1);
});
