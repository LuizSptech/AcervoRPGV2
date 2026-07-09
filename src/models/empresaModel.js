var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, nome FROM usuario`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(nome) {
  var instrucaoSql = `SELECT * FROM usuario WHERE nome = '${nome}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(id, nome) {
  var instrucaoSql = `INSERT INTO usuario (id, nome) VALUES ('${id}', '${nome}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };