const mongoose = require('mongoose');
const cheerio = require('cheerio');
const request = require('request');

// CONFIG
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

module.exports = function(router) {

  router.get('/', function(req, res) {
    res.render('index', {});
  })

  router.get('/scrape', function(req, res) {
    request('https://www.theguardian.com/international', function(err, response, body) {
      var $ = cheerio.load(body);
      // TEMP
      res.end();
    })
  })

}