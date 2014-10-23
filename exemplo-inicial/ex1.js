//carrega o módulo http, responsável por criar o servidor
var http = require('http');

//cria uma instância do servidor e deixa uma resposta padrão (Hello World!!)
var server = http.createServer(function(request, response){
	// para quem acessar o cliente 
	console.log("Nova conexão!");
	
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.write("Hello World!!\n");
});

// server está acessível no localhost (127.0.0.1) na porta 8000
server.listen(8000);
//mensagem que será exibida no terminal assim que o servidor for iniciado
console.log("Rodando em localhost:8000/");