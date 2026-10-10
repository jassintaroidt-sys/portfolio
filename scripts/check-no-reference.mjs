import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

const FORBIDDEN_PATTERN = /loker_tertutup|loker_terbuka|bag\.png|books\.png|camera\.png|certificate\.png|envelope\.png|magazine\.png|notes\.png|polaroids\.png|shoes\.png|trophy\.png|umbrella\.png|Aset_/i;

let violations = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(ts|tsx|js|jsx|css|html|json)$/i.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (FORBIDDEN_PATTERN.test(line)) {
          violations.push({
            file: path.relative(srcDir, fullPath),
            line: index + 1,
            match: line.trim(),
          });
        }
      });
    }
  }
}

if (fs.existsSync(srcDir)) {
  scanDir(srcDir);
}

if (violations.length > 0) {
  console.error('\n❌ FAILED: Reference assets are forbidden in src/ (BRIEF §0.3):');
  violations.forEach((v) => {
    console.error(`  - src/${v.file}:${v.line} -> ${v.match}`);
  });
  process.exit(1);
} else {
  console.log('✅ PASS: No forbidden reference images found in src/');
}
