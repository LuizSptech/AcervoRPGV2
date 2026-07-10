var database = require("../database/config");

function scroll() {
    var instrucao = `
    select * from postagem;`;
    console.log("Executando a instrução SQL:\n" + instrucao);
    return database.executar(instrucao)
}

function postar(titulo, descricao, imagem){
    var instrucao = `INSERT INTO postagem (titulo, descricao, imagem) VALUES ('${titulo}', '${descricao}', '${imagem}')`;

    console.log("Executando a instrução SQL:\n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    postar,
    scroll
}