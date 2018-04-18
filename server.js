// Npm dependecies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Parses markup/used as a scraping tool
var cheerio = require("cheerio");

// Makes HTTP request for HTML page
var request = require("request");

// Sets port for Heroku deployment
var PORT = process.env.PORT || 3000

// Tells the console what server.js is doing
console.log("\n*************************\n" + 
            "Grabbing the title, brief summary, and link\n" +
            "of the top articles from NPR's website:" +
            "\n*************************\n");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

// Checks for any mongoose errors
db.on('error', function(error) {
    console.log('Error with Mongoose: ', error)
});

// Message displayed if mongoose success
db.on('open', function() {
    console.log('Successful Mongoose connection')
});

// Make public a static dir ???????????????????
app.use(express.static('public'));

// Initialize Express
var app = express();

// ************************************************
// FROM HERE ON NEED TO FIGURE OUT WHAT IS GOING ON
// ************************************************

// Express-handlebars package
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')
// Allows the use of body-parser for the app
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

var router = require('./controllers/controller.js');
app.use('/', router)

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  