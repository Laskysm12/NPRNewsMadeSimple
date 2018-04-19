// Require dependecies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Parses markup & used as a scraping tool
var cheerio = require("cheerio");

// Makes HTTP request for HTML page
var request = require("request");

// Require all models
var db = require("./models");

// Sets port for Heroku deployment
var PORT = process.env.PORT || 3000

// Tells the console what server.js is doing
console.log("\n*******************************************\n" + 
            "Grabbing the title, a brief summary, and link\n" +
            "of the top articles from NPR's website:" +
            "\n*******************************************\n");

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

// Initialize Express
var app = express();

// Serve static content for the app from the "public" directory in the app directory
app.use(express.static("public"));

// app.use('/static', express.static(path.join(__dirname, 'public')))
// ************************************************
// FROM HERE ON NEED TO FIGURE OUT WHAT IS GOING ON
// ************************************************


// Allows the use of body-parser for the app
app.use(bodyParser.urlencoded({
    extended: false // Jeff has this as true in cats app
}));

//****JEFF DOESN'T USE THIS IN CATS */
app.use(bodyParser.text());

// Parse application/JSON -> ***** JEFF has this differently in cats app
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Express-handlebars package
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//*********NEW*****
// Import routes and give the server access to them
var routes = require("./controllers/controller.js");

// ****THIS IS WHERE THE ERROR Message WAS coming from!!!
app.use("/", routes);
//*****End of New**** */


// Start the server
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  