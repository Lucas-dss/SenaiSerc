const Tarefa = require('../models/tarefaModel');

//CREATE -POST - Criar nova tarefa
exports.create = (req, res) => {
  const tarefa = req.body;

  // Validação simples
  if (!tarefa.nome || !tarefa.descricao || !tarefa.data_entrega || !tarefa.responsavel_id || !tarefa.status) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  Tarefa.create(tarefa, (err, result) => {
    if (err) {
      console.error('Erro ao criar tarefa:', err);
      return res.status(500).json({ error: 'Erro 500 ao criar tarefa.' });
    }
    res.status(201).json({ message: 'Tarefa criada com sucesso!' });
  });
};

// READ - Listar todas as tarefas
exports.findAll = (req, res) => {
  Tarefa.findAll((err, resultados) => {
    if (err) {
      console.error('Erro ao buscar tarefas:', err);
      return res.status(500).json({ error: 'Erro 500 ao buscar tarefas.' });
    }
    res.json(resultados);
  });
};

// GET - Buscar tarefa por ID
exports.findById = (req, res) => {
  const id = req.params.id;

  Tarefa.findById(id, (err, resultados) => {
    if (err) {
      console.error('Erro ao buscar tarefa:', err);
      return res.status(500).json({ error: 'Erro ao buscar tarefa.' });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }
    res.json(resultados[0]);
  });
};

// UPDATE - PUT - Atualizar tarefa
exports.update = (req, res) => {
  const id = req.params.id;
  const tarefa = req.body;

  Tarefa.update(id, tarefa, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar tarefa:', err);
      return res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
    }
    res.json({ message: 'Tarefa atualizada com sucesso!' });
  });
};

// DELETE - DELETE - Excluir tarefa
exports.delete = (req, res) => {
  const id = req.params.id;

  Tarefa.delete(id, (err, result) => {
    if (err) {
      console.error('Erro ao excluir tarefa:', err);
      return res.status(500).json({ error: 'Erro 500 ao excluir tarefa.' });
    }
    res.json({ message: 'Tarefa excluída com sucesso!' });
  });
};
