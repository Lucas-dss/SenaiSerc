const db = require('../config/db');

  exports.create = (responsavel, callback) => {
    const sql = 'INSERT INTO responsaveis (nome, email) VALUES (?, ?)';
    db.query(sql, [responsavel.nome, responsavel.email], callback);
  };
  
  exports.findAll = (callback) => {
    const sql = 'SELECT id, nome, email FROM responsaveis';
    db.query(sql, callback);
  };
  