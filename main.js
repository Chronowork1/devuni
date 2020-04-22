function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//getAllRecords grab the airtable api
//
  var getAllRecords = function() {
    $.getJSON(
      "https://api.airtable.com/v0/appJb4yWqdpQKLPMl/Universe?api_key=keyhIKEvxWbZNk1bF&view=Grid view",
      function(airtable) {
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          console.log(id)
          var Features = record.fields["Features"];
          var Images = record.fields["Images"];
          var Description = record.fields["Description"];
          html.push(listView(id, Features, Description, Images));
        });
        $(".list-view").append(html);
      }
    );
  };

  var listView = function(id, Features,Description, Images) {
    return `
      <div>
        ${Images ? `<img src="${Images[0].url}" class="spaceImg">` : ``}
        <div class="card-body">
          <h2>${Features}</h2>
          <p>${Description}</p>
        </div>
      </div>
    `;
  };

var id = getParameterByName("id");
if(id) {
  getOneRecord(id);
} else {
  getAllRecords();
}
