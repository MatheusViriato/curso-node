var http = require('http');

var opcoes = {
    hostname: 'localhost',
    port: 8080,
    method: 'get',
    path: '/teste',
    headers: {
        'Accept': 'application/json', // text/html
        'Content-type': 'application/json' // application/x-www-form-urlencoded
    }
}

//Content-type
// var html = 'nome=José'; //x-www-form-urlencoded
// var json = {nome: 'Matheus'};
// var string_json = JSON.stringify(json);

var buffer_corpo_response = [];

//primeiro parametro pode ser uma string ou um obj
//'http://localhost:8080'
var req = http.request(opcoes, function(res){
    //'pedaços' da pagina vindo do servidor
    res.on('data', function(chunk){
        buffer_corpo_response.push(chunk);
    });

    //quando o carregamento é finalizado
    res.on('end', function(){
        var corpo_response = Buffer.concat(buffer_corpo_response).toString();
        console.log(corpo_response);
    });

    //caso aja algum erro no processo de carregamento da requisição
    res.on('error', function(){

    });
});

// req.write(string_json);

req.end();