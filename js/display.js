$(function() {
  $("#tabs").tabs();
});
$(document).ready(function() {
  //example1();
  //example2();
  example3();
  
  // $('#run1').bind('click', function() {
  //   fourtyTwo();
  //   example1();
  // });
  
  // $('#run2').bind('click', function() {
  //   fourtyTwo();
  //   example2();
  // });
  


  $('#run3').bind('click', function() {
    fourtyTwo();
    example3();
  });
});
// function example1() {
//   var input = $('#input1').val();
//   var data = $.csv.toArray(input);
//   var html = generateTable(data);
//   $('#result1').empty();
//   $('#result1').html(html);
// }
// function example2() {
//   var input = $('#input2').val();
//   var data = $.csv.toArrays(input);
//   var html = generateTable(data);
//   $('#result2').empty();
//   $('#result2').html(html);
// }
function example3() {
  var input = $('#input3').val();
  var data = $.csv.toObjects(input);
  var html = generateTable(data);
  processStocks(data);
  console.log(data);
  $('#result3').empty();
  $('#result3').html(html);
}
// build HTML table data from an array (one or two dimensional)
function generateTable(data) {
  var html = '';
  if(typeof(data[0]) === 'undefined') {
    return null;
  }
  if(data[0].constructor === String) {
    html += '<tr>\r\n';
    for(var item in data) {
      html += '<td>' + data[item] + '</td>\r\n';
    }
    html += '</tr>\r\n';
  }
  if(data[0].constructor === Array) {
    for(var row in data) {
      html += '<tr>\r\n';
      for(var item in data[row]) {
        html += '<td>' + data[row][item] + '</td>\r\n';
      }
      html += '</tr>\r\n';
    }
  }
  if(data[0].constructor === Object) {
    for(var row in data) {
      html += '<tr>\r\n';
      for(var item in data[row]) {
        html += '<td>' + item + ':' + data[row][item] + '</td>\r\n';
      }
      html += '</tr>\r\n';
    }
  }
  
  return html;
}
function fourtyTwo() {
  alert('Reticulating Splines...');
}