/* importar o módulo do crypto */
var crypto = require('crypto');

function UsuariosDAO(connection){
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){

            //criptografando senha
            var senhha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");
            usuario.senha = senhha_criptografada;

            collection.insert(usuario);
            mongoclient.close();
        });
    });
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("usuarios", function(err, collection){

            var senhha_criptografada = crypto.createHash("md5").update(usuario.senha).digest("hex");
            usuario.senha = senhha_criptografada;

            collection.find(usuario).toArray(function(err, result){
                
                if(result[0] != undefined){

                    req.session.autorizado = true;

                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;

                }

                if(req.session.autorizado){
                    res.redirect("jogo");
                }else{
                    var erro = [];
                    erro.push({ msg: 'Login ou senha inválidos' });
                    res.render("index", { validacao: erro });
                }

            });
            mongoclient.close();
        });
    });
}

module.exports = function(){
    return UsuariosDAO;
}