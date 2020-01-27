let timeConv = {
    flightMph: 550,
    trainMph: 60,
    busMph: 10,
    carMph: 40,
    flightTime: function(data){
        return data/this.flightMph;
    },
    trainTime: function(data){
        return data / this.trainMph;
    },
    busTime: function(data){
        return data / this.busMph;
    }, 
    carTime: function(data){
        return data / this.carMph;
    }
};

// var time = {

// let flightMph = 550;
// let trainMph = 60;
// let busMph = 10;


// flightTime(function(data){
//     let time = googleApiDist/flightMph
// })
// flightTime();

// trainTime(function(data){
//     let time = googleApiDist/trainMph
// })
// trainTime();

// busTime(function(data){
//     let time = googleApiDist/busMph
// })
// busTime();

// carTime(function(data){
//     let time = googleApiTime
// })
// carTime();

// }

module.exports = timeConv;