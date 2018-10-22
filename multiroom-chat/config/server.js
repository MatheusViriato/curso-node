// Importando módulos
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// Inicializando o objeto do express
var app = express();

// Setando as variáveis 'view engine' e 'views' do express
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Configurando o middleware do express.static, do body-parser e do express-validator
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

// Efetuando o auto-load das rotas, dos módulos e dos controllers com consign para o objeto app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

// Exportando o objeto app
module.exports = app;