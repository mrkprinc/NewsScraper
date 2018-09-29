const mongoose = require('mongoose');
const cheerio = require('cheerio');

// CONFIG
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

module.exports = function(app) {
  
}