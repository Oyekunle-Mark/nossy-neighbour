const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const url = 'https://github.com/Oyekunle-Mark';

const gitHubTopRepos = (async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);
    const pinnedRepos = $('.js-pinned-items-reorder-list > li');
    const topRepos = [];

    pinnedRepos.each(function() {
      const title = $(this)
        .find('.js-pinnable-item')
        .text();
      const description = $(this)
        .find('.pinned-item-desc')
        .text().trim();
      const language = $(this)
        .find('span[itemprop="programmingLanguage"]')
        .text();

      topRepos.push({
        title,
        description,
        language,
      });
    });

    return topRepos;
  } catch (err) {
    console.log(err);
  }
})();

gitHubTopRepos.then(data => console.log(data));
