// Dependencies
// =============================================================
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads landing page
    app.get("/", function (req, res) {
        res.render("index");
    });

    // login route loads login page
    app.get("/login", function (req, res){
        res.render("login");
    });

    // sending entered data to db
    app.post("/login", function (req, res){
        // db.User
    });

    // trip route loads trip.html
    app.get("/trip", function (req, res){

    });

    // profile route loads profile.html
    app.get("/profile/:id", function (req, res){

    });

}