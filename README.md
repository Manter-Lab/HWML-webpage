# HWML Web Page Server

This is the main server file for the HWML main page. It uses NodeJS, EJS, and Express to deliver content. It doesn't work the same way as a normal Apache or NGINX server, so keep that in mind when modifying the files within it.

## Requirements:

This server file requires Node v14+ to run.

## Dependencies

This server file utilizes the following libraries:

- Express
- Express Minify
- Compression
- EJS
- fs-extra
- Sharp

## Getting Started

Setting up the site is simple! Just follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the necessary dependencies.
4. Run `npm start` to start the server.

## Creating a Page

To create a new page, follow these steps:

1. Create a new .ejs file in the views/pages directory.
    - Ex. `/views/pages/page.ejs`
2. Copy the contents of `main.ejs` to your new file.
3. Update the contents of your new file to match the content of your new page.
4. Create a new route in `server.js` for your new page, like so:

```javascript
app.get('/your-page', function(req, res) {
    res.locals.appDir = appDir;
    res.locals.title = "Your Page Title";
    res.locals.description = "Your Page Description";
    res.render('pages/your-page');
});
```
5. Change "Your Page Title" to be whatever the title of the new page, and change "Your Page Description" to the description of the content of the new page
