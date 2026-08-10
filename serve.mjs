#!/usr/bin/env node
/**
 * Zero-dependency static preview server for the exported site (out/).
 * Usage: npm run preview  (after `npm run build`)
 *
 * Mirrors static-host behavior: clean URLs with trailing slash, correct
 * content types, 404 page. Deliberately sends no frame-blocking headers
 * so the site previews correctly inside dashboards.
 */
import { createServer } from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'out');
const PORT = Number(process.env.PORT || 3000);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.ico': 'image/x-icon',
};

async function exists(p) {
  try {
    return await stat(p);
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${req.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);

    // prevent path traversal
    pathname = normalize(pathname).replace(/^(\.\.[/\\])+/, '');

    // directory-style URLs: append index.html
    let filePath = join(OUT, pathname);
    let s = await exists(filePath);

    if (s?.isDirectory()) {
      filePath = join(filePath, 'index.html');
      s = await exists(filePath);
    }

    // no-extension URL → try .html then /index.html
    if (!s && !extname(pathname)) {
      filePath = join(OUT, `${pathname}.html`);
      s = await exists(filePath);
      if (!s) {
        filePath = join(OUT, pathname, 'index.html');
        s = await exists(filePath);
      }
    }

    if (!s || s.isDirectory()) {
      const nf = await exists(join(OUT, '404.html'));
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      res.end(nf ? await readFile(join(OUT, '404.html')) : 'Not found');
      return;
    }

    const body = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
      'Cache-Control': extname(filePath) === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    });
    res.end(body);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error');
    console.error(err);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Laksar Properties — previewing out/ at http://0.0.0.0:${PORT}`);
});
