var Stock = require('../models/stock');

var stockController = function() {
    
    this.getStocks = function(callback) {
        Stock.find({}, function(err, stocks) {
            if (err) throw err;
           
            if (callback) {   
                callback(stocks.sort(function(a, b) {
                    return (a.length < b.length) ? 1 : -1;
                }));
            }
        });
    };
    
    this.addStock = function(stock, callback) {
        Stock.create(stock, function(err, newStock) {
            if (err) throw err;
            
            if (callback)
                callback(newStock);
        });
    };
    
    this.deleteStock = function(stock, callback) {
        Stock.remove({symbol: stock.symbol}, function(err) {
            if (err) throw err;
            
            if (callback)   
                callback(stock);
        });
    }
}

module.exports = stockController;