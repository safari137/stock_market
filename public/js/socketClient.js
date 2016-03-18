var socket = io.connect("https://freecodecamp-safari137.c9users.io/");
var chart = new ChartMaker();

function Socket() {
  this.send = function(tag, data) {
    socket.emit(tag, data);
  }
}

  socket.on('allStocks', function (data) {
    addAllStocks(data);
  });
  
  socket.on('addStock', function(data) {
      addSingleStockToDocument(data);    
      socket.emit('getHistory')
  });
  
  socket.on('err', function(err) {
      $("#error").removeClass("invisible");
      $("#error").html(err.message).fadeIn('slow').delay(5000).fadeOut('slow');
  });
  
  socket.on('deleteStock', function(data) {
      $("#" + data.symbol).fadeOut(1000, function() {
        $(this).remove(); });  
        socket.emit('getHistory');
  });
  
  socket.on('allHistory', function(results) {
      chart.startHistoryChart(results);
  });
  
  function addAllStocks(data) {
      $(".stocks .row").html("");
      
      data.forEach(function(stock) {
         addSingleStockToDocument(stock);
      });
  }
  
  function addSingleStockToDocument(stock) {
      $(".stocks .row").append( "<div class='stock col-md-4 col-sm-6 col-xs-12' id='" + stock.symbol + "'>" +
                                  "<div class='title col-md-2 col-sm-5 col-xs-6'>" + stock.symbol + "</div><div class='col-md-8 col-sm-2 col-xs-0'>" +
                                  "</div><div class='delete col-md-2 col-sm-5 col-xs-6'>X</div>" +
                                  "<div class='description col-md-12 col-sm-8 col-xs-7'>" + stock.description + "</div></div>");
  }