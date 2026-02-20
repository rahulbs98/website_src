const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'assets', 'images', 'albums');
const OUTPUT_PATH = path.join(__dirname, 'assets', 'data', 'albums.json');
const META_PATH = path.join(__dirname, 'assets', 'data', 'albums.meta.json');
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function toTitle(filename) {
  const name = filename.replace(path.extname(filename), '');
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, ch => ch.toUpperCase());
}

function loadMeta() {
  if (!fs.existsSync(META_PATH)) {
    return {};
  }

  try {
    const raw = fs.readFileSync(META_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to parse albums.meta.json:', error.message);
    return {};
  }
}

function getImages() {
  if (!fs.existsSync(IMAGES_DIR)) {
    return [];
  }

  const meta = loadMeta();
  return fs.readdirSync(IMAGES_DIR)
    .filter(file => IMAGE_EXTS.has(path.extname(file).toLowerCase()))
    .sort()
    .map((file, index) => {
      const info = meta[file] || {};
      return {
        id: index + 1,
        title: info.title || toTitle(file),
        image: `assets/images/albums/${file}`,
        tags: Array.isArray(info.tags) ? info.tags : [],
        location: info.location || '',
        date: info.date || ''
      };
    });
}

function writeJson(data) {
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
}

function run() {
  const images = getImages();
  writeJson(images);
  console.log(`Generated ${OUTPUT_PATH} with ${images.length} items.`);
}

run();
