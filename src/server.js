//documentation:  https://github.com/puppeteer/puppeteer
const express = require('express');
const path = require('path');
const app = express();
const expHbs = require('express-handlebars');
const port = 3000;

/** Setting */
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expHbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./libs/handlebars'),
}))
app.set('view engine', '.hbs');

/** API */
app.use(require('./routes/pdf.route'));

/** Static Files */
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;