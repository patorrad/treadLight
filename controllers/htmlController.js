// Dependencies
// =============================================================
const express = require("express");
const router = express.Router();
var db = require("../models");

// Routes
// =============================================================


    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads landing page
    router.get("/", function (req, res) {
        res.render("index");
    });

    // login route loads login page
    router.get("/login", function (req, res){
        res.render("login");
    });

    // sending entered data to db
    router.post("/login", function (req, res){
        // db.User to get email and password
        // redirect to trip.handlebars
    });

    // trip route loads the page
    router.get("/trip", function (req, res){
        res.render("trip");
    });

    // profile route loads profile.html with data from our tables
    router.get("/profile/:id", function (req, res){

    });

module.exports = router;