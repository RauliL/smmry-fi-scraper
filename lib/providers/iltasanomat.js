module.exports = {
  pattern: /^https?:\/\/(www\.)iltasanomat\.fi\/[^\/]+\/art-[0-9]+\.html$/,

  callback: (url) => {
    const request = require('request');
    const cheerio = require('cheerio');
    const striptags = require('striptags');
    const decode = require('ent/decode');

    return new Promise((resolve, reject) => {
      request(url, (error, response, html) => {
        if (!error) {
          const $ = cheerio.load(html);

          resolve({
            title: $('[itemprop~=headline]').text(),
            content: decode(striptags($('[itemprop~=articleBody]').html())),
          });
        } else {
          reject(error);
        }
      });
    });
  },
};
