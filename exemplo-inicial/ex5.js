//Aplicação
var express = require('express');
var app = express();
var bancoDeDados = new BancoDeDados();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile('/home.html');
});

//select * from BancoDeDados
app.get('/registros', function (req, res) {
    res.json({registros: bancoDeDados.findAll()});
});
//select id from BancoDeDados
app.get('/registros/:id', function (req, res) {
    var idRegistro = req.params.id;
    try {
        res.json(bancoDeDados.find(idRegistro));
    } catch (exeception) {
        res.send(404);
    }
});
//INSERT nome, sobrenome, idade 
app.post('/registros', function (req, res) {
    var registro = req.body;
    bancoDeDados.save({
        nome: registro.nome || 'Jhon',
        sobrenome: registro.sobrenome || 'Doe',
        idade: registro.idade || '18'
    });
    res.send(200);
});
//UPDATE where id = ?
app.put('/registros/:id', function (req, res) {
    var registro = req.body;
    var idRegistro = req.params.id;
    try {
        var registroPersistido = bancoDeDados.find(idRegistro);
        bancoDeDados.save({
            idRegistro: registroPersistido.idRegistro,
            nome: registro.nome || registroPersistido.nome,
            sobrenome: registro.sobrenome || registroPersistido.sobrenome,
            idade: registro.idade || registroPersistido.idade
        });
        res.send(200);
    } catch (exception) {
        res.send(404);
    }
});
//DELETE where id=?
app.delete('/registros/:id', function (req, res) {
    try {
        bancoDeDados.remove(req.params.id);
        res.send(200);
    } catch (exeception) {
        res.send(404);
    }
});

app.listen(8080);


//Classe
function BancoDeDados() {
    this.registros = [];
    this.nextId = 1;
}

//Métodos da Classe
BancoDeDados.prototype.find = function (id) {
    var registro = this.registros.filter(function(item) {
        return item.idRegistro == id;
    })[0];
    if (null == registro) {
        throw new Error('Registro não encontrado');
    }
    return registro;
}

BancoDeDados.prototype.findIndex = function (id) {
    var index = null;
    this.registros.forEach(function(item, key) {
        if (item.idRegistro == id) {
            index = key;
        }
    });
    if (null == index) {
        throw new Error('Registro não encontrado');
    }
    return index;
}

BancoDeDados.prototype.findAll = function () {
    return this.registros;
}

BancoDeDados.prototype.save = function (registro) {
    if (registro.idRegistro == null || registro.idRegistro == 0) {
        registro.idRegistro = this.nextId;
        this.registros.push(registro);
        this.nextId++;
    } else {
        var index = this.findIndex(registro.idRegistro);
        this.registros[index] = registro;
    }

}

BancoDeDados.prototype.remove = function (id) {
    var index = this.findIndex(id);
    this.registros.splice(index, 1);
}