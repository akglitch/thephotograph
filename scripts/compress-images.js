const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public');
const outputDir = path.join(__dirname, '../public/temp_compressed');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(file => 
    file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
);

console.log(`Found ${files.length} images to compress...`);

async function compressImages() {
    let totalOriginalSize = 0;
    let totalCompressedSize = 0;

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file);

        const stats = fs.statSync(inputPath);
        totalOriginalSize += stats.size;

        console.log(`Processing: ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

        try {
            await sharp(inputPath)
                .resize(2000, 2000, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({ quality: 80, progressive: true })
                .toFile(outputPath);

            const compressedStats = fs.statSync(outputPath);
            totalCompressedSize += compressedStats.size;

            console.log(`  Done: ${(compressedStats.size / 1024 / 1024).toFixed(2)} MB`);
        } catch (err) {
            console.error(`  Error processing ${file}:`, err);
        }
    }

    console.log('\n--- Compression Summary ---');
    console.log(`Original Total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Compressed Total: ${(totalCompressedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Savings: ${(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100).toFixed(1)}%`);
    
    console.log('\nSwapping files...');
    // After processing all, move them back to public/
    for (const file of files) {
        const tempPath = path.join(outputDir, file);
        const finalPath = path.join(inputDir, file);
        if (fs.existsSync(tempPath)) {
            fs.renameSync(tempPath, finalPath);
        }
    }
    
    // Cleanup temp gallery
    fs.rmdirSync(outputDir);
    console.log('Optimization complete.');
}

compressImages();
