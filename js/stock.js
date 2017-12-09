var MasterStockList = [];
var grouped = [];

function Stock(name){
	this.name = name;
	//this.transactions = transactions;
	this.buys=[];
	this.sells=[];
}
function Transaction(date, quantity, price, amount){
	this.date = date;
	this.quantity = quantity;
	this.price = price;
	this.amount = amount;

}
function processStocks(data){
	console.log(data);
	for(var i = 0; i < data.length; i++){
		MasterStockList.push(data[i]);
	}
	sortStocks();
	display();

}
function sortStocks(){
	
	MasterStockList.forEach(function (a) {
	    //console.log(a);
	    //console.log(findWithAttr(grouped, 'name', a.Symbol));
	    if(findWithAttr(grouped, 'name', a.Symbol) == -1){
	    	grouped.push(new Stock(a.Symbol));
	    }
	    if(a.ActionNameUS == "Buy"){
	    	grouped[findWithAttr(grouped, 'name', a.Symbol)].buys.push(new Transaction(a.TradeDate, a.Quantity, a.Price, a.Amount));
	    }
	    else if(a.ActionNameUS == "Sell"){
	    	grouped[findWithAttr(grouped, 'name', a.Symbol)].sells.push(new Transaction(a.TradeDate, a.Quantity, a.Price, a.Amount));
	    }
	});
	
}

function findWithAttr(array, attr, value) {
	console.log(array);
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
function display(){
  grouped.forEach(function (a) {
  	$("#transactions-table").append("<tr><td><b>"+a.name+"</b></td><td></td><td></td><td></td><td></td><td><b>"+a.name+"</b></td><td></td><td></td><td></td><td></td><td></td></tr>")
  	//console.log(a.buys.length);

  	for(var i = 0; i<Math.max(a.buys.length, a.sells.length); i++){
  		var buy;
  		var sell;
  		if(i>=Math.min(a.buys.length, a.sells.length)){
  			if(a.buys.length > a.sells.length){
  				sell =  "<td></td><td></td><td></td><td></td><td></td></tr>";
  				console.log(a.buys[i]);
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
  		// 	buy = "<tr><td>"+b.date+"</td><td>"+b.quantity+"</td><td>"+b.price+"</td><td>"+b.amount+"</td>";
  		// }
  		// else{
  		// 	sell = "<td></td><td>"+b.date+"</td><td>"+b.quantity+"</td><td>"+b.price+"</td><td>"+b.amount+"</td></tr>";
  		// }
  		// console.log(buy);
  		// console.log(sell);
  		// console.log(buy+sell);
  	  // $("#transactions-table").append(buy+sell);
  	//});
  });
}
function calcNet(stock){
	var net = 0;
	stock.buys.forEach(function(a){
		net+=parseFloat(a.amount);
	})
	stock.sells.forEach(function(a){
		net+=parseFloat(a.amount);
	})
	if(net>0){
		net= "+"+net;
	}
	return(net);

}
function longOrShort(stock){
	if((stock.sells.length==0)||(stock.buys.length==0))
		return("");
	else{
		var buyDate = new Date(stock.buys[stock.buys.length-1].date);
		var sellDate = new Date(stock.sells[stock.sells.length-1].date);
		var age = sellDate.getFullYear() - buyDate.getFullYear();

		if(age>0)
			return("long");
		else
			return("short");

		//console.log(stock.buys[stock.buys.length-1].date);
	}
	
	
}