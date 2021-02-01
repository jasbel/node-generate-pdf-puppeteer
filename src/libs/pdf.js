const puppeteer = require("puppeteer");

const defaultPDFData = {
    urlHtml : "http://localhost:3000/generate-html-chart",
    namePDF : "chart",
    user : 'user',
    sizePDF : "A4",
    // numberPDF: 111
}

const pdfGenerate = async (PDFData) => {
    const { urlHtml: dUrl, namePDF: dName, user: dUser, sizePDF: dSize } = defaultPDFData ;
    const { urlHtml=dUrl, namePDF=dName, user=dUser, sizePDF=dSize, numberPDF } = PDFData ;
    const numPDF = numberPDF || randomNumber();
    const urlPath = `./src/generate/pdfs/${namePDF}-${user}-${numPDF}.pdf`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlHtml, { waitUntil: "networkidle2" });
    await page.pdf({ path: urlPath, format: sizePDF });
    await browser.close();
};

const randomNumber = () => {
    
    return Math.floor(Math.random() * 100 + 1);
}

module.exports = pdfGenerate;