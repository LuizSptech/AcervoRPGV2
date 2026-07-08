var databse = require("../database/config");

function scroll() {
    var instrucao = `
    select * from POSTAGEM ORDER BY data ASC;`;
    console.log("Executando a instrução SQL:\n" + instrucao);
}

function postar(titulo, descricao){
    var instrucao = `INSERT INTO POSTAGEM (titulo) VALUES ('${titulo}')`;

    console.log("Executando a instrução SQL:\n" + instrucao);
    return databse.executar(instrucao);
}

module.exports = {
    postar,
    scroll
}