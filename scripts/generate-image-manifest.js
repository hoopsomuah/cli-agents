// generate-image-manifest.js — enumerate the asset folders into a static JSON.
//
// GitHub Pages (and any plain static host) offers no directory listing, so the
// hidden Image Library panel cannot discover files at runtime. This script walks
// site/assets/images/ and site/assets/diagrams/ and writes a machine-readable
// manifest to site/assets/images/index.json. Run it whenever you add or remove
// an asset, then commit the regenerated index.json:
//
//   node scripts/generate-image-manifest.js
//
// It is idempotent and has no dependencies (Node core only).

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const imgDir = path.join(root, 'site', 'assets', 'images');
const diagDir = path.join(root, 'site', 'assets', 'diagrams');

const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const DIAGRAM_EXTS = ['.svg'];

function listDir(dir, exts) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && exts.includes(path.extname(d.name).toLowerCase()))
    .map((d) => ({
      file: d.name,
      ext: path.extname(d.name).toLowerCase().slice(1),
      bytes: fs.statSync(path.join(dir, d.name)).size,
    }))
    .sort((a, b) => a.file.localeCompare(b.file));
}

const images = listDir(imgDir, IMAGE_EXTS);
const diagrams = listDir(diagDir, DIAGRAM_EXTS);

const out = {
  generated: new Date().toISOString(),
  imageDir: 'site/assets/images/',
  diagramDir: 'site/assets/diagrams/',
  images,
  diagrams,
};

const target = path.join(imgDir, 'index.json');
fs.writeFileSync(target, JSON.stringify(out, null, 2) + '\n');
console.log(
  `Wrote ${images.length} images + ${diagrams.length} diagrams to site/assets/images/index.json`
);
