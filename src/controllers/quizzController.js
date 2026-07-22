var quizzModel = require("../models/quizzModel");

function guardar(req, res) {

    var usuario = req.body.usuarioServer;
    var resultado = req.body.resultadoServer;
    if (usuario == undefined){
        res.status(400).send("seu id esta undefined");
    }else if (resultado == undefined) {
        res.status(400).send("seu resultado esta undefined")
    } else {

        quizzModel.guardar(usuario,resultado)
        .then(
                function(resultado){
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


function puxar(req, res) {
    var id_usuario = req.query.id_usuario;

    if (id_usuario == undefined) {
        return res.status(400).send("seu id_usuario esta undefined!");
    }

    quizzModel.puxar(id_usuario).then(function (dados) {
        res.status(200).json(dados);
    }).catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao puxar os dados do dash :",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    })
}


module.exports = {
    guardar,
    puxar   
}



