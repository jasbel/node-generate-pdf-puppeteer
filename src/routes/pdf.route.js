const {Router} = require('express');
const { pdfCreate, chartCreate } = require('../controllers/pdf.controller');

const router = Router();

/** API - Routes */
//TODO: averiguar porque async-await me esta ayudando

// app.get('/api/generate-chart/', async (req, res) => {
//     await imgGenerate();
//     res.send('Generate Image Chart JS')
// })

router.get('/', async (req, res) => {
    res.send('Home Principal')
})

router.get('/generate-html-chart',async (req, res) => {
    const dataChart = {
        title: "Titulo del Chart",
        maxValue: 321,
        minValue: 23
    }
    res.render('view-pdf', { dataChart })
})

router.get('/api/generate-pdf', pdfCreate);

router.get('/api/generate-img-chart', chartCreate);

module.exports = router;