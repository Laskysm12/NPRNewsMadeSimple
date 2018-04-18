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

// Initialize Express
var app = express();

// Tells the console what server.js is doing
console.log("\n*************************\n" + 
            "Grabbing the title, brief summary, and link\n" +
            "of the top articles from NPR's website:" +
            "\n*************************\n");
