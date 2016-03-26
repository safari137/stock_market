var socketClient = new Socket();

var nameElement = $("#name");

$("#addStock").on("click", function() {
    addSymbol();
});

nameElement.keypress(function(info) {
    var enterKey = 13;
    
    if (info.charCode === enterKey) {
        addSymbol();    
    }
})

function addSymbol() {
   var symbol = nameElement.val();
    
    nameElement.val('').focus();
    
    $("#error").addClass("invisible");
    socketClient.send("addStock", {symbol: symbol}); 
}
  
$(".stocks").on('click', '.delete', function() {
    var id = $(this).parent().attr('id');

    socketClient.send("deleteStock", { symbol: id });
});