module.exports = {
  pattern: /^https?:\/\/(www\.)iltasanomat\.fi\/[^\/]+\/art-[0-9]+\.html$/,

  callback: (url) => {
    const request = require('request');
    const cheerio = require('cheerio');

    return new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
        if (!error) {
          const $ = cheerio.load(html);
          const $content = $('[itemprop~=articleBody]');

          $('figure, h1, h2, h3, h4, h5, h6, script, .hidden', $content).remove();
          resolve({
            title: $('[itemprop~=headline]').text(),
            content: $content.text(),
          });
        } else {
          reject(error);
        }
      });
    });
  },
};
