/*
 ╭──────────────────────[README:]────────────────────────╮
 ╽ This is the main server file for the HWML main page.  ╽
 ║                                                       ║
 ║ It uses Node.js, EJS, and Express to deliver content. ║
 ║                                                       ║
 ║ This server does not function the same way as a       ║
 ║ normal Apache or NGINX server, so keep that in mind   ║
 ║ when modifying the files within it.                   ║
 ╿                                                       ╿
 ├───────────────────────────────────────────────────────┤
 ╽ Requirements:                                         ╽
 ║                                                       ║
 ║ Node.js v14+                                          ║
 ╿                                                       ╿
 ├───────────────────────────────────────────────────────┤
 ╽ Libraries used:                                       ╽
 ║                                                       ║
 ║ - Express                                             ║
 ║ - Express-minify                                      ║
 ║ - Compression                                         ║
 ║ - fs-extra                                            ║
 ║ - sharp                                               ║
 ║                                                       ║
 ║ These libraries can be installed using npm.           ║
 ╿                                                       ╿
 ╰───────────────────────────────────────────────────────╯
 */

// Add the required libraries
const express = require('express');
const minify = require('express-minify');
const compression = require('compression');
const path = require('path');
let app = express();

// Import the gallery code and set up the main page gallery
resize = require('./utils/resize_images.js');
let mainGallery = resize.resizeGalleries('main_gallery', 800);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the public directory
app.use(express.static(__dirname + '/public'));

// Set some default variables:
const appDir = path.dirname(require.main.filename);
const defaultDescription = "The Harold W. Manter Laboratory of Parasitology is ranked as one of the the most important centers of Systematic Parasitology in the World."

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

// Set up the main page
app.get('/', function(_req, res) {
    res.locals.appDir = appDir;

    // This line sets the title per page
    res.locals.title = "HWML | Nebraska";

    // This line sets the description in the OpenGraph preview (like on Discord)
    res.locals.description = defaultDescription;

    res.render('pages/main', {imagePaths: mainGallery});
});

// Set up other pages
app.get('/policy', function(_req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Collections Policy | HWML | Nebraska";
    res.locals.description = defaultDescription;
    res.render('pages/policy');
});
app.get('/people', function(_req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Staff | HWML | Nebraska";
    res.locals.description = defaultDescription;
    res.render('pages/staff');
});
app.get('/research', function(_req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Research | HWML | Nebraska";
    res.locals.description = defaultDescription;
    res.render('pages/research');
});
app.get('/support', function(_req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Funding and Support | HWML | Nebraska";
    res.locals.description = defaultDescription;
    res.render('pages/support');
});

// Set up additional pages
app.get('/documents/mission', function(_req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Mission Statement | HWML | Nebraska";
    res.locals.description = "The HWML Mission Statement";
    res.render('pages/documents/mission');
});

app.get('/documents/specimen-deposition', function(_req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Specimen Deposition | HWML | Nebraska";
    res.locals.description = "Instructions for specimen deposition in the Manter Laboratory";
    res.render('pages/documents/specimen-deposition');
});

app.get('/documents/zaiman', function(_req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Zaiman Medical Parasite Images | HWML | Nebraska";
    res.locals.description = "The collection of Dr. Herman Zaiman's slides";
    res.render('pages/documents/zaiman');
});

app.get('/documents/centenary', function(_req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Centenary Schedule | HWML | Nebraska";
    res.locals.description = "The schedule of activities for the Pritchard centenary celebration";
    res.render('pages/documents/pritchard-centennial-schedule.ejs');
});

app.get('*', function(_req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "404 | HWML | Nebraska";
    res.locals.description = "404 Page";
    res.render('pages/errors/404');
});

console.log('Set up pages');

// Set up server side compression
app.use(compression());
app.use(minify());

// Start the server
app.listen(7990);
console.log('Server is listening on http://0.0.0.0:7990');
