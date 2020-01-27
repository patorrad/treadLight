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
    
    $("#carbon-info").submit(event=>{
        event.preventDefault();
        console.log("form submit!");
        let vehicle = document.querySelector('input[name="checkbox"]:checked');
        let myData = vehicle.value.split(",");
        // $('input[name="checkbox"]').change(function(e) {
        //     vehicle = $(this).id();
        // })
        // console.log(vehicle.value);
        // const vehicle = $('#checkbox').id();
        // const arrive = $('#arrivecity').val();
        //window.location.replace(`/retrieveTripData/${depart}/${arrive}`);
        window.location.href = `/outputTripData/${myData[0]}/${myData[1]}/${myData[2]}`;
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
        const userInfo={
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password
        }
        $.post('/register',userInfo).then(data=>{
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
        const plane = $("#plane").val();
        const train = $("#train").val();
        const bus = $("#bus").val();
        const car = $("#car").val();
        const travel_mode = {
            plane: plane,
            train: train,
            bus: bus,
            car: car
        }
        // $.post?
    });
    
    $("#radioForm").change(function(event){
        console.log(event)
    });

    $("#tripSubmit").click(function(){

    });

});
