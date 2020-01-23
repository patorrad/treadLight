// Dependencies
// =============================================================
const express = require("express");
const router = express.Router();
var db = require("../models");
//npm package import, bcrypt does the encrypting for us
var bcrypt = require('bcrypt');

// Routes
// =============================================================


    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads landing page
    router.get("/", function (req, res) {
        res.render("index");
    });

    // loads login page
    router.get("/login", function (req, res){
        res.render("login");
    });

    // sending entered login data to db
    router.post('/login',function(req,res){
        db.User.findOne({
            where:{
                email: req.body.email
            }}).then(function(dbUser){
                //compares password send in req.body to one in database, will return true if matched.
            if(bcrypt.compareSync(req.body.password,dbUser.password)) {
                //create new session property "user", set equal to logged in user
                req.session.user = {first_name:dbUser.first_name,id:dbUser.id};
            }
            else {
                //delete existing user, add error
                req.session.user= false;
                req.session.error = 'auth failed bro'
            }
            res.json(req.session);
        })
    });

    // loads register page
    router.get("/")

    // sending entered sign up info to db
    router.post("/register", function (req, res){
        db.User.create(req.body).then(function(data){
            res.json(data);
        });
    });

    // trip route loads the page
    router.get("/trip", function (req, res){

    });

    // profile route loads profile.html with data from our tables
    router.get("/profile/", function (req, res){
        db.User.findOne({
            where: {
                id: req.session.user.id
            }
        }).then(function(data){
            res.render("profile", data)
        });
    });

module.exports = router;