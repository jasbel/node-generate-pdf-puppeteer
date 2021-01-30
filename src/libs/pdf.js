const puppeteer = require("puppeteer");
const { imgChartGenerate } = require("./image");

const defaultPDFData = {
    urlHtml : "http://localhost:3000/generate-html-chart",
    namePDF : "chart",
    user : 'user',
    sizePDF : "A4",
    // numberPDF: 111
}

const pdfGenerate = async (PDFData = defaultPDFData) => {
    const { urlHtml, namePDF, user, sizePDF, numberPDF } = PDFData ;
    const numPDF = numberPDF || Math.floor(Math.random() * 100 + 1);
    const urlPath = `./src/generate/pdfs/${namePDF}-${user}-${numPDF}.pdf`;

    /** Images */
    const dataImg = {
        urlHtmlImage :'https://www.google.com/',
        nameImage : 'images',
        user : 'user',
        extensionType : 'jpg',
        numberImage: numPDF
    }

    const imgPath = await imgChartGenerate(dataImg);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlHtml, { waitUntil: "networkidle2" });
    await page.pdf({ path: urlPath, format: sizePDF });
    await browser.close();

    console.log("Generado correctamente");
};

module.exports = pdfGenerate;