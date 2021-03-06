// import { response } from "express";

$(document).ready(function(){
    $("#find-trip-info").submit(event=>{
        event.preventDefault();
        console.log("form submit!");
        const depart = $('#departcity').val();
        const arrive = $('#arrivecity').val();
        //window.location.replace(`/retrieveTripData/${depart}/${arrive}`);
        window.location.href = `/retrieveTripData/${depart}/${arrive}`;
    });
    
    $("#carbon-info").click(event=>{
        event.preventDefault();
        console.log("form submit!");
        let vehicle = document.querySelector('input[name="checkbox"]:checked');
        console.log("Vehicle info: ", vehicle);
        let myData = vehicle.value.split(",");
        myData['type'] = vehicle.id;
        const cityOne = $("#startcityp").text();
        const cityTwo = $("#endcityp").text();
        // $('input[name="checkbox"]').change(function(e) {
        //     vehicle = $(this).id();
        // })
        // console.log(vehicle.value);
        // const vehicle = $('#checkbox').id();
        // const arrive = $('#arrivecity').val();
        //window.location.replace(`/retrieveTripData/${depart}/${arrive}`);
        window.location.href = `/outputTripData/${myData[0]}/${myData[1]}/${myData[2]}/${myData.type}/${cityOne}/${cityTwo}`;
    });
    
    $("#loginForm").submit(event=>{
        event.preventDefault();
        const email = $("#email").val().trim();
        const password = $("#password").val().trim();
        const userLoginInfo={
            email:email,
            password:password
        }
        $.post('/login',userLoginInfo).then(data=>{
           if(data.user){
               window.location.href='/trip'
           }
           else {
               alert('login failed!')
           }
        })
        //make a post request to login
        //then, if response says logged in, redirect to next page
        //otherwise, just pop an alert that says falied
    });
    
    $("#registerForm").submit(event=>{
        event.preventDefault();
        const first_name = $("#firstname").val().trim();
        const last_name = $("#lastname").val().trim();
        const email = $("#email").val().trim();
        const password = $("#password").val().trim();
        const city = $("#city").val().trim();
        var carId = $("#trim").children("option:selected").val();
        const userInfo={
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            default_city: city,
            default_car: carId

        }
        $.post('/register', userInfo).then(data=>{
           if(data){
               window.location.href='/trip'
           }
           else {
               alert('Please enter all information')
           }
        }).catch(err => {
            console.log(err);
            alert("Request did not work. Please try again.")
        });
    });
    
    $(".donate-btn").click(function(){
        window.open("https://www.standfortrees.org");
    });
    
    $("#radioForm").change(function(event){
        console.log(event)
    });

    $("#step2Submit").click(function(){
        event.preventDefault();
        const chosenDonation = $("#chosenDonation").val();
        const conversionFactor = 10
        const offsetAmount = chosenDonation/conversionFactor;
        const totalCO2 = document.getElementById("totalCO2").innerHTML.split(" ")[0];
        const vehicle = document.getElementById("vehicle").innerHTML;
       $.ajax({
           url: "/createTrip",
           method: "POST",
           data: {
            used_carbon: totalCO2,
            saved_carbon: offsetAmount,
            travel_mode: vehicle,
            money: chosenDonation
           }
       }).then(function(response){
        console.log("done")
       })

    });

});
