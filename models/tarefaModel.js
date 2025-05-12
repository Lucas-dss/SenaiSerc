const db = require('../config/db');

// Criar nova tarefa
exports.create = (tarefa, callback) => {
  const sql = ' INSERT INTO tarefas (nome, descricao, data_entrega, responsavel_id, status)    VALUES (?, ?, ?, ?, ?)';
  db.query(
    sql,    [tarefa.nome, tarefa.descricao, tarefa.data_entrega, tarefa.responsavel_id, tarefa.status],
    callback
  );
};

// Listar todas as tarefas (com nome do responsável)
exports.findAll = (callback) => {
  const sql = 'SELECT tarefas.*, responsaveis.nome AS responsavel_nome    FROM tarefas    LEFT JOIN responsaveis ON tarefas.responsavel_id = responsaveis.id';
  db.query(sql, callback);
};

// Buscar tarefa por ID
exports.findById = (id, callback) => {
  const sql =  'SELECT tarefas.*, responsaveis.nome AS responsavel_nome    FROM tarefas    LEFT JOIN responsaveis ON tarefas.responsavel_id = responsaveis.id    WHERE tarefas.id = ?';
  db.query(sql, [id], callback);
};

// Atualizar tarefa
exports.update = (id, tarefa, callback) => {
  const sql = 'UPDATE tarefas    SET nome = ?, descricao = ?, data_entrega = ?, responsavel_id = ?, status = ?    WHERE id = ?  ';
  db.query(
    sql,
    [tarefa.nome, tarefa.descricao, tarefa.data_entrega, tarefa.responsavel_id, tarefa.status, id],
    callback
  );
};

// Excluir tarefa
exports.delete = (id, callback) => {
  const sql = 'DELETE FROM tarefas WHERE id = ?';
  db.query(sql, [id], callback);
};
