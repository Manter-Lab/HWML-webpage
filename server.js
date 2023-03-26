/*
 ╭──────────────────────[README:]──────────────────────╮
 ╽ This is the main server file for the HWML main page ╽
 ║                                                     ║
 ║ It uses NodeJS, EJS, and Express to deliver content ║
 ║                                                     ║
 ║ It doesn't work the same way as a normal Apache or  ║
 ║ NGINX server! Keep that in mind when modifying the  ║
 ╿ files within it.                                    ╿
 ├─────────────────────────────────────────────────────┤
 ╽ REQUIRES Node v14+                                  ╽
 ║                                                     ║
 ║ This server file utilizes some libraries, which are ║
 ╿ listed below ↯                                      ╿
 ╰─────────────────────────────────────────────────────╯
 */

// Add the required libraries
let express = require('express');
let minify = require('express-minify');
const compression = require('compression');
const path = require('path');
let fs = require('fs-extra');
let app = express();

// Import the gallery code I made
resize = require('./utils/resize_images.js');

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the public directory
app.use(express.static(__dirname + '/public'));

// Set some default variables:
const appDir = path.dirname(require.main.filename);
const defaultDescription = "The Harold W. Manter Laboratory of Parasitology is ranked as one of the the most important centers of Systematic Parasitology in the World."

// Galleries
let mainGallery = resize.resizeGalleries("main_gallery", 800);

/*var resizedImages = [];
(async function() {
    console.log("Starting Resizing...");
    for (let i = 0; i < imageFilenames.length; i++) {
        console.log(i);
        const resizedImageBuf = await require('sharp')(imageDir + imageFilenames[i])
            .rotate()
            .resize({ width: 1200 })
            .webp()
            .toBuffer();

        resizedImages.push(`data:image/png;base64,${resizedImageBuf.toString('base64')}`);
    }

    console.log("Finished Resizing!");
})(); */

/*
 * Below is a template for how to set up a page,  *
 * comments are provided to explain what stuff is *
 */
app.get('/', function(req, res) {
    res.locals.appDir = appDir;

    // This line sets the title per page
    res.locals.title = "HWML | Nebraska";

    // This line sets the description in the OpenGraph preview (like on Discord)
    res.locals.description = defaultDescription;

    res.render('pages/main', {imagePaths: mainGallery});
});

// Create other pages
app.get('/policy', function(req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Collections Policy | HWML | Nebraska";
    res.locals.description = defaultDescription;
    res.render('pages/policy');
});
app.get('/staff', function(req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Staff | HWML | Nebraska";
    res.locals.description = defaultDescription;
    res.render('pages/staff');
});
app.get('/research', function(req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Research | HWML | Nebraska";
    res.locals.description = defaultDescription;
    res.render('pages/research');
});
app.get('/support', function(req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Funding and Support | HWML | Nebraska";
    res.locals.description = defaultDescription;
    res.render('pages/support');
});

// Set up additional pages
app.get('/documents/mission', function(req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Mission Statement | HWML | Nebraska";
    res.locals.description = "The HWML Mission Statement";
    res.render('pages/documents/mission');
});

console.log('Set up pages');

// Set up server side compression
app.use(compression());
app.use(minify());

// Start the server
app.listen(7990);
console.log('Server is listening on port 7990');
