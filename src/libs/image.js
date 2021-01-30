const puppeteer = require('puppeteer');
const path = require('path');

const defaultImgData = {
    urlHtmlImage :'https://www.google.com/',
    nameImage : 'images',
    user : 'user',
    extensionType : 'png',
};

const imgChartGenerate = async ( imgData = defaultImgData ) => {
    const { urlHtmlImage, nameImage, user, extensionType, numberImage } = imgData;

    const numberImg = numberImage || Math.floor((Math.random() * 100) + 1);
    const urlImage = path.join( __dirname ,`../generate/imgs/${nameImage}-${user}-${numberImg}.${extensionType}`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlHtmlImage);
    await page.screenshot({ path: urlImage });

    await browser.close();

    return urlImage;
};

module.exports = { imgChartGenerate};