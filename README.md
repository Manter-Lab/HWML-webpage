# HWML Web Page Server

This is the main server file for the HWML main page. It uses NodeJS, EJS, and Express to deliver content. It doesn't work the same way as a normal Apache or NGINX server, so keep that in mind when modifying the files within it.

## Prerequisites:

This server requires [NPM](https://www.npmjs.com/) and [Node](https://nodejs.org/en) v14+ to run.

## Dependencies

This server utilizes the following libraries:

- [Express](https://expressjs.com/)
- [Express Minify](https://www.npmjs.com/package/express-minify)
- [Compression](https://www.npmjs.com/package/compression)
- [EJS](https://ejs.co/)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [Sharp](https://sharp.pixelplumbing.com/)

## Getting Started

Setting up the site is simple! Just follow these steps:

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/G2-Games/HWML-webpage.git
    ```
    
2. Navigate to the project directory in your terminal:

    ```bash
    cd HWML-webpage
    ```

3. Run `npm install` to install the necessary dependencies.
4. Run `npm start` to start the server.

## Creating a Page

To create a new page, follow these steps:

1. Create a new .ejs file in the views/pages directory.
    - Ex. `/views/pages/page.ejs`
2. Copy the contents of `main.ejs` to your new file.
3. Update the contents of your new file to match the content of your new page.
    - Be sure to utilize the CSS classes properly! Follow how it's done on the existing pages
4. Create a new route in `server.js` for your new page, like so:

```javascript
app.get('/your-page', function(req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Your Page Title";
    res.locals.description = "Your Page Description";
    res.render('pages/your-page');
});
```
5. Change "Your Page Title" to the title of the new page, and change "Your Page Description" to a description of the content of the new page

## Creating a Gallery

1. Create a new folder in the `public/images` directory.
2. Add the images you want to display to the folder
3. Import the `resize_images.js` module in the `server.js` file:

```javascript
resize = require('./utils/resize_images.js');
```
4. Call the `resizeGalleries()` function, replacing "your-gallery" with the name of your new folder and `800` with the desired image width in pixels:

```javascript
const newGallery = resize.resizeGalleries("your-gallery", 800);
```
5. Include the gallery in your new page when rendering as a variable, like this:

```javascript
res.render('pages/your-page', {imagePaths: newGallery});
```
6. Include the gallery somewhere in your page:

```javascript
<%- include(appDir + '/views/partials/gallery'); %>
```
7. Save, and restart the server. Additionally, the server must be restarted when changing the gallery's images.
