const db = require('../config/db');

// Cria um novo usuário no banco de dados
exports.create = (usuario, callback) => {
  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  db.query(sql, [usuario.nome, usuario.email, usuario.senha], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

// Busca um usuário pelo e-mail (usado no login)
exports.findByEmail = (email, callback) => {
  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};
