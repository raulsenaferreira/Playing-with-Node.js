/************************************************/
//Exemplo 1 - Hello World
/************************************************/
var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.render('index.jade');
});
/************************************************/
//Exemplo 2 - passagem de parâmetros
/************************************************/
app.get('/ex2', function (req, res) {
	res.render('exemplo2.jade', {frase: 'Passando string como parâmetro para o template'});
});
/************************************************/
//Exemplo 3 - Criando elementos de forma iterativa
/************************************************/
app.get('/ex3', function (req, res) {
	res.render('componente.jade', {qtd: 5});
});
/************************************************/
//Exemplo 4 - Incluindo template dentro de outro
/************************************************/
app.get('/ex4', function (req, res) {
	res.render('all.jade');
});
/************************************************/
//Exemplo 5 - 
/************************************************/
app.listen(8080);