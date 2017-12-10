var regex = new RegExp("(.*?)\.(csv)$");

function triggerValidation(el) {
  if (!(regex.test(el.value.toLowerCase()))) {
    el.value = '';
    alert('Please select correct file format');
  }
}
$( document ).ready(function() {
    var el = document.getElementById('csvFileInput');
    el.onchange = function(){
      console.log(document.getElementById('csvFileInput').files[0]);
    };
});

function readSingleFile(evt) {
  //Retrieve the first (and only!) File from the FileList object
  var f = evt.target.files[0]; 

  if (f) {
    var r = new FileReader();
    r.onload = function(e) { 
      var contents = e.target.result;
      document.getElementById('output').innerHTML = contents;
    }
    r.readAsText(f);
  } else { 
    alert("Failed to load file");
  }
}

document.getElementById('csvFileInput').addEventListener('change', readSingleFile, false);

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

