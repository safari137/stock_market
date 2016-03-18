var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    server      = require('http').Server(app),
    io      = require('socket.io')(server);
    
require('dotenv').config();
                  
mongoose.connect(process.env.MONGOLAB_URI);

app.use(express.static("public"));


require("./app/routes")(app);
require("./app/socketListener")(io);

app.set('view engine', 'ejs');


server.listen(process.env.PORT, process.env.IP, function() {
  console.log('socket.io listening on port : ' + process.env.PORT);
});