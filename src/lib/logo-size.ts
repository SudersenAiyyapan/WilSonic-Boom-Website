// Sponsor logos must be exactly 1200 × 500. Reads the size straight from the
// file header (PNG, JPEG, WebP) or the SVG's viewBox / width and height.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const LOGO = { w: 1200, h: 500 };

type Size = { w: number; h: number } | null;

function raster(b: Buffer): Size {
  // PNG
  if (b.readUInt32BE(0) === 0x89504e47) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  // JPEG: walk the markers to the first start-of-frame
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc)
        return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  // WebP
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const kind = b.toString('ascii', 12, 16);
    if (kind === 'VP8X') return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    if (kind === 'VP8L') {
      const n = b.readUInt32LE(21);
      return { w: 1 + (n & 0x3fff), h: 1 + ((n >> 14) & 0x3fff) };
    }
    if (kind === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  }
  return null;
}

function svg(text: string): Size {
  const tag = text.match(/<svg\b[^>]*>/i)?.[0] ?? '';
  const attr = (n: string) => tag.match(new RegExp(`\\b${n}\\s*=\\s*["']([^"']+)["']`, 'i'))?.[1];
  const vb = attr('viewBox')?.trim().split(/[\s,]+/).map(Number);
  if (vb?.length === 4) return { w: vb[2], h: vb[3] };
  const w = parseFloat(attr('width') ?? ''), h = parseFloat(attr('height') ?? '');
  return w && h ? { w, h } : null;
}

// Throws, stopping the build, if a logo is missing or not 1200 × 500.
export function checkLogo(src: string | null | undefined, who: string) {
  if (!src) return;
  const stop = (why: string) => {
    throw new Error(`Sponsor logo for "${who}" (${src}) ${why}. Sponsor logos must be exactly ${LOGO.w} × ${LOGO.h} px — replace it in the admin.`);
  };
  if (/^https?:/i.test(src)) stop('is a link to another website; upload the file instead');
  const file = join(process.cwd(), 'public', decodeURIComponent(src.replace(/^\/+/, '').split(/[?#]/)[0]));
  if (!existsSync(file)) stop('was not found');
  const buf = readFileSync(file);
  const size = /\.svg$/i.test(file) ? svg(buf.toString('utf8')) : raster(buf);
  if (!size) stop('is not a PNG, JPG, WebP or SVG');
  if (size!.w !== LOGO.w || size!.h !== LOGO.h) stop(`is ${size!.w} × ${size!.h} px`);
}
