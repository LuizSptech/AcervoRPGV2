var feedModel = require("../models/quizzModel");

function guardar(req, res) {

    var usuario = req.body.usuario;
    var resultado = req.body.resultado
    if (usuario == undefined){
        res.status(400).send("seu id esta undefined");
    }else if (resultado == undefined) {
        res.status(400).send("seu resultado esta undefined")
    } else {

        quizzModel.guardar(usuario,resultado).then(function(resultado){
            res.status(200).json(resultado);
        }).catch(function(erro){
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o Quizz :",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
    }
}


function puxar(req,res) {
    var id_usuario = req.body.id_usuario;
    var fk_tipo = req.body.fk_tipo;

    if (id_usuario == undefined || fk_tipo == undefined){
        res.status(400).send("seu id_usuario ou fk_tipo esta undefined!")
    }

    quizzModel.puxar(id_usuario, fk_tipo).then(function(resposta){
        res.status(200).send("dash feita com sucesso");
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}


module.exports = {
    guardar,
    puxar   
}