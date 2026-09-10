/** Dependency-free local preview. GitHub Pages serves the root directly. */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const args = process.argv.slice(2);
const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const host = option('--host', '127.0.0.1');
const port = Number(option('--port', 4173));
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.webp': 'image/webp' };

createServer(async (request, response) => {
  try {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405).end();
      return;
    }
    const url = new URL(request.url, 'http://localhost');
    // Local-only responsive review surface; never included in the public page.
    if (url.pathname === '/__review') {
      const widths = [320, 390, 768, 1024, 1440];
      const width = widths.includes(Number(url.searchParams.get('width'))) ? Number(url.searchParams.get('width')) : 390;
      const scale = Math.min(1, 1100 / width);
      const markup = `<!doctype html><html lang="en"><meta charset="utf-8"><title>PeraFlow layout review</title><style>body{margin:0;background:#dde3ea;font:14px sans-serif}nav{padding:12px;display:flex;gap:20px}a{color:#17233c}iframe{width:${width}px;height:11000px;border:0;background:white;transform:scale(${scale});transform-origin:top left}main{width:${width * scale}px;height:${11000 * scale}px}</style><nav>${widths.map(w => `<a href="/__review?width=${w}">${w}px</a>`).join('')}</nav><main><iframe title="PeraFlow responsive preview" src="/"></iframe></main></html>`;
      response.writeHead(200, { 'Content-Type': mime['.html'], 'Cache-Control': 'no-store' });
      response.end(request.method === 'HEAD' ? undefined : markup);
      return;
    }
    const pathname = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const file = resolve(root, '.' + pathname);
    // Only public website files are served; repository metadata stays private.
    if (!file.startsWith(root + sep) || pathname.split('/').some(part => part.startsWith('.')) ||
        !(['index.html', 'styles.css', 'brand.css', 'script.js'].includes(pathname.slice(1)) || pathname.startsWith('/assets/'))) {
      response.writeHead(404).end('Not found');
      return;
    }
    const bytes = await readFile(file);
    response.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(request.method === 'HEAD' ? undefined : bytes);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, host, () => console.log(`PeraFlow preview: http://${host}:${port}/`));
