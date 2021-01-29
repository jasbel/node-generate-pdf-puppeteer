//documentation:  https://github.com/puppeteer/puppeteer
const express = require('express');
const app = express();
const { imgGenerate, imgChartGenerate } = require('./libs/image');
const pdfGenerate = require("./libs/pdf");
const port = 3000;

/** Setting */
app.set('port', port);
// app.set('views', path.join(__dirname, 'views'))

/** API */
//TODO: averiguar porque async-await me esta ayudando
app.get('/', async (req, res) => {
    res.send('Home Principal')
})

app.get('/api/generate-pdf/', async (req, res) => {
    // await imageGenerate();
    await pdfGenerate();
    res.send('PDF generado correctamente')
})

app.get('/api/generate-chart/', async (req, res) => {
    await imgGenerate();
    res.send('Generate Image Chart JS')
})

app.get('/api/generate-img-chart/', async (req, res) => {
    const data = {
        urlHtmlImage :'https://duckduckgo.com/',
        nameImage : 'images',
        user : 'user',
        extensionType : 'png',
    }
    await imgChartGenerate(data);
    res.send('Generate Image Chart JS...')
})

module.exports = app;