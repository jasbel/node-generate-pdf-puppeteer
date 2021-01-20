const puppeteer = require('puppeteer');

const pdfGenerate = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/nodejs/Release#release-schedule', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'hn.pdf', format: 'A4'});

  await browser.close();
};

module.exports = pdfGenerate;