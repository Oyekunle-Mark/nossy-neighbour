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

    const $ = cheerio.load(html);
    const phoneSection = $('.products > .-gallery');
    topPhones = [];

    phoneSection.each(function() {
      if (
        $(this)
          .find('.name')
          .text()
      ) {
        const name = $(this)
          .find('.name')
          .text();

        const price = $(this)
          .find('.price span[dir="ltr"]')
          .first()
          .text();

        const image = $(this).find('.image')[0].attribs['data-src'];

        topPhones.push({
          image,
          name,
          price,
        });
      }
    });

    console.log(topPhones);
  } catch (err) {
    console.log(err);
  }
})();
