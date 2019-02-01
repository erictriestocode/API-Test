// // API Key: AIzaSyARUTkixy00DWI57qipoe4H6_kNASXlqdQ 

// // Test URLs:https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Chicago&destinations=Detroit&key=AIzaSyARUTkixy00DWI57qipoe4H6_kNASXlqdQ


// // {
// //     "destination_addresses" : [ "Detroit, MI, USA" ],
// //     "origin_addresses" : [ "Chicago, IL, USA" ],
// //     "rows" : [
// //        {
// //           "elements" : [
// //              {
// //                 "distance" : {
// //                    "text" : "281 mi",
// //                    "value" : 452812
// //                 },
// //                 "duration" : {
// //                    "text" : "4 hours 19 mins",
// //                    "value" : 15558
// //                 },
// //                 "status" : "OK"
// //              }
// //           ]
// //        }
// //     ],
// //     "status" : "OK"
// //  }

// $(document).ready(function () {
//     var startCity;
//     var endCity;
//     // var queryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyARUTkixy00DWI57qipoe4H6_kNASXlqdQ";

//     // console.log(queryURL);

//     // $.ajax ({
//     //     url: queryURL,
//     //     method: "GET"
//     // })
//     //     // We store all of the retrieved data inside of an object called "response"
//     //     .then(function (response) {

//     //         // Log the queryURL
//     //         console.log(queryURL);

//     //         // Log the resulting object
//     //         console.log(response);

//     //         // Transfer content to HTML

//     //     });


//     $("#send-button").click(function (event) {
//         // event.preventDefault();
//         console.log("Button Clicked!")
//         // startCity = $(".startDestination").val().trim();
//         // console.log(startCity);
//     });

// });

$( function() {
    $.widget( "custom.combobox", {
        _create: function() {
            this.wrapper = $( "<span>" )
                .addClass( "custom-combobox" )
                .insertAfter( this.element );

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function() {
            var selected = this.element.children( ":selected" ),
                value = selected.val() ? selected.text() : "";

            this.input = $( "<input>" )
                .appendTo( this.wrapper )
                .val( value )
                .attr( "title", "" )
                .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy( this, "_source" )
                })
                .tooltip({
                    classes: {
                        "ui-tooltip": "ui-state-highlight"
                    }
                });

            this._on( this.input, {
                autocompleteselect: function( event, ui ) {
                    ui.item.option.selected = true;
                    this._trigger( "select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function() {
            var input = this.input,
                wasOpen = false;

            $( "<a>" )
                .attr( "tabIndex", -1 )
                .attr( "title", "Show All Items" )
                .tooltip()
                .appendTo( this.wrapper )
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass( "ui-corner-all" )
                .addClass( "custom-combobox-toggle ui-corner-right" )
                .on( "mousedown", function() {
                    wasOpen = input.autocomplete( "widget" ).is( ":visible" );
                })
                .on( "click", function() {
                    input.trigger( "focus" );

                    // Close if already visible
                    if ( wasOpen ) {
                        return;
                    }

                    // Pass empty string as value to search for, displaying all results
                    input.autocomplete( "search", "" );
                });
        },

        _source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( this.element.children( "option" ).map(function() {
                var text = $( this ).text();
                if ( this.value && ( !request.term || matcher.test(text) ) )
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }) );
        },

        _removeIfInvalid: function( event, ui ) {

            // Selected an item, nothing to do
            if ( ui.item ) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children( "option" ).each(function() {
                if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if ( valid ) {
                return;
            }

            // Remove invalid value
            this.input
                .val( "" )
                .attr( "title", value + " didn't match any item" )
                .tooltip( "open" );
            this.element.val( "" );
            this._delay(function() {
                this.input.tooltip( "close" ).attr( "title", "" );
            }, 2500 );
            this.input.autocomplete( "instance" ).term = "";
        },

        _destroy: function() {
            this.wrapper.remove();
            this.element.show();
        }
    });

    $( "#combobox" ).combobox();
    $( "#toggle" ).on( "click", function() {
        $( "#combobox" ).toggle();
    });
} );