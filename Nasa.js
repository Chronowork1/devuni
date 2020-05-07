$(document).ready(function(){
    $.ajax({
        url:"https://api.nasa.gov/planetary/apod?api_key=zbSs6K5WiNMfDe3PWJb2m4RV92LGgykgYGyaTwl1",
        method:"GET",
        success: function(response) {
            var url = response;
            appendImage(url);
        }
    })

    function appendImage(srcURL){
        $("#root").append('<img class="spaceImg" src='+srcURL.hdurl+'>');
        $("#root").append('<h1>'+srcURL.title+'</h1>');
        $("#root").append('<p>'+srcURL.explanation+'</p>');
    }
});
