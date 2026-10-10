import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgDir = path.resolve(__dirname, '../public/assets/img');

if (!fs.existsSync(imgDir)) {
  console.log('No public/assets/img directory found.');
  process.exit(0);
}

const files = fs.readdirSync(imgDir);
console.log(`Optimizing images in ${imgDir}...`);

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

  const srcPath = path.join(imgDir, file);
  const baseName = path.basename(file, ext);
  const webpPath = path.join(imgDir, `${baseName}.webp`);

  if (!fs.existsSync(webpPath)) {
    try {
      let pipeline = sharp(srcPath);
      const metadata = await pipeline.metadata();

      if (metadata.width && metadata.width > 1600) {
        pipeline = pipeline.resize({ width: 1600, withoutEnlargement: true });
      }

      await pipeline.webp({ quality: 82 }).toFile(webpPath);
      console.log(`Generated: ${baseName}.webp`);
    } catch (err) {
      console.warn(`Could not optimize ${file}: ${err.message}`);
    }
  }
}

console.log('Image optimization finished.');
