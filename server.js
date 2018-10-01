const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const fs = require('file-system');

const db = require("./models");

const PORT = 3000;
const app = express();
const router = express.Router();
require('./controller/controller.js')(router);

const hbs = exphbs.create({defaultLayout: 'main', extname: '.hbs', partialsDir: 'views/_partials/'})

app.use(bodyParser.urlencoded({ extended: true }))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));

hbs.getPartials({precompiled: true}).then(function(partials) {
  fs.writeFileSync('public/js/hbs-templates.js', JSON.stringify(partials, null, 2));
  app.listen(PORT, function() {
    console.log("Ready at localhost:" + PORT);
  });
})
