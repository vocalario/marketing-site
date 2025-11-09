#!/usr/bin/env node

import { createServer } from 'node:http';
import { readFile, stat, watch } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const DIST_DIR = join(__dirname, 'dist');

// Track connected clients for hot reload
const clients = new Set();

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
 * Inject live reload script into HTML
 */
function injectLiveReload(html) {
  const script = `
  <script>
    (function() {
      let reloading = false;
      const source = new EventSource('/__reload');
      
      source.onmessage = (event) => {
        if (event.data === 'reload' && !reloading) {
          reloading = true;
          console.log('[Hot Reload] Reloading...');
          source.close();
          location.reload();
        }
      };
      
      source.onerror = () => {
        console.log('[Hot Reload] Connection lost');
        source.close();
      };
      
      source.onopen = () => {
        console.log('[Hot Reload] Connected');
      };
    })();
  </script>
  `;
  return html.replace('</body>', `${script}</body>`);
}

/**
 * Serve file from dist directory
 */
async function serveFile(res, filePath) {
  try {
    let content = await readFile(filePath);
    const mimeType = getMimeType(filePath);
    
    // Inject live reload script for HTML files
    if (mimeType === 'text/html') {
      content = injectLiveReload(content.toString());
    }
    
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
 * Handle Server-Sent Events for hot reload
 */
function handleSSE(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  
  res.write('data: connected\n\n');
  
  clients.add(res);
  
  req.on('close', () => {
    clients.delete(res);
  });
}

/**
 * Notify all connected clients to reload
 */
function notifyClients() {
  console.log(`🔄 File changed, reloading ${clients.size} client(s)...`);
  for (const client of clients) {
    client.write('data: reload\n\n');
  }
}

/**
 * Handle HTTP requests
 */
async function handleRequest(req, res) {
  let url = req.url;
  
  // Handle hot reload endpoint
  if (url === '/__reload') {
    handleSSE(req, res);
    return;
  }
  
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
 * Watch for file changes in dist directory
 */
async function watchFiles() {
  let reloadTimeout;
  let lastChange = 0;
  
  try {
    const watcher = watch(DIST_DIR, { recursive: true });
    console.log('👀 Watching for file changes...\n');
    
    for await (const event of watcher) {
      if (event.filename) {
        const now = Date.now();
        
        // Ignore changes that happen too quickly (likely duplicates)
        if (now - lastChange < 100) {
          continue;
        }
        
        lastChange = now;
        console.log(`📝 File changed: ${event.filename}`);
        
        // Clear existing timeout
        if (reloadTimeout) {
          clearTimeout(reloadTimeout);
        }
        
        // Debounce: wait for 500ms of inactivity before reloading
        reloadTimeout = setTimeout(() => {
          notifyClients();
          reloadTimeout = null;
        }, 500);
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Watch error:', error);
    }
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
  console.log('🔥 Hot reload: enabled');
  console.log('\n💡 Tip: Run "npm run build" in another terminal to see changes');
  console.log('   Press Ctrl+C to stop\n');
  
  // Start watching for changes
  watchFiles();
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
