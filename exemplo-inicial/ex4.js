var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//index ainda está aparecendo no navegador?
app.get('/', function(req, res){
  res.sendFile('/index.html');
});

app.get('/pagina', function(req, res){
  res.sendFile('/p1.html');
});

app.get('/pagina2', function(req, res){
  res.sendFile('/pagina2.html');
});

app.post('/', function (req, res) {
	
	res.send('O nome digitado foi: '+ req.body.nome);
	//res.sendFile('/index.html');
});

http.listen(3030, function(){
  console.log('Disponível na porta :3030');
});
