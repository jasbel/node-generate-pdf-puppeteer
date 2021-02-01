
//TODO: only testing
const { imgChartGenerate } = require('../libs/image');
const pdfGenerate = require('../libs/pdf');

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

// const getPdfCreate = async (req, res) => {
//     // await imageGenerate();
//     await pdfGenerate();
//     res.send('PDF generado correctamente con Get')
// };

const pdfCreate = async (req, res) => {
    const { urlHtml, namePDF, user, sizePDF, numberPDF } = req.body;
    console.log(req);
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



module.exports = { /* getPdfCreate, */ pdfCreate, chartCreate, htmlCreate }