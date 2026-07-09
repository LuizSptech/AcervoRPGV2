var database = require("../database/config");

function scroll() {
    var instrucao = `
    select * from POSTAGEM ORDER BY data ASC;`;
    console.log("Executando a instrução SQL:\n" + instrucao);
    return database
}

function postar(titulo, descricao, imagem){
    var instrucao = `INSERT INTO POSTAGEM (titulo, descricao, imagem) VALUES ('${titulo}', '${descricao}', '${imagem}')`;

    console.log("Executando a instrução SQL:\n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    postar,
    scroll
}