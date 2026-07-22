var database = require("../database/config");
 
function guardar(usuario, resultado) {
    var instrucao = `INSERT INTO quiz (fk_usuario, fk_tipo) VALUES (${usuario},${resultado})`;
    console.log("Executando a instrução SQL:\n" + instrucao);
    return database.executar(instrucao)
}
 
function puxar(id_usuario) {
 
    //(gráfico de pizza)
        var sqlDistribuicaoUsuarios = `
        SELECT tipo.nome, COUNT(ultimo_quiz.fk_usuario) AS quantidade
        FROM tipo
        LEFT JOIN (
            SELECT quiz.fk_usuario, quiz.fk_tipo
            FROM quiz
            INNER JOIN (
                SELECT fk_usuario, MAX(data_quiz) AS ultima_data
                FROM quiz
                GROUP BY fk_usuario
            ) ultimo ON quiz.fk_usuario = ultimo.fk_usuario
                     AND quiz.data_quiz = ultimo.ultima_data
        ) ultimo_quiz ON ultimo_quiz.fk_tipo = tipo.idTipo
        GROUP BY tipo.idTipo, tipo.nome
    `;

 
    //  (gráfico de barra)
    var sqlPostsPorTipo = `
        SELECT tipo.nome, COUNT(postagem.idpostagem) AS quantidade
        FROM tipo
        LEFT JOIN (
            SELECT quiz.fk_usuario, quiz.fk_tipo
            FROM quiz
            INNER JOIN (
                SELECT fk_usuario, MAX(data_quiz) AS ultima_data
                FROM quiz
                GROUP BY fk_usuario
            ) ultimo ON quiz.fk_usuario = ultimo.fk_usuario
                     AND quiz.data_quiz = ultimo.ultima_data
        ) usuario_tipo ON usuario_tipo.fk_tipo = tipo.idTipo
        LEFT JOIN postagem ON postagem.fk_usuario = usuario_tipo.fk_usuario
        GROUP BY tipo.idTipo, tipo.nome
    `;
 
    // Total de posts do usuário
    var sqlTotalPosts = `
        SELECT COUNT(*) AS total
        FROM postagem
        WHERE fk_usuario = ${id_usuario}
    `;
 
    // % de usuários que têm o mesmo tipo que o usuário logado
   var sqlPercentual = `
        SELECT ROUND(
            (SELECT COUNT(*) FROM (
                SELECT quiz.fk_usuario, quiz.fk_tipo
                FROM quiz
                INNER JOIN (
                    SELECT fk_usuario, MAX(data_quiz) AS ultima_data
                    FROM quiz
                    GROUP BY fk_usuario
                ) ultimo ON quiz.fk_usuario = ultimo.fk_usuario
                         AND quiz.data_quiz = ultimo.ultima_data
                WHERE quiz.fk_tipo = (
                    SELECT fk_tipo FROM quiz
                    WHERE fk_usuario = ${id_usuario}
                    ORDER BY data_quiz DESC LIMIT 1
                )
            ) mesmo_tipo)
            / (SELECT COUNT(DISTINCT fk_usuario) FROM quiz) * 100
        , 1) AS porcentagem
    `;

 
    // Posts do usuário no último mês
    var sqlPostsUltimoMes = `
        SELECT COUNT(*) AS total
        FROM postagem
        WHERE fk_usuario = ${id_usuario}
        AND horario >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
    `;
    //puxar o tipo do usuario
        var sqlTipoAtual = `
        SELECT tipo.nome
        FROM quiz
        JOIN tipo ON quiz.fk_tipo = tipo.idTipo
        WHERE quiz.fk_usuario = ${id_usuario}
        ORDER BY quiz.data_quiz DESC
        LIMIT 1
    `;

 
    console.log("Executando as instruções SQL do dash...");
 
    return Promise.all([
        database.executar(sqlDistribuicaoUsuarios),
        database.executar(sqlPostsPorTipo),
        database.executar(sqlTotalPosts),
        database.executar(sqlPercentual),
        database.executar(sqlPostsUltimoMes),
        database.executar(sqlTipoAtual)
    ]).then(function (resultados) {
        return {
            distribuicaoUsuarios: resultados[0],
            distribuicaoPosts: resultados[1],
            totalPosts: resultados[2][0].total,
            porcentagem: resultados[3][0].porcentagem,
            postsUltimoMes: resultados[4][0].total,
             tipoAtual: resultados[5].length > 0 ? resultados[5][0].nome : null
            
        };
    });
}
 
module.exports = {
    puxar,
    guardar
}
