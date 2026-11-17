import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('src/generated/assetVariants.js');
await mkdir(path.dirname(output), { recursive: true });
let sharp;
try { sharp = (await import('sharp')).default; }
catch { console.warn('sharp not installed; using original PNG assets for local build'); }
if (sharp) {
  const images = [
    { source: 'public/images/salchipapa-dish.png',
      variants: [{ width: 960, file: 'salchipapa-dish.webp', quality: 78 },
                 { width: 480, file: 'salchipapa-dish-480.webp', quality: 73 }] },
    { source: 'public/images/hercules-mascot.png',
      variants: [{ width: 400, file: 'hercules-mascot.webp', quality: 77 }] }
  ];
  for (const item of images) for (const variant of item.variants) {
    await sharp(item.source).rotate()
      .resize({ width: variant.width, withoutEnlargement: true })
      .webp({ quality: variant.quality, effort: 5 })
      .toFile('public/images/' + variant.file);
    console.log('Optimized', variant.file);
  }
}
await writeFile(output,
  '// Auto-generated image availability.\nexport const HAS_OPTIMIZED_IMAGES = ' + Boolean(sharp) + ';\n');
