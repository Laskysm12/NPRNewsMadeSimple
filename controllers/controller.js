var express = require("express");

var router = express.Router();

var db = require("../models");

// Create all of our routes and set up logic within those routes when required
router.get('/', function(req, res) {
    res.render("index"); // Need to change!!

}); // End of router .get

module.exports = router;