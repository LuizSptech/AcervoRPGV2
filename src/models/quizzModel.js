
var database = require("../database/config");

function guardar(usuario, resultado) {
    var instrucao = `INSERT INTO quiz (fk_usuario, fk_tipo) VALUES (${usuario},${resultado}`;
    console.log("Executando a instrução SQL:\n" + instrucao);
    return database.executar(instrucao)
}

function puxar(){
    var instrucao = `S`;

    console.log("Executando a instrução SQL:\n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    puxar,
    guardar
}