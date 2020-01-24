let carbonConv = {
    flightCo2: 188,
    trainCo2: 147,
    busCo2: 43,
    carCo2: 368,
    flightCarbon: function(data){
        return data * flightCo2;
    },
    trainCarbon: function(data){
        return data * trainCo2;
    },    
    busCarbon: function(data){
        return data * busCo2;
    },    
    carCarbon: function(data){
        return data * carCo2
    }
};
module.exports = carbonConv;



