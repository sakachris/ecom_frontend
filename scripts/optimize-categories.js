// scripts/optimize-categories.js

import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

// For ES Modules, recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categoriesDir = path.join(__dirname, "../public/categories");
const maxWidth = 800; // max width in px for resizing
const quality = 80; // WebP quality

async function optimizeImages() {
  const files = fs.readdirSync(categoriesDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") continue;

    const inputPath = path.join(categoriesDir, file);
    const outputFileName = `${path.basename(file, ext)}.webp`;
    const outputPath = path.join(categoriesDir, outputFileName);

    try {
      await sharp(inputPath)
        .resize({ width: maxWidth }) // maintain aspect ratio
        .webp({ quality })
        .toFile(outputPath);

      console.log(`✅ Optimized ${file} → ${outputFileName}`);
    } catch (err) {
      console.error(`❌ Failed to process ${file}:`, err);
    }
  }

  console.log("🎉 All images optimized!");
}

optimizeImages();

// const fs = require("fs");
// const path = require("path");
// const sharp = require("sharp");

// const categoriesDir = path.join(__dirname, "../public/categories");
// const maxWidth = 800; // max width in px for resizing
// const quality = 80; // WebP quality

// async function optimizeImages() {
//   const files = fs.readdirSync(categoriesDir);

//   for (const file of files) {
//     const ext = path.extname(file).toLowerCase();
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") continue;

//     const inputPath = path.join(categoriesDir, file);
//     const outputFileName = `${path.basename(file, ext)}.webp`;
//     const outputPath = path.join(categoriesDir, outputFileName);

//     try {
//       await sharp(inputPath)
//         .resize({ width: maxWidth }) // maintain aspect ratio
//         .webp({ quality })
//         .toFile(outputPath);

//       console.log(`✅ Optimized ${file} → ${outputFileName}`);
//     } catch (err) {
//       console.error(`❌ Failed to process ${file}:`, err);
//     }
//   }

//   console.log("🎉 All images optimized!");
// }

// optimizeImages();
