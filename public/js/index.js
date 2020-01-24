$("#find-trip-info").submit(event=>{
    event.preventDefault();
    console.log("form submit!");
    const depart = $('#departcity').val();
    const arrive = $('#arrivecity').val();
    //window.location.replace(`/retrieveTripData/${depart}/${arrive}`);
    window.location.href = `/retrieveTripData/${depart}/${arrive}`;
})
console.log('indx.js');
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

})