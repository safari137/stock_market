var StockDataController = require("./controllers/stockDataController"),
    stockController     = require("./controllers/stockController");

var socketListener = function(io) {
    
var stockDataController = new StockDataController();
    stockController     = new stockController();
    
    io.on('connection', function (socket) {
        stockController.getStocks(function(stocks) {
            socket.emit('allStocks', stocks);    
            broadcastHistory(function(history) {
                socket.emit('allHistory', { history: history });
            });
        });
          
        socket.on('addStock', function (data) {
            stockDataController.lookup(data.symbol, function(err, stockInfo) {
                if (err) {
                    socket.emit("err", { message : "Stock Not Found" } );
                    return;
                }
                stockController.addStock(stockInfo, function(stock) {
                    io.sockets.emit('addStock', { symbol: stock.symbol , description: stock.description });
                });
            }); 
        });
        
        socket.on('deleteStock', function(data) {
           stockController.deleteStock(data, function(stock) {
                io.sockets.emit('deleteStock', stock);
           });
        });
        
        socket.on('getHistory', function() {
            broadcastHistory(function(history) {
                socket.emit('allHistory', { history: history });
            });
        })
    });

    var broadcastHistory = function(callback) {
        var history = [];
        var stocks = stockController.getStocks(function(stocks) {
           if (stocks.length < 1) {
                callback([]);
                return;
            }
            
            var finished = 0;
            stocks.forEach(function(stock, index, arr) {
                stockDataController.getHistoricData(stock.symbol, "20150318", function(result) {
                    history.push(result);
                    finished++;
                    if (finished === arr.length) {
                        callback(history);    
                    }
                });
            }); 
        });  
    }
}

module.exports = socketListener;