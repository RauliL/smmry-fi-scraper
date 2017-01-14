module.exports = {
  pattern: /^https?:\/\/(www\.)ts\.fi\/uutiset\/[^\/]+\/[0-9]+\/[^\/]+\/?/,

  callback: (url) => {
    const request = require('request');
    const cheerio = require('cheerio');

    return new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
        if (!error) {
          const $ = cheerio.load(html);

          resolve({
            title: $('h1.otsikko').text(),
            content: $('.tsv3-c-common-article__textitem--teksti .teksti').text(),
          });
        } else {
          reject(error);
        }
      });
    });
  },
};
