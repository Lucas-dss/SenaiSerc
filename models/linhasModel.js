const db = require('../config/dbLinhas');

// Cria uma nova linha no banco de dados
exports.create = (linha, callback) => {
  const sql = 'INSERT INTO linhas (id, status) VALUES (?, ?)';
  db.query(sql, [linha.id, linha.status], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};
//acha as linhas