const mongoose = require('mongoose');
const cheerio = require('cheerio');
const request = require('request');

// CONFIG
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

const db = require("../models");

module.exports = function(router) {

  router.get('/', (req, res) => {
    res.render('index', {});
  })

  router.get('/scrape', function(req, res) {
    request('https://www.theguardian.com/international', (err, response, body) => {
      let $ = cheerio.load(body);
      $('#headlines').find('a.fc-item__link').each((i, element) => {
        let result = {
          url: $(element).attr('href'),
          topic: $(element).children('span.fc-item__kicker').text(),
          headline: $(element).find('span.js-headline-text').text()
        }
        db.Article.create(result).then(dbArticle => console.log(dbArticle));
      })
      res.end();
    })
  })

}