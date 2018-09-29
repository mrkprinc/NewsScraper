const express = require('express');
const bodyParser = require('body-parser');
const handBars = require('express-handlebars');
const db = require("./models");
const router = require('./controller/controller.js')(app);

var PORT = 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(router);
app.engine("handlebars", handBars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.listen(PORT, function() {
  console.log("Ready at localhost:" + PORT);
});
