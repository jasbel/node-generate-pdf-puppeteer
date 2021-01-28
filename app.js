//documentation:  https://github.com/puppeteer/puppeteer
const express = require('express');
const app = express();
const { imgGenerate, imgChartGenerate } = require('./src/image');
const pdfGenerate = require("./src/pdf");
const port = 3000

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});