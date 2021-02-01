const {Router} = require('express');
const { /* getPdfCreate, */ pdfCreate, chartCreate, htmlCreate, pdfCreateStatic } = require('../controllers/pdf.controller');

const router = Router();

/** API - Routes */
//TODO: averiguar porque async-await me esta ayudando

router.get('/', async (req, res) => {
    res.send('Home Principal')
})

router.get('/generate-html-chart', htmlCreate)

router.post('/api/generate-pdf', pdfCreate);

router.post('/api/generate-pdf-static', pdfCreateStatic);

router.get('/api/generate-img-chart', chartCreate);

module.exports = router;