// Importando configurações do servidor
var app = require('./config/server');

// Parametrizando a porta de escuta
var port = 8080;
var server = app.listen(port, function(){
    console.log('Servidor online');
});

var io = require('socket.io').listen(server);

// setando variável io com o express para não ter problemas de escopo
app.set('io', io);

// Criando a conexão por websocket
io.on('connection', function(socket){
    console.log('Usuário conectou');

    //emit(param, param) - Pedido para executar alguma ação
    //on(param, callback) - Ouvindo pedidos de execução

    socket.on('disconnect', function(){
        console.log('Usuário desconectou');
    });

    socket.on('msgParaServidor', function(data){

        // Eventos de diálogo
        // emitindo somente para a tela de quem enviou a mensagem
        socket.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );
        // emitindo para todas as telas a mensagem
        socket.broadcast.emit(
            'msgParaCliente', 
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        // Relação de participantes
        // emitindo somente para a tela de quem enviou a mensagem
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            );
            // emitindo para todas as telas a mensagem
            socket.broadcast.emit(
                'participantesParaCliente', 
                {apelido: data.apelido}
            );
        }
    });
});