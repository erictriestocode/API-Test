// API Key: AIzaSyARUTkixy00DWI57qipoe4H6_kNASXlqdQ 

// Test URLs:https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Chicago&destinations=Detroit&key=AIzaSyARUTkixy00DWI57qipoe4H6_kNASXlqdQ


// {
//     "destination_addresses" : [ "Detroit, MI, USA" ],
//     "origin_addresses" : [ "Chicago, IL, USA" ],
//     "rows" : [
//        {
//           "elements" : [
//              {
//                 "distance" : {
//                    "text" : "281 mi",
//                    "value" : 452812
//                 },
//                 "duration" : {
//                    "text" : "4 hours 19 mins",
//                    "value" : 15558
//                 },
//                 "status" : "OK"
//              }
//           ]
//        }
//     ],
//     "status" : "OK"
//  }

$(document).ready(function () {
    var startCity;
    var endCity;
    // var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyARUTkixy00DWI57qipoe4H6_kNASXlqdQ";

    // console.log(queryURL);

    // $.ajax ({
    //     url: queryURL,
    //     method: "GET"
    // })
    //     // We store all of the retrieved data inside of an object called "response"
    //     .then(function (response) {

    //         // Log the queryURL
    //         console.log(queryURL);

    //         // Log the resulting object
    //         console.log(response);

    //         // Transfer content to HTML

    //     });


    $("#send-button").click(function (event) {
        // event.preventDefault();
        console.log("Button Clicked!")
        // startCity = $(".startDestination").val().trim();
        // console.log(startCity);
    });

});