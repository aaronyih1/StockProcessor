var MasterStockList = [];
var grouped = [];
var called = false;
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
	//console.log(data);
	for(var i = 0; i < data.length; i++){
		MasterStockList.push(data[i]);
	}
	if(called){
		clearOldTransactions();
	}
	//clearOldTransactions();
	sortStocks();
	display();
	called = true;
}
function sortStocks(){
	console.log(grouped);
	MasterStockList.forEach(function (a) {
	    // console.log(a);
	    // console.log(grouped[findWithAttr(grouped, 'name', a.Symbol)]);

	    if(findWithAttr(grouped, 'name', a.Symbol) == -1){
	    	grouped.push(new Stock(a.Symbol));
	    }

	    // if (called == true){
	    // 	grouped[findWithAttr(grouped, 'name', a.Symbol)].buys = [];
	    // 	grouped[findWithAttr(grouped, 'name', a.Symbol)].sells = [];
	    // }

	    if(a.ActionNameUS == "Buy"){
	    	grouped[findWithAttr(grouped, 'name', a.Symbol)].buys.push(new Transaction(a.TradeDate, a.Quantity, a.Price, a.Amount));
	    }
	    else if(a.ActionNameUS == "Sell"){
	    	grouped[findWithAttr(grouped, 'name', a.Symbol)].sells.push(new Transaction(a.TradeDate, a.Quantity, a.Price, a.Amount));
	    }
	});
	
}

function clearOldTransactions(){
	console.log(grouped);

	grouped.forEach(function (a) {
		grouped[findWithAttr(grouped, 'name', a.name)].buys = [];
		grouped[findWithAttr(grouped, 'name', a.name)].sells = [];
	});
	console.log(grouped);
	called = true;
	// grouped.forEach(function(a){

	// });
}
function findWithAttr(array, attr, value) {
	//console.log(array);
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
function calcNet(stock){
	var net = 0;

	if((stock.sells.length==0)||(stock.buys.length==0))
		return("");
	else{
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