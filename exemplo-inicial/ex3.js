var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname +'/index.html');
});

app.get('/pagina', function(req, res){
  res.sendFile(__dirname +'/public/p1.html');
});

app.get('/pagina2', function(req, res){
  res.sendFile(__dirname +'/public/pagina2.html');
});

http.listen(3030, function(){
  console.log('Disponível na porta :3030');
});
