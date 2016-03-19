function ChartMaker() {
  var historyData,
      chart,
      loadedOnce = false;
      
  this.startHistoryChart = function(history) {
      historyData = history;
      
      if (!loadedOnce) {
        google.charts.load('current', {packages: ['corechart', 'line']});
        loadedOnce = true;
        
        $(window).resize(function() {
            drawBasic();
        });
      }
      google.charts.setOnLoadCallback(drawBasic);
  }

  var drawBasic = function() {
      var data = new google.visualization.DataTable();
      data.addColumn('date', 'DATE');

      addNames(function(symbol) {
        data.addColumn('number', symbol);
      });
      
      var dataRows = setupRows();
      
      if (dataRows.length < 1) {
          data = google.visualization.arrayToDataTable([
            ['', { role: 'annotation' }],
            ['', '']
          ]);
      } else {
        data.addRows(dataRows);
      }
      
      var options = {
        legend: { position: "bottom",
                  textStyle: {color: '#ccc' },
        },
        focusTarget: 'category',
        interpolateNulls: true,
        chartArea: { top: 20, bottom: 60, left: 40, right: 40,
        backgroundColor: {
                stroke: '#ccc',
                strokeWidth: 3
                }
        },
        backgroundColor: '#333',
        hAxis: { 
          textStyle: { color: '#ccc'},
          gridlines: { color: "#ccc",  count: 12 }
        },
        
        vAxis: { 
          textStyle: { color: '#ccc'},
          gridlines: { color: "#ccc" }
        }
  
      }

      chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      
      chart.draw(data, options);
  }
  
  var addNames = function(callback) {
    historyData.history.forEach(function(data, index, arr) {
      callback(data[0].symbol);
      console.log("names : " + index);
    }); 
  }
  
  var setupRows = function() {
    var rowData = [];
    
    if (historyData.history.length < 1)
      return rowData;
      
    console.log('history');
    console.log(historyData);
    console.log('end history');
      
    console.log("we're going to add the following rows : " + historyData.history.length);
    var skipCount = 0;
    for (var col = 0; col<historyData.history[0].length; col++) {
      var data = [new Date(historyData.history[0][col].tradingDay)];
      for (var row = 0; row<historyData.history.length; row++) {
          if (historyData.history[row].length <= 1) {
            data.push(0);
            continue;
          }
            
          var closingPrice =  historyData.history[row][col].close;
          data.push(closingPrice);
          console.log( "data : " + data.length);
      }
      rowData.push(data);
    }
    console.log('skips : ' + skipCount );
    console.log(data);
    return rowData;
  }
}