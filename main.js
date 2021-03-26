//
function getParameterByName(name, url) {
    //If the url is not correct return url current page
    if (!url) url = window.location.href;
    //Regex:
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//$.getJSON: Get the Airtable api
//$.each: Load airtable JSON encoded data and for each airtable record
// Load each airtable record.fields
// Push listview to empty html array
// Append html array inffo to list view on index
  var getAllRecords = function() {
    $.getJSON(
      "https://api.airtable.com/v0/appJb4yWqdpQKLPMl/Universe?api_key=keyhIKEvxWbZNk1bF&view=Grid view",
      function(airtable) {
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var ids = record.fields["ids"]
          console.log(ids)
          var Features = record.fields["Features"];
          var Images = record.fields["Images"];
          var Description = record.fields["Description"];
          html.push(listView(id, Features, Description, Images, ids));
        });
        $(".list-view").append(html);
      }
    );
  };

  //Display and organize id, Features and Images in html
  var listView = function(id, Features,Description, Images, ids) {
    return `
      <div>
        <div class="spaceDiv">
          ${Images ? `<img src="${Images[0].url}" class='spaceImg'>` : ``}
        </div>
        <div class="card-body info">
          <h2><a href="index.html?id=${id}">${Features}</a></h2>
          <div id=${ids}>
            
          </div>
        </div>
      </div>
    `;
  };

  //.getJSON: Get airtable api
  // Load each airtable record.fields
  // Push listview to empty html array
  // Append html array inffo to list view on index
  var getOneRecord = function(id){
    $.getJSON(
      `https://api.airtable.com/v0/appJb4yWqdpQKLPMl/Universe/${id}?api_key=keyhIKEvxWbZNk1bF`,
      function(record) {
        var html = [];
        var Images = record.fields["Images"];
        var Description = record.fields["Description"];
        html.push(detailView(Images,Description));
        $(".detail-view").append(html);
      }
    )
  }

  //Append each api info into corresponding html description
  var detailView = function(Images, Description){
    return `
    <div class="desc-body">
      <div class="spaceDiv">
        ${Images ? `<img src="${Images[0].url}" class='spaceImg'>` : ``}
      </div>
      <div class="card-body">
        <p>${Description}</p>
      </div>
    </div>
    `
  };

var id = getParameterByName("id");
if(id) {
  getOneRecord(id);
} else {
  getAllRecords();
}
