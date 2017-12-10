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
    //console.log("clickkyyyy");
    //fourtyTwo();
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
  //console.log("running!");
  var input = $('#output').val();
  var data = $.csv.toObjects(input);
  //var html = generateTable(data);
  $('#transactions-table').empty();
  MasterStockList = [];
  grouped = [];
  processStocks(data);
  //console.log(data);

  //$('#result3').html(html);
}

function display(){
  $("#transactions-table").append("<tr><td>Date</td><td>Quantity</td><td>Price</td><td>Amount</td><td>|||||||||||||</td><td>Name</td><td>Quantity</td><td>Price</td><td>Amount</td><td></td><td>Net</td><td></td><td>Remark</td></tr>");
  grouped.forEach(function (a) {
    $("#transactions-table").append("<tr><td><b>"+a.name+"</b></td><td></td><td></td><td></td><td></td><td><b>"+a.name+"</b></td><td></td><td></td><td></td><td></td><td></td></tr>")
    //console.log(a.buys.length);

    for(var i = 0; i<Math.max(a.buys.length, a.sells.length); i++){
      var buy;
      var sell;
      if(i>=Math.min(a.buys.length, a.sells.length)){
        if(a.buys.length > a.sells.length){
          sell =  "<td></td><td></td><td></td><td></td><td></td></tr>";
          //console.log(a.buys[i]);
          buy = "<tr><td>"+a.buys[i].date+"</td><td>"+a.buys[i].quantity+"</td><td>"+a.buys[i].price+"</td><td>"+a.buys[i].amount+"</td>";
        }
        else{
          buy =  "<tr><td></td><td></td><td></td><td></td>";
          sell = "<td></td><td>"+a.sells[i].date+"</td><td>"+a.sells[i].quantity+"</td><td>"+a.sells[i].price+"</td><td>"+a.sells[i].amount+"</td></tr>";
        }

      }
      else{
        buy = "<tr><td>"+a.buys[i].date+"</td><td>"+a.buys[i].quantity+"</td><td>"+a.buys[i].price+"</td><td>"+a.buys[i].amount+"</td>";
        sell = "<td></td><td>"+a.sells[i].date+"</td><td>"+a.sells[i].quantity+"</td><td>"+a.sells[i].price+"</td><td>"+a.sells[i].amount+"</td></tr>";
      }
      $("#transactions-table").append(buy+sell);
    }

    $("#transactions-table").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>"+calcNet(a)+"</td><td>"+longOrShort(a)+"</td>/tr>")
    //a.transactions.forEach(function (b) {
      // if(b.amount<0){

      // }
      // var buy = "<tr><td></td><td></td><td></td><td></td>";
      // var sell = "<tr><td></td><td></td><td></td><td></td>";
      // if(b.amount<0){
      //  buy = "<tr><td>"+b.date+"</td><td>"+b.quantity+"</td><td>"+b.price+"</td><td>"+b.amount+"</td>";
      // }
      // else{
      //  sell = "<td></td><td>"+b.date+"</td><td>"+b.quantity+"</td><td>"+b.price+"</td><td>"+b.amount+"</td></tr>";
      // }
      // console.log(buy);
      // console.log(sell);
      // console.log(buy+sell);
      // $("#transactions-table").append(buy+sell);
    //});
  });
}

