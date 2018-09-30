const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const db = require("./models");

const PORT = 3000;
const app = express();
const router = express.Router();
require('./controller/controller.js')(router);

const hbs = exphbs.create({defaultLayout: 'main', partialsDir: 'views/_partials/'})

app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

hbs.getPartials({precompiled: true}).then(function(partials) {
  // TEMP
  console.log(partials);
})

app.listen(PORT, function() {
  console.log("Ready at localhost:" + PORT);
});
