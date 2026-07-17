var database = require("../database/config");

function scroll() {
    var instrucao = `SELECT usuario.nome, postagem.titulo, postagem.imagem, postagem.descricao, postagem.horario, (select COUNT(idpostagem) FROM postagem WHERE fk_usuario = 1) AS quantidade from postagem 
JOIN usuario ON postagem.fk_usuario = usuario.id 
order by horario DESC;`;
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