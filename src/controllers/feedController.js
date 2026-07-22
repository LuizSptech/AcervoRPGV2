
var feedModel = require("../models/feedModel");
 
function scroll(req, res) {
    feedModel.scroll().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}
 
 
function postar(req, res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var imagem = req.body.imagem;
    var usuario = req.body.usuario;
 
    if (titulo == undefined || descricao == undefined) {
        return res.status(400).send("seu Titulo ou descricao esta undefined!")
    }
    if (usuario == undefined) {
        return res.status(400).send("seu usuario esta undefined!")
    }
 
    feedModel.postar(titulo, descricao, imagem, usuario).then(function (resposta) {
        res.status(200).send("Post feito com sucesso");
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}
 
 
module.exports = {
    scroll,
    postar   
}
