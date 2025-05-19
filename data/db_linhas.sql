CREATE DATABASE IF NOT EXISTS db_linhas;
USE db_linhas;
CREATE TABLE linhas (
	id INT primary KEY NOT NULL,
    pontoInicial VARCHAR(255) NOT NULL,
    paradas varchar(255) NOT NULL,
    pontoFinal VARCHAR(255) NOT NULL,
    horarioDePartida datetime NOT NULL,
    status boolean NOT NULL
);
SELECT * FROM db_linhas.linhas;