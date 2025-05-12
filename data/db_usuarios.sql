CREATE DATABASE IF NOT EXISTS db_usuarios;
USE db_usuarios;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);
SELECT * FROM db_usuarios.usuarios;
