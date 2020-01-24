$("#find-trip-info").submit(event=>{
    event.preventDefault();
    console.log("form submit!");
    const depart = $('#departcity').val();
    const arrive = $('#arrivecity').val();
    $.get(`/retrieveTripData/${depart}/${arrive}`).then(data=>{
        console.log(data);
      
    });
})