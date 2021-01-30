
//TODO: only testing
const { imgChartGenerate } = require('../libs/image');
const pdfGenerate = require('../libs/pdf');


const pdfCreate = async (req, res) => {
    // await imageGenerate();
    await pdfGenerate();
    res.send('PDF generado correctamente')

    // res.render('index');
};
const chartCreate = async (req, res) => {
    const data = {
        urlHtmlImage :'https://duckduckgo.com/',
        nameImage : 'images',
        user : 'user',
        extensionType : 'png',
    }
    await imgChartGenerate(data);
    res.send('Generate Image Chart JS...');
};

module.exports = { pdfCreate, chartCreate }