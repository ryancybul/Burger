// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
let db = require('./models');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// initiate handlebars with default layout
var exphbs = require("express-handlebars");
app.engine(
	"handlebars",
	exphbs({
		defaultLayout: "main"
	})
);
app.set("view engine", "handlebars");

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js");


// Starting our Express app
// =============================================================
db.sequelize.sync().then(function(){
  app.listen(PORT, function(){
    console.log('app listening on port ' + PORT)
  });
});
