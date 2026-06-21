const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, 'public');

async function compressImages() {
  console.log('Starting image compression...');
  try {
    const files = fs.readdirSync(publicDir);
    
    for (const file of files) {
      if (!file.toLowerCase().endsWith('.jpg') && !file.toLowerCase().endsWith('.jpeg')) {
        continue;
      }

      const filePath = path.join(publicDir, file);
      const stat = fs.statSync(filePath);
      
      // Only compress if larger than 500KB to save time
      if (stat.size > 500 * 1024) {
        console.log(`Compressing ${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)...`);
        
        const tempPath = path.join(publicDir, `temp_${file}`);
        
        await sharp(filePath)
          .resize({ width: 1920, withoutEnlargement: true })
          .jpeg({ quality: 75, mozjpeg: true })
          .toFile(tempPath);
          
        fs.unlinkSync(filePath); // Delete original
        fs.renameSync(tempPath, filePath); // Rename temp to original
        
        const newStat = fs.statSync(filePath);
        console.log(`✓ Reduced ${file} to ${(newStat.size / 1024 / 1024).toFixed(2)} MB`);
      }
    }
    console.log('Compression complete!');
  } catch (error) {
    console.error('Error during compression:', error);
  }
}

compressImages();
