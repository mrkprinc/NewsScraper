const express = require('express');
const bodyParser = require('body-parser');
const handBars = require('express-handlebars');
const db = require("./models");

const PORT = 3000;
const app = express();
const router = express.Router();
require('./controller/controller.js')(router);

app.use(bodyParser.urlencoded({ extended: true }))
app.engine("handlebars", handBars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.listen(PORT, function() {
  console.log("Ready at localhost:" + PORT);
});
