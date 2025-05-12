const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');

// Criar nova tarefa
router.post('/', tarefasController.create);

// Listar todas as tarefas
router.get('/', tarefasController.findAll);

// Buscar uma tarefa por ID
router.get('/:id', tarefasController.findById);

// Atualizar uma tarefa por ID
router.put('/:id', tarefasController.update);

// Excluir uma tarefa por ID
router.delete('/:id', tarefasController.delete);

module.exports = router;
