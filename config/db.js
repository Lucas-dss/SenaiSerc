const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',      // Coloque a senha do seu MySQL aqui, se houver
  database: 'db_usuarios'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao MySQL com sucesso!');
});

module.exports = connection;
