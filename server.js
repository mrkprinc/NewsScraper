const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public/'));

const router = express.Router();
require('./controller/controller.js')(router);
app.use('/', router);

const hbs = exphbs.create({defaultLayout: 'main'})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.listen(PORT, function() {
  console.log("Ready at localhost:" + PORT);
});