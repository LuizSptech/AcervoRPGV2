
var database = require("../database/config");
 
function scroll() {
    var instrucao = `SELECT usuario.nome, postagem.titulo, postagem.descricao, postagem.imagem, postagem.horario
FROM postagem
JOIN usuario ON postagem.fk_usuario = usuario.id
ORDER BY postagem.horario DESC;`;
    console.log("Executando a instrução SQL:\n" + instrucao);
    return database.executar(instrucao)
}
 
function postar(titulo, descricao, imagem, usuario){
    var instrucao = `INSERT INTO postagem (titulo, descricao, imagem, fk_usuario) VALUES ('${titulo}', '${descricao}', '${imagem}', ${usuario})`;
 
    console.log("Executando a instrução SQL:\n" + instrucao);
    return database.executar(instrucao);
}
 
module.exports = {
    postar,
    scroll
}
