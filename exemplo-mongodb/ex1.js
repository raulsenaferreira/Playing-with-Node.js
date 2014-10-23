var express = require('express');
var mongoose = require('mongoose');
var app = express();
var registro = 0;
mongoose.connect('mongodb://localhost/banco', function (error) {
    if (error) {
        console.log(error);
    }
});

var registerCallback = function(err){
	if(err){
		return console.log(err);
	}

	return console.log('Conta criada');
}

var AccountSchema = new mongoose.Schema({
		email: {type: String, unique: true},
		senha: {type: String},
		nomeCompleto: {
			nome: {type: String},
			sobrenome: {type: String}
		},
		niver: {
			dia: {type: Number, min: 1, max: 31, required: false},
			mes: {type: Number, min: 1, max: 12, required: false},
			ano: {type: Number}
		},
		foto: {type: String},
		sobre: {type: String}
	});

// Mongoose Model
var Account = mongoose.model('Account', AccountSchema);

//rotas
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile("index.html");
});
app.get('/usuarios', function (req, res) {
    Account.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.get('/usuarios/:email', function (req, res) {
    if (req.params.email) {
        Account.find({ email: req.params.email }, function (err, docs) {
            res.json(docs);
        });
    }
});

app.post('/criar', function (req, res) {
	//novo registro
	registro++;

	var senha = registro*Math.random();
	var usuario = new Account({
			email: "emailDoRegistro-"+registro+"@site.com",
			nomeCompleto: {
				nome: "joao "+registro+"o",
				sobrenome: "da Silva"
			},
			senha: senha
		});

		usuario.save(registerCallback);
		console.log('Comando Save executado');
});

app.listen(8080);