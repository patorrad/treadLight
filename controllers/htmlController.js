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


// Each of the below routes just handles the HTML page that the user gets sent to.

// index route loads landing page
router.get("/", function (req, res) {
    res.render("index");
});

// loads login page
router.get("/login", function (req, res) {
    res.render("login");
});

// sending entered login data to db
router.post('/login', function (req, res) {
    console.log(req.body);
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (dbUser) {
        console.log(dbUser)
        //compares password send in req.body to one in database, will return true if matched.
        if (!dbUser) {
            req.session.user = false;
            req.session.error = 'no user found!'
        }
        else if (bcrypt.compareSync(req.body.password, dbUser.password)) {
            //create new session property "user", set equal to logged in user
            req.session.user = { first_name: dbUser.first_name, id: dbUser.id };
            // router.get("/trip");
        }
        else {
            //delete existing user, add error
            req.session.user = false;
            req.session.error = 'Authentification Failed'
        }
        res.json(req.session);
    })
});

// loads register page
router.get("/register", function (req, res) {
    res.render("register");
});

// sending entered sign up info to db
router.post("/register", function (req, res) {
    db.User.create(req.body).then(function (dbUser) {
        req.session.user = { first_name: dbUser.first_name, id: dbUser.id };
        res.json(dbUser);
    }).catch(err => {
        console.log("register err", err);
        res.send(400)
    })
});

// trip route loads the page
router.get("/trip/", function (req, res) {
    // console.log(googleURL)
    // let googleApiKey = process.env.GOOGLE_API_KEY
    // let cityOne = "Seattle+WA"
    // let cityTwo = "phoenix+az"
    // let vehicleType = "driving"

    // let googleURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + cityOne + "&destinations=" + cityTwo + "&mode=" + vehicleType + "&language=en-FR&key=" + googleApiKey;
    // axios.get(googleURL).then(response => {
    //     // res.json(response.data);
    //     const ourData = {
    //         tripTime: response.data.rows[0].elements[0].duration.text,
    //         tripDistance: response.data.rows[0].elements[0].distance.text,
    //     }
    //     console.log(ourData)
    //     res.render("trip", ourData);
    // })
    // if(req.session.user) {
    //     res.render('trip',req.session.user);
    // }else {
    //     res.send('Need to Login')
    // }
    if(req.session.user){
        res.render("trip", { istrip: true });
    } else {
        res.redirect('/login');
    }
});


router.get("/outputTripData/:co2/:distance/:time/:car/:start/:end", function (req, res) {
    console.log("hello world");
    let googleApiKey = process.env.GOOGLE_API_KEY
    let cityOne = req.params.start
    let cityTwo = req.params.end
    let vehicleType = "driving"

    let googleURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + cityOne + "&destinations=" + cityTwo + "&mode=" + vehicleType + "&language=en-FR&key=" + googleApiKey;
    axios.get(googleURL).then(response => {
        const myData = {
            tripDistance: Math.round(response.data.rows[0].elements[0].distance.value * 0.000621371),
            tripTime_car: (response.data.rows[0].elements[0].distance.value * 0.000621371 / 40).toFixed(2),
            co2var_car: (response.data.rows[0].elements[0].distance.value * 0.000621371 * 1.10231e-6 * 368).toFixed(3),
            tripTime_plane: (response.data.rows[0].elements[0].distance.value * 0.000621371 / 550).toFixed(2),
            co2var_plane: (response.data.rows[0].elements[0].distance.value * 0.000621371 * 1.10231e-6 * 188).toFixed(3),
            tripTime_train: (response.data.rows[0].elements[0].distance.value * 0.000621371 / 550).toFixed(2),
            co2var_train: (response.data.rows[0].elements[0].distance.value * 0.000621371 * 1.10231e-6 * 147).toFixed(3),
            tripTime_bus: (response.data.rows[0].elements[0].distance.value * 0.000621371 / 10).toFixed(2),
            co2var_bus: (response.data.rows[0].elements[0].distance.value * 0.000621371 * 1.10231e-6 * 43).toFixed(3),
            tripDistance: req.params.distance,
            selectedTripDistance: req.params.distance,
            my_tripTime: req.params.time,
            my_co2var: req.params.co2,
            my_money: (req.params.co2 * 10).toFixed(2),
            type: req.params.car,
            cityOne: req.params.start,
            cityTwo: req.params.end

        }
        res.render("trip", myData);
    });
})

router.get("/retrieveTripData/:start/:end", function (req, res) {
    console.log("hello world");
    let googleApiKey = process.env.GOOGLE_API_KEY
    let cityOne = req.params.start
    let cityTwo = req.params.end
    let vehicleType = "driving"

    let googleURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + cityOne + "&destinations=" + cityTwo + "&mode=" + vehicleType + "&language=en-FR&key=" + googleApiKey;
    axios.get(googleURL).then(response => {
        console.log(response.data);
        const ourData = {
            tripDistance: Math.round(response.data.rows[0].elements[0].distance.value * 0.000621371),
            tripTime_car: (response.data.rows[0].elements[0].distance.value * 0.000621371 / 40).toFixed(2),
            co2var_car: (response.data.rows[0].elements[0].distance.value * 0.000621371 * 1.10231e-6 * 368).toFixed(3),
            tripTime_plane: (response.data.rows[0].elements[0].distance.value * 0.000621371 / 550).toFixed(2),
            co2var_plane: (response.data.rows[0].elements[0].distance.value * 0.000621371 * 1.10231e-6 * 188).toFixed(3),
            tripTime_train: (response.data.rows[0].elements[0].distance.value * 0.000621371 / 550).toFixed(2),
            co2var_train: (response.data.rows[0].elements[0].distance.value * 0.000621371 * 1.10231e-6 * 147).toFixed(3),
            tripTime_bus: (response.data.rows[0].elements[0].distance.value * 0.000621371 / 10).toFixed(2),
            co2var_bus: (response.data.rows[0].elements[0].distance.value * 0.000621371 * 1.10231e-6 * 43).toFixed(3),
            cityOne: cityOne,
            cityTwo: cityTwo,
        }
        console.log(ourData)
        //res.json(ourData);
        res.render("trip", ourData);
    })
})

// profile route loads profile.html with data from our tables
router.get("/profile", function (req, res) {
    db.User.findOne({
        raw: true,
        where: {
            id: req.session.user.id
        }
    }).then(function (data) {
        if (req.session.user) {
            console.log(data);
            //Profile info to submit to profile.handlebars
            let profileInfo = {
                first_name: req.session.user.first_name,
                used_carbon: {
                    total: 0,
                    last_five: []
                },
                saved_carbon: {
                    total: 0,
                    last_five: []
                },
                car: data.default_car,
                city: data.default_city,
                positive_stars: [],
                negative_stars: [],
                donated: 0
            };
            //Find all trip info
            db.Trip.findAll({
                raw: true,
                where: {
                    UserId: data.id
                }
            }).then(function (result) {
                //Find total carbon used and saved      
                for (trip in result) {
                    profileInfo.used_carbon.total += result[trip].used_carbon;
                    profileInfo.saved_carbon.total += result[trip].saved_carbon;
                }
                if (profileInfo.saved_carbon.total > 0.4 * profileInfo.used_carbon.total) profileInfo.positive_stars = [0, 1, 2];
                if (profileInfo.saved_carbon.total < 0.4 * profileInfo.used_carbon.total && profileInfo.saved_carbon.total > 0.2 * profileInfo.used_carbon.total) {
                    profileInfo.positive_stars = [0, 1];
                    profileInfo.negative_stars = [0]
                }
                if (profileInfo.saved_carbon.total > 0) {
                    profileInfo.positive_stars = [0];
                    profileInfo.negative_stars = [0, 1]
                }
                else profileInfo.negative_stars = [0, 1, 2];
                //Find last five for plotly chart
                let tripToDisplay = 0;
                result.length < 5 ? tripToDisplay = result.length : tripToDisplay = 5;
                for (let index = 0; index < tripToDisplay; index++) {
                    profileInfo.used_carbon.last_five[index] = result[index].used_carbon;
                    profileInfo.saved_carbon.last_five[index] = result[index].saved_carbon;
                };
            }).then(function () {
                //Find all donation info
                db.Donation.findAll({
                    raw: true,
                    where: {
                        UserId: data.id
                    }
                }).then(function (result) {
                    console.log(result);
                    //Final total donation
                    for (donation in result) {
                        profileInfo.donated += result[donation].money;
                    };
                    console.log(profileInfo.donated);
                    console.log(profileInfo.used_carbon.last_five);
                    console.log(profileInfo.saved_carbon.last_five);
                    res.render('profile', profileInfo);
                });

            });
        } else {
            res.send('Need to Login')
        }
    });
});

// posting step 3 data
router.post("/createTrip", function (req, res) {
    db.Trip.create({
        used_carbon: req.body.used_carbon,
        saved_carbon: req.body.saved_carbon,
        travel_mode: req.body.travel_mode,
        UserId: req.session.user.id
    }).then(function (data) {
        db.Donation.create({
            money: req.body.money,
            UserId: req.session.user.id
        })
        res.json(data);
    })
});

router.post("/createDonation", function(req, res){
    db.Donation.create({
        money: req.body.money,
        UserId: req.session.user.id
    }).then(function(data){
        res.json(data)
    });
});

// router.post("/profile", function (req, res){
//     db.User.findOne
// })

module.exports = router;

