"use strict";
const providers = require('./providers');
const smmry = require('smmry-fi');


function findProvider(url) {
  let mathingProvider;

  Object.keys(providers).forEach((providerName) => {
    const provider = providers[providerName];

    if (provider.pattern.test(url)) {
      mathingProvider = provider;
    }
  });

  return mathingProvider;
}

module.exports = function scraper(url) {
  const provider = findProvider(url);

  return new Promise((resolve, reject) => {
    if (provider) {
      provider.callback(url)
      .then((results) => {
          resolve({
            title: results.title,
            original: results.content,
            summary: smmry(results.content),
          });
        })
        .catch(reject);
    } else {
      reject(`Unable to find provider for URL ${url}`);
    }
  });
};
