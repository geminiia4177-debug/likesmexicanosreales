import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const imagesDir = path.join(publicDir, 'images');

async function optimizeMedia() {
  console.log('🚀 Iniciando pipeline de compresión y optimización multimedia...');

  // 1. Optimize logo.png -> logo.webp (< 45 KB, 256x256 @ 85% quality, alpha preserved)
  const logoInput = path.join(publicDir, 'logo.png');
  const logoOutput = path.join(publicDir, 'logo.webp');
  if (fs.existsSync(logoInput)) {
    const info = await sharp(logoInput)
      .resize(256, 256, { fit: 'inside' })
      .webp({ quality: 85, alphaQuality: 90 })
      .toFile(logoOutput);
    const sizeKb = (info.size / 1024).toFixed(1);
    console.log(`✅ logo.webp generado: ${sizeKb} KB (Meta: < 45 KB)`);
  }

  // 2. Optimize banner.png -> banner.webp (< 160 KB, 1920x1080 @ 82% quality)
  const bannerInput = path.join(publicDir, 'banner.png');
  const bannerOutput = path.join(publicDir, 'banner.webp');
  if (fs.existsSync(bannerInput)) {
    const info = await sharp(bannerInput)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(bannerOutput);
    const sizeKb = (info.size / 1024).toFixed(1);
    console.log(`✅ banner.webp generado: ${sizeKb} KB (Meta: < 160 KB)`);
  }

  // 3. Optimize 11 landings images in public/images/*.jpg -> *.webp (< 110 KB each)
  if (fs.existsSync(imagesDir)) {
    const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
    for (const file of files) {
      const inputPath = path.join(imagesDir, file);
      const baseName = path.parse(file).name;
      const outputPath = path.join(imagesDir, `${baseName}.webp`);

      const info = await sharp(inputPath)
        .resize(1000, 600, { fit: 'cover' })
        .webp({ quality: 78, effort: 6 })
        .toFile(outputPath);

      const sizeKb = (info.size / 1024).toFixed(1);
      console.log(`✅ public/images/${baseName}.webp: ${sizeKb} KB (Meta: < 110 KB)`);
    }
  }

  // 4. Limpieza de binarios duplicados en la raíz y src/assets
  const rootDuplicates = [
    path.join(rootDir, 'c2f51dbb-d817-4fb8-bccf-9bde1c17d156.png'),
    path.join(rootDir, '2dc42b6d-b202-4de4-bacb-3e6bcd544580.png')
  ];

  for (const dup of rootDuplicates) {
    if (fs.existsSync(dup)) {
      fs.unlinkSync(dup);
      console.log(`🗑️ Eliminado binario duplicado en raíz: ${path.basename(dup)}`);
    }
  }

  console.log('🎉 Pipeline de optimización multimedia completado exitosamente.');
}

optimizeMedia().catch(err => {
  console.error('Error optimizando medios:', err);
  process.exit(1);
});
