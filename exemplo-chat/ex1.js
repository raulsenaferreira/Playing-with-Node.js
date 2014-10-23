var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.get('/', function(req, res){
  res.sendFile('index.html');
});

io.on('connection', function(socket){
  socket.on('mensagem', function(msg){
    io.emit('mensagem', msg);
  });
});

http.listen(3030, function(){
  console.log('Disponível na porta :3030');
});
