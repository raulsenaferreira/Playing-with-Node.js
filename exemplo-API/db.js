var mongoose = require('mongoose');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
  
});

var registro1 = new mongoose.Schema({
    nome: { type: String }
  , sobrenome: String
  , status: {type: String, default: "inativo(a)"}
  , atualizado_em: { type: Date, default: Date.now }
  });

var registro2 = new mongoose.Schema({
    nome: { type: String }
  , nota: Number
  , universidade: String
  });



var Registro1 = mongoose.model('Registro1', registro1);
var Registro2 = mongoose.model('Registro2', registro2);

mongoose.connect('mongodb://localhost/meuBancoTeste');

//salvando registro 1
var registro = new Registro1({
    nome: "Raul"
  , sobrenome: "Sena Ferreira"
  , status: "ativo"
});

registro.save(function(err, registro) {
  if (err) return console.error(err);
  //console.dir(registro);
});

//salvando registro 2
var registro = new Registro2({
    nome: "Raul"
  , nota: 10
  , universidade: "UFRRJ"
});

registro.save(function(err, registro) {
  if (err) return console.error(err);
  //console.dir(registro);
});
