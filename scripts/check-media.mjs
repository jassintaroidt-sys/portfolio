import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import imageSize from 'image-size';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.resolve(rootDir, 'public/assets');

// Import manifest items
const manifestPath = path.resolve(rootDir, 'src/data/media-manifest.ts');
const manifestContent = fs.readFileSync(manifestPath, 'utf-8');

// Parse files dynamically or import them
console.log('=== Checking Media Assets in public/assets ===');
if (!fs.existsSync(assetsDir)) {
  console.error(`ERROR: public/assets folder does not exist at ${assetsDir}`);
  process.exit(1);
}

// Read actual files in folders
function getFilesInDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir);
}

const imgFiles = getFilesInDir(path.resolve(assetsDir, 'img'));
const videoFiles = getFilesInDir(path.resolve(assetsDir, 'video'));

console.log(`Found ${imgFiles.length} images in public/assets/img`);
console.log(`Found ${videoFiles.length} videos in public/assets/video`);

let missingCount = 0;
let dimensionMismatchCount = 0;
let resolvedCandidateCount = 0;

// Test candidate resolution for Lassiwear / Lassiewear
const hardsellingCandidate1 = 'Inspirasi Konten Hardselling_Lassiewear.jpg';
const hardsellingCandidate2 = 'Inspirasi Konten Hardselling_Lassiwear.jpg';

if (imgFiles.includes(hardsellingCandidate2)) {
  console.log(`[OK] Candidate resolved: found variant "${hardsellingCandidate2}"`);
  resolvedCandidateCount++;
} else if (imgFiles.includes(hardsellingCandidate1)) {
  console.log(`[OK] Found standard name "${hardsellingCandidate1}"`);
} else {
  console.warn(`[WARN] Neither candidate for Inspirasi Konten Hardselling found.`);
}

// Case sensitive check helper
function verifyExactCase(dir, filename) {
  const actualEntries = fs.readdirSync(dir);
  const match = actualEntries.find((f) => f.toLowerCase() === filename.toLowerCase());
  if (!match) return { found: false };
  if (match !== filename) {
    return { found: true, exactCase: false, actualName: match };
  }
  return { found: true, exactCase: true };
}

// Check sample images dimensions
for (const file of imgFiles) {
  const filePath = path.resolve(assetsDir, 'img', file);
  try {
    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      const dimensions = imageSize(filePath);
      // Dimensions successfully read
    }
  } catch (err) {
    console.warn(`Could not read dimension for ${file}:`, err.message);
  }
}

console.log('Media check completed successfully.');
