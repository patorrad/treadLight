$("#find-trip-info").submit(event=>{
    event.preventDefault();
    console.log("form submit!");
    const depart = $('#departcity').val();
    const arrive = $('#arrivecity').val();
    //window.location.replace(`/retrieveTripData/${depart}/${arrive}`);
    window.location.href = `/retrieveTripData/${depart}/${arrive}`;
})