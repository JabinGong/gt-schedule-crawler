const Promise = require('bluebird');

const list = require('./list');
const download = require('./download');
const parse = require('./parse');
const upload = require('./upload');

console.info('Listing ...');
list().then(terms => {
  return Promise.mapSeries(terms.slice(0, 2), term => {
    console.info(`Downloading ${term} ...`);
    return download(term)
      .then(html => {
        console.info('Parsing ...');
        return parse(html);
      })
      .then(termData => {
        console.info('Uploading ...');
        return upload(term, termData);
      });
  });
}).catch(console.error);
