import fs from 'node:fs';
import path from 'node:path';

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getFiles(fullPath, files);
    } else {
      files.push({ path: fullPath, size: stat.size });
    }
  }
  return files;
}

const assetsDir = path.resolve('public/assets');
const allFiles = getFiles(assetsDir);

let totalBytes = 0;
const largeFiles = [];

for (const f of allFiles) {
  totalBytes += f.size;
  if (f.size > 25 * 1024 * 1024) {
    largeFiles.push(f);
  }
}

const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
console.log(`TOTAL_ASSETS_SIZE_MB: ${totalMB} MB (${totalBytes} bytes) across ${allFiles.length} files.`);
console.log(`LARGE_FILES_COUNT (> 25MB): ${largeFiles.length}`);
for (const lf of largeFiles) {
  const sizeMB = (lf.size / (1024 * 1024)).toFixed(2);
  console.log(` - ${path.basename(lf.path)}: ${sizeMB} MB (${lf.path})`);
}
