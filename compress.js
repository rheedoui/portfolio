const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "./assets/featured-original";
const outputDir = "./assets/featured";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(file =>
  file.toLowerCase().endsWith(".jpg") ||
  file.toLowerCase().endsWith(".jpeg") ||
  file.toLowerCase().endsWith(".png")
);

(async () => {
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    await sharp(inputPath)
      .resize({ width: 2000 })
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    console.log(`Compressed: ${file}`);
  }

  console.log("All images optimized.");
})();