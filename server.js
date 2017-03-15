var express = require("express");
var app = express();
var port = 3700;
var io = require('socket.io').listen(app.listen(port));

app.get("/", function(req, res){
    res.send("WS://");
});

io.sockets.on('connection', function(socket) {
  	
   console.log('Got connection!');
   console.log(Object.keys(io.engine.clients));
   socket.emit('message', {"users":Object.keys(io.engine.clients)} )
   socket.broadcast.emit('message', {"users":Object.keys(io.engine.clients)} )
   
   socket.on('disconnect', function(data) {
      console.log('Got disconnect!');
      console.log(Object.keys(io.engine.clients));
      socket.broadcast.emit('message', {"users":Object.keys(io.engine.clients)} )
   });

});

console.log('WS Listening..');