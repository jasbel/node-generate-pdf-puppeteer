const puppeteer = require("puppeteer");
const { imgChartGenerate } = require("./image");

const defaultPDFData = {
    urlHtml : "https://www.google.com/",
    namePDF : "chart",
    user : 'user',
    sizePDF : "A4",
    // numberPDF: 111
}

const pdfGenerate = async (PDFData = defaultPDFData) => {
    const { urlHtml, namePDF, user, sizePDF, numberPDF } = PDFData ;
    const numPDF = numberPDF || Math.floor(Math.random() * 100 + 1);
    const urlPath = `./generate/pdfs/${namePDF}-${user}-${numPDF}.pdf`;

    /** Images */
    const data = {
        urlHtmlImage :'https://www.google.com/',
        nameImage : 'images',
        user : 'user',
        extensionType : 'png',
        numberImage: numPDF
    }

    // const urlImage =  imgChartGenerate();
    const imgPath = await imgChartGenerate(data);

    console.log(imgPath);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlHtml, { waitUntil: "networkidle2" });
    await page.pdf({ path: urlPath, format: sizePDF });

    await browser.close();
};

module.exports = pdfGenerate;