
//TODO: only testing
const { imgChartGenerate } = require('../libs/image');
const {pdfGenerate, pdfGenerateStatic} = require('../libs/pdf');

/** Generacion del html
 * @method get/generate-html-chart/ renderizando el grafico
 */
const htmlCreate = async (req, res) => {
    const {
        title="Titulo del Chart",
        maxValue=321,
        minValue=23
    } = req.body;

    const dataChart = {
        title,
        maxValue,
        minValue,
    };

    res.render('view-pdf', { dataChart });
};

/** IMPORTANT: principal generador de pdf con chart dinamico */
const pdfCreate = async (req, res) => {
    const { urlHtml, namePDF, user, sizePDF, numberPDF } = req.body;
    const data = {
        urlHtml,
        namePDF,
        user,
        sizePDF,
        numberPDF,
    }
    // console.log("controller :", data);
    await pdfGenerate(data);
    res.send('PDF generado correctamente con Post')
};

/** IMPORTANT: Generador con HTML dinamico */
const pdfCreateStatic = async (req, res) => {
    const { namePDF, user, sizePDF, numberPDF, dataChart } = req.body;
    const data = {
        //PDF
        namePDF,
        user,
        sizePDF,
        numberPDF,

        //CHART
        dataChart,
    };
    await pdfGenerateStatic(data);
    res.send('PDF generado correctamente con Post Static');
};

/** Generador de imagen CHART */
const chartCreate = async (req, res) => {
    const data = {
        urlHtmlImage :'http://localhost:3000/generate-html-chart',
        nameImage : 'images',
        user : 'user',
        extensionType : 'png',
    }
    await imgChartGenerate(data);
    res.send('Generate Image Chart JS...');
};

module.exports = { /* getPdfCreate, */ pdfCreate, pdfCreateStatic, chartCreate, htmlCreate }