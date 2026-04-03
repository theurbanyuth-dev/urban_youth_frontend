const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const glob = require('glob');

async function optimizeImages() {
  console.log('Optimizing images to WebP...');
  
  // Batch convert JPG/PNG to WebP
  const imageFiles = glob.sync('public/**/*.{jpg,jpeg,png}', { nodir: true });
  for (const filePath of imageFiles) {
    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    if (fs.existsSync(webpPath)) {
      console.log(`Skipping existing: ${webpPath}`);
      continue;
    }
    await sharp(filePath)
      .webp({ quality: 80, effort: 4 })
      .toFile(webpPath);
    console.log(`Converted: ${path.basename(filePath)} -> WebP`);
  }

  // Generate video posters (first frame)
  const videoFiles = glob.sync('public/video/*.mp4');
  for (const videoPath of videoFiles) {
    const posterPath = videoPath.replace('.mp4', '-poster.webp');
    if (fs.existsSync(posterPath)) {
      console.log(`Skipping existing poster: ${posterPath}`);
      continue;
    }
    try {
      execSync(`npx ffmpeg-static -i "${videoPath}" -vf "fps=1/5" -vframes 1 -y "${posterPath}"`, { stdio: 'pipe' });
      console.log(`Generated poster: ${path.basename(videoPath)}`);
    } catch (e) {
      console.error(`Failed poster for ${videoPath}:`, e.message);
    }
  }

  console.log('Image optimization complete!');
}

optimizeImages().catch(console.error);
