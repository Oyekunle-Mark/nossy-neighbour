const axios = require('axios');
const cheerio = require('cheerio');

const url =
  'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';

axios
  .get(url)
  .then(res => {
    const $ = cheerio.load(res.data);
    const statsTable = $('.statsTableContainer > tr');
    console.log(statsTable);
  })
  .catch(err => console.log(err.message));
