module.exports = {
  pattern: /^https?:\/\/(www\.)?yle\.fi\/uutiset\/[0-9]-[0-9]+\/?$/,

  callback: (url) => {
    const request = require('request');
    const cheerio = require('cheerio');

    return new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
        if (!error) {
          const $ = cheerio.load(html);

          resolve({
            title: $('.yle__article__heading').text(),
            content: $('.yle__article__content').text(),
          });
        } else {
          reject(error);
        }
      });
    });
  },
};
