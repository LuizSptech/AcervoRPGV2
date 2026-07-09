var feedModel = require("../models/feedModel");

function scroll(req, res) {
    feedModel.scroll().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}


function postar(req,res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    if (titulo == undefined || descricao == undefined){
        res.status(400).send("seu Titulo ou descricao esta undefined!")
    }

    feedModel.postar(titulo, descricao).then(function(resposta){
        res.status(200).send("Post feito com sucesso");
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}


module.exports = {
    scroll,
    postar   
}