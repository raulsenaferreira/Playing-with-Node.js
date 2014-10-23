var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


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

// Mongoose Model definition
var Account = mongoose.model('Account', AccountSchema);

var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile("index.html");
});

app.get('/usuarios', function (req, res) {
    Account.find({}, function (err, docs) {
        res.json(docs);
    });
});

app.get('/usuarios/:nome', function (req, res) {
    if (req.params.email) {
        Account.find({ email: req.params.email }, function (err, docs) {
            res.json(docs);
        });
    }
});

app.post('/criar', function (req, res) {
	var registro = req.body;
	var usuario = new Account({
			email: registro.email,
			nomeCompleto: {
				nome: registro.nome,
				sobrenome: registro.sobrenome
			},
			password: registro.senha
		});

		usuario.save(registerCallback);
		console.log('Comando Save executado');
});
// Start the server
app.listen(8080);