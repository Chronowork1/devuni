$(document).ready(function(){

    $("#SearchButton").click(function(){
        var searchInput = $("#SearchInput").val();
        callNasaAPI(searchInput);
    });

    function callNasaAPI(search){
        var nasaURL = nasaSearchInput(search);
        $.ajax({
            url: nasaURL,
            method: "GET",
            success: function(response){
                var url = response.collection.items[0].href
                console.log(url)
                appendToRoot(url);
            }
        })
    }
    

    function appendToRoot(srcURL){
        $("#root").html("");
        $("#root").append("<img src="+srcURL+">");
    }
    
    function nasaSearchInput(search){
        var nasaURL = "https://images-api.nasa.gov/search?q="+search;
        return nasaURL;
    }
    
});
