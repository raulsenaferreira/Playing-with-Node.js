var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var util = require('util');

var registro1, registro2;
// Connect to the db
MongoClient.connect("mongodb://localhost/meuBancoTeste", function(err, db) {
  if(err) { return console.dir(err); }
  registro1 = db.collection('registro1');
  registro2 = db.collection('registro2');
});

app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/font-awesome/css/", express.static(__dirname + '/font-awesome/css/'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.get('/collection1/', function(req,res){
  registro1.find().toArray(function(err, items) {            
    res.send(items);
  });
});

app.get('/collection2/', function(req,res){
  registro2.find().toArray(function(err, items) {            
    res.send(items);
  });
});


http.listen(4000, function(){
  console.log('Disponível na porta 4000');
});
