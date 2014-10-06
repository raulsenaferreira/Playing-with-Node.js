//carrega o módulo http, responsável por criar o servidor
var http = require('http');
var contador = 0;
//cria uma instância do servidor e deixa uma resposta padrão (Hello World!!) para quem acessar o cliente 
var server = http.createServer(function(request, response){
	console.log("Nova conexão!");
	contador++;
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.write("Hello World!!\n");
	response.end("Visitante número "+contador);
});
// server está acessível no localhost (127.0.0.1) na porta 8000
server.listen(8000);
//mensagem que será exibida no terminal assim que o servidor for iniciado
console.log("Rodando em localhost:8000/");