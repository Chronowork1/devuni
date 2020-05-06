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
        <div class="spaceDiv">
          ${Images ? `<img src="${Images[0].url}" class='spaceImg'>` : ``}
        </div>
        <div class="card-body info">
          <h2><a href="index.html?id=${id}">${Features}</a></h2>
          <p>${Description}</p>
        </div>
      </div>
    `;
  };

  var getOneRecord = function(id){
    $.getJSON(
      `https://api.airtable.com/v0/appJb4yWqdpQKLPMl/Universe/${id}?api_key=keyhIKEvxWbZNk1bF`,
      function(record) {
        var html = [];
        var Description = record.fields["Description"];
        html.push(detailView(Description));
        $(".detail-view").append(html);
      }
    )
  }

  var detailView = function(Description){
    return `
    <div>
      <div class="card-body info">
        <p>${Description}</p>
      </div>
    </div>
    `
  };
  console.log(detailView);

var id = getParameterByName("id");
if(id) {
  getOneRecord(id);
} else {
  getAllRecords();
}
