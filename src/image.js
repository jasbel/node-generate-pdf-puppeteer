const puppeteer = require('puppeteer');
const defaultImgData = {
    urlHtmlImage :'https://www.google.com/',
    nameImage : 'images',
    user : 'user',
    extensionType : 'png',
}

const imgGenerate = async () => {
    const { urlHtmlImage, nameImage, user, extensionType } = defaultImgData;

    const numberImg = Math.floor((Math.random() * 100) + 1);
    const urlImage = `./generate/imgs/${nameImage}-${user}-${numberImg}.${extensionType}`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlHtmlImage);
    await page.screenshot({ path: urlImage });

    await browser.close();
};

const imgChartGenerate = async ( imgData = defaultImgData ) => {
    const { urlHtmlImage, nameImage, user, extensionType, numberImage } = imgData;

    const numberImg = numberImage || Math.floor((Math.random() * 100) + 1);
    const urlImage = `./generate/imgs/${nameImage}-${user}-${numberImg}.${extensionType}`;
    console.log(urlImage);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlHtmlImage);
    await page.screenshot({ path: urlImage });

    await browser.close();

    return urlImage;
};

module.exports = { imgGenerate, imgChartGenerate};