// This function resizes images for display in a gallery
// To use, simply pass the name of the folder where you stored
// the images under '/images', such as "main_gallery"
const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

module.exports = {
    resizeGalleries: function (galleryName, width = 640) {
        const imageDir = 'public/images/' + galleryName;
        const resizeDir = 'public/galleries/' + galleryName;
        const imageFilenames = fs.readdirSync(imageDir);

        // Ensure the target resize directory exists and is clear
        fs.emptyDirSync(resizeDir);

        // Loop over all the images in the original directory,
        // getting the base file name without extension
        imageFilenames.forEach(function (item, index) {
            const baseFileName = path.parse(item).name;

            sharp(imageDir + '/' + item)
            .rotate()
            .resize({ width: width })
            .webp()
            .toFile(resizeDir + '/' + baseFileName + '.webp');
        });

        // Clean up the filenames and paths and prepare them for
        // delivery to the output
        var finalImages = [];
        var origImgExt = [];
        imageFilenames.forEach(function (item, index) {
            console.log(item);
            finalImages[index] = galleryName + '/' + path.parse(item).name;
            origImgExt[index] = path.parse(item).ext; // Get the original extension
        });

        // Return an array with the other arrays
        return [finalImages, origImgExt];
    }
}
