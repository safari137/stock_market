var request = require('request');

var StockDataController = function() {
    var url = "http://marketdata.websol.barchart.com/";
    var key = process.env.STOCK_API_KEY;
    
    this.lookup = function(symbol, callback){
        var requestUrl = url + "getQuote.json?key=" + key + "&symbols=" + symbol;
        var isFound = true;

        symbol = symbol.toUpperCase();
        
        requestData(requestUrl, function(error, data) {
            if (error) 
                return;
            
            if (data.status.code !== 200) {
                callback({err: "Stock Not Found"}, null);
                return;
            }
            
            var stockInfo = data.results.filter(function(value) {
                return (value.symbol === symbol);
            });
            
            if (stockInfo.length < 1) {
                callback({err: "Stock Not Found"}, null);
                return;
            }
            
            callback(null, {symbol: stockInfo[0].symbol, description: stockInfo[0].name});
        });
    }
    
    this.getHistoricData = function(symbol, startDate, callback) {
        var requestUrl = url + "getHistory.json?key=" + key + "&symbol=" + symbol + "&type=daily&startDate=" + startDate;
        
        return requestData(requestUrl, function(error, data) {
            if (error) return;
            
            if (!data) {
                return;
            }
            
            if (data.status.code !== 200) return;
            
            if (callback)
                callback(data.results);
            
            return data.results;
        });
    }
    
    var requestData = function(url, callback) {
        request(url, function (error, response, data) {
              if (!error && response.statusCode == 200) {
                data = JSON.parse(data);
                callback(null, data);
              } else {
                  callback(error, null);
              }
        });
    }
}

module.exports = StockDataController;