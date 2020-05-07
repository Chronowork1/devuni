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
    
    function nasaSearchInput(search){
        var nasaURL = "https://images-api.nasa.gov/search?q="+search+"?api_key=zbSs6K5WiNMfDe3PWJb2m4RV92LGgykgYGyaTwl1";
        return nasaURL;
    }
    
});
