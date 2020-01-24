let googleApiKey = "AIzaSyB6YDdaRNCGktlvWISrGBjv75lcHfR-l44"
let cityOne = "Seattle+WA"
let cityTwo = "phoenix+az"
let vehicleType = "driving"

let googleURL= "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + cityOne + "&destinations=" + cityTwo + "&mode=" + vehicleType + "&language=en-FR&key=" + googleApiKey;


console.log(googleURL)


var example = "https://maps.googleapis.com/maps/api/place/autocomplete/xml?input=Amoeba&types=establishment&location=37.76999,-122.44696&radius=500&key=YOUR_API_KEY"