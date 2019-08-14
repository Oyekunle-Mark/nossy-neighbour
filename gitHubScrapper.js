const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const url = 'https://github.com/Oyekunle-Mark';

const redditNews = (async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);
    const pinnedRepos = $('.js-pinned-items-reorder-list > li');
    const topRepos = [];
  
    console.log(pinnedRepos);
    
  } catch (err) {
    console.log(err);
  }
})();

redditNews.then(data => console.log(data));
