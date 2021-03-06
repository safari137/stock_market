var Stock = require('../models/stock');

var stockController = function() {
    
    this.getStocks = function(callback) {
        Stock.find({}, function(err, stocks) {
            if (err) throw err;
           
            if (callback) {   
                callback(stocks);
            }
        });
    };
    
    this.addStock = function(stock, callback) {
        Stock.find({symbol: stock.symbol}, function(err, foundStock) {
           if (err) throw err;
           if (!foundStock.length) {
               Stock.create(stock, function(err, newStock) {
                if (err) throw err;
                
                if (callback)
                    callback(newStock);
                });
           }
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