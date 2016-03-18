var socketClient = new Socket();

$("#addStock").on("click", function() {
    var symbol = $("#name").val();
    
    $("#error").addClass("invisible");
    socketClient.send("addStock", {symbol: symbol});
});
  
$(".stocks").on('click', '.delete', function() {
    var id = $(this).parent().attr('id');

    socketClient.send("deleteStock", { symbol: id });
});