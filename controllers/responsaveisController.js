const Responsavel = require('../models/responsavelModel');

// CREATE - Cadastrar um novo responsável
exports.create = (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).send('Nome e e-mail são obrigatórios.');
  }

  Responsavel.create({ nome, email }, (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar responsável:', err);
      return res.status(500).send('Erro 500 ao cadastrar responsável.');
    }

    if (result.affectedRows === 1) {
      return res.status(201).send('Responsável 201 cadastrado com sucesso.');
    } else {
      return res.status(500).send('Falha 500 ao cadastrar responsável.');
    }
  });
};

// READ - Listar todos os responsáveis
exports.findAll = (req, res) => {
  Responsavel.findAll((err, results) => {
    if (err) {
      console.error('Erro ao buscar responsáveis:', err);
      return res.status(500).send('Erro 500 ao buscar responsáveis.');
    }
    res.json(results);
  });
};
