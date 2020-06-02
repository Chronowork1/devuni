$(document).ready(function(){

    //#SearchButton is clicked
    //Get the value from SearchInput
    //Call the callNasaAPI() function with the input value
    $("#SearchButton").click(function(){
        var searchInput = $("#SearchInput").val();
        callNasaAPI(searchInput);
    });

    
    function callNasaAPI(search){
        var nasaURL = nasaSearchInput(search);
        $.ajaxPrefilter({
            url: nasaURL,
            method: "GET",
            success: function(response){
                //console.log(response.collection.href)
               var url = response.collection.href
                console.log(url)
                appendToRoot(url);
            }
        })
    }
    

    function appendToRoot(srcURL){
        $("#root").html("");
        $("#root").append("<img src="+srcURL+">");
    }
    
    //function nasaSearchInput(search){
    //    var nasaURL = 'https://cors-anywhere.herokuapp.com/' + "https://images-api.nasa.gov/search?q="+search;
    //    return nasaURL;
    //}

    jQuery.ajaxPrefilter(function nasaSearchInput(search){
        if(search.crossDomain && jQuery.support.cors){
            var nasaURL = "https://cors-anywhere.herokuapp.com/" + "https://images-api.nasa.gov/search?q="+search;
            return nasaURL;
        }
    });
    
    /*jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });*/
});
