const axios = require('axios');
const cheerio = require('cheerio');

const url =
  'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';

const ePLTopScorers = (async () => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const statsTable = $('.statsTableContainer > tr');
    const topScorers = [];

    statsTable.each(function() {
      const rank = $(this)
        .find('.rank > strong')
        .text();
      const name = $(this)
        .find('.playerName > strong')
        .text();
      const nationality = $(this)
        .find('.playerCountry')
        .text();
      const goals = $(this)
        .find('.mainStat')
        .text();

      topScorers.push({
        rank,
        name,
        nationality,
        goals,
      });
    });

    return topScorers;
  } catch (err) {
    console.log(err.message);
  }
})();

ePLTopScorers.then(data => console.log(data));
