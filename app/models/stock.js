var mongoose = require('mongoose');

var stockSchema = new mongoose.Schema({
    symbol : String,
    description : String
});

module.exports = mongoose.model("Stock", stockSchema);