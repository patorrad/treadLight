// Dependencies
// =============================================================
const express = require("express");
const router = express.Router();
var db = require("../models");
//npm package import, bcrypt does the encrypting for us
var bcrypt = require('bcrypt');
const axios = require("axios");

// Routes
// =============================================================

//Route to update / add car
router.put("/api/update/car/", function (req, res) {
    console.log(req.session.user.id);
    console.log(req.body);
    
     db.User.update({
         default_car: req.body.carId
     }, {
         where: {
             id: req.session.user.id
         }         
     }).then(function(dbTodo) {
        res.json(dbTodo);
      })
        .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
          res.json(err);
    });;
});

//Route to update / add city
router.put("/api/update/city/", function (req, res) {

     db.User.update({
         default_city: req.body.city
     }, {
         where: {
             id: req.session.user.id
         }         
     }).then(function(dbTodo) {
        res.json(dbTodo);
      })
        .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
          res.json(err);
    });;
});

module.exports = router;