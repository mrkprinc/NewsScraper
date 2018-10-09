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

  router.get('/recent-articles', (req, res) => {
    db.Article.find().sort({createdAt: -1}).limit(35).then(dbArticles => {
      res.json(dbArticles);
    })
  })

  router.get('/scrape', (req, res) => {
    request('https://www.theguardian.com/international', (err, response, body) => {
      let $ = cheerio.load(body);
      let results = [];
      $('#headlines').find('a.fc-item__link').each((i, element) => {
        if($(element).attr('href')) {
          let result = {
            url: $(element).attr('href'),
            topic: $(element).children('span.fc-item__kicker').text(),
            headline: $(element).find('span.js-headline-text').text()
          }
          results.push(result);
        }
      })
      res.json(results);
    })
  })

  router.post('/scrape', (req, res) => {
    db.Article.insertMany(req.body.articles).then(dbArticles => {
      res.json(dbArticles);
    })
  })

}