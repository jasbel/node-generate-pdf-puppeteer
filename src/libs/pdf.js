

const puppeteer = require("puppeteer");
const htmlContentForPDF = require("./htmlPdfContent");

/** Refactoring code */

//TODO: Refactorizar codigo y buenas practicas
const defaultData = {
    // PDF
    urlHtml : "http://localhost:3000/generate-html-chart",
    namePDF : "chart",
    user : 'user',
    sizePDF : "A4",
    // numberPDF: 111
}

/** Generar PDF con una URL definida */
const pdfGenerate = async (PDFData) => {
    //Default value
    const { urlHtml: dUrl, namePDF: dName, user: dUser, sizePDF: dSize, } = defaultData ;
    const { urlHtml=dUrl, namePDF=dName, user=dUser, sizePDF=dSize, numberPDF } = PDFData ;
    const numPDF = numberPDF || randomNumber();
    const urlPath = `./src/generate/pdfs/${namePDF}-${user}-${numPDF}.pdf`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlHtml, { waitUntil: "networkidle2" });
    await page.pdf({ path: urlPath, format: sizePDF });

    await browser.close();
};

/** IMPORTANT: Generar PDF con un archivo estatico HTML creado */
const pdfGenerateStatic = async (data) => {
    //Valores por defecto
    const { namePDF: _namePDF, user: _user, sizePDF: _sizePDF, dataChart: _dataChart } = defaultData ;

    //Valores asignados para llamar a las funciones
    const { namePDF=_namePDF, user=_user, sizePDF=_sizePDF, numberPDF, dataChart } = data;

    //valor random
    const numPDF = numberPDF || randomNumber();
    const urlPath = `./src/generate/pdfs/${namePDF}-${user}-${numPDF}.pdf`;

    //Iniciacion de browsers para el renderizado del PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //Llamada al metodo que contiene la estructura HTML-CSS-JS
    const htmlContent = htmlContentForPDF(dataChart);

    //Renderizado del HTML
    await page.setContent(htmlContent)

    //Generacion del pdf el el path de direccion indicado y formato de pdf establecido
    await page.pdf({ path: urlPath, format: sizePDF });

    //Cierre del browser
    await browser.close();
};

const randomNumber = () => {
    
    return Math.floor(Math.random() * 100 + 1);
}

module.exports = { pdfGenerate, pdfGenerateStatic};