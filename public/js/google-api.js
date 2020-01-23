let googleApiKey = "AIzaSyB6YDdaRNCGktlvWISrGBjv75lcHfR-l44"
let cityOne = "Seattle+WA"
let cityTwo = "phoenix+az"
let vehicleType = "driving"

let googleURL= "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + cityOne + "&destinations=" + cityTwo + "&mode=" + vehicleType + "&language=en-FR&key=" + googleApiKey;


console.log(googleURL)

// googleApiDist
// googleApiTime

$.ajax({
    url: googleURL,
    method:"GET"
}).then(function(response){
    console.log(JSON.stringify(response))
})
