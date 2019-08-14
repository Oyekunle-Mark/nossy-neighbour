const puppeteer = require('puppeteer');
cheerio = require('cheerio');

const url = 'https://www.jumia.com.ng/phones-tablets/';

const topPhonesAndTables = (async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    html = await page.content();
    await browser.close();

    console.log(html);
  } catch (err) {
    console.log(err);
  }
})();
