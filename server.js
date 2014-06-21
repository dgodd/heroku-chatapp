var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/'));

http.listen(port, function(){
  console.log('listening on *:%d', port);
});

io.on('connection', function(socket) {
  var id = setInterval(function() {
    socket.emit('chat message', new Date());
  }, 1000);

  console.log('websocket connection open');

  socket.on('close', function() {
    console.log('websocket connection close');
    clearInterval(id);
  });
});
